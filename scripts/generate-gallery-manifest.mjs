// Gera lib/gallery-manifest.json a partir dos arquivos em public/gallery.
//
// Por que existe: em produção serverless (Vercel) NÃO há leitura de filesystem
// em runtime — os arquivos de public/ não entram no bundle da função. Então o
// inventário das fotos é capturado aqui, em BUILD TIME (quando o repositório
// inteiro está presente), e gravado num JSON que o app importa normalmente.
//
// Roda automaticamente via "predev" e "prebuild" (ver package.json).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const GALLERY_DIR = path.join(ROOT, "public", "gallery");
const OUT_FILE = path.join(ROOT, "lib", "gallery-manifest.json");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const files = fs
  .readdirSync(GALLERY_DIR)
  .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

fs.writeFileSync(OUT_FILE, JSON.stringify(files, null, 2) + "\n");

console.log(`[gallery-manifest] ${files.length} imagens -> ${path.relative(ROOT, OUT_FILE)}`);
