function validarFormulario() {
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;
    var labelMensagens = document.getElementById("massage");

    if(login === ""){
        labelMensagens.innerHTML = "O campo LOGIN precisa ser preenchido";
        return ;
    }else{
        labelMensagens.innerText = "";
    }

    if(senha === ""){
        labelMensagens.innerText = "O campo SENHA precisa ser preenchido";
        return ;
    }else{
        labelMensagens.innerText = "";
    }
    
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    var usuarioEncontrado = usuarios.find(function(usuario) {
        return usuario.email === login && usuario.senha === senha;
    });

    if(usuarioEncontrado){
        localStorage.setItem('usuarioLogado', usuarioEncontrado.email);
        window.location.href = "dashboard.html";
    } else {
        labelMensagens.innerText = "Email ou senha inválidos!";
    }
}