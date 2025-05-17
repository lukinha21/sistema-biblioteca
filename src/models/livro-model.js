import connection from '../db/connection.js';
import IDAL from '../db/IDAL.js'

  class LivroModel extends IDAL{
     
    async getExibir() {
      try {
        const [rows] = await connection.execute('SELECT idLivro,titulo, ISBN, case when L.status=1 then "Ativo" when L.status=0 then "Inativo" end as status, sinopse, URLimagem, A.nome as autor, C.nome as categoria FROM livro L inner join autor A on L.idAutor = A.idAutor inner join categoria C on L.idCategoria = C.idCategoria');
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    async getbusca(id) {
      try {
        const [rows] = await connection.execute('SELECT * FROM livro WHERE idLivro = ?', [id]);
        return rows[0]; // Retorna o primeiro livro encontrado ou undefined
      } catch (error) {
        throw error;
      }
    }
  
    async setCadastrar(novo) {
      try{
        const [result] = await connection.execute('INSERT INTO livro(titulo,ISBN,status,sinopse,URLimagem,idAutor,idCategoria) VALUES (?,?,?,?,?,?,?);',
        [novo.titulo, novo.ISBN, novo.status, novo.sinopse, novo.URLimagem, novo.idAutor, novo.idCategoria])
        return result.insertId;
      } catch (error) {
        throw error;
      }
    }
  
    async setAtualizar(id, dadosAtualizados) {
      try {
        await connection.execute('UPDATE livro SET titulo=?, ISBN=?, status=?, sinopse=?, URLimagem=?, idAutor=?, idCategoria=? WHERE idLivro = ?;',
        [dadosAtualizados.titulo, dadosAtualizados.ISBN, dadosAtualizados.status, dadosAtualizados.sinopse, dadosAtualizados.URLimagem, dadosAtualizados.idAutor, dadosAtualizados.idCategoria, id])
      } catch (error) {
        throw error;
      }
    }
  
    async excluir(id) {
      try {
        await connection.execute('DELETE FROM livro WHERE idLivro = ?', [id]);
      } catch (error) {
        throw error;
      }
    }
  };
  
  export default LivroModel;