/* ============================================================
   receitas.js — Banco de receitas e regras de alertas por doença

   Estrutura de cada receita:
   - nome: nome da receita
   - icone: emoji representativo
   - refeicao: em qual refeição ela se encaixa
   - ingredientes: lista de ingredientes principais
   - modo: modo de preparo resumido
   - alertas: quais doenças podem ter problema com esta receita
   - calorias / proteina / carbo / gordura: macronutrientes
============================================================ */

const RECEITAS = [

  /* ---- CAFÉ DA MANHÃ ---- */
  {
    nome: "Vitamina de banana com aveia",
    icone: "🍌",
    refeicao: "cafe",
    ingredientes: ["banana", "aveia", "leite desnatado"],
    modo: "Bata no liquidificador 1 banana média, 2 colheres de aveia e 200ml de leite desnatado. Sirva gelado.",
    alertas: { diabetes: "Banana madura tem alto índice glicêmico. Prefira banana verde ou reduza a quantidade." },
    calorias: 280, proteina: 10, carbo: 50, gordura: 4
  },
  {
    nome: "Ovos mexidos com espinafre",
    icone: "🍳",
    refeicao: "cafe",
    ingredientes: ["ovo", "espinafre", "azeite"],
    modo: "Refogue o espinafre em azeite, adicione 2 ovos batidos e mexa em fogo baixo até cozinhar.",
    alertas: {},
    calorias: 220, proteina: 16, carbo: 3, gordura: 14
  },
  {
    nome: "Iogurte natural com frutas vermelhas",
    icone: "🫐",
    refeicao: "cafe",
    ingredientes: ["iogurte natural", "morango", "mirtilo"],
    modo: "Misture 150g de iogurte natural desnatado com frutas vermelhas frescas. Adicione 1 fio de mel se desejar.",
    alertas: { diabetes: "Use iogurte sem açúcar e evite mel se o açúcar estiver descontrolado." },
    calorias: 180, proteina: 12, carbo: 22, gordura: 2
  },
  {
    nome: "Tapioca com queijo cottage",
    icone: "🫓",
    refeicao: "cafe",
    ingredientes: ["goma de tapioca", "queijo cottage"],
    modo: "Espalhe a goma de tapioca em frigideira antiaderente e deixe dourar dos dois lados. Recheie com queijo cottage.",
    alertas: { diabetes: "Tapioca tem alto índice glicêmico. Consuma com proteína para reduzir o impacto glicêmico." },
    calorias: 250, proteina: 14, carbo: 38, gordura: 5
  },

  /* ---- LANCHES ---- */
  {
    nome: "Mix de castanhas",
    icone: "🥜",
    refeicao: "lanche",
    ingredientes: ["castanha-do-pará", "amêndoa", "nozes"],
    modo: "Porcione 30g de castanhas mistas. Coma devagar e mastigando bem.",
    alertas: { esteatose: "Castanhas são fontes de gordura boa, mas consuma com moderação (máx. 30g)." },
    calorias: 190, proteina: 5, carbo: 6, gordura: 17
  },
  {
    nome: "Maçã com pasta de amendoim",
    icone: "🍎",
    refeicao: "lanche",
    ingredientes: ["maçã", "pasta de amendoim"],
    modo: "Fatie 1 maçã e sirva com 1 colher de sopa de pasta de amendoim natural (sem açúcar).",
    alertas: { diabetes: "Use pasta de amendoim sem açúcar adicionado." },
    calorias: 220, proteina: 7, carbo: 28, gordura: 10
  },
  {
    nome: "Cenoura e pepino com homus",
    icone: "🥕",
    refeicao: "lanche",
    ingredientes: ["cenoura", "pepino", "grão-de-bico"],
    modo: "Corte cenoura e pepino em palitos. Sirva com 2 colheres de sopa de homus caseiro.",
    alertas: {},
    calorias: 150, proteina: 6, carbo: 20, gordura: 5
  },

  /* ---- ALMOÇO ---- */
  {
    nome: "Frango grelhado com legumes no vapor",
    icone: "🍗",
    refeicao: "almoco",
    ingredientes: ["frango", "brócolis", "cenoura", "azeite"],
    modo: "Tempere o peito de frango com ervas. Grelhe por 7 min de cada lado. Cozinhe brócolis e cenoura no vapor por 8 min. Regue com azeite e limão.",
    alertas: {},
    calorias: 380, proteina: 42, carbo: 18, gordura: 12
  },
  {
    nome: "Salmão assado com aspargos",
    icone: "🐟",
    refeicao: "almoco",
    ingredientes: ["salmão", "aspargo", "azeite", "limão"],
    modo: "Tempere o salmão com azeite, limão e ervas. Asse a 200°C por 15 min junto com os aspargos.",
    alertas: { esteatose: "Excelente para esteatose! O ômega-3 do salmão ajuda a reduzir a gordura no fígado." },
    calorias: 420, proteina: 38, carbo: 6, gordura: 24
  },
  {
    nome: "Arroz integral com feijão e ovo",
    icone: "🍚",
    refeicao: "almoco",
    ingredientes: ["arroz integral", "feijão", "ovo", "alho", "cebola"],
    modo: "Prepare o arroz integral. Cozinhe o feijão com alho e cebola. Sirva com 1 ovo cozido. Tempere com azeite.",
    alertas: { diabetes: "Arroz integral tem menor índice glicêmico que o branco. Consuma em porção moderada (3-4 colheres)." },
    calorias: 450, proteina: 22, carbo: 62, gordura: 10
  },
  {
    nome: "Omelete de atum com salada verde",
    icone: "🥗",
    refeicao: "almoco",
    ingredientes: ["ovo", "atum", "alface", "tomate", "azeite"],
    modo: "Bata 3 ovos, adicione atum escorrido, tempere. Cozinhe em frigideira untada. Sirva com salada de alface e tomate com azeite.",
    alertas: {},
    calorias: 340, proteina: 38, carbo: 8, gordura: 16
  },
  {
    nome: "Lentilha ensopada com legumes",
    icone: "🫘",
    refeicao: "almoco",
    ingredientes: ["lentilha", "cenoura", "abobrinha", "tomate", "cebola"],
    modo: "Refogue cebola e tomate. Adicione lentilha lavada, cenoura e abobrinha em cubos. Cubra com água e cozinhe 25 min.",
    alertas: {},
    calorias: 360, proteina: 24, carbo: 52, gordura: 6
  },

  /* ---- JANTAR ---- */
  {
    nome: "Sopa de legumes com frango desfiado",
    icone: "🍲",
    refeicao: "jantar",
    ingredientes: ["frango", "abobrinha", "cenoura", "chuchu", "caldo de legumes"],
    modo: "Cozinhe o frango e desfie. Refogue os legumes cortados em cubos. Adicione o frango, cubra com água e cozinhe 20 min. Tempere com ervas.",
    alertas: {},
    calorias: 280, proteina: 30, carbo: 22, gordura: 7
  },
  {
    nome: "Tilápia ao forno com batata doce",
    icone: "🐠",
    refeicao: "jantar",
    ingredientes: ["tilápia", "batata doce", "azeite", "limão"],
    modo: "Tempere a tilápia. Fatie a batata doce e leve ao forno 200°C por 25 min. Asse o peixe ao lado nos últimos 15 min.",
    alertas: { diabetes: "Batata doce tem índice glicêmico moderado. Prefira comer em menor quantidade (100g)." },
    calorias: 350, proteina: 32, carbo: 34, gordura: 9
  },
  {
    nome: "Patê de grão-de-bico com legumes crus",
    icone: "🥣",
    refeicao: "jantar",
    ingredientes: ["grão-de-bico", "azeite", "limão", "pepino", "cenoura"],
    modo: "Bata grão-de-bico cozido com azeite, limão e sal. Sirva como patê com palitos de pepino e cenoura.",
    alertas: {},
    calorias: 240, proteina: 12, carbo: 32, gordura: 8
  },

  /* ---- CEIA ---- */
  {
    nome: "Chá de camomila com torrada integral",
    icone: "🍵",
    refeicao: "ceia",
    ingredientes: ["camomila", "pão integral"],
    modo: "Prepare o chá sem açúcar. Toste 1 fatia de pão integral e sirva sem manteiga ou com uma fina camada de queijo cottage.",
    alertas: { diabetes: "Evite adicionar açúcar ou mel ao chá." },
    calorias: 90, proteina: 4, carbo: 16, gordura: 1
  },
  {
    nome: "Iogurte natural com semente de chia",
    icone: "🥛",
    refeicao: "ceia",
    ingredientes: ["iogurte natural", "chia"],
    modo: "Misture 100g de iogurte natural sem açúcar com 1 colher de sopa de chia. Deixe descansar 5 min antes de consumir.",
    alertas: {},
    calorias: 120, proteina: 9, carbo: 12, gordura: 4
  },

  /* ---- ALMOÇO RÁPIDO ---- */
  {
    nome: "Arroz com feijão e frango",
    icone: "🍚",
    refeicao: "almoco",
    ingredientes: ["arroz", "feijão", "frango", "alho", "cebola"],
    modo: "Prepare arroz e feijão. Grelhe frango temperado com alho e ervas. Sirva junto com salada verde.",
    alertas: { diabetes: "Combine porções moderadas — o feijão tem fibras que controlam a glicemia.", gota: "Prefira frango ao invés de carne vermelha. Feijão com moderação." },
    calorias: 480, proteina: 38, carbo: 58, gordura: 10
  },
  {
    nome: "Macarrão integral com atum",
    icone: "🍝",
    refeicao: "almoco",
    ingredientes: ["macarrão integral", "atum", "azeite", "alho"],
    modo: "Cozinhe a massa al dente. Misture com atum escorrido, alho dourado e azeite. Finalize com salsinha.",
    alertas: { celiaca: "Use macarrão de arroz ou milho sem glúten.", gota: "Atum tem purinas moderadas — máximo 3x/semana.", hipertensao: "Enxague o atum para reduzir o sódio da conserva." },
    calorias: 390, proteina: 32, carbo: 48, gordura: 9
  },
  {
    nome: "Bife acebolado magro",
    icone: "🥩",
    refeicao: "almoco",
    ingredientes: ["patinho", "cebola", "alho", "azeite"],
    modo: "Grelhe o bife de patinho em frigideira quente 3 min de cada lado. Caramelize a cebola no azeite e sirva por cima.",
    alertas: { gota: "Carne vermelha tem purinas — limite a 2x/semana.", hipertensao: "Use alho e ervas, sem sal.", colesterol: "Retire toda gordura visível antes de grelhar." },
    calorias: 280, proteina: 35, carbo: 8, gordura: 11
  },
  {
    nome: "Frango ao molho de tomate",
    icone: "🍗",
    refeicao: "almoco",
    ingredientes: ["frango", "tomate", "cebola", "alho", "azeite"],
    modo: "Doure frango em cubos no azeite. Adicione cebola, alho e tomate picados. Cozinhe 20 min até encorpar.",
    alertas: { gastrite: "Tomate é ácido — substitua por abóbora se estiver em crise.", hipertensao: "Sem sal adicionado — alho e tomate já temperam bem." },
    calorias: 310, proteina: 38, carbo: 12, gordura: 11
  },
  {
    nome: "Frango cozido com legumes",
    icone: "🍲",
    refeicao: "almoco",
    ingredientes: ["frango", "cenoura", "abobrinha", "chuchu", "alho"],
    modo: "Cozinhe frango e legumes em cubos na água com alho e ervas por 30 min. Desfie e sirva com o caldo.",
    alertas: {},
    calorias: 280, proteina: 32, carbo: 18, gordura: 7
  },
  {
    nome: "Omelete de atum",
    icone: "🥚",
    refeicao: "almoco",
    ingredientes: ["ovo", "atum", "cebola", "azeite"],
    modo: "Bata 2 ovos com atum escorrido e cebola picada. Cozinhe em frigideira com azeite dos dois lados.",
    alertas: { colesterol: "Use 1 ovo inteiro + 1 clara para reduzir o colesterol.", gota: "Atum com moderação — máximo 3x/semana.", hipertensao: "Escorra e enxague bem o atum." },
    calorias: 290, proteina: 34, carbo: 4, gordura: 14
  },
  {
    nome: "Salada de frango desfiado",
    icone: "🥗",
    refeicao: "almoco",
    ingredientes: ["frango", "alface", "tomate", "cenoura", "milho", "azeite"],
    modo: "Cozinhe e desfie o frango. Misture com folhas, tomate, cenoura ralada e milho. Tempere com azeite e limão.",
    alertas: { gastrite: "Evite tomate em crise — substitua por pepino e beterraba.", hipertensao: "Tempere apenas com azeite e limão, sem sal." },
    calorias: 290, proteina: 32, carbo: 18, gordura: 10
  },
  {
    nome: "Arroz integral com cenoura e ervilha",
    icone: "🍛",
    refeicao: "almoco",
    ingredientes: ["arroz integral", "cenoura", "ervilha", "alho", "azeite"],
    modo: "Refogue alho, adicione arroz e legumes. Cubra com água (2,5x o volume) e cozinhe 35 min tampado.",
    alertas: { gota: "Ervilha tem purinas moderadas — consuma com moderação.", diabetes: "Arroz integral é escolha melhor que o branco." },
    calorias: 320, proteina: 9, carbo: 62, gordura: 6
  },
  {
    nome: "Quinoa com legumes",
    icone: "🌾",
    refeicao: "almoco",
    ingredientes: ["quinoa", "pimentão", "abobrinha", "alho", "azeite"],
    modo: "Cozinhe quinoa lavada em água (1:2) por 15 min. Saltear alho e legumes no azeite. Misture tudo e tempere.",
    alertas: { hipertensao: "Use sal mínimo — ervas compensam bem." },
    calorias: 280, proteina: 11, carbo: 42, gordura: 8
  },
  {
    nome: "Caldo de feijão com legumes",
    icone: "🫘",
    refeicao: "jantar",
    ingredientes: ["feijão", "cenoura", "chuchu", "alho", "azeite"],
    modo: "Bata metade do feijão cozido. Refogue alho e adicione feijão batido, inteiro e legumes. Cozinhe 15 min.",
    alertas: { gota: "Feijão tem purinas moderadas — evite em crises agudas.", diabetes: "Caldo de feijão com fibras — boa opção para jantar." },
    calorias: 240, proteina: 14, carbo: 38, gordura: 5
  },

  /* ---- JANTAR ---- */
  {
    nome: "Frango desfiado com chuchu",
    icone: "🫑",
    refeicao: "jantar",
    ingredientes: ["frango", "chuchu", "alho", "cebola", "azeite"],
    modo: "Refogue alho e cebola. Adicione chuchu em cubos e frango desfiado. Cozinhe coberto por 15 min com 100ml água.",
    alertas: {},
    calorias: 240, proteina: 28, carbo: 14, gordura: 8
  },
  {
    nome: "Creme de abóbora com gengibre",
    icone: "🎃",
    refeicao: "jantar",
    ingredientes: ["abóbora", "cebola", "alho", "gengibre", "azeite"],
    modo: "Refogue cebola e alho. Adicione abóbora em cubos e gengibre ralado, cubra com água e cozinhe 20 min. Bata até cremoso.",
    alertas: { gastrite: "Reduza o gengibre ou omita — pode irritar estômago sensível." },
    calorias: 150, proteina: 3, carbo: 28, gordura: 5
  },
  {
    nome: "Creme de cenoura",
    icone: "🥕",
    refeicao: "jantar",
    ingredientes: ["cenoura", "batata", "cebola", "alho", "azeite"],
    modo: "Cozinhe cenoura, batata, cebola e alho. Bata tudo com azeite até cremoso. Tempere com sal e salsinha.",
    alertas: { diabetes: "Use menos batata e mais cenoura para reduzir o índice glicêmico." },
    calorias: 160, proteina: 3, carbo: 30, gordura: 5
  },
  {
    nome: "Sopa de macarrão com frango",
    icone: "🍜",
    refeicao: "jantar",
    ingredientes: ["frango", "macarrão", "cenoura", "chuchu", "alho"],
    modo: "Cozinhe frango na água com alho e legumes. Desfie, volte à panela, adicione macarrão e cozinhe mais 8 min.",
    alertas: { celiaca: "Use macarrão de arroz ou milho sem glúten.", hipertensao: "Não adicione sal — o caldo natural já tempera." },
    calorias: 320, proteina: 28, carbo: 36, gordura: 7
  },
  {
    nome: "Tilápia grelhada",
    icone: "🐠",
    refeicao: "jantar",
    ingredientes: ["tilápia", "limão", "alho", "azeite", "ervas"],
    modo: "Marine o filé em limão, alho e azeite por 10 min. Grelhe em frigideira quente 4 min de cada lado.",
    alertas: { gastrite: "Evite excesso de limão — marine por no máximo 10 min." },
    calorias: 210, proteina: 35, carbo: 2, gordura: 7
  },
  {
    nome: "Polenta cremosa",
    icone: "🌽",
    refeicao: "jantar",
    ingredientes: ["fubá", "água", "azeite", "sal"],
    modo: "Ferva água com sal. Adicione fubá em fio mexendo sempre por 15 min em fogo baixo até cremoso.",
    alertas: { diabetes: "Porção de 100g acompanhada de proteína para reduzir impacto glicêmico.", celiaca: "Fubá de milho é naturalmente sem glúten — boa opção." },
    calorias: 220, proteina: 4, carbo: 44, gordura: 5
  },
  {
    nome: "Purê de batata doce",
    icone: "🍠",
    refeicao: "jantar",
    ingredientes: ["batata doce", "azeite", "cúrcuma", "sal"],
    modo: "Cozinhe a batata doce com casca. Descasque, amasse com azeite, cúrcuma e sal. Sirva quente.",
    alertas: { diabetes: "Porção de 100g com proteína para controlar a glicemia." },
    calorias: 190, proteina: 3, carbo: 38, gordura: 4
  },

  /* ---- CAFÉ DA MANHÃ ---- */
  {
    nome: "Smoothie verde",
    icone: "🥤",
    refeicao: "cafe",
    ingredientes: ["couve", "banana", "água de coco"],
    modo: "Bata couve, banana congelada e água de coco no liquidificador até ficar homogêneo. Sirva gelado.",
    alertas: { diabetes: "Use 1/2 banana verde para menor impacto glicêmico.", tireoide: "Branqueie a couve brevemente antes de bater." },
    calorias: 180, proteina: 4, carbo: 38, gordura: 2
  },
  {
    nome: "Vitamina de mamão",
    icone: "🥭",
    refeicao: "cafe",
    ingredientes: ["mamão", "leite desnatado"],
    modo: "Bata mamão com leite desnatado no liquidificador. Sirva gelado.",
    alertas: { lactose: "Use leite sem lactose ou bebida vegetal.", diabetes: "Porção moderada de 150g de mamão." },
    calorias: 200, proteina: 8, carbo: 36, gordura: 2
  },
  {
    nome: "Torrada com abacate",
    icone: "🥑",
    refeicao: "cafe",
    ingredientes: ["pão integral", "abacate", "limão", "sal"],
    modo: "Torre o pão. Amasse o abacate com limão e sal. Espalhe generosamente sobre as torradas.",
    alertas: { celiaca: "Use pão certificado sem glúten.", hipertensao: "Use sal mínimo — abacate já tem sabor." },
    calorias: 290, proteina: 7, carbo: 32, gordura: 16
  },

  /* ---- LANCHES ---- */
  {
    nome: "Banana com pasta de amendoim",
    icone: "🥜",
    refeicao: "lanche",
    ingredientes: ["banana", "pasta de amendoim"],
    modo: "Sirva 1 banana com 1 col. sopa de pasta de amendoim natural sem açúcar.",
    alertas: { diabetes: "Substitua banana por maçã para menor índice glicêmico.", gota: "Amendoim tem purinas moderadas — com moderação." },
    calorias: 220, proteina: 6, carbo: 30, gordura: 9
  },
  {
    nome: "Queijo branco com fruta",
    icone: "🧀",
    refeicao: "lanche",
    ingredientes: ["queijo branco", "goiaba", "mamão"],
    modo: "Sirva 50g de queijo branco fatiado com uma fruta da estação (goiaba, mamão, maçã).",
    alertas: { hipertensao: "Queijo branco tem sódio moderado — limite a 30g.", lactose: "Use versão sem lactose." },
    calorias: 180, proteina: 10, carbo: 18, gordura: 8
  },
  {
    nome: "Maçã com canela",
    icone: "🍎",
    refeicao: "lanche",
    ingredientes: ["maçã", "canela"],
    modo: "Fatie a maçã e polvilhe canela. Sirva com casca para preservar as fibras e a pectina.",
    alertas: {},
    calorias: 90, proteina: 0, carbo: 22, gordura: 0
  },
  {
    nome: "Abacate com limão",
    icone: "🥑",
    refeicao: "lanche",
    ingredientes: ["abacate", "limão", "sal"],
    modo: "Amasse 1/2 abacate maduro com suco de limão e sal. Sirva com talheres ou sobre torrada.",
    alertas: { gastrite: "Abacate é suave para o estômago — boa opção." },
    calorias: 160, proteina: 2, carbo: 8, gordura: 14
  },
  {
    nome: "Castanha-do-pará",
    icone: "🌰",
    refeicao: "lanche",
    ingredientes: ["castanha-do-pará"],
    modo: "Consuma 2 unidades por dia — dose ideal de selênio. Mastigue bem e devagar.",
    alertas: { tireoide: "2 castanhas/dia cobrem 100% do selênio necessário para a tireoide." },
    calorias: 60, proteina: 1, carbo: 1, gordura: 6
  },

  /* ---- CEIA ---- */
  {
    nome: "Banana assada com canela",
    icone: "🍌",
    refeicao: "ceia",
    ingredientes: ["banana", "canela"],
    modo: "Corte a banana ao meio. Polvilhe canela. Asse a 180°C por 10 min ou em frigideira antiaderente tampada.",
    alertas: { diabetes: "Banana assada tem alto índice glicêmico — prefira maçã assada." },
    calorias: 105, proteina: 1, carbo: 27, gordura: 0
  },
  {
    nome: "Iogurte com chia",
    icone: "🥛",
    refeicao: "ceia",
    ingredientes: ["iogurte natural", "chia", "canela"],
    modo: "Misture iogurte com chia e aguarde 10 min para hidratar. Polvilhe canela e sirva.",
    alertas: { lactose: "Use iogurte sem lactose ou de coco.", diabetes: "Excelente ceia para controle glicêmico — índice glicêmico baixíssimo." },
    calorias: 120, proteina: 10, carbo: 12, gordura: 4
  }
];

