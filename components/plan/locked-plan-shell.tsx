"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  Apple,
  ArrowRight,
  CalendarDays,
  CalendarRange,
  Droplets,
  LockKeyhole,
  Pill,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TodayPlan } from "@/components/plan/today-plan";
import {
  getPocketBase,
  pbDiasRestantesTrial,
  pbEstaLogado,
  pbIgnorarAssinaturaNoAmbienteAtual,
  pbLogout,
  pbObterStatusAcesso,
  pbRefresh,
  pbVerificarAssinatura,
} from "@/lib/pocketbase";

const subscribeUrl = process.env.NEXT_PUBLIC_SUBSCRIBE_URL || "#";

const TAB_PREVIEW = [
  { label: "Hoje", icon: CalendarDays, active: true },
  { label: "Semana", icon: CalendarRange },
  { label: "Progresso", icon: Activity },
  { label: "Ingredientes", icon: Apple },
  { label: "Saude", icon: Pill },
];

function PreviewCard({
  title,
  color,
}: {
  title: string;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/92 py-0 shadow-[0_18px_34px_rgba(15,23,42,0.1)]">
      <div className={`absolute inset-y-0 left-0 w-1 ${color}`} />
      <CardHeader className="px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl font-black text-slate-900">{title}</CardTitle>
            <CardDescription className="mt-1 text-slate-500">7h - 8h</CardDescription>
          </div>
          <div className="flex gap-2">
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600">
              ~344 kcal
            </div>
            <div className="rounded-full border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold text-emerald-600">
              Marcar
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 px-5 pb-5">
        <div className="rounded-[1rem] border border-red-100 bg-red-50/80 px-4 py-4">
          <div className="h-4 w-full rounded-full bg-red-100" />
        </div>
        <div className="h-5 w-40 rounded-full bg-slate-100" />
        <div className="h-10 rounded-full border border-amber-200 bg-amber-50/70" />
        <div className="h-5 w-52 rounded-full bg-slate-100" />
        <div className="h-10 rounded-full border border-amber-200 bg-amber-50/70" />
        <div className="h-5 w-32 rounded-full bg-slate-100" />
        <div className="flex gap-2">
          <div className="h-8 w-28 rounded-full bg-blue-50" />
          <div className="h-8 w-28 rounded-full bg-amber-50" />
          <div className="h-8 w-28 rounded-full bg-rose-50" />
        </div>
      </CardContent>
    </Card>
  );
}

// Executa uma promise com timeout — se demorar demais, retorna o fallback.
async function comTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  const timer = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  return Promise.race([promise, timer]);
}

