"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  Apple,
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  Check,
  Droplets,
  Lightbulb,
  LockKeyhole,
  RefreshCw,
  Scale,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  getPocketBase,
  pbEstaLogado,
  pbIgnorarAssinaturaNoAmbienteAtual,
  pbObterStatusAcesso,
  pbVerificarAssinatura,
} from "@/lib/pocketbase";

const SUBSCRIBE_URL = process.env.NEXT_PUBLIC_SUBSCRIBE_URL || "#";

const BENEFICIOS = [
  {
    icon: CalendarRange,
    cor: "text-emerald-600",
    fundo: "bg-emerald-50",
    titulo: "Semana completa personalizada",
    descricao: "7 dias de cardápio adaptado ao seu perfil e condições de saúde.",
  },
  {
    icon: UtensilsCrossed,
    cor: "text-amber-600",
    fundo: "bg-amber-50",
    titulo: "Receitas inteligentes",
    descricao: "Alertas e adaptações específicas para esteatose, diabetes, hipertensão e muito mais.",
  },
  {
    icon: Activity,
    cor: "text-blue-600",
    fundo: "bg-blue-50",
    titulo: "Progresso e métricas",
    descricao: "Acompanhe peso, IMC e evolução ao longo do tempo.",
  },
  {
    icon: Apple,
    cor: "text-rose-600",
    fundo: "bg-rose-50",
    titulo: "Lista de ingredientes",
    descricao: "Lista de compras gerada automaticamente do seu cardápio semanal.",
  },
  {
    icon: Scale,
    cor: "text-violet-600",
    fundo: "bg-violet-50",
    titulo: "Calculadora de IMC",
    descricao: "Calcule seu IMC com faixa visual e orientações personalizadas.",
  },
  {
    icon: Droplets,
    cor: "text-cyan-600",
    fundo: "bg-cyan-50",
    titulo: "Lembretes de hidratação",
    descricao: "Notificações automáticas para beber água no intervalo que você escolher.",
  },
  {
    icon: Lightbulb,
    cor: "text-orange-600",
    fundo: "bg-orange-50",
    titulo: "Dica do dia personalizada",
    descricao: "Mensagem motivacional baseada na sua condição de saúde, toda manhã.",
  },
  {
    icon: Sparkles,
    cor: "text-pink-600",
    fundo: "bg-pink-50",
    titulo: "Sem anúncios ou popups",
    descricao: "Experiência limpa, focada na sua saúde — sem interrupções.",
  },
];

