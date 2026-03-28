const express = require('express');
const cors = require('cors');
const pool = require('./src/models/connection');

const app = express();
app.use(cors());
app.use(express.json());

// --- FUNCIÓN DE INICIALIZACIÓN DE BASE DE DATOS ---
const inicializarDB = async () => {
    try {
        // 1. Crear tabla de usuarios para el Login
        await pool.query(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `);

        // 2. Crear usuario Admin por defecto (admin / 123)
        const userCheck = await pool.query('SELECT * FROM usuarios WHERE username = $1', ['admin']);
        if (userCheck.rows.length === 0) {
            await pool.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', ['admin', '123']);
            console.log("👤 Usuario Admin creado: admin / 123");
        }

        // 3. Crear tabla de subfusiles
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

        // 4. Limpiar y actualizar armas con imágenes funcionales
        await pool.query('DELETE FROM subfusiles');
        await pool.query(`
            INSERT INTO subfusiles (nombre, imagen, dano, cadencia, movilidad, alcance) VALUES
            ('HMR-9', 'https://i.postimg.cc/mrh9888y/hmr9.jpg', 85, 90, 80, 60),
            ('RAM-9', 'https://i.postimg.cc/85M6XmS7/ram9.jpg', 80, 95, 85, 55),
            ('AMR9', 'https://i.postimg.cc/3R90fS7B/amr9.jpg', 75, 88, 78, 65),
            ('Striker', 'https://i.postimg.cc/6pXm4z9v/striker.jpg', 70, 75, 82, 70);
        `);

        console.log("✅ Base de datos lista: Usuario Admin y Armas actualizadas.");
    } catch (err) {
        console.error("❌ Error en inicializarDB:", err.message);
    }
};

// --- RUTAS ---

// Obtener todas las armas para la galería
app.get('/api/subfusiles', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM subfusiles ORDER BY id ASC');
        res.json(resultado.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta de Login para validar al admin
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pool.query('SELECT * FROM usuarios WHERE username = $1 AND password = $2', [username, password]);
        if (user.rows.length > 0) {
            res.json({ success: true, user: user.rows[0].username });
        } else {
            res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta de Registro (Opcional, por si quieres crear más usuarios)
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await pool.query('INSERT INTO usuarios (username, password) VALUES ($1, $2)', [username, password]);
        res.json({ success: true, message: "Usuario creado con éxito" });
    } catch (err) {
        res.status(500).json({ success: false, error: "El usuario ya existe" });
    }
});

// --- ARRANCAR SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`🚀 Servidor volando en puerto ${PORT}`);
    await inicializarDB();
});