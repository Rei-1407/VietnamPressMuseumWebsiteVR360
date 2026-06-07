/* =========================================================
   app.js — Dựng giao diện trang + hiệu ứng cuộn + chuyển ngôn ngữ
   Đọc dữ liệu từ data.js (UI, TIMELINE, SPACES, CONTACT).
   ⚠️ Nội dung chữ/không gian sửa ở data.js, KHÔNG sửa file này.
   ========================================================= */

/* ---------- ngôn ngữ hiện tại ---------- */
let LANG = (() => { try { return localStorage.getItem('lp_lang') || 'vi'; } catch(e){ return 'vi'; } })();
const t = (k) => UI[LANG][k];

/* icon 360° dùng ẢNH SVG gốc Figma:
   - assets/figma/icon360.svg     → đĩa trắng + nguyên tử cam (trong thẻ khu vực)
   - assets/figma/ic-atom-white.svg → nguyên tử trắng (trong nút VR 360°) */

/* ---------- mục "Dấu Ấn Lịch Sử Làng Báo" (timeline) ---------- */
function renderTimeline(){
  // gom mỗi mốc sự kiện vào dưới mốc GIAI ĐOẠN (era) đứng ngay trước nó
  const blocks = [];
  TIMELINE.forEach(m=>{
    if(m.kind==='era') blocks.push({ era:m, events:[] });
    else if(blocks.length) blocks[blocks.length-1].events.push(m);
  });

  const body = blocks.map(b=>{
    const c = b.era[LANG];
    const evs = b.events.map(ev=>{
      const e = ev[LANG];
      return `<div class="ev-card reveal">
        <span class="ev-badge">${ev.year}</span>
        <h3>${e.t}</h3>
        <p>${e.d}</p>
      </div>`;
    }).join('');
    const row = b.events.length
      ? `<div class="ev-row ${b.events.length===1?'one':''}">${evs}</div>` : '';
    return `<div class="tl-block">
      <div class="tl-era reveal">
        <span class="era-pill">${b.era.year}</span>
        <div class="era-name">${c.t}</div>
        <p class="era-desc">${c.d}</p>
      </div>
      ${row}
    </div>`;
  }).join('');

  return `<section id="lich-su" class="relative py-20 md:py-28">
    <div class="max-w-[1100px] mx-auto px-5 md:px-8">
      <div class="text-center mb-14 md:mb-16 reveal">
        <div class="text-goldgrad font-extrabold uppercase tracking-[.2em] text-lg md:text-2xl mb-1">${t('histKicker')}</div>
        <h2 class="font-display font-extrabold uppercase text-goldgrad leading-[1.04] text-[clamp(30px,5.4vw,62px)]">${t('histTitle')}</h2>
        <p class="italic text-ink2 text-base md:text-lg mt-3 max-w-[54ch] mx-auto">${t('histSub')}</p>
      </div>
      <div class="tl-wrap">
        <div class="tl-line"></div>
        ${body}
      </div>
    </div>
  </section>`;
}

