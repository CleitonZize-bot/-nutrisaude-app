"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, Droplets } from "lucide-react";

/* ============================================================
   lembrete-agua.tsx — Lembretes de água via notificação push
   Usa a Web Notifications API (funciona no PWA instalado)
============================================================ */

const STORAGE_KEY = "nutrisaude_lembrete_agua";

type Config = {
  ativo: boolean;
  intervaloMin: number; // 30, 60, 90, 120
};

const INTERVALOS = [
  { valor: 30,  label: "30 min" },
  { valor: 60,  label: "1 hora" },
  { valor: 90,  label: "1h30" },
  { valor: 120, label: "2 horas" },
];

const MENSAGENS = [
  "💧 Hora de beber água! Seu fígado agradece.",
  "💧 Hidratação em dia! Beba um copo de água agora.",
  "💧 Lembrete NutriSaúde: não esqueça da água!",
  "💧 Um copo de água agora ajuda seu corpo a funcionar melhor.",
  "💧 Já bebeu água recentemente? Hora de mais um copo!",
];

function salvarConfig(config: Config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {/**/}
}

function carregarConfig(): Config {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Config;
  } catch {/**/}
  return { ativo: false, intervaloMin: 60 };
}

function enviarNotificacao() {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  const msg = MENSAGENS[Math.floor(Math.random() * MENSAGENS.length)];
  try {
    new Notification("NutriSaúde", {
      body: msg,
      icon: "/icons/icon-192.svg",
      badge: "/icons/icon-192.svg",
      tag: "lembrete-agua", // substitui notificação anterior
    });
  } catch {/**/}
}

export function LembreteAgua() {
  const [config, setConfig] = useState<Config>({ ativo: false, intervaloMin: 60 });
  const [permissao, setPermissao] = useState<NotificationPermission | "unsupported">("default");
  const [salvando, setSalvando] = useState(false);

  // Carrega config salva e verifica permissão atual
  useEffect(() => {
    setConfig(carregarConfig());
    if (typeof window === "undefined" || !("Notification" in window)) {
      setPermissao("unsupported");
    } else {
      setPermissao(Notification.permission);
    }
  }, []);

  // Configura o intervalo de notificação
  useEffect(() => {
    if (!config.ativo || permissao !== "granted") return;

    const ms = config.intervaloMin * 60 * 1000;
    const timer = setInterval(enviarNotificacao, ms);
    return () => clearInterval(timer);
  }, [config.ativo, config.intervaloMin, permissao]);

  async function ativar() {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    setSalvando(true);
    try {
      const resultado = await Notification.requestPermission();
      setPermissao(resultado);

      if (resultado === "granted") {
        const nova: Config = { ...config, ativo: true };
        setConfig(nova);
        salvarConfig(nova);
        // Envia notificação de confirmação
        new Notification("NutriSaúde", {
          body: "✅ Lembretes de água ativados! Você receberá avisos regulares.",
          icon: "/icons/icon-192.svg",
          tag: "lembrete-agua",
        });
      }
    } finally {
      setSalvando(false);
    }
  }

  function desativar() {
    const nova: Config = { ...config, ativo: false };
    setConfig(nova);
    salvarConfig(nova);
  }

  function mudarIntervalo(valor: number) {
    const nova: Config = { ...config, intervaloMin: valor };
    setConfig(nova);
    salvarConfig(nova);
  }

  // Se não suporta notificações
  if (permissao === "unsupported") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <BellOff className="size-5 text-slate-400" />
          <p className="text-sm text-slate-500">
            Seu navegador nao suporta notificacoes. Instale o app na tela inicial para ativar os lembretes.
          </p>
        </div>
      </div>
    );
  }

  // Se o usuário bloqueou as notificações
  if (permissao === "denied") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <BellOff className="size-5 text-amber-500" />
          <div>
            <p className="text-sm font-semibold text-amber-700">Notificacoes bloqueadas</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Para ativar, va em Configuracoes do celular → Aplicativos → NutriSaude → Notificacoes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex size-9 items-center justify-center rounded-xl ${config.ativo ? "bg-cyan-100" : "bg-slate-100"}`}>
            <Droplets className={`size-5 ${config.ativo ? "text-cyan-600" : "text-slate-400"}`} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Lembretes de agua</p>
            <p className="text-xs text-slate-500">
              {config.ativo ? `Ativo — aviso a cada ${INTERVALOS.find(i => i.valor === config.intervaloMin)?.label}` : "Desativado"}
            </p>
          </div>
        </div>

        {config.ativo ? (
          <button
            type="button"
            onClick={desativar}
            className="flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 active:bg-red-100"
          >
            <BellOff className="size-3.5" />
            Desativar
          </button>
        ) : (
          <button
            type="button"
            onClick={ativar}
            disabled={salvando}
            className="flex items-center gap-1.5 rounded-full bg-cyan-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm active:bg-cyan-600 disabled:opacity-50"
          >
            <Bell className="size-3.5" />
            {salvando ? "..." : "Ativar"}
          </button>
        )}
      </div>

      {/* Seletor de intervalo — só aparece quando ativo */}
      {config.ativo ? (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-600">Frequencia do lembrete:</p>
          <div className="grid grid-cols-4 gap-2">
            {INTERVALOS.map((item) => (
              <button
                key={item.valor}
                type="button"
                onClick={() => mudarIntervalo(item.valor)}
                className={`rounded-xl border py-2 text-xs font-semibold transition-colors ${
                  config.intervaloMin === item.valor
                    ? "border-cyan-400 bg-cyan-50 text-cyan-700"
                    : "border-slate-200 bg-slate-50 text-slate-500 active:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-slate-400">
          Ative para receber lembretes automaticos no celular. Funciona mesmo com o app minimizado.
        </p>
      )}
    </div>
  );
}
