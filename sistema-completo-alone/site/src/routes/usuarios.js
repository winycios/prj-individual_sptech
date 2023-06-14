var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");


/* mostrar*/
router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/plotar_users", function (req, res) {
    usuarioController.plotar_users(req, res);
});

router.get("/plotar_linguagem", function (req, res) {
    usuarioController.plotar_linguagem(req, res);
});

router.get("/plotar_comentario", function (req, res) {
    usuarioController.plotar_comentario(req, res);
});

router.get("/qtd_comentario", function (req, res) {
    usuarioController.qtd_comentario(req, res);
});

router.get("/qtd_linguagem", function (req, res) {
    usuarioController.qtd_linguagem(req, res);
});


router.get("/qtd_curtidas", function (req, res) {
    usuarioController.qtd_curtidas(req, res);
});

/* cadastrar*/
router.post("/comentario", function (req, res) {
    usuarioController.comentario(req, res);
}) 

router.post("/linguagem", function (req, res) {
    usuarioController.linguagem(req, res);
})

router.post("/atualizar", function (req, res) {
    usuarioController.atualizar(req, res);
})

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarDados", function (req, res) {
    usuarioController.cadastrarDados(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;