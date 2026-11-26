"""
Script Eksperimen Lengkap Pemodelan Matematika Tabungan Haji (Emas vs Rupiah).
Menghasilkan data tabular (CSV/LaTeX) dan grafik publikasi (PDF).
"""
import os
import json
import numpy as np
import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy.optimize import curve_fit
from statsmodels.tsa.holtwinters import ExponentialSmoothing

# Setup plot style (clean academic)
plt.rcParams.update({
    'font.family': 'serif',
    'font.size': 11,
    'axes.labelsize': 12,
    'axes.titlesize': 13,
    'xtick.labelsize': 10,
    'ytick.labelsize': 10,
    'legend.fontsize': 10,
    'figure.titlesize': 14,
    'lines.linewidth': 1.8,
    'grid.alpha': 0.3
})

def run_all():
    os.makedirs('paper/figures', exist_ok=True)
    os.makedirs('paper/tables', exist_ok=True)
    np.random.seed(42)

    # ==========================================
    # 1. DATA HISTORIS BIAYA HAJI (BPIH & BIPIH)
    # ==========================================
    # Data 2014-2026: DP = 25jt
    # Bipih = DP + Pelunasan riil
    df_haji = pd.read_excel('research/DataBiayaHaji.xlsx', sheet_name='Data')
    df_haji = df_haji.dropna(subset=['Tahun', 'Total haji regular']).copy()
    df_haji['Tahun'] = df_haji['Tahun'].astype(int)
    
    # Bipih dihitung dari DP (25jt) + Sisa biaya haji regular
    df_haji['Bipih'] = df_haji['DP haji regular'] + df_haji['Sisa biaya haji regular']
    df_haji['BPIH'] = df_haji['Total haji regular']

    t_haji = df_haji['Tahun'].values - 2014
    y_bpih = df_haji['BPIH'].values.astype(float)
    y_bipih = df_haji['Bipih'].values.astype(float)

    # Fitting Model Biaya Haji: Eksponensial & Logistik
    def exp_func(t, P0, g):
        return P0 * np.exp(g * t)

    def log_func(t, K, r, P0):
        return K / (1 + ((K - P0) / P0) * np.exp(-r * t))

    # Fit BPIH
    popt_bpih_exp, _ = curve_fit(exp_func, t_haji, y_bpih, p0=[60e6, 0.04])
    popt_bpih_log, _ = curve_fit(log_func, t_haji, y_bpih, p0=[150e6, 0.08, 60e6],
                                 bounds=([90e6, 0.01, 50e6], [300e6, 0.5, 70e6]))

    # Fit Bipih (beban riil jemaah)
    popt_bipih_exp, _ = curve_fit(exp_func, t_haji, y_bipih, p0=[35e6, 0.04])
    popt_bipih_log, _ = curve_fit(log_func, t_haji, y_bipih, p0=[100e6, 0.08, 35e6],
                                  bounds=([60e6, 0.01, 30e6], [200e6, 0.5, 50e6]))

    # Evaluasi metrik
    def calc_metrics(y_true, y_pred, k):
        n = len(y_true)
        res = y_true - y_pred
        ss_res = np.sum(res**2)
        ss_tot = np.sum((y_true - np.mean(y_true))**2)
        r2 = 1 - ss_res / ss_tot
        rmse = np.sqrt(np.mean(res**2))
        mape = np.mean(np.abs(res / y_true)) * 100
        aic = n * np.log(ss_res / n) + 2 * k
        return r2, rmse, mape, aic

    bpih_metrics_exp = calc_metrics(y_bpih, exp_func(t_haji, *popt_bpih_exp), 2)
    bpih_metrics_log = calc_metrics(y_bpih, log_func(t_haji, *popt_bpih_log), 3)
    bipih_metrics_exp = calc_metrics(y_bipih, exp_func(t_haji, *popt_bipih_exp), 2)
    bipih_metrics_log = calc_metrics(y_bipih, log_func(t_haji, *popt_bipih_log), 3)

    metrics_df = pd.DataFrame([
        {'Variabel': 'BPIH (Total)', 'Model': 'Eksponensial', 'R2': bpih_metrics_exp[0], 'RMSE (Rp)': bpih_metrics_exp[1], 'MAPE (%)': bpih_metrics_exp[2], 'AIC': bpih_metrics_exp[3]},
        {'Variabel': 'BPIH (Total)', 'Model': 'Logistik', 'R2': bpih_metrics_log[0], 'RMSE (Rp)': bpih_metrics_log[1], 'MAPE (%)': bpih_metrics_log[2], 'AIC': bpih_metrics_log[3]},
        {'Variabel': 'Bipih (Riil Jemaah)', 'Model': 'Eksponensial', 'R2': bipih_metrics_exp[0], 'RMSE (Rp)': bipih_metrics_exp[1], 'MAPE (%)': bipih_metrics_exp[2], 'AIC': bipih_metrics_exp[3]},
        {'Variabel': 'Bipih (Riil Jemaah)', 'Model': 'Logistik', 'R2': bipih_metrics_log[0], 'RMSE (Rp)': bipih_metrics_log[1], 'MAPE (%)': bipih_metrics_log[2], 'AIC': bipih_metrics_log[3]},
    ])
    metrics_df.to_csv('paper/tables/model_fit_metrics.csv', index=False)
    print("=== MODEL FIT METRICS ===")
    print(metrics_df.to_string())

    # ==========================================
    # 2. MODEL KURS USD/IDR (HOLT'S LINEAR)
    # ==========================================
    df_kurs = pd.read_excel('research/KursTransaksiUSD.xlsx')
    df_kurs['Tanggal'] = pd.to_datetime(df_kurs['Tanggal'], format='mixed')
    df_kurs = df_kurs.set_index('Tanggal').sort_index()
    df_kurs_m = df_kurs['Kurs Jual'].resample('ME').mean().dropna()

    holt_kurs = ExponentialSmoothing(df_kurs_m, trend='add', damped_trend=False, seasonal=None, initialization_method='estimated').fit()
    alpha_kurs = holt_kurs.params['smoothing_level']
    beta_kurs = holt_kurs.params['smoothing_trend']
    print(f"\nHolt's Kurs Params: alpha={alpha_kurs:.4f}, beta={beta_kurs:.4f}")

    # Proyeksi 30 tahun (360 bulan, 2026-2056)
    n_months = 360
    forecast_dates = pd.date_range(start='2026-01-01', periods=n_months, freq='MS')
    kurs_pred = holt_kurs.forecast(n_months).values

    # ==========================================
    # 3. MODEL HARGA EMAS ANTAM (GBM)
    # ==========================================
    df_emas = pd.read_csv('research/antam_prices.csv')
    df_emas['date'] = pd.to_datetime(df_emas['date'])
    df_emas = df_emas.set_index('date').sort_index()
    df_emas_m = df_emas['harga_jual'].resample('ME').mean().dropna()

    log_returns = np.log(df_emas_m / df_emas_m.shift(1)).dropna()
    mu_m = log_returns.mean()
    sigma_m = log_returns.std()
    mu_annual = mu_m * 12
    sigma_annual = sigma_m * np.sqrt(12)
    print(f"\nGBM Emas (Bulanan): mu={mu_m:.5f}, sigma={sigma_m:.5f}")
    print(f"GBM Emas (Tahunan): mu={mu_annual*100:.2f}%, sigma={sigma_annual*100:.2f}%")

    # Monte Carlo 1,000 lintasan (360 bulan)
    n_sim = 1000
    S0 = df_emas_m.iloc[-1]
    drift = mu_m - 0.5 * (sigma_m**2)
    Z = np.random.standard_normal((n_months, n_sim))
    path_returns = np.exp(drift + sigma_m * Z)

    gold_paths = np.zeros((n_months, n_sim))
    gold_paths[0] = S0 * path_returns[0]
    for t in range(1, n_months):
        gold_paths[t] = gold_paths[t-1] * path_returns[t]

    gold_median = np.median(gold_paths, axis=1)
    gold_p05 = np.percentile(gold_paths, 5, axis=1)
    gold_p95 = np.percentile(gold_paths, 95, axis=1)

    # Spread buyback Antam (historis rata-rata diskon buyback ~10%)
    buyback_factor = 0.90

    # ==========================================
    # 4. SIMULASI AKUMULASI TABUNGAN & STOPPING TIME
    # ==========================================
    # Uji beberapa skenario nominal bulanan: Rp 1jt, Rp 1.5jt, Rp 2jt, Rp 3jt
    nominals = [1_000_000, 1_500_000, 2_000_000, 3_000_000]
    results_summary = []

    # Proyeksi Bipih & BPIH bulanan (t=12 di 2026)
    t_sim_years = np.linspace(12, 12 + 30, n_months)
    bipih_projected_exp = exp_func(t_sim_years, *popt_bipih_exp)
    dp_haji = 25_000_000 # setoran porsi tetap

    for M in nominals:
        # A. Tabungan Uang Tunai (Rupiah Flat)
        cash_accum = np.arange(1, n_months + 1) * M
        
        # Waktu DP (bulan)
        t_dp_cash = np.where(cash_accum >= dp_haji)[0]
        m_dp_cash = (t_dp_cash[0] + 1) if len(t_dp_cash) > 0 else np.nan

        # Waktu Lunas (bulan) terhadap Bipih
        t_lunas_cash = np.where(cash_accum >= bipih_projected_exp)[0]
        m_lunas_cash = (t_lunas_cash[0] + 1) if len(t_lunas_cash) > 0 else np.nan

        # B. Tabungan Emas (Stokastik Monte Carlo)
        # Beli emas tiap bulan = M / harga_jual_bulan_itu
        # Nilai aset saat dicairkan = total_gram * harga_jual * buyback_factor
        m_dp_gold_sim = []
        m_lunas_gold_sim = []

        for sim_idx in range(n_sim):
            gold_prices_sim = gold_paths[:, sim_idx]
            grams_bought = M / gold_prices_sim
            accum_grams = np.cumsum(grams_bought)
            gold_asset_value = accum_grams * gold_prices_sim * buyback_factor

            # DP
            t_dp_g = np.where(gold_asset_value >= dp_haji)[0]
            m_dp_gold_sim.append((t_dp_g[0] + 1) if len(t_dp_g) > 0 else 360)

            # Lunas
            t_lun_g = np.where(gold_asset_value >= bipih_projected_exp)[0]
            m_lunas_gold_sim.append((t_lun_g[0] + 1) if len(t_lun_g) > 0 else 360)

        m_dp_gold_med = np.median(m_dp_gold_sim)
        m_lunas_gold_med = np.median(m_lunas_gold_sim)
        m_lunas_gold_p05 = np.percentile(m_lunas_gold_sim, 5)
        m_lunas_gold_p95 = np.percentile(m_lunas_gold_sim, 95)

        # Hitung waktu tunggu antrean 25 tahun (300 bulan)
        # Waktu berangkat = max(waktu lunas, waktu DP + 300)
        berangkat_cash = max(m_lunas_cash, m_dp_cash + 300) if not np.isnan(m_lunas_cash) else np.nan
        berangkat_gold = max(m_lunas_gold_med, m_dp_gold_med + 300)

        results_summary.append({
            'Nominal (Rp/bln)': f"{M:,.0f}",
            'Bulan DP (Kas)': f"{m_dp_cash:.0f} bln ({m_dp_cash/12:.1f} thn)",
            'Bulan DP (Emas Median)': f"{m_dp_gold_med:.0f} bln ({m_dp_gold_med/12:.1f} thn)",
            'Bulan Lunas (Kas)': f"{m_lunas_cash:.0f} bln ({m_lunas_cash/12:.1f} thn)" if not np.isnan(m_lunas_cash) else "Tidak Tercapai",
            'Bulan Lunas (Emas Median)': f"{m_lunas_gold_med:.0f} bln ({m_lunas_gold_med/12:.1f} thn)",
            '95% CI Lunas Emas (thn)': f"[{m_lunas_gold_p05/12:.1f}, {m_lunas_gold_p95/12:.1f}]",
            'Total Waktu Berangkat (Kas)': f"{berangkat_cash/12:.1f} thn" if not np.isnan(berangkat_cash) else "Tidak Berangkat",
            'Total Waktu Berangkat (Emas)': f"{berangkat_gold/12:.1f} thn"
        })

    sim_df = pd.DataFrame(results_summary)
    sim_df.to_csv('paper/tables/simulation_results.csv', index=False)
    print("\n=== HASIL SIMULASI AKUMULASI TABUNGAN ===")
    print(sim_df.to_string())

    # ==========================================
    # 5. VISUALISASI PUBLIKASI (PDF)
    # ==========================================
    # Figure 1: Model Fit Biaya Haji (BPIH & Bipih)
    plt.figure(figsize=(8, 5))
    years_plot = np.linspace(2014, 2035, 100)
    t_plot = years_plot - 2014
    plt.scatter(df_haji['Tahun'], df_haji['BPIH'] / 1e6, color='black', marker='o', label='BPIH Historis (Kemenag)')
    plt.plot(years_plot, exp_func(t_plot, *popt_bpih_exp) / 1e6, 'b--', label=f'BPIH Eksponensial (g={popt_bpih_exp[1]*100:.1f}%)')
    plt.plot(years_plot, log_func(t_plot, *popt_bpih_log) / 1e6, 'b:', label=f'BPIH Logistik (K=Rp {popt_bpih_log[0]/1e6:.0f}Jt)')

    plt.scatter(df_haji['Tahun'], df_haji['Bipih'] / 1e6, color='red', marker='s', label='Bipih Historis (Beban Jemaah)')
    plt.plot(years_plot, exp_func(t_plot, *popt_bipih_exp) / 1e6, 'r--', label=f'Bipih Eksponensial (g={popt_bipih_exp[1]*100:.1f}%)')
    plt.plot(years_plot, log_func(t_plot, *popt_bipih_log) / 1e6, 'r:', label=f'Bipih Logistik (K=Rp {popt_bipih_log[0]/1e6:.0f}Jt)')

    plt.axvline(x=2026, color='gray', linestyle='-.', alpha=0.7, label='Batas Data Riil (2026)')
    plt.xlabel('Tahun')
    plt.ylabel('Biaya (Juta Rupiah)')
    plt.title('Kecocokan Model Pertumbuhan Biaya Haji (2014-2035)')
    plt.legend(frameon=True, loc='upper left')
    plt.tight_layout()
    plt.savefig('paper/figures/fig1_haji_model_fit.pdf', dpi=300)
    plt.close()

    # Figure 2: Simulasi GBM Emas & Lintasan Monte Carlo
    plt.figure(figsize=(8, 5))
    years_future = 2026 + np.arange(n_months) / 12
    # Plot 30 lintasan sampel
    for i in range(30):
        plt.plot(years_future, gold_paths[:, i] / 1e6, color='gold', alpha=0.25, linewidth=0.8)
    plt.plot(years_future, gold_median / 1e6, color='darkorange', linewidth=2.5, label='Median Lintasan Emas (GBM)')
    plt.fill_between(years_future, gold_p05 / 1e6, gold_p95 / 1e6, color='orange', alpha=0.2, label='Interval Kepercayaan 90%')
    plt.xlabel('Tahun Proyeksi')
    plt.ylabel('Harga Emas Antam (Juta Rp / gram)')
    plt.title('Lintasan Stokastik Harga Emas Menggunakan Geometric Brownian Motion')
    plt.legend(frameon=True, loc='upper left')
    plt.tight_layout()
    plt.savefig('paper/figures/fig2_gold_gbm_simulation.pdf', dpi=300)
    plt.close()

    # Figure 3: Komparasi Akumulasi Tabungan Kas vs Emas (Nominal Rp 1.5jt/bulan)
    M_demo = 1_500_000
    cash_demo = np.arange(1, n_months + 1) * M_demo
    gold_demo_med = np.cumsum(M_demo / gold_median) * gold_median * buyback_factor
    gold_demo_p05 = np.cumsum(M_demo / gold_p95) * gold_p05 * buyback_factor
    gold_demo_p95 = np.cumsum(M_demo / gold_p05) * gold_p95 * buyback_factor

    plt.figure(figsize=(9, 5.5))
    plt.plot(years_future, cash_demo / 1e6, 'b-', label='Tabungan Uang Tunai (Rp 1.5 Juta/bln)')
    plt.plot(years_future, gold_demo_med / 1e6, 'darkgoldenrod', linewidth=2.2, label='Tabungan Emas Fisik (Median)')
    plt.fill_between(years_future, gold_demo_p05 / 1e6, gold_demo_p95 / 1e6, color='gold', alpha=0.25, label='Rentang 90% Akumulasi Emas')
    plt.plot(years_future, bipih_projected_exp / 1e6, 'r--', linewidth=2.0, label='Proyeksi Pelunasan Bipih (Eksponensial)')
    plt.axhline(y=dp_haji / 1e6, color='darkgreen', linestyle=':', label='Setoran Awal / DP Porsi (Rp 25 Juta)')

    plt.xlabel('Tahun')
    plt.ylabel('Nilai Akumulasi (Juta Rupiah)')
    plt.title('Dinamika Akumulasi Tabungan Kas vs. Emas Terhadap Biaya Pelunasan Haji')
    plt.legend(frameon=True, loc='upper left')
    plt.tight_layout()
    plt.savefig('paper/figures/fig3_accumulation_comparison.pdf', dpi=300)
    plt.close()

    print("\nEksperimen selesai. Semua grafik PDF dan tabel CSV tersimpan.")

if __name__ == '__main__':
    run_all()
