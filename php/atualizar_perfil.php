<?php
include('conexao.php');
session_start();

if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit;
}

$id = $_POST['id'];
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

if (!empty($senha)) {
    $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
    $sql = "UPDATE usuarios SET nome='$nome', email='$email', senha='$senha_hash' WHERE id=$id";
} else {
    $sql = "UPDATE usuarios SET nome='$nome', email='$email' WHERE id=$id";
}

if ($conexao->query($sql)) {
    $_SESSION['mensagem'] = "Dados atualizados com sucesso!";
    header("Location: perfil.php");
} else {
    $_SESSION['mensagem'] = "Erro ao atualizar os dados.";
    header("Location: perfil.php");
}
?>
