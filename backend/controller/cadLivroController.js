const CadLivro = require("../model/entidades/cadLivro.js");

const cadLivro = new CadLivro()

class cadLivroController{
    async getALL(req,res){

        try{
            const result = await cadLivro.getALL()
            return res.status(200).json(result)
        }catch (error){
            console.log('erro de busca:'+error);
            res.status(500).json({error: 'erro de busca'})
        }
        return cadLivro.getALL()

    }
    async buscar(req,res){

        const filtro =req.body;

        try{
            const result =await cadLivro.buscar(filtro)
            return res.status(200).json(result);
        } catch (error) {
            console.log(error)
        }
    }

    async getById(req,res){
        const codigoLivro =req.params.codigoLivro;
        try{
            const result = await cadLivro.getById(codigoLivro)
            if(result){
                return res.status(200).json(result)
            }else{
                res.status(404).json({error:'não encontrado'})
            }

        }catch (error){
            console.log('erro de busca:'+error);
            res.status(500).json({error: 'erro de busca'})
        }

    }

    async create(req,res){
        const livroData =req.body;

        try{
            await cadLivro.create(livroData);
            res.status(201).json({message:'registro com successo'})
        } catch (error) {
            console.log('erro ao inserir:'+error);
            res.status(500).json({error:'erro ao inserir'})
        }

    }


    async update(req,res){
        const codigoLivro =req.params.codigoLivro;
        const livroData =req.body;

        try{
            await cadLivro.update(codigoLivro,livroData);
            res.status(201).json({message:'registro com successo'})
        } catch (error) {
            console.log('erro ao atualizar:'+error);
            res.status(500).json({error:'erro ao atualizar'})
        }

    }

    async delete (req,res){
        const codigoLivro = req.params.codigoLivro;
        try {
            await cadLivro.delete(codigoLivro)
            res.status(200).json({message:'registro deletado'})
        } catch (error) {
            console.log('erro ao deletar', error)
            res.status(500).json({error:'erro ao deletar'})
        }
    }

}
module.exports = cadLivroController;