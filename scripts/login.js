async function validarFormulario() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var labelMensagens = document.getElementById("massage");

    if(email === "" || senha ===""){
        labelMensagens.innerHTML = "Os campos LOGIN e SENHA precisam ser preenchido"; 
        return ;
    }else{
        labelMensagens.innerText = "";
    }
    
    const formData = new FormData();
    formData.append('email', email);
    formData.append('senha', senha);

    const response = await fetch('../php/usuarioControle/loginUsuario.php', {
            method: 'POST',
            body: formData
        });
    const resultado = await response.json();
  
    if(resultado.success){
        window.location.href = "dashboard.html"
    }else{
        labelMensagens.innerText = "Email ou senha inválidos!";
    }
}