
// Initialize data
let salesData = [
  { 
    id: 1, 
    tanggal: "2024-01-15", 
    platform: "Instagram", 
    aktivitas: "Promo Akhir Tahun",
    biayaPromosi: 200000,
    jumlahTerjual: 15,
    likes: 120,
    comments: 12,
    share: 3,
    save: 20,
    follower: 5,
    dm: 10,
    reach: 1000,
    impression: 1200,
    biayaBahan: 40000,
    biayaOperasional: 20000,
    hargaJual: 50000,
    catatan: "Penjualan meningkat karena promo akhir tahun",
    savedAt: new Date().toISOString()
  },
  { 
    id: 2, 
    tanggal: "2024-01-14", 
    platform: "TikTok", 
    aktivitas: "Giveaway",
    biayaPromosi: 150000,
    jumlahTerjual: 12,
    likes: 200,
    comments: 25,
    share: 8,
    save: 35,
    follower: 8,
    dm: 15,
    reach: 1500,
    impression: 1800,
    biayaBahan: 35000,
    biayaOperasional: 15000,
    hargaJual: 50000,
    catatan: "Giveaway berhasil menarik banyak engagement",
    savedAt: new Date().toISOString()
  },
  { 
    id: 3, 
    tanggal: "2024-01-13", 
    platform: "Marketplace", 
    aktivitas: "Flash Sale",
    biayaPromosi: 100000,
    jumlahTerjual: 20,
    likes: 80,
    comments: 8,
    share: 2,
    save: 15,
    follower: 3,
    dm: 5,
    reach: 800,
    impression: 950,
    biayaBahan: 45000,
    biayaOperasional: 25000,
    hargaJual: 45000,
    catatan: "Flash sale sangat efektif untuk meningkatkan penjualan",
    savedAt: new Date().toISOString()
  },
  { 
    id: 4, 
    tanggal: "2024-01-12", 
    platform: "Instagram", 
    aktivitas: "Posting Biasa",
    biayaPromosi: 50000,
    jumlahTerjual: 8,
    likes: 90,
    comments: 10,
    share: 1,
    save: 12,
    follower: 2,
    dm: 8,
    reach: 900,
    impression: 1100,
    biayaBahan: 30000,
    biayaOperasional: 15000,
    hargaJual: 55000,
    catatan: "Performa normal tanpa promo khusus",
    savedAt: new Date().toISOString()
  },
  { 
    id: 5, 
    tanggal: "2024-01-11", 
    platform: "WhatsApp", 
    aktivitas: "Broadcast ke Pelanggan",
    biayaPromosi: 0,
    jumlahTerjual: 10,
    likes: 0,
    comments: 0,
    share: 0,
    save: 0,
    follower: 0,
    dm: 20,
    reach: 200,
    impression: 200,
    biayaBahan: 35000,
    biayaOperasional: 10000,
    hargaJual: 50000,
    catatan: "Broadcast ke pelanggan lama cukup efektif",
    savedAt: new Date().toISOString()
  }
];

// Chart objects
const chartPool = {};

// DOM Elements
const tanggalInput = document.getElementById('tanggal');
const platformSelect = document.getElementById('platform');
const biayaPromosiInput = document.getElementById('biayaPromosi');
const jumlahTerjualInput = document.getElementById('jumlahTerjual');
const likesInput = document.getElementById('likes');
const commentsInput = document.getElementById('comments');
const shareInput = document.getElementById('share');
const saveInput = document.getElementById('save');
const followerInput = document.getElementById('follower');
const dmInput = document.getElementById('dm');
const reachInput = document.getElementById('reach');
const impressionInput = document.getElementById('impression');
const biayaBahanInput = document.getElementById('biayaBahan');
const biayaOperasionalInput = document.getElementById('biayaOperasional');
const hargaJualInput = document.getElementById('hargaJual');
const aktivitasInput = document.getElementById('aktivitas');
const catatanTextarea = document.getElementById('catatan');

