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
    apagar
}