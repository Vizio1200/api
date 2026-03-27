const express = require('express');
const cors = require('cors');
const pool = require('./src/models/connection'); // Importamos la conexión

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener los subfusiles
app.get('/api/subfusiles', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM subfusiles');
        res.json(resultado.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor volando en el puerto ${PORT}`);
}); 