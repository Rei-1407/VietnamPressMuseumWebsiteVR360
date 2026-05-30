/* =========================================================
   data.js — NỘI DUNG TRANG (chỉ cần sửa DUY NHẤT file này)
   ---------------------------------------------------------
   1) UI       : chữ giao diện song ngữ VI/EN (tiêu đề mục, footer, nút...)
   2) TIMELINE : các mốc trong mục "Dấu Ấn Lịch Sử Làng Báo"
   3) SPACES   : các KHÔNG GIAN VR 360° — mỗi mục vừa là 1 thẻ ở lưới
                 "Chạm Vào Di Sản", vừa là 1 phòng trong tour VR.

   Sửa xong → chạy  scripts\deploy.ps1  (hoặc commit + push) là web tự cập nhật.
   Hướng dẫn chi tiết: xem file HUONG-DAN.md
   ========================================================= */


/* =========================================================
   1) CHỮ GIAO DIỆN (song ngữ)
   ========================================================= */
const UI = {
  vi: {
    histEyebrow: 'Dòng chảy lịch sử',
    histTitle: 'Dấu Ấn Lịch Sử Làng Báo',
    histSub: 'Khám phá dòng chảy báo chí Việt Nam gắn liền với vận mệnh dân tộc.',
    mapEyebrow: 'Không gian trải nghiệm',
    mapTitle: 'Chạm Vào Di Sản',
    mapSub: 'Sáu phân khu di sản số — chọn một không gian để bước vào tour VR 360°.',
    cta: 'Khám phá Tour VR 360° ngay',
    hover360: 'Khám phá',
    ftTagline: 'Ngôi nhà di sản của những người làm báo Việt Nam.',
    ftAddrLabel: 'Địa chỉ',
    ftAddr: 'Tòa nhà Hội Nhà báo Việt Nam, Phố Dương Đình Nghệ, Cầu Giấy, Hà Nội',
    ftPhoneLabel: 'Điện thoại',
    ftWebLabel: 'Website',
    ftNav: 'Điều hướng',
    ftRights: '© 2026 Bảo tàng Báo chí Việt Nam. Trải nghiệm VR 360°.',
    nHome: 'Trang chủ', nHist: 'Lịch sử', nMap: 'Bản đồ', nContact: 'Liên hệ',
  },
  en: {
    histEyebrow: 'The current of history',
    histTitle: 'Milestones of the Vietnamese Press',
    histSub: "Trace the flow of Vietnam's journalism, bound to the destiny of the nation.",
    mapEyebrow: 'Spaces to explore',
    mapTitle: 'Touch the Heritage',
    mapSub: 'Six digital heritage zones — choose a space to step into the VR 360° tour.',
    cta: 'Explore the VR 360° Tour now',
    hover360: 'Explore',
    ftTagline: "The heritage home of Vietnam's journalists.",
    ftAddrLabel: 'Address',
    ftAddr: 'Vietnam Journalists Association Bldg, Dương Đình Nghệ St., Cầu Giấy, Hà Nội',
    ftPhoneLabel: 'Phone',
    ftWebLabel: 'Website',
    ftNav: 'Navigation',
    ftRights: '© 2026 Vietnam Press Museum. VR 360° Experience.',
    nHome: 'Home', nHist: 'History', nMap: 'Map', nContact: 'Contact',
  }
};

/* Thông tin liên hệ ở Footer (sửa trực tiếp tại đây nếu cần) */
const CONTACT = {
  phone: '(024) 3782 1690',
  phoneHref: 'tel:+842437821690',
  website: 'baotangbaochi.vn',
  websiteHref: 'https://baotangbaochi.vn',
};


/* =========================================================
   2) DÒNG THỜI GIAN  (mục "Dấu Ấn Lịch Sử Làng Báo")
   ---------------------------------------------------------
   kind: 'era'   = mốc giai đoạn (tô vàng đậm)
         'event' = mốc sự kiện
   Thêm/bớt/sửa thoải mái — bố cục trái–phải tự xen kẽ theo thứ tự.
   ========================================================= */
