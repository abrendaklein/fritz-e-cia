// Menu mobile: abre e fecha a lista de links.
 
export function iniciarMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    if (!menuToggle) return;
 
    const nav = menuToggle.closest("nav");
 
    menuToggle.addEventListener("click", function () {
        const menuAberto = nav.classList.toggle("menu-aberto");
 
        menuToggle.setAttribute("aria-expanded", menuAberto);
        menuToggle.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );
    });
 
    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("menu-aberto");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menu");
        });
    });
}
 