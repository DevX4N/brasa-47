/**
 * Todo o conteúdo editorial do site.
 * Tudo aqui é ficcional (marca, chef, endereço, telefone, preços, depoimentos)
 * e deve ser substituído por dados reais antes de qualquer uso comercial.
 */

export const site = {
  name: 'BRASA 47',
  signature: 'Steakhouse & Fire Kitchen',
  tagline: 'Fogo. Carne. Experiência.',
  description:
    'Steakhouse contemporânea no Batel, em Curitiba. Cozinha aberta, brasa viva, cortes maturados e 47 lugares.',
  url: 'https://brasa47.com.br',
  locale: 'pt-BR',
  address: {
    street: 'Alameda Brasa, 47',
    district: 'Batel',
    city: 'Curitiba',
    state: 'PR',
    country: 'BR',
  },
  phone: '(41) 99999-9999',
  phoneHref: '+5541999999999',
  hours: {
    days: 'Terça — Domingo',
    time: '18:30 — 00:00',
  },
  seats: 47,
} as const;

export const nav = [
  { label: 'Experiência', href: '#experiencia' },
  { label: 'Menu', href: '#menu' },
  { label: 'A Casa', href: '#a-casa' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contato', href: '#reservar' },
] as const;

export const registers = [
  { figure: '14', unit: 'h', label: 'defumação lenta', note: 'antes de encostar na brasa' },
  { figure: '900', unit: '°C', label: 'temperatura da brasa', note: 'no ponto de selagem' },
  { figure: '28', unit: 'dias', label: 'maturação dos cortes', note: 'câmara própria' },
  { figure: '47', unit: '', label: 'lugares na casa', note: 'e nenhum a mais' },
] as const;

export const cuts = [
  {
    id: 'ancho',
    name: 'Ancho',
    weight: '350g',
    detail: 'Angus · brasa aberta · manteiga defumada',
    price: 129,
  },
  {
    id: 'prime-rib',
    name: 'Prime Rib',
    weight: '',
    detail: 'Black Angus · maturação 28 dias',
    price: 189,
  },
  {
    id: 'short-rib',
    name: 'Short Rib',
    weight: '',
    detail: '12 horas de fogo lento · redução da casa',
    price: 149,
  },
  {
    id: 'tomahawk',
    name: 'Tomahawk',
    weight: '~1kg',
    detail: 'Seleção especial · para dividir',
    price: 289,
  },
] as const;

export const sequence = [
  {
    n: '01',
    title: 'Fogo',
    body: 'A brasa é acesa às quinze horas. Nada entra na grelha antes de o carvão perder a chama e virar calor limpo.',
  },
  {
    n: '02',
    title: 'Tempo',
    body: 'Cada corte tem o seu relógio. Catorze horas de defumação para uns, doze minutos de brasa aberta para outros.',
  },
  {
    n: '03',
    title: 'Ingrediente',
    body: 'Sal, fogo e a peça. O resto entra só quando tem função — nunca para disfarçar.',
  },
] as const;

/* Depoimento genérico ("uma das melhores experiências que já tivemos")
   não é prova de nada: serve para qualquer casa. Estes dizem o que
   aconteceu na mesa — continuam ficcionais e estão marcados no README. */
export const testimonials = [
  {
    quote:
      'Sentamos de frente para a grelha e não olhamos o celular uma vez.',
    author: 'Marina & Rafael',
  },
  {
    quote: 'Pedimos o short rib às nove. Saímos à meia-noite e meia.',
    author: 'Felipe Andrade',
  },
] as const;

export const times = [
  '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30',
] as const;
