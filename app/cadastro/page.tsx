import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function CadastroPage() {
  return (
    <AuthShell
      title="Criar conta"
      description="Use o mesmo e-mail que voce usou na compra para liberar seu acesso completo."
      footerLabel="Ja tem conta?"
      footerHref="/login"
      footerLinkText="Entrar"
    >
      <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
        <span className="text-xl">📩</span>
        <div>
          <p className="text-sm font-bold text-amber-900">Seu acesso ja foi liberado?</p>
          <p className="mt-0.5 text-xs leading-relaxed text-amber-800">
            Use o <strong>mesmo e-mail</strong> que voce usou na compra para liberar seu acesso completo automaticamente.
          </p>
        </div>
      </div>
      <RegisterForm />
    </AuthShell>
  );
}