const salesTableBody = document.getElementById('salesTableBody');
const totalSalesCount = document.getElementById('totalSalesCount');
const totalRevenue = document.getElementById('totalRevenue');

const metricROI = document.getElementById('metricROI');
const metricEngagementRate = document.getElementById('metricEngagementRate');
const metricConversionRate = document.getElementById('metricConversionRate');
const metricProfitMargin = document.getElementById('metricProfitMargin');
const metricJumlahTerjual = document.getElementById('metricJumlahTerjual');
const metricTotalRevenue = document.getElementById('metricTotalRevenue');
const metricTotalBiaya = document.getElementById('metricTotalBiaya');
const metricNetProfit = document.getElementById('metricNetProfit');
const metricGrossProfit = document.getElementById('metricGrossProfit');
const metricBEP = document.getElementById('metricBEP');
const metricConversionRateSales = document.getElementById('metricConversionRateSales');
const metricCPA = document.getElementById('metricCPA');

const btnReset = document.getElementById('btnReset');
const btnEdit = document.getElementById('btnEdit');
const btnSave = document.getElementById('btnSave');
const btnAddData = document.getElementById('btnAddData');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Calculate metrics
function calculateMetrics() {
  let totalRevenueVal = 0;
  let totalCostVal = 0;
  let totalGrossProfitVal = 0;
  let totalNetProfitVal = 0;
  let totalAdsCostVal = 0;
  let totalItemsSoldVal = 0;
  let totalReachVal = 0;
  let totalImpressionVal = 0;
  let totalEngagementVal = 0;
  
  salesData.forEach(item => {
    const revenue = item.jumlahTerjual * item.hargaJual;
    const costOfGoods = item.jumlahTerjual * item.biayaBahan;
    const totalCost = costOfGoods + item.biayaOperasional + item.biayaPromosi;
    const grossProfit = revenue - costOfGoods;
    const netProfit = revenue - totalCost;
    
    totalRevenueVal += revenue;
    totalCostVal += totalCost;
    totalGrossProfitVal += grossProfit;
    totalNetProfitVal += netProfit;
    totalAdsCostVal += item.biayaPromosi;
    totalItemsSoldVal += item.jumlahTerjual;
    totalReachVal += item.reach;
    totalImpressionVal += item.impression;
    totalEngagementVal += item.likes + item.comments + item.share + item.save;
  });
  
  // Update metrics
  const roi = totalAdsCostVal > 0 ? ((totalNetProfitVal / totalAdsCostVal) * 100).toFixed(1) : 0;
  const engagementRate = totalReachVal > 0 ? ((totalEngagementVal / totalReachVal) * 100).toFixed(1) : 0;
  const conversionRate = totalImpressionVal > 0 ? ((totalItemsSoldVal / totalImpressionVal) * 100).toFixed(2) : 0;
  const profitMargin = totalRevenueVal > 0 ? ((totalNetProfitVal / totalRevenueVal) * 100).toFixed(1) : 0;
  const conversionRateSales = totalReachVal > 0 ? ((totalItemsSoldVal / totalReachVal) * 100).toFixed(2) : 0;
  const bep = (totalCostVal / (hargaJualInput.value || 50000)).toFixed(0);
  const cpa = totalItemsSoldVal > 0 ? (totalAdsCostVal / totalItemsSoldVal).toFixed(0) : 0;
  
  // Format currency
  const formatCurrency = (value) => `Rp ${value.toLocaleString()}`;
  
  // Update DOM
  metricROI.textContent = `${roi}%`;
  metricEngagementRate.textContent = `${engagementRate}%`;
  metricConversionRate.textContent = `${conversionRate}%`;
  metricProfitMargin.textContent = `${profitMargin}%`;
  metricJumlahTerjual.textContent = totalItemsSoldVal;
  metricTotalRevenue.textContent = formatCurrency(totalRevenueVal);
  metricTotalBiaya.textContent = formatCurrency(totalCostVal);
  metricNetProfit.textContent = formatCurrency(totalNetProfitVal);
  metricGrossProfit.textContent = formatCurrency(totalGrossProfitVal);
  metricBEP.textContent = `${bep} unit`;
  metricConversionRateSales.textContent = `${conversionRateSales}%`;
  metricCPA.textContent = `Rp ${cpa}`;
  
  // Update summary
  totalSalesCount.textContent = salesData.length;
  totalRevenue.textContent = formatCurrency(totalRevenueVal);
}

