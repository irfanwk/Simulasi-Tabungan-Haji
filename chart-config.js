let simulationChartInstance = null;

const colors = {
    rupiah: '#005792',     // Primary
    emas: '#d4af37',       // Gold/Amber
    biaya: '#ba1a1a'       // Red (Target)
};

function initChart() {
    const ctx = document.getElementById('simulationChart').getContext('2d');
    
    simulationChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Tabungan Rupiah',
                    data: [],
                    borderColor: colors.rupiah,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
                },
                {
                    label: 'Tabungan Emas (Valuasi Rp)',
                    data: [],
                    borderColor: colors.emas,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    borderDash: [5, 5],
                    tension: 0.1
                },
                {
                    label: 'Biaya Haji Total',
                    data: [],
                    borderColor: colors.biaya,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
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
                            family: "'IBM Plex Sans', sans-serif"
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(context.parsed.y);
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
                            family: "'IBM Plex Sans', sans-serif"
                        }
                    }
                },
                y: {
                    grid: {
                        color: '#E2E8F0'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + (value / 1000000).toFixed(0) + ' Jt';
                        },
                        font: {
                            family: "'IBM Plex Sans', sans-serif"
                        }
                    }
                }
            }
        }
    });
}

function updateChart(labels, dataRupiah, dataEmas, dataBiaya) {
    if (simulationChartInstance) {
        simulationChartInstance.destroy();
    }
    
    const ctx = document.getElementById('simulationChart').getContext('2d');
    
    simulationChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Tabungan Rupiah',
                    data: dataRupiah,
                    borderColor: colors.rupiah,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
                },
                {
                    label: 'Tabungan Emas (Valuasi Rp)',
                    data: dataEmas,
                    borderColor: colors.emas,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    borderDash: [5, 5],
                    tension: 0.1
                },
                {
                    label: 'Biaya Haji Total',
                    data: dataBiaya,
                    borderColor: colors.biaya,
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    pointRadius: 0,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
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
                            family: "'IBM Plex Sans', sans-serif"
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(context.parsed.y);
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
                            family: "'IBM Plex Sans', sans-serif"
                        }
                    }
                },
                y: {
                    grid: {
                        color: '#E2E8F0'
                    },
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + (value / 1000000).toFixed(0) + ' Jt';
                        },
                        font: {
                            family: "'IBM Plex Sans', sans-serif"
                        }
                    }
                }
            }
        }
    });
}
