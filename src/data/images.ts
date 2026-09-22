/**
 * Único ponto de troca da fotografia.
 *
 * Hoje: fotos licenciadas do Unsplash, escolhidas uma a uma no olho —
 * a descrição automática do banco não é confiável. Critério: low key,
 * fogo real, luz quente, contraste alto, fundo escuro, sem cara de stock.
 *
 * Para trocar por fotografia do cliente: substitua `unsplashId` por `src`
 * com um caminho local (ex.: '/fotos/hero.jpg'). O helper `img()` devolve
 * o caminho intacto e `srcset()` devolve vazio — o resto continua igual.
 */

export type Photo = {
  /** id do Unsplash (`photo-xxxx`) OU undefined quando a foto é local */
  unsplashId?: string;
  /** caminho local, usado quando não há unsplashId */
  src?: string;
  /** descrição para leitores de tela; vazio quando a imagem é decorativa */
  alt: string;
  /** proporção nativa de exibição */
  ratio: number;
  /** ponto de interesse, para o recorte não decapitar o assunto */
  focus?: string;
};

const Q = 74;

/** URL de uma foto numa largura específica. */
export function img(photo: Photo, w: number, ratio = photo.ratio): string {
  if (!photo.unsplashId) return photo.src ?? '';
  const h = Math.round(w / ratio);
  return `https://images.unsplash.com/${photo.unsplashId}?auto=format&fit=crop&w=${w}&h=${h}&q=${Q}`;
}

/** srcset em várias larguras. Vazio para fotos locais. */
export function srcset(photo: Photo, widths: number[], ratio = photo.ratio): string {
  if (!photo.unsplashId) return '';
  return widths.map((w) => `${img(photo, w, ratio)} ${w}w`).join(', ');
}

export const photos = {
  /** Chamas subindo por entre as barras da grelha — a tese da página. */
  hero: {
    unsplashId: 'photo-1558030154-d3605e91d892',
    alt: 'Chamas subindo por entre as barras da grelha na cozinha aberta',
    ratio: 16 / 9,
    focus: '60% 55%',
  },
  manifesto: {
    unsplashId: 'photo-1515844543590-2221dd1b4c3d',
    alt: 'Uma chama sozinha sobre a brasa, antes de o serviço começar',
    ratio: 3 / 4,
    focus: '50% 64%',
  },
  cozinha: {
    unsplashId: 'photo-1741994246814-9caec2a78e07',
    alt: 'A grelha da cozinha aberta cheia, no meio do serviço',
    ratio: 16 / 9,
    focus: '50% 50%',
  },
  chef: {
    /* Foto do cliente. 825x1024 — praticamente 4/5, preenche o espaço
       sem barra nem recorte perceptível. */
    src: '/fotos/chef.webp',
    alt: 'O chef Mateo Ferraz virando os cortes na brasa da cozinha aberta',
    ratio: 4 / 5,
    focus: '50% 50%',
  },
  reserva: {
    unsplashId: 'photo-1613628068926-0a5562f4aa9e',
    alt: '',
    ratio: 16 / 9,
    focus: '50% 55%',
  },
} satisfies Record<string, Photo>;

export const cutPhotos = {
  ancho: {
    unsplashId: 'photo-1599458254377-147aa4f9933a',
    alt: 'Ancho selando sobre a brasa aberta, com marcas da grelha',
    ratio: 3 / 2,
  },
  primeRib: {
    unsplashId: 'photo-1625604086816-4bfaf603e842',
    alt: 'Prime rib maturado, fatiado e servido na panela de ferro',
    ratio: 3 / 2,
  },
  shortRib: {
    unsplashId: 'photo-1625604087024-7fb428fc4626',
    alt: 'Short rib depois de doze horas de fogo lento, na redução da casa',
    ratio: 3 / 2,
  },
  tomahawk: {
    unsplashId: 'photo-1599458253959-5d2d95a60397',
    alt: 'Tomahawk descansando sobre a grelha depois da selagem',
    ratio: 3 / 2,
  },
} satisfies Record<string, Photo>;

export const galleryPhotos: (Photo & { span: 'wide' | 'tall' | 'small' | 'square' })[] = [
  {
    unsplashId: 'photo-1610897304452-d64c92b21246',
    alt: 'Brasas vivas respirando sob a grelha',
    ratio: 3 / 2,
    span: 'wide',
  },
  {
    unsplashId: 'photo-1719329467639-40d4b5e20b37',
    alt: 'Cozinheiro finalizando um prato na passagem',
    ratio: 3 / 4,
    span: 'tall',
  },
  {
    unsplashId: 'photo-1561553521-b6cddc085c5f',
    alt: 'Cortes sobre a grelha aberta, no meio do serviço',
    ratio: 1,
    span: 'small',
  },
  {
    unsplashId: 'photo-1621494548002-bfc916172ead',
    alt: 'A mão do cozinheiro sobre a boca do fogão, no meio do serviço',
    ratio: 3 / 4,
    span: 'tall',
  },
  {
    unsplashId: 'photo-1708388464743-80126e9cdecf',
    alt: 'Cortes na brasa aberta, virados na pinça',
    ratio: 3 / 2,
    span: 'wide',
  },
  {
    unsplashId: 'photo-1666013943134-48dd4267a4c1',
    alt: 'Cortes maturados na tábua, antes de irem para o fogo',
    ratio: 1,
    span: 'square',
  },
  {
    unsplashId: 'photo-1565812557693-208d29398fbb',
    alt: 'Carvão ainda em âmbar, no fim do serviço',
    ratio: 1,
    span: 'small',
  },
  {
    unsplashId: 'photo-1692197275441-40c874f40385',
    alt: 'Prato montado e finalizado, pronto para sair',
    ratio: 3 / 2,
    span: 'wide',
  },
];

/* Duas fotos, não três: logo depois da galeria, uma terceira grade de
   imagens vira sobra. O que falta aqui é ar, não quadro. */
export const ambiencePhotos: Photo[] = [
  {
    unsplashId: 'photo-1740149190825-71a3ded55f06',
    alt: 'A luz baixa do salão, recortada pelas arandelas da parede',
    ratio: 4 / 5,
    focus: '50% 50%',
  },
  {
    unsplashId: 'photo-1602232037779-30b01ac3c457',
    alt: 'Mesa posta e acesa no salão, antes de o serviço começar',
    ratio: 3 / 2,
    focus: '50% 50%',
  },
];
