"use client";

import { Activity, LineChart } from "lucide-react";

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
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
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
      tone: "secondary" as const,
    };
  }

  if (diff < 0) {
    return {
      texto: `Perdeu ${Math.abs(diff).toFixed(1)}kg na ultima semana`,
      destaque: `${diff.toFixed(1)}kg`,
      tone: "default" as const,
    };
  }

  return {
    texto: `Ganhou ${diff.toFixed(1)}kg na ultima semana`,
    destaque: `+${diff.toFixed(1)}kg`,
    tone: "destructive" as const,
  };
}

function formatShortDate(value: string) {
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
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

  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col gap-6">
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <Card className="nutri-surface rounded-[2rem] border border-slate-200/80 py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle>Peso atual</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="nutri-title text-3xl font-black text-slate-900">{pesoAtual}kg</p>
            </CardContent>
          </Card>

          <Card className="nutri-surface rounded-[2rem] border border-slate-200/80 py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle>Tendencia</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 px-6 pb-6">
              {trend ? (
                <>
                  <Badge variant={trend.tone}>{trend.destaque}</Badge>
                  <p className="text-sm text-slate-500">{trend.texto}</p>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  Registre mais de um peso para acompanhar a tendencia.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="nutri-surface rounded-[2rem] border border-slate-200/80 py-0">
            <CardHeader className="px-6 pt-6">
              <CardTitle>Registros</CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <p className="nutri-title text-3xl font-black text-slate-900">{weightHistory.length}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
          <CardHeader className="gap-2 px-6 pt-6">
            <div className="flex items-center gap-3">
              <LineChart data-icon="inline-start" className="text-primary" />
              <CardTitle>Registrar peso</CardTitle>
            </div>
            <CardDescription>Salve o peso de hoje para acompanhar sua evolucao.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 px-6 pb-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="peso-atual">Peso de hoje</FieldLabel>
                <FieldContent>
                  <Input
                    id="peso-atual"
                    type="number"
                    placeholder={String(pesoAtual)}
                    value={weightInput}
                    onChange={(event) => onWeightInputChange(event.target.value)}
                    className="h-12 rounded-2xl bg-white"
                  />
                </FieldContent>
              </Field>
            </FieldGroup>

            <Button type="button" className="rounded-2xl" onClick={onSaveWeight}>
              Salvar peso
            </Button>

            {feedback ? <p className="text-sm text-slate-500">{feedback}</p> : null}
          </CardContent>
        </Card>
      </div>

      <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
        <CardHeader className="gap-2 px-6 pt-6">
          <div className="flex items-center gap-3">
            <Activity data-icon="inline-start" className="text-primary" />
            <CardTitle>Historico de peso</CardTitle>
          </div>
          <CardDescription>
            {weightHistory.length > 0
              ? "Seus ultimos registros salvos no app."
              : "Ainda nao ha registros extras alem do perfil."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 px-6 pb-6">
          {weightHistory.length > 0 ? (
            weightHistory
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
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
                  >
                    <div>
                      <p className="font-bold text-slate-800">{entry.peso}kg</p>
                      <p className="text-sm text-slate-500">{formatShortDate(entry.data)}</p>
                    </div>
                    <Badge
                      variant={
                        variacao === null
                          ? "secondary"
                          : variacao <= 0
                            ? "default"
                            : "destructive"
                      }
                    >
                      {variacao === null ? "inicio" : `${variacao > 0 ? "+" : ""}${variacao}kg`}
                    </Badge>
                  </div>
                );
              })
          ) : (
            <div className="flex min-h-72 items-center justify-center rounded-[1.5rem] bg-slate-50 text-center">
              <div className="flex max-w-xs flex-col gap-2">
                <p className="text-base font-medium text-slate-500">Nenhum registro ainda.</p>
                <p className="text-sm text-slate-400">Registre seu peso abaixo!</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
