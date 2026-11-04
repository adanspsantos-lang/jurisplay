# JURISPLAY · Bíblia da Série

**O Direito em Série.** Este documento é a referência para escrever, produzir e gerar por IA todos os episódios.
Toda temporada nova segue estas regras para manter o mesmo padrão.

---

## 1. A proposta

Cada episódio explica **um artigo do Código Penal** por meio de um caso fictício, contado como drama policial e de tribunal.
O espectador deve sair do episódio sabendo: o que a lei diz, a pena, o que precisa acontecer para ser aquele crime e com o que não confundir.

O entretenimento serve ao ensino, nunca o contrário. Toda virada da história é também uma virada jurídica.

## 2. Mundo da série

- **Cidade:** Porto Aurora, cidade grande fictícia do Brasil. Nunca citar cidades, pessoas ou casos reais.
- **Época:** atual (2026). As leis seguem a redação em vigor, incluindo a Lei 15.397/2026.
- **Locais fixos:**
  - **3ª Delegacia de Polícia Civil (Centro):** sala da delegada Helena com persiana, quadro de cortiça com fotos e fios vermelhos, máquina de café que nunca funciona direito.
  - **Fórum de Porto Aurora:** salão de mármore, 2ª Vara Criminal da juíza Marta e o plenário do Tribunal do Júri.
  - **Café do Fórum:** balcão estreito em frente ao fórum, onde Iara e Otávio se encontram "sem querer".
  - **Instituto de Criminalística:** laboratório de luz branca da perita Lúcia Paz.
  - **Restaurante Sabor da Praça:** de Seu Alcides. Mesa 7 perto da porta, mesa 12 ao fundo.
  - **Clube Atlético Aurora:** salão de baile antigo, com bolero às quintas-feiras.

## 3. Padrão de cada episódio

Duração entre **20 e 30 minutos**, conforme a história. Estrutura fixa:

| Bloco | Tempo aproximado | O que acontece |
|---|---|---|
| **Anteriormente** | 30 a 40 s | A partir do episódio 2. A Voz do Código resume o que importa do arco da temporada. |
| **Abertura fria** | 2 a 3 min | O crime ou o momento de tensão, sem explicação. Termina num corte seco. |
| **Vinheta** | 15 s | Logo JURISPLAY e título do episódio com o número do artigo. |
| **Ato 1 · O fato** | 6 a 8 min | Delegacia. Helena repete o bordão "Fato primeiro. Artigo depois." Investigação e primeira hipótese de crime. |
| **Ato 2 · A virada** | 6 a 9 min | Uma descoberta muda o enquadramento jurídico. Avança o mistério da temporada (trama B). |
| **Ato 3 · O julgamento** | 5 a 7 min | Fórum ou audiência. Iara lê a lei, a defesa (Otávio, quando o réu não pode pagar advogado) apresenta a melhor tese possível, Marta decide e explica em uma frase. |
| **Gancho** | 1 a 2 min | Cena da trama da temporada que deixa uma pergunta para o próximo episódio. |
| **A Voz do Código** | 20 s | Tela preta, uma frase que fecha o caso e anuncia o próximo artigo. |
| **O Veredito narrado** | 1,5 a 2 min | Cards com o texto da lei, as penas e "não confundir", lidos pela Voz do Código. |

**Arquivos**
- Fonte de cada roteiro: `roteiros/fonte/t1eN-ART.txt` (é aqui que se edita).
- Depois de editar, rode `python3 roteiros/gerar.py`: ele atualiza a plataforma (`assets/js/roteiros-t1.js`) e os roteiros formatados em `roteiros/temporada-1/`.

**Regras de escrita**
1. A palavra técnica sempre vem acompanhada da explicação em linguagem simples, dentro do diálogo.
2. A defesa nunca é caricata: quem defende o réu, seja Otávio ou um advogado particular, sempre levanta a tese mais forte que a defesa teria.
3. Cada episódio tem ao menos um destes elementos: suspense, drama familiar ou romance.
4. Nada de violência gráfica. O crime é sugerido, cortado ou visto pelas consequências.
5. Nada de ensinar a cometer crime: venenos, golpes e armas aparecem sem detalhes de método.
6. Personagens menores de idade só aparecem em cenas neutras e nunca em situação romântica.
7. Toda pena citada deve bater com o card "O Veredito" do episódio.

## 4. Elenco fixo

