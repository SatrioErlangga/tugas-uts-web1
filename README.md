# Tugas UTS Pemrograman Web 1 — Aplikasi Pemesanan Buku Online (Lentera Pustaka)

| Keterangan | Data Mahasiswa |
| :--- | :--- |
| **Nama** | *Satrio Erlangga* |
| **NIM** | *312510006* |
| **Kelas** | *I253C* |
| **Mata Kuliah** | Pemrograman Web  |
| **Dosen Pengampu** | Agung Nugroho, S.Kom., M.Kom. |

---

## Deskripsi Tugas

Pada Tugas Ujian Tengah Semester (UTS) ini, dibuat aplikasi web *front-end* sederhana untuk **Pemesanan Buku & Bahan Ajar pada Toko Online ("Lentera Pustaka")**. Seluruh data bersumber dari variabel JavaScript berupa file terpisah (`js/data.js`) dalam format Array/Object JSON sesuai dengan indikator penilaian:
1. Merancang struktur **HTML5 yang semantik dan valid** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
2. Mengelola gaya antarmuka menggunakan **CSS (Inline, Internal, dan External)**.
3. Menggunakan **JavaScript DOM** untuk manipulasi tabel dinamis, validasi form, *pop-up alert*, dan *modal box* interaktif.

---

## Struktur Folder Project

```text
tugas-uts-web1/
|-- index.html                 # Halaman Login (autentikasi, modal Lupa Password & Daftar)
|-- dashboard.html             # Dashboard Menu, Greeting waktu lokal, Laporan & History
|-- stok.html                  # Informasi Stok/Katalog dinamis & tambah baris stok via DOM
|-- checkout.html              # Halaman Pemesanan (tambah/ubah item, data pemesan & bayar)
|-- tracking.html              # Informasi Pengiriman (cari Nomor DO, progress bar & riwayat)
|-- css/
|   `-- style.css              # External CSS utama
|-- js/
|   |-- data.js                # Sumber data Array/Object JSON (dataPengguna, dataKatalogBuku, dataTracking)
|   `-- script.js              # Logika manipulasi DOM, validasi form, modal box & localStorage
|-- assets/
|   `-- logo.png               # Logo identitas Lentera Pustaka
|-- img/                       # Gambar sampul buku ajar
`-- screenshot/                # Dokumentasi tangkapan layar (screenshot) untuk README.md
```

---

## Langkah-Langkah Pengerjaan & Pembahasan Kode

### 1. Menyiapkan Sumber Data Array JSON (`js/data.js`)

Langkah pertama adalah menyiapkan file `js/data.js` yang menyimpan data pengguna (`dataPengguna`), variabel konstanta katalog buku (`const dataKatalogBuku`), data pelacakan pengiriman (`dataTracking`), serta data awal riwayat transaksi.

**Kode `js/data.js`:**
```javascript
/**
 * File: js/data.js
 * Deskripsi: Sumber data statis (Array JSON & Object JSON) untuk aplikasi pemesanan buku
 * Tugas UTS Pemrograman Web 1
 */

var dataPengguna = [
    {
        id: 1,
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        password: "rina123",
        role: "User"
    },
    {
        id: 2,
        nama: "Agus Pranoto",
        email: "agus@gmail.com",
        password: "agus123",
        role: "User"
    },
    {
        id: 3,
        nama: "Siti Marlina",
        email: "siti@gmail.com",
        password: "siti123",
        role: "Admin"
    }
];

const dataKatalogBuku = [
    {
        kodeBarang: "ASIP4301",
        namaBarang: "Pengantar Ilmu Komunikasi",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 548,
        harga: "Rp 180.000",
        cover: "img/pengantar_komunikasi.jpg"
    },
    {
        kodeBarang: "EKMA4002",
        namaBarang: "Manajemen Keuangan",
        jenisBarang: "Buku Ajar",
        edisi: "3",
        stok: 392,
        harga: "Rp 220.000",
        cover: "img/manajemen_keuangan.jpg"
    },
    {
        kodeBarang: "EKMA4310",
        namaBarang: "Kepemimpinan",
        jenisBarang: "Buku Ajar",
        edisi: "1",
        stok: 278,
        harga: "Rp 150.000",
        cover: "img/kepemimpinan.jpg"
    },
    {
        kodeBarang: "BIOL4211",
        namaBarang: "Mikrobiologi Dasar",
        jenisBarang: "Buku Ajar",
        edisi: "2",
        stok: 165,
        harga: "Rp 200.000",
        cover: "img/mikrobiologi.jpg"
    },
    {
        kodeBarang: "PAUD4401",
        namaBarang: "Perkembangan Anak Usia Dini",
        jenisBarang: "Buku Ajar",
        edisi: "4",
        stok: 204,
        harga: "Rp 250.000",
        cover: "img/paud_perkembangan.jpeg"
    }
];

var dataTracking = {
    "20230012": {
        nomorDO: "20230012",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "0JKT01",
        total: "Rp 180.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:45:10",
                keterangan: "Diteruskan ke Kantor Jakarta Selatan"
            }
        ]
    },
    "20230013": {
        nomorDO: "20230013",
        nama: "Agus Pranoto",
        status: "Dikirim",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-25",
        paket: "0UPBJJBDG",
        total: "Rp 220.000",
        perjalanan: [
            {
                waktu: "2025-08-25 10:12:20",
                keterangan: "Penerimaan di Loket: TANGERANG SELATAN. Pengirim: Universitas Terbuka"
            },
            {
                waktu: "2025-08-25 14:07:56",
                keterangan: "Tiba di Hub: TANGERANG SELATAN"
            },
            {
                waktu: "2025-08-25 16:30:10",
                keterangan: "Diteruskan ke Kantor Kota Bandung"
            },
            {
                waktu: "2025-08-26 12:15:33",
                keterangan: "Tiba di Hub: Kota BANDUNG"
            },
            {
                waktu: "2025-08-26 15:06:12",
                keterangan: "Proses antar ke Cimahi"
            },
            {
                waktu: "2025-08-26 20:00:00",
                keterangan: "Selesai Antar. Penerima: Agus Pranoto"
            }
        ]
    }
};

// Data tambahan untuk mendukung simulasi Laporan Pemesanan & History Transaksi di Dashboard
var dataRiwayatTransaksiAwal = [
    {
        idTransaksi: "TRX-20250801",
        nomorDO: "20230012",
        tanggal: "2025-08-25",
        namaPemesan: "Rina Wulandari",
        emailPemesan: "rina@gmail.com",
        itemRingkasan: "Pengantar Ilmu Komunikasi (1 eks)",
        metodeBayar: "Transfer Virtual Account",
        ekspedisi: "JNE (0JKT01)",
        totalBayar: "Rp 180.000",
        statusBayar: "Lunas",
        statusKirim: "Dalam Perjalanan"
    },
    {
        idTransaksi: "TRX-20250802",
        nomorDO: "20230013",
        tanggal: "2025-08-25",
        namaPemesan: "Agus Pranoto",
        emailPemesan: "agus@gmail.com",
        itemRingkasan: "Manajemen Keuangan (1 eks)",
        metodeBayar: "QRIS",
        ekspedisi: "Pos Indonesia (0UPBJJBDG)",
        totalBayar: "Rp 220.000",
        statusBayar: "Lunas",
        statusKirim: "Dikirim"
    }
];

```

---

### 2. Membuat Halaman Login (`index.html`)

Halaman login dirancang menggunakan elemen semantik `<header>`, `<main>`, `<section>`, `<aside>`, `<article>`, dan `<footer>`. Halaman ini dilengkapi dengan:
- Input **Email** dan **Password** beserta tombol **Login**.
- Validasi login yang memunculkan *alert* dan *pop-up modal* dengan pesan `"email/password yang anda masukkan salah"` apabila kredensial tidak cocok dengan `dataPengguna`.
- Tombol **Lupa Password** dan **Daftar Akun Baru** yang ditampilkan dalam bentuk **Modal Box / Pop-Up**.

#### Tampilan Halaman Login (`index.html`):
<img width="951" height="434" alt="image" src="https://github.com/user-attachments/assets/ce0bb189-a5e1-4dd2-80cd-f3261eedfef2" />


#### Tampilan Pop-Up Alert Saat Email / Password Salah:
<img width="948" height="438" alt="image" src="https://github.com/user-attachments/assets/8765d1b0-4ca4-4c2e-ad84-cc5b6e38f9c5" />


#### Tampilan Modal Box Pendaftaran & Lupa Password:
<img width="947" height="437" alt="image" src="https://github.com/user-attachments/assets/2109ee69-5d4e-4d15-9ae3-276dc2140c96" />


