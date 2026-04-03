"use client";

import { Minus, Scale, TrendingDown, TrendingUp } from "lucide-react";

import { Input } from "@/components/ui/input";
import type { NutrisaudeProfile } from "@/lib/pocketbase";

function calcularTendencia(historico: Array<{ data: string; peso: number }>) {
  if (historico.length < 2) return null;

  const recentes = historico.slice(-7);
  if (recentes.length < 2) return null;

  const primeiro = recentes[0].peso;
  const ultimo = recentes[recentes.length - 1].peso;
  const diff = Number((ultimo - primeiro).toFixed(1));

  if (Math.abs(diff) < 0.2) {
    return {
      texto: "Peso estavel na ultima semana",
      destaque: "0kg",
      tipo: "estavel" as const,
    };
  }

  if (diff < 0) {
    return {
      texto: `Perdeu ${Math.abs(diff).toFixed(1)}kg na ultima semana`,
      destaque: `${diff.toFixed(1)}kg`,
      tipo: "baixa" as const,
    };
  }

  return {
    texto: `Ganhou ${diff.toFixed(1)}kg na ultima semana`,
    destaque: `+${diff.toFixed(1)}kg`,
    tipo: "alta" as const,
  };
}

function formatShortDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatChartDate(value: string) {
  const [, month, day] = value.split("-");
  return `${day}/${month}`;
}

function calcularMeta(profile: NutrisaudeProfile): number | null {
  const objetivo = (profile.objetivo || "").toLowerCase();
  if (objetivo === "emagrecer") return profile.peso - 5;
  if (objetivo === "massa") return profile.peso + 5;
  if (objetivo === "manter") return profile.peso;
  return null;
}

type WeightChartProps = {
  data: Array<{ data: string; peso: number }>;
  goalWeight: number | null;
};

