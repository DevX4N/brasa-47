# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static output, Vite) — escolhido pelo usuário nesta sessão. Componentes `.astro` reutilizáveis, sem framework de UI. Build estático, sem backend.

## Users

Adultos com poder aquisitivo médio/alto em Curitiba e visitantes da cidade, decidindo **onde jantar numa noite que importa**: casais em ocasião especial, executivos em jantar de negócios, grupos de amigos marcando um encontro. A decisão acontece quase sempre à noite, no celular, com pouco tempo e várias abas abertas comparando restaurantes. O trabalho do visitante é: entender em segundos que tipo de casa é essa, acreditar que vale a noite (e o preço), e garantir a mesa.

## Product Purpose

Brasa 47 é uma steakhouse contemporânea em Curitiba especializada em fogo vivo, cortes premium, defumação e cozinha aberta. A landing page existe para converter interesse em **reserva**. Sucesso = o visitante entende a proposta, sente a atmosfera e completa uma reserva sem sair da página.

Projeto fictício, construído como peça de portfólio para uma agência de desenvolvimento web — a qualidade visual e de frontend é, ela própria, um requisito do produto.

## Positioning

O fogo não é método de cocção, é o eixo da casa: cozinha aberta à vista do salão, brasa a 900°C, defumação de 14 horas, maturação de 28 dias, 47 lugares apenas. O que um concorrente não copia honestamente: **a casa é pequena de propósito e o preparo é público** — o cliente acompanha o fogo trabalhando enquanto janta.

Sofisticado sem ser pretensioso. Urbano, contemporâneo, artesanal. Explicitamente **não** é churrascaria tradicional brasileira, rodízio ou buffet.

## Operating Context

- Funcionamento: terça a domingo, 18:30 — 00:00. Só jantar.
- Endereço: Alameda Brasa, 47 — Batel, Curitiba/PR. Telefone (41) 99999-4747.
- Capacidade: 47 lugares. A escassez é real e é parte da razão de reservar.
- Chef: Mateo Ferraz — passagens por Buenos Aires, São Paulo e Barcelona.
- Cortes e preços confirmados pelo brief: Ancho 350g (Angus, brasa aberta, manteiga defumada) R$ 129 · Prime Rib (Black Angus, maturação 28 dias) R$ 189 · Short Rib (12 horas de fogo lento, redução da casa) R$ 149 · Tomahawk (seleção especial, ~1kg) R$ 289.
- Números da casa: 14h de defumação · 900°C de brasa · 28 dias de maturação · 47 lugares.

## Capabilities and Constraints

- **Reserva na própria página**, via formulário (data, horário, número de pessoas, contato), com validação e estados reais no cliente. Sem backend: o envio é simulado e o estado de sucesso deve deixar isso explícito para quem for reaproveitar o projeto.
- Site de página única, estático, sem CMS e sem área logada.
- **Fotografia real curada (Unsplash), em URLs remotas trocáveis** — decisão do usuário. Devem ficar centralizadas num único ponto do código para substituição por fotos do cliente depois.
- Idioma: português do Brasil.
- Sem sistema de pedidos, delivery ou cardápio completo navegável — o "ver menu completo" é um destino que ainda não existe.

## Brand Commitments

- Nome: **BRASA 47** · assinatura **Steakhouse & Fire Kitchen**.
- Slogan principal: "Fogo. Carne. Experiência."
- Frases secundárias liberadas pelo brief: "O fogo não é apenas parte do processo. É parte da experiência." · "Cortes selecionados. Fogo vivo. Noites memoráveis." · "A cozinha começa onde o fogo encontra o tempo."
- Voz: confiante, curta, sensorial, elegante. Sem texto corporativo, sem emoji, sem exclamação.
- Navegação fixada pelo brief: Experiência · Menu · A Casa · Galeria · Contato. CTA: "Reservar mesa".
- Restrição visual vinculante declarada pelo usuário: mundo **escuro**, acento cor de **brasa/cobre** (nada de vermelho vivo), display **serifado editorial** contra sans moderna, muito espaço negativo.

## Evidence on Hand

Tudo é ficcional e assumido como tal: marca, chef, endereço, telefone, preços, depoimentos ("Marina & Rafael", "Felipe Andrade") e números da casa vêm do brief. **Nada disso pode ser apresentado como verificado**, e o entregável deve listar o que trocar por dados reais. Não existem fotos próprias — a fotografia é licenciada de terceiros e é substituível.

## Product Principles

1. **O fogo é o produto.** Toda seção deve responder a "por que fogo" — não a "por que restaurante".
2. **A reserva é o único desfecho.** Toda a narrativa converge para a mesa garantida; nenhuma seção pode competir com esse fim.
3. **Escassez honesta.** 47 lugares é fato, não tática; usar como razão, nunca como pressão.
4. **Menos texto, mais matéria.** Frase curta e imagem forte batem parágrafo explicativo.
5. **Ficção declarada.** Conteúdo inventado nunca se disfarça de prova real.

## Accessibility & Inclusion

Uso majoritariamente noturno e em celular. Requisitos: contraste AA sobre fundo escuro (inclusive texto secundário e sobre fotografia), navegação completa por teclado com foco visível, respeito a `prefers-reduced-motion`, e alvos de toque confortáveis para a reserva feita com uma mão.
