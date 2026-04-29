"use client";

import { useEffect, useState } from "react";
import { DollarSign, Sparkles } from "lucide-react";

import { getModoEconomico, setModoEconomico } from "@/lib/preferences";

/**
 * Toggle do Modo Econômico — quando ativado, troca ingredientes
 * caros por equivalentes baratos em todas as receitas.
 */
export function ModoEconomicoToggle() {
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    setAtivo(getModoEconomico());
  }, []);

  function alternar() {
    const novo = !ativo;
    setAtivo(novo);
    setModoEconomico(novo);
  }

  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl border px-4 py-4 transition-colors ${
        ativo
          ? "border-amber-300 bg-amber-50/60"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex size-10 items-center justify-center rounded-xl ${
              ativo ? "bg-amber-100" : "bg-slate-100"
            }`}
          >
            <DollarSign
              className={`size-5 ${ativo ? "text-amber-600" : "text-slate-400"}`}
            />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Modo Econômico</p>
            <p className="text-xs text-slate-500">
              {ativo
                ? "Trocando ingredientes caros por baratos"
                : "Use ingredientes acessíveis"}
            </p>
          </div>
        </div>

        {/* Switch */}
        <button
          type="button"
          onClick={alternar}
          aria-label="Alternar modo econômico"
          aria-pressed={ativo}
          className={`relative h-7 w-12 flex-shrink-0 rounded-full transition-colors ${
            ativo ? "bg-amber-500" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform ${
              ativo ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>

      {/* Texto explicativo / exemplos */}
      {ativo ? (
        <div className="flex flex-col gap-1.5 rounded-xl bg-white/70 px-3 py-2.5 text-xs text-slate-600">
          <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-amber-700">
            <Sparkles size={12} />
            <span>Substituições ativas em todas as receitas:</span>
          </div>
          <div className="grid gap-1 sm:grid-cols-2">
            <p>🐟 Salmão → Sardinha fresca</p>
            <p>🌾 Quinoa → Arroz integral</p>
            <p>🥜 Amêndoas → Amendoim</p>
            <p>🌱 Chia → Linhaça</p>
            <p>🥛 Iogurte grego → Iogurte coado</p>
            <p>🧀 Cottage → Ricota</p>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            E mais 30+ trocas inteligentes — combina com sua condição de saúde.
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          Ative para trocar ingredientes premium (salmão, quinoa, amêndoas...)
          por opções igualmente nutritivas e mais baratas — em todas as
          receitas, automaticamente.
        </p>
      )}
    </div>
  );
}
