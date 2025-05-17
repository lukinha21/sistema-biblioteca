import LivroModel from "../models/livro-model.js";

const livroModel = new LivroModel();

class LivroController {
  static async listarLivros (req,res) {

    try {
      const listaLivro = await livroModel.getExibir();
      res.status(200).json(listaLivro);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async buscarLivroId (req,res) {

    try {
      const id = req.params.id;
      const livroById = await livroModel.getbusca(id);
      res.status(200).json(livroById);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async cadastrarLivro (req, res) {
    try {
      //const jsonData = JSON.parse(req.body);
      const novoLivro = await livroModel.setCadastrar(req.body);
      res.status(201).json({ message: "Criado com sucesso", idLivro: novoLivro });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro` });
    }
  }

  static async atualizarLivro (req, res) {
    try {
      const id = req.params.id;
      await livroModel.setAtualizar(id, req.body);
      res.status(200).json({ message: "Livro atualizado com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na atualização` });
    }
  }


  static async excluirLivro (req, res) {
    try {
      const id = req.params.id;
      await livroModel.excluir(id);
      res.status(200).json({ message: "Livro excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
    }
  }

  static async listarCategorias (req,res) {

    try {
      const listaCategorias = await livroModel.listaCategoria();
      res.status(200).json(listaCategorias);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }
};



export default LivroController;