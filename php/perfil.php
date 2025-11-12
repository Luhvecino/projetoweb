<?php
session_start();
include('conexao.php');

if (!isset($_SESSION['id_usuario'])) {
    header("Location: login.php");
    exit;
}

$id_usuario = $_SESSION['id_usuario'];
$sql = "SELECT * FROM usuarios WHERE id = $id_usuario";
$result = $conexao->query($sql);
$usuario = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Meu Perfil</title>
    <link rel="stylesheet" href="css/perfil.css">
</head>
<body>
    <div class="container">
        <h1>Meu Perfil</h1>

        <?php if (isset($_SESSION['mensagem'])): ?>
            <div class="alerta">
                <?php 
                    echo $_SESSION['mensagem']; 
                    unset($_SESSION['mensagem']); 
                ?>
            </div>
        <?php endif; ?>

        <form action="atualizar_perfil.php" method="POST">
            <input type="hidden" name="id" value="<?php echo $usuario['id']; ?>">

            <label>Nome:</label>
            <input type="text" name="nome" value="<?php echo $usuario['nome']; ?>" required>

            <label>Email:</label>
            <input type="email" name="email" value="<?php echo $usuario['email']; ?>" required>

            <label>Nova Senha:</label>
            <input type="password" name="senha" placeholder="Digite uma nova senha (opcional)">

            <button type="submit" class="btn-salvar">Salvar Alterações</button>
        </form>

        <form action="excluir_conta.php" method="POST" onsubmit="return confirm('Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.');">
            <input type="hidden" name="id" value="<?php echo $usuario['id']; ?>">
            <button type="submit" class="btn-excluir">Excluir Conta</button>
        </form>

        <a href="dashboard.php" class="voltar">Voltar</a>
    </div>

    <script>
        const alerta = document.querySelector('.alerta');
        if (alerta) {
            setTimeout(() => alerta.style.display = 'none', 3000);
        }
    </script>
</body>
</html>