**Kode `index.html`:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Pengguna — Lentera Pustaka | Toko Buku & Bahan Ajar Online</title>
    <!-- 1. External CSS -->
    <link rel="stylesheet" href="css/style.css">
    <!-- 2. Internal CSS (Memenuhi Indikator 2: Kombinasi External, Internal, dan Inline CSS) -->
    <style>
        .login-highlight-tag {
            display: inline-block;
            background-color: rgba(254, 243, 199, 0.18);
            color: #fef3c7;
            border: 1px solid rgba(254, 243, 199, 0.45);
            padding: 0.28rem 0.75rem;
            border-radius: 999px;
            font-size: 0.78rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .password-toggle-wrapper {
            position: relative;
        }
    </style>
</head>
<body>
    <!-- Header Semantik -->
    <header class="site-header">
        <div class="header-container">
            <a href="index.html" class="brand-identity">
                <img src="assets/logo.png" alt="Logo Lentera Pustaka" class="brand-logo">
                <div>
                    <span class="brand-title">Lentera Pustaka</span>
                    <span class="brand-subtitle">Portal Pemesanan Bahan Ajar &amp; Katalog Buku Akademik</span>
                </div>
            </a>
            <nav class="main-nav" aria-label="Navigasi Cepat">
                <ul>
                    <li><a href="index.html" class="active">Halaman Login</a></li>
                    <li><a href="dashboard.html">Preview Dashboard</a></li>
                    <li><a href="stok.html">Katalog Buku</a></li>
                    <li><a href="tracking.html">Cek Resi DO</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <!-- Konten Utama Semantik -->
    <main class="login-wrapper">
        <section class="login-grid" aria-labelledby="judulHalamanLogin">
            <!-- Panel Samping Informasi & Akun Demo (<aside>) -->
            <aside class="login-aside">
                <div>
                    <span class="login-highlight-tag">Tugas UTS Pemrograman Web 1</span>
                    <h2>Selamat Datang di Portal Distribusi Buku Ajar</h2>
                    <p>
                        Akses katalog buku perkuliahan, kelola stok secara dinamis, lakukan pemesanan bahan ajar, dan pantau posisi pengiriman Delivery Order (DO) secara langsung.
                    </p>
                </div>

                <!-- Kotak Kredensial dari data.js untuk mempermudah pengujian -->
                <div class="demo-credentials-box">
                    <h3>Akun Terdaftar pada <code>data.js</code> (Klik untuk Isi Otomatis):</h3>
                    <ul class="demo-cred-list">
                        <li class="demo-cred-item">
                            <span><strong>Rina Wulandari</strong> (rina@gmail.com / rina123)</span>
                            <button type="button" class="btn-fill-demo" onclick="isiKredensialDemo('rina@gmail.com', 'rina123')">Gunakan</button>
                        </li>
                        <li class="demo-cred-item">
                            <span><strong>Agus Pranoto</strong> (agus@gmail.com / agus123)</span>
                            <button type="button" class="btn-fill-demo" onclick="isiKredensialDemo('agus@gmail.com', 'agus123')">Gunakan</button>
                        </li>
                        <li class="demo-cred-item">
                            <span><strong>Siti Marlina</strong> (siti@gmail.com / siti123)</span>
                            <button type="button" class="btn-fill-demo" onclick="isiKredensialDemo('siti@gmail.com', 'siti123')">Gunakan</button>
                        </li>
                    </ul>
                </div>
            </aside>

            <!-- Panel Formulir Login (<article>) -->
            <article class="login-form-panel">
                <h1 id="judulHalamanLogin">Masuk ke Akun Anda</h1>
                <p class="login-subtitle">Silakan masukkan email dan password yang terdaftar untuk melanjutkan ke Dashboard Menu.</p>

                <!-- Kotak Alert Feedback Error / Sukses -->
                <div id="loginAlertBox" class="alert-box alert-error" role="alert">
                    <span class="alert-text">email/password yang anda masukkan salah</span>
                </div>

                <form id="formLoginUtama" novalidate>
                    <div class="form-group">
                        <label for="loginEmail">Alamat Email</label>
                        <input type="email" id="loginEmail" name="email" placeholder="Contoh: rina@gmail.com" required autocomplete="email">
                    </div>

                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <div class="password-toggle-wrapper">
                            <input type="password" id="loginPassword" name="password" placeholder="Masukkan password Anda" required autocomplete="current-password">
                        </div>
                        <!-- Contoh Penggunaan Inline CSS (Indikator 2) -->
                        <p class="field-hint" style="color: #b45309; font-weight: 500;">
                            *Tips uji coba: Coba masukkan password acak untuk menguji pop-up validasi error.
                        </p>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block">Login Sekarang</button>
                </form>

                <!-- Tombol Lupa Password & Daftar yang memunculkan Modal Box / Pop-Up -->
                <div class="login-links-row">
                    <button type="button" class="btn btn-outline btn-sm" onclick="bukaModal('modalLupaPassword')">
                        Lupa Password?
                    </button>
                    <button type="button" class="btn btn-accent btn-sm" onclick="bukaModal('modalDaftar')">
                        Daftar Akun Baru
                    </button>
                </div>
            </article>
        </section>
    </main>

    <!-- MODAL 1: POP-UP ALERT VALIDASI LOGIN SALAH -->
    <div id="modalPopUpPesan" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="judulPopUpPesan">
        <div class="modal-box">
            <div id="headerPopUpPesan" class="modal-header" style="background-color: #b91c1c;">
                <h3 id="judulPopUpPesan">Peringatan Login</h3>
                <button type="button" class="modal-close" onclick="tutupModal('modalPopUpPesan')" aria-label="Tutup">&times;</button>
            </div>
            <div class="modal-body">
                <p id="isiPopUpPesan" style="font-size: 1rem; font-weight: 600; color: #1f2937; margin-bottom: 0.5rem;">
                    email/password yang anda masukkan salah
                </p>
                <p style="font-size: 0.88rem; color: #57606a;">
                    Periksa kembali penulisan alamat email beserta kata sandi Anda, atau pilih salah satu akun demo yang tersedia pada panel samping.
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary btn-sm" onclick="tutupModal('modalPopUpPesan')">Saya Mengerti</button>
            </div>
        </div>
    </div>

    <!-- MODAL 2: LUPA PASSWORD (MODAL BOX / POP-UP) -->
    <div id="modalLupaPassword" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="judulModalLupa">
        <div class="modal-box">
            <div class="modal-header">
                <h3 id="judulModalLupa">Pemulihan Lupa Password</h3>
                <button type="button" class="modal-close" onclick="tutupModal('modalLupaPassword')" aria-label="Tutup">&times;</button>
            </div>
            <div class="modal-body">
                <p style="font-size: 0.9rem; color: #57606a; margin-bottom: 1rem;">
                    Masukkan alamat email akun Anda yang terdaftar pada <code>dataPengguna</code> untuk melakukan pengecekan kata sandi:
                </p>
                <div id="hasilLupaPassword" class="alert-box">
                    <span class="alert-text"></span>
                </div>
                <form id="formLupaPassword">
                    <div class="form-group">
                        <label for="emailLupaPassword">Email Terdaftar</label>
                        <input type="email" id="emailLupaPassword" placeholder="Contoh: rina@gmail.com" required>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
                        <button type="button" class="btn btn-outline btn-sm" onclick="tutupModal('modalLupaPassword')">Batal</button>
                        <button type="submit" class="btn btn-primary btn-sm">Cari Password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- MODAL 3: DAFTAR AKUN BARU (MODAL BOX / POP-UP) -->
    <div id="modalDaftar" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="judulModalDaftar">
        <div class="modal-box">
            <div class="modal-header">
                <h3 id="judulModalDaftar">Pendaftaran Pengguna Baru</h3>
                <button type="button" class="modal-close" onclick="tutupModal('modalDaftar')" aria-label="Tutup">&times;</button>
            </div>
            <div class="modal-body">
                <div id="alertDaftarAkun" class="alert-box">
                    <span class="alert-text"></span>
                </div>
                <form id="formDaftarAkun">
                    <div class="form-group">
                        <label for="daftarNama">Nama Lengkap</label>
                        <input type="text" id="daftarNama" placeholder="Masukkan nama lengkap Anda" required>
                    </div>
                    <div class="form-group">
                        <label for="daftarEmail">Alamat Email</label>
                        <input type="email" id="daftarEmail" placeholder="nama@email.com" required>
                    </div>
                    <div class="form-row-2">
                        <div class="form-group">
                            <label for="daftarPassword">Password Baru</label>
                            <input type="password" id="daftarPassword" placeholder="Minimal 5 karakter" required>
                        </div>
                        <div class="form-group">
                            <label for="daftarRole">Peran Pengguna</label>
                            <select id="daftarRole">
                                <option value="User">User (Mahasiswa / Umum)</option>
                                <option value="Admin">Admin Pengelola</option>
                            </select>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
                        <button type="button" class="btn btn-outline btn-sm" onclick="tutupModal('modalDaftar')">Tutup</button>
                        <button type="submit" class="btn btn-accent btn-sm">Simpan &amp; Daftar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Footer Semantik -->
    <footer class="site-footer">
        <div class="footer-inner">
            <span>&copy; 2026 <strong>Lentera Pustaka</strong> — Aplikasi Pemesanan Buku Online (UTS Pemrograman Web 1).</span>
            <span>Struktur HTML5 Semantik &bull; CSS3 &bull; Vanilla JavaScript DOM</span>
        </div>
    </footer>

    <!-- Pemanggilan File JS Terpisah -->
    <script src="js/data.js"></script>
    <script src="js/script.js"></script>
</body>
</html>

```

---

### 3. Membuat Halaman Dashboard Menu (`dashboard.html`)

Halaman `dashboard.html` berfungsi sebagai halaman utama setelah pengguna berhasil login. Fitur pada halaman ini meliputi:
- **Greeting Otomatis Berdasarkan Waktu Lokal**: Menampilkan sapaan *Selamat Pagi*, *Selamat Siang*, atau *Selamat Sore/Malam* mengikuti jam pada perangkat pengguna (`new Date().getHours()`).
- **Empat Menu Navigasi Utama**:
  1. Informasi Stok/Katalog (`stok.html`)
  2. Tracking Pengiriman (`tracking.html`)
  3. Laporan Pemesanan (Modal Box Rekapitulasi & tautan ke `checkout.html`)
  4. History Transaksi (Tabel riwayat transaksi & Modal Box)

#### Tampilan Halaman Dashboard (`dashboard.html`):
<img width="292" height="319" alt="image" src="https://github.com/user-attachments/assets/6b2eca56-79f4-45d4-ae3a-d6366849b817" />


**Kode `dashboard.html`:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Menu — Lentera Pustaka | Sistem Informasi Buku Ajar</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- Internal CSS untuk kustomisasi lencana waktu di Dashboard -->
    <style>
        .greeting-time-chip {
            background-color: rgba(254, 243, 199, 0.2);
            border: 1px solid #fef3c7;
            color: #fef3c7;
            padding: 0.45rem 1rem;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 600;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <!-- Header Semantik -->
    <header class="site-header">
        <div class="header-container">
            <a href="dashboard.html" class="brand-identity">
                <img src="assets/logo.png" alt="Logo Lentera Pustaka" class="brand-logo">
                <div>
                    <span class="brand-title">Lentera Pustaka</span>
                    <span class="brand-subtitle">Dashboard Utama Layanan Bahan Ajar</span>
                </div>
            </a>

            <nav class="main-nav" aria-label="Menu Utama">
                <ul>
                    <li><a href="dashboard.html" class="active">Dashboard</a></li>
                    <li><a href="stok.html">Informasi Stok/Katalog</a></li>
                    <li><a href="checkout.html">Pemesanan Buku</a></li>
                    <li><a href="tracking.html">Tracking Pengiriman</a></li>
                </ul>
            </nav>

            <div class="user-pill">
                <span>Halo, <strong id="headerUserName">Rina Wulandari</strong></span>
                <span id="headerUserRole" class="user-role-badge">User</span>
                <button type="button" id="btnLogoutApp" class="btn-logout">Keluar</button>
            </div>
        </div>
    </header>

    <!-- Konten Utama Dashboard -->
    <main class="main-container">
        <!-- Banner Sapaan Berdasarkan Local Time (Pagi/Siang/Sore) -->
        <section class="page-banner" aria-labelledby="greetingTitle">
            <div>
                <h1 id="greetingTitle">Selamat Pagi, Pengguna!</h1>
                <p id="greetingSubtitle">Memuat sapaan waktu lokal perangkat Anda...</p>
            </div>
            <div class="greeting-time-chip" style="box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                Status Sistem: Aktif &amp; Terhubung ke <code>data.js</code>
            </div>
        </section>

        <!-- Ringkasan Indikator Data (Statistik Real-time dari data.js) -->
        <section class="stats-grid" aria-label="Ringkasan Statistik Toko">
            <article class="stat-card">
                <span class="stat-label">Total Katalog Buku</span>
                <div id="statTotalJudul" class="stat-value">5 Judul</div>
            </article>
            <article class="stat-card accent">
                <span class="stat-label">Total Stok Tersedia</span>
                <div id="statTotalEksemplar" class="stat-value">1.587 Eks</div>
            </article>
            <article class="stat-card">
                <span class="stat-label">Data Pengiriman Aktif</span>
                <div id="statTotalDO" class="stat-value">2 Nomor DO</div>
            </article>
            <article class="stat-card accent">
                <span class="stat-label">Riwayat Transaksi</span>
                <div id="statTotalTransaksi" class="stat-value">2 Pesanan</div>
            </article>
        </section>

        <!-- 4 Tombol Navigasi Utama Sesuai Soal UTS -->
        <section aria-labelledby="judulMenuNavigasi">
            <div class="section-header">
                <h2 id="judulMenuNavigasi" class="section-title">Menu Utama Navigasi Aplikasi</h2>
                <a href="checkout.html" class="btn btn-accent btn-sm">+ Buat Pesanan Baru</a>
            </div>

            <div class="menu-cards-grid">
                <!-- Menu 1: Informasi Stok/Katalog -->
                <article class="menu-nav-card">
                    <div>
                        <div class="menu-icon-badge">01</div>
                        <h3>Informasi Stok/Katalog</h3>
                        <p>Lihat daftar lengkap buku ajar dari variabel konstanta <code>dataKatalogBuku</code> serta tambahkan baris stok buku baru secara dinamis.</p>
                    </div>
                    <a href="stok.html" class="btn btn-primary btn-block">Buka Katalog &amp; Stok</a>
                </article>

                <!-- Menu 2: Tracking Pengiriman -->
                <article class="menu-nav-card">
                    <div>
                        <div class="menu-icon-badge">02</div>
                        <h3>Tracking Pengiriman</h3>
                        <p>Lacak posisi pengiriman paket bahan ajar menggunakan Nomor Delivery Order (DO), lengkap dengan progress bar dan detail ekspedisi.</p>
                    </div>
                    <a href="tracking.html" class="btn btn-primary btn-block">Lacak Pengiriman</a>
                </article>

                <!-- Menu 3: Laporan Pemesanan -->
                <article class="menu-nav-card">
                    <div>
                        <div class="menu-icon-badge">03</div>
                        <h3>Laporan Pemesanan</h3>
                        <p>Rekapitulasi data pemesanan buku bahan ajar beserta rincian item, nilai transaksi, dan tombol akses menuju form pemesanan baru.</p>
                    </div>
                    <div style="display: grid; gap: 0.5rem;">
                        <button type="button" class="btn btn-primary btn-block" onclick="bukaModal('modalLaporanPemesanan')">Lihat Laporan Pemesanan</button>
                        <a href="checkout.html" class="btn btn-outline btn-sm btn-block">Ke Halaman Pemesanan (Checkout)</a>
                    </div>
                </article>

                <!-- Menu 4: History Transaksi -->
                <article class="menu-nav-card">
                    <div>
                        <div class="menu-icon-badge">04</div>
                        <h3>History Transaksi</h3>
                        <p>Catatan riwayat pembayaran, metode transaksi yang digunakan pemesan, ekspedisi pengiriman, serta tautan langsung ke pelacakan DO.</p>
                    </div>
                    <button type="button" class="btn btn-accent btn-block" onclick="bukaModal('modalHistoryTransaksi')">Buka History Transaksi</button>
                </article>
            </div>
        </section>

        <!-- Panel Ringkasan History Transaksi Langsung di Halaman Dashboard -->
        <section class="card-panel" aria-labelledby="judulTabelRingkas">
            <div class="section-header">
                <h2 id="judulTabelRingkas" class="section-title">Pratinjau Cepat History Transaksi &amp; Pemesanan Terbaru</h2>
                <a href="checkout.html" class="btn btn-outline btn-sm">Tambah Transaksi di Checkout</a>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ID Transaksi</th>
                            <th>Tanggal</th>
                            <th>Nama Pemesan</th>
                            <th>Metode Bayar</th>
                            <th>Ekspedisi &amp; Paket</th>
                            <th>Total Pembayaran</th>
                            <th>Status Kirim</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyHistoryTransaksi">
                        <!-- Diisi secara dinamis oleh js/script.js -->
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <!-- MODAL LAPORAN PEMESANAN -->
    <div id="modalLaporanPemesanan" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="judulModalLaporan">
        <div class="modal-box modal-lg">
            <div class="modal-header">
                <h3 id="judulModalLaporan">Laporan Pemesanan Bahan Ajar</h3>
                <button type="button" class="modal-close" onclick="tutupModal('modalLaporanPemesanan')" aria-label="Tutup">&times;</button>
            </div>
            <div class="modal-body">
                <p style="font-size: 0.9rem; color: #57606a; margin-bottom: 1rem;">
                    Berikut adalah rekapitulasi laporan pemesanan buku yang tercatat di dalam sistem (otomatis bertambah ketika Anda melakukan pemesanan baru pada halaman <code>checkout.html</code>):
                </p>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nomor DO</th>
                                <th>Tanggal</th>
                                <th>Pemesan</th>
                                <th>Rincian Buku Dipesan</th>
                                <th>Total Nilai</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyLaporanPemesanan"></tbody>
                    </table>
                </div>
                <div style="margin-top: 1rem; text-align: right; font-size: 1rem;">
                    Total Akumulasi Nilai Pemesanan: <strong id="totalNilaiLaporan" style="color: #1b4332; font-size: 1.15rem;">Rp 0</strong>
                </div>
            </div>
            <div class="modal-footer">
                <a href="checkout.html" class="btn btn-accent btn-sm">+ Tambah Pemesanan Baru</a>
                <button type="button" class="btn btn-primary btn-sm" onclick="tutupModal('modalLaporanPemesanan')">Tutup Laporan</button>
            </div>
        </div>
    </div>

    <!-- MODAL HISTORY TRANSAKSI -->
    <div id="modalHistoryTransaksi" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="judulModalHistory">
        <div class="modal-box modal-lg">
            <div class="modal-header">
                <h3 id="judulModalHistory">History Transaksi Pembelian Buku</h3>
                <button type="button" class="modal-close" onclick="tutupModal('modalHistoryTransaksi')" aria-label="Tutup">&times;</button>
            </div>
            <div class="modal-body">
                <p style="font-size: 0.9rem; color: #57606a; margin-bottom: 1rem;">
                    Daftar riwayat transaksi pelanggan beserta metode pembayaran dan status pengiriman ekspedisi:
                </p>
                <div class="alert-box alert-info show" style="margin-bottom: 1rem;">
                    <span>Setiap pesanan yang Anda selesaikan di halaman <strong>Pemesanan (checkout.html)</strong> akan otomatis tercatat di dalam daftar ini.</span>
                </div>
                <p style="font-size: 0.88rem; color: #1b4332;">
                    Silakan gunakan tabel History Transaksi pada layar utama Dashboard atau klik tombol <strong>Lacak DO</strong> untuk melihat posisi paket.
                </p>
            </div>
            <div class="modal-footer">
                <a href="tracking.html" class="btn btn-outline btn-sm">Ke Halaman Tracking</a>
                <button type="button" class="btn btn-primary btn-sm" onclick="tutupModal('modalHistoryTransaksi')">Selesai</button>
            </div>
        </div>
    </div>

    <!-- Footer Semantik -->
    <footer class="site-footer">
        <div class="footer-inner">
            <span>&copy; 2026 <strong>Lentera Pustaka</strong> — Dashboard Sistem Pemesanan Buku Online.</span>
            <span>Navigasi Terintegrasi: Katalog &bull; Checkout &bull; Tracking DO</span>
        </div>
    </footer>

    <script src="js/data.js"></script>
    <script src="js/script.js"></script>
</body>
</html>

```

---

### 4. Membuat Halaman Informasi Stok / Katalog (`stok.html`)

Halaman `stok.html` menampilkan daftar buku secara dinamis dari variabel konstanta `dataKatalogBuku` pada `js/data.js`. Selain fitur pencarian dan filter jenis buku, terdapat formulir untuk **menambahkan baris stok buku baru secara langsung ke dalam tabel menggunakan JavaScript DOM (`document.createElement` & `appendChild`)**.

#### Tampilan Halaman Informasi Stok / Katalog (`stok.html`):
<img width="285" height="386" alt="image" src="https://github.com/user-attachments/assets/1615d3d4-fcf9-46e1-b757-f36b02771766" />


**Kode `stok.html`:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informasi Stok &amp; Katalog Buku — Lentera Pustaka</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .filter-toolbar {
            display: grid;
            grid-template-columns: 1fr 220px auto;
            gap: 0.85rem;
            margin-bottom: 1.25rem;
            align-items: end;
        }
        @media (max-width: 768px) {
            .filter-toolbar {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Header Semantik -->
    <header class="site-header">
        <div class="header-container">
            <a href="dashboard.html" class="brand-identity">
                <img src="assets/logo.png" alt="Logo Lentera Pustaka" class="brand-logo">
                <div>
                    <span class="brand-title">Lentera Pustaka</span>
                    <span class="brand-subtitle">Manajemen Katalog &amp; Informasi Stok Buku</span>
                </div>
            </a>

            <nav class="main-nav" aria-label="Menu Utama">
                <ul>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="stok.html" class="active">Informasi Stok/Katalog</a></li>
                    <li><a href="checkout.html">Pemesanan Buku</a></li>
                    <li><a href="tracking.html">Tracking Pengiriman</a></li>
                </ul>
            </nav>

            <div class="user-pill">
                <span>Halo, <strong id="headerUserName">Rina Wulandari</strong></span>
                <span id="headerUserRole" class="user-role-badge">User</span>
                <button type="button" id="btnLogoutApp" class="btn-logout">Keluar</button>
            </div>
        </div>
    </header>

    <main class="main-container">
        <section class="page-banner">
            <div>
                <h1>Informasi Stok &amp; Katalog Buku Ajar</h1>
                <p>Data katalog dimuat secara dinamis dari variabel konstanta <code>dataKatalogBuku</code> pada file <code>js/data.js</code>.</p>
            </div>
            <a href="checkout.html" class="btn btn-accent">Lanjut ke Pemesanan Buku &rarr;</a>
        </section>

        <!-- BAGIAN 1: FORM TAMBAH BARIS STOK BARU MENGGUNAKAN JAVASCRIPT DOM -->
        <section class="card-panel" aria-labelledby="judulFormTambahStok">
            <div class="section-header">
                <h2 id="judulFormTambahStok" class="section-title">Tambah Baris Stok Buku Baru (Manipulasi DOM)</h2>
                <button type="button" id="btnResetKatalogDefault" class="btn btn-outline btn-sm">Reset ke Data Default <code>data.js</code></button>
            </div>

            <div id="alertStokBaru" class="alert-box" role="alert">
                <span class="alert-text"></span>
            </div>

            <form id="formTambahStokBaru" novalidate>
                <div class="form-row-3">
                    <div class="form-group">
                        <label for="inputKodeBarang">Kode Buku / Barang *</label>
                        <input type="text" id="inputKodeBarang" placeholder="Contoh: MSIM4309" required>
                    </div>
                    <div class="form-group">
                        <label for="inputNamaBarang">Judul / Nama Buku *</label>
                        <input type="text" id="inputNamaBarang" placeholder="Contoh: Pemrograman Berbasis Web" required>
                    </div>
                    <div class="form-group">
                        <label for="inputJenisBarang">Jenis Bahan Ajar *</label>
                        <select id="inputJenisBarang">
                            <option value="Buku Ajar">Buku Ajar</option>
                            <option value="Modul Praktikum">Modul Praktikum</option>
                            <option value="Buku Referensi">Buku Referensi</option>
                        </select>
                    </div>
                </div>

                <div class="form-row-3">
                    <div class="form-group">
                        <label for="inputEdisiBarang">Edisi *</label>
                        <input type="number" id="inputEdisiBarang" min="1" value="1" required>
                    </div>
                    <div class="form-group">
                        <label for="inputStokBarang">Jumlah Stok (Eksemplar) *</label>
                        <input type="number" id="inputStokBarang" min="1" placeholder="Contoh: 250" required>
                    </div>
                    <div class="form-group">
                        <label for="inputHargaBarang">Harga Satuan (Rp) *</label>
                        <input type="text" id="inputHargaBarang" placeholder="Contoh: 195000 atau Rp 195.000" required>
                    </div>
                </div>

                <div class="form-row-2" style="align-items: end;">
                    <div class="form-group">
                        <label for="inputCoverBarang">Pilih Gambar Sampul (Folder <code>img/</code>)</label>
                        <select id="inputCoverBarang">
                            <option value="img/pengantar_komunikasi.jpg">Sampul 1 — Pengantar Ilmu Komunikasi (img/pengantar_komunikasi.jpg)</option>
                            <option value="img/manajemen_keuangan.jpg">Sampul 2 — Manajemen Keuangan (img/manajemen_keuangan.jpg)</option>
                            <option value="img/kepemimpinan.jpg">Sampul 3 — Kepemimpinan (img/kepemimpinan.jpg)</option>
                            <option value="img/mikrobiologi.jpg">Sampul 4 — Mikrobiologi Dasar (img/mikrobiologi.jpg)</option>
                            <option value="img/paud_perkembangan.jpeg">Sampul 5 — Perkembangan Anak Usia Dini (img/paud_perkembangan.jpeg)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary btn-block">+ Tambahkan Baris ke Tabel Katalog</button>
                    </div>
                </div>
            </form>
        </section>

        <!-- BAGIAN 2: TABEL DINAMIS DATA KATALOG BUKU -->
        <section class="card-panel" aria-labelledby="judulTabelKatalog">
            <div class="section-header">
                <h2 id="judulTabelKatalog" class="section-title">Daftar Katalog &amp; Ketersediaan Stok</h2>
                <span id="infoJumlahKatalog" style="font-size: 0.86rem; color: #57606a;">Memuat katalog...</span>
            </div>

            <div class="filter-toolbar">
                <div>
                    <label for="cariKatalogInput">Cari Kode atau Judul Buku</label>
                    <input type="text" id="cariKatalogInput" placeholder="Ketik kode barang (misal: ASIP4301) atau judul buku...">
                </div>
                <div>
                    <label for="filterJenisBuku">Filter Jenis Barang</label>
                    <select id="filterJenisBuku">
                        <option value="SEMUA">Semua Jenis</option>
                        <option value="Buku Ajar">Buku Ajar</option>
                        <option value="Modul Praktikum">Modul Praktikum</option>
                        <option value="Buku Referensi">Buku Referensi</option>
                    </select>
                </div>
                <div>
                    <a href="checkout.html" class="btn btn-accent">Pesan Buku Sekarang</a>
                </div>
            </div>

            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Sampul</th>
                            <th>Kode Barang</th>
                            <th>Nama / Judul Buku</th>
                            <th>Jenis Barang</th>
                            <th style="text-align:center;">Edisi</th>
                            <th>Status &amp; Jumlah Stok</th>
                            <th>Harga Satuan</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyKatalogBuku">
                        <!-- Diisi otomatis dari konstanta dataKatalogBuku oleh js/script.js -->
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="footer-inner">
            <span>&copy; 2026 <strong>Lentera Pustaka</strong> — Halaman Informasi Stok/Katalog (<code>stok.html</code>).</span>
            <span>Sumber Data: <code>const dataKatalogBuku</code> pada <code>js/data.js</code></span>
        </div>
    </footer>

    <script src="js/data.js"></script>
    <script src="js/script.js"></script>
</body>
</html>

```

---

### 5. Membuat Halaman Pemesanan / Checkout (`checkout.html`)

Halaman `checkout.html` digunakan untuk mengelola pemesanan bahan ajar. Fitur yang disediakan meliputi:
- Tabel daftar item pemesanan yang **dapat ditambah, diubah jumlah kuantitasnya (`+` / `-`), maupun dihapus** dengan perhitungan subtotal otomatis.
- Formulir isian **Informasi Pemesan** (Nama Lengkap, Email, Nomor Telepon, Alamat Pengiriman) serta **Pilihan Ekspedisi & Metode Pembayaran**.
- Ketika pesanan dikonfirmasi, sistem menampilkan modal bukti pemesanan dan membuat **Nomor Delivery Order (DO) baru** yang langsung terhubung ke halaman Tracking.

#### Tampilan Halaman Pemesanan (`checkout.html`):
<img width="287" height="362" alt="image" src="https://github.com/user-attachments/assets/c73edc06-a633-4691-9c27-e17677f494f1" />


**Kode `checkout.html`:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Halaman Pemesanan &amp; Checkout — Lentera Pustaka</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .checkout-summary-box {
            background-color: #faf7f2;
            border: 1px solid #e2dcd3;
            border-radius: 10px;
            padding: 1.25rem;
            margin-top: 1.25rem;
        }
        .summary-line {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
            font-size: 0.94rem;
        }
        .summary-line.total {
            border-top: 2px solid #1b4332;
            padding-top: 0.75rem;
            margin-top: 0.75rem;
            font-size: 1.15rem;
            font-weight: 700;
            color: #1b4332;
        }
    </style>
</head>
<body>
    <!-- Header Semantik -->
    <header class="site-header">
        <div class="header-container">
            <a href="dashboard.html" class="brand-identity">
                <img src="assets/logo.png" alt="Logo Lentera Pustaka" class="brand-logo">
                <div>
                    <span class="brand-title">Lentera Pustaka</span>
                    <span class="brand-subtitle">Formulir Pemesanan &amp; Pembayaran Buku Ajar</span>
                </div>
            </a>

            <nav class="main-nav" aria-label="Menu Utama">
                <ul>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="stok.html">Informasi Stok/Katalog</a></li>
                    <li><a href="checkout.html" class="active">Pemesanan Buku</a></li>
                    <li><a href="tracking.html">Tracking Pengiriman</a></li>
                </ul>
            </nav>

            <div class="user-pill">
                <span>Halo, <strong id="headerUserName">Rina Wulandari</strong></span>
                <span id="headerUserRole" class="user-role-badge">User</span>
                <button type="button" id="btnLogoutApp" class="btn-logout">Keluar</button>
            </div>
        </div>
    </header>

    <main class="main-container">
        <section class="page-banner">
            <div>
                <h1>Halaman Pemesanan Buku (Checkout)</h1>
                <p>Kelola item buku yang dipesan (tambah/ubah kuantitas) serta lengkapi informasi pemesan dan metode pembayaran.</p>
            </div>
            <a href="stok.html" class="btn btn-outline" style="background: rgba(255,255,255,0.12); color: #fff; border-color: #fef3c7;">&larr; Lihat Katalog Buku</a>
        </section>

        <div id="alertCheckoutBox" class="alert-box" role="alert">
            <span class="alert-text"></span>
        </div>

        <!-- BAGIAN 1: DATA PEMESANAN YANG DAPAT DITAMBAH / UBAH -->
        <section class="card-panel" aria-labelledby="judulDaftarPesanan">
            <div class="section-header">
                <h2 id="judulDaftarPesanan" class="section-title">1. Data Item Pemesanan Buku (Dapat Ditambah / Diubah)</h2>
            </div>

            <!-- Form Pilih & Tambah Buku ke Keranjang Pesanan -->
            <form id="formTambahItemPesanan" style="margin-bottom: 1.25rem; background: #faf7f2; padding: 1rem; border-radius: 8px; border: 1px solid #e2dcd3;">
                <div class="form-row-3" style="align-items: end;">
                    <div class="form-group" style="margin-bottom: 0; grid-column: span 2;">
                        <label for="pilihBukuCheckout">Pilih Buku dari Katalog (<code>dataKatalogBuku</code>)</label>
                        <select id="pilihBukuCheckout"></select>
                    </div>
                    <div style="display: grid; grid-template-columns: 100px 1fr; gap: 0.65rem; align-items: end;">
                        <div>
                            <label for="jumlahBukuCheckout">Jumlah</label>
                            <input type="number" id="jumlahBukuCheckout" min="1" value="1" required>
                        </div>
                        <button type="submit" class="btn btn-primary">+ Tambah ke Pesanan</button>
                    </div>
                </div>
            </form>

            <!-- Tabel Daftar Item Pemesanan -->
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Kode Buku</th>
                            <th>Judul Bahan Ajar</th>
                            <th>Harga Satuan</th>
                            <th>Ubah Jumlah (Qty)</th>
                            <th>Subtotal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="tbodyKeranjangPesanan">
                        <!-- Diisi dinamis oleh js/script.js -->
                    </tbody>
                </table>
            </div>
        </section>

        <!-- BAGIAN 2: ISIAN DATA INFORMASI PEMESAN DAN PEMBAYARAN -->
        <section class="card-panel" aria-labelledby="judulFormPemesan">
            <div class="section-header">
                <h2 id="judulFormPemesan" class="section-title">2. Informasi Pemesan, Ekspedisi &amp; Pembayaran</h2>
            </div>

            <form id="formDataPemesanCheckout" novalidate>
                <div class="form-row-3">
                    <div class="form-group">
                        <label for="pemesanNama">Nama Lengkap Pemesan *</label>
                        <input type="text" id="pemesanNama" placeholder="Contoh: Rina Wulandari" required>
                    </div>
                    <div class="form-group">
                        <label for="pemesanEmail">Alamat Email Aktif *</label>
                        <input type="email" id="pemesanEmail" placeholder="Contoh: rina@gmail.com" required>
                    </div>
                    <div class="form-group">
                        <label for="pemesanTelepon">Nomor Telepon / WhatsApp *</label>
                        <input type="text" id="pemesanTelepon" value="0812-8899-7744" placeholder="Contoh: 0812xxxx" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="pemesanAlamat">Alamat Lengkap Pengiriman (Beserta Kota / UPBJJ) *</label>
                    <textarea id="pemesanAlamat" rows="2" placeholder="Masukkan alamat lengkap tujuan pengiriman paket buku..." required>Jl. Pondok Cabe Raya No. 45, Pamulang, Tangerang Selatan, Banten 15418</textarea>
                </div>

                <div class="form-row-2">
                    <div class="form-group">
                        <label for="pemesanEkspedisi">Pilih Jasa Ekspedisi &amp; Jenis Paket *</label>
                        <select id="pemesanEkspedisi">
                            <option value="JNE" data-paket="0JKT01" data-ongkir="15000">JNE Reguler (Paket 0JKT01) — Rp 15.000</option>
                            <option value="Pos Indonesia" data-paket="0UPBJJBDG" data-ongkir="12000">Pos Indonesia Kilat Khusus (Paket 0UPBJJBDG) — Rp 12.000</option>
                            <option value="JNE YES" data-paket="YES-EXP" data-ongkir="28000">JNE YES Yakin Esok Sampai (Paket YES-EXP) — Rp 28.000</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="pemesanMetodeBayar">Metode Pembayaran *</label>
                        <select id="pemesanMetodeBayar">
                            <option value="Transfer Virtual Account (BRI/Mandiri/BCA)">Transfer Virtual Account (BRI / Mandiri / BCA)</option>
                            <option value="QRIS Nusantara (E-Wallet & Mobile Banking)">QRIS Nusantara (E-Wallet &amp; Mobile Banking)</option>
                            <option value="Minimarket (Alfamart / Indomaret)">Minimarket (Alfamart / Indomaret)</option>
                        </select>
                    </div>
                </div>

                <!-- Ringkasan Kalkulasi Pembayaran -->
                <div class="checkout-summary-box">
                    <div class="summary-line">
                        <span>Subtotal Harga Buku:</span>
                        <strong id="ringkasanSubtotal">Rp 0</strong>
                    </div>
                    <div class="summary-line">
                        <span>Biaya Pengiriman (Ekspedisi):</span>
                        <strong id="ringkasanOngkir">Rp 15.000</strong>
                    </div>
                    <div class="summary-line total">
                        <span>Total Pembayaran Akhir:</span>
                        <span id="ringkasanGrandTotal">Rp 0</span>
                    </div>
                </div>

                <div style="margin-top: 1.35rem; display: flex; justify-content: flex-end; gap: 0.75rem;">
                    <a href="stok.html" class="btn btn-outline">Tambah Buku Lain</a>
                    <button type="submit" class="btn btn-accent">Konfirmasi Pemesanan &amp; Bayar Sekarang</button>
                </div>
            </form>
        </section>
    </main>

    <!-- MODAL BUKTI PEMESANAN & NOMOR DO BARU -->
    <div id="modalBuktiCheckout" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="judulBuktiCheckout">
        <div class="modal-box modal-lg">
            <div class="modal-header">
                <h3 id="judulBuktiCheckout">Bukti Konfirmasi Pemesanan &amp; Pembayaran</h3>
                <button type="button" class="modal-close" onclick="tutupModal('modalBuktiCheckout')" aria-label="Tutup">&times;</button>
            </div>
            <div class="modal-body" id="isiModalBuktiCheckout">
                <!-- Diisi otomatis setelah form checkout disubmit -->
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline btn-sm" onclick="tutupModal('modalBuktiCheckout')">Tutup</button>
            </div>
        </div>
    </div>

    <footer class="site-footer">
        <div class="footer-inner">
            <span>&copy; 2026 <strong>Lentera Pustaka</strong> — Halaman Pemesanan (<code>checkout.html</code>).</span>
            <span>Terintegrasi dengan History Transaksi &amp; Nomor Delivery Order</span>
        </div>
    </footer>

    <script src="js/data.js"></script>
    <script src="js/script.js"></script>
</body>
</html>

```

---

### 6. Membuat Halaman Informasi Pengiriman / Tracking (`tracking.html`)

Halaman `tracking.html` memungkinkan pengguna melacak status pengiriman berdasarkan **Nomor Delivery Order (DO)** (seperti `20230012` atau `20230013`). Ketika tombol **Cari Pengiriman** ditekan, halaman menampilkan:
- **Nama Pemesan** dan lencana status pengiriman.
- Simulasi visual **Progress Bar** dan tahapan pengiriman berwarna (*Loket -> Transit Hub -> Dalam Perjalanan -> Selesai Diterima*).
- **Detail Ekspedisi, Tanggal Kirim, Jenis Paket, dan Total Pembayaran**.
- **Kronologi Riwayat Perjalanan Ekspedisi** dalam bentuk *timeline*.

#### Tampilan Halaman Tracking Pengiriman (`tracking.html`):
<img width="288" height="287" alt="image" src="https://github.com/user-attachments/assets/8e503733-9070-42fb-beed-589eea1a6537" />


**Kode `tracking.html`:**
```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tracking Pengiriman (Delivery Order) — Lentera Pustaka</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        .search-do-bar {
            display: grid;
            grid-template-columns: 1fr auto;
            gap: 0.75rem;
            max-width: 640px;
        }
        .quick-do-chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.85rem;
            align-items: center;
        }
        @media (max-width: 600px) {
            .search-do-bar {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Header Semantik -->
    <header class="site-header">
        <div class="header-container">
            <a href="dashboard.html" class="brand-identity">
                <img src="assets/logo.png" alt="Logo Lentera Pustaka" class="brand-logo">
                <div>
                    <span class="brand-title">Lentera Pustaka</span>
                    <span class="brand-subtitle">Layanan Pelacakan Delivery Order (DO)</span>
                </div>
            </a>

            <nav class="main-nav" aria-label="Menu Utama">
                <ul>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="stok.html">Informasi Stok/Katalog</a></li>
                    <li><a href="checkout.html">Pemesanan Buku</a></li>
                    <li><a href="tracking.html" class="active">Tracking Pengiriman</a></li>
                </ul>
            </nav>

            <div class="user-pill">
                <span>Halo, <strong id="headerUserName">Rina Wulandari</strong></span>
                <span id="headerUserRole" class="user-role-badge">User</span>
                <button type="button" id="btnLogoutApp" class="btn-logout">Keluar</button>
            </div>
        </div>
    </header>

    <main class="main-container">
        <section class="page-banner">
            <div>
                <h1>Informasi &amp; Pelacakan Pengiriman (Tracking DO)</h1>
                <p>Masukkan Nomor Delivery Order (DO) untuk melihat nama pemesan, progress pengiriman, detail ekspedisi, dan riwayat perjalanan paket.</p>
            </div>
        </section>

        <!-- FORM PENCARIAN NOMOR DELIVERY ORDER -->
        <section class="card-panel" aria-labelledby="judulCariDO">
            <div class="section-header">
                <h2 id="judulCariDO" class="section-title">Pencarian Nomor Delivery Order</h2>
            </div>

            <div id="alertTrackingBox" class="alert-box" role="alert">
                <span class="alert-text"></span>
            </div>

            <form id="formCariTracking" novalidate>
                <label for="inputNomorDO">Input Nomor Delivery Order (DO)</label>
                <div class="search-do-bar">
                    <input type="text" id="inputNomorDO" placeholder="Masukkan Nomor DO (contoh: 20230012 atau 20230013)" required>
                    <button type="submit" class="btn btn-primary">Cari Pengiriman</button>
                </div>
            </form>

            <div class="quick-do-chips">
                <span style="font-size: 0.84rem; color: #57606a; font-weight: 600;">Nomor DO Tersedia di <code>data.js</code>:</span>
                <div id="daftarTombolDO" style="display: flex; gap: 0.5rem; flex-wrap: wrap;"></div>
            </div>
        </section>

        <!-- HASIL PELACAKAN PENGIRIMAN -->
        <section id="panelHasilTracking" class="card-panel" aria-labelledby="judulHasilTracking">
            <div class="section-header">
                <div>
                    <span style="font-size: 0.8rem; color: #57606a; text-transform: uppercase; font-weight: 700;">Hasil Pelacakan Paket</span>
                    <h2 id="judulHasilTracking" class="section-title">Delivery Order #<span id="trackNomorDO">20230012</span></h2>
                </div>
                <span id="trackStatusBadge" class="badge badge-warning" style="font-size: 0.9rem; padding: 0.4rem 0.95rem;">Dalam Perjalanan</span>
            </div>

            <!-- Simulasi Status Pengiriman dengan Progress Bar & Stepper Warna -->
            <div class="tracking-progress-wrapper">
                <div class="progress-bar-track">
                    <div id="trackProgressBarFill" class="progress-bar-fill" style="width: 65%;"></div>
                </div>
                <div class="progress-steps">
                    <div id="stepNode1" class="step-node completed">1. Penerimaan di Loket</div>
                    <div id="stepNode2" class="step-node completed">2. Proses Transit Hub</div>
                    <div id="stepNode3" class="step-node active">3. Dalam Perjalanan Kurir</div>
                    <div id="stepNode4" class="step-node">4. Paket Selesai Diterima</div>
                </div>
            </div>

            <!-- Tabel Informasi Pemesan & Detail Ekspedisi, Tanggal Kirim, Jenis Paket, Total Pembayaran -->
            <div class="form-row-2" style="align-items: start; margin-top: 1.5rem;">
                <div>
                    <h3 style="font-size: 1.05rem; color: #1b4332; margin-bottom: 0.75rem;">Detail Informasi Pengiriman &amp; Pembayaran</h3>
                    <div class="table-responsive">
                        <table class="data-table">
                            <tbody>
                                <tr>
                                    <th style="width: 42%;">Nama Pemesan</th>
                                    <td><strong id="trackNamaPemesan" style="font-size: 1rem; color: #1b4332;">Rina Wulandari</strong></td>
                                </tr>
                                <tr>
                                    <th>Detail Ekspedisi</th>
                                    <td id="trackEkspedisi">JNE</td>
                                </tr>
                                <tr>
                                    <th>Tanggal Kirim</th>
                                    <td id="trackTanggalKirim">2025-08-25</td>
                                </tr>
                                <tr>
                                    <th>Jenis Paket</th>
                                    <td><span id="trackJenisPaket" class="badge badge-info">0JKT01</span></td>
                                </tr>
                                <tr>
                                    <th>Total Pembayaran</th>
                                    <td><strong id="trackTotalBayar" style="color: #b45309; font-size: 1.05rem;">Rp 180.000</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Kronologi Riwayat Perjalanan Paket -->
                <div>
                    <h3 style="font-size: 1.05rem; color: #1b4332; margin-bottom: 0.75rem;">Kronologi Riwayat Perjalanan Ekspedisi</h3>
                    <div style="background: #faf7f2; border: 1px solid #e2dcd3; border-radius: 10px; padding: 1.15rem;">
                        <ul id="listRiwayatPerjalanan" class="timeline-list">
                            <!-- Diisi otomatis dari array perjalanan[] pada dataTracking -->
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="footer-inner">
            <span>&copy; 2026 <strong>Lentera Pustaka</strong> — Halaman Tracking Pengiriman (<code>tracking.html</code>).</span>
            <span>Sumber Data: Objek <code>dataTracking</code> pada <code>js/data.js</code></span>
        </div>
    </footer>

    <script src="js/data.js"></script>
    <script src="js/script.js"></script>
</body>
</html>

```

---

### 7. Mengelola Gaya Antarmuka dengan External CSS (`css/style.css`)

File `css/style.css` mengatur tampilan seluruh halaman menggunakan pendekatan *CSS Custom Properties (Variables)* dengan tema warna akademis hijau zamrud (`#1b4332`), krem kertas (`#faf7f2`), dan aksen emas (`#b45309`), serta mendukung tampilan responsif di berbagai ukuran layar.

**Kode `css/style.css`:**
```css
/* ==========================================================================
   File: css/style.css
   Tema: Lentera Pustaka - Sistem Informasi Bahan Ajar & Toko Buku Akademik
   Indikator 2: Mengelola gaya antarmuka menggunakan External CSS
   ========================================================================== */

:root {
    --warna-utama: #1b4332;
    --warna-utama-terang: #2d6a4f;
    --warna-utama-lembut: #e9f5ee;
    --warna-aksen: #b45309;
    --warna-aksen-terang: #fef3c7;
    --warna-latar: #faf7f2;
    --warna-permukaan: #ffffff;
    --warna-teks: #1f2937;
    --warna-teks-sekunder: #57606a;
    --warna-garis: #e2dcd3;
    --warna-bahaya: #b91c1c;
    --warna-bahaya-lembut: #fee2e2;
    --warna-sukses: #15803d;
    --warna-sukses-lembut: #dcfce7;
    --warna-info: #1d4ed8;
    --warna-info-lembut: #dbeafe;
    --bayangan-halus: 0 4px 14px rgba(27, 67, 50, 0.07);
    --bayangan-tegas: 0 12px 28px rgba(27, 67, 50, 0.14);
    --radius-kecil: 8px;
    --radius-sedang: 12px;
    --radius-besar: 18px;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--warna-latar);
    color: var(--warna-teks);
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

a {
    color: var(--warna-utama);
    text-decoration: none;
    transition: color 0.2s ease;
}

a:hover {
    color: var(--warna-aksen);
}

/* ==========================================================================
   1. HEADER & NAVIGASI UTAMA (SEMANTIK <header> & <nav>)
   ========================================================================== */
.site-header {
    background-color: var(--warna-utama);
    color: #ffffff;
    border-bottom: 4px solid var(--warna-aksen);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: var(--bayangan-halus);
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.85rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.brand-identity {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    color: #ffffff;
}

.brand-identity:hover {
    color: #fef3c7;
}

.brand-logo {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    object-fit: cover;
    border: 2px solid #fef3c7;
    background-color: #ffffff;
}

.brand-title {
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    line-height: 1.2;
}

.brand-subtitle {
    font-size: 0.78rem;
    color: #d8f3dc;
    display: block;
}

.main-nav ul {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    flex-wrap: wrap;
}

.main-nav a {
    color: #e9f5ee;
    padding: 0.5rem 0.9rem;
    border-radius: var(--radius-kecil);
    font-size: 0.92rem;
    font-weight: 500;
    transition: all 0.2s ease;
}

.main-nav a:hover,
.main-nav a.active {
    background-color: rgba(255, 255, 255, 0.16);
    color: #fef3c7;
}

.user-pill {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    background: rgba(0, 0, 0, 0.22);
    padding: 0.38rem 0.8rem;
    border-radius: 999px;
    font-size: 0.85rem;
}

.user-role-badge {
    background-color: var(--warna-aksen);
    color: #ffffff;
    padding: 0.12rem 0.55rem;
    border-radius: 999px;
    font-size: 0.74rem;
    font-weight: 600;
}

.btn-logout {
    background-color: transparent;
    border: 1px solid rgba(255, 255, 255, 0.45);
    color: #ffffff;
    padding: 0.25rem 0.65rem;
    border-radius: 6px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-logout:hover {
    background-color: var(--warna-bahaya);
    border-color: var(--warna-bahaya);
}

/* ==========================================================================
   2. LAYOUT UTAMA & KONTAINER (<main>, <section>, <article>, <aside>)
   ========================================================================== */
.main-container {
    max-width: 1200px;
    width: 100%;
    margin: 1.75rem auto;
    padding: 0 1.5rem;
    flex: 1;
}

.page-banner {
    background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%);
    color: #ffffff;
    padding: 1.75rem 2rem;
    border-radius: var(--radius-besar);
    margin-bottom: 1.75rem;
    box-shadow: var(--bayangan-halus);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.25rem;
}

.page-banner h1 {
    font-size: 1.65rem;
    margin-bottom: 0.35rem;
}

.page-banner p {
    color: #d8f3dc;
    font-size: 0.96rem;
}

.card-panel {
    background-color: var(--warna-permukaan);
    border: 1px solid var(--warna-garis);
    border-radius: var(--radius-sedang);
    padding: 1.5rem;
    box-shadow: var(--bayangan-halus);
    margin-bottom: 1.5rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--warna-latar);
}

.section-title {
    font-size: 1.2rem;
    color: var(--warna-utama);
    font-weight: 700;
}

/* ==========================================================================
   3. HALAMAN LOGIN (index.html)
   ========================================================================== */
.login-wrapper {
    min-height: calc(100vh - 130px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.login-grid {
    max-width: 960px;
    width: 100%;
    background-color: var(--warna-permukaan);
    border-radius: var(--radius-besar);
    overflow: hidden;
    box-shadow: var(--bayangan-tegas);
    border: 1px solid var(--warna-garis);
    display: grid;
    grid-template-columns: 1.05fr 1fr;
}

.login-aside {
    background: linear-gradient(155deg, #1b4332 0%, #132a13 100%);
    color: #ffffff;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.login-aside-header {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
}

.login-aside h2 {
    font-size: 1.65rem;
    line-height: 1.3;
    margin-bottom: 0.85rem;
    color: #fef3c7;
}

.login-aside p {
    color: #d8f3dc;
    font-size: 0.94rem;
    margin-bottom: 1.25rem;
}

.demo-credentials-box {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(254, 243, 199, 0.3);
    border-radius: var(--radius-kecil);
    padding: 1rem;
    font-size: 0.84rem;
}

.demo-credentials-box h3 {
    font-size: 0.88rem;
    color: #fef3c7;
    margin-bottom: 0.5rem;
}

.demo-cred-list {
    list-style: none;
    display: grid;
    gap: 0.45rem;
}

.demo-cred-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.22);
    padding: 0.4rem 0.65rem;
    border-radius: 6px;
}

.btn-fill-demo {
    background-color: var(--warna-aksen);
    color: #ffffff;
    border: none;
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: pointer;
}

.btn-fill-demo:hover {
    background-color: #d97706;
}

.login-form-panel {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.login-form-panel h1 {
    font-size: 1.55rem;
    color: var(--warna-utama);
    margin-bottom: 0.35rem;
}

.login-subtitle {
    color: var(--warna-teks-sekunder);
    font-size: 0.92rem;
    margin-bottom: 1.5rem;
}

.login-links-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.15rem;
    padding-top: 1rem;
    border-top: 1px solid var(--warna-garis);
    gap: 0.75rem;
    flex-wrap: wrap;
}

/* ==========================================================================
   4. FORMULIR, INPUT & TOMBOL
   ========================================================================== */
.form-group {
    margin-bottom: 1.1rem;
}

.form-row-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.form-row-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

label {
    display: block;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--warna-teks);
    margin-bottom: 0.4rem;
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
input[type="date"],
select,
textarea {
    width: 100%;
    padding: 0.68rem 0.9rem;
    border: 1px solid var(--warna-garis);
    border-radius: var(--radius-kecil);
    font-size: 0.94rem;
    font-family: inherit;
    background-color: #ffffff;
    color: var(--warna-teks);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--warna-utama-terang);
    box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.16);
}

input.input-error,
select.input-error {
    border-color: var(--warna-bahaya);
    background-color: #fffbfa;
}

.field-hint {
    font-size: 0.78rem;
    color: var(--warna-teks-sekunder);
    margin-top: 0.28rem;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0.68rem 1.25rem;
    border-radius: var(--radius-kecil);
    font-size: 0.93rem;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    font-family: inherit;
}

.btn-primary {
    background-color: var(--warna-utama);
    color: #ffffff;
}

.btn-primary:hover {
    background-color: var(--warna-utama-terang);
}

.btn-accent {
    background-color: var(--warna-aksen);
    color: #ffffff;
}

.btn-accent:hover {
    background-color: #92400e;
}

.btn-outline {
    background-color: transparent;
    border-color: var(--warna-utama);
    color: var(--warna-utama);
}

.btn-outline:hover {
    background-color: var(--warna-utama-lembut);
}

.btn-danger {
    background-color: var(--warna-bahaya-lembut);
    color: var(--warna-bahaya);
    border-color: #fecaca;
}

.btn-danger:hover {
    background-color: var(--warna-bahaya);
    color: #ffffff;
}

.btn-sm {
    padding: 0.38rem 0.75rem;
    font-size: 0.82rem;
}

.btn-block {
    width: 100%;
}

/* ==========================================================================
   5. DASHBOARD KARTU MENU & STATISTIK (dashboard.html)
   ========================================================================== */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 1.15rem;
    margin-bottom: 1.75rem;
}

.stat-card {
    background-color: var(--warna-permukaan);
    border: 1px solid var(--warna-garis);
    border-left: 5px solid var(--warna-utama);
    border-radius: var(--radius-sedang);
    padding: 1.2rem 1.35rem;
    box-shadow: var(--bayangan-halus);
}

.stat-card.accent {
    border-left-color: var(--warna-aksen);
}

.stat-label {
    font-size: 0.83rem;
    color: var(--warna-teks-sekunder);
    text-transform: uppercase;
    letter-spacing: 0.4px;
    font-weight: 600;
}

.stat-value {
    font-size: 1.65rem;
    font-weight: 700;
    color: var(--warna-utama);
    margin-top: 0.25rem;
}

.menu-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.25rem;
    margin-bottom: 1.75rem;
}

.menu-nav-card {
    background-color: var(--warna-permukaan);
    border: 1px solid var(--warna-garis);
    border-radius: var(--radius-sedang);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    box-shadow: var(--bayangan-halus);
}

.menu-nav-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--bayangan-tegas);
    border-color: var(--warna-utama-terang);
}

.menu-icon-badge {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background-color: var(--warna-utama-lembut);
    color: var(--warna-utama);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    font-weight: 700;
}

.menu-nav-card h3 {
    font-size: 1.12rem;
    color: var(--warna-utama);
    margin-bottom: 0.45rem;
}

.menu-nav-card p {
    font-size: 0.88rem;
    color: var(--warna-teks-sekunder);
    margin-bottom: 1.2rem;
}

/* ==========================================================================
   6. TABEL DATA INTERAKTIF (stok.html, checkout.html, dashboard.html)
   ========================================================================== */
.table-responsive {
    width: 100%;
    overflow-x: auto;
    border: 1px solid var(--warna-garis);
    border-radius: var(--radius-kecil);
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--warna-permukaan);
    font-size: 0.92rem;
}

.data-table thead {
    background-color: var(--warna-utama);
    color: #ffffff;
}

.data-table th {
    padding: 0.85rem 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.3px;
    white-space: nowrap;
}

.data-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--warna-garis);
    vertical-align: middle;
}

.data-table tbody tr:hover {
    background-color: #f6f4ef;
}

.book-cover-thumb {
    width: 54px;
    height: 74px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid var(--warna-garis);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.badge {
    display: inline-block;
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 600;
}

.badge-success {
    background-color: var(--warna-sukses-lembut);
    color: var(--warna-sukses);
}

.badge-warning {
    background-color: var(--warna-aksen-terang);
    color: var(--warna-aksen);
}

.badge-info {
    background-color: var(--warna-info-lembut);
    color: var(--warna-info);
}

.badge-danger {
    background-color: var(--warna-bahaya-lembut);
    color: var(--warna-bahaya);
}

/* ==========================================================================
   7. TRACKING PENGIRIMAN & PROGRESS BAR (tracking.html)
   ========================================================================== */
.tracking-progress-wrapper {
    margin: 1.5rem 0 2rem;
}

.progress-bar-track {
    width: 100%;
    height: 12px;
    background-color: #e5e7eb;
    border-radius: 999px;
    overflow: hidden;
    margin-bottom: 1rem;
}

.progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--warna-utama) 0%, var(--warna-aksen) 100%);
    border-radius: 999px;
    transition: width 0.5s ease;
}

.progress-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    text-align: center;
}

.step-node {
    padding: 0.6rem 0.4rem;
    border-radius: var(--radius-kecil);
    background-color: #f3f4f6;
    font-size: 0.8rem;
    color: var(--warna-teks-sekunder);
    border: 1px solid transparent;
}

.step-node.active {
    background-color: var(--warna-utama-lembut);
    color: var(--warna-utama);
    border-color: var(--warna-utama-terang);
    font-weight: 700;
}

.step-node.completed {
    background-color: var(--warna-sukses-lembut);
    color: var(--warna-sukses);
    font-weight: 600;
}

.timeline-list {
    list-style: none;
    position: relative;
    padding-left: 1.5rem;
    margin-top: 1rem;
}

.timeline-list::before {
    content: "";
    position: absolute;
    left: 6px;
    top: 6px;
    bottom: 6px;
    width: 2px;
    background-color: var(--warna-utama-terang);
}

.timeline-item {
    position: relative;
    padding-bottom: 1.1rem;
}

.timeline-item::before {
    content: "";
    position: absolute;
    left: -1.5rem;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--warna-aksen);
    border: 3px solid #ffffff;
    box-shadow: 0 0 0 2px var(--warna-utama-terang);
}

.timeline-time {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--warna-aksen);
}

.timeline-desc {
    font-size: 0.92rem;
    color: var(--warna-teks);
}

/* ==========================================================================
   8. MODAL BOX, POP-UP & ALERT FEEDBACK (Indikator 3 & 4)
   ========================================================================== */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(17, 24, 39, 0.62);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 1000;
    backdrop-filter: blur(3px);
}

.modal-backdrop.show {
    display: flex;
}

.modal-box {
    background-color: var(--warna-permukaan);
    border-radius: var(--radius-sedang);
    max-width: 520px;
    width: 100%;
    box-shadow: var(--bayangan-tegas);
    border: 1px solid var(--warna-garis);
    overflow: hidden;
    animation: modalFadeIn 0.22s ease-out;
}

.modal-box.modal-lg {
    max-width: 820px;
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: translateY(-12px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.modal-header {
    background-color: var(--warna-utama);
    color: #ffffff;
    padding: 1rem 1.35rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    font-size: 1.08rem;
}

.modal-close {
    background: transparent;
    border: none;
    color: #ffffff;
    font-size: 1.35rem;
    line-height: 1;
    cursor: pointer;
}

.modal-body {
    padding: 1.35rem;
    max-height: 78vh;
    overflow-y: auto;
}

.modal-footer {
    padding: 0.9rem 1.35rem;
    background-color: #f9fafb;
    border-top: 1px solid var(--warna-garis);
    display: flex;
    justify-content: flex-end;
    gap: 0.65rem;
}

.alert-box {
    padding: 0.85rem 1.1rem;
    border-radius: var(--radius-kecil);
    margin-bottom: 1rem;
    font-size: 0.9rem;
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
}

.alert-box.show {
    display: flex;
}

.alert-error {
    background-color: var(--warna-bahaya-lembut);
    color: var(--warna-bahaya);
    border: 1px solid #fca5a5;
}

.alert-success {
    background-color: var(--warna-sukses-lembut);
    color: var(--warna-sukses);
    border: 1px solid #86efac;
}

.alert-info {
    background-color: var(--warna-info-lembut);
    color: var(--warna-info);
    border: 1px solid #93c5fd;
}

/* ==========================================================================
   9. FOOTER SEMANTIK (<footer>) & RESPONSIVE MEDIA QUERIES
   ========================================================================== */
.site-footer {
    background-color: #132a13;
    color: #d8f3dc;
    padding: 1.5rem;
    margin-top: auto;
    font-size: 0.86rem;
    border-top: 3px solid var(--warna-aksen);
}

.footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
}

@media (max-width: 820px) {
    .login-grid {
        grid-template-columns: 1fr;
    }
    .form-row-2,
    .form-row-3 {
        grid-template-columns: 1fr;
    }
    .progress-steps {
        grid-template-columns: repeat(2, 1fr);
    }
}

```

---

### 8. Logika Manipulasi DOM & Interaksi UI (`js/script.js`)

Seluruh interaksi antarmuka, validasi form, pengelolaan *modal box*, penambahan baris tabel stok secara dinamis, kalkulasi keranjang pemesanan, hingga simulasi *progress bar* pengiriman dikelola secara modular di dalam file `js/script.js`.

**Kode `js/script.js`:**
```javascript
/**
 * File: js/script.js
 * Deskripsi: Logika utama manipulasi DOM, validasi form, modal box, dan manajemen data
 * Tugas UTS Pemrograman Web 1 - Lentera Pustaka
 */

/* ==========================================================================
   1. UTILITAS PENYIMPANAN LOKAL & FORMAT RUPIAH
   ========================================================================== */
const STORAGE_KEYS = {
    USERS: "lp_uts_users_v1",
    CATALOG: "lp_uts_catalog_v1",
    TRACKING: "lp_uts_tracking_v1",
    CART: "lp_uts_cart_v1",
    HISTORY: "lp_uts_history_v1",
    ACTIVE_USER: "lp_uts_active_user_v1"
};

function bacaStorage(kunci, nilaiDefault) {
    try {
        const mentah = localStorage.getItem(kunci);
        if (!mentah) return nilaiDefault;
        return JSON.parse(mentah);
    } catch (err) {
        return nilaiDefault;
    }
}

function simpanStorage(kunci, nilai) {
    try {
        localStorage.setItem(kunci, JSON.stringify(nilai));
    } catch (err) {
        console.warn("Penyimpanan lokal tidak tersedia:", err);
    }
}

// Mengubah string seperti "Rp 180.000" menjadi angka 180000
function parseRupiahKeAngka(teksHarga) {
    if (typeof teksHarga === "number") return teksHarga;
    const bersih = String(teksHarga || "0").replace(/[^0-9]/g, "");
    return parseInt(bersih, 10) || 0;
}

// Mengubah angka 180000 menjadi string "Rp 180.000"
function formatAngkaKeRupiah(angka) {
    const nominal = Number(angka) || 0;
    return "Rp " + nominal.toLocaleString("id-ID");
}

// Mengambil daftar pengguna (gabungan dataPengguna dari data.js + pendaftaran baru)
function ambilDaftarPengguna() {
    const tersimpan = bacaStorage(STORAGE_KEYS.USERS, null);
    if (tersimpan && Array.isArray(tersimpan) && tersimpan.length > 0) {
        return tersimpan;
    }
    const awal = typeof dataPengguna !== "undefined" ? [...dataPengguna] : [];
    simpanStorage(STORAGE_KEYS.USERS, awal);
    return awal;
}

// Mengambil daftar katalog buku (gabungan dataKatalogBuku dari data.js + stok tambahan)
function ambilDaftarKatalog() {
    const tersimpan = bacaStorage(STORAGE_KEYS.CATALOG, null);
    if (tersimpan && Array.isArray(tersimpan) && tersimpan.length > 0) {
        return tersimpan;
    }
    const awal = typeof dataKatalogBuku !== "undefined" ? [...dataKatalogBuku] : [];
    simpanStorage(STORAGE_KEYS.CATALOG, awal);
    return awal;
}

// Mengambil data tracking pengiriman (gabungan dataTracking dari data.js + pesanan baru)
function ambilDataTracking() {
    const tersimpan = bacaStorage(STORAGE_KEYS.TRACKING, null);
    if (tersimpan && typeof tersimpan === "object") {
        return tersimpan;
    }
    const awal = typeof dataTracking !== "undefined" ? JSON.parse(JSON.stringify(dataTracking)) : {};
    simpanStorage(STORAGE_KEYS.TRACKING, awal);
    return awal;
}

// Mengambil riwayat transaksi untuk Laporan Pemesanan & History Transaksi
function ambilRiwayatTransaksi() {
    const tersimpan = bacaStorage(STORAGE_KEYS.HISTORY, null);
    if (tersimpan && Array.isArray(tersimpan) && tersimpan.length > 0) {
        return tersimpan;
    }
    const awal = typeof dataRiwayatTransaksiAwal !== "undefined" ? [...dataRiwayatTransaksiAwal] : [];
    simpanStorage(STORAGE_KEYS.HISTORY, awal);
    return awal;
}

// Mengambil item keranjang pemesanan pada checkout.html
function ambilDataKeranjang() {
    const tersimpan = bacaStorage(STORAGE_KEYS.CART, null);
    if (tersimpan && Array.isArray(tersimpan)) {
        return tersimpan;
    }
    const katalog = ambilDaftarKatalog();
    const defaultCart = katalog.length >= 2 ? [
        {
            kodeBarang: katalog[0].kodeBarang,
            namaBarang: katalog[0].namaBarang,
            jenisBarang: katalog[0].jenisBarang,
            hargaSatuan: parseRupiahKeAngka(katalog[0].harga),
            jumlah: 1
        },
        {
            kodeBarang: katalog[1].kodeBarang,
            namaBarang: katalog[1].namaBarang,
            jenisBarang: katalog[1].jenisBarang,
            hargaSatuan: parseRupiahKeAngka(katalog[1].harga),
            jumlah: 1
        }
    ] : [];
    simpanStorage(STORAGE_KEYS.CART, defaultCart);
    return defaultCart;
}

/* ==========================================================================
   2. MODAL BOX, POP-UP ALERT & INTERAKSI UI
   ========================================================================== */
function bukaModal(idModal) {
    const el = document.getElementById(idModal);
    if (el) {
        el.classList.add("show");
    }
}

function tutupModal(idModal) {
    const el = document.getElementById(idModal);
    if (el) {
        el.classList.remove("show");
    }
}

function tampilkanPopUpPesan(judul, isiPesan, tipe = "error") {
    const modalPopup = document.getElementById("modalPopUpPesan");
    if (modalPopup) {
        const elJudul = document.getElementById("judulPopUpPesan");
        const elIsi = document.getElementById("isiPopUpPesan");
        const elHeader = document.getElementById("headerPopUpPesan");

        if (elJudul) elJudul.textContent = judul;
        if (elIsi) elIsi.textContent = isiPesan;
        if (elHeader) {
            elHeader.style.backgroundColor = tipe === "error" ? "#b91c1c" : "#1b4332";
        }
        bukaModal("modalPopUpPesan");
    }
}

function tampilkanAlertInline(idElemen, pesan, tipe = "error") {
    const kotak = document.getElementById(idElemen);
    if (!kotak) return;
    kotak.className = "alert-box show " + (tipe === "success" ? "alert-success" : tipe === "info" ? "alert-info" : "alert-error");
    const teks = kotak.querySelector(".alert-text");
    if (teks) {
        teks.textContent = pesan;
    } else {
        kotak.textContent = pesan;
    }
}

function sembunyikanAlertInline(idElemen) {
    const kotak = document.getElementById(idElemen);
    if (kotak) {
        kotak.classList.remove("show");
    }
}

/* ==========================================================================
   3. SAPAAN WAKTU LOKAL (GREETING PAGI / SIANG / SORE / MALAM) & PROFIL HEADER
   ========================================================================== */
function dapatkanGreetingWaktuLokal() {
    const sekarang = new Date();
    const jam = sekarang.getHours();
    let sapaan = "Selamat Pagi";
    let keterangan = "Semangat memulai aktivitas perkuliahan dan pengelolaan bahan ajar hari ini.";

    if (jam >= 4 && jam < 11) {
        sapaan = "Selamat Pagi";
        keterangan = "Awali pagi dengan mengecek ketersediaan katalog buku dan pesanan terbaru.";
    } else if (jam >= 11 && jam < 15) {
        sapaan = "Selamat Siang";
        keterangan = "Tetap fokus di tengah hari! Pastikan seluruh pengiriman buku berjalan lancar.";
    } else if (jam >= 15 && jam < 18) {
        sapaan = "Selamat Sore";
        keterangan = "Menjelang sore, mari rekap laporan pemesanan dan pembaruan stok hari ini.";
    } else {
        sapaan = "Selamat Sore / Malam";
        keterangan = "Waktu tenang untuk meninjau riwayat transaksi dan persiapan jadwal esok hari.";
    }

    const menit = String(sekarang.getMinutes()).padStart(2, "0");
    const jamStr = String(jam).padStart(2, "0");
    return {
        sapaan: sapaan,
        waktuFormat: `${jamStr}:${menit} WIB`,
        keterangan: keterangan
    };
}

function muatInfoPenggunaHeader() {
    const userAktif = bacaStorage(STORAGE_KEYS.ACTIVE_USER, {
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        role: "User"
    });

    const elNamaHeader = document.getElementById("headerUserName");
    const elRoleHeader = document.getElementById("headerUserRole");
    if (elNamaHeader) elNamaHeader.textContent = userAktif.nama;
    if (elRoleHeader) elRoleHeader.textContent = userAktif.role || "User";

    const btnLogout = document.getElementById("btnLogoutApp");
    if (btnLogout) {
        btnLogout.addEventListener("click", function () {
            localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER);
            window.location.href = "index.html";
        });
    }
}

/* ==========================================================================
   4. LOGIKA HALAMAN 1: LOGIN (index.html / login.html)
   ========================================================================== */
function isiKredensialDemo(email, password) {
    const inputEmail = document.getElementById("loginEmail");
    const inputPass = document.getElementById("loginPassword");
    if (inputEmail && inputPass) {
        inputEmail.value = email;
        inputPass.value = password;
        inputEmail.classList.remove("input-error");
        inputPass.classList.remove("input-error");
        sembunyikanAlertInline("loginAlertBox");
    }
}

function inisialisasiHalamanLogin() {
    const formLogin = document.getElementById("formLoginUtama");
    if (!formLogin) return;

    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        const inputEmail = document.getElementById("loginEmail");
        const inputPass = document.getElementById("loginPassword");
        const emailVal = (inputEmail.value || "").trim().toLowerCase();
        const passVal = (inputPass.value || "").trim();

        inputEmail.classList.remove("input-error");
        inputPass.classList.remove("input-error");

        if (!emailVal || !passVal) {
            if (!emailVal) inputEmail.classList.add("input-error");
            if (!passVal) inputPass.classList.add("input-error");
            tampilkanAlertInline("loginAlertBox", "Mohon isi alamat email dan password terlebih dahulu.", "error");
            return;
        }

        const daftarUser = ambilDaftarPengguna();
        const penggunaCocok = daftarUser.find(function (u) {
            return u.email.toLowerCase() === emailVal && u.password === passVal;
        });

        if (!penggunaCocok) {
            inputEmail.classList.add("input-error");
            inputPass.classList.add("input-error");
            const pesanGagal = "email/password yang anda masukkan salah";
            tampilkanAlertInline("loginAlertBox", pesanGagal, "error");
            tampilkanPopUpPesan("Autentikasi Gagal", pesanGagal, "error");
            return;
        }

        simpanStorage(STORAGE_KEYS.ACTIVE_USER, {
            id: penggunaCocok.id,
            nama: penggunaCocok.nama,
            email: penggunaCocok.email,
            role: penggunaCocok.role
        });

        tampilkanAlertInline("loginAlertBox", "Login berhasil! Mengalihkan ke Dashboard...", "success");
        setTimeout(function () {
            window.location.href = "dashboard.html";
        }, 450);
    });

    // Form Lupa Password di dalam Modal
    const formLupa = document.getElementById("formLupaPassword");
    if (formLupa) {
        formLupa.addEventListener("submit", function (e) {
            e.preventDefault();
            const emailCari = (document.getElementById("emailLupaPassword").value || "").trim().toLowerCase();
            const hasilBox = document.getElementById("hasilLupaPassword");
            const daftarUser = ambilDaftarPengguna();
            const ketemu = daftarUser.find(function (u) {
                return u.email.toLowerCase() === emailCari;
            });

            if (!ketemu) {
                tampilkanAlertInline("hasilLupaPassword", "Email tidak terdaftar dalam sistem Lentera Pustaka.", "error");
            } else {
                if (hasilBox) {
                    tampilkanAlertInline(
                        "hasilLupaPassword",
                        `Akun ditemukan atas nama ${ketemu.nama}. Password Anda adalah: "${ketemu.password}" (Simulasi Pemulihan Akun).`,
                        "success"
                    );
                }
            }
        });
    }

    // Form Daftar Akun Baru di dalam Modal
    const formDaftar = document.getElementById("formDaftarAkun");
    if (formDaftar) {
        formDaftar.addEventListener("submit", function (e) {
            e.preventDefault();
            const namaBaru = (document.getElementById("daftarNama").value || "").trim();
            const emailBaru = (document.getElementById("daftarEmail").value || "").trim().toLowerCase();
            const passBaru = (document.getElementById("daftarPassword").value || "").trim();
            const roleBaru = document.getElementById("daftarRole").value || "User";

            if (!namaBaru || !emailBaru || passBaru.length < 5) {
                tampilkanAlertInline("alertDaftarAkun", "Pastikan seluruh kolom terisi dan password minimal 5 karakter.", "error");
                return;
            }

            const daftarUser = ambilDaftarPengguna();
            const sudahAda = daftarUser.some(function (u) {
                return u.email.toLowerCase() === emailBaru;
            });

            if (sudahAda) {
                tampilkanAlertInline("alertDaftarAkun", "Alamat email tersebut sudah terdaftar. Silakan gunakan email lain.", "error");
                return;
            }

            const akunBaru = {
                id: daftarUser.length + 1,
                nama: namaBaru,
                email: emailBaru,
                password: passBaru,
                role: roleBaru
            };
            daftarUser.push(akunBaru);
            simpanStorage(STORAGE_KEYS.USERS, daftarUser);

            tampilkanAlertInline("alertDaftarAkun", "Pendaftaran berhasil! Silakan login menggunakan akun baru Anda.", "success");
            document.getElementById("loginEmail").value = emailBaru;
            document.getElementById("loginPassword").value = passBaru;

            setTimeout(function () {
                tutupModal("modalDaftar");
                tampilkanAlertInline("loginAlertBox", `Akun ${namaBaru} berhasil dibuat. Klik tombol Login untuk masuk.`, "success");
            }, 900);
        });
    }
}

/* ==========================================================================
   5. LOGIKA HALAMAN 2: DASHBOARD MENU (dashboard.html)
   ========================================================================== */
function inisialisasiHalamanDashboard() {
    const elGreetingJudul = document.getElementById("greetingTitle");
    if (!elGreetingJudul) return;

    const infoWaktu = dapatkanGreetingWaktuLokal();
    const userAktif = bacaStorage(STORAGE_KEYS.ACTIVE_USER, {
        nama: "Rina Wulandari",
        email: "rina@gmail.com",
        role: "User"
    });

    elGreetingJudul.textContent = `${infoWaktu.sapaan}, ${userAktif.nama}!`;
    const elGreetingSub = document.getElementById("greetingSubtitle");
    if (elGreetingSub) {
        elGreetingSub.textContent = `${infoWaktu.keterangan} (Waktu Lokal: ${infoWaktu.waktuFormat})`;
    }

    // Hitung ringkasan statistik dari data.js & localStorage
    const katalog = ambilDaftarKatalog();
    const trackingObj = ambilDataTracking();
    const riwayat = ambilRiwayatTransaksi();

    const totalJudul = katalog.length;
    const totalEksemplar = katalog.reduce(function (acc, item) {
        return acc + (Number(item.stok) || 0);
    }, 0);
    const totalResi = Object.keys(trackingObj).length;
    const totalTransaksi = riwayat.length;

    const elStatJudul = document.getElementById("statTotalJudul");
    const elStatStok = document.getElementById("statTotalEksemplar");
    const elStatDO = document.getElementById("statTotalDO");
    const elStatTrx = document.getElementById("statTotalTransaksi");

    if (elStatJudul) elStatJudul.textContent = `${totalJudul} Judul`;
    if (elStatStok) elStatStok.textContent = `${totalEksemplar.toLocaleString("id-ID")} Eks`;
    if (elStatDO) elStatDO.textContent = `${totalResi} Nomor DO`;
    if (elStatTrx) elStatTrx.textContent = `${totalTransaksi} Pesanan`;

    // Render Tabel Laporan Pemesanan & History Transaksi di Modal / Panel Dashboard
    renderTabelLaporanDanHistory();
}

function renderTabelLaporanDanHistory() {
    const tbodyLaporan = document.getElementById("tbodyLaporanPemesanan");
    const tbodyHistory = document.getElementById("tbodyHistoryTransaksi");
    const riwayat = ambilRiwayatTransaksi();

    if (tbodyLaporan) {
        tbodyLaporan.innerHTML = "";
        let akumulasiPendapatan = 0;
        riwayat.forEach(function (item, idx) {
            akumulasiPendapatan += parseRupiahKeAngka(item.totalBayar);
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td><strong>${item.nomorDO}</strong></td>
                <td>${item.tanggal}</td>
                <td>${item.namaPemesan}</td>
                <td>${item.itemRingkasan}</td>
                <td><strong>${item.totalBayar}</strong></td>
                <td><span class="badge badge-success">${item.statusBayar}</span></td>
            `;
            tbodyLaporan.appendChild(tr);
        });
        const elTotalLaporan = document.getElementById("totalNilaiLaporan");
        if (elTotalLaporan) {
            elTotalLaporan.textContent = formatAngkaKeRupiah(akumulasiPendapatan);
        }
    }

    if (tbodyHistory) {
        tbodyHistory.innerHTML = "";
        riwayat.forEach(function (item) {
            const badgeClass = item.statusKirim === "Dikirim" ? "badge-success" : "badge-warning";
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><code>${item.idTransaksi}</code></td>
                <td>${item.tanggal}</td>
                <td>${item.namaPemesan}<br><small style="color:#57606a">${item.emailPemesan}</small></td>
                <td>${item.metodeBayar}</td>
                <td>${item.ekspedisi}</td>
                <td><strong>${item.totalBayar}</strong></td>
                <td><span class="badge ${badgeClass}">${item.statusKirim}</span></td>
                <td>
                    <a href="tracking.html?do=${encodeURIComponent(item.nomorDO)}" class="btn btn-outline btn-sm">Lacak DO</a>
                </td>
            `;
            tbodyHistory.appendChild(tr);
        });
    }
}

/* ==========================================================================
   6. LOGIKA HALAMAN 3: INFORMASI STOK / KATALOG (stok.html)
   ========================================================================== */
function renderTabelStokKatalog(filterTeks = "", filterJenis = "SEMUA") {
    const tbody = document.getElementById("tbodyKatalogBuku");
    if (!tbody) return;

    const daftarBuku = ambilDaftarKatalog();
    const kataKunci = filterTeks.trim().toLowerCase();

    const hasilFilter = daftarBuku.filter(function (buku) {
        const cocokTeks =
            !kataKunci ||
            buku.kodeBarang.toLowerCase().includes(kataKunci) ||
            buku.namaBarang.toLowerCase().includes(kataKunci);
        const cocokJenis = filterJenis === "SEMUA" || buku.jenisBarang.toLowerCase() === filterJenis.toLowerCase();
        return cocokTeks && cocokJenis;
    });

    tbody.innerHTML = "";

    if (hasilFilter.length === 0) {
        const trKosong = document.createElement("tr");
        trKosong.innerHTML = `<td colspan="8" style="text-align:center; padding: 2rem; color:#57606a;">Tidak ada data buku yang sesuai dengan pencarian Anda.</td>`;
        tbody.appendChild(trKosong);
        return;
    }

    hasilFilter.forEach(function (buku, index) {
        const tr = document.createElement("tr");
        const stokAngka = Number(buku.stok) || 0;
        const statusStokBadge =
            stokAngka > 200
                ? `<span class="badge badge-success">Tersedia (${stokAngka})</span>`
                : stokAngka > 0
                ? `<span class="badge badge-warning">Stok Menipis (${stokAngka})</span>`
                : `<span class="badge badge-danger">Habis (0)</span>`;

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${buku.cover}" alt="${buku.namaBarang}" class="book-cover-thumb" onerror="this.src='assets/logo.png'">
            </td>
            <td><strong>${buku.kodeBarang}</strong></td>
            <td>${buku.namaBarang}</td>
            <td><span class="badge badge-info">${buku.jenisBarang}</span></td>
            <td style="text-align:center;">Edisi ${buku.edisi}</td>
            <td>${statusStokBadge}</td>
            <td><strong>${buku.harga}</strong></td>
        `;
        tbody.appendChild(tr);
    });

    const infoJumlah = document.getElementById("infoJumlahKatalog");
    if (infoJumlah) {
        infoJumlah.textContent = `Menampilkan ${hasilFilter.length} dari ${daftarBuku.length} judul bahan ajar.`;
    }
}