/* ---------- mục "Bản Đồ & Trải Nghiệm Khám Phá" (lưới khu vực VR) ---------- */
function renderHeritage(){
  // ảnh preview: ưu tiên thumb → ảnh cảnh đầu tiên → photo (để người xem biết khu vực đã có nội dung)
  const previewOf = (s)=> s.thumb
        || (s.scenes && (s.scenes.find(sc=>sc && sc.photo)||{}).photo)
        || s.photo || '';
  const card = (s, gi)=>{
    const label = s.card[LANG];
    const prev = previewOf(s);
    const bg = prev
      ? `<div class="photo" style="background-image:url('${prev}')"></div><div class="tint"></div>`
      : '';
    return `<div class="map-card reveal${prev?' has-photo':''}" role="button" tabindex="0"
         aria-label="${label}" title="${label}" data-zone data-idx="${gi}">
      <div class="body">
        ${bg}
        <img class="disc" src="assets/figma/icon360.svg" alt="" aria-hidden="true">
        <div class="plate">${label}</div>
      </div>
    </div>`;
  };
  // gi = chỉ số toàn cục trong SPACES (mở đúng không gian VR)
  const byFloor = (n)=> SPACES.map((s,gi)=>({s,gi})).filter(o=>(o.s.floor||1)===n);
  const grid = (arr)=> `<div class="map-cards">${arr.map(o=>card(o.s,o.gi)).join('')}</div>`;
  const f1 = byFloor(1), f2 = byFloor(2);

  return `<section id="ban-do" class="relative py-20 md:py-28">
    <div class="max-w-[1100px] mx-auto px-5 md:px-8">
      <div class="text-center mb-12 md:mb-14 reveal">
        <h2 class="font-display font-extrabold uppercase text-goldgrad leading-[1.05] text-[clamp(30px,5.6vw,66px)]">${t('mapTitle')}</h2>
        <p class="italic text-[15px] md:text-lg mt-4" style="color:#E0912C">${t('mapSub')}</p>
      </div>

      <div class="text-center mb-9 reveal"><span class="floor-pill">${LANG==='vi'?'Khu vực tầng 1':'Floor 1 zones'}</span></div>
      ${grid(f1)}

      <div class="text-center mt-16 mb-9 reveal"><span class="floor-pill">${LANG==='vi'?'Khu vực tầng 2':'Floor 2 zones'}</span></div>
      ${grid(f2)}

      <div class="text-center mt-16 md:mt-20 reveal">
        <button class="cta-vr" data-cta>
          <img src="assets/figma/ic-atom-white.svg" alt="" aria-hidden="true">
          <span data-cta-label>${LANG==='vi'?'Trải nghiệm VR 360°':'Experience VR 360°'}</span>
        </button>
      </div>
    </div>
  </section>`;
}

/* ---------- Footer (nâu #814E00) ---------- */
function renderFooter(){
  return `<footer id="footer" class="pt-16 pb-9">
    <div class="max-w-[1180px] mx-auto px-5 md:px-8">
      <div class="grid md:grid-cols-[1.5fr_1fr_1.35fr] gap-10 md:gap-12">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <img class="ft-lotus" src="assets/figma/logo.png" alt="" aria-hidden="true">
            <div class="leading-tight">
              <div class="font-display font-bold text-[15px] tracking-wide">${LANG==='vi'?'BẢO TÀNG BÁO CHÍ':'PRESS MUSEUM'}</div>
              <div class="text-[10px] tracking-[.3em] uppercase" style="color:#EFB964">${LANG==='vi'?'Việt Nam':'of Vietnam'}</div>
            </div>
          </div>
          <p class="italic text-[15px] leading-relaxed max-w-[34ch]" style="color:#F4E2C2">“${t('ftTagline')}”</p>
          <p class="text-[12px] mt-4" style="color:#D9B583">${t('ftRights')}</p>
        </div>

        <div>
          <div class="ft-label mb-4">${t('ftNav')}</div>
          <ul class="space-y-2.5 text-[15px]" style="color:#F4E2C2">
            <li><a href="#home" class="hover:text-white transition">${t('nHome')}</a></li>
            <li><a href="#lich-su" class="hover:text-white transition">${t('nHist')}</a></li>
            <li><a href="#ban-do" class="hover:text-white transition">${t('nMap')}</a></li>
            <li><a href="#footer" class="hover:text-white transition">${t('nContact')}</a></li>
          </ul>
        </div>

        <div class="space-y-3 text-[15px]" style="color:#F4E2C2">
          <p><span class="ft-label">${t('ftPhoneLabel')}:</span> <a href="${CONTACT.phoneHref}" class="hover:text-white transition">${CONTACT.phone}</a></p>
          <p class="leading-relaxed"><span class="ft-label">${t('ftAddrLabel')}:</span> ${t('ftAddr')}</p>
          <p><span class="ft-label">${t('ftWebLabel')}:</span> <a href="${CONTACT.websiteHref}" target="_blank" rel="noopener" class="hover:text-white transition">${CONTACT.website}</a></p>
          <p class="italic text-[13px] pt-2" style="color:#D9B583">Bản quyền sản phẩm thuộc về <b class="not-italic" style="color:#EFB964">VIRA Agency</b></p>
        </div>
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
      const b = card.querySelector('.disc');
      b?.animate(
        [{transform:'scale(1)'},{transform:'scale(.86)'},{transform:'scale(1.12)'}],
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
