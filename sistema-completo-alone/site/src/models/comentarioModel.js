var database = require("../database/config")

/* mostrar comentarios na tela de inicial*/
function apresentar_comentario() { //listar todos os usuarios
    console.log("Listando todos os comentarios");

    var instrucao = `
    select idComentario,c.titulo, c.linguagem,c.comentario, u.email FROM tbComentario c
        INNER JOIN tbUser u ON u.idUser = c.fk_idUser;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {

    apresentar_comentario
}