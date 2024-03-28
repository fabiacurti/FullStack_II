const Database = require("../database");

const banco= new Database()
class AlunoProfessor {
    Nome;
    cpf;
    DataNascimento;
    Turma;
    Email;
    Cidade;
    Rua;
    Telefone;
    Numero;
    cep;
    TipoPessoa;

    constructor(Nome, cpf, DataNascimento, Turma, Email, Cidade, Rua, Telefone, Numero, cep, TipoPessoa) {
        this.Nome = Nome,
        this.cpf = cpf,
        this.DataNascimento = DataNascimento,
        this.Turma = Turma
        this.Email = Email,
        this.Cidade = Cidade,
        this.Rua = Rua,
        this.Telefone = Telefone,
        this.Numero = Numero,
        this.cep = cep,
        this.TipoPessoa = TipoPessoa
    }

    
    async getAll(){
        const alunoprofessors = await banco.ExecutaComando('select * from alunoprofessor');
        return alunoprofessors;
    }

    async filtrar ({Nome, TipoPessoa}){
        var sql=`select * from alunoprofessor where Nome like '%${Nome}%' and TipoPessoa=?`
            if(TipoPessoa=="Todos"){
                sql=`select * from alunoprofessor where Nome like '%${Nome}%'`
            }
            const alunoprofessors =await banco.ExecutaComando(sql,TipoPessoa);
            return alunoprofessors
    }

    async create(dadosAlunoProfessor){
        await banco.ExecutaComandoNonQuery('insert into alunoprofessor set ?',dadosAlunoProfessor)
    }

    async update(cpf,dadosAlunoProfessor){
        await banco.ExecutaComando('update alunoprofessor set ? where cpf= ?',[dadosAlunoProfessor,cpf])
    }

    async delete (cpf){
        await banco.ExecutaComandoNonQuery('delete from alunoprofessor where cpf=?',[cpf])
    }

}

module.exports=AlunoProfessor;