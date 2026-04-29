"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, UtensilsCrossed, Scale } from "lucide-react";

/* ============================================================
   lembretes-refeicao.tsx
   Lembretes para horários de refeição + lembrete semanal de
   pesagem. Usa Web Notifications API (sem backend, sem push
   server — agendamento client-side via setInterval).
============================================================ */

const STORAGE_KEY = "nutrisaude_lembretes_refeicao";

type Refeicao = {
  chave: string;
  emoji: string;
  nome: string;
  hora: string; // "HH:MM"
  ativo: boolean;
};

type Config = {
  refeicoes: Refeicao[];
  pesagemSemanal: {
    ativo: boolean;
    diaSemana: number; // 0 = dom, 1 = seg ... 6 = sab
    hora: string;
  };
};

const DEFAULT_CONFIG: Config = {
  refeicoes: [
    { chave: "cafe", emoji: "🍳", nome: "Café da manhã", hora: "07:30", ativo: true },
    { chave: "lanche-manha", emoji: "🍎", nome: "Lanche da manhã", hora: "10:00", ativo: false },
    { chave: "almoco", emoji: "🍽️", nome: "Almoço", hora: "12:30", ativo: true },
    { chave: "lanche-tarde", emoji: "☕", nome: "Lanche da tarde", hora: "16:00", ativo: false },
    { chave: "jantar", emoji: "🥗", nome: "Jantar", hora: "19:30", ativo: true },
    { chave: "ceia", emoji: "🍵", nome: "Ceia", hora: "21:30", ativo: false },
  ],
  pesagemSemanal: {
    ativo: false,
    diaSemana: 1, // segunda-feira
    hora: "07:00",
  },
};

const DIAS_SEMANA = [
  { valor: 0, label: "Dom" },
  { valor: 1, label: "Seg" },
  { valor: 2, label: "Ter" },
  { valor: 3, label: "Qua" },
  { valor: 4, label: "Qui" },
  { valor: 5, label: "Sex" },
  { valor: 6, label: "Sáb" },
];

const MENSAGENS_REFEICAO: Record<string, string[]> = {
  cafe: [
    "🍳 Hora do café da manhã! Comece o dia com energia.",
    "🍳 Bom dia! Seu café da manhã saudável te espera.",
  ],
  "lanche-manha": [
    "🍎 Pausa para o lanche! Algo leve mantém seu metabolismo ativo.",
    "🍎 Hora do lanche da manhã. Não pule essa refeição.",
  ],
  almoco: [
    "🍽️ Hora do almoço! Confira seu plano de hoje.",
    "🍽️ Almoço saudável te espera. Vá conferir o cardápio!",
  ],
  "lanche-tarde": [
    "☕ Lanche da tarde! Hora de dar uma reabastecida.",
    "☕ Pausa estratégica: lanche saudável te aguarda.",
  ],
  jantar: [
    "🥗 Hora do jantar! Refeição leve para uma boa noite.",
    "🥗 Seu jantar saudável está no plano. Bora montar?",
  ],
  ceia: [
    "🍵 Hora da ceia! Algo leve antes de dormir.",
    "🍵 Ceia leve ajuda no sono. Que tal um chá?",
  ],
};

function salvarConfig(config: Config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    /**/
  }
}

function carregarConfig(): Config {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Config;
      // Merge com defaults caso falte algo (compat com versões antigas)
      return {
        refeicoes: parsed.refeicoes?.length
          ? parsed.refeicoes
          : DEFAULT_CONFIG.refeicoes,
        pesagemSemanal: parsed.pesagemSemanal || DEFAULT_CONFIG.pesagemSemanal,
      };
    }
  } catch {
    /**/
  }
  return DEFAULT_CONFIG;
}

function enviarNotificacaoRefeicao(refeicao: Refeicao) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  const mensagens = MENSAGENS_REFEICAO[refeicao.chave] || [
    `${refeicao.emoji} Hora do(a) ${refeicao.nome}!`,
  ];
  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
  try {
    new Notification("NutriSaúde", {
      body: msg,
      icon: "/icons/icon-192.svg",
      badge: "/icons/icon-192.svg",
      tag: `refeicao-${refeicao.chave}`,
    });
  } catch {
    /**/
  }
}

function enviarNotificacaoPesagem() {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification("NutriSaúde", {
      body: "⚖️ Hora de pesar! Registre seu peso para acompanhar a evolução.",
      icon: "/icons/icon-192.svg",
      badge: "/icons/icon-192.svg",
      tag: "pesagem-semanal",
    });
  } catch {
    /**/
  }
}

