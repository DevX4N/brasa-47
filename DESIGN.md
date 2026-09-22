---
name: BRASA 47
description: Carvão, ferro fundido e brasa — um mundo onde a barra da grelha é a única divisória e o cobre nunca é uniforme.
colors:
  void: "#090909"
  iron: "#11100e"
  iron-2: "#16140f"
  scale: "#1f1c17"
  bone: "#f3efe7"
  ash: "#9a9388"
  ash-dim: "#8a8378"
  ember: "#c96a36"
  ember-hot: "#e8a05e"
  ember-deep: "#8f3d25"
  rule: "rgba(255, 255, 255, 0.1)"
  rule-soft: "rgba(255, 255, 255, 0.055)"
  rule-lit: "rgba(255, 255, 255, 0.16)"
typography:
  display:
    fontFamily: "Bodoni Moda, Bodoni MT, Didot, Georgia, serif"
    fontSize: "clamp(3.5rem, 12.5vw, 8rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.035em"
    fontVariation: "opsz auto"
  headline:
    fontFamily: "Bodoni Moda, Bodoni MT, Didot, Georgia, serif"
    fontSize: "clamp(2.6rem, 7vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Bodoni Moda, Bodoni MT, Didot, Georgia, serif"
    fontSize: "clamp(2.1rem, 5vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.15vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "0.2em"
rounded:
  hair: "1px"
  edge: "2px"
  none: "0"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "96px"
  s-10: "128px"
  gutter: "clamp(20px, 5vw, 64px)"
  section: "clamp(88px, 11vw, 180px)"
  section-tight: "clamp(64px, 7vw, 112px)"
components:
  button-solid:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.void}"
    rounded: "{rounded.edge}"
    padding: "12px 32px"
    height: "48px"
  button-solid-hover:
    backgroundColor: "{colors.ember-hot}"
    textColor: "{colors.void}"
    rounded: "{rounded.edge}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.edge}"
    padding: "12px 32px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.bone}"
    rounded: "{rounded.edge}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  button-large:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.void}"
    rounded: "{rounded.edge}"
    padding: "24px 64px"
    height: "64px"
  input-field:
    backgroundColor: "rgba(255, 255, 255, 0.032)"
    textColor: "{colors.bone}"
    rounded: "{rounded.edge}"
    padding: "12px 16px"
    height: "48px"
  input-field-focus:
    backgroundColor: "rgba(201, 106, 54, 0.06)"
    textColor: "{colors.bone}"
    rounded: "{rounded.edge}"
---

# Design System: BRASA 47

## Overview

**Creative North Star: "A Grelha"**

A estrutura do site é a grelha de ferro, não a comida. Tudo que separa uma coisa da outra nesta casa é uma barra de ferro vista de perto: aresta superior acesa, corpo escuro, sombra por baixo. Ela atravessa a página inteira, de sangria a sangria, e é a única divisória que existe — não há `<hr>`, não há hairline solto, não há caixa. O sistema recusa deliberadamente o arranjo padrão da categoria: herói centralizado com foto de bife, grade de cards de cortes, dourado de churrascaria.

O mundo é feito de três matérias: carvão apagado (o chão de tudo), ferro frio (os campos secundários) e brasa (o único acento). O cobre nunca aparece uniforme nem por decoração — ele acende onde o olho está e esfria até o quase-preto no repouso, carregado elemento a elemento por `--heat` e `--hot`. Fotografia real, low key e quente, faz o trabalho pesado; nenhuma superfície finge textura em CSS.

A tipografia opõe um didone de contraste alto (Bodoni Moda, haste fina, terminais em bola) a um sans geométrico-humanista (Manrope). Títulos em escala grande com entrelinha abaixo de 1, corpo curto, muito ar. Números são medida nesta casa — pesos, graus, dias, preços e horários vão em numerais tabulares.

**Key Characteristics:**
- Uma só divisória no sistema: a barra da grelha, 3px, renderizada como matéria.
- Zero cards. Zero sombra de SaaS. Raio máximo de 2px.
- O acento cobre é raro e estado-dependente, nunca decorativo.
- Fundo #090909 chapado, com uma única brasa distante no topo (radial fixo).
- Movimento só sobe, irradia ou esfria — nada desliza de lado.

## Colors

Paleta de fornalha apagada: três tons de preto-carvão, um osso quente para texto e uma faixa de brasa que vai do cobre ao âmbar.

