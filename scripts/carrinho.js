let livrosCarrinho = []

async function fetchCartBooks(){
    try {
            const res = await fetch('../php/carrinho/getCartBooks.php');
            const json = await res.json();
            
            if(json.success !== true){
                window.location.href = "login.html"
            }

            livrosCarrinho = json.books;
        rerenderGridCarrinho();
    } catch (err) {
        console.error('Erro ao buscar livros:', err);
    }
}

fetchCartBooks()

async function deleteFromCart(id) {
    const promise = await fetch("../php/carrinho/removerCarrinho.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id  
        })
    })
    const response = await promise.json()
    if(response.success == false){
        window.location.href = "login.html"
    }
    livrosCarrinho = livrosCarrinho.filter(livro => livro.id !== id)
    rerenderGridCarrinho()
    alert("Livro removido do carrinho com sucesso!")
}

function generateBookCarrinho(titulo, price, autor, id, imageUrl="../image/image.png"){
    return `
      <div class="livro">
        <h3>${titulo}</h3>
        <p class="autor">Autor: ${autor}</p>
        <p class="preco">R$ ${price}</p>
        <img src="${imageUrl}"/>
        <button class="btn-remove" data-id="${id}" onClick="deleteFromCart(${id})">Remover</button>        
      </div>
    `
    
}

function clearInputs(){
    document.getElementById('titulo').value = "" 
    document.getElementById('autor').value = "" 
    document.getElementById('preco').value = "" 
    document.getElementById('imageUrl').value = ""
}

function rerenderGridCarrinho(){
    const grid = document.querySelector(".grid-livros-carrinho")
    grid.innerHTML = ""
    livrosCarrinho.forEach((livros) => {
        grid.innerHTML += generateBookCarrinho(livros.titulo, livros.price, livros.autor, livros.id, livros.imageUrl); 
    })
}