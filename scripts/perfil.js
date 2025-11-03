function editarConta() {
    document.getElementById('form-editar').style.display = 'flex';
    var emailLogado = localStorage.getItem('usuarioLogado');
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = usuarios.find(function(u) { return u.email === emailLogado; });
    if(usuario){
        document.getElementById('edit-email').value = usuario.email;
        document.getElementById('edit-senha').value = usuario.senha;
    }
}

function salvarEdicao(event) {
    event.preventDefault();
    var emailLogado = localStorage.getItem('usuarioLogado');
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = usuarios.find(function(u) { return u.email === emailLogado; });
    if(usuario){
        usuario.nome = document.getElementById('edit-nome').value;
        usuario.sobrenome = document.getElementById('edit-sobrenome').value;
        usuario.email = document.getElementById('edit-email').value;
        usuario.senha = document.getElementById('edit-senha').value;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        alert("Dados atualizados!");
        document.getElementById('form-editar').style.display = 'none';
        location.reload();
    }
}

function cancelarEdicao() {
    document.getElementById('form-editar').style.display = 'none';
}

function excluirConta() {
    if(confirm("Tem certeza que deseja excluir sua conta?")) {
        var emailLogado = localStorage.getItem('usuarioLogado');
        var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        var usuarioIndex = usuarios.findIndex(function(u) { return u.email === emailLogado; });
        if(usuarioIndex !== -1) {
            usuarios.splice(usuarioIndex, 1); // Remove o usuário encontrado
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert("Conta excluída!");
            window.location.href = "login.html";
        }
    }
}

window.onload = function() {

    var emailLogado = localStorage.getItem('usuarioLogado');
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuario = usuarios.find(function(u) { return u.email === emailLogado; });
    if(usuario && usuario.nome){
        document.getElementById('perfil-titulo').textContent = "Perfil de " + usuario.nome;
    }
}