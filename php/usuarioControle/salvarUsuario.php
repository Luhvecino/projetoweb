<?php

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

if(!$conexao){
    die("conexão falhou: " . mysqli_connect_error());
}
 
$email = $_POST['email'];
$senha = $_POST['senha'];

$sql = "insert into usuarios (email, senha) values (?,?)";
$stmt = mysqli_prepare($conexao, $sql);

mysqli_stmt_bind_param($stmt, "ss" , $email, $senha);

if(mysqli_stmt_execute($stmt)){    
    $resultado["mensagem"] = "Usuário salvo com sucesso!";
} else {
    $resultado["mensagem"] = "Erro ao salvar usuário: ";
}

$resultado["email"] = $email;
$resultado["senha"] = $senha;

echo json_encode($resultado);

mysqli_stmt_close($stmt);
mysqli_close($conexao);

?>