import connection from '../db/connection.js';
import IDAL from '../db/IDAL.js'

  class AutorModel extends IDAL{

    async getExibir() {
      try {
        const [rows] = await connection.execute('SELECT * FROM autor');
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    async getbusca(id) {
      try {
        const [rows] = await connection.execute('SELECT * FROM autor WHERE idAutor = ?', [id]);
        return rows[0]; // Retorna o primeiro autor encontrado ou undefined
      } catch (error) {
        throw error;
      }
    }
  
    async setCadastrar(novo) {
      try {
        const [result] = await connection.execute('INSERT INTO autor(nome) VALUES (?);', [novo.nome])
        return result.insertId;
      } catch (error) {
        throw error;
      }
    }
  
    async setAtualizar(id, dadosAtualizados) {
      try {
        await connection.execute('UPDATE autor SET nome=? WHERE idAutor = ?;', [dadosAtualizados.nome, id])
      } catch (error) {
        throw error;
      }
    }
  
    async excluir(id) {
      try {
        await connection.execute('DELETE FROM autor WHERE idAutor = ?', [id]);
      } catch (error) {
        throw error;
      }
    }
  };
  
  export default AutorModel;