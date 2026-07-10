const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function userExists(user) {
    return user && Object.keys(user).length > 0;
}

function isSameUsername(user, usuario) {
    return user.usuario === usuario;
}

function isSamePassword(user, senha) {
    return user.senha === senha;
}

function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

function hasSpecialCharacter(value) {
    return specialCharacterRegex.test(value);
}

export function getInputValue(selector) {
    return document.querySelector(selector).value.trim();
}

export function clearInputValue(selector){
    document.querySelector(selector).value = "";
}

export function showError(aviso, message, inputSelector) {
    aviso.innerText = message;
    aviso.style.display = "block";
    document.querySelector(inputSelector).focus();
}

export function clearError(aviso) {
    aviso.innerText = "";
    aviso.style.display = "none";
}

export function validateLogin(user, usuario, senha) {
    if (!userExists(user)) {
        return {
            isValid: false,
            message: "Usuário inexistente.",
            inputSelector: "#input1-login"
        };
    }

    if (!isSameUsername(user, usuario)) {
        return {
            isValid: false,
            message: "Nome de usuário inválido.",
            inputSelector: "#input1-login"
        };
    }

    if (!isSamePassword(user, senha)) {
        return {
            isValid: false,
            message: "Senha inválida.",
            inputSelector: "#input2-login"
        };
    }

    return {
        isValid: true
    };
}

export function validateSignup(usuario, senha) {
    if (!hasMinLength(usuario, 5)) {
        return {
            isValid: false,
            message: "O nome de usuário deve ter no mínimo 5 caracteres.",
            inputSelector: "#input1-cadastro"
        };
    }

    if (!hasMinLength(senha, 8)) {
        return {
            isValid: false,
            message: "Sua senha deve ter no mínimo 8 dígitos.",
            inputSelector: "#input2-cadastro"
        };
    }

    if (!hasSpecialCharacter(senha)) {
        return {
            isValid: false,
            message: "Use pelo menos um caractere especial na senha.",
            inputSelector: "#input2-cadastro"
        };
    }

    return {
        isValid: true
    };
}