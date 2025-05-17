import express from "express"
import CategoriaController from "../controllers/categoria-controller.js"

const routes = express.Router();
//routes.use(express.json())
routes.get("/categorias", CategoriaController.listarCategorias);
routes.post("/categorias", CategoriaController.cadastrarCategoria);
routes.get("/categorias/:id", CategoriaController.buscarCategoriaId);
routes.put("/categorias/:id", CategoriaController.atualizarCategoria);
routes.delete("/categorias/:id", CategoriaController.excluirCategoria);

export default routes