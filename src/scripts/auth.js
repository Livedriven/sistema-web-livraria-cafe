import { save, getUser, saveSession } from "./services/storage";
import { getInputValue, showError, clearError, validateSignup, validateLogin } from "./utils/validation";

const formSignup = document.querySelector("#form_signup");
const formLogin = document.querySelector("#form_login");

function cadastrar(event) {
    event.preventDefault();

    const usuario = getInputValue("#input1-cadastro");
    const senha = getInputValue("#input2-cadastro");
    const aviso = document.querySelector("#paviso");

    const validation = validateSignup(usuario, senha);

    if (!validation.isValid) {
        showError(aviso, validation.message, validation.inputSelector);
        return;
    }

    clearError(aviso);

    const user = {
        usuario,
        senha
    };

    save(user.usuario, user);
    window.location.href = "../../index.html";
}

function logar(event) {
    event.preventDefault();

    const usuario = getInputValue("#input1-login");
    const senha = getInputValue("#input2-login");
    const aviso = document.querySelector("#paviso2");

    const user = getUser(usuario);
    const validation = validateLogin(user, usuario, senha);

    if (!validation.isValid) {
        showError(aviso, validation.message, validation.inputSelector);
        return;
    }

    clearError(aviso);
    saveSession(user);

    window.location.href = "../../src/pages/home.html";
}

formSignup?.addEventListener("submit", cadastrar);
formLogin?.addEventListener("submit", logar);