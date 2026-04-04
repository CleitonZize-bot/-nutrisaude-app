/* ============================================================
   nutricao.js — Cálculos de calorias e macronutrientes

   Fórmulas utilizadas:
   - TMB (Taxa Metabólica Basal): Mifflin-St Jeor
   - TDEE (Gasto Energético Total Diário): TMB × fator de atividade
   - Macros: distribuição por objetivo e condição de saúde
============================================================ */

import { REFEICOES_MODELO, montarRefeicaoDoDia } from "@/lib/alimentos-data";

function calcularTMB(peso, altura, idade, sexo) {
  if (sexo === 'masculino') {
    return (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
  } else {
    return (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
  }
}

const FATORES_ATIVIDADE = {
  sedentario: 1.20,
  leve:       1.375,
  ativo:      1.55,
};

function calcularTDEE(tmb, objetivo, atividade) {
  const fator = FATORES_ATIVIDADE[atividade] ?? 1.375;
  const tdeeBase = tmb * fator;

  switch (objetivo) {
    case 'emagrecer': return Math.round(tdeeBase * 0.80);
    case 'massa':     return Math.round(tdeeBase * 1.15);
    case 'manter':    return Math.round(tdeeBase);
    default:          return Math.round(tdeeBase);
  }
}

function calcularMacros(calorias, objetivo, condicoes) {
  let percProteina, percCarbo, percGordura;

  if (objetivo === 'emagrecer') {
    percProteina = 0.35; percCarbo = 0.40; percGordura = 0.25;
  } else if (objetivo === 'massa') {
    percProteina = 0.30; percCarbo = 0.50; percGordura = 0.20;
  } else {
    percProteina = 0.25; percCarbo = 0.45; percGordura = 0.30;
  }

  const ativas = (condicoes || []).filter(c => c !== 'nenhum');

  for (const c of ativas) {
    if (c === 'diabetes') {
      percCarbo    = Math.max(0.28, percCarbo    - 0.10);
      percProteina = Math.min(0.48, percProteina + 0.07);
    }
    if (c === 'esteatose' || c === 'colesterol') {
      percGordura  = Math.max(0.18, percGordura  - 0.08);
      percProteina = Math.min(0.48, percProteina + 0.05);
    }
    if (c === 'anemia') {
      percProteina = Math.min(0.48, percProteina + 0.05);
    }
  }

  const total = percProteina + percCarbo + percGordura;
  percProteina /= total;
  percCarbo    /= total;
  percGordura  /= total;

  return {
    proteina: Math.round((calorias * percProteina) / 4),
    carbo:    Math.round((calorias * percCarbo)    / 4),
    gordura:  Math.round((calorias * percGordura)  / 9)
  };
}

/* ============================================================
   gerarCardapioCompleto(usuario)

   Agora usa o sistema de variações diárias do alimentos.js.
   Cada dia gera um cardápio diferente automaticamente.
============================================================ */
function gerarCardapioCompleto(usuario) {
  const tmb  = calcularTMB(usuario.peso, usuario.altura, usuario.idade, usuario.sexo);
  const tdee = calcularTDEE(tmb, usuario.objetivo, usuario.atividade);
  const macros = calcularMacros(tdee, usuario.objetivo, usuario.condicoes);

  const refeicoes = [];

  for (const [chave, modelo] of Object.entries(REFEICOES_MODELO)) {
    const caloriasRefeicao = Math.round(tdee * modelo.percCaloria);

    // Monta itens do dia usando o sistema de variações
    const itensDoDia = montarRefeicaoDoDia(chave);

    // Calcula calorias base da combinação
    const caloriasBase = itensDoDia.reduce((s, i) => s + i.calorias, 0);
    const fator = caloriasBase > 0 ? caloriasRefeicao / caloriasBase : 1;

    // Ajusta proporcionalmente
    const itensAjustados = itensDoDia.map(item => ({
      ...item,
      caloriasAjustadas:  Math.round(item.calorias  * fator),
      proteinaAjustada:   Math.round(item.proteina   * fator),
      carboAjustado:      Math.round(item.carbo      * fator),
      gorduraAjustada:    Math.round(item.gordura    * fator)
    }));

    const macrosRefeicao = itensAjustados.reduce(
      (acc, i) => ({
        proteina: acc.proteina + i.proteinaAjustada,
        carbo:    acc.carbo    + i.carboAjustado,
        gordura:  acc.gordura  + i.gorduraAjustada
      }),
      { proteina: 0, carbo: 0, gordura: 0 }
    );

    refeicoes.push({
      chave,
      nome:     modelo.nome,
      icone:    modelo.icone,
      horario:  modelo.horario,
      calorias: caloriasRefeicao,
      macros:   macrosRefeicao,
      itens:    itensAjustados
    });
  }

  return { tdee, macros, refeicoes };
}

export { calcularTMB, calcularTDEE, calcularMacros, gerarCardapioCompleto };
