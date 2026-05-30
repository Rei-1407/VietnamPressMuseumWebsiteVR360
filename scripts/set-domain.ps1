<#
  set-domain.ps1 — Gắn (hoặc gỡ) TÊN MIỀN RIÊNG cho trang GitHub Pages.

  GẮN tên miền:
      powershell -ExecutionPolicy Bypass -File scripts\set-domain.ps1 vr360.tenmien.vn
  GỠ tên miền (quay lại link github.io):
      powershell -ExecutionPolicy Bypass -File scripts\set-domain.ps1 -Remove

  Script chỉ lo PHẦN GITHUB (tạo file CNAME + đẩy lên). Phần DNS bạn trỏ ở
  trang quản trị tên miền theo hướng dẫn in ra cuối lệnh.
#>
param(
  [Parameter(Position = 0)][string]$Domain,
  [switch]$Remove
)

$ErrorActionPreference = "Stop"
$root  = Split-Path $PSScriptRoot -Parent
Set-Location $root
$cname = Join-Path $root "CNAME"

if ($Remove) {
  if (Test-Path $cname) { Remove-Item $cname -Force }
  git add -A
  git commit -m "Remove custom domain"
  git push
  Write-Host "Da go ten mien. Trang quay lai:" -ForegroundColor Green
  Write-Host "  https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/"
  exit 0
}

if ([string]::IsNullOrWhiteSpace($Domain)) {
  Write-Host "Thieu ten mien. Vi du: scripts\set-domain.ps1 vr360.tenmien.vn" -ForegroundColor Yellow
  exit 1
}

# chuẩn hoá: bỏ http(s):// và đường dẫn, viết thường
$Domain = ($Domain.Trim().ToLower() -replace '^https?://', '') -replace '/.*$', ''

# ghi file CNAME (UTF-8 không BOM, đúng yêu cầu của GitHub Pages)
[System.IO.File]::WriteAllText($cname, $Domain)

git add CNAME
git commit -m "Set custom domain: $Domain"
git push

Write-Host ""
Write-Host "Da khai bao ten mien '$Domain' tren GitHub." -ForegroundColor Green
Write-Host ""
Write-Host "VIEC CON LAI - tro DNS tai nha cung cap ten mien:" -ForegroundColor Cyan
Write-Host "  - Neu la TEN MIEN CON (vd vr360.tenmien.vn):"
Write-Host "        Loai: CNAME   Ten: vr360   Tro toi: rei-1407.github.io"
Write-Host "  - Neu la TEN MIEN GOC (vd tenmien.vn): tao 4 ban ghi A tro toi:"
Write-Host "        185.199.108.153"
Write-Host "        185.199.109.153"
Write-Host "        185.199.110.153"
Write-Host "        185.199.111.153"
Write-Host ""
Write-Host "Sau khi DNS cap nhat (vai phut den vai gio): vao GitHub > Settings >"
Write-Host "Pages, cho cap chung chi va bat 'Enforce HTTPS'."
