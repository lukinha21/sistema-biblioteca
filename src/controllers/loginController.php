<?php
include_once('../Model/UserModel.php');

// Inicia a sessão
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userModel = new UserModel();
    $isLoggedIn = $userModel->login($_POST['login'], $_POST['senha']);

    if ($isLoggedIn) {
        // Usuário autenticado com sucesso, redireciona com base no nível de privilégio
        if ($_SESSION['nivel_priv'] == '0') {
            header('Location: ../Controller/FuncionarioController.php');
            exit();
        } else if ($_SESSION['nivel_priv'] == '1') {
            header('Location: ../Controller/indexController.php');
            exit();
        }
    }

    // Se chegou até aqui, significa que o login falhou
    header('Location: ../View/loginView.php', true, 302);
    exit();
}
?>
