import { build } from "esbuild";
import { minify } from "html-minifier-terser";
import {
    readFileSync, writeFileSync, mkdirSync,
    cpSync, rmSync, statSync, readdirSync
} from "node:fs";

// limpa e recria a pasta dist
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

// junta os módulos em um arquivo só e minifica
await build({
    entryPoints: ["js/main.js"],
    bundle: true,
    minify: true,
    format: "esm",
    outfile: "dist/js/main.js"
});

// CSS: minifica
await build({
    entryPoints: ["css/style.css"],
    minify: true,
    outfile: "dist/css/style.css"
});

// HTML: minifica
const html = readFileSync("html/index.html", "utf8");
const htmlMin = await minify(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true
});
writeFileSync("dist/index.html", htmlMin);

// Imagens: copia sem alterar
cpSync("imagens", "dist/imagens", { recursive: true });

// Relatório de tamanhos
function tamanho(caminho) {
    return statSync(caminho).size;
}

const jsAntes = readdirSync("js")
    .filter((f) => f.endsWith(".js"))
    .reduce((soma, f) => soma + tamanho("js/" + f), 0);

function linha(nome, antes, depois) {
    const pct = ((1 - depois / antes) * 100).toFixed(1);
    console.log(nome + ": " + antes + " B -> " + depois + " B (-" + pct + "%)");
}

console.log("");
linha("HTML", tamanho("html/index.html"), tamanho("dist/index.html"));
linha("CSS ", tamanho("css/style.css"), tamanho("dist/css/style.css"));
linha("JS  ", jsAntes, tamanho("dist/js/main.js"));