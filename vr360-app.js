/* =========================================================
   Bảo tàng Báo chí VN — VR360 Landing
   Data + render (timeline, heritage grid, footer) + scroll FX
   ========================================================= */

/* ---------- i18n strings ---------- */
const I18N = {
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
    nHome:'Trang chủ', nHist:'Lịch sử', nMap:'Bản đồ', nContact:'Liên hệ',
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
    nHome:'Home', nHist:'History', nMap:'Map', nContact:'Contact',
  }
};

/* ---------- Timeline milestones ---------- */
const TIMELINE = [
  { kind:'era',   year:'1865 – 1925', vi:{t:'Thời Kỳ Sơ Khai', d:'Tái hiện bình minh của báo chí quốc ngữ với những tờ báo cổ quý hiếm và các hiện vật làm báo thô sơ thời đầu.'},
                                       en:{t:'The Formative Years', d:'Reviving the dawn of Vietnamese-language journalism with rare antique newspapers and the rudimentary tools of the early press.'} },
  { kind:'event', year:'1865',        vi:{t:'Bình minh Báo chí Quốc ngữ', d:'Sự ra đời của Gia Định Báo – tờ báo bằng chữ quốc ngữ đầu tiên, đánh dấu bước ngoặt khởi thủy của nền báo chí nước nhà.'},
                                       en:{t:'Dawn of the Quốc Ngữ Press', d:'The birth of Gia Định Báo — the first newspaper in the Vietnamese script, a founding turning point for the nation\u2019s press.'} },
  { kind:'event', year:'21·06·1925',  vi:{t:'Khai sinh Báo chí Cách mạng Việt Nam', d:'Cột mốc vĩ đại khi Lãnh tụ Nguyễn Ái Quốc sáng lập báo Thanh Niên, cất lên tiếng nói đấu tranh giải phóng dân tộc.'},
                                       en:{t:'Birth of the Revolutionary Press', d:'The momentous founding of Thanh Niên newspaper by leader Nguyễn Ái Quốc, raising the voice of national liberation.'} },
  { kind:'era',   year:'1925 – 1945', vi:{t:'Tiếng Nói Cách Mạng', d:'Cột mốc ra đời của nền Báo chí Cách mạng Việt Nam, vinh danh hành trình làm báo kiên trung của các chiến sĩ tiền bối.'},
                                       en:{t:'The Voice of Revolution', d:'The rise of Vietnam\u2019s revolutionary journalism, honouring the steadfast journey of pioneering reporter-soldiers.'} },
  { kind:'event', year:'1949',        vi:{t:'Trường dạy làm báo đầu tiên', d:'Thành lập Trường dạy làm báo đầu tiên mang tên Huỳnh Thúc Kháng.'},
                                       en:{t:'First School of Journalism', d:'The founding of the first journalism training school, named after Huỳnh Thúc Kháng.'} },
  { kind:'event', year:'1954',        vi:{t:'Đồng hành cùng tiền tuyến', d:'Khám phá tòa soạn báo tiền phương “độc nhất vô nhị” của Báo Quân đội Nhân dân hoạt động ngay tại Đồi Ngựa Hí giữa mặt trận Điện Biên Phủ khốc liệt.'},
                                       en:{t:'Alongside the Frontline', d:'Discover the one-of-a-kind forward newsroom of the People\u2019s Army Newspaper, operating right at Đồi Ngựa Hí amid the fierce Điện Biên Phủ campaign.'} },
  { kind:'era',   year:'1945 – 1954', vi:{t:'Kháng Chiến Chống Pháp', d:'Bản hùng ca về “báo chí chiến khu” đồng hành cùng cuộc kháng chiến trường kỳ của dân tộc.'},
                                       en:{t:'Resistance Against France', d:'An epic of the “resistance-zone press” accompanying the nation\u2019s long war of resistance.'} },
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

/* ---------- Heritage zones (image-only cards) ---------- */
const ZONES = [
  { img:'img-1', vi:'Gian Khánh Tiết',                         en:'The Hall of Welcome' },
  { img:'img-2', vi:'Báo chí Việt Nam 1865 – 1925',            en:'Vietnamese Press 1865 – 1925' },
  { img:'img-3', vi:'Báo chí Việt Nam 1925 – 1945',            en:'Vietnamese Press 1925 – 1945' },
  { img:'img-4', vi:'Báo chí Việt Nam 1945 – 1954',            en:'Vietnamese Press 1945 – 1954' },
  { img:'img-5', vi:'Báo chí Việt Nam 1954 – 1975',            en:'Vietnamese Press 1954 – 1975' },
  { img:'img-6', vi:'Báo chí Việt Nam 1975 – Nay',             en:'Vietnamese Press 1975 – Today' },
];

/* ---------- helpers ---------- */
let LANG = (() => { try { return localStorage.getItem('lp_lang') || 'vi'; } catch(e){ return 'vi'; } })();
const t = (k) => I18N[LANG][k];

function icon360(size){
  return `<svg viewBox="0 0 64 34" width="${size}" height="${size*0.53}" fill="none" stroke="currentColor" stroke-width="1.6">
    <ellipse cx="32" cy="17" rx="27" ry="10"/>
    <path d="M11 17c0 5 9 9 21 9s21-4 21-9" stroke-dasharray="1.5 2.6"/>
    <text x="32" y="21" text-anchor="middle" font-family="Playfair Display, serif" font-size="11" font-weight="700" fill="currentColor" stroke="none">360°</text>
  </svg>`;
}

/* ---------- render timeline ---------- */
function renderTimeline(){
  const items = TIMELINE.map((m,i)=>{
    const side = i % 2 === 0 ? 'left' : 'right';
    const c = m[LANG];
    return `<div class="tl-item ${side} ${m.kind} reveal mb-10 md:mb-14" data-tl>
      <span class="tl-dot"></span>
      <div class="tl-card">
        <span class="tl-badge">${m.year}</span>
        <h3 class="font-display text-xl md:text-2xl text-bronze leading-snug">${c.t}</h3>
        <p class="font-serif text-ink2 mt-2 leading-relaxed text-[15px] md:text-base">${c.d}</p>
      </div>
    </div>`;
  }).join('');

  return `<section id="lich-su" class="relative py-24 md:py-32">
    <div class="max-w-[1180px] mx-auto px-5 md:px-8">
      <div class="text-center mb-16 md:mb-20 reveal">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="w-8 gold-rule"></span>
          <span class="eyebrow">${t('histEyebrow')}</span>
          <span class="w-8 gold-rule"></span>
        </div>
        <h2 class="font-display text-4xl md:text-5xl lg:text-[56px] text-goldgrad leading-[1.06] pb-1">${t('histTitle')}</h2>
        <p class="font-serif italic text-ink2 text-lg md:text-xl mt-4 max-w-[52ch] mx-auto">${t('histSub')}</p>
      </div>

      <div class="tl-wrap">
        <div class="tl-spine"><div class="tl-fill" id="tlFill"></div></div>
        ${items}
      </div>
    </div>
  </section>`;
}

/* ---------- render heritage grid ---------- */
function renderHeritage(){
  const cards = ZONES.map((z,i)=>`
    <div class="heritage-card reveal" style="transition-delay:${i*90}ms" role="button" tabindex="0"
         aria-label="${z[LANG]}" title="${z[LANG]}" data-zone data-idx="${i}">
      <div class="img ${z.img}"></div>
      <div class="tint"></div>
      <div class="badge-360" aria-hidden="true">
        <span class="flex flex-col items-center gap-0.5">
          ${icon360(40)}
          <span class="font-display text-[11px] tracking-wide -mt-0.5" data-hover360>${t('hover360')}</span>
        </span>
      </div>
    </div>`).join('');

  return `<section id="ban-do" class="relative py-24 md:py-32 bg-cream2/60">
    <div class="max-w-[1180px] mx-auto px-5 md:px-8">
      <div class="text-center mb-14 md:mb-16 reveal">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="w-8 gold-rule"></span>
          <span class="eyebrow">${t('mapEyebrow')}</span>
          <span class="w-8 gold-rule"></span>
        </div>
        <h2 class="font-display text-4xl md:text-5xl lg:text-[56px] text-goldgrad leading-[1.06] pb-1">${t('mapTitle')}</h2>
        <p class="font-serif italic text-ink2 text-lg md:text-xl mt-4 max-w-[52ch] mx-auto">${t('mapSub')}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        ${cards}
      </div>

      <div class="flex justify-center mt-16 md:mt-20 reveal">
        <button class="cta-pulse inline-flex items-center gap-3 px-9 py-4 text-base md:text-lg" data-cta>
          <span>${icon360(34)}</span>
          <span data-cta-label>${t('cta')}</span>
        </button>
      </div>
    </div>
  </section>`;
}

/* ---------- render footer ---------- */
function renderFooter(){
  return `<footer id="footer" class="relative bg-night text-cream pt-20 pb-10 overflow-hidden">
    <div class="absolute inset-0 map-grid opacity-40"></div>
    <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full" style="background:radial-gradient(circle,rgba(201,154,63,.22),transparent 70%)"></div>
    <div class="relative max-w-[1180px] mx-auto px-5 md:px-8">
      <div class="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <svg viewBox="0 0 64 64" width="34" height="34" aria-hidden="true">
              <g fill="none" stroke="#E6C277" stroke-width="2" stroke-linecap="round">
                <path d="M32 40c-7-2-13-9-13-17 6 1 11 6 13 13 2-7 7-12 13-13 0 8-6 15-13 17Z"/>
                <path d="M20 30c-5 1-9 5-10 10 6 1 11-2 13-7"/>
                <path d="M44 30c5 1 9 5 10 10-6 1-11-2-13-7"/>
                <path d="M32 41v8"/>
              </g>
            </svg>
            <div class="leading-tight">
              <div class="font-display text-lg text-goldlt">${LANG==='vi'?'Bảo tàng Báo chí Việt Nam':'Vietnam Press Museum'}</div>
              <div class="text-[10px] tracking-[.28em] uppercase text-gold/70">VR 360°</div>
            </div>
          </div>
          <p class="font-serif italic text-cream/65 text-lg max-w-[36ch]">${t('ftTagline')}</p>
        </div>

        <div>
          <div class="eyebrow text-gold/80 mb-4">${t('ftNav')}</div>
          <ul class="space-y-2.5 text-cream/75">
            <li><a href="#home" class="hover:text-goldlt transition">${t('nHome')}</a></li>
            <li><a href="#lich-su" class="hover:text-goldlt transition">${t('nHist')}</a></li>
            <li><a href="#ban-do" class="hover:text-goldlt transition">${t('nMap')}</a></li>
            <li><a href="#footer" class="hover:text-goldlt transition">${t('nContact')}</a></li>
          </ul>
        </div>

        <div class="space-y-5">
          <div>
            <div class="eyebrow text-gold/80 mb-1.5">${t('ftAddrLabel')}</div>
            <p class="text-cream/75 leading-relaxed text-[15px]">${t('ftAddr')}</p>
          </div>
          <div class="flex gap-10">
            <div>
              <div class="eyebrow text-gold/80 mb-1.5">${t('ftPhoneLabel')}</div>
              <a href="tel:+842437821690" class="text-cream/85 hover:text-goldlt transition">(024) 3782 1690</a>
            </div>
            <div>
              <div class="eyebrow text-gold/80 mb-1.5">${t('ftWebLabel')}</div>
              <a href="https://baotangbaochi.vn" target="_blank" rel="noopener" class="text-cream/85 hover:text-goldlt transition">baotangbaochi.vn</a>
            </div>
          </div>
        </div>
      </div>

      <div class="gold-rule mt-12 mb-6 opacity-60"></div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/45">
        <span>${t('ftRights')}</span>
        <span class="font-serif italic text-gold/60">“Bút sắc · Lòng son · Tâm sáng”</span>
      </div>
    </div>
  </footer>`;
}

/* ---------- mount ---------- */
function mount(){
  document.getElementById('app-sections').innerHTML =
    renderTimeline() + renderHeritage() + renderFooter();
  initReveal();
  initTimelineScroll();
  initCardClicks();
}

/* ---------- reveal on scroll ---------- */
let revealObs;
function initReveal(){
  if (revealObs) revealObs.disconnect();
  revealObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, { threshold:0.14, rootMargin:'0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

  // timeline dot glow uses its own observer (re-triggerable)
  const tlObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold:0.3 });
  document.querySelectorAll('[data-tl]').forEach(el=>tlObs.observe(el));
}

