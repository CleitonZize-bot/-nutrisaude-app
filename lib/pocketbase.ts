import PocketBase from "pocketbase";

export const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL || "https://pb.nutrisaudeapp.online";

export const NUTRISAUDE_STORAGE_KEY = "nutrisaude_v2";

export type NutrisaudeProfile = {
  nome: string;
  peso: number;
  altura: number;
  idade: number;
  sexo: string;
  objetivo: string;
  condicoes: string[];
};

export type NutrisaudeStoredData = {
  perfil?: NutrisaudeProfile;
  agua?: Record<string, number>;
  checkins?: Record<string, Record<string, string>>;
  historicoPeso?: Array<{ data: string; peso: number }>;
  diario?: Record<string, unknown>;
  exames?: unknown[];
  remedios?: unknown[];
};

let pocketbaseClient: PocketBase | null = null;
let syncTimer: number | null = null;

function parseJson<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function mergeServerIntoLocal(
  local: NutrisaudeStoredData,
  incoming: NutrisaudeStoredData
): NutrisaudeStoredData {
  return {
    ...local,
    ...incoming,
    agua: incoming.agua ?? local.agua,
    checkins: incoming.checkins ?? local.checkins,
    historicoPeso: incoming.historicoPeso ?? local.historicoPeso,
    diario: incoming.diario ?? local.diario,
    exames: incoming.exames ?? local.exames,
    remedios: incoming.remedios ?? local.remedios,
  };
}

function buildServerPayload(data: NutrisaudeStoredData, userId: string) {
  return {
    user: userId,
    agua: JSON.stringify(data.agua || {}),
    checkins: JSON.stringify(data.checkins || {}),
    historicoPeso: JSON.stringify(data.historicoPeso || []),
    saude: JSON.stringify({
      diario: data.diario || {},
      exames: data.exames || [],
      remedios: data.remedios || [],
    }),
  };
}

function parseCondicoes(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean) as string[];
  if (typeof value !== "string" || !value.trim()) return [];
  return parseJson<string[]>(value, []);
}

export function getPocketBase() {
  if (!pocketbaseClient) {
    pocketbaseClient = new PocketBase(PB_URL);
    pocketbaseClient.autoCancellation(false);
  }

  return pocketbaseClient;
}

export function pbEstaLogado() {
  return getPocketBase().authStore.isValid;
}

export function pbLogout() {
  getPocketBase().authStore.clear();
}

export function pbIgnorarAssinaturaNoAmbienteAtual() {
  return process.env.NEXT_PUBLIC_BYPASS_SUBSCRIPTION === "true";
}

export function perfilEstaCompleto(
  perfil: Partial<NutrisaudeProfile> | null | undefined
) {
  return Boolean(
    perfil?.nome &&
      perfil?.peso &&
      perfil?.altura &&
      perfil?.idade &&
      perfil?.sexo &&
      perfil?.objetivo &&
      Array.isArray(perfil?.condicoes) &&
      perfil.condicoes.length > 0
  );
}

export async function pbLogin(email: string, senha: string) {
  return getPocketBase().collection("users").authWithPassword(email, senha);
}

export async function pbRegistrar(email: string, senha: string, nome: string) {
  return getPocketBase().collection("users").create({
    email,
    password: senha,
    passwordConfirm: senha,
    nome,
  });
}

export async function pbRefresh() {
  if (!pbEstaLogado()) return null;

  try {
    return await getPocketBase().collection("users").authRefresh();
  } catch (error) {
    pbLogout();
    throw error;
  }
}

export async function pbVerificarAssinatura(email: string) {
  try {
    const lista = await getPocketBase().collection("clientes").getList(1, 1, {
      filter: `email = "${email}" && status = "ativo"`,
    });

    return lista.items.length > 0;
  } catch {
    return false;
  }
}

export async function pbCarregarPerfilServidor(): Promise<NutrisaudeProfile | null> {
  if (!pbEstaLogado()) return null;

  try {
    const pb = getPocketBase();
    const user = await pb.collection("users").getOne(pb.authStore.model!.id);

    if (!user.nome) return null;

    return {
      nome: user.nome,
      peso: user.peso || 0,
      altura: user.altura || 0,
      idade: user.idade || 0,
      sexo: user.sexo || "",
      objetivo: user.objetivo || "",
      condicoes: parseCondicoes(user.condicoes),
    };
  } catch {
    return null;
  }
}

