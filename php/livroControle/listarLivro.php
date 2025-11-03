<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

if(!$conexao){
    echo json_encode([]);
    exit;
}

// Lista todos os livros da tabela `livros` (crie a tabela conforme instruções se não existir)
$sql = "SELECT id, titulo, autor, price, imageUrl FROM livros";

$resultado = mysqli_query($conexao, $sql);

if(!$resultado){
    echo json_encode([]);
    exit;
}

$rows = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

echo json_encode($rows);

mysqli_close($conexao);

?>