<?php
include_once('../Model/userModel.php');
session_start();
$userModel = new UserModel();
if (!$userModel->isLoggedIn()) {
    header('Location: ../View/loginView.php');
    exit();
}
header('Location: ../View/FuncionarioView.php');
exit();

?>