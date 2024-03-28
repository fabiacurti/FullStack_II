const express = require('express');
const EditorasController = require('../controller/editorasController');
const router = express.Router();
const editorasController = new EditorasController();


router.get('/', editorasController.getAll);
router.get('/:id', editorasController.getById);
router.post('/',editorasController.create);
router.put('/:id',editorasController.update);
router.delete('/:id',editorasController.delete)
router.post('/filtrar',editorasController.filtrar)

module.exports = router;
