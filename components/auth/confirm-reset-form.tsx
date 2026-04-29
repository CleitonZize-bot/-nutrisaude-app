"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleAlert, CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { pbConfirmarRedefinicaoSenha } from "@/lib/pocketbase";

export function ConfirmResetForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  if (!token) {
    return (
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Link invalido</AlertTitle>
        <AlertDescription>
          Este link de redefinicao e invalido ou expirou. Solicite um novo na
          pagina de recuperacao de senha.
        </AlertDescription>
      </Alert>
    );
  }

  if (sucesso) {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="default" className="border-green-500/30 bg-green-500/10">
          <CheckCircle2 className="text-green-500" />
          <AlertTitle className="text-green-700">Senha redefinida!</AlertTitle>
          <AlertDescription className="text-green-600">
            Sua senha foi alterada com sucesso. Voce ja pode entrar com a nova
            senha.
          </AlertDescription>
        </Alert>
        <Button
          size="lg"
          onClick={() => router.push("/login")}
          className="h-12 rounded-xl bg-primary text-base font-bold text-primary-foreground hover:bg-[#00d97e]"
        >
          Ir para o login
        </Button>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");

    if (!novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas nao coincidem.");
      return;
    }

    setCarregando(true);

    try {
      await pbConfirmarRedefinicaoSenha(token, novaSenha);
      setSucesso(true);
    } catch {
      setErro("Link invalido ou expirado. Solicite um novo e-mail de recuperacao.");
    } finally {
      setCarregando(false);
    }
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
          <FieldLabel htmlFor="novaSenha">Nova senha</FieldLabel>
          <FieldContent>
            <Input
              id="novaSenha"
              name="novaSenha"
              type="password"
              placeholder="Minimo 8 caracteres"
              autoComplete="new-password"
              value={novaSenha}
              onChange={(event) => setNovaSenha(event.target.value)}
              className="h-12 rounded-xl bg-white"
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmarSenha">Confirmar nova senha</FieldLabel>
          <FieldContent>
            <Input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              placeholder="Repita a nova senha"
              autoComplete="new-password"
              value={confirmarSenha}
              onChange={(event) => setConfirmarSenha(event.target.value)}
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
        {carregando ? "Salvando..." : "Salvar nova senha"}
      </Button>
    </form>
  );
}
