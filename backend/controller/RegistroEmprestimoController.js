const RegistroEmprestimo = require("../model/entidades/registroEmprestimo");

const registroEmprestimoModel = new RegistroEmprestimo();

class RegistroEmprestimoController {
    async obterListaEmprestimo(req, res) {
        try {
            const resultado = await registroEmprestimoModel.obter();
            res.status(200).json(resultado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async criarEmprestimo(req, res) {
        try {
            const { idLivro, idUsuario, dataEmprestimo, dataDevolucao } = req.body;
            const registro = await registroEmprestimoModel.create({ idLivro, idUsuario, dataEmprestimo, dataDevolucao });
            res.status(201).json(registro);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deletarEmprestimo(req, res) {
        try {
            const { id } = req.params;
            await registroEmprestimoModel.delete(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async atualizarEmprestimo(req, res) {
        try {
            const { id } = req.params;
            const dadosRegistroEmprestimo = req.body;
            await registroEmprestimoModel.update(id, dadosRegistroEmprestimo);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async darBaixaEmprestimo(req, res) {
        try {
            const { id } = req.params;
            const dadosRegistroEmprestimo = req.body;
            await registroEmprestimoModel.darbaixa(id, dadosRegistroEmprestimo);
            res.status(202).send();
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await registroEmprestimoModel.filtrar(filtro);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao filtrar empréstimos:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}

module.exports = RegistroEmprestimoController;
