# CLAUDE.md

Guia para agentes (Claude Code) trabalharem neste repositório. Leia antes de editar.

## Visão geral

Landing page de **galeria virtual** para o fotógrafo fictício **Théo Marchetti**
(paisagens urbanas e retratos em P&B, São Paulo). Página única (one-page) com
**scroll narrativo** e animações: hero em tela cheia, menu lateral que desliza ao
sair do hero, galeria horizontal controlada por scroll, e seções de Sobre,
Trajetória, Próximos locais, Contato e rodapé.

Tema visual: galeria noir — fundo quase preto, cinza, acento off-white, muito
whitespace, grão de filme sutil sobre tudo.

## Stack

- **Next.js 15** (App Router) — `app/`
- **React 19**
- **Tailwind CSS v4** — configuração CSS-first (sem `tailwind.config.js`); tokens em `app/globals.css` via `@theme`. PostCSS plugin: `@tailwindcss/postcss`.
- **Motion** (`motion`, antigo Framer Motion) — imports de `motion/react`.
- **TypeScript** (strict).
- Fontes **locais** (Base Neue) via `next/font/local`.

## Comandos

```bash
npm install        # instalar deps
npm run dev        # servidor de desenvolvimento (http://localhost:3000)
npm run build      # build de produção
npm run start      # servir o build
npm run lint       # lint (next lint)
```

Ambiente de desenvolvimento: **Windows + PowerShell**. Node 21.

## Estrutura

```
app/
  layout.tsx        # fontes (next/font/local) + metadata + <body className="grain">
  globals.css       # Tailwind v4: @theme (cores + fontes), .eyebrow, .grain, scrollbar
  page.tsx          # SERVER component: lê imagens e monta as seções (force-dynamic)
components/          # todas as seções; as que animam têm "use client"
  Hero.tsx           # fade-in no load; useScroll para o indicador
  SideMenu.tsx       # useScroll + useMotionValueEvent detecta saída do hero; AnimatePresence + motion.aside
  GalleryHorizontal.tsx  # seção sticky alta; useScroll({target,offset}) + useTransform no x
  About.tsx          # reveal com whileInView
  Timeline.tsx       # stagger com whileInView
  Upcoming.tsx       # cards com imagem de fundo (next/image fill)
  Contact.tsx
  Footer.tsx
lib/
  artist-data.ts    # FONTE ÚNICA de texto/dados, tipada (artist: ArtistData)
  gallery.ts        # origem das imagens da galeria (ver "Convenções")
  text.ts           # stripAccents() — ver "Gotchas/fontes"
public/
  gallery/          # fotos da galeria (servidas em /gallery/*.jpg)
  venues/           # imagens de fundo dos cards de Próximos locais
  fonts/base_neue/  # arquivos .ttf da Base Neue (Regular/Expanded/Condensed)
```

## Convenções importantes

### Dados de texto
Tudo que é copy do artista (nome, bio, trajetória, próximos eventos, contato,
navegação) vive em **`lib/artist-data.ts`**, tipado. Componentes só consomem —
não criar strings soltas na UI.

### Origem das imagens (preparado para Firebase)
A leitura das imagens da galeria está **isolada em `lib/gallery.ts`**:
- `readGalleryFiles()` (privada) — único ponto que toca o filesystem (`fs.readdirSync` em `public/gallery`).
- `getGalleryImages()` — devolve a lista **embaralhada** (usada na galeria).
- `getFeaturedImage()` — devolve uma escolha **determinística** (primeira em ordem; foto da seção Sobre).
- Tipo público: `GalleryImage { src, alt }`.

**Para migrar para Firebase (ou outra origem) no futuro, reescreva APENAS
`readGalleryFiles()`** — as funções públicas e os componentes não mudam.

### next/image
Fotos têm dimensões variadas → usar `<Image fill>` dentro de containers com
tamanho definido + `object-cover`. Imagens locais em `public/` não precisam de
config de domínio.

