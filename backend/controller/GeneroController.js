const Genero = require("../model/entidades/genero");
const genero = new Genero;

class GeneroController {

    async obterTodos(req, res) {
        try {
            const result = await genero.obterTodos();
            return res.status(200).json(result);
        } catch (error) {
            console.error('Erro ao buscar gêneros:', error);
            res.status(500).json({ error: 'Erro ao buscar gêneros!' });
        }
    }

    async create(req, res) {
        const generoData = req.body;
        try {
            console.log('Dados recebidos:', generoData);
            await genero.create(generoData);
            res.status(201).json({ success: true, message: 'Gênero cadastrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao cadastrar gênero:', error.message);
            res.status(500).json({ success: false, message: 'Erro ao cadastrar gênero.' });
        }
    }
    

    async delete(req, res) {
        const ID = req.params.ID
        try {
            await genero.delete(ID)
            res.status(200).json({ messege: 'Genero deletado com sucesso!' })
        } catch (error) {
            console.log('Erro ao deletar o genero', error)
            res.status(500).json({ error: 'Erro ao deletar o genero' })
        }
    }

    async update(req, res) {
        const generoData = req.body;
        const ID = req.params.ID
        try {
            await genero.update(ID, generoData);
            res.status(201).json({ message: 'Genero atualizado com sucesso!' })
        } catch (error) {
            console.log('Erro ao atualizar o Genero', error)
            res.status(500).json({ error: 'Erro ao atualizar o Genero' })
        }
    }
    
}

module.exports = GeneroController;
