/* ============================================================
   receitas-db.js — Banco de receitas com inteligência por condição

   Cada receita pode ter:
   - recomendado: condições para as quais esta receita é INDICADA
   - alertas: avisos específicos por condição dentro da receita
   - adaptacoes: como adaptar os ingredientes por condição

   Condições suportadas:
   esteatose | diabetes | hipertensao | colesterol | gastrite
   lactose   | celiaca  | anemia
============================================================ */

const ICONES_CONDICAO = {
  esteatose:   "🫀",
  diabetes:    "🩸",
  hipertensao: "💓",
  colesterol:  "🫁",
  gastrite:    "🫃",
  lactose:     "🥛",
  celiaca:     "🌾",
  anemia:      "💊",
};

const RECEITAS_DB = {

  /* ============================================================
     CAFÉ DA MANHÃ
  ============================================================ */

  "Aveia em flocos": {
    tempo: "5 min", porcao: "4 col. sopa (40g)",
    ingredientes: ["40g de aveia em flocos", "200ml leite desnatado ou bebida vegetal", "1 col. chá de mel ou canela"],
    preparo: [
      "Misture a aveia e o leite em panela pequena.",
      "Leve ao fogo médio mexendo sempre por 3-4 min até engrossar.",
      "Adicione canela ou mel e sirva com frutas.",
    ],
    dica: "A beta-glucana da aveia reduz o colesterol e melhora a saciedade — uma das melhores escolhas para o café da manhã.",
    recomendado: ["esteatose", "diabetes", "colesterol", "hipertensao", "anemia"],
    alertas: {
      diabetes: "Use mel com moderação ou omita. A aveia em si tem baixo índice glicêmico — ótima escolha.",
      celiaca: "Use aveia certificada sem glúten. A aveia comum pode estar contaminada com trigo.",
      lactose: "Substitua o leite por bebida vegetal de aveia, amêndoa ou coco.",
    },
    adaptacoes: {
      diabetes: "Troque o mel por canela ou adoçante culinário sem calorias.",
      lactose: "Use bebida de aveia ou amêndoa sem açúcar no lugar do leite.",
      celiaca: "Certifique-se que a embalagem diz 'sem glúten' ou 'gluten free'.",
    },
  },

  "Overnight oats": {
    tempo: "5 min (+ 8h geladeira)", porcao: "1 pote",
    ingredientes: ["4 col. sopa aveia em flocos", "150ml iogurte natural sem açúcar", "1 fruta picada", "1 col. chá mel", "Canela"],
    preparo: [
      "Misture a aveia e o iogurte no pote.",
      "Adicione mel e canela — mexa bem.",
      "Cubra e leve à geladeira de um dia para o outro.",
      "Na manhã seguinte, adicione a fruta fresca e sirva gelado.",
    ],
    dica: "Prepare na noite anterior para um café da manhã prático e nutritivo. Dura até 3 dias na geladeira.",
    recomendado: ["colesterol", "hipertensao", "anemia"],
    alertas: {
      diabetes: "Troque o mel por canela. Escolha frutas de baixo índice glicêmico: morango, kiwi ou maçã.",
      lactose: "Use iogurte sem lactose ou iogurte vegetal de coco/amêndoa.",
      celiaca: "Use aveia certificada sem glúten.",
    },
    adaptacoes: {
      diabetes: "Prefira frutas vermelhas (morango, mirtilo) que têm baixo índice glicêmico.",
      lactose: "Iogurte de coco sem açúcar é a melhor opção — cremoso e saboroso.",
    },
  },

  "Panqueca de aveia": {
    tempo: "12 min", porcao: "3 unidades",
    ingredientes: ["2 ovos", "3 col. sopa aveia em flocos", "1 banana madura amassada", "Canela", "Azeite para untar"],
    preparo: [
      "Amasse a banana bem e misture com os ovos batidos.",
      "Adicione a aveia e a canela — mexa até homogeneizar.",
      "Aqueça frigideira untada com azeite em fogo baixo.",
      "Despeje porções pequenas e cozinhe 2 min de cada lado.",
    ],
    dica: "Quanto mais madura a banana, mais doce fica a panqueca sem precisar de açúcar. Ótima para crianças também.",
    recomendado: ["colesterol", "anemia"],
    alertas: {
      diabetes: "Banana madura tem índice glicêmico alto. Use banana verde ou reduza para meia unidade.",
      celiaca: "Use aveia certificada sem glúten.",
    },
    adaptacoes: {
      diabetes: "Substitua a banana por 2 col. sopa de abobrinha ralada + 1 col. chá de canela. Fica neutro e delicioso.",
    },
  },

  "Vitamina de banana com aveia": {
    tempo: "5 min", porcao: "1 copo (300ml)",
    ingredientes: ["1 banana prata", "200ml leite desnatado", "2 col. sopa aveia", "Canela"],
    preparo: [
      "Bata todos os ingredientes no liquidificador.",
      "Ajuste a consistência com mais leite se necessário.",
      "Sirva gelado com canela polvilhada por cima.",
    ],
    dica: "Adicione 1 col. sopa de pasta de amendoim para aumentar proteína e saciedade por mais tempo.",
    recomendado: ["anemia", "colesterol"],
    alertas: {
      diabetes: "Banana madura eleva a glicemia. Troque por morango ou goiaba para menor impacto.",
      lactose: "Use leite sem lactose ou bebida vegetal.",
    },
    adaptacoes: {
      diabetes: "Substitua a banana por 1 xícara de morangos e acrescente 1 col. sopa de pasta de amendoim sem açúcar.",
      lactose: "Use bebida vegetal de aveia ou amêndoa sem açúcar.",
    },
  },

  "Ovo cozido": {
    tempo: "12 min", porcao: "1 unidade",
    ingredientes: ["1 ovo", "Água", "Sal opcional"],
    preparo: [
      "Coloque o ovo em água fria.",
      "Leve ao fogo — conte 10 min após ferver para gema firme.",
      "Para gema molinha, retire após 7 min.",
      "Coloque em água gelada por 5 min para descascar fácil.",
    ],
    dica: "Ovos mais velhos descascam mais fácil. A clara é quase 100% proteína com pouquíssima gordura.",
    recomendado: ["anemia", "diabetes"],
    alertas: {
      colesterol: "O ovo tem colesterol na gema, mas estudos mostram que 1 ovo/dia é seguro para a maioria. Converse com seu médico.",
    },
    adaptacoes: {
      colesterol: "Prefira 1 ovo inteiro + 1 clara extra, que tem zero colesterol.",
    },
  },

  "Ovo mexido": {
    tempo: "5 min", porcao: "2 ovos",
    ingredientes: ["2 ovos", "Sal", "Azeite ou manteiga light", "Cheiro-verde opcional"],
    preparo: [
      "Bata os ovos com sal.",
      "Aqueça frigideira em fogo baixo com azeite.",
      "Adicione os ovos e mexa devagar com espátula.",
      "Retire antes de secar — terminam de cozinhar com o calor residual.",
    ],
    dica: "Fogo baixo é o segredo do ovo mexido cremoso. Finalize com cheiro-verde para mais nutrientes.",
    recomendado: ["diabetes", "anemia"],
    alertas: {
      hipertensao: "Evite sal em excesso. Use ervas finas, cheiro-verde e limão para dar sabor.",
      colesterol: "Use apenas 1 gema e 2 claras para reduzir o colesterol da receita.",
    },
    adaptacoes: {
      hipertensao: "Elimine o sal — tempere com cheiro-verde, cúrcuma e pimenta-do-reino.",
      colesterol: "Faça com 1 ovo inteiro + 1 clara. O resultado é igualmente saboroso.",
    },
  },

  "Omelete simples": {
    tempo: "8 min", porcao: "1 omelete",
    ingredientes: ["2 ovos", "Sal e pimenta", "Azeite", "Queijo branco ou cottage opcional"],
    preparo: [
      "Bata os ovos com sal e pimenta.",
      "Aqueça frigideira com azeite em fogo médio.",
      "Despeje os ovos e não mexa — deixe firmar nas bordas.",
      "Adicione recheio no centro e dobre ao meio.",
    ],
    dica: "Adicione espinafre ou couve refogados para aumentar ferro, vitaminas e turbinar o valor nutricional.",
    recomendado: ["diabetes", "anemia", "esteatose"],
    alertas: {
      hipertensao: "Reduza o sal ao mínimo. Tempere com ervas como manjericão e orégano.",
      gastrite: "Evite pimenta e excesso de temperos fortes. Use só sal e ervas suaves.",
      colesterol: "Use 1 ovo inteiro + 1 clara para reduzir o colesterol sem perder proteína.",
    },
    adaptacoes: {
      hipertensao: "Recheie com espinafre (rico em potássio) e queijo branco com baixo teor de sódio.",
      gastrite: "Recheie apenas com abobrinha e queijo cottage — ingredientes suaves para o estômago.",
      lactose: "Omita o queijo ou use versão sem lactose.",
    },
  },

  "Ovo pochê": {
    tempo: "10 min", porcao: "1 unidade",
    ingredientes: ["1 ovo fresco", "500ml água", "1 col. sopa vinagre branco", "Sal"],
    preparo: [
      "Ferva a água com o vinagre em panela pequena.",
      "Quebre o ovo em xícara separada.",
      "Faça um redemoinho na água com colher.",
      "Deslize o ovo no centro e cozinhe 3-4 min.",
    ],
    dica: "Use sempre ovos frescos para o pochê perfeito. O vinagre ajuda a clara a firmar rapidamente.",
    recomendado: ["diabetes", "anemia", "esteatose"],
    alertas: {
      gastrite: "O vinagre é ácido — pode irritar o estômago. Omita o vinagre e use só água quente.",
    },
    adaptacoes: {
      gastrite: "Prepare sem vinagre. A clara vai se dispersar um pouco mas o resultado é igualmente saboroso.",
    },
  },

  "Clara de ovo mexida": {
    tempo: "5 min", porcao: "3 claras",
    ingredientes: ["3 claras de ovo", "Sal e pimenta", "Azeite", "Cúrcuma para colorir (opcional)"],
    preparo: [
      "Bata as claras com sal e cúrcuma.",
      "Aqueça frigideira com fio de azeite em fogo baixo.",
      "Despeje e mexa delicadamente.",
      "Retire quando ainda úmidas — não deixe ressecar.",
    ],
    dica: "Claras puras têm quase zero gordura e 11g de proteína. Ideal para quem quer emagrecer ou controlar colesterol.",
    recomendado: ["colesterol", "esteatose", "diabetes", "hipertensao"],
    alertas: {},
    adaptacoes: {
      hipertensao: "Elimine o sal. A cúrcuma dá sabor e tem ação anti-inflamatória.",
    },
  },

  "Crepioca (ovo + tapioca)": {
    tempo: "8 min", porcao: "1 unidade",
    ingredientes: ["1 ovo inteiro", "2 col. sopa tapioca hidratada", "Sal", "Recheio: frango ou queijo branco"],
    preparo: [
      "Bata o ovo e misture com a tapioca.",
      "Despeje em frigideira antiaderente em fogo médio.",
      "Cozinhe 3 min de cada lado até dourar.",
      "Recheie e dobre ao meio.",
    ],
    dica: "A crepioca tem mais proteína que a tapioca comum — o ovo torna tudo mais completo nutricionalmente.",
    recomendado: ["anemia"],
    alertas: {
      diabetes: "Tapioca tem alto índice glicêmico. O ovo ajuda a reduzir o impacto — consuma com proteína sempre.",
      celiaca: "A tapioca (goma de mandioca) é naturalmente livre de glúten — boa opção para celíacos.",
      gastrite: "Evite recheios ácidos (tomate) ou muito condimentados.",
    },
    adaptacoes: {
      diabetes: "Recheie sempre com proteína (frango, atum, ovos) para reduzir o pico glicêmico da tapioca.",
    },
  },

  "Tapioca": {
    tempo: "5 min", porcao: "1 unidade (80g)",
    ingredientes: ["4 col. sopa tapioca hidratada", "Recheio: queijo branco, frango, atum ou banana"],
    preparo: [
      "Espalhe a tapioca em frigideira antiaderente fria.",
      "Leve ao fogo médio sem mexer.",
      "Quando as bordas firmarem (~2 min), adicione o recheio.",
      "Dobre ao meio e sirva.",
    ],
    dica: "Não precisa de óleo — a frigideira deve estar seca. Tapioca pura é livre de glúten.",
    recomendado: ["celiaca"],
    alertas: {
      diabetes: "Alto índice glicêmico. Sempre recheie com proteína (frango, atum, ovo) para reduzir o impacto glicêmico.",
      hipertensao: "Evite recheios com muito sódio (queijo processado, presunto). Use queijo branco e ervas.",
    },
    adaptacoes: {
      diabetes: "Recheie obrigatoriamente com proteína — frango desfiado com azeite é a melhor opção.",
      hipertensao: "Use queijo branco com pouco sódio ou ricota temperada com ervas.",
    },
  },

  "Cuscuz de milho": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["Farinha de milho para cuscuz (flocão)", "Água morna com sal"],
    preparo: [
      "Molhe o flocão com água morna salgada aos poucos.",
      "Mexa até incorporar sem encharcar.",
      "Coloque na cuscuzeira e leve ao vapor por 8 min.",
      "Desenforme e sirva com ovo, queijo ou frango.",
    ],
    dica: "Para um cuscuz mais nutritivo, adicione 1 col. sopa de azeite e sirva com proteína.",
    recomendado: ["celiaca"],
    alertas: {
      diabetes: "Carboidrato de índice glicêmico moderado. Consuma em porção controlada com proteína.",
      hipertensao: "Reduza o sal ao mínimo. Tempere com ervas e azeite.",
    },
    adaptacoes: {
      hipertensao: "Use água sem sal para hidratar e tempere com cheiro-verde fresco.",
    },
  },

  "Pão integral": {
    tempo: "2 min", porcao: "2 fatias (50g)",
    ingredientes: ["2 fatias pão integral", "Recheio: queijo branco, peito de peru, ricota ou abacate"],
    preparo: [
      "Torre no torradeiro ou frigideira seca por 2-3 min.",
      "Passe o recheio escolhido.",
      "Sirva imediatamente.",
    ],
    dica: "Escolha pães com farinha integral no PRIMEIRO item da lista de ingredientes — garante que é de verdade.",
    recomendado: ["colesterol", "anemia"],
    alertas: {
      diabetes: "Mesmo integral, o pão tem carboidrato. Limite a 1-2 fatias e sempre combine com proteína.",
      celiaca: "Pão de trigo CONTÉM glúten — use pão sem glúten (arroz, milho ou tapioca).",
      hipertensao: "Evite recheios com muito sódio como queijo prato ou presunto.",
    },
    adaptacoes: {
      celiaca: "Substitua por pão de arroz, de milho ou tapioca — igualmente práticos.",
      diabetes: "Recheie com ovo + ricota para adicionar proteína e reduzir o impacto glicêmico.",
    },
  },

  "Iogurte grego natural": {
    tempo: "0 min", porcao: "1 pote (170g)",
    ingredientes: ["1 pote iogurte grego sem açúcar", "Frutas frescas", "Granola sem açúcar opcional"],
    preparo: [
      "Sirva o iogurte gelado em bowl.",
      "Adicione frutas frescas picadas por cima.",
      "Polvilhe granola antes de servir para manter a crocância.",
    ],
    dica: "Escolha versões sem açúcar adicionado. Iogurte grego tem quase o dobro de proteína do iogurte comum.",
    recomendado: ["diabetes", "colesterol", "anemia", "esteatose"],
    alertas: {
      lactose: "Use iogurte grego sem lactose ou iogurte de coco — mesma cremosidade.",
      diabetes: "Evite adicionar mel ou granola com açúcar. Frutas vermelhas têm baixo índice glicêmico.",
    },
    adaptacoes: {
      lactose: "Iogurte de coco natural sem açúcar é excelente substituto — cremoso e saboroso.",
      diabetes: "Use morangos, mirtilo ou kiwi que têm baixo impacto glicêmico.",
    },
  },

  "Pasta de amendoim": {
    tempo: "0 min", porcao: "1 col. sopa (15g)",
    ingredientes: ["Pasta de amendoim 100% amendoim"],
    preparo: [
      "Verifique que o único ingrediente seja amendoim.",
      "Use com torrada integral, tapioca ou fruta.",
      "Refrigere após aberto.",
      "Mexa bem antes de usar — o óleo separa naturalmente.",
    ],
    dica: "Evite versões com açúcar, óleo de palma ou sal adicionado. A pasta natural dura 3 meses na geladeira.",
    recomendado: ["diabetes", "colesterol"],
    alertas: {
      colesterol: "Pasta de amendoim pura tem gordura monoinsaturada — a 'gordura boa'. Mas limite a 1-2 col. sopa.",
      hipertensao: "Use versão sem sal adicionado — muitas marcas adicionam muito sódio.",
    },
    adaptacoes: {
      hipertensao: "Prefira a versão natural sem sal. Adicione canela para dar sabor.",
    },
  },

  "Peito de peru": {
    tempo: "0 min", porcao: "2 fatias (30g)",
    ingredientes: ["Peito de peru fatiado sem fumaça líquida"],
    preparo: [
      "Verifique no rótulo: menos de 600mg sódio/100g.",
      "Use como proteína rápida no café da manhã.",
      "Combine com pão integral e queijo branco.",
    ],
    dica: "Prefira versões com poucos ingredientes na embalagem — quanto mais simples, melhor.",
    recomendado: ["diabetes", "esteatose"],
    alertas: {
      hipertensao: "Embutidos têm muito sódio mesmo nas versões 'light'. Limite a 2 fatias ao dia.",
      colesterol: "Escolha versões sem pele e sem adição de gordura.",
    },
    adaptacoes: {
      hipertensao: "Prefira frango desfiado temperado com ervas como substituto mais saudável.",
    },
  },

  /* ============================================================
     PROTEÍNAS PRINCIPAIS
  ============================================================ */

  "Peito de frango grelhado": {
    tempo: "15 min", porcao: "150g",
    ingredientes: ["150g peito de frango", "Alho amassado", "Suco de 1/2 limão", "Azeite", "Sal e pimenta"],
    preparo: [
      "Tempere o frango com alho, limão, sal e pimenta. Marine 10 min.",
      "Aqueça frigideira antiaderente em fogo médio-alto com azeite.",
      "Grelhe 6-7 min de cada lado até dourar.",
      "Deixe descansar 2 min antes de fatiar.",
    ],
    dica: "Cobrir a frigideira nos primeiros 3 min mantém o frango mais suculento.",
    recomendado: ["esteatose", "diabetes", "colesterol", "hipertensao", "anemia"],
    alertas: {
      gastrite: "Evite pimenta e limão em excesso. Use ervas suaves como alecrim e tomilho.",
      hipertensao: "Reduza o sal — use ervas, alho e limão como temperos principais.",
    },
    adaptacoes: {
      gastrite: "Tempere apenas com alho, sal e ervas — sem limão e sem pimenta.",
      hipertensao: "Substitua o sal por ervas frescas: salsinha, cebolinha, alecrim. O sabor fica ainda melhor.",
    },
  },

  "Frango ao forno com legumes": {
    tempo: "40 min", porcao: "200g",
    ingredientes: ["200g frango (coxa ou peito)", "Abobrinha, cenoura e cebola", "Azeite, alho e ervas"],
    preparo: [
      "Pré-aqueça o forno a 200°C.",
      "Tempere o frango e os legumes com azeite, alho e ervas.",
      "Coloque em assadeira e distribua os legumes ao redor.",
      "Asse 35-40 min virando o frango uma vez na metade.",
    ],
    dica: "Cubra com papel alumínio nos primeiros 20 min para não ressecar. Retire para dourar no final.",
    recomendado: ["esteatose", "diabetes", "colesterol", "hipertensao", "anemia"],
    alertas: {
      gastrite: "Evite pimenta e alho em excesso. Use ervas suaves.",
    },
    adaptacoes: {
      gastrite: "Use abobrinha e cenoura que são suaves. Evite pimentão e cebola crua.",
      hipertensao: "Tempere com ervas secas (alecrim, tomilho) e limão em vez de sal.",
    },
  },

  "Peito de frango desfiado": {
    tempo: "25 min", porcao: "100g",
    ingredientes: ["150g peito de frango cru", "Sal, alho e louro", "Água para cozinhar"],
    preparo: [
      "Cozinhe o frango em água com sal, alho e louro por 20 min.",
      "Retire e espere amornar 5 min.",
      "Desfie com dois garfos no sentido das fibras.",
      "Tempere com azeite e cheiro-verde ou use como recheio.",
    ],
    dica: "Prepare em quantidade e guarde na geladeira por 3 dias — base versátil para refeições rápidas.",
    recomendado: ["esteatose", "diabetes", "colesterol", "hipertensao"],
    alertas: {},
    adaptacoes: {
      gastrite: "Cozinhe sem louro e com menos alho para ficar mais suave.",
    },
  },

  "Coxa de frango (s/ pele)": {
    tempo: "35 min", porcao: "1 unidade",
    ingredientes: ["1 coxa de frango sem pele", "Alho, sal, limão e ervas", "Azeite"],
    preparo: [
      "Retire toda a pele da coxa.",
      "Tempere com alho, limão, sal e ervas. Marine 15 min.",
      "Pré-aqueça forno a 200°C.",
      "Asse por 30-35 min até dourar e o osso soltar.",
    ],
    dica: "A coxa sem pele tem praticamente a mesma proteína do peito e fica mais suculenta assada.",
    recomendado: ["diabetes", "anemia"],
    alertas: {
      colesterol: "Retire sempre a pele — ela concentra a gordura saturada.",
      hipertensao: "Use limão e ervas como tempero principal, reduzindo o sal.",
    },
    adaptacoes: {
      colesterol: "Retire a pele antes de cozinhar, não depois — menos gordura penetra na carne.",
    },
  },

  "Filé de tilápia": {
    tempo: "12 min", porcao: "150g",
    ingredientes: ["150g filé de tilápia", "Limão", "Azeite", "Sal, alho e cheiro-verde"],
    preparo: [
      "Tempere o peixe com sal, alho e limão. Marine 5 min.",
      "Aqueça frigideira com azeite em fogo médio.",
      "Grelhe 4-5 min de cada lado até ficar opaco.",
      "Finalize com cheiro-verde picado.",
    ],
    dica: "O peixe está pronto quando a carne se separa facilmente com um garfo — não vire mais de uma vez.",
    recomendado: ["esteatose", "diabetes", "colesterol", "hipertensao", "anemia"],
    alertas: {
      gastrite: "Use limão com moderação — pode irritar. Prefira temperos neutros.",
    },
    adaptacoes: {
      gastrite: "Tempere apenas com azeite, alho e sal. Evite limão e pimenta.",
      hipertensao: "Reduza o sal e use ervas frescas — o peixe já tem sabor suave.",
    },
  },

  "Salmão grelhado": {
    tempo: "15 min", porcao: "100g",
    ingredientes: ["100g filé de salmão com pele", "Sal, pimenta e limão", "Azeite", "Alho e ervas"],
    preparo: [
      "Tempere o salmão com sal, pimenta e limão.",
      "Aqueça frigideira em fogo médio-alto com azeite.",
      "Grelhe com a pele para baixo por 5-6 min.",
      "Vire e cozinhe mais 3 min até a carne ficar opaca.",
    ],
    dica: "O salmão é rico em ômega-3 — um dos alimentos mais poderosos contra inflamação e gordura no fígado.",
    recomendado: ["esteatose", "colesterol", "hipertensao", "diabetes"],
    alertas: {
      gastrite: "Limite o limão e pimenta. Salmão é suave e saboroso com apenas sal e ervas.",
    },
    adaptacoes: {
      gastrite: "Prepare no forno com azeite, sal e alecrim — método mais suave que grelhar.",
      hipertensao: "Use limão e ervas no lugar do sal — o ômega-3 do salmão também ajuda a regular a pressão.",
    },
  },

  "Sardinha assada": {
    tempo: "20 min", porcao: "2 unidades",
    ingredientes: ["2 sardinhas limpas", "Azeite", "Alho, sal, limão e orégano"],
    preparo: [
      "Pré-aqueça o forno a 200°C.",
      "Tempere as sardinhas com azeite, alho, sal e limão.",
      "Coloque em assadeira e asse 15-18 min.",
      "Sirva com limão e salada verde.",
    ],
    dica: "Sardinha é riquíssima em ômega-3 e vitamina D. Uma das proteínas mais baratas e nutritivas.",
    recomendado: ["esteatose", "colesterol", "anemia", "hipertensao"],
    alertas: {
      hipertensao: "A sardinha é naturalmente salgada. Não adicione sal — use apenas ervas e limão.",
      gastrite: "Use pouco limão e evite pimenta.",
    },
    adaptacoes: {
      hipertensao: "Não adicione sal — a sardinha já contém sódio suficiente.",
    },
  },

  "Atum em água": {
    tempo: "5 min", porcao: "1 lata (120g)",
    ingredientes: ["1 lata de atum em água", "Limão", "Azeite", "Sal, pimenta e cheiro-verde"],
    preparo: [
      "Escorra bem a água da lata.",
      "Misture com azeite, limão e cheiro-verde.",
      "Tempere com sal e pimenta.",
      "Use como recheio de tapioca, torrada ou salada.",
    ],
    dica: "Prefira atum em água ao natural. Em óleo tem mais calorias sem benefício adicional.",
    recomendado: ["diabetes", "esteatose", "colesterol"],
    alertas: {
      hipertensao: "Atum enlatado tem muito sódio. Lave o atum após escorrer para reduzir o sódio em até 80%.",
    },
    adaptacoes: {
      hipertensao: "Lave o atum em peneira com água corrente por 1 min — remove grande parte do sódio.",
    },
  },

  "Patinho bovino grelhado": {
    tempo: "15 min", porcao: "100g",
    ingredientes: ["100g patinho bovino", "Sal, pimenta", "Azeite", "Alho"],
    preparo: [
      "Tempere a carne com sal, pimenta e alho.",
      "Aqueça frigideira em fogo alto por 2 min.",
      "Grelhe 3-4 min de cada lado para ao ponto.",
      "Deixe descansar 2 min coberto antes de fatiar.",
    ],
    dica: "O patinho é um dos cortes mais magros do boi — ideal para quem controla gordura e colesterol.",
    recomendado: ["anemia", "diabetes"],
    alertas: {
      colesterol: "Escolha cortes magros como patinho, coxão mole ou filé mignon. Retire a gordura visível.",
      esteatose: "Prefira carne vermelha no máximo 2-3x por semana. Priorize peixes e frango.",
      hipertensao: "Reduza o sal. Use alho, ervas e pimenta-do-reino para temperar.",
    },
    adaptacoes: {
      colesterol: "Retire toda a gordura visível antes de cozinhar e use azeite em vez de manteiga.",
      hipertensao: "Marinar a carne em alho e ervas por 30 min elimina a necessidade de muito sal.",
    },
  },

  "Carne moída magra": {
    tempo: "15 min", porcao: "100g",
    ingredientes: ["100g carne moída (patinho)", "Alho, cebola, tomate", "Sal, pimenta e cheiro-verde", "Azeite"],
    preparo: [
      "Refogue alho e cebola no azeite.",
      "Adicione a carne moída e desmanche bem.",
      "Cozinhe em fogo médio-alto por 8-10 min.",
      "Adicione tomate, sal e finalize com cheiro-verde.",
    ],
    dica: "Peça para moer patinho ou coxão mole na hora no açougue — são muito mais magros que a carne moída padrão.",
    recomendado: ["anemia"],
    alertas: {
      colesterol: "Use carne moída de patinho ou coxão mole — muito mais magra. Evite picanha moída.",
      esteatose: "Prefira no máximo 2x por semana. Retire o excesso de gordura que solta durante o cozimento.",
      gastrite: "Evite pimenta e excesso de temperos. Tomate pode irritar o estômago.",
    },
    adaptacoes: {
      gastrite: "Retire o tomate e a pimenta. Use apenas alho, sal e cheiro-verde.",
      colesterol: "Escorra o excesso de gordura que solta na frigideira com uma colher durante o cozimento.",
    },
  },

  "Lombo suíno assado": {
    tempo: "50 min", porcao: "100g",
    ingredientes: ["100g lombo suíno", "Alho, sal, pimenta e limão", "Azeite", "Mostarda e ervas"],
    preparo: [
      "Tempere o lombo na véspera com alho, mostarda, sal e ervas.",
      "Pré-aqueça forno a 180°C.",
      "Asse coberto com papel alumínio por 40 min.",
      "Retire o papel e asse mais 10 min para dourar.",
    ],
    dica: "O lombo suíno tem menos gordura que a picanha bovina — bom para variar a proteína da semana.",
    recomendado: ["anemia"],
    alertas: {
      colesterol: "Escolha lombo sem gordura aparente e retire toda a gordura visível antes de assar.",
      esteatose: "Consuma com moderação — prefira frango e peixes como proteínas principais.",
      hipertensao: "Use ervas e alho para temperar em vez de sal.",
    },
    adaptacoes: {
      hipertensao: "Marine em suco de laranja, alho e ervas — elimina a necessidade de sal.",
    },
  },

  "Tofu grelhado": {
    tempo: "15 min", porcao: "120g",
    ingredientes: ["120g tofu firme", "Shoyu light (1 col. sopa)", "Alho, gengibre e azeite", "Gergelim opcional"],
    preparo: [
      "Seque bem o tofu com papel toalha e corte em cubos.",
      "Marine no shoyu e alho por 10 min.",
      "Aqueça frigideira com azeite em fogo médio-alto.",
      "Grelhe 3-4 min de cada lado até dourar. Finalize com gergelim.",
    ],
    ingredientesAdaptados: {
      hipertensao: ["120g tofu firme", "Vinagre de maçã (1 col. sopa)", "Alho, gengibre e azeite", "Gergelim opcional"],
    },
    preparoAdaptado: {
      hipertensao: [
        "Seque bem o tofu com papel toalha e corte em cubos.",
        "Marine no vinagre de maçã com alho e gengibre por 10 min.",
        "Aqueça frigideira com azeite em fogo médio-alto.",
        "Grelhe 3-4 min de cada lado até dourar. Finalize com gergelim.",
      ],
    },
    dica: "Secar bem o tofu é fundamental para dourar em vez de cozinhar no vapor.",
    recomendado: ["colesterol", "esteatose", "diabetes", "hipertensao"],
    alertas: {
      hipertensao: "O shoyu tem muito sódio — use apenas 1 col. chá ou substitua por ervas.",
    },
    adaptacoes: {
      hipertensao: "Substitua o shoyu por mistura de vinagre de maçã, alho e gengibre.",
    },
  },

  /* ============================================================
     LEGUMES E ACOMPANHAMENTOS
  ============================================================ */

  "Salada verde variada": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["Alface, rúcula ou espinafre", "Tomate cereja", "Pepino", "Azeite e limão"],
    preparo: [
      "Lave bem os legumes em água corrente.",
      "Rasgue as folhas na mão para não oxidar.",
      "Corte tomate e pepino.",
      "Tempere somente na hora de servir.",
    ],
    dica: "Folhas escuras como rúcula e espinafre têm muito mais ferro e vitaminas que a alface comum.",
    recomendado: ["esteatose", "diabetes", "colesterol", "hipertensao", "anemia"],
    alertas: {
      gastrite: "Evite rúcula e tomate — são ácidos. Prefira alface, pepino e cenoura.",
      anemia: "Adicione espinafre e tempere com limão — a vitamina C melhora a absorção de ferro.",
    },
    adaptacoes: {
      gastrite: "Monte a salada com alface, pepino, cenoura e abobrinha crua — todos suaves para o estômago.",
      anemia: "Priorize espinafre e rúcula. Adicione grão-de-bico cozido para mais ferro.",
    },
  },

  "Brócolis no vapor": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["100g brócolis em buquês", "Sal", "Azeite e alho para finalizar"],
    preparo: [
      "Lave o brócolis e separe em buquês.",
      "Cozinhe no vapor por 6-8 min até macio mas firme.",
      "Tempere com azeite, alho e sal.",
    ],
    dica: "Rico em sulforafano — composto que auxilia na desintoxicação do fígado. Um dos melhores legumes para esteatose.",
    recomendado: ["esteatose", "colesterol", "diabetes", "anemia"],
    alertas: {
      gastrite: "Brócolis pode causar gases — coma em quantidade moderada se tiver gastrite ativa.",
    },
    adaptacoes: {
      gastrite: "Cozinhe bem e coma em pequena quantidade — facilita a digestão.",
    },
  },

  "Cenoura e abobrinha": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["1 cenoura média", "1 abobrinha pequena", "Azeite", "Sal, alho e ervas"],
    preparo: [
      "Corte a cenoura em rodelas finas e a abobrinha em meia-lua.",
      "Refogue alho no azeite por 1 min.",
      "Adicione a cenoura primeiro e cozinhe 3 min.",
      "Adicione a abobrinha e cozinhe mais 3 min. Tempere.",
    ],
    dica: "Não cozinhe demais — legumes al dente preservam mais vitaminas e têm textura melhor.",
    recomendado: ["esteatose", "diabetes", "hipertensao", "colesterol", "gastrite"],
    alertas: {},
    adaptacoes: {
      hipertensao: "Use apenas ervas e azeite — sem sal ou com o mínimo possível.",
    },
  },

  "Abóbora cozida": {
    tempo: "20 min", porcao: "100g",
    ingredientes: ["100g abóbora japonesa", "Sal", "Azeite e alho"],
    preparo: [
      "Descasque e corte em cubos.",
      "Cozinhe em água com sal por 15 min ou no vapor.",
      "Escorra e tempere com azeite e alho.",
    ],
    dica: "Rica em betacaroteno (vitamina A) — fundamental para proteger o fígado e melhorar a visão.",
    recomendado: ["esteatose", "diabetes", "gastrite", "hipertensao"],
    alertas: {
      diabetes: "A abóbora tem índice glicêmico moderado. Consuma em porção controlada.",
    },
    adaptacoes: {
      diabetes: "Limite a 100g e combine com proteína para reduzir o impacto glicêmico.",
    },
  },

  "Berinjela grelhada": {
    tempo: "12 min", porcao: "100g",
    ingredientes: ["1 berinjela pequena", "Azeite", "Alho, sal e orégano"],
    preparo: [
      "Corte em rodelas de 1cm.",
      "Sal a berinjela e aguarde 10 min — ela solta água.",
      "Passe azeite e tempere com alho e orégano.",
      "Grelhe 3-4 min de cada lado.",
    ],
    dica: "Salgar antes reduz a absorção de óleo durante o preparo — o prato fica mais leve.",
    recomendado: ["colesterol", "diabetes", "esteatose"],
    alertas: {},
    adaptacoes: {
      hipertensao: "Reduza o sal ao mínimo — a berinjela tem sabor intenso que dispensa muito tempero.",
    },
  },

  "Beterraba cozida": {
    tempo: "30 min", porcao: "80g",
    ingredientes: ["1 beterraba pequena", "Água", "Azeite e vinagre opcional"],
    preparo: [
      "Cozinhe a beterraba com casca em água fervente por 25-30 min.",
      "Espere esfriar e descasque.",
      "Corte em fatias ou cubos.",
      "Tempere com azeite, sal e vinagre.",
    ],
    dica: "A beterraba melhora o fluxo sanguíneo e tem forte ação anti-inflamatória — ótima para o coração.",
    recomendado: ["hipertensao", "anemia", "colesterol"],
    alertas: {
      diabetes: "Tem índice glicêmico moderado quando cozida. Consuma em pequena quantidade.",
      gastrite: "O vinagre pode irritar o estômago — tempere apenas com azeite e sal.",
    },
    adaptacoes: {
      gastrite: "Omita o vinagre. Tempere com azeite, sal e salsa picada.",
    },
  },

  "Quiabo refogado": {
    tempo: "12 min", porcao: "100g",
    ingredientes: ["100g quiabo", "Azeite", "Alho, cebola e sal"],
    preparo: [
      "Lave e seque bem o quiabo. Corte em rodelas.",
      "Deixe secar 15 min ao ar para reduzir a baba.",
      "Refogue alho e cebola no azeite.",
      "Adicione o quiabo e cozinhe 8 min sem tampar em fogo médio-alto.",
    ],
    dica: "Secar bem e não tampar é o segredo para o quiabo não ficar babento.",
    recomendado: ["diabetes", "colesterol"],
    alertas: {},
    adaptacoes: {
      hipertensao: "Use sal mínimo ou substitua por limão no final.",
    },
  },

  "Espinafre refogado": {
    tempo: "5 min", porcao: "100g",
    ingredientes: ["100g espinafre fresco", "Alho", "Azeite", "Sal"],
    preparo: [
      "Lave bem o espinafre.",
      "Refogue alho no azeite por 1 min.",
      "Adicione o espinafre e mexa por 2-3 min.",
      "Retire imediatamente — reduz muito de volume.",
    ],
    dica: "O espinafre é um dos maiores aliados de quem tem anemia — rico em ferro, folato e vitamina C.",
    recomendado: ["anemia", "esteatose", "colesterol"],
    alertas: {
      anemia: "Excelente! Combine com limão — a vitamina C potencializa a absorção do ferro.",
      lactose: "Sem lactose — pode consumir à vontade.",
    },
    adaptacoes: {
      anemia: "Adicione suco de limão ao finalizar — dobra a absorção do ferro do espinafre.",
    },
  },

  "Couve-flor no vapor": {
    tempo: "12 min", porcao: "100g",
    ingredientes: ["100g couve-flor em buquês", "Sal", "Azeite, limão e pimenta"],
    preparo: [
      "Separe em buquês.",
      "Cozinhe no vapor por 8-10 min.",
      "Tempere com azeite, limão, sal e pimenta.",
    ],
    dica: "Rica em vitamina C e compostos anticancerígenos. Versátil — pode substituir o arroz quando ralada.",
    recomendado: ["diabetes", "esteatose", "colesterol"],
    alertas: {
      gastrite: "Pode causar gases — consuma com moderação se tiver gastrite ativa.",
    },
    adaptacoes: {},
  },

  "Vagem refogada": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["100g vagem fresca", "Azeite", "Alho, sal e pimenta"],
    preparo: [
      "Retire as pontas e lave bem.",
      "Branqueie em água fervente com sal por 3 min.",
      "Refogue alho no azeite e adicione a vagem.",
      "Cozinhe mais 3 min. Corrija o sal.",
    ],
    dica: "Branquear antes de refogar mantém a cor verde viva e a textura crocante.",
    recomendado: ["diabetes", "colesterol", "hipertensao"],
    alertas: {},
    adaptacoes: {
      hipertensao: "Branqueie sem sal e tempere apenas com alho e azeite.",
    },
  },

  "Batata doce cozida": {
    tempo: "25 min", porcao: "100g",
    ingredientes: ["100g batata doce", "Água", "Sal opcional", "Canela opcional"],
    preparo: [
      "Descasque e corte em cubos médios.",
      "Cozinhe em água por 20 min até amolecer.",
      "Escorra e sirva simples ou amassada.",
      "Para opção doce, polvilhe canela.",
    ],
    dica: "Índice glicêmico moderado — muito melhor que a batata inglesa para quem tem diabetes.",
    recomendado: ["gastrite", "esteatose"],
    alertas: {
      diabetes: "Índice glicêmico moderado. Consuma em porção controlada (max 100g) e sempre com proteína.",
    },
    adaptacoes: {
      diabetes: "Prefira batata doce cozida ao vapor (não em água) — preserva mais fibras que reduzem o IG.",
    },
  },

  "Mandioca cozida": {
    tempo: "30 min", porcao: "100g",
    ingredientes: ["100g mandioca descascada", "Água e sal", "Azeite e cheiro-verde"],
    preparo: [
      "Descasque e retire o fio central.",
      "Cozinhe em água com sal por 25-30 min.",
      "Tempere com azeite e cheiro-verde.",
    ],
    dica: "Fonte de potássio — importante para o coração e pressão arterial. Prefira cozida a frita.",
    recomendado: ["gastrite"],
    alertas: {
      diabetes: "Alto índice glicêmico — consuma em porção pequena (50g) e sempre com proteína.",
      hipertensao: "Rica em potássio — mineral que ajuda a controlar a pressão arterial.",
    },
    adaptacoes: {
      diabetes: "Substitua por batata doce que tem índice glicêmico mais baixo.",
    },
  },

  "Purê de batata": {
    tempo: "25 min", porcao: "120g",
    ingredientes: ["200g batata inglesa", "Leite desnatado morno", "Azeite", "Sal e noz-moscada"],
    preparo: [
      "Cozinhe as batatas em água com sal por 20 min.",
      "Escorra e amasse ainda quente.",
      "Adicione leite morno e azeite mexendo.",
      "Tempere com sal e noz-moscada.",
    ],
    dica: "Use leite morno (não frio) e amasse ainda quente — evita que fique elástico e pegajoso.",
    recomendado: ["gastrite"],
    alertas: {
      diabetes: "Alto índice glicêmico. Prefira purê de batata doce ou de couve-flor.",
      lactose: "Use leite sem lactose ou bebida vegetal morna.",
    },
    adaptacoes: {
      diabetes: "Substitua por purê de couve-flor — mesmo cremosidade, muito menos carboidrato.",
      lactose: "Use caldo de legumes quente no lugar do leite — fica igualmente cremoso.",
    },
  },

  /* ============================================================
     ARROZ, GRÃOS E CEREAIS
  ============================================================ */

  "Arroz integral cozido": {
    tempo: "35 min", porcao: "4 col. sopa (80g cru)",
    ingredientes: ["1 xícara arroz integral", "2 xícaras água quente", "Sal e azeite", "1 dente de alho"],
    preparo: [
      "Refogue o alho no azeite por 1 min.",
      "Adicione o arroz e refogue mais 1 min.",
      "Adicione água quente e sal.",
      "Cozinhe tampado em fogo baixo por 30-35 min.",
    ],
    dica: "Deixe de molho 30 min antes para reduzir o tempo de cozimento e melhorar a digestão.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      diabetes: "Mesmo integral, o arroz eleva a glicemia. Limite a 3-4 col. sopa e combine com proteína.",
      celiaca: "O arroz integral é naturalmente sem glúten — ótima opção para celíacos.",
    },
    adaptacoes: {
      diabetes: "Cozinhe o arroz al dente — menor índice glicêmico que arroz bem cozido.",
    },
  },

  "Quinoa cozida": {
    tempo: "20 min", porcao: "4 col. sopa (80g cru)",
    ingredientes: ["1 xícara quinoa", "2 xícaras água", "Sal"],
    preparo: [
      "Lave em peneira fina para remover o amargor.",
      "Ferva a água com sal, adicione a quinoa.",
      "Cozinhe tampado em fogo baixo por 15 min.",
      "Solte com garfo antes de servir.",
    ],
    dica: "Quando pronta, cada grão fica com um 'anel' branco. É proteína completa — contém todos os aminoácidos essenciais.",
    recomendado: ["diabetes", "colesterol", "anemia", "celiaca", "esteatose"],
    alertas: {},
    adaptacoes: {},
  },

  "Macarrão integral": {
    tempo: "12 min", porcao: "100g cozido",
    ingredientes: ["100g macarrão integral cru", "Água e sal", "Azeite, alho", "Tomate e manjericão"],
    preparo: [
      "Ferva água com sal em panela grande.",
      "Cozinhe o macarrão conforme a embalagem (9-11 min).",
      "Reserve 1 xícara da água antes de escorrer.",
      "Finalize com azeite, alho refogado e tomate fresco.",
    ],
    dica: "A água do cozimento com amido ajuda o molho a aderir melhor — não jogue toda fora.",
    recomendado: ["colesterol"],
    alertas: {
      diabetes: "Mesmo integral, eleva a glicemia. Cozinhe al dente e limite a 100g.",
      celiaca: "CONTÉM glúten. Substitua por macarrão de arroz, milho ou grão-de-bico.",
      gastrite: "Molho de tomate pode irritar — use apenas azeite, alho e ervas.",
    },
    adaptacoes: {
      celiaca: "Use macarrão de arroz ou de milho — mesmo sabor sem o glúten.",
      gastrite: "Tempere com azeite e alho apenas. Sem tomate, limão ou pimenta.",
    },
  },

  "Feijão cozido": {
    tempo: "45 min", porcao: "1 concha (100g)",
    ingredientes: ["1 xícara feijão (molho 8h)", "Água", "Sal, alho, cebola e louro"],
    preparo: [
      "Descarte a água do molho e lave.",
      "Cozinhe na pressão por 20-25 min.",
      "Refogue alho e cebola no azeite.",
      "Adicione o feijão cozido. Tempere com sal e louro.",
    ],
    dica: "Deixar de molho reduz os gases e melhora muito a absorção de ferro e zinco.",
    recomendado: ["anemia", "diabetes", "colesterol"],
    alertas: {
      gastrite: "Feijão pode causar gases e desconforto. Cozinhe muito bem e não inclua se estiver em crise.",
    },
    adaptacoes: {
      gastrite: "Se precisar comer, deixe de molho 12h, descarte a água e cozinhe muito bem.",
    },
  },

  "Lentilha cozida": {
    tempo: "25 min", porcao: "3 col. sopa (60g cru)",
    ingredientes: ["1 xícara lentilha", "2 xícaras água", "Sal, alho, cebola e açafrão"],
    preparo: [
      "Lave a lentilha — não precisa de molho.",
      "Refogue alho e cebola no azeite.",
      "Adicione a lentilha e cubra com água.",
      "Cozinhe 20 min em fogo médio. Tempere com açafrão.",
    ],
    dica: "A lentilha vermelha cozinha em apenas 10-12 min. Excelente para sopas cremosas sem bater no liquidificador.",
    recomendado: ["anemia", "diabetes", "colesterol", "esteatose"],
    alertas: {},
    adaptacoes: {
      gastrite: "Cozinhe muito bem e evite em períodos de crise.",
    },
  },

  "Grão-de-bico cozido": {
    tempo: "50 min", porcao: "3 col. sopa",
    ingredientes: ["1 xícara grão-de-bico (molho 12h)", "Água", "Sal, alho e azeite"],
    preparo: [
      "Escorra a água do molho e lave.",
      "Cozinhe na pressão por 30-40 min.",
      "Escorra e tempere com azeite, alho, sal e páprica.",
      "Use em saladas, sopas ou como acompanhamento.",
    ],
    dica: "Cozinhe em quantidade e congele em porções — dura 3 meses no freezer já cozido.",
    recomendado: ["diabetes", "colesterol", "anemia", "esteatose"],
    alertas: {
      gastrite: "Pode causar gases. Evite em períodos de crise.",
    },
    adaptacoes: {
      gastrite: "Se quiser consumir, cozinhe muito bem até quase desfazer — fica mais digestivo.",
    },
  },

  /* ============================================================
     SOPAS E CALDOS
  ============================================================ */

  "Sopa de legumes com frango": {
    tempo: "30 min", porcao: "300ml",
    ingredientes: ["150g frango desfiado", "Cenoura, abobrinha e batata doce", "Caldo de legumes", "Sal e cheiro-verde"],
    preparo: [
      "Cozinhe o frango e desfie.",
      "Refogue os legumes cortados em cubos.",
      "Adicione caldo e frango.",
      "Cozinhe 20 min. Finalize com cheiro-verde.",
    ],
    dica: "Prefira temperos naturais como ervas e limão em vez de sal em excesso.",
    recomendado: ["esteatose", "diabetes", "gastrite", "colesterol", "anemia"],
    alertas: {
      hipertensao: "Use caldo de legumes caseiro sem sal ou caldo industrializado com baixo sódio.",
    },
    adaptacoes: {
      hipertensao: "Faça o caldo em casa com legumes apenas — sem sal adicional.",
    },
  },

  "Sopa de lentilha": {
    tempo: "30 min", porcao: "300ml",
    ingredientes: ["1 xícara lentilha vermelha", "Cenoura e cebola", "Alho, açafrão e cominho", "Limão"],
    preparo: [
      "Refogue alho, cebola e cenoura no azeite.",
      "Adicione lentilha, água e especiarias.",
      "Cozinhe 20 min até a lentilha desmanchar.",
      "Bata parte no liquidificador. Finalize com limão.",
    ],
    dica: "A cúrcuma (açafrão-da-terra) tem ação anti-inflamatória poderosa — adicione a todas as sopas.",
    recomendado: ["anemia", "diabetes", "colesterol", "esteatose"],
    alertas: {
      gastrite: "Omita o limão e a pimenta. A sopa de lentilha é suave e nutritiva para o estômago.",
    },
    adaptacoes: {
      gastrite: "Omita limão e especiarias fortes. Finalize com azeite.",
    },
  },

  "Caldo de abóbora com gengibre": {
    tempo: "25 min", porcao: "300ml",
    ingredientes: ["300g abóbora japonesa", "1 col. chá gengibre ralado", "Cebola, alho e azeite", "Caldo de legumes"],
    preparo: [
      "Refogue alho e cebola no azeite.",
      "Adicione a abóbora em cubos e o gengibre.",
      "Cubra com caldo e cozinhe 20 min.",
      "Bata no liquidificador até cremoso.",
    ],
    dica: "Gengibre tem ação anti-inflamatória e digestiva poderosa — ótimo para o fígado.",
    recomendado: ["esteatose", "colesterol", "gastrite", "diabetes"],
    alertas: {
      gastrite: "Use gengibre com moderação — quantidade pequena é digestiva, em excesso pode irritar.",
    },
    adaptacoes: {
      gastrite: "Reduza o gengibre para apenas uma pitada pequena.",
    },
  },

  "Creme de brócolis": {
    tempo: "25 min", porcao: "300ml",
    ingredientes: ["200g brócolis", "Cebola, alho e azeite", "200ml leite desnatado", "Sal e noz-moscada"],
    preparo: [
      "Refogue alho e cebola no azeite.",
      "Adicione o brócolis e cubra com água.",
      "Cozinhe 15 min.",
      "Bata com leite. Tempere com noz-moscada.",
    ],
    dica: "Retire do fogo enquanto o brócolis ainda estiver verde vivo — fica mais bonito e nutritivo.",
    recomendado: ["esteatose", "colesterol", "diabetes"],
    alertas: {
      lactose: "Use leite sem lactose ou caldo de legumes para substituir o leite.",
    },
    adaptacoes: {
      lactose: "Substitua o leite por caldo de legumes ou leite de aveia sem açúcar.",
    },
  },

  "Sopa de mandioquinha": {
    tempo: "30 min", porcao: "300ml",
    ingredientes: ["200g mandioquinha", "Cebola, alho e azeite", "Leite desnatado", "Sal e cheiro-verde"],
    preparo: [
      "Descasque e corte a mandioquinha em cubos.",
      "Refogue alho e cebola no azeite.",
      "Adicione a mandioquinha e cubra com água. Cozinhe 20 min.",
      "Bata com leite e tempere.",
    ],
    dica: "Rica em vitamina A e sabor naturalmente adocicado — não precisa de creme de leite para ficar cremosa.",
    recomendado: ["gastrite", "anemia"],
    alertas: {
      diabetes: "A mandioquinha tem índice glicêmico moderado-alto. Consuma em porção controlada.",
      lactose: "Use leite sem lactose ou caldo de legumes.",
    },
    adaptacoes: {
      lactose: "Substitua o leite por caldo de legumes — fica igualmente cremoso.",
    },
  },

  "Caldo verde (s/ linguiça)": {
    tempo: "25 min", porcao: "300ml",
    ingredientes: ["2 batatas médias", "Couve-manteiga fatiada fina", "Alho, cebola e azeite", "Caldo de legumes"],
    preparo: [
      "Cozinhe batatas com alho e cebola refogados.",
      "Bata no liquidificador até cremoso.",
      "Volte ao fogo e adicione a couve fatiada finíssima.",
      "Cozinhe mais 5 min. Corrija sal.",
    ],
    dica: "A couve deve ser fatiada bem fina e adicionada no final — perde nutrientes se cozinhada demais.",
    recomendado: ["anemia", "colesterol"],
    alertas: {
      diabetes: "A batata tem alto índice glicêmico — substitua metade por couve-flor para reduzir carboidratos.",
    },
    adaptacoes: {
      diabetes: "Use 1 batata + 100g de couve-flor para reduzir o índice glicêmico do caldo.",
    },
  },

  "Sopa de grão-de-bico": {
    tempo: "30 min", porcao: "300ml",
    ingredientes: ["1 xícara grão-de-bico cozido", "Tomate, cebola e alho", "Páprica e cominho", "Espinafre opcional"],
    preparo: [
      "Refogue alho, cebola e tomate no azeite.",
      "Adicione o grão-de-bico e cubra com água.",
      "Cozinhe 15 min. Amasse parte para engrossar.",
      "Adicione espinafre e cozinhe mais 3 min.",
    ],
    dica: "A páprica defumada dá profundidade de sabor sem precisar de carne.",
    recomendado: ["anemia", "colesterol", "diabetes"],
    alertas: {
      gastrite: "Grão-de-bico pode causar gases — evite em períodos de crise.",
    },
    adaptacoes: {
      gastrite: "Substitua por sopa de cenoura com gengibre — igualmente nutritiva e mais suave.",
    },
  },

  /* ============================================================
     PRATOS COMPLETOS
  ============================================================ */

  "Frango xadrez saudável": {
    tempo: "20 min", porcao: "1 porção",
    ingredientes: ["150g peito de frango em cubos", "1 xícara brócolis", "Pimentão colorido", "Shoyu light, alho e gengibre"],
    preparo: [
      "Refogue alho e gengibre no azeite.",
      "Adicione o frango e cozinhe 5 min.",
      "Acrescente brócolis e pimentão.",
      "Finalize com shoyu light e gergelim.",
    ],
    ingredientesAdaptados: {
      hipertensao: ["150g peito de frango em cubos", "1 xícara brócolis", "Pimentão colorido", "Caldo de legumes sem sal, alho e gengibre"],
    },
    preparoAdaptado: {
      hipertensao: [
        "Refogue alho e gengibre no azeite.",
        "Adicione o frango e cozinhe 5 min.",
        "Acrescente brócolis e pimentão.",
        "Finalize com 2 col. sopa de caldo de legumes sem sal e gergelim.",
      ],
    },
    dica: "Use shoyu com menos sódio — dilua 1 col. sopa de shoyu em 1 col. sopa de água para reduzir o sal.",
    recomendado: ["esteatose", "diabetes", "colesterol", "hipertensao"],
    alertas: {
      hipertensao: "O shoyu tem muito sódio — use apenas 1 col. chá ou substitua por ervas e alho.",
    },
    adaptacoes: {
      hipertensao: "Substitua o shoyu por caldo de legumes temperado com gengibre e alho.",
    },
  },

  "Strogonoff de frango light": {
    tempo: "25 min", porcao: "1 porção",
    ingredientes: ["200g peito de frango em tiras", "Cebola, alho e tomate", "2 col. sopa iogurte natural", "Mostarda"],
    preparo: [
      "Refogue alho e cebola no azeite.",
      "Adicione o frango e cozinhe 8 min.",
      "Adicione tomate e cozinhe mais 5 min.",
      "Fora do fogo, misture iogurte e mostarda. Finalize com cheiro-verde.",
    ],
    dica: "O iogurte substitui o creme de leite com muito menos gordura — adicione sempre fora do fogo.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      gastrite: "Tomate e mostarda são ácidos — use com moderação ou substitua.",
      lactose: "Use iogurte sem lactose.",
    },
    adaptacoes: {
      gastrite: "Omita o tomate. Use apenas caldo de frango, cebola e iogurte sem lactose.",
      lactose: "Use iogurte sem lactose ou cream de aveia culinário.",
    },
  },

  "Escondidinho de frango": {
    tempo: "35 min", porcao: "1 porção",
    ingredientes: ["150g frango desfiado temperado", "200g batata doce cozida amassada", "Cebola, alho, tomate", "Queijo branco"],
    preparo: [
      "Refogue o frango com alho, cebola e tomate.",
      "Em refratário, coloque camada de purê de batata doce.",
      "Adicione o frango por cima.",
      "Cubra com mais purê e queijo. Forno 15 min.",
    ],
    dica: "Batata doce no lugar da mandioca tem menor índice glicêmico — mais indicado para diabéticos.",
    recomendado: ["colesterol", "anemia"],
    alertas: {
      diabetes: "Batata doce tem índice glicêmico moderado — use porção controlada.",
      gastrite: "O tomate pode irritar. Refogue o frango sem tomate e use caldo de frango.",
      lactose: "Use queijo branco sem lactose ou omita o queijo.",
    },
    adaptacoes: {
      gastrite: "Substitua o molho de tomate por refogado de cebola, alho e azeite.",
      lactose: "Omita o queijo ou use versão sem lactose.",
    },
  },

  "Bowl de proteínas": {
    tempo: "10 min", porcao: "1 bowl",
    ingredientes: ["100g frango grelhado fatiado", "4 col. sopa arroz integral", "Mix de folhas verdes", "Tomate e pepino", "Azeite e limão"],
    preparo: [
      "Monte o bowl com arroz integral como base.",
      "Adicione as folhas ao redor.",
      "Coloque o frango fatiado no centro.",
      "Adicione tomate e pepino. Regue com azeite e limão.",
    ],
    dica: "Prepare os componentes com antecedência e monte na hora — prático para refeições rápidas.",
    recomendado: ["esteatose", "colesterol", "diabetes", "anemia"],
    alertas: {
      gastrite: "Substitua o tomate por pepino e cenoura — menos ácidos.",
    },
    adaptacoes: {
      gastrite: "Omita tomate e limão. Use pepino, cenoura e azeite apenas.",
    },
  },

  "Omelete de 2 ovos": {
    tempo: "8 min", porcao: "1 porção",
    ingredientes: ["2 ovos inteiros", "Queijo branco ou cottage", "Tomate, cebola e cheiro-verde", "Sal e azeite"],
    preparo: [
      "Bata os ovos com sal, pimenta e cheiro-verde.",
      "Aqueça frigideira com azeite em fogo médio.",
      "Despeje os ovos — não mexa. Deixe firmar.",
      "Adicione recheio em um lado e dobre ao meio.",
    ],
    dica: "Uma omelete de 2 ovos com queijo branco tem mais de 20g de proteína — refeição completa.",
    recomendado: ["diabetes", "esteatose", "anemia"],
    alertas: {
      gastrite: "Evite tomate no recheio. Use abobrinha e queijo cottage.",
      colesterol: "Use 1 ovo inteiro + 1 clara para reduzir o colesterol.",
      lactose: "Use queijo sem lactose ou omita o queijo.",
    },
    adaptacoes: {
      gastrite: "Recheie com abobrinha refogada e ricota — muito suave para o estômago.",
      colesterol: "Faça com 1 ovo + 1 clara. Recheie com espinafre para turbinar o ferro.",
    },
  },

  "Wrap de frango": {
    tempo: "10 min", porcao: "1 unidade",
    ingredientes: ["1 tortilha integral", "100g frango desfiado", "Alface, tomate e cenoura ralada", "Iogurte com limão como molho"],
    preparo: [
      "Aqueça a tortilha 1 min em frigideira seca.",
      "Misture o frango com os legumes.",
      "Distribua o recheio no centro.",
      "Enrole firmemente e sirva com molho de iogurte.",
    ],
    dica: "Use folha de alface como wrap no lugar da tortilha para eliminar carboidratos.",
    recomendado: ["diabetes", "colesterol"],
    alertas: {
      celiaca: "A tortilha tem glúten — use folha de alface ou tortilha de milho certificada sem glúten.",
      gastrite: "Omita o molho de limão. Use apenas iogurte natural com ervas.",
      lactose: "Use iogurte sem lactose no molho.",
    },
    adaptacoes: {
      celiaca: "Substitua a tortilha por folha grande de alface ou couve — igualmente saboroso.",
      gastrite: "Omita o tomate e o limão do molho. Use cenoura, pepino e iogurte puro.",
    },
  },

  /* ============================================================
     LATICÍNIOS E COMPLEMENTOS
  ============================================================ */

  "Ricota temperada": {
    tempo: "5 min", porcao: "80g",
    ingredientes: ["80g ricota fresca", "Azeite", "Sal, orégano e pimenta", "Tomate seco ou azeitona opcional"],
    preparo: [
      "Esmague a ricota com garfo.",
      "Tempere com azeite, sal e orégano.",
      "Sirva com torrada integral ou como recheio de tapioca.",
    ],
    dica: "A ricota é um dos queijos com menor teor de gordura e sódio — ótima opção para quem controla pressão.",
    recomendado: ["hipertensao", "colesterol", "diabetes"],
    alertas: {
      lactose: "A ricota tem lactose — use versão sem lactose ou tofu amassado como substituto.",
    },
    adaptacoes: {
      lactose: "Substitua por tofu sedoso amassado temperado com ervas — textura e sabor similares.",
    },
  },

  "Azeite de oliva": {
    tempo: "0 min", porcao: "1 col. sopa (15ml)",
    ingredientes: ["Azeite extravirgem"],
    preparo: [
      "Use cru para preservar os polifenóis.",
      "Para refogar, use fogo baixo ou médio.",
      "Evite aquecer até soltar fumaça.",
      "Armazene longe da luz e calor.",
    ],
    dica: "O azeite extravirgem é anti-inflamatório e protege o fígado. 1 col. sopa ao dia já traz benefícios.",
    recomendado: ["esteatose", "colesterol", "hipertensao", "diabetes", "gastrite"],
    alertas: {},
    adaptacoes: {},
  },

  /* ============================================================
     LANCHES SAUDÁVEIS
  ============================================================ */

  "Vitamina de frutas vermelhas": {
    tempo: "5 min", porcao: "1 copo (250ml)",
    ingredientes: ["1/2 xícara morango", "1/2 xícara mirtilo", "150ml iogurte natural", "Gelo"],
    preparo: [
      "Bata todos os ingredientes no liquidificador.",
      "Sirva imediatamente.",
    ],
    dica: "Frutas vermelhas são ricas em antioxidantes que protegem o fígado e reduzem inflamação.",
    recomendado: ["esteatose", "colesterol", "diabetes", "anemia"],
    alertas: {
      lactose: "Use iogurte sem lactose ou iogurte de coco.",
      gastrite: "Evite se estiver em crise — as frutas são ácidas.",
    },
    adaptacoes: {
      lactose: "Use iogurte de coco sem açúcar — cremoso e saboroso.",
    },
  },

  "Salada de frutas": {
    tempo: "10 min", porcao: "1 porção",
    ingredientes: ["Manga, morango, melão e kiwi", "Suco de 1 laranja", "Hortelã fresca"],
    preparo: [
      "Corte todas as frutas em cubos.",
      "Regue com suco de laranja fresco.",
      "Adicione folhas de hortelã.",
    ],
    dica: "A vitamina C da laranja melhora a absorção de ferro das frutas — ótima para quem tem anemia.",
    recomendado: ["anemia", "esteatose", "colesterol"],
    alertas: {
      diabetes: "Frutas têm açúcar natural — consuma em porção controlada (1 xícara) e evite suco.",
      gastrite: "Laranja e kiwi são ácidos — substitua por mamão e melão se estiver em crise.",
    },
    adaptacoes: {
      diabetes: "Prefira frutas de baixo índice glicêmico: morango, kiwi e melão.",
      gastrite: "Use mamão, melão e banana — frutas suaves para o estômago.",
    },
  },

  "Castanhas e sementes": {
    tempo: "0 min", porcao: "1 porção (30g)",
    ingredientes: ["2 castanhas-do-pará", "6 amêndoas", "3 nozes", "1 col. chá chia"],
    preparo: [
      "Não precisa preparar.",
      "Consuma como lanche da manhã ou da tarde.",
      "Combine com fruta ou iogurte.",
    ],
    dica: "Castanhas-do-pará têm selênio — mineral essencial para o fígado e para a tireoide.",
    recomendado: ["esteatose", "colesterol", "diabetes", "hipertensao"],
    alertas: {
      colesterol: "Gordura boa! Mas consuma com moderação — máx. 30g por dia.",
    },
    adaptacoes: {},
  },

  "Iogurte com granola e frutas": {
    tempo: "3 min", porcao: "1 porção",
    ingredientes: ["170g iogurte grego sem açúcar", "2 col. sopa granola sem açúcar", "Morango ou banana fatiada"],
    preparo: [
      "Coloque o iogurte em bowl.",
      "Adicione a granola por cima.",
      "Distribua as frutas.",
    ],
    dica: "Adicione a granola só na hora de comer — se deixar de molho fica mole.",
    recomendado: ["colesterol", "anemia"],
    alertas: {
      diabetes: "Verifique a granola — muitas têm açúcar. Use granola sem açúcar e frutas vermelhas.",
      lactose: "Use iogurte sem lactose.",
    },
    adaptacoes: {
      diabetes: "Use granola de aveia pura sem açúcar e morangos no lugar de banana.",
      lactose: "Iogurte de coco natural é excelente substituto.",
    },
  },

  /* ============================================================
     CEIA
  ============================================================ */

  "Chá de camomila": {
    tempo: "5 min", porcao: "200ml",
    ingredientes: ["1 sachê camomila", "200ml água quente", "Mel opcional"],
    preparo: [
      "Ferva a água.",
      "Adicione o sachê e tampe a xícara.",
      "Deixe em infusão por 5 min.",
      "Retire o sachê — não esprema.",
    ],
    dica: "A camomila relaxa e melhora o sono — ideal para quem tem dificuldade de dormir.",
    recomendado: ["gastrite", "diabetes", "hipertensao"],
    alertas: {
      anemia: "Chás com taninos podem reduzir absorção de ferro — não beba junto às refeições principais.",
      diabetes: "Não adicione mel ou açúcar ao chá.",
    },
    adaptacoes: {
      diabetes: "Beba puro ou com adoçante natural (estévia).",
    },
  },

  "Chá de erva-cidreira": {
    tempo: "5 min", porcao: "200ml",
    ingredientes: ["Folhas frescas ou 1 sachê erva-cidreira", "200ml água quente"],
    preparo: [
      "Ferva a água.",
      "Adicione as folhas ou sachê.",
      "Deixe em infusão tampado por 5-8 min.",
      "Coe e beba morno.",
    ],
    dica: "A erva-cidreira tem ação calmante e digestiva — ótima após o jantar.",
    recomendado: ["gastrite", "hipertensao"],
    alertas: {
      anemia: "Separe por 2 horas das refeições com ferro — taninos reduzem a absorção.",
    },
    adaptacoes: {},
  },

  "Leite morno desnatado": {
    tempo: "3 min", porcao: "150ml",
    ingredientes: ["150ml leite desnatado", "Canela (opcional)"],
    preparo: [
      "Aqueça o leite em fogo baixo sem ferver.",
      "Despeje em caneca.",
      "Polvilhe canela.",
    ],
    dica: "O leite morno tem triptofano, que favorece a produção de melatonina e melhora o sono.",
    recomendado: ["hipertensao"],
    alertas: {
      lactose: "Use leite sem lactose ou bebida de aveia morna com canela.",
      colesterol: "Use leite desnatado ou semi-desnatado — muito menos gordura saturada.",
    },
    adaptacoes: {
      lactose: "Bebida de aveia morna com canela é igualmente relaxante e saborosa.",
    },
  },

  // ============================================================
  // RECEITAS RÁPIDAS — INGREDIENTES BÁSICOS
  // ============================================================

  "Arroz branco simples": {
    tempo: "20 min", porcao: "4 col. sopa (120g cozido)",
    ingredientes: ["1 xícara arroz branco", "2 xícaras água", "Sal", "1 dente alho", "Azeite"],
    preparo: [
      "Refogue o alho no azeite em fogo médio.",
      "Adicione o arroz lavado e refogue por 2 min.",
      "Cubra com água, adicione sal, tampe e cozinhe 18 min em fogo baixo até secar.",
    ],
    dica: "O truque do arroz soltinho é lavar bem e não mexer depois de tampar. Quem tem diabetes pode misturar 50% arroz branco + 50% integral para reduzir o impacto glicêmico.",
    recomendado: ["gastrite", "celiaca"],
    alertas: {
      diabetes: "Arroz branco tem alto índice glicêmico. Prefira arroz integral ou misture metade com metade.",
    },
    adaptacoes: {
      diabetes: "Misture metade arroz branco com metade integral — reduz significativamente o índice glicêmico sem perder o sabor.",
    },
  },

  "Arroz com feijão": {
    tempo: "30 min", porcao: "1 prato (200g)",
    ingredientes: ["1 xícara arroz", "1 xícara feijão cozido", "Alho", "Cebola", "Azeite", "Sal"],
    preparo: [
      "Prepare o arroz refogado no alho.",
      "Refogue cebola e alho no azeite, adicione feijão já cozido, tempere e deixe encorpar 5 min.",
      "Sirva junto.",
    ],
    dica: "A combinação arroz + feijão forma proteína completa com todos os aminoácidos essenciais — um dos pratos mais nutritivos do Brasil.",
    recomendado: ["anemia", "esteatose"],
    alertas: {
      gota: "Feijão tem purinas moderadas — consuma com moderação em fases ativas de gota.",
      diabetes: "Porção moderada. O feijão tem fibras que ajudam a controlar a glicemia.",
    },
    adaptacoes: {
      diabetes: "Use feijão como principal fonte de carboidrato e reduza a porção de arroz.",
      gota: "Substitua o feijão por abobrinha refogada nos dias de crise.",
    },
  },

  "Macarrão alho e óleo": {
    tempo: "20 min", porcao: "1 prato (150g cozido)",
    ingredientes: ["100g macarrão espaguete", "3 dentes alho fatiados", "3 col. sopa azeite", "Sal e pimenta", "Salsinha"],
    preparo: [
      "Cozinhe a massa al dente, reserve água do cozimento.",
      "Doure alho fatiado no azeite em fogo baixo.",
      "Adicione a massa escorrida e 2 col. sopa da água do cozimento.",
      "Mexa bem e finalize com salsinha.",
    ],
    dica: "A água do cozimento da massa cria um molho cremoso naturalmente. Use a versão integral para mais fibras.",
    recomendado: ["gastrite", "celiaca"],
    alertas: {
      diabetes: "Prefira macarrão integral que tem menor índice glicêmico.",
      celiaca: "Use macarrão de arroz, milho ou quinoa — verificar embalagem.",
      hipertensao: "Reduza sal ao mínimo — o alho já dá muito sabor.",
    },
    adaptacoes: {
      celiaca: "Macarrão de arroz ou de milho funciona perfeitamente nesta receita.",
      diabetes: "Use macarrão integral — fica al dente mais fácil e tem fibras que reduzem a glicemia.",
    },
  },

  "Ovo frito no azeite": {
    tempo: "5 min", porcao: "1 unidade",
    ingredientes: ["1 ovo", "1 col. chá azeite de oliva", "Sal e ervas a gosto"],
    preparo: [
      "Aqueça azeite em frigideira pequena no fogo baixo.",
      "Quebre o ovo com cuidado.",
      "Tampe e cozinhe até a clara firmar.",
      "Tempere apenas com ervas.",
    ],
    dica: "Frito no azeite em vez de óleo vegetal é muito mais saudável — o azeite não se degrada tanto em temperatura moderada.",
    recomendado: ["anemia", "diabetes", "esteatose"],
    alertas: {
      colesterol: "Limite a 1 ovo/dia. Use apenas 1 col. chá de azeite e não deixe a gema muito mole.",
      hipertensao: "Elimine o sal — use ervas frescas como cebolinha e salsinha.",
    },
    adaptacoes: {
      colesterol: "Use 1 ovo inteiro + 1 clara extra para mais proteína sem mais colesterol.",
      hipertensao: "Tempere apenas com cheiro-verde e ervas — zero sal.",
    },
  },

  "Pão com ovo na chapa": {
    tempo: "8 min", porcao: "1 sanduíche",
    ingredientes: ["2 fatias pão integral", "1 ovo", "Sal", "Azeite ou manteiga light"],
    preparo: [
      "Frite o ovo no azeite.",
      "Torre as fatias de pão.",
      "Monte o sanduíche com o ovo por cima.",
      "Finalize com cheiro-verde.",
    ],
    dica: "Adicione fatias de tomate e folhas de alface para um café da manhã mais completo e nutritivo.",
    recomendado: ["anemia", "diabetes"],
    alertas: {
      celiaca: "Use pão certificado sem glúten.",
      hipertensao: "Prefira pão com pouco sódio e elimine o sal do ovo.",
      colesterol: "Limite a 1 ovo/dia e prefira a versão com clara extra.",
    },
    adaptacoes: {
      celiaca: "Pão de arroz ou pão de tapioca caseiro são ótimas alternativas.",
      hipertensao: "Inclua folhas de espinafre e rúcula — ricas em potássio que ajuda a controlar a pressão.",
    },
  },

  "Cuscuz nordestino com ovo": {
    tempo: "10 min", porcao: "1 unidade",
    ingredientes: ["4 col. sopa farinha de milho para cuscuz", "Água morna com sal", "1 ovo cozido", "Queijo branco opcional"],
    preparo: [
      "Umedeça a farinha de milho com água e sal aos poucos até ficar úmida mas soltinha.",
      "Coloque na cuscuzeira ou xícara e cozinhe no vapor 8 min.",
      "Sirva com ovo cozido fatiado.",
    ],
    dica: "O cuscuz nordestino é naturalmente sem glúten — ótima base para café da manhã nutritivo e fácil.",
    recomendado: ["celiaca", "anemia"],
    alertas: {
      diabetes: "Cuscuz tem moderado índice glicêmico. O ovo junto reduz o impacto na glicemia.",
      hipertensao: "Use pouco sal no preparo — tempere com ervas frescas.",
    },
    adaptacoes: {
      diabetes: "Combine sempre com proteína (ovo, frango, atum) para equilibrar a glicemia.",
    },
  },

  "Banana com aveia e mel": {
    tempo: "3 min", porcao: "1 porção",
    ingredientes: ["1 banana", "2 col. sopa aveia em flocos", "1 col. chá mel"],
    preparo: [
      "Fatie a banana em rodelas.",
      "Polvilhe aveia por cima.",
      "Regue com mel.",
      "Sirva imediatamente.",
    ],
    dica: "Uma das combinações mais simples e nutritivas que existem. A banana fornece potássio e energia, a aveia saciedade prolongada.",
    recomendado: ["hipertensao", "colesterol"],
    alertas: {
      diabetes: "Banana madura tem alto índice glicêmico. Substitua por morango ou kiwi.",
      celiaca: "Use aveia certificada sem glúten.",
    },
    adaptacoes: {
      diabetes: "Substitua banana por morangos fatiados — muito menor impacto glicêmico.",
    },
  },

  "Vitamina de mamão com leite": {
    tempo: "5 min", porcao: "1 copo (300ml)",
    ingredientes: ["200g mamão", "200ml leite desnatado", "1 col. chá mel opcional"],
    preparo: [
      "Bata todos os ingredientes no liquidificador até ficar cremoso.",
      "Sirva gelado.",
    ],
    dica: "Mamão é excelente para a digestão — contém papaína que auxilia na digestão de proteínas. Ótimo para quem tem gastrite.",
    recomendado: ["gastrite", "esteatose"],
    alertas: {
      lactose: "Use leite sem lactose ou bebida vegetal de aveia.",
      diabetes: "Omita o mel e use mamão sem exagerar na quantidade (150g).",
    },
    adaptacoes: {
      lactose: "Bebida de aveia sem açúcar deixa a vitamina igualmente cremosa.",
    },
  },

  "Smoothie verde": {
    tempo: "5 min", porcao: "1 copo (350ml)",
    ingredientes: ["1 folha couve kale ou couve-manteiga", "1 banana congelada", "200ml água de coco ou água gelada", "Gengibre (opcional)"],
    preparo: [
      "Bata tudo no liquidificador.",
      "Adicione gelo se preferir mais gelado.",
      "Sirva imediatamente.",
    ],
    dica: "A banana disfarça completamente o sabor amargo da couve. Rico em ferro, potássio e vitamina C — excelente matinal.",
    recomendado: ["anemia", "hipertensao", "esteatose"],
    alertas: {
      tireoide: "Couve crua pode interferir levemente na tireoide — consuma com moderação se não for cozida.",
      diabetes: "Banana eleva glicemia — substitua por 1/2 abacate para mais saciedade com menos açúcar.",
    },
    adaptacoes: {
      tireoide: "Branqueie a couve rapidamente (30s em água quente) antes de bater — reduz o efeito sobre a tireoide.",
      diabetes: "Use 1/2 banana pequena verde + 1 col. sopa de pasta de amendoim sem açúcar.",
    },
  },

  "Mingau de aveia": {
    tempo: "8 min", porcao: "1 tigela",
    ingredientes: ["5 col. sopa aveia em flocos", "250ml leite desnatado", "Canela", "1 col. chá mel ou banana amassada"],
    preparo: [
      "Coloque leite na panela em fogo médio.",
      "Adicione aveia mexendo sempre.",
      "Cozinhe 5 min até engrossar.",
      "Adoce com banana amassada ou mel.",
      "Finalize com canela.",
    ],
    dica: "O mingau quente no inverno aquece o corpo e sacia por horas. A canela tem ação hipoglicemiante leve — ótima para quem tem diabetes.",
    recomendado: ["colesterol", "diabetes", "hipertensao"],
    alertas: {
      lactose: "Use leite sem lactose ou bebida de aveia.",
      celiaca: "Use aveia certificada sem glúten.",
      diabetes: "Adoce apenas com canela ou eritritol — omita mel e banana madura.",
    },
    adaptacoes: {
      diabetes: "Use canela generosamente e adoce com eritritol ou apenas banana verde amassada.",
      lactose: "Mingau de aveia feito com bebida de aveia fica ainda mais cremoso.",
    },
  },

  // ============================================================
  // ALMOÇOS RÁPIDOS E NUTRITIVOS
  // ============================================================

  "Frango ao molho de tomate": {
    tempo: "30 min", porcao: "1 porção",
    ingredientes: ["200g peito frango", "2 tomates maduros", "Cebola", "Alho", "Azeite", "Ervas (orégano, manjericão)"],
    preparo: [
      "Corte frango em cubos e tempere.",
      "Doure em azeite.",
      "Adicione alho e cebola picados.",
      "Adicione tomate em cubos e 100ml água.",
      "Cozinhe 20 min em fogo médio até encorpar.",
    ],
    dica: "Tomates cozidos liberam licopeno com maior biodisponibilidade — poderoso antioxidante que protege o coração e o fígado.",
    recomendado: ["esteatose", "colesterol", "hipertensao"],
    alertas: {
      gastrite: "Tomate é ácido — use pouco ou substitua por abóbora para um molho suave.",
      hipertensao: "Não use sal — tomate e ervas já dão sabor suficiente.",
    },
    adaptacoes: {
      gastrite: "Substitua tomates por abóbora-butternut — molho suave, cremoso e sem acidez.",
      hipertensao: "Tempere apenas com alho, ervas e azeite — sem sal adicionado.",
    },
  },

  "Bife acebolado (corte magro)": {
    tempo: "15 min", porcao: "1 porção",
    ingredientes: ["150g patinho ou músculo", "1 cebola grande", "Alho", "Azeite", "Sal e pimenta"],
    preparo: [
      "Bata o bife para amaciar.",
      "Tempere levemente.",
      "Grelhe 3 min de cada lado em fogo alto.",
      "Doure cebola fatiada em azeite até caramelizar.",
      "Sirva por cima do bife.",
    ],
    dica: "O patinho é um dos cortes mais magros da carne bovina — ótima fonte de ferro heme para quem tem anemia.",
    recomendado: ["anemia"],
    alertas: {
      hipertensao: "Reduza sal ao mínimo — use alho, ervas e limão para temperar.",
      gota: "Carne vermelha tem purinas — limite a 2x por semana e prefira frango nos outros dias.",
      colesterol: "Corte toda gordura visível antes de preparar.",
    },
    adaptacoes: {
      hipertensao: "Marinar o bife em limão e ervas por 30 min elimina a necessidade de sal.",
      gota: "Nos dias de gota ativa, substitua por 150g de peito de frango grelhado.",
    },
  },

  "Carne moída com batata e cenoura": {
    tempo: "30 min", porcao: "2 porções",
    ingredientes: ["200g carne moída magra (patinho)", "2 batatas médias", "1 cenoura", "Cebola", "Alho", "Tomate", "Azeite"],
    preparo: [
      "Refogue cebola, alho e tomate.",
      "Adicione a carne moída e mexa até dourar.",
      "Adicione batata e cenoura em cubos.",
      "Cubra com água e cozinhe 20 min até as batatas amolecerem.",
    ],
    dica: "Use carne moída de patinho ou músculo, que têm menos gordura que fraldinha ou acém. Congela bem e rende duas refeições.",
    recomendado: ["anemia"],
    alertas: {
      gota: "Carne moída tem purinas — máximo 2x por semana.",
      hipertensao: "Use pouco sal, tempere bem com alho e ervas.",
      diabetes: "Batata tem índice glicêmico moderado — substitua por abobrinha ou chuchu.",
    },
    adaptacoes: {
      diabetes: "Substitua batata por abobrinha e cenoura em dobro — muito mais fibras e menor impacto glicêmico.",
      gota: "Nos dias de restrição, substitua por frango desfiado.",
    },
  },

  "Macarrão integral com atum e azeite": {
    tempo: "20 min", porcao: "1 prato",
    ingredientes: ["80g macarrão integral", "1 lata atum em água", "Azeite", "Limão", "Salsinha", "Azeitona opcional"],
    preparo: [
      "Cozinhe o macarrão al dente.",
      "Escorra e misture com atum escorrido, azeite e limão.",
      "Finalize com salsinha picada.",
      "Sirva quente ou frio.",
    ],
    dica: "Um prato prático e completo — pronto em 20 min. O atum é fonte de proteína e ômega-3 que beneficia o coração e o fígado.",
    recomendado: ["esteatose", "colesterol", "anemia"],
    alertas: {
      celiaca: "Use macarrão de arroz ou de milho certificado sem glúten.",
      gota: "Atum tem purinas moderadas — consuma máximo 3x por semana.",
      hipertensao: "Escorra bem o atum e enxague para reduzir o sódio da conserva.",
    },
    adaptacoes: {
      celiaca: "Macarrão de arroz integral absorve bem o azeite e fica delicioso.",
      hipertensao: "Enxague o atum em água corrente por 30s para reduzir sódio em ~40%.",
    },
  },

  "Frango cozido com legumes": {
    tempo: "35 min", porcao: "2 porções",
    ingredientes: ["2 peitos frango", "1 cenoura", "1 abobrinha", "1 chuchu", "Alho", "Sal e ervas"],
    preparo: [
      "Coloque frango e legumes cortados em cubos na panela.",
      "Cubra com água, adicione alho e ervas.",
      "Cozinhe 30 min em fogo médio até frango ficar macio.",
      "Desfie o frango e sirva com o caldo.",
    ],
    dica: "O caldo do cozimento é riquíssimo em nutrientes. Sirva como sopa ou use para cozinhar o arroz do dia.",
    recomendado: ["gastrite", "esteatose", "diabetes", "hipertensao"],
    alertas: {},
    adaptacoes: {
      gastrite: "É uma das melhores opções para gastrite — suave, sem acidez e de fácil digestão.",
    },
  },

  "Arroz com espinafre e ovo": {
    tempo: "25 min", porcao: "1 prato",
    ingredientes: ["1 xícara arroz", "1 maço espinafre", "2 ovos", "Alho", "Azeite", "Sal"],
    preparo: [
      "Prepare o arroz.",
      "Refogue alho no azeite, adicione espinafre e mexa até murchar.",
      "Faça os ovos mexidos junto.",
      "Misture tudo ao arroz já cozido.",
    ],
    dica: "Espinafre + limão no prato = absorção de ferro potencializada. Ideal para anemia. O ovo completa as proteínas.",
    recomendado: ["anemia", "esteatose"],
    alertas: {
      tireoide: "Espinafre tem compostos que em grande quantidade podem interferir levemente na tireoide — porção normal é segura.",
      diabetes: "Prefira arroz integral nesta receita para menor impacto glicêmico.",
    },
    adaptacoes: {
      anemia: "Esprema limão por cima na hora de servir — aumenta muito a absorção do ferro do espinafre.",
    },
  },

  "Salada de frango desfiado com legumes": {
    tempo: "25 min", porcao: "1 prato",
    ingredientes: ["150g frango desfiado", "Alface", "Tomate", "Cenoura ralada", "Milho", "Azeite", "Limão"],
    preparo: [
      "Cozinhe e desfie o frango.",
      "Misture com as folhas lavadas, tomate, cenoura ralada e milho.",
      "Tempere com azeite, limão e sal.",
    ],
    dica: "Frango frio misturado com legumes crus é uma das combinações mais proteicas e refrescantes para o almoço quente.",
    recomendado: ["diabetes", "hipertensao", "colesterol", "esteatose"],
    alertas: {
      gastrite: "Evite tomate se estiver com crise de gastrite — substitua por cenoura e pepino.",
      hipertensao: "Tempere apenas com azeite e limão — sem sal ou use quantidade mínima.",
    },
    adaptacoes: {
      gastrite: "Substitua tomate por pepino e beterraba — colorido e sem acidez.",
    },
  },

  "Omelete de atum com cebola": {
    tempo: "10 min", porcao: "1 omelete",
    ingredientes: ["2 ovos", "1/2 lata atum em água", "1/4 cebola", "Sal", "Azeite", "Cheiro-verde"],
    preparo: [
      "Bata os ovos.",
      "Adicione atum escorrido, cebola picada e cheiro-verde.",
      "Despeje em frigideira aquecida com azeite.",
      "Cozinhe 3 min de cada lado em fogo médio-baixo.",
    ],
    dica: "Praticamente zero carboidrato e altíssimo em proteína. Pronto em 10 minutos com ingredientes que todo mundo tem em casa.",
    recomendado: ["diabetes", "esteatose", "anemia", "colesterol"],
    alertas: {
      gota: "Atum tem purinas moderadas — máximo 3x por semana.",
      hipertensao: "Escorra bem o atum e use sal mínimo.",
      colesterol: "Use 1 ovo inteiro + 1 clara para reduzir colesterol da receita.",
    },
    adaptacoes: {
      hipertensao: "Enxague o atum e tempere apenas com ervas e limão.",
      gota: "Substitua atum por frango desfiado nos dias de restrição.",
    },
  },

  "Frango xadrez básico": {
    tempo: "25 min", porcao: "2 porções",
    ingredientes: ["250g peito frango em cubos", "1 pimentão colorido", "1 cenoura", "1 abobrinha", "Molho shoyu light", "Alho", "Azeite"],
    preparo: [
      "Doure frango em cubos no azeite. Reserve.",
      "Refogue alho, pimentão e legumes.",
      "Volte o frango, adicione molho shoyu e 100ml água.",
      "Cozinhe 5 min até encorpar.",
    ],
    ingredientesAdaptados: {
      hipertensao: ["250g peito frango em cubos", "1 pimentão colorido", "1 cenoura", "1 abobrinha", "Caldo de legumes sem sal (100ml)", "Alho e ervas frescas", "Azeite"],
      celiaca: ["250g peito frango em cubos", "1 pimentão colorido", "1 cenoura", "1 abobrinha", "Tamari sem glúten", "Alho", "Azeite"],
    },
    preparoAdaptado: {
      hipertensao: [
        "Doure frango em cubos no azeite. Reserve.",
        "Refogue alho, pimentão e legumes.",
        "Volte o frango, adicione caldo de legumes sem sal e ervas frescas.",
        "Cozinhe 5 min até encorpar.",
      ],
      celiaca: [
        "Doure frango em cubos no azeite. Reserve.",
        "Refogue alho, pimentão e legumes.",
        "Volte o frango, adicione tamari sem glúten e 100ml água.",
        "Cozinhe 5 min até encorpar.",
      ],
    },
    dica: "Os pimentões coloridos são ricos em vitamina C que potencializa a absorção do ferro.",
    recomendado: ["anemia", "esteatose", "diabetes", "hipertensao"],
    alertas: {
      hipertensao: "Shoyu tem muito sódio — use shoyu light e metade da quantidade indicada.",
      celiaca: "Verifique se o shoyu é certificado sem glúten ou use tamari.",
    },
    adaptacoes: {
      hipertensao: "Use apenas 1 col. chá de shoyu light diluído em água para dar sabor sem excesso de sódio.",
      celiaca: "Tamari é a versão do shoyu sem glúten — mesmo sabor.",
    },
  },

  "Caldo de feijão": {
    tempo: "30 min", porcao: "2 xícaras",
    ingredientes: ["2 xícaras feijão já cozido", "Alho", "Cebola", "Azeite", "Sal e louro", "Salsinha"],
    preparo: [
      "Bata metade do feijão cozido com o caldo.",
      "Refogue alho e cebola no azeite.",
      "Adicione o feijão batido e inteiro.",
      "Cozinhe 10 min.",
      "Finalize com salsinha.",
    ],
    dica: "O caldo de feijão é rico em proteínas vegetais, ferro e fibras. Perfeito para dias frios ou quando não há muito apetite.",
    recomendado: ["anemia", "esteatose", "hipertensao"],
    alertas: {
      gota: "Feijão tem purinas moderadas — evite em crises agudas de gota.",
      diabetes: "Caldo de feijão é boa opção — as fibras controlam a absorção de carboidratos.",
    },
    adaptacoes: {
      gota: "Nos dias de crise, substitua o feijão por caldo de abóbora com frango.",
    },
  },

  // ============================================================
  // LANCHES PRÁTICOS
  // ============================================================

  "Banana com pasta de amendoim": {
    tempo: "2 min", porcao: "1 porção",
    ingredientes: ["1 banana", "1 col. sopa pasta de amendoim natural"],
    preparo: [
      "Descasque a banana.",
      "Mergulhe cada mordida na pasta de amendoim ou espalhe por cima.",
      "Sirva imediatamente.",
    ],
    dica: "Uma das combinações mais saciantes que existem — o amendoim tem gordura boa e proteína que segura a fome por horas.",
    recomendado: ["colesterol", "hipertensao"],
    alertas: {
      diabetes: "Banana madura tem alto índice glicêmico — prefira banana verde ou substitua por maçã.",
      gota: "Amendoim tem purinas moderadas — consuma com moderação.",
    },
    adaptacoes: {
      diabetes: "Use maçã fatiada com pasta de amendoim sem açúcar — muito menor impacto glicêmico.",
    },
  },

  "Iogurte natural com banana e canela": {
    tempo: "2 min", porcao: "1 tigela",
    ingredientes: ["150g iogurte natural sem açúcar", "1 banana fatiada", "Canela em pó"],
    preparo: [
      "Coloque o iogurte na tigela.",
      "Adicione a banana fatiada.",
      "Polvilhe canela generosamente.",
      "Sirva.",
    ],
    dica: "A canela tem efeito leve de controle glicêmico. A banana fornece potássio. O iogurte é probiótico natural.",
    recomendado: ["hipertensao", "gastrite", "colesterol"],
    alertas: {
      diabetes: "Troque banana por morango ou kiwi para menor índice glicêmico.",
      lactose: "Use iogurte sem lactose ou iogurte de coco.",
    },
    adaptacoes: {
      diabetes: "Iogurte natural com morangos e canela é um lanche excelente para controle glicêmico.",
    },
  },

  "Queijo branco com goiaba": {
    tempo: "2 min", porcao: "1 porção",
    ingredientes: ["50g queijo branco fatiado", "50g goiaba ou 1 col. chá goiabada diet"],
    preparo: [
      "Sirva as fatias de queijo acompanhadas da goiaba ou goiabada diet cortada.",
    ],
    dica: "Romeu e Julieta é um clássico — o queijo branco tem cálcio e proteína, a goiaba tem vitamina C que potencializa a absorção do ferro.",
    recomendado: ["anemia", "colesterol"],
    alertas: {
      hipertensao: "Queijo branco tem sódio moderado — consuma porção pequena (30g).",
      lactose: "Use queijo sem lactose ou tofu temperado como alternativa.",
      diabetes: "Use goiabada diet ou apenas a fruta in natura.",
    },
    adaptacoes: {
      lactose: "Tofu firme grelhado com goiaba é uma alternativa saborosa e sem lactose.",
    },
  },

  "Torrada integral com cottage": {
    tempo: "3 min", porcao: "2 torradas",
    ingredientes: ["2 fatias pão integral", "4 col. sopa queijo cottage", "Orégano ou cheiro-verde"],
    preparo: [
      "Torre as fatias de pão.",
      "Espalhe cottage generosamente.",
      "Finalize com orégano ou cheiro-verde.",
    ],
    dica: "Cottage é o queijo com mais proteína e menos gordura e sódio. Ótimo substituto para requeijão.",
    recomendado: ["diabetes", "colesterol", "hipertensao"],
    alertas: {
      celiaca: "Use pão certificado sem glúten.",
      lactose: "Use cottage sem lactose.",
      hipertensao: "Cottage tem menos sódio que outros queijos — boa escolha para hipertensão.",
    },
    adaptacoes: {
      celiaca: "Use fatias de tapioca ou pão de arroz no lugar do pão integral.",
    },
  },

  "Maçã com canela": {
    tempo: "2 min", porcao: "1 fruta",
    ingredientes: ["1 maçã", "Canela em pó"],
    preparo: [
      "Fatie a maçã.",
      "Polvilhe canela por cima.",
      "Sirva com casca, que é onde está a maioria das fibras.",
    ],
    dica: "A maçã com casca tem pectina solúvel que reduz o colesterol. A canela tem ação antidiabética leve. Uma das melhores combinações para lanche.",
    recomendado: ["colesterol", "diabetes", "gastrite"],
    alertas: {},
    adaptacoes: {
      gastrite: "Maçã sem casca é mais suave para estômagos sensíveis — descasque se sentir desconforto.",
    },
  },

  "Ovos cozidos (lanche)": {
    tempo: "12 min", porcao: "2 ovos",
    ingredientes: ["2 ovos", "Sal (opcional)", "Pimenta-do-reino (opcional)"],
    preparo: [
      "Ferva água.",
      "Adicione os ovos e conte 10 min para gema firme.",
      "Passe em água gelada e descasque.",
    ],
    dica: "2 ovos cozidos = 14g de proteína com apenas 150 kcal. Um dos lanches mais proteicos, práticos e acessíveis.",
    recomendado: ["anemia", "diabetes", "esteatose"],
    alertas: {
      colesterol: "Limite a 1-2 ovos/dia conforme orientação médica.",
      hipertensao: "Evite sal — consuma puro ou com ervas.",
    },
    adaptacoes: {
      colesterol: "Um ovo inteiro + uma clara adicional tem mais proteína com menos colesterol.",
    },
  },

  "Cenoura baby com homus": {
    tempo: "5 min", porcao: "1 porção",
    ingredientes: ["100g cenoura em palitos ou baby", "4 col. sopa homus (grão-de-bico amassado com azeite e limão)"],
    preparo: [
      "Lave as cenouras.",
      "Prepare homus caseiro amassando grão-de-bico cozido com azeite, limão, alho e sal.",
      "Sirva como patê.",
    ],
    dica: "A cenoura tem betacaroteno que protege o fígado e a visão. O homus é rico em fibras e proteínas vegetais.",
    recomendado: ["esteatose", "diabetes", "hipertensao", "colesterol"],
    alertas: {
      gota: "Grão-de-bico tem purinas moderadas — consuma com moderação em fases ativas.",
    },
    adaptacoes: {
      gota: "Substitua o homus por pasta de abacate amassado com limão e sal.",
    },
  },

  // ============================================================
  // JANTARES LEVES
  // ============================================================

  "Sopa de macarrão com frango": {
    tempo: "35 min", porcao: "2 tigelas",
    ingredientes: ["100g peito frango", "50g macarrão de letrinhas ou cabelo de anjo", "1 cenoura", "1 chuchu", "Alho", "Sal e salsinha"],
    preparo: [
      "Cozinhe frango na água com alho, cenoura e chuchu em cubos.",
      "Retire frango e desfie.",
      "Volte à panela, adicione macarrão e cozinhe mais 8 min.",
      "Finalize com salsinha.",
    ],
    dica: "Sopa de macarrão com frango é uma das refeições mais reconfortantes e de fácil digestão. Ideal para dias de gripe ou estômago sensível.",
    recomendado: ["gastrite", "hipertensao", "diabetes"],
    alertas: {
      celiaca: "Use macarrão de arroz ou de milho sem glúten.",
      hipertensao: "Não adicione sal industrial — o caldo de frango caseiro já tempera naturalmente.",
    },
    adaptacoes: {
      celiaca: "Macarrão de arroz fica delicioso nessa sopa — adicione 3 min a mais de cozimento.",
      diabetes: "Use menos macarrão e adicione mais legumes (abobrinha, vagem) para mais fibras.",
    },
  },

  "Omelete simples com salada": {
    tempo: "12 min", porcao: "1 porção",
    ingredientes: ["2 ovos", "Alface, tomate, cenoura ralada", "Azeite", "Limão", "Sal"],
    preparo: [
      "Bata os ovos com sal.",
      "Cozinhe em frigideira com azeite.",
      "Sirva ao lado de salada temperada com azeite e limão.",
    ],
    dica: "Um jantar completo e leve pronto em menos de 15 min. O omelete fornece proteína e a salada, fibras e micronutrientes.",
    recomendado: ["diabetes", "esteatose", "colesterol", "hipertensao"],
    alertas: {
      gastrite: "Evite tomate na salada se estiver em crise — use pepino, cenoura e alface.",
      colesterol: "Use 1 ovo inteiro + 1 clara para reduzir o colesterol da receita.",
    },
    adaptacoes: {
      colesterol: "2 claras + 1 gema = mais proteína com menos colesterol e igualmente saboroso.",
    },
  },

  "Sopa de abóbora com gengibre": {
    tempo: "30 min", porcao: "2 tigelas",
    ingredientes: ["400g abóbora", "1 cebola", "2 dentes alho", "1 col. chá gengibre ralado", "Azeite", "Caldo de legumes", "Sal"],
    preparo: [
      "Refogue alho e cebola no azeite.",
      "Adicione abóbora em cubos e gengibre.",
      "Cubra com água ou caldo.",
      "Cozinhe 20 min.",
      "Bata no liquidificador até ficar cremoso.",
    ],
    dica: "Abóbora é rica em betacaroteno (antioxidante potente) e o gengibre tem ação anti-inflamatória. Uma das sopas mais benéficas para o fígado.",
    recomendado: ["esteatose", "gastrite", "hipertensao", "diabetes"],
    alertas: {
      gastrite: "Gengibre pode irritar estômago sensível — reduza a quantidade ou omita.",
      diabetes: "Abóbora tem índice glicêmico moderado — porção de 200g é segura.",
    },
    adaptacoes: {
      gastrite: "Prepare sem gengibre — use apenas alho e ervas suaves como salsinha.",
    },
  },

  "Tilápia grelhada simples": {
    tempo: "15 min", porcao: "1 porção",
    ingredientes: ["180g filé tilápia", "Limão", "Alho", "Azeite", "Sal e ervas"],
    preparo: [
      "Marine o filé em limão, alho e azeite por 10 min.",
      "Grelhe em frigideira quente 4 min de cada lado.",
      "Sirva com limão e salsinha.",
    ],
    dica: "Tilápia é uma das proteínas mais acessíveis e magras — quase zero gordura com 35g de proteína por porção.",
    recomendado: ["esteatose", "colesterol", "diabetes", "hipertensao", "gota"],
    alertas: {
      gastrite: "Evite excesso de limão — marine por no máximo 10 min.",
    },
    adaptacoes: {
      gastrite: "Use apenas azeite e ervas para marinar, sem o limão. Finalize com um fio de azeite na hora de servir.",
    },
  },

  "Creme de cenoura": {
    tempo: "25 min", porcao: "2 tigelas",
    ingredientes: ["3 cenouras", "1 batata", "Cebola", "Alho", "Azeite", "Sal", "Coentro ou salsinha"],
    preparo: [
      "Cozinhe cenoura e batata em cubos com cebola e alho na água.",
      "Bata tudo no liquidificador com azeite até cremoso.",
      "Tempere e sirva quente.",
    ],
    dica: "Creme de cenoura é suave, naturalmente adocicado e fácil de preparar. O betacaroteno da cenoura é convertido em vitamina A pelo organismo.",
    recomendado: ["gastrite", "esteatose", "hipertensao"],
    alertas: {
      diabetes: "Use menos batata e mais cenoura para reduzir o índice glicêmico.",
      colesterol: "Finalize com fio de azeite extravirgem em vez de creme de leite.",
    },
    adaptacoes: {
      diabetes: "Use 2 cenouras e substitua a batata por couve-flor — fica igualmente cremoso com menos carboidrato.",
    },
  },

  "Frango ao alho e limão no forno": {
    tempo: "40 min", porcao: "2 porções",
    ingredientes: ["2 filés peito frango", "4 dentes alho", "Suco de 1 limão", "Azeite", "Ervas (tomilho, orégano)", "Sal"],
    preparo: [
      "Marine frango em alho, limão, azeite e ervas por 20 min.",
      "Coloque em assadeira coberta com papel alumínio.",
      "Asse a 200°C por 30 min, descubra nos últimos 10 min para dourar.",
    ],
    dica: "O papel alumínio no início mantém a umidade — o frango fica macio mesmo sem gordura extra. Rende para dois dias.",
    recomendado: ["esteatose", "diabetes", "hipertensao", "colesterol"],
    alertas: {
      gastrite: "Limão em excesso pode irritar — use suco de apenas 1/2 limão.",
    },
    adaptacoes: {
      gastrite: "Marinar com azeite e alho apenas, sem limão, resulta em frango igualmente saboroso e suave.",
    },
  },

  // ============================================================
  // FRUTAS E COMBINAÇÕES SIMPLES
  // ============================================================

  "Mamão com limão": {
    tempo: "2 min", porcao: "200g",
    ingredientes: ["1/2 mamão papaia", "Suco de 1/2 limão"],
    preparo: [
      "Retire as sementes do mamão.",
      "Corte em cubos ou sirva na casca com suco de limão.",
    ],
    dica: "Mamão é excelente para digestão (papaína) e o limão potencializa a absorção de vitamina C. Ótimo café da manhã rápido.",
    recomendado: ["gastrite", "esteatose", "anemia"],
    alertas: {
      gastrite: "Limão pode irritar estômagos sensíveis — omita ou use limão cravo em quantidade mínima.",
      diabetes: "Mamão é de médio índice glicêmico — consuma 150g como porção segura.",
    },
    adaptacoes: {
      gastrite: "Sirva o mamão puro sem limão — já é benéfico para a digestão.",
    },
  },

  "Laranja": {
    tempo: "2 min", porcao: "1 unidade",
    ingredientes: ["1 laranja pera ou bahia"],
    preparo: [
      "Descasque e consuma em gomos ou como suco.",
      "Prefira a fruta inteira ao suco para preservar as fibras.",
    ],
    dica: "Rica em vitamina C, potássio e flavonoides. Comer após refeições com ferro (feijão, carne) dobra a absorção do mineral.",
    recomendado: ["anemia", "hipertensao", "colesterol"],
    alertas: {
      gastrite: "Fruta ácida — pode irritar a mucosa gástrica. Evite em crises agudas.",
      diabetes: "Fruta de médio índice glicêmico — prefira a fruta inteira ao suco.",
      gota: "Laranja alcaliniza o sangue e ajuda a eliminar ácido úrico — ótima para gota.",
    },
    adaptacoes: {
      gastrite: "Substitua por banana ou mamão que são frutas alcalinas e suaves para o estômago.",
    },
  },

  "Melancia gelada": {
    tempo: "2 min", porcao: "200g",
    ingredientes: ["200g melancia gelada"],
    preparo: [
      "Sirva gelada em fatias ou cubos.",
    ],
    dica: "A melancia é 92% água — excelente hidratação natural. Rica em licopeno (antioxidante) e potássio que ajuda na pressão arterial.",
    recomendado: ["hipertensao", "esteatose", "gota"],
    alertas: {
      diabetes: "Melancia tem alto índice glicêmico — limite a 150g e consuma junto com proteína.",
      gota: "Melancia hidrata e ajuda os rins a eliminar ácido úrico — excelente escolha.",
    },
    adaptacoes: {
      diabetes: "Consuma após uma refeição com proteína, nunca isolada, para reduzir o impacto glicêmico.",
    },
  },

  "Abacate com limão e sal": {
    tempo: "3 min", porcao: "1/2 unidade",
    ingredientes: ["1/2 abacate maduro", "Suco de 1/2 limão", "Pitada de sal"],
    preparo: [
      "Amasse o abacate com garfo ou sirva em fatias.",
      "Tempere com limão e sal.",
      "Sirva imediatamente.",
    ],
    dica: "Abacate tem gordura monoinsaturada que eleva o HDL (colesterol bom) e reduz o LDL. Uma das melhores gorduras que existem.",
    recomendado: ["colesterol", "hipertensao", "esteatose", "diabetes"],
    alertas: {},
    adaptacoes: {},
  },

  "Maçã assada com canela": {
    tempo: "20 min", porcao: "1 maçã",
    ingredientes: ["1 maçã", "Canela em pó", "1 col. chá mel ou adoçante culinário"],
    preparo: [
      "Retire o miolo da maçã com colher.",
      "Polvilhe canela e adicione mel dentro.",
      "Asse a 180°C por 15 min até amolecer.",
    ],
    dica: "A maçã assada fica mais doce e digestiva. A pectina (fibra) liberada pela maçã quente beneficia o colesterol e o intestino.",
    recomendado: ["colesterol", "gastrite", "diabetes"],
    alertas: {
      diabetes: "Use adoçante culinário no lugar do mel — o efeito da canela ajuda no controle glicêmico.",
    },
    adaptacoes: {
      diabetes: "Adoce apenas com canela e eritritol — a maçã assada já fica naturalmente doce.",
    },
  },

  // ============================================================
  // CEIAS LEVES
  // ============================================================

  "Banana assada com canela": {
    tempo: "12 min", porcao: "1 banana",
    ingredientes: ["1 banana-prata ou nanica", "Canela em pó"],
    preparo: [
      "Corte a banana ao meio no sentido do comprimento.",
      "Polvilhe canela.",
      "Asse a 180°C por 10 min ou em frigideira antiaderente tampada por 5 min.",
    ],
    dica: "A banana quente libera açúcares naturais e fica mais digestiva. Canela tem ação levemente hipoglicemiante. Uma das ceias mais reconfortantes.",
    recomendado: ["gastrite", "hipertensao", "colesterol"],
    alertas: {
      diabetes: "Banana assada tem alto índice glicêmico — prefira uma ceia com iogurte e chia.",
    },
    adaptacoes: {
      diabetes: "Substitua por 1 maçã assada com canela — mais fibras e menor impacto glicêmico.",
    },
  },

  "Chá de gengibre com limão": {
    tempo: "5 min", porcao: "1 xícara",
    ingredientes: ["2cm raiz gengibre fresco", "Suco de 1/2 limão", "250ml água", "Mel opcional"],
    preparo: [
      "Ferva a água com o gengibre ralado ou fatiado por 3 min.",
      "Coe e esprema o limão.",
      "Adicione mel se necessário.",
    ],
    dica: "Gengibre tem ação anti-inflamatória e digestiva. O limão tem vitamina C. Um dos chás mais benéficos para imunidade e digestão.",
    recomendado: ["esteatose", "colesterol", "anemia"],
    alertas: {
      gastrite: "Gengibre pode irritar estômagos sensíveis — use quantidade pequena (1cm) ou omita.",
      diabetes: "Omita o mel — o chá puro já é excelente.",
    },
    adaptacoes: {
      gastrite: "Substitua por chá de camomila ou erva-doce — mais suaves para o estômago.",
    },
  },

  "Chá de ervas noturno": {
    tempo: "5 min", porcao: "1 xícara",
    ingredientes: ["Camomila, erva-cidreira ou erva-doce", "250ml água quente", "Mel opcional"],
    preparo: [
      "Ferva a água.",
      "Despeje sobre as ervas e tampe.",
      "Aguarde 5 min.",
      "Coe e consuma quente.",
    ],
    dica: "Ervas relaxantes antes de dormir melhoram a qualidade do sono. Bom sono é fundamental para controle glicêmico, pressão e fígado.",
    recomendado: ["hipertensao", "gastrite", "diabetes"],
    alertas: {
      diabetes: "Omita o mel ou use adoçante culinário.",
      anemia: "Ervas como camomila têm taninos — evite junto com refeições ricas em ferro.",
    },
    adaptacoes: {
      anemia: "Tome o chá pelo menos 2 horas após a última refeição para não interferir na absorção do ferro.",
    },
  },

  "Iogurte com chia noturno": {
    tempo: "2 min", porcao: "1 tigela",
    ingredientes: ["100g iogurte natural sem açúcar", "1 col. sopa chia", "Canela"],
    preparo: [
      "Misture iogurte com chia.",
      "Aguarde 10 min para a chia hidratar.",
      "Polvilhe canela e sirva.",
    ],
    dica: "A chia hidratada forma um gel de fibras que alimenta as bactérias intestinais benéficas. Excelente para o sono e digestão.",
    recomendado: ["colesterol", "diabetes", "gastrite", "hipertensao"],
    alertas: {
      lactose: "Use iogurte sem lactose ou iogurte de coco.",
      diabetes: "Iogurte natural com chia tem baixíssimo índice glicêmico — ótima ceia para diabéticos.",
    },
    adaptacoes: {
      lactose: "Iogurte de coco com chia tem textura ainda mais cremosa e é naturalmente sem lactose.",
    },
  },

  "Castanha-do-pará": {
    tempo: "1 min", porcao: "2 unidades",
    ingredientes: ["2 castanhas-do-pará"],
    preparo: [
      "Consuma 2 unidades por dia — essa é a dose ideal.",
      "Não exagere.",
    ],
    dica: "2 castanhas-do-pará contêm a dose diária recomendada de selênio — mineral essencial para a tireoide, imunidade e antioxidação.",
    recomendado: ["tireoide", "colesterol", "esteatose"],
    alertas: {},
    adaptacoes: {
      tireoide: "2 castanhas por dia cobrem 100% da necessidade de selênio para a saúde da tireoide.",
    },
  },

  "Torrada com abacate": {
    tempo: "5 min", porcao: "2 torradas",
    ingredientes: ["2 fatias pão integral", "1/2 abacate maduro", "Limão", "Sal e pimenta"],
    preparo: [
      "Torre o pão.",
      "Amasse o abacate com limão, sal e pimenta.",
      "Espalhe sobre as torradas.",
    ],
    dica: "O abacate tem gorduras monoinsaturadas que melhoram o colesterol. O ômega-9 do abacate é anti-inflamatório e benéfico para o fígado.",
    recomendado: ["colesterol", "esteatose", "hipertensao", "diabetes"],
    alertas: {
      celiaca: "Use pão certificado sem glúten.",
      gastrite: "Abacate é suave para o estômago — boa opção para gastrite.",
    },
    adaptacoes: {
      celiaca: "Use tapioca crocante assada ou biscoito de arroz como base.",
    },
  },

  "Açaí na tigela simples (sem granola de trigo)": {
    tempo: "5 min", porcao: "1 tigela",
    ingredientes: ["150g polpa açaí sem adição de açúcar", "1/2 banana", "Granola sem glúten ou aveia"],
    preparo: [
      "Bata a polpa de açaí com a banana.",
      "Coloque na tigela.",
      "Adicione granola ou aveia por cima.",
    ],
    dica: "O açaí natural (sem xarope de guaraná) é rico em antocianinas, potentes antioxidantes. Muito diferente das versões industrializadas açucaradas.",
    recomendado: ["esteatose", "colesterol", "anemia"],
    alertas: {
      diabetes: "Açaí com banana e granola tem muitos carboidratos — consuma porção pequena (100g polpa) e use granola sem açúcar.",
      celiaca: "Use granola certificada sem glúten ou apenas aveia sem glúten.",
      lactose: "Açaí na tigela é naturalmente sem lactose.",
    },
    adaptacoes: {
      diabetes: "Use polpa de açaí sem adição, substitua banana por morangos e use granola sem açúcar — porção menor.",
    },
  },

  "Purê de batata doce": {
    tempo: "25 min", porcao: "1 porção",
    ingredientes: ["200g batata doce", "Azeite", "Sal", "Cúrcuma opcional"],
    preparo: [
      "Cozinhe a batata doce com casca até ficar macia.",
      "Descasque e amasse com azeite, sal e cúrcuma.",
      "Sirva quente.",
    ],
    dica: "Batata doce tem índice glicêmico moderado e é rica em betacaroteno. A cúrcuma tem ação anti-inflamatória que beneficia o fígado.",
    recomendado: ["esteatose", "colesterol", "anemia"],
    alertas: {
      diabetes: "Purê de batata doce tem índice glicêmico moderado — porção de 100g é mais segura.",
      hipertensao: "Use pouco sal — cúrcuma e azeite já dão bastante sabor.",
    },
    adaptacoes: {
      diabetes: "Sirva em porção menor (100g) acompanhado de proteína para estabilizar a glicemia.",
    },
  },

  "Arroz integral com cenoura e ervilha": {
    tempo: "40 min", porcao: "1 prato",
    ingredientes: ["1 xícara arroz integral", "1 cenoura ralada", "4 col. sopa ervilha", "Alho", "Azeite", "Sal"],
    preparo: [
      "Refogue alho no azeite.",
      "Adicione arroz e mexa.",
      "Cubra com água quente (2,5x), adicione cenoura, ervilha e sal.",
      "Tampe e cozinhe 35 min.",
    ],
    dica: "Arroz integral colorido — cenoura e ervilha adicionam betacaroteno, fibras e tornam o prato visualmente mais apetitoso.",
    recomendado: ["diabetes", "colesterol", "hipertensao", "esteatose"],
    alertas: {
      gota: "Ervilha tem purinas moderadas — consuma com moderação em fases ativas.",
      celiaca: "Arroz é naturalmente sem glúten — pode consumir.",
    },
    adaptacoes: {
      gota: "Nos dias de restrição substitua a ervilha por milho que tem purinas muito baixas.",
    },
  },

  "Frango desfiado com chuchu": {
    tempo: "30 min", porcao: "2 porções",
    ingredientes: ["200g frango cozido desfiado", "2 chuchus", "Alho", "Cebola", "Azeite", "Sal e salsinha"],
    preparo: [
      "Refogue alho e cebola no azeite.",
      "Adicione chuchu em cubos e refogue 5 min.",
      "Adicione o frango desfiado, 100ml água e cozinhe coberto por 15 min.",
      "Finalize com salsinha.",
    ],
    dica: "Chuchu é rico em água e praticamente sem calorias — ideal para dar volume às refeições sem aumentar as calorias. Frango desfiado congela por 5 dias.",
    recomendado: ["diabetes", "hipertensao", "gastrite", "esteatose"],
    alertas: {},
    adaptacoes: {
      gastrite: "Frango com chuchu é uma das combinações mais suaves e digestivas que existem — excelente para gastrite.",
    },
  },

  "Sopa de cebola simples": {
    tempo: "30 min", porcao: "2 tigelas",
    ingredientes: ["4 cebolas grandes", "Azeite", "Caldo de legumes natural", "Tomilho", "Sal mínimo"],
    preparo: [
      "Fatie as cebolas finamente.",
      "Refogue em azeite por 20 min em fogo baixo, mexendo sempre, até caramelizar e dourar bem.",
      "Adicione caldo e tomilho.",
      "Cozinhe mais 10 min.",
    ],
    dica: "Cebola caramelizada lentamente fica naturalmente adocicada — não precisa de açúcar. Rica em quercetina que tem ação anti-inflamatória e anti-hipertensiva.",
    recomendado: ["hipertensao", "colesterol", "esteatose"],
    alertas: {
      gastrite: "Cebola pode irritar estômago sensível — cozinhe bem até ficar completamente macia.",
      diabetes: "Cebola caramelizada concentra açúcar — consuma em porção moderada.",
    },
    adaptacoes: {
      gastrite: "Cozinhe a cebola por mais tempo até desintegrar completamente — fica mais suave para estômagos sensíveis.",
    },
  },

  "Polenta cremosa": {
    tempo: "20 min", porcao: "1 prato",
    ingredientes: ["1/2 xícara fubá de milho", "2 xícaras água ou caldo", "Sal", "Azeite", "Queijo ralado opcional"],
    preparo: [
      "Ferva a água com sal.",
      "Adicione fubá em fio mexendo sem parar.",
      "Cozinhe 15 min em fogo baixo mexendo sempre.",
      "Finalize com azeite ou queijo ralado.",
    ],
    dica: "Polenta é naturalmente sem glúten e de fácil digestão. O fubá integral tem mais fibras e nutrientes que o refinado.",
    recomendado: ["celiaca", "gastrite"],
    alertas: {
      diabetes: "Fubá tem índice glicêmico moderado-alto — porção pequena (100g) acompanhada de proteína.",
      lactose: "Use azeite no lugar do queijo.",
      hipertensao: "Use pouco sal e finalize com ervas frescas.",
    },
    adaptacoes: {
      diabetes: "Sirva 100g de polenta com frango grelhado — a proteína reduz o impacto glicêmico.",
    },
  },

  "Bolo de cenoura fit (sem farinha de trigo)": {
    tempo: "45 min", porcao: "8 fatias",
    ingredientes: ["2 cenouras médias", "3 ovos", "1/2 xícara mel ou adoçante culinário", "1 xícara farinha de aveia ou amêndoa", "1 col. sopa fermento", "Azeite"],
    preparo: [
      "Bata no liquidificador cenoura, ovos, mel e azeite.",
      "Adicione a farinha e o fermento.",
      "Misture bem.",
      "Despeje em forma untada e asse a 180°C por 35 min.",
    ],
    dica: "Feito com cenoura, ovos e farinha de aveia — muito mais nutritivo que o bolo tradicional. Sem açúcar refinado e sem farinha de trigo.",
    recomendado: ["celiaca", "colesterol", "esteatose"],
    alertas: {
      diabetes: "Use adoçante culinário em vez de mel — o bolo fica praticamente sem açúcar.",
      celiaca: "Use farinha de amêndoa ou arroz certificada sem glúten.",
      lactose: "Esta receita não leva laticínios — naturalmente sem lactose.",
    },
    adaptacoes: {
      diabetes: "Com adoçante culinário e farinha de amêndoa, este bolo vira uma excelente opção para diabéticos.",
    },
  },

  "Biscoito de polvilho assado": {
    tempo: "30 min", porcao: "20 unidades",
    ingredientes: ["2 xícaras polvilho azedo", "1 ovo", "1/2 xícara azeite", "1/2 xícara água quente", "Sal"],
    preparo: [
      "Misture polvilho com sal.",
      "Adicione azeite e água quente, mexendo até esfarinhar.",
      "Adicione o ovo e sove até formar massa.",
      "Molde rolinhos finos.",
      "Asse a 180°C por 20 min.",
    ],
    dica: "Biscoito de polvilho caseiro é naturalmente sem glúten e muito mais saudável que os industrializados. Feito com mandioca.",
    recomendado: ["celiaca"],
    alertas: {
      diabetes: "Polvilho tem índice glicêmico alto — consuma em pequena quantidade.",
      hipertensao: "Use sal mínimo.",
    },
    adaptacoes: {
      diabetes: "Limite a 4-5 unidades e consuma junto com queijo branco para aumentar a proteína e reduzir impacto glicêmico.",
    },
  },

  "Quinoa com legumes salteados": {
    tempo: "25 min", porcao: "1 prato",
    ingredientes: ["1/2 xícara quinoa", "Pimentão colorido", "Abobrinha", "Tomate seco", "Alho", "Azeite", "Sal e ervas"],
    preparo: [
      "Lave bem a quinoa e cozinhe em 1 xícara água por 15 min.",
      "Saltear alho e legumes no azeite.",
      "Misture com a quinoa cozida e tempere.",
    ],
    dica: "Quinoa é a única pseudocereais com proteína completa — contém todos os aminoácidos essenciais. Rica em ferro e naturalmente sem glúten.",
    recomendado: ["celiaca", "anemia", "diabetes", "colesterol"],
    alertas: {
      gota: "Quinoa tem purinas baixas — segura para gota.",
      hipertensao: "Use pouco sal e finalize com ervas frescas.",
    },
    adaptacoes: {},
  },

  "Frango grelhado com limão siciliano": {
    tempo: "20 min", porcao: "1 porção",
    ingredientes: ["180g peito frango", "Limão siciliano (ou tahiti)", "Alho", "Tomilho", "Azeite", "Sal"],
    preparo: [
      "Tempere o frango com alho, limão, tomilho e azeite.",
      "Grelhe em frigideira quente 5 min de cada lado até dourar.",
      "Regue com mais limão antes de servir.",
    ],
    dica: "O limão tem vitamina C que potencializa a absorção de ferro do frango. Tomilho tem propriedades antibacterianas e digestivas.",
    recomendado: ["anemia", "esteatose", "diabetes", "colesterol", "gota"],
    alertas: {
      gastrite: "Limão em excesso pode irritar — use apenas 1 col. sopa de suco.",
      hipertensao: "Use sal mínimo — o limão compensa e dá sabor sem sódio.",
    },
    adaptacoes: {
      gastrite: "Marine apenas em azeite, alho e tomilho — sem limão — igualmente saboroso.",
    },
  },

  "Salada de feijão com legumes": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["1 xícara feijão cozido escorrido", "Tomate", "Cebola roxa", "Pimentão", "Coentro ou salsinha", "Azeite", "Limão", "Sal"],
    preparo: [
      "Misture feijão com todos os legumes picados.",
      "Tempere com azeite, limão, sal e ervas.",
      "Sirva em temperatura ambiente ou fria.",
    ],
    dica: "Salada de feijão fria é nutritiva, prática e versátil. O feijão fornece proteína vegetal e fibras que alimentam o intestino.",
    recomendado: ["colesterol", "hipertensao", "anemia", "esteatose"],
    alertas: {
      gota: "Feijão tem purinas moderadas — evite em crise aguda de gota.",
      diabetes: "Feijão frio tem menor índice glicêmico que quente — boa opção.",
      gastrite: "Evite o tomate e cebola crua se em crise — use apenas pimentão cozido e azeite.",
    },
    adaptacoes: {
      gastrite: "Substitua tomate por cenoura cozida e omita cebola crua — salada mais suave e igualmente nutritiva.",
      gota: "Nos dias de restrição, substitua feijão por grão-de-bico em menor quantidade ou por apenas legumes.",
    },
  },

  /* ============================================================
     RECEITAS PARA GOTA — BAIXO TEOR DE PURINAS
  ============================================================ */

  "Peito de frango com batata doce e brócolis": {
    tempo: "30 min", porcao: "1 prato",
    ingredientes: ["120g peito de frango", "130g batata doce", "100g brócolis no vapor", "Azeite", "Sal, alho e ervas"],
    preparo: [
      "Tempere o frango com sal, alho e ervas — grelhe em frigideira antiaderente.",
      "Cozinhe a batata doce cortada em cubos em água com sal.",
      "Prepare o brócolis no vapor por 8 minutos.",
      "Monte o prato e regue com fio de azeite.",
    ],
    dica: "Peito de frango tem baixo teor de purinas comparado a vísceras e frutos do mar. Batata doce fornece energia de absorção lenta.",
    recomendado: ["gota", "diabetes", "hipertensao"],
    alertas: {
      gota: "Frango tem purinas moderadas — consuma em porções controladas (até 120g) e prefira grelhado ou cozido.",
      hipertensao: "Use ervas naturais para temperar — evite sal em excesso.",
    },
    adaptacoes: {
      gota: "Se em crise aguda, reduza para 80g de frango e aumente a batata doce e os legumes.",
      hipertensao: "Substitua o sal por mix de ervas: alecrim, tomilho, manjericão.",
    },
  },

  "Ovo mexido com batata cozida e cenoura": {
    tempo: "15 min", porcao: "1 porção",
    ingredientes: ["2 ovos", "1 batata média cozida", "1 cenoura média cozida", "Azeite", "Salsinha", "Sal"],
    preparo: [
      "Cozinhe batata e cenoura cortadas em cubos.",
      "Bata os ovos com uma pitada de sal.",
      "Aqueça azeite na frigideira e mexa os ovos até ficar cremoso.",
      "Sirva os ovos sobre os legumes cozidos e finalize com salsinha.",
    ],
    dica: "Combinação simples, nutritiva e de baixo teor de purinas. Ideal para quem tem gota e precisa de um prato seguro e prático.",
    recomendado: ["gota", "gastrite"],
    alertas: {
      colesterol: "Use apenas as claras se colesterol muito elevado — 3 claras equivalem a 2 ovos inteiros.",
      gastrite: "Sem pimenta, sem cebola crua. Finalize com salsinha fresca para sabor suave.",
    },
    adaptacoes: {
      colesterol: "Substitua 1 dos 2 ovos por 2 claras extras para reduzir o colesterol da receita.",
      gastrite: "Omita alho e cebola no preparo — tempere apenas com sal e salsinha.",
    },
  },

  "Salada de frango com maçã e nozes": {
    tempo: "15 min", porcao: "1 prato",
    ingredientes: ["100g peito de frango cozido e desfiado", "1 maçã em cubos", "3 nozes picadas", "Folhas verdes", "Azeite", "Limão", "Sal"],
    preparo: [
      "Cozinhe o frango em água com sal e desfie.",
      "Misture frango, maçã e nozes sobre as folhas verdes.",
      "Tempere com azeite, limão espremido e sal.",
    ],
    dica: "Combinação refrescante com proteína de baixa purina, fruta antioxidante e gordura boa das nozes. Excelente para gota.",
    recomendado: ["gota", "colesterol", "esteatose"],
    alertas: {
      gota: "Ótima opção — frango e maçã têm baixíssimo teor de purinas.",
      gastrite: "Substitua o limão por azeite puro caso esteja em crise de gastrite.",
    },
    adaptacoes: {
      gastrite: "Omita o limão e use apenas azeite e sal como tempero.",
      diabetes: "A maçã com casca tem fibras que diminuem o impacto glicêmico — mantenha com casca.",
    },
  },

  /* ============================================================
     RECEITAS PARA TIREOIDE — SELÊNIO E IODO
  ============================================================ */

  "Arroz integral com peixe e castanha": {
    tempo: "35 min", porcao: "1 prato",
    ingredientes: ["4 col. sopa arroz integral", "150g filé de tilápia ou merluza", "2 castanhas-do-pará", "Brócolis cozido", "Azeite", "Sal e ervas"],
    preparo: [
      "Cozinhe o arroz integral conforme embalagem.",
      "Tempere o filé de peixe com sal e ervas — grelhe por 4 min de cada lado.",
      "Cozinhe o brócolis no vapor.",
      "Monte o prato, adicione as castanhas picadas e regue com azeite.",
    ],
    dica: "2 castanhas-do-pará cobrem toda a necessidade diária de selênio — mineral crucial para a função tireoidiana. O peixe fornece iodo.",
    recomendado: ["tireoide"],
    alertas: {
      tireoide: "Excelente receita — castanha fornece selênio e peixe fornece iodo, ambos essenciais para a tireoide.",
      hipertensao: "Grelhe o peixe sem sal ou com mínimo sal — tempere com ervas naturais.",
    },
    adaptacoes: {
      hipertensao: "Reduza o sal ao mínimo e use limão, alecrim e tomilho para temperar o peixe.",
      tireoide: "Consuma as 2 castanhas diariamente — não exagere, pois excesso de selênio também é prejudicial.",
    },
  },

  "Omelete com atum e espinafre": {
    tempo: "10 min", porcao: "1 porção",
    ingredientes: ["2 ovos", "80g atum em água escorrido", "1 xícara espinafre refogado", "Azeite", "Sal e pimenta"],
    preparo: [
      "Refogue o espinafre com um fio de azeite por 2 min.",
      "Bata os ovos, adicione o atum escorrido e o espinafre.",
      "Despeje em frigideira antiaderente aquecida com azeite.",
      "Cozinhe tampado por 3 min ou doure dos dois lados.",
    ],
    dica: "Atum e espinafre fornecem iodo, selênio e ferro — nutrientes fundamentais para a função tireoidiana. Receita rápida e completa.",
    recomendado: ["tireoide", "anemia"],
    alertas: {
      tireoide: "Ótima receita — atum fornece iodo e selênio, o espinafre cozido é seguro para a tireoide.",
      anemia: "Espinafre cozido tem menos oxalato que cru — melhor absorção do ferro.",
      hipertensao: "Atum em água tem sódio — escolha a versão com menor teor de sódio na embalagem.",
    },
    adaptacoes: {
      hipertensao: "Escolha atum com teor de sódio reduzido e omita o sal na receita.",
      tireoide: "Prefira sempre o espinafre cozido ao cru para reduzir os goitrogênios.",
    },
  },

  "Smoothie de castanha com banana e cacau": {
    tempo: "5 min", porcao: "1 copo (300ml)",
    ingredientes: ["2 castanhas-do-pará", "1 banana média", "1 col. sopa cacau em pó 100%", "200ml bebida vegetal", "Canela"],
    preparo: [
      "Coloque todos os ingredientes no liquidificador.",
      "Bata por 1-2 minutos até ficar cremoso.",
      "Sirva imediatamente.",
    ],
    dica: "As 2 castanhas fornecem selênio do dia. O cacau puro tem magnésio e antioxidantes. Bebida mineral funcional para a tireoide.",
    recomendado: ["tireoide", "colesterol"],
    alertas: {
      diabetes: "Banana aumenta a glicemia — substitua por 1/2 banana ou use abacate para mais cremosidade com menos açúcar.",
      tireoide: "Castanha-do-pará em excesso pode causar intoxicação por selênio — limite a 2 unidades diárias.",
    },
    adaptacoes: {
      diabetes: "Use 1/2 banana e adicione 1 col. sopa de pasta de amendoim para saciedade sem pico de glicose.",
      lactose: "Já usa bebida vegetal — receita naturalmente sem lactose.",
    },
  },

  /* ============================================================
     RECEITAS PARA GASTRITE — SUAVES E DIGESTIVAS
  ============================================================ */

  "Arroz com cenoura e frango desfiado": {
    tempo: "25 min", porcao: "1 prato",
    ingredientes: ["4 col. sopa arroz cozido", "100g frango cozido desfiado", "1 cenoura cozida", "Salsinha", "Azeite", "Sal"],
    preparo: [
      "Cozinhe o frango em água com sal e desfie.",
      "Cozinhe a cenoura em cubos até amaciar.",
      "Misture arroz, frango e cenoura.",
      "Finalize com azeite e salsinha picada.",
    ],
    dica: "Prato suave, sem irritantes. Cenoura cozida é anti-inflamatória para a mucosa gástrica. Frango cozido é leve e de fácil digestão.",
    recomendado: ["gastrite"],
    alertas: {
      gastrite: "Excelente escolha — sem tomate, sem pimenta, sem cebola crua, sem temperos industrializados.",
    },
    adaptacoes: {
      gastrite: "Se em crise forte, faça como 'risoto' — cozinhe o arroz com o caldo do frango até ficar bem macio.",
      diabetes: "Use arroz integral no lugar do branco para menor índice glicêmico.",
    },
  },

  "Papa de aveia com banana": {
    tempo: "10 min", porcao: "1 tigela",
    ingredientes: ["4 col. sopa aveia em flocos finos", "200ml água ou leite vegetal", "1/2 banana amassada", "Canela"],
    preparo: [
      "Misture a aveia com água ou leite vegetal em panela.",
      "Leve ao fogo médio mexendo até engrossar.",
      "Desligue e misture a banana amassada.",
      "Polvilhe canela e sirva morno.",
    ],
    dica: "A aveia cria uma camada protetora na mucosa gástrica. Banana amassada é alcalina e suaviza a acidez. Café da manhã ideal para gastrite.",
    recomendado: ["gastrite"],
    alertas: {
      gastrite: "Uma das melhores refeições para quem tem gastrite — aveia e banana são alcalinas e protetoras.",
      diabetes: "Use 1/2 banana (menor índice glicêmico) e omita mel ou açúcar.",
      celiaca: "Use aveia certificada sem glúten.",
    },
    adaptacoes: {
      diabetes: "Use 1/3 de banana madura e adicione castanha picada para saciedade.",
      celiaca: "Troque por aveia rotulada 'gluten free' ou use mingau de batata doce ralada.",
    },
  },

  "Creme de batata doce com frango": {
    tempo: "30 min", porcao: "1 tigela (300ml)",
    ingredientes: ["200g batata doce cozida", "80g frango desfiado cozido", "300ml caldo de frango caseiro (sem sal)", "Salsinha", "Azeite"],
    preparo: [
      "Cozinhe a batata doce e bata com o caldo no liquidificador.",
      "Transfira para a panela, adicione o frango desfiado.",
      "Aqueça por 5 min em fogo baixo.",
      "Finalize com azeite e salsinha.",
    ],
    dica: "Creme de textura suave, fácil de digerir e muito nutritivo. A batata doce tem ação anti-inflamatória e o frango oferece proteína leve.",
    recomendado: ["gastrite", "gota"],
    alertas: {
      gastrite: "Ótimo para dias de crise — consistência cremosa, sem irritantes e de fácil digestão.",
      diabetes: "Batata doce tem índice glicêmico menor que a batata comum — boa alternativa.",
    },
    adaptacoes: {
      diabetes: "Reduza a batata para 130g e adicione mais frango para aumentar a proteína e reduzir os carboidratos.",
      hipertensao: "Faça o caldo de frango em casa sem sal — tempere apenas com ervas.",
    },
  },

  /* ============================================================
     RECEITAS FUNCIONAIS — BEBIDAS E SOPAS ESPECIAIS
  ============================================================ */

  "Golden milk (leite dourado)": {
    tempo: "5 min", porcao: "1 copo (200ml)",
    ingredientes: ["200ml bebida vegetal de amêndoa ou coco", "1 col. chá cúrcuma", "1/2 col. chá canela", "1 pitada pimenta-do-reino", "1 col. chá mel ou adoçante"],
    preparo: [
      "Aqueça a bebida vegetal em panela pequena.",
      "Adicione cúrcuma, canela e pimenta.",
      "Mexa bem e adoce com mel ou adoçante.",
      "Sirva morno como bebida noturna.",
    ],
    dica: "A cúrcuma com pimenta-do-reino tem absorção 2000% maior. Potente anti-inflamatório natural, ideal antes de dormir.",
    recomendado: ["esteatose", "colesterol", "tireoide"],
    alertas: {
      diabetes: "Use adoçante culinário no lugar do mel — a cúrcuma em si melhora a sensibilidade à insulina.",
      gastrite: "Evite a pimenta-do-reino se em crise — use apenas cúrcuma e canela.",
    },
    adaptacoes: {
      diabetes: "Substitua o mel por adoçante à base de estévia.",
      gastrite: "Omita a pimenta-do-reino e reduza a canela para 1/4 de colher de chá.",
      lactose: "Já é feito com bebida vegetal — naturalmente sem lactose.",
    },
  },

  "Suco verde desintoxicante": {
    tempo: "5 min", porcao: "1 copo (250ml)",
    ingredientes: ["1 folha de couve", "1 pepino pequeno", "1 maçã verde", "Suco de 1/2 limão", "200ml água gelada"],
    preparo: [
      "Pique todos os ingredientes grosseiramente.",
      "Bata no liquidificador com a água.",
      "Coe se preferir mais líquido ou beba com fibras.",
      "Consuma imediatamente sem adoçar.",
    ],
    dica: "A couve fornece vitamina C e ferro vegetal. A maçã verde tem baixo índice glicêmico. Pepino hidrata e desintoxica.",
    recomendado: ["esteatose", "hipertensao", "colesterol"],
    alertas: {
      gastrite: "Limão e couve crua podem irritar — substitua limão por gengibre suave e a couve por espinafre cozido.",
      tireoide: "Couve crua tem goitrogênios — prefira a versão com espinafre refogado ou branqueado.",
      anemia: "Vitamina C da maçã e couve melhoram a absorção do ferro — beba longe do café.",
    },
    adaptacoes: {
      gastrite: "Substitua o limão por 1 cm de gengibre fresco ralado (em pequena quantidade) e omita a couve.",
      tireoide: "Use espinafre refogado no lugar da couve crua.",
    },
  },

  "Chá de hibisco com cranberry": {
    tempo: "10 min", porcao: "500ml",
    ingredientes: ["2 sachês chá de hibisco", "1 col. sopa suco de cranberry sem açúcar", "500ml água quente", "Adoçante (opcional)", "Gelo"],
    preparo: [
      "Prepare o chá com água quente por 5 min.",
      "Retire os sachês e adicione o suco de cranberry.",
      "Adoce com adoçante se desejar.",
      "Deixe esfriar e sirva gelado.",
    ],
    dica: "Hibisco e cranberry são ricos em antocianinas — antioxidantes que ajudam a reduzir a pressão arterial e o colesterol.",
    recomendado: ["hipertensao", "colesterol", "diabetes"],
    alertas: {
      diabetes: "Use adoçante e verifique se o suco de cranberry é 100% sem açúcar.",
      hipertensao: "Excelente bebida — o hibisco é comprovadamente hipotensor.",
    },
    adaptacoes: {
      diabetes: "Escolha suco de cranberry 100% sem adição de açúcar.",
      hipertensao: "Tome 2-3 xícaras diárias para efeito máximo na pressão.",
    },
  },

  /* ============================================================
     RECEITAS RICAS EM FERRO — PARA ANEMIA
  ============================================================ */

  "Feijão preto com couve e ovo": {
    tempo: "15 min", porcao: "1 prato",
    ingredientes: ["3 col. sopa feijão preto cozido", "2 folhas couve refogada", "2 ovos mexidos", "Azeite", "Alho", "Sal"],
    preparo: [
      "Refogue a couve fatiada no azeite com alho por 3 min.",
      "Aqueça o feijão com um fio de azeite e ajuste o sal.",
      "Prepare os ovos mexidos separadamente.",
      "Monte o prato: feijão, couve e ovos lado a lado.",
    ],
    dica: "Trio poderoso para anemia: feijão preto (ferro), couve (ferro + vitamina C) e ovo (proteína + ferro). A vitamina C da couve potencializa a absorção.",
    recomendado: ["anemia"],
    alertas: {
      anemia: "Combine sempre ferro vegetal com vitamina C. Evite tomar café ou chá próximo às refeições.",
      gota: "Feijão tem purinas moderadas — consuma com moderação se tiver gota.",
    },
    adaptacoes: {
      gota: "Reduza a porção de feijão e adicione mais ovos como fonte proteica alternativa.",
      hipertensao: "Use pouco sal — a couve bem temperada com alho já tem sabor intenso sem precisar de sódio.",
    },
  },

  "Bife de fígado com couve e limão": {
    tempo: "15 min", porcao: "1 porção",
    ingredientes: ["100g fígado bovino", "2 folhas couve refogada", "Suco de 1/2 limão", "Alho", "Azeite", "Sal e pimenta"],
    preparo: [
      "Frite o fígado em azeite com alho por 3 min de cada lado.",
      "Regue com limão ao final para cortar o sabor forte.",
      "Sirva com couve refogada no alho.",
    ],
    dica: "Fígado é uma das maiores fontes de ferro heme — mais biodisponível. O limão inibe o sabor amargo e aumenta a absorção do ferro.",
    recomendado: ["anemia"],
    alertas: {
      gota: "Fígado tem altíssimo teor de purinas — EVITAR em pessoas com gota.",
      colesterol: "Fígado tem colesterol elevado — limite a 1 vez por semana.",
      hipertensao: "Use pouco sal e evite molhos processados.",
    },
    adaptacoes: {
      gota: "Substitua por 2 ovos com couve — mesma vitamina B12 e ferro, sem as purinas do fígado.",
      colesterol: "Limite a 1 porção por semana e combine com vegetais ricos em fibra.",
    },
  },

  "Vitamina de frutas vermelhas com aveia": {
    tempo: "5 min", porcao: "1 copo (300ml)",
    ingredientes: ["100g morango ou amora congelada", "1 banana pequena", "2 col. sopa aveia", "200ml bebida vegetal", "1 col. chá mel"],
    preparo: [
      "Bata todos os ingredientes no liquidificador por 1-2 min.",
      "Sirva imediatamente com sementes por cima.",
    ],
    dica: "Frutas vermelhas têm vitamina C que aumenta a absorção de ferro. A aveia tem ferro vegetal. Vitamina completa e anti-inflamatória.",
    recomendado: ["anemia", "colesterol", "esteatose"],
    alertas: {
      diabetes: "Banana e mel elevam a glicemia — use 1/2 banana e omita o mel.",
      lactose: "Já usa bebida vegetal — naturalmente sem lactose.",
      anemia: "Vitamina C das frutas vermelhas potencializa a absorção do ferro da aveia.",
    },
    adaptacoes: {
      diabetes: "Use apenas os morangos (baixo índice glicêmico), omita banana e mel.",
      celiaca: "Verifique a aveia — use certificada sem glúten.",
    },
  },

  /* ============================================================
     RECEITAS PRÁTICAS E RÁPIDAS — VERSATILIDADE
  ============================================================ */

  "Wrap integral de frango com abacate": {
    tempo: "10 min", porcao: "1 unidade",
    ingredientes: ["1 tortilha integral", "80g frango grelhado fatiado", "2 col. sopa abacate amassado", "Folhas verdes", "Tomate picado", "Limão e sal"],
    preparo: [
      "Amasse o abacate com sal e limão.",
      "Espalhe sobre a tortilha.",
      "Adicione frango fatiado, folhas e tomate.",
      "Enrole firmemente e corte ao meio.",
    ],
    dica: "Refeição completa e prática: proteína, gordura boa e fibras em um único wrap. Perfeito para levar na bolsa.",
    recomendado: ["esteatose", "colesterol"],
    alertas: {
      gastrite: "Substitua o tomate por cenoura ralada e omita o limão — use azeite puro no abacate.",
      diabetes: "Tortilha integral tem menos impacto glicêmico — mantenha a porção em 1 unidade.",
      celiaca: "Use tortilha de milho ou de tapioca sem glúten.",
    },
    adaptacoes: {
      gastrite: "Use abacate com sal e salsinha no lugar de limão, e troque tomate por pepino.",
      celiaca: "Substitua a tortilha de trigo por wrap de arroz ou tapioca.",
    },
  },

  "Panqueca de banana com aveia (sem farinha)": {
    tempo: "10 min", porcao: "4 panquecas",
    ingredientes: ["1 banana madura amassada", "2 ovos", "4 col. sopa aveia em flocos", "Canela", "1 col. chá óleo de coco"],
    preparo: [
      "Misture banana amassada, ovos e aveia até formar massa.",
      "Adicione canela.",
      "Aqueça frigideira antiaderente com óleo de coco.",
      "Despeje pequenas porções e cozinhe 2 min de cada lado.",
    ],
    dica: "Sem farinha refinada, sem açúcar adicionado. A banana madura já adoça naturalmente. Rica em fibras, proteína e potássio.",
    recomendado: ["colesterol", "esteatose", "hipertensao"],
    alertas: {
      diabetes: "Banana madura tem alto índice glicêmico — use banana verde ou maçã ralada no lugar.",
      celiaca: "Use aveia certificada sem glúten.",
      gota: "Receita sem purinas — ótima opção para gota.",
    },
    adaptacoes: {
      diabetes: "Substitua a banana madura por 1/2 banana verde (mais amido resistente) ou maçã ralada.",
      celiaca: "Use aveia rotulada 'gluten free' para evitar contaminação cruzada.",
    },
  },

  "Bolinho de atum assado": {
    tempo: "25 min", porcao: "8 bolinhos",
    ingredientes: ["1 lata atum em água", "2 ovos", "1/2 xícara aveia em flocos", "Salsinha", "Cebola ralada", "Sal e azeite"],
    preparo: [
      "Misture todos os ingredientes em uma tigela.",
      "Forme bolinhos pequenos com as mãos úmidas.",
      "Coloque em assadeira untada com azeite.",
      "Asse a 200°C por 18-20 min até dourar.",
    ],
    dica: "Bolinhos assados em vez de fritos — reduz calorias e gordura. Atum fornece ômega-3 e proteína de alta qualidade.",
    recomendado: ["esteatose", "colesterol", "diabetes"],
    alertas: {
      hipertensao: "Escolha atum em água com teor reduzido de sódio.",
      gota: "Atum tem purinas moderadas — consuma com moderação.",
    },
    adaptacoes: {
      hipertensao: "Use atum com pouco sódio e omita o sal — salsinha e ervas compensam.",
      celiaca: "Substitua a aveia por farinha de arroz ou de grão-de-bico.",
      gota: "Limite a 4 bolinhos por refeição e combine com legumes sem purinas.",
    },
  },

  /* ============================================================
     COZINHA REGIONAL BRASILEIRA (versões adaptadas)
  ============================================================ */
  "Moqueca de peixe light": {
    tempo: "30 min", porcao: "1 prato",
    ingredientes: ["150g filé de tilápia ou pescada", "1/2 tomate em rodelas", "1/2 cebola em rodelas", "1/2 pimentão em tiras", "Coentro picado", "1/2 col. sopa azeite de dendê", "100ml leite de coco light", "Pimenta-do-reino e sal a gosto"],
    preparo: [
      "Tempere o peixe com limão, sal e pimenta — deixe descansar 10 min.",
      "Em panela larga, faça camadas: cebola, tomate, peixe, pimentão.",
      "Regue com leite de coco light e azeite de dendê.",
      "Tampe e cozinhe em fogo médio-baixo por 15 min.",
      "Finalize com coentro e sirva com arroz integral.",
    ],
    dica: "Versão mais leve da moqueca tradicional — leite de coco light reduz gordura saturada. Peixe magro fornece ômega-3.",
    recomendado: ["colesterol", "esteatose", "diabetes"],
    alertas: {
      hipertensao: "O dendê é gorduroso — use só meia colher e omita o sal.",
    },
    adaptacoes: {
      hipertensao: "Reduza o dendê para 1 col. chá e tempere com ervas frescas.",
    },
  },

  "Baião de dois integral": {
    tempo: "35 min", porcao: "1 prato",
    ingredientes: ["3 col. sopa arroz integral cru", "3 col. sopa feijão-de-corda cozido", "30g queijo coalho cortado em cubinhos", "1/2 cebola picada", "1 dente alho", "Coentro picado", "1 col. chá azeite", "Pimenta-do-reino"],
    preparo: [
      "Cozinhe o arroz integral previamente (ou use de molho).",
      "Refogue cebola e alho no azeite até dourar.",
      "Junte o feijão-de-corda já cozido e refogue 2 min.",
      "Acrescente o arroz cozido e misture.",
      "Adicione o queijo coalho em cubos e finalize com coentro.",
    ],
    dica: "Versão integral do clássico nordestino — arroz integral substitui o branco e reduz índice glicêmico. Feijão-de-corda é rico em fibras.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      hipertensao: "Queijo coalho tem sódio — use só 30g.",
      lactose: "Substitua o queijo coalho por tofu temperado.",
    },
    adaptacoes: {
      hipertensao: "Reduza o queijo coalho para 20g e tempere com cominho.",
    },
  },

  "Escondidinho de frango com mandioquinha": {
    tempo: "40 min", porcao: "1 porção",
    ingredientes: ["150g peito de frango desfiado", "200g mandioquinha (batata-baroa) cozida", "1/2 cebola picada", "1 tomate picado", "Salsinha picada", "1 col. chá azeite", "30ml leite desnatado", "Pimenta-do-reino"],
    preparo: [
      "Cozinhe a mandioquinha em água até ficar macia. Amasse com leite desnatado e pitada de sal.",
      "Refogue cebola, tomate e o frango desfiado com azeite e temperos.",
      "Em refratário, coloque o frango refogado embaixo.",
      "Cubra com o purê de mandioquinha.",
      "Leve ao forno a 200°C por 15 min até dourar.",
    ],
    dica: "Versão saudável do escondidinho tradicional — mandioquinha tem menos amido que a batata comum. Frango desfiado caseiro é magro.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {},
    adaptacoes: {
      lactose: "Use bebida vegetal no lugar do leite.",
    },
  },

  "Bobó de camarão light": {
    tempo: "35 min", porcao: "1 prato",
    ingredientes: ["120g camarão limpo", "200g mandioca cozida e amassada", "1/2 cebola picada", "1 tomate picado", "Coentro picado", "1 col. chá azeite", "100ml leite de coco light", "1 col. chá azeite de dendê (opcional)", "Limão e pimenta a gosto"],
    preparo: [
      "Tempere o camarão com limão e pimenta.",
      "Refogue cebola e tomate no azeite. Acrescente o camarão e refogue 3 min.",
      "Adicione a mandioca amassada e o leite de coco light. Misture até ficar cremoso.",
      "Finalize com dendê e coentro.",
    ],
    dica: "Bobó com leite de coco light reduz gordura saturada. Camarão é proteína magra rica em zinco e selênio.",
    recomendado: ["colesterol", "esteatose"],
    alertas: {
      colesterol: "Camarão tem colesterol — limite a 120g por refeição, 1x/semana.",
      hipertensao: "Tempere com ervas e reduza o sal.",
    },
    adaptacoes: {
      hipertensao: "Use 100g de camarão e omita o sal — coentro e limão dão sabor.",
    },
  },

  "Galinhada integral": {
    tempo: "40 min", porcao: "1 prato",
    ingredientes: ["120g peito de frango em cubos", "3 col. sopa arroz integral cru", "1/2 cebola picada", "1 dente alho", "1/2 tomate picado", "Açafrão (cúrcuma)", "Salsinha", "1 col. chá azeite", "200ml caldo de legumes caseiro"],
    preparo: [
      "Tempere o frango com alho, sal e cúrcuma. Reserve 10 min.",
      "Doure o frango no azeite. Reserve.",
      "Na mesma panela, refogue cebola e tomate. Adicione o arroz integral.",
      "Volte o frango, junte o caldo e cozinhe tampado por 25 min.",
      "Finalize com salsinha picada.",
    ],
    dica: "Galinhada com arroz integral é mais nutritiva — fibras + proteína magra. Cúrcuma é anti-inflamatória.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {},
    adaptacoes: {},
  },

  "Vatapá leve de frango": {
    tempo: "30 min", porcao: "1 prato",
    ingredientes: ["120g frango desfiado", "2 fatias pão integral sem casca", "100ml leite de coco light", "1 col. sopa amendoim torrado moído", "1/2 cebola", "1 tomate", "Coentro", "1 col. chá azeite de dendê (opcional)", "Cúrcuma"],
    preparo: [
      "Deixe o pão integral de molho no leite de coco por 5 min. Bata no liquidificador.",
      "Refogue cebola e tomate no azeite.",
      "Adicione o frango desfiado e a mistura batida.",
      "Cozinhe em fogo baixo, mexendo, até engrossar (8 min).",
      "Finalize com amendoim moído, dendê e coentro.",
    ],
    dica: "Vatapá com pão integral e leite de coco light fica mais leve. Amendoim adiciona gordura boa e sabor.",
    recomendado: ["esteatose"],
    alertas: {
      hipertensao: "Use pão integral sem sal e omita o sal extra.",
    },
    adaptacoes: {},
  },

  "Tutu de feijão light": {
    tempo: "20 min", porcao: "1 porção",
    ingredientes: ["1 concha feijão carioca cozido", "2 col. sopa farinha de aveia", "1/2 cebola picada", "1 dente alho", "1 col. chá azeite", "Salsinha picada", "Pimenta-do-reino"],
    preparo: [
      "Bata o feijão cozido com seu caldo no liquidificador.",
      "Refogue cebola e alho no azeite.",
      "Despeje o feijão batido e adicione a farinha de aveia aos poucos, mexendo.",
      "Cozinhe 5 min até engrossar.",
      "Finalize com salsinha.",
    ],
    dica: "Tutu mineiro com farinha de aveia em vez de farinha de mandioca — mais fibras e nutrientes. Excelente fonte de proteína vegetal e ferro.",
    recomendado: ["diabetes", "colesterol", "esteatose", "anemia"],
    alertas: {
      gota: "Feijões podem aumentar ácido úrico — modere a porção.",
    },
    adaptacoes: {},
  },

  "Cuscuz paulista light": {
    tempo: "25 min", porcao: "1 porção",
    ingredientes: ["1 xíc. flocão de milho", "100g sardinha em água escorrida", "1 tomate picado", "1/2 cebola picada", "Salsinha", "1 col. chá azeite", "1 ovo cozido em rodelas", "Ervilhas frescas"],
    preparo: [
      "Hidrate o flocão de milho com 1 xíc. água morna por 5 min.",
      "Refogue cebola, tomate e ervilhas no azeite.",
      "Misture com a sardinha amassada e o flocão hidratado.",
      "Coloque em forma untada, decore com ovo cozido.",
      "Leve ao vapor por 10 min ou prense bem e desenforme.",
    ],
    dica: "Cuscuz paulista é rico em ômega-3 (sardinha) e fibras (flocão). Versão sem azeitona/embutidos é mais leve.",
    recomendado: ["colesterol", "esteatose", "anemia"],
    alertas: {
      gota: "Sardinha tem purinas — modere e evite se tiver crise.",
      hipertensao: "Sardinha em conserva tem sódio — escolha em água sem sal.",
    },
    adaptacoes: {},
  },

  "Sopa de mandioquinha com frango": {
    tempo: "30 min", porcao: "1 tigela",
    ingredientes: ["100g peito de frango cozido e desfiado", "200g mandioquinha", "1/2 cebola", "1 dente alho", "Salsinha", "Cúrcuma", "1 col. chá azeite", "500ml caldo caseiro sem sal"],
    preparo: [
      "Cozinhe a mandioquinha no caldo até ficar macia.",
      "Bata no liquidificador com cebola e alho refogados.",
      "Volte ao fogo, adicione o frango desfiado e cúrcuma.",
      "Cozinhe 5 min e finalize com salsinha.",
    ],
    dica: "Sopa cremosa sem creme de leite — a mandioquinha dá textura naturalmente. Excelente para jantar leve.",
    recomendado: ["diabetes", "colesterol", "esteatose", "gastrite"],
    alertas: {},
    adaptacoes: {},
  },

  "Quibe assado de abóbora": {
    tempo: "40 min", porcao: "4 unidades",
    ingredientes: ["200g abóbora cozida e amassada", "1/2 xíc. trigo para quibe (hidratado)", "100g carne moída magra", "1/2 cebola picada", "Hortelã", "Pimenta síria", "1 col. chá azeite"],
    preparo: [
      "Hidrate o trigo em água por 30 min e escorra.",
      "Misture trigo, abóbora amassada, carne, cebola, hortelã e pimenta síria.",
      "Modele os quibes e coloque em assadeira untada.",
      "Asse a 200°C por 25 min até dourar.",
    ],
    dica: "Quibe assado com abóbora é mais leve que o frito — abóbora rende mais e adiciona betacaroteno.",
    recomendado: ["diabetes", "esteatose", "colesterol"],
    alertas: {
      celiaca: "Trigo contém glúten — use farinha de quinoa hidratada.",
    },
    adaptacoes: {},
  },

  /* ============================================================
     EXPRESS — receitas em até 15 min
  ============================================================ */
  "Wrap de frango com homus": {
    tempo: "10 min", porcao: "1 wrap",
    ingredientes: ["1 tortilha integral pequena", "100g peito de frango grelhado em tiras", "2 col. sopa homus de grão-de-bico", "Folhas de alface", "Tomate fatiado", "Pepino em palitos"],
    preparo: [
      "Espalhe o homus na tortilha.",
      "Cubra com alface, frango, tomate e pepino.",
      "Enrole apertando bem e corte ao meio.",
    ],
    dica: "Refeição completa pronta em 10 min — proteína, fibras e gorduras boas. Ideal para marmita.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      celiaca: "Tortilha de trigo contém glúten — use de arroz ou milho.",
    },
    adaptacoes: {},
  },

  "Bowl de atum com grão-de-bico": {
    tempo: "8 min", porcao: "1 bowl",
    ingredientes: ["100g atum em água escorrido", "3 col. sopa grão-de-bico cozido", "1/2 pepino em cubos", "1 tomate picado", "Folhas verdes a gosto", "1 col. chá azeite", "Suco de 1/2 limão", "Orégano"],
    preparo: [
      "Em uma tigela, monte as folhas verdes na base.",
      "Distribua atum, grão-de-bico, pepino e tomate.",
      "Tempere com azeite, limão e orégano.",
    ],
    dica: "Refeição rica em proteína magra e fibras. Combinação proteica completa atum + grão-de-bico.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      gota: "Atum + leguminosa elevam purinas — modere a frequência.",
    },
    adaptacoes: {},
  },

  "Omelete recheada de espinafre e queijo": {
    tempo: "8 min", porcao: "1 omelete",
    ingredientes: ["2 ovos", "1 punhado espinafre", "30g queijo branco light em cubos", "1/2 tomate picado", "1 col. chá azeite", "Pimenta-do-reino"],
    preparo: [
      "Refogue rapidamente o espinafre no azeite. Reserve.",
      "Bata os ovos com pimenta. Despeje na frigideira aquecida.",
      "Quando começar a firmar, distribua espinafre, queijo e tomate em metade.",
      "Dobre ao meio e cozinhe mais 1 min.",
    ],
    dica: "Omelete recheada é refeição rápida e nutritiva — proteína de alto valor + ferro do espinafre.",
    recomendado: ["diabetes", "anemia", "colesterol"],
    alertas: {},
    adaptacoes: {},
  },

  "Salada caprese com frango": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["100g peito de frango grelhado em fatias", "1 tomate em rodelas", "60g mussarela de búfala light", "Folhas de manjericão fresco", "1 col. chá azeite", "Pimenta-do-reino"],
    preparo: [
      "Em prato, alterne fatias de tomate, mussarela e manjericão.",
      "Disponha o frango grelhado ao lado.",
      "Regue com azeite e pimenta.",
    ],
    dica: "Refeição leve e elegante — proteína magra, cálcio e licopeno do tomate.",
    recomendado: ["diabetes", "esteatose"],
    alertas: {
      hipertensao: "Use mussarela light com pouco sódio.",
      lactose: "Substitua a mussarela por tofu temperado.",
    },
    adaptacoes: {},
  },

  "Sanduíche aberto de pasta de atum": {
    tempo: "8 min", porcao: "2 fatias",
    ingredientes: ["2 fatias pão integral", "100g atum em água", "1 col. sopa iogurte natural", "Cebolinha", "Mostarda dijon", "1/2 pepino em rodelas finas"],
    preparo: [
      "Misture o atum com iogurte, cebolinha e mostarda.",
      "Toste levemente o pão integral.",
      "Espalhe a pasta de atum e cubra com pepino.",
    ],
    dica: "Versão sem maionese — iogurte natural dá cremosidade com menos gordura. Rico em ômega-3.",
    recomendado: ["colesterol", "esteatose", "diabetes"],
    alertas: {
      celiaca: "Use pão sem glúten.",
    },
    adaptacoes: {},
  },

  "Tigela de iogurte com frutas e granola": {
    tempo: "5 min", porcao: "1 tigela",
    ingredientes: ["1 pote iogurte natural desnatado (170g)", "1 col. sopa granola sem açúcar", "1/2 banana em rodelas", "5 morangos cortados", "1 col. chá sementes de chia", "Canela em pó"],
    preparo: [
      "Despeje o iogurte na tigela.",
      "Cubra com banana, morangos, granola e chia.",
      "Polvilhe canela.",
    ],
    dica: "Café da manhã ou lanche pronto em 5 min — proteína, probióticos, fibras e antioxidantes.",
    recomendado: ["colesterol", "esteatose", "anemia"],
    alertas: {
      diabetes: "Use granola sem açúcar e meia banana.",
    },
    adaptacoes: {},
  },

  "Tortilha de claras com cogumelos": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["3 claras + 1 ovo inteiro", "100g cogumelos paris fatiados", "1/2 cebola picada", "Salsinha", "1 col. chá azeite", "Pimenta-do-reino"],
    preparo: [
      "Refogue cebola e cogumelos no azeite até dourar.",
      "Bata claras com ovo, salsinha e pimenta.",
      "Despeje sobre os cogumelos e cozinhe em fogo baixo até firmar.",
      "Vire com auxílio de prato e doure o outro lado.",
    ],
    dica: "Alternativa low-fat ao omelete tradicional — claras dão proteína sem o colesterol da gema.",
    recomendado: ["colesterol", "esteatose", "diabetes"],
    alertas: {},
    adaptacoes: {},
  },

  "Salada de quinoa express": {
    tempo: "12 min", porcao: "1 prato",
    ingredientes: ["1/2 xíc. quinoa cozida", "1/2 pepino em cubos", "1 tomate picado", "Hortelã picada", "Suco de 1/2 limão", "1 col. chá azeite", "Sal e pimenta"],
    preparo: [
      "Em uma tigela, misture a quinoa já cozida (use a do dia anterior).",
      "Adicione pepino, tomate e hortelã.",
      "Tempere com limão, azeite, sal e pimenta.",
    ],
    dica: "Quinoa é proteína completa vegetal. Salada refrescante e prática para verão.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {},
    adaptacoes: {},
  },

  "Tapioca recheada com frango e queijo": {
    tempo: "10 min", porcao: "1 unidade",
    ingredientes: ["3 col. sopa goma de tapioca", "80g frango desfiado", "30g queijo branco ralado", "Cebolinha picada", "Pimenta-do-reino"],
    preparo: [
      "Aqueça frigideira antiaderente. Espalhe a goma para formar disco.",
      "Quando soltar do fundo, vire.",
      "Recheie com frango, queijo e cebolinha em uma metade.",
      "Dobre ao meio e cozinhe mais 1 min.",
    ],
    dica: "Receita rápida sem glúten — boa para celíacos. Goma de tapioca é energia rápida.",
    recomendado: ["celiaca"],
    alertas: {
      diabetes: "Tapioca é alto índice glicêmico — limite a 3 col. sopa e combine com proteína (já tem).",
    },
    adaptacoes: {},
  },

  "Pasta de ovo com abacate": {
    tempo: "8 min", porcao: "2 porções",
    ingredientes: ["2 ovos cozidos", "1/2 abacate maduro", "1 col. sopa iogurte natural", "Cebolinha", "Suco de 1/2 limão", "Pimenta-do-reino"],
    preparo: [
      "Amasse os ovos cozidos com garfo.",
      "Adicione abacate amassado, iogurte, cebolinha e limão.",
      "Tempere com pimenta e misture até cremoso.",
    ],
    dica: "Substitui a maionese tradicional — gordura boa do abacate + proteína do ovo. Use em sanduíches ou torradas.",
    recomendado: ["colesterol", "esteatose", "diabetes"],
    alertas: {},
    adaptacoes: {},
  },

  "Macarrão integral com tomate cereja e atum": {
    tempo: "15 min", porcao: "1 prato",
    ingredientes: ["80g macarrão integral cru", "100g atum em água", "10 tomatinhos cereja cortados ao meio", "1 dente alho", "Manjericão fresco", "1 col. chá azeite", "Pimenta-do-reino"],
    preparo: [
      "Cozinhe o macarrão integral conforme embalagem (al dente).",
      "Em frigideira, doure o alho no azeite e adicione os tomatinhos.",
      "Refogue 3 min até começarem a desfazer.",
      "Junte o atum escorrido e o macarrão escorrido.",
      "Finalize com manjericão.",
    ],
    dica: "Massa integral + proteína = refeição completa em 15 min. Tomate cozido tem mais licopeno (antioxidante).",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      celiaca: "Use macarrão sem glúten.",
    },
    adaptacoes: {},
  },

  "Smoothie verde detox": {
    tempo: "5 min", porcao: "1 copo",
    ingredientes: ["1 punhado de couve", "1/2 maçã verde", "1/2 pepino", "Suco de 1 limão", "1 fatia gengibre", "200ml água gelada", "Cubos de gelo"],
    preparo: [
      "Bata todos os ingredientes no liquidificador até ficar homogêneo.",
      "Coe se preferir mais líquido ou sirva integral.",
    ],
    dica: "Bebida detox cheia de antioxidantes e fibras. Excelente para começar o dia ou como pré-treino.",
    recomendado: ["esteatose", "colesterol", "diabetes"],
    alertas: {
      tireoide: "Couve crua tem goitrogênicos — alterne com espinafre.",
      gastrite: "Limão e gengibre podem irritar — substitua por hortelã.",
    },
    adaptacoes: {},
  },

  "Bruschetta de tomate e ricota": {
    tempo: "10 min", porcao: "2 unidades",
    ingredientes: ["2 fatias pão integral", "30g ricota", "1 tomate picado", "Manjericão fresco", "1 dente alho", "1 col. chá azeite"],
    preparo: [
      "Toste o pão e esfregue o alho cortado nele.",
      "Espalhe a ricota.",
      "Cubra com tomate temperado com azeite e manjericão.",
    ],
    dica: "Lanche italiano leve — fibras, cálcio e licopeno. Ideal para tarde.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      lactose: "Use ricota sem lactose ou pasta de grão-de-bico.",
      celiaca: "Use pão sem glúten.",
    },
    adaptacoes: {},
  },

  "Salada de grão-de-bico com vegetais": {
    tempo: "12 min", porcao: "1 prato",
    ingredientes: ["1/2 xíc. grão-de-bico cozido", "1 tomate picado", "1/2 pepino", "1/4 cebola roxa", "Salsinha", "Suco de 1 limão", "1 col. chá azeite", "Cominho em pó"],
    preparo: [
      "Misture todos os ingredientes em uma tigela.",
      "Tempere com azeite, limão, cominho, sal e pimenta.",
      "Deixe descansar 5 min antes de servir.",
    ],
    dica: "Refeição vegetariana completa — proteína vegetal, fibras e gorduras boas.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      gota: "Grão-de-bico tem purinas moderadas — modere a porção.",
    },
    adaptacoes: {},
  },

  /* ============================================================
     FITNESS & FUNCIONAIS — pré/pós treino, alta proteína
  ============================================================ */
  "Panqueca proteica de aveia e clara": {
    tempo: "10 min", porcao: "2 panquecas",
    ingredientes: ["3 col. sopa aveia em flocos", "3 claras de ovo", "1/2 banana amassada", "Canela", "1 col. chá óleo de coco", "Essência de baunilha"],
    preparo: [
      "Bata todos os ingredientes no liquidificador até obter massa.",
      "Aqueça frigideira antiaderente com óleo de coco.",
      "Despeje porções e cozinhe 2 min de cada lado.",
    ],
    dica: "Pré ou pós-treino ideal — carboidrato complexo (aveia) + proteína (claras). Sem farinha refinada nem açúcar.",
    recomendado: ["diabetes", "esteatose", "colesterol"],
    alertas: {
      celiaca: "Use aveia certificada sem glúten.",
    },
    adaptacoes: {},
  },

  "Smoothie pós-treino": {
    tempo: "5 min", porcao: "1 copo grande",
    ingredientes: ["1 banana", "200ml leite desnatado ou bebida vegetal", "1 col. sopa whey protein (opcional)", "1 col. sopa aveia", "1 col. chá pasta de amendoim", "Canela"],
    preparo: [
      "Bata todos os ingredientes no liquidificador.",
      "Sirva imediatamente.",
    ],
    dica: "Janela anabólica — combinação ideal de proteína e carboidrato após treino.",
    recomendado: ["esteatose", "colesterol", "anemia"],
    alertas: {
      diabetes: "Use bebida vegetal sem açúcar e omita whey adoçado.",
      lactose: "Substitua leite por bebida vegetal.",
    },
    adaptacoes: {},
  },

  "Marmita fit de frango com batata-doce": {
    tempo: "30 min", porcao: "1 marmita",
    ingredientes: ["150g peito de frango em cubos", "150g batata-doce em rodelas", "1 punhado brócolis em buquês", "1 dente alho", "1 col. chá azeite", "Cúrcuma e páprica", "Limão"],
    preparo: [
      "Tempere o frango com alho, cúrcuma, páprica e limão.",
      "Cozinhe a batata-doce no vapor por 10 min.",
      "Cozinhe o brócolis no vapor por 5 min.",
      "Grelhe o frango em frigideira com azeite até dourar.",
      "Monte a marmita: divida em 3 partes.",
    ],
    dica: "Marmita fit clássica — proteína magra, carboidrato complexo de baixo IG e vegetais. Macros perfeitos.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      tireoide: "Brócolis tem goitrogênicos — alterne com abobrinha.",
    },
    adaptacoes: {},
  },

  "Bowl proteico de quinoa e ovo": {
    tempo: "12 min", porcao: "1 bowl",
    ingredientes: ["1/2 xíc. quinoa cozida", "2 ovos pochê ou cozidos", "1/2 abacate em fatias", "1 punhado folhas verdes", "1/2 tomate", "Sementes de gergelim", "1 col. chá azeite"],
    preparo: [
      "Disponha a quinoa cozida na tigela.",
      "Adicione os ovos, abacate, folhas e tomate.",
      "Polvilhe gergelim e regue com azeite.",
    ],
    dica: "Bowl super completo — proteína (ovo+quinoa), gorduras boas (abacate) e micronutrientes. Excelente pós-treino.",
    recomendado: ["diabetes", "colesterol", "esteatose", "anemia"],
    alertas: {},
    adaptacoes: {},
  },

  "Mix de castanhas caseiro": {
    tempo: "5 min", porcao: "10 porções de 30g",
    ingredientes: ["100g castanha-do-pará", "100g amêndoas", "100g nozes", "50g sementes de abóbora", "50g sementes de girassol"],
    preparo: [
      "Misture todos os ingredientes em pote hermético.",
      "Porcione 30g por dia em saquinhos para levar.",
    ],
    dica: "Lanche perfeito de meio de manhã ou tarde — gorduras boas, magnésio, selênio. 30g/dia é o ideal.",
    recomendado: ["colesterol", "esteatose", "diabetes"],
    alertas: {
      hipertensao: "Use castanhas sem sal.",
    },
    adaptacoes: {},
  },

  "Iogurte proteico com frutas vermelhas": {
    tempo: "3 min", porcao: "1 pote",
    ingredientes: ["170g iogurte grego natural", "1 punhado mirtilos", "5 morangos", "1 col. sopa aveia", "1 col. chá sementes de chia", "Canela"],
    preparo: [
      "No pote, coloque o iogurte grego.",
      "Cubra com frutas vermelhas, aveia e chia.",
      "Polvilhe canela.",
    ],
    dica: "Snack alta proteína (iogurte grego tem 2x mais que o tradicional). Antioxidantes das frutas vermelhas.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      lactose: "Use iogurte sem lactose ou de coco.",
    },
    adaptacoes: {},
  },

  "Shake de chocolate fit": {
    tempo: "5 min", porcao: "1 copo",
    ingredientes: ["200ml leite desnatado ou bebida vegetal", "1 col. sopa cacau em pó 100%", "1 banana congelada", "1 col. sopa pasta de amendoim", "Gelo"],
    preparo: [
      "Bata todos os ingredientes no liquidificador até cremoso.",
      "Sirva gelado.",
    ],
    dica: "Versão saudável do milkshake — sem açúcar, com gorduras boas e proteína.",
    recomendado: ["esteatose", "colesterol"],
    alertas: {
      diabetes: "Use bebida vegetal sem açúcar e meia banana.",
      lactose: "Substitua leite por bebida vegetal.",
    },
    adaptacoes: {},
  },

  "Salada de atum proteica": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["100g atum em água", "2 ovos cozidos em rodelas", "1/2 xíc. grão-de-bico cozido", "Folhas verdes a gosto", "1/4 cebola roxa", "1 col. chá azeite", "Suco de 1/2 limão"],
    preparo: [
      "Em prato, monte folhas verdes na base.",
      "Distribua atum, ovos, grão-de-bico e cebola.",
      "Tempere com azeite e limão.",
    ],
    dica: "Refeição altíssima em proteína — ideal para definição muscular. Mais de 35g de proteína.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      gota: "Atum + grão-de-bico aumentam purinas — modere.",
    },
    adaptacoes: {},
  },

  "Energy ball de tâmara e cacau": {
    tempo: "10 min", porcao: "8 unidades",
    ingredientes: ["10 tâmaras secas sem caroço", "1/2 xíc. amêndoas", "2 col. sopa cacau em pó 100%", "1 col. sopa aveia", "Coco ralado para empanar"],
    preparo: [
      "Bata tâmaras, amêndoas, cacau e aveia no processador.",
      "Modele bolinhas pequenas com as mãos.",
      "Passe no coco ralado para empanar.",
      "Leve à geladeira por 30 min antes de servir.",
    ],
    dica: "Snack energético natural — sem açúcar adicionado, ótimo pré-treino. Tâmaras dão energia rápida + amêndoas dão saciedade.",
    recomendado: ["esteatose", "colesterol", "anemia"],
    alertas: {
      diabetes: "Tâmaras são doces — limite a 2 unidades por dia.",
    },
    adaptacoes: {},
  },

  "Overnight oats proteico": {
    tempo: "5 min (+ 8h geladeira)", porcao: "1 pote",
    ingredientes: ["3 col. sopa aveia em flocos", "200ml leite desnatado ou bebida vegetal", "1 col. sopa sementes de chia", "1/2 banana em rodelas", "1 col. chá pasta de amendoim", "Canela"],
    preparo: [
      "Em pote, misture aveia, leite e chia.",
      "Cubra e leve à geladeira por 8h ou durante a noite.",
      "Pela manhã, finalize com banana, pasta de amendoim e canela.",
    ],
    dica: "Café da manhã pronto na noite anterior — perfeito para quem tem pressa. Fibras + proteína = saciedade.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      lactose: "Use bebida vegetal.",
      celiaca: "Use aveia certificada sem glúten.",
    },
    adaptacoes: {},
  },

  "Frango grelhado com pesto de manjericão": {
    tempo: "15 min", porcao: "1 prato",
    ingredientes: ["150g peito de frango", "1 punhado manjericão fresco", "1 col. sopa pinoli ou castanha-do-pará", "1 dente alho", "2 col. sopa azeite", "1 col. sopa parmesão ralado", "Limão"],
    preparo: [
      "Tempere o frango com limão, sal e pimenta.",
      "Grelhe em frigideira até dourar dos dois lados (12 min).",
      "Bata manjericão, pinoli, alho, azeite e parmesão no processador.",
      "Sirva o frango regado com o pesto.",
    ],
    dica: "Combinação clássica fit — proteína magra + gorduras boas. Pesto caseiro sem conservantes.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      lactose: "Omita o parmesão ou use levedura nutricional.",
    },
    adaptacoes: {},
  },

  "Snack de pepino com homus": {
    tempo: "5 min", porcao: "1 porção",
    ingredientes: ["1 pepino em palitos", "3 col. sopa homus de grão-de-bico", "Páprica defumada"],
    preparo: [
      "Corte o pepino em palitos.",
      "Coloque o homus em uma tigela e polvilhe páprica.",
      "Use o pepino para mergulhar no homus.",
    ],
    dica: "Lanche super leve e nutritivo — fibras, proteína vegetal e baixíssimas calorias.",
    recomendado: ["diabetes", "colesterol", "esteatose", "hipertensao"],
    alertas: {},
    adaptacoes: {},
  },

  "Vitamina de aveia e morango": {
    tempo: "5 min", porcao: "1 copo",
    ingredientes: ["200ml leite desnatado ou bebida vegetal", "5 morangos", "2 col. sopa aveia", "1 col. chá pasta de amendoim", "Canela"],
    preparo: [
      "Bata todos os ingredientes no liquidificador.",
      "Sirva gelado.",
    ],
    dica: "Lanche da tarde nutritivo — proteína, fibras e antioxidantes. Sem açúcar adicionado.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      lactose: "Use bebida vegetal.",
    },
    adaptacoes: {},
  },

  "Salmão grelhado com aspargos": {
    tempo: "15 min", porcao: "1 prato",
    ingredientes: ["150g filé de salmão", "1 maço de aspargos", "1 dente alho", "1 col. chá azeite", "Limão", "Pimenta-do-reino", "Endro fresco"],
    preparo: [
      "Tempere o salmão com sal, pimenta e limão.",
      "Grelhe em frigideira por 4 min de cada lado.",
      "Refogue aspargos no azeite com alho por 5 min.",
      "Sirva o salmão sobre os aspargos com endro.",
    ],
    dica: "Fonte premium de ômega-3 (salmão) e ácido fólico (aspargos). Refeição anti-inflamatória.",
    recomendado: ["colesterol", "esteatose", "anemia"],
    alertas: {
      gota: "Salmão tem purinas moderadas — modere a frequência.",
    },
    adaptacoes: {},
  },

  "Beterraba assada com queijo de cabra": {
    tempo: "35 min (10 ativos)", porcao: "1 prato",
    ingredientes: ["1 beterraba média em fatias", "30g queijo de cabra", "1 punhado de rúcula", "1 col. sopa nozes picadas", "1 col. chá azeite", "1 col. chá vinagre balsâmico", "Mel (opcional)"],
    preparo: [
      "Asse fatias de beterraba a 200°C por 25 min.",
      "Em prato, monte rúcula, beterraba, queijo de cabra e nozes.",
      "Tempere com azeite, balsâmico e fio de mel.",
    ],
    dica: "Salada gourmet rica em ferro (beterraba), proteína (queijo) e gorduras boas (nozes). Perfeita para jantar.",
    recomendado: ["anemia", "colesterol", "esteatose"],
    alertas: {
      diabetes: "Beterraba tem IG médio — combine com proteína e omita o mel.",
      lactose: "Use queijo de cabra sem lactose ou tofu.",
    },
    adaptacoes: {},
  },

  "Sopa proteica de lentilha": {
    tempo: "30 min", porcao: "1 tigela grande",
    ingredientes: ["1/2 xíc. lentilha", "100g peito de frango em cubos", "1 cenoura picada", "1/2 cebola", "1 dente alho", "Cúrcuma", "Cominho", "1 col. chá azeite", "Salsinha"],
    preparo: [
      "Cozinhe a lentilha em água até ficar al dente (15 min).",
      "Refogue cebola, alho e frango no azeite até dourar.",
      "Adicione cenoura, lentilha cozida, cúrcuma e cominho.",
      "Cubra com água, cozinhe 10 min.",
      "Finalize com salsinha.",
    ],
    dica: "Refeição super proteica (frango + lentilha = ~40g de proteína). Excelente para jantar pós-treino.",
    recomendado: ["diabetes", "colesterol", "esteatose", "anemia"],
    alertas: {
      gota: "Lentilha tem purinas — modere se tiver crise.",
    },
    adaptacoes: {},
  },

  "Wrap proteico de ovo e espinafre": {
    tempo: "8 min", porcao: "1 wrap",
    ingredientes: ["1 tortilha integral", "2 ovos mexidos", "1 punhado espinafre refogado", "1 fatia queijo branco light", "1 tomate em rodelas"],
    preparo: [
      "Faça os ovos mexidos com pitada de pimenta.",
      "Refogue rapidamente o espinafre.",
      "Aqueça a tortilha. Recheie com ovos, espinafre, queijo e tomate.",
      "Enrole apertando bem.",
    ],
    dica: "Wrap proteico para café da manhã ou pós-treino — ovo é proteína de altíssimo valor biológico.",
    recomendado: ["diabetes", "anemia", "colesterol"],
    alertas: {
      celiaca: "Use tortilha sem glúten.",
      lactose: "Omita o queijo ou use sem lactose.",
    },
    adaptacoes: {},
  },

  "Bowl de açaí proteico": {
    tempo: "5 min", porcao: "1 bowl",
    ingredientes: ["100g polpa de açaí sem açúcar", "1/2 banana", "1 col. sopa whey protein (opcional)", "1 col. sopa pasta de amendoim", "1 col. sopa granola sem açúcar", "Frutas vermelhas a gosto"],
    preparo: [
      "Bata polpa de açaí, banana e whey no liquidificador (use pouquíssimo líquido).",
      "Despeje em tigela.",
      "Cubra com pasta de amendoim, granola e frutas vermelhas.",
    ],
    dica: "Açaí natural sem xarope tem antioxidantes e gorduras boas. Versão proteica com whey é ótima pós-treino.",
    recomendado: ["esteatose", "colesterol", "anemia"],
    alertas: {
      diabetes: "Use polpa pura sem açúcar e omita o whey adoçado.",
    },
    adaptacoes: {},
  },

  "Frango desfiado fit (refeição base)": {
    tempo: "25 min", porcao: "4 porções",
    ingredientes: ["500g peito de frango", "1 cebola", "2 dentes alho", "Cúrcuma", "Páprica", "Orégano", "1 col. chá azeite", "Suco de 1 limão"],
    preparo: [
      "Cozinhe o frango em água com cebola, alho e ervas por 20 min.",
      "Reserve o caldo.",
      "Desfie o frango com 2 garfos.",
      "Refogue rapidamente em azeite com temperos.",
      "Use 100-120g por refeição.",
    ],
    dica: "Receita-base para a semana — congele em porções e use em wraps, saladas, marmitas. Versátil e prática.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {},
    adaptacoes: {},
  },

  "Sopa creme de abóbora com gengibre": {
    tempo: "25 min", porcao: "1 tigela",
    ingredientes: ["300g abóbora cabotiá em cubos", "1 fatia gengibre", "1/2 cebola", "1 dente alho", "Sementes de abóbora", "1 col. chá azeite", "500ml caldo de legumes"],
    preparo: [
      "Refogue cebola, alho e gengibre no azeite.",
      "Adicione abóbora e caldo. Cozinhe até a abóbora ficar macia (15 min).",
      "Bata no liquidificador.",
      "Sirva polvilhada com sementes de abóbora.",
    ],
    dica: "Sopa cremosa naturalmente — sem creme de leite. Abóbora é rica em betacaroteno (antioxidante).",
    recomendado: ["diabetes", "colesterol", "esteatose", "gastrite"],
    alertas: {
      gastrite: "Reduza ou omita o gengibre.",
    },
    adaptacoes: {},
  },

  "Salada de frango com manga": {
    tempo: "12 min", porcao: "1 prato",
    ingredientes: ["120g peito de frango grelhado em tiras", "1/2 manga em cubos", "Folhas verdes a gosto", "1/4 cebola roxa", "Amêndoas laminadas", "1 col. chá azeite", "Suco de 1 limão", "Hortelã"],
    preparo: [
      "Em prato, monte folhas, frango, manga e cebola.",
      "Polvilhe amêndoas e hortelã.",
      "Tempere com azeite e limão.",
    ],
    dica: "Salada agridoce e refrescante — proteína magra, vitamina C (manga) e gorduras boas. Equilibrada.",
    recomendado: ["colesterol", "esteatose"],
    alertas: {
      diabetes: "Manga é doce — use 1/4 unidade pequena.",
    },
    adaptacoes: {},
  },

  "Snack de cenoura com pasta de amendoim": {
    tempo: "3 min", porcao: "1 porção",
    ingredientes: ["1 cenoura média em palitos", "1 col. sopa pasta de amendoim natural"],
    preparo: [
      "Corte a cenoura em palitos.",
      "Use a pasta de amendoim como dip.",
    ],
    dica: "Lanche super simples — fibras + gorduras boas + proteína. Ideal entre refeições.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {},
    adaptacoes: {},
  },

  "Salada cesar light com frango": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["120g frango grelhado em tiras", "Alface americana picada", "2 col. sopa iogurte natural", "1 col. chá mostarda dijon", "1 col. sopa parmesão ralado", "Suco de 1/2 limão", "Croutons integrais (opcional)"],
    preparo: [
      "Misture iogurte, mostarda, parmesão e limão para fazer o molho.",
      "Em prato, monte alface, frango e croutons.",
      "Regue com o molho.",
    ],
    dica: "Versão light do clássico — molho com iogurte em vez de maionese. Reduz gordura sem perder sabor.",
    recomendado: ["diabetes", "colesterol", "esteatose"],
    alertas: {
      lactose: "Use iogurte sem lactose e omita parmesão.",
      celiaca: "Use croutons sem glúten ou omita.",
    },
    adaptacoes: {},
  },
};

