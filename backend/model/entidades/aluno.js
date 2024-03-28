const Database = require("../database");

const banco = new Database()

class Aluno {
    async obterListaLivros() {
        try {
            const resultado = await banco.ExecutaComando(`
            SELECT  *
            FROM historicoEmprestimos h
                  INNER JOIN cadLivro l
                  ON h.idLivro = l.codigoLivro
                  INNER JOIN alunoProfessor a
                  ON h.idUsuario = a.cpf
                  INNER JOIN historicoemprestimos hc
                  ON a.cpf = hc.idUsuario
                  WHERE hc.isAtivo = true 
            `);
            return resultado;
        } catch (error) {
            console.error('Erro ao obter histórico de empréstimos:', error);
            return [];
        }
    }
}

module.exports = Aluno;