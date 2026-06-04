import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A rota "/" é force-dynamic e lê as fotos do filesystem em runtime
  // (lib/gallery.ts -> fs.readdirSync em public/gallery). No Vercel, os
  // arquivos de public/ não entram no bundle da função serverless por
  // padrão; sem isso, a leitura falharia com ENOENT em produção.
  // Forçamos a inclusão da pasta no rastreamento de arquivos da rota.
  outputFileTracingIncludes: {
    "/": ["./public/gallery/**/*"],
  },
};

export default nextConfig;
