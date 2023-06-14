var database = require("../database/config")
var emailSessionAtual = null
var nomeAtual  = null
var sobreAtual = null

/* pegar dados*/
function listar() { //listar todos os usuarios
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM tbUser;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotar_users() { //listar todos os usuarios
    console.log("Listando todos os dados do usuario");

    var instrucao = `
    select dp.nome as 'nome', dp.sobrenome as 'sobre', dp.telefone  as 'telefone', dp.data_nasc as 'data' , u.email as 'email' from tbDados_pessoais dp
    inner join tbUser u ON u.idUser = dp.fk_idUser
     where u.email = '${emailSessionAtual}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function plotar_comentario() { //listar todos os usuarios
    console.log("Listando todos os comentarios");

    var instrucao = `
    SELECT c.titulo, c.linguagem, u.email, COALESCE(SUM(a.estrelas), 0) AS estrelas
    FROM tbComentario c
    INNER JOIN tbUser u ON u.idUser = c.fk_idUser
	LEFT JOIN tbAvaliacao a ON c.idComentario = a.fk_idComentario
    WHERE u.email = '${emailSessionAtual}'
    GROUP BY c.titulo, c.linguagem;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtd_comentario() { //listar todos os usuarios
    console.log("Listando todos os comentarios");

    var instrucao = `
    select COUNT(c.titulo) as 'qtd' FROM tbComentario c
        INNER JOIN tbUser u ON u.idUser = c.fk_idUser
        where u.email = '${emailSessionAtual}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

//listar todos as linguagens
function plotar_linguagem() {
    console.log("Listando todos as linguagens dos usuarios");

    var instrucao = `
    select linguagem, nivel from tbLinguagens where fk_idDados = 
(select idDados from tbDados_pessoais where fk_idUser = 
    (select idUser from tbUser where email = '${emailSessionAtual}'));;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


/* quantidade de usuario*/
function qtd_linguagem() {
    console.log("Listando todos as qtd linguagem");

    var instrucao = `
    select COUNT(linguagem) as 'qtd' from tbLinguagens where fk_idDados = 
(select idDados from tbDados_pessoais where fk_idUser = 
    (select idUser from tbUser where email = '${emailSessionAtual}'));;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/* quantidade de curtidas*/
function qtd_curtidas() {
    console.log("Listando todos as qtd de curtidas");

    var instrucao = `
    SELECT SUM(a.estrelas) AS qtd
    FROM tbAvaliacao a
    INNER JOIN tbComentario c ON a.fk_idComentario = c.idComentario
    INNER JOIN tbUser u ON c.fk_idUser = u.idUser
    WHERE u.email = '${emailSessionAtual}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


/* cadastrar dados*/

// Usuario entrar no site
function entrar(email, senha) {
    emailSessionAtual = email
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM tbUser WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

//cadastrar usuario
function cadastrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbUser (idUser, email, senha) VALUES (null, '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// cadastrar dados do usuario
function cadastrarDados(nomeUser, sobrenomeUser, telUser, nascUser) { // cadastro de dados pessoais
    nomeAtual = nomeUser;
    sobreAtual = sobrenomeUser;

    var instrucao = `
    INSERT INTO tbDados_pessoais (nome,sobrenome, telefone ,data_nasc) VALUES ('${nomeUser}', '${sobrenomeUser}', '${telUser}' ,'${nascUser}');
        `;
    database.executar(instrucao)
    return upCadastrar()
}

function upCadastrar() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            database.executar(`
            select idUser from tbUser order by idUser desc limit 1;
              `)
            .then((rows) => {
                const idAtual = rows[0].idUser;

                database.executar(`select idDados from tbDados_pessoais where nome = "${nomeAtual}" and sobrenome = "${sobreAtual}";`)
                    .then((rows) => {
                        const idDados = rows[0].idDados;
                        return database.executar(`
                update tbDados_pessoais set fk_idUser = ${idAtual} where idDados = ${idDados};
                `);
                    });
            })
              .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
        }, 100);
    })
}

// atualiza dados pessoais do usuario/
function atualizar(nomeUser, sobrenomeUser, telUser, nascUser) {
    return new Promise((resolve, reject) => {
        database.executar(`
            select idUser from tbUser where email = '${emailSessionAtual}'
              `)
            .then((rows) => {
                const idAtual = rows[0].idUser;

                return database.executar(`
                update tbDados_pessoais set nome = '${nomeUser}', sobrenome = '${sobrenomeUser}', telefone = '${telUser}', data_nasc = '${nascUser}' where fk_idUser = ${idAtual};
                `);
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/* cadastrar comentario */
function comentario(titulo, conteudo, linguagem) {
    var instrucao = `
    INSERT INTO tbComentario (titulo, comentario, linguagem) VALUES ('${titulo}', '${conteudo}', '${linguagem}');
        `;
    database.executar(instrucao)
    return cadas_comentario()
}

function cadas_comentario() {
    return new Promise((resolve, reject) => {
        database.executar(`
            select idUser from tbUser order by idUser desc limit 1;
              `)
            .then((rows) => {
                const idAtual = rows[0].idUser;

                database.executar(`
                    select idComentario from tbComentario order by idComentario desc limit 1;
                `)
                    .then((rows) => {
                        const comentarioAtual = rows[0].idComentario;
                        return database.executar(`
                    update tbComentario set fk_idUser = ${idAtual} where idComentario = ${comentarioAtual};
                    `)
                    })

            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    })
}
/* cadastrar linguagem */

function linguagem(linguagem, nivel) {

    var instrucao = `
    INSERT INTO tbLinguagens (linguagem , nivel) VALUES ('${linguagem}', '${nivel}');
        `;
    database.executar(instrucao)
    return cadastrar_de_Linguagem()
}

function cadastrar_de_Linguagem() {
    return new Promise((resolve, reject) => {
        database.executar(`
            select idUser from tbUser where email = '${emailSessionAtual}'
              `)
            .then((rows) => {
                const idAtual = rows[0].idUser;

                database.executar(`select idDados from tbDados_pessoais where fk_idUser = '${idAtual}';`)
                    .then((rows) => {
                        const idDados = rows[0].idDados;

                        database.executar(`select idLinguagens from tbLinguagens order by  idLinguagens DESC LIMIT 1;`)
                            .then((rows) => {
                                const idLinguagem = rows[0].idLinguagens;

                                return database.executar(`
                                update tbLinguagens set fk_idDados = ${idDados} where idLinguagens = ${idLinguagem};
                                `);
                            })

                    });
            })
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}


module.exports = {
    entrar,
    cadastrar,
    linguagem,
    comentario,
    plotar_users,
    cadastrarDados,
    plotar_linguagem,
    atualizar,
    qtd_linguagem,
    plotar_comentario,
    listar,
    qtd_comentario,
    qtd_curtidas
};