### page.tsx é Server Component
Lê as imagens no servidor e passa por props para os componentes client. Tem
`export const dynamic = "force-dynamic"` para reembaralhar a galeria a cada
request. Componentes com animação (Motion usa hooks de browser) precisam de
`"use client"` no topo.

## Sistema tipográfico (Base Neue)

Uma única família em 3 **larguras**, mapeadas em `@theme` (`app/globals.css`) e
expostas como utilitários Tailwind:

| Token / classe   | Largura    | Uso                                                        |
|------------------|------------|------------------------------------------------------------|
| `font-display`   | Expanded   | nome do hero (Black/900) e títulos de seção (Bold/700)     |
| `font-sans`      | Regular    | corpo de texto, em peso leve (Light/300)                   |
| `font-cond`      | Condensed  | rótulos/kickers (`.eyebrow`), navegação, rodapé, metadados |

Contraste de hierarquia = **peso + largura**: Condensed grita os rótulos,
Regular sussurra o corpo, Expanded ocupa espaço nos títulos.

## Gotchas (erros já resolvidos — não repetir)

1. **Variáveis das fontes ficam no `<html>`, não no `<body>`.**
   O `@theme` do Tailwind define `--font-sans`/`--font-display`/`--font-cond` no
   `:root` referenciando as variáveis do next/font (`--font-base*`). Se essas
   variáveis estiverem só no `<body>`, ficam indefinidas no `:root`, os tokens
   derivados resolvem para vazio e **tudo cai na fonte do sistema** (Segoe UI).
   Mantê-las no `<html className={...}>`.

2. **`next/font/local` exige `path` como string literal.** Nada de template
   strings / variáveis (`` `${DIR}/...` ``) no `src` — quebra o build com
   *"Font loader values must be explicitly written literals"*.

3. **Acentos em pesos Expanded da Base Neue saem malformados** (acento agudo
   fino/desalinhado nas letras pesadas). Solução: `lib/text.ts` → `stripAccents()`
   aplicado **só no texto exibido em Expanded** (hero, títulos, nomes de locais
   nos cards, marca do menu/rodapé). Mantemos os acentos no corpo (Regular,
   renderiza bem) e nos metadados/`alt` (corretos para SEO).

4. **Cache do `.next` em dev.** Deletar rotas/arquivos com o servidor rodando
   pode deixar o manifesto inconsistente (ex.: `GET / 404`). Se acontecer:
   parar o dev server, `Remove-Item .next -Recurse -Force`, reiniciar.

5. **Cache de CSS do navegador em dev.** O CSS de dev tem URL fixa; um Ctrl+R
   simples pode reusar o antigo. Para validar mudanças de estilo/fonte: hard
   refresh (Ctrl+Shift+R), DevTools → Network → "Disable cache", ou janela anônima.

## Estética / direção visual

- Paleta (tokens em `@theme`): `--color-ink` #0a0a0a (fundo), `--color-surface`
  #161616, `--color-line` #2a2a2a, `--color-fg` #f5f5f5, `--color-muted` #8a8a8a,
  `--color-accent` #e7e3da (off-white). **Sem cor vibrante.**
- Fotos da galeria em **grayscale**, coloridas no hover.
- Grão de filme: classe `.grain` no `<body>` (overlay fixo via `::after`).
- Animações de entrada com `ease: [0.16, 1, 0.3, 1]`; reveals com `whileInView`
  `viewport={{ once: true }}`.

## Ao editar

- Combine o estilo do código existente (componentes client com Motion, classes
  Tailwind, comentários em PT-BR).
- Mudou fonte/estilo? Valide o que **renderiza de fato** (DevTools → "Rendered
  Fonts", ou screenshot), não só se o arquivo serve 200 — fallback silencioso já
  enganou aqui (ver Gotcha 1 e 3).
- Não introduzir `tailwind.config.js`: a config é CSS-first no `globals.css`.
```
