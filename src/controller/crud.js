function obtenerusuario(req, res) {
    db.query("SELECT * FROM usuarios", (err, result) => {
        if (err) return res.status(500).send("Error");
        res.json(result.rows);
    });
}


function obtenerusuario(req, res) {
    db.query("SELECT * FROM usuarios WHERE id=$1", [req.params.id], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.json(result.rows[0]);
    });
};


/*function inserrusuario(req, res) {
    db.query("INSERT INTO usuarios(usuario,password) VALUES($1,$2)", [usuario, password]);
    res.send("Datos insertados");
} catch (err) {
    res.status(500).send("Error al insertar datos");
};*/


function actualizarusuario(req, res) {
    const { usuario, password } = req.body;
    const query = "UPDATE usuarios SET usuario=$1,password=$2 WHERE id=$3";
    db.query(query, [usuario, password, req.params.id], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.json({ mensaje: "Recurso actualizado", id: req.params.id });
    });
}



function eliminarsuario(req, res) {
    db.query("DELETE FROM usuarios WHERE id=$1", [req.params.id], (err, result) => {
        if (err) return res.status(500).send("Error");
        res.send("Fila eliminada por id");
    });
}