export function LockedPlanShell() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "premium" | "trial" | "free">("loading");
  const [diasRestantes, setDiasRestantes] = useState(0);

  useEffect(() => {
    async function verificarAcesso() {
      if (!pbEstaLogado()) {
        router.replace("/login");
        return;
      }

      const email = String(getPocketBase().authStore.record?.email || getPocketBase().authStore.model?.email || "");
      if (!email) {
        pbLogout();
        router.replace("/login");
        return;
      }

      const temAssinatura =
        pbIgnorarAssinaturaNoAmbienteAtual() ||
        (await comTimeout(pbVerificarAssinatura(email), 6000, false));

      const acesso = pbObterStatusAcesso(temAssinatura);
      setStatus(acesso);
      if (acesso === "trial") {
        setDiasRestantes(pbDiasRestantesTrial());
      }

      pbRefresh().catch((error: unknown) => {
        const pbError = error as { status?: number };
        if (pbError?.status === 401) {
          pbLogout();
          router.replace("/login");
        }
      });
    }

    void verificarAcesso();
  }, [router]);

  if (status === "premium") {
    return <TodayPlan acesso="premium" />;
  }

  if (status === "trial") {
    return <TodayPlan acesso="trial" diasRestantes={diasRestantes} />;
  }

  if (status === "free") {
    return <TodayPlan acesso="free" />;
  }

  if (status === "loading") {
    return (
      <main className="nutri-page-bg flex min-h-screen items-center justify-center px-5 text-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-white/8">
            <Sparkles className="text-primary" />
          </div>
          <p className="nutri-title text-3xl font-black">Carregando seu acesso...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="nutri-page-bg min-h-screen px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex justify-center">
          <div className="nutri-soft-ring flex items-center gap-3 rounded-full border border-white/8 bg-white/5 px-5 py-3 backdrop-blur-sm">
            <div className="flex size-11 items-center justify-center rounded-full bg-white/8 text-xl ring-1 ring-white/10">
              <span aria-hidden="true">🥗</span>
            </div>
            <span className="nutri-title text-xl font-extrabold tracking-tight text-white">
              NutriSaude
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem]">
          <div className="space-y-5 blur-[2px]">
            <div className="nutri-dark-panel rounded-[2rem] px-5 py-6 text-white">
              <p className="nutri-title max-w-[18rem] text-4xl leading-[1.02] font-black">
                Seu cardapio personalizado
              </p>
              <p className="mt-2 text-white/70">
                Receitas, cardapios, progresso e saude em um so lugar.
              </p>
              <div className="mt-5 grid grid-cols-4 gap-2">
                <div className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 text-center">
                  <p className="text-2xl font-black text-primary">1562</p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-white/62">kcal/dia</p>
                </div>
                <div className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 text-center">
                  <p className="text-2xl font-black text-primary">98</p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-white/62">g proteina</p>
                </div>
                <div className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 text-center">
                  <p className="text-2xl font-black text-primary">176</p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-white/62">g carbo</p>
                </div>
                <div className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 text-center">
                  <p className="text-2xl font-black text-primary">52</p>
                  <p className="mt-2 text-[0.66rem] uppercase tracking-[0.18em] text-white/62">g gordura</p>
                </div>
              </div>
            </div>

            <Card className="rounded-[1.8rem] border border-amber-300 bg-amber-50/95 py-0">
              <CardContent className="px-5 py-5">
                <div className="h-6 w-72 rounded-full bg-amber-200/70" />
                <div className="mt-3 h-5 w-full rounded-full bg-amber-100" />
                <div className="mt-2 h-5 w-2/3 rounded-full bg-amber-100" />
              </CardContent>
            </Card>

            <Card className="rounded-[1.8rem] border border-blue-900/10 bg-[linear-gradient(180deg,#244d7f_0%,#204a79_100%)] py-0">
              <CardContent className="px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="size-5 text-cyan-200" />
                    <div className="h-6 w-44 rounded-full bg-white/16" />
                  </div>
                  <div className="size-8 rounded-full bg-white/10" />
                </div>
                <div className="mt-4 h-4 rounded-full bg-white/16" />
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="h-10 rounded-full bg-white/12" />
                  <div className="h-10 rounded-full bg-white/12" />
                  <div className="h-10 rounded-full bg-blue-500/70" />
                  <div className="h-10 rounded-full bg-rose-500/20" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[1.8rem] border border-slate-200/80 bg-white py-0">
              <CardContent className="px-5 py-5">
                <div className="h-5 w-44 rounded-full bg-slate-100" />
                <div className="mt-4 h-3 rounded-full bg-slate-100" />
                <div className="mt-4 flex justify-center gap-2">
                  <div className="size-2 rounded-full bg-slate-300" />
                  <div className="size-2 rounded-full bg-slate-200" />
                  <div className="size-2 rounded-full bg-slate-200" />
                  <div className="size-2 rounded-full bg-slate-200" />
                  <div className="size-2 rounded-full bg-slate-200" />
                  <div className="size-2 rounded-full bg-slate-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[1.8rem] border border-slate-200/80 bg-white py-0">
              <CardContent className="grid grid-cols-5 gap-2 px-3 py-3">
                {TAB_PREVIEW.map((tab) => {
                  const Icon = tab.icon;

                  return (
                    <div
                      key={tab.label}
                      className={
                        tab.active
                          ? "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1rem] bg-slate-800 px-2 py-2 text-[0.72rem] text-white"
                          : "flex min-h-14 flex-col items-center justify-center gap-1 rounded-[1rem] bg-slate-50 px-2 py-2 text-[0.72rem] text-slate-500"
                      }
                    >
                      <Icon className="size-4" />
                      {tab.label}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="rounded-[1.8rem] border border-slate-200/80 bg-white py-0">
              <CardContent className="px-5 py-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-[1.2rem] bg-slate-50 p-4">
                    <div className="h-8 w-16 rounded-full bg-slate-200" />
                    <div className="mt-3 h-4 rounded-full bg-slate-100" />
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 p-4">
                    <div className="h-8 w-16 rounded-full bg-slate-200" />
                    <div className="mt-3 h-4 rounded-full bg-slate-100" />
                  </div>
                  <div className="rounded-[1.2rem] bg-slate-50 p-4">
                    <div className="h-8 w-16 rounded-full bg-slate-200" />
                    <div className="mt-3 h-4 rounded-full bg-slate-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <PreviewCard title="Cafe da Manha" color="bg-amber-400" />
            <PreviewCard title="Almoco" color="bg-emerald-400" />
            <PreviewCard title="Jantar" color="bg-blue-400" />
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(7,16,22,0.18)_0%,rgba(7,16,22,0.72)_38%,rgba(7,16,22,0.86)_100%)] px-5">
            <Card className="nutri-surface w-full max-w-xl rounded-[2rem] border border-white/10 py-0 text-center">
              <CardHeader className="items-center gap-4 px-6 pt-7">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <LockKeyhole className="size-8" />
                </div>
                <CardTitle className="nutri-title text-4xl font-black text-slate-900">
                  Assine o NutriSaude para ter acesso completo
                </CardTitle>
                <CardDescription className="max-w-md text-base leading-7 text-slate-500">
                  Seu perfil e seus dados ja foram salvos. Para liberar cardapios, receitas, progresso e todas as funcoes do app, ative sua assinatura.
                </CardDescription>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 px-6 pb-7">
                <a href={subscribeUrl} target="_blank" rel="noreferrer">
                  <Button className="h-14 w-full rounded-[1.2rem] text-base font-bold shadow-[0_18px_34px_rgba(0,196,114,0.22)]">
                    Assinar o NutriSaude
                    <ArrowRight />
                  </Button>
                </a>

                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-[1rem]"
                  onClick={() => {
                    pbLogout();
                    router.push("/login");
                  }}
                >
                  Sair da conta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
