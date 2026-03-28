const express = require('express');
const cors = require('cors');
const pool = require('./src/models/connection');

const app = express();
app.use(cors());
app.use(express.json());

const inicializarDB = async () => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS usuarios (id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, password TEXT NOT NULL);');
        const userCheck = await pool.query('SELECT * FROM usuarios WHERE username = $1', ['admin']);
        if (userCheck.rows.length === 0) await pool.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', ['admin', '123']);

        await pool.query('CREATE TABLE IF NOT EXISTS subfusiles (id SERIAL PRIMARY KEY, nombre VARCHAR(100) NOT NULL, imagen TEXT, dano INTEGER DEFAULT 0, cadencia INTEGER DEFAULT 0);');
        await pool.query('CREATE TABLE IF NOT EXISTS fusiles (id SERIAL PRIMARY KEY, nombre VARCHAR(100) NOT NULL, imagen TEXT, dano INTEGER DEFAULT 0, cadencia INTEGER DEFAULT 0);');

        const checkSub = await pool.query('SELECT COUNT(*) FROM subfusiles');
        if (checkSub.rows[0].count == 0) {
            await pool.query("INSERT INTO subfusiles (nombre, imagen, dano, cadencia) VALUES ('HMR-9', 'https://i.postimg.cc/mrh9888y/hmr9.jpg', 85, 90), ('RAM-9', 'https://i.postimg.cc/85M6XmS7/ram9.jpg', 80, 95), ('AMR9', 'https://i.postimg.cc/3R90fS7B/amr9.jpg', 75, 88), ('Striker', 'https://i.postimg.cc/6pXm4z9v/striker.jpg', 70, 75);");
        }

        const checkFus = await pool.query('SELECT COUNT(*) FROM fusiles');
        if (checkFus.rows[0].count == 0) {
            await pool.query("INSERT INTO fusiles (nombre, imagen, dano, cadencia) VALUES ('MCW', 'https://i.postimg.cc/mrh9888y/hmr9.jpg', 85, 70), ('SVA 545', 'https://i.postimg.cc/85M6XmS7/ram9.jpg', 80, 85), ('MTZ-556', 'https://i.postimg.cc/3R90fS7B/amr9.jpg', 75, 90), ('Holger 556', 'https://i.postimg.cc/6pXm4z9v/striker.jpg', 88, 65), ('DG-58', 'https://i.postimg.cc/mrh9888y/hmr9.jpg', 92, 60);");
        }
        console.log("✅ Base de datos sincronizada.");
    } catch (err) { console.error(err); }
};

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM usuarios WHERE username = $1 AND password = $2', [username, password]);
    if (user.rows.length > 0) res.json({ success: true, user: user.rows[0].username });
    else res.status(401).json({ success: false });
});

// Rutas SMG
app.get('/api/subfusiles', async (req, res) => { const r = await pool.query('SELECT * FROM subfusiles ORDER BY id ASC'); res.json(r.rows); });
app.post('/api/subfusiles', async (req, res) => { const { nombre, imagen, dano, cadencia } = req.body; await pool.query('INSERT INTO subfusiles (nombre, imagen, dano, cadencia) VALUES ($1, $2, $3, $4)', [nombre, imagen, dano, cadencia]); res.json({ success: true }); });
app.post('/api/subfusiles/eliminar', async (req, res) => { await pool.query('DELETE FROM subfusiles WHERE id = $1', [req.body.id]); res.json({ success: true }); });

// Rutas AR
app.get('/api/fusiles', async (req, res) => { const r = await pool.query('SELECT * FROM fusiles ORDER BY id ASC'); res.json(r.rows); });
app.post('/api/fusiles', async (req, res) => { const { nombre, imagen, dano, cadencia } = req.body; await pool.query('INSERT INTO fusiles (nombre, imagen, dano, cadencia) VALUES ($1, $2, $3, $4)', [nombre, imagen, dano, cadencia]); res.json({ success: true }); });
app.post('/api/fusiles/eliminar', async (req, res) => { await pool.query('DELETE FROM fusiles WHERE id = $1', [req.body.id]); res.json({ success: true }); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => { await inicializarDB(); console.log(`🚀 Puerto ${PORT}`); });