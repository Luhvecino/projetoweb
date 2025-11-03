<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");


$titulo = $_POST['titulo'];
$autor = $_POST['autor'];
$price = $_POST['price'];
$imageUrl = $_POST['imageUrl'];

$sql = "INSERT INTO livros (titulo, autor, price, imageUrl) VALUES (?, ?, ?, ?)";

$stmt = mysqli_prepare($conexao, $sql);

mysqli_stmt_bind_param($stmt, 'ssds', $titulo, $autor, $price, $imageUrl);


if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Livro adicionado com sucesso.", "id" => mysqli_insert_id($conexao)]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao inserir: " . mysqli_stmt_error($stmt)]);
}


mysqli_stmt_close($stmt);
mysqli_close($conexao);

?>