export async function pbSalvarPerfil(perfil: NutrisaudeProfile) {
  if (!pbEstaLogado()) return;

  await getPocketBase().collection("users").update(getPocketBase().authStore.model!.id, {
    nome: perfil.nome,
    peso: perfil.peso,
    altura: perfil.altura,
    idade: perfil.idade,
    sexo: perfil.sexo,
    objetivo: perfil.objetivo,
    condicoes: JSON.stringify(perfil.condicoes || []),
  });
}

export async function sincronizarParaLocal() {
  if (!pbEstaLogado() || typeof window === "undefined") return;

  const pb = getPocketBase();
  const userId = pb.authStore.model!.id;

  try {
    const perfil = await pbCarregarPerfilServidor();
    let registros: Record<string, string> | null = null;

    try {
      const lista = await pb.collection("dados_usuario").getList(1, 1, {
        filter: `user = "${userId}"`,
      });

      if (lista.items.length > 0) {
        registros = lista.items[0] as unknown as Record<string, string>;
      }
    } catch {
      registros = null;
    }

    const current = carregarDadosLocais() || {};
    const incoming: NutrisaudeStoredData = {};

    if (perfil) {
      incoming.perfil = perfil;
    }

    if (registros) {
      incoming.agua = parseJson(registros.agua, {});
      incoming.checkins = parseJson(registros.checkins, {});
      incoming.historicoPeso = parseJson(registros.historicoPeso, []);

      const saude = parseJson(registros.saude, {
        diario: {},
        exames: [],
        remedios: [],
      });

      incoming.diario = saude.diario || {};
      incoming.exames = saude.exames || [];
      incoming.remedios = saude.remedios || [];
    }

    const merged = mergeServerIntoLocal(current, incoming);
    window.localStorage.setItem(NUTRISAUDE_STORAGE_KEY, JSON.stringify(merged));
  } catch (error) {
    console.warn("PB: erro ao sincronizar do servidor", error);
  }
}

export function carregarDadosLocais(): NutrisaudeStoredData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(NUTRISAUDE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as NutrisaudeStoredData) : null;
  } catch {
    return null;
  }
}

async function enviarParaServidor() {
  if (!pbEstaLogado() || typeof window === "undefined") return;

  const pb = getPocketBase();
  const userId = pb.authStore.model!.id;
  const dados = carregarDadosLocais();

  if (!dados) return;

  try {
    const payload = buildServerPayload(dados, userId);
    const lista = await pb.collection("dados_usuario").getList(1, 1, {
      filter: `user = "${userId}"`,
    });

    if (lista.items.length > 0) {
      await pb.collection("dados_usuario").update(lista.items[0].id, payload);
    } else {
      await pb.collection("dados_usuario").create(payload);
    }
  } catch (error) {
    console.warn("PB: erro ao salvar no servidor", error);
  }
}

export function agendarSyncServidor() {
  if (!pbEstaLogado() || typeof window === "undefined") return;

  if (syncTimer) {
    window.clearTimeout(syncTimer);
  }

  syncTimer = window.setTimeout(() => {
    void enviarParaServidor();
  }, 3000);
}

export function atualizarDadosLocais(
  mutator: (dados: NutrisaudeStoredData) => NutrisaudeStoredData
) {
  if (typeof window === "undefined") return {} as NutrisaudeStoredData;

  const current = carregarDadosLocais() || {};
  const updated = mutator(current);
  window.localStorage.setItem(NUTRISAUDE_STORAGE_KEY, JSON.stringify(updated));
  agendarSyncServidor();
  return updated;
}

export function salvarPerfilLocal(perfil: NutrisaudeProfile) {
  atualizarDadosLocais((dados) => ({
    ...dados,
    perfil: {
      nome: perfil.nome,
      peso: perfil.peso,
      altura: perfil.altura,
      idade: perfil.idade,
      sexo: perfil.sexo,
      objetivo: perfil.objetivo,
      condicoes: [...perfil.condicoes],
    },
  }));
}
