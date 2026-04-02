"use client";

import { useState } from "react";
import { ChevronDown, ShoppingBasket } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { REFEICOES_MODELO, montarRefeicaoDoDia } from "@/lib/alimentos-data";

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

function gerarPlanoSemanal(): WeeklyDay[] {
  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
  const plano: WeeklyDay[] = [];

  for (let offset = 0; offset < 7; offset += 1) {
    const data = new Date();
    data.setDate(data.getDate() + offset);

    const nomeDia =
      offset === 0 ? "Hoje" : offset === 1 ? "Amanha" : diasSemana[data.getDay()];
    const dataLabel = `${data.getDate()} ${meses[data.getMonth()]}`;

    const refeicoes = Object.entries(REFEICOES_MODELO).map(([chave, modelo]) => ({
      chave,
      nome: modelo.nome,
      icone: modelo.icone,
      itens: montarRefeicaoDoDia(chave, offset) as MealItem[],
    }));

    plano.push({ offset, nomeDia, dataLabel, refeicoes });
  }

  return plano;
}

function gerarListaCompras(plano: WeeklyDay[]) {
  const frequencia: Record<string, number> = {};

  plano.forEach((dia) => {
    dia.refeicoes.forEach((refeicao) => {
      refeicao.itens.forEach((item) => {
        frequencia[item.nome] = (frequencia[item.nome] || 0) + 1;
      });
    });
  });

  return Object.entries(frequencia)
    .map(([nome, vezes]) => ({ nome, vezes }))
    .sort((a, b) => b.vezes - a.vezes || a.nome.localeCompare(b.nome))
    .slice(0, 24);
}

export function PlanWeekView() {
  const weeklyPlan = gerarPlanoSemanal();
  const shoppingList = gerarListaCompras(weeklyPlan);
  const [openDay, setOpenDay] = useState(0);
  const [showShopping, setShowShopping] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      {weeklyPlan.map((dia) => {
        const aberto = openDay === dia.offset;

        return (
          <Card
            key={`dia-${dia.offset}`}
            className={`overflow-hidden rounded-[1.9rem] border py-0 shadow-[0_18px_34px_rgba(148,163,184,0.14)] ${
              dia.offset === 0
                ? "border-emerald-300 bg-emerald-50/70"
                : "border-slate-200/80 bg-white"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              onClick={() => setOpenDay(aberto ? -1 : dia.offset)}
            >
              <div>
                <p className="nutri-title text-[1.2rem] font-bold text-slate-900">{dia.nomeDia}</p>
                <p className="text-sm text-slate-500">{dia.dataLabel}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-3 text-xl text-slate-500 sm:flex">
                  {dia.refeicoes.map((refeicao) => (
                    <span key={`${dia.offset}-${refeicao.chave}`}>{refeicao.icone}</span>
                  ))}
                </div>
                <ChevronDown className={`text-slate-400 transition-transform ${aberto ? "rotate-180" : ""}`} />
              </div>
            </button>

            {aberto ? (
              <CardContent className="border-t border-slate-100 px-5 pb-5 pt-4">
                <div className="flex flex-col gap-5">
                  {dia.refeicoes.map((refeicao) => (
                    <div key={`${dia.offset}-${refeicao.chave}`} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[1rem] font-semibold text-slate-900">
                        <span>{refeicao.icone}</span>
                        <span>{refeicao.nome}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {refeicao.itens.map((item) => (
                          <div
                            key={`${dia.offset}-${refeicao.chave}-${item.nome}`}
                            className="flex items-start justify-between gap-4 border-b border-slate-100 pb-2 text-sm last:border-b-0"
                          >
                            <span className="text-slate-700">{item.nome}</span>
                            <span className="font-medium text-emerald-600">{item.quantidade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            ) : null}
          </Card>
        );
      })}

      <Button
        type="button"
        className="h-14 rounded-[1.2rem] bg-orange-500 text-base font-bold text-white shadow-[0_18px_36px_rgba(249,115,22,0.24)] hover:bg-orange-500/92"
        onClick={() => setShowShopping((current) => !current)}
      >
        <ShoppingBasket data-icon="inline-start" />
        Gerar lista de compras da semana
      </Button>

      {showShopping ? (
        <Card className="nutri-surface rounded-[1.9rem] border border-slate-200/80 py-0">
          <CardHeader className="gap-2 px-6 pt-6">
            <CardTitle className="nutri-title text-2xl text-slate-900">
              Lista de compras
            </CardTitle>
            <CardDescription>Itens mais usados ao longo dos 7 dias.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 px-6 pb-6 md:grid-cols-2">
            {shoppingList.map((item) => (
              <div
                key={`compra-${item.nome}`}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <span className="font-medium text-slate-800">{item.nome}</span>
                <span className="text-sm font-semibold text-emerald-600">{item.vezes}x</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
