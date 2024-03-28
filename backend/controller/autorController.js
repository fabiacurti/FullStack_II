const Autor = require("../model/entidades/autor");

const autor = new Autor

class AutorController{


    async getAll(req,res){
        try{ 
            const result = await autor.getAll()
            return res.status(200).json(result)
        }catch (error){
            console.log('Erro ao buscar autor:'+error)
            res.status(500).json({error:'Erro ao buscar autor!'})
        }
        
        

    }

    async getById(req,res){
        const ID = req.params.ID
        try{ 
            const result = await autor.getById(ID)
            if(result){
                return res.status(200).json(result)
            }else{
                res.status(404).json({error:'Autor não encontrado!'})
            } 
        }catch (error){
            console.log('Erro ao buscar autor:'+error)
            res.status(500).json({error:'Erro ao buscar autor!'})
        }
        

    }

    async delete(req,res){
        const ID = req.params.ID
        try{
            await autor.delete(ID)
            res.status(200).json({messege:'Autor deletado com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar o autor', error)
            res.status(500).json({error:'Erro ao deletar o autor'})
        }
    }


    async create(req,res){
        const autorData = req.body;
        try{
            await autor.create(autorData);
            res.status(201).json({messege:'Autor regristrado com sucesso!'})

        }catch{
            console.log('Erro ao inserir o autor', error)
            res.status(500).json({error:'Erro ao inserir o autor'})
        }
    }

    async update(req,res){
        const autorData = req.body;
        const ID = req.params.ID
        try{
            await autor.update(ID,autorData);
            res.status(201).json({messege:'Autor atualizado com sucesso!'})

        }catch{
            console.log('Erro ao atualizar o autor', error)
            res.status(500).json({error:'Erro ao atualizar o autor'})
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
            const result = await autor.filtrar(filtro);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Erro ao filtrar autores:", error);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
    
}


module.exports = AutorController;