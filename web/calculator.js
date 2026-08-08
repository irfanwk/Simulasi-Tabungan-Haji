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
            <div class="verdict-icon">⚠️</div>
            <h3 class="verdict-title">Tabungan Belum Mencukupi</h3>
            <p class="verdict-desc">Dengan tabungan ini, simulasi hingga 2120 belum dapat menutupi biaya pelunasan. Coba tingkatkan nilai tabungan bulanan.</p>
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
        <span class="highlight-badge">Rekomendasi Tercepat</span>
        <h3 class="verdict-title">Tabungan ${fastest} + Skema ${activeTab}</h3>
        <p class="verdict-desc">Estimasi Berangkat: <strong>Tahun ${year}</strong> (Tunggu ${waitTime} Tahun).</p>
        <p class="verdict-desc" style="margin-top: 8px; font-size: 12px;">💡 ${compareText}</p>
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
        let dpText = activeTab === 'Furoda' ? 'Langsung Lunas (Tanpa DP)' : (m.DP ? `Tahun ${m.DP.year}` : 'Tidak Tercapai');
        let lunasText = m.Berangkat ? `Tahun ${m.Berangkat.year}` : '> 2120';
        
        html += `
            <div class="milestone-card ${f.class}">
                <h4>${f.title}</h4>
                <div style="margin-top: 16px;">
                    <p class="desc">Lunas DP / Dana Awal:</p>
                    <div class="year">${dpText}</div>
                </div>
                <div style="margin-top: 16px;">
                    <p class="desc">Estimasi Keberangkatan:</p>
                    <div class="year">${lunasText}</div>
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
