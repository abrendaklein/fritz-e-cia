// Roteador SPA por hash. Genérico: recebe as rotas prontas, não conhece as páginas.
 
export function iniciarRoteador({ rotas, container }) {
    function renderizar() {
        const caminho = location.hash.slice(1) || "/";
        const caminhoValido = rotas[caminho] ? caminho : "/";
        const rota = rotas[caminhoValido];
        const modelo = document.getElementById(rota.template);
 
        // limpa o contêiner e injeta o novo fragmento
        container.replaceChildren(modelo.content.cloneNode(true));
 
        document.title = rota.titulo;
 
        // atualiza o link ativo do menu
        document.querySelectorAll("nav a").forEach(function (link) {
            if (link.getAttribute("href") === "#" + caminhoValido) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
 
        // função da página, se houver
        if (rota.aoRenderizar) rota.aoRenderizar();
 
        window.scrollTo(0, 0);
        container.focus();
    }
 
    window.addEventListener("hashchange", renderizar);
    renderizar();
}
 