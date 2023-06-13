var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.get("/apresentar_comentario", function (req, res) {
    comentarioController.apresentar_comentario(req, res);
});


module.exports = router;