export default function AssinarPage() {
  const router = useRouter();
  const [verificando, setVerificando] = useState(false);
  const [jaAssinante, setJaAssinante] = useState(false);

  useEffect(() => {
    // Se já for premium, redireciona direto
    if (!pbEstaLogado()) return;
    async function checar() {
      const email = String(
        getPocketBase().authStore.record?.email ||
        getPocketBase().authStore.model?.email || ""
      );
      if (!email) return;
      const temAssinatura =
        pbIgnorarAssinaturaNoAmbienteAtual() ||
        (await pbVerificarAssinatura(email).catch(() => false));
      const acesso = pbObterStatusAcesso(temAssinatura);
      if (acesso === "premium") {
        router.replace("/plano");
      }
    }
    void checar();
  }, [router]);

  async function verificarAssinatura() {
    if (!pbEstaLogado()) {
      router.push("/login");
      return;
    }
    setVerificando(true);
    try {
      const email = String(
        getPocketBase().authStore.record?.email ||
        getPocketBase().authStore.model?.email || ""
      );
      const temAssinatura = await pbVerificarAssinatura(email).catch(() => false);
      if (temAssinatura || pbIgnorarAssinaturaNoAmbienteAtual()) {
        router.replace("/plano");
      } else {
        setJaAssinante(true);
        setTimeout(() => setJaAssinante(false), 4000);
      }
    } finally {
      setVerificando(false);
    }
  }

  return (
    <main className="nutri-page-bg relative min-h-screen overflow-x-hidden text-white">
      {/* Glows decorativos */}
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 size-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 -z-10 size-80 rounded-full bg-primary/8 blur-3xl" />

      <div className="mx-auto flex max-w-lg flex-col gap-6 px-5 py-8 pb-12">

        {/* Header com voltar */}
        <div className="flex items-center gap-3">
          <Link href="/plano">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/70 hover:bg-white/12"
            >
              <ArrowLeft className="size-4" />
            </button>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/8 text-lg ring-1 ring-white/10">
              🥗
            </div>
            <span className="nutri-title text-lg font-extrabold text-white">NutriSaude</span>
          </div>
        </div>

        {/* Headline */}
        <div className="flex flex-col gap-3 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
            <LockKeyhole className="size-8" />
          </div>
          <h1 className="nutri-title text-4xl font-black leading-tight text-white">
            Desbloqueie tudo
            <br />
            <span className="bg-gradient-to-r from-primary via-[#2ce98a] to-[#4ade80] bg-clip-text text-transparent">
              por um valor acessível
            </span>
          </h1>
          <p className="text-base leading-relaxed text-white/60">
            Cardápios completos, receitas inteligentes e acompanhamento de saúde
            — tudo personalizado para você.
          </p>
        </div>

        {/* Card de preço */}
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-gradient-to-br from-white/8 to-primary/8 p-6 shadow-[0_0_40px_rgba(0,196,114,0.15)]">
          {/* Badge popular */}
          <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
            <Star className="size-3 fill-primary" />
            Mais popular
          </div>

          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Plano Premium
          </p>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-lg font-bold text-white/60">R$</span>
            <span className="nutri-title text-6xl font-black text-white">19</span>
            <div className="mb-2 flex flex-col leading-tight text-white/60">
              <span className="text-lg font-bold">,90</span>
              <span className="text-xs">/mês</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-white/50">
            Acesso completo · Cancele quando quiser
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            {[
              "Cardápio 5 refeições/dia",
              "Receitas com alertas por doença",
              "Semana completa personalizada",
              "Progresso e IMC",
              "Sem anúncios ou popups",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Check className="size-3 text-primary" />
                </div>
                <span className="text-sm font-medium text-white/80">{item}</span>
              </div>
            ))}
          </div>

          <a
            href={SUBSCRIBE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block"
          >
            <Button className="h-14 w-full rounded-[1.2rem] text-base font-bold shadow-[0_12px_30px_rgba(0,196,114,0.3)]">
              Assinar agora
              <ArrowRight className="ml-1" />
            </Button>
          </a>
        </div>

        {/* Lista de benefícios */}
        <div className="flex flex-col gap-3">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-white/40">
            O que está incluído
          </p>
          {BENEFICIOS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.titulo}
                className="flex items-start gap-4 rounded-2xl border border-white/6 bg-white/4 px-4 py-4"
              >
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${b.fundo}`}>
                  <Icon className={`size-5 ${b.cor}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{b.titulo}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/55">{b.descricao}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Já assinei */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-white/50">
            Já realizou o pagamento?
          </p>
          <button
            type="button"
            onClick={verificarAssinatura}
            disabled={verificando}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${verificando ? "animate-spin" : ""}`} />
            {verificando ? "Verificando..." : "Já sou assinante — verificar acesso"}
          </button>

          {jaAssinante && (
            <div className="rounded-2xl border border-amber-300/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              Assinatura não encontrada ainda. Aguarde alguns minutos após o pagamento e tente novamente.
            </div>
          )}
        </div>

        {/* Voltar */}
        <div className="text-center">
          <Link
            href="/plano"
            className="text-sm text-white/40 underline underline-offset-4 hover:text-white/60"
          >
            Voltar ao plano gratuito
          </Link>
        </div>

      </div>
    </main>
  );
}
