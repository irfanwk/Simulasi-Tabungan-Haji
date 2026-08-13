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
            <div class="relative z-10 space-y-6">
                <div class="inline-flex items-center gap-2 bg-red-500/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
                    <span class="material-symbols-outlined text-sm">warning</span>
                    <span class="text-xs font-bold uppercase tracking-wider">Perhatian</span>
                </div>
                <h2 class="text-3xl font-bold">Tabungan Belum Mencukupi</h2>
                <p class="text-lg opacity-90">Dengan tabungan ini, simulasi hingga 2120 belum dapat menutupi biaya pelunasan. Coba tingkatkan nilai tabungan bulanan.</p>
            </div>
        `;
        return;
    }
    
    let fastest = bRupiah <= bEmas ? 'Rupiah' : 'Emas';
    let year = fastest === 'Rupiah' ? bRupiah : bEmas;
    let waitTime = year - inputs.tahun;
    
    let compareText = "";
    if (bEmas < bRupiah) {
        compareText = `Lebih cepat ${bRupiah - bEmas} tahun dibanding nabung uang tunai!`;
    } else if (bRupiah < bEmas) {
        compareText = `Lebih cepat ${bEmas - bRupiah} tahun dibanding nabung emas.`;
    } else {
        compareText = `Waktu tunggu sama antara Emas & Rupiah.`;
    }
    
    verdictEl.innerHTML = `
        <div class="absolute -right-10 -top-10 opacity-10">
            <span class="material-symbols-outlined text-9xl">mosque</span>
        </div>
        <div class="relative z-10 space-y-6">
            <div class="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
                <span class="material-symbols-outlined text-sm">stars</span>
                <span class="text-xs font-bold uppercase tracking-wider">Rekomendasi Tercepat</span>
            </div>
            <h2 class="text-3xl font-bold">Tabungan ${fastest} + Skema ${activeTab}</h2>
            <div class="grid grid-cols-2 gap-8 pt-4 border-t border-white/20">
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Estimasi Berangkat</p>
                    <p class="text-4xl font-light">Tahun ${year}</p>
                </div>
                <div>
                    <p class="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Masa Tunggu</p>
                    <p class="text-4xl font-light">${waitTime} Tahun</p>
                </div>
            </div>
            <p class="text-sm opacity-90 mt-2">💡 ${compareText}</p>
        </div>
    `;
}

function renderMilestoneGrid(milestones) {
    const grid = document.getElementById('milestone-grid');
    let html = '';
    
    const formats = [
        { key: 'Rupiah', title: 'Via Tabungan Tunai (IDR)', class: '' },
        { key: 'Emas', title: 'Via Tabungan Emas (Logam Mulia)', class: 'gold-version' }
    ];
    
    formats.forEach(f => {
        let m = milestones[f.key];
        let dpText = activeTab === 'Furoda' ? 'Langsung Lunas' : (m.DP ? `Tahun ${m.DP.year}` : 'Tidak Tercapai');
        let lunasText = m.Berangkat ? `Tahun ${m.Berangkat.year}` : '> 2120';
        
        let cardClass = f.key === 'Emas' ? 'premium-gold-glass rounded-xl' : 'glass-panel rounded-xl border-t-4 border-[#333e51] hover:shadow-lg transition-shadow';
        let iconBg = f.key === 'Emas' ? 'bg-[#fed65b] text-[#735c00]' : 'bg-[#e6e8ea] text-[#333e51]';
        let iconName = f.key === 'Emas' ? 'diamond' : 'payments';
        let titleColor = f.key === 'Emas' ? 'text-[#241a00]' : 'text-[#333e51]';
        let valColor = f.key === 'Emas' ? 'text-[#241a00]' : 'text-[#333e51]';
        
        html += `
            <div class="${cardClass} p-6">
                <div class="flex items-center gap-3 mb-6 relative z-10">
                    <div class="w-10 h-10 rounded-full ${iconBg} flex items-center justify-center">
                        <span class="material-symbols-outlined">${iconName}</span>
                    </div>
                    <h3 class="text-xl font-medium ${titleColor}">${f.title}</h3>
                </div>
                <div class="space-y-4 relative z-10">
                    <div class="flex justify-between items-center border-b ${f.key === 'Emas' ? 'border-[#d4af37]/20' : 'border-[#e0e3e5]'} pb-2">
                        <span class="text-base text-[#414750]">Target DP Tercapai</span>
                        <span class="text-lg font-semibold ${valColor}">${dpText}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-base text-[#414750]">Estimasi Berangkat</span>
                        <span class="text-lg font-semibold ${valColor}">${lunasText}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// Start
document.addEventListener("DOMContentLoaded", () => {
    loadData();
});
