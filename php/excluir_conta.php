<?php
include('conexao.php');
session_start();

if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit;
}

$id = $_POST['id'];

$sql = "DELETE FROM usuarios WHERE id = $id";

if ($conexao->query($sql)) {
    session_destroy();
    header("Location: login.php?msg=Conta excluída com sucesso");
    exit;
} else {
    echo "Erro ao excluir conta: " . $conexao->error;
}
?>