function WeightChart({ data, goalWeight }: WeightChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-slate-100 bg-white">
        <p className="text-sm text-slate-400">Nenhum dado ainda</p>
      </div>
    );
  }

  const entries = data.slice(-30);
  const weights = entries.map((e) => e.peso);

  let allValues = [...weights];
  if (goalWeight !== null) allValues.push(goalWeight);

  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const range = dataMax - dataMin;
  const yMin = dataMin - Math.max(range * 0.15, 0.5);
  const yMax = dataMax + Math.max(range * 0.15, 0.5);
  const yRange = yMax - yMin;

  const padding = { top: 20, right: 16, bottom: 32, left: 44 };
  const viewBoxW = 600;
  const viewBoxH = 240;
  const chartW = viewBoxW - padding.left - padding.right;
  const chartH = viewBoxH - padding.top - padding.bottom;

  function xPos(i: number) {
    if (entries.length === 1) return padding.left + chartW / 2;
    return padding.left + (i / (entries.length - 1)) * chartW;
  }

  function yPos(peso: number) {
    return padding.top + chartH - ((peso - yMin) / yRange) * chartH;
  }

  const points = entries.map((e, i) => ({ x: xPos(i), y: yPos(e.peso) }));
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLines = 4;
  const gridValues: number[] = [];
  for (let i = 0; i <= gridLines; i++) {
    gridValues.push(yMin + (yRange * i) / gridLines);
  }

  const labelStep = Math.max(1, Math.floor(entries.length / 6));

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-2">
      <svg
        viewBox={`0 0 ${viewBoxW} ${viewBoxH}`}
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {gridValues.map((val) => {
          const y = yPos(val);
          return (
            <g key={`grid-${val}`}>
              <line
                x1={padding.left}
                y1={y}
                x2={viewBoxW - padding.right}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
              <text
                x={padding.left - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-slate-400"
                fontSize="10"
              >
                {val.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Y axis min/max labels */}
        <text
          x={padding.left - 6}
          y={yPos(dataMin) + 3}
          textAnchor="end"
          className="fill-slate-600"
          fontSize="10"
          fontWeight="600"
        >
          {dataMin.toFixed(1)}
        </text>
        <text
          x={padding.left - 6}
          y={yPos(dataMax) + 3}
          textAnchor="end"
          className="fill-slate-600"
          fontSize="10"
          fontWeight="600"
        >
          {dataMax.toFixed(1)}
        </text>

        {/* Goal line */}
        {goalWeight !== null && (
          <g>
            <line
              x1={padding.left}
              y1={yPos(goalWeight)}
              x2={viewBoxW - padding.right}
              y2={yPos(goalWeight)}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="6 4"
            />
            <text
              x={viewBoxW - padding.right + 2}
              y={yPos(goalWeight) + 3}
              className="fill-amber-500"
              fontSize="9"
              fontWeight="600"
            >
              Meta
            </text>
          </g>
        )}

        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Area fill */}
        <polygon
          points={`${points[0].x},${padding.top + chartH} ${polyline} ${points[points.length - 1].x},${padding.top + chartH}`}
          fill="url(#areaGradient)"
        />
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dots */}
        {points.map((p, i) => (
          <circle
            key={`dot-${entries[i].data}`}
            cx={p.x}
            cy={p.y}
            r="3.5"
            fill="#10b981"
            stroke="white"
            strokeWidth="2"
          />
        ))}

        {/* X axis labels */}
        {entries.map((e, i) => {
          if (entries.length > 1 && i % labelStep !== 0 && i !== entries.length - 1)
            return null;
          return (
            <text
              key={`xlabel-${e.data}`}
              x={xPos(i)}
              y={viewBoxH - 4}
              textAnchor="middle"
              className="fill-slate-400"
              fontSize="9"
            >
              {formatChartDate(e.data)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

type PlanProgressViewProps = {
  profile: NutrisaudeProfile;
  weightHistory: Array<{ data: string; peso: number }>;
  weightInput: string;
  feedback: string;
  onWeightInputChange: (value: string) => void;
  onSaveWeight: () => void;
};

export function PlanProgressView({
  profile,
  weightHistory,
  weightInput,
  feedback,
  onWeightInputChange,
  onSaveWeight,
}: PlanProgressViewProps) {
  const trend = calcularTendencia(weightHistory);
  const pesoAtual =
    weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].peso : profile.peso;
  const goalWeight = calcularMeta(profile);

  const TrendIcon =
    trend?.tipo === "baixa"
      ? TrendingDown
      : trend?.tipo === "alta"
        ? TrendingUp
        : Minus;

  return (
    <div className="flex flex-col gap-4">
      {/* Chart */}
      <WeightChart data={weightHistory} goalWeight={goalWeight} />

      {/* Stats cards row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100 bg-white px-3 py-3">
          <Scale className="h-4 w-4 text-emerald-500" />
          <p className="text-lg font-bold text-slate-900">{pesoAtual}kg</p>
          <p className="text-xs text-slate-400">Peso atual</p>
        </div>

        <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100 bg-white px-3 py-3">
          <TrendIcon
            className={`h-4 w-4 ${
              trend?.tipo === "baixa"
                ? "text-emerald-500"
                : trend?.tipo === "alta"
                  ? "text-red-500"
                  : "text-slate-400"
            }`}
          />
          <p
            className={`text-sm font-bold ${
              trend?.tipo === "baixa"
                ? "text-emerald-600"
                : trend?.tipo === "alta"
                  ? "text-red-600"
                  : "text-slate-600"
            }`}
          >
            {trend ? trend.destaque : "--"}
          </p>
          <p className="text-center text-xs text-slate-400">
            {trend ? trend.texto : "Sem dados"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100 bg-white px-3 py-3">
          <span className="text-xs font-semibold text-slate-300">#</span>
          <p className="text-lg font-bold text-slate-900">{weightHistory.length}</p>
          <p className="text-xs text-slate-400">Registros</p>
        </div>
      </div>

      {/* Weight input form */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <p className="mb-2 text-sm font-semibold text-slate-700">Registrar peso</p>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={String(pesoAtual)}
            value={weightInput}
            onChange={(event) => onWeightInputChange(event.target.value)}
            className="h-10 flex-1 rounded-xl bg-slate-50 text-sm"
          />
          <button
            type="button"
            onClick={onSaveWeight}
            className="h-10 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 active:bg-emerald-700"
          >
            Salvar
          </button>
        </div>
        {feedback ? (
          <p className="mt-2 text-xs text-slate-500">{feedback}</p>
        ) : null}
      </div>

      {/* History list */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <p className="mb-2 text-sm font-semibold text-slate-700">Historico de peso</p>
        {weightHistory.length > 0 ? (
          <div className="flex max-h-[300px] flex-col gap-2 overflow-y-auto">
            {weightHistory
              .slice()
              .reverse()
              .map((entry, index, array) => {
                const anterior = array[index + 1];
                const variacao = anterior
                  ? Number((entry.peso - anterior.peso).toFixed(1))
                  : null;

                return (
                  <div
                    key={`peso-${entry.data}`}
                    className="flex items-center justify-between rounded-xl border border-slate-50 bg-slate-50 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {entry.peso}kg
                      </p>
                      <p className="text-xs text-slate-400">
                        {formatShortDate(entry.data)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                        variacao === null
                          ? "bg-slate-100 text-slate-500"
                          : variacao <= 0
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      {variacao === null
                        ? "inicio"
                        : `${variacao > 0 ? "+" : ""}${variacao}kg`}
                    </span>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="flex h-20 items-center justify-center rounded-xl bg-slate-50">
            <p className="text-xs text-slate-400">Nenhum registro ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
