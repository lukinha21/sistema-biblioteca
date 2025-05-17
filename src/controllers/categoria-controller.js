import CategoriaModel from "../models/categoria-model.js";

const categoriaModel = new CategoriaModel();

class CategoriaController {
  static async listarCategorias (req,res) {

    try {
      const listaCategoria = await categoriaModel.getExibir();
      res.status(200).json(listaCategoria);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async buscarCategoriaId (req,res) {

    try {
      const id = req.params.id;
      const CategoriaById = await categoriaModel.getbusca(id);
      res.status(200).json(CategoriaById);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async cadastrarCategoria (req, res) {
    try {
      //const jsonData = JSON.parse(req.body);
      const novoCategoria = await categoriaModel.setCadastrar(req.body);
      res.status(201).json({ message: "Criado com sucesso", idCategoria: novoCategoria });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha ao cadastrar Categoria` });
    }
  }

  static async atualizarCategoria (req, res) {
    try {
      const id = req.params.id;
      await categoriaModel.setAtualizar(id, req.body);
      res.status(200).json({ message: "Categoria atualizado com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na atualização` });
    }
  }


  static async excluirCategoria (req, res) {
    try {
      const id = req.params.id;
      await categoriaModel.excluir(id);
      res.status(200).json({ message: "Categoria excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
    }
  }

};

export default CategoriaController;