// Render sales table
function renderSalesTable() {
  salesTableBody.innerHTML = '';
  
  salesData.forEach(item => {
    const revenue = item.jumlahTerjual * item.hargaJual;
    const costOfGoods = item.jumlahTerjual * item.biayaBahan;
    const totalCost = costOfGoods + item.biayaOperasional + item.biayaPromosi;
    const netProfit = revenue - totalCost;
    const roi = item.biayaPromosi > 0 ? ((netProfit / item.biayaPromosi) * 100).toFixed(1) : 0;
    
    const row = document.createElement('tr');
    row.className = 'hover:bg-slate-50';
    row.innerHTML = `
      <td class="px-3 py-2 border">${item.tanggal}</td>
      <td class="px-3 py-2 border">${item.platform}</td>
      <td class="px-3 py-2 border text-center">${item.jumlahTerjual}</td>
      <td class="px-3 py-2 border text-right">Rp ${revenue.toLocaleString()}</td>
      <td class="px-3 py-2 border text-right">Rp ${totalCost.toLocaleString()}</td>
      <td class="px-3 py-2 border text-right ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}">Rp ${netProfit.toLocaleString()}</td>
      <td class="px-3 py-2 border text-right">${roi}%</td>
      <td class="px-3 py-2 border text-center">
        <div class="flex gap-1 justify-center">
          <button class="text-blue-600 hover:text-blue-800 text-xs p-1 edit-btn" data-id="${item.id}">✏️</button>
          <button class="text-red-600 hover:text-red-800 text-xs p-1 delete-btn" data-id="${item.id}">🗑️</button>
        </div>
      </td>
    `;
    salesTableBody.appendChild(row);
  });
  
  // Calculate and update metrics
  calculateMetrics();
}

// Button event listeners
btnReset.addEventListener('click', function() {
  if(confirm("Apakah Anda yakin ingin mereset form ini?")) {
    tanggalInput.value = "";
    platformSelect.selectedIndex = 0;
    biayaPromosiInput.value = "";
    jumlahTerjualInput.value = "";
    likesInput.value = "";
    commentsInput.value = "";
    shareInput.value = "";
    saveInput.value = "";
    followerInput.value = "";
    dmInput.value = "";
    reachInput.value = "";
    impressionInput.value = "";
    biayaBahanInput.value = "";
    biayaOperasionalInput.value = "";
    hargaJualInput.value = "";
    aktivitasInput.value = "";
    catatanTextarea.value = "";
  }
});

btnEdit.addEventListener('click', function() {
  alert("Mode edit diaktifkan. Anda dapat mengubah data pada form.");
});

