const db = require('../models/connection');


async function getUser(req, res) {
    try {
        const result = await db.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
}


async function getUserById(req, res) {
    try {
        const result = await db.query(
            "SELECT * FROM usuarios WHERE id=$1",
            [req.params.id]
        );
        if (result.rows.length === 0)
            return res.status(404).send("Usuario no encontrado");
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}


async function postUser(req, res) {
    try {
        const { usuario, password } = req.body;
        await db.query(
            "INSERT INTO usuarios (usuario, password) VALUES ($1, $2)",
            [usuario, password]
        );
        res.send("Usuario insertado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}


async function putUser(req, res) {
    try {
        const { usuario, password } = req.body;
        const result = await db.query(
            "UPDATE usuarios SET usuario=$1, password=$2 WHERE id=$3",
            [usuario, password, req.params.id]
        );
        if (result.rowCount === 0)
            return res.status(404).send("Usuario no encontrado");
        res.send("Usuario actualizado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}


async function patchUser(req, res) {
    try {
        const { usuario } = req.body;
        const result = await db.query(
            "UPDATE usuarios SET usuario=$1 WHERE id=$2",
            [usuario, req.params.id]
        );
        if (result.rowCount === 0)
            return res.status(404).send("Usuario no encontrado");
        res.send("Usuario actualizado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}


async function deleteUser(req, res) {
    try {
        const result = await db.query(
            "DELETE FROM usuarios WHERE id=$1",
            [req.params.id]
        );
        if (result.rowCount === 0)
            return res.status(404).send("Usuario no encontrado");
        res.send("Usuario eliminado");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }

}

// ... (tus otras funciones getUser, postUser, etc)

const getSubfusiles = async (req, res) => {
    try {
        // Pedimos las nuevas columnas: dano, cadencia, alcance, movilidad
        const result = await pool.query('SELECT id, nombre, descripcion, imagen, dano, cadencia, alcance, movilidad FROM subfusiles');
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
    getSubfusiles // <--- ¡Asegúrate de que esta línea esté aquí!
};