CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    role INT NOT NULL DEFAULT 1
);

CREATE TABLE livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    price DECIMAL(10,2),
    imageUrl varchar(255) not null
);

CREATE TABLE carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,
    quantidade INT DEFAULT 1,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        ON DELETE CASCADE,        -- se apagar o usuário, apaga tudo relacionado ao carrinho
    FOREIGN KEY (livro_id) REFERENCES livros(id)
        ON DELETE CASCADE         -- se apagar o livro, remove ele dos carrinhos
);

CREATE TABLE wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    livro_id INT NOT NULL,

    CONSTRAINT fk_wishlist_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_wishlist_livro FOREIGN KEY (livro_id)
        REFERENCES livros(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_wishlist UNIQUE (usuario_id, livro_id)
);

-- Inserts --

INSERT INTO livros (titulo, autor, price, imageUrl) VALUES
('Harry Potter', 'J.K Rowling', 29.90, 'https://rocco.com.br/wp-content/uploads/2022/12/9788532511010.jpg'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 20.50, 'https://m.media-amazon.com/images/I/81TmOZIXvzL._UF1000,1000_QL80_.jpg'),
('Diario de um Banana 2', 'Jeff Kinney', 49.99, 'https://cdn.kobo.com/book-images/47bb9e03-888b-445a-88fa-b29a4ca74fe0/1200/1200/False/diario-de-um-banana-4-2.jpg'),
('O Hobbit', 'J.R.R. Tolkien', 29.90, 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg'),
('A Culpa é das Estrelas', 'John Green', 22.00, 'https://m.media-amazon.com/images/I/811ivBP1rsL._UF1000,1000_QL80_.jpg');

insert into usuarios (email, senha, role) values ('adm','123','5');

