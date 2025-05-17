import AutorModel from "../models/autor-model.js";

const autorModel = new AutorModel();
//conexao feita aqui
class AutorController {
  static async listarAutores (req,res) {

    try {
      const listaAutor = await autorModel.getExibir();
      res.status(200).json(listaAutor);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async buscarAutorId (req,res) {

    try {
      const id = req.params.id;
      const AutorById = await autorModel.getbusca(id);
      res.status(200).json(AutorById);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async cadastrarAutor (req, res) {
    try {
      //const jsonData = JSON.parse(req.body);
      const novoAutor = await autorModel.setCadastrar(req.body);
      res.status(201).json({ message: "Criado com sucesso", idAutor: novoAutor });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha ao cadastrar Autor` });
    }
  }

  static async atualizarAutor (req, res) {
    try {
      const id = req.params.id;
      await autorModel.setAtualizar(id, req.body);
      res.status(200).json({ message: "Autor atualizado com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na atualização` });
    }
  }


  static async excluirAutor (req, res) {
    try {
      const id = req.params.id;
      await autorModel.excluir(id);
      res.status(200).json({ message: "Autor excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
    }
  }

};

export default AutorController;