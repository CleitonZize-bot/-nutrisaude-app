"use client";

import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  Activity,
  ClipboardList,
  Download,
  Droplet,
  FileText,
  HeartPulse,
  Pill,
  Plus,
  Stethoscope,
  Upload,
  X,
} from "lucide-react";
import { LembreteAgua } from "@/components/plan/lembrete-agua";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  atualizarDadosLocais,
  carregarDadosLocais,
  type NutrisaudeStoredData,
} from "@/lib/pocketbase";

type PlanHealthViewProps = {
  healthData: NutrisaudeStoredData;
  perfil?: { peso?: number; altura?: number } | null;
};

type DiarioEntry = {
  data: string;
  energia: number;
  figado: number;
  inchaco: number;
  sono: number;
  glicemia: number | null;
  notas: string;
};

type ExameEntry = {
  id: number;
  nome: string;
  valor: number;
  unidade: string;
  data: string;
};

type RemedioEntry = {
  id: number;
  nome: string;
  dose?: string;
  horarios: string[];
  obs?: string;
};

const ENERGY_OPTIONS = [
  { value: 1, label: "Muito baixa", badge: "😴" },
  { value: 2, label: "Baixa", badge: "😕" },
  { value: 3, label: "Media", badge: "🙂" },
  { value: 4, label: "Boa", badge: "😊" },
  { value: 5, label: "Otima", badge: "🤩" },
];

const DISCOMFORT_OPTIONS = [
  { value: 0, label: "Nenhum", badge: "✅" },
  { value: 1, label: "Leve", badge: "🙂" },
  { value: 2, label: "Moderado", badge: "🤔" },
  { value: 3, label: "Forte", badge: "🥵" },
];

const DIGESTION_OPTIONS = [
  { value: 0, label: "Otima", badge: "✅" },
  { value: 1, label: "Leve", badge: "🙂" },
  { value: 2, label: "Moderado", badge: "🤔" },
  { value: 3, label: "Forte", badge: "🥵" },
];

function localDateKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function localDateLabel() {
  return new Date()
    .toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    .replace(/^./, (char) => char.toUpperCase());
}

function parseDiario(
  value: NutrisaudeStoredData["diario"]
): Record<string, DiarioEntry> {
  if (!value || typeof value !== "object") return {};

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => {
      const item = (entry || {}) as Partial<DiarioEntry>;

      return [
        key,
        {
          data: typeof item.data === "string" ? item.data : key,
          energia: Number(item.energia || 0),
          figado: Number(item.figado || 0),
          inchaco: Number(item.inchaco || 0),
          sono: Number(item.sono || 0),
          glicemia:
            typeof item.glicemia === "number" && Number.isFinite(item.glicemia)
              ? item.glicemia
              : null,
          notas: typeof item.notas === "string" ? item.notas : "",
        },
      ];
    })
  );
}

function parseExames(value: NutrisaudeStoredData["exames"]): ExameEntry[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const item = (entry || {}) as Partial<ExameEntry>;

      return {
        id: Number(item.id || Date.now()),
        nome: typeof item.nome === "string" ? item.nome : "Exame",
        valor: Number(item.valor || 0),
        unidade: typeof item.unidade === "string" ? item.unidade : "",
        data: typeof item.data === "string" ? item.data : localDateKey(),
      };
    })
    .sort((a, b) => b.data.localeCompare(a.data));
}

function parseRemedios(value: NutrisaudeStoredData["remedios"]): RemedioEntry[] {
  if (!Array.isArray(value)) return [];

  return value.map((entry) => {
    const item = (entry || {}) as Partial<RemedioEntry>;

    return {
      id: Number(item.id || Date.now()),
      nome: typeof item.nome === "string" ? item.nome : "Medicamento",
      dose: typeof item.dose === "string" ? item.dose : "",
      horarios: Array.isArray(item.horarios)
        ? item.horarios.filter((horario): horario is string => typeof horario === "string")
        : [],
      obs: typeof item.obs === "string" ? item.obs : "",
    };
  });
}

