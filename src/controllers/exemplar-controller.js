import ExemplarModel from "../models/exemplar-model.js";

const exemplarModel = new ExemplarModel();

class ExemplarController {
  static async listarExemplares (req,res) {

    try {
      const listaExemplar = await exemplarModel.getExibir();
      res.status(200).json(listaExemplar);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async buscarExemplarId (req,res) {

    try {
      const id = req.params.id;
      const ExemplarById = await exemplarModel.getbusca(id);
      res.status(200).json(ExemplarById);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na requisição` });
    } 
  }

  static async cadastrarExemplar (req, res) {
    try {
      //const jsonData = JSON.parse(req.body);
      const novoExemplar = await exemplarModel.setCadastrar(req.body);
      res.status(201).json({ message: "Criado com sucesso", idExemplar: novoExemplar });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha ao cadastrar Exemplar` });
    }
  }

  static async atualizarExemplar (req, res) {
    try {
      const id = req.params.id;
      await exemplarModel.setAtualizar(id, req.body);
      res.status(200).json({ message: "Exemplar atualizado com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na atualização` });
    }
  }


  static async excluirExemplar (req, res) {
    try {
      const id = req.params.id;
      await exemplarModel.excluir(id);
      res.status(200).json({ message: "Exemplar excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha na exclusão` });
    }
  }

};

export default ExemplarController;