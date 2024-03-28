const express = require('express');
const AlunoProfessorController = require('../controller/AlunoProfessorController.js');

const router = express.Router();
const alunoprofessorController = new AlunoProfessorController();

router.get('/', alunoprofessorController.getAll);
router.delete('/:cpf', alunoprofessorController.delete);
router.post('/', alunoprofessorController.create);
router.put('/:cpf', alunoprofessorController.update);
router.post('/filtrar', alunoprofessorController.filtrar);

module.exports = router;
