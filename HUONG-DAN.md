# Hướng dẫn vận hành — Web VR 360° Bảo tàng Báo chí Việt Nam

Tài liệu này dành cho người **không chuyên kỹ thuật**. Mọi nội dung của trang đều
nằm trong **một file duy nhất** là [`js/data.js`](js/data.js). Bạn chỉ cần sửa file
đó (và thả ảnh vào thư mục `assets/panos/`), rồi chạy 1 lệnh để đăng lên web.

- 🌐 Web đang chạy: **https://rei-1407.github.io/VietnamPressMuseumWebsiteVR360/**
- 🗂️ Mã nguồn: https://github.com/Rei-1407/VietnamPressMuseumWebsiteVR360

---

## 1. Cấu trúc dự án (cái gì nằm ở đâu)

```
index.html              Bố cục trang (Header + Hero). Hiếm khi phải sửa.
js/
  data.js   ⭐ SỬA Ở ĐÂY: chữ song ngữ, dòng thời gian, các không gian VR
  app.js       Dựng giao diện + hiệu ứng (không cần sửa)
  viewer.js    Trình xem VR 360° (không cần sửa)
css/
  styles.css   Màu sắc, kiểu dáng (chỉ sửa khi muốn đổi giao diện)
assets/
  panos/    ⭐ THẢ ẢNH 360° vào đây (sanh-ngoai.jpg, sanh-trong.jpg, ...)
scripts/
  deploy.ps1       Đăng thay đổi lên web (1 lệnh)
  set-domain.ps1   Gắn/gỡ tên miền riêng
```

> Quy tắc vàng: **chỉ sửa `js/data.js` và bỏ ảnh vào `assets/panos/`.** Hầu như
> không bao giờ phải động vào các file còn lại.

---

## 2. Đăng thay đổi lên web (làm sau mỗi lần sửa)

