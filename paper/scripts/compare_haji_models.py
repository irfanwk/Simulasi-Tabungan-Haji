"""
Evaluasi Goodness-of-Fit Model Matematika untuk Biaya Haji Reguler (2014-2026).
Membandingkan Model Logistik, Eksponensial, dan Polinomial.
"""
import pandas as pd
import numpy as np
from scipy.optimize import curve_fit

def run():
    df_haji = pd.read_excel('research/DataBiayaHaji.xlsx', sheet_name='Data')
    df = df_haji[['Tahun', 'Total haji regular']].dropna()
    df['Tahun'] = df['Tahun'].astype(int)
    t = df['Tahun'].values - df['Tahun'].min() # t=0 at 2014
    y = df['Total haji regular'].values.astype(float)
    
    # 1. Model Logistik: P(t) = K / (1 + ((K - P0)/P0) * exp(-r * t))
    def logistic(t, K, r, P0):
        return K / (1 + ((K - P0) / P0) * np.exp(-r * t))
    
    p0_log = [150_000_000, 0.05, 59_270_000]
    bounds_log = ([100_000_000, 0.001, 50_000_000], [300_000_000, 0.5, 70_000_000])
    popt_log, _ = curve_fit(logistic, t, y, p0=p0_log, bounds=bounds_log, maxfev=10000)
    y_pred_log = logistic(t, *popt_log)
    
    # 2. Model Eksponensial: P(t) = P0 * exp(g * t)
    def exponential(t, P0, g):
        return P0 * np.exp(g * t)
    
    popt_exp, _ = curve_fit(exponential, t, y, p0=[59_000_000, 0.03], maxfev=10000)
    y_pred_exp = exponential(t, *popt_exp)
    
    # 3. Model Linear: P(t) = a * t + b
    def linear(t, a, b):
        return a * t + b
    popt_lin, _ = curve_fit(linear, t, y)
    y_pred_lin = linear(t, *popt_lin)
    
    # Metrics function
    def metrics(y_true, y_pred, k_params):
        n = len(y_true)
        residuals = y_true - y_pred
        ss_res = np.sum(residuals**2)
        ss_tot = np.sum((y_true - np.mean(y_true))**2)
        r2 = 1 - (ss_res / ss_tot)
        rmse = np.sqrt(np.mean(residuals**2))
        mape = np.mean(np.abs(residuals / y_true)) * 100
        # AIC: n * ln(ss_res / n) + 2k
        aic = n * np.log(ss_res / n) + 2 * k_params
        return r2, rmse, mape, aic

    models = {
        "Logistik": (y_pred_log, popt_log, 3),
        "Eksponensial": (y_pred_exp, popt_exp, 2),
        "Linear": (y_pred_lin, popt_lin, 2)
    }
    
    print("=== PERBANDINGAN MODEL MATEMATIKA BIAYA HAJI (2014-2026) ===")
    for name, (pred, params, k) in models.items():
        r2, rmse, mape, aic = metrics(y, pred, k)
        print(f"\nModel {name}:")
        print(f"  Parameter: {params}")
        print(f"  R^2   : {r2:.4f}")
        print(f"  RMSE  : Rp {rmse:,.0f}")
        print(f"  MAPE  : {mape:.2f}%")
        print(f"  AIC   : {aic:.2f}")

    print("\nProyeksi Biaya Haji Tahun 2030, 2040, 2050:")
    t_future = np.array([2030 - 2014, 2040 - 2014, 2050 - 2014])
    print(f"Logistik    : {[f'Rp {v:,.0f}' for v in logistic(t_future, *popt_log)]}")
    print(f"Eksponensial: {[f'Rp {v:,.0f}' for v in exponential(t_future, *popt_exp)]}")
    print(f"Linear      : {[f'Rp {v:,.0f}' for v in linear(t_future, *popt_lin)]}")

if __name__ == '__main__':
    run()