/* ============================================================
   ALIMENTOS PREJUDICIAIS POR CONDIÇÃO

   Usados para verificar se um alimento do cardápio
   precisa de alerta para o usuário.
============================================================ */

const ALIMENTOS_PREJUDICIAIS = {
  esteatose: [
    { nome: "açúcar",        alerta: "Frutose em excesso sobrecarrega o fígado." },
    { nome: "fritura",       alerta: "Gordura saturada agrava a esteatose." },
    { nome: "frito",         alerta: "Gordura saturada agrava a esteatose." },
    { nome: "bacon",         alerta: "Rico em gordura saturada, prejudicial ao fígado." },
    { nome: "embutido",      alerta: "Processados com gordura saturada." },
    { nome: "salsicha",      alerta: "Processado com gordura saturada." },
    { nome: "refrigerante",  alerta: "Alto em frutose, agrava a gordura no fígado." },
    { nome: "álcool",        alerta: "Álcool é extremamente prejudicial ao fígado." },
    { nome: "manteiga",      alerta: "Gordura saturada em excesso prejudica o fígado." },
    { nome: "margarina",     alerta: "Gordura trans agrava a esteatose." },
  ],
  diabetes: [
    { nome: "açúcar",        alerta: "Causa pico de glicemia." },
    { nome: "mel",           alerta: "Alto índice glicêmico, pode elevar o açúcar no sangue." },
    { nome: "refrigerante",  alerta: "Altíssimo teor de açúcar." },
    { nome: "pão branco",    alerta: "Carboidrato refinado com alto índice glicêmico." },
    { nome: "arroz branco",  alerta: "Prefira arroz integral para menor impacto glicêmico." },
    { nome: "batata inglesa",alerta: "Alto índice glicêmico. Prefira batata doce." },
    { nome: "suco de fruta", alerta: "Concentração de açúcar alta. Prefira a fruta in natura." },
    { nome: "doce",          alerta: "Alto teor de açúcar, evitar." },
    { nome: "bolo",          alerta: "Alto teor de carboidratos e açúcar refinado." },
    { nome: "biscoito",      alerta: "Alto índice glicêmico se for refinado." },
    { nome: "tapioca",       alerta: "Alto índice glicêmico. Consuma com proteína para reduzir o impacto." },
    { nome: "banana",        alerta: "Banana madura tem índice glicêmico elevado. Prefira banana verde." },
  ],
  hipertensao: [
    { nome: "sal",           alerta: "Sódio eleva a pressão arterial." },
    { nome: "embutido",      alerta: "Muito sódio — evite ou consuma raramente." },
    { nome: "salsicha",      alerta: "Muito sódio — evite ou consuma raramente." },
    { nome: "presunto",      alerta: "Rico em sódio, prejudicial para quem tem pressão alta." },
    { nome: "queijo",        alerta: "Queijos processados têm alto teor de sódio." },
    { nome: "enlatado",      alerta: "Alimentos enlatados geralmente têm excesso de sódio." },
    { nome: "molho pronto",  alerta: "Molhos industrializados são ricos em sódio." },
    { nome: "refrigerante",  alerta: "Bebidas com cafeína podem elevar a pressão." },
    { nome: "café",          alerta: "Cafeína em excesso pode elevar a pressão — limite a 1-2 xícaras/dia." },
  ],
  colesterol: [
    { nome: "fritura",       alerta: "Gordura saturada e trans elevam o LDL (colesterol ruim)." },
    { nome: "frito",         alerta: "Gordura saturada e trans elevam o LDL (colesterol ruim)." },
    { nome: "bacon",         alerta: "Alto em gordura saturada, eleva o colesterol." },
    { nome: "embutido",      alerta: "Rico em gordura saturada e sódio." },
    { nome: "margarina",     alerta: "Gordura trans eleva o LDL e reduz o HDL." },
    { nome: "manteiga",      alerta: "Gordura saturada em excesso eleva o colesterol." },
    { nome: "creme de leite",alerta: "Alto teor de gordura saturada." },
    { nome: "gema de ovo",   alerta: "Rico em colesterol — limite a 1 gema/dia se orientado." },
    { nome: "carnes gordas", alerta: "Prefira cortes magros e retire a gordura visível." },
  ],
  gastrite: [
    { nome: "café",          alerta: "Estimula a produção de ácido gástrico — limite ou evite." },
    { nome: "limão",         alerta: "Alimento ácido que pode irritar o estômago." },
    { nome: "tomate",        alerta: "Ácido — pode piorar o refluxo e a gastrite." },
    { nome: "laranja",       alerta: "Fruta ácida que pode irritar a mucosa gástrica." },
    { nome: "pimenta",       alerta: "Irritante gástrico, evite se tiver gastrite ativa." },
    { nome: "fritura",       alerta: "Alimentos gordurosos retardam o esvaziamento gástrico." },
    { nome: "frito",         alerta: "Alimentos gordurosos retardam o esvaziamento gástrico." },
    { nome: "álcool",        alerta: "Álcool agride diretamente a mucosa do estômago." },
    { nome: "refrigerante",  alerta: "Carbonatação aumenta a pressão no estômago e piora o refluxo." },
    { nome: "chocolate",     alerta: "Pode relaxar o esfíncter esofágico e piorar o refluxo." },
  ],
  lactose: [
    { nome: "leite",         alerta: "Contém lactose — use a versão sem lactose ou bebida vegetal." },
    { nome: "queijo",        alerta: "Derivado lácteo com lactose — prefira versões maturadas ou sem lactose." },
    { nome: "iogurte",       alerta: "Contém lactose — use iogurte sem lactose ou de coco/soja." },
    { nome: "creme de leite",alerta: "Derivado lácteo — use creme sem lactose ou de caju." },
    { nome: "manteiga",      alerta: "Derivado do leite — verifique se tolerado ou substitua por azeite." },
    { nome: "requeijão",     alerta: "Contém lactose — use versão sem lactose." },
    { nome: "sorvete",       alerta: "Base láctea com lactose — use versão vegana ou sem lactose." },
  ],
  celiaca: [
    { nome: "pão",           alerta: "Geralmente contém trigo (glúten) — use pão sem glúten." },
    { nome: "macarrão",      alerta: "Contém trigo — substitua por macarrão de arroz ou milho." },
    { nome: "farinha de trigo", alerta: "Contém glúten — use farinha de arroz ou mandioca." },
    { nome: "aveia",         alerta: "Pode ser contaminada com glúten — use aveia certificada sem glúten." },
    { nome: "biscoito",      alerta: "Geralmente feito com trigo — verifique a embalagem." },
    { nome: "bolo",          alerta: "Geralmente feito com farinha de trigo — use receita sem glúten." },
    { nome: "cevada",        alerta: "Cereal com glúten — evitar completamente." },
    { nome: "centeio",       alerta: "Cereal com glúten — evitar completamente." },
    { nome: "tapioca",       alerta: "A tapioca pura (goma) é naturalmente sem glúten — boa opção!" },
  ],
  anemia: [
    { nome: "chá",           alerta: "Taninos do chá inibem a absorção de ferro — evite junto às refeições." },
    { nome: "café",          alerta: "Cafeína reduz a absorção de ferro — não tome junto às refeições." },
    { nome: "refrigerante",  alerta: "Fosfatos podem prejudicar a absorção de ferro." },
    { nome: "leite",         alerta: "Cálcio compete com o ferro na absorção — separe por 2 horas." },
  ],
  tireoide: [
    { nome: "soja",          alerta: "Soja em excesso interfere na absorção do hormônio tireoidiano — consuma com moderação." },
    { nome: "repolho",       alerta: "Prefira repolho cozido — cru pode inibir a produção de hormônio tireoidiano." },
    { nome: "brócolis",      alerta: "Prefira cozido — o cozimento reduz o efeito goitrogênico sobre a tireoide." },
    { nome: "couve",         alerta: "Prefira cozida para reduzir o impacto sobre a produção de hormônios." },
    { nome: "couve-flor",    alerta: "Prefira cozida para reduzir o efeito sobre a absorção de iodo." },
  ],
  gota: [
    { nome: "patinho",       alerta: "Carne vermelha tem purinas que elevam o ácido úrico — limite a 2x/semana." },
    { nome: "carne moída",   alerta: "Rica em purinas — consuma no máximo 2x por semana." },
    { nome: "sardinha",      alerta: "Peixe rico em purinas — consuma com moderação se tiver gota ativa." },
    { nome: "atum",          alerta: "Contém purinas moderadas — limite a 3x/semana." },
    { nome: "lombo",         alerta: "Carne suína tem purinas — prefira frango e peixes." },
    { nome: "feijão",        alerta: "Leguminosas têm purinas moderadas — consuma com moderação." },
    { nome: "lentilha",      alerta: "Tem purinas moderadas — evite em fases agudas de gota." },
    { nome: "grão-de-bico",  alerta: "Contém purinas moderadas — evite em crises de gota." },
  ]
};