/* ============================================================
   SUBSTITUICOES_AUTOMATICAS — dicionário de substituições
   inteligentes aplicadas automaticamente em ingredientes e
   preparo das receitas, conforme as condições do usuário.

   Sistema global — funciona em TODAS as receitas sem precisar
   editar uma por uma.
============================================================ */
const SUBSTITUICOES_AUTOMATICAS = {
  hipertensao: [
    { padrao: /shoyu light/gi,            substituto: "caldo de legumes sem sal" },
    { padrao: /molho shoyu/gi,            substituto: "caldo de legumes sem sal" },
    { padrao: /\bshoyu\b/gi,              substituto: "caldo de legumes sem sal" },
    { padrao: /peito de peru/gi,          substituto: "frango desfiado caseiro" },
    { padrao: /\bpresunto\b/gi,           substituto: "frango desfiado" },
    { padrao: /atum em conserva/gi,       substituto: "atum fresco grelhado" },
    { padrao: /atum em água/gi,           substituto: "atum fresco grelhado" },
    { padrao: /sal a gosto/gi,            substituto: "ervas frescas (sem sal)" },
    { padrao: /\b1 col\. (sopa|chá) de sal\b/gi, substituto: "ervas frescas" },
    { padrao: /azeitonas?/gi,             substituto: "alcaparras (poucas)" },
    { padrao: /cubo de caldo/gi,          substituto: "caldo caseiro sem sal" },
    { padrao: /caldo de carne pronto/gi,  substituto: "caldo caseiro sem sal" },
    { padrao: /\bsalsicha/gi,             substituto: "frango grelhado" },
    { padrao: /\blinguiça/gi,             substituto: "frango temperado" },
    { padrao: /requeijão/gi,              substituto: "ricota fresca caseira" },
  ],
  diabetes: [
    { padrao: /1 col\. (sopa|chá) (de )?mel/gi, substituto: "stevia (a gosto)" },
    { padrao: /\bmel\b/gi,                substituto: "stevia" },
    { padrao: /açúcar mascavo/gi,         substituto: "stevia" },
    { padrao: /açúcar refinado/gi,        substituto: "stevia" },
    { padrao: /açúcar de coco/gi,         substituto: "stevia" },
    { padrao: /\baçúcar\b/gi,             substituto: "stevia (adoçante natural)" },
    { padrao: /banana madura/gi,          substituto: "banana verde (1/2 unidade)" },
    { padrao: /goma de tapioca/gi,        substituto: "aveia em flocos" },
    { padrao: /\btapioca\b/gi,            substituto: "aveia em flocos" },
    { padrao: /arroz branco/gi,           substituto: "arroz integral" },
    { padrao: /pão branco/gi,             substituto: "pão integral" },
    { padrao: /\bmanga\b/gi,              substituto: "morango ou kiwi" },
    { padrao: /goiabada/gi,               substituto: "goiaba in natura" },
    { padrao: /achocolatado/gi,           substituto: "cacau em pó (sem açúcar)" },
    { padrao: /granola/gi,                substituto: "aveia com castanhas" },
    { padrao: /suco de laranja/gi,        substituto: "laranja in natura" },
    { padrao: /suco de uva/gi,            substituto: "água com limão" },
  ],
  lactose: [
    { padrao: /leite desnatado/gi,        substituto: "bebida vegetal de aveia" },
    { padrao: /leite integral/gi,         substituto: "bebida vegetal de aveia" },
    { padrao: /leite morno/gi,            substituto: "bebida vegetal morna" },
    { padrao: /\bleite\b/gi,              substituto: "bebida vegetal" },
    { padrao: /iogurte natural desnatado/gi, substituto: "iogurte de coco sem lactose" },
    { padrao: /iogurte natural/gi,        substituto: "iogurte de coco sem lactose" },
    { padrao: /iogurte grego/gi,          substituto: "iogurte sem lactose" },
    { padrao: /\biogurte\b/gi,            substituto: "iogurte sem lactose" },
    { padrao: /coalhada/gi,               substituto: "iogurte de coco sem lactose" },
    { padrao: /requeijão( light)?/gi,     substituto: "pasta de grão-de-bico (homus)" },
    { padrao: /queijo cottage/gi,         substituto: "tofu sedoso amassado" },
    { padrao: /queijo branco( light)?/gi, substituto: "tofu temperado" },
    { padrao: /\bricota\b/gi,             substituto: "tofu sedoso amassado" },
    { padrao: /queijo minas/gi,           substituto: "queijo sem lactose" },
    { padrao: /\bmanteiga\b/gi,           substituto: "azeite" },
    { padrao: /creme de leite/gi,         substituto: "creme de coco" },
    { padrao: /achocolatado/gi,           substituto: "cacau com bebida vegetal" },
    { padrao: /cappuccino/gi,             substituto: "café com bebida vegetal" },
    { padrao: /pão de queijo/gi,          substituto: "tapioca recheada com tofu" },
    { padrao: /kefir/gi,                  substituto: "iogurte de coco sem lactose" },
  ],
  celiaca: [
    { padrao: /shoyu light/gi,            substituto: "tamari sem glúten" },
    { padrao: /molho shoyu/gi,            substituto: "tamari sem glúten" },
    { padrao: /\bshoyu\b/gi,              substituto: "tamari sem glúten" },
    { padrao: /aveia em flocos/gi,        substituto: "aveia certificada sem glúten" },
    { padrao: /\baveia\b/gi,              substituto: "aveia certificada sem glúten" },
    { padrao: /pão integral/gi,           substituto: "pão sem glúten" },
    { padrao: /pão branco/gi,             substituto: "pão sem glúten" },
    { padrao: /pão de queijo/gi,          substituto: "pão de queijo (já é sem glúten)" },
    { padrao: /\bpão\b/gi,                substituto: "pão sem glúten" },
    { padrao: /torrada integral/gi,       substituto: "torrada sem glúten" },
    { padrao: /\btorrada\b/gi,            substituto: "torrada sem glúten" },
    { padrao: /macarrão integral/gi,      substituto: "macarrão sem glúten" },
    { padrao: /\bmacarrão\b/gi,           substituto: "macarrão sem glúten" },
    { padrao: /farinha de trigo/gi,       substituto: "farinha de arroz" },
    { padrao: /\bgranola\b/gi,            substituto: "granola sem glúten" },
    { padrao: /\bcuscuz\b/gi,             substituto: "cuscuz de milho (sem glúten)" },
  ],
  colesterol: [
    { padrao: /\bmanteiga\b/gi,           substituto: "azeite" },
    { padrao: /creme de leite/gi,         substituto: "iogurte natural desnatado" },
    { padrao: /\bbacon\b/gi,              substituto: "tofu defumado" },
    { padrao: /\blinguiça/gi,             substituto: "peito de frango temperado" },
    { padrao: /óleo de coco/gi,           substituto: "azeite de oliva" },
    { padrao: /lombo suíno/gi,            substituto: "peito de frango" },
    { padrao: /carne moída comum/gi,      substituto: "carne moída magra (patinho)" },
  ],
  esteatose: [
    { padrao: /\bmanteiga\b/gi,           substituto: "azeite" },
    { padrao: /creme de leite/gi,         substituto: "iogurte natural desnatado" },
    { padrao: /\bbacon\b/gi,              substituto: "frango grelhado" },
    { padrao: /\blinguiça/gi,             substituto: "frango temperado" },
    { padrao: /\bfrito\b/gi,              substituto: "grelhado" },
    { padrao: /fritar/gi,                 substituto: "grelhar" },
    { padrao: /óleo de soja/gi,           substituto: "azeite de oliva" },
    { padrao: /\bfritura\b/gi,            substituto: "grelhado ou assado" },
    { padrao: /açúcar refinado/gi,        substituto: "stevia" },
    { padrao: /\baçúcar\b/gi,             substituto: "stevia" },
    { padrao: /refrigerante/gi,           substituto: "água com limão" },
  ],
  gastrite: [
    { padrao: /\bcafé\b/gi,               substituto: "chá de camomila" },
    { padrao: /café com leite/gi,         substituto: "chá de camomila" },
    { padrao: /limão espremido/gi,        substituto: "(omitir)" },
    { padrao: /suco de limão/gi,          substituto: "(omitir o limão)" },
    { padrao: /\blimão\b/gi,              substituto: "(omitir o limão)" },
    { padrao: /tomate cru/gi,             substituto: "tomate cozido (sem pele)" },
    { padrao: /cebola crua/gi,            substituto: "cebola refogada" },
    { padrao: /\bpimenta\b/gi,            substituto: "(sem pimenta)" },
    { padrao: /\bvinagre\b/gi,            substituto: "(sem vinagre)" },
    { padrao: /\bfrito\b/gi,              substituto: "grelhado" },
    { padrao: /fritura/gi,                substituto: "grelhado" },
    { padrao: /\babacaxi\b/gi,            substituto: "mamão" },
    { padrao: /\blaranja\b/gi,            substituto: "pera" },
    { padrao: /\bgengibre\b/gi,           substituto: "(sem gengibre)" },
    { padrao: /chocolate/gi,              substituto: "alfarroba" },
  ],
  gota: [
    { padrao: /sardinha/gi,               substituto: "tilápia" },
    { padrao: /\blentilha\b/gi,           substituto: "feijão branco" },
    { padrao: /grão-de-bico/gi,           substituto: "feijão branco" },
    { padrao: /\bfígado\b/gi,             substituto: "peito de frango" },
    { padrao: /carne vermelha/gi,         substituto: "peito de frango" },
    { padrao: /patinho/gi,                substituto: "peito de frango" },
    { padrao: /carne moída/gi,            substituto: "frango desfiado" },
  ],
  tireoide: [
    { padrao: /\bcouve\b/gi,              substituto: "espinafre" },
    { padrao: /brócolis/gi,               substituto: "abobrinha" },
    { padrao: /couve-flor/gi,             substituto: "abóbora" },
    { padrao: /\brepolho\b/gi,            substituto: "alface" },
    { padrao: /\bedamame\b/gi,            substituto: "ervilha" },
  ],
  anemia: [
    { padrao: /chá preto/gi,              substituto: "suco de laranja (potencializa absorção de ferro)" },
    { padrao: /chá verde/gi,              substituto: "suco de laranja" },
    { padrao: /café com leite/gi,         substituto: "suco de laranja com gengibre" },
  ],
};

