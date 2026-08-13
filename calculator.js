// State variables
let inputs = {
    tabungan: 1500000,
    jemaah: 1,
    tahun: 2026
};
let activeTab = 'Reguler';
let simulationData = [];

// Formatter
const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
};

// Input Handlers
function updateInput(key, diff) {
    if (key === 'tabungan') {
        inputs.tabungan += diff;
        if (inputs.tabungan < 500000) inputs.tabungan = 500000;
        document.getElementById('val-tabungan').innerText = formatIDR(inputs.tabungan).replace('Rp', '').trim();
    } else if (key === 'jemaah') {
        inputs.jemaah += diff;
        if (inputs.jemaah < 1) inputs.jemaah = 1;
        if (inputs.jemaah > 4) inputs.jemaah = 4;
        document.getElementById('val-jemaah').innerText = inputs.jemaah;
    } else if (key === 'tahun') {
        inputs.tahun += diff;
        if (inputs.tahun < 2026) inputs.tahun = 2026;
        if (inputs.tahun > 2060) inputs.tahun = 2060;
        document.getElementById('val-tahun').innerText = inputs.tahun;
    }
    
    if (simulationData.length > 0) {
        runSimulation();
    }
}

function switchTab(tab) {
    activeTab = tab;
    // Update active class on buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tab) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    if (simulationData.length > 0) {
        runSimulation();
    }
}

// Load Data
async function loadData() {
    try {
        const response = await fetch('data.json');
        simulationData = await response.json();
        
        // Initial setup
        document.getElementById('val-tabungan').innerText = formatIDR(inputs.tabungan).replace('Rp', '').trim();
        document.getElementById('val-jemaah').innerText = inputs.jemaah;
        document.getElementById('val-tahun').innerText = inputs.tahun;
        
        runSimulation();
    } catch (error) {
        console.error("Error loading data:", error);
        document.getElementById('hero-verdict').innerHTML = `<p>Gagal memuat data dari server.</p>`;
    }
}

// Core Simulation Logic
function runSimulation() {
    // Filter data starting from selected year
    const startIndex = simulationData.findIndex(d => d.Tahun === inputs.tahun);
    const dataSlice = startIndex >= 0 ? simulationData.slice(startIndex) : [];
    
    let saldoRupiah = 0;
    let gramEmas = 0;
    
    const N = inputs.jemaah;
    
    // Milestones tracking
    let milestones = {
        Rupiah: { DP: null, Berangkat: null },
        Emas: { DP: null, Berangkat: null }
    };
    
    let chartLabels = [];
    let chartRupiah = [];
    let chartEmas = [];
    let chartBiaya = [];
    
    for (let i = 0; i < dataSlice.length; i++) {
        const row = dataSlice[i];
        const t = row.Bulan;
        const year = row.Tahun;
        const kurs = row.Kurs;
        const hargaEmas = row.Harga_Emas_IDR_gr;
        
        // Define costs based on active tab
        let dpTarget = 0;
        let lunasTarget = 0;
        let waitingTime = 0; // years after DP
        
        if (activeTab === 'Reguler') {
            dpTarget = 25000000 * N;
            lunasTarget = row.Biaya_Reguler * N;
            waitingTime = 26;
        } else if (activeTab === 'Plus') {
            dpTarget = 4000 * kurs * N;
            lunasTarget = row.Biaya_Plus_IDR * N;
            waitingTime = 7;
        } else if (activeTab === 'Furoda') {
            dpTarget = 0; // Furoda requires full payment at once usually, or we treat lunas as DP
            lunasTarget = row.Biaya_Furoda_IDR * N;
            waitingTime = 0;
        }
        
        // Accumulate
        saldoRupiah += inputs.tabungan;
        gramEmas += inputs.tabungan / hargaEmas;
        const valuasiEmas = gramEmas * hargaEmas;
        
        // Push to chart data
        if (i % 6 === 0) { // store data every 6 months to avoid heavy charting
            chartLabels.push(year + '-' + t.split('-')[1]);
            chartRupiah.push(saldoRupiah);
            chartEmas.push(valuasiEmas);
            chartBiaya.push(lunasTarget);
        }
        
        // Logic for Rupiah
        if (activeTab === 'Furoda') {
            if (!milestones.Rupiah.Berangkat && saldoRupiah >= lunasTarget) {
                milestones.Rupiah.Berangkat = { date: t, year: year, type: 'Rupiah' };
            }
        } else {
            if (!milestones.Rupiah.DP && saldoRupiah >= dpTarget) {
                milestones.Rupiah.DP = { date: t, year: year, type: 'Rupiah' };
            }
            if (milestones.Rupiah.DP && !milestones.Rupiah.Berangkat) {
                if (year >= milestones.Rupiah.DP.year + waitingTime && saldoRupiah >= lunasTarget) {
                    milestones.Rupiah.Berangkat = { date: t, year: year, type: 'Rupiah' };
                }
            }
        }
        
        // Logic for Emas
        if (activeTab === 'Furoda') {
            if (!milestones.Emas.Berangkat && valuasiEmas >= lunasTarget) {
                milestones.Emas.Berangkat = { date: t, year: year, type: 'Emas' };
            }
        } else {
            if (!milestones.Emas.DP && valuasiEmas >= dpTarget) {
                milestones.Emas.DP = { date: t, year: year, type: 'Emas' };
            }
            if (milestones.Emas.DP && !milestones.Emas.Berangkat) {
                if (year >= milestones.Emas.DP.year + waitingTime && valuasiEmas >= lunasTarget) {
                    milestones.Emas.Berangkat = { date: t, year: year, type: 'Emas' };
                }
            }
        }
    }
    
    // Update Chart
    document.getElementById('chart-title').innerText = `Proyeksi Tabungan vs Biaya Haji ${activeTab} (${N} Orang)`;
    updateChart(chartLabels, chartRupiah, chartEmas, chartBiaya);
    
    // Render UI
    renderVerdict(milestones);
    renderMilestoneGrid(milestones);
}

