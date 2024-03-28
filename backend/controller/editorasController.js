const Editoras = require("../model/entidades/editoras");

const editorasInstancia = new Editoras(); 

class EditorasController {
    async getById(req, res) {
        const id = req.params.id;
        try {
            const result = await editorasInstancia.getById(id);
            
            if (result) {
                return res.status(200).json(result);
            } else {
                // Adicione uma mensagem de erro ao objeto JSON
                res.status(404).json({ error: 'Editora não encontrada' });
            }
        } catch (error) {
            console.log('Erro ao buscar Editora' + error);
            res.status(500).json({ error: 'Erro ao buscar editora!' });
        }
    }

    async filtrar (req,res){
        const filtro =req.body;
        try {
            const result =await editorasInstancia.filtrar(filtro)
            return res.status(200).json(result);
        } catch (error) {

        }
    }

    async getAll(req,res){
        try{ 
            const result = await editorasInstancia.getAll()
            return res.status(200).json(result)
        }catch (error){
            console.log('Erro ao buscar editora:'+error)
            res.status(500).json({error:'Erro ao buscar editora!'})
        }
        return editorasInstancia.getAll()
    }


    async create(req,res){
        const editorData = req.body;
        try{
            await editorasInstancia.create(editorData);
            res.status(201).json({messege:'Editora regristrada com sucesso!'})

        }catch (error){
            console.log('Erro ao inserir o editora', error)
            res.status(500).json({error:'Erro ao inserir a editora'})
        }
    }

    
    async update(req,res){
        const editorData = req.body;
        const id = req.params.id
        try{
            await editorasInstancia.update(id,editorData);
            res.status(201).json({messege:'Editora atualizada com sucesso!'})

        }catch (error){
            console.log('Erro ao atualizar a editora'+ error)
            res.status(500).json({error:'Erro ao atualizar o editora'})
        }
    }

    
    async delete(req,res){

        const id = req.params.id;
        try{
            await editorasInstancia.delete(id);
            res.status(200).json({message:'Registro deletado com sucesso'})
        } catch (error) {
            console.log('Erro ao deletar editora', error)
            res.status(500).json({error:'Erro ao deletar editora'})
        }
    }
}

module.exports = EditorasController;