const TIMELINE = [
  { kind:'era',   year:'1865 – 1925', vi:{t:'Thời Kỳ Sơ Khai', d:'Tái hiện bình minh của báo chí quốc ngữ với những tờ báo cổ quý hiếm và các hiện vật làm báo thô sơ thời đầu.'},
                                       en:{t:'The Formative Years', d:'Reviving the dawn of Vietnamese-language journalism with rare antique newspapers and the rudimentary tools of the early press.'} },
  { kind:'event', year:'1865',        vi:{t:'Bình minh Báo chí Quốc ngữ', d:'Sự ra đời của Gia Định Báo – tờ báo bằng chữ quốc ngữ đầu tiên, đánh dấu bước ngoặt khởi thủy của nền báo chí nước nhà.'},
                                       en:{t:'Dawn of the Quốc Ngữ Press', d:'The birth of Gia Định Báo — the first newspaper in the Vietnamese script, a founding turning point for the nation’s press.'} },
  { kind:'event', year:'21·06·1925',  vi:{t:'Khai sinh Báo chí Cách mạng Việt Nam', d:'Cột mốc vĩ đại khi Lãnh tụ Nguyễn Ái Quốc sáng lập báo Thanh Niên, cất lên tiếng nói đấu tranh giải phóng dân tộc.'},
                                       en:{t:'Birth of the Revolutionary Press', d:'The momentous founding of Thanh Niên newspaper by leader Nguyễn Ái Quốc, raising the voice of national liberation.'} },
  { kind:'era',   year:'1925 – 1945', vi:{t:'Tiếng Nói Cách Mạng', d:'Cột mốc ra đời của nền Báo chí Cách mạng Việt Nam, vinh danh hành trình làm báo kiên trung của các chiến sĩ tiền bối.'},
                                       en:{t:'The Voice of Revolution', d:'The rise of Vietnam’s revolutionary journalism, honouring the steadfast journey of pioneering reporter-soldiers.'} },
  { kind:'event', year:'1949',        vi:{t:'Trường dạy làm báo đầu tiên', d:'Thành lập Trường dạy làm báo đầu tiên mang tên Huỳnh Thúc Kháng.'},
                                       en:{t:'First School of Journalism', d:'The founding of the first journalism training school, named after Huỳnh Thúc Kháng.'} },
  { kind:'event', year:'1954',        vi:{t:'Đồng hành cùng tiền tuyến', d:'Khám phá tòa soạn báo tiền phương “độc nhất vô nhị” của Báo Quân đội Nhân dân hoạt động ngay tại Đồi Ngựa Hí giữa mặt trận Điện Biên Phủ khốc liệt.'},
                                       en:{t:'Alongside the Frontline', d:'Discover the one-of-a-kind forward newsroom of the People’s Army Newspaper, operating right at Đồi Ngựa Hí amid the fierce Điện Biên Phủ campaign.'} },
  { kind:'era',   year:'1945 – 1954', vi:{t:'Kháng Chiến Chống Pháp', d:'Bản hùng ca về “báo chí chiến khu” đồng hành cùng cuộc kháng chiến trường kỳ của dân tộc.'},
                                       en:{t:'Resistance Against France', d:'An epic of the “resistance-zone press” accompanying the nation’s long war of resistance.'} },
  { kind:'era',   year:'1954 – 1975', vi:{t:'Chống Mỹ Cứu Nước', d:'Thời kỳ oanh liệt của những “Nhà báo chiến trường” tại miền Bắc, miền Nam và các đô thị.'},
                                       en:{t:'The War Against America', d:'The heroic era of “battlefield journalists” across the North, the South and the cities.'} },
  { kind:'event', year:'1972',        vi:{t:'Căn hầm Báo Nhân Dân', d:'Tái hiện căn hầm kiên trung của Báo Nhân Dân – nơi khai sinh cụm từ lịch sử “Điện Biên Phủ trên không”, cùng chiếc máy quay tự chế Ngựa Trời và chiếc loa phóng thanh bên cầu Hiền Lương.'},
                                       en:{t:'The Nhân Dân Bunker', d:'The resolute bunker of Nhân Dân newspaper — birthplace of the phrase “Điện Biên Phủ in the air” — with the home-made “Ngựa Trời” camera and the historic loudspeaker by Hiền Lương Bridge.'} },
  { kind:'event', year:'30·04·1975',  vi:{t:'Ngày hội non sông thống nhất', d:'Báo chí hân hoan ghi dấu ngày hội non sông thống nhất.'},
                                       en:{t:'The Day of Reunification', d:'The press joyfully records the day of national reunification.'} },
  { kind:'era',   year:'1975 – Nay',  vi:{t:'Đổi Mới & Hội Nhập', d:'Báo chí đồng hành cùng công cuộc xây dựng đất nước, tiên phong hội nhập và phát triển công nghệ số.'},
                                       en:{t:'Renewal & Integration', d:'Journalism accompanies nation-building, pioneering integration and the rise of digital technology.'} },
  { kind:'event', year:'1986',        vi:{t:'Sức bật Đổi Mới', d:'Báo chí tạo sức bật mãnh liệt trong làn sóng Đổi mới, khơi nguồn từ chuyên mục nổi tiếng “Những việc cần làm ngay” của Tổng Bí thư Nguyễn Văn Linh.'},
                                       en:{t:'The Đổi Mới Surge', d:'The press creates powerful momentum in the Đổi Mới wave, sparked by the famous column “Những việc cần làm ngay” of General Secretary Nguyễn Văn Linh.'} },
  { kind:'event', year:'Hiện tại',    vi:{t:'Vươn mình trong kỷ nguyên số', d:'Báo chí tiên phong trên mặt trận bảo vệ chủ quyền, chống tiêu cực và vươn mình mạnh mẽ trong kỷ nguyên công nghệ số đa nền tảng.'},
                                       en:{t:'Rising in the Digital Era', d:'Journalism stands at the forefront of defending sovereignty, fighting wrongdoing, and rising strongly in the multi-platform digital era.'} },
];


