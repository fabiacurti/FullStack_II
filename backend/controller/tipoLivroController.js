const TipoLivro = require("../model/entidades/tipoLivro.js");

const tipoLivro = new TipoLivro

class TipoLivroController{


    async getAll(req,res){
        try{ 
            const result = await tipoLivro.getAll()
            return res.status(200).json(result)
        }catch (error){
            console.log('Erro ao buscar tipo de livro:'+error)
            res.status(500).json({error:'Erro ao buscar tipo de livro!'})
        }
        
        

    }

    async getById(req,res){
        const ID = req.params.ID
        try{ 
            const result = await tipoLivro.getById(ID)
            if(result){
                return res.status(200).json(result)
            }else{
                res.status(404).json({error:'Tipo de livro não encontrado!'})
            } 
        }catch (error){
            console.log('Erro ao buscar tipo de livro:'+error)
            res.status(500).json({error:'Erro ao buscar tipo de livro!'})
        }
        

    }

    async delete(req,res){
        const ID = req.params.ID
        try{
            await tipoLivro.delete(ID)
            res.status(200).json({messege:'Tipo de livro deletado com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar o tipo de livro', error)
            res.status(500).json({error:'Erro ao deletar o tipo de livro'})
        }
    }


async create(req, res) {
    const tipoLivroData = req.body;
    try {
        await tipoLivro.create(tipoLivroData);
        res.status(201).json({ message: 'Tipo de livro registrado com sucesso!' });
    } catch (error) {
        console.log('Erro ao inserir o tipo de livro', error);
        res.status(500).json({ error: 'Erro ao inserir o tipo de livro' });
    }
}

    async update(req,res){
        const tipoLivroData = req.body;
        const ID = req.params.ID
        try{
            await tipoLivro.update(ID,tipoLivroData);
            res.status(201).json({messege:'Tipo de livro atualizado com sucesso!'})

        }catch{
            console.log('Erro ao atualizar o tipo de livro', error)
            res.status(500).json({error:'Erro ao atualizar o tipo de livro'})
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await tipoLivro.filtrar(filtro);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao filtrar tipo de livros:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
    
}


module.exports = TipoLivroController;