# Graph Report - Salimah  (2026-11-26)

## Corpus Check
- 15 files · ~78,424 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: .csv 3, .ipynb 2, (none) 1)

## Summary
- 135 nodes · 164 edges · 10 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c11567f4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- pandas
- 📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)
- 🕋 Salimah: Simulator Perencanaan Tabungan Haji (Emas vs Rupiah)
- Pemodelan Matematika dan Simulasi Stokastik Dinamika Tabungan Haji: Komparasi Akumulasi Emas Fisik dan Uang Tunai terhadap Inflasi Biaya Jangka Panjang
- calculator.js
- 🔬 Arsitektur & Landasan Model Matematika
- Catatan Riset & Kerangka Paper Jurnal (SINTA 2 / SINTA 3)
- chart-config.js
- package.json
- 🟢 SLIDE 2: Langkah 1 — Hitung Manual Biaya Haji Reguler (Kasus Rp 800rb / Bln Mulai 2027)

## God Nodes (most connected - your core abstractions)
1. `🕋 Salimah: Simulator Perencanaan Tabungan Haji (Emas vs Rupiah)` - 10 edges
2. `runSimulation()` - 8 edges
3. `run_all()` - 8 edges
4. `run()` - 7 edges
5. `📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)` - 7 edges
6. `Pemodelan Matematika dan Simulasi Stokastik Dinamika Tabungan Haji: Komparasi Akumulasi Emas Fisik dan Uang Tunai terhadap Inflasi Biaya Jangka Panjang` - 7 edges
7. `2. METODOLOGI DAN FORMULASI MATEMATIKA` - 6 edges
8. `Catatan Riset & Kerangka Paper Jurnal (SINTA 2 / SINTA 3)` - 5 edges
9. `formatIDR()` - 4 edges
10. `updateInput()` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "pandas"
Cohesion: 0.11
Nodes (6): check_data(), run(), run_all(), logistic_model(), load_data(), main()

### Community 1 - "📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)"
Cohesion: 0.08
Nodes (24): 🗺️ 1. Alur Narasi & Transisi Presentasi (*Presentation Flow*), 📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*), 🛠️ 3. Petunjuk Penggunaan Berkas Tampilan HTML, A. Panduan Tata Letak Visual (Layout), A. Panduan Tata Letak Visual (Layout), A. Panduan Tata Letak Visual (Layout), A. Panduan Tata Letak Visual (Layout), A. Panduan Tata Letak Visual (Layout) (+16 more)

### Community 2 - "🕋 Salimah: Simulator Perencanaan Tabungan Haji (Emas vs Rupiah)"
Cohesion: 0.12
Nodes (16): 1. Kloning Repositori, 2. Menjalankan Server Lokal, 3. Menjalankan Notebook Riset Model, 🔄 Alur Workflow Estimasi Keberangkatan Haji, 📋 Daftar Isi, Diagram Alir Sistem (Simulation Pipeline), ✨ Fitur Unggulan & Pengalaman Pengguna (UX), Formulasi Akumulasi & Penentuan 3 Milestone Kunci (+8 more)

### Community 3 - "Pemodelan Matematika dan Simulasi Stokastik Dinamika Tabungan Haji: Komparasi Akumulasi Emas Fisik dan Uang Tunai terhadap Inflasi Biaya Jangka Panjang"
Cohesion: 0.12
Nodes (15): 1. PENDAHULUAN, 2.1. Karakteristik Data, 2.2. Model Kurs USD/IDR: Holt's Linear Trend, 2.3. Model Harga Emas: Gerak Brown Geometrik (GBM), 2.4. Model Pertumbuhan Biaya Haji (Eksponensial vs. Logistik), 2.5. Formulasi Akumulasi dan Stopping Time, 2. METODOLOGI DAN FORMULASI MATEMATIKA, 3.1. Uji Goodness-of-Fit Model Biaya Haji (+7 more)

### Community 4 - "calculator.js"
Cohesion: 0.32
Nodes (12): formatIDR(), handleDirectInput(), inputs, loadData(), renderMilestoneGrid(), renderVerdict(), runSimulation(), setChartMode() (+4 more)

### Community 5 - "🔬 Arsitektur & Landasan Model Matematika"
Cohesion: 0.18
Nodes (11): A. Model Proyeksi Kurs Valuta Asing: Holt-Winters Exponential Smoothing, Alasan Pemilihan Model:, Alasan Pemilihan Model:, Alasan Pemilihan Model:, 🔬 Arsitektur & Landasan Model Matematika, B. Model Stokastik Harga Emas: Geometric Brownian Motion (GBM), Batasan Kalibrasi Parameter (Parameter Bounds):, C. Model Proyeksi Biaya Haji: Logistic Growth Model (+3 more)

### Community 6 - "Catatan Riset & Kerangka Paper Jurnal (SINTA 2 / SINTA 3)"
Cohesion: 0.25
Nodes (7): 1. Identitas & Fokus Paper, 2. Validasi & Klarifikasi Data Biaya Haji, 3. Evaluasi & Pemilihan Model Matematika Terapan, 4. Rencana Kerja Paper, A. Distingsi BPIH vs. Bipih (Kritis), B. Evaluasi Data Historis (2014–2026), Catatan Riset & Kerangka Paper Jurnal (SINTA 2 / SINTA 3)

### Community 7 - "chart-config.js"
Cohesion: 0.50
Nodes (4): colors, formatShortNumber(), milestonePlugin, updateChart()

### Community 8 - "package.json"
Cohesion: 0.67
Nodes (3): dependencies, jsdom@^30.0.1, jsdom

### Community 9 - "🟢 SLIDE 2: Langkah 1 — Hitung Manual Biaya Haji Reguler (Kasus Rp 800rb / Bln Mulai 2027)"
Cohesion: 0.50
Nodes (4): A. Panduan Tata Letak Visual (Layout), B. Naskah Slide (Siap Salin ke PPT/Canva), C. *Talking Points* / Script Presenter (Irfan), 🟢 SLIDE 2: Langkah 1 — Hitung Manual Biaya Haji Reguler (Kasus Rp 800rb / Bln Mulai 2027)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)` connect `📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)` to `🟢 SLIDE 2: Langkah 1 — Hitung Manual Biaya Haji Reguler (Kasus Rp 800rb / Bln Mulai 2027)`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `run_all()` (e.g. with `exp_func()` and `log_func()`) actually correct?**
  _`run_all()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `pandas` be split into smaller, more focused modules?**
  _Cohesion score 0.10685483870967742 - nodes in this community are weakly interconnected._
- **Why does `🕋 Salimah: Simulator Perencanaan Tabungan Haji (Emas vs Rupiah)` connect `🕋 Salimah: Simulator Perencanaan Tabungan Haji (Emas vs Rupiah)` to `🔬 Arsitektur & Landasan Model Matematika`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `run()` (e.g. with `exponential()` and `linear()`) actually correct?**
  _`run()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Why does `🔬 Arsitektur & Landasan Model Matematika` connect `🔬 Arsitektur & Landasan Model Matematika` to `🕋 Salimah: Simulator Perencanaan Tabungan Haji (Emas vs Rupiah)`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._