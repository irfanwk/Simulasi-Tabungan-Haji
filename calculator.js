// State variables
let inputs = {
    tabungan: 1500000,
    jemaah: 1,
    tahun: 2026
};
let activeTab = 'Reguler';
let chartMode = 'Rupiah';
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
    
    updateButtonStates();
    if (simulationData.length > 0) {
        runSimulation();
    }
}

function updateButtonStates() {
    const toggleButton = (id, isDisabled) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        if (isDisabled) {
            btn.classList.add('opacity-40', 'pointer-events-none');
            btn.disabled = true;
        } else {
            btn.classList.remove('opacity-40', 'pointer-events-none');
            btn.disabled = false;
        }
    };

    toggleButton('btn-jemaah-min', inputs.jemaah <= 1);
    toggleButton('btn-jemaah-plus', inputs.jemaah >= 4);
    
    toggleButton('btn-tabungan-min', inputs.tabungan <= 500000);
    
    toggleButton('btn-tahun-min', inputs.tahun <= 2026);
    toggleButton('btn-tahun-plus', inputs.tahun >= 2060);
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

function setChartMode(mode) {
    chartMode = mode;
    
    // Update button styles
    const btnRupiah = document.getElementById('toggle-rupiah');
    const btnEmas = document.getElementById('toggle-emas');
    
    if (mode === 'Rupiah') {
        btnRupiah.className = "px-3 py-1 font-label-sm rounded-full bg-primary text-on-primary shadow-sm transition-colors";
        btnEmas.className = "px-3 py-1 font-label-sm rounded-full text-on-surface-variant hover:bg-surface-container transition-colors";
    } else {
        btnEmas.className = "px-3 py-1 font-label-sm rounded-full bg-secondary text-on-primary shadow-sm transition-colors";
        btnRupiah.className = "px-3 py-1 font-label-sm rounded-full text-on-surface-variant hover:bg-surface-container transition-colors";
    }
    
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
        
        updateButtonStates();
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
        Rupiah: { DP: null, Pelunasan: null, Berangkat: null },
        Emas: { DP: null, Pelunasan: null, Berangkat: null }
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
        
        // Push to chart data (Yearly to make X-axis cleaner)
        if (i % 12 === 0) { 
            chartLabels.push(year.toString());
            chartRupiah.push(saldoRupiah);
            chartEmas.push(valuasiEmas);
            chartBiaya.push(lunasTarget);
        }
        
        // Logic for Rupiah
        if (activeTab === 'Furoda') {
            if (!milestones.Rupiah.Pelunasan && saldoRupiah >= lunasTarget) {
                milestones.Rupiah.Pelunasan = { date: t, year: year, type: 'Rupiah' };
            }
            if (!milestones.Rupiah.Berangkat && saldoRupiah >= lunasTarget) {
                milestones.Rupiah.Berangkat = { date: t, year: year, type: 'Rupiah' };
            }
        } else {
            if (!milestones.Rupiah.DP && saldoRupiah >= dpTarget) {
                milestones.Rupiah.DP = { date: t, year: year, type: 'Rupiah' };
            }
            if (!milestones.Rupiah.Pelunasan && saldoRupiah >= lunasTarget) {
                milestones.Rupiah.Pelunasan = { date: t, year: year, type: 'Rupiah' };
            }
            if (milestones.Rupiah.DP && !milestones.Rupiah.Berangkat) {
                if (year >= milestones.Rupiah.DP.year + waitingTime && saldoRupiah >= lunasTarget) {
                    milestones.Rupiah.Berangkat = { date: t, year: year, type: 'Rupiah' };
                }
            }
        }
        
        // Logic for Emas
        if (activeTab === 'Furoda') {
            if (!milestones.Emas.Pelunasan && valuasiEmas >= lunasTarget) {
                milestones.Emas.Pelunasan = { date: t, year: year, type: 'Emas' };
            }
            if (!milestones.Emas.Berangkat && valuasiEmas >= lunasTarget) {
                milestones.Emas.Berangkat = { date: t, year: year, type: 'Emas' };
            }
        } else {
            if (!milestones.Emas.DP && valuasiEmas >= dpTarget) {
                milestones.Emas.DP = { date: t, year: year, type: 'Emas' };
            }
            if (!milestones.Emas.Pelunasan && valuasiEmas >= lunasTarget) {
                milestones.Emas.Pelunasan = { date: t, year: year, type: 'Emas' };
            }
            if (milestones.Emas.DP && !milestones.Emas.Berangkat) {
                if (year >= milestones.Emas.DP.year + waitingTime && valuasiEmas >= lunasTarget) {
                    milestones.Emas.Berangkat = { date: t, year: year, type: 'Emas' };
                }
            }
        }
    }
    
    // Determine reasonable max year for chart to prevent exponential explosion
    const bRupiah = milestones.Rupiah.Berangkat ? milestones.Rupiah.Berangkat.year : 2120;
    const bEmas = milestones.Emas.Berangkat ? milestones.Emas.Berangkat.year : 2120;
    
    let maxYearToChart = 2120;
    if (bRupiah !== 2120 || bEmas !== 2120) {
        maxYearToChart = Math.max(
            bRupiah !== 2120 ? bRupiah : 0, 
            bEmas !== 2120 ? bEmas : 0
        ) + 2;
    } else {
        // if neither can depart, just show 25 years
        maxYearToChart = inputs.tahun + 25;
    }
    
    // Limit visually to max 35 years so it doesn't look totally skewed
    if (maxYearToChart > inputs.tahun + 35) {
        maxYearToChart = inputs.tahun + 35;
    }
    
    let sliceIndex = chartLabels.findIndex(l => parseInt(l.split('-')[0]) > maxYearToChart);
    if (sliceIndex === -1) sliceIndex = chartLabels.length;

    // Update Chart
    document.getElementById('chart-title').innerText = `Proyeksi Tabungan vs Biaya Haji ${activeTab} (${N} Orang)`;
    if (typeof updateChart === 'function') {
        updateChart(
            chartMode,
            chartLabels.slice(0, sliceIndex), 
            chartRupiah.slice(0, sliceIndex), 
            chartEmas.slice(0, sliceIndex), 
            chartBiaya.slice(0, sliceIndex),
            milestones
        );
    }
    
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
        <div class="gradient-primary rounded-xl p-stack-lg soft-shadow relative overflow-hidden text-center" style="background: linear-gradient(135deg, #ba1a1a, #93000a);">
            <div class="relative z-10">
                <span class="material-symbols-outlined text-5xl text-on-primary mb-2">warning</span>
                <p class="font-headline-lg-mobile text-headline-lg-mobile text-on-primary mb-2">Tabungan Belum Cukup</p>
                <p class="font-body-lg text-body-lg text-on-primary opacity-90">Sepertinya dengan nominal ini waktunya sangat lama. Silakan coba tingkatkan nilai tabungan bulanan Anda.</p>
            </div>
        </div>`;
        return;
    }
    
    let fastest = bRupiah <= bEmas ? 'Rupiah' : 'Emas';
    let year = fastest === 'Rupiah' ? bRupiah : bEmas;
    let waitTime = year - inputs.tahun;
    
    let compareText = "";
    if (bEmas < bRupiah) {
        compareText = `Anda bisa berangkat <span class="font-bold text-secondary-fixed">${bRupiah - bEmas} tahun lebih cepat</span> dengan nabung emas.`;
    } else if (bRupiah < bEmas) {
        compareText = `Anda bisa berangkat <span class="font-bold text-secondary-fixed">${bEmas - bRupiah} tahun lebih cepat</span> dengan nabung uang tunai.`;
    } else {
        compareText = `Waktu tunggunya sama, namun Anda dapat menyesuaikan dengan kenyamanan finansial Anda.`;
    }
    
    verdictEl.innerHTML = `
        <div class="gradient-primary rounded-xl p-stack-lg soft-shadow relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 opacity-10">
                <span class="material-symbols-outlined text-[120px]" style="font-variation-settings: 'FILL' 1;">mosque</span>
            </div>
            <div class="relative z-10">
                <p class="font-headline-lg-mobile text-headline-lg-mobile text-on-primary mb-2">Hasil Simulasi:</p>
                <p class="font-body-lg text-body-lg text-on-primary opacity-90 mb-4">${compareText}</p>
                <div class="flex items-center gap-4 border-t border-white/20 pt-4 mt-2">
                    <div>
                        <p class="font-label-sm text-label-sm text-on-primary opacity-80 uppercase tracking-wide">Estimasi Berangkat</p>
                        <p class="font-headline-md text-headline-md text-on-primary">${year}</p>
                    </div>
                    <div class="w-px h-8 bg-white/30"></div>
                    <div>
                        <p class="font-label-sm text-label-sm text-on-primary opacity-80 uppercase tracking-wide">Masa Tunggu</p>
                        <p class="font-headline-md text-headline-md text-on-primary">${waitTime} Tahun</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderMilestoneGrid(milestones) {
    const tbody = document.getElementById('milestone-table-body');
    
    let dpRupiah = activeTab === 'Furoda' ? 'Lunas' : (milestones.Rupiah.DP ? milestones.Rupiah.DP.year : '-');
    let dpEmas = activeTab === 'Furoda' ? 'Lunas' : (milestones.Emas.DP ? milestones.Emas.DP.year : '-');
    
    let pelunasanRupiah = milestones.Rupiah.Pelunasan ? milestones.Rupiah.Pelunasan.year : '> 2120';
    let pelunasanEmas = milestones.Emas.Pelunasan ? milestones.Emas.Pelunasan.year : '> 2120';
    
    let lunasRupiah = milestones.Rupiah.Berangkat ? milestones.Rupiah.Berangkat.year : '> 2120';
    let lunasEmas = milestones.Emas.Berangkat ? milestones.Emas.Berangkat.year : '> 2120';
    
    let tungguRupiah = milestones.Rupiah.Berangkat ? (milestones.Rupiah.Berangkat.year - inputs.tahun) + ' Thn' : '-';
    let tungguEmas = milestones.Emas.Berangkat ? (milestones.Emas.Berangkat.year - inputs.tahun) + ' Thn' : '-';
    
    tbody.innerHTML = `
        <tr class="border-b border-surface-container">
            <td class="p-4 font-body-sm text-body-md text-on-surface-variant">Tahun Lunas DP</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-surface-bright">${dpRupiah}</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-[#fdfaf2] font-semibold text-secondary">${dpEmas}</td>
        </tr>
        <tr class="border-b border-surface-container">
            <td class="p-4 font-body-sm text-body-md text-on-surface-variant">Tahun Lunas Total</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-surface-bright">${pelunasanRupiah}</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-[#fdfaf2] font-semibold text-secondary">${pelunasanEmas}</td>
        </tr>
        <tr class="border-b border-surface-container">
            <td class="p-4 font-body-sm text-body-md text-on-surface-variant">Estimasi Berangkat</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-surface-bright">${lunasRupiah}</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-[#fdfaf2] font-semibold text-secondary">${lunasEmas}</td>
        </tr>
        <tr>
            <td class="p-4 font-body-sm text-body-md text-on-surface-variant">Waktu Tunggu</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-surface-bright">${tungguRupiah}</td>
            <td class="p-4 font-body-md text-body-md text-on-surface text-center bg-[#fdfaf2] font-semibold text-secondary">${tungguEmas}</td>
        </tr>
    `;
}

// Start
document.addEventListener("DOMContentLoaded", () => {
    loadData();
});