### Delegada Helena Rocha
- **Função:** delegada titular da 3ª DP. Conduz as investigações.
- **Idade:** 47 anos.
- **Aparência:** mulher negra de pele retinta, 1,70 m, porte firme, rosto anguloso, olhos castanho-escuros atentos. Cabelo crespo curto, com fios grisalhos nas têmporas.
- **Figurino:** blazer de lã cinza-chumbo ou preto, camisa clara, calça de alfaiataria, botas baixas. Sempre usa o relógio de pulseira de couro gasta que foi do pai.
- **Personalidade:** fala pouco e pergunta muito. Humor seco. Paciente com vítimas, implacável com mentiras. Viúva, mãe de Pedro (19 anos, estudante de Engenharia). O pai foi investigador de polícia.
- **Bordão:** "Fato primeiro. Artigo depois."
- **Voz:** feminina grave, calma, pausada, sem sotaque marcado.
- **Prompt de imagem (EN):** `cinematic portrait of a 47-year-old Black Brazilian woman police chief, deep dark skin, short natural coily hair with gray at the temples, angular face, calm intense gaze, charcoal wool blazer over light shirt, old leather-strap wristwatch, police station office with blinds at night, warm amber and teal light, shallow depth of field, photorealistic, 35mm film look`

### Investigador Caíque Moura
- **Função:** investigador da 3ª DP. Câmeras, celulares, rastros digitais.
- **Idade:** 29 anos.
- **Aparência:** homem pardo, magro e atlético, 1,78 m, cabelo cacheado curto com degradê nas laterais, barba rala, sorriso fácil.
- **Figurino:** jaqueta jeans ou moletom escuro, camiseta lisa, tênis branco, distintivo no cinto, sempre com um tablet de capa laranja.
- **Personalidade:** curioso, rápido, piadista. Alívio cômico que vira coragem quando precisa. Apaixonado em silêncio pela perita Lúcia Paz.
- **Voz:** masculina jovem, ágil, animada.
- **Prompt de imagem (EN):** `photorealistic portrait of a 29-year-old mixed-race Brazilian male detective, slim athletic build, short curly hair with fade, light stubble, friendly grin, dark denim jacket, holding a tablet with an orange case, police badge on belt, neon-lit police station, cinematic lighting`

### Promotora Iara Bastos
- **Função:** promotora de Justiça. Acusa e lê a lei em voz alta.
- **Idade:** 38 anos.
- **Aparência:** mulher branca, 1,65 m, cabelo castanho-escuro longo preso em coque baixo, olhos verdes, óculos de armação fina dourada, postura ereta.
- **Figurino:** terninhos em tons de vinho, azul-marinho ou creme, blusa de seda, salto baixo, pasta de couro marrom.
- **Personalidade:** rigorosa, apaixonada pela lei, protetora das vítimas. Esconde um coração mole. Namorou Otávio na faculdade e nunca contou por que terminou. Toma café **sem açúcar**.
- **Voz:** feminina clara, articulada, firme, com leve doçura nas cenas íntimas.
- **Prompt de imagem (EN):** `photorealistic portrait of a 38-year-old white Brazilian female prosecutor, long dark brown hair in a low bun, green eyes, thin gold-rimmed glasses, burgundy tailored suit with silk blouse, standing in a marble courthouse hallway, soft window light, elegant and serious expression, cinematic`

### Defensor Público Otávio Lins
- **Função:** defensor público. Defende os réus com as teses mais fortes.
- **Idade:** 40 anos.
- **Aparência:** homem negro de pele clara, alto (1,88 m), cabeça raspada, barba aparada com fios brancos, olhar gentil e irônico.
- **Figurino:** terno cinza um pouco gasto, gravata frouxa, mochila de couro velha cheia de processos, caneca térmica.
- **Personalidade:** idealista, paciente, humor gentil. Acredita que toda pessoa merece defesa. Ainda apaixonado por Iara.
- **Bordão:** "Todo mundo merece uma defesa. Até quem a gente não gosta."
- **Voz:** masculina grave e calorosa, ritmo tranquilo.
- **Prompt de imagem (EN):** `photorealistic portrait of a 40-year-old light-skinned Black Brazilian male public defender, tall, shaved head, neatly trimmed beard with gray strands, kind ironic smile, slightly worn gray suit with loosened tie, old leather backpack full of case files, courthouse steps at golden hour, cinematic`

### Juíza Marta Siqueira
- **Função:** juíza da 2ª Vara Criminal e presidente do Tribunal do Júri.
- **Idade:** 58 anos.
- **Aparência:** mulher branca, cabelo branco curto em corte chanel, rosto sereno com rugas de expressão, olhos azul-acinzentados.
- **Figurino:** toga preta, colar de pérolas discreto, óculos de leitura pendurados em cordão.
- **Personalidade:** fala pouco e com precisão. Resume cada decisão em uma frase que o espectador leva para a prova.
- **Bordão:** "A lei não pergunta se o senhor é simpático."
- **Voz:** feminina madura, baixa, firme e lenta.
- **Prompt de imagem (EN):** `photorealistic portrait of a 58-year-old white Brazilian female judge, short white bob haircut, gray-blue eyes, black judicial robe, small pearl necklace, reading glasses on a cord, wooden courtroom bench, dramatic soft light, dignified expression`

