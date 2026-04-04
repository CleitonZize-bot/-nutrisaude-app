/* ============================================================
   alimentos.js — Banco de alimentos com grupos de substituição

   Cada grupo contém alimentos nutricionalmente equivalentes.
   O usuário pode trocar qualquer item por outro do mesmo grupo
   sem alterar significativamente o valor nutricional da refeição.

   Estrutura:
   - id: identificador único do grupo
   - nome: nome descritivo do grupo
   - itens: array de alimentos equivalentes
     - nome: nome do alimento
     - quantidade: porção equivalente
     - calorias, proteina, carbo, gordura: valores nutricionais
============================================================ */

const GRUPOS_SUBSTITUICAO = {

  /* ---- CARBOIDRATOS DO CAFÉ DA MANHÃ ---- */
  pao_manha: {
    nome: "Pães e carboidratos matinais",
    itens: [
      { nome: "Pão integral",             quantidade: "2 fatias (50g)",      calorias: 140, proteina: 5, carbo: 26, gordura: 2 },
      { nome: "Tapioca",                  quantidade: "1 unid. média (80g)", calorias: 135, proteina: 1, carbo: 34, gordura: 0, evitar: ["diabetes"] },
      { nome: "Cuscuz de milho",          quantidade: "100g",                calorias: 140, proteina: 3, carbo: 30, gordura: 1 },
      { nome: "Batata doce cozida",       quantidade: "100g",                calorias: 130, proteina: 2, carbo: 30, gordura: 0 },
      { nome: "Pão de queijo",            quantidade: "2 unid. pequenas",    calorias: 140, proteina: 4, carbo: 20, gordura: 5, evitar: ["colesterol", "lactose"] },
      { nome: "Crepioca (ovo + tapioca)", quantidade: "1 unidade",           calorias: 145, proteina: 7, carbo: 20, gordura: 5, evitar: ["diabetes"] },
      { nome: "Aveia em flocos",          quantidade: "4 col. sopa (40g)",   calorias: 140, proteina: 5, carbo: 26, gordura: 3 },
      { nome: "Torrada integral",         quantidade: "4 unidades",          calorias: 140, proteina: 4, carbo: 26, gordura: 2 }
    ]
  },

  /* ---- PROTEÍNAS DO CAFÉ DA MANHÃ ---- */
  proteina_manha: {
    nome: "Proteínas matinais",
    itens: [
      { nome: "Queijo branco",     quantidade: "1 fatia (30g)",     calorias: 70, proteina: 6, carbo: 1, gordura: 4, evitar: ["lactose"] },
      { nome: "Queijo cottage",    quantidade: "2 col. sopa (40g)", calorias: 70, proteina: 7, carbo: 2, gordura: 3, evitar: ["lactose"] },
      { nome: "Ricota",            quantidade: "2 col. sopa (40g)", calorias: 68, proteina: 5, carbo: 2, gordura: 4, evitar: ["lactose"] },
      { nome: "Requeijão light",   quantidade: "1 col. sopa (30g)", calorias: 65, proteina: 3, carbo: 2, gordura: 5, evitar: ["hipertensao", "colesterol", "lactose"] },
      { nome: "Pasta de amendoim", quantidade: "1 col. sopa (15g)", calorias: 90, proteina: 4, carbo: 3, gordura: 7 },
      { nome: "Peito de peru",     quantidade: "2 fatias (30g)",    calorias: 40, proteina: 6, carbo: 1, gordura: 1, evitar: ["hipertensao"] },
      { nome: "Tofu firme",        quantidade: "50g",               calorias: 65, proteina: 7, carbo: 1, gordura: 4 }
    ]
  },

  /* ---- OVOS ---- */
  ovo: {
    nome: "Ovos e similares",
    itens: [
      { nome: "Ovo cozido",         quantidade: "1 unidade",          calorias: 78,  proteina: 6,  carbo: 0,  gordura: 5 },
      { nome: "Ovo mexido",         quantidade: "1 unidade",          calorias: 90,  proteina: 6,  carbo: 0,  gordura: 7 },
      { nome: "Omelete simples",    quantidade: "1 ovo",              calorias: 95,  proteina: 6,  carbo: 1,  gordura: 7 },
      { nome: "Ovo pochê",          quantidade: "1 unidade",          calorias: 78,  proteina: 6,  carbo: 0,  gordura: 5 },
      { nome: "Clara de ovo",       quantidade: "3 unidades",         calorias: 51,  proteina: 11, carbo: 0,  gordura: 0 }
    ]
  },

  /* ---- FRUTAS (porção ~80kcal) ---- */
  fruta: {
    nome: "Frutas",
    itens: [
      { nome: "Maçã",         quantidade: "1 unidade média",  calorias: 80, proteina: 0, carbo: 20, gordura: 0 },
      { nome: "Pera",         quantidade: "1 unidade média",  calorias: 80, proteina: 0, carbo: 20, gordura: 0 },
      { nome: "Banana prata", quantidade: "1 unidade",        calorias: 85, proteina: 1, carbo: 22, gordura: 0, evitar: ["diabetes"] },
      { nome: "Laranja",      quantidade: "1 unidade",        calorias: 75, proteina: 1, carbo: 18, gordura: 0, evitar: ["gastrite"] },
      { nome: "Manga",        quantidade: "1 fatia média",    calorias: 80, proteina: 1, carbo: 20, gordura: 0, evitar: ["diabetes"] },
      { nome: "Mamão papaia", quantidade: "1/2 unidade",      calorias: 80, proteina: 1, carbo: 20, gordura: 0 },
      { nome: "Morango",      quantidade: "10 unidades",      calorias: 45, proteina: 1, carbo: 10, gordura: 0 },
      { nome: "Melão",        quantidade: "2 fatias médias",  calorias: 75, proteina: 1, carbo: 18, gordura: 0 },
      { nome: "Goiaba",       quantidade: "1 unidade",        calorias: 80, proteina: 2, carbo: 18, gordura: 0 },
      { nome: "Kiwi",         quantidade: "2 unidades",       calorias: 80, proteina: 1, carbo: 18, gordura: 0 },
      { nome: "Abacaxi",      quantidade: "2 fatias",         calorias: 75, proteina: 1, carbo: 18, gordura: 0, evitar: ["gastrite"] },
      { nome: "Ameixa",       quantidade: "3 unidades",       calorias: 75, proteina: 1, carbo: 18, gordura: 0 }
    ]
  },

  /* ---- BEBIDA DO CAFÉ ---- */
  bebida_cafe: {
    nome: "Bebidas quentes",
    itens: [
      { nome: "Café sem açúcar",      quantidade: "200ml", calorias: 5,  proteina: 0, carbo: 1,  gordura: 0, evitar: ["hipertensao", "gastrite", "anemia"] },
      { nome: "Café com leite desn.", quantidade: "200ml", calorias: 50, proteina: 3, carbo: 5,  gordura: 2, evitar: ["hipertensao", "gastrite", "anemia", "lactose"] },
      { nome: "Chá verde",            quantidade: "200ml", calorias: 2,  proteina: 0, carbo: 0,  gordura: 0, evitar: ["anemia"] },
      { nome: "Chá de camomila",      quantidade: "200ml", calorias: 2,  proteina: 0, carbo: 0,  gordura: 0 },
      { nome: "Achocolatado light",   quantidade: "200ml", calorias: 60, proteina: 3, carbo: 10, gordura: 1, evitar: ["diabetes", "colesterol", "lactose"] },
      { nome: "Cappuccino sem açúcar",quantidade: "200ml", calorias: 55, proteina: 3, carbo: 6,  gordura: 2, evitar: ["hipertensao", "gastrite", "lactose"] },
      { nome: "Chá de erva-cidreira", quantidade: "200ml", calorias: 2,  proteina: 0, carbo: 0,  gordura: 0 },
      { nome: "Chá de gengibre",      quantidade: "200ml", calorias: 3,  proteina: 0, carbo: 1,  gordura: 0, evitar: ["gastrite"] }
    ]
  },

  /* ---- IOGURTES E LÁCTEOS ---- */
  iogurte: {
    nome: "Iogurtes e lácteos",
    itens: [
      { nome: "Iogurte natural desnatado",    quantidade: "150g",  calorias: 85, proteina: 10, carbo: 9,  gordura: 0, evitar: ["lactose"] },
      { nome: "Iogurte grego light",          quantidade: "120g",  calorias: 85, proteina: 12, carbo: 6,  gordura: 1, evitar: ["lactose"] },
      { nome: "Coalhada desnatada",           quantidade: "150g",  calorias: 80, proteina: 8,  carbo: 10, gordura: 0, evitar: ["lactose"] },
      { nome: "Iogurte de coco (sem lactose)",quantidade: "150g",  calorias: 90, proteina: 1,  carbo: 12, gordura: 4 },
      { nome: "Leite desnatado",              quantidade: "200ml", calorias: 70, proteina: 7,  carbo: 10, gordura: 0, evitar: ["lactose"] },
      { nome: "Bebida vegetal de aveia",      quantidade: "200ml", calorias: 80, proteina: 2,  carbo: 14, gordura: 2 }
    ]
  },

  /* ---- OLEAGINOSAS/CASTANHAS ---- */
  castanha: {
    nome: "Oleaginosas",
    itens: [
      { nome: "Castanha-do-pará",    quantidade: "2 unidades",       calorias: 60,  proteina: 1,  carbo: 1,  gordura: 6 },
      { nome: "Amêndoas",            quantidade: "10 unidades",      calorias: 65,  proteina: 2,  carbo: 2,  gordura: 6 },
      { nome: "Nozes",               quantidade: "3 unidades",       calorias: 65,  proteina: 2,  carbo: 1,  gordura: 6 },
      { nome: "Castanha de caju",    quantidade: "6 unidades",       calorias: 65,  proteina: 2,  carbo: 3,  gordura: 5 },
      { nome: "Pistache",            quantidade: "15 unidades",      calorias: 60,  proteina: 2,  carbo: 3,  gordura: 5 },
      { nome: "Semente de abóbora",  quantidade: "1 col. sopa",      calorias: 60,  proteina: 3,  carbo: 2,  gordura: 5 }
    ]
  },

  /* ---- ARROZ E GRÃOS ---- */
  arroz: {
    nome: "Arroz e grãos",
    itens: [
      { nome: "Arroz integral",    quantidade: "4 col. sopa (100g)", calorias: 160, proteina: 3, carbo: 34, gordura: 1 },
      { nome: "Arroz branco",      quantidade: "3 col. sopa (90g)",  calorias: 160, proteina: 3, carbo: 36, gordura: 0, evitar: ["diabetes"] },
      { nome: "Quinoa cozida",     quantidade: "4 col. sopa (100g)", calorias: 155, proteina: 5, carbo: 28, gordura: 3 },
      { nome: "Macarrão integral", quantidade: "100g cozido",        calorias: 155, proteina: 6, carbo: 30, gordura: 1 },
      { nome: "Batata doce cozida",quantidade: "130g",               calorias: 155, proteina: 2, carbo: 36, gordura: 0 },
      { nome: "Mandioca cozida",   quantidade: "100g",               calorias: 155, proteina: 1, carbo: 36, gordura: 0, evitar: ["diabetes"] },
      { nome: "Inhame cozido",     quantidade: "100g",               calorias: 155, proteina: 2, carbo: 36, gordura: 0 },
      { nome: "Purê de batata",    quantidade: "120g",               calorias: 155, proteina: 3, carbo: 30, gordura: 3, evitar: ["diabetes"] }
    ]
  },

  /* ---- FEIJÕES E LEGUMINOSAS ---- */
  feijao: {
    nome: "Leguminosas",
    itens: [
      { nome: "Feijão carioca",      quantidade: "2 col. sopa", calorias: 90,  proteina: 5, carbo: 16, gordura: 1 },
      { nome: "Feijão preto",        quantidade: "2 col. sopa", calorias: 90,  proteina: 5, carbo: 16, gordura: 1 },
      { nome: "Lentilha cozida",     quantidade: "3 col. sopa", calorias: 95,  proteina: 7, carbo: 16, gordura: 0, evitar: ["gota"] },
      { nome: "Grão-de-bico cozido", quantidade: "3 col. sopa", calorias: 100, proteina: 6, carbo: 15, gordura: 2, evitar: ["gota"] },
      { nome: "Ervilha cozida",      quantidade: "4 col. sopa", calorias: 85,  proteina: 5, carbo: 15, gordura: 0, evitar: ["gota"] },
      { nome: "Feijão branco",       quantidade: "2 col. sopa", calorias: 90,  proteina: 6, carbo: 16, gordura: 0 },
      { nome: "Edamame",             quantidade: "60g",          calorias: 90,  proteina: 8, carbo: 7,  gordura: 4, evitar: ["gota", "tireoide"] }
    ]
  },

  /* ---- PROTEÍNA PRINCIPAL (almoço/jantar) ---- */
  proteina_principal: {
    nome: "Proteínas principais",
    itens: [
      { nome: "Peito de frango grelhado", quantidade: "120g",          calorias: 180, proteina: 30, carbo: 0, gordura: 6 },
      { nome: "Filé de tilápia",          quantidade: "150g",          calorias: 175, proteina: 32, carbo: 0, gordura: 5 },
      { nome: "Patinho bovino grelhado",  quantidade: "100g",          calorias: 180, proteina: 28, carbo: 0, gordura: 7, evitar: ["gota"] },
      { nome: "Salmão grelhado",          quantidade: "100g",          calorias: 185, proteina: 25, carbo: 0, gordura: 9 },
      { nome: "Atum em água",             quantidade: "1 lata (120g)", calorias: 150, proteina: 30, carbo: 0, gordura: 3 },
      { nome: "Lombo suíno assado",       quantidade: "100g",          calorias: 180, proteina: 27, carbo: 0, gordura: 8, evitar: ["gota", "colesterol"] },
      { nome: "Ovo cozido",               quantidade: "3 unidades",    calorias: 234, proteina: 18, carbo: 0, gordura: 15 },
      { nome: "Coxa de frango (s/ pele)", quantidade: "1 unidade",     calorias: 180, proteina: 26, carbo: 0, gordura: 8 },
      { nome: "Sardinha assada",          quantidade: "2 unidades",    calorias: 180, proteina: 24, carbo: 0, gordura: 9, evitar: ["gota"] },
      { nome: "Carne moída magra",        quantidade: "100g",          calorias: 180, proteina: 26, carbo: 0, gordura: 8, evitar: ["gota"] }
    ]
  },

  /* ---- SALADA ---- */
  salada: {
    nome: "Saladas e folhas",
    itens: [
      { nome: "Alface e rúcula",          quantidade: "À vontade", calorias: 20, proteina: 2, carbo: 3, gordura: 0 },
      { nome: "Alface e tomate",          quantidade: "À vontade", calorias: 25, proteina: 1, carbo: 4, gordura: 0, evitar: ["gastrite"] },
      { nome: "Rúcula com cenoura ralada",quantidade: "À vontade", calorias: 25, proteina: 2, carbo: 4, gordura: 0 },
      { nome: "Agrião com pepino",        quantidade: "À vontade", calorias: 20, proteina: 2, carbo: 3, gordura: 0 },
      { nome: "Repolho com cenoura",      quantidade: "À vontade", calorias: 25, proteina: 1, carbo: 5, gordura: 0, evitar: ["tireoide"] },
      { nome: "Mix de folhas verdes",     quantidade: "À vontade", calorias: 20, proteina: 2, carbo: 3, gordura: 0 },
      { nome: "Espinafre com tomate seco",quantidade: "À vontade", calorias: 30, proteina: 2, carbo: 4, gordura: 1, evitar: ["gastrite"] },
      { nome: "Cenoura com beterraba",    quantidade: "À vontade", calorias: 30, proteina: 1, carbo: 6, gordura: 0 }
    ]
  },

  /* ---- LEGUMES COZIDOS ---- */
  legumes: {
    nome: "Legumes cozidos",
    itens: [
      { nome: "Brócolis no vapor",          quantidade: "100g", calorias: 50, proteina: 3, carbo: 8,  gordura: 0 },
      { nome: "Cenoura e abobrinha",        quantidade: "100g", calorias: 45, proteina: 2, carbo: 9,  gordura: 0 },
      { nome: "Couve-flor no vapor",        quantidade: "100g", calorias: 40, proteina: 3, carbo: 6,  gordura: 0, evitar: ["tireoide"] },
      { nome: "Vagem refogada",             quantidade: "100g", calorias: 45, proteina: 2, carbo: 8,  gordura: 1 },
      { nome: "Chuchu cozido",              quantidade: "100g", calorias: 30, proteina: 1, carbo: 6,  gordura: 0 },
      { nome: "Abóbora cozida",             quantidade: "100g", calorias: 50, proteina: 1, carbo: 12, gordura: 0 },
      { nome: "Berinjela grelhada",         quantidade: "100g", calorias: 45, proteina: 1, carbo: 8,  gordura: 1 },
      { nome: "Beterraba cozida",           quantidade: "80g",  calorias: 50, proteina: 1, carbo: 10, gordura: 0 },
      { nome: "Quiabo refogado",            quantidade: "100g", calorias: 45, proteina: 2, carbo: 7,  gordura: 1 },
      { nome: "Pimentão colorido refogado", quantidade: "100g", calorias: 40, proteina: 1, carbo: 8,  gordura: 1 },
      { nome: "Acelga cozida",              quantidade: "100g", calorias: 20, proteina: 2, carbo: 3,  gordura: 0 },
      { nome: "Espinafre refogado",         quantidade: "100g", calorias: 25, proteina: 3, carbo: 3,  gordura: 1 },
      { nome: "Abobrinha grelhada",         quantidade: "100g", calorias: 35, proteina: 2, carbo: 6,  gordura: 1 },
      { nome: "Maxixe cozido",              quantidade: "100g", calorias: 20, proteina: 1, carbo: 4,  gordura: 0 },
      { nome: "Jiló grelhado",              quantidade: "80g",  calorias: 25, proteina: 1, carbo: 4,  gordura: 0 }
    ]
  },

  /* ---- GORDURA BOA ---- */
  gordura_boa: {
    nome: "Gorduras boas",
    itens: [
      { nome: "Azeite de oliva extra virgem", quantidade: "1 col. sopa", calorias: 90, proteina: 0, carbo: 0, gordura: 10 },
      { nome: "Óleo de coco",                 quantidade: "1 col. sopa", calorias: 90, proteina: 0, carbo: 0, gordura: 10 },
      { nome: "Abacate",                      quantidade: "2 col. sopa", calorias: 95, proteina: 1, carbo: 3, gordura: 9 },
      { nome: "Linhaça dourada",              quantidade: "1 col. sopa", calorias: 55, proteina: 2, carbo: 3, gordura: 4 },
      { nome: "Chia",                         quantidade: "1 col. sopa", calorias: 60, proteina: 2, carbo: 5, gordura: 4 },
      { nome: "Azeite de abacate",            quantidade: "1 col. sopa", calorias: 90, proteina: 0, carbo: 0, gordura: 10 }
    ]
  },

  /* ---- PROTEÍNA LEVE (jantar) ---- */
  proteina_leve: {
    nome: "Proteínas leves para o jantar",
    itens: [
      { nome: "Filé de peixe grelhado",  quantidade: "120g",         calorias: 150, proteina: 28, carbo: 0, gordura: 4 },
      { nome: "Peito de frango desfiado",quantidade: "100g",         calorias: 150, proteina: 25, carbo: 0, gordura: 5 },
      { nome: "Omelete de 2 ovos",       quantidade: "1 porção",     calorias: 180, proteina: 14, carbo: 2, gordura: 13 },
      { nome: "Atum em água",            quantidade: "1 lata (85g)", calorias: 100, proteina: 22, carbo: 0, gordura: 1 },
      { nome: "Sardinha assada",         quantidade: "2 unidades",   calorias: 150, proteina: 20, carbo: 0, gordura: 8, evitar: ["gota"] },
      { nome: "Tofu grelhado",           quantidade: "120g",         calorias: 130, proteina: 14, carbo: 2, gordura: 8 },
      { nome: "Ricota temperada",        quantidade: "80g",          calorias: 110, proteina: 10, carbo: 3, gordura: 7, evitar: ["lactose"] }
    ]
  },

  /* ---- SOPA ---- */
  sopa: {
    nome: "Sopas e caldos",
    itens: [
      { nome: "Sopa de legumes com frango",   quantidade: "300ml", calorias: 150, proteina: 12, carbo: 18, gordura: 3 },
      { nome: "Caldo de abóbora com gengibre",quantidade: "300ml", calorias: 120, proteina: 3,  carbo: 22, gordura: 2, evitar: ["gastrite"] },
      { nome: "Sopa de lentilha",             quantidade: "300ml", calorias: 160, proteina: 10, carbo: 24, gordura: 2, evitar: ["gota"] },
      { nome: "Creme de brócolis",            quantidade: "300ml", calorias: 130, proteina: 6,  carbo: 16, gordura: 4 },
      { nome: "Sopa de mandioquinha",         quantidade: "300ml", calorias: 140, proteina: 4,  carbo: 26, gordura: 2 },
      { nome: "Caldo verde (s/ linguiça)",    quantidade: "300ml", calorias: 130, proteina: 5,  carbo: 20, gordura: 3 },
      { nome: "Sopa de grão-de-bico",         quantidade: "300ml", calorias: 160, proteina: 8,  carbo: 24, gordura: 3, evitar: ["gota"] },
      { nome: "Creme de cenoura",             quantidade: "300ml", calorias: 120, proteina: 3,  carbo: 22, gordura: 3 }
    ]
  },

  /* ---- BEBIDA DO LANCHE ---- */
  bebida_lanche: {
    nome: "Bebidas para lanches",
    itens: [
      { nome: "Água de coco natural",   quantidade: "200ml",          calorias: 45,  proteina: 0,  carbo: 10, gordura: 0 },
      { nome: "Suco verde (couve+limão)", quantidade: "200ml",        calorias: 40,  proteina: 1,  carbo: 8,  gordura: 0 },
      { nome: "Suco de maracujá s/ açúcar", quantidade: "200ml",      calorias: 50,  proteina: 0,  carbo: 12, gordura: 0 },
      { nome: "Chá gelado de hibisco",   quantidade: "200ml",         calorias: 5,   proteina: 0,  carbo: 1,  gordura: 0 },
      { nome: "Limonada s/ açúcar",      quantidade: "200ml",         calorias: 10,  proteina: 0,  carbo: 3,  gordura: 0 },
      { nome: "Água com gás e limão",    quantidade: "200ml",         calorias: 5,   proteina: 0,  carbo: 1,  gordura: 0 }
    ]
  },

  /* ---- CEIA LEVE ---- */
  ceia_sementes: {
    nome: "Sementes e complementos",
    itens: [
      { nome: "Semente de chia",    quantidade: "1 col. sopa", calorias: 60, proteina: 2, carbo: 5,  gordura: 4 },
      { nome: "Semente de linhaça", quantidade: "1 col. sopa", calorias: 55, proteina: 2, carbo: 3,  gordura: 4 },
      { nome: "Granola sem açúcar", quantidade: "2 col. sopa", calorias: 60, proteina: 2, carbo: 8,  gordura: 2 },
      { nome: "Aveia em flocos",    quantidade: "2 col. sopa", calorias: 55, proteina: 2, carbo: 10, gordura: 1 },
      { nome: "Mel (1 col. chá)",   quantidade: "1 col. chá",  calorias: 20, proteina: 0, carbo: 5,  gordura: 0, evitar: ["diabetes"] }
    ]
  },

  /* ---- CEIA PROTEÍNAS ---- */
  ceia_proteina: {
    nome: "Proteínas leves para ceia",
    itens: [
      { nome: "Iogurte natural sem açúcar",  quantidade: "100g",  calorias: 60, proteina: 7, carbo: 6, gordura: 0, evitar: ["lactose"] },
      { nome: "Queijo cottage",              quantidade: "3 col. sopa", calorias: 55, proteina: 7, carbo: 2, gordura: 2, evitar: ["lactose"] },
      { nome: "Iogurte grego light",         quantidade: "80g",   calorias: 60, proteina: 8, carbo: 4, gordura: 1, evitar: ["lactose"] },
      { nome: "Leite morno desnatado",       quantidade: "150ml", calorias: 55, proteina: 5, carbo: 8, gordura: 0, evitar: ["lactose"] },
      { nome: "Bebida vegetal de amêndoa",   quantidade: "200ml", calorias: 30, proteina: 1, carbo: 3, gordura: 1 }
    ]
  },

  ceia_complemento: {
    nome: "Complementos para ceia",
    itens: [
      { nome: "Chá de camomila",    quantidade: "200ml", calorias: 2, proteina: 0, carbo: 0, gordura: 0 },
      { nome: "Chá de erva-cidreira",quantidade: "200ml",calorias: 2, proteina: 0, carbo: 0, gordura: 0 },
      { nome: "Chá de mulungu",     quantidade: "200ml", calorias: 2, proteina: 0, carbo: 0, gordura: 0 },
      { nome: "Chá de maracujá",    quantidade: "200ml", calorias: 2, proteina: 0, carbo: 0, gordura: 0 },
      { nome: "Chá de erva-doce",   quantidade: "200ml", calorias: 2, proteina: 0, carbo: 0, gordura: 0 }
    ]
  }
};

