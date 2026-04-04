"use client";

/* ============================================================
   dica-do-dia.tsx — Mensagem motivacional personalizada
   Muda a cada dia e é adaptada às condições de saúde do usuário
============================================================ */

const DICAS_GERAIS = [
  { emoji: "🥗", texto: "Cada refeicao saudavel e um passo em direcao ao seu melhor eu. Continue assim!" },
  { emoji: "💧", texto: "Beber agua ao longo do dia melhora a energia, a digestao e a saude do figado." },
  { emoji: "🌿", texto: "Alimentos naturais e coloridos sao o melhor remedio que existe. Seu prato e sua farmacia." },
  { emoji: "🚶", texto: "Mesmo uma caminhada curta de 15 minutos ja faz diferenca para sua saude." },
  { emoji: "😴", texto: "Dormir bem e tao importante quanto comer bem. O corpo se recupera enquanto voce dorme." },
  { emoji: "🍋", texto: "Comece o dia com um copo de agua morna com limao para ativar o figado." },
  { emoji: "🥦", texto: "Legumes no vapor preservam muito mais vitaminas do que frituras ou refogados com muito oleo." },
  { emoji: "🫁", texto: "Mastigar devagar e com calma melhora a digestao e ajuda a sentir saciedade antes." },
  { emoji: "🌅", texto: "Cafe da manha nutritivo da energia para o dia inteiro. Nao pule essa refeicao!" },
  { emoji: "❤️", texto: "Cuidar da alimentacao e um ato de amor proprio. Voce merece se sentir bem todos os dias." },
  { emoji: "🏆", texto: "Consistencia bate perfeicao. Um dia imperfeito nao apaga uma semana de escolhas saudaveis." },
  { emoji: "🧘", texto: "Estresse elevado prejudica a digestao e o figado. Reserve 5 minutos para respirar hoje." },
  { emoji: "🌾", texto: "Fibras sao essenciais para a saude intestinal e ajudam a controlar o colesterol." },
  { emoji: "🍎", texto: "Uma fruta de lanche e sempre melhor do que biscoito ou salgadinho industrializado." },
  { emoji: "💪", texto: "Pequenas mudancas diarias criam grandes resultados ao longo do tempo. Confie no processo." },
];

