async function pesquisar() {

    var promise = await fetch("../php/usuarioControle/listarUsuario.php", {
        method: "GET"
    });
    // pego a resposta do php
    var resultado = await promise.json();

    const tbody = document.querySelector('#tabelaUsuario tbody');
    // Limpa o corpo da tabela (mantém o thead)
    tbody.innerHTML = '';

    resultado.forEach(usuarios => {
        const novaLinha = tbody.insertRow(-1);
        novaLinha.dataset.id = usuarios.id;

        const coluna1 = novaLinha.insertCell(0); // id
        const coluna4 = novaLinha.insertCell(1); // email
        const coluna5 = novaLinha.insertCell(2); // senha
        const coluna6 = novaLinha.insertCell(3); // ações

        coluna1.textContent = usuarios.id ?? '';
        coluna4.textContent = usuarios.email ?? '';
        coluna5.textContent = usuarios.senha ?? '';

        const id = usuarios.id;
        coluna6.innerHTML = `
            <button type="button" onclick="editar(this)">Editar</button>
            <button type="button" onclick="excluir(${id})">Excluir</button>
        `;
    });
}

async function excluir(idUsuario) {
    if (!confirm(`Deseja realmente excluir o usuário ${idUsuario}?`)) {
        return;
    }

    try {
        const formData = new FormData();
        formData.append('id', idUsuario);

        const response = await fetch("../php/usuarioControle/excluirUsuario.php", {
            method: "POST",
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

function editar(button) {
    const row = button.closest('tr');
    const id = row.dataset.id;

    // Evita múltiplas edições simultâneas na mesma linha
    if (row.dataset.editing === '1') return;
    row.dataset.editing = '1';

    // Guarda valores originais para possível cancelamento
    const original = {
        email: row.cells[1].textContent,
        senha: row.cells[2].textContent
    };
    row._original = original;

    // Substitui as células por inputs
    row.cells[1].innerHTML = `<input type="email" value="${escapeHtml(original.email)}">`;
    row.cells[2].innerHTML = `<input type="text" value="${escapeHtml(original.senha)}">`;

    // Substitui ações por Salvar / Cancelar
    row.cells[3].innerHTML = `
        <button type="button" onclick="salvarEdicao(this, ${id})">Salvar</button>
        <button type="button" onclick="cancelarEdicao(this)">Cancelar</button>
    `;
}

async function salvarEdicao(button, idUsuario) {
    const row = button.closest('tr');
    const email = row.cells[1].querySelector('input').value.trim();
    const senha = row.cells[2].querySelector('input').value;

    // Validação básica (pode ser expandida)
    if (!email) {
        alert('email é obrigatório.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('id', idUsuario);
        formData.append('email', email);
        formData.append('senha', senha);

        const response = await fetch('../php/usuarioControle/editarUsuario.php', {
            method: 'POST',
            body: formData
        });

        const resultado = await response.json();
        if (resultado.success) {
            // Atualiza a linha com os novos valores
            row.cells[1].textContent = email;
            row.cells[2].textContent = senha;

            row.cells[3].innerHTML = `
                <button type="button" onclick="iniciarEdicao(this)">Editar</button>
                <button type="button" onclick="excluir(${idUsuario})">Excluir</button>
            `;
            row.dataset.editing = '0';
            alert(resultado.message);
        } else {
            alert('Erro: ' + (resultado.message || 'Não foi possível salvar alterações.'));
        }

    } catch (err) {
        console.error('Erro ao salvar edição:', err);
        alert('Erro ao salvar edição');
    }
}

function cancelarEdicao(button) {
    const row = button.closest('tr');
    const orig = row._original || {};

    row.cells[1].textContent = orig.email || '';
    row.cells[2].textContent = orig.senha || '';

    const id = row.dataset.id;
    row.cells[3].innerHTML = `
        <button type="button" onclick="iniciarEdicao(this)">Editar</button>
        <button type="button" onclick="excluir(${id})">Excluir</button>
    `;

    row.dataset.editing = '0';
}

// Pequena função para escapar valores ao inserir em value
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
