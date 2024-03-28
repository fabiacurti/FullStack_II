const Database = require("../database");

const banco = new Database();

class RegistroEmprestimo {
    async create(registro) {
        try {
            const { idLivro, idUsuario, dataEmprestimo, dataDevolucao } = registro;
            await banco.ExecutaComandoNonQuery('INSERT INTO historicoEmprestimos (idLivro, idUsuario, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)', [idLivro, idUsuario, dataEmprestimo, dataDevolucao]);
            return { success: true, message: 'Empréstimo registrado com sucesso.' };
        } catch (error) {
            console.error('Erro ao registrar empréstimo:', error);
            return { success: false, message: 'Erro ao registrar empréstimo.' };
        }
    }

    async obter() {
        try {
            const resultado = await banco.ExecutaComando(`
                SELECT h.id, h.idLivro, h.idUsuario, h.dataEmprestimo, h.dataDevolucao, h.isAtivo, l.NomeLivro, a.Nome AS NomeUsuario
                FROM historicoEmprestimos h
                INNER JOIN cadLivro l ON h.idLivro = l.codigoLivro
                INNER JOIN alunoProfessor a ON h.idUsuario = a.cpf
            `);
            return resultado;
        } catch (error) {
            console.error('Erro ao obter histórico de empréstimos:', error);
            return [];
        }
    }


    async delete(ID) {
        try {
            await banco.ExecutaComandoNonQuery('DELETE FROM historicoEmprestimos WHERE id = ?', [ID]);
            return { success: true, message: 'Empréstimo excluído com sucesso.' };
        } catch (error) {
            console.error('Erro ao excluir empréstimo:', error);
            return { success: false, message: 'Erro ao excluir empréstimo.' };
        }
    }

    async update(ID, dadosRegistroEmprestimo) {
        try {
            const { idLivro, idUsuario, dataEmprestimo, dataDevolucao } = dadosRegistroEmprestimo;
            await banco.ExecutaComandoNonQuery('UPDATE historicoEmprestimos SET idLivro = ?, idUsuario = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?', [idLivro, idUsuario, dataEmprestimo, dataDevolucao, ID]);
            return { success: true, message: 'Empréstimo atualizado com sucesso.' };
        } catch (error) {
            console.error('Erro ao atualizar empréstimo:', error);
            return { success: false, message: 'Erro ao atualizar empréstimo.' };
        }
    }

    async darbaixa(id, dadosRegistroEmprestimo) {
        try {
            const { idLivro, idUsuario, dataEmprestimo, dataDevolucao } = dadosRegistroEmprestimo;

            // Validação da data de devolução
            if (dataDevolucao >= new Date()) {
                return { success: false, message: 'Data de devolução não pode ser superior à data atual.' };
            }

            // Atualização do registro de empréstimo
            await banco.ExecutaComandoNonQuery('UPDATE historicoEmprestimos SET dataDevolucao = ?, isAtivo = 0 WHERE id = ?', [dataDevolucao, id]);

            return { success: true, message: 'Baixa de empréstimo realizada com sucesso.' };
        } catch (error) {
            console.error('Erro ao realizar baixa de empréstimo:', error);
            return { success: false, message: 'Erro ao realizar baixa de empréstimo.' };
        }
    }

    async filtrar(filtro) {
        try {
            const { nomedolivro, nomedousuario, dataemprestimo, datadevolucao } = filtro;
            const parameters = {};
    
            let sql = `
                SELECT h.id, h.idLivro, h.idUsuario, h.dataEmprestimo, h.dataDevolucao, h.isAtivo, l.NomeLivro, a.Nome AS NomeUsuario
                FROM historicoEmprestimos h
                INNER JOIN cadLivro l ON h.idLivro = l.codigoLivro
                INNER JOIN alunoProfessor a ON h.idUsuario = a.cpf
                WHERE 1 = 1
            `;
    
            if (nomedolivro) {
                sql += ' AND l.NomeLivro = :nomedolivro';
                parameters.nomedolivro = nomedolivro;
            }
            if (nomedousuario) {
                sql += ' AND a.Nome = :nomedousuario';
                parameters.nomedousuario = nomedousuario;
            }
            if (dataemprestimo) {
                sql += ' AND h.dataEmprestimo = :dataemprestimo';
                parameters.dataemprestimo = dataemprestimo;
            }
            if (datadevolucao) {
                sql += ' AND h.dataDevolucao = :datadevolucao';
                parameters.datadevolucao = datadevolucao;
            }
    
            // Executa a consulta SQL com os parâmetros fornecidos
            const resultado = await banco.ExecutaComando(sql, parameters);
    
            return resultado;
        } catch (error) {
            console.error('Erro ao filtrar empréstimos:', error);
            throw error;
        }
    }
    

}

module.exports = RegistroEmprestimo;
