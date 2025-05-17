import connection from '../db/connection.js';
import IDAL from '../db/IDAL.js'

  class CategoriaModel extends IDAL{

    async getExibir() {
      try {
        const [rows] = await connection.execute('SELECT * FROM categoria');
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    async getbusca(id) {
      try {
        const [rows] = await connection.execute('SELECT * FROM categoria WHERE idcategoria = ?', [id]);
        return rows[0]; // Retorna o primeiro categoria encontrado ou undefined
      } catch (error) {
        throw error;
      }
    }
  
    async setCadastrar(novo) {
      try {
        const [result] = await connection.execute('INSERT INTO categoria(nome) VALUES (?);', [novo.nome])
        return result.insertId;
      } catch (error) {
        throw error;
      }
    }
  
    async setAtualizar(id, dadosAtualizados) {
      try {
        await connection.execute('UPDATE categoria SET nome=? WHERE idcategoria = ?;', [dadosAtualizados.nome, id])
      } catch (error) {
        throw error;
      }
    }
  
    async excluir(id) {
      try {
        await connection.execute('DELETE FROM categoria WHERE idcategoria = ?', [id]);
      } catch (error) {
        throw error;
      }
    }
  };
  
  export default CategoriaModel;