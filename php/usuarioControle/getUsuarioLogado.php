<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "PUC@1234", "projetoweb");

if (!$conexao) {
    echo json_encode(["success" => false, "message" => "Conexão falhou: " . mysqli_connect_error()]);
    exit;
}

$userId = isset($_SESSION['usuario_id']) ? intval($_SESSION['usuario_id']) : 0;

if ($userId <= 0) {
    echo json_encode(["success" => false, "message" => "Usuário não autenticado."]);
    exit;
}

$sql = "SELECT id, email, senha, role FROM usuarios WHERE id = ? LIMIT 1";
$stmt = mysqli_prepare($conexao, $sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro ao preparar statement: " . mysqli_error($conexao)]);
    exit;
}

mysqli_stmt_bind_param($stmt, 'i', $userId);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($res);

if ($row) {
    echo json_encode(["success" => true, "user" => $row]);
} else {
    echo json_encode(["success" => false, "message" => "Usuário não encontrado."]);
}

mysqli_stmt_close($stmt);
mysqli_close($conexao);
?>
