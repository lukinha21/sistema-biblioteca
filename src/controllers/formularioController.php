<?php


include_once('../Model/Database.php');
include_once('../Model/UsuarioModel.php');


// Criar uma instância de Database para obter a conexão
$db = new Database();
$conexao = $db->getConnection();

$formularioController = new FormularioController($conexao);

// Se houver uma ação de edição, chamar o método para editar
if (isset($_GET['action']) && $_GET['action'] === 'edit' && !empty($_GET['id'])) {
    $id = $_GET['id'];
    $formularioController->editarUsuario($id);
} elseif (isset($_POST['submit'])) { // Verificar se o formulário foi enviado para cadastro
    $login = $_POST['login'];
    $senha = $_POST['senha'];
    $idFunc = $_POST['Funcionario_Pessoa_idPessoa'];
    $idPessoa = $_POST['Leitor_Pessoa_idPessoa'];
    $nivel_priv = $_POST['nivel_priv'];
    $ativo = $_POST['ativo'];

    // Chamar o método para cadastrar o usuário
    $formularioController->cadastrarUsuario($login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo);
}

class FormularioController {

    private $usuarioModel;
    private $funcionarioModel; // Adicionado para o modelo de Funcionário
    private $leitorModel;
    private $conexao;

    public function __construct($conexao) {
        $this->conexao = $conexao;
        $this->usuarioModel = new UsuarioModel($conexao);
        
    }

    public function cadastrarUsuario($login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo) {
        // Se estiver editando um usuário, exclua o usuário atual da verificação
        if (!empty($_POST['idUsuario'])) {
            $idUsuario = $_POST['idUsuario'];
            $usuarioAtual = $this->usuarioModel->getUsuarioById($idUsuario);
            
            // Se o login não foi alterado, podemos prosseguir com a atualização
            if ($usuarioAtual['login'] === $login) {
                $result = $this->usuarioModel->updateUsuario($idUsuario, $login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo);

                if ($result) {
                    header('Location: ../Controller/sistemaController.php');
                    exit();
                } else {
                    echo "Erro ao atualizar usuário";
                }
            }
        }

        // Verificar se já existe um usuário com o mesmo login
        if ($this->usuarioModel->existeUsuarioComLogin($login)) {
            echo "Já existe um usuário com este login.";
            return;
        }

        // Chamar o método para cadastrar o usuário
        $result = $this->usuarioModel->cadastrarUsuario($login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo);

        if ($result) {
            header('Location: ../Controller/sistemaController.php');
            exit();
        } else {
            echo "Erro ao cadastrar usuário";
        }
    }

    public function editarUsuario($id) {
        $usuario = $this->usuarioModel->getUsuarioById($id);

        if (!$usuario) {
            header('Location: ../Controller/sistemaController.php');
            exit();
        }

        // Inclua a view de edição aqui

    }
}   
     include('../View/formularioUsuarioView.php');
        exit();
?>