const DICAS_POR_CONDICAO: Record<string, Array<{ emoji: string; texto: string }>> = {
  esteatose: [
    { emoji: "🫀", texto: "Para o figado: prefira azeite de oliva extra virgem em vez de oleo de soja. Faz muita diferenca!" },
    { emoji: "🐟", texto: "Peixes como salmao e sardinha tem omega-3, que ajuda a reduzir a gordura no figado." },
    { emoji: "🥦", texto: "Brocolis e couve sao aliados poderosos do seu figado. Inclua-os nas refeicoes." },
    { emoji: "🚫", texto: "Evite acucar e frituras hoje. Cada dia sem eles e um dia de recuperacao para o seu figado." },
    { emoji: "🌱", texto: "Curcuma (acafrao-da-terra) tem acao anti-inflamatoria que beneficia o figado. Adicione nas sopas!" },
  ],
  diabetes: [
    { emoji: "🩸", texto: "Combine sempre carboidrato com proteina. Isso reduz o pico de glicemia apos a refeicao." },
    { emoji: "🥗", texto: "Comece o almoco pela salada. As fibras das folhas reduzem a absorcao do acucar dos outros alimentos." },
    { emoji: "🚶", texto: "Uma caminhada leve apos o almoco ajuda o corpo a usar a glicose de forma mais eficiente." },
    { emoji: "⏰", texto: "Mantenha horarios regulares de refeicao. Pular refeicoes pode desregular a glicemia." },
    { emoji: "🫐", texto: "Frutas vermelhas como morango e mirtilo tem baixo indice glicemico e sao otimas opcoes." },
  ],
  hipertensao: [
    { emoji: "💓", texto: "Reduza o sal hoje. Experimente temperar com ervas frescas como salsinha e cebolinha — o sabor e melhor!" },
    { emoji: "🍌", texto: "Banana, avocado e espinafre sao ricos em potassio, que ajuda a controlar a pressao arterial." },
    { emoji: "🧄", texto: "Alho tem propriedades que ajudam a reduzir a pressao naturalmente. Use bastante no preparo." },
    { emoji: "💧", texto: "Hidratacao adequada ajuda os rins a eliminar o sodio em excesso do corpo." },
    { emoji: "😌", texto: "Tecnicas de relaxamento como respiracao profunda ajudam a baixar a pressao rapidamente." },
  ],
  colesterol: [
    { emoji: "🫁", texto: "Aveia no cafe da manha reduz o colesterol ruim (LDL) gracas a beta-glucana." },
    { emoji: "🥜", texto: "Oleaginosas como amendoas e nozes aumentam o colesterol bom (HDL). Uma porcao por dia!" },
    { emoji: "🐟", texto: "Omega-3 do peixe aumenta o HDL e reduz os triglicerideos. Inclua peixe pelo menos 3x na semana." },
    { emoji: "🫒", texto: "Azeite extravirgem no lugar de manteiga ja faz diferenca nos niveis de colesterol." },
    { emoji: "🍊", texto: "A pectina das frutas citricas ajuda a reduzir o colesterol. Uma laranja por dia ajuda muito!" },
  ],
  gastrite: [
    { emoji: "🫃", texto: "Coma devagar e em porcoes menores. Refeicoes menores reduzem a producao de acido gastrico." },
    { emoji: "🥛", texto: "Evite ficar de estomago vazio por muito tempo — isso aumenta a irritacao gastrica." },
    { emoji: "🍌", texto: "Banana e papaia sao frutas suaves que protegem a mucosa do estomago." },
    { emoji: "🚫", texto: "Cafe, alcool e alimentos muito acidos ou condimentados sao os maiores inimigos da gastrite." },
    { emoji: "💧", texto: "Beba agua entre as refeicoes, nao durante — isso dilui o acido gastrico de forma saudavel." },
  ],
  tireoide: [
    { emoji: "🦋", texto: "Selenio e essencial para a tireoide. 2 castanhas-do-para por dia ja cobrem a necessidade diaria." },
    { emoji: "🐟", texto: "Iodo e fundamental para os hormonios tireoidianos. Peixes e frutos do mar sao otimas fontes." },
    { emoji: "🥦", texto: "Brocolis e couve cozidos sao seguros para a tireoide — o cozimento elimina o efeito goitrogenico." },
    { emoji: "☀️", texto: "Vitamina D influencia a funcao da tireoide. Uma caminhada ao sol diaria e um otimo habito." },
    { emoji: "⏰", texto: "Tome seu medicamento tireoidiano sempre no mesmo horario, de estomago vazio." },
  ],
  gota: [
    { emoji: "🦴", texto: "Agua e o melhor remedio para o acido urico. Beba pelo menos 2L por dia para elimina-lo pelos rins." },
    { emoji: "🍒", texto: "Cerejas e frutas vermelhas ajudam a reduzir o acido urico — inclua no lanche da tarde." },
    { emoji: "🥗", texto: "Alimentos alcalinizantes como verduras e legumes ajudam a neutralizar o acido urico." },
    { emoji: "🚫", texto: "Evite carnes vermelhas e embutidos hoje. Frango e peixe sao opcoes muito mais seguras para gota." },
    { emoji: "🍋", texto: "Limao, apesar de acido, alcaliniza o sangue e ajuda a eliminar o acido urico." },
  ],
  lactose: [
    { emoji: "🥛", texto: "Bebida vegetal de aveia e excelente substituta do leite — cremosa e nutritiva." },
    { emoji: "🧀", texto: "Queijos curados como parmesao e minas padrao tem muito menos lactose que os frescos." },
    { emoji: "🌿", texto: "Calcio tambem esta em brocolis, couve, sardinha e amendoas. Nao dependa so do leite!" },
    { emoji: "💊", texto: "A enzima lactase em farmacia ajuda a digerir lactose quando necessario." },
    { emoji: "🫘", texto: "Iogurte sem lactose tem as mesmas proteinas e muito menos desconforto digestivo." },
  ],
  celiaca: [
    { emoji: "🌾", texto: "Arroz, quinoa, milho, mandioca e batata doce sao otimas alternativas ao trigo." },
    { emoji: "🏷️", texto: "Verifique sempre o rotulo dos alimentos industrializados — o gluten se esconde em muitos produtos." },
    { emoji: "🍳", texto: "Tapioca e crepioca sao naturalmente sem gluten e muito nutritivas para o dia a dia." },
    { emoji: "🥜", texto: "A farinha de amendoim e a farinha de amendo sao excelentes para receitas sem gluten." },
    { emoji: "✅", texto: "Arroz integral, quinoa e aveia certificada sem gluten sao aliados poderosos da sua alimentacao." },
  ],
  anemia: [
    { emoji: "💊", texto: "Vitamina C dobra a absorcao do ferro! Tempere a salada com limao e coma fruta apos as refeicoes." },
    { emoji: "🥩", texto: "Ferro heme (de carnes) e absorvido muito melhor pelo corpo do que o ferro vegetal." },
    { emoji: "🥬", texto: "Espinafre refogado com limao e uma das melhores combinacoes para combater a anemia." },
    { emoji: "🚫", texto: "Cha e cafe junto as refeicoes reduzem a absorcao de ferro. Separe por pelo menos 2 horas." },
    { emoji: "🫘", texto: "Feijao com arroz e vitamina C (suco de laranja ou limao) e uma combinacao nutritiva classica!" },
  ],
};

