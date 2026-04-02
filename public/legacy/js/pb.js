/* ============================================================
   pb.js — Integração com PocketBase

   ⚡ CONFIGURAÇÃO: troque a URL pelo endereço do seu PocketBase
      depois de configurar no EasyPanel (ex: https://pb.seudominio.com.br)
============================================================ */

const PB_URL = 'https://pb.nutrisaudeapp.online';

const pb = new PocketBase(PB_URL);
pb.autoCancellation(false);

/* ============================================================
   AUTENTICAÇÃO
============================================================ */

async function pbLogin(email, senha) {
  return await pb.collection('users').authWithPassword(email, senha);
}

async function pbRegistrar(email, senha, nome) {
  return await pb.collection('users').create({
    email,
    password: senha,
    passwordConfirm: senha,
    nome
  });
}

/* Verifica se o e-mail tem assinatura ativa */
async function pbVerificarAssinatura(email) {
  try {
    const lista = await pb.collection('clientes').getList(1, 1, {
      filter: `email = "${email}" && status = "ativo"`
    });
    return lista.items.length > 0;
  } catch (e) {
    return false;
  }
}

function pbLogout() {
  pb.authStore.clear();
}

function pbEstaLogado() {
  return pb.authStore.isValid;
}

/* ============================================================
   PERFIL (salvo nos campos extras do usuário)
============================================================ */

async function pbSalvarPerfil(u) {
  if (!pbEstaLogado()) return;
  try {
    await pb.collection('users').update(pb.authStore.model.id, {
      nome:      u.nome,
      peso:      u.peso,
      altura:    u.altura,
      idade:     u.idade,
      sexo:      u.sexo,
      objetivo:  u.objetivo,
      condicoes: JSON.stringify(u.condicoes || [])
    });
  } catch (e) {
    console.warn('PB: erro ao salvar perfil', e);
  }
}

async function pbCarregarPerfilServidor() {
  if (!pbEstaLogado()) return null;
  try {
    const user = await pb.collection('users').getOne(pb.authStore.model.id);
    if (!user.nome) return null;
    return {
      nome:      user.nome,
      peso:      user.peso      || 0,
      altura:    user.altura    || 0,
      idade:     user.idade     || 0,
      sexo:      user.sexo      || '',
      objetivo:  user.objetivo  || '',
      condicoes: user.condicoes ? JSON.parse(user.condicoes) : []
    };
  } catch (e) {
    return null;
  }
}

/* ============================================================
   SINCRONIZAÇÃO: Servidor → localStorage
   Chamado ao fazer login — restaura todos os dados
============================================================ */

async function sincronizarParaLocal() {
  if (!pbEstaLogado()) return;
  const userId = pb.authStore.model.id;

  try {
    // 1. Perfil
    const perfil = await pbCarregarPerfilServidor();

    // 2. Dados gerais (agua, checkins, peso, saude)
    let registros = null;
    try {
      const lista = await pb.collection('dados_usuario').getList(1, 1, {
        filter: `user = "${userId}"`
      });
      if (lista.items.length > 0) registros = lista.items[0];
    } catch {}

    // 3. Monta objeto para salvar no localStorage
    const local = {};

    if (perfil) {
      local.perfil = perfil;
    }

    if (registros) {
      if (registros.agua)          local.agua          = JSON.parse(registros.agua          || '{}');
      if (registros.checkins)      local.checkins      = JSON.parse(registros.checkins      || '{}');
      if (registros.historicoPeso) local.historicoPeso = JSON.parse(registros.historicoPeso || '[]');
      if (registros.saude) {
        const saude = JSON.parse(registros.saude || '{}');
        if (saude.diario)   local.diario   = saude.diario;
        if (saude.exames)   local.exames   = saude.exames;
        if (saude.remedios) local.remedios = saude.remedios;
      }
    }

    if (Object.keys(local).length > 0) {
      const atual = JSON.parse(localStorage.getItem('nutrisaude_v2') || '{}');
      localStorage.setItem('nutrisaude_v2', JSON.stringify({
        ...atual,
        ...local
      }));
      console.log('✅ NutriSaúde: dados restaurados do servidor');
    }
  } catch (e) {
    console.warn('PB: erro ao sincronizar do servidor', e);
  }
}

/* ============================================================
   SINCRONIZAÇÃO: localStorage → Servidor
   Chamado automaticamente 3s após cada save (não bloqueia UI)
============================================================ */

let _pbSyncTimer = null;

function agendarSyncServidor() {
  if (!pbEstaLogado()) return;
  clearTimeout(_pbSyncTimer);
  _pbSyncTimer = setTimeout(_enviarParaServidor, 3000);
}

async function _enviarParaServidor() {
  if (!pbEstaLogado()) return;
  const userId = pb.authStore.model.id;

  try {
    const raw = localStorage.getItem('nutrisaude_v2');
    if (!raw) return;
    const dados = JSON.parse(raw);

    const payload = {
      user:          userId,
      agua:          JSON.stringify(dados.agua          || {}),
      checkins:      JSON.stringify(dados.checkins      || {}),
      historicoPeso: JSON.stringify(dados.historicoPeso || []),
      saude: JSON.stringify({
        diario:   dados.diario   || {},
        exames:   dados.exames   || [],
        remedios: dados.remedios || []
      })
    };

    const lista = await pb.collection('dados_usuario').getList(1, 1, {
      filter: `user = "${userId}"`
    });

    if (lista.items.length > 0) {
      await pb.collection('dados_usuario').update(lista.items[0].id, payload);
    } else {
      await pb.collection('dados_usuario').create(payload);
    }

    console.log('☁️ NutriSaúde: dados salvos no servidor');
  } catch (e) {
    console.warn('PB: erro ao salvar no servidor', e);
  }
}
