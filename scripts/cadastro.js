document.getElementById("submit").addEventListener ("click",async function validarFormulario(e){  
    e.preventDefault()  
    var inputEmail = document.getElementById("email");
    var inputSenha = document.getElementById("senha");
    var inputRepetirSenha = document.getElementById("repetirsenha");
    var labelMensagens = document.getElementById("massage");

    if(inputEmail.value == '' || inputSenha.value == '' || inputRepetirSenha.value == ''){
        labelMensagens.innerHTML = 'os campos precisam ser preenchidos';
        return;
    }else if(!inputEmail.value.includes("@")){
        labelMensagens.innerHTML = 'Digite um email valido!';
        return;
    }else if(inputSenha.value !== inputRepetirSenha.value){
        labelMensagens.innerHTML = 'As senhas precisam repetir'
        return;
    }else{
        labelMensagens.innerHTML = "";
    }

    //pegar os dados do formulário
    var form = document.getElementById("formCadastro");
    var dados = new FormData(form);
    console.log(dados)
        
    var promise = await fetch('../php/usuarioControle/salvarUsuario.php', {
        method: 'POST',
        body: dados
    });
    try{
        var resultado = await promise.json();
        alert("Cadastro realizado com sucesso")
        window.location.href = "login.html"
    }catch(err){
        alert("Usuario ja cadastrado")
    }
    }
)
