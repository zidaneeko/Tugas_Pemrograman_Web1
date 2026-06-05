let mahasiswa = JSON.parse(localStorage.getItem("mahasiswa")) || [];
let editIndex = -1;

/* =========================
   DATA RELASI FAKULTAS → JURUSAN
========================= */
const dataJurusan = {
    "Fakultas Teknik": [
        "Informatika",
        "Teknik Elektro",
        "Teknik Mesin",
        "Teknik Industri",
        "Arsitektur"
    ],
    "Fakultas Ilmu Komputer": [
        "Sistem Informasi",
        "Informatika",
        "Teknik Komputer",
        "Data Science"
    ],
    "Fakultas Ekonomi dan Bisnis": [
        "Manajemen",
        "Akuntansi",
        "Ekonomi Pembangunan"
    ],
    "Fakultas Hukum": ["Ilmu Hukum"],
    "Fakultas Psikologi": ["Psikologi"],
    "Fakultas Ilmu Sosial dan Politik": [
        "Ilmu Komunikasi",
        "Hubungan Internasional",
        "Administrasi Publik"
    ],
    "Fakultas Desain": [
        "DKV",
        "Desain Interior",
        "Desain Produk"
    ],
    "Fakultas Kedokteran": [
        "Kedokteran Umum",
        "Kedokteran Gigi"
    ],
    "Fakultas Pertanian": [
        "Agroteknologi",
        "Agribisnis"
    ]
};

/* =========================
   UPDATE JURUSAN 
========================= */
function updateJurusan(){
    let fakultas = document.getElementById("fakultas").value;
    let jurusan = document.getElementById("jurusan");

    jurusan.innerHTML = `<option value="">-- Pilih Jurusan --</option>`;

    if(dataJurusan[fakultas]){
        dataJurusan[fakultas].forEach(j=>{
            let option = document.createElement("option");
            option.value = j;
            option.textContent = j;
            jurusan.appendChild(option);
        });
    }
}

/* =========================
   SIMPAN LOCALSTORAGE
========================= */
function save(){
    localStorage.setItem("mahasiswa", JSON.stringify(mahasiswa));
}

/* =========================
   TAMBAH DATA
========================= */
function addData(){

    let nim = document.getElementById("nim").value;
    let nama = document.getElementById("nama").value;
    let fakultas = document.getElementById("fakultas").value;
    let jurusan = document.getElementById("jurusan").value;

    if(!nim || !nama || !fakultas || !jurusan){
        alert("Lengkapi semua data!");
        return;
    }

    mahasiswa.push({
        nim,
        nama,
        fakultas,
        jurusan,
        waktu: new Date().toLocaleString()
    });

    save();
    render();
    clear();
}

/* =========================
   RENDER TABLE
========================= */
function render(){

    let table = document.getElementById("tableData");
    table.innerHTML = "";

    mahasiswa.forEach((m,i)=>{
        table.innerHTML += `
        <tr>
            <td>${m.nim}</td>
            <td>${m.nama}</td>
            <td>${m.fakultas}</td>
            <td>${m.jurusan}</td>
            <td>${m.waktu}</td>
            <td>
                <button onclick="edit(${i})">Edit</button>
                <button onclick="hapus(${i})">Hapus</button>
            </td>
        </tr>
        `;
    });
}

/* =========================
   DELETE
========================= */
function hapus(i){
    mahasiswa.splice(i,1);
    save();
    render();
}

/* =========================
   EDIT
========================= */
function edit(i){
    let m = mahasiswa[i];

    document.getElementById("nim").value = m.nim;
    document.getElementById("nama").value = m.nama;
    document.getElementById("fakultas").value = m.fakultas;

    updateJurusan(); // penting agar jurusan muncul

    document.getElementById("jurusan").value = m.jurusan;

    editIndex = i;
}

/* =========================
   UPDATE
========================= */
function updateData(){

    if(editIndex === -1){
        alert("Pilih data dulu!");
        return;
    }

    mahasiswa[editIndex] = {
        nim: document.getElementById("nim").value,
        nama: document.getElementById("nama").value,
        fakultas: document.getElementById("fakultas").value,
        jurusan: document.getElementById("jurusan").value,
        waktu: new Date().toLocaleString()
    };

    save();
    render();
    clear();
    editIndex = -1;
}

/* =========================
   CLEAR FORM
========================= */
function clear(){
    document.getElementById("nim").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("fakultas").value = "";
    document.getElementById("jurusan").innerHTML =
        `<option value="">-- Pilih Fakultas dulu --</option>`;
}

/* INIT */
render();
