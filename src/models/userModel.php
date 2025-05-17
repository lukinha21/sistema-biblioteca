<?php
include_once('Database.php');

class UserModel {
    private $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function login($login, $senha) {
        $stmt = $this->db->conexao->prepare("SELECT * FROM usuario WHERE `login` = ? AND `senha` = ?");
        $stmt->bind_param("ss", $login, $senha);
        $stmt->execute();

        $result = $stmt->get_result();

        if ($result) {
            $user_data = $result->fetch_assoc();

            if ($user_data) {
                // Usuário encontrado, configure as variáveis de sessão
                $_SESSION['login'] = $login;
                $_SESSION['senha'] = $senha;
                $_SESSION['ativo'] = $user_data['ativo'];
                $_SESSION['nivel_priv'] = $user_data['nivel_priv'];

                if ($_SESSION['ativo'] == '1') {
                    // Usuário está ativo, redireciona para a página apropriada com base no nível de privilégio
                    return true; // Sucesso para redirecionar para indexFuncionarioController.php ou indexController.php
                } else {
                    // Usuário não está ativo
                    return false; // Falha, redireciona para loginController.php
                }
            } else {
                // Usuário não encontrado
                return false; // Falha, redireciona para loginController.php
            }
        } else {
            // Erro na consulta
            return false; // Falha, redireciona para loginController.php
        }
    }

    public function isLoggedIn() {
        return isset($_SESSION['login']) && isset($_SESSION['senha']);
    }
}
?>
