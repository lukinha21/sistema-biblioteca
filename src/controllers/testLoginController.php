<?php
include_once('../Model/UserModel.php');
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userModel = new UserModel();
    $isLoggedIn = $userModel->login($_POST['login'], $_POST['senha']);
    if ($isLoggedIn) {
        header('Location: ..\View\indexView.php');
    } else {
        header('Location: ..\View\loginView.php');
    }
    exit();
}
?>