### Primary
- **Brasa** (`{colors.ember}`): o único acento. CTA sólido em repouso, unidades dos números da casa, borda de foco dos campos, assinatura da marca no herói, sublinhado de link. Passa 5.3:1 sobre o carvão, então pode ser texto.
- **Brasa Viva** (`{colors.ember-hot}`): pico de calor. Só aparece por intenção — hover, foco, a aresta acesa da barra. Nunca é estado de repouso.
- **Brasa Funda** (`{colors.ember-deep}`): matéria, nunca texto. Seleção de texto, polegar da barra de rolagem, o halo distante no topo do fundo.

### Neutral
- **Carvão** (`{colors.void}`): o chão de tudo. Fundo do documento e do único momento de silêncio da página.
- **Ferro Frio** (`{colors.iron}`): campo secundário, fundo de figura antes da foto carregar.
- **Ferro com Calor Residual** (`{colors.iron-2}`) e **Casca de Laminação** (`{colors.scale}`): superfícies levemente elevadas.
- **Osso** (`{colors.bone}`): texto principal, 17.4:1 sobre o carvão.
- **Cinza** (`{colors.ash}`): texto secundário, 6.6:1.
- **Cinza Apagado** (`{colors.ash-dim}`): registros estampados e legendas, 5.3:1 — calibrado para passar AA como texto normal, porque os registros são de 11px e não têm direito ao desconto de "texto grande".
- **Arestas** (`{colors.rule}`, `{colors.rule-soft}`, `{colors.rule-lit}`): brancos translúcidos que compõem a barra de ferro. Nunca usados como borda sozinha.

### Named Rules

**A Regra do Cobre Raro.** O acento ocupa menos de 5% de qualquer tela. Se dois objetos de cobre estão acesos ao mesmo tempo na mesma dobra, um deles está errado.

**A Regra do Repouso Frio.** Nenhum elemento nasce no pico de calor. `--ember-hot` é resposta a hover, foco ou proximidade do ponteiro; em repouso o objeto fica em `--ember` ou apagado. A única exceção permitida é a aresta da barra do herói, que abre a página acesa a 0.85 porque é ela que anuncia o mundo.

**A Regra do Dourado Proibido.** Âmbar em repouso vira dourado, e dourado é a estética que este mundo recusa. Fotografia com luz dourada de bar, garrafa ou lustre não entra no acervo.

## Typography

**Display:** Bodoni Moda (fallback Bodoni MT, Didot, Georgia, serif), eixo óptico automático (`opsz 6..96`)
**Corpo:** Manrope (fallback ui-sans-serif, system-ui)

**Character:** um didone de contraste altíssimo contra um sans neutro de olho grande. O par funciona porque não disputa: o serif carrega toda a voz e o sans desaparece dentro do parágrafo. Nada é intermediário — ou é enorme e serifado, ou é pequeno e sans.

### Hierarchy
- **Display** (400, `clamp(3.5rem, 12.5vw, 8rem)`, altura 0.88, tracking -0.035em): só o `h1` do herói. Quebrado à mão em três linhas, uma palavra por linha.
- **Headline** (400, `clamp(2.6rem, 7vw, 5.5rem)`, altura 0.92): abertura de seção — manifesto, reserva, ambiente.
- **Title** (400, `clamp(2.1rem, 5vw, 3.6rem)`): títulos de seção internos e nomes de corte.
- **Lead** (400, `clamp(1.05rem, 1.15vw, 1.25rem)`, altura 1.62, máx. 62ch): o parágrafo que sustenta um título.
- **Body** (400, 1rem, altura 1.6): texto corrido e campos.
- **Label / Registro** (600, 0.6875rem, tracking 0.2em, caixa alta, altura 1.7): o "estampado no ferro" — horário, cidade, unidade, seção, disclaimer.

### Named Rules

**A Regra do Registro Estampado.** Texto miúdo desta casa é sempre caixa alta, 600, com 0.2em de tracking e entrelinha 1.7. Com tracking largo e entrelinha 1, duas linhas encostam uma na outra.

**A Regra do Sem-Eyebrow.** Nenhum rótulo miúdo acima de um heading. Rótulo acima de título enfraquece o título; se a informação importa, ela vira o próprio título ou desce para o registro de função, embaixo.

**A Regra do Número Medido.** Todo número que é medida — peso, grau, dia, preço, hora, telefone — leva `.tnum` (`tabular-nums lining-nums`). Números de largura variável tremem quando o valor muda.

## Layout

