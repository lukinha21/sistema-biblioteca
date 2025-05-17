<?php
include_once('Database.php');

class ReservaModel {
    private $db;

    public function __construct($db = null) {
        // Se um objeto Database não foi passado, cria uma instância
        if ($db === null) {
            $this->db = new Database();
        } else {
            $this->db = $db;
        }
    }

    public function cadastrarReserva($dataReserva, $idPessoa, $idLivro, $dataLimite) {
        $query = "INSERT INTO reserva(data_reserva, Leitor_Pessoa_idPessoa, Livro_idLivro, data_limite) 
                  VALUES ('$dataReserva', '$idPessoa', '$idLivro', '$dataLimite')";

        return mysqli_query($this->db->conexao, $query);  // Verifique esta linha
    }

    public function getLeitores() {
        $sql = "SELECT leitor.Pessoa_idPessoa, pessoa.nome FROM leitor
                JOIN pessoa ON leitor.Pessoa_idPessoa = pessoa.idPessoa";
    
        $result = $this->db->query($sql);
    
        $leitores = [];
        while ($row = $result->fetch_assoc()) {
            $leitores[] = $row;
        }
    
        return $leitores;
    }
    

    public function getLivros() {
        $sql = "SELECT idLivro, titulo FROM livro";
        $result = $this->db->query($sql);

        $livros = [];
        while ($row = $result->fetch_assoc()) {
            $livros[] = $row;
        }

        return $livros;
    }
}

?>
