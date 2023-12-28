CREATE DATABASE projeto_alone;

USE projeto_alone;


CREATE TABLE tbUser(

	idUser INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(80),
    senha VARCHAR(12)
);

CREATE TABLE tbDados_pessoais(

	idDados INT PRIMARY KEY AUTO_INCREMENT,
    fk_idUser INT,
    nome VARCHAR(30),
    sobrenome VARCHAR(30),
    telefone VARCHAR(20),
    data_nasc DATE,		  
    FOREIGN KEY (fk_idUser) REFERENCES tbUser(idUser)
    );

CREATE TABLE tbLinguagens (

	idLinguagens INT PRIMARY KEY AUTO_INCREMENT,
    linguagem VARCHAR(45),
    nivel varchar(30),
    fk_idDados INT,
    FOREIGN KEY (fk_idDados) REFERENCES tbDados_pessoais(idDados)
);

CREATE TABLE tbComentario(

idComentario INT PRIMARY KEY AUTO_INCREMENT,
fk_idUser INT, 
titulo VARCHAR(45),
comentario VARCHAR(200),
linguagem VARCHAR(30),
FOREIGN KEY (fk_idUser) REFERENCES tbUser(idUser)
);

CREATE TABLE tbAvaliacao(

idAvaliacao INT PRIMARY KEY AUTO_INCREMENT,
estrelas INT,
fk_idComentario INT,
FOREIGN KEY (fk_idComentario) REFERENCES tbComentario(idComentario)
);