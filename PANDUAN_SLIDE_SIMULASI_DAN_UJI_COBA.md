# 🕋 Panduan & Naskah Slide Presentasi: Bagian Simulasi & Uji Coba (Section 6 & 7)

**Program:** Pengabdian Kepada Masyarakat (PkM) 2026 — Universitas Pertamina x Salimah Kabupaten Bogor  
**Materi:** Simulasi Perencanaan Dana Haji Melalui Tabungan Konvensional dan Tabungan Emas  
**Pemateri Bagian Ini:** Muhammad Irfan Wira Kusuma  
**Tautan Web Simulator:** [https://irfanwk.github.io/Simulasi-Tabungan-Haji/](https://irfanwk.github.io/Simulasi-Tabungan-Haji/)  

---

## 📌 1. Alur Narasi & Transisi Presentasi

Bagian ini dibawakan setelah rekan tim menyelesaikan **Section 5 (Disclaimer & Pengantar Metode Permodelan)**:

```
[Pemateri Sebelumnya: Section 5 - Disclaimer & Teori Permodelan]
                                │
                                ▼
         ┌─────────────────────────────────────────────┐
         │         SECTION 6: SIMULASI (Irfan)         │
         │  "Bagaimana model ini bekerja di dunia nyata?" │
         └──────────────────────┬──────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
[SLIDE 1: Kasus 1 - Haji Plus]               [SLIDE 2: Kasus 2 - Haji Reguler]
• Skenario Modul Bab 4                       • Skenario Menengah Keluarga
• Rp1.500.000 / bulan                        • Rp1.000.000 / bulan
• Mengimbangi kurs USD & hemat antrean       • Mengunci DP & nomor porsi lebih awal
• Callout box: Batasan/Disclaimer            • Callout box: Batasan/Disclaimer
                                │
                                ▼
         ┌─────────────────────────────────────────────┐
         │        SECTION 7: UJI COBA PESERTA (Irfan)   │
         │    "Sekarang giliran Ibu-Ibu mencoba sendiri" │
         └──────────────────────┬──────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
[SLIDE 3: Akses Simulator & QR Code]         [SLIDE 4: Sesi Diskusi & Refleksi]
• QR Code ukuran besar + Tautan Web          • 3 Pertanyaan Pemantik Peserta
• 3 Langkah mudah cara pakai di smartphone   • Panduan membaca indikator & penutup
```

---

## 📑 2. Rincian Konten Slide per Slide (*Slide Blueprint & Script*)

---

### 🟢 SLIDE 1: Simulasi Kasus 1 — Haji Plus Rp1,5 Juta/Bulan
*Tujuan: Membuktikan bagaimana tabungan emas melindungi aset dari depresiasi kurs Dolar AS (USD) dan memajukan jadwal antrean keberangkatan.*

#### A. Panduan Tata Letak Visual (Layout)
* **Kiri (40%):** Parameter Input (Tabungan: Rp1.500.000/bln, Mulai: 2026, Jalur: Haji Plus) + Mockup/Tangkapan Layar **Kartu Hasil (Verdict Card)** hijau.
* **Kanan (60%):** Tabel Komparasi Milestone (Rupiah vs Emas) + Poin Keunggulan Utama.
* **Bawah:** Box khusus catatan batasan & disclaimer (*Callout Box*).

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Studi Kasus 1: Mengimbangi Kurs Dolar pada Haji Plus
Alokasi Tabungan: Rp 1.500.000 / Bulan (Mulai Menabung Tahun 2026)

[TABEL PERBANDINGAN CAPAIAN]
┌─────────────────────────┬──────────────────┬──────────────────┬──────────────────────┐
│ Tahapan Capaian         │ Tabungan Rupiah  │ Tabungan Emas    │ Efek Tabungan Emas   │
├─────────────────────────┼──────────────────┼──────────────────┼──────────────────────┤
│ Lunas DP (USD 4.000)    │ Tahun 2030       │ Tahun 2029       │ 1 Tahun Lebih Cepat! │
│ Lunas Total Biaya       │ Tahun 2034       │ Tahun 2031       │ 3 Tahun Lebih Cepat! │
│ Estimasi Berangkat      │ Tahun 2037       │ Tahun 2036       │ Hemat Antrean 1 Thn! │
│ Total Waktu Tunggu      │ 11 Tahun         │ 10 Tahun         │ Waktu Lebih Singkat  │
└─────────────────────────┴──────────────────┴──────────────────┴──────────────────────┘

[POIN KESIMPULAN UTAMA]
• Target DP USD 4.000 tercapai 1 tahun lebih awal (2029) berkat apresiasi harga emas.
• Mengamankan nomor porsi lebih cepat memajukan tahun keberangkatan ke 2036.
• Biaya pelunasan tuntas 3 tahun lebih awal dibanding tabungan uang biasa.

[BOX DISCLAIMER / BATASAN MASALAH]
⚠️ Catatan Edukatif: Simulasi ini merupakan model estimasi matematis (Holt-Winters & GBM) 
sebagai alat bantu perencanaan edukatif, bukan jaminan finansial. Perhitungan belum 
memperhitungkan selisih harga jual-beli (spread) emas, biaya titip/pajak transaksi, serta 
dinamika kebijakan resmi Kemenag RI dan Kerajaan Arab Saudi di masa depan.
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Assalamu'alaikum Ibu-ibu sekalian. Melanjutkan apa yang telah disampaikan terkait metode permodelan sebelumnya, sekarang mari kita lihat bagaimana angka-angka tersebut bekerja dalam simulasi nyata.*  
>  
> *Pada studi kasus pertama yang ada di modul pelatihan Ibu-ibu sekalian, misalkan sebuah keluarga menyisihkan Rp1,5 juta setiap bulan mulai tahun 2026 dan membidik jalur Haji Plus. Karena setoran awal (DP) Haji Plus menggunakan mata uang Dolar AS yaitu sebesar USD 4.000, tabungan uang rupiah biasa baru bisa melunasi DP di tahun 2030.*  
>  
> *Namun, jika dana tersebut dikonversi secara rutin ke tabungan emas, nilai aset kita tumbuh seiring kenaikan harga emas dan mengimbangi pelemahan kurs rupiah. Hasilnya, target DP USD 4.000 sudah tercapai di tahun 2029—setahun lebih cepat!*  
>  
> *Dampaknya langsung terasa pada jadwal antrean: karena porsi didaftarkan setahun lebih awal, estimasi terbang Ibu-ibu maju dari tahun 2037 menjadi tahun 2036. Total biaya haji pun sudah lunas di tahun 2031.*  
>  
> *Namun perlu kami tegaskan kembali seperti catatan di bawah: simulasi ini adalah gambaran ikhtiar terencana. Dalam praktiknya, harga emas tetap berfluktuasi harian dan ada selisih harga buyback saat mencairkan emas."*

---

### 🟢 SLIDE 2: Simulasi Kasus 2 — Haji Reguler Rp1 Juta/Bulan
*Tujuan: Membedah strategi menghadapi antrean panjang haji reguler (~26 tahun di Jawa Barat/Kab. Bogor) dengan alokasi tabungan menengah keluarga.*

#### A. Panduan Tata Letak Visual (Layout)
* **Kiri (40%):** Parameter Input (Tabungan: Rp1.000.000/bln, Mulai: 2026, Jalur: Haji Reguler) + Penekanan DP Rp25 Juta.
* **Kanan (60%):** Tabel Komparasi Milestone (Rupiah vs Emas) + Poin Strategis Porsi.
* **Bawah:** Box catatan batasan & disclaimer.

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Studi Kasus 2: Menembus Antrean Panjang pada Haji Reguler
Alokasi Tabungan: Rp 1.000.000 / Bulan (Mulai Menabung Tahun 2026)

[TABEL PERBANDINGAN CAPAIAN]
┌─────────────────────────┬──────────────────┬──────────────────┬──────────────────────┐
│ Tahapan Capaian         │ Tabungan Rupiah  │ Tabungan Emas    │ Efek Tabungan Emas   │
├─────────────────────────┼──────────────────┼──────────────────┼──────────────────────┤
│ Lunas DP (Rp 25 Juta)   │ Tahun 2028       │ Tahun 2027       │ 1 Tahun Lebih Cepat! │
│ Lunas Total Biaya       │ Tahun 2035       │ Tahun 2032       │ 3 Tahun Lebih Cepat! │
│ Estimasi Berangkat      │ Tahun 2054       │ Tahun 2053       │ Berangkat Lebih Awal │
│ Total Waktu Tunggu      │ 28 Tahun         │ 27 Tahun         │ Porsi Terkunci Cepat │
└─────────────────────────┴──────────────────┴──────────────────┴──────────────────────┘

[POIN KESIMPULAN UTAMA]
• Kunci utama Haji Reguler adalah KECEPATAN MENGUNCI NOMOR PORSI (DP Rp25 Juta).
• Tabungan emas mencapai target DP Rp25 juta di tahun 2027 (hanya butuh ~1 tahun menabung).
• Mengamankan porsi 1 tahun lebih awal langsung menyelamatkan antrean 26 tahun di Jawa Barat.
• Seluruh biaya haji lunas di tahun 2032, jauh sebelum tahun keberangkatan tiba.

[BOX DISCLAIMER / BATASAN MASALAH]
⚠️ Catatan Edukatif: Simulasi ini mengacu pada asumsi masa antrean reguler 26 tahun dan model 
pertumbuhan logistik biaya haji. Perubahan kuota nasional dan kebijakan subsidi nilai manfaat 
oleh BPKH di masa mendatang dapat memengaruhi waktu riil keberangkatan jemaah.
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Sekarang mari kita lihat skenario kedua: jalur yang paling banyak diminati oleh masyarakat luas, yaitu Haji Reguler, dengan kemampuan menabung Rp1 juta per bulan.*  
>  
> *Tantangan terbesar Haji Reguler bukanlah pelunasan akhirnya, melainkan antreannya yang sangat panjang. Di Kabupaten Bogor dan Jawa Barat pada umumnya, masa tunggu saat ini berkisar 26 tahun setelah setoran awal dibayarkan.*  
>  
> *Artinya apa Ibu-ibu? Kunci emas perencanaan haji reguler adalah: seberapa cepat kita bisa mengumpulkan uang muka Rp25 juta untuk mendaftarkan diri ke Kemenag dan mengunci nomor porsi!*  
>  
> *Dengan menabung emas, nilai Rp25 juta berhasil terkumpul di tahun 2027 (hanya setahun lebih sedikit menabung), sedangkan uang tunai biasa baru terkumpul di 2028. Selisih satu tahun ini sangat berharga, karena langsung memajukan tahun keberangkatan Ibu-ibu dari tahun 2054 menjadi 2053.*  
>  
> *Bahkan di tahun 2032, seluruh estimasi biaya haji reguler sudah lunas terlindungi oleh emas, sehingga sisa waktu antrean bisa Ibu gunakan dengan tenang untuk fokus menjaga kesehatan dan memperdalam ilmu manasik."*

---

### 🟢 SLIDE 3: Uji Coba Peserta — Akses Simulator & 3 Langkah Praktis
*Tujuan: Memandu seluruh peserta mengeluarkan smartphone, memindai QR Code, dan membuka website simulator.*

#### A. Panduan Tata Letak Visual (Layout)
* **Kiri (45%):** Gambar **QR Code ukuran besar** (mengarah ke `https://irfanwk.github.io/Simulasi-Tabungan-Haji/`) + Tautan website di bawahnya.
* **Kanan (55%):** 3 Kartu Langkah Praktis (Step 1, Step 2, Step 3) dengan ikon visual yang jelas.

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Mari Praktik Bersama: Uji Coba Simulator Tabungan Haji

[KIRI: KOTAK SCAN QR CODE]
┌──────────────────────────────────────┐
│                                      │
│      [ GAMBAR QR CODE BESAR ]        │
│                                      │
└──────────────────────────────────────┘
Atau ketik di browser HP Anda:
🔗 https://irfanwk.github.io/Simulasi-Tabungan-Haji/
(Dapat diakses langsung dari HP Android & iPhone)

[KANAN: 3 LANGKAH MUDAH MENGHITUNG]
1️⃣ Buka & Pindai QR Code
   Arahkan kamera HP ke layar proyektor untuk membuka aplikasi web simulator.
   
2️⃣ Masukkan Angka Tabungan Keluarga
   Ketik nominal yang mampu disisihkan per bulan (misal: Rp500.000 atau Rp1.000.000) 
   serta tahun mulai menabung.
   
3️⃣ Pilih Jalur Haji & Baca Hasilnya
   Klik tombol pilihan: Reguler, Plus, atau Furoda.
   Lihat langsung tahun berapa Ibu lunas DP dan tahun perkiraan berangkat!
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Teori sudah kita pelajari, contoh kasus juga sudah kita lihat. Sekarang adalah momen yang paling ditunggu-tunggu: mari kita hitung bersama untuk rencana keluarga Ibu-ibu sekalian!*  
>  
> *Silakan keluarkan smartphone masing-masing, buka aplikasi kamera atau pemindai QR, lalu arahkan ke kode QR yang ada di layar proyektor. Bagi yang kameranya tidak otomatis membaca QR, cukup buka Google Chrome atau Safari dan ketik alamat link di bawahnya.*  
>  
> *Website ini didesain khusus sangat ringan dan ramah ponsel. Caranya hanya 3 langkah: pertama scan QR-nya; kedua masukkan berapa kira-kira kemampuan tabungan bulanan dapur keluarga; dan ketiga klik jalur haji yang ingin dilihat. Mari kita coba bersama-sama!"*

---

### 🟢 SLIDE 4: Sesi Diskusi & Eksplorasi Mandiri
*Tujuan: Menghidupkan suasana ruangan, memandu peserta membaca 3 komponen hasil di layar HP, dan menutup sesi dengan pesan spiritual yang menyentuh.*

#### A. Panduan Tata Letak Visual (Layout)
* **Grid 2 Kolom:**
  * **Kolom Kiri:** 3 Pertanyaan Pemantik untuk interaksi audiens.
  * **Kolom Kanan:** Panduan ringkas membaca 3 elemen visual pada tampilan HP.
* **Bawah:** Kutipan pesan penutup niat dan ikhtiar.

#### B. Naskah Slide (Siap Salin ke PPT/Canva)
```text
[JUDUL SLIDE]
Bagaimana Hasil Rencana Haji Keluarga Anda?

[KOLOM KIRI: PERTANYAAN PEMANTIK INTERAKTIF]
🔍 Mari Kita Cek Bersama di Layar HP Ibu-Ibu:
1. "Berapa tahun waktu yang dibutuhkan untuk mengumpulkan DP Rp25 Juta?"
2. "Berapa tahun selisih waktu keberangkatan antara nabung uang vs emas di HP Ibu?"
3. "Apa yang terjadi jika tabungan bulanan dinaikkan sedikit saja?"

[KOLOM KANAN: CARA MEMBACA HASIL SIMULATOR]
✅ Kartu Hijau di Atas: 
   Membaca kesimpulan cepat apakah nabung emas mempercepat keberangkatan Anda.
✅ Tabel Baris Pertama (Lunas DP): 
   Target jangka pendek utama untuk mengamankan nomor porsi Kemenag!
✅ Grafik Interaktif: 
   Tekan tombol "Uang Rupiah" atau "Emas" untuk melihat perbandingan kurva pertumbuhan dana.

[KUTIPAN PESAN PENUTUP DI BAWAH]
"Haji adalah panggilan niat suci yang disempurnakan dengan ikhtiar nyata. 
Mulailah dari nominal yang kita sanggupi, jalani secara konsisten, dan iringi dengan doa."
```

#### C. *Talking Points* / Script Presenter (Irfan)
> *"Alhamdulillah, apakah semuanya sudah berhasil membuka simulatornya? Ada Ibu-ibu yang ingin berbagi pengalaman, berapa tahun estimasi keberangkatannya jika menabung sesuai budget saat ini?*  
>  
> *(Beri jeda sejenak untuk mendengar respons audiens)*  
>  
> *Perhatikan kartu hijau di layar HP Ibu-ibu: sistem langsung menyimpulkan apakah tabungan emas membuat Ibu berangkat lebih awal. Dan jangan lupa perhatikan baris 'Tahun Lunas DP'—itulah target ikhtiar terdekat kita: bagaimana mengunci nomor porsi secepat mungkin.*  
>  
> *Aplikasi ini kami buat dengan sepenuh hati agar niat suci Ibu-ibu ke Baitullah tidak hanya berhenti sebagai angan-angan, melainkan menjadi peta jalan yang terencana, rasional, dan penuh berkah. Mulailah menabung dari nominal berapapun yang disanggupi, konsisten, dan sertai dengan tawakal.*  
>  
> *Semoga Allah SWT memampukan dan mempermudah langkah kita semua menuju Tanah Suci. Terima kasih atas antusiasmenya yang luar biasa. Wassalamu'alaikum Warahmatullahi Wabarakatuh."*

---

## 🧮 3. Rujukan Validasi Angka Simulasi (Berdasarkan Data Model)

Sebagai pegangan pemateri jika ada pertanyaan kritis dari audiens:

| Jalur & Nominal | Setoran Awal (DP) | Tahun Lunas DP | Tahun Lunas Total | Estimasi Berangkat | Waktu Tunggu Total |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Plus: Rp 1,5 Juta (Rupiah)** | USD 4.000 (~Rp68jt - Rp75jt) | **2030** | **2034** | **2037** | 11 Tahun |
| **Plus: Rp 1,5 Juta (Emas)** | USD 4.000 (~Rp68jt - Rp75jt) | **2029** | **2031** | **2036** | **10 Tahun (Hemat 1 Thn)** |
| **Reguler: Rp 1,0 Juta (Rupiah)** | Rp 25.000.000 | **2028** | **2035** | **2054** | 28 Tahun |
| **Reguler: Rp 1,0 Juta (Emas)** | Rp 25.000.000 | **2027** | **2032** | **2053** | **27 Tahun (Hemat 1 Thn)** |

---

## 🎒 4. Checklist Persiapan Hari-H
* [ ] **Gambar QR Code:** Buat gambar QR Code resolusi tinggi dari link `https://irfanwk.github.io/Simulasi-Tabungan-Haji/` dan masukkan ke Slide 3.
* [ ] **Tethering Cadangan:** Siapkan hotspot cadangan dari ponsel pemateri untuk mengantisipasi ruangan pelatihan yang minim sinyal internet.
* [ ] **Pengujian Akses:** Pastikan halaman GitHub Pages dapat dibuka dengan lancar sebelum sesi dimulai.
