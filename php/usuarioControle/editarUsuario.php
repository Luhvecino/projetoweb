<?php
header('Content-Type: application/json; charset=utf-8');
session_start();

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

if (!$conexao) {
    echo json_encode(["success" => false, "message" => "Conexão falhou: " . mysqli_connect_error()]);
    exit;
}

// Verifica se o usuário está logado
if (!isset($_SESSION['usuario_id'])) {
    echo json_encode(["success" => false, "message" => "Usuário não está logado."]);
    exit;
}

$id = $_SESSION['usuario_id'];
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';

// Validação
if ($email === '' || $senha === '') {
    echo json_encode(["success" => false, "message" => "Email e senha são obrigatórios."]);
    exit;
}

// Atualiza o usuário
$sql = "UPDATE usuarios SET email = ?, senha = ? WHERE id = ?";
$stmt = mysqli_prepare($conexao, $sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro ao preparar statement: " . mysqli_error($conexao)]);
    exit;
}

mysqli_stmt_bind_param($stmt, 'ssi', $email, $senha, $id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Usuário atualizado com sucesso."]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao atualizar usuário: " . mysqli_stmt_error($stmt)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conexao);
?>
