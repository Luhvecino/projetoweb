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
$data = json_decode(file_get_contents("php://input"), true);
$livro_id = $data['livro_id'] ?? null;

$sql = "INSERT INTO carrinho (usuario_id, livro_id) VALUES (?, ?)";
$stmt = mysqli_prepare($conexao, $sql);
if (!$stmt) { echo json_encode(["success"=>false, "message"=>"Erro ao preparar: " . mysqli_error($conexao)]); exit; }

mysqli_stmt_bind_param($stmt, 'ii', $userId, $livro_id);
mysqli_stmt_execute($stmt);

echo json_encode(["success" => true]);


mysqli_stmt_close($stmt);
mysqli_close($conexao);

?>
