// Regras de validação e mensagens de erro dos campos.
import { somenteDigitos } from "./mascaras.js";
 
export function cpfValido(cpf) {
    const d = somenteDigitos(cpf);
    if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
 
    for (let t = 9; t < 11; t++) {
        let soma = 0;
        for (let i = 0; i < t; i++) {
            soma += Number(d[i]) * (t + 1 - i);
        }
        const digito = ((soma * 10) % 11) % 10;
        if (digito !== Number(d[t])) return false;
    }
    return true;
}
 
function mensagemErro(campo) {
    const v = campo.validity;
 
    if (v.customError) return campo.validationMessage;
 
    if (v.valueMissing) {
        if (campo.type === "radio") return "Escolha uma das opções.";
        if (campo.type === "checkbox") return "Você precisa marcar esta opção.";
        if (campo.tagName === "SELECT") return "Selecione uma opção.";
        return "Preencha este campo.";
    }
    if (v.typeMismatch) return "Digite um e-mail válido, como nome@email.com.";
    if (v.tooShort) return "Digite pelo menos " + campo.minLength + " caracteres.";
    if (v.patternMismatch) return campo.title || "Formato inválido.";
 
    return "Confira este campo.";
}
 
export function mostrarErro(campo) {
    const chave = campo.name || campo.id;
    let aviso = document.getElementById("erro-" + chave);
 
    if (!aviso) {
        aviso = document.createElement("span");
        aviso.id = "erro-" + chave;
        aviso.className = "erro";
        if (campo.matches('[type="radio"], [type="checkbox"]')) {
            campo.closest("fieldset").appendChild(aviso);
        } else {
            campo.insertAdjacentElement("afterend", aviso);
        }
    }
 
    aviso.textContent = mensagemErro(campo);
    campo.setAttribute("aria-invalid", "true");
    campo.setAttribute("aria-describedby", aviso.id);
}
 
export function limparErro(campo) {
    const aviso = document.getElementById("erro-" + (campo.name || campo.id));
    if (aviso) aviso.remove();
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");
}
 