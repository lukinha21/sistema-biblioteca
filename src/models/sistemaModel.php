<?php

class sistemaModel {

    private $conexao;

    public function __construct($conexao) {
        $this->conexao = $conexao;
    }

    public function getUsuarios($search) {
        $query = "SELECT * FROM usuario WHERE `login` LIKE '%$search%'";
        $result = mysqli_query($this->conexao, $query);

        // Adicione esta verificação
        if (!$result) {
            // A consulta falhou
            echo "Erro na consulta SQL: " . mysqli_error($this->conexao);
            return false;
        }

        return $result;
    }
}

?>
