import pandas as pd
import numpy as np
from scipy.optimize import curve_fit
from statsmodels.tsa.holtwinters import ExponentialSmoothing
import json
import os

# Set random seed for reproducibility
np.random.seed(42)

# Load Data
df_haji_raw = pd.read_excel('DataBiayaHaji.xlsx', sheet_name='Data')
df_kurs_raw = pd.read_excel('KursTransaksiUSD.xlsx')
df_emas_raw = pd.read_csv('antam_prices.csv')

# --- 1. PREPROCESSING KURS ---
df_kurs = df_kurs_raw.copy()
# Fix for parsing date with dateutil fallback warning
df_kurs['Tanggal'] = pd.to_datetime(df_kurs['Tanggal'], format='mixed', dayfirst=True)
df_kurs = df_kurs.set_index('Tanggal').sort_index()
df_kurs_m = df_kurs['Kurs Jual'].resample('ME').mean().dropna()

model_kurs = ExponentialSmoothing(df_kurs_m, trend='add', damped_trend=False, seasonal=None, initialization_method='estimated')
fit_kurs = model_kurs.fit(optimized=True)

start_sim_date = pd.Timestamp('2026-01-01')
end_sim_date = pd.Timestamp('2120-12-01')
all_months = pd.date_range(start='2026-01-01', end='2120-12-01', freq='MS')

n_forecast_months = (2120 - df_kurs_m.index[-1].year) * 12 + (12 - df_kurs_m.index[-1].month)
pred_kurs_vals = fit_kurs.forecast(n_forecast_months)
pred_kurs_dates = pd.date_range(start=df_kurs_m.index[-1] + pd.DateOffset(months=1), periods=n_forecast_months, freq='ME')
s_kurs = pd.Series(pred_kurs_vals.values, index=pred_kurs_dates)

df_sim = pd.DataFrame({'Bulan': all_months})
df_sim['Tahun'] = df_sim['Bulan'].dt.year

def get_kurs(row):
    dt = row['Bulan']
    if dt in df_kurs_m.index:
        return df_kurs_m.loc[dt]
    me = dt + pd.offsets.MonthEnd(0)
    if me in s_kurs.index:
        return s_kurs.loc[me]
    elif me in df_kurs_m.index:
        return df_kurs_m.loc[me]
    else:
        return s_kurs.iloc[-1]

df_sim['Kurs'] = df_sim.apply(get_kurs, axis=1)

# --- 2. PREPROCESSING & MODEL EMAS (GBM) ---
df_emas = df_emas_raw.copy()
df_emas['date'] = pd.to_datetime(df_emas['date'])
df_emas = df_emas.set_index('date').sort_index()
df_emas_m = df_emas['harga_jual'].resample('ME').mean().dropna()

log_ret = np.log(df_emas_m / df_emas_m.shift(1)).dropna()
u = log_ret.mean()
var = log_ret.var()
stdev = log_ret.std()
drift = u - 0.5 * var

n_sim = 1000
months_to_forecast = (2120 - df_emas_m.index[-1].year) * 12 + (12 - df_emas_m.index[-1].month)
Z = np.random.standard_normal((months_to_forecast, n_sim))
periodic_returns = np.exp(drift + stdev * Z)

pred_path = np.zeros((months_to_forecast, n_sim))
last_p = df_emas_m.iloc[-1]
pred_path[0] = last_p * periodic_returns[0]
for t in range(1, months_to_forecast):
    pred_path[t] = pred_path[t-1] * periodic_returns[t]

mean_gold_pred = np.mean(pred_path, axis=1)
pred_emas_dates = pd.date_range(start=df_emas_m.index[-1] + pd.DateOffset(months=1), periods=months_to_forecast, freq='ME')
s_emas = pd.Series(mean_gold_pred, index=pred_emas_dates)

def get_emas(row):
    dt = row['Bulan']
    me = dt + pd.offsets.MonthEnd(0)
    if me in df_emas_m.index:
        return df_emas_m.loc[me]
    elif me in s_emas.index:
        return s_emas.loc[me]
    else:
        return s_emas.iloc[-1]

df_sim['Harga_Emas_IDR_gr'] = df_sim.apply(get_emas, axis=1)

# --- 3. MODEL BIAYA HAJI (LOGISTIC) ---
df_haji = df_haji_raw.copy()
df_haji['Total haji regular'] = pd.to_numeric(df_haji['Total haji regular'], errors='coerce')
df_haji['Total Biaya Haji Furoda'] = pd.to_numeric(df_haji['Total Biaya Haji Furoda'], errors='coerce')

df_reg_clean = df_haji.dropna(subset=['Total haji regular'])
t_reg = df_reg_clean['Tahun'].values - 2014
y_reg = df_reg_clean['Total haji regular'].values

df_fur_clean = df_haji.dropna(subset=['Total Biaya Haji Furoda'])
t_fur = df_fur_clean['Tahun'].values - 2014
y_fur = df_fur_clean['Total Biaya Haji Furoda'].values

def logistic_model(t, K, r, P0):
    return K / (1 + ((K - P0) / P0) * np.exp(-r * t))

p0_reg = [150_000_000, 0.05, 59_270_000]
bounds_reg = ([110_000_000, 0.01, 55_000_000], [250_000_000, 0.12, 65_000_000])
popt_reg, _ = curve_fit(logistic_model, t_reg, y_reg, p0=p0_reg, bounds=bounds_reg)

p0_fur = [35_000, 0.04, 12_000]
bounds_fur = ([22_000, 0.01, 8_000], [50_000, 0.12, 15_000])
popt_fur, _ = curve_fit(logistic_model, t_fur, y_fur, p0=p0_fur, bounds=bounds_fur)

df_sim['t_logistic'] = df_sim['Tahun'] - 2014
df_sim['Biaya_Reguler'] = df_sim['t_logistic'].apply(lambda t: logistic_model(t, *popt_reg))
df_sim['Biaya_Plus_USD'] = 8000.0
df_sim['Biaya_Plus_IDR'] = df_sim['Biaya_Plus_USD'] * df_sim['Kurs']
df_sim['Biaya_Furoda_USD'] = df_sim['t_logistic'].apply(lambda t: logistic_model(t, *popt_fur))
df_sim['Biaya_Furoda_IDR'] = df_sim['Biaya_Furoda_USD'] * df_sim['Kurs']

# Format to export
export_data = []
for idx, row in df_sim.iterrows():
    export_data.append({
        "Bulan": row['Bulan'].strftime('%Y-%m-%d'),
        "Tahun": int(row['Tahun']),
        "Kurs": float(row['Kurs']),
        "Harga_Emas_IDR_gr": float(row['Harga_Emas_IDR_gr']),
        "Biaya_Reguler": float(row['Biaya_Reguler']),
        "Biaya_Plus_USD": float(row['Biaya_Plus_USD']),
        "Biaya_Plus_IDR": float(row['Biaya_Plus_IDR']),
        "Biaya_Furoda_USD": float(row['Biaya_Furoda_USD']),
        "Biaya_Furoda_IDR": float(row['Biaya_Furoda_IDR'])
    })

# Save to web/data.json
out_dir = '../web'
if not os.path.exists(out_dir):
    os.makedirs(out_dir)

with open(os.path.join(out_dir, 'data.json'), 'w') as f:
    json.dump(export_data, f, indent=2)

print("Saved data.json successfully to web/data.json")