### Dra. Lúcia Paz
- **Função:** perita criminal do Instituto de Criminalística.
- **Idade:** 34 anos.
- **Aparência:** mulher nipo-brasileira, 1,60 m, cabelo preto liso em rabo de cavalo alto, franja reta, olhar analítico.
- **Figurino:** jaleco branco, luvas azuis, óculos de proteção na cabeça, tênis de corrida coloridos.
- **Personalidade:** técnica, direta, humor ácido. Finge não perceber o interesse de Caíque.
- **Voz:** feminina média, rápida, precisa.
- **Prompt de imagem (EN):** `photorealistic portrait of a 34-year-old Japanese-Brazilian female forensic expert, straight black hair in high ponytail with blunt bangs, white lab coat, blue nitrile gloves, safety goggles on her head, bright forensic laboratory, analytical half-smile, cinematic`

### Seu Alcides
- **Função:** dono do Restaurante Sabor da Praça. Aparece em várias temporadas.
- **Idade:** 68 anos.
- **Aparência:** homem branco de família portuguesa, baixo e robusto, bigode branco farto, sobrancelhas grossas.
- **Figurino:** camisa xadrez de manga curta e avental azul-marinho com o nome do restaurante.
- **Personalidade:** conhece todo mundo pelo nome, guarda as imagens das câmeras, dança bolero às quintas.
- **Voz:** masculina rouca e simpática.
- **Prompt de imagem (EN):** `photorealistic portrait of a 68-year-old Brazilian man of Portuguese descent, short and stocky, thick white mustache, plaid short-sleeve shirt, navy apron, cozy traditional restaurant at night, warm light, friendly expression`

