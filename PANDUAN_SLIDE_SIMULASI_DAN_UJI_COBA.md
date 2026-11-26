# 🕋 Panduan & Naskah Slide Presentasi: Bagian Simulasi & Uji Coba (Section 6 & 7)

**Program:** Pengabdian Kepada Masyarakat (PkM) 2026 — Universitas Pertamina x Salimah Kabupaten Bogor  
**Materi:** Simulasi Perencanaan Dana Haji Melalui Tabungan Konvensional dan Tabungan Emas  
**Pemateri Bagian Ini:** Muhammad Irfan Wira Kusuma  
**Pendekatan Pedagogis:** *"Fondasi Alur Haji $\rightarrow$ Hitungan Manual Reguler $\rightarrow$ Validasi Simulator Web"*  
**Tautan Web Simulator:** [https://irfanwk.github.io/Simulasi-Tabungan-Haji/](https://irfanwk.github.io/Simulasi-Tabungan-Haji/)  
**File Tampilan Visual HTML:** [`presentation_slides.html`](file:///home/miwk/Documents/Praktikum%20ML/Salimah/presentation_slides.html)  

---

## 🗺️ 1. Alur Narasi & Transisi Presentasi (*Presentation Flow*)

Alur presentasi dirancang terstruktur agar audiens ibu-ibu Salimah memahami terlebih dahulu alur birokrasi dan finansial ibadah haji, kemudian diajak menghitung secara manual sebelum membuktikannya di sistem simulator komputer:

```
[Pemateri Sebelumnya: Section 5 - Disclaimer & Teori Permodelan]
                                │
                                ▼
         ┌─────────────────────────────────────────────┐
         │         SECTION 6: SIMULASI (Irfan)         │
         │ "Bagaimana alur pendaftaran & hitungannya?"  │
         └──────────────────────┬──────────────────────┘
                                │
                                ▼
         [SLIDE 1: Alur Finansial & Pendaftaran Haji]
         • 4 Fase: DP Kemenag ➔ Masa Antrean ➔ Pelunasan ➔ Keberangkatan
         • Memahami urgensi pelunasan DP untuk mengunci nomor porsi
                                │
                                ▼
         [SLIDE 2: Logika Hitung Manual - Haji Reguler]
         • Alokasi terjangkau Rp1.000.000 / bulan linier
         • 25 bulan (2028) terkumpul DP Rp25 Juta untuk kunci nomor porsi
         • Keterbatasan hitungan di kepala (inflasi riil vs pertumbuhan emas)
                                │
                                ▼
         [SLIDE 3: Validasi Web - Kasus 1: Haji Reguler]
         • Pembuktian skenario pertama di website simulator
         • Emas capai DP Rp25 Juta di 2027 (1 tahun lebih cepat dari rupiah)
         • Selamatkan antrean 26 thn Jawa Barat: terbang 2053 (vs 2054)
         • Callout box: Batasan/Disclaimer
                                │
                                ▼
         [SLIDE 4: Validasi Web - Kasus 2: Haji Plus (Opsi Akselerasi)]
         • Opsi antrean singkat (~7 tahun) dengan DP USD 4.000
         • Lindung nilai kurs Dolar: DP 2029 (vs 2030), terbang 2036 (vs 2037)
         • Callout box: Batasan/Disclaimer
                                │
                                ▼
         ┌─────────────────────────────────────────────┐
         │        SECTION 7: UJI COBA PESERTA (Irfan)   │
         │    "Sekarang giliran Ibu-Ibu mencoba sendiri" │
         └──────────────────────┬──────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
[SLIDE 5: Akses Simulator & QR Code]         [SLIDE 6: Sesi Diskusi & Refleksi]
• QR Code ukuran besar + Tautan Web          • 3 Pertanyaan Pemantik Interaktif
• 3 Langkah mudah cara pakai di HP           • Panduan membaca indikator & penutup
```

---

## 📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)

---

### 🟢 SLIDE 1: Jalur Keberangkatan Haji & Alur Finansial
> **Tujuan Slide:** Membangun pemahaman komprehensif peserta mengenai 3 opsi jalur keberangkatan haji resmi di Indonesia (Reguler, Plus/Khusus, dan Furoda/Mujamalah), menyajikan komparasi tegas setoran awal (DP) & waktu tunggu resmi 26 tahun (sejak 2026), serta mengaitkannya dengan alur finansial pendaftaran.  
> **Gaya Visual (Mengacu pada Slide 4 `Presentation.pdf`):** Desain bersih, sederhana, dengan 3 blok kolom warna vertikal tegas (Biru Muda untuk Reguler, Indigo untuk Plus, Magenta untuk Furoda) disertai label vertikal dan poin teks putih kontras tinggi yang mudah dibaca di layar proyektor.

#### A. Panduan Tata Letak Visual (Layout)
* **Atas:** Header Resmi Bersih (Logo Salimah di kiri, Judul Slide *Jalur Keberangkatan Haji* di tengah-kanan, dan ornamen kurva hijau Universitas Pertamina di kanan atas).
* **Tengah (3 Kolom Blok Warna - Homage Slide 4 `Presentation.pdf`):**
  1. *Haji Reguler (Blok Biru `#0288d1`):*
     - Penyelenggara: Pemerintah (Kementerian Agama RI).
     - Setoran Awal (DP): **Rp 25.000.000** (Kunci Nomor Porsi Resmi).
     - Estimasi Masa Tunggu: **26 Tahun** *(Resmi berlaku sejak 2026 untuk seluruh Haji Reguler)*.
     - Skema Biaya: Relatif terjangkau (didukung subsidi nilai manfaat BPKH).
     - Karakteristik: Sangat cocok untuk perencanaan haji sejak dini.
  2. *Haji Khusus / Plus (Blok Indigo `#381ea5`):*
     - Penyelenggara: PIHK Resmi berizin Kemenag.
     - Setoran Awal (DP): **USD 4.000** (~Rp 70–80 Juta, dipatok dalam Dolar AS).
     - Estimasi Masa Tunggu: **5 – 9 Tahun** (Masa tunggu jauh lebih singkat).
     - Skema Biaya: Menengah – Tinggi (Fasilitas hotel & tenda VIP).
     - Karakteristik: Akselerasi waktu tunggu & proteksi nilai mata uang USD.
  3. *Haji Furoda (Blok Magenta `#931b6e`):*
     - Penyelenggara: Visa Mujamalah undangan resmi Arab Saudi.
     - Skema Biaya: Pelunasan di muka (Mulai USD 18.000+).
     - Estimasi Masa Tunggu: **0 Tahun** (Langsung terbang tanpa antrean).
     - Karakteristik: Berangkat pada musim haji berjalan tanpa antrean kuota.
     - Catatan: Mengikuti regulasi visa pemerintah Arab Saudi per tahun.
* **Bawah (Pita Alur Finansial Universal Sederhana):**
  `Alur Finansial: (1) Kunci DP Porsi (Rp 25 Jt) ➔ (2) Masa Antrean (26 Tahun) ➔ (3) Pelunasan Biaya (Bipih) ➔ (4) Terbang ke Baitullah`

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Jalur Keberangkatan Haji

[KOLOM 1: HAJI REGULER (BLOK BIRU)]
• Penyelenggara: Pemerintah (Kementerian Agama RI)
• Setoran Awal (DP): Rp 25.000.000 (Kunci nomor porsi resmi)
• Estimasi Masa Tunggu: 26 Tahun (Resmi berlaku sejak 2026)
• Skema Biaya: Relatif terjangkau (didukung subsidi nilai manfaat BPKH)
• Karakteristik: Sangat cocok untuk perencanaan haji sejak dini

[KOLOM 2: HAJI KHUSUS / PLUS (BLOK INDIGO)]
• Penyelenggara: PIHK Resmi berizin Kemenag
• Setoran Awal (DP): USD 4.000 (~Rp 70–80 Juta)
• Estimasi Masa Tunggu: 5 – 9 Tahun (Jauh lebih singkat)
• Skema Biaya: Menengah – Tinggi (Fasilitas hotel & tenda VIP)
• Karakteristik: Akselerasi waktu tunggu & lindung nilai kurs Dolar AS

[KOLOM 3: HAJI FURODA (BLOK MAGENTA)]
• Penyelenggara: Visa Mujamalah undangan Arab Saudi
• Skema Biaya: Pelunasan di awal (Mulai USD 18.000+)
• Estimasi Masa Tunggu: 0 Tahun (Langsung terbang tanpa antrean)
• Karakteristik: Berangkat pada musim haji berjalan tanpa antrean kuota
• Catatan: Mengikuti regulasi visa pemerintah Arab Saudi per tahun

[PITA ALUR FINANSIAL UNIVERSAL DI BAWAH]
Alur Finansial: 1. Kunci DP Porsi (Rp 25 Jt) ➔ 2. Masa Antrean (26 Tahun) ➔ 3. Pelunasan Biaya (Bipih) ➔ 4. Terbang ke Baitullah
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Assalamu'alaikum Warahmatullahi Wabarakatuh Ibu-ibu sekalian yang dirahmati Allah.*  
>  
> *Melanjutkan materi tentang permodelan matematika yang disampaikan rekan saya, sekarang kita masuk ke sesi praktik: bagaimana kita merencanakan dana haji secara nyata.*  
>  
> *Sebelum kita membuka kalkulator website simulator, sangat penting bagi kita untuk memahami peta jalurnya terlebih dahulu: di Indonesia ada 3 jalur resmi keberangkatan haji beserta karakteristik finansial dan waktu tunggunya:*  
>  
> *1. Jalur Pertama: Haji Reguler (Jalur Pemerintah).*  
> *Inilah jalur yang paling banyak dipilih oleh mayoritas masyarakat kita. Syarat utamanya adalah menyetor Setoran Awal atau DP sebesar Rp 25 Juta ke rekening BPS-BPIH Bank Syariah untuk mengunci Nomor Porsi resmi Kementerian Agama. Di Jawa Barat, termasuk Kabupaten Bogor, masa tunggu antreannya berkisar 20 sampai 30 tahun (rerata 26 tahun). Skema pelunasannya paling terjangkau, dan selama masa tunggu panjang inilah kita mencicil sisa pelunasan.*  
>  
> *2. Jalur Kedua: Haji Khusus atau sering kita sebut Haji Plus.*  
> *Jalur ini diselenggarakan oleh travel resmi berizin PIHK. Setoran awalnya dipatok dalam mata uang Dolar AS, yaitu USD 4.000 atau sekitar Rp 70–80 jutaan. Keunggulan utamanya: masa antreannya jauh lebih singkat, hanya sekitar 5 sampai 9 tahun saja.*  
>  
> *3. Jalur Ketiga: Haji Furoda atau Visa Mujamalah.*  
> *Jalur ini menggunakan visa undangan langsung dari Kerajaan Arab Saudi di luar kuota resmi pemerintah. Keunggulannya adalah 0 tahun antrean—alias langsung terbang di tahun yang sama. Namun konsekuensinya, biayanya bersifat premium (mulai dari USD 18.000 ke atas atau ratusan juta rupiah) dan umumnya harus dilunasi penuh di awal.*  
>  
> *Perhatikan pita alur di bagian bawah layar: Pada Haji Reguler dan Haji Plus, nomor porsi antrean kita baru mulai berjalan saat DP sudah disetor! Karena itulah, mengumpulkan DP secepat mungkin adalah kunci utama agar nomor porsi Ibu segera terkunci.*  
>  
> *Nah, pada slide berikutnya, mari kita hitung bersama secara manual bagaimana cara mengumpulkan DP Haji Reguler Rp 25 Juta tersebut!"*  
>  
> *Pertanyaannya sekarang: bagaimana strategi kita mengumpulkan DP Rp 25 Juta ini secepat mungkin? Mari kita bedah perhitungannya di slide kedua!"*

---

### 🟢 SLIDE 2: Langkah 1 — Hitung Manual Biaya Haji Reguler (Kasus Rp 800rb / Bln Mulai 2027)
> **Tujuan Slide:** Memberikan kepastian finansial kepada audiens ibu-ibu dengan membedah struktur riil Biaya Haji 2026 (BPIH vs Bipih vs Subsidi BPKH). Menunjukkan secara manual bahwa dengan menabung Rp 800.000/bulan mulai Januari 2027, seluruh kewajiban riil jemaah dapat tuntas dalam ~5,5 tahun (23 tahun sebelum jadwal terbang 2055), dimulai dari mengunci DP nomor porsi lalu melunasi sisanya.

#### A. Panduan Tata Letak Visual (Layout)
* **Kiri (48%):** Struktur Biaya Riil Haji Reguler (Tahun 2026)
  - Total Biaya Riil Haji (BPIH 2026): **Rp 87.409.365**
  - Subsidi Nilai Manfaat BPKH: **- Rp 33.215.559** *(Badge Hijau: Gratis / Bantuan Pemerintah)*
  - Yang Wajib Dibayar Jemaah (Bipih): **Rp 54.193.806** *(Teks Ungu Tebal)*
  - *Callout Box Tenang:* Subsidi BPKH Rp 33.215.559 **TIDAK PERLU dibayar** oleh jemaah! Target tabungan riil keluarga kita hanyalah sebesar Rp 54.193.806.
* **Kanan (52%):** Simulasi Menabung Rp 800.000 / Bulan (Mulai Jan 2027, 2 Tahap)
  - **Tahap 1: Mengunci DP Nomor Porsi (32 Bulan / ±2,5 Tahun):**  
    `32 Bulan × Rp 800.000 = Rp 25.600.000`  
    👉 Setor ke Bank Syariah & Kemenag, **Nomor Porsi Resmi Terkunci di 2029 (Agustus 2029)!**
  - **Tahap 2: Menabung Sisa Pelunasan (~36 Bulan / ±3 Tahun):**  
    `Sisa: Rp 54.193.806 – Rp 25.000.000 = Rp 29.193.806`  
    👉 Menabung Rp 800rb/bln selama 36 bulan $\rightarrow$ **Lunas di akhir 2032!**
  - **Kartu Ringkasan:** **Total Waktu Finansial Tuntas: Hanya ~5,5 Tahun!**  
    Sejak 2026 masa tunggu resmi haji reguler adalah **26 Tahun** (jadwal terbang 2055). Seluruh kewajiban biaya haji sudah **100% aman dan lunas sejak 2032 (23 tahun sebelum jadwal terbang 2055)!**
* **Bawah:** Jembatan Transisi ke Validasi Web Simulator:  
  *💡 Di hitungan manual butuh 32 bulan (Agustus 2029) untuk DP. Bisakah Tabungan Emas mempercepat DP dan pelunasan?*

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Hitung Manual Haji Reguler
Langkah 1: Perhitungan Nyata Studi Kasus Tahun 2026

[KOLOM KIRI: STRUKTUR BIAYA RIIL HAJI REGULER (2026)]
Ketetapan BPKH / Kemenag
• Total Biaya Riil Haji (BPIH 2026): Rp 87.409.365
• Subsidi Nilai Manfaat BPKH (Gratis): - Rp 33.215.559
👉 Wajib Dibayar Jemaah (Bipih): Rp 54.193.806

[BOX POIN TENANG IBU-IBU]
💡 Subsidi BPKH Rp 33.215.559 TIDAK PERLU dibayar oleh jemaah! 
Target tabungan riil keluarga kita hanya sebesar Rp 54.193.806.

[KOLOM KANAN: SIMULASI TABUNGAN: RP 800.000 / BULAN]
Mulai Jan 2027 (2 Tahap Pelunasan Sederhana)

1. TAHAP 1: MENGUNCI DP NOMOR PORSI (32 Bulan / ±2,5 Thn)
   • 32 Bulan × Rp 800.000 = Rp 25.600.000
   👉 Setor ke Bank Syariah & Kemenag, Nomor Porsi Resmi Terkunci di 2029 (Agustus 2029)!

2. TAHAP 2: MENABUNG SISA PELUNASAN (~36 Bulan / ±3 Thn)
   • Sisa: Rp 54.193.806 – Rp 25.000.000 = Rp 29.193.806
   👉 Menabung Rp 800rb/bln selama 36 bulan → Lunas di akhir 2032!

3. TOTAL WAKTU MENABUNG TUNTAS: HANYA ~5,5 TAHUN!
   • Sejak 2026 masa tunggu resmi haji reguler adalah 26 Tahun (terbang 2055). Seluruh kewajiban biaya haji sudah 100% aman dan lunas sejak 2032 (23 tahun sebelum jadwal terbang 2055)!

[JEMBATAN PEMBUKTIAN DI BAWAH]
💡 Tantangan: Di hitungan manual butuh 32 bulan (Agustus 2029) untuk DP. Bisakah Tabungan Emas mempercepat DP dan pelunasan?
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Ibu-ibu sekalian, ketika mendengar biaya haji sekarang mencapai puluhan hingga hampir seratus juta rupiah, seringkali kita merasa minder atau merasa haji itu sangat jauh di angan-angan.*  
>  
> *Mari kita lihat faktanya secara transparan berdasarkan ketetapan resmi Biaya Haji Reguler tahun 2026 di sebelah kiri layar Ibu-ibu:*  
> *Total Biaya Penyelenggaraan Ibadah Haji (BPIH) tahun 2026 memang sebesar **Rp 87.409.365** per jemaah. Angka ini mencakup seluruh tiket pesawat pulang-pergi, hotel di Makkah dan Madinah, makan, tenda Arafah-Mina, hingga asuransi.*  
>  
> *Tetapi perhatikan baris kedua yang kami beri warna hijau terang: **Subsidi Nilai Manfaat dari BPKH sebesar Rp 33.215.559**. Kabar gembiranya: **subsidi ini TIDAK PERLU dibayar oleh Ibu-ibu sama sekali!** Ini murni bantuan hasil kelolaan dana haji nasional oleh pemerintah.*  
>  
> *Sehingga, uang riil yang wajib disetor oleh kantong jemaah atau disebut **Bipih** sesungguhnya hanyalah **Rp 54.193.806**.*  
>  
> *Sekarang, mari kita hitung kasus nyata yang sangat membumi: bagaimana jika keluarga Ibu berkomitmen menyisihkan **Rp 800.000 per bulan** dan baru mulai menabung pada **Januari 2027**? Mari kita lihat simulasi 2 tahap di kolom kanan:*  
>  
> *• **Tahap Pertama: Mengunci Nomor Porsi (DP Rp 25 Juta).**  
> Dengan menyisihkan Rp 800 ribu setiap bulan, dalam **32 bulan** (sekitar 2 tahun 8 bulan, yaitu Agustus 2029), uang tabungan kita terkumpul Rp 25.600.000. Begitu genap, langsung kita setorkan ke Bank Syariah dan Kemenag. Alhamdulillah, **Nomor Porsi Resmi resmi terkunci di tahun 2029**!*  
>  
> *• **Tahap Kedua: Menabung Sisa Pelunasan.**  
> Sisa yang harus kita lunasi adalah Rp 54.193.806 dikurangi DP Rp 25.000.000 = **Rp 29.193.806**.  
> Dengan lanjut menabung Rp 800 ribu per bulan, butuh waktu $\approx$ **36 bulan** (3 tahun lagi).  
> Artinya, di **akhir tahun 2032, seluruh biaya haji Ibu sudah 100% LUNAS!**  
>  
> *Coba renungkan kesimpulannya Ibu-ibu: Total waktu menabung dari nol sampai lunas tuntas hanya butuh **5,5 tahun saja** (2027 sampai akhir 2032). Karena sejak tahun 2026 masa tunggu resmi haji reguler adalah 26 tahun, jemaah yang kunci porsi di 2029 diperkirakan baru akan berangkat di tahun **2055**. Ini berarti, **dana haji keluarga Ibu sudah 100% aman dan lunas 23 tahun sebelum tanggal keberangkatan tiba!** Tidak ada lagi rasa was-was mencari uang pelunasan di usia lanjut.*  
>  
> *Namun itu baru hitungan kasir manual. Butuh 32 bulan untuk DP. Pertanyaannya: bisakah Tabungan Emas mempercepat terkumpulnya DP dan menuntaskan pelunasan lebih awal?*  
>  
> *Mari kita uji dan buktikan bersama di Website Simulator kita pada slide ketiga!"*

---

### 🟢 SLIDE 3: Langkah 2 — Validasi Web Skenario 1 (Haji Reguler)
> **Tujuan Slide:** Menampilkan hasil validasi website simulator pada kasus nyata: alokasi tabungan Rp 800.000/bulan mulai tahun 2027 (skema reguler). Membuktikan estimasi keberangkatan tahun 2055 dengan total masa tunggu website 28 tahun (2 tahun kumpul DP + 26 tahun antrean resmi), serta membedah keunggulan tabungan emas yang melunasi total biaya 4 tahun lebih cepat (2034 vs 2038).

#### A. Panduan Tata Letak Visual (Layout)
* **Atas:** Header resmi *Simulasi Haji Reguler*, parameter input (Rp 800.000/bln, Mulai 2027, Skema Reguler, Masa Tunggu Resmi 26 Thn) dan badge hasil hijau *Berangkat: 2055 | Masa Tunggu: 28 Thn*.
* **Tengah:** Tabel perbandingan bersih model PowerPoint (Rupiah vs Emas):
  - DP Rp 25 Juta: Rupiah 2029 (bln ke-32) vs Emas 2029 (bln ke-28) $\rightarrow$ *Emas 4 bulan lebih cepat mengunci porsi!*
  - Pelunasan Total: Rupiah 2038 vs Emas 2034 $\rightarrow$ *Emas 4 tahun lebih cepat tuntas!*
  - Estimasi Berangkat: Sama-sama 2055 ($2029 + 26$).
  - Masa Tunggu di Web: Sama-sama 28 Tahun ($2055 - 2027$).
* **Bawah:** 2 Kotak Callout Bersih (Ringkasan Jawaban Kasus Simulasi di kiri, Insight Finansial untuk Ibu-ibu di kanan).

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Simulasi Haji Reguler
Kasus Simulasi Web: Tabungan Rp 800.000 / Bulan (Mulai 2027)
Mulai Menabung: Tahun 2027 | Skema: Reguler | Masa Tunggu Resmi Sejak 2026: 26 Tahun
Badge: Berangkat: 2055 | Masa Tunggu: 28 Thn

[TABEL HASIL VALIDASI SIMULATOR]
┌─────────────────────────┬──────────────────┬──────────────────┬──────────────────────┐
│ Tahapan Capaian         │ Tabungan Rupiah  │ Tabungan Emas    │ Dampak Terhadap Jemaah │
├─────────────────────────┼──────────────────┼──────────────────┼──────────────────────┤
│ Setoran Awal (DP 25 Jt) │ Tahun 2029 (Ags) │ Tahun 2029 (Apr) │ Emas 4 Bulan Cepat!  │
│ Pelunasan Total Biaya   │ Tahun 2038       │ Tahun 2034       │ Emas 4 Tahun Cepat!  │
│ Estimasi Berangkat      │ Tahun 2055       │ Tahun 2055       │ Sama-sama Berangkat  │
│ Masa Tunggu di Web      │ 28 Tahun         │ 28 Tahun         │ 2055 – 2027 = 28 Thn │
└─────────────────────────┴──────────────────┴──────────────────┴──────────────────────┘

[KOTAK KIRI: JAWABAN KASUS SIMULASI]
✨ Estimasi Berangkat: Tahun 2055 (DP lunas 2029 + 26 tahun antrean resmi)
• Total Masa Tunggu: 28 Tahun (2 tahun kumpul DP 2027–2029 + 26 tahun antrean)
• Keunggulan Emas: DP tercapai 4 bulan lebih cepat (Apr vs Ags 2029) dan biaya lunas di tahun 2034 (4 tahun lebih awal dari Rupiah 2038).

[KOTAK KANAN: INSIGHT FINANSIAL IBU-IBU]
💡 Meskipun tahun keberangkatannya sama (2055), emas mengunci nomor porsi Kemenag 4 bulan lebih awal (mengamankan urutan antrean) dan membebaskan keluarga dari cicilan 4 tahun lebih cepat sehingga dana aman 21 tahun sebelum berangkat!
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Ibu-ibu sekalian, sekarang mari kita uji coba kasus spesifik yang sangat realistis di rumah tangga kita:*  
> *'Bagaimana jika seorang Ibu menabung sebesar Rp 800.000 per bulan dan baru mulai menabung pada tahun 2027 di skema Haji Reguler?'*  
>  
> *Mari kita lihat hasil langsung dari Website Simulator di layar:*  
>  
> *1. **Kapan Estimasi Keberangkatannya?**  
> Jawabannya adalah **Tahun 2055**!  
> Mengapa tahun 2055? Karena dengan menyisihkan Rp 800 ribu per bulan, Setoran Awal (DP) Rp 25 Juta untuk mengunci nomor porsi baru akan terkumpul pada **Tahun 2029** (sekitar 28–32 bulan menabung). Nah, karena sejak tahun 2026 masa tunggu resmi haji reguler ditetapkan menjadi 26 tahun, maka $2029 + 26\text{ tahun} = \mathbf{2055}$.*  
>  
> *2. **Berapa Masa Tunggunya?**  
> Pada sistem website simulator kita, angka yang muncul adalah **Masa Tunggu: 28 Tahun**.  
> Dari mana hitungan 28 tahun ini? Yaitu dari tahun berangkat (2055) dikurangi tahun awal Ibu mulai menabung (2027). Rinciannya: 2 tahun masa perjuangan mengumpulkan DP ($2027 \rightarrow 2029$), ditambah 26 tahun masa antrean resmi sejak nomor porsi terkunci ($2029 \rightarrow 2055$).*  
>  
> *3. **Lalu Apa Keuntungan Menabung Emas di Kasus Ini?**  
> Perhatikan kolom Tabungan Emas:  
> Pertama, DP Rp 25 Juta tercapai di bulan **April 2029** (4 bulan lebih cepat daripada Rupiah di bulan Agustus 2029). Ini sangat penting karena nomor porsi Kemenag bergerak setiap hari!  
> Kedua dan yang paling luar biasa: seluruh biaya haji Ibu sudah **Lunas Total di Tahun 2034** (hanya 7 tahun menabung), sedangkan jika menabung rupiah tunai baru lunas di **Tahun 2038** (11 tahun menabung).  
> Ini artinya, dengan tabungan emas, seluruh biaya haji keluarga Ibu sudah **100% aman dan beres 21 tahun sebelum Ibu terbang di tahun 2055**!"*

---

### 🟢 SLIDE 4: Langkah 2 — Validasi Web Skenario 2 (Haji Plus / Khusus)
> **Tujuan Slide:** Menghadirkan skenario Haji Plus (Rp 1.500.000/bln) sebagai opsi akselerasi bagi keluarga yang menginginkan antrean singkat (~7 tahun), sekaligus memperlihatkan fungsi emas sebagai pelindung nilai terhadap kurs Dolar AS (USD 4.000).

#### A. Panduan Tata Letak Visual (Layout)
* **Kiri (45%):** Parameter Input (Rp 1.500.000/bln, Jan 2026, Haji Plus) + Verdict Card Proteksi Dolar + 3 Poin Capaian Kunci.
* **Kanan (55%):** Tabel Hasil Validasi Simulator (Komparasi Rupiah vs Emas) + Callout Box Disclaimer.

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Section 6: Simulasi Dana Haji
Langkah 2: Validasi Web — Skenario 2 (Haji Plus)
Alokasi Anggaran: Rp 1.500.000 / Bulan (Mulai Jan 2026)

[KARTU HASIL SIMULATOR]
✨ Proteksi Nilai Kurs Dolar — Antrean Singkat ~7 Tahun
DP Haji Plus dipatok dalam Dolar (USD 4.000). Tabungan emas memberikan perlindungan langsung 
terhadap pelemahan kurs, sehingga DP tercapai di tahun 2029 (1 tahun lebih cepat)!

• DP Lunas 2029: Emas capai USD 4.000 di tahun ke-4 (vs 2030 uang tunai).
• Porsi Didapat 2029: Jadwal terbang maju dari 2037 ke 2036!
• Lunas 2031: Biaya total tuntas 3 tahun lebih awal dari tabungan tunai (2034).

[TABEL HASIL VALIDASI SIMULATOR]
┌─────────────────────────┬──────────────────┬──────────────────┬──────────────────────┐
│ Tahapan Capaian         │ Tabungan Rupiah  │ Tabungan Emas    │ Dampak Positif       │
├─────────────────────────┼──────────────────┼──────────────────┼──────────────────────┤
│ Lunas DP (USD 4.000)    │ Tahun 2030       │ Tahun 2029       │ 1 Tahun Lebih Cepat! │
│ Lunas Total Biaya       │ Tahun 2034       │ Tahun 2031       │ 3 Tahun Lebih Cepat! │
│ Estimasi Berangkat      │ Tahun 2037       │ Tahun 2036       │ Hemat Antrean 1 Thn! │
│ Total Waktu Tunggu      │ 11 Tahun         │ 10 Tahun         │ Waktu Lebih Singkat  │
└─────────────────────────┴──────────────────┴──────────────────┴──────────────────────┘

[BOX DISCLAIMER / BATASAN MASALAH]
⚠️ Catatan Edukatif / Disclaimer: Hasil simulator merupakan estimasi model matematis (Holt-Winters & GBM) 
untuk perencanaan edukatif, bukan jaminan finansial. Belum memperhitungkan selisih jual-beli (spread), 
biaya titip emas, serta dinamika regulasi kuota Kementerian Agama dan Kerajaan Arab Saudi.
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Lalu bagaimana jika keluarga kita memiliki kelapangan rezeki dan ingin masa tunggu yang tidak sampai puluhan tahun?*  
>  
> *Mari kita lihat skenario kedua: Haji Plus atau Haji Khusus dengan menabung Rp 1,5 juta per bulan.*  
>  
> *Keunggulan Haji Plus adalah masa tunggunya yang sangat singkat, yaitu sekitar 7 tahun saja. Namun tantangannya: setoran awal (DP) dipatok dalam mata uang Dolar AS, yaitu sebesar USD 4.000 atau sekitar Rp 70-80 jutaan.*  
>  
> *Di sinilah tabungan emas menunjukkan keunggulan terbesarnya: emas adalah pelindung alami dari fluktuasi kurs Dolar. Ketika kurs Dolar naik, harga emas dalam rupiah pun ikut naik! Hasilnya: pada tabungan emas, DP USD 4.000 terkunci di tahun 2029 (tahun ke-4), sedangkan uang rupiah baru mencapainya di tahun 2030.*  
>  
> *Karena nomor porsi Haji Plus terkunci di 2029, estimasi terbang Ibu maju dari tahun 2037 menjadi tahun 2036. Bahkan pelunasan totalnya tuntas di tahun 2031, 3 tahun lebih cepat dibanding tabungan uang biasa.*  
>  
> *Dua studi kasus ini membuktikan bahwa baik untuk Haji Reguler maupun Haji Plus, tabungan emas memberikan akselerasi waktu tunggu yang sangat nyata!"*

---

### 🟢 SLIDE 5: Workshop Uji Coba Peserta (Section 7)
> **Tujuan Slide:** Memberikan kesempatan kepada seluruh peserta untuk mempraktikkan langsung simulator secara mandiri melalui smartphone masing-masing dengan pendampingan tim mahasiswa PkM.

#### A. Panduan Tata Letak Visual (Layout)
* **Kiri (45%):** QR Code Besar Resolusi Tinggi + Tautan Langsung Web Simulator.
* **Kanan (55%):** 3 Langkah Praktis (1. Pindai QR, 2. Masukkan Alokasi & Tahun, 3. Pilih Jalur & Lihat Rekomendasi).

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Section 7: Uji Coba Simulasi
Giliran Ibu-Ibu Mencoba Simulator Sendiri

[KOLOM KIRI: AKSES SIMULATOR]
📱 Pindai Lewat Kamera Smartphone
[GAMBAR QR CODE BESAR]
Atau Buka Tautan Berikut:
https://irfanwk.github.io/Simulasi-Tabungan-Haji/

[KOLOM KANAN: 3 LANGKAH MUDAH]
1. Pindai QR Code:
   Arahkan kamera smartphone ke kode QR di samping untuk membuka halaman kalkulator di browser Anda.
2. Masukkan Anggaran Tabungan Keluarga:
   Ketik alokasi menabung bulanan (misal: Rp500.000, Rp1.000.000, atau Rp2.000.000) dan tahun awal menabung.
3. Pilih Jalur & Lihat Hasilnya!
   Klik tombol Haji Reguler atau Haji Plus. Perhatikan kartu hijau rekomendasi dan tabel tahun capaian.
* Pendampingan langsung oleh Tim Mahasiswa PkM di meja masing-masing.
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Ibu-ibu sekalian, tadi kita sudah melihat dua contoh kasus. Sekarang, giliran Ibu-Ibu sekalian yang mencoba sendiri di smartphone masing-masing!*  
>  
> *Silakan keluarkan HP Ibu, buka aplikasi kamera biasa, lalu arahkan ke QR Code besar yang ada di layar proyektor. Begitu dipindai, akan muncul tautan website kalkulator haji kita.*  
>  
> *Di setiap meja Ibu sudah ada adik-adik mahasiswa tim PkM kami yang siap mendampingi. Coba masukkan angka tabungan yang paling sesuai dengan kemampuan belanja rumah tangga masing-masing: ada yang Rp 500 ribu, Rp 1 juta, atau Rp 2 juta per bulan.*  
>  
> *Lalu klik tombol 'Haji Reguler' atau 'Haji Plus' dan perhatikan kapan DP Ibu terkumpul dan kapan estimasi keberangkatan Ibu. Silakan dicoba, kita sediakan waktu 5–10 menit untuk praktik langsung!"*

---

### 🟢 SLIDE 6: Sesi Diskusi Interaktif & Refleksi Bersama
> **Tujuan Slide:** Menutup presentasi dengan dialog interaktif berpandukan 3 pertanyaan pemantik, memberikan panduan cara membaca fitur website, dan menyampaikan pesan refleksi ibadah yang menyejukkan hati.

#### A. Panduan Tata Letak Visual (Layout)
* **Kiri (50%):** 3 Kartu Pertanyaan Pemantik Diskusi (Efek Waktu, Realisme Anggaran, Perlindungan Nilai).
* **Kanan (50%):** Panduan Membaca 3 Fitur Web (Kartu Rekomendasi Hijau, Baris DP, Grafik Pertumbuhan) + Kotak Refleksi Spiritual.

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Section 7: Uji Coba Simulasi
Sesi Diskusi Interaktif & Refleksi Bersama

[KOLOM KIRI: PERTANYAAN PEMANTIK DISKUSI]
• Pertanyaan 1 — Efek Waktu:
  "Dengan alokasi tabungan Ibu masing-masing, berapa tahun selisih waktu keberangkatan antara uang tunai vs emas?"
• Pertanyaan 2 — Realisme Anggaran:
  "Apakah nominal tabungan bulanan yang dimasukkan sudah cocok dan realistis dengan rencana keuangan keluarga?"
• Pertanyaan 3 — Perlindungan Nilai:
  "Bagaimana perasaan Ibu saat melihat tabungan emas mampu menahan laju inflasi dan kenaikan kurs Dolar?"

[KOLOM KANAN: PANDUAN MEMBACA FITUR SIMULATOR & REFLEKSI]
1. Kartu Hasil Hijau (Verdict Card):
   Memberi kesimpulan langsung instrumen mana yang paling efisien untuk target Ibu.
2. Baris DP (Uang Muka):
   Fokus utama tahun pertama adalah mengamankan nomor porsi resmi di Kemenag RI.
3. Grafik Pertumbuhan:
   Ibu bisa melihat visual kurva emas yang melesat melampaui kurva uang tunai.

[KOTAK REFLEKSI IBADAH]
🕊️ Refleksi Ibadah:
"Perencanaan finansial adalah bentuk ikhtiar terbaik kita. Menabung emas adalah ikhtiar menjaga 
amanah rezeki agar niat suci Ibu-ibu sekalian untuk menjadi Dhuyufurrahman di Tanah Suci dimudahkan oleh Allah SWT."
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Alhamdulillah, luar biasa sekali antusiasme Ibu-ibu saat mencoba simulator di HP masing-masing.*  
>  
> *Sebelum kita akhiri sesi simulasi ini, mari kita diskusikan bersama apa yang Ibu-ibu temukan:*  
> *1. Adakah yang ingin berbagi, berapa tahun penghematan waktu tunggu yang Ibu dapatkan saat mencoba tabungan emas di HP-nya?*  
> *2. Apakah nominal tabungan yang Ibu masukkan tadi sudah pas dan realistis untuk disisihkan dari belanja bulanan?*  
>  
> *Ibu-ibu sekalian, simulator yang kita coba hari ini hanyalah sebuah alat bantu ikhtiar. Ibadah haji adalah panggilan keimanan. Menabung emas bukanlah semata-mata mengejar keuntungan finansial, melainkan bentuk kehati-hatian kita dalam menjaga nilai rezeki yang Allah titipkan agar niat suci kita menginjakkan kaki di Baitullah segera diijabah oleh Allah SWT.*  
>  
> *Semoga Allah memberikan kelapangan rezeki, kesehatan, dan kemudahan bagi seluruh Ibu-ibu Salimah Kabupaten Bogor untuk menjadi Dhuyufurrahman, tamu Allah di Tanah Suci. Aamiin Ya Rabbal 'Alamin.*  
>  
> *Terima kasih atas segala perhatiannya. Billahi taufiq wal hidayah, Wassalamu'alaikum Warahmatullahi Wabarakatuh."*

---

## 🛠️ 3. Petunjuk Penggunaan Berkas Tampilan HTML

Untuk melihat dan menguji presentasi secara langsung:
1. Buka file [`presentation_slides.html`](file:///home/miwk/Documents/Praktikum%20ML/Salimah/presentation_slides.html) di browser Google Chrome, Edge, atau Firefox.
2. Gunakan tombol panah kanan (`→`) atau spasi untuk maju, dan panah kiri (`←`) untuk mundur.
3. Tekan huruf **`N`** di keyboard untuk membuka naskah presenter lengkap Muhammad Irfan Wira Kusuma saat berlatih membawakan materi.
4. Tekan huruf **`F`** untuk masuk ke mode layar penuh (*fullscreen*).
