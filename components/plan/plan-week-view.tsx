"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, ShoppingBasket, Check, Trash2 } from "lucide-react";

import { REFEICOES_MODELO, montarRefeicaoDoDia } from "@/lib/alimentos-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type MealItem = {
  nome: string;
  quantidade: string;
};

type WeeklyDay = {
  offset: number;
  nomeDia: string;
  dataLabel: string;
  refeicoes: Array<{
    chave: string;
    nome: string;
    icone: string;
    itens: MealItem[];
  }>;
};

type ShoppingItem = {
  nome: string;
  vezes: number;
  categoria: string;
};

/* ------------------------------------------------------------------ */
/*  Category mapping                                                   */
/* ------------------------------------------------------------------ */

const CATEGORIAS_ORDEM = [
  "Frutas",
  "Carnes e proteínas",
  "Grãos e cereais",
  "Laticínios",
  "Legumes e verduras",
  "Ovos",
  "Bebidas",
  "Temperos e óleos",
  "Outros",
] as const;

type Categoria = (typeof CATEGORIAS_ORDEM)[number];

const KEYWORDS_MAP: Record<Exclude<Categoria, "Outros">, string[]> = {
  Frutas: [
    "maçã", "pera", "banana", "manga", "melão", "abacaxi", "laranja",
    "uva", "morango", "kiwi", "mamão", "goiaba", "ameixa", "fruta",
    "abacate", "melancia", "tangerina", "caqui", "pêssego", "lima",
  ],
  "Carnes e proteínas": [
    "frango", "peixe", "carne", "filé", "peito", "salmão", "tilápia",
    "atum", "peru", "patinho", "alcatra", "costela", "linguiça",
    "sardinha", "camarão", "lombo", "sobrecoxa", "coxa",
  ],
  "Grãos e cereais": [
    "arroz", "feijão", "aveia", "quinoa", "granola", "pão", "tapioca",
    "cuscuz", "batata", "mandioca", "macarrão", "farinha", "torrada",
    "cereal", "milho", "lentilha", "grão-de-bico", "trigo", "centeio",
    "inhame",
  ],
  Laticínios: [
    "leite", "queijo", "iogurte", "requeijão", "ricota", "cottage",
    "cream cheese", "coalhada", "nata", "manteiga", "whey",
  ],
  "Legumes e verduras": [
    "alface", "tomate", "cenoura", "abobrinha", "brócolis", "pepino",
    "rúcula", "espinafre", "couve", "beterraba", "chuchu", "vagem",
    "agrião", "repolho", "abóbora", "berinjela", "pimentão", "quiabo",
    "salada", "acelga", "mostarda", "chicória",
  ],
  Ovos: ["ovo", "omelete", "crepioca"],
  Bebidas: ["café", "chá", "achocolatado", "suco", "água"],
  "Temperos e óleos": [
    "azeite", "sal", "limão", "alho", "cebola", "cheiro-verde",
    "pasta de amendoim", "mel", "canela", "pimenta", "orégano",
    "salsinha", "cebolinha", "vinagre", "mostarda", "gengibre",
    "óleo", "tempero", "noz-moscada", "açafrão", "cúrcuma",
    "amendoim", "castanha", "nozes", "amêndoa",
  ],
};

function categorizarItem(nome: string): Categoria {
  const lower = nome.toLowerCase();
  for (const cat of CATEGORIAS_ORDEM) {
    if (cat === "Outros") continue;
    const keywords = KEYWORDS_MAP[cat as Exclude<Categoria, "Outros">];
    if (keywords.some((kw) => lower.includes(kw))) {
      return cat;
    }
  }
  return "Outros";
}

/* ------------------------------------------------------------------ */
/*  Weekly plan generation                                             */
/* ------------------------------------------------------------------ */

function gerarPlanoSemanal(): WeeklyDay[] {
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const meses = [
    "jan", "fev", "mar", "abr", "mai", "jun",
    "jul", "ago", "set", "out", "nov", "dez",
  ];
  const plano: WeeklyDay[] = [];

  for (let offset = 0; offset < 7; offset += 1) {
    const data = new Date();
    data.setDate(data.getDate() + offset);

    const nomeDia =
      offset === 0 ? "Hoje" : offset === 1 ? "Amanhã" : diasSemana[data.getDay()];
    const dataLabel = `${data.getDate()} ${meses[data.getMonth()]}`;

    const refeicoes = Object.entries(REFEICOES_MODELO).map(
      ([chave, modelo]: [string, any]) => ({
        chave,
        nome: modelo.nome,
        icone: modelo.icone,
        itens: montarRefeicaoDoDia(chave, offset) as MealItem[],
      })
    );

    plano.push({ offset, nomeDia, dataLabel, refeicoes });
  }

  return plano;
}

/* ------------------------------------------------------------------ */
/*  Shopping list generation                                           */
/* ------------------------------------------------------------------ */

function gerarListaCompras(plano: WeeklyDay[]): ShoppingItem[] {
  const frequencia: Record<string, number> = {};

  plano.forEach((dia) => {
    dia.refeicoes.forEach((refeicao) => {
      refeicao.itens.forEach((item) => {
        frequencia[item.nome] = (frequencia[item.nome] || 0) + 1;
      });
    });
  });

  return Object.entries(frequencia)
    .map(([nome, vezes]) => ({
      nome,
      vezes,
      categoria: categorizarItem(nome),
    }))
    .sort((a, b) => b.vezes - a.vezes || a.nome.localeCompare(b.nome));
}

function agruparPorCategoria(
  items: ShoppingItem[]
): Record<string, ShoppingItem[]> {
  const grouped: Record<string, ShoppingItem[]> = {};
  for (const item of items) {
    if (!grouped[item.categoria]) grouped[item.categoria] = [];
    grouped[item.categoria].push(item);
  }
  return grouped;
}

