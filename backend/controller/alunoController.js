const RegistroEmprestimo = require("../model/entidades/AlunoProfessor.js");
const Aluno = require("../model/entidades/aluno.js");


const registroEmprestimo = new RegistroEmprestimo();
const aluno = new Aluno();

class alunoController {

    async getLista(req, res) {
        try {
            const result = await aluno.obterListaLivros();
            return res.status(200).json(result)
        }
        catch (error) {
            console.log('Erro ao buscar lista :' + error)
            res.status(500).json({ error: 'Erro ao buscar lista ' })
        }

        return aluno.obterListaLivros();
    }

}
module.exports = alunoController;