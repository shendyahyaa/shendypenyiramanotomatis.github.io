const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/api/moisture', (req, res) => {
    // Contoh data kelembaban tanah
    const moistureData = {
        moisture: 60, // Ganti dengan nilai kelembaban tanah aktual
        soilStatus: 'Sedang', // Ganti dengan status tanah aktual
        wateringToday: 2 // Ganti dengan jumlah penyiraman hari ini
    };

    res.json(moistureData);
});

app.post('/api/watering', (req, res) => {
    const mode = req.body.mode;

    // Validasi mode
    if (mode !== 'manual' && mode !== 'auto') {
        return res.status(400).send('Mode penyiraman tidak valid');
    }

    // Lakukan operasi berdasarkan mode (misalnya, mengirimkan perintah ke NodeMCU)

    res.send(`Penyiraman air diatur ke mode ${mode}`);
});

app.post('/api/pesticide', (req, res) => {
    const mode = req.body.mode;

    // Validasi mode
    if (mode !== 'manual' && mode !== 'auto') {
        return res.status(400).send('Mode penyemprotan pestisida tidak valid');
    }

    // Lakukan operasi berdasarkan mode (misalnya, mengirimkan perintah ke NodeMCU)

    res.send(`Penyemprotan pestisida diatur ke mode ${mode}`);
});

// Middleware untuk penanganan kesalahan
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Terjadi kesalahan dalam server');
});

// Middleware untuk menangani rute yang tidak ditemukan
app.use((req, res, next) => {
    res.status(404).send('Halaman tidak ditemukan');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
