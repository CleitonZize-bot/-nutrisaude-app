"use client";

import { useState } from "react";
import { CircleAlert, CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { pbRecuperarSenha } from "@/lib/pocketbase";

export function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setSucesso(false);

    if (!email.trim()) {
      setErro("Preencha seu e-mail.");
      return;
    }

    setCarregando(true);

    try {
      await pbRecuperarSenha(email.trim());
      setSucesso(true);
    } catch {
      setSucesso(true);
    } finally {
      setCarregando(false);
    }
  }

  if (sucesso) {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="default" className="border-green-500/30 bg-green-500/10">
          <CheckCircle2 className="text-green-500" />
          <AlertTitle className="text-green-700">E-mail enviado!</AlertTitle>
          <AlertDescription className="text-green-600">
            Se existe uma conta com o e-mail <strong>{email}</strong>, voce
            recebera um link para redefinir sua senha. Verifique tambem a pasta
            de spam.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {erro ? (
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Erro</AlertTitle>
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
      </FieldGroup>

      <Button
        type="submit"
        size="lg"
        disabled={carregando}
        className="h-12 rounded-xl bg-primary text-base font-bold text-primary-foreground hover:bg-[#00d97e]"
      >
        {carregando ? "Enviando..." : "Enviar link de recuperacao"}
      </Button>
    </form>
  );
}
