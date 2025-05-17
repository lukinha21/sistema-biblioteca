<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Usuario</title>
    <style>
        body{
            font-family: Arial, Helvetica, sans-serif;
            background-image: linear-gradient(to right, rgb(20, 147, 220), rgb(17, 54, 71));
        }
        .box{
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: rgba(0, 0, 0, 0.6);
            padding: 15px;
            border-radius: 15px;
            width: 20%;
        }
        fieldset{
            border: 3px solid dodgerblue;
        }
        legend{
            border: 1px solid dodgerblue;
            padding: 10px;
            text-align: center;
            background-color: dodgerblue;
            border-radius: 8px;
        }
        .inputBox{
            position: relative;
        }
        .inputUser{
            background: none;
            border: none;
            border-bottom: 1px solid white;
            outline: none;
            color: white;
            font-size: 15px;
            width: 100%;
            letter-spacing: 2px;
        }
        .labelInput{
            position: absolute;
            top: 0px;
            left: 0px;
            pointer-events: none;
            transition: .5s;
        }
        .inputUser:focus ~ .labelInput,
        .inputUser:valid ~ .labelInput{
            top: -20px;
            font-size: 12px;
            color: dodgerblue;
        }
        #data_nascimento{
            border: none;
            padding: 8px;
            border-radius: 10px;
            outline: none;
            font-size: 15px;
        }
        #submit{
            background-image: linear-gradient(to right,rgb(0, 92, 197), rgb(90, 20, 220));
            width: 100%;
            border: none;
            padding: 15px;
            color: white;
            font-size: 15px;
            cursor: pointer;
            border-radius: 10px;
        }
        #submit:hover{
            background-image: linear-gradient(to right,rgb(0, 80, 172), rgb(80, 19, 195));
        }
    </style>
</head>
<body>
    <a href="../Controller/sistemaController.php">Voltar</a>
    <div class="box">
        <form action="../Controller/formularioController.php" method="POST">
            <input type="hidden" name="idUsuario" value="<?php echo isset($usuario['idUsuario']) ? $usuario['idUsuario'] : ''; ?>">
            <fieldset>
                <legend><b>Fórmulário de Usuarios</b></legend>
                <br>
                <div class="inputBox">
                <input type="text" name="login" id="login" class="inputUser" required value="<?php echo isset($usuario['login']) ? $usuario['login'] : ''; ?>">
                    <label for="login" class="labelInput">login*</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="senha" id="senha" class="inputUser"  required value="<?php echo isset($usuario['senha']) ? $usuario['senha'] : ''; ?>">
                    <label for="senha" class="labelInput">Senha*</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="Funcionario_Pessoa_idPessoa" id="idfunc" class="inputUser"  required value="<?php echo isset($usuario['Funcionario_Pessoa_idPessoa']) ? $usuario['Funcionario_Pessoa_idPessoa'] : ''; ?>">
                    <label for="idfunc" class="labelInput">Id do Funcionario*</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="Leitor_Pessoa_idPessoa" id="idPessoa" class="inputUser"  required value="<?php echo isset($usuario['Leitor_Pessoa_idPessoa']) ? $usuario['Leitor_Pessoa_idPessoa'] : ''; ?>">
                    <label for="Leitor_Pessoa_idPessoa" class="labelInput">Id da Pessoa*</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="nivel_priv" id="nivel_priv" class="inputUser"  required value="<?php echo isset($usuario['nivel_priv']) ? $usuario['nivel_priv'] : ''; ?>">
                    <label for="nivel_priv" class="labelInput">Nivel de Privilegio* (0 ou 1)</label>
                </div>
                <br><br>
                <div class="inputBox">
                    <input type="text" name="ativo" id="ativo" class="inputUser" required value="<?php echo isset($usuario['ativo']) ? $usuario['ativo'] : ''; ?>">
                    <label for="ativo" class="labelInput">Ativo ou não* (1 ou 0)</label>
                </div>
            
                <br><br>
                <input type="submit" name="submit" id="submit">
            </fieldset>
        </form>
    </div>
</body>
</html>
