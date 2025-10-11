let books = JSON.parse(localStorage.getItem("books") ?? "[]")
let editIndex = null;

if(localStorage.getItem("books") == null){
    localStorage.setItem("books", JSON.stringify([
        { name: "Harry Potter", autor: "J.K Rowling", price: 29.90 },
        { name: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", price: 20.50 },
        { name: "Diario de um Banana 2", autor: "Jeff Kinney", price: 49.99 },
        { name: "O Hobbit", autor: "J.R.R. Tolkien", price: 29.90 },
        { name: "A Culpa é das Estrelas", autor: "John Green", price: 22.00 }
    ]))
    books = JSON.parse(localStorage.getItem("books") ?? "[]")
}

rerenderGrid()
function generateBook(name, price, autor, index){
    return `
      <div class="livro">
        <h3>${name}</h3>
        <p class="autor">Autor: ${autor}</p>
        <p class="preco">R$ ${price}</p>
        <button class="btn-add">Adicionar ao Carrinho</button>
        <button class="btn-edit" data-index="${index}">Editar</button>
        <button class="btn-remove" data-index="${index}">Remover</button>        
      </div>
    `
}

function rerenderGrid(){
    const grid = document.querySelector(".grid-livros")
    grid.innerHTML = ""
    books.forEach((book, index) => {
        grid.innerHTML += generateBook(book.name, book.price, book.autor, index)
    })

    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-index"))
            books.splice(index, 1)
            localStorage.setItem("books", JSON.stringify(books))
            rerenderGrid() 
        })
    })

    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-index"))
            const book = books[index]
            document.getElementById('titulo').value = book.name
            document.getElementById('autor').value = book.autor
            document.getElementById('preco').value = book.price
            editIndex = index

            // Altera o texto do botão para "Alterar"
            document.getElementById('btnAddLivro').textContent = "Alterar"
        })
    })
}
const form = document.getElementById('formAddLivro')
form.addEventListener('submit', e => {
    e.preventDefault()
    const titulo = document.getElementById('titulo').value
    const autor = document.getElementById('autor').value
    const preco = parseFloat(document.getElementById('preco').value).toFixed(2)

    if (editIndex !== null) {
        // Edita o livro existente
        books[editIndex] = {
            name: titulo,
            autor: autor,
            price: preco
        }
        editIndex = null

        // Volta o texto do botão para "Adicionar"
        document.getElementById('btnAddLivro').textContent = "Adicionar"
    } else {
        // Adiciona novo livro
        books.push({
            name: titulo,
            autor: autor,
            price: preco
        })
    }
    localStorage.setItem("books", JSON.stringify(books))
    rerenderGrid()
    form.reset()
    // Garante que o texto do botão volte para "Adicionar" após reset
    document.getElementById('btnAddLivro').textContent = "Adicionar"
})