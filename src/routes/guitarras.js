const express = require('express');
const router = express.Router();

const controller = require('../controller/guitarras');

router.get('/guitarras', controller.getGuitarras);
router.get('/guitarras/:id', controller.getGuitarraById);
router.post('/guitarras', controller.postGuitarra);
router.put('/guitarras/:id', controller.putGuitarra);
router.patch('/guitarras/:id', controller.patchGuitarra);
router.delete('/guitarras/:id', controller.deleteGuitarra);

module.exports = router;