/* ============================================================
   SUBSTITUICOES_ECONOMICAS — quando o usuário ativa o "Modo
   Econômico", troca ingredientes caros/exóticos por equivalentes
   nutricionais mais acessíveis. Funciona em todas as receitas.
============================================================ */
const SUBSTITUICOES_ECONOMICAS = [
  /* Cereais e grãos exóticos → equivalentes brasileiros */
  { padrao: /\bquinoa\b/gi,                substituto: "arroz integral" },
  { padrao: /\bcuscuz marroquino\b/gi,     substituto: "cuscuz de milho" },

  /* Sementes premium → versões baratas */
  { padrao: /\bchia\b/gi,                  substituto: "linhaça moída" },
  { padrao: /sementes de chia/gi,          substituto: "linhaça moída" },

  /* Oleaginosas caras → amendoim */
  { padrao: /\bamêndoas?\b/gi,             substituto: "amendoim torrado sem sal" },
  { padrao: /\bamendoas?\b/gi,             substituto: "amendoim torrado sem sal" },
  { padrao: /\bnozes?\b/gi,                substituto: "amendoim torrado sem sal" },
  { padrao: /castanha de caju/gi,          substituto: "amendoim torrado" },
  { padrao: /castanha-do-pará/gi,          substituto: "amendoim torrado" },
  { padrao: /castanha do pará/gi,          substituto: "amendoim torrado" },
  { padrao: /\bpistache\b/gi,              substituto: "amendoim torrado" },
  { padrao: /\bavelã\b/gi,                 substituto: "amendoim torrado" },
  { padrao: /\bmacadâmia\b/gi,             substituto: "amendoim torrado" },

  /* Frutas secas premium */
  { padrao: /\btâmaras?\b/gi,              substituto: "banana passa" },
  { padrao: /\bcranberry\b/gi,             substituto: "passas comuns" },
  { padrao: /\bblueberry\b/gi,             substituto: "amora ou jabuticaba (na safra)" },
  { padrao: /\bmirtilo\b/gi,               substituto: "amora" },
  { padrao: /\bframboesa\b/gi,             substituto: "morango" },

  /* Peixes nobres → peixes acessíveis */
  { padrao: /\bsalmão\b/gi,                substituto: "sardinha fresca" },
  { padrao: /\bbacalhau\b/gi,              substituto: "tilápia" },
  { padrao: /\btruta\b/gi,                 substituto: "tilápia" },
  { padrao: /\batum fresco\b/gi,           substituto: "sardinha fresca" },

  /* Laticínios premium → equivalentes */
  { padrao: /iogurte grego/gi,             substituto: "iogurte natural coado em peneira" },
  { padrao: /queijo cottage/gi,            substituto: "ricota fresca" },
  { padrao: /cream cheese/gi,              substituto: "ricota batida" },
  { padrao: /queijo brie/gi,               substituto: "queijo minas" },
  { padrao: /queijo parmesão/gi,           substituto: "queijo ralado comum" },
  { padrao: /queijo gorgonzola/gi,         substituto: "queijo minas temperado" },

  /* Vegetais caros → equivalentes nacionais */
  { padrao: /\baspargos?\b/gi,             substituto: "vagem" },
  { padrao: /\balcachofra\b/gi,            substituto: "couve-flor" },
  { padrao: /cogumelo paris/gi,            substituto: "champignon em conserva" },
  { padrao: /shiitake/gi,                  substituto: "champignon em conserva" },
  { padrao: /\bedamame\b/gi,               substituto: "ervilha congelada" },
  { padrao: /\brúcula\b/gi,                substituto: "alface" },
  { padrao: /\bagrião\b/gi,                substituto: "alface" },

  /* Industrializados caros → versões caseiras */
  { padrao: /\bgranola\b/gi,               substituto: "aveia em flocos com canela (caseiro)" },
  { padrao: /pasta de amendoim industrial/gi, substituto: "amendoim batido caseiro" },
  { padrao: /pasta de amendoim/gi,         substituto: "amendoim batido (caseiro)" },
  { padrao: /\bwhey protein\b/gi,          substituto: "ovo ou frango (proteína natural)" },
  { padrao: /barra de cereal/gi,           substituto: "banana com aveia" },

  /* Óleos caros → azeite comum */
  { padrao: /óleo de coco/gi,              substituto: "azeite comum" },
  { padrao: /óleo de abacate/gi,           substituto: "azeite comum" },
  { padrao: /azeite extra virgem/gi,       substituto: "azeite comum" },

  /* Especiarias raras */
  { padrao: /\baçafrão\b/gi,               substituto: "cúrcuma" },
  { padrao: /flor de sal/gi,               substituto: "sal comum (pouco)" },
];

