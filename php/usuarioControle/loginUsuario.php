<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");

if (!$conexao) {
    echo json_encode(["success" => false, "message" => "Conexão falhou: " . mysqli_connect_error()]);
    exit;
}

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$senha = isset($_POST['senha']) ? $_POST['senha'] : '';

if ($email === '' || $senha === '') {
    echo json_encode(["success" => false, "message" => "Login e senha são obrigatórios."]);
    exit;
}

$sql = "SELECT id, email, role FROM usuarios WHERE email = ? AND senha = ? LIMIT 1";
$stmt = mysqli_prepare($conexao, $sql);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Erro ao preparar consulta: " . mysqli_error($conexao)]);
    exit;
}

mysqli_stmt_bind_param($stmt, "ss", $email, $senha);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($result);

if ($row) {
    $_SESSION['usuario_id'] = $row['id'];
    $_SESSION['usuario_role'] = isset($row['role']) ? $row['role'] : 1;

    echo json_encode([
        "success" => true,
        "message" => "Login realizado com sucesso.",
        "user" => $row
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Email ou senha inválidos."]);
}

mysqli_stmt_close($stmt);
mysqli_close($conexao);
?>
