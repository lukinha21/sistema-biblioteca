<?php
include_once('../Model/Database.php');
include_once('../Model/UsuarioModel.php');

$db = new Database(); // Agora a classe Database tem um método getConnection()
$usuarioModel = new UsuarioModel($db->getConnection()); // Certifique-se de passar a conexão corretamente

$db = new Database(); 
$usuarioModel = new UsuarioModel($db->getConnection()); 

// Verifica se há um ID na URL
if (!empty($_GET['id']) && !empty($_GET['action'])) {
    $id = $_GET['id'];
    $action = $_GET['action'];

    if ($action === 'edit') {
        // Ação de edição
        $usuario = $usuarioModel->getUsuarioById($id);

        if (!$usuario) {
            header('Location: ../View/sistemaView.php');
            exit();
        }

        include('../View/formularioUsuarioView.php');
        exit();
    } elseif ($action === 'delete') {
        // Ação de exclusão
        $resultDelete = $usuarioModel->excluirUsuario($id);

        if ($resultDelete) {
            header('Location: ../Controller/sistemaController.php');
            exit();
        } else {
            echo "Erro ao excluir usuário";
            exit();
        }
    }
}



$db = new Database(); // Agora a classe Database tem um método getConnection()
$usuarioModel = new UsuarioModel($db->getConnection()); // Certifique-se de passar a conexão corretamente

// Verificar se o formulário foi enviado para exclusão ou atualização



class UsuarioController {
    private $usuarioModel;

    public function __construct($conexao) {
        $this->usuarioModel = new UsuarioModel($conexao);
    }

    public function excluirUsuario($id) {
        
        $this->usuarioModel->excluirUsuario($id);
            header('Location: ../View/sistemaView.php');
            exit();

        }
    

    public function exibirFormularioEdicao($id) {
        $usuario = $this->usuarioModel->getUsuarioById($id);

        if (!$usuario) {
            header('Location: ../View/sistemaView.php');
            exit();
        }

        include('../View/formularioUsuarioView.php');
        exit();
    }

    public function atualizarUsuario($id, $login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo) {
        $result = $this->usuarioModel->updateUsuario($id, $login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo);

        if ($result) {
            header('Location: ../View/sistemaView.php');
            exit();
        } else {
            // Lógica de tratamento de erro, se necessário
            header('Location: ../View/sistemaView.php');
            echo "Erro ao atualizar usuário";
            exit();
        }
    }
}