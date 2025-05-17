<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Gerenciar Usuarios</title>
    <style>
        body{
            background: linear-gradient(to right, rgb(20, 147, 220), rgb(17, 54, 71));
            color: white;
            text-align: center;
        }
        .table-bg{
            background: rgba(0, 0, 0, 0.3);
            border-radius: 15px 15px 0 0;
            
        }

        .box-search{
            display: flex;
            justify-content: center;
            gap: .1%;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="d-flex">
            <a href="indexController.php" class="btn btn-danger me-5">Voltar</a>
        </div>
    </nav>
    <br>
    <br>
    <div class="m-5">
    <div class="d-flex">
            <a href="../Controller/formularioController.php" class="btn btn-danger me-5">Adicionar Usuario</a>
        </div>
        <table class="table text-white table-bg">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">login</th>
                    <th scope="col">Senha</th>
                    <th scope="col">IdFuncionario</th>
                    <th scope="col">IdPessoa</th>
                    <th scope="col">Nivel de privilegio</th>
                    <th scope="col">ativo</th>
                    <th scope="col">...</th>
                </tr>
            </thead>
            <tbody>
            <?php
                while ($user_data = mysqli_fetch_assoc($result)) {
                    echo "<tr>";
                    echo "<td>" . $user_data['idUsuario'] . "</td>";
                    echo "<td>" . $user_data['login'] . "</td>";
                    echo "<td>" . $user_data['senha'] . "</td>";
                    echo "<td>" . $user_data['Funcionario_Pessoa_idPessoa'] . "</td>";
                    echo "<td>" . $user_data['Leitor_Pessoa_idPessoa'] . "</td>";
                    echo "<td>" . $user_data['nivel_priv'] . "</td>";
                    echo "<td>" . $user_data['ativo'] . "</td>";
                    echo "<td>";

                    // Adicionando a condição para verificar se idUsuario é diferente de 1 (usuario admin)
                    if ($user_data['idUsuario'] != 1) {
                        echo "<a class='btn btn-sm btn-primary' href='../Controller/usuarioController.php?action=edit&id={$user_data['idUsuario']}' title='Editar''name=edit'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-pencil' viewBox='0 0 16 16'>
                                    <path d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/>
                                </svg>
                            
                                <a class='btn btn-sm btn-danger' href='../Controller/usuarioController.php?action=delete&id={$user_data['idUsuario']}' title='Deletar''name=delete'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-trash-fill' viewBox='0 0 16 16'>
                                    <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z'/>
                                </svg>
                            </a>";
                    }

                    echo "</td>";
                    echo "</tr>";
                }
                ?>

            </tbody>
        </table>
    </div>
</body>
<script>
    var search = document.getElementById('pesquisar');

    search.addEventListener("keydown", function(event) {
        if (event.key === "Enter") 
        {
            searchData();
        }
    });

    function searchData()
    {
        window.location = 'sistemaView.php?search='+search.value;
    }
</script>
</html>