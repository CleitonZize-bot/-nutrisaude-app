import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Entrar na conta"
      description="Seus dados ficam salvos no servidor"
      footerLabel="Nao tem conta?"
      footerHref="/cadastro"
      footerLinkText="Criar conta gratis"
    >
      <LoginForm />
    </AuthShell>
  );
}
