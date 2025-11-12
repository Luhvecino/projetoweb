// Carregar dados do usuário logado ao abrir o perfil
window.onload = async function() {
    try {
        const response = await fetch("../php/getUsuarioLogado.php");
        const data = await response.json();

        if (!data.success || !data.user) {
            alert("Você precisa estar logado para acessar o perfil!");
            window.location.href = "login.html";
            return;
        }

        const usuario = data.user;
        document.getElementById("perfil-titulo").textContent = "Perfil de " + usuario.email;
        document.getElementById("edit-email").value = usuario.email;
        document.getElementById("edit-senha").value = usuario.senha;
    } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        alert("Erro ao carregar dados do perfil.");
    }
};

// Exibir formulário de edição
function editarConta() {
    document.getElementById("form-editar").style.display = "flex";
}

// Cancelar edição
function cancelarEdicao() {
    document.getElementById("form-editar").style.display = "none";
}

// Salvar alterações
async function salvarEdicao(event) {
    event.preventDefault();

    const email = document.getElementById("edit-email").value;
    const senha = document.getElementById("edit-senha").value;

    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("senha", senha);

        const response = await fetch("../php/editarUsuario.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert("Dados atualizados com sucesso!");
            window.location.reload();
        } else {
            alert(result.message || "Erro ao atualizar os dados.");
        }
    } catch (error) {
        console.error("Erro ao salvar edição:", error);
        alert("Erro ao atualizar os dados.");
    }
}

// Excluir conta
async function excluirConta() {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

    try {
        const response = await fetch("../php/excluirUsuario.php", {
            method: "POST"
        });

        const result = await response.json();

        if (result.success) {
            alert("Conta excluída com sucesso!");
            window.location.href = "login.html";
        } else {
            alert(result.message || "Erro ao excluir conta.");
        }
    } catch (error) {
        console.error("Erro ao excluir conta:", error);
        alert("Erro ao excluir conta.");
    }
}
