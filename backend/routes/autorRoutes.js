const express = require('express');
const AutorController = require('../controller/autorController.js');
const router = express.Router()
const autorController = new AutorController();

router.get('/',autorController.getAll)
router.get('/:ID',autorController.getById)
router.delete('/:ID',autorController.delete)
router.post('/',autorController.create)
router.put('/:ID',autorController.update)
router.post('/filtrar',autorController.filtrar)

module.exports = router;