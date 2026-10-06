// Ponto de entrada: só conecta os módulos, sem lógica própria.
import { iniciarRoteador } from "./router.js";
import { iniciarMenu } from "./menu.js";
import { iniciarFormulario } from "./formulario.js";
import { renderizarProjetos } from "./projetos.js";
 
const rotas = {
    "/": {
        template: "tpl-inicio",
        titulo: "Fritz & Cia - Proteção Animal e Adoção Responsável"
    },
    "/projetos": {
        template: "tpl-projetos",
        titulo: "Projetos - Fritz & Cia",
        aoRenderizar: renderizarProjetos
    },
    "/cadastro": {
        template: "tpl-cadastro",
        titulo: "Cadastro - Fritz & Cia",
        aoRenderizar: iniciarFormulario
    }
};
 
iniciarMenu();
iniciarRoteador({ rotas: rotas, container: document.getElementById("app") });
 