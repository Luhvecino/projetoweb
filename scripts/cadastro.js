      
function validarFormulario(){                
var inputNome = document.getElementById("nome");
var inputSobrenome = document.getElementById("sobrenome");
var inputEmail = document.getElementById("email");
var inputSenha = document.getElementById("senha");
var inputRepetirSenha = document.getElementById("repetirsenha");
var labelMensagens = document.getElementById("massage")
if(inputNome.value == ''){
    labelMensagens.innerHTML = 'campo nome precisa ser preenchido';
    return;
}else{
    labelMensagens.innerHTML = "";
}
if(inputSobrenome.value == ''){
    labelMensagens.innerHTML = 'campo sobrenome precisa ser preenchido';
    return;
}else{
    labelMensagens.innerHTML = "";
}
if(inputEmail.value == ''){
    labelMensagens.innerHTML = 'campo email precisa ser preenchido';
    return;
}else{
    labelMensagens.innerHTML = "";
}
if(inputSenha.value == ''){
    labelMensagens.innerHTML = 'campo senha precisa ser preenchido';
    return;
}else{
    labelMensagens.innerHTML = "";
}
if(inputRepetirSenha.value == ''){
    labelMensagens.innerHTML = 'campo confirmar senha precisa ser preenchido';
    return;
}else{
    labelMensagens.innerHTML = "";
}
if(inputSenha.value != inputRepetirSenha.value){
    labelMensagens.innerHTML = 'As senhas precisam ser iguais';
    return;
}else{
    labelMensagens.innerHTML = "";
}

// Salvar vários usuários no localStorage
var usuario = {
    nome: inputNome.value,
    sobrenome: inputSobrenome.value,
    email: inputEmail.value,
    senha: inputSenha.value 
};

// Recupera o array de usuários ou cria um novo
var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
usuarios.push(usuario);
localStorage.setItem('usuarios', JSON.stringify(usuarios));
labelMensagens.innerHTML = "Cadastro salvo com sucesso!";
window.location.href = "login.html"
}
