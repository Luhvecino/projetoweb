<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

if(!$conexao){
    echo json_encode([]);
    exit;
}

$sql = "SELECT id, email, senha FROM usuarios";

$resultado = mysqli_query($conexao, $sql);

if(!$resultado){
    echo json_encode([]);
    exit;
}

$rows = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

echo json_encode($rows);

mysqli_close($conexao);

?>