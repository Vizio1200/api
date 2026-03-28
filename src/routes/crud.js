const db = require('../models/connection');


async function deleteUser(req, res) {
    try {
        const result = await db.query("DELETE FROM usuarios WHERE id=$1", [req.params.id]);
        if (result.rowCount === 0) return res.status(404).send("Usuario no encontrado");
        res.send("Usuario eliminado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}

const getSubfusiles = async (req, res) => {
    try {
        // Solo pedimos las columnas que SI existen en tu pgAdmin
        const result = await pool.query('SELECT id, nombre, descripcion, imagen FROM subfusiles');
        res.json(result.rows);
    } catch (err) {
        console.error("ERROR REAL EN LA TERMINAL:", err.message);
        res.status(500).send("Error en la base de datos");
    }
};

module.exports = {
    getUser,
    getUserById,
    postUser,
    putUser,
    patchUser,
    deleteUser,
    getSubfusiles
};