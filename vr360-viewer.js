/* =========================================================
   VR 360° Viewer — procedural equirectangular panoramas
   + Pannellum modal. Reads ZONES / LANG from vr360-app.js
   ========================================================= */

/* ---------- per-room theme + exhibits ---------- */
const ROOMS = [
  { tag:{vi:'Sảnh đón', en:'Lobby'},
    name:{vi:'Sảnh đón Bảo tàng', en:'The Museum Lobby'},
    scenes:[
      { id:'sanh-ngoai', photo:'assets/pano-sanh.jpg', yaw:0, pitch:-2,
        label:{vi:'Trước sảnh', en:'Forecourt'},
        hotspots:[
          { pitch:5,  yaw:-44, vi:'Biểu tượng “Bảo tàng Báo chí Việt Nam”', en:'“Vietnam Press Museum” emblem' },
          { pitch:7,  yaw:38,  vi:'Trưng bày “Hoa Xuân Dâng Đảng” · Xuân 2026', en:'“Spring Blossoms to the Party” · 2026' },
          { pitch:2,  yaw:120, vi:'Phù điêu cột · chiến sĩ cầm bút', en:'Column relief · the reporter-soldier' },
          { pitch:0,  yaw:-120,vi:'Cột tranh cổ động · 1976', en:'Propaganda column · 1976' },
        ],
        links:[
          { pitch:-6, yaw:0, to:'sanh-trong', vi:'Bước vào trong sảnh', en:'Step inside the lobby' },
        ]},
      { id:'sanh-trong', photo:'assets/pano-sanh-trong.jpg', yaw:25, pitch:-2,
        label:{vi:'Trong sảnh', en:'Interior'},
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
    wall:'#7A5A28', wall2:'#5A4220', floor:'#3A2A15', ceil:'#241a0d',
    ex:[
      {vi:'Biểu tượng Bút – Sen', en:'The Pen & Lotus Emblem'},
      {vi:'Lời mở đầu di sản',     en:'Heritage Prologue'},
      {vi:'Bản đồ tham quan',      en:'Tour Map'},
      {vi:'Dòng thời gian 160 năm',en:'160-Year Timeline'},
      {vi:'Sổ vàng lưu niệm',      en:'The Golden Book'},
      {vi:'Lời chào mừng',         en:'A Warm Welcome'},
    ]},
  { tag:{vi:'1865 – 1925', en:'1865 – 1925'},
    wall:'#6B5836', wall2:'#4C3D24', floor:'#352b18', ceil:'#241d10',
    ex:[
      {vi:'Gia Định Báo · 1865',   en:'Gia Định Báo · 1865'},
      {vi:'Nông Cổ Mín Đàm · 1901',en:'Nông Cổ Mín Đàm · 1901'},
      {vi:'Đông Dương Tạp Chí',    en:'Đông Dương Review'},
      {vi:'Tạp chí Nam Phong',     en:'Nam Phong Journal'},
      {vi:'Nghiên bút & con chữ',  en:'Ink Stone & Movable Type'},
      {vi:'Nhà in thuở sơ khai',   en:'The Early Print House'},
    ]},
  { tag:{vi:'1925 – 1945', en:'1925 – 1945'},
    wall:'#5E2A24', wall2:'#421810', floor:'#341512', ceil:'#22100b',
    ex:[
      {vi:'Báo Thanh Niên · 1925', en:'Thanh Niên · 1925'},
      {vi:'Báo Búa Liềm · 1929',   en:'Búa Liềm · 1929'},
      {vi:'Báo Dân Chúng · 1938',  en:'Dân Chúng · 1938'},
      {vi:'Những trang in bí mật',  en:'Clandestine Pages'},
      {vi:'Nhà tù & ngòi bút',     en:'Prison & Pen'},
      {vi:'Cờ giải phóng',         en:'The Liberation Flag'},
    ]},
  { tag:{vi:'1945 – 1954', en:'1945 – 1954'},
    wall:'#3F4A30', wall2:'#2A331F', floor:'#262e1a', ceil:'#1b2011',
    ex:[
      {vi:'Báo Cứu Quốc',          en:'Cứu Quốc Newspaper'},
      {vi:'Báo Sự Thật',           en:'Sự Thật Newspaper'},
      {vi:'Báo Quân đội ND · 1950',en:"People's Army Daily · 1950"},
      {vi:'Trường dạy làm báo · 1949', en:'Journalism School · 1949'},
      {vi:'Tòa soạn tiền phương',  en:'The Frontline Newsroom'},
      {vi:'Chiến thắng Điện Biên', en:'Điện Biên Phủ Victory'},
    ]},
  { tag:{vi:'1954 – 1975', en:'1954 – 1975'},
    wall:'#5A2420', wall2:'#3A130E', floor:'#2f1310', ceil:'#1f0d0a',
    ex:[
      {vi:'Căn hầm Báo Nhân Dân',  en:'The Nhân Dân Bunker'},
      {vi:'Máy quay “Ngựa Trời”',  en:'The “Ngựa Trời” Camera'},
      {vi:'Loa phóng thanh Hiền Lương', en:'Hiền Lương Loudspeaker'},
      {vi:'Nhà báo chiến trường',  en:'Battlefield Reporters'},
      {vi:'“Điện Biên Phủ trên không”', en:'“Điện Biên Phủ in the Air”'},
      {vi:'Ngày 30·04·1975',       en:'30 April 1975'},
    ]},
  { tag:{vi:'1975 – Nay', en:'1975 – Today'},
    wall:'#264A4A', wall2:'#173130', floor:'#152b2a', ceil:'#0e1f1e',
    ex:[
      {vi:'Sức bật Đổi Mới · 1986',en:'The Đổi Mới Surge · 1986'},
      {vi:'“Những việc cần làm ngay”', en:'“Things To Do Now”'},
      {vi:'Báo điện tử',           en:'The Online Press'},
      {vi:'Phát thanh – Truyền hình', en:'Radio & Television'},
      {vi:'Kỷ nguyên số đa nền tảng', en:'The Multi-Platform Era'},
      {vi:'Hội nhập quốc tế',      en:'Global Integration'},
    ]},
];

const PANO_W = 4096, PANO_H = 2048;
const L = () => (typeof LANG !== 'undefined' ? LANG : 'vi');

/* ---------- small helpers ---------- */
function shade(hex, f){ // f<1 darken, >1 lighten
  const n = parseInt(hex.slice(1),16);
  let r=(n>>16)&255, g=(n>>8)&255, b=n&255;
  r=Math.min(255,Math.round(r*f)); g=Math.min(255,Math.round(g*f)); b=Math.min(255,Math.round(b*f));
  return `rgb(${r},${g},${b})`;
}
function wrap(ctx, text, max){
  const words = text.split(' '); const lines=[]; let line='';
  for(const w of words){
    const test = line? line+' '+w : w;
    if(ctx.measureText(test).width > max && line){ lines.push(line); line=w; }
    else line=test;
  }
  if(line) lines.push(line);
  return lines;
}

/* ---------- draw one framed exhibit on the wall band ---------- */
function drawExhibit(ctx, cx, theme, item){
  const gold='#E6C277', goldDk='#A9731F';
  const fw=440, fh=372, fx=cx-fw/2, fy=megaTop();
  function megaTop(){ return 0; } // placeholder (unused)

  const topY = 778, frameH = 360;
  const fX = cx - fw/2, fY = topY;

  // spotlight glow from ceiling
  const sp = ctx.createRadialGradient(cx, 560, 30, cx, 900, 540);
  sp.addColorStop(0, 'rgba(255,236,190,.30)');
  sp.addColorStop(1, 'rgba(255,236,190,0)');
  ctx.fillStyle = sp;
  ctx.fillRect(cx-360, 470, 720, 820);

  // outer gold frame
  const fg = ctx.createLinearGradient(fX, fY, fX, fY+frameH);
  fg.addColorStop(0,'#F3DDA6'); fg.addColorStop(.5,'#D6A953'); fg.addColorStop(1,'#A9731F');
  ctx.fillStyle = fg;
  roundRect(ctx, fX-16, fY-16, fw+32, frameH+32, 10); ctx.fill();
  // inner mat
  ctx.fillStyle = shade(theme.wall, .55);
  roundRect(ctx, fX, fY, fw, frameH, 4); ctx.fill();

  // ---- exhibit content: stylized newspaper / portrait ----
  const pad=26, ix=fX+pad, iy=fY+pad, iw=fw-pad*2, ih=frameH-pad*2;
  ctx.fillStyle = '#F4ECDA';
  ctx.fillRect(ix, iy, iw, ih);
  // aged tint
  const aged = ctx.createLinearGradient(ix,iy,ix,iy+ih);
  aged.addColorStop(0,'rgba(120,86,30,.05)'); aged.addColorStop(1,'rgba(120,86,30,.18)');
  ctx.fillStyle=aged; ctx.fillRect(ix,iy,iw,ih);
  // masthead bar
  ctx.fillStyle = goldDk;
  ctx.fillRect(ix, iy, iw, 44);
  ctx.fillStyle='#FBF3E0'; ctx.font='700 24px "Playfair Display", serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('BÁO CHÍ', cx, iy+22);
  // columns of "text"
  ctx.strokeStyle='rgba(60,44,20,.30)'; ctx.lineWidth=2;
  const cols=3, colW=(iw-20)/cols, lineH=14, startY=iy+62;
  for(let c=0;c<cols;c++){
    const colX=ix+10+c*colW;
    for(let y=startY; y<iy+ih-16; y+=lineH){
      const w = (Math.sin(c*3+y*0.05)*0.5+0.5)*(colW-26)+10;
      ctx.beginPath(); ctx.moveTo(colX, y); ctx.lineTo(colX+w, y); ctx.stroke();
    }
    if(c<cols-1){ ctx.strokeStyle='rgba(60,44,20,.18)'; ctx.beginPath(); ctx.moveTo(ix+10+(c+1)*colW-10, startY-4); ctx.lineTo(ix+10+(c+1)*colW-10, iy+ih-16); ctx.stroke(); ctx.strokeStyle='rgba(60,44,20,.30)'; }
  }

  // ---- caption plate ----
  const capY = fY+frameH+44, capW=fw+10, capX=cx-capW/2, capH=84;
  ctx.fillStyle='rgba(20,15,8,.82)';
  roundRect(ctx, capX, capY, capW, capH, 8); ctx.fill();
  ctx.strokeStyle='rgba(230,194,119,.6)'; ctx.lineWidth=1.5;
  roundRect(ctx, capX, capY, capW, capH, 8); ctx.stroke();

  ctx.fillStyle=gold; ctx.font='600 30px "Playfair Display", serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
  const label = item[L()];
  const lines = wrap(ctx, label, capW-44);
  const ly = capY + capH/2 - (lines.length-1)*18;
  lines.forEach((ln,i)=> ctx.fillText(ln, cx, ly + i*36));
}

function roundRect(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
}

/* ---------- generate equirectangular panorama ---------- */
function generatePano(idx){
  const theme = ROOMS[idx];
  const cv = document.createElement('canvas');
  cv.width=PANO_W; cv.height=PANO_H;
  const ctx = cv.getContext('2d');

  // ceiling
  const cg = ctx.createLinearGradient(0,0,0,PANO_H*0.34);
  cg.addColorStop(0, shade(theme.ceil,.7));
  cg.addColorStop(1, shade(theme.ceil,1.25));
  ctx.fillStyle=cg; ctx.fillRect(0,0,PANO_W,PANO_H*0.34);

  // wall band
  const wg = ctx.createLinearGradient(0,PANO_H*0.30,0,PANO_H*0.72);
  wg.addColorStop(0, shade(theme.wall,1.18));
  wg.addColorStop(.5, theme.wall);
  wg.addColorStop(1, shade(theme.wall2,.92));
  ctx.fillStyle=wg; ctx.fillRect(0,PANO_H*0.30,PANO_W,PANO_H*0.42);

  // floor
  const flg = ctx.createLinearGradient(0,PANO_H*0.70,0,PANO_H);
  flg.addColorStop(0, shade(theme.floor,1.3));
  flg.addColorStop(1, shade(theme.floor,.7));
  ctx.fillStyle=flg; ctx.fillRect(0,PANO_H*0.70,PANO_W,PANO_H*0.30);

  // floor perspective bands
  ctx.strokeStyle='rgba(230,194,119,.10)'; ctx.lineWidth=2;
  let yy=PANO_H*0.72, step=10;
  while(yy<PANO_H){ ctx.beginPath(); ctx.moveTo(0,yy); ctx.lineTo(PANO_W,yy); ctx.stroke(); step*=1.32; yy+=step; }
  // ceiling coffers
  ctx.strokeStyle='rgba(0,0,0,.18)';
  yy=PANO_H*0.30; step=10;
  while(yy>0){ ctx.beginPath(); ctx.moveTo(0,yy); ctx.lineTo(PANO_W,yy); ctx.stroke(); step*=1.32; yy-=step; }

  // horizon trim line
  ctx.strokeStyle='rgba(230,194,119,.45)'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(0,PANO_H*0.715); ctx.lineTo(PANO_W,PANO_H*0.715); ctx.stroke();

  // wall vertical seams + exhibits (6 slots)
  const hotSpots=[];
  for(let k=0;k<6;k++){
    const cx = PANO_W*(k+0.5)/6;
    // seam between slots
    const seamX = PANO_W*k/6;
    ctx.strokeStyle='rgba(0,0,0,.22)'; ctx.lineWidth=4;
    ctx.beginPath(); ctx.moveTo(seamX, PANO_H*0.30); ctx.lineTo(seamX, PANO_H*0.715); ctx.stroke();
    ctx.strokeStyle='rgba(230,194,119,.18)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(seamX+3, PANO_H*0.30); ctx.lineTo(seamX+3, PANO_H*0.715); ctx.stroke();

    drawExhibit(ctx, cx, theme, theme.ex[k]);

    const yaw = (k+0.5)*60 - 180;
    hotSpots.push({ pitch:-14, yaw, type:'info', text: theme.ex[k][L()] });
  }

  // soft vignette top/bottom
  const vg = ctx.createLinearGradient(0,0,0,PANO_H);
  vg.addColorStop(0,'rgba(0,0,0,.34)'); vg.addColorStop(.2,'rgba(0,0,0,0)');
  vg.addColorStop(.82,'rgba(0,0,0,0)'); vg.addColorStop(1,'rgba(0,0,0,.40)');
  ctx.fillStyle=vg; ctx.fillRect(0,0,PANO_W,PANO_H);

  return { dataURL: cv.toDataURL('image/jpeg', 0.86), hotSpots };
}

/* ---------- modal shell ---------- */
let viewer=null, curRoom=0, autoRot=true, hintTimer=null;

function ensureModal(){
  if(document.getElementById('vrModal')) return;
  const style=document.createElement('style');
  style.textContent=`
    #vrModal{ position:fixed; inset:0; z-index:100; display:none; opacity:0; transition:opacity .4s;
      background:#0c0905; }
    #vrModal.open{ display:block; opacity:1; }
    #pano{ position:absolute; inset:0; }
    .pnlm-load-box{ background:#0c0905 !important; }
    .vr-top{ position:absolute; top:0; left:0; right:0; z-index:5; display:flex; align-items:center;
      justify-content:space-between; gap:16px; padding:18px 22px;
      background:linear-gradient(180deg,rgba(8,6,3,.78),rgba(8,6,3,0)); pointer-events:none; }
    .vr-top > *{ pointer-events:auto; }
    .vr-roomtitle{ color:#F1E8D5; }
    .vr-roomtitle .k{ font-family:'Playfair Display',serif; font-weight:700; color:#E6C277; font-size:13px;
      letter-spacing:.24em; text-transform:uppercase; }
    .vr-roomtitle .n{ font-family:'Playfair Display',serif; font-size:26px; line-height:1.1; margin-top:2px; }
    .vr-close{ width:46px; height:46px; border-radius:50%; display:grid; place-items:center;
      background:rgba(255,255,255,.08); border:1px solid rgba(230,194,119,.5); color:#F1E8D5;
      backdrop-filter:blur(8px); cursor:pointer; transition:all .25s; }
    .vr-close:hover{ background:rgba(230,194,119,.9); color:#1a140b; transform:rotate(90deg); }
    .vr-hint{ position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); z-index:4;
      display:flex; flex-direction:column; align-items:center; gap:12px; color:#F1E8D5;
      pointer-events:none; transition:opacity .6s; }
    .vr-hint svg{ animation:swing 2.4s ease-in-out infinite; }
    @keyframes swing{ 0%,100%{ transform:translateX(-14px); } 50%{ transform:translateX(14px); } }
    .vr-hint .t{ font-family:'EB Garamond',serif; font-style:italic; font-size:18px;
      background:rgba(8,6,3,.5); padding:6px 16px; border-radius:9999px; }
    .vr-bottom{ position:absolute; left:0; right:0; bottom:0; z-index:5; display:flex; align-items:center;
      justify-content:center; gap:18px; padding:22px;
      background:linear-gradient(0deg,rgba(8,6,3,.82),rgba(8,6,3,0)); }
    .vr-nav{ width:50px; height:50px; border-radius:50%; display:grid; place-items:center;
      background:rgba(255,255,255,.06); border:1px solid rgba(230,194,119,.45); color:#E6C277;
      cursor:pointer; transition:all .25s; backdrop-filter:blur(6px); }
    .vr-nav:hover{ background:rgba(230,194,119,.9); color:#1a140b; }
    .vr-dots{ display:flex; gap:10px; align-items:center; }
    .vr-dot{ width:11px; height:11px; border-radius:50%; background:rgba(230,194,119,.3);
      border:1px solid rgba(230,194,119,.6); cursor:pointer; transition:all .3s; }
    .vr-dot.active{ background:linear-gradient(180deg,#E8C77E,#BC831F); transform:scale(1.3);
      box-shadow:0 0 12px rgba(230,194,119,.8); }
    .vr-tools{ position:absolute; right:22px; bottom:96px; z-index:6; display:flex; flex-direction:column; gap:10px; }
    .vr-tool{ width:44px; height:44px; border-radius:12px; display:grid; place-items:center;
      background:rgba(8,6,3,.6); border:1px solid rgba(230,194,119,.4); color:#E6C277; cursor:pointer;
      backdrop-filter:blur(6px); transition:all .25s; }
    .vr-tool:hover{ background:rgba(230,194,119,.85); color:#1a140b; }
    .vr-tool.off{ opacity:.45; }
    .pnlm-hotspot-base.custom-info{ width:30px; height:30px; margin:-15px 0 0 -15px; }
    .custom-info{ border-radius:50%; background:rgba(230,194,119,.92);
      box-shadow:0 0 0 6px rgba(230,194,119,.25), 0 0 18px rgba(230,194,119,.7);
      display:grid; place-items:center; cursor:pointer; animation:hp 2.4s ease-out infinite; }
    @keyframes hp{ 0%{ box-shadow:0 0 0 0 rgba(230,194,119,.5),0 0 18px rgba(230,194,119,.7);} 70%{ box-shadow:0 0 0 16px rgba(230,194,119,0),0 0 18px rgba(230,194,119,.7);} 100%{ box-shadow:0 0 0 0 rgba(230,194,119,0),0 0 18px rgba(230,194,119,.7);} }
    .custom-info::after{ content:'i'; font-family:'Playfair Display',serif; font-weight:700; font-style:italic; color:#1a140b; font-size:16px; }
    .custom-info span{ position:absolute; bottom:140%; left:50%; transform:translateX(-50%);
      white-space:nowrap; background:rgba(8,6,3,.92); color:#F1E8D5; font-family:'EB Garamond',serif;
      font-size:16px; padding:7px 14px; border-radius:8px; border:1px solid rgba(230,194,119,.5);
      opacity:0; transition:opacity .25s; pointer-events:none; }
    .custom-info:hover span{ opacity:1; }
    .pnlm-hotspot-base.custom-door{ width:54px; height:54px; margin:-27px 0 0 -27px; }
    .custom-door{ border-radius:50%; background:rgba(230,194,119,.95); color:#1a140b;
      display:grid; place-items:center; cursor:pointer;
      box-shadow:0 0 0 8px rgba(230,194,119,.22), 0 8px 26px rgba(0,0,0,.45);
      animation:doorp 2.2s ease-out infinite; transition:background .25s; }
    .custom-door:hover{ background:#fff; }
    .custom-door span{ position:absolute; top:122%; left:50%; transform:translateX(-50%); white-space:nowrap;
      background:rgba(8,6,3,.92); color:#F1E8D5; font-family:'EB Garamond',serif; font-style:italic;
      font-size:16px; padding:6px 14px; border-radius:9999px; border:1px solid rgba(230,194,119,.6); pointer-events:none; }
    @keyframes doorp{ 0%{ box-shadow:0 0 0 0 rgba(230,194,119,.55),0 8px 26px rgba(0,0,0,.45);} 70%{ box-shadow:0 0 0 22px rgba(230,194,119,0),0 8px 26px rgba(0,0,0,.45);} 100%{ box-shadow:0 0 0 0 rgba(230,194,119,0),0 8px 26px rgba(0,0,0,.45);} }
    @media(max-width:640px){
      .vr-roomtitle .n{ font-size:19px; } .vr-tools{ bottom:90px; right:14px; }
      .vr-hint .t{ font-size:15px; }
    }
  `;
  document.head.appendChild(style);

  const m=document.createElement('div');
  m.id='vrModal';
  m.innerHTML=`
    <div id="pano"></div>
    <div class="vr-top">
      <div class="vr-roomtitle">
        <div class="k" id="vrKick"></div>
        <div class="n" id="vrName"></div>
      </div>
      <div class="vr-close" id="vrClose" title="Đóng" aria-label="Close">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </div>
    </div>
    <div class="vr-hint" id="vrHint">
      <svg viewBox="0 0 64 32" width="64" height="32" fill="none" stroke="#E6C277" stroke-width="2" stroke-linecap="round"><path d="M14 16h36M14 16l8-7M14 16l8 7M50 16l-8-7M50 16l-8 7"/></svg>
      <div class="t" id="vrHintT"></div>
    </div>
    <div class="vr-tools">
      <div class="vr-tool" id="vrRotate" title="Tự xoay">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 3v5h-5"/></svg>
      </div>
      <div class="vr-tool" id="vrFs" title="Toàn màn hình">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6"/></svg>
      </div>
    </div>
    <div class="vr-bottom">
      <div class="vr-nav" id="vrPrev" aria-label="Phòng trước"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M15 5l-7 7 7 7"/></svg></div>
      <div class="vr-dots" id="vrDots"></div>
      <div class="vr-nav" id="vrNext" aria-label="Phòng sau"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M9 5l7 7-7 7"/></svg></div>
    </div>`;
  document.body.appendChild(m);

  // dots
  const dots=m.querySelector('#vrDots');
  ROOMS.forEach((_,i)=>{ const d=document.createElement('div'); d.className='vr-dot'; d.dataset.i=i;
    d.addEventListener('click',()=>loadRoom(i)); dots.appendChild(d); });

  m.querySelector('#vrClose').addEventListener('click', closeVR);
  m.querySelector('#vrPrev').addEventListener('click', ()=>loadRoom((curRoom+5)%6));
  m.querySelector('#vrNext').addEventListener('click', ()=>loadRoom((curRoom+1)%6));
  m.querySelector('#vrRotate').addEventListener('click', toggleRotate);
  m.querySelector('#vrFs').addEventListener('click', toggleFs);
  document.addEventListener('keydown', (e)=>{
    if(!m.classList.contains('open')) return;
    if(e.key==='Escape') closeVR();
    if(e.key==='ArrowRight') loadRoom((curRoom+1)%6);
    if(e.key==='ArrowLeft') loadRoom((curRoom+5)%6);
  });
}

function hotspotTooltip(div, args){
  div.classList.add('custom-info');
  const s=document.createElement('span'); s.textContent=args.text; div.appendChild(s);
}

function hotspotDoor(div, args){
  div.classList.add('custom-door');
  div.innerHTML='<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V5M5 12l7-7 7 7"/></svg>';
  const s=document.createElement('span'); s.textContent=args.text; div.appendChild(s);
}

function loadRoom(idx){
  curRoom=idx;
  const room=ROOMS[idx], zone=(typeof ZONES!=='undefined')?ZONES[idx]:null;

  // title (room.name wins, else zone label, else tag)
  const bigName = room.name ? room.name[L()] : (zone ? zone[L()] : room.tag[L()]);
  const setKick = (extra)=> document.getElementById('vrKick').textContent = room.tag[L()] + (extra? ' · '+extra : '');
  setKick();
  document.getElementById('vrName').textContent = bigName;
  document.querySelectorAll('.vr-dot').forEach(d=>d.classList.toggle('active', +d.dataset.i===idx));

  if(viewer){ viewer.destroy(); viewer=null; }

  // ---- multi-scene walkthrough room (real photos) ----
  if(room.scenes){
    const scenes={};
    room.scenes.forEach(s=>{
      scenes[s.id] = {
        type:'equirectangular', panorama:s.photo, yaw:s.yaw??0, pitch:s.pitch??-2, hfov:100,
        hotSpots:[
          ...(s.hotspots||[]).map(h=>({ pitch:h.pitch, yaw:h.yaw, type:'info',
            cssClass:'custom-info', createTooltipFunc:hotspotTooltip, createTooltipArgs:{text:h[L()]||h.vi} })),
          ...(s.links||[]).map(lk=>({ pitch:lk.pitch??-4, yaw:lk.yaw, type:'scene', sceneId:lk.to,
            cssClass:'custom-door', createTooltipFunc:hotspotDoor, createTooltipArgs:{text:lk[L()]||lk.vi} })),
        ]
      };
    });
    viewer = window.pannellum.viewer('pano', {
      default:{ firstScene:room.scenes[0].id, autoLoad:true, showControls:false,
        hfov:100, minHfov:50, maxHfov:120, sceneFadeDuration:800, autoRotate: autoRot? -2 : 0 },
      scenes
    });
    viewer.on('scenechange', (id)=>{
      const s = room.scenes.find(x=>x.id===id);
      setKick(s ? s.label[L()] : '');
    });
    setKick(room.scenes[0].label ? room.scenes[0].label[L()] : '');
    return;
  }

  // ---- single real photo ----
  let panorama, hotSpots, initYaw=-150, initPitch=-2;
  if(room.photo){
    panorama = room.photo;
    initYaw = room.initYaw ?? 0; initPitch = room.initPitch ?? -2;
    hotSpots = (room.hotspots||[]).map(h=>({ pitch:h.pitch, yaw:h.yaw, type:'info', text:h[L()]||h.vi }));
  }else{
    const gen = generatePano(idx);
    panorama = gen.dataURL; hotSpots = gen.hotSpots;
  }

  viewer = window.pannellum.viewer('pano', {
    type:'equirectangular', panorama, autoLoad:true,
    autoRotate: autoRot? -2 : 0, showControls:false, hfov:100, minHfov:50, maxHfov:120,
    pitch:initPitch, yaw:initYaw, compass:false, draggable:true,
    hotSpots: hotSpots.map(h=>({ ...h, cssClass:'custom-info', createTooltipFunc:hotspotTooltip, createTooltipArgs:{text:h.text} })),
    sceneFadeDuration:600,
  });
}

function showHint(){
  const h=document.getElementById('vrHint');
  document.getElementById('vrHintT').textContent =
    L()==='vi' ? 'Kéo để nhìn quanh không gian' : 'Drag to look around the space';
  h.style.opacity='1';
  clearTimeout(hintTimer);
  hintTimer=setTimeout(()=>{ h.style.opacity='0'; }, 3200);
}

function toggleRotate(){
  autoRot=!autoRot;
  document.getElementById('vrRotate').classList.toggle('off', !autoRot);
  if(viewer){ autoRot? viewer.startAutoRotate(-2) : viewer.stopAutoRotate(); }
}
function toggleFs(){
  const m=document.getElementById('vrModal');
  if(!document.fullscreenElement){ m.requestFullscreen?.(); } else { document.exitFullscreen?.(); }
}

function openVR(idx){
  if(!window.pannellum){ alert('Trình xem 360° đang tải, vui lòng thử lại sau giây lát.'); return; }
  ensureModal();
  const m=document.getElementById('vrModal');
  m.classList.add('open');
  document.body.style.overflow='hidden';
  autoRot=true; document.getElementById('vrRotate').classList.remove('off');
  loadRoom(idx||0);
  showHint();
}
function closeVR(){
  const m=document.getElementById('vrModal');
  m.classList.remove('open');
  document.body.style.overflow='';
  if(document.fullscreenElement) document.exitFullscreen?.();
  setTimeout(()=>{ if(viewer){ viewer.destroy(); viewer=null; } }, 400);
}

window.openVR = openVR;
