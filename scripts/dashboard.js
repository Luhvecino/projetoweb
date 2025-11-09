let livros = [];
let editIndex = null; // will store id of book being edited (or null)

// on load, fetch books from server

fetchBooks();
// hide Gerenciar link by default (in case HTML not updated)
const liGerenciar = document.getElementById('liGerenciar');
if (liGerenciar) liGerenciar.style.display = 'none';

// ao carregar checa se o usuario é admin (role 5)

async function checkGerenciarLink(){
    try {
        const res = await fetch('../php/usuarioControle/getUsuarioLogado.php');
        const json = await res.json();
        //serve para esconder as coisas de admin
        if (json.success && json.user && parseInt(json.user.role) === 5) {

            const li = document.getElementById('liGerenciar');
            if (li) li.style.display = '';

            const addDiv = document.getElementById('div-add-livro');
            if (addDiv) addDiv.style.display = '';


            document.querySelectorAll('.btn-edit').forEach(btn => btn.style.display = '');
            document.querySelectorAll('.btn-remove').forEach(btn => btn.style.display = '');


        }
    } catch (err) {
        // ignore
        console.error('Erro ao checar role:', err);
    }
}
checkGerenciarLink();

function generateBook(titulo, price, autor, id, imageUrl="../image/image.png"){
    return `
      <div class="livro">
        <h3>${titulo}</h3>
        <p class="autor">Autor: ${autor}</p>
        <p class="preco">R$ ${price}</p>
        <img src="${imageUrl}"/>
        <button class="btn-add">Adicionar ao Carrinho</button>
        <button class="btn-edit" style="display:none" data-id="${id}">Editar</button>
        <button class="btn-remove" style="display:none" data-id="${id}">Remover</button>        
      </div>
    `
    
}

function clearInputs(){
    document.getElementById('titulo').value = "" 
    document.getElementById('autor').value = "" 
    document.getElementById('preco').value = "" 
    document.getElementById('imageUrl').value = ""
}

function rerenderGrid(){
    const grid = document.querySelector(".grid-livros")
    grid.innerHTML = ""
    livros.forEach((livros) => {
        grid.innerHTML += generateBook(livros.titulo, livros.price, livros.autor, livros.id, livros.imageUrl);
        checkGerenciarLink();
       
    })
    
    // remover
    document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", async () => {
            const id = parseInt(btn.getAttribute("data-id"))
            if (!confirm('Deseja remover este livro?')) return;
            try {
                const formData = new FormData();
                formData.append('id', id);
                const res = await fetch('../php/livroControle/excluirLivro.php', { 
                    method: 'POST', 
                    body: formData });
                const json = await res.json();
                if (json.success) {
                    await fetchBooks();
                } else {
                    alert('Erro ao remover: ' + (json.message || ''));
                }
            } catch (err) {
                console.error(err);
                alert('Erro ao remover livro');
            }
        })
    })

    // editar (puxa dados do servidor por id)
document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", async () => {
        const id = parseInt(btn.getAttribute("data-id"))
        try {
            const res = await fetch(`../php/livroControle/getLivro.php?id=${id}`);
            const json = await res.json();
            if (!json.success) {
                alert('Erro ao buscar livro: ' + (json.message || ''));
                return;
            }
            const book = json.book;
            document.getElementById('titulo').value = book.titulo || '';
            document.getElementById('autor').value = book.autor || '';
            document.getElementById('preco').value = book.price || '';
            const imgEl = document.getElementById('imageUrl');
            if (imgEl) imgEl.value = book.imageUrl || '';
            editIndex = id;
            document.getElementById('btnAddLivro').textContent = "Alterar";
            
            // MOSTRAR o formulário primeiro
            const formDiv = document.getElementById('div-add-livro');
            formDiv.style.display = 'block';
            
            // Scroll para o formulário de edição
            setTimeout(() => {
                formDiv.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                });
                
                // Opcional: Focar no primeiro campo
                document.getElementById('titulo').focus();
            }, 100);
            
        } catch (err) {
            console.error('erro ao buscar livro', err);
            alert('Erro ao buscar dados do livro');
        }
    })
})
}
const form = document.getElementById('formAddLivro')

 form.addEventListener('submit', async e  => {
    e.preventDefault()
    const titulo = document.getElementById('titulo').value
    const autor = document.getElementById('autor').value
    const preco = parseFloat(document.getElementById('preco').value).toFixed(2)
    const imageUrl = document.getElementById('imageUrl').value

    // Se editIndex tem id, atualiza via API; caso contrário, cria novo
    try {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('autor', autor);
        formData.append('price', preco); 
        formData.append('imageUrl', imageUrl);

        if (editIndex !== null) {
            formData.append('id', editIndex);
            const res = await fetch('../php/livroControle/editarLivro.php', { 
                method: 'POST', 
                body: formData 
            });
            const json = await res.json();
            if (!json.success) {
                alert('Erro ao atualizar: ' + (json.message || ''));
                return;
            }
            editIndex = null;
            document.getElementById('btnAddLivro').textContent = "Adicionar"
        } else {
            const res = await fetch('../php/livroControle/addLivro.php', { 
                method: 'POST', 
                body: formData 
            });
            const json = await res.json();
            if (!json.success) {
                alert('Erro ao adicionar: ' + (json.message || ''));
                return;
            }
        }

        clearInputs()
        form.reset()
        document.getElementById('btnAddLivro').textContent = "Adicionar"
        await fetchBooks();
    } catch (err) {
        console.error(err);
        alert('Erro ao salvar livro');
    }
})

async function verificaRole(idUsuario) {
    try {
        const formData = new FormData();
        formData.append('id', idUsuario);

        const response = await fetch("../php/usuarioControle/getUsuario.php", {
            method: "GET",
            body: formData
        });

        const resultado = await response.json();

        if (resultado.success) {
            alert(resultado.message);
            pesquisar(); // Recarrega a lista
        } else {
            alert('Erro: ' + resultado.message);
        }

    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao excluir usuário');
    }    
}

// Fetch books from server and re-render
async function fetchBooks(){
    try {
            const res = await fetch('../php/livroControle/listarLivro.php');
            const json = await res.json();
            // Expected shape: [{id, titulo, autor, price, imageUrl}, ...]
            livros = Array.isArray(json) ? json : (json.data || []);
        rerenderGrid();
    } catch (err) {
        console.error('Erro ao buscar livros:', err);
    }
}

