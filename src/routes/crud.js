const express = require('express');
const router = express.Router();

const controller = require('../controller/crud');

router.get('/usuarios', controller.getUser);
router.get('/usuarios/:id', controller.getUserById);
router.post('/usuarios', controller.postUser);
router.put('/usuarios/:id', controller.putUser);
router.patch('/usuarios/:id', controller.patchUser);
router.delete('/usuarios/:id', controller.deleteUser);


module.exports = router;