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

    // ESTE BLOQUE INSERTARÁ LAS ARMAS AUTOMÁTICAMENTE
    const querySQL = `
        INSERT INTO subfusiles (nombre, imagen, dano, cadencia, movilidad, alcance) 
        VALUES
        ('HMR-9', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/hmr-9.jpg', 85, 90, 80, 60),
        ('RAM-9', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/ram-9.jpg', 80, 95, 85, 55),
        ('AMR9', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/amr9.jpg', 75, 88, 78, 65),
        ('Striker', 'https://www.gamesatlas.com/images/jocu/mw3/weapons/striker.jpg', 70, 75, 82, 70)
        ON CONFLICT DO NOTHING;
    `;

    pool.query(querySQL)
        .then(() => console.log("¡Armas insertadas o ya existentes!"))
        .catch(err => console.error("Error al insertar armas:", err));
});