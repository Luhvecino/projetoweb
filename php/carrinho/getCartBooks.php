<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");
if(!$conexao){
    echo json_encode(["success" => false, "message" => "Conexão falhou: " . mysqli_connect_error()]);
    exit;
}

$userId = isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : 0;
if ($userId <= 0) {
    echo json_encode(["success" => false, "message" => "Não autenticado"]);
    exit;
}

$sql = "SELECT c.id, l.imageUrl, l.titulo, l.price, l.autor FROM carrinho c JOIN livros l ON c.livro_id = l.id WHERE c.usuario_id = ?";
$stmt = mysqli_prepare($conexao, $sql);
if (!$stmt) { echo json_encode(["success"=>false, "message"=>"Erro ao preparar: " . mysqli_error($conexao)]); exit; }

mysqli_stmt_bind_param($stmt, 'i', $userId);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_all($res, MYSQLI_ASSOC);

if ($row) {
    echo json_encode(["success" => true, "books" => $row]);
} else {
    echo json_encode(["success" => true, "books" => []]);
}

mysqli_stmt_close($stmt);
mysqli_close($conexao);

?>
