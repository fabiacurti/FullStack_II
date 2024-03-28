const express = require('express');
const GeneroController = require('../controller/GeneroController');
const router = express.Router();
const generoController = new GeneroController();

router.get('/', generoController.obterTodos);
router.post('/', generoController.create);
router.put('/:ID', generoController.update);  
router.delete('/:ID', generoController.delete);

module.exports = router;
