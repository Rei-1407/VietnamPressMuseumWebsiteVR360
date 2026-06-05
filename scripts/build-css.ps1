<#
  build-css.ps1 — Biên dịch Tailwind thành css/tailwind.css (tĩnh, nhẹ, nhanh).
  Chạy lại file này MỖI KHI bạn đổi class Tailwind trong index.html / admin / js.
  (Chỉ cần khi đổi GIAO DIỆN/bố cục — sửa nội dung qua admin thì KHÔNG cần.)
      powershell -ExecutionPolicy Bypass -File scripts\build-css.ps1
#>
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)
Write-Host "Dang build Tailwind CSS..."
npx -y tailwindcss@3.4.17 -c tailwind.config.js -i src/tailwind.css -o css/tailwind.css --minify
Write-Host "Xong: css/tailwind.css"