Container de 1440px com goteira fluida `clamp(20px, 5vw, 64px)`; a barra da grelha respeita o container, a fotografia às vezes sangra. Ritmo vertical em dois níveis: `clamp(88px, 11vw, 180px)` para uma seção normal e `clamp(64px, 7vw, 112px)` para as seções que encostam uma na outra. A escala de espaço é fixa de 4px a 128px e nenhum valor solto existe fora de `tokens.css`.

A composição é assimétrica por padrão: o herói ancora o texto à esquerda com a luz do fogo à direita, o chef ocupa colunas 7–12 com a foto em 1–5, e a galeria coloca cada quadro por índice explícito em 12 colunas em vez de deixar o auto-placement decidir — auto-placement com spans deixa meias-fileiras mortas.

Pontos de virada observados: **560px** (CTAs deixam de ocupar a largura toda; a lavagem do herói clareia; o formulário vira duas colunas), **620px** (os números da casa viram 2×2; a foto do corte vai para o lado do texto), **720px** (a placa do herói vira três colunas) e **1024px** (grades editoriais completas, hover habilitado, bandas de corte em quatro colunas). Abaixo de 1024px o hover não existe e nenhum conteúdo depende dele.

### Named Rules

**A Regra das Doze Colunas de Verdade.** Numa grade de 12 colunas, `gap` é sempre declarado como `row-gap` e `column-gap` separados. `gap: 6vw` escrito para o empilhamento do celular vira onze goteiras de 90px no desktop, sobra 30px por coluna e `1 / span 5` deixa de significar cinco colunas — foi o que quebrava os títulos em escada. Goteira de coluna do sistema: `clamp(var(--s-5), 2.4vw, var(--s-7))`.

**A Regra da Recomposição.** Uma faixa de largura que só encolhe o layout de cima está errada. Cada ponto de virada recompõe: a banda de corte vira foto ao lado do texto entre 620 e 1023 porque empilhada em 3:2 na largura toda ela passa de 500px de altura e a seção vira um rolo.

## Elevation & Depth