/* ============================================================
   MODELOS DE REFEIÇÃO COM VARIAÇÕES

   Cada refeição tem múltiplas combinações possíveis.
   Cada combinação é um array de referências a grupos de
   substituição. O sistema escolhe uma combinação por dia.
============================================================ */
const REFEICOES_MODELO = {
  cafe: {
    nome: "Café da Manhã",
    icone: "☀️",
    horario: "7h – 8h",
    percCaloria: 0.22,
    variacoes: [
      // Variação 1: Pão + proteína + ovo + fruta + bebida
      [
        { grupo: "pao_manha",      indiceBase: 0 },
        { grupo: "proteina_manha", indiceBase: 0 },
        { grupo: "ovo",            indiceBase: 0 },
        { grupo: "fruta",          indiceBase: 0 },
        { grupo: "bebida_cafe",    indiceBase: 0 }
      ],
      // Variação 2: Aveia + iogurte + fruta + castanha + bebida
      [
        { grupo: "pao_manha",      indiceBase: 6 },
        { grupo: "iogurte",        indiceBase: 0 },
        { grupo: "fruta",          indiceBase: 2 },
        { grupo: "castanha",       indiceBase: 0 },
        { grupo: "bebida_cafe",    indiceBase: 2 }
      ],
      // Variação 3: Tapioca + ovo + fruta + bebida
      [
        { grupo: "pao_manha",      indiceBase: 1 },
        { grupo: "proteina_manha", indiceBase: 1 },
        { grupo: "ovo",            indiceBase: 2 },
        { grupo: "fruta",          indiceBase: 5 },
        { grupo: "bebida_cafe",    indiceBase: 0 }
      ],
      // Variação 4: Cuscuz + ovo + fruta + bebida
      [
        { grupo: "pao_manha",      indiceBase: 2 },
        { grupo: "proteina_manha", indiceBase: 5 },
        { grupo: "ovo",            indiceBase: 1 },
        { grupo: "fruta",          indiceBase: 3 },
        { grupo: "bebida_cafe",    indiceBase: 1 }
      ],
      // Variação 5: Crepioca + fruta + iogurte + bebida
      [
        { grupo: "pao_manha",      indiceBase: 5 },
        { grupo: "fruta",          indiceBase: 8 },
        { grupo: "iogurte",        indiceBase: 1 },
        { grupo: "castanha",       indiceBase: 1 },
        { grupo: "bebida_cafe",    indiceBase: 3 }
      ]
    ]
  },

  lancheManha: {
    nome: "Lanche da Manhã",
    icone: "🍎",
    horario: "10h – 10h30",
    percCaloria: 0.10,
    variacoes: [
      [
        { grupo: "fruta",          indiceBase: 0 },
        { grupo: "iogurte",        indiceBase: 0 },
        { grupo: "castanha",       indiceBase: 0 }
      ],
      [
        { grupo: "fruta",          indiceBase: 4 },
        { grupo: "castanha",       indiceBase: 3 },
        { grupo: "bebida_lanche",  indiceBase: 0 }
      ],
      [
        { grupo: "iogurte",        indiceBase: 1 },
        { grupo: "fruta",          indiceBase: 6 },
        { grupo: "castanha",       indiceBase: 2 }
      ],
      [
        { grupo: "fruta",          indiceBase: 9 },
        { grupo: "proteina_manha", indiceBase: 4 },
        { grupo: "bebida_lanche",  indiceBase: 3 }
      ]
    ]
  },

  almoco: {
    nome: "Almoço",
    icone: "🍽️",
    horario: "12h – 13h",
    percCaloria: 0.33,
    variacoes: [
      [
        { grupo: "arroz",              indiceBase: 0 },
        { grupo: "feijao",             indiceBase: 0 },
        { grupo: "proteina_principal", indiceBase: 0 },
        { grupo: "salada",             indiceBase: 0 },
        { grupo: "legumes",            indiceBase: 0 },
        { grupo: "gordura_boa",        indiceBase: 0 }
      ],
      [
        { grupo: "arroz",              indiceBase: 2 },
        { grupo: "feijao",             indiceBase: 2 },
        { grupo: "proteina_principal", indiceBase: 3 },
        { grupo: "salada",             indiceBase: 2 },
        { grupo: "legumes",            indiceBase: 6 },
        { grupo: "gordura_boa",        indiceBase: 0 }
      ],
      [
        { grupo: "arroz",              indiceBase: 0 },
        { grupo: "feijao",             indiceBase: 1 },
        { grupo: "proteina_principal", indiceBase: 2 },
        { grupo: "salada",             indiceBase: 1 },
        { grupo: "legumes",            indiceBase: 2 },
        { grupo: "gordura_boa",        indiceBase: 2 }
      ],
      [
        { grupo: "arroz",              indiceBase: 3 },
        { grupo: "feijao",             indiceBase: 3 },
        { grupo: "proteina_principal", indiceBase: 1 },
        { grupo: "salada",             indiceBase: 5 },
        { grupo: "legumes",            indiceBase: 3 },
        { grupo: "gordura_boa",        indiceBase: 0 }
      ],
      [
        { grupo: "arroz",              indiceBase: 0 },
        { grupo: "feijao",             indiceBase: 0 },
        { grupo: "proteina_principal", indiceBase: 8 },
        { grupo: "salada",             indiceBase: 3 },
        { grupo: "legumes",            indiceBase: 7 },
        { grupo: "gordura_boa",        indiceBase: 4 }
      ],
      [
        { grupo: "arroz",              indiceBase: 4 },
        { grupo: "feijao",             indiceBase: 5 },
        { grupo: "proteina_principal", indiceBase: 9 },
        { grupo: "salada",             indiceBase: 4 },
        { grupo: "legumes",            indiceBase: 4 },
        { grupo: "gordura_boa",        indiceBase: 0 }
      ],
      [
        { grupo: "arroz",              indiceBase: 6 },
        { grupo: "feijao",             indiceBase: 4 },
        { grupo: "proteina_principal", indiceBase: 5 },
        { grupo: "salada",             indiceBase: 6 },
        { grupo: "legumes",            indiceBase: 8 },
        { grupo: "gordura_boa",        indiceBase: 3 }
      ]
    ]
  },

  lancheTarde: {
    nome: "Lanche da Tarde",
    icone: "🫐",
    horario: "15h – 16h",
    percCaloria: 0.10,
    variacoes: [
      [
        { grupo: "fruta",          indiceBase: 1 },
        { grupo: "castanha",       indiceBase: 1 },
        { grupo: "bebida_lanche",  indiceBase: 0 }
      ],
      [
        { grupo: "fruta",          indiceBase: 10 },
        { grupo: "proteina_manha", indiceBase: 4 },
        { grupo: "bebida_lanche",  indiceBase: 1 }
      ],
      [
        { grupo: "iogurte",        indiceBase: 2 },
        { grupo: "fruta",          indiceBase: 7 },
        { grupo: "castanha",       indiceBase: 4 }
      ],
      [
        { grupo: "fruta",          indiceBase: 3 },
        { grupo: "castanha",       indiceBase: 5 },
        { grupo: "bebida_lanche",  indiceBase: 4 }
      ]
    ]
  },

  jantar: {
    nome: "Jantar",
    icone: "🌙",
    horario: "19h – 20h",
    percCaloria: 0.20,
    variacoes: [
      [
        { grupo: "sopa",            indiceBase: 0 },
        { grupo: "proteina_leve",   indiceBase: 2 },
        { grupo: "salada",          indiceBase: 0 }
      ],
      [
        { grupo: "proteina_leve",   indiceBase: 0 },
        { grupo: "legumes",         indiceBase: 0 },
        { grupo: "salada",          indiceBase: 1 },
        { grupo: "gordura_boa",     indiceBase: 0 }
      ],
      [
        { grupo: "sopa",            indiceBase: 2 },
        { grupo: "proteina_leve",   indiceBase: 1 },
        { grupo: "salada",          indiceBase: 3 }
      ],
      [
        { grupo: "proteina_leve",   indiceBase: 4 },
        { grupo: "arroz",           indiceBase: 0 },
        { grupo: "salada",          indiceBase: 5 },
        { grupo: "legumes",         indiceBase: 5 }
      ],
      [
        { grupo: "sopa",            indiceBase: 5 },
        { grupo: "proteina_leve",   indiceBase: 3 },
        { grupo: "salada",          indiceBase: 2 }
      ],
      [
        { grupo: "proteina_leve",   indiceBase: 5 },
        { grupo: "legumes",         indiceBase: 6 },
        { grupo: "salada",          indiceBase: 4 },
        { grupo: "gordura_boa",     indiceBase: 0 }
      ]
    ]
  },

  ceia: {
    nome: "Ceia",
    icone: "🌛",
    horario: "21h – 22h",
    percCaloria: 0.05,
    variacoes: [
      [
        { grupo: "ceia_proteina",     indiceBase: 0 },
        { grupo: "ceia_complemento",  indiceBase: 0 },
        { grupo: "ceia_sementes",     indiceBase: 0 }
      ],
      [
        { grupo: "ceia_proteina",     indiceBase: 2 },
        { grupo: "ceia_complemento",  indiceBase: 1 },
        { grupo: "ceia_sementes",     indiceBase: 1 }
      ],
      [
        { grupo: "ceia_proteina",     indiceBase: 1 },
        { grupo: "ceia_complemento",  indiceBase: 3 },
        { grupo: "ceia_sementes",     indiceBase: 2 }
      ],
      [
        { grupo: "ceia_proteina",     indiceBase: 3 },
        { grupo: "ceia_complemento",  indiceBase: 4 },
        { grupo: "ceia_sementes",     indiceBase: 3 }
      ]
    ]
  }
};

