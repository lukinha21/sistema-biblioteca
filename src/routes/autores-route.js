import express from "express"
import AutorController from "../controllers/autor-controller.js"

const routes = express.Router();
//routes.use(express.json())
routes.get("/autores", AutorController.listarAutores);
routes.post("/autores", AutorController.cadastrarAutor);
routes.get("/autores/:id", AutorController.buscarAutorId);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.excluirAutor);

export default routes