function inisialisasiHalamanStok() {
    const tbody = document.getElementById("tbodyKatalogBuku");
    if (!tbody) return;

    renderTabelStokKatalog();

    const inputCari = document.getElementById("cariKatalogInput");
    const selectJenis = document.getElementById("filterJenisBuku");

    function terapkanFilter() {
        const teks = inputCari ? inputCari.value : "";
        const jenis = selectJenis ? selectJenis.value : "SEMUA";
        renderTabelStokKatalog(teks, jenis);
    }

    if (inputCari) inputCari.addEventListener("input", terapkanFilter);
    if (selectJenis) selectJenis.addEventListener("change", terapkanFilter);

    // Fitur menambahkan baris stok baru menggunakan JavaScript DOM
    const formTambahStok = document.getElementById("formTambahStokBaru");
    if (formTambahStok) {
        formTambahStok.addEventListener("submit", function (e) {
            e.preventDefault();

            const kode = (document.getElementById("inputKodeBarang").value || "").trim().toUpperCase();
            const nama = (document.getElementById("inputNamaBarang").value || "").trim();
            const jenis = (document.getElementById("inputJenisBarang").value || "Buku Ajar").trim();
            const edisi = (document.getElementById("inputEdisiBarang").value || "1").trim();
            const stok = parseInt(document.getElementById("inputStokBarang").value, 10);
            const hargaInput = (document.getElementById("inputHargaBarang").value || "").trim();
            const coverPilihan = document.getElementById("inputCoverBarang").value || "img/pengantar_komunikasi.jpg";

            if (!kode || !nama || isNaN(stok) || stok < 0 || !hargaInput) {
                tampilkanAlertInline("alertStokBaru", "Mohon lengkapi seluruh kolom bertanda bintang (*) dengan nilai yang valid.", "error");
                return;
            }

            const katalogSaatIni = ambilDaftarKatalog();
            const duplikat = katalogSaatIni.some(function (item) {
                return item.kodeBarang.toUpperCase() === kode;
            });

            if (duplikat) {
                tampilkanAlertInline("alertStokBaru", `Kode buku ${kode} sudah ada di dalam tabel katalog.`, "error");
                return;
            }

            const hargaTerformat = hargaInput.startsWith("Rp")
                ? hargaInput
                : formatAngkaKeRupiah(parseRupiahKeAngka(hargaInput));

            const itemBaru = {
                kodeBarang: kode,
                namaBarang: nama,
                jenisBarang: jenis,
                edisi: String(edisi),
                stok: stok,
                harga: hargaTerformat,
                cover: coverPilihan
            };

            // Simpan ke array & update tampilan tabel DOM secara langsung
            katalogSaatIni.push(itemBaru);
            simpanStorage(STORAGE_KEYS.CATALOG, katalogSaatIni);
            renderTabelStokKatalog();

            formTambahStok.reset();
            tampilkanAlertInline(
                "alertStokBaru",
                `Berhasil menambahkan baris stok baru: [${itemBaru.kodeBarang}] ${itemBaru.namaBarang}.`,
                "success"
            );
        });
    }

    // Tombol Reset Data ke Default data.js
    const btnResetKatalog = document.getElementById("btnResetKatalogDefault");
    if (btnResetKatalog) {
        btnResetKatalog.addEventListener("click", function () {
            localStorage.removeItem(STORAGE_KEYS.CATALOG);
            renderTabelStokKatalog();
            tampilkanAlertInline("alertStokBaru", "Katalog berhasil dikembalikan ke data awal pada data.js.", "info");
        });
    }
}

