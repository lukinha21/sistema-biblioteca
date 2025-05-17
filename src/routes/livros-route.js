import express from "express"
import LivroController from "../controllers/livro-controller.js"

const routes = express.Router();
//routes.use(express.json())
routes.get("/livros", LivroController.listarLivros);
routes.post("/livros", LivroController.cadastrarLivro);
routes.get("/livros/:id", LivroController.buscarLivroId);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.excluirLivro);

export default routes