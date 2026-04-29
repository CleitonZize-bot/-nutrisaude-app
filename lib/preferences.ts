/**
 * preferences.ts — Preferências locais simples do usuário
 * (Modo Econômico, etc). Guardadas em localStorage por simplicidade.
 */

const KEY_MODO_ECONOMICO = "nutrisaude_modo_economico";
const KEY_INGREDIENTES_EM_CASA = "nutrisaude_ingredientes_em_casa";

export function getModoEconomico(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(KEY_MODO_ECONOMICO) === "true";
  } catch {
    return false;
  }
}

export function setModoEconomico(ativo: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY_MODO_ECONOMICO, ativo ? "true" : "false");
    // Dispara evento custom pra outros componentes reagirem
    window.dispatchEvent(new CustomEvent("nutrisaude:modo-economico", { detail: ativo }));
  } catch {
    /**/
  }
}

export function getIngredientesEmCasa(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY_INGREDIENTES_EM_CASA);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function setIngredientesEmCasa(lista: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      KEY_INGREDIENTES_EM_CASA,
      JSON.stringify(lista)
    );
    window.dispatchEvent(
      new CustomEvent("nutrisaude:ingredientes-em-casa", { detail: lista })
    );
  } catch {
    /**/
  }
}

export function toggleIngredienteEmCasa(nome: string) {
  const lista = getIngredientesEmCasa();
  const idx = lista.indexOf(nome);
  if (idx >= 0) {
    lista.splice(idx, 1);
  } else {
    lista.push(nome);
  }
  setIngredientesEmCasa(lista);
  return lista;
}