/* ---------- timeline spine fill on scroll ---------- */
function initTimelineScroll(){
  const sec = document.getElementById('lich-su');
  const fill = document.getElementById('tlFill');
  if(!sec || !fill) return;
  const onScroll = ()=>{
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = r.height;
    // progress: how far the viewport center has travelled through the section
    const passed = Math.min(Math.max(vh*0.5 - r.top, 0), total);
    fill.style.height = (passed/total*100) + '%';
    requestAnimationFrame(()=>{});
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

/* ---------- card / CTA click → simulate VR entry ---------- */
function initCardClicks(){
  document.querySelectorAll('[data-zone]').forEach(card=>{
    const idx = +card.dataset.idx || 0;
    const fire = ()=>{
      const b = card.querySelector('.badge-360');
      b?.animate(
        [{transform:'translate(-50%,-50%) scale(1)'},{transform:'translate(-50%,-50%) scale(.86)'},{transform:'translate(-50%,-50%) scale(1.05)'}],
        {duration:300, easing:'cubic-bezier(.34,1.5,.5,1)'});
      window.openVR?.(idx);
    };
    card.addEventListener('click', fire);
    card.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); fire(); } });
  });
  const cta = document.querySelector('[data-cta]');
  cta?.addEventListener('click', ()=>{
    cta.animate([{transform:'translateY(-2px) scale(1)'},{transform:'translateY(-2px) scale(.96)'},{transform:'translateY(-2px) scale(1)'}],
      {duration:300, easing:'ease-out'});
    window.openVR?.(0);
  });
}

