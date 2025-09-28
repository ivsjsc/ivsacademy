<#
commit_translations.ps1
Helper to create a branch, add translation files and commit them.

Usage:
  .\commit_translations.ps1 -BranchName translations/zh-update-YYYYMMDD -Message "Update Chinese translations"

This script assumes you have Git installed and are in the repo root or will run it from within the repo.
#>

param(
  [string]$BranchName = $("translations/zh-update-" + (Get-Date -Format yyyyMMdd)),
  [string]$Message = "Update Chinese translations",
  [switch]$Push
)

Write-Host "Creating branch: $BranchName"
git checkout -b $BranchName
Write-Host "Adding candidate translation files..."
git add lang/candidates/* lang/reports/* || Write-Host "No candidate/reports changed"
git commit -m $Message
if ($Push) {
  Write-Host "Pushing branch to origin..."
  git push -u origin $BranchName
}

Write-Host "Done. Review the commit and open a pull request when ready."
