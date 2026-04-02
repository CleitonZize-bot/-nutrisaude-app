"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  carregarDadosLocais,
  pbCarregarPerfilServidor,
  pbLogin,
  perfilEstaCompleto,
  sincronizarParaLocal,
} from "@/lib/pocketbase";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!email.trim() || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }

    setCarregando(true);

    try {
      await pbLogin(email.trim(), senha);
      await sincronizarParaLocal();
      const perfilServidor = await pbCarregarPerfilServidor();
      const perfilLocal = carregarDadosLocais()?.perfil;
      const temPerfil = perfilEstaCompleto(perfilServidor) || perfilEstaCompleto(perfilLocal);

      if (!temPerfil) {
        router.push("/onboarding");
      } else {
        router.push("/plano");
      }
    } catch {
      setErro("E-mail ou senha incorretos. Verifique e tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {erro ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Nao foi possivel entrar</AlertTitle>
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
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
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <FieldContent>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Sua senha"
              autoComplete="current-password"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className="h-12 rounded-xl bg-white"
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
        {carregando ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
