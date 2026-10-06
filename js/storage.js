const CHAVE_CADASTROS = "fritzecia:cadastros";
 
export function lerCadastros() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_CADASTROS)) || [];
    } catch (erro) {
        return [];
    }
}
 
export function salvarCadastros(lista) {
    try {
        localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(lista));
    } catch (erro) {
        console.error("Não foi possível salvar:", erro);
    }
}
 
export function apagarCadastros() {
    try {
        localStorage.removeItem(CHAVE_CADASTROS);
    } catch (erro) {
        console.error("Não foi possível apagar:", erro);
    }
}
 