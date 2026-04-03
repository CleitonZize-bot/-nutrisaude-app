"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  pbLogin,
  pbRegistrar,
  sincronizarParaLocal,
} from "@/lib/pocketbase";

export function RegisterForm() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!nome.trim() || !email.trim() || !emailConfirm.trim() || !senha || !senhaConfirm) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (email.trim().toLowerCase() !== emailConfirm.trim().toLowerCase()) {
      setErro("Os e-mails nao coincidem. Verifique e tente novamente.");
      return;
    }

    if (senha.length < 8) {
      setErro("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (senha !== senhaConfirm) {
      setErro("As senhas nao coincidem. Verifique e tente novamente.");
      return;
    }

    setCarregando(true);

    try {
      await pbRegistrar(email.trim(), senha, nome.trim());
      await pbLogin(email.trim(), senha);
      await sincronizarParaLocal();
      router.push("/onboarding");
    } catch (error: unknown) {
      const pocketbaseError = error as {
        response?: { data?: { email?: unknown } };
      };

      if (pocketbaseError.response?.data?.email) {
        setErro("Este e-mail ja esta em uso.");
      } else {
        setErro("Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {erro ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Nao foi possivel criar sua conta</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Seu nome</FieldLabel>
          <FieldContent>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Como quer ser chamado?"
              autoComplete="name"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className="h-12 rounded-xl bg-white"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <FieldContent>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-12 rounded-xl bg-white"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="email-confirm">Confirme o e-mail</FieldLabel>
          <FieldContent>
            <Input
              id="email-confirm"
              name="email-confirm"
              type="email"
              placeholder="Repita seu e-mail"
              autoComplete="off"
              value={emailConfirm}
              onChange={(event) => setEmailConfirm(event.target.value)}
              className={`h-12 rounded-xl bg-white ${
                emailConfirm && email.toLowerCase() !== emailConfirm.toLowerCase()
                  ? "border-red-400 focus:border-red-400"
                  : emailConfirm && email.toLowerCase() === emailConfirm.toLowerCase()
                  ? "border-emerald-400"
                  : ""
              }`}
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <FieldContent>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Minimo 8 caracteres"
              autoComplete="new-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="h-12 rounded-xl bg-white"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="password-confirm">Confirme a senha</FieldLabel>
          <FieldContent>
            <Input
              id="password-confirm"
              name="password-confirm"
              type="password"
              placeholder="Repita sua senha"
              autoComplete="new-password"
              value={senhaConfirm}
              onChange={(event) => setSenhaConfirm(event.target.value)}
              className={`h-12 rounded-xl bg-white ${
                senhaConfirm && senha !== senhaConfirm
                  ? "border-red-400 focus:border-red-400"
                  : senhaConfirm && senha === senhaConfirm
                  ? "border-emerald-400"
                  : ""
              }`}
            />
          </FieldContent>
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={carregando}
        className="h-12 rounded-xl bg-primary text-base font-bold text-primary-foreground hover:bg-[#00d97e]"
      >
        {carregando ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
