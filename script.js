document.addEventListener("DOMContentLoaded", function() {
    const btnManualPenyiraman = document.getElementById("btn-manual-penyiraman");
    const btnManualPestisida = document.getElementById("btn-manual-pestisida");
    const btnSetJadwal = document.getElementById("btn-set-jadwal");
    const btnKeluar = document.getElementById("btn-keluar");

    // Fungsi untuk mengirim permintaan HTTP
    function sendRequest(url, method, body) {
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Sesuaikan dengan jenis konten yang diharapkan oleh backend Anda
            },
            body: body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim permintaan.');
        });
    }

    // Event listener untuk kontrol penyiraman air manual/otomatis
    btnManualPenyiraman.addEventListener("click", function() {
        const statusPenyiraman = document.getElementById("status-penyiraman").textContent;
        const newStatus = statusPenyiraman === "Otomatis" ? "manual" : "auto";
        const body = "watering=" + newStatus;
        
        sendRequest('/control', 'POST', body)
            .then(data => {
                if (newStatus === "manual") {
                    alert("Lanjutkan untuk penyiraman air menjadi manual!");
                } else {
                    alert("Lanjutkan untuk penyiraman air menjadi otomatis!");
                }
            });
    });

    // Event listener untuk kontrol penyemprotan pestisida manual/otomatis
    btnManualPestisida.addEventListener("click", function() {
        const statusPestisida = document.getElementById("status-pestisida").textContent;
        const newStatus = statusPestisida === "Otomatis" ? "manual" : "auto";
        const body = "pesticide=" + newStatus;

        sendRequest('/control', 'POST', body)
            .then(data => {
                if (newStatus === "manual") {
                    alert("Lanjutkan untuk penyemprotan pestisida menjadi manual!");
                } else {
                    alert("Lanjutkan untuk penyemprotan pestisida menjadi otomatis!");
                }
            });
    });

    // Event listener untuk tombol "Atur Jadwal"
    btnSetJadwal.addEventListener("click", function() {
        // Di sini Anda bisa menambahkan logika untuk mengatur jadwal penyemprotan pestisida
        alert("Jadwal penyemprotan pestisida telah diatur!");
    });

    // Event listener untuk tombol "Keluar"
    btnKeluar.addEventListener("click", function() {
        // Di sini Anda bisa menambahkan logika untuk keluar dari sistem monitoring
        alert("Anda telah keluar dari sistem monitoring.");
    });
});
