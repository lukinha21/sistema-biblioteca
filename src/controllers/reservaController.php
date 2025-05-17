<?php
include_once('../Model/Database.php');
include_once('../Model/ReservaModel.php');


$database = new Database();

$reservaModel = new ReservaModel($database);
// Certifique-se de que o construtor da ReservaModel não espera parâmetros

// Obtenha a lista de leitores e livros
$leitores = $reservaModel->getLeitores();
$livros = $reservaModel->getLivros();

// Verifica se o formulário foi submetido
if (isset($_POST['submit'])) {
    $dataReserva = $_POST['data_reserva'];
    $idPessoa = $_POST['Leitor_Pessoa_idPessoa'];
    $idLivro = $_POST['Livro_idLivro'];
    $dataLimite = $_POST['data_limite'];

    // Chama a função para cadastrar a reserva
    $result = $reservaModel->cadastrarReserva($dataReserva, $idPessoa, $idLivro, $dataLimite);

    if ($result) {
        header('Location: ../Controller/ReservaController.php');
        exit();
    } else {
        header('Location: ../Controller/indexController.php');
        exit();
    }
}

// Se o formulário não foi submetido, inclui a view
include('../View/formularioReservaView.php');
?>
