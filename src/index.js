const express = require('express');
const app = express();
const db = require('./models/connection');
app.use(express.json());

app.get("/api/usuarios", (req, res) => {
    db.query("SELECT * FROM usuarios", (err, result) => {
        if (err) return res.status(500).send("Error");
        res.json(result.rows);
    });
});

app.get("/api/usuarios/:id", (req, res) => {
    db.query("SELECT * FROM usuarios WHERE id=$1", [req.params.id], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.json(result.rows[0]);
    });
});

app.post("/api/insertar", (req, res) => {
    const { usuario, password } = req.body;
    try {
        db.query("INSERT INTO usuarios(usuario,password) VALUES($1,$2)", [usuario, password]);
        res.send("Datos insertados");
    } catch (err) {
        res.status(500).send("Error al insertar datos");
    }
});

app.put("/api/actualizar/:id", (req, res) => {
    const { usuario, password } = req.body;
    const query = "UPDATE usuarios SET usuario=$1,password=$2 WHERE id=$3";
    db.query(query, [usuario, password, req.params.id], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.json({ mensaje: "Recurso actualizado", id: req.params.id });
    });
});

app.patch("/api/actualizar-columna/:id", (req, res) => {
    db.query("UPDATE usuarios SET usuario=$1 WHERE id=$2", [req.body.usuario, req.params.id], (err, result) => {
        if (err) return res.status(500).send("error");
        res.send("Columna actualizada");
    });
});

app.delete("/api/eliminar/:id", (req, res) => {
    db.query("DELETE FROM usuarios WHERE id=$1", [req.params.id], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.send("Fila eliminada por id");
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});



