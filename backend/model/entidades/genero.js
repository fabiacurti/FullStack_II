const Database = require('../database');

const banco = new Database()

class Genero {
    constructor(id, codigo, descricao, isAtivo) {
        this.id = id;
        this.codigo = codigo;
        this.descricao = descricao;
        this.isAtivo = isAtivo;
    }

    async obterTodos() {
        const generos = await banco.ExecutaComando('select * from generos')
        return generos;
    }

    async create(generoData) {
        const parametros = [generoData.codigo, generoData.descricao, generoData.isAtivo];
        const query = 'INSERT INTO generos (codigo, descricao, isAtivo) VALUES (?, ?, ?)';
    
        try {
            const resultado = await banco.ExecutaComando(query, parametros);
            return resultado;
        } catch (error) {
            console.error('Erro ao cadastrar gênero:', error);
            throw new Error('Erro ao cadastrar gênero no banco de dados.');
        }
    }
    
    


    async delete(ID) {
        await banco.ExecutaComandoNonQuery('delete from generos where id=?', [ID])
    }

    async update(ID, dadosGenero) {
        if (!dadosGenero.descricao) {
          throw new Error('A propriedade "descricao" é obrigatória para atualizar o gênero.');
        }
    
        const campos = Object.keys(dadosGenero).map((campo) => `${campo} = ?`).join(', ');
        const valores = Object.values(dadosGenero);
    
        // Adicionar o ID no final dos valores
        valores.push(ID);
    
        const query = `UPDATE generos SET ${campos} WHERE id=?`;
    
        try {
          await banco.ExecutaComando(query, valores);
        } catch (error) {
          console.error('Erro ao executar o comando SQL de atualização:', error);
          throw new Error('Erro ao atualizar gênero no banco de dados.');
        }
      }
    

}

module.exports = Genero;
