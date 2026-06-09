# Hướng dẫn vận hành — Web VR 360° Bảo tàng Báo chí Việt Nam

Tài liệu dành cho người **không chuyên kỹ thuật**. Có **2 cách** cập nhật không gian VR:
**(1) dùng Trang Admin** trên web (khuyên dùng — không cần đụng tới code), hoặc
**(2) sửa tay** file `public/data/spaces.json`.

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
- **⬆️ Đổi ảnh:** thay ảnh 360° cho một phòng/cảnh. *(Khi tải ảnh 360°, hệ thống **tự nén** và **tự tạo ảnh thu nhỏ** cho thẻ — không cần làm thủ công.)*
- **🗑 Xoá:** xoá cả không gian (ảnh/audio của nó cũng được dọn khỏi kho khi lưu).
- **Sửa chữ:** tên thẻ, tên phòng (VI/EN), nhãn cảnh.
- **Điểm chú thích “i” + POPUP:** mỗi điểm có `pitch` (−90…90), `yaw` (−180…180), tiêu đề (VI/EN),
  và tuỳ chọn **➕ Ảnh** + **Mô tả chi tiết** (VI/EN). Khi khách **bấm vào điểm** trong 360° →
  bung **popup ảnh + mô tả**. (Ảnh hiện vật được tự nén nhỏ khi tải lên.)
- **🔊 Âm thanh phòng:** mỗi phòng có thể **tải 1 file audio (mp3)** — khách vào phòng là tự phát,
  có nút loa bật/tắt. Tích **“Lặp lại”** cho nhạc nền; bỏ tích nếu là thuyết minh đọc 1 lần.
- **Nút “cửa”:** đi xuyên giữa các cảnh (chỉ ở phòng nhiều cảnh như Sảnh đón).
- **💾 Lưu thay đổi:** ghi lại lên web. Sau ~1–2 phút web tự build & cập nhật (nhớ **Ctrl+F5**).

> Ảnh 360° nên là **equirectangular 2:1** (vd 8192×4096) — hệ thống tự nén. Audio nên **mp3 ~128kbps**
> (1 phút ≈ ~1MB). Ảnh được lưu ở `public/assets/panos/` & `public/assets/exhibits/`,
> audio ở `public/assets/audio/`.

---

## B. Cách 2 — Sửa tay `public/data/spaces.json`

Mỗi không gian là một khối JSON. Có 3 kiểu nội dung 360°:
`scenes` (nhiều ảnh nối nhau) · `photo` (một ảnh thật) · `theme`+`exhibits` (dựng tạm).
Xem khối đầu tiên (Sảnh đón) và các khối sau làm mẫu. Sửa xong chạy
`scripts\deploy.ps1` để đăng.

---

## C. Cấu trúc dự án (Astro)

```
src/content/site.ts        ⭐ Chữ giao diện (UI), dòng thời gian (TIMELINE), liên hệ
src/styles/tokens.css      ⭐ Màu sắc / gradient / font — sửa màu ở ĐÂY
src/components/*.astro     Từng phần giao diện (Header, Hero, Timeline, Bản đồ, Footer, VR)
src/pages/index.astro      Trang chính (ghép các phần)
src/pages/admin.astro      Trang quản trị (/admin/)
src/scripts/admin.js       Logic admin (GitHub API)
public/data/spaces.json    ⭐ Danh sách KHÔNG GIAN VR (admin đọc/ghi file này)
public/assets/panos/       Ảnh 360° thật
scripts/deploy.ps1         Đăng thay đổi (khi sửa tay)
scripts/set-domain.ps1     Gắn / gỡ tên miền riêng
```

---

## D. Sửa chữ giao diện / dòng thời gian

Trong `src/content/site.ts`: `UI` (chữ song ngữ, footer), `TIMELINE` (các mốc),
`CONTACT` (điện thoại/website). Muốn đổi **màu sắc** thì sửa `src/styles/tokens.css`.
Sửa xong chạy `scripts\deploy.ps1`.

---

## E. Tên miền riêng

Tên miền **baotangsobaochivietnam.com** đã được gắn (file `public/CNAME`). Để truy cập được,
cần **trỏ DNS** tại nhà cung cấp tên miền — thêm **4 bản ghi A** (tên `@`):
`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
Sau khi DNS lan truyền, vào GitHub → Settings → Pages bật **Enforce HTTPS**.

Gắn tên miền khác / gỡ: dùng `scripts\set-domain.ps1` (xem README).

---

## F. Đăng thay đổi & xem thử

- **Đăng (khi sửa tay):** `powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1 "mô tả"`
  → GitHub Actions tự build & deploy (~1–2 phút).
- **Xem thử ở máy:** cần cài [Node.js](https://nodejs.org). Lần đầu chạy `npm install`,
  sau đó `npm run dev` → mở `http://localhost:4321` (và `/admin`).
  Cần Internet để tải Pannellum (CDN).
- Sau khi đăng, chờ ~1–2 phút và **Ctrl+F5** để thấy bản mới.

> ⚙️ **Thiết lập 1 lần trên GitHub** (đã chuyển sang build bằng Actions):
> vào **Settings → Pages → Build and deployment → Source** chọn **GitHub Actions**.