/* ============================================================
   CUSTO_INGREDIENTES — classifica ingredientes em níveis de
   custo. Usado para calcular o "preço" estimado de cada receita.
   Níveis: 1 (barato), 2 (médio), 3 (caro)
============================================================ */
const CUSTO_INGREDIENTES = [
  // CAROS (peso 3)
  { padrao: /\bquinoa\b/i,        peso: 3 },
  { padrao: /\bsalmão\b/i,        peso: 3 },
  { padrao: /\bbacalhau\b/i,      peso: 3 },
  { padrao: /\btruta\b/i,         peso: 3 },
  { padrao: /\bamêndoas?\b/i,     peso: 3 },
  { padrao: /castanha de caju/i,  peso: 3 },
  { padrao: /castanha[- ]do[- ]pará/i, peso: 3 },
  { padrao: /\bnozes?\b/i,        peso: 3 },
  { padrao: /\bpistache\b/i,      peso: 3 },
  { padrao: /\btâmaras?\b/i,      peso: 3 },
  { padrao: /\bcranberry\b/i,     peso: 3 },
  { padrao: /\bblueberry\b/i,     peso: 3 },
  { padrao: /\bmirtilo\b/i,       peso: 3 },
  { padrao: /\bframboesa\b/i,     peso: 3 },
  { padrao: /\baspargos?\b/i,     peso: 3 },
  { padrao: /\balcachofra\b/i,    peso: 3 },
  { padrao: /shiitake/i,          peso: 3 },
  { padrao: /iogurte grego/i,     peso: 3 },
  { padrao: /queijo cottage/i,    peso: 3 },
  { padrao: /queijo brie/i,       peso: 3 },
  { padrao: /queijo gorgonzola/i, peso: 3 },
  { padrao: /\bwhey\b/i,          peso: 3 },
  { padrao: /óleo de coco/i,      peso: 3 },
  { padrao: /óleo de abacate/i,   peso: 3 },
  { padrao: /azeite extra virgem/i, peso: 3 },
  { padrao: /\baçafrão\b/i,       peso: 3 },

  // MÉDIOS (peso 2)
  { padrao: /\bchia\b/i,          peso: 2 },
  { padrao: /\babacate\b/i,       peso: 2 },
  { padrao: /\bgranola\b/i,       peso: 2 },
  { padrao: /pasta de amendoim/i, peso: 2 },
  { padrao: /\baveia\b/i,         peso: 2 },
  { padrao: /\bquinoa\b/i,        peso: 2 },
  { padrao: /\bgrão-de-bico\b/i,  peso: 2 },
  { padrao: /\blentilha\b/i,      peso: 2 },
  { padrao: /\bmorango\b/i,       peso: 2 },
  { padrao: /\buva\b/i,           peso: 2 },
  { padrao: /\bkiwi\b/i,          peso: 2 },
  { padrao: /\btilápia\b/i,       peso: 2 },
  { padrao: /\batum\b/i,          peso: 2 },
  { padrao: /peito de peru/i,     peso: 2 },
  { padrao: /\bricota\b/i,        peso: 2 },
  { padrao: /\bbrócolis\b/i,      peso: 2 },
  { padrao: /\brúcula\b/i,        peso: 2 },
  { padrao: /\bagrião\b/i,        peso: 2 },
  { padrao: /linhaça/i,           peso: 2 },

  // O resto é considerado barato (peso 1) por padrão
];

