import manifest from "./gallery-manifest.json";

// ---------------------------------------------------------------------------
// ORIGEM ÚNICA DAS IMAGENS DA GALERIA
//
// As fotos ficam em public/gallery (servidas em /gallery). O INVENTÁRIO dos
// arquivos é capturado em build time pelo script scripts/generate-gallery-
// manifest.mjs (roda via predev/prebuild) e gravado em gallery-manifest.json.
// Lemos esse manifesto aqui — sem tocar o filesystem em runtime, o que mantém
// tudo funcionando em produção serverless (Vercel), onde public/ não está
// disponível para a função.
//
// Toda a leitura está isolada em `readGalleryFiles()`. Para migrar para o
// Firebase (ou qualquer outra origem) no futuro, basta reescrever essa única
// função para devolver uma lista de `GalleryImage` — os componentes e as
// funções públicas abaixo não precisam mudar.
// ---------------------------------------------------------------------------

export interface GalleryImage {
  /** Caminho público, pronto para usar no <Image src>. Ex.: /gallery/foto.jpg */
  src: string;
  /** Texto alternativo legível, derivado do nome do arquivo. */
  alt: string;
}

/** Converte "max_gindele-great-spotted-8024806_1920.jpg" -> "Great spotted woodpecker". */
function filenameToAlt(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  const cleaned = base
    .replace(/[_-]\d+(_\d+)?$/g, "") // remove sufixos numéricos (ids/resolução)
    .replace(/^[^-]+-/, "") // remove o "autor-" inicial
    .replace(/[_-]+/g, " ")
    .trim();
  const label = cleaned || base.replace(/[_-]+/g, " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * ÚNICO ponto de acoplamento com a origem dos dados.
 * Devolve a lista em ordem estável (alfabética, garantida pelo gerador do
 * manifesto) — o embaralhamento e a seleção determinística ficam nas funções
 * públicas abaixo.
 */
function readGalleryFiles(): GalleryImage[] {
  return (manifest as string[]).map((file) => ({
    src: `/gallery/${file}`,
    alt: filenameToAlt(file),
  }));
}

/** Fisher–Yates sobre uma cópia (não muta a fonte). */
function shuffle<T>(input: readonly T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Lista da galeria, em ordem aleatória a cada render no servidor. */
export function getGalleryImages(): GalleryImage[] {
  return shuffle(readGalleryFiles());
}

/** Imagem da seção "Sobre": escolha determinística (primeira em ordem estável). */
export function getFeaturedImage(): GalleryImage {
  return readGalleryFiles()[0];
}
