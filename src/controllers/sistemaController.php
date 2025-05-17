<?php
include_once('../Model/sistemaModel.php');
include_once('../Model/Database.php');
include_once('../Controller/UsuarioController.php'); // Certifique-se de incluir o arquivo do controlador



// Crie uma instância de Database para obter a conexão
$database = new Database();
$conexao = $database->conexao;

$sistemaModel = new SistemaModel($conexao);
$result = $sistemaModel->getUsuarios($_GET['search'] ?? '');
$usuarioController = new usuarioController($conexao); // Crie a instância aqui


if (!empty($_GET['action']) && $_GET['action'] === 'delete' && !empty($_GET['id'])) {
    $id = $_GET['id'];
    $usuarioController->excluirUsuario($id);
}

if ($result === false) {
    // A consulta falhou, você pode tratar o erro de alguma forma ou redirecionar o usuário para uma página de erro.
    echo "Erro na consulta de usuários.";
} else {
    // A consulta foi bem-sucedida, inclua a view
    include_once('../View/SistemaView.php');
}

// Adicione estas linhas
if (!empty($_GET['action']) && !empty($_GET['id'])) {
    $action = $_GET['action'];
    $id = $_GET['id'];

    switch ($action) {
        case 'delete':
            $usuarioController->excluirUsuario($id);
            break;
        // Adicione outros casos conforme necessário
    }
}
// Adicione esta verificação
if ($result === false) {
    // A consulta falhou, você pode tratar o erro de alguma forma ou redirecionar o usuário para uma página de erro.
    echo "Erro na consulta de usuários.";
} else {
    // A consulta foi bem-sucedida, inclua a view
    include_once('../View/SistemaView.php');
}
?>