/* ============================================================
   receitas-db.js — Banco de receitas e modo de preparo
   65 receitas cobrindo café da manhã, almoço, jantar,
   lanches, sopas, legumes e pratos completos.
============================================================ */

const RECEITAS_DB = {

  /* ============================================================
     CAFÉ DA MANHÃ
  ============================================================ */

  "Peito de frango grelhado": {
    tempo: "15 min", porcao: "150g",
    ingredientes: ["150g peito de frango", "1 dente de alho amassado", "Suco de 1/2 limão", "Azeite a gosto", "Sal e pimenta do reino"],
    preparo: ["Tempere o frango com alho, limão, sal e pimenta. Deixe marinar 10 min.", "Aqueça frigideira antiaderente em fogo médio-alto com fio de azeite.", "Grelhe 6-7 min de cada lado até dourar.", "Deixe descansar 2 min antes de fatiar."],
    dica: "Cobrir a frigideira nos primeiros 3 min mantém o frango mais suculento."
  },

  "Aveia em flocos": {
    tempo: "5 min", porcao: "4 col. sopa (40g)",
    ingredientes: ["40g de aveia em flocos", "200ml leite desnatado ou bebida vegetal", "1 col. chá de mel ou canela a gosto"],
    preparo: ["Misture a aveia e o leite em panela pequena.", "Leve ao fogo médio mexendo sempre.", "Cozinhe 3-4 min até engrossar.", "Adicione canela ou mel e sirva com frutas."],
    dica: "A beta-glucana da aveia ajuda na saciedade e bem-estar intestinal — ótima para o café da manhã."
  },

  "Tapioca": {
    tempo: "5 min", porcao: "1 unidade (80g)",
    ingredientes: ["4 col. sopa de tapioca hidratada", "Recheio: queijo branco, frango desfiado, atum ou banana"],
    preparo: ["Espalhe a tapioca em frigideira antiaderente fria.", "Leve ao fogo médio sem mexer.", "Quando as bordas firmarem (~2 min), adicione o recheio.", "Dobre ao meio e sirva."],
    dica: "Não precisa de óleo — a frigideira deve estar completamente seca."
  },

  "Crepioca (ovo + tapioca)": {
    tempo: "8 min", porcao: "1 unidade",
    ingredientes: ["1 ovo inteiro", "2 col. sopa de tapioca hidratada", "Sal", "Recheio opcional: frango desfiado ou queijo branco"],
    preparo: ["Bata o ovo e misture com a tapioca.", "Despeje em frigideira antiaderente em fogo médio.", "Cozinhe 3 min de cada lado até dourar.", "Recheie e dobre ao meio."],
    dica: "A crepioca tem mais proteína que a tapioca comum — ótima para quem pratica atividade física."
  },

  "Ovo cozido": {
    tempo: "12 min", porcao: "1 unidade",
    ingredientes: ["1 ovo", "Água suficiente para cobrir", "Sal opcional"],
    preparo: ["Coloque o ovo em água fria.", "Leve ao fogo e conte 10 min após ferver para gema firme.", "Para gema molinha, retire após 7 min.", "Coloque em água gelada por 5 min para descascar fácil."],
    dica: "Ovos mais velhos (próximos ao vencimento) descascam mais fácil que ovos frescos."
  },

  "Ovo mexido": {
    tempo: "5 min", porcao: "1-2 unidades",
    ingredientes: ["2 ovos", "Sal a gosto", "Azeite ou manteiga light", "Cheiro-verde opcional"],
    preparo: ["Bata os ovos com sal.", "Aqueça frigideira em fogo baixo com azeite.", "Adicione os ovos e mexa devagar com espátula.", "Retire antes de secar completamente — terminam de cozinhar com o calor residual."],
    dica: "Fogo baixo é o segredo do ovo mexido cremoso. Finalize com cheiro-verde picado."
  },

  "Omelete simples": {
    tempo: "8 min", porcao: "1 unidade",
    ingredientes: ["2 ovos", "Sal e pimenta", "Azeite", "Opcional: queijo branco, tomate, ervas"],
    preparo: ["Bata os ovos com sal e pimenta.", "Aqueça frigideira com azeite em fogo médio.", "Despeje os ovos e não mexa — deixe firmar nas bordas.", "Adicione o recheio no centro e dobre ao meio com espátula."],
    dica: "Adicione queijo branco para aumentar proteína. Queijo cottage fica ainda mais cremoso."
  },

  "Ovo pochê": {
    tempo: "10 min", porcao: "1 unidade",
    ingredientes: ["1 ovo fresco", "500ml de água", "1 col. sopa de vinagre branco", "Sal"],
    preparo: ["Ferva a água com o vinagre em panela pequena.", "Quebre o ovo em xícara separada.", "Faça um redemoinho na água com colher.", "Deslize o ovo no centro e cozinhe 3-4 min."],
    dica: "O vinagre ajuda a clara a firmar rapidamente. Use sempre ovos frescos para melhor resultado."
  },

  "Clara de ovo mexida": {
    tempo: "5 min", porcao: "3 claras",
    ingredientes: ["3 claras de ovo", "Sal e pimenta", "Azeite", "Cúrcuma para colorir (opcional)"],
    preparo: ["Bata as claras com sal e cúrcuma.", "Aqueça frigideira com fio de azeite em fogo baixo.", "Despeje as claras e mexa delicadamente.", "Retire quando ainda úmidas — não deixe ressecar."],
    dica: "Claras puras têm quase zero gordura e 11g de proteína por porção. Ideal para quem quer emagrecer."
  },

  "Cuscuz de milho": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["Farinha de milho para cuscuz (flocão)", "Água morna com sal a gosto"],
    preparo: ["Molhe o flocão com água morna salgada aos poucos.", "Mexa até incorporar sem encharcar.", "Coloque na cuscuzeira e leve ao vapor por 8 min.", "Desenforme e sirva com ovo, queijo ou frango."],
    dica: "Para um cuscuz mais úmido e nutritivo, adicione uma colher de azeite antes de servir."
  },

  "Pão integral": {
    tempo: "2 min", porcao: "2 fatias (50g)",
    ingredientes: ["2 fatias de pão integral", "Recheio: queijo branco, peito de peru, ricota ou abacate"],
    preparo: ["Leve o pão ao torradeiro ou frigideira seca.", "Torre 2-3 min até ficar crocante.", "Passe o recheio escolhido.", "Sirva imediatamente."],
    dica: "Escolha pães com farinha integral no primeiro item dos ingredientes. Evite os que têm açúcar nos primeiros itens."
  },

  "Panqueca de aveia": {
    tempo: "12 min", porcao: "3 unidades",
    ingredientes: ["2 ovos", "3 col. sopa de aveia em flocos", "1 banana madura amassada", "Canela a gosto", "Azeite para untar"],
    preparo: ["Amasse a banana bem e misture com os ovos batidos.", "Adicione a aveia e a canela — mexa até homogeneizar.", "Aqueça frigideira untada com azeite em fogo baixo.", "Despeje pequenas porções e cozinhe 2 min de cada lado."],
    dica: "Quanto mais madura a banana, mais doce fica a panqueca sem precisar de açúcar."
  },

  "Vitamina de banana com aveia": {
    tempo: "5 min", porcao: "1 copo (300ml)",
    ingredientes: ["1 banana prata", "200ml leite desnatado ou bebida vegetal", "2 col. sopa de aveia", "1 col. chá de mel (opcional)", "Canela"],
    preparo: ["Bata todos os ingredientes no liquidificador.", "Ajuste a consistência com mais leite se necessário.", "Sirva gelado.", "Polvilhe canela por cima."],
    dica: "Adicione 1 col. sopa de pasta de amendoim para aumentar proteína e saciedade."
  },

  "Overnight oats": {
    tempo: "5 min (+ 8h geladeira)", porcao: "1 pote",
    ingredientes: ["4 col. sopa de aveia em flocos", "150ml iogurte natural sem açúcar", "1 fruta picada (morango, banana ou manga)", "1 col. chá de mel", "Canela"],
    preparo: ["Misture a aveia e o iogurte no pote.", "Adicione mel e canela — mexa bem.", "Cubra e leve à geladeira de um dia para o outro.", "Na manhã seguinte, adicione a fruta fresca e sirva gelado."],
    dica: "Prepare na noite anterior para um café da manhã prático e nutritivo. Dura 3 dias na geladeira."
  },

  "Iogurte grego natural": {
    tempo: "0 min", porcao: "1 pote (170g)",
    ingredientes: ["1 pote de iogurte grego sem açúcar", "Frutas frescas a gosto", "Granola sem açúcar opcional"],
    preparo: ["Sirva o iogurte gelado em bowl ou pote.", "Adicione frutas frescas picadas por cima.", "Polvilhe granola antes de servir para manter crocância.", "Finalize com fio de mel se desejar."],
    dica: "Escolha sempre versão sem açúcar adicionado. Verifique o rótulo — o açúcar deve vir apenas da lactose."
  },

  "Pasta de amendoim": {
    tempo: "0 min", porcao: "1 col. sopa (15g)",
    ingredientes: ["Pasta de amendoim pura (100% amendoim)"],
    preparo: ["Verifique que o único ingrediente seja amendoim.", "Use com torrada integral, tapioca ou fruta.", "Refrigere após aberto.", "Mexa bem antes de usar — o óleo separa naturalmente."],
    dica: "Evite versões com açúcar adicionado ou óleo de palma. A pasta natural dura 3 meses na geladeira."
  },

  "Peito de peru": {
    tempo: "0 min", porcao: "2 fatias (30g)",
    ingredientes: ["Peito de peru fatiado sem fumaça líquida"],
    preparo: ["Verifique o rótulo: escolha versões sem conservantes em excesso.", "Use como proteína rápida no café da manhã.", "Combine com pão integral e queijo branco.", "Não precisa cozinhar — pronto para consumo."],
    dica: "Prefira versões com menos de 600mg de sódio por 100g. Verifique sempre o rótulo nutricional."
  },

  /* ============================================================
     PROTEÍNAS PRINCIPAIS
  ============================================================ */

  "Filé de peixe grelhado": {
    tempo: "12 min", porcao: "150g",
    ingredientes: ["150g de filé de tilápia ou merluza", "Suco de 1 limão", "Azeite", "Sal, alho e cheiro-verde"],
    preparo: ["Tempere o peixe com sal, alho e limão. Marine 5 min.", "Aqueça frigideira com fio de azeite em fogo médio.", "Grelhe 4-5 min de cada lado até ficar opaco.", "Finalize com cheiro-verde picado."],
    dica: "O peixe está pronto quando a carne se separa facilmente com um garfo — não precisa virar mais de uma vez."
  },

  "Filé de tilápia": {
    tempo: "12 min", porcao: "150g",
    ingredientes: ["150g de filé de tilápia", "Limão", "Azeite", "Sal, alho, pimenta-do-reino e cheiro-verde"],
    preparo: ["Tempere com sal, alho, limão e pimenta.", "Aqueça frigideira antiaderente com azeite em fogo médio.", "Grelhe 4-5 min de cada lado sem mexer.", "Finalize com cheiro-verde e sirva imediatamente."],
    dica: "A tilápia tem baixo teor de gordura e alto de proteína — uma das melhores opções para quem cuida do fígado."
  },

  "Salmão grelhado": {
    tempo: "15 min", porcao: "100g",
    ingredientes: ["100g de filé de salmão com pele", "Sal, pimenta e limão", "Azeite", "Alho e ervas a gosto"],
    preparo: ["Tempere o salmão com sal, pimenta e limão.", "Aqueça frigideira em fogo médio-alto com azeite.", "Grelhe com a pele para baixo por 5-6 min.", "Vire e cozinhe mais 3 min até a carne ficar opaca no centro."],
    dica: "O salmão é rico em ômega-3, anti-inflamatório natural. Não cozinhe demais — pode ficar seco."
  },

  "Sardinha assada": {
    tempo: "20 min", porcao: "2 unidades",
    ingredientes: ["2 sardinhas limpas", "Azeite", "Alho, sal, limão e orégano"],
    preparo: ["Pré-aqueça o forno a 200°C.", "Tempere as sardinhas com azeite, alho, sal e limão.", "Coloque em assadeira e leve ao forno por 15-18 min.", "Sirva com limão e salada verde."],
    dica: "Sardinha é rica em ômega-3 e vitamina D. Uma das proteínas mais baratas e nutritivas disponíveis."
  },

  "Atum em água": {
    tempo: "5 min", porcao: "1 lata (120g)",
    ingredientes: ["1 lata de atum em água", "Limão", "Azeite", "Sal, pimenta e cheiro-verde"],
    preparo: ["Escorra bem a água da lata.", "Misture o atum com azeite, limão e cheiro-verde.", "Tempere com sal e pimenta.", "Use como recheio de tapioca, torrada ou salada."],
    dica: "Prefira atum em água ao natural. Versões em óleo têm mais calorias sem benefício adicional."
  },

  "Frango ao forno com legumes": {
    tempo: "40 min", porcao: "200g",
    ingredientes: ["200g de frango (coxa ou peito)", "Abobrinha, cenoura e cebola cortados", "Azeite, alho e ervas a gosto", "Sal e pimenta"],
    preparo: ["Pré-aqueça o forno a 200°C.", "Tempere o frango e os legumes com azeite, alho, sal e ervas.", "Coloque em assadeira e distribua os legumes ao redor.", "Asse 35-40 min virando o frango uma vez na metade."],
    dica: "Cubra com papel alumínio nos primeiros 20 min para não ressecar. Retire para dourar no final."
  },

  "Coxa de frango (s/ pele)": {
    tempo: "35 min", porcao: "1 unidade",
    ingredientes: ["1 coxa de frango sem pele", "Alho, sal, pimenta e limão", "Azeite", "Ervas: alecrim ou tomilho"],
    preparo: ["Retire toda a pele da coxa.", "Tempere com alho, limão, sal e ervas. Marine 15 min.", "Pré-aqueça o forno a 200°C.", "Asse por 30-35 min até dourar e o osso soltar."],
    dica: "A coxa sem pele tem praticamente a mesma proteína do peito — e fica mais suculenta assada."
  },

  "Patinho bovino grelhado": {
    tempo: "15 min", porcao: "100g",
    ingredientes: ["100g de patinho bovino", "Sal, pimenta do reino", "Azeite", "Alho a gosto"],
    preparo: ["Tempere a carne com sal, pimenta e alho.", "Aqueça frigideira em fogo alto por 2 min.", "Grelhe 3-4 min de cada lado para ao ponto.", "Deixe descansar 2 min coberto antes de fatiar."],
    dica: "O patinho é um dos cortes mais magros do boi. Não cozinhe demais — fica duro e perde suculência."
  },

  "Carne moída magra": {
    tempo: "15 min", porcao: "100g",
    ingredientes: ["100g de carne moída (patinho ou coxão mole)", "Alho, cebola, tomate", "Sal, pimenta e cheiro-verde", "Azeite"],
    preparo: ["Refogue alho e cebola no azeite.", "Adicione a carne moída e mexa bem para desmanchar.", "Cozinhe em fogo médio-alto por 8-10 min.", "Adicione tomate picado, sal e finalize com cheiro-verde."],
    dica: "Escolha carne moída na hora no açougue — peça para moer patinho ou coxão mole, que são mais magros."
  },

  "Lombo suíno assado": {
    tempo: "50 min", porcao: "100g",
    ingredientes: ["100g de lombo suíno", "Alho, sal, pimenta e limão", "Azeite", "Mostarda e ervas a gosto"],
    preparo: ["Tempere o lombo na véspera com alho, mostarda, sal e ervas.", "Pré-aqueça o forno a 180°C.", "Asse coberto com papel alumínio por 40 min.", "Retire o papel e asse mais 10 min para dourar."],
    dica: "O lombo suíno tem menos gordura que a picanha bovina. Ideal para variar a proteína da semana."
  },

  "Peito de frango desfiado": {
    tempo: "25 min", porcao: "100g",
    ingredientes: ["150g de peito de frango cru", "Sal, alho e louro", "Água para cozinhar"],
    preparo: ["Cozinhe o frango em água com sal, alho e louro por 20 min.", "Retire e espere amornar 5 min.", "Desfie com dois garfos no sentido das fibras.", "Tempere com azeite e cheiro-verde ou use como recheio."],
    dica: "O frango desfiado pode ser preparado em quantidade e guardado na geladeira por 3 dias — economize tempo."
  },

  "Tofu grelhado": {
    tempo: "15 min", porcao: "120g",
    ingredientes: ["120g de tofu firme", "Shoyu light (1 col. sopa)", "Alho, gengibre e azeite", "Gergelim opcional"],
    preparo: ["Seque bem o tofu com papel toalha e corte em cubos.", "Marine no shoyu e alho por 10 min.", "Aqueça frigideira com azeite em fogo médio-alto.", "Grelhe 3-4 min de cada lado até dourar. Finalize com gergelim."],
    dica: "Secar bem o tofu é fundamental para ele dourar em vez de cozinhar no vapor."
  },

  /* ============================================================
     SALADAS, LEGUMES E ACOMPANHAMENTOS
  ============================================================ */

  "Salada verde variada": {
    tempo: "10 min", porcao: "1 prato",
    ingredientes: ["Alface, rúcula ou espinafre", "Tomate cereja", "Pepino", "Azeite e limão para temperar"],
    preparo: ["Lave bem os legumes em água corrente.", "Rasgue as folhas na mão para não oxidar.", "Corte o tomate e o pepino.", "Tempere somente na hora de servir com azeite e limão."],
    dica: "Tempere só na hora para não murchar. Folhas escuras como rúcula e espinafre têm mais ferro e vitaminas."
  },

  "Salada de atum": {
    tempo: "8 min", porcao: "1 prato",
    ingredientes: ["1 lata de atum em água escorrido", "Alface, tomate cereja e pepino", "Azeite, limão e sal", "Azeitona ou cebola roxa opcional"],
    preparo: ["Lave e corte os legumes.", "Escorra bem o atum e misture na salada.", "Tempere com azeite, limão e sal.", "Finalize com azeitonas ou cebola roxa fatiada."],
    dica: "Esta salada tem mais de 25g de proteína. Ótima para almoços rápidos sem precisar cozinhar."
  },

  "Brócolis no vapor": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["100g de brócolis em buquês", "Sal", "Azeite e alho para finalizar"],
    preparo: ["Lave o brócolis e separe em buquês.", "Cozinhe no vapor por 6-8 min até ficar macio mas ainda firme.", "Escorra e tempere com azeite, alho e sal.", "Não cozinhe demais para preservar os nutrientes."],
    dica: "O brócolis é um dos alimentos mais nutritivos. Rico em sulforafano, que ajuda na desintoxicação do fígado."
  },

  "Cenoura e abobrinha": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["1 cenoura média", "1 abobrinha pequena", "Azeite", "Sal, alho e ervas"],
    preparo: ["Corte a cenoura em rodelas finas e a abobrinha em meia-lua.", "Refogue alho no azeite por 1 min.", "Adicione a cenoura primeiro (mais dura) e cozinhe 3 min.", "Adicione a abobrinha e cozinhe mais 3 min. Tempere e sirva."],
    dica: "Não cozinhe demais — os legumes devem ficar al dente para preservar vitaminas e textura."
  },

  "Couve-flor no vapor": {
    tempo: "12 min", porcao: "100g",
    ingredientes: ["100g de couve-flor em buquês", "Sal", "Azeite, limão e pimenta-do-reino"],
    preparo: ["Separe a couve-flor em buquês.", "Cozinhe no vapor por 8-10 min.", "Tempere com azeite, limão, sal e pimenta.", "Sirva como acompanhamento ou use em saladas."],
    dica: "A couve-flor é rica em vitamina C e tem poucas calorias. Ótima substituta do arroz quando ralada."
  },

  "Vagem refogada": {
    tempo: "10 min", porcao: "100g",
    ingredientes: ["100g de vagem fresca", "Azeite", "Alho, sal e pimenta"],
    preparo: ["Retire as pontas da vagem e lave bem.", "Branqueie em água fervente com sal por 3 min.", "Refogue alho no azeite e adicione a vagem.", "Cozinhe mais 3 min mexendo. Corrija o sal."],
    dica: "Branquear antes de refogar mantém a cor verde viva e a textura crocante."
  },

  "Abóbora cozida": {
    tempo: "20 min", porcao: "100g",
    ingredientes: ["100g de abóbora japonesa ou cabotiá", "Sal", "Azeite e alho"],
    preparo: ["Descasque e corte em cubos.", "Cozinhe em água com sal por 15 min ou no vapor.", "Escorra e tempere com azeite e alho.", "Para purê, amasse com garfo e adicione azeite."],
    dica: "A abóbora é rica em betacaroteno (vitamina A), fundamental para o fígado e visão."
  },

  "Berinjela grelhada": {
    tempo: "12 min", porcao: "100g",
    ingredientes: ["1 berinjela pequena", "Azeite", "Alho, sal e orégano"],
    preparo: ["Corte a berinjela em rodelas de 1cm.", "Passe azeite e tempere com sal, alho e orégano.", "Grelhe em frigideira ou grelha por 3-4 min de cada lado.", "Sirva quente ou fria como antepasto."],
    dica: "Sal a berinjela antes e espere 10 min — ela solta água e absorve menos óleo durante o preparo."
  },

  "Beterraba cozida": {
    tempo: "30 min", porcao: "80g",
    ingredientes: ["1 beterraba pequena", "Água", "Sal", "Azeite e vinagre opcional"],
    preparo: ["Cozinhe a beterraba com casca em água fervente por 25-30 min.", "Espere esfriar e descasque com as mãos (use luvas).", "Corte em fatias ou cubos.", "Tempere com azeite, sal e vinagre."],
    dica: "A beterraba melhora o fluxo sanguíneo e tem efeito anti-inflamatório. Cozinhe com casca para preservar nutrientes."
  },

  "Quiabo refogado": {
    tempo: "12 min", porcao: "100g",
    ingredientes: ["100g de quiabo", "Azeite", "Alho, cebola e sal", "Limão para finalizar"],
    preparo: ["Lave e seque bem o quiabo. Corte em rodelas.", "Deixe secar ao ar por 15 min para reduzir a baba.", "Refogue alho e cebola no azeite.", "Adicione o quiabo e cozinhe 8 min em fogo médio-alto sem tampar."],
    dica: "Não tampe a panela e seque bem antes — é o segredo para o quiabo não ficar babento."
  },

  "Chuchu cozido": {
    tempo: "15 min", porcao: "100g",
    ingredientes: ["1 chuchu", "Água e sal", "Azeite e cheiro-verde"],
    preparo: ["Descasque o chuchu usando luvas (tem substância irritante).", "Corte em cubos.", "Cozinhe em água com sal por 12-15 min.", "Escorra e tempere com azeite e cheiro-verde."],
    dica: "O chuchu tem poucas calorias e muita água — ótimo para quem quer manter peso e hidratar."
  },

  "Mandioca cozida": {
    tempo: "30 min", porcao: "100g",
    ingredientes: ["100g de mandioca descascada", "Água e sal", "Azeite e cheiro-verde"],
    preparo: ["Descasque e retire o fio central da mandioca.", "Corte em pedaços e cozinhe em água com sal por 25-30 min.", "Retire quando estiver bem macia.", "Tempere com azeite e cheiro-verde."],
    dica: "A mandioca tem mais potássio que a banana. Prefira cozida a frita — tem um terço das calorias."
  },

  "Batata doce cozida": {
    tempo: "25 min", porcao: "100g",
    ingredientes: ["100g de batata doce", "Água", "Sal opcional", "Canela para opção doce"],
    preparo: ["Descasque e corte em cubos médios.", "Cozinhe em água com sal por 20 min até amolecer.", "Escorra e sirva simples ou amassada.", "Para opção doce, polvilhe canela."],
    dica: "A batata doce roxa tem mais antioxidantes. A laranja tem mais betacaroteno. Ambas são excelentes escolhas."
  },

  "Batata doce assada": {
    tempo: "35 min", porcao: "100g",
    ingredientes: ["1 batata doce média", "Azeite", "Sal e canela"],
    preparo: ["Pré-aqueça o forno a 200°C.", "Lave bem a batata sem descascar.", "Fure com garfo e pincele azeite por fora.", "Asse por 30-35 min até ficar macia por dentro."],
    dica: "Assar com casca preserva mais nutrientes que cozinhar. A casca também pode ser comida — é rica em fibras."
  },

  "Purê de batata": {
    tempo: "25 min", porcao: "120g",
    ingredientes: ["200g de batata inglesa", "Leite desnatado morno", "Azeite", "Sal e noz-moscada"],
    preparo: ["Cozinhe as batatas em água com sal por 20 min.", "Escorra e amasse ainda quente com garfo ou espremedor.", "Adicione leite morno e azeite mexendo.", "Tempere com sal e noz-moscada."],
    dica: "Use leite morno e não adicione a batata na água fria — evita que fique elástico e pegajoso."
  },

  /* ============================================================
     ARROZ, GRÃOS E CEREAIS
  ============================================================ */

  "Arroz integral cozido": {
    tempo: "35 min", porcao: "4 col. sopa (80g cru)",
    ingredientes: ["1 xícara de arroz integral", "2 xícaras de água quente", "Sal e azeite a gosto", "1 dente de alho"],
    preparo: ["Refogue o alho no azeite por 1 min.", "Adicione o arroz e refogue mais 1 min.", "Adicione água quente e sal.", "Cozinhe tampado em fogo baixo por 30-35 min."],
    dica: "Deixe de molho 30 min antes para reduzir o tempo de cozimento e melhorar a digestão."
  },

  "Quinoa cozida": {
    tempo: "20 min", porcao: "4 col. sopa (80g cru)",
    ingredientes: ["1 xícara de quinoa", "2 xícaras de água", "Sal"],
    preparo: ["Lave a quinoa em peneira fina para remover o amargor (saponina).", "Ferva a água com sal, adicione a quinoa.", "Cozinhe tampado em fogo baixo por 15 min.", "Solte com garfo antes de servir."],
    dica: "Quando estiver pronta, cada grão fica com um 'anel' branco ao redor. É a proteína completa dos grãos."
  },

  "Macarrão integral": {
    tempo: "12 min", porcao: "100g cozido",
    ingredientes: ["100g de macarrão integral cru", "Água e sal", "Azeite e alho", "Tomate e manjericão"],
    preparo: ["Ferva água com sal em panela grande.", "Cozinhe o macarrão conforme a embalagem (geralmente 9-11 min).", "Reserve 1 xícara da água do cozimento antes de escorrer.", "Finalize com azeite, alho refogado e tomate fresco."],
    dica: "A água do cozimento com amido ajuda o molho a aderir melhor ao macarrão — não jogue tudo fora."
  },

  "Feijão cozido": {
    tempo: "45 min", porcao: "1 concha (100g)",
    ingredientes: ["1 xícara feijão carioca ou preto (deixar de molho 8h)", "Água", "Sal, alho, cebola e louro"],
    preparo: ["Descarte a água do molho e lave o feijão.", "Cozinhe na pressão por 20-25 min.", "Refogue alho e cebola no azeite, adicione o feijão cozido.", "Tempere com sal e louro. Cozinhe mais 5 min aberto."],
    dica: "Deixar de molho reduz o tempo de cozimento e melhora muito a digestão — reduza os gases."
  },

  "Lentilha cozida": {
    tempo: "25 min", porcao: "3 col. sopa (60g cru)",
    ingredientes: ["1 xícara de lentilha vermelha ou verde", "2 xícaras de água", "Sal, alho, cebola e açafrão"],
    preparo: ["Lave a lentilha — não precisa deixar de molho.", "Refogue alho e cebola no azeite.", "Adicione a lentilha e cubra com água.", "Cozinhe em fogo médio por 20 min. Tempere com açafrão."],
    dica: "A lentilha vermelha cozinha em apenas 10-12 min. Ideal para sopas cremosas sem bater no liquidificador."
  },

  "Grão-de-bico cozido": {
    tempo: "50 min", porcao: "3 col. sopa (60g cru)",
    ingredientes: ["1 xícara de grão-de-bico (deixar de molho 12h)", "Água", "Sal, alho e azeite"],
    preparo: ["Escorra a água do molho e lave.", "Cozinhe na pressão por 30-40 min.", "Escorra e tempere com azeite, alho, sal e páprica.", "Use em saladas, sopas ou como acompanhamento."],
    dica: "Cozinhe em quantidade e congele em porções — dura 3 meses no freezer já cozido."
  },

  /* ============================================================
     SOPAS E CALDOS
  ============================================================ */

  "Sopa de legumes com frango": {
    tempo: "30 min", porcao: "1 prato fundo (300ml)",
    ingredientes: ["150g frango desfiado", "Cenoura, abobrinha e batata doce em cubos", "Caldo de legumes natural", "Sal e cheiro-verde"],
    preparo: ["Cozinhe o frango e desfie.", "Refogue os legumes cortados em cubos com azeite.", "Adicione caldo e frango.", "Cozinhe 20 min em fogo médio. Finalize com cheiro-verde."],
    dica: "Prefira temperos naturais como ervas e limão em vez de sal em excesso."
  },

  "Sopa de lentilha": {
    tempo: "30 min", porcao: "300ml",
    ingredientes: ["1 xícara de lentilha vermelha", "Cenoura e cebola picadas", "Alho, açafrão e cominho", "Caldo de legumes, sal e limão"],
    preparo: ["Refogue alho, cebola e cenoura no azeite.", "Adicione a lentilha, caldo e especiarias.", "Cozinhe 20 min até a lentilha desmanchar.", "Bata parte no liquidificador para cremosidade. Finalize com limão."],
    dica: "O açafrão-da-terra (cúrcuma) tem ação anti-inflamatória. Adicione uma pitada a todas as sopas."
  },

  "Caldo de abóbora com gengibre": {
    tempo: "25 min", porcao: "300ml",
    ingredientes: ["300g de abóbora japonesa", "1 col. chá de gengibre ralado", "Cebola, alho e azeite", "Caldo de legumes e sal"],
    preparo: ["Refogue alho e cebola no azeite.", "Adicione a abóbora em cubos e o gengibre.", "Cubra com caldo e cozinhe 20 min.", "Bata no liquidificador até ficar cremoso. Corrija o sal."],
    dica: "O gengibre tem ação anti-inflamatória e digestiva. Combina perfeitamente com o sabor adocicado da abóbora."
  },

  "Creme de brócolis": {
    tempo: "25 min", porcao: "300ml",
    ingredientes: ["200g de brócolis", "Cebola, alho e azeite", "200ml de leite desnatado", "Sal, pimenta e noz-moscada"],
    preparo: ["Refogue alho e cebola no azeite.", "Adicione o brócolis e cubra com água.", "Cozinhe 15 min.", "Bata no liquidificador com leite. Tempere com noz-moscada e sal."],
    dica: "O brócolis perde cor se cozinhado demais. Retire enquanto ainda verde vivo para um creme bonito e nutritivo."
  },

  "Sopa de mandioquinha": {
    tempo: "30 min", porcao: "300ml",
    ingredientes: ["200g de mandioquinha (batata-baroa)", "Cebola, alho e azeite", "Leite desnatado", "Sal, pimenta e cheiro-verde"],
    preparo: ["Descasque e corte a mandioquinha em cubos.", "Refogue alho e cebola no azeite.", "Adicione a mandioquinha e cubra com água. Cozinhe 20 min.", "Bata com leite e tempere com sal e cheiro-verde."],
    dica: "A mandioquinha é rica em vitamina A e tem sabor naturalmente adocicado. Ótima para sopas cremosas sem adicionar creme de leite."
  },

  "Caldo verde (s/ linguiça)": {
    tempo: "25 min", porcao: "300ml",
    ingredientes: ["2 batatas médias", "Couve-manteiga fatiada fina", "Alho, cebola e azeite", "Caldo de legumes e sal"],
    preparo: ["Cozinhe as batatas com alho e cebola refogados.", "Bata no liquidificador até ficar cremoso.", "Volte ao fogo e adicione a couve fatiada finíssima.", "Cozinhe mais 5 min. Corrija sal e finalize com azeite."],
    dica: "A couve deve ser fatiada bem fina e adicionada no final — perde nutrientes se cozinhada demais."
  },

  "Sopa de grão-de-bico": {
    tempo: "30 min (+ tempo de molho)", porcao: "300ml",
    ingredientes: ["1 xícara de grão-de-bico cozido", "Tomate, cebola e alho", "Azeite, sal, páprica e cominho", "Espinafre ou couve opcional"],
    preparo: ["Refogue alho, cebola e tomate no azeite.", "Adicione o grão-de-bico cozido e cubra com água.", "Cozinhe 15 min. Amasse parte do grão-de-bico para engrossar.", "Adicione folhas verdes e cozinhe mais 3 min. Tempere."],
    dica: "A páprica defumada dá profundidade de sabor sem precisar de carne. Combina muito bem com grão-de-bico."
  },

  /* ============================================================
     PRATOS COMPLETOS
  ============================================================ */

  "Frango xadrez saudável": {
    tempo: "20 min", porcao: "1 porção",
    ingredientes: ["150g de peito de frango em cubos", "1 xícara de brócolis", "Pimentão colorido", "Shoyu light, alho e gengibre", "Azeite e gergelim"],
    preparo: ["Refogue o alho e gengibre no azeite.", "Adicione o frango em cubos e cozinhe 5 min.", "Acrescente o brócolis e pimentão.", "Finalize com shoyu light e polvilhe gergelim."],
    dica: "Use shoyu com menos sódio — misture 1 col. sopa de shoyu com 1 col. sopa de água para reduzir sal sem perder sabor."
  },

  "Strogonoff de frango light": {
    tempo: "25 min", porcao: "1 porção",
    ingredientes: ["200g de peito de frango em tiras", "Cebola, alho e tomate", "2 col. sopa de iogurte natural", "Mostarda, sal e cheiro-verde"],
    preparo: ["Refogue alho e cebola no azeite.", "Adicione o frango e cozinhe 8 min.", "Adicione tomate picado e cozinhe mais 5 min.", "Fora do fogo, misture o iogurte e a mostarda. Finalize com cheiro-verde."],
    dica: "O iogurte substitui o creme de leite com muito menos gordura. Adicione fora do fogo para não talhar."
  },

  "Escondidinho de frango": {
    tempo: "35 min", porcao: "1 porção",
    ingredientes: ["150g de frango desfiado temperado", "200g de batata doce cozida amassada", "Cebola, alho, tomate", "Queijo branco ralado"],
    preparo: ["Refogue o frango desfiado com alho, cebola e tomate.", "Em refratário, coloque uma camada de purê de batata doce.", "Adicione o frango refogado por cima.", "Cubra com o restante do purê e queijo. Leve ao forno 15 min."],
    dica: "A batata doce no lugar da mandioca reduz o índice glicêmico do prato — mais nutritivo e saboroso."
  },

  "Bowl de proteínas": {
    tempo: "10 min", porcao: "1 bowl",
    ingredientes: ["100g frango grelhado fatiado", "4 col. sopa de arroz integral", "Mix de folhas verdes", "Tomate cereja e pepino", "Azeite e limão"],
    preparo: ["Monte o bowl com arroz integral como base.", "Adicione as folhas verdes ao redor.", "Coloque o frango fatiado no centro.", "Adicione tomate e pepino. Regue com azeite e limão."],
    dica: "Prepare os componentes com antecedência e monte na hora — prático para almoços e jantares rápidos."
  },

  "Wrap de frango": {
    tempo: "10 min", porcao: "1 unidade",
    ingredientes: ["1 tortilha integral ou folha grande de alface", "100g frango desfiado temperado", "Alface, tomate e cenoura ralada", "Iogurte natural com limão como molho"],
    preparo: ["Aqueça a tortilha por 1 min em frigideira seca.", "Misture o frango com os legumes.", "Distribua o recheio no centro da tortilha.", "Enrole firmemente e sirva com molho de iogurte."],
    dica: "Usar folha de alface como wrap em vez de tortilha elimina os carboidratos do prato."
  },

  "Omelete de 2 ovos": {
    tempo: "8 min", porcao: "1 porção",
    ingredientes: ["2 ovos inteiros", "Queijo branco ou cottage", "Tomate, cebola e cheiro-verde", "Sal, pimenta e azeite"],
    preparo: ["Bata os ovos com sal, pimenta e cheiro-verde.", "Aqueça frigideira com azeite em fogo médio.", "Despeje os ovos — não mexa. Deixe firmar.", "Adicione o recheio em um lado e dobre ao meio."],
    dica: "Uma omelete de 2 ovos com queijo branco tem mais de 20g de proteína — refeição completa para qualquer horário."
  },

  /* ============================================================
     LATICÍNIOS E COMPLEMENTOS
  ============================================================ */

  "Ricota temperada": {
    tempo: "5 min", porcao: "80g",
    ingredientes: ["80g de ricota fresca", "Azeite", "Sal, orégano e pimenta", "Opcional: tomate seco ou azeitona"],
    preparo: ["Esmague a ricota com garfo.", "Tempere com azeite, sal, orégano e pimenta.", "Misture bem até cremoso.", "Sirva com torrada integral ou como recheio de tapioca."],
    dica: "A ricota é um dos queijos com menor teor de gordura e sódio. Boa fonte de cálcio e proteína leve."
  },

  "Azeite de oliva": {
    tempo: "0 min", porcao: "1 col. sopa (15ml)",
    ingredientes: ["Azeite extravirgem de qualidade"],
    preparo: ["Use cru para preservar os polifenóis (antioxidantes).", "Para refogar, use fogo baixo ou médio.", "Evite aquecer até soltar fumaça — perde as propriedades.", "Armazene longe da luz e calor."],
    dica: "O azeite extravirgem é anti-inflamatório e protege o fígado. 1 col. sopa ao dia já traz benefícios."
  },

  /* ============================================================
     LANCHES
  ============================================================ */

  "Vitamina de frutas vermelhas": {
    tempo: "5 min", porcao: "1 copo (250ml)",
    ingredientes: ["1/2 xícara de morango", "1/2 xícara de mirtilo ou amora", "150ml iogurte natural", "1 col. chá de mel", "Gelo a gosto"],
    preparo: ["Bata todos os ingredientes no liquidificador.", "Ajuste a doçura com mel.", "Sirva imediatamente.", "Não adoce demais — as frutas já têm açúcar natural."],
    dica: "As frutas vermelhas são ricas em antioxidantes que protegem o fígado e reduzem inflamação."
  },

  "Salada de frutas": {
    tempo: "10 min", porcao: "1 porção",
    ingredientes: ["Manga, morango, melão e kiwi", "Suco de 1 laranja", "Hortelã fresca", "Mel opcional"],
    preparo: ["Corte todas as frutas em cubos pequenos.", "Misture delicadamente.", "Regue com suco de laranja fresco.", "Adicione folhas de hortelã rasgadas."],
    dica: "O suco de laranja preserva as frutas e é rico em vitamina C, que melhora a absorção de ferro."
  },

  "Iogurte com granola e frutas": {
    tempo: "3 min", porcao: "1 porção",
    ingredientes: ["170g iogurte grego natural sem açúcar", "2 col. sopa granola sem açúcar", "Morango ou banana fatiada", "Mel opcional"],
    preparo: ["Coloque o iogurte em bowl.", "Adicione a granola por cima.", "Distribua as frutas.", "Finalize com fio de mel se desejar."],
    dica: "Adicione a granola só na hora de comer — se deixar de molho fica mole e perde a crocância."
  },

  "Castanhas e sementes": {
    tempo: "0 min", porcao: "1 porção",
    ingredientes: ["2 castanhas-do-pará", "6 amêndoas", "3 nozes", "1 col. chá chia ou linhaça"],
    preparo: ["Não precisa preparar.", "Consuma como lanche da manhã ou da tarde.", "Combine com fruta ou iogurte.", "Porção pequena já é suficiente — são calóricas."],
    dica: "As castanhas-do-pará têm selênio, mineral importante para o fígado e para a tireoide."
  },

  /* ============================================================
     CEIA
  ============================================================ */

  "Chá de camomila": {
    tempo: "5 min", porcao: "200ml",
    ingredientes: ["1 sachê de camomila", "200ml de água quente", "Mel opcional"],
    preparo: ["Ferva a água.", "Adicione o sachê e tampe a xícara.", "Deixe em infusão por 5 min.", "Retire o sachê — não esprema para não amargar."],
    dica: "A camomila relaxa e melhora o sono. Ideal como ceia para quem tem dificuldade de dormir."
  },

  "Chá de erva-cidreira": {
    tempo: "5 min", porcao: "200ml",
    ingredientes: ["Folhas frescas ou 1 sachê de erva-cidreira", "200ml de água quente", "Mel opcional"],
    preparo: ["Ferva a água.", "Adicione as folhas ou sachê.", "Deixe em infusão tampado por 5-8 min.", "Coe e beba morno."],
    dica: "A erva-cidreira tem ação calmante e digestiva. Ótima após o jantar para relaxar."
  },

  "Leite morno desnatado": {
    tempo: "3 min", porcao: "150ml",
    ingredientes: ["150ml de leite desnatado", "Canela em pó (opcional)"],
    preparo: ["Aqueça o leite em fogo baixo sem ferver.", "Despeje em caneca.", "Polvilhe canela se desejar.", "Beba devagar antes de dormir."],
    dica: "O leite morno tem triptofano, que favorece a produção de melatonina e melhora a qualidade do sono."
  }

};

export function obterReceita(nomeAlimento) {
  // Busca exata
  if (RECEITAS_DB[nomeAlimento]) return RECEITAS_DB[nomeAlimento];

  // Busca por palavra-chave parcial
  const nomeLower = nomeAlimento.toLowerCase();
  const chave = Object.keys(RECEITAS_DB).find((k) => {
    const kLower = k.toLowerCase();
    return (
      nomeLower.includes(kLower.split(" ")[0]) ||
      kLower.includes(nomeLower.split(" ")[0]) ||
      kLower.split(" ").some((palavra) => palavra.length > 4 && nomeLower.includes(palavra))
    );
  });

  return chave ? RECEITAS_DB[chave] : null;
}