/* ============================================================
   calcularCustoReceita — retorna { nivel: 1|2|3, simbolo: '$'... }
============================================================ */
export function calcularCustoReceita(receita) {
  if (!receita || !Array.isArray(receita.ingredientes)) {
    return { nivel: 1, simbolo: "💰", label: "Barata" };
  }

  let pontos = 0;
  let qtdCaros = 0;

  for (const ing of receita.ingredientes) {
    let pesoMaximo = 1;
    for (const { padrao, peso } of CUSTO_INGREDIENTES) {
      if (padrao.test(ing) && peso > pesoMaximo) {
        pesoMaximo = peso;
      }
    }
    pontos += pesoMaximo;
    if (pesoMaximo === 3) qtdCaros += 1;
  }

  const media = pontos / receita.ingredientes.length;
  // Se tem 2+ ingredientes caros OU média alta → caro
  if (qtdCaros >= 2 || media >= 2.0) {
    return { nivel: 3, simbolo: "💰💰💰", label: "Cara" };
  }
  if (qtdCaros >= 1 || media >= 1.4) {
    return { nivel: 2, simbolo: "💰💰", label: "Média" };
  }
  return { nivel: 1, simbolo: "💰", label: "Barata" };
}

/* ============================================================
   aplicarSubstituicoesEconomicas — aplica regras de modo
   econômico em um texto (ingrediente ou preparo).
============================================================ */
function aplicarSubstituicoesEconomicas(texto) {
  let resultado = texto;
  let substituido = false;
  for (const { padrao, substituto } of SUBSTITUICOES_ECONOMICAS) {
    if (padrao.test(resultado)) {
      resultado = resultado.replace(padrao, substituto);
      substituido = true;
    }
  }
  return { texto: resultado, substituido };
}

