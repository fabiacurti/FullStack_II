const Database = require("../database");

const banco = new Database()

class Autor {
    ID;
    nome;
    sobrenome;
    dNascimento;
    cidadeNascimento;
    genero;
    email;
    qntObras

    constructor(ID, nome, sobrenome, dNascimento, cidadeNascimento, genero, email, qntObras) {
        this.ID = ID,
        this.nome = nome
        this.sobrenome = sobrenome
        this.dNascimento = dNascimento
        this.cidadeNascimento = cidadeNascimento
        this.genero = genero
        this.email = email
        this.qntObras = qntObras
    }

    async getAll() {
        const autores = await banco.ExecutaComando('select * from autor')
        return autores
    }

    async getById(ID) {
        const result = await banco.ExecutaComando('select * from autor WHERE ID = ?', [ID])
        const autor = result[0];
        return autor
    }

    async delete(ID) {
        await banco.ExecutaComandoNonQuery('delete from autor where id=?', [ID])
    }


    async create(dadosAutor) {
        await banco.ExecutaComandoNonQuery('insert into autor set ?', dadosAutor)
    }

    async update(ID, dadosAutor) {
        await banco.ExecutaComando('update autor set ? where id=?', [dadosAutor, ID])
    }

    async filtrar({ Nome, Genero }) {
        var sql = `select * FROM autor where Nome like '%${Nome}%' and Genero=?`
        if (Genero == "Todos") {
            sql = `select * FROM autor where Nome like '%${Nome}'`
        }
        const autores = await banco.ExecutaComando(sql, Genero)
        return autores

    }

}
module.exports = Autor