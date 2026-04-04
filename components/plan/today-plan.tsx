"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  Apple,
  ArrowRight,
  CalendarDays,
  CalendarRange,
  CheckCircle2,
  ChevronDown,
  Droplets,
  LockKeyhole,
  Pill,
  RefreshCw,
  Repeat2,
  ShieldAlert,
  X,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlanHealthView } from "@/components/plan/plan-health-view";
import { PlanIngredientsView } from "@/components/plan/plan-ingredients-view";
import { PlanProgressView } from "@/components/plan/plan-progress-view";
import { PlanWeekView } from "@/components/plan/plan-week-view";
import {
  atualizarDadosLocais,
  carregarDadosLocais,
  pbCarregarPerfilServidor,
  pbEstaLogado,
  pbLogout,
  pbRefresh,
  perfilEstaCompleto,
  type NutrisaudeProfile,
  type NutrisaudeStoredData,
} from "@/lib/pocketbase";
import { FontSizeControl } from "@/components/plan/font-size-control";
import { DicaDoDia } from "@/components/plan/dica-do-dia";
import { obterSubstituicoes } from "@/lib/alimentos-data";
import { gerarCardapioCompleto } from "@/lib/nutricao-data";
import { obterReceitaPersonalizada } from "@/lib/receitas-db";
import { verificarAlerta } from "@/lib/receitas-data";

type TabKey = "hoje" | "semana" | "progresso" | "ingredientes" | "saude";

type MealItem = {
  nome: string;
  quantidade: string;
  calorias: number;
  proteina: number;
  carbo: number;
  gordura: number;
  caloriasAjustadas?: number;
  proteinaAjustada?: number;
  carboAjustado?: number;
  gorduraAjustada?: number;
  grupoId?: string;
  grupoNome?: string;
  indiceNoGrupo?: number;
};

type Meal = {
  chave: string;
  nome: string;
  icone: string;
  horario: string;
  calorias: number;
  macros: {
    proteina: number;
    carbo: number;
    gordura: number;
  };
  itens: MealItem[];
};

type GeneratedPlan = {
  tdee: number;
  macros: {
    proteina: number;
    carbo: number;
    gordura: number;
  };
  refeicoes: Meal[];
};

// Modal principal — aparece ao clicar em feature bloqueada
function SubscribeModal({ onClose, titulo, descricao }: {
  onClose: () => void;
  titulo?: string;
  descricao?: string;
}) {
  const url = process.env.NEXT_PUBLIC_SUBSCRIBE_URL || "#";
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-0 pb-0 backdrop-blur-sm sm:items-center sm:px-4 sm:pb-4"
      onClick={onClose}
    >
      <div
        className="nutri-surface w-full max-w-lg rounded-t-[2rem] border border-white/10 sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar mobile */}
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-slate-200 sm:hidden" />

        <div className="flex flex-col items-center gap-3 px-6 pt-5 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-400"
          >
            <X className="size-4" />
          </button>

          {/* Ícone com gradiente */}
          <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-200">
            <span className="text-2xl">🌱</span>
          </div>

          <div className="flex flex-col gap-1">
            <p className="nutri-title text-[1.45rem] font-black leading-tight text-slate-900">
              {titulo ?? "Voce ja deu um otimo comeco!"}
            </p>
            <p className="text-sm leading-relaxed text-slate-500">
              {descricao ?? "Faca parte do Plano Pro e acelere seus resultados. Cardapios completos, receitas exclusivas e acompanhamento total da sua saude — tudo na palma da mao."}
            </p>
          </div>

          {/* Benefícios rápidos */}
          <div className="w-full rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-left">
            <p className="mb-2 text-[0.7rem] font-bold uppercase tracking-wider text-emerald-600">O que voce desbloqueia:</p>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-700">
              {[
                "👨‍🍳 Receitas passo a passo",
                "🔄 Trocar alimentos",
                "📅 Cardapio da semana",
                "🛒 Lista de compras",
                "📊 Grafico de evolucao",
                "💊 Controle de saude",
              ].map((b) => (
                <div key={b} className="flex items-center gap-1.5">
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-6 pb-6 pt-4">
          <a href={url} target="_blank" rel="noreferrer" className="block">
            <button
              type="button"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-[1.2rem] bg-gradient-to-r from-emerald-500 to-emerald-600 text-base font-bold text-white shadow-[0_8px_24px_rgba(16,185,129,0.35)] active:opacity-90"
            >
              Quero o Plano Pro agora
              <ArrowRight className="size-5" />
            </button>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="h-11 w-full rounded-[1rem] text-sm font-medium text-slate-400"
          >
            Continuar com o plano gratuito
          </button>
        </div>
      </div>
    </div>
  );
}

// Popup periódico — aparece de 4 em 4 min para usuários não premium
function FreeReminderPopup({ onClose, onUpgrade }: { onClose: () => void; onUpgrade: () => void }) {
  const mensagens = [
    {
      emoji: "🍽️",
      titulo: "Seu proximo passo esta esperando",
      texto: "Usuarios Pro seguem receitas completas e chegam mais rapido nos seus objetivos de saude.",
    },
    {
      emoji: "📈",
      titulo: "Veja sua evolucao em graficos",
      texto: "Acompanhe seu peso, hidratacao e progresso dia a dia — so no Plano Pro.",
    },
    {
      emoji: "💪",
      titulo: "Resultados reais pedem um plano completo",
      texto: "Troque alimentos, planeje a semana e controle sua saude com o Plano Pro.",
    },
  ];
  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:px-4"
      onClick={onClose}
    >
      <div
        className="nutri-surface w-full max-w-sm rounded-t-[2rem] border border-white/10 px-5 pb-5 pt-4 sm:rounded-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-slate-200 sm:hidden" />

        <div className="flex items-start gap-3">
          <span className="text-3xl">{msg.emoji}</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">{msg.titulo}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{msg.texto}</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-300">
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onUpgrade}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white shadow-sm active:opacity-90"
          >
            Ver Plano Pro
            <ArrowRight className="size-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-400"
          >
            Depois
          </button>
        </div>
      </div>
    </div>
  );
}

