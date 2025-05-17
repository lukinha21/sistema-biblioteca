<?php
include_once('../View/UsuarioView.php');
include_once('../Model/Database.php');
include_once('../Model/UsuarioModel.php');






class UsuarioModel {


    
    private $conexao;

    public function __construct($conexao) {
        $this->conexao = $conexao;
    }
    public function cadastrarUsuario($login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo) {
        $query = "INSERT INTO usuario(login, senha, Funcionario_Pessoa_idPessoa, Leitor_Pessoa_idPessoa, nivel_priv, ativo) 
                  VALUES ('$login', '$senha', '$idFunc', '$idPessoa', '$nivel_priv', '$ativo')";

        return mysqli_query($this->conexao, $query);
    }

    public function getUsuarioById($id) {
        $sql = "SELECT * FROM usuario WHERE idUsuario=$id";
        $result = $this->conexao->query($sql);
    
        if ($result->num_rows > 0) {
            return $result->fetch_assoc();
        } else {
            return false;
        }
    }
    
    public function excluirUsuario($id) {
        // Use prepared statements para evitar injeção de SQL
        $stmt = $this->conexao->prepare("DELETE FROM usuario WHERE idUsuario = ?");
        
        // Verifique se a preparação da declaração foi bem-sucedida
        if ($stmt === false) {
            return false;
        }
    
        // Associe o parâmetro
        $stmt->bind_param("i", $id);
    
        // Execute a declaração
        $result = $stmt->execute();
    
        // Feche a declaração
        $stmt->close();
    
        return $result;
    }
    
    public function existeUsuarioComLogin($login, $idUsuario = null) {
        $query = "SELECT COUNT(*) as total FROM usuario WHERE login = '$login'";
    
        // Se estiver editando um usuário, exclua o usuário atual da verificação
        if ($idUsuario !== null) {
            $query .= " AND idUsuario <> $idUsuario";
        }
    
        $result = $this->conexao->query($query);
        
        if ($result) {
            $row = $result->fetch_assoc();
            return $row['total'] > 0;
        }
    
        return false;
    }
    
    
    
    public function updateUsuario($id, $login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo) {
        // Use prepared statements para evitar injeção de SQL
        $stmt = $this->conexao->prepare("UPDATE usuario SET login=?, senha=?, Funcionario_Pessoa_idPessoa=?, Leitor_Pessoa_idPessoa=?, nivel_priv=?, ativo=? WHERE idUsuario=?");

        // Verifique se a preparação da declaração foi bem-sucedida
        if ($stmt === false) {
            return false;
        }

        // Associe os parâmetros
        $stmt->bind_param("ssiiiii", $login, $senha, $idFunc, $idPessoa, $nivel_priv, $ativo, $id);

        // Execute a declaração
        $result = $stmt->execute();

        // Feche a declaração
        $stmt->close();

        return $result;
    }
}


?>