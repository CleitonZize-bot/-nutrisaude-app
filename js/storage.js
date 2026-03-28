/* ============================================================
   storage.js — Persistência de dados no localStorage

   Tudo que precisa sobreviver ao fechar o browser fica aqui.
   Estrutura salva:
   {
     perfil:         { nome, peso, altura, idade, sexo, objetivo, condicoes },
     historicoPeso:  [{ data: 'YYYY-MM-DD', peso: 75.5 }],
     checkins:       { 'YYYY-MM-DD': { cafe: '08:12', almoco: '12:45', ... } },
     agua:           { 'YYYY-MM-DD': 1500 }   // ml consumidos
   }
============================================================ */

const STORAGE_KEY = 'nutrisaude_v2';

function _carregar() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function _salvar(dados) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dados)); } catch {}
}

/* ---- PERFIL ---- */
function salvarPerfil(u) {
  const d = _carregar();
  d.perfil = {
    nome: u.nome, peso: u.peso, altura: u.altura,
    idade: u.idade, sexo: u.sexo, objetivo: u.objetivo,
    condicoes: [...u.condicoes]
  };
  _salvar(d);
}

function carregarPerfil() {
  return _carregar().perfil || null;
}

function limparPerfil() {
  const d = _carregar();
  delete d.perfil;
  _salvar(d);
}

/* ---- HISTÓRICO DE PESO ---- */
function salvarPeso(pesoKg) {
  const hoje = _hoje();
  const d = _carregar();
  if (!d.historicoPeso) d.historicoPeso = [];

  // Atualiza ou adiciona entrada de hoje
  const idx = d.historicoPeso.findIndex(p => p.data === hoje);
  const entrada = { data: hoje, peso: parseFloat(pesoKg) };
  if (idx > -1) d.historicoPeso[idx] = entrada;
  else d.historicoPeso.push(entrada);

  // Mantém últimos 90 dias, ordenado
  d.historicoPeso.sort((a, b) => a.data.localeCompare(b.data));
  if (d.historicoPeso.length > 90) d.historicoPeso = d.historicoPeso.slice(-90);

  _salvar(d);
}

function carregarHistoricoPeso() {
  return _carregar().historicoPeso || [];
}

/* ---- CHECK-IN DE REFEIÇÕES ---- */
function marcarRefeicao(chave, feito) {
  const hoje = _hoje();
  const d = _carregar();
  if (!d.checkins) d.checkins = {};
  if (!d.checkins[hoje]) d.checkins[hoje] = {};

  if (feito) {
    d.checkins[hoje][chave] = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit', minute: '2-digit'
    });
  } else {
    delete d.checkins[hoje][chave];
  }
  _salvar(d);
}

function carregarCheckins() {
  return (_carregar().checkins || {})[_hoje()] || {};
}

/* ---- ÁGUA ---- */
function salvarAgua(ml) {
  const hoje = _hoje();
  const d = _carregar();
  if (!d.agua) d.agua = {};
  d.agua[hoje] = Math.max(0, ml);
  _salvar(d);
}

function carregarAguaHoje() {
  return (_carregar().agua || {})[_hoje()] || 0;
}

/* ---- AUXILIAR ---- */
function _hoje() {
  return new Date().toISOString().split('T')[0];
}
