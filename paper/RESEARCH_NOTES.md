# Catatan Riset & Kerangka Paper Jurnal (SINTA 2 / SINTA 3)

## 1. Identitas & Fokus Paper
- **Judul Kerja (Tentatif):** Pemodelan Matematika dan Simulasi Stokastik Tabungan Haji: Analisis Komparatif Akumulasi Emas vs. Rupiah terhadap Inflasi Biaya Ibadah Haji
- **Sudut Pandang:** Matematika Terapan & Aktuaria Finansial (Bukan Machine Learning).
- **Target Venue:** Jurnal Nasional Bereputasi Terakreditasi SINTA 2 / SINTA 3 (misal: *JTAM (Jurnal Teori dan Aplikasi Matematika)*, *Barekeng: Jurnal Ilmu Matematika dan Terapan*, atau *Jurnal Sains dan Teknologi*).

---

## 2. Validasi & Klarifikasi Data Biaya Haji

### A. Distingsi BPIH vs. Bipih (Kritis)
1. **BPIH (Biaya Penyelenggaraan Ibadah Haji):** Total biaya riil per jemaah untuk seluruh operasional haji (penerbangan, hotel, katering, masyair, dll.).
2. **Bipih (Biaya Perjalanan Ibadah Haji):** Porsi biaya yang **wajib dibayar langsung oleh jemaah** (setoran awal/DP Rp 25.000.000 + setoran pelunasan).
3. **Nilai Manfaat (BPKH):** Subsidi hasil kelolaan dana haji oleh BPKH yang menutup selisih antara BPIH dan Bipih (~30% - 45%).
4. **Keputusan Pemodelan:**
   - Calon jemaah menabung untuk memenuhi **Bipih** (uang riil yang disetor).
   - Namun, rasio subsidi BPKH bergantung pada kondisi keuangan negara. Jika nilai manfaat ditekan (seperti kebijakan Kemenag 2023–2025 yang menargetkan porsi Bipih naik ke ~60-70%), beban jemaah mendekati BPIH.
   - **Solusi dalam paper:** Modelkan BPIH dan rasio Bipih secara eksplisit, atau lakukan proyeksi pada Bipih riil yang harus dilunasi jemaah.

### B. Evaluasi Data Historis (2014–2026)
- 2020–2021: Periode pandemi COVID-19 (anomali kuota dan biaya simulatif).
- 2022: Biaya melonjak (protokol kesehatan Masyair pasca-pandemi).
- 2023–2026: Kebijakan rasionalisasi BPIH vs Bipih (skema 55:45 atau 60:40).

---

## 3. Evaluasi & Pemilihan Model Matematika Terapan

| Komponen | Model Terpilih | Dasar Teori Matematika | Catatan & Justifikasi Ilmiah |
| :--- | :--- | :--- | :--- |
| **Kurs USD/IDR** | Pemulusan Eksponensial Ganda (Holt's Linear / Additive Holt-Winters) | Persamaan rekursif level ($L_t$) dan tren ($T_t$):<br>$L_t = \alpha Y_t + (1-\alpha)(L_{t-1} + T_{t-1})$<br>$T_t = \beta (L_t - L_{t-1}) + (1-\beta) T_{t-1}$ | Menangkap tren depresiasi jangka panjang rupiah terhadap USD tanpa musiman tahunan yang kaku. |
| **Harga Emas** | Gerak Brown Geometrik (Geometric Brownian Motion / GBM) | Persamaan Diferensial Stokastik (SDE):<br>$dS_t = \mu S_t dt + \sigma S_t dW_t$<br>Solusi analitik via Lema Itô:<br>$S_t = S_0 \exp\left((\mu - \frac{1}{2}\sigma^2)t + \sigma W_t\right)$ | Emas adalah aset finansial volatil. GBM merefleksikan drift positif ($\mu$) dan volatilitas acak ($\sigma$) dengan interval kepercayaan Monte Carlo. |
| **Biaya Haji** | Model Pertumbuhan Logistik vs. Model Eksponensial/ARIMA | Persamaan diferensial logistik:<br>$\frac{dP}{dt} = r P \left(1 - \frac{P}{K}\right)$<br>Solusi: $P(t) = \frac{K}{1 + \left(\frac{K - P_0}{P_0}\right)e^{-rt}}$ | Asumsi kapasitas jenuh ($K$) merefleksikan batas atas daya bayar masyarakat dan efisiensi regulasi biaya haji pemerintah. Perlu dikomparasikan dengan model eksponensial (CAGR) untuk uji kecocokan (*goodness of fit*). |
| **Sistem Tabungan** | Sistem Waktu Diskrit & *Stopping Time* | $A_{cash}(t) = \sum_{k=1}^t M_k$<br>$A_{gold}(t) = \left( \sum_{k=1}^t \frac{M_k}{S_k^{buy}} \right) \cdot S_t^{sell}$ | Menentukan waktu tiba (*first passage time*) untuk 3 milestone: Setoran Awal, Pelunasan, dan Keberangkatan. |

---

## 4. Rencana Kerja Paper
1. **Verifikasi Data Kemenag & BPKH**: Cek ulang angka Keppres BPIH/Bipih 2014–2026.
2. **Uji Kecocokan Model Matematika**: Hitung MAPE, RMSE, $R^2$, dan AIC untuk model Biaya Haji (Logistik vs Eksponensial vs Polinomial) dan Kurs (Holt vs ARIMA).
3. **Simulasi Stokastik Monte Carlo**: Ekstrak distribusi probabilitas waktu pelunasan tabungan emas vs rupiah.
4. **Penyusunan Draft Paper**: Template IMRaD (Introduction, Methods, Results & Discussion, Conclusion).
