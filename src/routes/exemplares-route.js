import express from "express"
import ExemplarController from "../controllers/exemplar-controller.js"

const routes = express.Router();
//routes.use(express.json())
routes.get("/exemplares", ExemplarController.listarExemplares);
routes.post("/exemplaers", ExemplarController.cadastrarExemplar);
routes.get("/exemplares/:id", ExemplarController.buscarExemplarId);
routes.put("/exemplares/:id", ExemplarController.atualizarExemplar);
routes.delete("/exemplares/:id", ExemplarController.excluirExemplar);

export default routes