/* =========================================================
   3) CÁC KHÔNG GIAN VR 360°
   ---------------------------------------------------------
   Mỗi phần tử trong SPACES = 1 thẻ ở lưới + 1 phòng trong tour VR.
   Thứ tự trong mảng = thứ tự thẻ hiển thị và thứ tự chuyển phòng.

   CÁC TRƯỜNG CHUNG:
     card  : { vi, en }  — tên hiển thị trên THẺ ở lưới  (bắt buộc)
     thumb : 'assets/panos/xxx.jpg' — ảnh nền của thẻ (tuỳ chọn;
             bỏ trống → dùng nền gradient vàng mặc định)
     tag   : { vi, en }  — nhãn nhỏ phía trên tiêu đề trong trình xem VR
     name  : { vi, en }  — tên lớn trong trình xem VR (tuỳ chọn; mặc định lấy card)

   CHỌN 1 TRONG 3 CÁCH tạo nội dung 360°:
     (A) NHIỀU ảnh nối nhau   → dùng  scenes: [ ... ]
     (B) MỘT ảnh 360° thật    → dùng  photo: '...'  (+ hotspots)
     (C) CHƯA có ảnh (dựng tạm) → dùng  theme + exhibits

   GHI CHÚ toạ độ hotspot/cửa:
     pitch = nhìn lên/xuống  (-90 … 90,  0 = ngang tầm mắt)
     yaw   = xoay trái/phải  (-180 … 180, 0 = chính giữa ảnh)

   ----------------------------------------------------------------
   MẪU THÊM 1 KHÔNG GIAN MỚI bằng ảnh 360° thật (copy & sửa):

     {
       card:  { vi:'Tên thẻ tiếng Việt', en:'Card title' },
       thumb: 'assets/panos/ten-anh.jpg',
       tag:   { vi:'Nhãn nhỏ', en:'Label' },
       name:  { vi:'Tên phòng', en:'Room name' },
       photo: 'assets/panos/ten-anh.jpg',
       initYaw: 0, initPitch: -2,
       hotspots: [
         { pitch:0, yaw:-30, vi:'Chú thích điểm 1', en:'Caption 1' },
         { pitch:5, yaw: 40, vi:'Chú thích điểm 2', en:'Caption 2' },
       ],
     },
   ----------------------------------------------------------------
   ========================================================= */
