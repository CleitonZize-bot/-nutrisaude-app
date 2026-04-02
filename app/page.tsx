import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="nutri-page-bg relative min-h-screen overflow-hidden text-white">
      <div className="absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 -z-10 size-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(180deg,transparent_0%,rgba(0,196,114,0.08)_100%)]" />

      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-5 py-10 sm:px-6">
        <section className="flex w-full max-w-[38rem] flex-col items-center gap-8 text-center sm:gap-10">
          <div className="flex w-full items-center justify-center">
            <div className="nutri-soft-ring flex items-center gap-3 rounded-full border border-white/8 bg-white/5 px-5 py-3 backdrop-blur-sm">
              <div className="flex size-11 items-center justify-center rounded-full bg-white/8 text-xl ring-1 ring-white/10">
                <span aria-hidden="true">🥗</span>
              </div>
              <span className="nutri-title text-xl font-extrabold tracking-tight text-white">
                NutriSaude
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="nutri-title text-5xl font-black leading-[0.92] text-white sm:text-6xl">
              Seu cardapio
              <br />
              <span className="bg-gradient-to-r from-primary via-[#2ce98a] to-[#4ade80] bg-clip-text text-transparent">
                personalizado
              </span>
              <br />
              para sua saude
            </h1>

            <p className="mx-auto max-w-[30rem] text-lg leading-8 text-white/60">
              Calculado para o seu corpo. Adaptado a sua condicao.
              <br />
              Diferente todo dia.
            </p>
          </div>

          <Link href="/cadastro" className="w-full sm:max-w-[32rem]">
            <Button
              size="lg"
              className="h-auto w-full rounded-3xl bg-primary px-8 py-7 text-xl font-extrabold text-primary-foreground shadow-[0_14px_40px_rgba(0,196,114,0.28)] hover:bg-[#00d97e]"
            >
              Criar meu plano
              <span className="ml-2 flex size-10 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/12">
                <ArrowRight />
              </span>
            </Button>
          </Link>

          <Link
            href="/login"
            className="relative rounded-2xl px-6 py-4 text-base font-semibold text-white/80 transition-colors hover:bg-white/6 hover:text-white"
          >
            Ja tenho uma conta
            <span className="absolute inset-x-6 bottom-2 h-0.5 rounded-full bg-primary/95 shadow-[0_0_14px_rgba(0,196,114,0.55)]" />
          </Link>
        </section>
      </div>
    </main>
  );
}
