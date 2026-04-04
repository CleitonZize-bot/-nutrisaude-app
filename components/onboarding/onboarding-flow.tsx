"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Check,
  CircleAlert,
  Loader2,
  Ruler,
  Scale,
  User,
  Users,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  carregarDadosLocais,
  pbCarregarPerfilServidor,
  pbSalvarPerfil,
  salvarPerfilLocal,
  type NutrisaudeProfile,
} from "@/lib/pocketbase";

const OBJETIVOS = [
  {
    value: "emagrecer",
    icon: "⚖️",
    title: "Emagrecer",
    description: "Reduzir gordura corporal com deficit calorico controlado.",
  },
  {
    value: "massa",
    icon: "💪",
    title: "Ganhar massa muscular",
    description: "Aumentar a massa magra com superavit calorico e proteina adequada.",
  },
  {
    value: "manter",
    icon: "🎯",
    title: "Manter o peso",
    description: "Manter o peso atual com uma alimentacao equilibrada.",
  },
];

const NIVEIS_ATIVIDADE = [
  {
    value: "sedentario",
    icon: "🪑",
    title: "Sedentario",
    description: "Fico em casa ou trabalho sentado a maior parte do dia.",
  },
  {
    value: "leve",
    icon: "🚶",
    title: "Levemente ativo",
    description: "Caminhadas, tarefas do lar ou exercicio leve 1-2x por semana.",
  },
  {
    value: "ativo",
    icon: "🏃",
    title: "Bem ativo",
    description: "Exercicio regular 3 ou mais vezes por semana.",
  },
];

const CONDICOES = [
  {
    value: "esteatose",
    icon: "🫀",
    title: "Esteatose Hepatica",
    description: "Gordura no figado — evitar gorduras saturadas, acucar e alcool.",
  },
  {
    value: "diabetes",
    icon: "🩸",
    title: "Diabetes",
    description: "Controle de glicemia e reducao de carboidratos refinados.",
  },
  {
    value: "hipertensao",
    icon: "💓",
    title: "Hipertensao",
    description: "Pressao alta — reduzir sodio, embutidos e industrializados.",
  },
  {
    value: "colesterol",
    icon: "🫁",
    title: "Colesterol alto",
    description: "Priorizar fibras e reduzir gorduras trans e saturadas.",
  },
  {
    value: "gastrite",
    icon: "🫃",
    title: "Gastrite / Refluxo",
    description: "Evitar alimentos acidos, condimentados e frituras.",
  },
  {
    value: "tireoide",
    icon: "🦋",
    title: "Tireoide (hipo/hiper)",
    description: "Cuidado com alimentos goitrogenicos como soja e brassicas cruas.",
  },
  {
    value: "gota",
    icon: "🦴",
    title: "Gota / Acido urico alto",
    description: "Reduzir purinas: carnes vermelhas, frutos do mar e alcool.",
  },
  {
    value: "lactose",
    icon: "🥛",
    title: "Intolerancia a lactose",
    description: "Evitar leite e derivados com lactose.",
  },
  {
    value: "celiaca",
    icon: "🌾",
    title: "Doenca celiaca / gluten",
    description: "Evitar trigo, cevada e centeio completamente.",
  },
  {
    value: "anemia",
    icon: "💊",
    title: "Anemia",
    description: "Priorizar ferro, vitamina C e B12 na alimentacao.",
  },
];