const SPACES = [

  /* ---- 0 · SẢNH ĐÓN — dùng ẢNH 360° THẬT, 2 cảnh nối nhau (cách A) ---- */
  {
    card:  { vi:'Gian Khánh Tiết',  en:'The Hall of Welcome' },
    thumb: 'assets/panos/sanh-ngoai.jpg',
    tag:   { vi:'Sảnh đón',          en:'Lobby' },
    name:  { vi:'Sảnh đón Bảo tàng', en:'The Museum Lobby' },
    scenes: [
      { id:'sanh-ngoai', photo:'assets/panos/sanh-ngoai.jpg', yaw:0, pitch:-2,
        label:{ vi:'Trước sảnh', en:'Forecourt' },
        hotspots:[
          { pitch:5,  yaw:-44,  vi:'Biểu tượng “Bảo tàng Báo chí Việt Nam”', en:'“Vietnam Press Museum” emblem' },
          { pitch:7,  yaw:38,   vi:'Trưng bày “Hoa Xuân Dâng Đảng” · Xuân 2026', en:'“Spring Blossoms to the Party” · 2026' },
          { pitch:2,  yaw:120,  vi:'Phù điêu cột · chiến sĩ cầm bút', en:'Column relief · the reporter-soldier' },
          { pitch:0,  yaw:-120, vi:'Cột tranh cổ động · 1976', en:'Propaganda column · 1976' },
        ],
        links:[
          { pitch:-6, yaw:0, to:'sanh-trong', vi:'Bước vào trong sảnh', en:'Step inside the lobby' },
        ]},
      { id:'sanh-trong', photo:'assets/panos/sanh-trong.jpg', yaw:25, pitch:-2,
        label:{ vi:'Trong sảnh', en:'Interior' },
        hotspots:[
          { pitch:7,  yaw:25,  vi:'Biển “Bảo tàng Báo chí Việt Nam”', en:'“Vietnam Press Museum” sign' },
          { pitch:40, yaw:90,  vi:'Cờ Đảng & cờ Tổ quốc trang trí trần sảnh', en:'Party & national flags on the ceiling' },
          { pitch:-8, yaw:33,  vi:'Thảm đỏ dẫn vào khu trưng bày', en:'Red carpet to the exhibition wing' },
          { pitch:-2, yaw:60,  vi:'Cầu thang lên các tầng trưng bày', en:'Stairs to the exhibition floors' },
          { pitch:-6, yaw:78,  vi:'Quầy lễ tân & vé tham quan', en:'Reception & ticket desk' },
          { pitch:-2, yaw:135, vi:'Thang máy tham quan', en:'Visitor elevators' },
        ],
        links:[
          { pitch:-6, yaw:-50, to:'sanh-ngoai', vi:'Quay ra trước sảnh', en:'Back to the forecourt' },
        ]},
    ],
  },

  /* ---- 1 · 1865–1925 — CHƯA có ảnh, tự dựng không gian (cách C) ---- */
  {
    card:  { vi:'Báo chí Việt Nam 1865 – 1925', en:'Vietnamese Press 1865 – 1925' },
    tag:   { vi:'1865 – 1925', en:'1865 – 1925' },
    theme: { wall:'#6B5836', wall2:'#4C3D24', floor:'#352b18', ceil:'#241d10' },
    exhibits: [
      { vi:'Gia Định Báo · 1865',    en:'Gia Định Báo · 1865' },
      { vi:'Nông Cổ Mín Đàm · 1901', en:'Nông Cổ Mín Đàm · 1901' },
      { vi:'Đông Dương Tạp Chí',     en:'Đông Dương Review' },
      { vi:'Tạp chí Nam Phong',      en:'Nam Phong Journal' },
      { vi:'Nghiên bút & con chữ',   en:'Ink Stone & Movable Type' },
      { vi:'Nhà in thuở sơ khai',    en:'The Early Print House' },
    ],
  },

  /* ---- 2 · 1925–1945 ---- */
  {
    card:  { vi:'Báo chí Việt Nam 1925 – 1945', en:'Vietnamese Press 1925 – 1945' },
    tag:   { vi:'1925 – 1945', en:'1925 – 1945' },
    theme: { wall:'#5E2A24', wall2:'#421810', floor:'#341512', ceil:'#22100b' },
    exhibits: [
      { vi:'Báo Thanh Niên · 1925', en:'Thanh Niên · 1925' },
      { vi:'Báo Búa Liềm · 1929',   en:'Búa Liềm · 1929' },
      { vi:'Báo Dân Chúng · 1938',  en:'Dân Chúng · 1938' },
      { vi:'Những trang in bí mật', en:'Clandestine Pages' },
      { vi:'Nhà tù & ngòi bút',     en:'Prison & Pen' },
      { vi:'Cờ giải phóng',         en:'The Liberation Flag' },
    ],
  },

  /* ---- 3 · 1945–1954 ---- */
  {
    card:  { vi:'Báo chí Việt Nam 1945 – 1954', en:'Vietnamese Press 1945 – 1954' },
    tag:   { vi:'1945 – 1954', en:'1945 – 1954' },
    theme: { wall:'#3F4A30', wall2:'#2A331F', floor:'#262e1a', ceil:'#1b2011' },
    exhibits: [
      { vi:'Báo Cứu Quốc',             en:'Cứu Quốc Newspaper' },
      { vi:'Báo Sự Thật',              en:'Sự Thật Newspaper' },
      { vi:'Báo Quân đội ND · 1950',   en:"People's Army Daily · 1950" },
      { vi:'Trường dạy làm báo · 1949',en:'Journalism School · 1949' },
      { vi:'Tòa soạn tiền phương',     en:'The Frontline Newsroom' },
      { vi:'Chiến thắng Điện Biên',    en:'Điện Biên Phủ Victory' },
    ],
  },

  /* ---- 4 · 1954–1975 ---- */
  {
    card:  { vi:'Báo chí Việt Nam 1954 – 1975', en:'Vietnamese Press 1954 – 1975' },
    tag:   { vi:'1954 – 1975', en:'1954 – 1975' },
    theme: { wall:'#5A2420', wall2:'#3A130E', floor:'#2f1310', ceil:'#1f0d0a' },
    exhibits: [
      { vi:'Căn hầm Báo Nhân Dân',      en:'The Nhân Dân Bunker' },
      { vi:'Máy quay “Ngựa Trời”',      en:'The “Ngựa Trời” Camera' },
      { vi:'Loa phóng thanh Hiền Lương',en:'Hiền Lương Loudspeaker' },
      { vi:'Nhà báo chiến trường',      en:'Battlefield Reporters' },
      { vi:'“Điện Biên Phủ trên không”',en:'“Điện Biên Phủ in the Air”' },
      { vi:'Ngày 30·04·1975',           en:'30 April 1975' },
    ],
  },

  /* ---- 5 · 1975–Nay ---- */
  {
    card:  { vi:'Báo chí Việt Nam 1975 – Nay', en:'Vietnamese Press 1975 – Today' },
    tag:   { vi:'1975 – Nay', en:'1975 – Today' },
    theme: { wall:'#264A4A', wall2:'#173130', floor:'#152b2a', ceil:'#0e1f1e' },
    exhibits: [
      { vi:'Sức bật Đổi Mới · 1986',  en:'The Đổi Mới Surge · 1986' },
      { vi:'“Những việc cần làm ngay”',en:'“Things To Do Now”' },
      { vi:'Báo điện tử',             en:'The Online Press' },
      { vi:'Phát thanh – Truyền hình',en:'Radio & Television' },
      { vi:'Kỷ nguyên số đa nền tảng',en:'The Multi-Platform Era' },
      { vi:'Hội nhập quốc tế',        en:'Global Integration' },
    ],
  },

];
