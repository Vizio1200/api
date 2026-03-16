const db = require('../models/connection');


async function getGuitarras(req, res) {
    try {
        const result = await db.query("SELECT * FROM guitarras");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener guitarras");
    }
}

async function getGuitarraById(req, res) {
    try {
        const result = await db.query(
            "SELECT * FROM guitarras WHERE id=$1",
            [req.params.id]
        );
        if (result.rows.length === 0)
            return res.status(404).send("Guitarra no encontrada");
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}

async function postGuitarra(req, res) {
    try {
        const { marca, modelo, precio } = req.body;
        await db.query(
            "INSERT INTO guitarras (marca, modelo, precio) VALUES ($1,$2,$3)",
            [marca, modelo, precio]
        );
        res.send("Guitarra insertada");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}


async function putGuitarra(req, res) {
    try {
        const { marca, modelo, precio } = req.body;
        const result = await db.query(
            "UPDATE guitarras SET marca=$1, modelo=$2, precio=$3 WHERE id=$4",
            [marca, modelo, precio, req.params.id]
        );
        if (result.rowCount === 0)
            return res.status(404).send("Guitarra no encontrada");
        res.send("Guitarra actualizada");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}

async function patchGuitarra(req, res) {
    try {
        const { marca } = req.body;
        const result = await db.query(
            "UPDATE guitarras SET marca=$1 WHERE id=$2",
            [marca, req.params.id]
        );
        if (result.rowCount === 0)
            return res.status(404).send("Guitarra no encontrada");
        res.send("Marca actualizada");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}

async function deleteGuitarra(req, res) {
    try {
        const result = await db.query(
            "DELETE FROM guitarras WHERE id=$1",
            [req.params.id]
        );
        if (result.rowCount === 0)
            return res.status(404).send("Guitarra no encontrada");
        res.send("Guitarra eliminada");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
}


module.exports = {
    getGuitarras,
    getGuitarraById,
    postGuitarra,
    putGuitarra,
    patchGuitarra,
    deleteGuitarra
};