// Página de cadastro: liga máscaras, validação, envio e histórico na tela.
import { mascaraCPF, mascaraTelefone, mascaraCEP } from "./mascaras.js";
import { cpfValido, mostrarErro, limparErro } from "./validacao.js";
import { lerCadastros, salvarCadastros, apagarCadastros } from "./storage.js";
 
const rotulosTipo = {
    voluntario: "Voluntário",
    adotante: "Adotante",
    doador: "Doador"
};
 
function renderizarCadastros() {
    const lista = document.getElementById("lista-cadastros");
    if (!lista) return;
 
    const cadastros = lerCadastros();
    lista.replaceChildren();
 
    if (cadastros.length === 0) {
        const vazio = document.createElement("li");
        vazio.textContent = "Nenhum cadastro enviado ainda.";
        lista.appendChild(vazio);
        return;
    }
 
    cadastros.forEach(function (c) {
        const item = document.createElement("li");
        item.textContent = c.nome + " (" + rotulosTipo[c.tipo] + ") - " + c.data;
        lista.appendChild(item);
    });
}
 
function dataAtual() {
    return typeof dayjs === "function"
        ? dayjs().format("DD/MM/YYYY HH:mm")
        : new Date().toLocaleString("pt-BR");
}
 
export function iniciarFormulario() {
    const campoCPF = document.getElementById("cpf");
    const campoTelefone = document.getElementById("telefone");
    const campoCEP = document.getElementById("cep");
    const formulario = document.getElementById("form-cadastro");
 
    if (!formulario) return;
 
    // restaura o histórico salvo ao abrir a página
    renderizarCadastros();
 
    const botaoLimpar = document.getElementById("limpar-cadastros");
    if (botaoLimpar) {
        botaoLimpar.addEventListener("click", function () {
            apagarCadastros();
            renderizarCadastros();
        });
    }
 
    // Cancela o balão padrão do navegador e mostra a mensagem no HTML
    let focoDado = false;
    formulario.addEventListener("invalid", function (evento) {
        evento.preventDefault();
        if (!focoDado) {
            evento.target.focus();
            focoDado = true;
            setTimeout(function () { focoDado = false; }, 0);
        }
        mostrarErro(evento.target);
    }, true);
 
    formulario.addEventListener("input", function (evento) {
        limparErro(evento.target);
    });
 
    formulario.addEventListener("reset", function () {
        formulario.querySelectorAll(".erro").forEach(function (aviso) {
            aviso.remove();
        });
        formulario.querySelectorAll("[aria-invalid]").forEach(function (campo) {
            campo.removeAttribute("aria-invalid");
            campo.removeAttribute("aria-describedby");
        });
    });
 
    campoCPF.addEventListener("input", function () {
        campoCPF.value = mascaraCPF(campoCPF.value);
        campoCPF.setCustomValidity("");
    });
 
    campoCPF.addEventListener("blur", function () {
        if (campoCPF.value !== "" && !cpfValido(campoCPF.value)) {
            campoCPF.setCustomValidity("CPF inválido. Confira os números.");
            mostrarErro(campoCPF);
        }
    });
 
    campoTelefone.addEventListener("input", function () {
        campoTelefone.value = mascaraTelefone(campoTelefone.value);
    });
 
    campoCEP.addEventListener("input", function () {
        campoCEP.value = mascaraCEP(campoCEP.value);
    });
 
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
 
        if (!cpfValido(campoCPF.value)) {
            campoCPF.setCustomValidity("CPF inválido. Confira os números.");
            campoCPF.reportValidity();
            return;
        }
 
        document.getElementById("mensagem-envio").textContent =
            "Cadastro enviado! Em breve a Fritz & Cia entra em contato.";
 
        const tipo = formulario.querySelector('input[name="tipo"]:checked');
        const cadastros = lerCadastros();
        cadastros.push({
            nome: document.getElementById("nome").value,
            tipo: tipo.value,
            data: dataAtual()
        });
        salvarCadastros(cadastros);
        renderizarCadastros();
 
        formulario.reset();
    });
}
 