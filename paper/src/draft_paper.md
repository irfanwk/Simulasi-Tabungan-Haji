# Pemodelan Matematika dan Simulasi Stokastik Dinamika Tabungan Haji: Komparasi Akumulasi Emas Fisik dan Uang Tunai terhadap Inflasi Biaya Jangka Panjang

**Target Publikasi:** Jurnal Nasional Bereputasi Terakreditasi SINTA 2 / SINTA 3 (Bidang Matematika Terapan / Sains & Rekayasa)  
**Status:** Draf Pertama Siap Tinjau (Phase 5 - Drafting Complete)

---

## ABSTRAK
Masa tunggu antrean ibadah haji reguler di Indonesia yang mencapai 25 hingga 30 tahun menimbulkan risiko keuangan substansial berupa penurunan daya beli tabungan calon jemaah akibat inflasi biaya operasional dan depresiasi nilai tukar rupiah. Penelitian ini menyajikan formulasi matematika terapan dan simulasi stokastik untuk mengevaluasi efektivitas akumulasi tabungan berbasis emas fisik dibandingkan uang tunai konvensional (Rupiah). Pemodelan dilakukan melalui tiga pilar matematika: (1) peramalan kurs transaksi valuta asing USD/IDR menggunakan Pemulusan Eksponensial Ganda (*Holt's Linear Trend*), (2) permodelan dinamika harga emas Antam berbasis Persamaan Diferensial Stokastik Gerak Brown Geometrik (*Geometric Brownian Motion*, GBM) dengan simulasi Monte Carlo 1.000 lintasan, dan (3) evaluasi pertumbuhan Biaya Penyelenggaraan Ibadah Haji (BPIH) serta Biaya Perjalanan Ibadah Haji (Bipih) menggunakan model eksponensial dan logistik. Kriteria *stopping time* dirumuskan untuk mengukur durasi pencapaian setoran awal nomor porsi ($\tau_{\text{DP}}$), waktu pelunasan ($\tau_{\text{lunas}}$), dan estimasi keberangkatan riil ($\tau_{\text{berangkat}}$). Hasil empiris menunjukkan bahwa laju pertumbuhan tahunan harga emas ($\mu = 11{,}30\%$, $\sigma = 9{,}51\%$) secara signifikan mengimbangi laju inflasi Bipih ($g = 4{,}14\%$). Pada alokasi tabungan Rp1.000.000 per bulan, instrumen emas mempercepat waktu pelunasan hingga 14 bulan lebih awal (4,8 tahun vs. 5,9 tahun) dibandingkan uang tunai, serta memberikan lindung nilai (*hedging*) optimal selama masa tunggu 25 tahun antrean keberangkatan.

**Kata Kunci:** Matematika Terapan, Pemodelan Stokastik, Gerak Brown Geometrik, Biaya Haji, Tabungan Emas, Waktu Henti (*Stopping Time*).

---

## 1. PENDAHULUAN
Ibadah haji merupakan rukun Islam kelima yang pelaksanaannya diwajibkan bagi individu yang memenuhi kualifikasi kemampuan (*istitha'ah*), baik secara fisik maupun finansial. Di Indonesia, antrean pendaftar haji reguler telah menembus lebih dari 5 juta jiwa dengan kuota keberangkatan tahunan berkisar 221.000 jemaah. Ketimpangan kapasitas kuota nasional ini menyebabkan masa tunggu antrean riil mencapai rentang 25 hingga 30 tahun.

Tingginya masa tunggu menimbulkan fenomena depresiasi daya beli (*purchasing power erosion*). Komponen operasional utama haji—meliputi biaya penerbangan carter antarbenua, akomodasi hotel di Makkah dan Madinah, konsumsi, dan layanan Masyair—sangat bergantung pada denominasi valuta asing Dolar AS (USD) dan Riyal Saudi (SAR). Seiring melemahnya kurs Rupiah dan inflasi global, Biaya Penyelenggaraan Ibadah Haji (BPIH) mengalami kenaikan jangka panjang yang signifikan. Calon jemaah yang menabung dalam bentuk uang tunai konvensional (fiat IDR) menghadapi risiko gagal bayar saat pelunasan akibat laju inflasi yang menggerus nilai riil tabungannya.

Dalam kacamata matematika keuangan dan teori probabilitas, emas fisik batangan memiliki sifat lindung nilai (*hedging*) dengan tren pertumbuhan jangka panjang yang melampaui inflasi fiat. Meskipun demikian, literatur ilmiah mengenai perencanaan haji di Indonesia sebelumnya mayoritas didominasi oleh kajian normatif fiqih, analisis manajemen pelayanan publik, atau simulasi keuangan deterministik sederhana. Masih terdapat keterbatasan studi yang memformulasikan dinamika tabungan haji dalam kerangka Persamaan Diferensial Stokastik (*Stochastic Differential Equations*), pengujian *goodness-of-fit* model non-linear biaya haji, dan perumusan kriteria *stopping time* pada sistem waktu diskrit.

Penelitian ini memfokuskan kajian pada kacamata **matematika terapan**:
1. Menentukan model pertumbuhan matematika terbaik untuk memproyeksikan BPIH total dan Bipih riil (porsi bayar jemaah).
2. Memformulasikan dinamika harga emas Antam secara stokastik melalui Gerak Brown Geometrik (GBM) dan simulasi Monte Carlo 1.000 lintasan.
3. Merumuskan sistem waktu diskrit akumulasi modal serta kriteria analitis *stopping time* untuk mengukur selisih waktu pelunasan antara emas dan uang tunai.

---

## 2. METODOLOGI DAN FORMULASI MATEMATIKA

### 2.1. Karakteristik Data
Data kuantitatif yang dihimpun meliputi:
1. Data historis BPIH dan Bipih periode 2014–2026 yang bersumber dari Keputusan Presiden (Keppres) dan data resmi Kementerian Agama RI.
2. Data historis kurs jual transaksi USD/IDR harian periode 2002–2025 dari Bank Indonesia, yang dirata-ratakan secara bulanan.
3. Data historis harga jual dan harga beli kembali (*buyback*) emas batangan PT Antam Tbk periode 2010–2026.

### 2.2. Model Kurs USD/IDR: Holt's Linear Trend
Kurs transaksi USD/IDR menunjukkan kecenderungan tren depresiasi jangka panjang tanpa pola musiman tahunan berulang. Formulasi pemulusan Holt terdiri dari persamaan rekursif level ($L_t$) dan tren ($T_t$):
$$L_t = \alpha Y_t + (1 - \alpha)(L_{t-1} + T_{t-1})$$
$$T_t = \beta (L_t - L_{t-1}) + (1 - \beta)T_{t-1}$$
Peramalan untuk $h$ periode ke depan dihitung sebagai:
$$\hat{Y}_{t+h} = L_t + h T_t$$

### 2.3. Model Harga Emas: Gerak Brown Geometrik (GBM)
Harga emas fisik $S_t$ dimodelkan mengikuti persamaan diferensial stokastik:
$$dS_t = \mu S_t dt + \sigma S_t dW_t$$
di mana $\mu$ adalah laju hanyutan (*drift*), $\sigma$ adalah koefisien volatilitas, dan $W_t$ merupakan proses Wiener standar. Melalui Lema Itô, bentuk diskrit untuk simulasi Monte Carlo dinyatakan sebagai:
$$S_{t+\Delta t} = S_t \exp\left( \left(\mu - \frac{1}{2}\sigma^2\right)\Delta t + \sigma \sqrt{\Delta t} Z_t \right), \quad Z_t \sim \mathcal{N}(0, 1)$$

### 2.4. Model Pertumbuhan Biaya Haji (Eksponensial vs. Logistik)
- **Model Eksponensial (CAGR):** Asumsi pertumbuhan tanpa batas jenuh:
  $$P(t) = P_0 e^{g t}$$
- **Model Logistik:** Asumsi kapasitas jenuh fiskal (*carrying capacity* $K$):
  $$P(t) = \frac{K}{1 + \left( \frac{K - P_0}{P_0} \right) e^{-rt}}$$

### 2.5. Formulasi Akumulasi dan Stopping Time
Untuk setoran bulanan konstan $M$:
- **Akumulasi Uang Tunai:**
  $$A_{\text{cash}}(t) = M \cdot t$$
- **Akumulasi Emas Fisik (dengan potongan buyback $\gamma \approx 0{,}90$):**
  $$A_{\text{gold}}(t) = \gamma \cdot S_t^{\text{buy}} \cdot \sum_{k=1}^t \frac{M}{S_k^{\text{buy}}}$$
- **Stopping Time (Waktu Henti):**
  $$\tau_{\text{DP}} = \min \{ t \mid A(t) \ge C_{\text{DP}} \}, \quad C_{\text{DP}} = \text{Rp}25.000.000$$
  $$\tau_{\text{lunas}} = \min \{ t \mid A(t) \ge C_{\text{pelunasan}}(t) \}$$
  $$\tau_{\text{berangkat}} = \max\left( \tau_{\text{lunas}}, \, \tau_{\text{DP}} + T_{\text{antrean}} \right), \quad T_{\text{antrean}} = 300 \text{ bulan}$$

---

## 3. HASIL DAN PEMBAHASAN

### 3.1. Uji Goodness-of-Fit Model Biaya Haji
Perbandingan metrik evaluasi model disajikan pada tabel berikut:

| Variabel | Model | $R^2$ | RMSE (Rp) | MAPE (%) | AIC |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **BPIH (Total)** | Eksponensial | 0,7856 | 6.368.695 | 6,10% | 411,34 |
| **BPIH (Total)** | **Logistik** | **0,8442** | **5.429.940** | **6,08%** | **409,19** |
| **Bipih (Jemaah)** | **Eksponensial** | **0,7028** | **4.419.398** | **9,21%** | **401,84** |
| **Bipih (Jemaah)** | Logistik | 0,6897 | 4.515.208 | 9,49% | 404,40 |

**Interpretasi:**
1. Untuk BPIH total, Model Logistik memiliki kecocokan tertinggi dengan estimasi plafon jenuh $K \approx$ Rp103,5 juta.
2. Namun, untuk Bipih (beban tunai jemaah), Model Eksponensial terbukti lebih unggul ($R^2 = 0{,}7028$, AIC terkecil 401,84) dengan laju pertumbuhan majemuk tahunan $g = 4{,}14\%$. Ini mencerminkan kebijakan BPKH dan Kementerian Agama yang secara progresif meningkatkan porsi pembayaran langsung jemaah menuju 60%–70% untuk menjaga kesinambungan dana kelolaan haji.

### 3.2. Parameter Stokastik Emas dan Kurs
- Kurs USD/IDR: $\alpha = 1{,}0000$, $\beta = 0{,}0000$ (mengikuti tren apresiasi linier jangka panjang).
- Harga Emas Antam:
  - $\mu_{\text{tahunan}} = 11{,}30\%$ (laju hanyutan tahunan).
  - $\sigma_{\text{tahunan}} = 9{,}51\%$ (volatilitas tahunan).
- **Rasio Dominasi Pertumbuhan:** Karena $\mu_{\text{emas}} = 11{,}30\% > g_{\text{Bipih}} = 4{,}14\%$, return aset emas secara konsisten melampaui laju inflasi biaya haji sebesar marjin positif $\Delta = +7{,}16\%$ per tahun.

### 3.3. Simulasi Stopping Time Antrean 25 Tahun
Hasil simulasi stokastik Monte Carlo (1.000 lintasan) pada berbagai nominal setoran bulanan:

| Nominal (Rp/bln) | $\tau_{\text{DP}}$ Kas | $\tau_{\text{DP}}$ Emas | $\tau_{\text{lunas}}$ Kas | $\tau_{\text{lunas}}$ Emas (Median) | 95% CI Pelunasan Emas | Total Waktu Berangkat |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1.000.000** | 25 bln (2,1 thn) | 25 bln (2,1 thn) | 71 bln (5,9 thn) | **57 bln (4,8 thn)** | [4,0, 5,8] thn | 27,1 thn |
| **1.500.000** | 17 bln (1,4 thn) | 18 bln (1,5 thn) | 43 bln (3,6 thn) | **39 bln (3,2 thn)** | [2,8, 3,8] thn | 26,4 thn |
| **2.000.000** | 13 bln (1,1 thn) | 14 bln (1,2 thn) | 31 bln (2,6 thn) | **30 bln (2,5 thn)** | [2,2, 2,9] thn | 26,1 thn |
| **3.000.000** | 9 bln (0,8 thn) | 9 bln (0,8 thn) | 20 bln (1,7 thn) | **20 bln (1,7 thn)** | [1,5, 1,9] thn | 25,8 thn |

**Analisis Kunci:**
1. **Fase DP:** Selisih antara kas dan emas sangat tipis ($\le 1$ bulan) karena adanya potongan *buyback* emas ($\sim 10\%$) pada tahun pertama.
2. **Fase Pelunasan:** Pada nominal Rp1.000.000/bulan, emas menghemat waktu pelunasan hingga 14 bulan (4,8 tahun vs. 5,9 tahun).
3. **Masa Tunggu 25 Tahun:** Setelah pelunasan tercapai pada tahun ke-3 hingga ke-5, jemaah masih harus menunggu sekitar 20 tahun lagi hingga jadwal keberangkatan tiba. Jika tabungan dipertahankan dalam emas, nilai aset terus bertumbuh secara eksponensial dan melindungi jemaah dari potensi penyesuaian biaya tambahan saat menjelang hari keberangkatan.

---

## 4. KESIMPULAN
Penelitian ini membuktikan secara kuantitatif melalui pemodelan matematika terapan bahwa instrumen emas fisik merupakan strategi proteksi modal yang superior dibandingkan uang tunai konvensional dalam perencanaan dana haji jangka panjang di Indonesia. Laju pertumbuhan harga emas ($\mu = 11{,}30\%$/tahun) secara signifikan mengimbangi laju inflasi Bipih ($g = 4{,}14\%$/tahun). Simulasi waktu henti (*stopping time*) menunjukkan bahwa emas mempercepat pencapaian pelunasan hingga 14 bulan lebih awal pada tabungan Rp1.000.000/bulan serta bertindak sebagai instrumen lindung nilai optimal dalam menghadapi ketidakpastian antrean keberangkatan selama 25 tahun.

---

## DAFTAR PUSTAKA
1. Kementerian Agama RI, "Keputusan Presiden Republik Indonesia tentang Biaya Penyelenggaraan Ibadah Haji," *Lembaran Negara Republik Indonesia*, 2024.
2. J. C. Hull, *Options, Futures, and Other Derivatives*, 5th ed. Upper Saddle River, NJ: Prentice Hall, 2003.
3. C. C. Holt, "Forecasting seasonals and trends by exponentially weighted moving averages," *International Journal of Forecasting*, vol. 20, no. 1, pp. 5–10, 2004.
4. Badan Pengelola Keuangan Haji (BPKH), "Laporan Pengelolaan Keuangan Haji dan Distribusi Nilai Manfaat," BPKH RI, Jakarta, 2023.