/* ------------------------------------------------------------------ */
/*  localStorage helpers                                               */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "nutrisaude_compras";

function loadChecked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveChecked(checked: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
  } catch {
    /* silently fail */
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function PlanWeekView() {
  const weeklyPlan = useMemo(() => gerarPlanoSemanal(), []);
  const shoppingList = useMemo(() => gerarListaCompras(weeklyPlan), [weeklyPlan]);
  const grouped = useMemo(() => agruparPorCategoria(shoppingList), [shoppingList]);

  const [openDay, setOpenDay] = useState(0);
  const [showShopping, setShowShopping] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [collapsedCats, setCollapsedCats] = useState<Set<string>>(new Set());

  // Load checked state from localStorage on mount
  useEffect(() => {
    setChecked(loadChecked());
  }, []);

  const toggleCheck = useCallback(
    (nome: string) => {
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(nome)) next.delete(nome);
        else next.add(nome);
        saveChecked(next);
        return next;
      });
    },
    []
  );

  const clearChecked = useCallback(() => {
    const empty = new Set<string>();
    setChecked(empty);
    saveChecked(empty);
  }, []);

  const toggleCategory = useCallback((cat: string) => {
    setCollapsedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  const checkedCount = shoppingList.filter((i) => checked.has(i.nome)).length;
  const totalCount = shoppingList.length;

  return (
    <div className="flex flex-col gap-4">
      {/* ---- Weekly plan ---- */}
      {weeklyPlan.map((dia) => {
        const aberto = openDay === dia.offset;

        return (
          <div
            key={`dia-${dia.offset}`}
            className={`overflow-hidden rounded-2xl border shadow-sm ${
              dia.offset === 0
                ? "border-emerald-300 bg-emerald-50/70"
                : "border-slate-200/80 bg-white"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              onClick={() => setOpenDay(aberto ? -1 : dia.offset)}
            >
              <div>
                <p className="text-sm font-bold text-slate-900">{dia.nomeDia}</p>
                <p className="text-xs text-slate-500">{dia.dataLabel}</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 text-base text-slate-500 sm:flex">
                  {dia.refeicoes.map((refeicao) => (
                    <span key={`${dia.offset}-${refeicao.chave}`}>
                      {refeicao.icone}
                    </span>
                  ))}
                </div>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform ${
                    aberto ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {aberto && (
              <div className="border-t border-slate-100 px-4 pb-4 pt-3">
                <div className="flex flex-col gap-4">
                  {dia.refeicoes.map((refeicao) => (
                    <div
                      key={`${dia.offset}-${refeicao.chave}`}
                      className="flex flex-col gap-1"
                    >
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                        <span>{refeicao.icone}</span>
                        <span>{refeicao.nome}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {refeicao.itens.map((item) => (
                          <div
                            key={`${dia.offset}-${refeicao.chave}-${item.nome}`}
                            className="flex items-start justify-between gap-3 border-b border-slate-100 pb-1 text-xs last:border-b-0"
                          >
                            <span className="text-slate-700">{item.nome}</span>
                            <span className="whitespace-nowrap font-medium text-emerald-600">
                              {item.quantidade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ---- Shopping list toggle ---- */}
      <button
        type="button"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-orange-500 text-sm font-bold text-white shadow-lg shadow-orange-500/20 active:bg-orange-600"
        onClick={() => setShowShopping((c) => !c)}
      >
        <ShoppingBasket size={18} />
        Gerar lista de compras da semana
      </button>

      {/* ---- Shopping list ---- */}
      {showShopping && (
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Lista de compras
              </h3>
              <p className="text-xs text-slate-500">
                {checkedCount} de {totalCount} itens comprados
              </p>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 active:bg-red-100"
              onClick={clearChecked}
            >
              <Trash2 size={14} />
              Limpar lista
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-slate-100">
            <div
              className="h-1 bg-emerald-500 transition-all duration-300"
              style={{
                width: totalCount > 0 ? `${(checkedCount / totalCount) * 100}%` : "0%",
              }}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col">
            {CATEGORIAS_ORDEM.map((cat) => {
              const items = grouped[cat];
              if (!items || items.length === 0) return null;

              const collapsed = collapsedCats.has(cat);
              const catCheckedCount = items.filter((i) =>
                checked.has(i.nome)
              ).length;

              return (
                <div
                  key={cat}
                  className="border-b border-slate-100 last:border-b-0"
                >
                  {/* Category header */}
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-2.5 text-left"
                    onClick={() => toggleCategory(cat)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {cat}
                      </span>
                      <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                        {catCheckedCount}/{items.length}
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform ${
                        collapsed ? "" : "rotate-180"
                      }`}
                    />
                  </button>

                  {/* Items */}
                  {!collapsed && (
                    <div className="flex flex-col gap-0 px-4 pb-2">
                      {items.map((item) => {
                        const isChecked = checked.has(item.nome);
                        return (
                          <button
                            key={`compra-${item.nome}`}
                            type="button"
                            className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors active:bg-slate-100 ${
                              isChecked ? "opacity-50" : ""
                            }`}
                            onClick={() => toggleCheck(item.nome)}
                          >
                            {/* Checkbox */}
                            <div
                              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                                isChecked
                                  ? "border-emerald-500 bg-emerald-500"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {isChecked && (
                                <Check size={12} className="text-white" />
                              )}
                            </div>

                            {/* Name */}
                            <span
                              className={`flex-1 text-xs text-slate-700 ${
                                isChecked ? "line-through" : ""
                              }`}
                            >
                              {item.nome}
                            </span>

                            {/* Frequency badge */}
                            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                              {item.vezes}x
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
