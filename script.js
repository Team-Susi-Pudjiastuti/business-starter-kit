/* ========== Data model (localStorage) ========== */
const STORE_KEY = "managher_app_v3";
let store = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");

/* initialize store defaults if empty */
if(!store.progress) store.progress = {1:false,2:false,3:false,4:false};
if(!store.levelData) store.levelData = {1:{},2:{},3:{},4:{}};
if(!store.ideas) store.ideas = [
  // sample idea for testing
  { l1_idea:"Fashion kecil-kecilan", l1_target:"Anak muda", l1_product:"Rok A-line", l1_promo:"Instagram", l1_modal:2000000, _savedAt: new Date().toISOString() }
];
if(!store.validations) store.validations = [
  // sample validations
  { jk:"Perempuan", usia:23, aktivitas:"Mahasiswa", skala:5, penjelasan:"Suka modelnya", _savedAt:new Date().toISOString() },
  { jk:"Perempuan", usia:29, aktivitas:"Pekerja kantoran", skala:4, penjelasan:"Harga agak tinggi", _savedAt:new Date().toISOString() },
  { jk:"Laki-laki", usia:21, aktivitas:"Pelajar", skala:3, penjelasan:"Kurang variasi warna", _savedAt:new Date().toISOString() }
];
if(!store.prototypeSamples) store.prototypeSamples = [
  // sample prototype (no image)
  { p_brand:"ManagHer", p_color:"#ff6fa2", p_tagline:"Sweet Moments Everyday", _savedAt:new Date().toISOString() }
];
if(!store.feedbacks) store.feedbacks = [
  // sample prototype feedbacks
  { jk:"Perempuan", usia:28, aktivitas:"Freelancer", skala:4, penjelasan:"Warna menarik", _savedAt:new Date().toISOString() }
];
if(!store.sales) store.sales = [
  { tgl: new Date().toISOString().slice(0,10), platform:"Instagram", ads:200000, qty:15, price:50000, likes:120, comments:12, share:3, save:20, follower:5, dm:10, reach:1000, impression:1200, bahan:40000, operasional:20000, _savedAt:new Date().toISOString() }
];
if(!store.badges) store.badges = ["Dreamer"];

/* LEVEL definitions */
const LEVELS = [
  {
    id:1, title:"Level 1: Ide Bisnis", badge:"Dreamer", output:"1 Ide Bisnis Awal",
    tips:[
      'Mulai dari "Fashion kecil-kecilan" kecil yang bisa diuji cepat.',
      'Tulis 3 alasan kenapa "Fashion kecil-kecilan" ini penting.',
      'Gunakan media yang sering digunakan target pasar.',
      'Rencanakan modal minimal untuk uji awal.',
      'Coba jual ke circle terdekat dulu (family/friends).'
    ],
    fields:[
      {id:"l1_idea", label:"Apa ide bisnismu?", type:"select", opts:["Toko Kue Online","Fashion kecil-kecilan","Jasa Desain Sosmed"]},
      {id:"l1_target", label:"Target Pasar", type:"select", opts:["Anak muda","Ibu rumah tangga","Pelajar","Pekerja kantoran","Umum"]},
      {id:"l1_product", label:"Produk / Jasa", type:"text", placeholder:"Contoh: Kue custom & snack"},
      {id:"l1_promo", label:"Cara Promosi", type:"select", opts:["Instagram","TikTok","WhatsApp","Offline (Pasar/Pop-up)"]},
      {id:"l1_modal", label:"Biaya Awal (IDR)", type:"number", placeholder:"5000000"}
    ]
  },
  {
    id:2, title:"Level 2: Validasi Ide", badge:"Researcher", output:"Target Market & Dashboard Demografi",
    tips:[
      'Jelaskan secara singkat apa yang ingin diuji.',
      'Gunakan pertanyaan terbuka untuk insight lebih kaya.',
      'Kumpulkan minimal 10 responden beragam.',
      'Saring pola dari jawaban yang mirip.',
      'Gunakan hasil validasi untuk ubah penawaran.'
    ],
    fields:[
      {id:"v_jk", label:"Jenis Kelamin", type:"select", opts:["Perempuan","Laki-laki","Lainnya"]},
      {id:"v_usia", label:"Usia", type:"number", placeholder:"25"},
      {id:"v_aktivitas", label:"Aktivitas saat ini", type:"text", placeholder:"Mahasiswa"},
      {id:"v_skala", label:"Skala feedback (1-5)", type:"number", placeholder:"4", min:1, max:5},
      {id:"v_penjelasan", label:"Penjelasan singkat", type:"text", placeholder:"Suka ide, tapi kemasan perlu lebih menarik"}
    ]
  },
  {
    id:3, title:"Level 3: Prototype", badge:"Creator", output:"Preview Prototype & Brand Identity",
    tips:[
      'Buat logo sederhana yang mudah dikenali (2 inisial).',
      'Tes kombinasi warna di 1-2 mockup.',
      'Tagline harus singkat & menjelaskan manfaat.',
      'Upload prototype meski sederhana — itu alat diskusi.',
      'Minta feedback visual dari 5 orang berbeda.'
    ],
    fields:[
      {id:"p_brand", label:"Nama Brand", type:"text", placeholder:"ManagHer"},
      {id:"p_color", label:"Warna Primary", type:"color", placeholder:"#ff6fa2"},
      {id:"p_tagline", label:"Tagline", type:"text", placeholder:"Sweet Moments Everyday"},
      {id:"p_proto_file", label:"Upload Prototype (gambar)", type:"file"}
    ]
  },
  {
    id:4, title:"Level 4: Action", badge:"Boss Lady", output:"Mini Dashboard Performa",
    tips:[
      'Catat semua pemasukan & pengeluaran harian.',
      'Bandingkan biaya promosi vs penjualan.',
      'Coba variasi posting untuk lihat engagement.',
      'Kalkulasi profit sederhana tiap hari.',
      'Gunakan data untuk optimasi campaign berikutnya.'
    ],
    fields:[
      {id:"a_date", label:"Tanggal", type:"date"},
      {id:"a_platform", label:"Platform", type:"select", opts:["Instagram","TikTok","WhatsApp","Marketplace"]},
      {id:"a_ads", label:"Biaya Promosi (IDR)", type:"number"},
      {id:"a_qty", label:"Jumlah Produk Terjual", type:"number"},
      {id:"a_price", label:"Harga Jual (IDR)", type:"number"}
    ]
  }
];

