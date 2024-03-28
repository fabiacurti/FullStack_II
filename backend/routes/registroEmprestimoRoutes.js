const express = require('express');
const RegistroEmprestimoController = require('../controller/RegistroEmprestimoController.js');
const router =express.Router()
const registroEmprestimoController = new RegistroEmprestimoController();

router.get('/',registroEmprestimoController.obterListaEmprestimo);
router.post('/',registroEmprestimoController.criarEmprestimo);
router.delete('/:ID',registroEmprestimoController.deletarEmprestimo);
router.put('/:ID',registroEmprestimoController.atualizarEmprestimo);
router.put('/',registroEmprestimoController.darBaixaEmprestimo);
router.post('/filtrar',registroEmprestimoController.filtrar);


module.exports= router;
