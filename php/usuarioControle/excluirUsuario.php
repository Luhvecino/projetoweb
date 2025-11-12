<?php
header('Content-Type: application/json');
session_start();

// Conexão com o banco
$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

if (mysqli_connect_errno()) {
    echo json_encode(["success" => false, "message" => "Erro de conexão: " . mysqli_connect_error()]);
    exit;
}

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["success" => false, "message" => "Usuário não está logado."]);
    exit;
}

$id = $_SESSION['usuario_id'];

// Prepara o comando SQL
$sql = "DELETE FROM usuarios WHERE id = ?";
$stmt = mysqli_prepare($conexao, $sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro no prepared statement: " . mysqli_error($conexao)]);
    exit;
}

// Vincula o parâmetro e executa
mysqli_stmt_bind_param($stmt, "i", $id);

if (mysqli_stmt_execute($stmt)) {
    // Encerra a sessão
    session_destroy();
    echo json_encode(["success" => true, "message" => "Conta excluída com sucesso."]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao excluir conta."]);
}

// Fecha os recursos
mysqli_stmt_close($stmt);
mysqli_close($conexao);
?>
