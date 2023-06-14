var database = require("../database/config")

function plotar_users() { //listar todos os usuarios
    console.log("Listando todos os dados do usuario");

    var instrucao = `
    select u.idUser, dp.nome as 'nome', dp.sobrenome as 'sobre', dp.telefone  as 'telefone' , u.email as 'email', u.senha from tbDados_pessoais dp
    inner join tbUser u ON u.idUser = dp.fk_idUser;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
/* grafico users*/
function grafico_users() {
    console.log("Listando todos os dados do usuario");

    var instrucao = `
    select Count(c.idComentario) as contar, u.email from tbComentario c
    inner join tbUser u ON u.idUser = c.fk_idUser 
    group by fk_idUser LIMIT 5;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/* grafico comentario*/
function grafico_comentario() {
    console.log("Listando todos os dados do usuario");

    var instrucao = `
    select a.estrelas, c.titulo from tbAvaliacao a
    inner join tbComentario c ON a.fk_idComentario = c.idComentario
    order BY estrelas DESC LIMIT 7;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/* grafico linguagem*/
function grafico_linguagem() {
    console.log("Listando todos os dados do usuario");

    var instrucao = `
    select Count(idComentario) as contar, linguagem from tbComentario group by linguagem order by Contar Desc LIMIT 3;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function qtd_users() { //listar qtd os usuarios
    console.log("listar qtd os usuarios");

    var instrucao = `
    select COUNT(idUSer) as qtd from tbUser;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtd_lingua() { //listar qtd de lingaugens
    console.log("//listar qtd de lingaugens");

    var instrucao = `
    select COUNT(distinct linguagem) as qtd FROM tbLinguagens;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtd_aval() { //listar qtd os usuarios
    console.log("listar qtd os usuarios");

    var instrucao = `
    SELECT COUNT(idComentario) as qtd FROM tbComentario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// atualiza dados pessoais do usuario/
function atualizar(id, email, senha) {
    var instrucao = `
    update tbUser set email = "${email}", senha = "${senha}" where idUser = ${id};
        `;
    return database.executar(instrucao)
}

// Cadastrar avaliação/
function avaliacao(id, estrelas) {
    var instrucao = `
    insert into tbAvaliacao VALUES (null, ${estrelas}, ${id});
        `;
    return database.executar(instrucao)
}

// apagar dados pessoais do usuario
var idGlobal = null;
function apagar(id) {
    idGlobal = id;
    var instrucao = `
    delete from tbDados_pessoais where fk_idUser = ${id};
        `;

    database.executar(instrucao)
    return userApagar();
}

function userApagar() {
    return new Promise((resolve, reject) => {
        return database.executar(`
            delete from tbUser where idUser = ${idGlobal};
            `)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    })
}

module.exports = {

    plotar_users,
    qtd_users,
    qtd_lingua,
    qtd_aval,
    atualizar,
    apagar,
    avaliacao,

    grafico_users,
    grafico_linguagem,
    grafico_comentario
}