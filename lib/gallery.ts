import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// ORIGEM ÚNICA DAS IMAGENS DA GALERIA
//
// Hoje as fotos vêm do filesystem (pasta public/gallery, servida em /gallery).
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

const GALLERY_DIR = path.join(process.cwd(), "public", "gallery");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

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
 * Devolve a lista em ordem estável (alfabética) — o embaralhamento e a
 * seleção determinística ficam nas funções públicas abaixo.
 */
function readGalleryFiles(): GalleryImage[] {
  const files = fs
    .readdirSync(GALLERY_DIR)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return files.map((file) => ({
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