Mở **PowerShell** ngay trong thư mục dự án rồi chạy:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\deploy.ps1 "Mô tả ngắn việc vừa làm"
```

Xong! Web tự cập nhật sau **~1–2 phút**. (Bên trong, lệnh này chỉ làm 3 việc:
`git add` → `git commit` → `git push`. Ai quen Git có thể tự gõ.)

---

## 3. Thêm một KHÔNG GIAN VR mới

Mỗi "không gian" vừa là **một thẻ** ở mục *"Chạm Vào Di Sản"*, vừa là **một phòng**
trong tour VR. Có **3 cách** tạo nội dung 360°:

| Cách | Khi nào dùng | Khai báo |
|------|--------------|----------|
| **A** | Có **nhiều** ảnh 360° nối nhau (đi xuyên phòng) | `scenes: [...]` |
| **B** | Có **một** ảnh 360° thật | `photo: '...'` |
| **C** | **Chưa** có ảnh (hệ thống tự dựng phòng tạm) | `theme` + `exhibits` |

### Các bước (ví dụ cách B — một ảnh thật)

1. **Chụp/đổi tên ảnh 360°** dạng `.jpg` (ảnh phải là equirectangular tỉ lệ 2:1,
   ví dụ 8192×4096). Đặt tên không dấu, không khoảng trắng, ví dụ `gian-1865.jpg`.
2. **Thả ảnh** vào thư mục `assets/panos/`.
3. Mở `js/data.js`, tìm mảng `SPACES`, **thêm một khối** như sau (copy mẫu rồi sửa):

   ```js
   {
     card:  { vi:'Báo chí Việt Nam 1865 – 1925', en:'Vietnamese Press 1865 – 1925' },
     thumb: 'assets/panos/gian-1865.jpg',     // ảnh nền của thẻ
     tag:   { vi:'1865 – 1925', en:'1865 – 1925' },
     name:  { vi:'Gian 1865 – 1925', en:'Hall 1865 – 1925' },
     photo: 'assets/panos/gian-1865.jpg',     // ảnh 360° thật
     initYaw: 0, initPitch: -2,               // hướng nhìn ban đầu
     hotspots: [
       { pitch:0,  yaw:-30, vi:'Tờ Gia Định Báo', en:'Gia Định Báo' },
       { pitch:5,  yaw: 40, vi:'Máy in cổ',       en:'Antique press' },
     ],
   },
   ```

   - `pitch` = nhìn lên/xuống (−90…90, **0** = ngang tầm mắt)
   - `yaw`   = xoay trái/phải (−180…180, **0** = chính giữa ảnh)
   - Mỗi `hotspot` là một chấm "i" trên ảnh, di chuột vào hiện chú thích song ngữ.

4. Lưu file, rồi **đăng** (mục 2).

> 💡 Nếu **thay ảnh cho một phòng đang dựng tạm** (cách C → B): chỉ cần thả ảnh vào
> `assets/panos/`, rồi trong khối tương ứng **thêm dòng** `photo: 'assets/panos/ten-anh.jpg'`
> (và `thumb` nếu muốn ảnh hiện trên thẻ). Hệ thống sẽ tự ưu tiên ảnh thật.

### Cách A — nhiều cảnh nối nhau (như Sảnh đón hiện tại)

Xem ngay khối **số 0 (Sảnh đón)** trong `js/data.js` làm mẫu: có `scenes` gồm 2 ảnh,
mỗi cảnh có `hotspots` (chú thích) và `links` (nút "cửa" để đi sang cảnh khác —
trường `to` trỏ tới `id` của cảnh đích).

---

## 4. Sửa nội dung chữ

Tất cả trong `js/data.js`:

- **Chữ giao diện** (tiêu đề mục, nút, footer): sửa trong `UI` (có 2 phần `vi` và `en`).
- **Thông tin liên hệ** (điện thoại, website) ở footer: sửa trong `CONTACT`.
- **Dòng thời gian** (13 mốc): sửa/thêm/bớt trong `TIMELINE`. Bố cục trái–phải tự xen kẽ.
- **Tên thẻ & tên phòng VR**: sửa `card` / `name` của từng mục trong `SPACES`.

Chữ tiêu đề lớn ở đầu trang (Hero: *"Bút Sắc / Lòng Son / Tâm Sáng"*) nằm trong
`index.html` (thuộc tính `data-vi-text` / `data-en-text`).

---

## 5. Gắn TÊN MIỀN RIÊNG

Khi đã có tên miền, chạy **một lệnh** (KHÔNG cần sửa code):

```powershell
powershell -ExecutionPolicy Bypass -File scripts\set-domain.ps1 vr360.tenmien.vn
```

Sau đó vào trang quản trị tên miền để **trỏ DNS**:

- **Tên miền con** (vd `vr360.tenmien.vn`) → tạo bản ghi
  `CNAME` : `vr360` → `rei-1407.github.io`
- **Tên miền gốc** (vd `tenmien.vn`) → tạo 4 bản ghi `A` trỏ tới:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

Cuối cùng vào **GitHub → Settings → Pages**, đợi cấp chứng chỉ rồi bật **Enforce HTTPS**.

Muốn **gỡ** tên miền, quay lại link github.io:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\set-domain.ps1 -Remove
```

---

## 6. Xem thử ở máy trước khi đăng

Mở PowerShell trong thư mục dự án:

```powershell
python -m http.server 8080
```
Rồi mở trình duyệt vào `http://localhost:8080`. (Cần mạng Internet để tải Tailwind,
Pannellum và phông chữ Google.)

---

## 7. Lưu ý

- Tour VR cần **Internet** và trình duyệt hỗ trợ WebGL (Chrome/Edge/Firefox/Safari mới).
- Ảnh 360° nên là **equirectangular 2:1**. Ảnh quá lớn (>15MB) sẽ tải chậm — nên
  nén còn khoảng 4000–8000px chiều ngang.
- Sau mỗi lần `deploy`, chờ 1–2 phút và **tải lại trang (Ctrl+F5)** để thấy bản mới.
