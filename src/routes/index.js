import livros from "./livros-route.js"
import categorias from "./categorias-route.js"
import autores from "./autores-route.js"
import bodyParser from "body-parser";
import Swal from 'sweetalert2';

//controle das rotas

const routes = (app) => {
    app.route("/").get((req,res) =>
    res.status(200).send("Sistema bibliotecário"));
    app.use(bodyParser.json(), livros, categorias, autores);
}

export default routes;