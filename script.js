/* ========== Data model (localStorage) ========== */
const STORE_KEY = "managher_app_v3";
let store = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");


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

/* ========== Open Level content (1..4) ========== */
function openLevel(id){
  activeLevel = id;
  renderLevel(id);
  updateLevelInfoAndTips(id);
}

/* ========== Initial render ========== */
function init(){
  showDashboard();
}
init();

/* expose to global */
window.openLevel = openLevel;
window.showDashboard = showDashboard;
window.toggleMobileSidebar = toggleMobileSidebar;
window.toggleHomepageSubmenu = toggleHomepageSubmenu;

/* autosave on unload */
window.addEventListener('beforeunload', ()=> saveStore());
