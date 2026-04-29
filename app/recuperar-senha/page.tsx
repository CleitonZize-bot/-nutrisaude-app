import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function RecuperarSenhaPage() {
  return (
    <AuthShell
      title="Recuperar senha"
      description="Enviaremos um link para redefinir sua senha"
      footerLabel="Lembrou a senha?"
      footerHref="/login"
      footerLinkText="Voltar ao login"
    >
      <ResetPasswordForm />
    </AuthShell>
  );
}