### A Voz do Código
- **Função:** narradora em off. Fecha cada episódio.
- **Voz:** feminina madura, aveludada, grave, ritmo de documentário, sem sotaque.
- **Visual:** sem rosto. Tela preta com o texto do artigo em laranja (#FF6B1A), letra condensada.

## 5. Identidade visual dos vídeos

- **Paleta:** fundo escuro, tons âmbar e cobre nas cenas internas, azul frio nas cenas noturnas de rua. Laranja da marca só em detalhes.
- **Câmera:** cinema realista, lentes 35 mm e 50 mm, profundidade de campo rasa, sem câmera tremida exagerada.
- **Vinheta:** triângulo laranja da JURISPLAY desenhando o "play", seguido do número do artigo em tipografia condensada.
- **Cards do Veredito:** fundo preto, artigo em laranja, penas em branco.

---

## 6. Temporada 1 · Dos Crimes contra a Pessoa

### Arco da temporada: "Quem envenenou Seu Jairo?"

No episódio 1, o comerciante Jairo Mendes morre envenenado. O sobrinho Vinícius, endividado e único herdeiro, é preso.
Ao longo da temporada, a delegada Helena descobre que o veneno estava no açucareiro, que Jairo vivia um romance secreto
com Marisa Vilela, uma dançarina de bolero, e que um testamento novo deixava a casa para ela.
No episódio 8, uma busca na casa de Marisa, cumprida às 5h da manhã em ponto, revela a verdade, e Vinícius é solto.

**Tramas paralelas**
- **Iara e Otávio:** colegas de faculdade, ex-namorados, adversários no tribunal. Ele assume a defesa de Vinícius e ela a acusação.
  Beijam-se no episódio 6. No episódio 7, Iara se declara suspeita por motivo de foro íntimo e deixa o caso.
  No episódio 8, marcam um jantar no Sabor da Praça na sexta-feira, a mesma noite em que começa a Temporada 2.
- **Caíque e Lúcia:** flerte cômico e lento. Ela aceita um café no episódio 8.
- **Helena e o filho Pedro:** no episódio 3, Helena recebe uma ameaça que cita o filho.

**Motivo do açúcar:** Iara toma café sem açúcar; Otávio sempre lembra disso. O veneno estava no açúcar. É o fio simbólico da temporada.

### Episódios

| Ep. | Artigo | Crime | Título | Duração |
|---|---|---|---|---|
| 1 | 121 | Homicídio Qualificado | O Café da Herança | 22 min |
| 2 | 129 | Lesão Corporal | Fechada no Cruzamento | 20 min |
| 3 | 147 | Ameaça | Mensagem das 3 da Manhã | 21 min |
| 4 | 135 | Omissão de Socorro | Ninguém Parou | 21 min |
| 5 | 138 | Calúnia | O Áudio do Grupo | 21 min |
| 6 | 140 | Injúria | Mesa 12 | 20 min |
| 7 | 148 | Sequestro e Cárcere Privado | O Quarto dos Fundos | 21 min |
| 8 | 150 | Violação de Domicílio | A Chave Reserva | 21 min |

As durações são estimadas pela regra do roteiro (uma página padrão por minuto, narração a 140 palavras por minuto).
Na montagem, planos de ambientação, trilha e pausas costumam acrescentar de 1 a 3 minutos por episódio.

### Personagens do arco da temporada

#### Jairo Mendes (vítima · ep. 1, em flashbacks nos eps. 5 e 6)
- **Idade:** 74 anos. Comerciante aposentado, dono de três imóveis, viúvo há dez anos.
- **Aparência:** homem pardo, magro, bigode grisalho bem aparado, sorriso tímido, mãos de quem trabalhou a vida inteira.
- **Figurino:** camisa social de manga curta clara, calça de tergal, chapéu panamá, sapato engraxado.
- **Personalidade:** reservado, apaixonado por bolero. Depois de anos sozinho, voltou a se apaixonar e escondeu isso de todos.
- **Voz:** masculina idosa, suave.
- **Prompt (EN):** `photorealistic 74-year-old brown-skinned Brazilian man, thin, neat gray mustache, shy smile, short-sleeve light dress shirt, panama hat, sitting at a simple kitchen table with a blue sugar pot, early morning light`

#### Vinícius Mendes (sobrinho · eps. 1, 2, 3, 5, 8)
- **Idade:** 39 anos. Músico que abriu um bar, faliu e deve R$ 300 mil.
- **Aparência:** homem branco, 1,80 m, magro, cabelo castanho desgrenhado, olheiras fundas, barba de três dias.
- **Figurino:** camiseta de banda desbotada, jaqueta de couro velha, tênis surrado. Na prisão, uniforme bege.
- **Personalidade:** impulsivo, irônico quando tem medo, amava o tio do jeito torto dele. Suspeito perfeito.
- **Voz:** masculina rouca, cansada.
- **Prompt (EN):** `photorealistic 39-year-old white Brazilian man, messy brown hair, dark circles under eyes, three-day stubble, faded band t-shirt and worn leather jacket, anxious expression, interrogation room, cold fluorescent light`

#### Marisa Vilela (a culpada · eps. 1, 4, 6, 7, 8)
- **Idade:** 58 anos. Professora de dança de salão no Clube Atlético Aurora.
- **Aparência:** mulher branca, elegante, 1,68 m, cabelo ruivo acobreado escovado na altura dos ombros, batom vermelho, olhos castanho-claros, postura de bailarina.
- **Figurino:** vestidos midi de cores fortes, sempre um **lenço de seda estampado** no pescoço (a pista das câmeras), perfume marcante, sapato de dança.
- **Personalidade:** encantadora, segura, generosa em público. Calculista em particular. Nunca levanta a voz.
- **Voz:** feminina média, melodiosa, sorriso na fala.
- **Prompt (EN):** `photorealistic 58-year-old elegant white Brazilian woman, copper-red shoulder-length blow-dried hair, red lipstick, printed silk scarf around her neck, emerald midi dress, dancer's posture, vintage ballroom with warm lights, charming but mysterious smile, cinematic`

#### Dona Zuleica (vizinha de Jairo · eps. 1 e 5)
- **Idade:** 71 anos. Sabe tudo da rua.
- **Aparência:** mulher parda, baixinha, cabelo curto pintado de acaju, óculos grandes, bobes no cabelo de manhã.
- **Figurino:** roupão florido ou vestido de algodão, chinelo, sempre regando plantas.
- **Voz:** feminina idosa, aguda, falante.
- **Prompt (EN):** `photorealistic 71-year-old petite brown-skinned Brazilian woman, short auburn-dyed hair with rollers, big glasses, floral housecoat, watering plants by a garden gate, curious expression, morning light`

#### Pedro Rocha (filho de Helena · eps. 3 e 8)
- **Idade:** 19 anos. Estudante de Engenharia.
- **Aparência:** rapaz negro, alto e magro, cabelo black power curto, óculos redondos.
- **Figurino:** moletom da universidade, mochila, fones de ouvido.
- **Voz:** masculina jovem, tranquila.
- **Prompt (EN):** `photorealistic 19-year-old Black Brazilian young man, tall and slim, short afro, round glasses, university hoodie, backpack, headphones around neck, apartment kitchen at night`
