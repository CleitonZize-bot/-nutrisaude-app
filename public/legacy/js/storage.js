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
  // Sincroniza para o servidor em background (não bloqueia)
  if (typeof agendarSyncServidor === 'function') agendarSyncServidor();
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
  // Salva perfil nos campos do usuário no PocketBase
  if (typeof pbSalvarPerfil === 'function' && pbEstaLogado()) {
    pbSalvarPerfil(u).catch(() => {});
  }
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
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

/* ---- ACESSO GERAL (usado pelo saude.js e outros) ---- */
function carregarDados() {
  return _carregar();
}

function salvarDados(dados) {
  _salvar(dados);
}

/* ---- BACKUP: EXPORTAR ---- */
function exportarBackup() {
  try {
    const dados = _carregar();
    const json = JSON.stringify(dados, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const hoje = _hoje();

    const link = document.createElement('a');
    link.href     = url;
    link.download = `nutrisaude_backup_${hoje}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    mostrarToast('✅ Backup salvo! Guarde o arquivo em local seguro.', 'verde');
  } catch (e) {
    mostrarToast('❌ Erro ao exportar backup.', 'vermelho');
  }
}

/* ---- BACKUP: IMPORTAR ---- */
function importarBackup(input) {
  const arquivo = input.files[0];
  if (!arquivo) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const dados = JSON.parse(e.target.result);

      // Valida se é um backup do NutriSaúde
      if (typeof dados !== 'object' || Array.isArray(dados)) {
        mostrarToast('❌ Arquivo inválido. Use um backup do NutriSaúde.', 'vermelho');
        return;
      }

      _salvar(dados);
      mostrarToast('✅ Dados restaurados! Recarregando o app...', 'verde');
      setTimeout(() => location.reload(), 1500);
    } catch (err) {
      mostrarToast('❌ Arquivo corrompido ou inválido.', 'vermelho');
    }
  };
  reader.readAsText(arquivo);

  // Limpa o input para permitir importar o mesmo arquivo novamente
  input.value = '';
}
