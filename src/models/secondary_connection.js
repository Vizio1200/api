const { Pool } = require('pg');
require('dotenv').config();

const pool_audit = new Pool({
    connectionString: process.env.DATABASE_URL_SECONDARY || process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Requerido para conexiones seguras en Render/Heroku
    }
});

pool_audit.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Estado DB Secundaria: Fuera de línea o error de enlace:', err.stack);
    } else {
        console.log(' Enlace exitoso con DB Secundaria (Mirroring activa) en:', res.rows[0].now);
    }
});

module.exports = pool_audit;