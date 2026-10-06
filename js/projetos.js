const projetos = [
    {
        id: "ronda",
        categoria: "RESGATE",
        titulo: "Ronda do Fritz",
        descricao: "O Fritz fazia a ronda pelo bairro todo dia. A nossa equipe faz o mesmo: sai atrás de gatinhos que precisam de ajuda e traz eles pra perto.",
        itens: [
            "Resgate de filhotes e adultos em situação de rua",
            "Atendimento a avisos de moradores",
            "Primeiros cuidados no local"
        ]
    },
    {
        id: "cantinho",
        categoria: "CUIDADOS",
        titulo: "Cantinho do Café",
        descricao: "É o lugar onde os resgatados se recuperam. Eles comem, descansam e ganham a pancinha que o Fritz tinha.",
        itens: [
            "Vacinação e vermifugação",
            "Castração",
            "Acompanhamento veterinário até a alta"
        ]
    },
    {
        id: "visita",
        categoria: "ADOÇÃO",
        titulo: "Visita Definitiva",
        descricao: "É quando a visita vira morador. Ajudamos cada família a encontrar o gatinho certo e acompanhamos a adaptação nos primeiros meses.",
        itens: [
            "Feira de adoção todo primeiro sábado do mês",
            "Conversa e termo de adoção responsável",
            "Recebemos gatinhos para doação"
        ]
    }
];
 
function criarCardProjeto(projeto) {
    const molde = document.getElementById("tpl-card-projeto");
    const card = molde.content.cloneNode(true);
 
    card.querySelector("article").id = projeto.id;
    card.querySelector(".badge").textContent = projeto.categoria;
    card.querySelector("h2").textContent = projeto.titulo;
    card.querySelector("p").textContent = projeto.descricao;
 
    const lista = card.querySelector("ul");
    projeto.itens.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        lista.appendChild(li);
    });
 
    return card;
}
 
export function renderizarProjetos() {
    const alvo = document.getElementById("lista-projetos");
    if (!alvo) return;
    alvo.replaceChildren(...projetos.map(criarCardProjeto));
}
 