Não existe sombra neste sistema. Nenhum `box-shadow` em nenhum componente. A profundidade vem de três lugares: a estratificação tonal do carvão ao ferro (#090909 → #11100E → #16140F → #1F1C17), a própria barra de ferro (que tem aresta acesa, corpo e sombra interna desenhados no gradiente, ou seja, é volume e não linha) e a fotografia, que é sempre a camada mais escura e mais profunda da tela.

Um único desfoque existe na página, no painel do formulário de reserva (`backdrop-filter: blur(20px)` sobre `rgba(9,9,9,0.62)`), e ele está lá por legibilidade dos campos sobre a foto, não por estilo.

### Named Rules

**A Regra da Barra Única.** Toda divisória do site sai de `--grate-h` (deitada) ou `--grate-v` (de pé), 3px, com aresta acesa, corpo e sombra. `1px solid` como separador é proibido em qualquer componente — foi exatamente o hábito que fez a seção de números parecer uma tabela.

**A Regra do Plano.** Superfícies não flutuam. Se um elemento precisa se destacar, ele escurece o vizinho ou ganha uma barra, nunca uma sombra.

## Shapes

Geometria reta. O raio máximo do sistema é 2px, aplicado a botões e campos apenas para o pixel não ficar serrilhado; o botão discreto e as figuras têm raio zero. Não há pílulas, não há cantos generosos, não há máscara decorativa.

A forma recorrente é a barra: 3px de altura (ou de largura, quando de pé), largura total do container, com origem de transformação no ponto quente — quando ela entra, irradia do calor para fora, não varre de uma ponta à outra. A foto entra pelo mesmo princípio: revelada por `clip-path: inset(100% 0 0 0)` que sobe, como calor.

Uma armadilha vale registro permanente: o elemento observado nunca pode ser o que se esconde. `clip-path: inset(100%)` e `scaleX(0)` zeram a própria área de interseção, e um `IntersectionObserver` sobre eles trava para sempre. O clip e a escala moram no filho; o reveal é feito por varredura de `getBoundingClientRect()` a cada rAF.

## Components

### Buttons
- **Forma:** retângulo de 2px de raio, altura mínima 48px (64px na versão grande), rótulo que nunca quebra (`white-space: nowrap`).
- **Sólido:** preenchimento chapado de cobre com texto carvão (5.3:1). Em repouso é liso de propósito — todo degradê testado colocava o texto escuro abaixo de 4.5:1 na metade superior. No hover e no foco o preenchimento vira um degradê que sobe de `--ember-hot` para `--ember`.
- **Contorno:** transparente com aresta `--rule-lit`; o calor sobe de baixo (`scaleY` a partir de 100%) e preenche.
- **Discreto:** sem caixa, apenas a aresta inferior; hover leva a cor ao âmbar e acende a aresta.
- **Desabilitado:** calor zerado, opacidade 0.45, sem preenchimento.
- **Seta:** anda 5px para a direita no hover e no foco.

### Inputs / Fields
- **Estilo:** fundo branco a 3.2%, borda `--rule` de 1px, raio 2px, altura mínima 48px. O rótulo é sans 600 em osso, e o "opcional" é um registro estampado.
- **Foco:** borda vira cobre, fundo ganha 6% de brasa, mais o anel de foco global de 2px em âmbar com 3px de deslocamento.
- **Erro:** `aria-invalid` + mensagem em `role="alert"` ligada por `aria-describedby`. Toda mensagem nomeia o problema **e** a saída ("Telefone incompleto. Inclua o DDD — ex.: (41) 99999-9999.").

### Navigation
- **Desktop:** sans de 0.8125rem em cinza, com uma barra de 1px em cobre que cresce da esquerda no hover e no foco. O cabeçalho começa transparente e ganha fundo translúcido com desfoque depois do herói, comandado por sentinela + observador.
- **Mobile:** gaveta em tela cheia com foco preso, `Escape`, trava de rolagem do corpo e os itens em escala de display; as divisórias entre itens são a barra da grelha.

### Grate (componente-assinatura)
A barra de ferro é o único divisor do sistema e o carregador de estado do mundo. Ela expõe duas variáveis: `--hot` (onde está o ponto quente, em porcentagem da largura) e `--heat` (0 a 1). A aresta acende num gradiente centrado em `--hot`, o halo irradia num radial no mesmo ponto, e a origem da transformação é o próprio ponto quente. Nas bandas de corte, o ponteiro move `--hot` e sobe `--heat` da linha sob o cursor — é o mesmo objeto respondendo à presença.

### Cut Band (componente-assinatura)
A banda editorial que substitui o card de produto. No desktop a lista **é** o palco: os nomes ocupam a metade esquerda em escala de display (`clamp(2.5rem, 3.4vw, 3.4rem)`) com o preço na mesma linha de base, e as quatro fotos ocupam o mesmo retângulo 4/5 à direita, empilhadas — só a da linha sob o ponteiro está em `opacity: 1`. Em repouso, sem ponteiro na lista, fica a do primeiro corte. Não há JavaScript nisso: quatro regras de CSS (`.cut:first-child`, `.cuts__list:hover .cut:first-child`, `.cut:hover`) dão conta.

Miniatura por linha é o que transforma a seção numa tabela de cardápio — quatro retângulos de 240px que ninguém consegue ler. No celular, onde não existe ponteiro, cada corte mostra a sua foto inteira embaixo do texto; entre 620 e 1023px ela vai para o lado, em 4/3.

## Do's and Don'ts

### Do:
- **Do** usar `--grate-h` / `--grate-v` para qualquer divisória, em qualquer componente novo.
- **Do** deixar todo objeto de cobre nascer frio e acender por hover, foco ou proximidade.
- **Do** carregar estado visual em custom property no próprio elemento (`--heat`, `--hot`, `--btn-heat`) em vez de classes de estado.
- **Do** aplicar `.tnum` em todo número que seja medida.
- **Do** separar `row-gap` de `column-gap` em qualquer grade de 12 colunas.
- **Do** colocar o clip ou a transformação de entrada no filho, nunca no elemento observado.
- **Do** manter a fotografia low key, quente, com fogo real e fundo escuro — e trocar tudo por `src` local em `src/data/images.ts` quando o acervo do cliente chegar.
- **Do** respeitar `prefers-reduced-motion`: as durações caem para 1ms e nada fica escondido.

### Don't:
- **Don't** usar `1px solid` como separador, nem `<hr>`.
- **Don't** criar card, moldura, caixa com borda em volta de conteúdo ou raio acima de 2px.
- **Don't** usar sombra — nenhuma, em nenhum estado.
- **Don't** pendurar rótulo miúdo acima de um heading.
- **Don't** deixar `--ember-hot` como estado de repouso de nada que ocupe área.
- **Don't** trazer luz dourada, garrafa, lustre de bar ou qualquer fotografia clara para o acervo.
- **Don't** escrever valor solto de cor, espaço, tipo ou tempo fora de `tokens.css`.
- **Don't** fazer nada deslizar lateralmente para entrar: o movimento deste mundo sobe, irradia ou esfria.
