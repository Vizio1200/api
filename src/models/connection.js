const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Esto permite la conexión segura que requiere Render
    }
});

// Opcional: Para saber si la base de datos conectó bien
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
    } else {
        console.log('Conexión exitosa a la base de datos en:', res.rows[0].now);
    }
});

module.exports = pool;