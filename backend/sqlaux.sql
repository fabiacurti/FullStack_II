----------- TBL.alunoProfessor
CREATE TABLE alunoProfessor (
  Nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL primary key,
  DataNascimento DATE NOT NULL,
  Turma VARCHAR(50) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Cidade VARCHAR(100) NOT NULL,
  Telefone VARCHAR (15) NOT NULL,
  Rua VARCHAR(100) NOT NULL,
  Numero VARCHAR(10) NOT NULL,
  cep VARCHAR(9) NOT NULL,
  TipoPessoa VARCHAR(50) NOT NULL
);

INSERT INTO
  alunoProfessor (
    Nome,
    CPF,
    DataNascimento,
    Turma,
    Email,
    Cidade,
    Telefone,
    Rua,
    Numero,
    CEP,
    TipoPessoa
  )
VALUES
  (
    'João Silva',
    '123.456.789-00',
    '1990-05-15',
    'A101',
    'joao.silva@email.com',
    'São Paulo',
    '(11) 9876-5432',
    'Rua ABC',
    '123',
    '01234-567',
    'Aluno'
  ),
  (
    'Maria Oliveira',
    '987.654.321-00',
    '1988-12-03',
    'B202',
    'maria.oliveira@email.com',
    'Rio de Janeiro',
    '(21) 8765-4321',
    'Avenida XYZ',
    '456',
    '89012-345',
    'Professor'
  ),
  (
    'Pedro Santos',
    '111.222.333-44',
    '1995-08-22',
    'C303',
    'pedro.santos@email.com',
    'Brasília',
    '(61) 7654-3210',
    'Praça DEF',
    '789',
    '45678-901',
    'Aluno'
  ),
  (
    'Ana Pereira',
    '555.666.777-88',
    '1987-04-11',
    'D404',
    'ana.pereira@email.com',
    'Belo Horizonte',
    '(31) 6543-2109',
    'Alameda GHI',
    '101',
    '23456-789',
    'Aluno'
  ),
  (
    'Carlos Lima',
    '999.888.777-66',
    '1980-11-28',
    'E505',
    'carlos.lima@email.com',
    'Porto Alegre',
    '(51) 5432-1098',
    'Praia JKL',
    '202',
    '56789-012',
    'Professor'
  );

SELECT
  *
from
  alunoProfessor;

----------- TBL.autor
create TABLE `autor` (
  `ID` int not null AUTO_INCREMENT,
  `Nome` varchar(50) NULL,
  `Sobrenome` varchar(50) NULL,
  `DNascimento` DATE NULL,
  `CidadeNascimento` varchar(30) NULL,
  `Genero` varchar(15) NULL,
  `Email` varchar(100) NULL,
  `QntObras` varchar(4) NULL,
  PRIMARY KEY (`ID`)
)
INSERT INTO
  autor (
    Nome,
    Sobrenome,
    DNascimento,
    CidadeNascimento,
    Genero,
    Email,
    QntObras
  )
VALUES
  (
    'John',
    'Doe',
    '1990-05-15',
    'Nova York',
    'Masculino',
    'john.doe@example.com',
    '25'
  ),
  (
    'Jane',
    'Smith',
    '1985-08-22',
    'Los Angeles',
    'Feminino',
    'jane.smith@example.com',
    '15'
  ),
  (
    'Maria',
    'Silva',
    '1988-12-10',
    'São Paulo',
    'Feminino',
    'maria.silva@example.com',
    '20'
  ),
  (
    'Carlos',
    'Pereira',
    '1975-06-28',
    'Rio de Janeiro',
    'Masculino',
    'carlos.pereira@example.com',
    '30'
  ),
  (
    'Ana',
    'Martins',
    '1995-03-18',
    'Belo Horizonte',
    'Feminino',
    'ana.martins@example.com',
    '10'
  );

SELECT * FROM autor;

----------- TBL.generos
CREATE TABLE generos (
  id INT NOT NULL AUTO_INCREMENT,
  codigo INT NOT NULL,
  descricao VARCHAR(100),
  isAtivo BOOLEAN,
  PRIMARY KEY (id)
);

INSERT INTO
  generos (codigo, descricao, isAtivo)
VALUES
  (1, 'Ação', true),
  (2, 'Comédia', true),
  (3, 'Drama', false),
  (4, 'Ficção Científica', true);

SELECT
  *
from
  generos create TABLE `cadLivro` (
    `NomeLivro` varchar(50) NULL,
    `codigoLivro` int not null,
    `numeroPagina` int NULL,
    `editora` varchar(40) NULL,
    `genero` varchar(30) NULL,
    `dataPublicacao` date NULL,
    PRIMARY KEY (`codigoLivro`)
  ) 
  
  
CREATE TABLE `editoras` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `Nome` VARCHAR(255) DEFAULT NULL,
    `Fundacao` VARCHAR(255) NOT NULL,
    `CNPJ` VARCHAR(255) NOT null,
    `Contato` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);


INSERT INTO `editoras` (`Nome`, `Fundacao`, `CNPJ`, `Contato`, `Email`) 
VALUES ('Editora ABC', '1990-01-15', 12345678901234, 'João Silva', 'joao@editoraabc.com');
INSERT INTO `editoras` (`Nome`, `Fundacao`, `CNPJ`, `Contato`, `Email`) 
VALUES ('Editora XYZ', '1985-05-20', 98765432109876, 'Maria Oliveira', 'maria@editoraxyz.com');
INSERT INTO `editoras` (`Nome`, `Fundacao`, `CNPJ`, `Contato`, `Email`) 
VALUES ('Editora 123', '2000-11-08', 56789012345678, 'Carlos Pereira', 'carlos@editora123.com');

CREATE TABLE tipoLivro (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    faixaEtaria VARCHAR(50),
    nivelLeitura VARCHAR(50),
    formato VARCHAR(50)
);