// Banner de trial com contagem regressiva
function TrialBanner({ dias, onUpgrade }: { dias: number; onUpgrade: () => void }) {
  const urgente = dias <= 1;
  return (
    <div className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
      urgente
        ? "bg-amber-50 border border-amber-200"
        : "bg-emerald-50 border border-emerald-200"
    }`}>
      <span className="text-xl">{urgente ? "⏰" : "🎁"}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold ${urgente ? "text-amber-700" : "text-emerald-700"}`}>
          {urgente
            ? "Ultimo dia de acesso completo!"
            : `${dias} dia${dias > 1 ? "s" : ""} restante${dias > 1 ? "s" : ""} de acesso gratuito`}
        </p>
        <p className="text-[0.65rem] text-slate-500">Assine para manter todos os recursos</p>
      </div>
      <button
        type="button"
        onClick={onUpgrade}
        className={`shrink-0 rounded-lg px-3 py-1.5 text-[0.7rem] font-bold text-white ${
          urgente ? "bg-amber-500" : "bg-emerald-500"
        }`}
      >
        Assinar
      </button>
    </div>
  );
}

// Lock inline para features premium dentro do conteúdo
function InlineLock({ mensagem, onUnlock }: { mensagem: string; onUnlock: () => void }) {
  return (
    <button
      type="button"
      onClick={onUnlock}
      className="flex w-full items-center gap-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 px-4 py-3 text-left active:bg-emerald-50"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100">
        <LockKeyhole className="size-4 text-emerald-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-emerald-700">{mensagem}</p>
        <p className="text-[0.65rem] text-emerald-500">Disponivel no Plano Pro — toque para saber mais</p>
      </div>
      <ArrowRight className="size-4 shrink-0 text-emerald-400" />
    </button>
  );
}

const HEALTH_MESSAGES: Record<string, { titulo: string; texto: string }> = {
  esteatose: {
    titulo: "Esteatose Hepatica",
    texto: "Evite gorduras saturadas, frituras, embutidos, acucares simples, refrigerantes e alcool.",
  },
  diabetes: {
    titulo: "Diabetes",
    texto: "Evite acucares, mel, carboidratos refinados e bebidas acucaradas. Prefira alimentos de baixo indice glicemico.",
  },
  hipertensao: {
    titulo: "Hipertensao",
    texto: "Reduza o sal e evite embutidos, enlatados e temperos industrializados.",
  },
  colesterol: {
    titulo: "Colesterol Alto",
    texto: "Evite gorduras trans, biscoitos industriais e carnes gordurosas.",
  },
  gastrite: {
    titulo: "Gastrite / Refluxo",
    texto: "Evite frituras, alimentos acidos, cafe em excesso e refeicoes pesadas a noite.",
  },
  lactose: {
    titulo: "Intolerancia a Lactose",
    texto: "Substitua derivados do leite por versoes sem lactose ou bebidas vegetais.",
  },
  celiaca: {
    titulo: "Doenca Celiaca",
    texto: "Elimine completamente trigo, cevada, centeio e aveia nao certificada.",
  },
  anemia: {
    titulo: "Anemia",
    texto: "Priorize carnes magras, feijao, lentilha e combine com vitamina C para melhor absorcao do ferro.",
  },
};

