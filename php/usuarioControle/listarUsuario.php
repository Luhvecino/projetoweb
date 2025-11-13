<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "PUC@1234", "projetoweb");

if(!$conexao){
    echo json_encode([]);
    exit;
}

// Verifica se foi passado o parâmetro 'email' na URL
if(isset($_GET['email']) && !empty($_GET['email'])) {
    $email = mysqli_real_escape_string($conexao, $_GET['email']);
    $sql = "SELECT id, email, senha FROM usuarios WHERE email LIKE '%$email%'";
} else {
    // Se não houver parâmetro, busca todos os usuários
    $sql = "SELECT id, email, senha FROM usuarios";
}

$resultado = mysqli_query($conexao, $sql);

if(!$resultado){
    echo json_encode([]);
    exit;
}

$rows = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

echo json_encode($rows);

mysqli_close($conexao);
?>