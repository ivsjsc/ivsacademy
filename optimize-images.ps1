# Image Optimization Script for IVS Website
# This script optimizes images for better web performance

param(
    [string]$SourcePath = "e:\IVS\Website\ivs\images",
    [string]$OutputPath = "e:\IVS\Website\ivs\images\optimized",
    [int]$Quality = 80,
    [int]$MaxWidth = 1920,
    [int]$MaxHeight = 1080
)

Write-Host "Starting image optimization..." -ForegroundColor Green

# Create output directory if it doesn't exist
if (!(Test-Path $OutputPath)) {
    New-Item -ItemType Directory -Path $OutputPath -Force
    Write-Host "Created output directory: $OutputPath" -ForegroundColor Yellow
}

# Function to optimize image using .NET Image class
function Optimize-Image {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$Quality = 80,
        [int]$MaxWidth = 1920,
        [int]$MaxHeight = 1080
    )

    try {
        Add-Type -AssemblyName System.Drawing

        $image = [System.Drawing.Image]::FromFile($InputPath)
        $originalSize = (Get-Item $InputPath).Length

        # Calculate new dimensions while maintaining aspect ratio
        $ratio = [Math]::Min($MaxWidth / $image.Width, $MaxHeight / $image.Height)
        if ($ratio -lt 1) {
            $newWidth = [int]($image.Width * $ratio)
            $newHeight = [int]($image.Height * $ratio)
        } else {
            $newWidth = $image.Width
            $newHeight = $image.Height
        }

        # Create new bitmap with new dimensions
        $bitmap = New-Object System.Drawing.Bitmap $newWidth, $newHeight
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($image, 0, 0, $newWidth, $newHeight)

        # Save with compression
        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
        if ($encoder) {
            $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters 1
            $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, $Quality)
            $bitmap.Save($OutputPath, $encoder, $encoderParams)
        } else {
            $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        }

        $image.Dispose()
        $bitmap.Dispose()
        $graphics.Dispose()

        $newSize = (Get-Item $OutputPath).Length
        $compressionRatio = [math]::Round(($originalSize - $newSize) / $originalSize * 100, 2)

        Write-Host "Optimized: $(Split-Path $InputPath -Leaf) - Size: $([math]::Round($originalSize/1MB, 2))MB -> $([math]::Round($newSize/1MB, 2))MB ($compressionRatio% reduction)" -ForegroundColor Green

    } catch {
        Write-Host "Error optimizing $(Split-Path $InputPath -Leaf): $_" -ForegroundColor Red
    }
}

# Get all image files
$imageFiles = Get-ChildItem -Path $SourcePath -File -Recurse | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|gif|webp)' -and
    $_.FullName -notlike "*optimized*"
}

$totalFiles = $imageFiles.Count
$processed = 0

Write-Host "Found $totalFiles image files to optimize" -ForegroundColor Cyan

foreach ($file in $imageFiles) {
    $processed++
    # Get relative path from source directory
    $relativePath = $file.FullName.Substring($SourcePath.Length).TrimStart("\")
    $outputFile = Join-Path $OutputPath $relativePath

    # Create subdirectories if needed
    $outputDir = Split-Path $outputFile -Parent
    if (!(Test-Path $outputDir)) {
        try {
            New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
        } catch {
            Write-Host "Error creating directory $outputDir : $_" -ForegroundColor Red
            continue
        }
    }

    # Change extension to .jpg for optimization
    $outputFile = [System.IO.Path]::ChangeExtension($outputFile, "jpg")

    Write-Progress -Activity "Optimizing Images" -Status "$processed/$totalFiles - $($file.Name)" -PercentComplete (($processed / $totalFiles) * 100)

    Optimize-Image -InputPath $file.FullName -OutputPath $outputFile -Quality $Quality -MaxWidth $MaxWidth -MaxHeight $MaxHeight
}

Write-Progress -Activity "Optimizing Images" -Completed
Write-Host "Image optimization completed!" -ForegroundColor Green
Write-Host "Optimized images saved to: $OutputPath" -ForegroundColor Yellow