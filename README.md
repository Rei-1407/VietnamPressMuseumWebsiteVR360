# Bảo tàng Báo chí Việt Nam — Trải nghiệm VR 360°

Landing page song ngữ (Việt / English) tích hợp tour **VR 360°** cho **Bảo tàng Báo chí
Việt Nam**: Hero *"Bút sắc · Lòng son · Tâm sáng"*, dòng thời gian 13 mốc, lưới không
gian di sản, trình xem panorama 360° (Pannellum), và **trang quản trị** để cập nhật
không gian VR ngay trên web.

- 🌐 **Web:** https://baotangsobaochivietnam.com
  *(dự phòng: https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/)*
- 🔐 **Admin:** https://baotangsobaochivietnam.com/admin/ — tài khoản `Chuyen`
- 📘 **Hướng dẫn vận hành (tiếng Việt):** [HUONG-DAN.md](HUONG-DAN.md)

> Trang xây bằng **Astro** (xuất HTML tĩnh) + **Tailwind CSS**, host **miễn phí trên
> GitHub Pages**. Push lên `main` là **GitHub Actions tự build & deploy** (~1–2 phút).

## Cấu trúc

```
src/
  content/site.ts        ⭐ TẤT CẢ chữ song ngữ (UI, TIMELINE, CONTACT)
  styles/tokens.css      ⭐ TẤT CẢ màu / gradient / bóng đổ / font (1 nguồn sự thật)
  styles/global.css      Tailwind + @font-face + base + utility chung
  layouts/Base.astro     Khung trang: <head>, song ngữ VI/EN, hiệu ứng reveal
  components/
    Header.astro         Logo + nav + toggle ngôn ngữ + nút VR
    Hero.astro           "101" + ngòi bút + headline + lưới 6 ô icon
    Timeline.astro       Dấu Ấn Lịch Sử Làng Báo (render từ site.ts)
    HeritageMap.astro    Bản đồ & thẻ không gian VR (render từ spaces.json lúc chạy)
    Footer.astro         Footer nâu 3 cột
    VRViewer.astro       Trình xem VR 360° (Pannellum) + modal
  pages/
    index.astro          Trang chính (ghép các component)
    admin.astro          Trang quản trị (/admin/)
  scripts/admin.js       Logic admin (đọc/ghi qua GitHub API)
public/                  Phục vụ nguyên văn tại web-root (không qua build)
  data/spaces.json       ⭐ Danh sách KHÔNG GIAN VR (admin đọc/ghi)
  assets/panos|exhibits|audio/   Ảnh 360°, ảnh hiện vật, audio phòng
  font/  CNAME  .nojekyll  favicon*
.github/workflows/deploy.yml    Build Astro + deploy Pages khi push main
scripts/deploy.ps1       Đăng thay đổi (khi sửa tay)
scripts/set-domain.ps1   Gắn / gỡ tên miền riêng
```

## Sửa giao diện / nội dung

| Muốn sửa gì | Sửa ở đâu |
|---|---|
| Chữ (song ngữ), dòng thời gian, liên hệ | `src/content/site.ts` |
| Màu sắc, gradient, font | `src/styles/tokens.css` |
| Bố cục từng phần | `src/components/*.astro` (HTML + CSS cùng chỗ) |
| Không gian VR (ảnh/điểm/audio) | trang **/admin/** (khuyên dùng) hoặc `public/data/spaces.json` |

Chạy thử ở máy: `npm install` (lần đầu) → `npm run dev` → mở http://localhost:4321.

## Cập nhật không gian VR

- **Cách 1 (khuyên dùng):** mở `/admin/` → đăng nhập → dán GitHub token →
  thêm/đổi/xoá ảnh, sửa tên & điểm chú thích → **Lưu**. Web tự build & cập nhật ~1–2 phút.
- **Cách 2:** sửa tay `public/data/spaces.json` rồi chạy `scripts\deploy.ps1`.

Chi tiết (kể cả cách tạo GitHub token) xem [HUONG-DAN.md](HUONG-DAN.md).

## Deploy

Push lên `main` → workflow `.github/workflows/deploy.yml` tự build (Astro) và deploy
GitHub Pages. **Settings → Pages → Source phải đặt là "GitHub Actions"** (làm 1 lần).

## Tên miền

`baotangsobaochivietnam.com` gắn qua `public/CNAME`. Cần trỏ DNS: 4 bản ghi **A**
(tên `@`) tới `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
`185.199.111.153`. DNS xong → bật **Enforce HTTPS** trong Settings → Pages.

## Công nghệ

**Astro 5** (HTML tĩnh) + **Tailwind CSS 3** + **Pannellum** (WebGL 360°, CDN) +
font Helvetica/Arroem (woff2 cục bộ). Trang admin dùng **GitHub REST API**
(token fine-grained, quyền *Contents: Read and write*) để lưu thay đổi.
