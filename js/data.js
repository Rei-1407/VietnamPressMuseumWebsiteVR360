/* =========================================================
   data.js — NỘI DUNG GIAO DIỆN (chữ song ngữ, dòng thời gian, liên hệ)
   ---------------------------------------------------------
   • UI       : chữ giao diện song ngữ VI/EN (tiêu đề mục, footer, nút...)
   • TIMELINE : các mốc trong mục "Dấu Ấn Lịch Sử Làng Báo"
   • CONTACT  : thông tin liên hệ ở footer

   ⚠️ CÁC KHÔNG GIAN VR 360° KHÔNG còn nằm ở đây nữa — chúng được lưu trong
      data/spaces.json để TRANG ADMIN (admin.html) có thể đọc/sửa trực tiếp.
   ========================================================= */


/* =========================================================
   1) CHỮ GIAO DIỆN (song ngữ)
   ========================================================= */
const UI = {
  vi: {
    histKicker: 'Dấu ấn',
    histTitle: 'Lịch sử làng báo',
    histSub: 'Khám phá dòng chảy báo chí Việt Nam gắn liền với vận mệnh dân tộc.',
    mapTitle: 'Bản đồ &<br>Trải nghiệm khám phá',
    mapSub: 'Khám phá khu di sản số - chọn một không gian để bước vào tour',
    cta: 'Trải nghiệm VR 360°',
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
    histKicker: 'Imprints of',
    histTitle: 'the Vietnamese press',
    histSub: "Trace the flow of Vietnam's journalism, bound to the destiny of the nation.",
    mapTitle: 'Map &<br>Discovery Experience',
    mapSub: 'Explore the digital heritage — choose a space to step into the tour',
    cta: 'Experience VR 360°',
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

/* Thông tin liên hệ ở Footer */
const CONTACT = {
  phone: '(024) 3782 1690',
  phoneHref: 'tel:+842437821690',
  website: 'baotangbaochi.vn',
  websiteHref: 'https://baotangbaochi.vn',
};


/* =========================================================
   2) DÒNG THỜI GIAN  (mục "Dấu Ấn Lịch Sử Làng Báo")
   ---------------------------------------------------------
   kind: 'era' = mốc giai đoạn (tô vàng đậm) ; 'event' = mốc sự kiện
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
  { kind:'era',   year:'1945 – 1954', vi:{t:'Kháng Chiến Chống Pháp', d:'Bản hùng ca về “báo chí chiến khu” đồng hành cùng cuộc kháng chiến trường kỳ của dân tộc.'},
                                       en:{t:'Resistance Against France', d:'An epic of the “resistance-zone press” accompanying the nation’s long war of resistance.'} },
  { kind:'event', year:'1949',        vi:{t:'Trường dạy làm báo đầu tiên', d:'Thành lập Trường dạy làm báo đầu tiên mang tên Huỳnh Thúc Kháng.'},
                                       en:{t:'First School of Journalism', d:'The founding of the first journalism training school, named after Huỳnh Thúc Kháng.'} },
  { kind:'event', year:'1954',        vi:{t:'Đồng hành cùng tiền tuyến', d:'Khám phá tòa soạn báo tiền phương “độc nhất vô nhị” của Báo Quân đội Nhân dân hoạt động ngay tại Đồi Ngựa Hí giữa mặt trận Điện Biên Phủ khốc liệt.'},
                                       en:{t:'Alongside the Frontline', d:'Discover the one-of-a-kind forward newsroom of the People’s Army Newspaper, operating right at Đồi Ngựa Hí amid the fierce Điện Biên Phủ campaign.'} },
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

/* CÁC KHÔNG GIAN VR 360° → xem data/spaces.json (sửa qua admin.html) */
