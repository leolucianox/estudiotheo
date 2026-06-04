// ---------------------------------------------------------------------------
// Fonte única dos dados de texto da landing page.
// Tudo que é copy/conteúdo do artista vive aqui, tipado, para que os
// componentes apenas consumam — sem strings soltas espalhadas pela UI.
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export interface Exhibition {
  venue: string;
  city: string;
  year: string;
}

export interface UpcomingEvent {
  venue: string;
  city: string;
  date: string;
  /** Imagem de fundo do card (em /public/venues). */
  image: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface ArtistData {
  name: string;
  role: string;
  location: string;
  tagline: string;
  bio: string[];
  nav: NavItem[];
  exhibitions: Exhibition[];
  upcoming: UpcomingEvent[];
  contact: {
    phone: string;
    address: string;
    email: string;
  };
  social: SocialLink[];
}

export const artist: ArtistData = {
  name: "Théo Marchetti",
  role: "Paisagens urbanas e retratos em preto e branco",
  location: "São Paulo, Brasil",
  tagline: "Fotografia — São Paulo",

  bio: [
    "Há doze anos Théo Marchetti percorre São Paulo registrando os contrastes que só a cidade grande produz: a luz dura entre os prédios, a sombra que engole uma esquina, o rosto anônimo que atravessa a multidão.",
    "Seu trabalho em preto e branco bebe diretamente do cinema noir — o claro-escuro dramático, a tensão de uma cena suspensa — e da tradição da fotografia documental, atenta ao gesto e ao acaso.",
    "O resultado é uma obra que recusa o pitoresco e busca, em cada quadro, o instante em que a metrópole revela sua arquitetura emocional.",
  ],

  nav: [
    { label: "Galeria", href: "#galeria" },
    { label: "Sobre", href: "#sobre" },
    { label: "Trajetória", href: "#trajetoria" },
    { label: "Próximos", href: "#proximos" },
    { label: "Contato", href: "#contato" },
  ],

  exhibitions: [
    { venue: "Galeria Vermelho", city: "São Paulo", year: "2021" },
    { venue: "MASP — mostra coletiva", city: "São Paulo", year: "2022" },
    { venue: "Instituto Moreira Salles", city: "Rio de Janeiro", year: "2023" },
    { venue: "Paris Photo", city: "França", year: "2024" },
  ],

  upcoming: [
    {
      venue: "Pinacoteca de São Paulo",
      city: "São Paulo",
      date: "Mar 2026",
      image: "/venues/pinacoteca.jpg",
    },
    {
      venue: "Galeria Luisa Strina",
      city: "São Paulo",
      date: "Jun 2026",
      image: "/venues/luisa-strina.jpg",
    },
    {
      venue: "Photo London",
      city: "Londres",
      date: "Set 2026",
      image: "/venues/photo-london.jpg",
    },
  ],

  contact: {
    phone: "+55 11 98765-4321",
    address: "Rua Augusta, 1500 — Consolação, São Paulo/SP",
    email: "theo@marchetti.studio",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "E-mail", href: "mailto:theo@marchetti.studio" },
  ],
};
