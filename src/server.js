import express from "express";
import connection from "./db/connection.js";
import routes from "./routes/index.js"
import consign from "consign";
import bodyParser from "body-parser";

const conexao = await connection;
conexao.on("error", (erro) => {
    console.error("Erro de conexão.", erro);
  });
  
conexao.once("open", () => {
    console.log("Conexão com o banco feita com sucesso!");
  })

//função de subir e configurar o servidor
const app = express()
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

consign().include('controllers').into(app)
routes(app)
app.listen(PORT,() => {
    console.log(`-----> Servidor executando na porta: localhost:${PORT}`);
});

export default app

// app.get('/', async(req,res) => {
//     const query = await Livro();
//     return res.status(200).json(query);
//     //res.status(200).send("Curso de Node.js")
// })



//-----------------------------

// const livros = [
//     {
//         id: 1,
//         titulo: "A revolução dos bichos: Um conto de fadas",
//         ISBN: "8535909559",
//         status_livro: 1,
//         sinopse: "Verdadeiro clássico moderno, concebido por um dos mais influentes escritores do século XX, A revolução dos bichos é uma fábula sobre o poder. Narra a insurreição dos animais de uma granja contra seus donos. Progressivamente, porém, a revolução degenera numa tirania ainda mais opressiva que a dos humanos. ",
//         URLimage: "C:\Users\Vericoders\Desktop\sistema-biblioteca\images\A revolução dos bichos.png",
//         autor: 1,
//         categoria: 2
//     }
//     {
//         id: 2,
//         titulo: "O poder do hábito",
//         ISBN: "8539004119",
//         status_livro: 1,
//         sinopse: "Charles Duhigg, repórter investigativo do New York Times, mostra que a chave para o sucesso é entender como os hábitos funcionam - e como podemos transformá-los. Durante os últimos dois anos, uma jovem transformou quase todos os aspectos de sua vida. Parou de fumar, correu uma maratona e foi promovida. Em um laboratório, neurologistas descobriram que os padrões dentro do cérebro dela mudaram de maneira fundamental. Publicitários da Procter & Gamble observaram vídeos de pessoas fazendo a cama. Tentavam desesperadamente descobrir como vender um novo produto chamado Febreze, que estava prestes a se tornar um dos maiores fracassos na história da empresa. De repente, um deles detecta um padrão quase imperceptível - e, com uma sutil mudança na campanha publicitária, Febreze começa a vender um bilhão de dólares por anos. Um diretor executivo pouco conhecido assume uma das maiores empresas norte-americanas. Seu primeiro passo é atacar um único padrão entre os funcionários - a maneira como lidam com a segurança no ambiente de trabalho -, e logo a empresa começa a ter o melhor desempenho no índice Dow Jones.",
//         URLimage: "C:\Users\Vericoders\Documents\sistema-biblioteca\assets\images\O poder do hábito.jpg",
//         autor: 2,
//         categoria: 16
//     }
// ]

// function buscaLivro(id) {
//     return livros.findIndex(livro => {
//         return livro.id === Number(id)
//     })
// }

// app.get('/', async(req,res) => {
//     const query = await Livro();
//     return res.status(200).json(query);
//     //res.status(200).send("Curso de Node.js")
// })

// app.get("/livros", (req,res) => {
//     res.status(200).json(livros) //OK
// })

// app.get("/livros/:id", (req,res) => {
//     const index = buscaLivro(req.params.id);
//     res.status(200).json(livros[index])
// })

// app.post("/livros", (req,res) => {
//     livros.push(req.body)
//     res.status(201).send("livro cadastrado com sucesso") //CRIADO
// })

// app.put("/livros/:id", (req,res) => {
//     const index = buscaLivro(req.params.id);
//     livros[index].titulo =req.body.titulo
//     res.status(200).json(livros[index])//ALTERADO
// })

// app.delete("/livros/:id", (req,res) => {
//     const index = buscaLivro(req.params.id);
//     livros.splice(index, 1)
//     res.status(204).send("livro deletado com sucesso") //DELETADO      
// })