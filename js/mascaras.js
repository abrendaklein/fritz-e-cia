// Máscaras de entrada: só formatam texto, não conhecem DOM nem regras de negócio.
 
export function somenteDigitos(valor) {
    return valor.replace(/\D/g, "");
}
 
export function mascaraCPF(valor) {
    const d = somenteDigitos(valor).slice(0, 11);
    return d
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2");
}
 
export function mascaraTelefone(valor) {
    const d = somenteDigitos(valor).slice(0, 11);
    if (d.length <= 10) {
        return d
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return d
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
}
 
export function mascaraCEP(valor) {
    const d = somenteDigitos(valor).slice(0, 8);
    return d.replace(/^(\d{5})(\d)/, "$1-$2");
}
 