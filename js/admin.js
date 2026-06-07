/* =========================================================
   admin.js — Trang quản trị Không gian VR 360°
   Đọc/ghi data/spaces.json + ảnh/audio qua GitHub API.
   Không có server: "đăng nhập" là lớp che nhẹ; quyền ghi thật = GitHub token.
   ========================================================= */

/* ---------- cấu hình repo ---------- */
const GH = { owner: 'Rei-1407', repo: 'VietnamPressMuseumWebsiteVR360', branch: 'main' };
const ADMIN_USER = 'Chuyen';
const ADMIN_PASS = '1234567890';

/* ---------- trạng thái ---------- */
let state = { spaces: [] };
let token = '';
let dirty = false;
let pending = null;        // mục tiêu cho lần chọn file kế tiếp
let imagesToDelete = [];   // file chờ xoá khi lưu

// admin.html nằm ở /admin/ → URL hiển thị trỏ ngược ra gốc bằng '../'.
// (Đường dẫn GitHub API thì KHÔNG dùng '../'.)
const PREVIEW = '../';
const previewCache = {};   // path -> dataURL của file vừa tải lên (hiện ngay, chưa cần build)

/* ---------- tiện ích ---------- */
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
function setStatus(msg, kind){ const el=$('#status'); el.textContent=msg||''; el.className='text-sm '+(kind==='ok'?'text-green-600':kind==='err'?'text-red-600':'text-stone-500'); }
function markDirty(v){ dirty=(v!==false); $('#dirty').classList.toggle('hidden', !dirty); }

