const Database = require("../database");

const banco = new Database();

class Editoras {
    id;
    status;
    descricao;

    constructor(id, status, descricao) {
        this.id = id;
        this.status = status;
        this.descricao = descricao;
    }

    async getAll() {
        const editoras = await banco.ExecutaComando('select * from editoras');
        return editoras;
    }

    async getById(id){
        const result = await banco.ExecutaComando('SELECT * FROM editoras WHERE id = ?',[id])
        const editoras = result[0];
        return editoras;
    }

    async create(dadoseditora) {
        await banco.ExecutaComandoNonQuery('insert into editoras set ?', dadoseditora)
    }

    async update(id, dadoseditora) {
        await banco.ExecutaComando('update editoras set ? where id=?', [dadoseditora, id])
    }

    async delete(id) { 
        await banco.ExecutaComandoNonQuery('delete from editoras where id=?', [id])
    }

    async filtrar ({Nome}){
        var sql=`select * from editoras where Nome like '%${Nome}%' `
            if(Nome==""){
                sql=`select * from editoras where Nome like '%${Nome}%'`
            }
            const editora =await banco.ExecutaComando(sql);
            return editora
    }

    

    
}

module.exports = Editoras;
