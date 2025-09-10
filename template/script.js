/* ========== Data model (localStorage) ========== */
const STORE_KEY = "managher_app_v3";
let store = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");

/* initialize store defaults if empty */
if(!store.progress) store.progress = {1:false,2:false,3:false,4:false,5:false};
if(!store.levelData) store.levelData = {1:{},2:{},3:{},4:{},5:{}};
if(!store.ideas) store.ideas = [
  { l1_idea:"Fashion kecil-kecilan", l1_target:"Anak muda", l1_product:"Rok A-line", l1_promo:"Instagram", l1_modal:2000000, _savedAt: new Date().toISOString() }
];
if(!store.validations) store.validations = [
  { jk:"Perempuan", usia:23, aktivitas:"Mahasiswa", skala:5, penjelasan:"Suka modelnya", _savedAt:new Date().toISOString() },
  { jk:"Perempuan", usia:29, aktivitas:"Pekerja kantoran", skala:4, penjelasan:"Harga agak tinggi", _savedAt:new Date().toISOString() },
  { jk:"Laki-laki", usia:21, aktivitas:"Pelajar", skala:3, penjelasan:"Kurang variasi warna", _savedAt:new Date().toISOString() }
];
if(!store.prototypeSamples) store.prototypeSamples = [
  { p_brand:"ManagHer", p_color:"#ff6fa2", p_tagline:"Sweet Moments Everyday", _savedAt:new Date().toISOString() }
];
if(!store.feedbacks) store.feedbacks = [
  { jk:"Perempuan", usia:28, aktivitas:"Freelancer", skala:4, penjelasan:"Warna menarik", _savedAt:new Date().toISOString() }
];
if(!store.sales) store.sales = [
  { tgl: new Date().toISOString().slice(0,10), platform:"Instagram", ads:200000, qty:15, price:50000, likes:120, comments:12, share:3, save:20, follower:5, dm:10, reach:1000, impression:1200, bahan:40000, operasional:20000, _savedAt:new Date().toISOString() }
];
if(!store.businessModelCanvas) store.businessModelCanvas = {};
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
      {id:"a_price", label:"Harga Jual (IDR)", type:"number"},
      {id:"a_likes", label:"Like", type:"number"},
      {id:"a_comments", label:"Komentar", type:"number"},
      {id:"a_share", label:"Share", type:"number"},
      {id:"a_save", label:"Save", type:"number"},
      {id:"a_follower", label:"Follower", type:"number"},
      {id:"a_dm", label:"DM/Chat", type:"number"},
      {id:"a_reach", label:"Reach", type:"number"},
      {id:"a_impression", label:"Impression", type:"number"},
      {id:"a_bahan", label:"Biaya Bahan Baku (IDR)", type:"number"},
      {id:"a_operasional", label:"Biaya Operasional (IDR)", type:"number"}
    ]
  },
  {
    id:5, title:"Level 5: Business Model Canvas", badge:"Strategist", output:"Business Model Canvas Lengkap",
    tips:[
      'Definisikan Customer Segments Anda dengan spesifik - jangan terlalu luas.',
      'Value Proposition harus jelas dan unik - apa yang membuat Anda berbeda dari kompetitor?',
      'Pilih Channels yang paling efektif untuk menjangkau target pasar Anda.',
      'Bangun Customer Relationships yang berkelanjutan, bukan hanya transaksional.',
      'Diversifikasi Revenue Streams untuk mengurangi risiko ketergantungan pada satu sumber pendapatan.'
    ],
    fields:[
      {id:"customerSegments", label:"Customer Segments (Siapa pelanggan Anda?)", type:"textarea", rows:3},
      {id:"valueProposition", label:"Value Proposition (Nilai yang ditawarkan)", type:"textarea", rows:3},
      {id:"channels", label:"Channels (Saluran distribusi)", type:"textarea", rows:3},
      {id:"customerRelationships", label:"Customer Relationships (Hubungan dengan pelanggan)", type:"textarea", rows:3},
      {id:"revenueStreams", label:"Revenue Streams (Sumber pendapatan)", type:"textarea", rows:3},
      {id:"keyResources", label:"Key Resources (Sumber daya utama)", type:"textarea", rows:3},
      {id:"keyActivities", label:"Key Activities (Aktivitas utama)", type:"textarea", rows:3},
      {id:"keyPartnerships", label:"Key Partnerships (Mitra utama)", type:"textarea", rows:3},
      {id:"costStructure", label:"Cost Structure (Struktur biaya)", type:"textarea", rows:3},
      {id:"notes", label:"Catatan Tambahan", type:"textarea", rows:3}
    ]
  }
];

/* state */
let activeLevel = null; // null → dashboard; otherwise 1..5

/* chart objects */
const chartPool = {};

/* ========== Utilities ========== */
function saveStore(){ 
  localStorage.setItem(STORE_KEY, JSON.stringify(store)); 
  renderProgressCards(); 
  renderBadges(); 
  updateGlobalProgressUI(); 
  if(activeLevel) renderLevel(activeLevel); 
}

function renderBadges(){
  // update Level Info badges area
  const html = (store.badges||[]).map(b=>`<div class="px-3 py-1 rounded-full text-xs font-semibold grad-accent">${b}</div>`).join(" ");
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
  const arrow = document.getElementById("homeArrow");

  // buka/tutup submenu
  ul.classList.toggle("hidden");
  arrow.classList.toggle("rotate-180");

  // simpan state di localStorage
  const isOpen = !ul.classList.contains("hidden");
  localStorage.setItem("homepageSubmenuOpen", isOpen);
}

// saat halaman baru dimuat
document.addEventListener("DOMContentLoaded", () => {
  const ul = document.getElementById("homepageSubmenu");
  const arrow = document.getElementById("homeArrow");
  const isOpen = localStorage.getItem("homepageSubmenuOpen") === "true";

  if (isOpen) {
    ul.classList.remove("hidden");
    arrow.classList.add("rotate-180");
  }
});

function toggleMobileSidebar(open){
  const sb = document.getElementById("sidebar");
  if(open) {
    sb.classList.add("open");
    // Add overlay to close sidebar when clicking outside
    const overlay = document.createElement("div");
    overlay.id = "sidebarOverlay";
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden";
    overlay.onclick = () => toggleMobileSidebar(false);
    document.body.appendChild(overlay);
  } else {
    sb.classList.remove("open");
    const overlay = document.getElementById("sidebarOverlay");
    if(overlay) overlay.remove();
  }
}

function logout(){ 
  if(confirm("Apakah Anda yakin ingin logout?")) {
    localStorage.removeItem(STORE_KEY);
    alert("Anda telah logout. Data Anda akan tetap tersimpan di browser ini.");
    location.reload();
  }
}

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

function goToLevel(id) {
  window.location.href = `../level${id}/index.html`;
}