<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

if(!$conexao){
    echo json_encode([]);
    exit;
}

// Verifica se foi passado o parâmetro 'titulo' na URL
if(isset($_GET['titulo']) && !empty($_GET['titulo'])) {
    $titulo = mysqli_real_escape_string($conexao, $_GET['titulo']);
    $sql = "SELECT id, titulo, autor, price, imageUrl FROM livros WHERE titulo LIKE '%$titulo%' OR autor LIKE '%$titulo%'";
} else {
    // Se não houver parâmetro, busca todos os livros
    $sql = "SELECT id, titulo, autor, price, imageUrl FROM livros";
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