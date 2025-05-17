
let allBooks = [];
let allCategorias = [];
let allAutores = [];

const fields = document.querySelectorAll("input");
const modal = document.querySelector("#myModal");
const txtsinopse = document.querySelector("#txtsinopse");
const btnRegister = document.querySelector("#btnRegister");
const botao_novo = document.querySelector("#botao-novo");
const tblContent = document.querySelector('.tbl_content tbody');
const btnCloseModal = document.querySelector("#btnCloseModal");
const categoria = document.querySelector('.select-formulario-exemplar#categoria');
const inputBuscaExemplar = document.querySelector("[data-pesquisa]");
const botaoDePesquisa = document.querySelector("[data-botao-pesquisa]");


async function carregarExemplars() {
    try {
      const conexao = await fetch('http://localhost:3000/exemplars');
      const exemplars = await conexao.json();
      console.log(exemplars)
      allBooks = exemplars;
      updateList();
    } catch (error) {
      console.error('Erro ao carregar exemplars:', error);
    }
}

function adionaExemplarTabela(book) {
//   console.log("Adicionando exemplar à tabela:", book);
  const linha = document.createElement("tr");
  linha.setAttribute('data-lista','');
  linha.innerHTML = `
    <td style="width: 25%;">${book.titulo}</td>
    <td>${book.autor}</td>
    <td>${book.categoria}</td>
    <td>0</td>
    <td>${book.status}</td>
    <td  data-idExemplar="${book.idExemplar}">
      <button class="botao-exemplar" style="background: rgb(121, 113, 113);"><i id="icone-tabela"class="material-symbols-outlined">edit_document</i></button>
      <button class="botao-editar" style="background: rgb(121, 113, 113);"><i id="icone-tabela"class="material-symbols-outlined">edit_document</i></button>
      <button class="botao-remover" style="background: rgb(168, 7, 7);"><i id="icone-tabela" class="material-symbols-outlined">delete</i></button>
      </td>
    `;
  return linha;
}

async function adicionaCategoria() {
    try {
        const conexao = await fetch('http://localhost:3000/categorias');
        const categorias = await conexao.json();
        allCategorias = categorias;

        categoria.innerHTML = '';

        allCategorias.forEach(cat => {
            const optionElement = document.createElement('option');
            optionElement.value = cat.idCategoria;
            optionElement.textContent = cat.nome;
            categoria.appendChild(optionElement);
        });
    } catch (error) {
        console.error('Erro ao obter categorias:', error);
    }
}

// async function adicionaAutores() {
//   try {
//     const conexao = await fetch('http://localhost:3000/autores');
//       const autores = await conexao.json();
//       allAutores = autores;
      
//   } catch (error) {
//       console.error('Erro ao obter categorias:', error);
//   }
// }


async function updateList() {
  tblContent.innerHTML = '';

  allBooks.forEach(book => {
    const bookLinha = adionaExemplarTabela(book);
    tblContent.appendChild(bookLinha);
  });
}

async function buscaLivAutor(event) {
  event.preventDefault();
  tblContent.innerHTML = '';

  const buscaExemplarAutor = document.querySelector("[data-pesquisa]").value.toLowerCase();

  const filteredBooks = allBooks.filter(book =>
    book.titulo.toLowerCase().includes(buscaExemplarAutor) ||
    book.autor.toLowerCase().includes(buscaExemplarAutor)
  );
  filteredBooks.forEach(book => {
    const bookLinha = adionaExemplarTabela(book);
    tblContent.appendChild(bookLinha);
  });
}

function handleButtonClick(event) {
    const id = event.target.parentNode.dataset.idexemplar;
    //const idExemplar = allBooks.find(exemplar => exemplar.idExemplar === parseInt(idExemplarClicado));
 
    console.log(id)
    if (event.target.classList.contains("btnSinopsys")) {
      showsinopse(id);
    } else if (event.target.classList.contains("botao-editar")) {
      openEditModal(id);
    } else if (event.target.classList.contains("botao-remover")) {
      removeBook(id);
    }
}

