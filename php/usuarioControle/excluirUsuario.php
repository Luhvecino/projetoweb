<?php
header('Content-Type: application/json');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

// Verifica se o ID foi passado via POST ou GET
$id = $_POST['id'] ?? $_GET['id'] ?? null;

$sql = "DELETE FROM usuarios WHERE id = ?";
$stmt = mysqli_prepare($conexao, $sql);

if(!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro no prepared statement: " . mysqli_error($conexao)]);
    exit;
}

// Vincula o parâmetro
mysqli_stmt_bind_param($stmt, "i", $id);

// Executa a query
$resultado = mysqli_stmt_execute($stmt);

// Fecha os recursos
mysqli_stmt_close($stmt);
mysqli_close($conexao);
?>