/* ==========================================================================
   7. LOGIKA HALAMAN 4: PEMESANAN / CHECKOUT (checkout.html)
   ========================================================================== */
function renderTabelKeranjangCheckout() {
    const tbody = document.getElementById("tbodyKeranjangPesanan");
    if (!tbody) return;

    const keranjang = ambilDataKeranjang();
    tbody.innerHTML = "";

    let subtotalBuku = 0;

    if (keranjang.length === 0) {
        const trKosong = document.createElement("tr");
        trKosong.innerHTML = `<td colspan="6" style="text-align:center; padding: 1.75rem; color:#57606a;">Belum ada buku dalam daftar pesanan. Silakan pilih buku pada formulir di atas.</td>`;
        tbody.appendChild(trKosong);
    } else {
        keranjang.forEach(function (item, idx) {
            const totalBaris = item.hargaSatuan * item.jumlah;
            subtotalBuku += totalBaris;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><strong>${item.kodeBarang}</strong></td>
                <td>${item.namaBarang}</td>
                <td>${formatAngkaKeRupiah(item.hargaSatuan)}</td>
                <td style="width: 150px;">
                    <div style="display:flex; align-items:center; gap:0.35rem;">
                        <button type="button" class="btn btn-outline btn-sm" onclick="ubahJumlahItemCheckout('${item.kodeBarang}', -1)">-</button>
                        <input type="number" min="1" value="${item.jumlah}" style="width:64px; text-align:center; padding:0.3rem;" onchange="setJumlahItemCheckout('${item.kodeBarang}', this.value)">
                        <button type="button" class="btn btn-outline btn-sm" onclick="ubahJumlahItemCheckout('${item.kodeBarang}', 1)">+</button>
                    </div>
                </td>
                <td><strong>${formatAngkaKeRupiah(totalBaris)}</strong></td>
                <td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="hapusItemCheckout('${item.kodeBarang}')">Hapus</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    const selectEkspedisi = document.getElementById("pemesanEkspedisi");
    let ongkir = 0;
    if (selectEkspedisi && keranjang.length > 0) {
        const opsiTerpilih = selectEkspedisi.options[selectEkspedisi.selectedIndex];
        ongkir = parseInt(opsiTerpilih.getAttribute("data-ongkir") || "0", 10);
    }

    const grandTotal = subtotalBuku + ongkir;

    const elSubtotal = document.getElementById("ringkasanSubtotal");
    const elOngkir = document.getElementById("ringkasanOngkir");
    const elGrandTotal = document.getElementById("ringkasanGrandTotal");

    if (elSubtotal) elSubtotal.textContent = formatAngkaKeRupiah(subtotalBuku);
    if (elOngkir) elOngkir.textContent = formatAngkaKeRupiah(ongkir);
    if (elGrandTotal) elGrandTotal.textContent = formatAngkaKeRupiah(grandTotal);
}

function ubahJumlahItemCheckout(kodeBarang, delta) {
    const keranjang = ambilDataKeranjang();
    const target = keranjang.find(function (i) {
        return i.kodeBarang === kodeBarang;
    });
    if (!target) return;

    target.jumlah += delta;
    if (target.jumlah <= 0) {
        hapusItemCheckout(kodeBarang);
        return;
    }
    simpanStorage(STORAGE_KEYS.CART, keranjang);
    renderTabelKeranjangCheckout();
}

function setJumlahItemCheckout(kodeBarang, nilaiBaru) {
    const angka = parseInt(nilaiBaru, 10);
    if (isNaN(angka) || angka <= 0) {
        hapusItemCheckout(kodeBarang);
        return;
    }
    const keranjang = ambilDataKeranjang();
    const target = keranjang.find(function (i) {
        return i.kodeBarang === kodeBarang;
    });
    if (target) {
        target.jumlah = angka;
        simpanStorage(STORAGE_KEYS.CART, keranjang);
        renderTabelKeranjangCheckout();
    }
}

function hapusItemCheckout(kodeBarang) {
    const keranjang = ambilDataKeranjang().filter(function (i) {
        return i.kodeBarang !== kodeBarang;
    });
    simpanStorage(STORAGE_KEYS.CART, keranjang);
    renderTabelKeranjangCheckout();
}

function inisialisasiHalamanCheckout() {
    const selectBuku = document.getElementById("pilihBukuCheckout");
    if (!selectBuku) return;

    const katalog = ambilDaftarKatalog();
    selectBuku.innerHTML = "";
    katalog.forEach(function (buku) {
        const opt = document.createElement("option");
        opt.value = buku.kodeBarang;
        opt.textContent = `[${buku.kodeBarang}] ${buku.namaBarang} — ${buku.harga} (Stok: ${buku.stok})`;
        selectBuku.appendChild(opt);
    });

    // Pre-fill nama & email pemesan dari user yang sedang login
    const userAktif = bacaStorage(STORAGE_KEYS.ACTIVE_USER, null);
    if (userAktif) {
        const inNama = document.getElementById("pemesanNama");
        const inEmail = document.getElementById("pemesanEmail");
        if (inNama && !inNama.value) inNama.value = userAktif.nama;
        if (inEmail && !inEmail.value) inEmail.value = userAktif.email;
    }

    renderTabelKeranjangCheckout();

    // Event tambah item ke daftar pemesanan
    const formTambahItem = document.getElementById("formTambahItemPesanan");
    if (formTambahItem) {
        formTambahItem.addEventListener("submit", function (e) {
            e.preventDefault();
            const kodePilih = selectBuku.value;
            const qtyInput = parseInt(document.getElementById("jumlahBukuCheckout").value, 10) || 1;
            const bukuData = katalog.find(function (b) {
                return b.kodeBarang === kodePilih;
            });

            if (!bukuData || qtyInput <= 0) return;

            const keranjang = ambilDataKeranjang();
            const sudahAda = keranjang.find(function (item) {
                return item.kodeBarang === kodePilih;
            });

            if (sudahAda) {
                sudahAda.jumlah += qtyInput;
            } else {
                keranjang.push({
                    kodeBarang: bukuData.kodeBarang,
                    namaBarang: bukuData.namaBarang,
                    jenisBarang: bukuData.jenisBarang,
                    hargaSatuan: parseRupiahKeAngka(bukuData.harga),
                    jumlah: qtyInput
                });
            }

            simpanStorage(STORAGE_KEYS.CART, keranjang);
            renderTabelKeranjangCheckout();
            tampilkanAlertInline("alertCheckoutBox", `Buku "${bukuData.namaBarang}" ditambahkan/diperbarui dalam daftar pesanan.`, "success");
        });
    }

    const selectEkspedisi = document.getElementById("pemesanEkspedisi");
    if (selectEkspedisi) {
        selectEkspedisi.addEventListener("change", renderTabelKeranjangCheckout);
    }

    // Event Submit Checkout & Pembayaran
    const formCheckout = document.getElementById("formDataPemesanCheckout");
    if (formCheckout) {
        formCheckout.addEventListener("submit", function (e) {
            e.preventDefault();
            const keranjang = ambilDataKeranjang();
            if (keranjang.length === 0) {
                tampilkanAlertInline("alertCheckoutBox", "Daftar pesanan masih kosong. Tambahkan minimal 1 buku terlebih dahulu.", "error");
                return;
            }

            const nama = (document.getElementById("pemesanNama").value || "").trim();
            const email = (document.getElementById("pemesanEmail").value || "").trim();
            const telepon = (document.getElementById("pemesanTelepon").value || "").trim();
            const alamat = (document.getElementById("pemesanAlamat").value || "").trim();
            const ekspedisiEl = document.getElementById("pemesanEkspedisi");
            const ekspedisiVal = ekspedisiEl.value;
            const paketKode = ekspedisiEl.options[ekspedisiEl.selectedIndex].getAttribute("data-paket") || "REG01";
            const ongkir = parseInt(ekspedisiEl.options[ekspedisiEl.selectedIndex].getAttribute("data-ongkir") || "0", 10);
            const metodeBayar = document.getElementById("pemesanMetodeBayar").value;

            if (!nama || !email || !telepon || !alamat) {
                tampilkanAlertInline("alertCheckoutBox", "Mohon lengkapi seluruh data informasi pemesan dan alamat pengiriman.", "error");
                return;
            }

            const subtotal = keranjang.reduce(function (acc, item) {
                return acc + item.hargaSatuan * item.jumlah;
            }, 0);
            const totalAkhir = formatAngkaKeRupiah(subtotal + ongkir);

            // Buat Nomor DO otomatis yang bisa langsung dilacak di tracking.html
            const trackingSemua = ambilDataTracking();
            const nomorDOBaru = String(20230014 + Object.keys(trackingSemua).length - 2);
            const tanggalHariIni = new Date().toISOString().slice(0, 10);

            trackingSemua[nomorDOBaru] = {
                nomorDO: nomorDOBaru,
                nama: nama,
                status: "Dalam Perjalanan",
                ekspedisi: ekspedisiVal,
                tanggalKirim: tanggalHariIni,
                paket: paketKode,
                total: totalAkhir,
                perjalanan: [
                    {
                        waktu: `${tanggalHariIni} 09:00:00`,
                        keterangan: "Pesanan buku telah diverifikasi dan dikemas oleh Gudang Pusat Lentera Pustaka"
                    },
                    {
                        waktu: `${tanggalHariIni} 11:30:00`,
                        keterangan: `Diserahkan ke kurir ${ekspedisiVal} (Kode Paket: ${paketKode})`
                    },
                    {
                        waktu: `${tanggalHariIni} 14:15:00`,
                        keterangan: `Dalam perjalanan menuju alamat tujuan: ${alamat}`
                    }
                ]
            };
            simpanStorage(STORAGE_KEYS.TRACKING, trackingSemua);

            // Tambahkan ke Riwayat Transaksi
            const riwayat = ambilRiwayatTransaksi();
            const ringkasanBuku = keranjang
                .map(function (i) {
                    return `${i.namaBarang} (${i.jumlah} eks)`;
                })
                .join(", ");

            riwayat.unshift({
                idTransaksi: "TRX-" + Date.now().toString().slice(-6),
                nomorDO: nomorDOBaru,
                tanggal: tanggalHariIni,
                namaPemesan: nama,
                emailPemesan: email,
                itemRingkasan: ringkasanBuku,
                metodeBayar: metodeBayar,
                ekspedisi: `${ekspedisiVal} (${paketKode})`,
                totalBayar: totalAkhir,
                statusBayar: "Lunas",
                statusKirim: "Dalam Perjalanan"
            });
            simpanStorage(STORAGE_KEYS.HISTORY, riwayat);

            // Tampilkan di Modal Bukti Pemesanan
            const isiInvoice = document.getElementById("isiModalBuktiCheckout");
            if (isiInvoice) {
                isiInvoice.innerHTML = `
                    <div style="background:#e9f5ee; padding:1rem; border-radius:8px; margin-bottom:1rem; border:1px solid #86efac;">
                        <p style="font-weight:700; color:#1b4332; margin-bottom:0.25rem;">Pemesanan Berhasil Diproses!</p>
                        <p style="font-size:0.86rem;">Simpan Nomor Delivery Order (DO) Anda untuk pelacakan pengiriman:</p>
                        <p style="font-size:1.35rem; font-weight:800; color:#b45309; margin-top:0.3rem;">Nomor DO: ${nomorDOBaru}</p>
                    </div>
                    <table class="data-table" style="margin-bottom:1rem;">
                        <tbody>
                            <tr><th>Nama Pemesan</th><td>${nama} (${email})</td></tr>
                            <tr><th>Telepon & Alamat</th><td>${telepon} — ${alamat}</td></tr>
                            <tr><th>Ringkasan Buku</th><td>${ringkasanBuku}</td></tr>
                            <tr><th>Ekspedisi & Paket</th><td>${ekspedisiVal} — Paket ${paketKode}</td></tr>
                            <tr><th>Metode Pembayaran</th><td>${metodeBayar}</td></tr>
                            <tr><th>Total Pembayaran</th><td><strong style="color:#1b4332; font-size:1.05rem;">${totalAkhir}</strong></td></tr>
                        </tbody>
                    </table>
                    <div style="text-align:right;">
                        <a href="tracking.html?do=${nomorDOBaru}" class="btn btn-primary">Lacak Nomor DO ${nomorDOBaru} Sekarang</a>
                    </div>
                `;
                bukaModal("modalBuktiCheckout");
            }
        });
    }
}

/* ==========================================================================
   8. LOGIKA HALAMAN 5: TRACKING PENGIRIMAN (tracking.html)
   ========================================================================== */
function tampilkanHasilTrackingDO(nomorInput) {
    const nomorBersih = (nomorInput || "").trim();
    const panelHasil = document.getElementById("panelHasilTracking");
    const alertTracking = document.getElementById("alertTrackingBox");

    if (!nomorBersih) {
        if (panelHasil) panelHasil.style.display = "none";
        tampilkanAlertInline("alertTrackingBox", "Silakan masukkan Nomor Delivery Order terlebih dahulu (contoh: 20230012 atau 20230013).", "error");
        return;
    }

    const semuaTracking = ambilDataTracking();
    const dataDO = semuaTracking[nomorBersih];

    if (!dataDO) {
        if (panelHasil) panelHasil.style.display = "none";
        tampilkanAlertInline(
            "alertTrackingBox",
            `Nomor Delivery Order "${nomorBersih}" tidak ditemukan. Coba gunakan nomor DO tersedia seperti 20230012 atau 20230013.`,
            "error"
        );
        return;
    }

    sembunyikanAlertInline("alertTrackingBox");
    if (panelHasil) panelHasil.style.display = "block";

    // Isi detail informasi utama sesuai ketentuan soal
    document.getElementById("trackNomorDO").textContent = dataDO.nomorDO;
    document.getElementById("trackNamaPemesan").textContent = dataDO.nama;
    document.getElementById("trackEkspedisi").textContent = dataDO.ekspedisi;
    document.getElementById("trackTanggalKirim").textContent = dataDO.tanggalKirim;
    document.getElementById("trackJenisPaket").textContent = dataDO.paket;
    document.getElementById("trackTotalBayar").textContent = dataDO.total;

    const badgeStatus = document.getElementById("trackStatusBadge");
    const progressFill = document.getElementById("trackProgressBarFill");
    const stepNodes = [
        document.getElementById("stepNode1"),
        document.getElementById("stepNode2"),
        document.getElementById("stepNode3"),
        document.getElementById("stepNode4")
    ];

    stepNodes.forEach(function (node) {
        if (node) node.className = "step-node";
    });

    const statusLower = (dataDO.status || "").toLowerCase();
    let persentase = 65;
    if (statusLower.includes("dikirim") || statusLower.includes("selesai")) {
        persentase = 100;
        if (badgeStatus) {
            badgeStatus.className = "badge badge-success";
            badgeStatus.textContent = dataDO.status + " (Selesai Antar)";
        }
        stepNodes.forEach(function (node) {
            if (node) node.classList.add("completed");
        });
    } else {
        persentase = 65;
        if (badgeStatus) {
            badgeStatus.className = "badge badge-warning";
            badgeStatus.textContent = dataDO.status;
        }
        if (stepNodes[0]) stepNodes[0].classList.add("completed");
        if (stepNodes[1]) stepNodes[1].classList.add("completed");
        if (stepNodes[2]) stepNodes[2].classList.add("active");
    }

    if (progressFill) {
        progressFill.style.width = persentase + "%";
    }

    // Render riwayat perjalanan paket
    const listPerjalanan = document.getElementById("listRiwayatPerjalanan");
    if (listPerjalanan) {
        listPerjalanan.innerHTML = "";
        (dataDO.perjalanan || []).forEach(function (titik) {
            const li = document.createElement("li");
            li.className = "timeline-item";
            li.innerHTML = `
                <div class="timeline-time">${titik.waktu}</div>
                <div class="timeline-desc">${titik.keterangan}</div>
            `;
            listPerjalanan.appendChild(li);
        });
    }
}

function pilihCepatNomorDO(nomorDO) {
    const inputDO = document.getElementById("inputNomorDO");
    if (inputDO) {
        inputDO.value = nomorDO;
        tampilkanHasilTrackingDO(nomorDO);
    }
}

function inisialisasiHalamanTracking() {
    const formTracking = document.getElementById("formCariTracking");
    if (!formTracking) return;

    // Render tombol daftar Nomor DO yang tersedia agar mudah diuji
    const wadahTombolDO = document.getElementById("daftarTombolDO");
    if (wadahTombolDO) {
        const semuaTracking = ambilDataTracking();
        wadahTombolDO.innerHTML = "";
        Object.keys(semuaTracking).forEach(function (noDO) {
            const item = semuaTracking[noDO];
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-outline btn-sm";
            btn.textContent = `DO #${noDO} (${item.nama} - ${item.status})`;
            btn.addEventListener("click", function () {
                pilihCepatNomorDO(noDO);
            });
            wadahTombolDO.appendChild(btn);
        });
    }

    formTracking.addEventListener("submit", function (e) {
        e.preventDefault();
        const nilaiInput = document.getElementById("inputNomorDO").value;
        tampilkanHasilTrackingDO(nilaiInput);
    });

    // Cek parameter ?do= pada URL jika diklik dari halaman Checkout atau Dashboard
    const params = new URLSearchParams(window.location.search);
    const doParam = params.get("do");
    if (doParam) {
        pilihCepatNomorDO(doParam);
    } else {
        pilihCepatNomorDO("20230012");
    }
}

/* ==========================================================================
   9. INISIALISASI OTOMATIS SAAT DOM SELESAI DIMUAT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", function () {
    muatInfoPenggunaHeader();
    inisialisasiHalamanLogin();
    inisialisasiHalamanDashboard();
    inisialisasiHalamanStok();
    inisialisasiHalamanCheckout();
    inisialisasiHalamanTracking();

    // Tutup modal jika area backdrop diklik
    document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
        backdrop.addEventListener("click", function (e) {
            if (e.target === backdrop) {
                backdrop.classList.remove("show");
            }
        });
    });
});

```
