import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function CadastroPage() {
  return (
    <AuthShell
      title="Criar conta"
      description="E gratis e seus dados ficam salvos no servidor"
      footerLabel="Ja tem conta?"
      footerHref="/login"
      footerLinkText="Entrar"
    >
      <RegisterForm />
    </AuthShell>
  );
}
