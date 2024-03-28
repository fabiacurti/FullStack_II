const express = require('express');
const alunoController = require('../controller/alunoController');
const router = express.Router()
const alunoControlleres = new alunoController();

router.get('/',alunoControlleres.getLista)

module.exports = router;