/* state */
let activeLevel = null; // null → dashboard; otherwise 1..4

/* chart objects */
const chartPool = {};

/* ========== Utilities ========== */
function saveStore(){ localStorage.setItem(STORE_KEY, JSON.stringify(store)); renderProgressCards(); renderBadges(); updateGlobalProgressUI(); if(activeLevel) renderLevel(activeLevel); }
function renderBadges(){
  // update Level Info badges area
  const html = (store.badges||[]).map(b=>`<div class="px-3 py-1 rounded-full text-xs font-semibold grad-accent">${b}</div>`).join(" ");
  // find container (we have side area with badges not explicit; not critical)
}
function updateGlobalProgressUI(){
  const totalFields = LEVELS.reduce((s,lv)=> s+lv.fields.length, 0);
  let done = 0;
  LEVELS.forEach(lv=>{
    lv.fields.forEach(f=>{
      if(store.levelData[lv.id] && store.levelData[lv.id][f.id]) done++;
    });
  });
  const pct = totalFields ? Math.round((done/totalFields)*100) : 0;
  document.getElementById("globalBar").style.width = pct + "%";
  document.getElementById("globalPct").textContent = pct + "%";
}

/* Sidebar & navigation helpers */
function toggleHomepageSubmenu(){
  const ul = document.getElementById("homepageSubmenu");
  ul.classList.toggle("hidden");
  document.getElementById("homeArrow").classList.toggle("rotate-180");
}
function toggleMobileSidebar(open){
  const sb = document.getElementById("sidebar");
  if(open) sb.classList.add("open"); else sb.classList.remove("open");
}
function logout(){ alert("Logout (demo)"); }

/* ========== Render progress cards (top horizontal) ========== */
function renderProgressCards(){
  const wrap = document.getElementById("progressCards");
  wrap.innerHTML = "";
  LEVELS.forEach(lv=>{
    const total = lv.fields.length;
    let done = 0;
    lv.fields.forEach(f=>{
      if(store.levelData[lv.id] && store.levelData[lv.id][f.id]) done++;
    });
    const pct = Math.round((done/total)*100);
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl p-4 border border-slate-100 shadow-sm w-64 flex-shrink-0 cursor-pointer";
    card.innerHTML = `
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-lg grad-accent grid place-items-center text-white font-bold">${lv.id}</div>
        <div>
          <div class="font-semibold">${lv.title}</div>
          <div class="text-xs text-slate-500">${lv.badge}</div>
        </div>
      </div>
      <div class="w-full bg-slate-100 rounded-full h-2 mb-2"><div class="h-2 rounded-full grad-accent" style="width:${pct}%"></div></div>
      <div class="text-xs">Progress: ${pct}%</div>
    `;
    card.onclick = ()=> openLevel(lv.id);
    wrap.appendChild(card);
  });
}