function clearFields() {
  fields.forEach(elem => (elem.value = ""));
}

function closeModal() {
  modal.style.display = "none";
}

function closeModalWindow(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function success() {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  Toast.fire({
    icon: "success",
    title: "Signed in successfully"
  });
}


function openAddModal() {
  // Limpar os campos do modal para adicionar um novo exemplar
  clearFields();
  
  // Exibir o modal para adicionar um novo exemplar
  modal.style.display = "block";
  btnCloseModal.addEventListener("click", closeModal);
  window.addEventListener("click", closeModalWindow);
  //console.log(titulo)
}




  
  async function adicionarExemplar(event) {
    event.preventDefault();
  
    const form = document.getElementById('formExemplar');
    const titulo = form.elements.titulo.value;
    const autor = form.elements.autor.value;
    const categoria = form.elements.categoria.value;
  
    try {
      await fetch('http://localhost:3000/exemplars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo, autor, categoria }),
      });
  
      form.reset();
      carregarExemplars();
    } catch (error) {
      console.error('Erro ao adicionar exemplar:', error);
    }
  }



// const listaAutores = document.querySelector('[data-listaAutores]');
//   const inputAutor = document.querySelector("[data-autor]");

//   inputAutor.addEventListener("input", () => {



//     const termoPesquisa = inputAutor.value.toLowerCase();
  
//     // Filtra a lista de autores com base no termo de pesquisa
//     const autoresFiltrados = allAutores.filter(autor =>
//       autor.nome.toLowerCase().includes(termoPesquisa)
//     );
  
//     // Limpa o conteúdo da lista de autores
//     listaAutores.innerHTML = '';

//     // Adiciona uma opção padrão (se desejar)
//   const opcaoPadrao = document.createElement("option");
//   opcaoPadrao.value = "";
//   opcaoPadrao.textContent = "Selecione um autor";
//   selectAutores.appendChild(opcaoPadrao);
  
