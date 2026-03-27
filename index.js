const express = require('express');
const cors = require('cors');
const pool = require('./src/models/connection');

const app = express();
app.use(cors());
app.use(express.json());

// --- ESTA FUNCIÓN CREARÁ LA TABLA Y LAS ARMAS POR TI ---
const inicializarDB = async () => {
    try {
        // Crear tabla
        await pool.query(`
            CREATE TABLE IF NOT EXISTS subfusiles (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                imagen TEXT,
                dano INTEGER DEFAULT 0,
                cadencia INTEGER DEFAULT 0,
                movilidad INTEGER DEFAULT 0,
                alcance INTEGER DEFAULT 0
            );
        `);

        // Insertar datos solo si está vacía
        const res = await pool.query('SELECT COUNT(*) FROM subfusiles');
        if (res.rows[0].count == 0) {
            await pool.query(`
                INSERT INTO subfusiles (nombre, imagen, dano, cadencia, movilidad, alcance) VALUES
                ('HMR-9', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/hmr-9.jpg', 85, 90, 80, 60),
                ('RAM-9', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/ram-9.jpg', 80, 95, 85, 55),
                ('AMR9', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/amr9.jpg', 75, 88, 78, 65),
                ('Striker', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/striker.jpg', 70, 75, 82, 70);
            `);
            console.log("✅ Base de datos lista con armas.");
        }
    } catch (err) {
        console.error("❌ Error inicializando:", err.message);
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