/**
 * Calcula o próximo timestamp (em ms) para um horário "HH:MM".
 * Se já passou hoje, agenda para amanhã.
 */
function proximoHorario(horaStr: string): number {
  const [h, m] = horaStr.split(":").map(Number);
  const agora = new Date();
  const alvo = new Date();
  alvo.setHours(h, m, 0, 0);
  if (alvo.getTime() <= agora.getTime()) {
    alvo.setDate(alvo.getDate() + 1);
  }
  return alvo.getTime() - agora.getTime();
}

/**
 * Calcula o próximo timestamp (em ms) para um dia da semana + hora.
 */
function proximoDiaSemana(diaSemana: number, horaStr: string): number {
  const [h, m] = horaStr.split(":").map(Number);
  const agora = new Date();
  const alvo = new Date();
  alvo.setHours(h, m, 0, 0);

  const diasParaAdicionar = (diaSemana - agora.getDay() + 7) % 7;
  alvo.setDate(alvo.getDate() + diasParaAdicionar);

  if (alvo.getTime() <= agora.getTime()) {
    alvo.setDate(alvo.getDate() + 7);
  }
  return alvo.getTime() - agora.getTime();
}

export function LembretesRefeicao() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [permissao, setPermissao] = useState<NotificationPermission | "unsupported">(
    "default"
  );
  const [salvando, setSalvando] = useState(false);

  // Carrega config + permissão
  useEffect(() => {
    setConfig(carregarConfig());
    if (typeof window === "undefined" || !("Notification" in window)) {
      setPermissao("unsupported");
    } else {
      setPermissao(Notification.permission);
    }
  }, []);

  // Agenda notificações para cada refeição ativa
  useEffect(() => {
    if (permissao !== "granted") return;

    const timers: number[] = [];

    config.refeicoes.forEach((ref) => {
      if (!ref.ativo) return;

      // Agenda primeira ocorrência
      const ms = proximoHorario(ref.hora);
      const t1 = window.setTimeout(() => {
        enviarNotificacaoRefeicao(ref);
        // Depois da primeira, repete a cada 24h
        const t2 = window.setInterval(
          () => enviarNotificacaoRefeicao(ref),
          24 * 60 * 60 * 1000
        );
        timers.push(t2);
      }, ms);
      timers.push(t1);
    });

    // Pesagem semanal
    if (config.pesagemSemanal.ativo) {
      const ms = proximoDiaSemana(
        config.pesagemSemanal.diaSemana,
        config.pesagemSemanal.hora
      );
      const t1 = window.setTimeout(() => {
        enviarNotificacaoPesagem();
        const t2 = window.setInterval(
          () => enviarNotificacaoPesagem(),
          7 * 24 * 60 * 60 * 1000
        );
        timers.push(t2);
      }, ms);
      timers.push(t1);
    }

    return () => {
      timers.forEach((t) => {
        window.clearTimeout(t);
        window.clearInterval(t);
      });
    };
  }, [config, permissao]);

  async function pedirPermissao() {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    setSalvando(true);
    try {
      const resultado = await Notification.requestPermission();
      setPermissao(resultado);
      if (resultado === "granted") {
        new Notification("NutriSaúde", {
          body: "✅ Notificações ativadas! Você receberá lembretes nos horários configurados.",
          icon: "/icons/icon-192.svg",
        });
      }
    } finally {
      setSalvando(false);
    }
  }

  function toggleRefeicao(chave: string) {
    const nova: Config = {
      ...config,
      refeicoes: config.refeicoes.map((r) =>
        r.chave === chave ? { ...r, ativo: !r.ativo } : r
      ),
    };
    setConfig(nova);
    salvarConfig(nova);
  }

  function mudarHorario(chave: string, hora: string) {
    const nova: Config = {
      ...config,
      refeicoes: config.refeicoes.map((r) =>
        r.chave === chave ? { ...r, hora } : r
      ),
    };
    setConfig(nova);
    salvarConfig(nova);
  }

  function togglePesagem() {
    const nova: Config = {
      ...config,
      pesagemSemanal: {
        ...config.pesagemSemanal,
        ativo: !config.pesagemSemanal.ativo,
      },
    };
    setConfig(nova);
    salvarConfig(nova);
  }

  function mudarDiaPesagem(dia: number) {
    const nova: Config = {
      ...config,
      pesagemSemanal: { ...config.pesagemSemanal, diaSemana: dia },
    };
    setConfig(nova);
    salvarConfig(nova);
  }

  function mudarHoraPesagem(hora: string) {
    const nova: Config = {
      ...config,
      pesagemSemanal: { ...config.pesagemSemanal, hora },
    };
    setConfig(nova);
    salvarConfig(nova);
  }

  // Não suportado
  if (permissao === "unsupported") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <BellOff className="size-5 text-slate-400" />
          <p className="text-sm text-slate-500">
            Seu navegador nao suporta notificacoes. Instale o app na tela inicial.
          </p>
        </div>
      </div>
    );
  }

  // Bloqueado
  if (permissao === "denied") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4">
        <div className="flex items-center gap-3">
          <BellOff className="size-5 text-amber-500" />
          <div>
            <p className="text-sm font-semibold text-amber-700">Notificacoes bloqueadas</p>
            <p className="mt-0.5 text-xs text-amber-600">
              Va em Configuracoes do celular → Aplicativos → NutriSaude → Notificacoes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Precisa pedir permissão
  if (permissao === "default") {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100">
            <Bell className="size-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Ative os lembretes</p>
            <p className="text-xs text-slate-500">
              Receba avisos nos horarios das refeicoes e da pesagem semanal.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={pedirPermissao}
          disabled={salvando}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-bold text-white shadow-sm active:bg-emerald-600 disabled:opacity-50"
        >
          <Bell className="size-4" />
          {salvando ? "..." : "Ativar notificacoes"}
        </button>
      </div>
    );
  }

  // Permissão concedida — mostra controles
  return (
    <div className="flex flex-col gap-4">
      {/* Lembretes de refeição */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-100">
            <UtensilsCrossed className="size-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">Lembretes de refeicao</p>
            <p className="text-xs text-slate-500">
              Toque para ativar/desativar. Ajuste o horario.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {config.refeicoes.map((ref) => (
            <div
              key={ref.chave}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2 transition-colors ${
                ref.ativo
                  ? "border-emerald-300 bg-emerald-50/60"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleRefeicao(ref.chave)}
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                  ref.ativo
                    ? "border-emerald-500 bg-emerald-500"
                    : "border-slate-300 bg-white"
                }`}
                aria-label={`${ref.ativo ? "Desativar" : "Ativar"} ${ref.nome}`}
              >
                {ref.ativo && (
                  <span className="text-[10px] font-bold text-white">✓</span>
                )}
              </button>

              <span className="text-base">{ref.emoji}</span>

              <span className="flex-1 text-sm font-medium text-slate-700">
                {ref.nome}
              </span>

              <input
                type="time"
                value={ref.hora}
                onChange={(e) => mudarHorario(ref.chave, e.target.value)}
                disabled={!ref.ativo}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-50"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pesagem semanal */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-9 items-center justify-center rounded-xl ${
                config.pesagemSemanal.ativo ? "bg-purple-100" : "bg-slate-100"
              }`}
            >
              <Scale
                className={`size-5 ${
                  config.pesagemSemanal.ativo ? "text-purple-600" : "text-slate-400"
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Pesagem semanal</p>
              <p className="text-xs text-slate-500">
                {config.pesagemSemanal.ativo
                  ? `Toda ${
                      DIAS_SEMANA.find(
                        (d) => d.valor === config.pesagemSemanal.diaSemana
                      )?.label
                    } as ${config.pesagemSemanal.hora}`
                  : "Desativado"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={togglePesagem}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              config.pesagemSemanal.ativo
                ? "border border-red-200 bg-red-50 text-red-600 active:bg-red-100"
                : "bg-purple-500 text-white shadow-sm active:bg-purple-600"
            }`}
          >
            {config.pesagemSemanal.ativo ? (
              <>
                <BellOff className="size-3.5" />
                Desativar
              </>
            ) : (
              <>
                <Bell className="size-3.5" />
                Ativar
              </>
            )}
          </button>
        </div>

        {config.pesagemSemanal.ativo && (
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">Dia da semana:</p>
              <div className="grid grid-cols-7 gap-1">
                {DIAS_SEMANA.map((dia) => (
                  <button
                    key={dia.valor}
                    type="button"
                    onClick={() => mudarDiaPesagem(dia.valor)}
                    className={`rounded-lg border py-1.5 text-xs font-semibold transition-colors ${
                      config.pesagemSemanal.diaSemana === dia.valor
                        ? "border-purple-400 bg-purple-50 text-purple-700"
                        : "border-slate-200 bg-slate-50 text-slate-500 active:bg-slate-100"
                    }`}
                  >
                    {dia.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">Horario:</p>
              <input
                type="time"
                value={config.pesagemSemanal.hora}
                onChange={(e) => mudarHoraPesagem(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
