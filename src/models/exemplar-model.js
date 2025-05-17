import connection from '../db/connection.js';
import IDAL from '../db/IDAL.js'

  class ExemplarModel extends IDAL{
     
    async getExibir() {
      try {
        const [rows] = await connection.execute('SELECT idExemplar, num_serie, status, ano_publi, data_aquisicao, idLivro, idEditora, idPrateleira FROM exemplar');
        return rows;
      } catch (error) {
        throw error;
      }
    }
  
    async getbusca(id) {
      try {
        const [rows] = await connection.execute('SELECT * FROM exemplar WHERE idExemplar = ?', [id]);
        return rows[0]; // Retorna o primeiro exemplar encontrado ou undefined
      } catch (error) {
        throw error;
      }
    }
  
    async setCadastrar(novo) {
      try{
        const [result] = await connection.execute('INSERT INTO exemplar(num_serie, status, ano_publi, data_aquisicao, idLivro, idEditora, idPrateleira) VALUES (?,?,?,?,?,?,?);',
        [novo.num_serie, novo.status, novo.ano_publi, novo.data_aquisicao, novo.idLivro, novo.idEditora, novo.idPrateleira])
        return result.insertId;
      } catch (error) {
        throw error;
      }
    }
  
    async setAtualizar(id, dadosAtualizados) {
      try {
        await connection.execute('UPDATE exemplar SET num_serie=?, status=?, ano_publi=?, data_aquisicao=?, idLivro=?, idEditora=?, idPrateleira=? WHERE idExemplar = ?;',
        [dadosAtualizados.num_serie, dadosAtualizados.status, dadosAtualizados.ano_publi, dadosAtualizados.data_aquisicao, dadosAtualizados.idLivro, dadosAtualizados.idEditora, dadosAtualizados.idPrateleira, id])
      } catch (error) {
        throw error;
      }
    }
  
    async excluir(id) {
      try {
        await connection.execute('DELETE FROM exemplar WHERE idExemplar = ?', [id]);
      } catch (error) {
        throw error;
      }
    }
  };
  
  export default ExemplarModel;