/* ============================================================
   verificarAlerta(nomeAlimento, condicoes)

   Recebe o nome de um alimento e o ARRAY de condições do usuário.
   Retorna a primeira mensagem de alerta encontrada, ou null.
============================================================ */
const ICONES_CONDICAO = {
  esteatose:   '🫀',
  diabetes:    '🩸',
  hipertensao: '💓',
  colesterol:  '🫁',
  gastrite:    '🫃',
  lactose:     '🥛',
  celiaca:     '🌾',
  anemia:      '💊',
  tireoide:    '🦋',
  gota:        '🦴',
};

function verificarAlerta(nomeAlimento, condicoes) {
  if (!condicoes || condicoes.length === 0) return null;

  const ativas = condicoes.filter(c => c !== 'nenhum');
  if (ativas.length === 0) return null;

  const nomeLower = nomeAlimento.toLowerCase();

  for (const c of ativas) {
    const lista = ALIMENTOS_PREJUDICIAIS[c] || [];
    for (const item of lista) {
      if (nomeLower.includes(item.nome)) {
        const icone = ICONES_CONDICAO[c] || '⚠️';
        return `${icone} ${item.alerta}`;
      }
    }
  }
  return null;
}

/* ============================================================
   buscarReceitasPorIngredientes(ingredientesUsuario, condicoes)

   Recebe a lista de ingredientes que o usuário tem em casa.
   Retorna as receitas que usam pelo menos um ingrediente disponível,
   ordenadas por quantos ingredientes correspondem.
============================================================ */
function buscarReceitasPorIngredientes(ingredientesUsuario, condicoes) {
  const normalizados = ingredientesUsuario.map(i => i.toLowerCase().trim());

  const resultado = RECEITAS
    .map(receita => {
      const correspondencias = receita.ingredientes.filter(ing =>
        normalizados.some(u => ing.toLowerCase().includes(u) || u.includes(ing.toLowerCase()))
      );
      return { ...receita, correspondencias };
    })
    .filter(r => r.correspondencias.length > 0)
    .sort((a, b) => b.correspondencias.length - a.correspondencias.length);

  return resultado;
}

export { verificarAlerta, buscarReceitasPorIngredientes };
