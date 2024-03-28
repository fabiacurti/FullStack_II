const Database = require("../database");

const banco = new Database()
class cadLivro {
   id;
   NomeLivro;
   codigoLivro;
   numeroPagina;
   editora;
   genero;
   dataPublicacao;
   constructor(id, NomeLivro, codigoLivro, numeroPagina, editora, genero, dataPublicacao) {
      this.id = id,
         this.NomeLivro = NomeLivro,
         this.codigoLivro = codigoLivro,
         this.numeroPagina = numeroPagina,
         this.editora = editora,
         this.genero = genero,
         this.dataPublicacao = dataPublicacao
   }

   async getALL() {
      const livro = await banco.ExecutaComando('select * from cadlivro');
      return livro;

   }

   async buscar({ NomeLivro, genero }) {
      var sql = `select * from cadLivro where NomeLivro like '%${NomeLivro}%' and genero=?`
      if (genero == "Todos") {

         sql = `select * from cadLivro where NomeLivro like '%${NomeLivro}%'`

      }

      const livro = await banco.ExecutaComando(sql, genero);
      return livro
   }

   async create(dadosLivro) {
      await banco.ExecutaComandoNonQuery('insert into cadlivro set ?', dadosLivro)
   }

   async update(codigoLivro, dadosLivro) {
      await banco.ExecutaComando('update cadlivro set ? where codigolivro=?', [dadosLivro, codigoLivro])
   }

   async getById(codigoLivro) {
      const result = await banco.ExecutaComando('select * from cadlivro WHERE codigoLivro = ?', [codigoLivro])
      const livro = result[0];
      return livro;
   }

   async delete(codigoLivro) {
      await banco.ExecutaComandoNonQuery('delete from cadlivro where codigoLivro=?', [codigoLivro])

   }
}

module.exports = cadLivro