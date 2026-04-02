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
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!nome.trim() || !email.trim() || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 8) {
      setErro("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setCarregando(true);

    try {
      await pbRegistrar(email.trim(), senha, nome.trim());
      await pbLogin(email.trim(), senha);
      await sincronizarParaLocal();
      window.location.href = "/legacy/index.html?questionario=1";
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
