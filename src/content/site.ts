/* =========================================================
   site.ts — TOÀN BỘ NỘI DUNG CHỮ của trang (song ngữ VI/EN)
   ---------------------------------------------------------
   • UI       : chữ giao diện (tiêu đề mục, footer, nút...)
   • TIMELINE : các mốc trong mục "Dấu Ấn Lịch Sử Làng Báo"
   • CONTACT  : thông tin liên hệ ở footer

   ⚠️ KHÔNG GIAN VR 360° KHÔNG nằm ở đây — chúng ở public/data/spaces.json
      (trang admin đọc/ghi file đó qua GitHub API).
   ========================================================= */

export type Lang = 'vi' | 'en';

export const UI = {
  vi: {
    histKicker: 'Dấu ấn',
    histTitle: 'Lịch sử làng báo',
    histSub: 'Khám phá dòng chảy báo chí Việt Nam gắn liền với vận mệnh dân tộc.',
    mapTitle1: 'Bản đồ &',
    mapTitle2: 'Trải nghiệm khám phá',
    mapSub: 'Khám phá khu di sản số - chọn một không gian để bước vào tour',
    floor1: 'Khu vực tầng 1',
    floor2: 'Khu vực tầng 2',
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
    logoLine: 'BẢO TÀNG BÁO CHÍ VIỆT NAM',
    heroW1: 'Bảo tàng', heroW2: 'Báo chí', heroW3: 'Việt Nam',
    heroSub: 'Tự hào trăm năm Báo chí Cách mạng Việt Nam giữ lửa ngòi bút',
  },
  en: {
    histKicker: 'Imprints of',
    histTitle: 'the Vietnamese press',
    histSub: "Trace the flow of Vietnam's journalism, bound to the destiny of the nation.",
    mapTitle1: 'Map &',
    mapTitle2: 'Discovery Experience',
    mapSub: 'Explore the digital heritage — choose a space to step into the tour',
    floor1: 'Floor 1 zones',
    floor2: 'Floor 2 zones',
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
    logoLine: 'VIETNAM PRESS MUSEUM',
    heroW1: 'Bảo tàng', heroW2: 'Báo chí', heroW3: 'Việt Nam',
    heroSub: "A proud century of Vietnam's revolutionary press, keeping the pen's flame alive.",
  },
} as const;

/* Thông tin liên hệ ở Footer */
export const CONTACT = {
  phone: '(024) 3782 1690',
  phoneHref: 'tel:+842437821690',
  website: 'baotangbaochi.vn',
  websiteHref: 'https://baotangbaochi.vn',
};

/* =========================================================
   DÒNG THỜI GIAN — kind: 'era' = mốc giai đoạn ; 'event' = mốc sự kiện
   ========================================================= */
export interface TimelineItem {
  kind: 'era' | 'event';
  year: string;
  vi: { t: string; d: string };
  en: { t: string; d: string };
}