function obterDicaDoDia(condicoes: string[]): { emoji: string; texto: string; condicao?: string } {
  const hoje = new Date();
  const diaDoAno = Math.floor(
    (hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / 86400000
  );

  // Filtra condições ativas
  const ativas = (condicoes || []).filter((c) => c !== "nenhum");

  // A cada 2 dias alterna entre dica personalizada e geral
  const usarPersonalizada = ativas.length > 0 && diaDoAno % 2 === 0;

  if (usarPersonalizada) {
    // Rotaciona entre as condições do usuário
    const condicao = ativas[diaDoAno % ativas.length];
    const dicasDaCondicao = DICAS_POR_CONDICAO[condicao];
    if (dicasDaCondicao) {
      const dica = dicasDaCondicao[Math.floor(diaDoAno / 2) % dicasDaCondicao.length];
      return { ...dica, condicao };
    }
  }

  // Dica geral
  return DICAS_GERAIS[diaDoAno % DICAS_GERAIS.length];
}

const LABELS_CONDICAO: Record<string, string> = {
  esteatose: "Para o seu figado",
  diabetes: "Para sua glicemia",
  hipertensao: "Para sua pressao",
  colesterol: "Para o seu colesterol",
  gastrite: "Para o seu estomago",
  tireoide: "Para a sua tireoide",
  gota: "Para o acido urico",
  lactose: "Para a sua digestao",
  celiaca: "Vida sem gluten",
  anemia: "Para combater a anemia",
};

export function DicaDoDia({ condicoes, nome }: { condicoes: string[]; nome?: string }) {
  const dica = obterDicaDoDia(condicoes);
  const primeiroNome = (nome || "").trim().split(" ")[0];

  const saudacao = (() => {
    const hora = new Date().getHours();
    if (hora < 12) return "Bom dia";
    if (hora < 18) return "Boa tarde";
    return "Boa noite";
  })();

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 shadow-lg shadow-emerald-200/50">
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/20 text-2xl">
          {dica.emoji}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-bold text-white/80 uppercase tracking-wider">
              {saudacao}{primeiroNome ? `, ${primeiroNome}` : ""}!
            </p>
            {dica.condicao ? (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.6rem] font-semibold text-white">
                {LABELS_CONDICAO[dica.condicao] || "Dica personalizada"}
              </span>
            ) : (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[0.6rem] font-semibold text-white">
                Dica do dia
              </span>
            )}
          </div>
          <p className="text-sm font-medium leading-relaxed text-white">
            {dica.texto}
          </p>
        </div>
      </div>
    </div>
  );
}