/* ========== Render Dashboard (default) ========== */
function showDashboard(){
  activeLevel = null;
  document.getElementById("levelArea").innerHTML = `
    <div class="bg-white rounded-2xl p-6 border border-slate-100 card-hover">
      <h3 class="text-lg font-semibold mb-2">Dashboard Ringkas</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="p-4 bg-slate-50 rounded-lg">
          <div class="text-sm text-slate-500">Total Ideas</div>
          <div class="text-2xl font-bold mt-2">${store.ideas.length}</div>
        </div>
        <div class="p-4 bg-slate-50 rounded-lg">
          <div class="text-sm text-slate-500">Total Validations</div>
          <div class="text-2xl font-bold mt-2">${store.validations.length}</div>
        </div>
        <div class="p-4 bg-slate-50 rounded-lg">
          <div class="text-sm text-slate-500">Total Sales Entries</div>
          <div class="text-2xl font-bold mt-2">${store.sales.length}</div>
        </div>
      </div>

      <div class="mt-6 grid md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border">
          <div class="text-sm text-slate-500">Global Completion</div>
          <canvas id="globalDonut" height="140"></canvas>
        </div>
        <div class="bg-white p-4 rounded-lg border">
          <div class="text-sm text-slate-500">Quick Summary</div>
          <div id="quickSummary" class="mt-3 text-sm text-slate-700"></div>
        </div>
      </div>
    </div>
  `;
  // render global donut
  renderGlobalDonut();
  // update quick summary
  document.getElementById("quickSummary").innerHTML = `
    <div>Ideas: <b>${store.ideas.length}</b></div>
    <div>Validations: <b>${store.validations.length}</b></div>
    <div>Prototype samples: <b>${store.prototypeSamples.length}</b></div>
    <div>Sales entries: <b>${store.sales.length}</b></div>
  `;
  updateLevelInfoAndTips(null);
}

/* global donut */
function renderGlobalDonut(){
  const totalFields = LEVELS.reduce((s,lv)=> s+lv.fields.length, 0);
  let filled = 0;
  LEVELS.forEach(lv=>{
    lv.fields.forEach(f=>{
      if(store.levelData[lv.id] && store.levelData[lv.id][f.id]) filled++;
    });
  });
  const pct = totalFields ? Math.round((filled/totalFields)*100) : 0;
  const ctx = document.getElementById("globalDonut").getContext('2d');
  if(chartPool.globalDonut) chartPool.globalDonut.destroy();
  chartPool.globalDonut = new Chart(ctx, {
    type:'doughnut',
    data:{ labels:['Terisi','Kosong'], datasets:[{ data:[filled, totalFields-filled], backgroundColor:['#ff6fa2','#e6eefc'] }]},
    options:{ plugins:{ legend:{ position:'bottom' } } }
  });
}

/* ========== Open Level content (1..4) ========== */
function openLevel(id){
  activeLevel = id;
  renderLevel(id);
  updateLevelInfoAndTips(id);
}

/* update Level Info + Tips (top right/left) */
function updateLevelInfoAndTips(id){
  const infoTitle = document.getElementById("sideLevelTitle");
  const infoBadge = document.getElementById("sideLevelBadge");
  const infoOutput = document.getElementById("sideLevelOutput");
  const tipsList = document.getElementById("tipsList");

  if(!id){
    infoTitle.textContent = "Dashboard";
    infoBadge.textContent = "";
    infoOutput.textContent = "";
    tipsList.innerHTML = "<li>Overview ringkasan aplikasi.</li>";
    return;
  }
  const lv = LEVELS.find(x=>x.id===id);
  infoTitle.textContent = lv.title;
  infoBadge.textContent = '🏆 ' + lv.badge;
  infoOutput.textContent = lv.output || "";

  // personalize tips: replace placeholders with sample data if available
  tipsList.innerHTML = "";
  lv.tips.forEach(t=>{
    let tip = t;
    if(id===1 && store.ideas[0] && store.ideas[0].l1_idea) tip = tip.replace(/"Fashion kecil-kecilan"/g, `"${store.ideas[0].l1_idea}"`);
    if(id===3 && store.prototypeSamples[0] && store.prototypeSamples[0].p_brand) tip = tip.replace("logo", `logo ${store.prototypeSamples[0].p_brand}`);
    const li = document.createElement("li"); li.textContent = tip;
    tipsList.appendChild(li);
  });
}

