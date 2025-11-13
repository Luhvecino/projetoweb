<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "PUC@1234", "projetoweb");
if(!$conexao){
    echo json_encode(["success" => false, "message" => "Conexão falhou: " . mysqli_connect_error()]);
    exit;
}

$id = isset($_GET['id']) ? intval($_GET['id']) : (isset($_POST['id']) ? intval($_POST['id']) : 0);
if ($id <= 0) {
    echo json_encode(["success" => false, "message" => "ID inválido."]);
    exit;
}

$sql = "SELECT id, titulo, autor, price, imageUrl FROM livros WHERE id = ? LIMIT 1";
$stmt = mysqli_prepare($conexao, $sql);
if (!$stmt) { echo json_encode(["success"=>false, "message"=>"Erro ao preparar: " . mysqli_error($conexao)]); exit; }

mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($res);

if ($row) {
    echo json_encode(["success" => true, "book" => $row]);
} else {
    echo json_encode(["success" => false, "message" => "Livro não encontrado."]);
}

mysqli_stmt_close($stmt);
mysqli_close($conexao);

?>
