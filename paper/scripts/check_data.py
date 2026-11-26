"""
Script untuk memverifikasi data historis biaya haji, kurs USD/IDR, dan emas antam,
serta menguji kesesuaian model matematika terapan.
"""
import pandas as pd
import numpy as np

def check_data():
    df_haji = pd.read_excel('research/DataBiayaHaji.xlsx', sheet_name='Data')
    df_kurs = pd.read_excel('research/KursTransaksiUSD.xlsx')
    df_emas = pd.read_csv('research/antam_prices.csv')
    
    print("=== DATA BIAYA HAJI ===")
    print(df_haji[['Tahun', 'DP haji regular', 'nilai manfaat haji regular', 'Sisa biaya haji regular', 'Total haji regular', 'Total Biaya Haji Furoda']])
    
    print("\n=== DATA KURS ===")
    print(f"Periode: {df_kurs['Tanggal'].min()} s/d {df_kurs['Tanggal'].max()} | Total baris: {len(df_kurs)}")
    
    print("\n=== DATA EMAS ANTAM ===")
    print(f"Periode: {df_emas['date'].min()} s/d {df_emas['date'].max()} | Total baris: {len(df_emas)}")

if __name__ == '__main__':
    check_data()