/* ============================================================
   aplicarSubstituicoes — aplica padrões automaticamente em
   uma string (ingrediente ou passo de preparo) baseado nas
   condições do usuário. Retorna { texto, substituido }.
============================================================ */
function aplicarSubstituicoes(texto, condicoes) {
  let resultado = texto;
  let substituido = false;

  for (const c of condicoes) {
    const regras = SUBSTITUICOES_AUTOMATICAS[c];
    if (!regras) continue;

    for (const { padrao, substituto } of regras) {
      if (padrao.test(resultado)) {
        resultado = resultado.replace(padrao, substituto);
        substituido = true;
      }
    }
  }

  return { texto: resultado, substituido };
}

/* ============================================================
   obterReceita — busca a receita base pelo nome
============================================================ */
export function obterReceita(nomeAlimento) {
  if (RECEITAS_DB[nomeAlimento]) return RECEITAS_DB[nomeAlimento];

  const nomeLower = nomeAlimento.toLowerCase();
  const chave = Object.keys(RECEITAS_DB).find((k) => {
    const kLower = k.toLowerCase();
    const palavrasChave = kLower.split(" ").filter((p) => p.length > 4);
    return (
      nomeLower.includes(kLower.split(" ")[0]) ||
      kLower.includes(nomeLower.split(" ")[0]) ||
      palavrasChave.some((palavra) => nomeLower.includes(palavra))
    );
  });

  return chave ? RECEITAS_DB[chave] : null;
}

