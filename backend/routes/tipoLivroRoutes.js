const express = require('express');
const TipoLivroController = require('../controller/tipoLivroController.js');
const router = express.Router()
const tipoLivroController = new TipoLivroController();

router.get('/',tipoLivroController.getAll)
router.get('/:ID',tipoLivroController.getById)
router.delete('/:ID',tipoLivroController.delete)
router.post('/',tipoLivroController.create)
router.put('/:ID',tipoLivroController.update)
router.post('/filtrar',tipoLivroController.filtrar)

module.exports = router;