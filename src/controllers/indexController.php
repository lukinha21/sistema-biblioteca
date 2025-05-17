<?php
include_once(__DIR__ . '/../Model/userModel.php');
session_start();
$userModel = new UserModel();
if (!$userModel->isLoggedIn()) {
    header('Location: ..\View\loginView.php');
    exit();
}
header('Location: ../View/indexView.php');
exit();

?>