/* ============================================================
   sementeDodia(diaOffset)
   Gera um número baseado na data para que o cardápio mude
   todo dia. diaOffset = 0 é hoje, 1 é amanhã, etc.
============================================================ */
function sementeDoDia(diaOffset) {
  const base = new Date();
  base.setDate(base.getDate() + (diaOffset || 0));
  const inicio = new Date(base.getFullYear(), 0, 0);
  const diff = base - inicio;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);
  return diaDoAno + base.getFullYear();
}

/* ============================================================
   escolherVariacaoDoDia(refeicaoKey, diaOffset)
   Retorna o índice da variação a usar para a refeição no dia.
============================================================ */
function escolherVariacaoDoDia(refeicaoKey, diaOffset) {
  const semente = sementeDoDia(diaOffset || 0);
  const modelo = REFEICOES_MODELO[refeicaoKey];
  if (!modelo) return 0;

  const chaves = Object.keys(REFEICOES_MODELO);
  const offset = chaves.indexOf(refeicaoKey);
  const idx = (semente + offset * 7) % modelo.variacoes.length;
  return idx;
}

/* ============================================================
   montarRefeicaoDoDia(refeicaoKey, diaOffset, condicoes)
   Retorna os itens da refeição para o dia especificado.
   diaOffset = 0 é hoje, 1 é amanhã, etc.
   condicoes = array de condições do usuário (ex: ["diabetes", "gota"])
   — itens marcados com evitar:[...] são automaticamente pulados.
============================================================ */
function montarRefeicaoDoDia(refeicaoKey, diaOffset, condicoes) {
  const modelo = REFEICOES_MODELO[refeicaoKey];
  const variacaoIdx = escolherVariacaoDoDia(refeicaoKey, diaOffset || 0);
  const variacao = modelo.variacoes[variacaoIdx];
  const ativas = (condicoes || []).filter(c => c !== 'nenhum');

  function itemSeguro(item) {
    if (!item.evitar || item.evitar.length === 0) return true;
    return !ativas.some(c => item.evitar.includes(c));
  }

  return variacao.map(slot => {
    const grupo = GRUPOS_SUBSTITUICAO[slot.grupo];
    const baseIdx = slot.indiceBase % grupo.itens.length;

    // Sem condições: usa o índice base normalmente
    if (ativas.length === 0) {
      return { ...grupo.itens[baseIdx], grupoId: slot.grupo, grupoNome: grupo.nome, indiceNoGrupo: baseIdx };
    }

    // Tenta o item base primeiro
    if (itemSeguro(grupo.itens[baseIdx])) {
      return { ...grupo.itens[baseIdx], grupoId: slot.grupo, grupoNome: grupo.nome, indiceNoGrupo: baseIdx };
    }

    // Procura o próximo item seguro no grupo (rotação circular)
    for (let i = 1; i < grupo.itens.length; i++) {
      const idx = (baseIdx + i) % grupo.itens.length;
      if (itemSeguro(grupo.itens[idx])) {
        return { ...grupo.itens[idx], grupoId: slot.grupo, grupoNome: grupo.nome, indiceNoGrupo: idx };
      }
    }

    // Fallback: usa o base mesmo assim (grupo sem alternativas seguras)
    return { ...grupo.itens[baseIdx], grupoId: slot.grupo, grupoNome: grupo.nome, indiceNoGrupo: baseIdx };
  });
}

/* ============================================================
   obterSubstituicoes(grupoId, indiceAtual)
   Retorna todos os itens do grupo EXCETO o item atual,
   para exibir como opções de substituição.
============================================================ */
function obterSubstituicoes(grupoId, indiceAtual) {
  const grupo = GRUPOS_SUBSTITUICAO[grupoId];
  if (!grupo) return [];

  return grupo.itens
    .map((item, idx) => ({ ...item, indice: idx }))
    .filter(item => item.indice !== indiceAtual);
}

export { GRUPOS_SUBSTITUICAO, REFEICOES_MODELO, montarRefeicaoDoDia, obterSubstituicoes };
