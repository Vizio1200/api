const { Pool } = require('pg');

// Esta es tu URL externa de Render
const connectionString = "postgresql://warzone_db_user:ay0uyRcRNvZuMPo5NcR5fRrzfvjVYxRx@dpg-d73a9fndiees73b2192g-a.ohio-postgres.render.com/warzone_db";

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // <--- ESTO ES VITAL EN RENDER
    }
});
module.exports = pool;

// Función "Mágica" que crea todo sola
const setupDB = async () => {
    try {
        console.log("⏳ Configurando base de datos...");
        await pool.query(`
      CREATE TABLE IF NOT EXISTS subfusiles (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        descripcion TEXT,
        imagen TEXT
      );
    `);

        // Insertamos solo si la tabla está vacía
        const check = await pool.query('SELECT COUNT(*) FROM subfusiles');
        if (check.rows[0].count == 0) {
            await pool.query(`
        INSERT INTO subfusiles (nombre, descripcion, imagen) VALUES
        ('Lachmann Sub', 'El mejor para cortas distancias.', 'https://www.gamesatlas.com/images/cod-modern-warfare-2/weapons/lachmann-sub.jpg'),
        ('Vaznev-9K', 'Dominante en el meta actual.', 'https://www.gamesatlas.com/images/cod-modern-warfare-2/weapons/vaznev-9k.jpg');
      `);
            console.log("✅ Datos iniciales creados.");
        }
        console.log("🚀 Base de datos lista para usar.");
    } catch (err) {
        console.error("❌ Error en setupDB:", err);
    }
};

setupDB();

module.exports = pool;