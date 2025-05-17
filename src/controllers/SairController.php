<?php
session_start();

// Realiza o logout removendo as variáveis de sessão
unset($_SESSION['login']);
unset($_SESSION['senha']);
unset($_SESSION['nivel_priv']);

// Redireciona para a página de login
header("Location: ../View/loginView.php");
exit();
?>