btnSave.addEventListener('click', function() {
  // Validate required fields
  if(!tanggalInput.value || !platformSelect.value || !jumlahTerjualInput.value || !hargaJualInput.value) {
    alert("Mohon lengkapi field yang wajib diisi (Tanggal, Platform, Jumlah Terjual, Harga Jual)!");
    return;
  }
  
  // Create new sales object
  const newSale = {
    id: Date.now(), // Simple unique ID
    tanggal: tanggalInput.value,
    platform: platformSelect.value,
    aktivitas: aktivitasInput.value || "-",
    biayaPromosi: parseInt(biayaPromosiInput.value) || 0,
    jumlahTerjual: parseInt(jumlahTerjualInput.value),
    likes: parseInt(likesInput.value) || 0,
    comments: parseInt(commentsInput.value) || 0,
    share: parseInt(shareInput.value) || 0,
    save: parseInt(saveInput.value) || 0,
    follower: parseInt(followerInput.value) || 0,
    dm: parseInt(dmInput.value) || 0,
    reach: parseInt(reachInput.value) || 0,
    impression: parseInt(impressionInput.value) || 0,
    biayaBahan: parseInt(biayaBahanInput.value) || 0,
    biayaOperasional: parseInt(biayaOperasionalInput.value) || 0,
    hargaJual: parseInt(hargaJualInput.value),
    catatan: catatanTextarea.value || "-",
    savedAt: new Date().toISOString()
  };
  
  // Add to array
  salesData.push(newSale);
  
  // Update UI
  renderSalesTable();
  
  // Reset form (optional - you can comment this out if you want to keep the data)
  // tanggalInput.value = "";
  // platformSelect.selectedIndex = 0;
  // biayaPromosiInput.value = "";
  // jumlahTerjualInput.value = "";
  // likesInput.value = "";
  // commentsInput.value = "";
  // shareInput.value = "";
  // saveInput.value = "";
  // followerInput.value = "";
  // dmInput.value = "";
  // reachInput.value = "";
  // impressionInput.value = "";
  // biayaBahanInput.value = "";
  // biayaOperasionalInput.value = "";
  // hargaJualInput.value = "";
  // aktivitasInput.value = "";
  // catatanTextarea.value = "";
  
  alert("Data penjualan berhasil disimpan! 🎉");
});

btnAddData.addEventListener('click', function() {
  btnSave.click();
});

// Event delegation for edit and delete buttons in table
salesTableBody.addEventListener('click', function(e) {
  if(e.target.classList.contains('edit-btn')) {
    const id = parseInt(e.target.dataset.id);
    const item = salesData.find(x => x.id === id);
    
    if(item) {
      tanggalInput.value = item.tanggal;
      platformSelect.value = item.platform;
      biayaPromosiInput.value = item.biayaPromosi;
      jumlahTerjualInput.value = item.jumlahTerjual;
      likesInput.value = item.likes;
      commentsInput.value = item.comments;
      shareInput.value = item.share;
      saveInput.value = item.save;
      followerInput.value = item.follower;
      dmInput.value = item.dm;
      reachInput.value = item.reach;
      impressionInput.value = item.impression;
      biayaBahanInput.value = item.biayaBahan;
      biayaOperasionalInput.value = item.biayaOperasional;
      hargaJualInput.value = item.hargaJual;
      aktivitasInput.value = item.aktivitas;
      catatanTextarea.value = item.catatan;
      
      // Scroll to form
      document.querySelector('.bg-white.rounded-2xl.p-6.border.border-slate-100').scrollIntoView({ behavior: 'smooth' });
      
      alert("Data telah dimuat ke form. Silakan edit dan simpan kembali.");
    }
  }
  
  if(e.target.classList.contains('delete-btn')) {
    if(confirm("Apakah Anda yakin ingin menghapus data penjualan ini?")) {
      const id = parseInt(e.target.dataset.id);
      salesData = salesData.filter(x => x.id !== id);
      
      renderSalesTable();
      
      alert("Data penjualan berhasil dihapus!");
    }
  }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', function() {
  const sidebar = document.getElementById('sidebar');
  if(sidebar.classList.contains('hidden')) {
    sidebar.classList.remove('hidden');
    sidebar.classList.add('fixed', 'top-16', 'left-0', 'right-0', 'bottom-0', 'z-40', 'shadow-lg');
  } else {
    sidebar.classList.add('hidden');
    sidebar.classList.remove('fixed', 'top-16', 'left-0', 'right-0', 'bottom-0', 'z-40', 'shadow-lg');
  }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  renderSalesTable();
  
  // Set initial progress
  const globalBar = document.getElementById('globalBar');
  const globalPct = document.getElementById('globalPct');
  globalBar.style.width = '100%';
  globalPct.textContent = '100%';
});