const TABS: Array<{
  key: TabKey;
  label: string;
  icon: typeof CalendarDays;
}> = [
  { key: "hoje", label: "Hoje", icon: CalendarDays },
  { key: "semana", label: "Semana", icon: CalendarRange },
  { key: "progresso", label: "Progresso", icon: Activity },
  { key: "ingredientes", label: "Ingredientes", icon: Apple },
  { key: "saude", label: "Saude", icon: Pill },
];

const MEAL_STYLES: Record<
  string,
  { stripe: string; icon: string; border: string }
> = {
  cafe: {
    stripe: "bg-amber-400",
    icon: "bg-amber-50 text-amber-500",
    border: "border-amber-200/80",
  },
  lanche_manha: {
    stripe: "bg-emerald-400",
    icon: "bg-emerald-50 text-emerald-500",
    border: "border-emerald-200/80",
  },
  almoco: {
    stripe: "bg-emerald-400",
    icon: "bg-violet-50 text-violet-500",
    border: "border-emerald-200/80",
  },
  lanche_tarde: {
    stripe: "bg-emerald-400",
    icon: "bg-violet-50 text-violet-500",
    border: "border-emerald-200/80",
  },
  jantar: {
    stripe: "bg-blue-400",
    icon: "bg-blue-50 text-blue-500",
    border: "border-blue-200/80",
  },
  ceia: {
    stripe: "bg-violet-400",
    icon: "bg-violet-50 text-violet-500",
    border: "border-violet-200/80",
  },
};

function localDateKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function objectiveLabel(value: string) {
  return {
    emagrecer: "Emagrecimento",
    massa: "Ganho de massa",
    manter: "Manutencao",
  }[value] || "";
}

function conditionLabel(value: string) {
  return {
    esteatose: "Esteatose Hepatica",
    diabetes: "Diabetes",
    hipertensao: "Hipertensao",
    colesterol: "Colesterol Alto",
    gastrite: "Gastrite/Refluxo",
    lactose: "Intolerancia a Lactose",
    celiaca: "Doenca Celiaca",
    anemia: "Anemia",
    nenhum: "",
  }[value] || value;
}

function recomputeMeal(meal: Meal, items: MealItem[]): Meal {
  const macros = items.reduce(
    (acc, item) => ({
      proteina: acc.proteina + (item.proteinaAjustada ?? item.proteina),
      carbo: acc.carbo + (item.carboAjustado ?? item.carbo),
      gordura: acc.gordura + (item.gorduraAjustada ?? item.gordura),
    }),
    { proteina: 0, carbo: 0, gordura: 0 }
  );

  const calorias = items.reduce(
    (acc, item) => acc + (item.caloriasAjustadas ?? item.calorias),
    0
  );

  return {
    ...meal,
    calorias: Math.round(calorias),
    macros: {
      proteina: Math.round(macros.proteina),
      carbo: Math.round(macros.carbo),
      gordura: Math.round(macros.gordura),
    },
    itens: items,
  };
}

const subscribeUrl = process.env.NEXT_PUBLIC_SUBSCRIBE_URL || "#";

type AcessoType = "premium" | "free";