function renderVerdict(milestones) {
    const verdictEl = document.getElementById('hero-verdict');
    const bRupiah = milestones.Rupiah.Berangkat ? milestones.Rupiah.Berangkat.year : 2120;
    const bEmas = milestones.Emas.Berangkat ? milestones.Emas.Berangkat.year : 2120;
    
    if (bRupiah === 2120 && bEmas === 2120) {
        verdictEl.innerHTML = `
            <span class="material-symbols-rounded text-4xl mb-2">warning</span>
            <h3 class="text-xl font-bold mb-1">Tabungan Belum Cukup</h3>
            <p class="text-sm opacity-90">Bunda, sepertinya dengan nominal ini waktunya sangat lama. Yuk, coba tambah tabungan bulanan.</p>
        `;
        return;
    }
    
    let fastest = bRupiah <= bEmas ? 'Rupiah' : 'Emas';
    let year = fastest === 'Rupiah' ? bRupiah : bEmas;
    let waitTime = year - inputs.tahun;
    
    let compareText = "";
    if (bEmas < bRupiah) {
        compareText = `Bunda bisa berangkat ${bRupiah - bEmas} tahun lebih cepat dibanding nabung uang biasa lho!`;
    } else if (bRupiah < bEmas) {
        compareText = `Lebih cepat ${bEmas - bRupiah} tahun dibanding nabung emas.`;
    } else {
        compareText = `Bunda bisa pilih nabung emas atau uang, waktu tunggunya sama aja.`;
    }
    
    verdictEl.innerHTML = `
        <div class="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span class="material-symbols-rounded text-sm">auto_awesome</span>
            <span>Rekomendasi Terbaik</span>
        </div>
        <h2 class="text-2xl font-bold mb-3">Nabung ${fastest === 'Emas' ? 'Emas' : 'Uang'} + ${activeTab}</h2>
        <div class="flex justify-around items-center bg-white/10 rounded-2xl p-3">
            <div>
                <p class="text-xs opacity-90 mb-1">Berangkat Tahun</p>
                <p class="text-3xl font-bold">${year}</p>
            </div>
            <div class="w-px h-10 bg-white/30"></div>
            <div>
                <p class="text-xs opacity-90 mb-1">Masa Tunggu</p>
                <p class="text-3xl font-bold">${waitTime} <span class="text-base font-normal">Thn</span></p>
            </div>
        </div>
        <p class="text-sm mt-4 bg-white/20 p-3 rounded-xl text-left shadow-sm">💡 <b>Pesan Bunda:</b> ${compareText}</p>
    `;
}

function renderMilestoneGrid(milestones) {
    const tbody = document.getElementById('milestone-table-body');
    
    let dpRupiah = activeTab === 'Furoda' ? 'Lunas' : (milestones.Rupiah.DP ? milestones.Rupiah.DP.year : '-');
    let dpEmas = activeTab === 'Furoda' ? 'Lunas' : (milestones.Emas.DP ? milestones.Emas.DP.year : '-');
    
    let lunasRupiah = milestones.Rupiah.Berangkat ? milestones.Rupiah.Berangkat.year : '> 2120';
    let lunasEmas = milestones.Emas.Berangkat ? milestones.Emas.Berangkat.year : '> 2120';
    
    let tungguRupiah = milestones.Rupiah.Berangkat ? (milestones.Rupiah.Berangkat.year - inputs.tahun) + ' thn' : '-';
    let tungguEmas = milestones.Emas.Berangkat ? (milestones.Emas.Berangkat.year - inputs.tahun) + ' thn' : '-';
    
    tbody.innerHTML = `
        <tr>
            <td class="py-4 px-2 font-medium text-slate-700">Tahun Lunas DP</td>
            <td class="py-4 px-2 text-center text-slate-600 font-bold bg-white">${dpRupiah}</td>
            <td class="py-4 px-2 text-center text-gold font-bold bg-gold-light/30">${dpEmas}</td>
        </tr>
        <tr>
            <td class="py-4 px-2 font-medium text-slate-700">Estimasi Berangkat</td>
            <td class="py-4 px-2 text-center text-slate-600 font-bold bg-white">${lunasRupiah}</td>
            <td class="py-4 px-2 text-center text-gold font-bold bg-gold-light/30">${lunasEmas}</td>
        </tr>
        <tr>
            <td class="py-4 px-2 font-medium text-slate-700">Waktu Tunggu</td>
            <td class="py-4 px-2 text-center text-slate-600 font-bold bg-white">${tungguRupiah}</td>
            <td class="py-4 px-2 text-center text-gold font-bold bg-gold-light/30">${tungguEmas}</td>
        </tr>
    `;
}

// Start
document.addEventListener("DOMContentLoaded", () => {
    loadData();
});
