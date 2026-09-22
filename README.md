# BRASA 47 — Steakhouse & Fire Kitchen

Landing page de conversão para reserva. Projeto **fictício**, construído como peça
de portfólio. Astro estático, sem backend.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
npm run preview  # serve o build
```

## Como o projeto está organizado

```
src/
  data/
    site.ts        ← todo o texto editorial, navegação, cortes, horários, contato
    images.ts      ← TODA a fotografia num só lugar, com os helpers img()/srcset()
  styles/
    tokens.css     ← cor, espaço, tipografia, movimento. Nenhum valor solto fora daqui
    base.css       ← primitivas: .grate (a barra da grelha), .btn, .fig, reveals,
                     e as superfícies que o browser desenha (seleção, scrollbar, foco)
  components/
    Grate.astro    ← a barra de ferro. Substitui toda divisória; nunca usar <hr>
    Figure.astro   ← foto com srcset, lazy, proporção reservada e reveal
    …              ← uma seção por componente
  scripts/fire.ts  ← comportamento: reveal, calor, parallax, drawer, formulário
  layouts/Base.astro ← metadata, OG, JSON-LD, fontes, e o contrato de direção
DESIGN.md          ← o sistema visual inteiro: cores, tipos, espaço, formas, regras
.impeccable/design.json ← o mesmo sistema em JSON, com os componentes renderizáveis
tools/
  shots.mjs        ← capturas de inspeção em 5 larguras + relatório de overflow
  slice.mjs        ← fatia uma captura longa em recortes legíveis
  behaviour.mjs    ← testa drawer, validação, estados da reserva, teclado, reduced-motion
```

```bash
node tools/shots.mjs http://localhost:4321/
node tools/behaviour.mjs http://localhost:4321/
```

## Trocar a fotografia pela do cliente

Tudo passa por [`src/data/images.ts`](src/data/images.ts). Em cada foto, troque
`unsplashId` por `src`:

```ts
// antes
{ unsplashId: 'photo-1558030154-d3605e91d892', alt: '…', ratio: 16 / 9 }
// depois
{ src: '/fotos/hero.jpg', alt: '…', ratio: 16 / 9 }
```

`img()` devolve o caminho intacto e `srcset()` devolve vazio — nenhum componente
precisa mudar. Mantenha `ratio` correto: ele reserva o espaço e evita layout shift.

Critério da curadoria atual, para a foto nova não destoar: **low key, luz quente,
fogo real, contraste alto, fundo escuro**. Sem imagem clara demais, sem fundo
branco, sem churrascaria tradicional, sem buffet, sem gente sorrindo para a câmera.
A graduação única do site vive em `.fig img` (`base.css`) — ajuste lá, não por foto.

## O que é ficção e precisa virar dado real

| Item | Onde | Observação |
|---|---|---|
| Nome, assinatura, slogan | `src/data/site.ts` | — |
| Endereço, telefone, horário | `src/data/site.ts` | Alameda Brasa, 47 não existe |
| Preços dos 4 cortes | `src/data/site.ts` → `cuts` | — |
| Chef "Mateo Ferraz" e sua história | `src/components/Chef.astro` | — |
| Depoimentos (Marina & Rafael, Felipe Andrade) | `src/data/site.ts` → `testimonials` | **Inventados.** Não publicar como prova real |
| Números da casa (14h, 900°C, 28 dias, 47) | `src/data/site.ts` → `registers` | — |
| Fotografia | `src/data/images.ts` | Licenciada de terceiros |
| `site.url` (`brasa47.com.br`) | `src/data/site.ts` | Usado em canonical, OG e JSON-LD |
| Links de Instagram e Localização | `src/components/Footer.astro` | Apontam para os sites genéricos |

## O formulário de reserva não envia nada

Por decisão de escopo não há backend. O envio é simulado em
[`src/scripts/fire.ts`](src/scripts/fire.ts) (`reservationForm`) e o estado de
sucesso **diz explicitamente que é demonstração**. Para ligar de verdade, troque o
`await new Promise(...)` por um `fetch` para o seu endpoint e remova o aviso de
demo em [`Reservation.astro`](src/components/Reservation.astro) (`.done__demo`).

A validação, os estados e as mensagens de erro são reais e devem ser mantidos: cada
erro nomeia o problema **e** a saída (ex.: "Telefone incompleto. Inclua o DDD — ex.:
(41) 99999-9999."). A casa não abre segunda-feira, e o formulário recusa a data.

## Decisões que parecem faltas e não são

- **Sem eyebrow decorativo acima dos títulos — nenhum.** Rótulo miúdo acima de heading
  enfraquece o heading. Na seção do chef o título é "Mateo Ferraz" e "Por trás da brasa"
  desceu para o registro de função. No herói a assinatura da marca saiu de cima do h1 e
  foi estampada na barra de ferro do rodapé do herói, junto do horário e da cidade.
- **01 / 02 / 03 na cozinha aberta** ficaram porque a sequência (fogo → tempo →
  ingrediente) carrega informação de ordem, não é enfeite.
- **Os depoimentos não têm foto, fundo nem moldura.** É o único momento da página em
  que tudo para; o vazio é a escolha. Não preencher.
- **Os cortes não têm miniatura por linha.** No desktop as quatro fotos dividem o
  mesmo palco à direita e trocam conforme a linha sob o ponteiro (só CSS, sem JS).
  Miniatura por linha transformava a seção numa tabela de cardápio. No celular, que
  não tem ponteiro, cada corte mostra a sua foto inteira.
- **O ambiente tem duas fotos, não três.** Logo depois da galeria, uma terceira grade
  de imagens vira sobra. O que falta ali é ar.
- **`gap` nunca é declarado sozinho numa grade de 12 colunas** — sempre `row-gap` e
  `column-gap` separados. Ver a regra das doze colunas no [DESIGN.md](DESIGN.md).
- **O site tem uma página só.** O CTA no fim dos cortes leva à reserva, não a um
  `/menu` que não existe; a carta completa é apresentada na casa. Se um dia houver
  página de menu, o link do rodapé e esse CTA são os dois pontos a trocar.
- **O painel do formulário não tem moldura.** Ele é limitado pela barra de ferro e pelo
  desfoque. Uma borda em volta faria dele o único card da página.
