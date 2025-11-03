async function validarFormulario(){                
var inputEmail = document.getElementById("email");
var inputSenha = document.getElementById("senha");
var inputRepetirSenha = document.getElementById("repetirsenha");
var labelMensagens = document.getElementById("massage");

if(inputEmail.value == '' || inputSenha.value == '' || inputRepetirSenha.value == ''){
    labelMensagens.innerHTML = 'os campos precisam ser preenchidos';
    return;
}else{
    labelMensagens.innerHTML = "";
}

//pegar os dados do formulário
var form = document.getElementById("formCadastro");
var dados = new FormData(form);

var promise = await fetch('../php/usuarioControle/salvarUsuario.php', {
    method: 'POST',
    body: dados
});

var resultado = await promise.json();
console.log(resultado);

window.location.href = "login.html"
}
