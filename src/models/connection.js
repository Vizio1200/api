const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.User,
    password: process.env.Password,
    host: process.env.DB_Host,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};