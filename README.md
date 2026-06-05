# Bảo tàng Báo chí Việt Nam — Trải nghiệm VR 360°

Landing page song ngữ (Việt / English) tích hợp tour **VR 360°** cho **Bảo tàng Báo chí
Việt Nam**: Hero *"Bút sắc · Lòng son · Tâm sáng"*, dòng thời gian 13 mốc, lưới 6 không
gian di sản, trình xem panorama 360° (Pannellum), và **trang quản trị** để cập nhật
không gian VR ngay trên web.

- 🌐 **Web:** https://baotangsobaochivietnam.com
  *(dự phòng: https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/)*
- 🔐 **Admin:** https://baotangsobaochivietnam.com/admin/ — tài khoản `Chuyen`
- 📘 **Hướng dẫn vận hành (tiếng Việt):** [HUONG-DAN.md](HUONG-DAN.md)

> Trang **HTML/CSS/JS tĩnh** (không cần build), host **miễn phí trên GitHub Pages**
> (deploy-from-branch). Mọi đường dẫn đều **tương đối** nên chạy được cả ở github.io
> lẫn tên miền riêng.

## Cấu trúc

```
index.html              Trang chính (Hero + Header)
admin/index.html              Trang quản trị (login + sửa không gian VR)
data/spaces.json     ⭐ Danh sách KHÔNG GIAN VR (admin đọc/ghi)
js/
  data.js               UI song ngữ + TIMELINE + CONTACT
  app.js                Dựng giao diện + i18n + hiệu ứng (tải spaces.json)
  viewer.js             Trình xem VR 360° (Pannellum)
  admin.js              Logic admin (đọc/ghi qua GitHub API)
css/styles.css          Màu sắc & kiểu dáng
assets/panos/           Ảnh 360° thật
scripts/deploy.ps1      Đăng thay đổi (khi sửa tay)
scripts/set-domain.ps1  Gắn / gỡ tên miền riêng
CNAME                   Tên miền riêng (baotangsobaochivietnam.com)
```

## Cập nhật không gian VR

- **Cách 1 (khuyên dùng):** mở `/admin/` → đăng nhập → dán GitHub token →
  thêm/đổi/xoá ảnh, sửa tên & điểm chú thích → **Lưu**. Web tự cập nhật ~1–2 phút.
- **Cách 2:** sửa tay `data/spaces.json` rồi chạy `scripts\deploy.ps1`.

Chi tiết (kể cả cách tạo GitHub token) xem [HUONG-DAN.md](HUONG-DAN.md).

## Tên miền

`baotangsobaochivietnam.com` đã gắn trên GitHub (file `CNAME`). Cần trỏ DNS: 4 bản
ghi **A** (tên `@`) tới `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
`185.199.111.153`. DNS xong → bật **Enforce HTTPS** trong Settings → Pages.

## Công nghệ

HTML + **Tailwind CSS (CDN)** + **Pannellum** (WebGL 360°) + **Google Fonts**.
Cần Internet khi chạy để tải thư viện qua CDN. Trang admin dùng **GitHub REST API**
(token fine-grained, quyền *Contents: Read and write*) để lưu thay đổi.