function formatShortDate(value: string) {
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

function ScaleField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ value: number; label: string; badge: string }>;
  value: number;
  onChange: (nextValue: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={`${label}-${option.value}`}
              type="button"
              className={`inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_10px_24px_rgba(16,185,129,0.14)]"
                  : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white"
              }`}
              onClick={() => onChange(option.value)}
            >
              <span>{option.badge}</span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function calcularIMC(peso: number, alturaCm: number) {
  const alturaM = alturaCm / 100;
  return peso / (alturaM * alturaM);
}

function classificarIMC(imc: number): { label: string; cor: string; bg: string; detalhe: string } {
  if (imc < 18.5) return { label: "Abaixo do peso",   cor: "text-blue-600",   bg: "bg-blue-50",   detalhe: "Procure um nutricionista para ganho de peso saudavel." };
  if (imc < 25)   return { label: "Peso normal",       cor: "text-emerald-600",bg: "bg-emerald-50", detalhe: "Parabens! Continue mantendo seus habitos saudaveis." };
  if (imc < 30)   return { label: "Sobrepeso",         cor: "text-amber-600",  bg: "bg-amber-50",   detalhe: "Pequenas mudancas na alimentacao ja trazem grande impacto." };
  if (imc < 35)   return { label: "Obesidade grau 1",  cor: "text-orange-600", bg: "bg-orange-50",  detalhe: "Seu plano alimentar esta ajudando. Siga em frente!" };
  if (imc < 40)   return { label: "Obesidade grau 2",  cor: "text-red-600",    bg: "bg-red-50",     detalhe: "Converse com seu medico para um acompanhamento completo." };
  return             { label: "Obesidade grau 3",       cor: "text-red-700",    bg: "bg-red-50",     detalhe: "Procure acompanhamento medico especializado." };
}

export function PlanHealthView({ healthData, perfil }: PlanHealthViewProps) {
  const importInputRef = useRef<HTMLInputElement | null>(null);
  const todayKey = useMemo(() => localDateKey(), []);
  const todayLabel = useMemo(() => localDateLabel(), []);

  const [diarioMap, setDiarioMap] = useState<Record<string, DiarioEntry>>(() =>
    parseDiario(healthData.diario)
  );
  const [exames, setExames] = useState<ExameEntry[]>(() => parseExames(healthData.exames));
  const [remedios, setRemedios] = useState<RemedioEntry[]>(() => parseRemedios(healthData.remedios));
  const [feedback, setFeedback] = useState("");

  // Formulário de exame
  const [showExameForm, setShowExameForm] = useState(false);
  const [exameNome, setExameNome] = useState("");
  const [exameValor, setExameValor] = useState("");
  const [exameUnidade, setExameUnidade] = useState("");
  const [exameData, setExameData] = useState(localDateKey());

  // Formulário de medicamento
  const [showRemedioForm, setShowRemedioForm] = useState(false);
  const [remedioNome, setRemedioNome] = useState("");
  const [remedioDose, setRemedioDose] = useState("");
  const [remedioHorarios, setRemedioHorarios] = useState("");
  const [remedioObs, setRemedioObs] = useState("");

  // IMC
  const [imcPeso, setImcPeso] = useState(perfil?.peso ? String(perfil.peso) : "");
  const [imcAltura, setImcAltura] = useState(perfil?.altura ? String(perfil.altura) : "");
  const imcValor = imcPeso && imcAltura
    ? calcularIMC(Number(imcPeso), Number(imcAltura))
    : null;
  const imcInfo = imcValor ? classificarIMC(imcValor) : null;

  const todayEntry = diarioMap[todayKey];

  const [energia, setEnergia] = useState(todayEntry?.energia ?? 0);
  const [figado, setFigado] = useState(todayEntry?.figado ?? 0);
  const [inchaco, setInchaco] = useState(todayEntry?.inchaco ?? 0);
  const [sono, setSono] = useState(todayEntry?.sono ?? 0);
  const [glicemia, setGlicemia] = useState(
    todayEntry?.glicemia ? String(todayEntry.glicemia) : ""
  );
  const [notas, setNotas] = useState(todayEntry?.notas ?? "");

  const diarioCount = Object.keys(diarioMap).length;

  function saveDiary() {
    const entry: DiarioEntry = {
      data: todayKey,
      energia,
      figado,
      inchaco,
      sono,
      glicemia: glicemia ? Number(glicemia.replace(",", ".")) : null,
      notas: notas.trim(),
    };

    const updated = atualizarDadosLocais((data) => ({
      ...data,
      diario: {
        ...(data.diario || {}),
        [todayKey]: entry,
      },
    }));

    setDiarioMap(parseDiario(updated.diario));
    setFeedback("Registro de hoje salvo com sucesso.");
  }

  function saveExame(event: FormEvent) {
    event.preventDefault();
    if (!exameNome.trim() || !exameValor.trim()) return;

    const novoExame: ExameEntry = {
      id: Date.now(),
      nome: exameNome.trim(),
      valor: Number(exameValor.replace(",", ".")),
      unidade: exameUnidade.trim(),
      data: exameData || localDateKey(),
    };

    const updated = atualizarDadosLocais((data) => ({
      ...data,
      exames: [...(Array.isArray(data.exames) ? data.exames : []), novoExame],
    }));

    setExames(parseExames(updated.exames));
    setExameNome("");
    setExameValor("");
    setExameUnidade("");
    setExameData(localDateKey());
    setShowExameForm(false);
    setFeedback("Exame adicionado com sucesso.");
  }

  function saveRemedio(event: FormEvent) {
    event.preventDefault();
    if (!remedioNome.trim()) return;

    const novoRemedio: RemedioEntry = {
      id: Date.now(),
      nome: remedioNome.trim(),
      dose: remedioDose.trim(),
      horarios: remedioHorarios
        .split(/[,\n]/)
        .map((h) => h.trim())
        .filter(Boolean),
      obs: remedioObs.trim(),
    };

    const updated = atualizarDadosLocais((data) => ({
      ...data,
      remedios: [...(Array.isArray(data.remedios) ? data.remedios : []), novoRemedio],
    }));

    setRemedios(parseRemedios(updated.remedios));
    setRemedioNome("");
    setRemedioDose("");
    setRemedioHorarios("");
    setRemedioObs("");
    setShowRemedioForm(false);
    setFeedback("Medicamento adicionado com sucesso.");
  }

  function exportBackup() {
    const dados = carregarDadosLocais() || {};
    const blob = new Blob([JSON.stringify(dados, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `nutrisaude-backup-${todayKey}.json`;
    anchor.click();
    window.URL.revokeObjectURL(url);
    setFeedback("Backup exportado com sucesso.");
  }

  function importBackup(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}")) as NutrisaudeStoredData;
        const updated = atualizarDadosLocais((data) => ({
          ...data,
          agua: parsed.agua ?? data.agua,
          checkins: parsed.checkins ?? data.checkins,
          historicoPeso: parsed.historicoPeso ?? data.historicoPeso,
          diario: parsed.diario ?? data.diario,
          exames: parsed.exames ?? data.exames,
          remedios: parsed.remedios ?? data.remedios,
        }));

        setDiarioMap(parseDiario(updated.diario));
        setExames(parseExames(updated.exames));
        setRemedios(parseRemedios(updated.remedios));
        setFeedback("Backup importado com sucesso.");
      } catch {
        setFeedback("Nao foi possivel importar esse backup.");
      } finally {
        event.target.value = "";
      }
    };

    reader.readAsText(file);
  }

  function generateReport() {
    const dados = carregarDadosLocais() || {};
    const perfil = dados.perfil;
    const examCards = parseExames(dados.exames)
      .slice(0, 8)
      .map(
        (exame) =>
          `<tr><td>${exame.nome}</td><td>${exame.valor} ${exame.unidade}</td><td>${formatShortDate(
            exame.data
          )}</td></tr>`
      )
      .join("");
    const remedioCards = parseRemedios(dados.remedios)
      .map(
        (remedio) =>
          `<li><strong>${remedio.nome}</strong>${
            remedio.dose ? ` - ${remedio.dose}` : ""
          }${remedio.horarios.length ? ` (${remedio.horarios.join(" | ")})` : ""}</li>`
      )
      .join("");

    const reportWindow = window.open("", "_blank", "width=900,height=700");
    if (!reportWindow) {
      setFeedback("Nao foi possivel abrir o relatorio no navegador.");
      return;
    }

    reportWindow.document.write(`
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8" />
          <title>Relatorio NutriSaude</title>
          <style>
            body { font-family: Arial, sans-serif; color: #0f172a; margin: 0; padding: 32px; }
            h1 { margin: 0 0 8px; color: #00c472; }
            h2 { margin: 28px 0 12px; font-size: 20px; }
            .muted { color: #64748b; }
            .card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; margin-top: 12px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border-bottom: 1px solid #e2e8f0; padding: 10px; text-align: left; }
            ul { margin: 0; padding-left: 18px; }
          </style>
        </head>
        <body>
          <h1>NutriSaude</h1>
          <p class="muted">Relatorio para acompanhamento</p>
          <div class="card">
            <strong>${perfil?.nome || "Paciente"}</strong><br />
            <span class="muted">${todayLabel}</span>
          </div>

          <h2>Diario de hoje</h2>
          <div class="card">
            <p>Energia: ${energia}/5</p>
            <p>Desconforto hepatico: ${figado}</p>
            <p>Inchaco / digestao: ${inchaco}</p>
            <p>Qualidade do sono: ${sono}/5</p>
            <p>Glicemia: ${glicemia || "-"}</p>
            <p>Observacoes: ${notas || "-"}</p>
          </div>

          <h2>Exames</h2>
          <div class="card">
            ${
              examCards
                ? `<table><thead><tr><th>Exame</th><th>Resultado</th><th>Data</th></tr></thead><tbody>${examCards}</tbody></table>`
                : "<p class='muted'>Nenhum exame registrado ainda.</p>"
            }
          </div>

          <h2>Medicamentos</h2>
          <div class="card">
            ${
              remedioCards
                ? `<ul>${remedioCards}</ul>`
                : "<p class='muted'>Nenhum medicamento cadastrado ainda.</p>"
            }
          </div>
        </body>
      </html>
    `);
    reportWindow.document.close();
    reportWindow.focus();
    setTimeout(() => reportWindow.print(), 400);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-3 px-6 pt-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-violet-500" />
              <div>
                <CardTitle className="nutri-title text-[1.6rem] text-slate-900">
                  Diario de hoje
                </CardTitle>
                <CardDescription>
                  Registre seus sintomas e acompanhe sua evolucao.
                </CardDescription>
              </div>
            </div>
            <p className="text-sm text-slate-500">{todayLabel}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-6 pb-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ScaleField
              label="Nivel de energia"
              options={ENERGY_OPTIONS}
              value={energia}
              onChange={setEnergia}
            />
            <ScaleField
              label="Desconforto hepatico"
              options={DISCOMFORT_OPTIONS}
              value={figado}
              onChange={setFigado}
            />
            <ScaleField
              label="Inchaco / Digestao"
              options={DIGESTION_OPTIONS}
              value={inchaco}
              onChange={setInchaco}
            />

            <div className="flex flex-col gap-5">
              <ScaleField
                label="Qualidade do sono"
                options={ENERGY_OPTIONS}
                value={sono}
                onChange={setSono}
              />

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="glicemia-hoje">Glicemia (opcional)</FieldLabel>
                  <FieldContent>
                    <div className="flex items-center gap-3">
                      <Input
                        id="glicemia-hoje"
                        value={glicemia}
                        onChange={(event) => setGlicemia(event.target.value)}
                        placeholder="Ex: 95"
                        className="h-12 rounded-2xl bg-white"
                      />
                      <span className="text-sm text-slate-500">mg/dL</span>
                    </div>
                  </FieldContent>
                </Field>
              </FieldGroup>
            </div>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="observacoes-hoje">Observacoes do dia</FieldLabel>
              <FieldContent>
                <textarea
                  id="observacoes-hoje"
                  value={notas}
                  onChange={(event) => setNotas(event.target.value)}
                  placeholder="Como foi seu dia? Algum alimento que comeu fora do plano? Sintomas especificos?"
                  className="min-h-32 w-full rounded-[1.5rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </FieldContent>
            </Field>
          </FieldGroup>

          <Button
            type="button"
            className="h-14 rounded-[1.2rem] text-base font-bold shadow-[0_18px_34px_rgba(0,196,114,0.22)]"
            onClick={saveDiary}
          >
            Salvar registro de hoje
          </Button>

          {feedback ? <p className="text-sm text-slate-500">{feedback}</p> : null}
        </CardContent>
      </Card>

      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-3 px-6 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Stethoscope className="text-violet-500" />
              <div>
                <CardTitle>Meus Exames</CardTitle>
                <CardDescription>
                  Registre seus resultados e acompanhe a evolucao.
                </CardDescription>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              onClick={() => setShowExameForm((v) => !v)}
            >
              {showExameForm ? <X /> : <Plus />}
              {showExameForm ? "Cancelar" : "Adicionar"}
            </Button>
          </div>

          {showExameForm && (
            <form onSubmit={saveExame} className="flex flex-col gap-3 rounded-[1.4rem] border border-emerald-100 bg-emerald-50/60 px-4 py-4">
              <p className="text-sm font-semibold text-slate-700">Novo exame</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-600">Nome do exame *</label>
                  <input
                    required
                    value={exameNome}
                    onChange={(e) => setExameNome(e.target.value)}
                    placeholder="Ex: Glicemia em jejum"
                    className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-600">Data</label>
                  <input
                    type="date"
                    value={exameData}
                    onChange={(e) => setExameData(e.target.value)}
                    className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-600">Resultado *</label>
                  <input
                    required
                    value={exameValor}
                    onChange={(e) => setExameValor(e.target.value)}
                    placeholder="Ex: 95"
                    className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-600">Unidade</label>
                  <input
                    value={exameUnidade}
                    onChange={(e) => setExameUnidade(e.target.value)}
                    placeholder="Ex: mg/dL"
                    className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
              <Button type="submit" className="h-10 rounded-xl text-sm font-semibold">
                Salvar exame
              </Button>
            </form>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-6 pb-6">
          {exames.length > 0 ? (
            exames.slice(0, 4).map((exame) => (
              <div
                key={`exame-${exame.id}`}
                className="flex flex-col gap-2 rounded-[1.4rem] border border-slate-100 bg-slate-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">{exame.nome}</p>
                  <p className="text-sm text-slate-500">{formatShortDate(exame.data)}</p>
                </div>
                <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">
                  {exame.valor} {exame.unidade}
                </div>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              Nenhum exame registrado ainda.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-3 px-6 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Pill className="text-rose-500" />
              <div>
                <CardTitle>Meus Medicamentos</CardTitle>
                <CardDescription>
                  Cadastre seus remedios e receba alertas no horario certo.
                </CardDescription>
              </div>
            </div>
            <Link href="/legacy/index.html">
              <Button variant="outline" className="rounded-full border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                <Plus />
                Adicionar
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-6 pb-6">
          {remedios.length > 0 ? (
            remedios.slice(0, 4).map((remedio) => (
              <div
                key={`remedio-${remedio.id}`}
                className="flex flex-col gap-3 rounded-[1.4rem] border border-slate-100 bg-slate-50/80 px-4 py-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{remedio.nome}</p>
                    {remedio.dose ? (
                      <p className="text-sm text-slate-500">{remedio.dose}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {remedio.horarios.map((horario) => (
                      <span
                        key={`${remedio.id}-${horario}`}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500"
                      >
                        {horario}
                      </span>
                    ))}
                  </div>
                </div>
                {remedio.obs ? (
                  <p className="text-sm text-slate-500">{remedio.obs}</p>
                ) : null}
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              Nenhum medicamento cadastrado ainda.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-2 px-6 pt-6">
          <div className="flex items-center gap-3">
            <FileText className="text-violet-500" />
            <CardTitle>Relatorio para o Medico</CardTitle>
          </div>
          <CardDescription>
            Gere um resumo com diario, exames e medicamentos para levar na consulta.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <Button
            type="button"
            className="h-14 w-full rounded-[1.2rem] bg-[linear-gradient(90deg,#244d7f_0%,#2953d9_100%)] text-base font-semibold text-white shadow-[0_18px_34px_rgba(41,83,217,0.22)] hover:opacity-95"
            onClick={generateReport}
          >
            <FileText />
            Gerar Relatorio PDF
          </Button>
        </CardContent>
      </Card>

      {/* ── Calculadora de IMC ── */}
      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-2 px-6 pt-6">
          <div className="flex items-center gap-3">
            <Activity className="text-emerald-500" />
            <div>
              <CardTitle>Calculadora de IMC</CardTitle>
              <CardDescription>Indice de Massa Corporal — avalie seu peso atual.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-6 pb-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Peso (kg)</label>
              <input
                type="number"
                value={imcPeso}
                onChange={(e) => setImcPeso(e.target.value)}
                placeholder="Ex: 75"
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600">Altura (cm)</label>
              <input
                type="number"
                value={imcAltura}
                onChange={(e) => setImcAltura(e.target.value)}
                placeholder="Ex: 168"
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {imcValor && imcInfo ? (
            <div className={`flex flex-col gap-2 rounded-2xl ${imcInfo.bg} px-4 py-4`}>
              <div className="flex items-center justify-between">
                <p className={`text-2xl font-black ${imcInfo.cor}`}>{imcValor.toFixed(1)}</p>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${imcInfo.cor} border-current bg-white`}>
                  {imcInfo.label}
                </span>
              </div>
              {/* Barra visual */}
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/70">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-red-500"
                  style={{ width: "100%" }}
                />
                <div
                  className="absolute top-0 h-full w-1 rounded-full bg-slate-800 shadow"
                  style={{ left: `${Math.min(Math.max(((imcValor - 15) / 25) * 100, 0), 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[0.6rem] font-medium text-slate-500">
                <span>15</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>40</span>
              </div>
              <p className="text-xs text-slate-600">{imcInfo.detalhe}</p>
            </div>
          ) : (
            <p className="rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-400 text-center">
              Preencha peso e altura para calcular seu IMC automaticamente.
            </p>
          )}
        </CardContent>
      </Card>

      {/* ── Lembretes de Água ── */}
      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-2 px-6 pt-6">
          <div className="flex items-center gap-3">
            <Droplet className="text-cyan-500" />
            <div>
              <CardTitle>Lembretes de agua</CardTitle>
              <CardDescription>Receba notificacoes no celular para nao esquecer de se hidratar.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <LembreteAgua />
        </CardContent>
      </Card>

      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-2 px-6 pt-6">
          <div className="flex items-center gap-3">
            <HeartPulse className="text-violet-500" />
            <CardTitle>Backup dos seus dados</CardTitle>
          </div>
          <CardDescription>
            Salve seus dados em um arquivo para nao perder nada ao limpar o navegador.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-6 pb-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-[1rem] border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              onClick={exportBackup}
            >
              <Download />
              Exportar backup
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 rounded-[1rem] border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
              onClick={() => importInputRef.current?.click()}
            >
              <Upload />
              Importar backup
            </Button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={importBackup}
            />
          </div>

          <Alert className="rounded-[1rem] border-amber-300 bg-amber-50 text-amber-900">
            <Droplet />
            <AlertTitle>Salve o backup antes de limpar cookies ou dados do navegador.</AlertTitle>
            <AlertDescription>
              Esse cuidado evita perda de historico, exames, diario e medicamentos.
            </AlertDescription>
          </Alert>

          <p className="text-sm text-slate-500">
            {diarioCount} registro(s) no diario, {exames.length} exame(s) e {remedios.length} medicamento(s) encontrados.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
