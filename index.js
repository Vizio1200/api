const express = require('express');
const cors = require('cors');
const pool = require('./src/models/connection');

const app = express();
app.use(cors());
app.use(express.json());

// --- ESTA FUNCIÓN CREARÁ LA TABLA Y LAS ARMAS POR TI ---
const inicializarDB = async () => {
    // --- ESTA ES LA FORMA CORRECTA PARA ACTUALIZAR ---
    try {
        // 1. Borramos todo siempre para actualizar los links
        await pool.query('DELETE FROM subfusiles');

        // 2. Insertamos con los nuevos links que sí funcionan
        await pool.query(`
        INSERT INTO subfusiles (nombre, imagen, dano, cadencia, movilidad, alcance) VALUES
        ('HMR-9', 'https://i.postimg.cc/mrh9888y/hmr9.jpg', 85, 90, 80, 60),
        ('RAM-9', 'https://i.postimg.cc/85M6XmS7/ram9.jpg', 80, 95, 85, 55),
        ('AMR9', 'https://i.postimg.cc/3R90fS7B/amr9.jpg', 75, 88, 78, 65),
        ('Striker', 'https://i.postimg.cc/6pXm4z9v/striker.jpg', 70, 75, 82, 70);
    `);

        console.log("✅ Base de datos actualizada con imágenes nuevas.");
    } catch (err) {
        console.error("❌ Error al actualizar:", err.message);
    }
};

app.get('/api/subfusiles', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM subfusiles ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
    await inicializarDB();
});