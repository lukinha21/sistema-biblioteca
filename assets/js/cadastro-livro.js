let allBooks = [];

const fields = document.querySelectorAll("input");
const modal = document.querySelector("#myModal");

const txtsinopse = document.querySelector("#txtsinopse");
const btnRegister = document.querySelector("#btnRegister");
const botao_novo = document.querySelector("#botao-novo");
const tblContent = document.querySelector('.tbl_content tbody');
const btnCloseModal = document.querySelector("#btnCloseModal");

function showsinopse(titulo) {
  
  txtsinopse.innerHTML = allBooks.find(book => book.titulo === titulo)?.sinopse || '';
  modal.style.display = "block";
}

function openEditModal(titulo) {
  const book = allBooks.find(book => book.titulo === titulo);
  if (book) {
    // Preencher os campos do modal com as informações do livro para edição
    // Substitua os campos abaixo pelos campos reais do seu modal de edição
    document.querySelector('input[name="status"]:checked').value;
    document.querySelector("#titulo").value = book.titulo;
    document.querySelector("#autor").value = book.autor;
    document.querySelector("#categoria").value = book.categoria;
    document.querySelector("#subcategoria").value = book.categoria;
    document.querySelector("#ISBN").value = book.ISBN;
    document.querySelector("#URLimage").value = book.URLimage;
    document.querySelector("#sinopse").value = book.sinopse;


    // Exibir o modal de edição
    
    modal.style.display = "block";
    btnCloseModal.addEventListener("click", closeModal);
    window.addEventListener("click", closeModalWindow);
  }
}

function openAddModal() {
  // Limpar os campos do modal para adicionar um novo livro
  clearFields();

  // Exibir o modal para adicionar um novo livro
  modal.style.display = "block";
  btnCloseModal.addEventListener("click", closeModal);
  window.addEventListener("click", closeModalWindow);
  console.log(titulo)
}

function closeModal() {
  modal.style.display = "none";
}

