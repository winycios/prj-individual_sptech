var express = require("express");
var router = express.Router();

var adminController = require("../controllers/adminController");

router.get("/plotar_users", function (req, res) {
    adminController.plotar_users(req, res);
});

router.get("/qtd_users", function (req, res) {
    adminController.qtd_users(req, res);
});

router.get("/qtd_lingua", function (req, res) {
    adminController.qtd_lingua(req, res);
});

router.get("/qtd_aval", function (req, res) {
    adminController.qtd_aval(req, res);
});

router.post("/atualizar", function (req, res) {
    adminController.atualizar(req, res);
})

router.post("/apagar", function (req, res) {
    adminController.apagar(req, res);
})

router.post("/cadastrar_avaliacao", function (req, res) {
    adminController.avaliacao(req, res);
})

/* graficos*/
router.get("/grafico_users", function (req, res) {
    adminController.grafico_users(req, res);
});

router.get("/grafico_comentario", function (req, res) {
    adminController.grafico_comentario(req, res);
});

router.get("/grafico_linguagem", function (req, res) {
    adminController.grafico_linguagem(req, res);
});


module.exports = router;