/* ---------- language toggle ---------- */
function setLang(lang){
  LANG = lang;
  document.documentElement.setAttribute('data-lang', lang);
  try{ localStorage.setItem('lp_lang', lang); }catch(e){}
  // static header/hero text
  document.querySelectorAll('[data-vi-text]').forEach(el=>{
    const v = el.getAttribute(lang==='vi'?'data-vi-text':'data-en-text');
    if(v!=null) el.textContent = v;
  });
  document.querySelectorAll('.lang-toggle button').forEach(b=>{
    b.classList.toggle('active', b.dataset.setLang===lang);
  });
  // re-render dynamic sections
  mount();
}

/* ---------- header scroll state + active nav ---------- */
function initHeader(){
  const header = document.querySelector('.site-header');
  const onScroll = ()=>{
    header.classList.toggle('scrolled', window.scrollY > 40);
    // active nav
    const secs = ['home','lich-su','ban-do','footer'];
    let cur = 'home';
    for(const id of secs){
      const el = document.getElementById(id);
      if(el && el.getBoundingClientRect().top <= 140) cur = id;
    }
    document.querySelectorAll('[data-nav]').forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href')==='#'+cur);
    });
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.lang-toggle button').forEach(b=>{
    b.addEventListener('click', ()=>setLang(b.dataset.setLang));
  });
  setLang(LANG);      // applies static text + mounts sections
  initHeader();
});
