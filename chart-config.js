let simulationChartInstance = null;
let currentMilestones = null;
let currentChartMode = 'Rupiah';

const colors = {
    rupiah: '#005792',     // Primary Blue
    emas: '#d4af37',       // Gold/Amber
    biaya: '#ba1a1a',      // Red (Target)
    nodeBg: '#ffffff'
};

// Formatter for millions/billions
function formatShortNumber(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1).replace(/\.0$/, '') + ' Miliar';
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(0) + ' Juta';
    }
    return new Intl.NumberFormat('id-ID').format(num);
}

// Custom Plugin to draw milestone labels above the points
const milestonePlugin = {
    id: 'milestoneLabels',
    afterDatasetsDraw(chart, args, options) {
        const { ctx } = chart;
        const metaRupiah = chart.getDatasetMeta(0);
        const metaEmas = chart.getDatasetMeta(1);
        
        if (!currentMilestones) return;
        
        const drawLabel = (meta, type, text) => {
            if (meta.hidden) return;
            const milestone = currentMilestones[currentChartMode][type];
            if (!milestone) return;
            const yearStr = milestone.year.toString();
            const index = chart.data.labels.indexOf(yearStr);
            if (index !== -1 && meta.data[index]) {
                const element = meta.data[index];
                ctx.save();
                ctx.font = 'bold 11px Quicksand, sans-serif';
                ctx.fillStyle = colors[currentChartMode.toLowerCase()];
                ctx.textAlign = 'center';
                ctx.fillText(text, element.x, element.y - 12);
                ctx.restore();
            }
        };
        
        drawLabel(currentChartMode === 'Rupiah' ? metaRupiah : metaEmas, 'DP', 'DP');
        drawLabel(currentChartMode === 'Rupiah' ? metaRupiah : metaEmas, 'Pelunasan', 'Lunas');
        drawLabel(currentChartMode === 'Rupiah' ? metaRupiah : metaEmas, 'Berangkat', 'Berangkat');
    }
};

function updateChart(chartMode, labels, dataRupiah, dataEmas, dataBiaya, milestones) {
    currentMilestones = milestones;
    currentChartMode = chartMode;
    
    // Determine milestone indices for point radius
    const getMilestoneIndex = (mode, type) => {
        if (!milestones || !milestones[mode] || !milestones[mode][type]) return -1;
        return labels.indexOf(milestones[mode][type].year.toString());
    };
    
    const dpIdx = getMilestoneIndex(chartMode, 'DP');
    const pelunasanIdx = getMilestoneIndex(chartMode, 'Pelunasan');
    const berangkatIdx = getMilestoneIndex(chartMode, 'Berangkat');
    
    const getRadii = () => labels.map((_, i) => (i === dpIdx || i === pelunasanIdx || i === berangkatIdx) ? 5 : 0);
    const radii = getRadii();

    // If chart exists, update it dynamically
    if (simulationChartInstance) {
        simulationChartInstance.data.labels = labels;
        simulationChartInstance.data.datasets[0].data = dataRupiah;
        simulationChartInstance.data.datasets[1].data = dataEmas;
        simulationChartInstance.data.datasets[2].data = dataBiaya;
        
        simulationChartInstance.data.datasets[0].hidden = (chartMode !== 'Rupiah');
        simulationChartInstance.data.datasets[1].hidden = (chartMode !== 'Emas');
        
        simulationChartInstance.data.datasets[0].pointRadius = (chartMode === 'Rupiah') ? radii : 0;
        simulationChartInstance.data.datasets[1].pointRadius = (chartMode === 'Emas') ? radii : 0;
        
        simulationChartInstance.update();
        return;
    }
    
    // Otherwise, create it for the first time
    const ctx = document.getElementById('simulationChart').getContext('2d');
    
    let gradientEmas = ctx.createLinearGradient(0, 0, 0, 400);
    gradientEmas.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
    gradientEmas.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
    
    let gradientRupiah = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRupiah.addColorStop(0, 'rgba(0, 87, 146, 0.3)');
    gradientRupiah.addColorStop(1, 'rgba(0, 87, 146, 0.0)');

    simulationChartInstance = new Chart(ctx, {
        type: 'line',
        plugins: [milestonePlugin],
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Tabungan Rupiah',
                    data: dataRupiah,
                    borderColor: colors.rupiah,
                    backgroundColor: gradientRupiah,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: (chartMode === 'Rupiah') ? radii : 0,
                    pointBackgroundColor: colors.nodeBg,
                    pointBorderColor: colors.rupiah,
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    tension: 0.4,
                    hidden: (chartMode !== 'Rupiah')
                },
                {
                    label: 'Tabungan Emas',
                    data: dataEmas,
                    borderColor: colors.emas,
                    backgroundColor: gradientEmas,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: (chartMode === 'Emas') ? radii : 0,
                    pointBackgroundColor: colors.nodeBg,
                    pointBorderColor: colors.emas,
                    pointBorderWidth: 2,
                    pointHoverRadius: 8,
                    tension: 0.4,
                    hidden: (chartMode !== 'Emas')
                },
                {
                    label: 'Target Biaya Haji',
                    data: dataBiaya,
                    borderColor: colors.biaya,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { family: "'Quicksand', sans-serif", size: 13 }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1a1a1a',
                    bodyColor: '#4a4a4a',
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { family: "'Quicksand', sans-serif", size: 14, weight: 'bold' },
                    bodyFont: { family: "'Quicksand', sans-serif", size: 13 },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) {
                                label += 'Rp ' + formatShortNumber(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        maxTicksLimit: 6,
                        font: { family: "'Quicksand', sans-serif" }
                    }
                },
                y: {
                    border: { display: false },
                    grid: { color: 'rgba(0,0,0,0.04)' },
                    ticks: {
                        callback: function(value) { return 'Rp ' + formatShortNumber(value); },
                        font: { family: "'Quicksand', sans-serif" }
                    }
                }
            }
        }
    });
}
