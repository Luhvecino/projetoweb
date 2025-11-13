<?php
header('Content-Type: application/json; charset=utf-8');

$conexao = mysqli_connect("localhost", "root", "PUC@1234", "projetoweb");

$id = isset($_POST['id']) ? intval($_POST['id']) : 0;
$titulo = isset($_POST['titulo']) ? trim($_POST['titulo']) : '';
$autor = isset($_POST['autor']) ? trim($_POST['autor']) : '';
$price = isset($_POST['price']) ? trim($_POST['price']) : '';
$imageUrl = isset($_POST['imageUrl']) ? trim($_POST['imageUrl']) : '';

if ($id <= 0) { echo json_encode(["success"=>false, "message"=>"ID inválido."]); exit; }
if ($titulo === '' || $autor === '' || $price === '') { echo json_encode(["success"=>false, "message"=>"Campos obrigatórios ausentes."]); exit; }

$sql = "UPDATE livros SET titulo = ?, autor = ?, price = ?, imageUrl = ? WHERE id = ?";
$stmt = mysqli_prepare($conexao, $sql);
if(!$stmt){ echo json_encode(["success"=>false, "message"=>"Erro ao preparar: " . mysqli_error($conexao)]); exit; }

mysqli_stmt_bind_param($stmt, 'ssdsi', $titulo, $autor, $price, $imageUrl, $id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["success" => true, "message" => "Livro atualizado com sucesso."]);
} else {
    echo json_encode(["success" => false, "message" => "Erro ao atualizar: " . mysqli_stmt_error($stmt)]);
}

mysqli_stmt_close($stmt);
mysqli_close($conexao);

?>
