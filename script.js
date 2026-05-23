function hitungTotal(){

    // mengambil nilai input
    let hargaBarang = parseInt(
        document.getElementById("hargaBarang").value
    );

    let jumlahBarang = parseInt(
        document.getElementById("jumlahBarang").value
    );

    // validasi input
    if(isNaN(hargaBarang) || isNaN(jumlahBarang)){

        alert("Harap isi semua input!");

        return;
    }

    // operator aritmatika
    let totalHarga = hargaBarang * jumlahBarang;

    // tambah pajak
    totalHarga += 5000;

    // operator pembanding
    let dapatDiskon = totalHarga > 100000;

    // hitung diskon
    let diskon = 0;

    if(dapatDiskon){
        diskon = totalHarga * 0.1;
    }

    let totalBayar = totalHarga - diskon;

    // tampilkan hasil
    document.getElementById("harga").innerHTML =
        "Harga Barang : Rp " + hargaBarang.toLocaleString();

    document.getElementById("jumlah").innerHTML =
        "Jumlah Barang : " + jumlahBarang;

    document.getElementById("total").innerHTML =
        "Total Harga + Pajak : Rp " + totalHarga.toLocaleString();

    document.getElementById("diskon").innerHTML =
        "Diskon : Rp " + diskon.toLocaleString();

    // pengkondisian
    if(dapatDiskon){

        document.getElementById("status").innerHTML =
            "🎉 Selamat! Anda mendapatkan diskon 10%";

    }else{

        document.getElementById("status").innerHTML =
            "❌ Anda belum mendapatkan diskon";

    }
}