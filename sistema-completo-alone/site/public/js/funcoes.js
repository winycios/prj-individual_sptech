// sessão

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        b_usuario.innerHTML = email;

        // finalizarAguardar();
    } else {
        window.location = "../Tela de login/index.html";
    }
}

function limparSessao() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../Tela de login/index.html";
}

function limparTela() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../../Tela de login/index.html";
}