/* ========== Render level body (form, table, charts) ========= */
function renderLevel(id){
  const lv = LEVELS.find(x=>x.id===id);
  const container = document.getElementById("levelArea");
  container.innerHTML = "";

  // top: form card (left) + actions (right)
  const formCard = document.createElement("div");
  formCard.className = "bg-white rounded-2xl p-6 border border-slate-100";
  // build form HTML
  let fieldsHTML = `<h3 class="text-lg font-semibold mb-3">${lv.title}</h3><form id="form_level_${id}" class="space-y-3">`;
  lv.fields.forEach(f=>{
    fieldsHTML += `<div class="space-y-1">
      <label class="text-sm font-medium">${f.label}</label>`;
    if(f.type==="select"){
      fieldsHTML += `<select id="${f.id}" class="w-full p-2 border rounded-md">`;
      f.opts.forEach(opt=> fieldsHTML += `<option value="${opt}">${opt}</option>`);
      fieldsHTML += `</select>`;
    } else if(f.type==="file"){
      fieldsHTML += `<input id="${f.id}" type="file" class="w-full p-2 border rounded-md" accept="image/*"/>`;
      fieldsHTML += `<div id="${f.id}_preview" class="mt-2"></div>`;
    } else {
      const placeholder = f.placeholder ? `placeholder="${f.placeholder}"` : "";
      const minmax = (f.min||f.max) ? `min="${f.min||''}" max="${f.max||''}"` : "";
      fieldsHTML += `<input id="${f.id}" type="${f.type||'text'}" ${placeholder} ${minmax} class="w-full p-2 border rounded-md"/>`;
    }
    fieldsHTML += `</div>`;
  });
  fieldsHTML += `</form>`;
  // action buttons
  fieldsHTML += `<div class="mt-4 flex gap-3">
      <button id="btn_add_${id}" class="px-4 py-2 rounded-lg bg-slate-100">➕ Tambah Data</button>
      <button id="btn_edit_${id}" class="px-4 py-2 rounded-lg bg-slate-100">✏️ Edit</button>
      <button id="btn_save_${id}" class="px-4 py-2 rounded-lg grad-accent text-white">💾 Save</button>
      <button id="btn_export_${id}" class="px-4 py-2 rounded-lg border">Export CSV</button>
    </div>`;

  formCard.innerHTML = fieldsHTML;

  // right column: small actions / preview
  const rightCard = document.createElement("div");
  rightCard.className = "bg-white rounded-2xl p-4 border border-slate-100";
  rightCard.innerHTML = `
    <div class="text-sm font-semibold mb-2">Actions</div>
    <div class="space-y-2">
      <button id="previewBtn_${id}" class="w-full px-3 py-2 rounded-lg border">Pratinjau Brand</button>
      <button id="importBtn_${id}" class="w-full px-3 py-2 rounded-lg border">Import JSON</button>
      <button id="eraseBtn_${id}" class="w-full px-3 py-2 rounded-lg border text-red-600">Hapus Data Level</button>
    </div>
  `;

  // push to DOM: form (full width) and then cards
  const wrapper = document.createElement("div");
  wrapper.className = "grid md:grid-cols-3 gap-6";
  wrapper.appendChild(formCard);
  wrapper.appendChild(rightCard);
  // adjust spans
  formCard.classList.add("md:col-span-2");

  container.appendChild(wrapper);

  // Table card
  const tableCard = document.createElement("div");
  tableCard.className = "bg-white rounded-2xl p-6 border border-slate-100";
  tableCard.innerHTML = `<h3 class="text-lg font-semibold mb-3">Tabel Data (${lv.title})</h3>
    <div class="overflow-auto max-h-44 border rounded-md">
      <table class="w-full text-sm" id="table_${id}">
        <thead class="bg-slate-50 text-xs text-slate-600"><tr></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  container.appendChild(tableCard);

  // Charts card (several charts)
  const chartsCard = document.createElement("div");
  chartsCard.className = "bg-white rounded-2xl p-6 border border-slate-100";
  chartsCard.innerHTML = `<h3 class="text-lg font-semibold mb-3">Dashboard Hasil (${lv.title})</h3>
    <div id="charts_grid" class="grid md:grid-cols-3 gap-4">
      <!-- canvases injected -->
    </div>
  `;
  container.appendChild(chartsCard);

  // after DOM append wire up data & events
  // populate fields with stored values or placeholders
  lv.fields.forEach(f=>{
    const el = document.getElementById(f.id);
    if(!el) return;
    // file preview
    if(f.type==="file"){
      if(store.levelData[id] && store.levelData[id][f.id]){
        const prev = document.getElementById(f.id + "_preview");
        prev.innerHTML = `<img src="${store.levelData[id][f.id]}" class="w-full rounded-md"/>`;
      }
      el.onchange = (ev)=>{
        const file = ev.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = e=>{
          store.levelData[id] = store.levelData[id] || {};
          store.levelData[id][f.id] = e.target.result;
          saveStore();
          document.getElementById(f.id + "_preview").innerHTML = `<img src="${e.target.result}" class="w-full rounded-md"/>`;
        };
        reader.readAsDataURL(file);
      };
    } else {
      // set saved or placeholder/sample data
      if(store.levelData[id] && store.levelData[id][f.id] !== undefined){
        el.value = store.levelData[id][f.id];
      } else {
        // provide sample/test data so fields are not empty for testing
        if(id===1){
          if(f.id==="l1_idea") el.value = "Fashion kecil-kecilan";
          if(f.id==="l1_target") el.value = "Anak muda";
          if(f.id==="l1_product") el.value = "Rok A-line";
          if(f.id==="l1_promo") el.value = "Instagram";
          if(f.id==="l1_modal") el.value = 2000000;
        }
        if(id===2){
          if(f.id==="v_jk") el.value = "Perempuan";
          if(f.id==="v_usia") el.value = 25;
          if(f.id==="v_aktivitas") el.value = "Mahasiswa";
          if(f.id==="v_skala") el.value = 4;
          if(f.id==="v_penjelasan") el.value = "Suka idenya";
        }
        if(id===3){
          if(f.id==="p_brand") el.value = "ManagHer";
          if(f.id==="p_color") el.value = "#ff6fa2";
          if(f.id==="p_tagline") el.value = "Sweet Moments Everyday";
        }
        if(id===4){
          if(f.id==="a_date") el.value = new Date().toISOString().slice(0,10);
          if(f.id==="a_platform") el.value = "Instagram";
          if(f.id==="a_ads") el.value = 200000;
          if(f.id==="a_qty") el.value = 12;
          if(f.id==="a_price") el.value = 55000;
        }
      }
    }
    // disable fields initially (Edit toggles)
    if(el) el.disabled = true;
  });

  // wire up buttons: Edit, Save, Add, Export, Preview, Erase, Import
  document.getElementById(`btn_edit_${id}`).onclick = ()=>{
    lv.fields.forEach(f=>{ const el=document.getElementById(f.id); if(el) el.disabled = false; });
    alert("Mode edit aktif — ubah field lalu tekan Save.");
  };

  document.getElementById(`btn_save_${id}`).onclick = ()=>{
    // save values to store.levelData
    store.levelData[id] = store.levelData[id] || {};
    lv.fields.forEach(f=>{
      const el = document.getElementById(f.id);
      if(!el) return;
      if(f.type==="file") {
        // handled on change
      } else {
        store.levelData[id][f.id] = el.value;
        el.disabled = true;
      }
    });

    // special cases: push to arrays depending on level
    if(id===1){
      // push idea snapshot into ideas
      const snap = Object.assign({}, store.levelData[1]);
      snap._savedAt = new Date().toISOString();
      store.ideas.push(snap);
      if(!store.badges.includes("Dreamer")) store.badges.push("Dreamer");
    }
    if(id===2){
      const v = {
        jk: store.levelData[2].v_jk || document.getElementById("v_jk").value,
        usia: Number(store.levelData[2].v_usia) || 0,
        aktivitas: store.levelData[2].v_aktivitas || "",
        skala: Number(store.levelData[2].v_skala) || 0,
        penjelasan: store.levelData[2].v_penjelasan || "",
        _savedAt: new Date().toISOString()
      };
      store.validations.push(v);
      if(!store.badges.includes("Researcher")) store.badges.push("Researcher");
    }
    if(id===3){
      const snap = Object.assign({}, store.levelData[3]);
      snap._savedAt = new Date().toISOString();
      store.prototypeSamples.push(snap);
      if(!store.badges.includes("Creator")) store.badges.push("Creator");
    }
    if(id===4){
      const s = {
        tgl: store.levelData[4].a_date || document.getElementById("a_date").value,
        platform: store.levelData[4].a_platform || "",
        ads: Number(store.levelData[4].a_ads) || 0,
        qty: Number(store.levelData[4].a_qty) || 0,
        price: Number(store.levelData[4].a_price) || 0,
        _savedAt: new Date().toISOString()
      };
      store.sales.push(s);
      if(!store.badges.includes("Boss Lady")) store.badges.push("Boss Lady");
    }

    store.progress[id] = true;
    saveStore();
    alert("Data disimpan.");
  };

  document.getElementById(`btn_add_${id}`).onclick = ()=>{
    // emulate 'add' without saving entire levelData (use current inputs)
    if(id===2){
      const v = {
        jk: document.getElementById("v_jk").value || "",
        usia: Number(document.getElementById("v_usia").value) || 0,
        aktivitas: document.getElementById("v_aktivitas").value || "",
        skala: Number(document.getElementById("v_skala").value) || 0,
        penjelasan: document.getElementById("v_penjelasan").value || "",
        _addedAt: new Date().toISOString()
      };
      if(!v.jk && !v.usia && !v.aktivitas && !v.skala && !v.penjelasan){ alert("Isi minimal 1 field"); return; }
      store.validations.push(v); saveStore(); alert("Respon validasi ditambahkan.");
    } else if(id===4){
      const s = {
        tgl: document.getElementById("a_date").value || "",
        platform: document.getElementById("a_platform").value || "",
        ads: Number(document.getElementById("a_ads").value) || 0,
        qty: Number(document.getElementById("a_qty").value) || 0,
        price: Number(document.getElementById("a_price").value) || 0,
        _addedAt: new Date().toISOString()
      };
      if(!s.tgl && !s.platform && !s.qty){ alert("Isi minimal tanggal/platform/qty"); return; }
      store.sales.push(s); saveStore(); alert("Data penjualan ditambahkan.");
    } else if(id===1){
      const snap = {};
      lv.fields.forEach(f=>{ const el=document.getElementById(f.id); if(el && f.type!=="file") snap[f.id]=el.value; });
      snap._addedAt = new Date().toISOString();
      store.ideas.push(snap); saveStore(); alert("Ide ditambahkan ke history.");
    } else if(id===3){
      const snap = {};
      lv.fields.forEach(f=>{
        const el=document.getElementById(f.id);
        if(el && f.type!=="file") snap[f.id]=el.value;
        if(f.type==="file" && store.levelData[3] && store.levelData[3][f.id]) snap[f.id]=store.levelData[3][f.id];
      });
      snap._addedAt = new Date().toISOString();
      store.prototypeSamples.push(snap); saveStore(); alert("Prototype sample ditambahkan.");
    }
  };

  document.getElementById(`btn_export_${id}`).onclick = ()=>{
    // export relevant data to CSV
    let arr = [];
    let keys = [];
    if(id===1) arr = store.ideas, keys = Object.keys(store.ideas[0]||{});
    if(id===2) arr = store.validations, keys = ["jk","usia","aktivitas","skala","penjelasan"];
    if(id===3) arr = store.prototypeSamples, keys = Object.keys(store.prototypeSamples[0]||{});
    if(id===4) arr = store.sales, keys = Object.keys(store.sales[0]||{});
    if(!arr.length){ alert("Tidak ada data untuk diexport."); return; }
    const csv = toCSV(arr, keys);
    downloadText(csv, `${lv.title.replace(/\s+/g,'_')}_${(new Date()).toISOString().slice(0,10)}.csv`, 'text/csv');
  };

  document.getElementById(`previewBtn_${id}`).onclick = ()=>{
    if(id!==3){ alert("Pratinjau hanya tersedia untuk Prototype (Level 3)."); return; }
    const p = store.levelData[3] || {};
    const brand = p.p_brand || document.getElementById("p_brand").value || "NamaBrand";
    const tagline = p.p_tagline || document.getElementById("p_tagline").value || "Tagline";
    const color = p.p_color || document.getElementById("p_color").value || "#ff6fa2";
    // small preview window
    const w = window.open("", "_blank", "width=420,height=280");
    w.document.write(`<div style="font-family:Inter,Arial;padding:24px;background:${color};color:white;height:100%">
      <h2 style="margin:0">${brand}</h2><p style="margin:0.5rem 0">${tagline}</p>
    </div>`);
  };

  document.getElementById(`eraseBtn_${id}`).onclick = ()=>{
    if(!confirm("Hapus semua data level ini dari store? (demo)")) return;
    // clear relevant arrays & levelData
    store.levelData[id] = {};
    if(id===1) store.ideas = [];
    if(id===2) store.validations = [];
    if(id===3) store.prototypeSamples = [];
    if(id===4) store.sales = [];
    saveStore();
    renderLevel(id);
  };

  document.getElementById(`importBtn_${id}`).onclick = ()=> document.getElementById("fileImport").click();
  document.getElementById("fileImport").onchange = function(e){
    const f = e.target.files[0]; if(!f) return;
    const reader = new FileReader(); reader.onload = ev=>{
      try{
        const obj = JSON.parse(ev.target.result);
        // naive merge
        store = Object.assign({}, store, obj);
        saveStore(); alert("Import sukses.");
      } catch(err){ alert("Gagal import: bukan JSON valid."); }
    }; reader.readAsText(f);
  };

  // render table rows + headers
  renderTableForLevel(id);
  // render charts for level (6 charts if level 2/3/4, else fewer)
  renderChartsForLevel(id);

  // update Level Info & Tips
  updateLevelInfoAndTips(id);
}

/* render table content per level */
function renderTableForLevel(id){
  const table = document.getElementById(`table_${id}`);
  const tbody = table.querySelector("tbody");
  const theadRow = table.querySelector("thead tr");
  theadRow.innerHTML = "";
  tbody.innerHTML = "";

  if(id===1){
    // ideas
    const keys = ["l1_idea","l1_target","l1_product","l1_promo","l1_modal","_savedAt"];
    keys.forEach(k=> theadRow.insertAdjacentHTML("beforeend", `<th class="px-2 py-2 border">${k.replace('l1_','')}</th>`));
    store.ideas.forEach(row=>{
      const tr = document.createElement("tr"); tr.className="text-sm";
      keys.forEach(k=> tr.innerHTML += `<td class="px-2 py-1 border">${escapeHtml(row[k]||'')}</td>`);
      tbody.appendChild(tr);
    });
  } else if(id===2){
    const keys = ["jk","usia","aktivitas","skala","penjelasan","_savedAt"];
    keys.forEach(k=> theadRow.insertAdjacentHTML("beforeend", `<th class="px-2 py-2 border">${k}</th>`));
    store.validations.forEach(row=>{
      const tr = document.createElement("tr");
      keys.forEach(k=> tr.innerHTML += `<td class="px-2 py-1 border">${escapeHtml(row[k]||'')}</td>`);
      tbody.appendChild(tr);
    });
  } else if(id===3){
    const keys = ["p_brand","p_color","p_tagline","_savedAt"];
    keys.forEach(k=> theadRow.insertAdjacentHTML("beforeend", `<th class="px-2 py-2 border">${k.replace('p_','')}</th>`));
    store.prototypeSamples.forEach(row=>{
      const tr = document.createElement("tr");
      keys.forEach(k=> tr.innerHTML += `<td class="px-2 py-1 border">${k.indexOf('color')>-1? `<span style="display:inline-block;width:18px;height:12px;background:${escapeHtml(row[k]||'#fff')};border-radius:3px;border:1px solid #ddd"></span>`: escapeHtml(row[k]||'')}</td>`);
      tbody.appendChild(tr);
    });
  } else if(id===4){
    const keys = ["tgl","platform","ads","qty","price","_savedAt"];
    keys.forEach(k=> theadRow.insertAdjacentHTML("beforeend", `<th class="px-2 py-2 border">${k}</th>`));
    store.sales.forEach(row=>{
      const tr = document.createElement("tr");
      keys.forEach(k=> tr.innerHTML += `<td class="px-2 py-1 border">${escapeHtml(row[k]||'')}</td>`);
      tbody.appendChild(tr);
    });
  }
}

/* helper: escape */
function escapeHtml(s){ return String(s||'').replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* create CSV */
function toCSV(arr, keys){
  if(!arr || !arr.length) return "";
  const k = keys || Object.keys(arr[0]);
  const rows = [k.join(",")].concat(arr.map(o => k.map(kk => `"${String(o[kk]||'').replace(/"/g,'""')}"`).join(",")));
  return rows.join("\n");
}
function downloadText(text, filename, mime){
  const blob = new Blob([text], {type: mime || 'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ========== Charts per level (multiple charts) ========== */
function renderChartsForLevel(id){
  // remove old charts in grid
  const grid = document.getElementById("charts_grid");
  grid.innerHTML = "";

  if(id===1){
    // show simple donut + bar showing number of ideas
    const c1 = document.createElement("div"); c1.className="p-3 bg-slate-50 rounded-lg";
    c1.innerHTML = `<div class="text-sm mb-2">Ide - Distribusi Target</div><canvas id="c1_l1"></canvas>`;
    grid.appendChild(c1);

    const c2 = document.createElement("div"); c2.className="p-3 bg-slate-50 rounded-lg";
    c2.innerHTML = `<div class="text-sm mb-2">Ide - Produk Count</div><canvas id="c2_l1"></canvas>`;
    grid.appendChild(c2);

    // data
    const targets = {};
    const products = {};
    store.ideas.forEach(i=>{
      targets[i.l1_target] = (targets[i.l1_target]||0)+1;
      products[i.l1_product] = (products[i.l1_product]||0)+1;
    });
    const ctx1 = document.getElementById("c1_l1").getContext('2d');
    if(chartPool['c1_l1']) chartPool['c1_l1'].destroy();
    chartPool['c1_l1'] = new Chart(ctx1, { type:'pie', data:{ labels:Object.keys(targets), datasets:[{ data:Object.values(targets) }] } });

    const ctx2 = document.getElementById("c2_l1").getContext('2d');
    if(chartPool['c2_l1']) chartPool['c2_l1'].destroy();
    chartPool['c2_l1'] = new Chart(ctx2, { type:'bar', data:{ labels:Object.keys(products), datasets:[{ label:'Count', data:Object.values(products) }] } });

    // filler to make 3 columns grid
    const c3 = document.createElement("div"); c3.className="p-3 bg-slate-50 rounded-lg"; c3.innerHTML="<div class='text-sm text-slate-500'>Ringkasan</div><div class='mt-2 text-sm'>Ide tersimpan: "+store.ideas.length+"</div>";
    grid.appendChild(c3);
  }

  if(id===2 || id===3 || id===4){
    // create 6 charts as requested (gender pie, age histogram, activity bar, scale by gender, scale by age buckets, scale by activity)
    const chartsToCreate = [
      {id:`c_gender_${id}`, title:"Distribusi Jenis Kelamin"},
      {id:`c_age_${id}`, title:"Distribusi Usia"},
      {id:`c_activity_${id}`, title:"Distribusi Aktivitas"},
      {id:`c_scale_gender_${id}`, title:"Skala Feedback by Gender"},
      {id:`c_scale_age_${id}`, title:"Skala Feedback by Age"},
      {id:`c_scale_activity_${id}`, title:"Skala Feedback by Aktivitas"}
    ];
    chartsToCreate.forEach(c=>{
      const div = document.createElement("div"); div.className="p-3 bg-slate-50 rounded-lg";
      div.innerHTML = `<div class="text-sm mb-2">${c.title}</div><canvas id="${c.id}"></canvas>`;
      grid.appendChild(div);
    });

    // collect dataset: for level2 use store.validations, for level3 use store.feedbacks, for level4 use store.sales (but sales don't have feedback skala; we'll reuse validations for level4 demo)
    let rows = [];
    if(id===2) rows = store.validations;
    if(id===3) rows = store.feedbacks;
    if(id===4) rows = store.validations; // fallback to validations for feedback-style charts

    // compute gender counts
    const genderCounts = {};
    const ageBuckets = {}; // bucket by decade
    const activityCounts = {};
    const scaleCounts = {1:0,2:0,3:0,4:0,5:0};
    const scaleByGender = {};
    const scaleByActivity = {};
    const scaleByAge = {}; // keyed by bucket

    rows.forEach(r=>{
      const g = r.jk || "Unknown"; genderCounts[g] = (genderCounts[g]||0)+1;
      const a = Number(r.usia) || 0;
      const bucket = Math.floor(a/10)*10 + "s"; ageBuckets[bucket] = (ageBuckets[bucket]||0)+1;
      const act = r.aktivitas || "Lainnya"; activityCounts[act] = (activityCounts[act]||0)+1;
      const s = Number(r.skala) || 0; if(s>=1 && s<=5) scaleCounts[s] = (scaleCounts[s]||0)+1;
      // scale by gender
      scaleByGender[g] = scaleByGender[g] || {1:0,2:0,3:0,4:0,5:0};
      if(s>=1 && s<=5) scaleByGender[g][s] = (scaleByGender[g][s]||0)+1;
      // scale by activity
      scaleByActivity[act] = scaleByActivity[act] || {1:0,2:0,3:0,4:0,5:0};
      if(s>=1 && s<=5) scaleByActivity[act][s] = (scaleByActivity[act][s]||0)+1;
      // scale by age bucket
      scaleByAge[bucket] = scaleByAge[bucket] || {1:0,2:0,3:0,4:0,5:0};
      if(s>=1 && s<=5) scaleByAge[bucket][s] = (scaleByAge[bucket][s]||0)+1;
    });

    // render gender pie
    const ctxG = document.getElementById(`c_gender_${id}`).getContext('2d');
    if(chartPool[`c_gender_${id}`]) chartPool[`c_gender_${id}`].destroy();
    chartPool[`c_gender_${id}`] = new Chart(ctxG, { type:'pie', data:{ labels:Object.keys(genderCounts), datasets:[{ data:Object.values(genderCounts) }] } });

    // age histogram (buckets)
    const ctxA = document.getElementById(`c_age_${id}`).getContext('2d');
    if(chartPool[`c_age_${id}`]) chartPool[`c_age_${id}`].destroy();
    chartPool[`c_age_${id}`] = new Chart(ctxA, { type:'bar', data:{ labels:Object.keys(ageBuckets), datasets:[{ label:'Jumlah', data:Object.values(ageBuckets) }] } });

    // activity bar
    const ctxAct = document.getElementById(`c_activity_${id}`).getContext('2d');
    if(chartPool[`c_activity_${id}`]) chartPool[`c_activity_${id}`].destroy();
    chartPool[`c_activity_${id}`] = new Chart(ctxAct, { type:'bar', data:{ labels:Object.keys(activityCounts), datasets:[{ label:'Jumlah', data:Object.values(activityCounts) }] } });

    // scale by gender (stacked bar)
    const genders = Object.keys(scaleByGender);
    const scaleLabels = ['1','2','3','4','5'];
    const datasetsGender = scaleLabels.map((s, idx)=>({
      label: `Skala ${s}`,
      data: genders.map(g => scaleByGender[g] ? (scaleByGender[g][s]||0) : 0)
    }));
    const ctx_sg = document.getElementById(`c_scale_gender_${id}`).getContext('2d');
    if(chartPool[`c_scale_gender_${id}`]) chartPool[`c_scale_gender_${id}`].destroy();
    chartPool[`c_scale_gender_${id}`] = new Chart(ctx_sg, { type:'bar', data:{ labels:genders, datasets:datasetsGender }, options:{ scales:{ x:{ stacked:true }, y:{ stacked:true } } } });

    // scale by age (stacked)
    const ages = Object.keys(scaleByAge);
    const datasetsAge = scaleLabels.map(s=>({ label:`Skala ${s}`, data: ages.map(a=> scaleByAge[a] ? (scaleByAge[a][s]||0) : 0) }));
    const ctx_sa = document.getElementById(`c_scale_age_${id}`).getContext('2d');
    if(chartPool[`c_scale_age_${id}`]) chartPool[`c_scale_age_${id}`].destroy();
    chartPool[`c_scale_age_${id}`] = new Chart(ctx_sa, { type:'bar', data:{ labels:ages, datasets:datasetsAge }, options:{ scales:{ x:{ stacked:true }, y:{ stacked:true } } } });

    // scale by activity (stacked)
    const acts = Object.keys(scaleByActivity);
    const datasetsAct = scaleLabels.map(s=>({ label:`Skala ${s}`, data: acts.map(a=> scaleByActivity[a] ? (scaleByActivity[a][s]||0) : 0) }));
    const ctx_sact = document.getElementById(`c_scale_activity_${id}`).getContext('2d');
    if(chartPool[`c_scale_activity_${id}`]) chartPool[`c_scale_activity_${id}`].destroy();
    chartPool[`c_scale_activity_${id}`] = new Chart(ctx_sact, { type:'bar', data:{ labels:acts, datasets:datasetsAct }, options:{ scales:{ x:{ stacked:true }, y:{ stacked:true } } } });
  }
}

/* ========== Initial render ========== */
function init(){
  renderProgressCards();
  updateGlobalProgressUI();
  renderBadges();
  showDashboard();
}
init();

/* expose to global */
window.openLevel = openLevel;
window.showDashboard = showDashboard;
window.toggleMobileSidebar = toggleMobileSidebar;
window.toggleHomepageSubmenu = toggleHomepageSubmenu;
window.showBadges = ()=> { activeLevel = null; document.getElementById("levelArea").innerHTML = `<div class="bg-white rounded-2xl p-6 border"> <h3 class="text-lg font-semibold">Badges</h3><div class="mt-4 space-y-2">${(store.badges||[]).map(b=>`<div class="inline-block">${b}</div>`).join(" ")}</div></div>`; updateLevelInfoAndTips(null); };

/* autosave on unload */
window.addEventListener('beforeunload', ()=> saveStore());
