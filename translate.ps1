# Load JSON files
$vi = Get-Content lang\vi.json | ConvertFrom-Json
$en = Get-Content lang\en.json | ConvertFrom-Json
$zh = Get-Content lang\zh.json | ConvertFrom-Json

# Function to translate Vietnamese to English (placeholder, using AI knowledge)
function Translate-ToEnglish {
    param([string]$text)
    # Placeholder: In real scenario, use translation API
    # For now, return a translated version based on common translations
    switch ($text) {
        "Bước 1: Tiếp cận và tư vấn" { "Step 1: Approach and Consultation" }
        "Mô tả bước 1" { "Description of step 1" }
        # Add more cases as needed
        default { "Translated: $text" }  # Placeholder
    }
}

# Function to translate Vietnamese to Chinese (placeholder)
function Translate-ToChinese {
    param([string]$text)
    # Placeholder
    switch ($text) {
        "Bước 1: Tiếp cận và tư vấn" { "步骤1：接近和咨询" }
        default { "翻译: $text" }
    }
}

# Process en.json
foreach ($prop in $en.PSObject.Properties) {
    if ($prop.Value -like "TODO: translate (en):*") {
        $key = $prop.Name
        $originalKey = $prop.Value -replace "TODO: translate \(en\): ", ""
        if ($vi.PSObject.Properties.Name -contains $originalKey) {
            $viText = $vi.$originalKey
            $translated = Translate-ToEnglish $viText
            $en.$key = $translated
        }
    }
}

# Process zh.json
foreach ($prop in $zh.PSObject.Properties) {
    if ($prop.Value -like "TODO: translate (zh):*") {
        $key = $prop.Name
        $originalKey = $prop.Value -replace "TODO: translate \(zh\): ", ""
        if ($vi.PSObject.Properties.Name -contains $originalKey) {
            $viText = $vi.$originalKey
            $translated = Translate-ToChinese $viText
            $zh.$key = $translated
        }
    }
}

# Save back
$en | ConvertTo-Json -Depth 10 | Set-Content lang\en.json
$zh | ConvertTo-Json -Depth 10 | Set-Content lang\zh.json