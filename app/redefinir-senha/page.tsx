import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { ConfirmResetForm } from "@/components/auth/confirm-reset-form";

export default function RedefinirSenhaPage() {
  return (
    <AuthShell
      title="Redefinir senha"
      description="Digite sua nova senha abaixo"
      footerLabel="Lembrou a senha?"
      footerHref="/login"
      footerLinkText="Voltar ao login"
    >
      <Suspense fallback={<div className="text-center text-slate-500">Carregando...</div>}>
        <ConfirmResetForm />
      </Suspense>
    </AuthShell>
  );
}
