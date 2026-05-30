# Bảo tàng Báo chí Việt Nam — Trải nghiệm VR 360°

Landing page song ngữ (Việt / English) cho **Bảo tàng Báo chí Việt Nam**, tích hợp
tour **VR 360°** ngay trên web. Trang gồm: Hero "Bút sắc · Lòng son · Tâm sáng",
dòng thời gian 13 mốc lịch sử báo chí, lưới 6 không gian di sản, và trình xem
panorama 360° (Pannellum) mở trong modal toàn màn hình.

> Đây là bản **preview cho khách hàng xem trước**. Tất cả đường dẫn trong code đều ở
> dạng **tương đối**, nên trang chạy được cả ở URL GitHub Pages mặc định lẫn ở một
> **tên miền riêng** mà **không cần sửa code**.

## Trang preview (live)

- **GitHub Pages:** https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/

Trang tự động deploy lại mỗi khi có commit mới vào nhánh `main`
(xem `.github/workflows/deploy.yml`).

## Cấu trúc dự án

```
.
├── index.html          # Trang Landing (Hero + Header)
├── vr360-app.js        # Dữ liệu + render Timeline / Lưới di sản / Footer + i18n VI–EN
├── vr360-viewer.js     # Trình xem VR 360° (Pannellum) — modal, hotspot, chuyển phòng
├── assets/
│   ├── pano-sanh.jpg        # Ảnh 360° thật: trước sảnh bảo tàng
│   └── pano-sanh-trong.jpg  # Ảnh 360° thật: trong sảnh đón
├── .nojekyll           # Tắt xử lý Jekyll trên GitHub Pages
└── .github/workflows/deploy.yml
```

Sảnh đón dùng **ảnh 360° thật** (2 cảnh nối nhau qua "cửa"); 5 không gian còn lại
hiện dùng panorama dựng tạm bằng canvas — chỉ cần thay bằng ảnh 360° thật khi có
(thêm `photo:'assets/ten-anh.jpg'` cho phòng tương ứng trong `vr360-viewer.js`).

## Công nghệ

Trang tĩnh thuần (không cần build): **HTML + Tailwind CSS (CDN)** +
**Pannellum** (WebGL 360°) + **Google Fonts** (Playfair Display, EB Garamond,
Be Vietnam Pro). Cần kết nối Internet khi chạy để tải các thư viện qua CDN.

## Xem thử ở máy (local)

Mở trực tiếp `index.html`, hoặc chạy một web server tĩnh để ảnh/asset tải đúng:

```bash
# Python
python -m http.server 8080
# rồi mở http://localhost:8080
```

## Đổi sang tên miền riêng (custom domain)

Khi đã có tên miền, làm theo 2 bước (KHÔNG cần sửa code vì đường dẫn đều tương đối):

**1) Cấu hình DNS** tại nhà cung cấp tên miền:

- **Tên miền con** (khuyến nghị, ví dụ `vr360.baotangbaochi.vn`):
  tạo bản ghi `CNAME` trỏ tới `rei-1407.github.io`.
- **Tên miền gốc / apex** (ví dụ `baotangbaochi.vn`): tạo 4 bản ghi `A` trỏ tới
  IP của GitHub Pages:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
  (Tuỳ chọn thêm `AAAA` cho IPv6: `2606:50c0:8000::153`, `...8001::153`,
  `...8002::153`, `...8003::153`.)

**2) Khai báo domain trên GitHub:** vào **Settings → Pages → Custom domain**, nhập
tên miền, lưu lại, rồi bật **Enforce HTTPS** (sau khi GitHub cấp chứng chỉ TLS, vài phút).

Sau khi DNS lan truyền, trang sẽ chạy tại tên miền riêng kèm HTTPS. Để quay lại
URL mặc định, chỉ cần xoá Custom domain trong Settings → Pages.
