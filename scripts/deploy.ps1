<#
  deploy.ps1 — Đăng các thay đổi lên web (GitHub Pages).

  CÁCH DÙNG (mở PowerShell trong thư mục dự án):
      powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1
      powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1 "Thêm gian trưng bày mới"

  Sau khi chạy, web tự cập nhật sau ~1–2 phút.
#>
param([string]$Message = "")

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root

if ([string]::IsNullOrWhiteSpace($Message)) {
  $Message = "Cap nhat noi dung " + (Get-Date -Format "yyyy-MM-dd HH:mm")
}

git add -A
$changes = git status --porcelain
if ([string]::IsNullOrWhiteSpace($changes)) {
  Write-Host "Khong co thay doi nao de dang." -ForegroundColor Yellow
  exit 0
}

git commit -m $Message
git push

Write-Host ""
Write-Host "Da dang! Web se tu cap nhat sau ~1-2 phut tai:" -ForegroundColor Green
Write-Host "  https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/"
