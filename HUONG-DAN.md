# Hướng dẫn vận hành — Web VR 360° Bảo tàng Báo chí Việt Nam

Tài liệu dành cho người **không chuyên kỹ thuật**. Có **2 cách** cập nhật không gian VR:
**(1) dùng Trang Admin** trên web (khuyên dùng — không cần đụng tới code), hoặc
**(2) sửa tay** file `data/spaces.json`.

- 🌐 Web: **https://baotangsobaochivietnam.com** (và link dự phòng
  https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/)
- 🔐 Trang Admin: **https://baotangsobaochivietnam.com/admin/**
- 🗂️ Mã nguồn: https://github.com/Rei-1407/VietnamPressMuseumWebsiteVR360

---

## A. TRANG ADMIN (cách khuyên dùng)

### Đăng nhập
Mở **/admin/** → nhập tài khoản **`Chuyen`** / mật khẩu **`1234567890`**.

> ⚠️ Mật khẩu này chỉ là *lớp che nhẹ*. Quyền sửa thật sự được kiểm soát bằng
> **GitHub token** (xem dưới). Đừng đặt thông tin nhạy cảm ở đây.

### Lần đầu: dán GitHub token (chỉ làm 1 lần / máy)
Token cho phép admin lưu thay đổi vào kho mã. **Chỉ lưu trên máy bạn**, không gửi đi đâu khác.

1. Vào https://github.com/settings/personal-access-tokens/new (đăng nhập tài khoản **Rei-1407**).
2. **Repository access** → *Only select repositories* → chọn **VietnamPressMuseumWebsiteVR360**.
3. **Permissions → Repository permissions → Contents** → **Read and write**.
4. **Generate token** → sao chép chuỗi `github_pat_…` → bấm **Token** trên admin → dán → **Lưu token**.

### Các chức năng
- **➕ Thêm không gian:** chọn 1 ảnh 360° → tạo không gian mới (rồi sửa tên, chú thích).
- **⬆️ Đổi ảnh:** thay ảnh 360° cho một phòng/cảnh.
- **🗑 Xoá:** xoá cả không gian (ảnh của nó cũng được dọn khỏi kho khi lưu).
- **Sửa chữ:** tên thẻ, tên phòng (VI/EN), nhãn cảnh.
- **Điểm chú thích “i”:** thêm/xoá/sửa — `pitch` (lên/xuống −90…90), `yaw` (trái/phải −180…180).
- **Nút “cửa”:** đi xuyên giữa các cảnh (chỉ ở phòng nhiều cảnh như Sảnh đón).
- **💾 Lưu thay đổi:** ghi lại lên web. Sau ~1–2 phút web tự cập nhật (nhớ **Ctrl+F5**).

> Ảnh 360° nên là **equirectangular 2:1** (vd 8192×4096). Nén còn ~4000–8000px ngang
> để tải nhanh.

---

## B. Cách 2 — Sửa tay `data/spaces.json`

Mỗi không gian là một khối JSON. Có 3 kiểu nội dung 360°:
`scenes` (nhiều ảnh nối nhau) · `photo` (một ảnh thật) · `theme`+`exhibits` (dựng tạm).
Xem khối đầu tiên (Sảnh đón) và các khối sau làm mẫu. Sửa xong chạy
`scripts\deploy.ps1` để đăng.

---

## C. Cấu trúc dự án

```
index.html              Trang chính (Hero + Header)
admin/index.html           ⭐ Trang quản trị (login + sửa không gian)
data/spaces.json     ⭐ Danh sách KHÔNG GIAN VR (admin đọc/ghi file này)
js/
  data.js               Chữ giao diện (UI), dòng thời gian (TIMELINE), liên hệ
  app.js                Dựng giao diện + hiệu ứng
  viewer.js             Trình xem VR 360° (Pannellum)
  admin.js              Logic trang admin (GitHub API)
css/styles.css          Màu sắc & kiểu dáng
assets/panos/           Ảnh 360° thật
scripts/
  deploy.ps1            Đăng thay đổi (khi sửa tay)
  set-domain.ps1        Gắn / gỡ tên miền riêng
```

---

## D. Sửa chữ giao diện / dòng thời gian

Trong `js/data.js`: `UI` (chữ song ngữ, footer), `TIMELINE` (các mốc), `CONTACT`
(điện thoại/website). Sửa xong chạy `scripts\deploy.ps1`.

---

## E. Tên miền riêng

Tên miền **baotangsobaochivietnam.com** đã được gắn trên GitHub. Để truy cập được,
cần **trỏ DNS** tại nhà cung cấp tên miền — thêm **4 bản ghi A** (tên `@`):
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
Sau khi DNS lan truyền, vào GitHub → Settings → Pages bật **Enforce HTTPS**.

Gắn tên miền khác / gỡ: dùng `scripts\set-domain.ps1` (xem README).

---

## F. Đăng thay đổi & xem thử

- **Đăng (khi sửa tay):** `powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1 "mô tả"`
- **Xem thử ở máy:** `python -m http.server 8080` → mở `http://localhost:8080`
  (và `/admin/`). Cần Internet để tải Tailwind/Pannellum/phông chữ.
- Sau khi đăng, chờ ~1–2 phút và **Ctrl+F5** để thấy bản mới.
