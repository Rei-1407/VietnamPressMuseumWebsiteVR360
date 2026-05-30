# Bảo tàng Báo chí Việt Nam — Trải nghiệm VR 360°

Landing page song ngữ (Việt / English) cho **Bảo tàng Báo chí Việt Nam**, tích hợp
tour **VR 360°** ngay trên web: Hero *"Bút sắc · Lòng son · Tâm sáng"*, dòng thời gian
13 mốc lịch sử báo chí, lưới 6 không gian di sản, và trình xem panorama 360°
(Pannellum) mở trong modal toàn màn hình.

- 🌐 **Web đang chạy:** https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/
- 📘 **Hướng dẫn vận hành (tiếng Việt):** [HUONG-DAN.md](HUONG-DAN.md)

> Trang là **HTML/CSS/JS tĩnh** (không cần build). Mọi đường dẫn đều **tương đối**,
> nên chạy được cả ở link GitHub Pages mặc định lẫn ở **tên miền riêng** mà **không
> phải sửa code**.

## Cấu trúc

```
index.html              Bố cục trang (Header + Hero)
js/
  data.js   ⭐ TOÀN BỘ NỘI DUNG cần sửa: chữ song ngữ (UI), dòng thời gian
              (TIMELINE), các không gian VR (SPACES), liên hệ (CONTACT)
  app.js       Dựng giao diện (timeline / lưới / footer) + i18n + hiệu ứng cuộn
  viewer.js    Trình xem VR 360° (Pannellum) — modal, hotspot, chuyển phòng
css/styles.css Màu sắc & kiểu dáng
assets/panos/  Ảnh 360° thật (sanh-ngoai.jpg, sanh-trong.jpg, ...)
scripts/
  deploy.ps1       Đăng thay đổi lên web (git add/commit/push)
  set-domain.ps1   Gắn / gỡ tên miền riêng
.nojekyll          Tắt xử lý Jekyll trên GitHub Pages
```

Sảnh đón dùng **ảnh 360° thật** (2 cảnh nối nhau qua "cửa"); 5 không gian còn lại
hiện tự dựng tạm bằng canvas — thay bằng ảnh thật bất cứ lúc nào (xem HUONG-DAN.md).

## Công việc thường gặp

| Việc | Làm gì |
|------|--------|
| Thêm / sửa không gian VR | Sửa mảng `SPACES` trong `js/data.js` + thả ảnh vào `assets/panos/` |
| Sửa chữ, dòng thời gian, liên hệ | Sửa `UI` / `TIMELINE` / `CONTACT` trong `js/data.js` |
| Đăng lên web | `powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1 "..."` |
| Gắn tên miền riêng | `powershell -ExecutionPolicy Bypass -File scripts\set-domain.ps1 tenmien.vn` |

## Triển khai (deploy)

Hosting **miễn phí bằng GitHub Pages**, kiểu *Deploy from a branch* (nhánh `main`,
thư mục gốc). Mỗi lần đẩy commit lên `main`, GitHub tự build lại — không cần CI.

## Công nghệ

HTML + **Tailwind CSS (CDN)** + **Pannellum** (WebGL 360°) + **Google Fonts**
(Playfair Display, EB Garamond, Be Vietnam Pro). Cần Internet khi chạy để tải
các thư viện qua CDN.

## Xem thử ở máy

```bash
python -m http.server 8080   # rồi mở http://localhost:8080
```
