let books = JSON.parse(localStorage.getItem("books") ?? "[]")
let editIndex = null;

if(localStorage.getItem("books") == null){
    localStorage.setItem("books", JSON.stringify([
        { name: "Harry Potter", autor: "J.K Rowling", price: 29.90, imageUrl:"https://rocco.com.br/wp-content/uploads/2022/12/9788532511010.jpg"},
        { name: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", price: 20.50, imageUrl:"https://m.media-amazon.com/images/I/81TmOZIXvzL._UF1000,1000_QL80_.jpg" },
        { name: "Diario de um Banana 2", autor: "Jeff Kinney", price: 49.99, imageUrl:"https://cdn.kobo.com/book-images/47bb9e03-888b-445a-88fa-b29a4ca74fe0/1200/1200/False/diario-de-um-banana-4-2.jpg" },
        { name: "O Hobbit", autor: "J.R.R. Tolkien", price: 29.90, imageUrl:"https://m.media-amazon.com/images/I/91M9xPIf10L.jpg" },
        { name: "A Culpa é das Estrelas", autor: "John Green", price: 22.00, imageUrl:"https://m.media-amazon.com/images/I/811ivBP1rsL._UF1000,1000_QL80_.jpg" }
    ]))
    books = JSON.parse(localStorage.getItem("books") ?? "[]")
}

rerenderGrid()
function generateBook(name, price, autor, index, imageUrl="../image/image.png"){
    console.log(imageUrl)
    return `
      <div class="livro">
        <h3>${name}</h3>
        <p class="autor">Autor: ${autor}</p>
        <p class="preco">R$ ${price}</p>
        <img src="${imageUrl}"/>
        <button class="btn-add">Adicionar ao Carrinho</button>
        <button class="btn-edit" data-index="${index}">Editar</button>
        <button class="btn-remove" data-index="${index}">Remover</button>        
      </div>
    `
}

function clearInputs(){
    document.getElementById('titulo').value = "" 
    document.getElementById('autor').value = "" 
    document.getElementById('preco').value = "" 
}

function rerenderGrid(){
    const grid = document.querySelector(".grid-livros")
    grid.innerHTML = ""
    books.forEach((book, index) => {
        console.log(book)
        console.log(book.imageUrl)
        grid.innerHTML += generateBook(book.name, book.price, book.autor, index, book.imageUrl)
    })

    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.getAttribute("data-index"))
            books.splice(index, 1)
            localStorage.setItem("books", JSON.stringify(books))
            
            if(editIndex == index){
                editIndex = null

                document.getElementById('btnAddLivro').textContent = "Adicionar"
                clearInputs()

            }
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
        clearInputs()

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
