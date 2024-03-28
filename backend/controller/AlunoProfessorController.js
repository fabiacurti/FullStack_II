const AlunoProfessor = require("../model/entidades/AlunoProfessor.js");


const alunoprofessor =new AlunoProfessor();

class AlunoProfessorController{
    async getAll(req,res){
       try {
            const result = await alunoprofessor.getAll()
            return res.status(200).json(result)
       } catch (error) {
        console.log('Erro ao buscar Alunos & Professores:'+error)
        res.status(500).json({error:'Erro ao buscar aluno e professores'})

       }
        
        return alunoprofessor.getAll()
    }

    async filtrar (req,res){
        const filtro =req.body;
        try {
            const result =await alunoprofessor.filtrar(filtro)
            return res.status(200).json(result);
        } catch (error) {

        }
    }

    async create(req,res){
        const alunoprofessorData =req.body;
        try {
            await alunoprofessor.create(alunoprofessorData);
            res.status(201).json({message:'Registro cadastrado com sucesso'})
        } catch (error) {
            console.log('Erro ao cadastrar Alunos & Professores:'+error)
            res.status(500).json({error:'Erro ao cadastrar aluno e professores'})
        }
    }
    
    async update(req,res){
        const alunoprofessorData =req.body;
        const cpf =req.params.cpf;
        try {
            await alunoprofessor.update(cpf,alunoprofessorData);
            res.status(201).json({message:'Registro cadastrado com sucesso'})
        } catch (error) {
            console.log('Erro ao atualizar Alunos & Professores:'+error)
            res.status(500).json({error:'Erro ao atualizar Alunos & Professores'})
        }
    }

    async delete(req, res){
        const cpf = req.params.cpf;
        try {
            await alunoprofessor.delete(cpf);
            res.status(200).json({message:'Registro deletado com sucesso'})
        } catch (error) {
            console.log('Erro ao deletar aluno e professor', error)
            res.status(500).json({error:'Erro ao deletar aluno e professor'})
        }
    }
}
module.exports=AlunoProfessorController;