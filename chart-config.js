let simulationChartInstance = null;

const colors = {
    rupiah: '#005792',     // Primary Blue (kept for contrast, or can use Primary Green)
    emas: '#d4af37',       // Gold/Amber
    biaya: '#ba1a1a'       // Red (Target)
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

function updateChart(labels, dataRupiah, dataEmas, dataBiaya) {
    // If chart exists, update it dynamically (smooth transition)
    if (simulationChartInstance) {
        simulationChartInstance.data.labels = labels;
        simulationChartInstance.data.datasets[0].data = dataRupiah;
        simulationChartInstance.data.datasets[1].data = dataEmas;
        simulationChartInstance.data.datasets[2].data = dataBiaya;
        simulationChartInstance.update();
        return;
    }
    
    // Otherwise, create it for the first time
    const ctx = document.getElementById('simulationChart').getContext('2d');
    
    // Create soft gradients for the area charts
    let gradientEmas = ctx.createLinearGradient(0, 0, 0, 400);
    gradientEmas.addColorStop(0, 'rgba(212, 175, 55, 0.4)');
    gradientEmas.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
    
    let gradientRupiah = ctx.createLinearGradient(0, 0, 0, 400);
    gradientRupiah.addColorStop(0, 'rgba(0, 87, 146, 0.3)');
    gradientRupiah.addColorStop(1, 'rgba(0, 87, 146, 0.0)');

    simulationChartInstance = new Chart(ctx, {
        type: 'line',
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
                    pointRadius: 0,
                    tension: 0.4 // Smooth curves
                },
                {
                    label: 'Tabungan Emas (Valuasi Rp)',
                    data: dataEmas,
                    borderColor: colors.emas,
                    backgroundColor: gradientEmas,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.4
                },
                {
                    label: 'Biaya Haji Total',
                    data: dataBiaya,
                    borderColor: colors.biaya,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    borderDash: [5, 5], // Dashed line for target
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
                        boxWidth: 8,
                        font: {
                            family: "'Quicksand', sans-serif",
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#334155',
                    bodyColor: '#334155',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 6,
                    usePointStyle: true,
                    titleFont: {
                        family: "'Quicksand', sans-serif",
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: "'Quicksand', sans-serif",
                        weight: '500'
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
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
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6,
                        font: {
                            family: "'Quicksand', sans-serif"
                        }
                    }
                },
                y: {
                    border: { display: false },
                    grid: {
                        color: 'rgba(0,0,0,0.04)' // Very soft grid lines
                    },
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + formatShortNumber(value);
                        },
                        font: {
                            family: "'Quicksand', sans-serif"
                        }
                    }
                }
            }
        }
    });
}
