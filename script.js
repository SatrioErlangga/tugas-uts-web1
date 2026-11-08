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