export const TIMELINE: TimelineItem[] = [
  { kind:'era',   year:'1865 - 1925', vi:{t:'Thời Kỳ Sơ Khai', d:'Tái hiện bình minh của báo chí quốc ngữ với những tờ báo cổ quý hiếm và các hiện vật làm báo thô sơ thời đầu.'},
                                       en:{t:'The Formative Years', d:'Reviving the dawn of Vietnamese-language journalism with rare antique newspapers and the rudimentary tools of the early press.'} },
  { kind:'event', year:'1865',        vi:{t:'Bình minh Báo chí Quốc ngữ', d:'Sự ra đời của Gia Định Báo – tờ báo bằng chữ quốc ngữ đầu tiên, đánh dấu bước ngoặt khởi thủy của nền báo chí nước nhà.'},
                                       en:{t:'Dawn of the Quốc Ngữ Press', d:'The birth of Gia Định Báo — the first newspaper in the Vietnamese script, a founding turning point for the nation’s press.'} },
  { kind:'event', year:'21.06.1925',  vi:{t:'Khai sinh Báo chí Cách mạng Việt Nam', d:'Cột mốc vĩ đại khi Lãnh tụ Nguyễn Ái Quốc sáng lập báo Thanh Niên, cất lên tiếng nói đấu tranh giải phóng dân tộc.'},
                                       en:{t:'Birth of the Revolutionary Press', d:'The momentous founding of Thanh Niên newspaper by leader Nguyễn Ái Quốc, raising the voice of national liberation.'} },
  { kind:'era',   year:'1925 - 1945', vi:{t:'Tiếng Nói Cách Mạng', d:'Cột mốc ra đời của nền Báo chí Cách mạng Việt Nam, vinh danh hành trình làm báo kiên trung của các chiến sĩ tiền bối.'},
                                       en:{t:'The Voice of Revolution', d:'The rise of Vietnam’s revolutionary journalism, honouring the steadfast journey of pioneering reporter-soldiers.'} },
  { kind:'era',   year:'1945 - 1954', vi:{t:'Kháng Chiến Chống Pháp', d:'Bản hùng ca về “báo chí chiến khu” đồng hành cùng cuộc kháng chiến trường kỳ của dân tộc.'},
                                       en:{t:'Resistance Against France', d:'An epic of the “resistance-zone press” accompanying the nation’s long war of resistance.'} },
  { kind:'event', year:'1949',        vi:{t:'Thành lập Trường dạy làm báo đầu tiên mang tên Huỳnh Thúc Kháng', d:''},
                                       en:{t:'First School of Journalism', d:'The founding of the first journalism training school, named after Huỳnh Thúc Kháng.'} },
  { kind:'era',   year:'1954 - 1975', vi:{t:'Chống Mỹ Cứu Nước', d:'Thời kỳ oanh liệt của những “Nhà báo chiến trường” tại miền Bắc, miền Nam và các đô thị.'},
                                       en:{t:'The War Against America', d:'The heroic era of “battlefield journalists” across the North, the South and the cities.'} },
  { kind:'event', year:'1972',        vi:{t:'Tái hiện hầm kiên trung', d:'Nơi khai sinh ra cụm từ lịch sử “Điện Biên Phủ trên không”. Cùng với đó là câu chuyện về chiếc máy quay tự chế Ngựa Trời của thời kỳ đầu truyền hình và chiếc loa phóng thanh lịch sử bên cầu Hiền Lương.'},
                                       en:{t:'The Nhân Dân Bunker', d:'The resolute bunker of Nhân Dân newspaper — birthplace of the phrase “Điện Biên Phủ in the air” — with the home-made “Ngựa Trời” camera and the historic loudspeaker by Hiền Lương Bridge.'} },
  { kind:'event', year:'30.04.1975',  vi:{t:'Báo chí hân hoan ghi dấu ngày hội non sông thống nhất', d:''},
                                       en:{t:'The Day of Reunification', d:'The press joyfully records the day of national reunification.'} },
  { kind:'era',   year:'1975 - Nay',  vi:{t:'Đổi Mới & Hội Nhập', d:'Báo chí đồng hành cùng công cuộc xây dựng đất nước, tiên phong hội nhập và phát triển công nghệ số.'},
                                       en:{t:'Renewal & Integration', d:'Journalism accompanies nation-building, pioneering integration and the rise of digital technology.'} },
  { kind:'event', year:'1986',        vi:{t:'“Những việc cần làm ngay”', d:'Báo chí tạo sức bật mãnh liệt trong làn sóng Đổi mới, khơi nguồn từ chuyên mục nổi tiếng “Những việc cần làm ngay” của Tổng Bí thư Nguyễn Văn Linh.'},
                                       en:{t:'The Đổi Mới Surge', d:'The press creates powerful momentum in the Đổi Mới wave, sparked by the famous column “Những việc cần làm ngay” of General Secretary Nguyễn Văn Linh.'} },
  { kind:'event', year:'Hiện tại',    vi:{t:'Thời đại mới', d:'Báo chí luôn tiên phong trên mặt trận bảo vệ chủ quyền, chống tiêu cực và vươn mình mạnh mẽ trong kỷ nguyên công nghệ số đa nền tảng.'},
                                       en:{t:'Rising in the Digital Era', d:'Journalism stands at the forefront of defending sovereignty, fighting wrongdoing, and rising strongly in the multi-platform digital era.'} },
];
