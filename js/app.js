/* =========================================================
   app.js — Dựng giao diện trang + hiệu ứng cuộn + chuyển ngôn ngữ
   Đọc dữ liệu từ data.js (UI, TIMELINE, SPACES, CONTACT).
   ⚠️ Nội dung chữ/không gian sửa ở data.js, KHÔNG sửa file này.
   ========================================================= */

/* ---------- ngôn ngữ hiện tại ---------- */
let LANG = (() => { try { return localStorage.getItem('lp_lang') || 'vi'; } catch(e){ return 'vi'; } })();
const t = (k) => UI[LANG][k];

/* ---------- icon 360° ---------- */
function icon360(size){
  return `<svg viewBox="0 0 64 34" width="${size}" height="${size*0.53}" fill="none" stroke="currentColor" stroke-width="1.6">
    <ellipse cx="32" cy="17" rx="27" ry="10"/>
    <path d="M11 17c0 5 9 9 21 9s21-4 21-9" stroke-dasharray="1.5 2.6"/>
    <text x="32" y="21" text-anchor="middle" font-family="Playfair Display, serif" font-size="11" font-weight="700" fill="currentColor" stroke="none">360°</text>
  </svg>`;
}

/* ---------- mục "Dấu Ấn Lịch Sử Làng Báo" (timeline) ---------- */
function renderTimeline(){
  let ev = 0;
  const items = TIMELINE.map((m)=>{
    const c = m[LANG];
    if(m.kind==='era'){
      return `<div class="tl-item era reveal mb-6 md:mb-10" data-tl>
        <div class="tl-era">
          <div class="era-card">${m.year}</div>
          <div class="era-name">${c.t}</div>
          <div class="era-desc">${c.d}</div>
        </div>
      </div>`;
    }
    const side = (ev++ % 2 === 0) ? 'left' : 'right';
    return `<div class="tl-item ${side} reveal mb-10 md:mb-14" data-tl>
      <span class="tl-dot"></span>
      <div class="tl-card">
        <span class="tl-badge">${m.year}</span>
        <h3 class="font-display text-xl md:text-2xl leading-snug">${c.t}</h3>
        <p class="font-serif mt-2 leading-relaxed text-[15px] md:text-base">${c.d}</p>
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
        <h2 class="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-[clamp(48px,7vw,84px)] text-goldgrad leading-[1.03] pb-2">${t('histTitle')}</h2>
        <p class="font-serif italic text-ink2 text-lg md:text-xl mt-4 max-w-[52ch] mx-auto">${t('histSub')}</p>
      </div>

      <div class="tl-wrap">
        <div class="tl-spine"><div class="tl-fill" id="tlFill"></div></div>
        ${items}
      </div>
    </div>
  </section>`;
}

/* ---------- mục "Chạm Vào Di Sản" (lưới không gian VR) ---------- */
function renderHeritage(){
  const cards = SPACES.map((s,i)=>{
    const label = s.card[LANG];
    const hasPhoto = !!s.thumb;
    const imgClass = hasPhoto ? 'photo' : 'img-' + ((i % 6) + 1);   // có ảnh → cover ; chưa có → gradient vàng
    const imgStyle = hasPhoto ? ` style="background-image:url('${s.thumb}')"` : '';
    return `
    <div class="heritage-card reveal" style="transition-delay:${i*90}ms" role="button" tabindex="0"
         aria-label="${label}" title="${label}" data-zone data-idx="${i}">
      <div class="img ${imgClass}"${imgStyle}></div>
      <div class="tint"></div>
      <div class="badge-360" aria-hidden="true">${icon360(34)}</div>
      <div class="zone-label">${label}</div>
    </div>`;
  }).join('');

  return `<section id="ban-do" class="relative py-24 md:py-32 bg-cream2/60">
    <div class="max-w-[1180px] mx-auto px-5 md:px-8">
      <div class="text-center mb-14 md:mb-16 reveal">
        <div class="flex items-center justify-center gap-3 mb-4">
          <span class="w-8 gold-rule"></span>
          <span class="eyebrow">${t('mapEyebrow')}</span>
          <span class="w-8 gold-rule"></span>
        </div>
        <h2 class="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-[clamp(48px,7vw,84px)] text-goldgrad leading-[1.03] pb-2">${t('mapTitle')}</h2>
        <p class="font-serif italic text-ink2 text-lg md:text-xl mt-4 max-w-[52ch] mx-auto">${t('mapSub')}</p>
      </div>

      <div class="flex justify-center mb-9 reveal"><span class="zone-pill">${LANG==='vi'?'Khu vực tầng 1':'Floor 1'}</span></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
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

/* ---------- Footer ---------- */
function renderFooter(){
  return `<footer id="footer" class="relative bg-cocoa text-cream pt-20 pb-10 overflow-hidden">
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
              <a href="${CONTACT.phoneHref}" class="text-cream/85 hover:text-goldlt transition">${CONTACT.phone}</a>
            </div>
            <div>
              <div class="eyebrow text-gold/80 mb-1.5">${t('ftWebLabel')}</div>
              <a href="${CONTACT.websiteHref}" target="_blank" rel="noopener" class="text-cream/85 hover:text-goldlt transition">${CONTACT.website}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="gold-rule mt-12 mb-6 opacity-60"></div>
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/55">
        <span>${t('ftRights')}</span>
        <span class="font-serif italic text-goldlt/75">Bản quyền sản phẩm thuộc về <b class="not-italic font-semibold text-goldlt">VIRA Agency</b></span>
      </div>
    </div>
  </footer>`;
}

/* ---------- gắn các mục vào trang ---------- */
function mount(){
  document.getElementById('app-sections').innerHTML =
    renderTimeline() + renderHeritage() + renderFooter();
  initReveal();
  initTimelineScroll();
  initCardClicks();
}

/* ---------- hiệu ứng hiện dần khi cuộn ---------- */
let revealObs;
function initReveal(){
  // Hiện ngay toàn bộ nếu người dùng tắt hiệu ứng (reduced-motion) hoặc URL có ?nofx
  if (/[?&]nofx/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal,.reveal-l,.reveal-r,[data-tl]').forEach(el=>el.classList.add('in'));
    return;
  }
  if (revealObs) revealObs.disconnect();
  revealObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, { threshold:0.14, rootMargin:'0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

  // chấm tròn timeline sáng dần (observer riêng, có thể kích hoạt lại)
  const tlObs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold:0.3 });
  document.querySelectorAll('[data-tl]').forEach(el=>tlObs.observe(el));
}

/* ---------- đường vàng timeline chạy theo cuộn ---------- */
function initTimelineScroll(){
  const sec = document.getElementById('lich-su');
  const fill = document.getElementById('tlFill');
  if(!sec || !fill) return;
  const onScroll = ()=>{
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = r.height;
    const passed = Math.min(Math.max(vh*0.5 - r.top, 0), total);
    fill.style.height = (passed/total*100) + '%';
    requestAnimationFrame(()=>{});
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

/* ---------- click thẻ / CTA → mở trình xem VR ---------- */
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

/* ---------- chuyển ngôn ngữ VI/EN ---------- */
// Áp chữ tĩnh (header/hero) — chạy được ngay, không cần dữ liệu không gian
function applyStaticText(lang){
  LANG = lang;
  document.documentElement.setAttribute('data-lang', lang);
  try{ localStorage.setItem('lp_lang', lang); }catch(e){}
  document.querySelectorAll('[data-vi-text]').forEach(el=>{
    const v = el.getAttribute(lang==='vi'?'data-vi-text':'data-en-text');
    if(v!=null) el.textContent = v;
  });
  document.querySelectorAll('.lang-toggle button').forEach(b=>{
    b.classList.toggle('active', b.dataset.setLang===lang);
  });
}
function setLang(lang){
  applyStaticText(lang);
  mount();   // dựng lại các mục động (cần window.SPACES đã tải)
}

/* ---------- trạng thái header khi cuộn + mục đang xem ---------- */
function initHeader(){
  const header = document.querySelector('.site-header');
  const onScroll = ()=>{
    header.classList.toggle('scrolled', window.scrollY > 40);
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

/* ---------- khởi động ---------- */
document.addEventListener('DOMContentLoaded', async ()=>{
  document.querySelectorAll('.lang-toggle button').forEach(b=>{
    b.addEventListener('click', ()=>setLang(b.dataset.setLang));
  });
  applyStaticText(LANG);            // áp chữ tĩnh ngay (tránh nháy ngôn ngữ)
  // tải danh sách KHÔNG GIAN VR từ data/spaces.json (admin sửa file này)
  try{
    const res = await fetch('data/spaces.json', { cache:'no-store' });
    if(!res.ok) throw new Error('HTTP '+res.status);
    window.SPACES = await res.json();
  }catch(e){
    window.SPACES = [];
    console.error('Không tải được data/spaces.json:', e);
  }
  mount();                          // dựng timeline + lưới + footer
  initHeader();
});
