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
import { obterSubstituicoes } from "@/lib/alimentos-data";
import { gerarCardapioCompleto } from "@/lib/nutricao-data";
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

function SubscribeModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="nutri-surface w-full max-w-md rounded-[2rem] border border-white/10 p-0 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-4 px-6 pt-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            <X className="size-4" />
          </button>
          <div className="flex size-16 items-center justify-center rounded-full bg-primary/12 text-primary">
            <LockKeyhole className="size-8" />
          </div>
          <p className="nutri-title text-3xl font-black text-slate-900">
            Assine o NutriSaude para ter acesso completo
          </p>
          <p className="max-w-xs text-base leading-7 text-slate-500">
            Seu perfil ja foi salvo. Para liberar cardapios, receitas, progresso e todas as funcoes, ative sua assinatura.
          </p>
        </div>

        <div className="flex flex-col gap-3 px-6 pb-7 pt-5">
          <a href={subscribeUrl} target="_blank" rel="noreferrer">
            <button
              type="button"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-[1.2rem] bg-primary text-base font-bold text-white shadow-[0_18px_34px_rgba(0,196,114,0.22)] hover:bg-[#00d97e]"
            >
              Assinar o NutriSaude
              <ArrowRight className="size-5" />
            </button>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-[1rem] border border-slate-200 bg-white text-sm font-semibold text-slate-500 hover:bg-slate-50"
          >
            Agora nao
          </button>
        </div>
      </div>
    </div>
  );
}

