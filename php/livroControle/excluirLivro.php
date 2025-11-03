<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "", "projetoweb");
if(!$conexao){
    echo json_encode(["success" => false, "message" => "Conexão falhou: " . mysqli_connect_error()]);
    exit;
}

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
if ($id <= 0) { echo json_encode(["success"=>false, "message"=>"ID inválido."]); exit; }

$sql = "DELETE FROM livros WHERE id = ?";
$stmt = mysqli_prepare($conexao, $sql);
if (!$stmt) { echo json_encode(["success"=>false, "message"=>"Erro ao preparar: " . mysqli_error($conexao)]); exit; }

mysqli_stmt_bind_param($stmt, 'i', $id);
if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Livro excluído."]);
} else {
    echo json_encode(["success"=>false, "message"=>"Erro ao excluir: " . mysqli_stmt_error($stmt)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conexao);

?>
