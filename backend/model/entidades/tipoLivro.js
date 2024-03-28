const Database = require("../database");

const banco = new Database()

class TipoLivro {
    ID;
    nome;
    faixaEtaria;
    nivelLeitura;
    formato

    constructor(ID, nome, faixaEtaria, nivelLeitura, formato) {
        this.ID = ID,
        this.nome = nome
        this.faixaEtaria = faixaEtaria
        this.nivelLeitura = nivelLeitura
        this.formato = formato
        
    }

    async getAll() {
        const tipoLivros = await banco.ExecutaComando('select * from tipoLivro')
        return tipoLivros
    }

    async getById(ID) {
        const result = await banco.ExecutaComando('select * from tipoLivro WHERE ID = ?', [ID])
        const tipoLivro = result[0];
        return tipoLivro
    }

    async delete(ID) {
        await banco.ExecutaComandoNonQuery('delete from tipoLivro where id=?', [ID])
    }


    async create(dadosTipoLivro) {
        await banco.ExecutaComandoNonQuery('insert into tipoLivro set ?', dadosTipoLivro)
    }

    async update(ID, dadosTipoLivro) {
        await banco.ExecutaComando('update tipoLivro set ? where id=?', [dadosTipoLivro, ID])
    }

    async filtrar({ Nome }) {
        var sql = `select * FROM tipoLivro where Nome like '%${Nome}%'`
        const tipoLivros = await banco.ExecutaComando(sql)
        return tipoLivros

    }

}
module.exports = TipoLivro