export function TodayPlan({
  isNewPlan = false,
  isPremium,
  acesso = "premium",
}: {
  isNewPlan?: boolean;
  isPremium?: boolean; // legado
  acesso?: AcessoType;
}) {
  // compatibilidade com código legado
  const tipoAcesso: AcessoType = isPremium === false ? "free" : acesso;
  const isPrem = tipoAcesso === "premium";

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("hoje");
  const [openMeals, setOpenMeals] = useState<Record<string, boolean>>({
    cafe: true,
  });
  const [profile, setProfile] = useState<NutrisaudeProfile | null>(null);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [water, setWater] = useState(0);
  const [checkins, setCheckins] = useState<Record<string, string>>({});
  const [weightHistory, setWeightHistory] = useState<Array<{ data: string; peso: number }>>([]);
  const [healthData, setHealthData] = useState<NutrisaudeStoredData>({});
  const [weightInput, setWeightInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showFreePopup, setShowFreePopup] = useState(false);
  const [openRecipes, setOpenRecipes] = useState<Record<string, boolean>>({});
  const [openSubs, setOpenSubs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function carregar() {
      if (!pbEstaLogado()) {
        router.push("/login");
        return;
      }

      try {
        await pbRefresh();
        const serverProfile = await pbCarregarPerfilServidor();
        const localData = carregarDadosLocais() || {};
        const perfil = serverProfile || localData.perfil || null;

        if (!perfilEstaCompleto(perfil)) {
          router.push("/onboarding");
          return;
        }

        const generated = gerarCardapioCompleto(perfil) as GeneratedPlan;
        const today = localDateKey();
        const agua = localData.agua?.[today] || 0;
        const feitos = localData.checkins?.[today] || {};

        setProfile(perfil);
        setPlan(generated);
        setWater(agua);
        setCheckins(feitos);
        setWeightHistory(localData.historicoPeso || []);
        setHealthData({
          diario: localData.diario || {},
          exames: localData.exames || [],
          remedios: localData.remedios || [],
        });
      } catch {
        pbLogout();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [router]);

  // Popup periódico — aparece após 2 min e repete a cada 4 min para não premium
  useEffect(() => {
    if (tipoAcesso === "premium") return;

    const primeiro = setTimeout(() => setShowFreePopup(true), 2 * 60 * 1000);
    const intervalo = setInterval(() => setShowFreePopup(true), 4 * 60 * 1000);

    return () => {
      clearTimeout(primeiro);
      clearInterval(intervalo);
    };
  }, [tipoAcesso]);

  const hydrationMeta = useMemo(() => {
    if (!profile) return 0;
    return Math.round(profile.peso * 35);
  }, [profile]);

  const hydrationPercent = hydrationMeta
    ? Math.min(100, Math.round((water / hydrationMeta) * 100))
    : 0;

  const progressCount = plan ? Object.keys(checkins).length : 0;
  const progressPercent = plan?.refeicoes.length
    ? Math.round((progressCount / plan.refeicoes.length) * 100)
    : 0;

  const profileSummary = useMemo(() => {
    if (!profile) return "";
    const objective = objectiveLabel(profile.objetivo);
    const conditions = (profile.condicoes || [])
      .filter((item) => item !== "nenhum")
      .map(conditionLabel)
      .join(" · ");

    return `${profile.peso}kg · ${profile.altura}cm · ${profile.idade} anos · ${objective}${
      conditions ? ` · ${conditions}` : ""
    }`;
  }, [profile]);

  const healthAlerts = useMemo(() => {
    if (!profile) return [];
    return (profile.condicoes || [])
      .filter((item) => item !== "nenhum")
      .map((item) => HEALTH_MESSAGES[item])
      .filter(Boolean);
  }, [profile]);

  function updateWater(nextWater: number) {
    const today = localDateKey();
    const updated = atualizarDadosLocais((data) => ({
      ...data,
      agua: {
        ...(data.agua || {}),
        [today]: Math.max(0, nextWater),
      },
    }));

    setWater(updated.agua?.[today] || 0);
  }

  function markMealDone(chave: string, feito: boolean) {
    const today = localDateKey();
    const updated = atualizarDadosLocais((data) => {
      const daily = { ...(data.checkins?.[today] || {}) };

      if (feito) {
        daily[chave] = new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
      } else {
        delete daily[chave];
      }

      return {
        ...data,
        checkins: {
          ...(data.checkins || {}),
          [today]: daily,
        },
      };
    });

    setCheckins(updated.checkins?.[today] || {});
  }

  function replaceItem(mealKey: string, itemIndex: number, groupId: string, nextIndex: number) {
    if (!plan) return;
    const substitutions = obterSubstituicoes(groupId, -1);
    const nextItem = substitutions.find((item) => item.indice === nextIndex);
    if (!nextItem) return;

    setPlan((current) => {
      if (!current) return current;

      const nextMeals = current.refeicoes.map((meal) => {
        if (meal.chave !== mealKey) return meal;

        const nextItems = meal.itens.map((item, index) => {
          if (index !== itemIndex) return item;

          return {
            ...nextItem,
            grupoId: groupId,
            grupoNome: item.grupoNome,
            indiceNoGrupo: nextIndex,
            caloriasAjustadas: nextItem.calorias,
            proteinaAjustada: nextItem.proteina,
            carboAjustado: nextItem.carbo,
            gorduraAjustada: nextItem.gordura,
          };
        });

        return recomputeMeal(meal, nextItems);
      });

      return {
        ...current,
        refeicoes: nextMeals,
      };
    });

    // Fecha o painel de substituição após trocar
    setOpenSubs((current) => ({ ...current, [`${mealKey}-${itemIndex}`]: false }));
  }

  function saveWeight() {
    const parsed = Number(weightInput.replace(",", "."));

    if (!parsed || parsed < 30 || parsed > 300) {
      setFeedback("Digite um peso valido entre 30kg e 300kg.");
      return;
    }

    const today = localDateKey();
    const updated = atualizarDadosLocais((data) => {
      const historico = [...(data.historicoPeso || [])];
      const nextEntry = { data: today, peso: Number(parsed.toFixed(1)) };
      const existingIndex = historico.findIndex((item) => item.data === today);

      if (existingIndex >= 0) {
        historico[existingIndex] = nextEntry;
      } else {
        historico.push(nextEntry);
      }

      historico.sort((a, b) => a.data.localeCompare(b.data));

      return {
        ...data,
        historicoPeso: historico.slice(-90),
      };
    });

    setWeightHistory(updated.historicoPeso || []);
    setWeightInput("");
    setFeedback("Peso salvo com sucesso.");
  }

  function handleLogout() {
    pbLogout();
    router.push("/login");
  }

  function toggleRecipe(key: string) {
    if (!isPrem) {
      setShowSubscribeModal(true);
      return;
    }
    setOpenRecipes((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleSubs(key: string) {
    if (!isPrem) {
      setShowSubscribeModal(true);
      return;
    }
    setOpenSubs((current) => ({ ...current, [key]: !current[key] }));
  }

  function toggleMeal(chave: string) {
    setOpenMeals((current) => ({
      ...current,
      [chave]: !current[chave],
    }));
  }

  const todayLabel = capitalize(
    new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  );

  if (loading || !profile || !plan) {
    return (
      <main className="min-h-screen bg-[#f6fbf8]">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="h-48 animate-pulse rounded-[2rem] bg-slate-200/70" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6fbf8] px-3 pb-20 pt-4 text-slate-900 sm:px-6 sm:pb-8 sm:pt-8 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:gap-5">
        <div className="nutri-dark-panel flex flex-col gap-4 rounded-[1.6rem] px-4 py-5 text-white sm:rounded-[2rem] sm:px-8 sm:py-8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="nutri-title text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                Ola, {profile.nome} 👋
              </p>
              <p className="text-xs font-medium text-primary">{todayLabel}</p>
              <p className="text-[0.7rem] text-white/60">{profileSummary}</p>
            </div>
            <FontSizeControl />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { value: plan.tdee.toLocaleString("pt-BR"), label: "kcal/dia" },
              { value: `${plan.macros.proteina}g`, label: "proteína" },
              { value: `${plan.macros.carbo}g`, label: "carbo" },
              { value: `${plan.macros.gordura}g`, label: "gordura" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1rem] border border-white/10 bg-white/8 py-3 text-center backdrop-blur-sm">
                <p className="text-lg font-black leading-none text-primary sm:text-2xl">{item.value}</p>
                <p className="mt-1.5 text-[0.58rem] uppercase tracking-wider text-white/55">{item.label}</p>
              </div>
            ))}
          </div>
        </div>


        {/* Dica do dia personalizada */}
        {profile ? (
          <DicaDoDia condicoes={profile.condicoes || []} nome={profile.nome} />
        ) : null}

        {healthAlerts.length > 0 ? (
          <Alert className="rounded-[1.4rem] border-amber-300 bg-amber-50/95 text-amber-950 shadow-[0_14px_34px_rgba(245,158,11,0.08)]">
            <ShieldAlert />
            <AlertTitle>
              Atencao: {healthAlerts.length} condicao{healthAlerts.length > 1 ? "oes" : ""} detectada
            </AlertTitle>
            <AlertDescription>
              {healthAlerts.map((item) => (
                <p key={item.titulo} className="mb-2 last:mb-0">
                  <strong>{item.titulo}:</strong> {item.texto}
                </p>
              ))}
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="overflow-hidden rounded-2xl border border-blue-900/10 bg-[linear-gradient(180deg,#244d7f_0%,#204a79_100%)] text-white shadow-md">
          <div className="flex items-center justify-between px-4 pt-3.5 sm:px-5">
            <div className="flex items-center gap-2">
              <Droplets className="size-4 text-cyan-200" />
              <span className="text-sm font-bold text-white">Hidratacao</span>
              <span className="text-[0.7rem] text-white/60">Meta: {(hydrationMeta / 1000).toFixed(1)}L</span>
            </div>
            <button
              type="button"
              className="flex size-7 items-center justify-center rounded-full bg-white/10 text-white"
              onClick={() => updateWater(0)}
            >
              <RefreshCw className="size-3" />
            </button>
          </div>

          <div className="px-4 py-3 sm:px-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-bold">
                {water >= 1000
                  ? `${(water / 1000).toFixed(2).replace(".", ",")}L`
                  : `${water}ml`}
              </span>
              <span className="rounded-full bg-white/16 px-2 py-0.5 text-[0.65rem] font-semibold">{hydrationPercent}%</span>
            </div>
            <Progress value={hydrationPercent} className="w-full" />

            <div className="mt-3 grid grid-cols-4 gap-2">
              <button
                type="button"
                className="rounded-full border border-white/20 bg-white/8 py-1.5 text-[0.7rem] font-semibold text-white active:bg-white/16"
                onClick={() => updateWater(Math.min(water + 250, hydrationMeta * 2))}
              >
                +250ml
              </button>
              <button
                type="button"
                className="rounded-full border border-white/20 bg-white/8 py-1.5 text-[0.7rem] font-semibold text-white active:bg-white/16"
                onClick={() => updateWater(Math.min(water + 350, hydrationMeta * 2))}
              >
                +350ml
              </button>
              <button
                type="button"
                className="rounded-full bg-blue-500 py-1.5 text-[0.7rem] font-bold text-white active:bg-blue-400"
                onClick={() => updateWater(Math.min(water + 500, hydrationMeta * 2))}
              >
                +500ml
              </button>
              <button
                type="button"
                className="rounded-full border border-rose-300/30 bg-rose-500/10 py-1.5 text-[0.7rem] font-semibold text-white active:bg-rose-500/20"
                onClick={() => updateWater(Math.max(0, water - 200))}
              >
                -200ml
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <CalendarDays className="size-3.5 text-violet-500" />
              Progresso de hoje
            </p>
            <span className="text-xs font-bold text-emerald-500">{progressCount}/{plan.refeicoes.length}</span>
          </div>
          <div className="mt-2">
            <Progress value={progressPercent} className="w-full" />
          </div>
        </div>

        {/* Navegação fixa no rodapé — visível apenas em mobile */}
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-md sm:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
          <div className="grid grid-cols-5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  className={`flex flex-col items-center gap-0.5 py-2 text-[0.6rem] font-semibold transition-colors ${
                    isActive
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }`}
                  onClick={() => {
                    setActiveTab(tab.key);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Icon className={`size-5 ${isActive ? "text-emerald-500" : ""}`} />
                  {tab.label}
                  {isActive ? <span className="mt-0.5 h-0.5 w-4 rounded-full bg-emerald-500" /> : null}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Tabs para desktop — oculta em mobile */}
        <div className="hidden rounded-[1.4rem] border border-slate-200/80 bg-white px-4 py-3 sm:block">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  className={
                    activeTab === tab.key
                      ? "flex h-10 items-center gap-2 rounded-[0.9rem] bg-slate-800 px-4 text-sm font-semibold text-white"
                      : "flex h-10 items-center gap-2 rounded-[0.9rem] px-4 text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  }
                  onClick={() => setActiveTab(tab.key)}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "hoje" ? (
          <div className="flex flex-col gap-3">
            {plan.refeicoes.map((meal) => {
              const doneAt = checkins[meal.chave];
              const hasAlert = meal.itens.some((item) =>
                Boolean(verificarAlerta(item.nome, profile.condicoes))
              );
              const style = MEAL_STYLES[meal.chave] || MEAL_STYLES.cafe;
              const isOpen = openMeals[meal.chave] ?? false;

              return (
                <div
                  key={meal.chave}
                  className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm ${
                    isOpen ? style.border : "border-slate-100"
                  }`}
                >
                  <div className={`absolute inset-y-0 left-0 w-1 ${style.stripe}`} />

                  {/* Header — clicável para expandir/recolher */}
                  <button
                    type="button"
                    className="flex w-full flex-col gap-1 px-3.5 py-3 text-left pl-5"
                    onClick={() => toggleMeal(meal.chave)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{meal.icone}</span>
                      <span className="flex-1 text-sm font-semibold text-slate-900">{meal.nome}</span>
                      <ChevronDown
                        className={`size-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    <div className="flex items-center gap-2 pl-7">
                      <span className="text-[0.7rem] text-slate-400">{meal.horario}</span>
                      {hasAlert ? <span className="text-[0.7rem] text-amber-500">⚠ atencao</span> : null}
                      <span className="rounded-full border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-600">
                        ~{meal.calorias} kcal
                      </span>
                      {isPrem ? (
                        doneAt ? (
                          <span
                            role="button"
                            className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-700"
                            onClick={(e) => { e.stopPropagation(); markMealDone(meal.chave, false); }}
                          >
                            <CheckCircle2 className="size-3" />
                            {doneAt}
                          </span>
                        ) : (
                          <span
                            role="button"
                            className="rounded-full border border-emerald-200/60 bg-white px-2 py-0.5 text-[0.65rem] font-semibold text-emerald-600"
                            onClick={(e) => { e.stopPropagation(); markMealDone(meal.chave, true); }}
                          >
                            Marcar ✓
                          </span>
                        )
                      ) : null}
                    </div>
                  </button>

                  {/* Conteúdo expandido */}
                  {isOpen ? (
                    <div className="relative border-t border-slate-100 px-4 pb-4 pt-3">
                      <div>
                        {hasAlert ? (
                          <div className="mb-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs leading-snug text-red-600">
                            <ShieldAlert className="mt-0.5 size-3.5 shrink-0" />
                            <span>Esta refeicao contem alimentos que pedem atencao para sua condicao de saude.</span>
                          </div>
                        ) : null}

                        <div className="space-y-3">
                          {meal.itens.map((item, itemIndex) => {
                            const alert = verificarAlerta(item.nome, profile.condicoes);
                            const substitutions =
                              item.grupoId && item.indiceNoGrupo !== undefined
                                ? obterSubstituicoes(item.grupoId, item.indiceNoGrupo)
                                : [];
                            const receita = obterReceitaPersonalizada(item.nome, profile?.condicoes);
                            const recipeKey = `${meal.chave}-${itemIndex}`;
                            const isRecipeOpen = openRecipes[recipeKey] ?? false;
                            const isSubsOpen = openSubs[recipeKey] ?? false;

                            return (
                              <div
                                key={recipeKey}
                                className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                              >
                                {/* Nome + quantidade + botão trocar */}
                                <div className="flex items-center gap-1.5">
                                  <div className="flex flex-1 items-baseline justify-between gap-2 min-w-0">
                                    <p className="text-[0.82rem] font-semibold text-slate-800">{item.nome}</p>
                                    <p className="shrink-0 text-[0.82rem] font-bold text-emerald-500">{item.quantidade}</p>
                                  </div>
                                  {substitutions.length > 0 ? (
                                    <button
                                      type="button"
                                      className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold transition-colors ${
                                        !isPrem
                                          ? "border-emerald-200 bg-slate-50 text-slate-400"
                                          : isSubsOpen
                                          ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                                          : "border-emerald-300 bg-emerald-50 text-emerald-600 active:bg-emerald-100"
                                      }`}
                                      onClick={() => toggleSubs(recipeKey)}
                                    >
                                      <Repeat2 className="size-3.5" />
                                      Trocar
                                    </button>
                                  ) : null}
                                </div>

                                {alert ? (
                                  <p className="mt-1 text-xs leading-snug text-red-500">⚠ {alert}</p>
                                ) : null}

                                {/* Painel de substituições — aparece ao clicar no ícone */}
                                {isSubsOpen && substitutions.length > 0 ? (
                                  <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50/50 px-3 py-2.5">
                                    <p className="mb-1.5 text-[0.68rem] font-semibold uppercase tracking-wide text-emerald-600">
                                      Substituir por:
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {substitutions.slice(0, 6).map((sub) => (
                                        <button
                                          key={`${item.nome}-${sub.indice}`}
                                          type="button"
                                          className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 active:bg-emerald-100 active:text-emerald-800"
                                          onClick={() => {
                                            if (!isPrem) {
                                              setShowSubscribeModal(true);
                                              return;
                                            }
                                            replaceItem(meal.chave, itemIndex, item.grupoId!, sub.indice);
                                          }}
                                        >
                                          {sub.nome}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ) : null}

                                {/* Botão "Como preparar" — destaque visual */}
                                {receita ? (
                                  <button
                                    type="button"
                                    className={`mt-2 flex w-full items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                                      !isPrem
                                        ? "border-amber-200 bg-slate-50 text-slate-500"
                                        : isRecipeOpen
                                        ? "border-amber-300 bg-amber-50 text-amber-700"
                                        : "border-amber-200 bg-amber-50/50 text-amber-600 active:bg-amber-50"
                                    }`}
                                    onClick={() => toggleRecipe(recipeKey)}
                                  >
                                    <span>👨‍🍳</span>
                                    <span className="flex-1">Como preparar</span>
                                    <ChevronDown className={`size-3.5 transition-transform ${isRecipeOpen ? "rotate-180" : ""}`} />
                                  </button>
                                ) : null}

                                {/* Painel de receita expandido */}
                                {isRecipeOpen && receita ? (
                                  <div className="mt-2 rounded-xl border border-amber-200/60 bg-amber-50/40 px-3 py-3">
                                    {/* Badge recomendado para a condição do usuário */}
                                    {receita.isRecomendado ? (
                                      <div className="mb-2 flex items-center gap-1.5 rounded-lg bg-emerald-100 px-2.5 py-1.5">
                                        <span className="text-sm">✅</span>
                                        <span className="text-xs font-semibold text-emerald-700">Indicado para sua condição de saúde</span>
                                      </div>
                                    ) : null}

                                    {/* Alertas personalizados por doença */}
                                    {receita.alertasPersonalizados?.length > 0 ? (
                                      <div className="mb-2 space-y-1">
                                        {receita.alertasPersonalizados.map((a: { icone: string; texto: string }, i: number) => (
                                          <div key={i} className="flex items-start gap-1.5 rounded-lg bg-red-50 px-2.5 py-1.5">
                                            <span className="shrink-0 text-sm">{a.icone}</span>
                                            <span className="text-xs leading-snug text-red-700">{a.texto}</span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}

                                    <div className="mb-2 flex items-center gap-3 text-xs text-amber-700">
                                      <span>⏱ {receita.tempo}</span>
                                      <span>📏 {receita.porcao}</span>
                                    </div>

                                    <p className="mb-1 text-xs font-bold text-slate-700">Ingredientes:</p>
                                    <ul className="mb-2.5 space-y-0.5 text-xs text-slate-600">
                                      {receita.ingredientes.map((ing: string, i: number) => (
                                        <li key={i} className="flex gap-1.5">
                                          <span className="text-amber-400">•</span>
                                          <span>{ing}</span>
                                        </li>
                                      ))}
                                    </ul>

                                    <p className="mb-1 text-xs font-bold text-slate-700">Preparo:</p>
                                    <ol className="mb-2.5 space-y-1 text-xs text-slate-600">
                                      {receita.preparo.map((step: string, i: number) => (
                                        <li key={i} className="flex gap-1.5">
                                          <span className="shrink-0 font-bold text-amber-500">{i + 1}.</span>
                                          <span>{step}</span>
                                        </li>
                                      ))}
                                    </ol>

                                    {receita.dica ? (
                                      <p className="rounded-lg bg-amber-100/60 px-2.5 py-2 text-xs text-amber-800">
                                        💡 {receita.dica}
                                      </p>
                                    ) : null}

                                    {/* Adaptações personalizadas por condição */}
                                    {receita.adaptacoesPersonalizadas?.length > 0 ? (
                                      <div className="mt-2 space-y-1">
                                        <p className="text-[0.68rem] font-bold uppercase tracking-wide text-blue-600">Como adaptar para você:</p>
                                        {receita.adaptacoesPersonalizadas.map((a: { icone: string; texto: string }, i: number) => (
                                          <div key={i} className="flex items-start gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5">
                                            <span className="shrink-0 text-sm">{a.icone}</span>
                                            <span className="text-xs leading-snug text-blue-700">{a.texto}</span>
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
                        </div>

                        {/* Macros da refeição */}
                        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[0.7rem] font-semibold text-blue-600">
                            {meal.macros.proteina}g prot.
                          </span>
                          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[0.7rem] font-semibold text-amber-600">
                            {meal.macros.carbo}g carb.
                          </span>
                          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[0.7rem] font-semibold text-rose-600">
                            {meal.macros.gordura}g gord.
                          </span>
                        </div>
                      </div>

                      {!isPrem ? (
                        <div className="mt-3 border-t border-slate-100 pt-3">
                          <InlineLock
                            mensagem="Receitas passo a passo e troca de alimentos continuam no Plano Pro"
                            onUnlock={() => setShowSubscribeModal(true)}
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {activeTab === "semana" ? (
          isPrem ? <PlanWeekView /> : (
            <InlineLock
              mensagem="Cardapio da semana completo — planeje seus 7 dias"
              onUnlock={() => setShowSubscribeModal(true)}
            />
          )
        ) : null}

        {activeTab === "progresso" ? (
          isPrem ? (
            <PlanProgressView
              profile={profile}
              weightHistory={weightHistory}
              weightInput={weightInput}
              feedback={feedback}
              onWeightInputChange={setWeightInput}
              onSaveWeight={saveWeight}
            />
          ) : (
            <InlineLock
              mensagem="Acompanhe sua evolucao com grafico de peso"
              onUnlock={() => setShowSubscribeModal(true)}
            />
          )
        ) : null}

        {activeTab === "ingredientes" ? (
          isPrem ? <PlanIngredientsView profile={profile} /> : (
            <InlineLock
              mensagem="Busque receitas pelos ingredientes que voce tem em casa"
              onUnlock={() => setShowSubscribeModal(true)}
            />
          )
        ) : null}

        {activeTab === "saude" ? (
          isPrem ? <PlanHealthView healthData={healthData} /> : (
            <InlineLock
              mensagem="Diario de saude, exames e controle de medicamentos"
              onUnlock={() => setShowSubscribeModal(true)}
            />
          )
        ) : null}

        <div className="flex justify-center gap-2 pb-4 pt-1">
          <Link href="/onboarding">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 active:bg-slate-50"
            >
              Refazer meu perfil
            </button>
          </Link>
          <button
            type="button"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-500 active:bg-slate-50"
            onClick={handleLogout}
          >
            Sair da conta
          </button>
        </div>
      </div>

      {/* Modal principal de assinatura */}
      {showSubscribeModal ? (
        <SubscribeModal onClose={() => setShowSubscribeModal(false)} />
      ) : null}

      {/* Popup periódico para usuários free */}
      {showFreePopup ? (
        <FreeReminderPopup
          onClose={() => setShowFreePopup(false)}
          onUpgrade={() => { setShowFreePopup(false); setShowSubscribeModal(true); }}
        />
      ) : null}
    </main>
  );
}
