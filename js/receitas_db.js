/* ============================================================
   receitas_db.js — Banco de receitas e modo de preparo
============================================================ */

const RECEITAS_DB = {
  "Peito de frango grelhado": {
    tempo: "15 min", porcao: "150g",
    ingredientes: ["150g peito de frango", "1 dente de alho amassado", "Suco de 1/2 limão", "Azeite a gosto", "Sal e pimenta do reino"],
    preparo: ["Tempere o frango com alho, limão, sal e pimenta. Deixe marinar 10 min.", "Aqueça frigideira antiaderente em fogo médio-alto com fio de azeite.", "Grelhe 6-7 min de cada lado até dourar.", "Deixe descansar 2 min antes de fatiar."],
    dica: "Cobrir a frigideira nos primeiros 3 min mantém o frango mais suculento."
  },
  "Filé de peixe grelhado": {
    tempo: "12 min", porcao: "150g",
    ingredientes: ["150g de filé de tilápia ou merluza", "Limão", "Azeite", "Sal, alho e cheiro-verde"],
    preparo: ["Tempere o peixe com sal, alho e limão.", "Aqueça frigideira com azeite em fogo médio.", "Grelhe 4-5 min de cada lado até ficar opaco.", "Finalize com cheiro-verde picado."],
    dica: "O peixe está pronto quando a carne se separa facilmente com um garfo."
  },
  "Frango ao forno com legumes": {
    tempo: "40 min", porcao: "200g",
    ingredientes: ["200g de frango (coxa ou peito)", "Abobrinha, cenoura e cebola", "Azeite, alho, ervas a gosto"],
    preparo: ["Pré-aqueça o forno a 200°C.", "Tempere o frango e os legumes cortados.", "Coloque em assadeira com azeite.", "Asse por 35-40 min virando uma vez na metade."],
    dica: "Cubra com papel alumínio nos primeiros 20 min para não ressecar."
  },
  "Ovo cozido": {
    tempo: "12 min", porcao: "1 unidade",
    ingredientes: ["1 ovo", "Água suficiente para cobrir", "Sal opcional"],
    preparo: ["Coloque o ovo em água fria.", "Leve ao fogo e conte 10 min após ferver para gema firme.", "Para gema molinha, retire após 7 min.", "Coloque em água gelada por 5 min para descascar fácil."],
    dica: "Ovos mais velhos descascam mais fácil que ovos frescos."
  },
  "Ovo mexido": {
    tempo: "5 min", porcao: "1 unidade",
    ingredientes: ["1-2 ovos", "Sal a gosto", "Azeite ou manteiga light"],
    preparo: ["Bata os ovos com sal.", "Aqueça frigideira em fogo baixo com azeite.", "Adicione os ovos e mexa devagar com espátula.", "Retire antes de secar completamente — terminam de cozinhar com o calor residual."],
    dica: "Fogo baixo é o segredo do ovo mexido cremoso."
  },
  "Omelete simples": {
    tempo: "8 min", porcao: "1 unidade",
    ingredientes: ["2 ovos", "Sal e pimenta", "Azeite", "Opcional: queijo, tomate, ervas"],
    preparo: ["Bata os ovos com sal e pimenta.", "Aqueça frigideira com azeite em fogo médio.", "Despeje os ovos e não mexa — deixe firmar nas bordas.", "Dobre ao meio com espátula e retire."],
    dica: "Adicione queijo branco ralado para aumentar proteína sem muita gordura."
  },
  "Arroz integral cozido": {
    tempo: "35 min", porcao: "4 col. sopa (80g cru)",
    ingredientes: ["1 xícara de arroz integral", "2 xícaras de água", "Sal e azeite a gosto", "1 dente de alho"],
    preparo: ["Refogue o alho no azeite.", "Adicione o arroz e refogue mais 1 min.", "Adicione água quente e sal.", "Cozinhe tampado em fogo baixo por 30-35 min."],
    dica: "Deixe de molho 30 min antes para reduzir o tempo de cozimento."
  },
  "Feijão cozido": {
    tempo: "45 min", porcao: "1 concha",
    ingredientes: ["1 xícara feijão (deixar de molho 8h)", "Água", "Sal, alho, cebola e louro"],
    preparo: ["Descarte a água do molho e lave o feijão.", "Cozinhe na pressão por 20-25 min.", "Refogue alho e cebola, adicione o feijão cozido.", "Tempere e cozinhe mais 5 min aberto."],
    dica: "O molho de molho reduz o tempo de cozimento e melhora a digestão."
  },
  "Batata doce cozida": {
    tempo: "25 min", porcao: "100g",
    ingredientes: ["100g de batata doce", "Água", "Sal opcional", "Canela (opcional para sobremesa)"],
    preparo: ["Descasque e corte em cubos médios.", "Cozinhe em água com sal por 20 min até amolecer.", "Escorra e sirva simples ou amassada.", "Para opção doce, polvilhe canela."],
    dica: "Batata doce roxa tem mais antioxidantes que a laranja."
  },
  "Tapioca": {
    tempo: "5 min", porcao: "1 unidade (80g)",
    ingredientes: ["4 col. sopa de tapioca hidratada", "Recheio: queijo branco, frango, atum, banana"],
    preparo: ["Espalhe a tapioca em frigideira antiaderente fria.", "Leve ao fogo médio sem mexer.", "Quando as bordas firmarem (~2 min), adicione o recheio.", "Dobre ao meio e sirva."],
    dica: "Não precisa de óleo — a frigideira deve estar seca."
  },
  "Iogurte grego natural": {
    tempo: "0 min", porcao: "1 pote (170g)",
    ingredientes: ["1 pote de iogurte grego sem açúcar", "Frutas, granola ou mel a gosto"],
    preparo: ["Sirva gelado.", "Adicione frutas frescas para aumentar vitaminas.", "Prefira granolas sem açúcar adicionado — verifique o rótulo."],
    dica: "Escolha versões sem açúcar adicionado. Verifique o rótulo."
  },
  "Salada verde variada": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["Alface, rúcula ou espinafre", "Tomate cereja", "Pepino", "Azeite e limão para temperar"],
    preparo: ["Lave bem os legumes em água corrente.", "Rasgue as folhas na mão para não oxidar.", "Corte os demais ingredientes.", "Tempere na hora de servir."],
    dica: "Tempere só na hora para não murchar. Folhas escuras têm mais ferro."
  },
  "Sopa de legumes com frango": {
    tempo: "30 min", porcao: "1 prato fundo",
    ingredientes: ["150g frango desfiado", "Cenoura, abobrinha, batata doce", "Caldo de legumes natural", "Sal e cheiro-verde"],
    preparo: ["Cozinhe o frango e desfie.", "Refogue os legumes cortados em cubos.", "Adicione caldo e frango.", "Cozinhe 20 min em fogo médio. Finalize com cheiro-verde."],
    dica: "Evite sal em excesso e prefira temperos naturais como ervas e limão."
  },
  "Aveia em flocos": {
    tempo: "5 min", porcao: "4 col. sopa (40g)",
    ingredientes: ["40g de aveia em flocos", "200ml leite ou bebida vegetal", "Mel ou canela a gosto"],
    preparo: ["Misture aveia e leite em panela.", "Cozinhe em fogo médio mexendo sempre.", "Pronto em 3-4 min quando engrossar.", "Adicione frutas ou canela para servir."],
    dica: "A beta-glucana da aveia é uma fibra solúvel que ajuda na saciedade e no bem-estar intestinal."
  },
  "Quinoa cozida": {
    tempo: "20 min", porcao: "4 col. sopa (80g cru)",
    ingredientes: ["1 xícara de quinoa", "2 xícaras de água", "Sal"],
    preparo: ["Lave a quinoa em peneira fina para remover amargor.", "Ferva a água com sal, adicione a quinoa.", "Cozinhe tampado em fogo baixo por 15 min.", "Solte com garfo antes de servir."],
    dica: "Quando estiver pronta, cada grão fica com um 'anel' branco ao redor."
  },
  "Azeite de oliva": {
    tempo: "0 min", porcao: "1 col. sopa (15ml)",
    ingredientes: ["Azeite extravirgem de qualidade"],
    preparo: ["Use cru para preservar os nutrientes.", "Para refogar, use fogo baixo/médio.", "Evite aquecer até fumaça."],
    dica: "O azeite extravirgem é anti-inflamatório e protege o fígado."
  },
  "Peito de peru": {
    tempo: "0 min", porcao: "2 fatias (30g)",
    ingredientes: ["Peito de peru sem pele, sem fumaça líquida"],
    preparo: ["Verifique o rótulo: escolha sem conservantes em excesso.", "Use como proteína rápida no café da manhã.", "Combine com pão integral e queijo."],
    dica: "Para hipertensão: prefira versões com menos sódio."
  },
  "Pasta de amendoim": {
    tempo: "0 min", porcao: "1 col. sopa (15g)",
    ingredientes: ["Pasta de amendoim pura (100% amendoim)"],
    preparo: ["Verifique que o ingrediente seja apenas amendoim.", "Use com torrada, tapioca ou fruta.", "Refrigere após aberto."],
    dica: "Evite versões com açúcar adicionado. A pasta natural dura 3 meses na geladeira."
  },
  "Cuscuz de milho": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["Farinha de milho para cuscuz (flocão)", "Água morna com sal a gosto"],
    preparo: ["Molhe o flocão com água morna salgada aos poucos.", "Mexa até incorporar sem encharcar.", "Coloque na cuscuzeira e leve ao vapor por 8 min.", "Desenforme e sirva com proteína."],
    dica: "Para um cuscuz úmido, adicione uma colher de margarina ou azeite."
  },
  "Crepioca (ovo + tapioca)": {
    tempo: "8 min", porcao: "1 unidade",
    ingredientes: ["1 ovo inteiro", "2 col. sopa de tapioca hidratada", "Sal", "Recheio opcional: frango, queijo"],
    preparo: ["Misture o ovo batido com a tapioca.", "Despeje em frigideira antiaderente em fogo médio.", "Cozinhe 3 min de cada lado.", "Recheie e dobre."],
    dica: "A crepioca tem mais proteína que a tapioca comum. Ótima para quem malha."
  }
};

function obterReceita(nomeAlimento) {
  // Busca exata
  if (RECEITAS_DB[nomeAlimento]) return RECEITAS_DB[nomeAlimento];
  // Busca parcial (ignora preparação: "grelhado", "cozido", etc.)
  const chave = Object.keys(RECEITAS_DB).find(k =>
    nomeAlimento.toLowerCase().includes(k.toLowerCase().split(' ')[0]) ||
    k.toLowerCase().includes(nomeAlimento.toLowerCase().split(' ')[0])
  );
  return chave ? RECEITAS_DB[chave] : null;
}
