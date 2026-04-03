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
    dica: "Secar bem o tofu é fundamental para dourar em vez de cozinhar no vapor.",
    recomendado: ["colesterol", "esteatose", "diabetes"],
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
    dica: "Use shoyu com menos sódio — dilua 1 col. sopa de shoyu em 1 col. sopa de água para reduzir o sal.",
    recomendado: ["esteatose", "diabetes", "colesterol"],
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
};

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
export function obterReceitaPersonalizada(nomeAlimento, condicoes) {
  const receita = obterReceita(nomeAlimento);
  if (!receita) return null;

  const ativas = (condicoes || []).filter((c) => c !== "nenhum");
  if (ativas.length === 0) return { ...receita, alertasPersonalizados: [], adaptacoesPersonalizadas: [], isRecomendado: false };

  const alertasPersonalizados = [];
  const adaptacoesPersonalizadas = [];

  for (const c of ativas) {
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

  return {
    ...receita,
    alertasPersonalizados,
    adaptacoesPersonalizadas,
    isRecomendado,
  };
}