function PremiumTabLock({ onUnlock }: { onUnlock: () => void }) {
  return (
    <button type="button" onClick={onUnlock} className="block w-full text-left">
      <div className="flex flex-col items-center gap-4 rounded-[1.9rem] bg-slate-900/90 px-6 py-12 text-center backdrop-blur-sm">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary/15">
          <LockKeyhole className="size-7 text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="nutri-title text-2xl font-black text-white">
            Clique para desbloquear
          </p>
          <p className="text-sm text-white/70">
            Receitas, cardapios e todas as funcoes do aplicativo
          </p>
        </div>
      </div>
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

export function TodayPlan({ isNewPlan = false, isPremium = true }: { isNewPlan?: boolean; isPremium?: boolean }) {
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
    <main className="min-h-screen bg-[#f6fbf8] px-4 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6">
        <div className="nutri-dark-panel flex flex-col gap-4 rounded-[1.6rem] px-4 py-5 text-white sm:rounded-[2rem] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-1">
            <p className="nutri-title text-2xl font-black leading-tight tracking-tight sm:text-3xl">
              Ola, {profile.nome} 👋
            </p>
            <p className="text-xs font-medium text-primary">{todayLabel}</p>
            <p className="text-[0.7rem] text-white/60">{profileSummary}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Card className="border-white/10 bg-white/8 py-0 text-white ring-0 backdrop-blur-sm">
              <CardContent className="px-4 py-4 text-center sm:px-4 sm:py-5">
                <p className="text-2xl font-black leading-none text-primary sm:text-[2rem]">
                  {plan.tdee.toLocaleString("pt-BR")}
                </p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-white/55">
                  kcal/dia
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/8 py-0 text-white ring-0 backdrop-blur-sm">
              <CardContent className="px-4 py-4 text-center sm:px-4 sm:py-5">
                <p className="text-2xl font-black leading-none text-primary sm:text-[2rem]">
                  {plan.macros.proteina}g
                </p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-white/55">
                  proteina
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/8 py-0 text-white ring-0 backdrop-blur-sm">
              <CardContent className="px-4 py-4 text-center sm:px-4 sm:py-5">
                <p className="text-2xl font-black leading-none text-primary sm:text-[2rem]">
                  {plan.macros.carbo}g
                </p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-white/55">
                  carbo
                </p>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/8 py-0 text-white ring-0 backdrop-blur-sm">
              <CardContent className="px-4 py-4 text-center sm:px-4 sm:py-5">
                <p className="text-2xl font-black leading-none text-primary sm:text-[2rem]">
                  {plan.macros.gordura}g
                </p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-white/55">
                  gordura
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

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

        <Card className="overflow-hidden rounded-[1.9rem] border border-blue-900/10 bg-[linear-gradient(180deg,#244d7f_0%,#204a79_100%)] py-0 text-white shadow-[0_22px_48px_rgba(30,64,116,0.18)]">
          <CardHeader className="gap-2 px-5 pt-5 sm:px-6 sm:pt-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Droplets className="text-cyan-200" />
                <CardTitle className="nutri-title text-xl text-white">
                  Hidratacao do dia
                </CardTitle>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="rounded-full bg-white/10 text-white hover:bg-white/16 hover:text-white"
                onClick={() => updateWater(0)}
              >
                <RefreshCw className="size-4" />
              </Button>
            </div>
            <CardDescription className="text-white/75">
              Meta: {(hydrationMeta / 1000).toFixed(1)}L
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 px-5 pb-5 sm:px-6 sm:pb-6">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-lg font-bold text-white">
                  {water >= 1000
                    ? `${(water / 1000).toFixed(2).replace(".", ",")}L`
                    : `${water}ml`}
                </span>
                <Badge className="bg-white/16 text-white hover:bg-white/16">
                  {hydrationPercent}%
                </Badge>
              </div>
              <Progress value={hydrationPercent} className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-full border-white/25 bg-white/8 text-white hover:bg-white/14 hover:text-white"
                onClick={() => updateWater(Math.min(water + 250, hydrationMeta * 2))}
              >
                +250ml
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-full border-white/25 bg-white/8 text-white hover:bg-white/14 hover:text-white"
                onClick={() => updateWater(Math.min(water + 350, hydrationMeta * 2))}
              >
                +350ml
              </Button>
              <Button
                type="button"
                className="h-11 rounded-full bg-blue-500 text-white hover:bg-blue-400"
                onClick={() => updateWater(Math.min(water + 500, hydrationMeta * 2))}
              >
                +500ml
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-full border-rose-300/40 bg-rose-500/8 text-white hover:bg-rose-500/16 hover:text-white"
                onClick={() => updateWater(Math.max(0, water - 200))}
              >
                -200ml
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
          <CardContent className="px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CalendarDays className="size-4 text-violet-500" />
                Progresso de hoje
              </p>
              <span className="text-sm font-bold text-emerald-500">
                {progressCount}/{plan.refeicoes.length}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <Progress value={progressPercent} className="w-full" />
              <div className="flex justify-center gap-2">
                {Array.from({ length: Math.max(plan.refeicoes.length, 6) }).map((_, index) => (
                  <span
                    key={`progress-dot-${index}`}
                    className={`size-2 rounded-full ${
                      index < progressCount ? "bg-slate-400" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="nutri-surface rounded-[1.8rem] border border-slate-200/80 py-0">
          <CardContent className="grid grid-cols-5 gap-2 px-3 py-3 sm:flex sm:flex-wrap sm:gap-2 sm:px-4 sm:py-4">
            {TABS.map((tab) => {
              const Icon = tab.icon;

              return (
                <Button
                  key={tab.key}
                  type="button"
                  variant="ghost"
                  className={
                    activeTab === tab.key
                      ? "flex h-auto min-h-14 flex-col gap-1 rounded-[1rem] bg-slate-800 px-2 py-2 text-[0.72rem] text-white shadow-[0_10px_24px_rgba(15,23,42,0.22)] hover:bg-slate-800 hover:text-white sm:h-11 sm:min-h-0 sm:flex-row sm:gap-2 sm:px-5 sm:py-0 sm:text-sm"
                      : "flex h-auto min-h-14 flex-col gap-1 rounded-[1rem] px-2 py-2 text-[0.72rem] text-slate-500 hover:bg-slate-100 hover:text-slate-900 sm:h-11 sm:min-h-0 sm:flex-row sm:gap-2 sm:px-5 sm:py-0 sm:text-sm"
                  }
                  onClick={() => setActiveTab(tab.key)}
                >
                  <Icon className="size-4" />
                  {tab.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>

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
                <Card
                  key={meal.chave}
                  className={`relative overflow-hidden rounded-[1.6rem] border py-0 shadow-[0_4px_16px_rgba(148,163,184,0.12)] ${
                    isOpen ? style.border : "border-slate-100"
                  } bg-white`}
                >
                  <div className={`absolute inset-y-0 left-0 w-1 ${style.stripe}`} />
                  <CardHeader className="gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${style.icon}`}
                        >
                          {meal.icone}
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="nutri-title text-[1.45rem] text-slate-900">
                            {meal.nome}
                          </CardTitle>
                          <div className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                            {hasAlert ? <span className="text-amber-500">!</span> : null}
                            <span>{meal.horario}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-start gap-2">
                        <Badge className="h-9 rounded-full border border-emerald-200 bg-emerald-50 px-3 text-emerald-600 hover:bg-emerald-50">
                          ~{meal.calorias} kcal
                        </Badge>
                        {isPremium ? (
                          doneAt ? (
                            <Button
                              type="button"
                              variant="outline"
                              className="h-9 rounded-full border-emerald-200 px-4 text-emerald-600 hover:bg-emerald-50"
                              onClick={() => markMealDone(meal.chave, false)}
                            >
                              <CheckCircle2 />
                              {doneAt}
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              className="h-9 rounded-full border-emerald-200 px-4 text-emerald-600 hover:bg-emerald-50"
                              onClick={() => markMealDone(meal.chave, true)}
                            >
                              Marcar
                            </Button>
                          )
                        ) : null}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-sm"
                          className="mt-0.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          onClick={() => toggleMeal(meal.chave)}
                        >
                          <ChevronDown
                            className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {isOpen ? (
                    <CardContent className="relative flex flex-col gap-4 px-5 pb-5 sm:px-6 sm:pb-6">
                      <div className={isPremium ? undefined : "pointer-events-none select-none blur-sm"}>
                        {hasAlert ? (
                          <Alert className="mb-4 rounded-[1rem] border-red-200 bg-red-50 text-red-700">
                            <ShieldAlert />
                            <AlertTitle>Atencao nesta refeicao</AlertTitle>
                            <AlertDescription>
                              Esta refeicao contem alimentos que pedem atencao para sua condicao de saude.
                            </AlertDescription>
                          </Alert>
                        ) : null}

                        <div className="space-y-4">
                          {meal.itens.map((item, itemIndex) => {
                            const alert = verificarAlerta(item.nome, profile.condicoes);
                            const substitutions =
                              item.grupoId && item.indiceNoGrupo !== undefined
                                ? obterSubstituicoes(item.grupoId, item.indiceNoGrupo)
                                : [];

                            return (
                              <div
                                key={`${meal.chave}-${itemIndex}`}
                                className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                              >
                                <div className="flex flex-col gap-3">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <p className="text-[1.04rem] font-medium text-slate-900">
                                        {item.nome}
                                      </p>
                                    </div>
                                    <p className="shrink-0 text-[1.04rem] font-medium text-emerald-500">
                                      {item.quantidade}
                                    </p>
                                  </div>

                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 rounded-full border-amber-200 bg-white text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                                  >
                                    Como preparar
                                  </Button>

                                  {alert ? (
                                    <p className="text-sm leading-6 text-red-500">{alert}</p>
                                  ) : null}

                                  {substitutions.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                      {substitutions.slice(0, 4).map((sub) => (
                                        <Button
                                          key={`${item.nome}-${sub.indice}`}
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          className="rounded-full border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                                          onClick={() =>
                                            replaceItem(meal.chave, itemIndex, item.grupoId!, sub.indice)
                                          }
                                        >
                                          {sub.nome}
                                        </Button>
                                      ))}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 hover:bg-blue-50">
                            {meal.macros.proteina}g proteina
                          </Badge>
                          <Badge className="rounded-full bg-amber-50 px-3 py-1 text-amber-600 hover:bg-amber-50">
                            {meal.macros.carbo}g carb.
                          </Badge>
                          <Badge className="rounded-full bg-rose-50 px-3 py-1 text-rose-600 hover:bg-rose-50">
                            {meal.macros.gordura}g gordura
                          </Badge>
                        </div>
                      </div>

                      {!isPremium ? (
                        <button
                          type="button"
                          onClick={() => setShowSubscribeModal(true)}
                          className="absolute inset-x-4 bottom-4 top-4 flex items-center justify-center"
                        >
                          <div className="w-full rounded-[1.2rem] bg-slate-900/90 px-6 py-5 text-center backdrop-blur-sm">
                            <p className="nutri-title text-lg font-black text-white">
                              Clique para desbloquear
                            </p>
                            <p className="mt-1 text-sm text-white/70">
                              Receitas, cardapios e todas as funcoes do aplicativo
                            </p>
                          </div>
                        </button>
                      ) : null}
                    </CardContent>
                  ) : null}
                </Card>
              );
            })}
          </div>
        ) : null}

        {activeTab === "semana" ? (
          isPremium ? <PlanWeekView /> : <PremiumTabLock onUnlock={() => setShowSubscribeModal(true)} />
        ) : null}

        {activeTab === "progresso" ? (
          isPremium ? (
            <PlanProgressView
              profile={profile}
              weightHistory={weightHistory}
              weightInput={weightInput}
              feedback={feedback}
              onWeightInputChange={setWeightInput}
              onSaveWeight={saveWeight}
            />
          ) : <PremiumTabLock onUnlock={() => setShowSubscribeModal(true)} />
        ) : null}

        {activeTab === "ingredientes" ? (
          isPremium ? <PlanIngredientsView profile={profile} /> : <PremiumTabLock onUnlock={() => setShowSubscribeModal(true)} />
        ) : null}

        {activeTab === "saude" ? (
          isPremium ? <PlanHealthView healthData={healthData} /> : <PremiumTabLock onUnlock={() => setShowSubscribeModal(true)} />
        ) : null}

        <div className="flex justify-center gap-3 pt-2">
          <Link href="/onboarding">
            <Button
              variant="outline"
              className="rounded-[1rem] border-slate-200 px-6 text-slate-500 hover:bg-slate-50"
            >
              Refazer meu perfil
            </Button>
          </Link>
          <Button
            variant="outline"
            className="rounded-[1rem] border-slate-200 px-6 text-slate-500 hover:bg-slate-50"
            onClick={handleLogout}
          >
            Sair da conta
          </Button>
        </div>
      </div>

      {showSubscribeModal ? (
        <SubscribeModal onClose={() => setShowSubscribeModal(false)} />
      ) : null}
    </main>
  );
}