//     // Adiciona os autores filtrados à lista
//     autoresFiltrados.forEach(autor => {
//       const autorOption = document.createElement("option");
//       autorOption.value = autor.idAutor; // ou outra propriedade que você deseja
//       autorOption.textContent = autor.nome;
//       listaAutores.appendChild(autorOption);
//     });
//   });
  
  // ...
  
  // No seu código existente, você pode adicionar uma lista <select> no seu HTML
  // com um identificador, por exemplo:
  // <select id="listaAutores"></select>
  
  //const listaAutores = document.getElementById("listaAutores");
  
  async function registerBook(event) {
    event.preventDefault();
    closeModal()
    success()
   

      
      // Add new book
      
      const newBook = {
        titulo: document.querySelector("#titulo").value,
        ISBN: document.querySelector("#ISBN").value,
        status: 1,
        sinopse: document.querySelector("#sinopse").value,
        URLimagem: document.querySelector("#URLimage").value,
        idAutor: document.querySelector("#autor").value,
        idCategoria: document.querySelector("#categoria").value
      };
      console.log(newBook)
    
      // allBooks.push(newBook);
      try {
        await fetch('http://localhost:3000/exemplars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBook),
        });
    
        carregarExemplars();
      } catch (error) {
        console.error('Erro ao adicionar exemplar:', error);
      }
    clearFields();
  }
  
  async function removerExemplar(id) {
    console.log(id)
    try {
      const response = await fetch(`http://localhost:3000/exemplars/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        carregarExemplars();
      } else { console.error('Erro ao remover exemplar:', response.statusText); }
    } catch (error) {
      console.error('Erro ao remover exemplar:', error);
    }
  }


  function removeBook(id) {
    console.log(id)
    Swal.fire({
      title: "Deseja deletar este exemplar?",
      text: "Todos os exemplares associados a ele serão deletados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, quero deletar!"
  }).then((result) => {
      // Se o usuário confirmar, execute a lógica de exclusão
      if (result.isConfirmed) {
        removerExemplar(id)
        // updateList();
        Swal.fire({
        title: "Deletado!",
        text: "O exemplar foi removido do acervo.",
        icon: "success"
        }); 
    }});
}




// function showsinopse(titulo) {
  
//   txtsinopse.innerHTML = allBooks.find(book => book.titulo === titulo)?.sinopse || '';
//   modal.style.display = "block";
// }

function openEditModal(id) {
  console.log('ou')
  const book = allBooks.find(book => book.idExemplar == id);
  console.log(book)
  if (book) {
    
    //document.querySelector('input[name="status"]:checked').value;
    document.querySelector("#titulo").value = book.titulo;
    document.querySelector("#autor").value = book.autor;
    document.querySelector("#categoria").value = book.categoria;
    document.querySelector("#ISBN").value = book.ISBN;
    //document.querySelector("#URLimage").value = book.URLimagem;
    document.querySelector("#sinopse").value = book.sinopse;
    console.log(book)
    // Exibir o modal de edição
    
    modal.style.display = "block";
    btnCloseModal.addEventListener("click", closeModal);
    window.addEventListener("click", closeModalWindow);
    btnRegister.addEventListener("click", () => {
      book = {
        titulo: document.querySelector("#titulo").value,
        ISBN: document.querySelector("#ISBN").value,
        status: 1,
        sinopse: document.querySelector("#sinopse").value,
        URLimagem: document.querySelector("#URLimage").value,
        idAutor: document.querySelector("#autor").value,
        idCategoria: document.querySelector("#categoria").value
      };
      
      
    });
  }
}






// function loadBookList() {
//   allBooks = readFromLocalStorage();
//   updateList();
// }



// function createCard(bookCard, titulo, autor, categoria, subcategoria, ISBN, URLimage) {
//   const card = document.createElement('div');
//   card.className = titulo
//   card.innerHTML = `
//     <p id="bookTitle">${titulo}</p>
//     <img src="${URLimage}"/>
//     Autor: ${autor}
//     <br>Editora: ${categoria}
//     <br>Págs: ${ISBN}
//     <button class="btnSinopsys" titulo="${titulo}">Sinopse</button>
//     `
//     return card;
// }

// function displayBooksFromLocalStorageCard() {
//   const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
//   // const listOfAllBooks = document.querySelector("#listOfAllBooks")
//   const container = document.querySelector("#listOfAllBooks") // Substitua 'booksContainer' pelo ID real do seu contêiner

//   // Itere sobre a lista de exemplars e crie um card para cada exemplar
//   bookList.forEach(function(book) {
//     const bookCard = createCard(book.titulo, book.autor, book.categoria, book.subcategoria, book.ISBN, book.URLimage);
//     container.appendChild(bookCard);
//   });

//   if (bookList.length == 0)
//     $("#listOfAllBooks").hide();
//     else
//   $("#NoBooks").hide();
  
// }

// function OnOff(){
//   $("#NoBooks").toggle();
//   $("#listOfAllBooks").toggle();

// }

// $( document ).ready(function() {
//   displayBooksFromLocalStorageCard();
// });


// // Event Listeners
botao_novo.addEventListener("click", openAddModal);
btnRegister.addEventListener("click", registerBook);
// btnRegister.addEventListener("click", function (event) { event.preventDefault();})
tblContent.addEventListener("click", handleButtonClick);
// document.getElementById('ativo').checked = true;
document.addEventListener("DOMContentLoaded", function () {
    adicionaCategoria();
    //adicionaAutores();
  });
botaoDePesquisa.addEventListener("click", event => buscaLivAutor(event))
inputBuscaExemplar.addEventListener("keyup", function (event) {
  if (event.key === 'Enter') {
    buscaLivAutor(event);
  }
});
  

carregarExemplars();
// Carregar lista de exemplars ao iniciar a página
//loadBookList();
// document.addEventListener("DOMContentLoaded", function () {
//   displayBooksFromLocalStorageCard(); // Chame a função que exibe os cards
// });





