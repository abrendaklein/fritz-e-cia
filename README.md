# Fritz & Cia
 
Site de uma ONG fictícia de proteção animal, feito como projeto acadêmico. A ideia nasceu de uma história real: a de um gato de rua chamado Fritz.
 
**Site publicado:** https://abrendaklein.github.io/fritz-e-cia/
 
## Sobre o projeto
 
O site apresenta a história do Fritz, a missão da ONG e os três projetos (Ronda do Fritz, Cantinho do Café e Visita Definitiva). Também tem um formulário de cadastro para quem quer ser voluntário, adotar ou doar um gatinho.
 
O site é uma SPA (Single Page Application): existe um único HTML e o conteúdo das páginas é trocado por JavaScript, sem recarregar.
 
## Funcionalidades
 
- Navegação por hash (`#/projetos`, `#/cadastro`) sem recarregar a página
- Páginas montadas a partir de `<template>`
- Cards dos projetos gerados a partir de um array de dados
- Formulário com máscaras de CPF, telefone e CEP
- Validação com mensagens de erro em português na tela
- Histórico de cadastros salvo no `localStorage`
- Menu responsivo para celular
## Tecnologias
 
- HTML5
- CSS3 (variáveis, grid de 12 colunas, 5 breakpoints)
- JavaScript puro com ES Modules
- Day.js (via CDN) para formatar a data dos cadastros
- Fontes Fredoka e Nunito (Google Fonts)
## Estrutura de pastas
 
```
projeto-ong/
├── index.html        (redireciona para html/index.html)
├── README.md
├── css/
│   └── style.css
├── html/
│   └── index.html
├── imagens/
└── js/
    ├── main.js
    ├── router.js
    ├── menu.js
    ├── formulario.js
    ├── validacao.js
    ├── mascaras.js
    ├── storage.js
    └── projetos.js
```
 
## Como rodar
 
O projeto usa módulos ES6, que não funcionam abrindo o arquivo com duplo clique. É preciso um servidor local:
 
1. Clone o repositório:
```
   git clone https://github.com/abrendaklein/fritz-e-cia.git
```
2. Abra a pasta no VS Code.
3. Instale a extensão Live Server.
4. Clique com o botão direito em `html/index.html` e escolha "Open with Live Server".
## Acessibilidade
 
- HTML semântico e um `h1` por página
- Link "Pular para o conteúdo"
- Foco visível nos elementos interativos
- Menu com `aria-expanded`, `aria-controls` e `aria-label`
- Campos com `label` e erros ligados por `aria-describedby`
- Respeita `prefers-reduced-motion`
## Fluxo de branches
 
O repositório segue o GitFlow:
 
- `main`: versões de lançamento, com tag
- `develop`: desenvolvimento contínuo
- `feature/*`: uma branch para cada funcionalidade (acessibilidade, otimização e documentação)
## Autora
 
Brenda Klein

Projeto desenvolvido para a disciplina de front-end.