function closeModalWindow(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function removeBook(titulo) {
  // const index = allBooks.findIndex(book => book.titulo === titulo);
  // if (index !== -1) {
  //   allBooks.splice(index, 1);
  //   saveToLocalStorage();
  //   updateList();


    // Use SweetAlert para obter uma confirmação
    Swal.fire({
      title: "Deseja deletar este livro?",
      text: "Todos os exemplares associados a ele serão deletados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, quero deletar!"
  }).then((result) => {
      // Se o usuário confirmar, execute a lógica de exclusão
      if (result.isConfirmed) {
          const index = allBooks.findIndex(book => book.titulo === titulo);
          if (index !== -1) {
              allBooks.splice(index, 1);
              saveToLocalStorage();
              updateList();
              Swal.fire({
                  title: "Deletado!",
                  text: "O livro foi removido do acervo.",
                  icon: "success"
              });
          }
      } else {
          // Se o usuário clicar em "Cancelar" ou fechar a caixa de diálogo, não faça nada
          console.log('A exclusão foi cancelada.');
      }
  });
  //updateList();
  
}

function clearFields() {
  fields.forEach(elem => (elem.value = ""));
}

function adionaLivroTabela(book) {
  console.log("Adicionando livro à tabela:", book);
  const card = document.createElement("tr");
  card.innerHTML = `
    <td>${book.titulo}</td>
    <td>${book.autor}</td>
    <td>${book.categoria}</td>
    <td>0</td>
    <td>${book.status}</td>
    <td style="text-align:end;">
      <button class="botao-editar" style="background: rgb(121, 113, 113);" data-titulo="${book.titulo}"><i id="icone-tabela"class="material-symbols-outlined">edit_document</i></button>
      <button class="botao-remover" style="background: rgb(168, 7, 7);" data-titulo="${book.titulo}"><i id="icone-tabela" class="material-symbols-outlined">delete</i></button>
      </td>
  `;
  return card;
}

function updateList() {
  tblContent.innerHTML = '';
  allBooks.forEach(book => {
    const bookCard = adionaLivroTabela(book);
    tblContent.appendChild(bookCard);
  });
}

function saveToLocalStorage() {
  localStorage.setItem('bookList', JSON.stringify(allBooks));
 
}

function readFromLocalStorage() {
  const storedBooks = localStorage.getItem('bookList');
  return storedBooks ? JSON.parse(storedBooks) : [];
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

function registerBook() {
  closeModal()
  success()
  const titulo = document.querySelector("#titulo").value;
  console.log(titulo);
  const existingBook = allBooks.find(book => book.titulo === titulo);

  if (existingBook) {
    // Update existing book
    existingBook.status = document.querySelector('input[name="status"]:checked').value;
    existingBook.autor = document.querySelector("#autor").value;
    existingBook.categoria = document.querySelector("#categoria").value;
    existingBook.subcategoria = document.querySelector("#subcategoria").value;
    existingBook.ISBN = document.querySelector("#ISBN").value;
    existingBook.URLimage = document.querySelector("#URLimage").value;
    existingBook.sinopse = document.querySelector("#sinopse").value;
    
 
  } else {
    // Add new book
    const newBook = {
      status: document.querySelector('input[name="status"]:checked').value,
      titulo,
      autor: document.querySelector("#autor").value,
      categoria: document.querySelector("#categoria").value,
      subcategoria: document.querySelector("#subcategoria").value,
      ISBN: document.querySelector("#ISBN").value,
      URLimage: document.querySelector("#URLimage").value,
      sinopse: document.querySelector("#sinopse").value
    };

    

    allBooks.push(newBook);
  }

  saveToLocalStorage();
  updateList();
  clearFields();

  

 
}

function loadBookList() {
  allBooks = readFromLocalStorage();
  updateList();
}

function handleButtonClick(event) {
  const titulo = event.target.dataset.titulo;
  if (event.target.classList.contains("btnSinopsys")) {
    showsinopse(titulo);
  } else if (event.target.classList.contains("botao-editar")) {
    openEditModal(titulo);
  } else if (event.target.classList.contains("botao-remover")) {
    removeBook(titulo);
  }
}

function createCard(bookCard, titulo, autor, categoria, subcategoria, ISBN, URLimage) {
  const card = document.createElement('div');
  card.className = titulo
  card.innerHTML = `
    <p id="bookTitle">${titulo}</p>
    <img src="${URLimage}"/>
    Autor: ${autor}
    <br>Editora: ${categoria}
    <br>Págs: ${ISBN}
    <button class="btnSinopsys" titulo="${titulo}">Sinopse</button>
    `
    return card;
}

function displayBooksFromLocalStorageCard() {
  const bookList = JSON.parse(localStorage.getItem('bookList')) || [];
  // const listOfAllBooks = document.querySelector("#listOfAllBooks")
  const container = document.querySelector("#listOfAllBooks") // Substitua 'booksContainer' pelo ID real do seu contêiner

  // Itere sobre a lista de livros e crie um card para cada livro
  bookList.forEach(function(book) {
    const bookCard = createCard(book.titulo, book.autor, book.categoria, book.subcategoria, book.ISBN, book.URLimage);
    container.appendChild(bookCard);
  });

  if (bookList.length == 0)
    $("#listOfAllBooks").hide();
    else
  $("#NoBooks").hide();
  
}

function OnOff(){
  $("#NoBooks").toggle();
  $("#listOfAllBooks").toggle();

}



$( document ).ready(function() {
  displayBooksFromLocalStorageCard();
});


// Event Listeners
botao_novo.addEventListener("click", openAddModal);

btnRegister.addEventListener("click", function (event) { event.preventDefault();})
tblContent.addEventListener("click", handleButtonClick);
document.getElementById('ativo').checked = true;

// Carregar lista de livros ao iniciar a página
loadBookList();
document.addEventListener("DOMContentLoaded", function () {
  displayBooksFromLocalStorageCard(); // Chame a função que exibe os cards
});