import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AuthShellProps = {
  title: string;
  description: string;
  footerLabel: string;
  footerHref: string;
  footerLinkText: string;
  children: React.ReactNode;
};

export function AuthShell({
  title,
  description,
  footerLabel,
  footerHref,
  footerLinkText,
  children,
}: AuthShellProps) {
  return (
    <main className="nutri-page-bg relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-y-0 left-0 -z-10 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(0,196,114,0.18),transparent_55%)] lg:block" />
      <div className="absolute -left-20 top-20 -z-10 size-72 rounded-full bg-primary/12 blur-3xl" />
      <div className="absolute -bottom-20 right-0 -z-10 size-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <section className="hidden flex-col gap-6 lg:flex">
          <div className="nutri-soft-ring inline-flex w-fit items-center gap-3 rounded-full border border-white/8 bg-white/5 px-5 py-3 backdrop-blur-sm">
            <div className="flex size-11 items-center justify-center rounded-full bg-white/8 text-xl ring-1 ring-white/10">
              <span aria-hidden="true">🥗</span>
            </div>
            <span className="nutri-title text-xl font-extrabold tracking-tight text-white">
              NutriSaude
            </span>
          </div>

          <div className="flex max-w-xl flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/90">
              Plano alimentar com foco em saude
            </p>
            <h1 className="nutri-title text-5xl font-black leading-[0.94] text-white">
              Entre na sua conta
              <br />
              ou continue a
              <span className="text-primary"> criacao </span>
              do seu plano.
            </h1>
            <p className="max-w-lg text-lg leading-8 text-white/62">
              Mesma logica do app atual, agora em uma base pronta para componentes reais e uma interface mais refinada.
            </p>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-md items-center justify-center lg:justify-end">
          <Card className="nutri-surface w-full rounded-[2rem] border border-white/10 py-0 text-card-foreground ring-1 ring-black/5">
            <CardHeader className="gap-4 px-7 pt-7">
              <div className="mx-auto flex items-center gap-3 pb-2 lg:hidden">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/15 text-xl ring-1 ring-primary/20">
                  <span aria-hidden="true">🥗</span>
                </div>
                <span className="nutri-title text-2xl font-extrabold tracking-tight text-foreground">
                  NutriSaude
                </span>
              </div>

              <div className="space-y-2 text-center lg:text-left">
                <CardTitle className="nutri-title text-3xl font-black text-slate-900">
                  {title}
                </CardTitle>
                <CardDescription className="text-base leading-7 text-slate-500">
                  {description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="px-7">{children}</CardContent>

            <CardFooter className="justify-center border-0 bg-transparent px-7 pb-7 pt-3 text-sm text-muted-foreground">
              {footerLabel}
              <Link
                href={footerHref}
                className="ml-1 font-semibold text-primary underline-offset-4 hover:underline"
              >
                {footerLinkText}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