type Step = 1 | 2 | 3 | 4;

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [passoAtivo, setPassoAtivo] = useState(-1);

  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [atividade, setAtividade] = useState("");
  const [condicoes, setCondicoes] = useState<string[]>([]);

  useEffect(() => {
    async function preencher() {
      const perfilServidor = await pbCarregarPerfilServidor();
      const local = carregarDadosLocais()?.perfil;
      const perfil = perfilServidor || local;
      if (!perfil) return;
      setNome(perfil.nome || "");
      setPeso(perfil.peso ? String(perfil.peso) : "");
      setAltura(perfil.altura ? String(perfil.altura) : "");
      setIdade(perfil.idade ? String(perfil.idade) : "");
      setSexo(perfil.sexo || "");
      setObjetivo(perfil.objetivo || "");
      setAtividade(perfil.atividade || "");
      setCondicoes(
        perfil.condicoes && perfil.condicoes[0] !== "nenhum" ? perfil.condicoes : []
      );
    }
    preencher();
  }, []);

  const primeiroNome = nome.trim().split(" ")[0];

  const calculoPasoss = [
    `Analisando o perfil de ${primeiroNome || "voce"}`,
    "Calculando calorias e macronutrientes",
    "Selecionando alimentos ideais",
    "Verificando restricoes de saude",
    "Montando seu cardapio personalizado",
  ];

  useEffect(() => {
    if (step !== 4) return;

    const timers = calculoPasoss.map((_, index) =>
      window.setTimeout(() => {
        setPassoAtivo(index);
        setProgress(Math.round(((index + 1) / calculoPasoss.length) * 100));
      }, 320 + index * 340)
    );

    const redirectTimer = window.setTimeout(() => {
      startTransition(() => router.push("/plano"));
    }, 2400);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(redirectTimer);
    };
  }, [router, step]); // eslint-disable-line react-hooks/exhaustive-deps

  function irParaObjetivo() {
    setErro("");
    if (!nome.trim() || !peso || !altura || !idade || !sexo) {
      setErro("Preencha todos os campos para continuar.");
      return;
    }
    setStep(2);
  }

  function irParaSaude() {
    if (!objetivo) {
      setErro("Escolha um objetivo para continuar.");
      return;
    }
    if (!atividade) {
      setErro("Informe seu nivel de atividade fisica.");
      return;
    }
    setErro("");
    setStep(3);
  }

  function toggleCondicao(valor: string, checked: boolean) {
    setCondicoes((current) => {
      if (checked) return current.includes(valor) ? current : [...current, valor];
      return current.filter((item) => item !== valor);
    });
  }

  async function finalizar() {
    setErro("");

    const perfil: NutrisaudeProfile = {
      nome: nome.trim(),
      peso: Number(peso),
      altura: Number(altura),
      idade: Number(idade),
      sexo,
      objetivo,
      atividade,
      condicoes: condicoes.length > 0 ? condicoes : ["nenhum"],
    };

    setLoading(true);
    try {
      salvarPerfilLocal(perfil);
      await pbSalvarPerfil(perfil);
      setStep(4);
    } catch {
      setErro("Nao foi possivel salvar seus dados agora. Tente novamente.");
      setLoading(false);
    }
  }

  const stepLabels = ["Seus dados", "Objetivo e atividade", "Condicoes de saude", ""];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#eef4f9] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(0,196,114,0.14),transparent_26%),linear-gradient(180deg,#eef4f9_0%,#edf4ef_100%)]" />
      <div className="mx-auto max-w-4xl">
        <Card className="nutri-surface rounded-[2rem] border border-slate-200/80 py-0 ring-1 ring-white/70">
          <CardHeader className="gap-4 border-b border-slate-100/90 px-6 py-6 sm:px-10 sm:py-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-xl ring-1 ring-primary/20">
                <span aria-hidden="true">🥗</span>
              </div>
              <div>
                <p className="nutri-title text-xl font-extrabold tracking-tight text-slate-900">NutriSaude</p>
                <p className="text-sm text-slate-500">Questionario do seu plano personalizado</p>
              </div>
            </div>

            {step !== 4 ? (
              <div className="flex flex-col gap-3">
                <Progress value={(step / 4) * 100} className="w-full" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Passo {step} de 4</span>
                  <span className="font-semibold text-emerald-600">{stepLabels[step - 1]}</span>
                </div>
              </div>
            ) : null}
          </CardHeader>

          <CardContent className="px-6 py-8 sm:px-10 sm:py-10">
            {erro ? (
              <Alert variant="destructive" className="mb-6">
                <CircleAlert />
                <AlertTitle>Algo precisa ser corrigido</AlertTitle>
                <AlertDescription>{erro}</AlertDescription>
              </Alert>
            ) : null}

            {/* ── STEP 1 — Dados básicos ── */}
            {step === 1 ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <CardTitle className="nutri-title text-4xl font-black tracking-tight text-slate-800">
                    Seus dados
                  </CardTitle>
                  <CardDescription className="max-w-2xl text-lg leading-8 text-slate-500">
                    Precisamos dessas informacoes para calcular suas necessidades nutricionais com precisao.
                  </CardDescription>
                </div>

                <FieldGroup className="gap-6">
                  <Field>
                    <FieldLabel htmlFor="nome">
                      <span className="flex items-center gap-2">
                        <User className="size-4 text-primary" />
                        Como voce se chama?
                      </span>
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                        className="h-16 rounded-2xl border-slate-200 bg-white px-6 text-xl"
                      />
                    </FieldContent>
                  </Field>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="peso">
                        <span className="flex items-center gap-2">
                          <Scale className="size-4 text-primary" />
                          Peso (kg)
                        </span>
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          id="peso"
                          type="number"
                          value={peso}
                          onChange={(e) => setPeso(e.target.value)}
                          placeholder="Ex: 80"
                          className="h-16 rounded-2xl border-slate-200 bg-white px-6 text-xl"
                        />
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="altura">
                        <span className="flex items-center gap-2">
                          <Ruler className="size-4 text-primary" />
                          Altura (cm)
                        </span>
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          id="altura"
                          type="number"
                          value={altura}
                          onChange={(e) => setAltura(e.target.value)}
                          placeholder="Ex: 170"
                          className="h-16 rounded-2xl border-slate-200 bg-white px-6 text-xl"
                        />
                      </FieldContent>
                    </Field>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="idade">
                        <span className="flex items-center gap-2">
                          <Calendar className="size-4 text-primary" />
                          Idade
                        </span>
                      </FieldLabel>
                      <FieldContent>
                        <Input
                          id="idade"
                          type="number"
                          value={idade}
                          onChange={(e) => setIdade(e.target.value)}
                          placeholder="Ex: 45"
                          className="h-16 rounded-2xl border-slate-200 bg-white px-6 text-xl"
                        />
                      </FieldContent>
                    </Field>

                    <Field>
                      <FieldLabel>
                        <span className="flex items-center gap-2">
                          <Users className="size-4 text-primary" />
                          Sexo
                        </span>
                      </FieldLabel>
                      <FieldContent>
                        <ToggleGroup
                          value={sexo ? [sexo] : []}
                          onValueChange={(v) => setSexo(v[0] || "")}
                          className="grid w-full grid-cols-2 gap-4"
                        >
                          <ToggleGroupItem
                            value="masculino"
                            className="h-16 rounded-2xl border border-slate-200 bg-white text-lg text-slate-800 data-[pressed]:border-primary data-[pressed]:bg-primary/10"
                          >
                            Masculino
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="feminino"
                            className="h-16 rounded-2xl border border-slate-200 bg-white text-lg text-slate-800 data-[pressed]:border-primary data-[pressed]:bg-primary/10"
                          >
                            Feminino
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FieldContent>
                    </Field>
                  </div>
                </FieldGroup>

                <Button
                  type="button"
                  size="lg"
                  onClick={irParaObjetivo}
                  className="h-16 rounded-2xl text-xl font-bold shadow-[0_20px_50px_rgba(0,196,114,0.22)]"
                >
                  Continuar
                </Button>
              </div>
            ) : null}

            {/* ── STEP 2 — Objetivo + Atividade ── */}
            {step === 2 ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <CardTitle className="nutri-title text-4xl font-black tracking-tight text-slate-800">
                    {primeiroNome ? `Otimo, ${primeiroNome}!` : "Otimo!"} Agora o seu objetivo
                  </CardTitle>
                  <CardDescription className="max-w-2xl text-lg leading-8 text-slate-500">
                    Essas informacoes definem suas calorias e macronutrientes diarios ideais.
                  </CardDescription>
                </div>

                <div>
                  <p className="mb-3 text-base font-bold text-slate-700">Qual e o seu objetivo principal?</p>
                  <div className="grid gap-4">
                    {OBJETIVOS.map((item) => {
                      const sel = objetivo === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setObjetivo(item.value)}
                          className={`rounded-[1.75rem] border px-6 py-6 text-left transition-all ${
                            sel
                              ? "border-primary bg-primary/8 shadow-lg shadow-primary/10"
                              : "border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/[0.03]"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{item.icon}</div>
                            <div className="flex flex-col gap-1">
                              <p className="text-xl font-bold text-slate-800">{item.title}</p>
                              <p className="text-base leading-7 text-slate-500">{item.description}</p>
                            </div>
                            {sel ? (
                              <div className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full bg-primary">
                                <Check className="size-4 text-white" />
                              </div>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-base font-bold text-slate-700">Qual e o seu nivel de atividade fisica?</p>
                  <p className="mb-4 text-sm text-slate-500">Isso afeta diretamente quantas calorias voce precisa por dia.</p>
                  <div className="grid gap-3">
                    {NIVEIS_ATIVIDADE.map((item) => {
                      const sel = atividade === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => setAtividade(item.value)}
                          className={`rounded-[1.75rem] border px-5 py-4 text-left transition-all ${
                            sel
                              ? "border-primary bg-primary/8 shadow-lg shadow-primary/10"
                              : "border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/[0.03]"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-3xl">{item.icon}</div>
                            <div className="flex flex-col gap-0.5 flex-1">
                              <p className="text-lg font-bold text-slate-800">{item.title}</p>
                              <p className="text-sm text-slate-500">{item.description}</p>
                            </div>
                            {sel ? (
                              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary">
                                <Check className="size-4 text-white" />
                              </div>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="button" variant="outline" size="lg" className="h-14 rounded-2xl" onClick={() => { setErro(""); setStep(1); }}>
                    Voltar
                  </Button>
                  <Button type="button" size="lg" className="h-14 flex-1 rounded-2xl text-lg font-bold" onClick={irParaSaude}>
                    Continuar
                  </Button>
                </div>
              </div>
            ) : null}

            {/* ── STEP 3 — Condições de saúde ── */}
            {step === 3 ? (
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                  <CardTitle className="nutri-title text-4xl font-black tracking-tight text-slate-800">
                    Voce tem alguma condicao de saude?
                  </CardTitle>
                  <CardDescription className="max-w-3xl text-lg leading-8 text-slate-500">
                    Pode marcar mais de uma. Seu cardapio e receitas serao adaptados automaticamente e voce recebera alertas sobre alimentos prejudiciais.
                  </CardDescription>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {CONDICOES.map((item) => {
                    const checked = condicoes.includes(item.value);
                    return (
                      <label
                        key={item.value}
                        className={`flex cursor-pointer gap-4 rounded-[1.75rem] border px-5 py-5 transition-all ${
                          checked
                            ? "border-primary bg-primary/8 shadow-lg shadow-primary/10"
                            : "border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/[0.03]"
                        }`}
                      >
                        <div className="pt-1">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(v) => toggleCondicao(item.value, Boolean(v))}
                          />
                        </div>
                        <div className="flex flex-1 gap-4">
                          <div className="text-3xl">{item.icon}</div>
                          <div className="flex flex-col gap-1">
                            <p className="text-lg font-bold text-slate-800">{item.title}</p>
                            <p className="text-sm leading-6 text-slate-500">{item.description}</p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setCondicoes([])}
                  className={`h-14 rounded-2xl border-2 text-base font-semibold transition-all ${
                    condicoes.length === 0
                      ? "border-primary bg-primary/8 text-primary shadow-lg shadow-primary/10"
                      : "border-dashed border-slate-300 bg-white text-slate-600 hover:border-primary/40 hover:bg-primary/[0.03]"
                  }`}
                >
                  {condicoes.length === 0 ? "✓ " : ""}Nenhuma das anteriores
                </button>

                {condicoes.length > 0 ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
                    <span className="text-lg">✅</span>
                    <p className="text-sm font-medium text-emerald-700">
                      {condicoes.length} condicao{condicoes.length > 1 ? "oes" : ""} selecionada{condicoes.length > 1 ? "s" : ""} — seu cardapio e receitas serao adaptados.
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="button" variant="outline" size="lg" className="h-14 rounded-2xl" onClick={() => { setErro(""); setStep(2); }}>
                    Voltar
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    disabled={loading}
                    className="h-14 flex-1 rounded-2xl text-lg font-bold shadow-[0_20px_50px_rgba(0,196,114,0.22)]"
                    onClick={finalizar}
                  >
                    {loading ? "Gerando seu plano..." : "Gerar meu cardapio ✨"}
                  </Button>
                </div>
              </div>
            ) : null}

            {/* ── STEP 4 — Loading animado ── */}
            {step === 4 ? (
              <div className="flex flex-col items-center gap-8 px-2 py-6 text-center">
                <div className="text-7xl">🧬</div>
                <div className="flex flex-col gap-3">
                  <CardTitle className="nutri-title text-4xl font-black tracking-tight text-slate-800">
                    Calculando seu plano...
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-500">
                    Personalizando para o seu corpo e suas condicoes de saude
                  </CardDescription>
                </div>

                <div className="w-full max-w-2xl">
                  <Progress value={progress} className="w-full" />
                </div>

                <div className="flex w-full max-w-2xl flex-col gap-3">
                  {calculoPasoss.map((passo, index) => {
                    const ativo = index === passoAtivo;
                    const feito = index < passoAtivo;
                    return (
                      <div
                        key={passo}
                        className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all ${
                          ativo || feito ? "bg-primary/8 text-primary" : "text-slate-400"
                        }`}
                      >
                        <div
                          className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                            ativo || feito ? "bg-primary text-primary-foreground" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {feito ? (
                            <Check className="size-4" />
                          ) : ativo ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <span className="text-xs">{index + 1}</span>
                          )}
                        </div>
                        <span className="text-lg font-medium">{passo}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