function slug(s){
  return String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'')
    .replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase()
    .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,32) || 'media';
}
function getByPath(root, path){ return path.split('.').reduce((o,k)=> (o==null?o:o[k]), root); }
function setByPath(root, path, val){ const ks=path.split('.'); const last=ks.pop(); let o=root; for(const k of ks) o=o[k]; o[last]=val; }
function delByPath(root, path){ const ks=path.split('.'); const last=ks.pop(); let o=root; for(const k of ks){ if(o==null) return; o=o[k]; } if(o) delete o[last]; }
function markOldForDelete(p){ if(p && typeof p==='string' && /^assets\/(panos|exhibits|audio)\//.test(p)) imagesToDelete.push(p); }

function b64utf8(str){
  const bytes = new TextEncoder().encode(str);
  let bin=''; const chunk=0x8000;
  for(let i=0;i<bytes.length;i+=chunk) bin += String.fromCharCode.apply(null, bytes.subarray(i,i+chunk));
  return btoa(bin);
}
function fileToBase64(file){
  return new Promise((res,rej)=>{ const r=new FileReader(); r.onload=()=>res(String(r.result).split(',')[1]); r.onerror=rej; r.readAsDataURL(file); });
}
// nén ảnh trong trình duyệt → { base64, dataURL } (JPEG)
function loadImageEl(file){
  return new Promise((res,rej)=>{ const url=URL.createObjectURL(file); const im=new Image();
    im.onload=()=>{ URL.revokeObjectURL(url); res(im); }; im.onerror=()=>{ URL.revokeObjectURL(url); rej(new Error('Ảnh không hợp lệ')); }; im.src=url; });
}
async function compressToBase64(file, maxW, quality){
  const im = await loadImageEl(file);
  const scale = Math.min(1, maxW / im.naturalWidth);
  const w = Math.max(1, Math.round(im.naturalWidth*scale)), h = Math.max(1, Math.round(im.naturalHeight*scale));
  const cv=document.createElement('canvas'); cv.width=w; cv.height=h;
  const ctx=cv.getContext('2d'); ctx.imageSmoothingQuality='high'; ctx.drawImage(im,0,0,w,h);
  const dataURL = cv.toDataURL('image/jpeg', quality);
  return { base64: dataURL.split(',')[1], dataURL };
}

/* ---------- GitHub API ---------- */
function ghHeaders(){ return { 'Authorization':'Bearer '+token, 'Accept':'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28' }; }
async function ghGetContent(path){
  const r = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${path}?ref=${GH.branch}&t=${Date.now()}`, { headers: ghHeaders(), cache:'no-store' });
  if(r.status===404) return null;
  if(!r.ok) throw new Error('Đọc '+path+' lỗi ('+r.status+')');
  return r.json();
}
async function ghPutFile(path, base64, message, sha){
  const body = { message, content: base64, branch: GH.branch };
  if(sha) body.sha = sha;
  const r = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${path}`, { method:'PUT', headers:{...ghHeaders(),'Content-Type':'application/json'}, body: JSON.stringify(body) });
  if(!r.ok){ throw new Error('Ghi '+path+' lỗi ('+r.status+'): '+(await r.text()).slice(0,200)); }
  return r.json();
}
async function ghDeleteFile(path, message, sha){
  const r = await fetch(`https://api.github.com/repos/${GH.owner}/${GH.repo}/contents/${path}`, { method:'DELETE', headers:{...ghHeaders(),'Content-Type':'application/json'}, body: JSON.stringify({ message, sha, branch: GH.branch }) });
  if(!r.ok) throw new Error('Xoá '+path+' lỗi ('+r.status+')');
  return r.json();
}
async function ghDeletePathBestEffort(path){
  try{ const c = await ghGetContent(path); if(c && c.sha) await ghDeleteFile(path, 'admin: xoá file '+path, c.sha); }catch(e){ /* bỏ qua */ }
}

/* ---------- token ---------- */
function loadToken(){ token = localStorage.getItem('gh_token') || ''; updateTokenBadge(); }
function updateTokenBadge(){
  const b=$('#tokenBadge');
  if(token){ b.textContent='Đã có token'; b.className='pill bg-green-100 text-green-700'; }
  else { b.textContent='Chưa có token'; b.className='pill bg-stone-200 text-stone-600'; }
}
function requireToken(){ if(!token){ $('#tokenPanel').classList.remove('hidden'); $('#tokenInput').focus(); throw new Error('Chưa có GitHub token — hãy dán token rồi thử lại.'); } }

/* =========================================================
   RENDER
   ========================================================= */
function spaceType(sp){ return sp.scenes ? 'scenes' : (sp.photo ? 'photo' : 'generated'); }
function previewUrl(src){ if(!src) return ''; return previewCache[src] ? previewCache[src] : (src.startsWith('http') ? src : PREVIEW + src + '?t=' + Date.now()); }

function render(){
  const root = $('#spaces');
  if(!state.spaces.length){ root.innerHTML = `<div class="card p-6 text-center text-stone-500">Chưa có không gian nào. Bấm “➕ Thêm không gian”.</div>`; return; }
  root.innerHTML = state.spaces.map((sp,i)=>renderSpace(sp,i)).join('');
}

function renderSpace(sp, i){
  const type = spaceType(sp);
  const typeLabel = { scenes:'Nhiều cảnh (ảnh thật)', photo:'Ảnh 360° thật', generated:'Dựng tạm (chưa có ảnh)' }[type];
  const typeColor = { scenes:'bg-amber-100 text-amber-700', photo:'bg-green-100 text-green-700', generated:'bg-stone-200 text-stone-600' }[type];
  return `
  <div class="card p-4 md:p-5" data-space="${i}">
    <div class="flex items-start justify-between gap-3 mb-4">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="pill ${typeColor}">${typeLabel}</span>
        <span class="font-bold text-stone-700">${i+1}. ${esc(sp.card?.vi || '(chưa đặt tên)')}</span>
      </div>
      <div class="flex items-center gap-1">
        <button class="btn btn-ghost px-2 py-1" data-act="up" data-i="${i}" title="Lên">▲</button>
        <button class="btn btn-ghost px-2 py-1" data-act="down" data-i="${i}" title="Xuống">▼</button>
        <button class="btn btn-danger px-3 py-1" data-act="del-space" data-i="${i}">🗑 Xoá</button>
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-3 mb-4">
      ${field('Tên thẻ (VI)', `${i}.card.vi`, sp.card?.vi)}
      ${field('Tên thẻ (EN)', `${i}.card.en`, sp.card?.en)}
      ${field('Nhãn nhỏ (VI)', `${i}.tag.vi`, sp.tag?.vi)}
      ${field('Nhãn nhỏ (EN)', `${i}.tag.en`, sp.tag?.en)}
      ${field('Tên phòng VR (VI)', `${i}.name.vi`, sp.name?.vi)}
      ${field('Tên phòng VR (EN)', `${i}.name.en`, sp.name?.en)}
    </div>

    ${type==='scenes'   ? renderScenes(sp,i)   : ''}
    ${type==='photo'    ? renderPhoto(sp,i)     : ''}
    ${type==='generated'? renderGenerated(sp,i) : ''}

    ${audioBox(sp,i)}
  </div>`;
}

function field(label, path, val, opts){
  opts = opts || {};
  const t = opts.num ? 'number' : 'text';
  const step = opts.num ? ' step="1"' : '';
  return `<label class="block">
    <span class="lbl">${esc(label)}</span>
    <input class="inp mt-1" type="${t}"${step} data-path="${path}" ${opts.num?'data-num="1"':''} value="${esc(val)}" placeholder="${esc(opts.ph||'')}"/>
  </label>`;
}

function imgBox(path, src, label, btns){
  const url = previewUrl(src);
  return `<div class="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
    <div class="w-28 h-20 rounded-lg bg-stone-200 bg-center bg-cover shrink-0" style="${src?`background-image:url('${url}')`:''}"></div>
    <div class="min-w-0">
      <div class="lbl">${esc(label)}</div>
      <div class="text-xs text-stone-500 truncate">${src?esc(src):'(chưa có ảnh)'}</div>
      <div class="flex gap-2 mt-2">${btns}</div>
    </div>
  </div>`;
}

/* ----- audio cho 1 phòng ----- */
function audioBox(sp, i){
  const has = !!sp.audio;
  const loop = sp.audioLoop !== false;
  const src = has ? previewUrl(sp.audio) : '';
  return `<div class="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <div class="flex items-center gap-2 min-w-0">
        <span class="lbl">🔊 Âm thanh phòng</span>
        ${has?`<span class="text-xs text-stone-500 truncate max-w-[200px]">${esc(sp.audio.split('/').pop())}</span>`:'<span class="text-xs text-stone-400">(chưa có — tuỳ chọn)</span>'}
      </div>
      <div class="flex items-center gap-2">
        ${has?`<audio controls preload="none" src="${esc(src)}" style="height:32px;max-width:190px"></audio>`:''}
        <button class="btn btn-ghost px-3 py-1" data-act="audio" data-i="${i}">${has?'Đổi':'⬆️ Tải audio'}</button>
        ${has?`<button class="btn btn-danger px-2 py-1" data-act="audio-del" data-i="${i}">✕</button>`:''}
      </div>
    </div>
    ${has?`<label class="flex items-center gap-2 mt-2 text-sm text-stone-600"><input type="checkbox" data-path="${i}.audioLoop" data-bool="1" ${loop?'checked':''}/> Lặp lại (hợp với nhạc nền; tắt nếu là thuyết minh đọc 1 lần)</label>`:''}
  </div>`;
}

function renderPhoto(sp, i){
  return `
  <div class="space-y-3">
    ${imgBox(`${i}.photo`, sp.photo, 'Ảnh 360° của phòng', `
      <button class="btn btn-ghost px-3 py-1" data-act="replace-photo" data-i="${i}">⬆️ Đổi ảnh</button>`)}
    ${hotspotsEditor(sp.hotspots||[], `${i}.hotspots`)}
    <details class="text-sm">
      <summary class="text-amber-700 font-medium">Tuỳ chọn nâng cao (hướng nhìn ban đầu)</summary>
      <div class="grid grid-cols-2 gap-3 mt-2">
        ${field('Góc ngang ban đầu (yaw)', `${i}.initYaw`, sp.initYaw ?? 0, {num:1})}
        ${field('Góc dọc ban đầu (pitch)', `${i}.initPitch`, sp.initPitch ?? -2, {num:1})}
      </div>
    </details>
  </div>`;
}

function renderScenes(sp, i){
  const ids = sp.scenes.map(s=>s.id);
  const scenes = sp.scenes.map((sc,j)=>`
    <div class="rounded-xl border border-stone-200 p-3">
      <div class="flex items-center justify-between mb-2">
        <span class="pill bg-stone-100 text-stone-600">Cảnh ${j+1} · id: ${esc(sc.id)}</span>
        <button class="btn btn-danger px-2 py-1" data-act="del-scene" data-i="${i}" data-j="${j}">Xoá cảnh</button>
      </div>
      ${imgBox(`${i}.scenes.${j}.photo`, sc.photo, 'Ảnh 360° của cảnh', `
        <button class="btn btn-ghost px-3 py-1" data-act="replace-scene" data-i="${i}" data-j="${j}">⬆️ Đổi ảnh</button>`)}
      <div class="grid sm:grid-cols-2 gap-3 mt-3">
        ${field('Nhãn cảnh (VI)', `${i}.scenes.${j}.label.vi`, sc.label?.vi)}
        ${field('Nhãn cảnh (EN)', `${i}.scenes.${j}.label.en`, sc.label?.en)}
      </div>
      <div class="mt-3">${hotspotsEditor(sc.hotspots||[], `${i}.scenes.${j}.hotspots`)}</div>
      <div class="mt-3">${linksEditor(sc.links||[], `${i}.scenes.${j}.links`, ids)}</div>
    </div>`).join('');
  return `<div class="space-y-3">
    ${scenes}
    <button class="btn btn-ghost" data-act="add-scene" data-i="${i}">➕ Thêm cảnh (ảnh nối tiếp)</button>
  </div>`;
}

function renderGenerated(sp, i){
  const rows = (sp.exhibits||[]).map((ex,k)=>`
    <div class="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
      <input class="inp" data-path="${i}.exhibits.${k}.vi" value="${esc(ex.vi)}" placeholder="Hiện vật (VI)"/>
      <input class="inp" data-path="${i}.exhibits.${k}.en" value="${esc(ex.en)}" placeholder="Exhibit (EN)"/>
      <button class="btn btn-danger px-2 py-1" data-act="del-exhibit" data-i="${i}" data-k="${k}">✕</button>
    </div>`).join('');
  return `<div class="space-y-3">
    <div class="text-sm text-stone-500 bg-stone-50 border border-stone-200 rounded-lg p-3">
      Phòng này <b>chưa có ảnh 360° thật</b> — hệ thống tự dựng không gian theo danh sách hiện vật bên dưới.
    </div>
    <button class="btn btn-gold" data-act="to-photo" data-i="${i}">⬆️ Tải ảnh 360° thật lên (chuyển thành phòng ảnh thật)</button>
    <div>
      <div class="lbl mb-1">Danh sách hiện vật (dựng tạm)</div>
      <div class="space-y-2">${rows || '<div class="text-sm text-stone-400">Chưa có hiện vật.</div>'}</div>
      <button class="btn btn-ghost mt-2" data-act="add-exhibit" data-i="${i}">➕ Thêm hiện vật</button>
    </div>
  </div>`;
}

/* ----- editor điểm "i": toạ độ + tiêu đề + ẢNH + MÔ TẢ (popup khi bấm) ----- */
function hotspotsEditor(list, path){
  const si = path.split('.')[0];
  const rows = list.map((h,k)=>{
    const hp = `${path}.${k}`;
    const hasImg = !!h.img;
    return `
    <div class="rounded-lg border border-stone-200 bg-white/70 p-2.5 space-y-2">
      <div class="grid grid-cols-[58px_58px_1fr_1fr_auto] gap-2 items-center">
        <input class="inp" type="number" step="1" data-path="${hp}.pitch" data-num="1" value="${esc(h.pitch)}" title="pitch (lên/xuống)"/>
        <input class="inp" type="number" step="1" data-path="${hp}.yaw"   data-num="1" value="${esc(h.yaw)}" title="yaw (trái/phải)"/>
        <input class="inp" data-path="${hp}.vi" value="${esc(h.vi)}" placeholder="Tiêu đề (VI)"/>
        <input class="inp" data-path="${hp}.en" value="${esc(h.en)}" placeholder="Title (EN)"/>
        <button class="btn btn-danger px-2 py-1" data-act="del-hotspot" data-path="${path}" data-k="${k}" title="Xoá điểm">✕</button>
      </div>
      <div class="flex items-start gap-2">
        <div class="shrink-0 w-24">
          <div class="w-24 h-16 rounded bg-stone-200 bg-center bg-cover border border-stone-200" style="${hasImg?`background-image:url('${previewUrl(h.img)}')`:''}"></div>
          <div class="flex gap-1 mt-1">
            <button class="btn btn-ghost px-2 py-0.5 text-xs" data-act="hs-img" data-path="${hp}.img" data-i="${si}">${hasImg?'Đổi ảnh':'➕ Ảnh'}</button>
            ${hasImg?`<button class="btn btn-danger px-2 py-0.5 text-xs" data-act="hs-img-del" data-path="${hp}.img" data-img="${esc(h.img)}">✕</button>`:''}
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
          <textarea class="inp" rows="2" data-path="${hp}.dVi" placeholder="Mô tả chi tiết (VI) — hiện trong popup">${esc(h.dVi)}</textarea>
          <textarea class="inp" rows="2" data-path="${hp}.dEn" placeholder="Description (EN)">${esc(h.dEn)}</textarea>
        </div>
      </div>
    </div>`;
  }).join('');
  return `<div>
    <div class="flex items-center gap-2 mb-1"><span class="lbl">Điểm chú thích “i”</span>
      <span class="text-[11px] text-stone-400">bấm vào điểm sẽ bung ẢNH + MÔ TẢ · pitch −90…90 · yaw −180…180</span></div>
    <div class="space-y-2">${rows || '<div class="text-sm text-stone-400">Chưa có điểm chú thích.</div>'}</div>
    <button class="btn btn-ghost mt-2" data-act="add-hotspot" data-path="${path}">➕ Thêm điểm</button>
  </div>`;
}

function linksEditor(list, path, sceneIds){
  const rows = list.map((lk,k)=>{
    const opts = sceneIds.map(id=>`<option value="${esc(id)}" ${id===lk.to?'selected':''}>${esc(id)}</option>`).join('');
    return `<div class="grid grid-cols-[64px_64px_1fr_1fr_auto] gap-2 items-center">
      <input class="inp" type="number" step="1" data-path="${path}.${k}.pitch" data-num="1" value="${esc(lk.pitch)}" title="pitch"/>
      <input class="inp" type="number" step="1" data-path="${path}.${k}.yaw"   data-num="1" value="${esc(lk.yaw)}" title="yaw"/>
      <select class="inp" data-path="${path}.${k}.to" title="Đi tới cảnh">${opts}</select>
      <input class="inp" data-path="${path}.${k}.vi" value="${esc(lk.vi)}" placeholder="Nhãn cửa (VI)"/>
      <button class="btn btn-danger px-2 py-1" data-act="del-link" data-path="${path}" data-k="${k}">✕</button>
    </div>
    <input class="inp" data-path="${path}.${k}.en" value="${esc(lk.en)}" placeholder="Door label (EN)"/>`;
  }).join('');
  return `<div>
    <div class="lbl mb-1">Nút “cửa” đi sang cảnh khác</div>
    <div class="space-y-2">${rows || '<div class="text-sm text-stone-400">Chưa có cửa.</div>'}</div>
    <button class="btn btn-ghost mt-2" data-act="add-link" data-path="${path}">➕ Thêm cửa</button>
  </div>`;
}

/* =========================================================
   SỰ KIỆN
   ========================================================= */
// cập nhật giá trị khi gõ / đổi (không render lại để khỏi mất con trỏ)
function onFieldChange(e){
  const el = e.target.closest('[data-path]'); if(!el) return;
  let v;
  if(el.dataset.bool){ v = el.checked; }
  else { v = el.value; if(el.dataset.num){ v = (v==='' || v==='-') ? 0 : Number(v); if(Number.isNaN(v)) v=0; } }
  setByPath(state.spaces, el.dataset.path, v);
  markDirty(true);
}
$('#spaces').addEventListener('input', onFieldChange);
$('#spaces').addEventListener('change', onFieldChange);   // cho <select> và checkbox

// các nút thao tác
$('#spaces').addEventListener('click', async (e)=>{
  const btn = e.target.closest('[data-act]'); if(!btn) return;
  const act = btn.dataset.act;
  const i = btn.dataset.i!=null ? +btn.dataset.i : null;
  const j = btn.dataset.j!=null ? +btn.dataset.j : null;
  const k = btn.dataset.k!=null ? +btn.dataset.k : null;
  const path = btn.dataset.path;

  try{
    if(act==='up' && i>0){ [state.spaces[i-1],state.spaces[i]]=[state.spaces[i],state.spaces[i-1]]; markDirty(true); render(); }
    else if(act==='down' && i<state.spaces.length-1){ [state.spaces[i+1],state.spaces[i]]=[state.spaces[i],state.spaces[i+1]]; markDirty(true); render(); }
    else if(act==='del-space'){
      if(!confirm('Xoá không gian này khỏi tour? (Ảnh/audio của nó cũng được dọn khỏi kho khi bấm Lưu)')) return;
      collectImagesToDelete(state.spaces[i]);
      state.spaces.splice(i,1); markDirty(true); render();
    }
    else if(act==='add-hotspot'){ const arr=getByPath(state.spaces,path); arr.push({pitch:0,yaw:0,vi:'',en:''}); markDirty(true); render(); }
    else if(act==='del-hotspot'){ const arr=getByPath(state.spaces,path); markOldForDelete(arr[k]?.img); arr.splice(k,1); markDirty(true); render(); }
    else if(act==='hs-img'){ pending={kind:'exhibit-img', i, target:path}; pickFile(); }
    else if(act==='hs-img-del'){ markOldForDelete(btn.dataset.img); delByPath(state.spaces, path); markDirty(true); render(); }
    else if(act==='add-link'){ const arr=getByPath(state.spaces,path); const firstId=(state.spaces[+path.split('.')[0]].scenes||[{}])[0]?.id||''; arr.push({pitch:-6,yaw:0,to:firstId,vi:'',en:''}); markDirty(true); render(); }
    else if(act==='del-link'){ getByPath(state.spaces,path).splice(k,1); markDirty(true); render(); }
    else if(act==='add-exhibit'){ state.spaces[i].exhibits = state.spaces[i].exhibits||[]; state.spaces[i].exhibits.push({vi:'',en:''}); markDirty(true); render(); }
    else if(act==='del-exhibit'){ state.spaces[i].exhibits.splice(k,1); markDirty(true); render(); }
    else if(act==='add-scene'){
      const sp=state.spaces[i]; const id='canh-'+(Date.now().toString(36));
      sp.scenes.push({ id, photo:'', yaw:0, pitch:-2, label:{vi:'Cảnh mới',en:'New scene'}, hotspots:[], links:[] });
      markDirty(true); render(); alert('Đã thêm cảnh. Hãy bấm “Đổi ảnh” để tải ảnh 360° cho cảnh này.');
    }
    else if(act==='del-scene'){ const sp=state.spaces[i]; if(sp.scenes.length<=1){ alert('Phòng cần ít nhất 1 cảnh.'); return; } if(!confirm('Xoá cảnh này?')) return; collectImagesToDelete({scenes:[sp.scenes[j]]}); sp.scenes.splice(j,1); markDirty(true); render(); }
    else if(act==='replace-photo'){ pending={kind:'photo', i}; pickFile(); }
    else if(act==='replace-scene'){ pending={kind:'scene', i, j}; pickFile(); }
    else if(act==='to-photo'){ pending={kind:'to-photo', i}; pickFile(); }
    else if(act==='audio'){ pending={kind:'audio', i}; pickFile(); }
    else if(act==='audio-del'){ markOldForDelete(state.spaces[i].audio); delete state.spaces[i].audio; delete state.spaces[i].audioLoop; markDirty(true); render(); }
  }catch(err){ setStatus(err.message,'err'); }
});

/* ---------- gom file để xoá khi lưu ---------- */
function collectImagesToDelete(sp){
  const out=[];
  const add=p=>{ if(p && typeof p==='string') out.push(p); };
  add(sp.photo); add(sp.thumb); add(sp.audio);
  (sp.hotspots||[]).forEach(h=>add(h.img));
  (sp.scenes||[]).forEach(s=>{ add(s.photo); (s.hotspots||[]).forEach(h=>add(h.img)); });
  out.forEach(markOldForDelete);
}

/* ---------- chọn & tải file ---------- */
function pickFile(){
  try{ requireToken(); }catch(e){ setStatus(e.message,'err'); pending=null; return; }
  const fp=$('#filePicker'); fp.value='';
  fp.accept = (pending && pending.kind==='audio') ? 'audio/*' : 'image/jpeg,image/png,image/webp';
  fp.click();
}

$('#filePicker').addEventListener('change', async (e)=>{
  const file = e.target.files[0]; if(!file || !pending) return;
  const p = pending; pending=null;
  try{
    requireToken();
    const i = p.i;
    const hint = (i!=null && state.spaces[i]?.card?.vi) || 'media';
    const ts = Date.now();

    /* --- AUDIO --- */
    if(p.kind==='audio'){
      setStatus('Đang tải audio lên…');
      const ext=(file.name.match(/\.([a-z0-9]+)$/i)?.[1]||'mp3').toLowerCase();
      const apath=`assets/audio/${slug(hint)}-${ts}.${ext}`;
      const b64=await fileToBase64(file);
      previewCache[apath]='data:'+(file.type||'audio/mpeg')+';base64,'+b64;
      await ghPutFile(apath, b64, 'admin: tải audio '+apath);
      const sp=state.spaces[i]; markOldForDelete(sp.audio); sp.audio=apath; if(sp.audioLoop===undefined) sp.audioLoop=true;
      markDirty(true); render(); setStatus('Đã tải audio ✓ — nhớ bấm “Lưu thay đổi”.','ok'); return;
    }

    /* --- ẢNH HIỆN VẬT (popup) — nén nhỏ --- */
    if(p.kind==='exhibit-img'){
      setStatus('Đang xử lý & tải ảnh…');
      const { base64, dataURL } = await compressToBase64(file, 1600, 0.82);
      const ipath=`assets/exhibits/${slug(hint)}-${ts}.jpg`;
      previewCache[ipath]=dataURL;
      await ghPutFile(ipath, base64, 'admin: tải ảnh hiện vật '+ipath);
      markOldForDelete(getByPath(state.spaces, p.target));
      setByPath(state.spaces, p.target, ipath);
      markDirty(true); render(); setStatus('Đã tải ảnh ✓ — nhớ bấm “Lưu thay đổi”.','ok'); return;
    }

    /* --- ẢNH 360° (pano) — nén vừa + tự tạo thumbnail --- */
    setStatus('Đang xử lý & tải ảnh 360°… (có thể mất chút thời gian)');
    const full  = await compressToBase64(file, 6144, 0.85);
    const thumb = await compressToBase64(file, 1000, 0.80);
    const fullPath  = `assets/panos/${slug(hint)}-${ts}.jpg`;
    const thumbPath = `assets/panos/${slug(hint)}-${ts}-thumb.jpg`;
    previewCache[fullPath]=full.dataURL; previewCache[thumbPath]=thumb.dataURL;
    await ghPutFile(fullPath, full.base64, 'admin: tải ảnh 360° '+fullPath);
    await ghPutFile(thumbPath, thumb.base64, 'admin: thumbnail '+thumbPath);

    const sp=state.spaces[i];
    if(p.kind==='photo'){ markOldForDelete(sp.photo); markOldForDelete(sp.thumb); sp.photo=fullPath; sp.thumb=thumbPath; }
    else if(p.kind==='scene'){ const sc=sp.scenes[p.j]; markOldForDelete(sc.photo); sc.photo=fullPath; if(p.j===0){ markOldForDelete(sp.thumb); sp.thumb=thumbPath; } }
    else if(p.kind==='to-photo'){ delete sp.theme; delete sp.exhibits; sp.photo=fullPath; sp.thumb=thumbPath; sp.initYaw=0; sp.initPitch=-2; sp.hotspots=sp.hotspots||[]; }
    else if(p.kind==='new'){ state.spaces.push({ card:{vi:'Không gian mới',en:'New space'}, thumb:thumbPath, tag:{vi:'',en:''}, name:{vi:'Không gian mới',en:'New space'}, photo:fullPath, initYaw:0, initPitch:-2, hotspots:[] }); }

    markDirty(true); render(); setStatus('Đã tải ảnh 360° ✓ — nhớ bấm “Lưu thay đổi”.','ok');
  }catch(err){ setStatus(err.message,'err'); }
});

/* ---------- nút toolbar ---------- */
$('#btnAdd').addEventListener('click', ()=>{ pending={kind:'new', i:null}; pickFile(); });

$('#btnReload').addEventListener('click', async ()=>{
  if(dirty && !confirm('Có thay đổi chưa lưu. Tải lại sẽ mất các thay đổi đó. Tiếp tục?')) return;
  await loadSpaces(); markDirty(false); setStatus('Đã tải lại từ máy chủ.', 'ok');
});

$('#btnSave').addEventListener('click', async ()=>{
  try{
    requireToken();
    setStatus('Đang lưu…');
    // 1) xoá các file không còn dùng (best-effort)
    const stillUsed = new Set();
    state.spaces.forEach(sp=>{
      [sp.photo,sp.thumb,sp.audio].forEach(p=>p&&stillUsed.add(p));
      (sp.hotspots||[]).forEach(h=>h.img&&stillUsed.add(h.img));
      (sp.scenes||[]).forEach(s=>{ s.photo&&stillUsed.add(s.photo); (s.hotspots||[]).forEach(h=>h.img&&stillUsed.add(h.img)); });
    });
    for(const path of [...new Set(imagesToDelete)]) if(!stillUsed.has(path)) await ghDeletePathBestEffort(path);
    imagesToDelete = [];
    // 2) ghi data/spaces.json
    const cur = await ghGetContent('data/spaces.json');
    const json = JSON.stringify(state.spaces, null, 2) + '\n';
    await ghPutFile('data/spaces.json', b64utf8(json), 'admin: cập nhật không gian VR', cur && cur.sha);
    markDirty(false);
    setStatus('Đã lưu ✓ Web sẽ tự cập nhật sau ~1–2 phút (nhớ Ctrl+F5).', 'ok');
  }catch(err){ setStatus(err.message,'err'); }
});

/* ---------- token UI ---------- */
$('#btnToken').addEventListener('click', ()=> $('#tokenPanel').classList.toggle('hidden'));
$('#btnSaveToken').addEventListener('click', ()=>{
  const v=$('#tokenInput').value.trim();
  if(!v){ $('#tokenMsg').textContent='Hãy dán token.'; $('#tokenMsg').className='text-sm mt-2 text-red-600'; return; }
  token=v; localStorage.setItem('gh_token', v); $('#tokenInput').value=''; updateTokenBadge();
  $('#tokenMsg').textContent='Đã lưu token trên máy này ✓'; $('#tokenMsg').className='text-sm mt-2 text-green-600';
});
$('#btnClearToken').addEventListener('click', ()=>{ token=''; localStorage.removeItem('gh_token'); updateTokenBadge(); $('#tokenMsg').textContent='Đã xoá token khỏi máy này.'; $('#tokenMsg').className='text-sm mt-2 text-stone-500'; });

/* ---------- nạp danh sách không gian ---------- */
async function loadSpaces(){
  const res = await fetch(PREVIEW + 'data/spaces.json?t='+Date.now(), { cache:'no-store' });
  state.spaces = await res.json();
  imagesToDelete = [];
  render();
}

/* ---------- đăng nhập ---------- */
$('#loginForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  if($('#u').value.trim()===ADMIN_USER && $('#p').value===ADMIN_PASS){
    sessionStorage.setItem('admin_ok','1');
    showApp();
  } else { $('#loginErr').classList.remove('hidden'); }
});
$('#btnLogout').addEventListener('click', ()=>{ sessionStorage.removeItem('admin_ok'); location.reload(); });

async function showApp(){
  $('#login').classList.add('hidden');
  $('#app').classList.remove('hidden');
  loadToken();
  if(!token) $('#tokenPanel').classList.remove('hidden');
  try{ await loadSpaces(); }catch(e){ setStatus('Không tải được spaces.json: '+e.message,'err'); }
}

window.addEventListener('beforeunload', (e)=>{ if(dirty){ e.preventDefault(); e.returnValue=''; } });

/* ---------- khởi động ---------- */
if(sessionStorage.getItem('admin_ok')==='1') showApp();