/* ============================================================
   obterReceitaPersonalizada — receita + dicas baseadas nas
   condições de saúde informadas pelo usuário no onboarding
============================================================ */
export function obterReceitaPersonalizada(nomeAlimento, condicoes, opcoes = {}) {
  const { modoEconomico = false } = opcoes;
  const receita = obterReceita(nomeAlimento);
  if (!receita) return null;

  const custo = calcularCustoReceita(receita);
  const ativas = (condicoes || []).filter((c) => c !== "nenhum");

  // Sem condições ativas: ainda assim aplica modo econômico se ligado
  if (ativas.length === 0 && !modoEconomico) {
    return {
      ...receita,
      alertasPersonalizados: [],
      adaptacoesPersonalizadas: [],
      isRecomendado: false,
      custo,
      modoEconomicoAtivado: false,
    };
  }

  // Estratégia em 3 camadas:
  // 1) Se a receita tem ingredientesAdaptados curados manualmente para a
  //    condição, usa esses (qualidade superior, escrita à mão).
  // 2) Senão, aplica SUBSTITUICOES_AUTOMATICAS por regex — funciona em
  //    todas as 143 receitas sem precisar editar uma a uma.
  let ingredientesFinais = receita.ingredientes;
  let preparoFinal = receita.preparo;
  const condicoesAdaptadas = new Set();

  // Camada 1: ingredientes adaptados manualmente (quando existem)
  for (const c of ativas) {
    if (receita.ingredientesAdaptados?.[c]) {
      ingredientesFinais = receita.ingredientesAdaptados[c];
      preparoFinal = receita.preparoAdaptado?.[c] || preparoFinal;
      condicoesAdaptadas.add(c);
      break; // primeira condição com adaptação curada vence
    }
  }

  // Camada 2: substituições automáticas por padrão (saúde)
  // Aplica em cima do resultado da camada 1 (ou nos ingredientes originais)
  ingredientesFinais = ingredientesFinais.map((ing) => {
    const { texto, substituido } = aplicarSubstituicoes(ing, ativas);
    if (substituido) {
      // Marca todas as condições ativas como adaptadas (não dá pra saber qual regex bateu, mas o efeito é o mesmo)
      ativas.forEach((c) => condicoesAdaptadas.add(c));
    }
    return texto;
  });

  preparoFinal = preparoFinal.map((step) => {
    const { texto, substituido } = aplicarSubstituicoes(step, ativas);
    if (substituido) {
      ativas.forEach((c) => condicoesAdaptadas.add(c));
    }
    return texto;
  });

  // Camada 3: MODO ECONÔMICO — troca ingredientes caros por baratos
  let modoEconomicoAtivado = false;
  if (modoEconomico) {
    ingredientesFinais = ingredientesFinais.map((ing) => {
      const { texto, substituido } = aplicarSubstituicoesEconomicas(ing);
      if (substituido) modoEconomicoAtivado = true;
      return texto;
    });
    preparoFinal = preparoFinal.map((step) => {
      const { texto, substituido } = aplicarSubstituicoesEconomicas(step);
      if (substituido) modoEconomicoAtivado = true;
      return texto;
    });
  }

  const jaAdaptado = condicoesAdaptadas.size > 0;

  // Alertas e adaptações: só mostra alertas para condições que NÃO foram
  // adaptadas automaticamente (já resolvemos o problema, não precisa avisar)
  const alertasPersonalizados = [];
  const adaptacoesPersonalizadas = [];

  for (const c of ativas) {
    if (condicoesAdaptadas.has(c)) continue;

    const textoAlerta = receita.alertas?.[c];
    if (textoAlerta) {
      alertasPersonalizados.push({
        condicao: c,
        icone: ICONES_CONDICAO[c] || "⚠️",
        texto: textoAlerta,
      });
    }

    const textoAdaptacao = receita.adaptacoes?.[c];
    if (textoAdaptacao) {
      adaptacoesPersonalizadas.push({
        condicao: c,
        icone: ICONES_CONDICAO[c] || "💡",
        texto: textoAdaptacao,
      });
    }
  }

  const isRecomendado = ativas.some((c) => (receita.recomendado || []).includes(c));

  // Recalcula o custo após as substituições (modo econômico baixou o preço!)
  const custoFinal = modoEconomicoAtivado
    ? calcularCustoReceita({ ...receita, ingredientes: ingredientesFinais })
    : custo;

  return {
    ...receita,
    ingredientes: ingredientesFinais,
    preparo: preparoFinal,
    jaAdaptado,
    alertasPersonalizados,
    adaptacoesPersonalizadas,
    isRecomendado,
    custo: custoFinal,
    custoOriginal: custo,
    modoEconomicoAtivado,
  };
}
