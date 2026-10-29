# JURISPLAY · O Direito em Série

Plataforma de streaming com séries sobre o Código Penal Brasileiro. Cada episódio conta um caso fictício
e termina com o veredito: o artigo, a pena e por que aquele foi o crime certo.

Site estático (HTML, CSS e JavaScript puro), publicado na Vercel a cada `git push` na branch `main`.

## Estrutura

```
index.html              página única da plataforma
assets/css/styles.css   visual (cores, layout, responsivo)
assets/js/data.js       TODO o conteúdo: temporadas, episódios, roteiros, vereditos, quizzes, planos
assets/js/app.js        navegação, carrosséis, modal, player, busca, perfil, configurações
assets/img/             hero, capas das temporadas e miniaturas dos episódios
videos/                 (opcional) vídeos de teste
```

## Como publicar o vídeo de um episódio

1. Hospede o arquivo do episódio (MP4 ou HLS `.m3u8`). Para vídeos de 18 minutos, prefira um serviço de vídeo
   (Cloudflare Stream, Bunny Stream, Vimeo) em vez do próprio repositório.
2. Abra `assets/js/data.js`, encontre o episódio pelo `id` (o número do artigo, ex.: `'155'`).
3. Preencha o campo `video` com a URL. Exemplo:

```js
E({ id: '155', s: 2, n: 1, crime: 'Furto', title: 'O Celular da Mesa 7', video: 'https://.../furto-t2e1.mp4', ...
```

4. (Opcional) legendas: coloque a URL de um arquivo `.vtt` no campo `subs`.
5. Faça commit e push. A Vercel publica sozinha em cerca de 1 minuto.

O player já tem: play/pausa, voltar/avançar 10 s, volume, velocidade, legendas, tela cheia, lista de episódios,
próximo episódio automático e retomada de onde o espectador parou. Atalhos: espaço, ←, →, F, M, C, N, Esc.

## Como trocar imagens

Substitua os arquivos em `assets/img/` mantendo o mesmo nome (ex.: `assets/img/episodios/155.jpg`),
ou aponte o campo `img` do episódio para outro arquivo. Miniaturas: proporção 2,3:1 (ex.: 960×416).

## O que funciona hoje

- Início com hero em carrossel, trilhos de temporadas, destaques, "Em alta", "Continue assistindo", trilho por temporada
- Página de cada temporada, catálogo com filtros e ordenação, busca por crime, artigo, título ou personagem
- Modal do episódio: visão geral, roteiro, veredito, "Você é o juiz" e lista de episódios
- Minha Lista, avaliações, avisos de estreia, notificações, perfil com estatísticas e conquistas, configurações
- Planos e login em modo de pré-lançamento (os dados ficam no navegador do visitante; não há cobrança nem servidor)

## Próximos passos técnicos para o lançamento

- Autenticação real e pagamentos (ex.: Supabase Auth + Stripe ou Mercado Pago)
- Hospedagem de vídeo com proteção de acesso para assinantes
- Revisão jurídica final de roteiros e penas por um advogado criminalista

Casos e personagens fictícios. Conteúdo educativo; não substitui orientação jurídica. Penas conferidas em outubro de 2026.
