<?php
class UsuarioView {
    public function render($usuarios) {
        // Aqui você pode colocar o código HTML e a lógica para exibir os usuários
        foreach ($usuarios as $usuario) {
            echo "<tr>";
            echo "<td>" . $usuario['idUsuario'] . "</td>";
            echo "<td>" . $usuario['login'] . "</td>";
            echo "<td>" . $usuario['senha'] . "</td>";
            echo "<td>" . $usuario['Funcionario_Pessoa_idPessoa'] . "</td>";
            echo "<td>" . $usuario['Leitor_Pessoa_idPessoa'] . "</td>";
            echo "<td>" . $usuario['nivel_priv'] . "</td>";
            echo "<td>" . $usuario['ativo'] . "</td>";
            echo "<td>";
            // Adicionando a condição para verificar se idUsuario é diferente de 1 (usuario admin)
            if ($usuario['idUsuario'] != 1) {
                echo "<a class='btn btn-sm btn-primary' href='edit.php?id=" . $usuario['idUsuario'] . "' title='Editar'>Editar</a>";
                echo "<a class='btn btn-sm btn-danger' href='delete.php?id=" . $usuario['idUsuario'] . "' title='Deletar'>Deletar</a>";
            }
            echo "</td>";
            echo "</tr>";
        }
    }
}

?>