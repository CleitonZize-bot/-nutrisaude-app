/* ============================================================
   app.js — Lógica principal do aplicativo NutriSaúde
============================================================ */

const usuario = {
  nome: '', peso: 0, altura: 0, idade: 0, sexo: '', objetivo: '',
  condicoes: []
};
const ingredientesEmCasa = [];
let cardapioAtual = null;
let _temAssinaturaAtiva = true;

const COR_REFEICAO = {
  cafe:         '#f59e0b',
  lanche_manha: '#f97316',
  almoco:       '#10b981',
  lanche_tarde: '#8b5cf6',
  jantar:       '#3b82f6',
  ceia:         '#6366f1'
};

/* ============================================================
   INICIALIZAÇÃO — verifica se há perfil salvo
============================================================ */
document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const modoAuth = params.get('auth');
  const modoPlano = params.get('plano');

  // Listener do input de ingrediente
  const inputIngrediente = document.getElementById('input-ingrediente');
  if (inputIngrediente) {
    inputIngrediente.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); adicionarIngrediente(); }
    });
  }

  // Verifica autenticação PocketBase
  if (pbEstaLogado()) {
    try {
      // Verifica se o token ainda é válido
      await pb.collection('users').authRefresh();
      // Restaura dados do servidor para o localStorage
      await sincronizarParaLocal();
      const emailAtual = pb.authStore.model?.email || '';
      _temAssinaturaAtiva = emailAtual ? await pbVerificarAssinatura(emailAtual) : false;
    } catch (e) {
      // Token expirado — deslogar
      pbLogout();
      irPara('tela-auth');
      return;
    }

    const perfil = carregarPerfil();
    if (perfil) {
      Object.assign(usuario, perfil);
    }
    abrirFluxoInicial(perfil, modoPlano === 'novo' ? 'criacao' : 'acesso');
  } else {
    irPara('tela-auth');
    if (modoAuth === 'register') {
      mostrarRegistro();
    } else {
      mostrarLogin();
    }
  }
});

/* ============================================================
   AUTENTICAÇÃO
============================================================ */
async function fazerLogin() {
  const email  = document.getElementById('auth-email').value.trim();
  const senha  = document.getElementById('auth-senha').value;
  const erroEl = document.getElementById('auth-erro');
  const btn    = document.querySelector('#auth-login .btn-primario');

  if (!email || !senha) { _mostrarErroAuth(erroEl, 'Preencha e-mail e senha.'); return; }

  btn.textContent = 'Entrando...'; btn.disabled = true;
  erroEl.classList.add('escondido');

  try {
    const temAcesso = true;
    if (!temAcesso) {
      _mostrarErroAuth(erroEl, '❌ Você não possui uma assinatura ativa. Adquira o plano para acessar o app.');
      return;
    }
    await pbLogin(email, senha);
    _temAssinaturaAtiva = await pbVerificarAssinatura(email);
    await sincronizarParaLocal();
    const perfil = carregarPerfil();
    if (perfil) { Object.assign(usuario, perfil); }
    abrirFluxoInicial(perfil);
  } catch (e) {
    _mostrarErroAuth(erroEl, 'E-mail ou senha incorretos. Verifique e tente novamente.');
  } finally {
    btn.textContent = 'Entrar →'; btn.disabled = false;
  }
}

async function fazerRegistro() {
  const nome   = document.getElementById('auth-nome').value.trim();
  const email  = document.getElementById('auth-email-reg').value.trim();
  const senha  = document.getElementById('auth-senha-reg').value;
  const erroEl = document.getElementById('auth-erro-reg');
  const btn    = document.querySelector('#auth-registro .btn-primario');

  if (!nome || !email || !senha) { _mostrarErroAuth(erroEl, 'Preencha todos os campos.'); return; }
  if (senha.length < 8) { _mostrarErroAuth(erroEl, 'Senha deve ter pelo menos 8 caracteres.'); return; }

  btn.textContent = 'Criando conta...'; btn.disabled = true;
  erroEl.classList.add('escondido');

  try {
    const temAcesso = true;
    if (!temAcesso) {
      _mostrarErroAuth(erroEl, '❌ Este e-mail não possui uma assinatura ativa. Adquira o plano para criar sua conta.');
      return;
    }
    await pbRegistrar(email, senha, nome);
    await pbLogin(email, senha);
    _temAssinaturaAtiva = await pbVerificarAssinatura(email);
    usuario.nome = nome;
    const campoNome = document.getElementById('nome');
    if (campoNome) campoNome.value = nome;
    irPara('tela-dados');
  } catch (e) {
    const msg = (e.response?.data?.email)
      ? 'Este e-mail já está em uso.'
      : 'Erro ao criar conta. Tente novamente.';
    _mostrarErroAuth(erroEl, msg);
  } finally {
    btn.textContent = 'Criar conta →'; btn.disabled = false;
  }
}

function fazerLogout() {
  fecharPopupAssinatura();
  if (confirm('Deseja sair da sua conta?')) {
    pbLogout();
    location.reload();
  }
}

function mostrarLogin() {
  document.getElementById('auth-login').classList.remove('escondido');
  document.getElementById('auth-registro').classList.add('escondido');
  document.getElementById('auth-erro').classList.add('escondido');
}

function mostrarRegistro() {
  document.getElementById('auth-login').classList.add('escondido');
  document.getElementById('auth-registro').classList.remove('escondido');
  document.getElementById('auth-erro-reg').classList.add('escondido');
}

function _mostrarErroAuth(el, msg) {
  el.textContent = msg;
  el.classList.remove('escondido');
}

function mostrarBannerPerfil(perfil) {
  const banner = document.getElementById('banner-perfil-salvo');
  if (!banner) return;
  document.getElementById('banner-nome').textContent = perfil.nome.split(' ')[0];
  banner.classList.remove('escondido');
}

function abrirFluxoInicial(perfil, modo = 'acesso') {
  if (perfil && perfil.nome) {
    Object.assign(usuario, perfil);
    gerarCardapio(modo);
    return;
  }

  irPara('tela-dados');
}

function continuarComPerfilSalvo() {
  const perfil = carregarPerfil();
  if (!perfil) return;

  Object.assign(usuario, perfil);
  gerarCardapio();
}

function ignorarPerfilSalvo() {
  document.getElementById('banner-perfil-salvo').classList.add('escondido');
}

/* ============================================================
   NAVEGAÇÃO
============================================================ */
function irPara(idTela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  const alvo = document.getElementById(idTela);
  if (idTela !== 'tela-cardapio') fecharPopupAssinatura();
  if (alvo) { alvo.classList.add('ativa'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
}

/* ============================================================
   DADOS PESSOAIS
============================================================ */
function submitDados(event) {
  event.preventDefault();
  const sexoSelecionado = document.querySelector('input[name="sexo"]:checked');
  if (!sexoSelecionado) { alert('Por favor, selecione seu sexo.'); return; }

  usuario.nome   = document.getElementById('nome').value.trim();
  usuario.peso   = parseFloat(document.getElementById('peso').value);
  usuario.altura = parseFloat(document.getElementById('altura').value);
  usuario.idade  = parseInt(document.getElementById('idade').value);
  usuario.sexo   = sexoSelecionado.value;
  irPara('tela-objetivo');
}

/* ============================================================
   OBJETIVO
============================================================ */
function selecionarObjetivo(valor, elemento) {
  document.querySelectorAll('.card-objetivo').forEach(c => c.classList.remove('selecionado'));
  elemento.classList.add('selecionado');
  usuario.objetivo = valor;
  document.getElementById('btn-continuar-objetivo').disabled = false;
}

/* ============================================================
   CONDIÇÕES DE SAÚDE
============================================================ */
function toggleCondicao(valor, elemento) {
  if (valor === 'nenhum') {
    document.querySelectorAll('.card-saude').forEach(c => c.classList.remove('selecionado'));
    elemento.classList.add('selecionado');
    usuario.condicoes = ['nenhum'];
  } else {
    document.querySelector('[data-condicao="nenhum"]').classList.remove('selecionado');
    usuario.condicoes = usuario.condicoes.filter(c => c !== 'nenhum');
    const idx = usuario.condicoes.indexOf(valor);
    if (idx > -1) { usuario.condicoes.splice(idx, 1); elemento.classList.remove('selecionado'); }
    else { usuario.condicoes.push(valor); elemento.classList.add('selecionado'); }
  }
  document.getElementById('btn-continuar-saude').disabled = usuario.condicoes.length === 0;
}

/* ============================================================
   GERAR CARDÁPIO
============================================================ */
function gerarCardapio(modo = 'criacao') {
  // Salva perfil no localStorage
  salvarPerfil(usuario);
  window._usuarioAtual = usuario;

  cardapioAtual = gerarCardapioCompleto(usuario);

  // Cabeçalho
  document.getElementById('exibe-nome').textContent = usuario.nome;

  const objetivoTexto = { emagrecer: 'Emagrecimento', massa: 'Ganho de massa', manter: 'Manutenção' }[usuario.objetivo] || '';
  const nomesCondicoes = {
    esteatose: 'Esteatose Hepática', diabetes: 'Diabetes', hipertensao: 'Hipertensão',
    colesterol: 'Colesterol Alto', gastrite: 'Gastrite/Refluxo',
    lactose: 'Intolerância à Lactose', celiaca: 'Doença Celíaca', anemia: 'Anemia', nenhum: ''
  };
  const condicoesFiltradas = usuario.condicoes.filter(c => c !== 'nenhum');
  const condicaoTexto = condicoesFiltradas.map(c => nomesCondicoes[c] || c).join(', ');

  document.getElementById('exibe-dados-usuario').textContent =
    `${usuario.peso}kg · ${usuario.altura}cm · ${usuario.idade} anos · ${objetivoTexto}` +
    (condicaoTexto ? ` · ${condicaoTexto}` : '');

  document.getElementById('exibe-calorias').textContent = cardapioAtual.tdee.toLocaleString('pt-BR');
  document.getElementById('exibe-proteina').textContent = cardapioAtual.macros.proteina;
  document.getElementById('exibe-carbo').textContent    = cardapioAtual.macros.carbo;
  document.getElementById('exibe-gordura').textContent  = cardapioAtual.macros.gordura;

  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  document.getElementById('exibe-data').textContent =
    dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);

  exibirAlertaSaude(usuario.condicoes);
  renderizarAgua();
  renderizarRefeicoes(cardapioAtual.refeicoes);
  mostrarTelaCalculando(cardapioAtual, modo);
}

function aplicarBloqueioAssinatura() {
  const tela = document.getElementById('tela-cardapio');
  const camada = document.getElementById('assinatura-camada');
  if (!tela || !camada) return;

  if (_temAssinaturaAtiva) {
    tela.classList.remove('modo-sem-assinatura');
    camada.classList.add('escondido');
    fecharPopupAssinatura();
    return;
  }

  tela.classList.add('modo-sem-assinatura');
  camada.classList.remove('escondido');
  fecharPopupAssinatura();
}

function abrirPopupAssinatura() {
  if (_temAssinaturaAtiva) return;
  const popup = document.getElementById('assinatura-popup');
  if (!popup) return;
  popup.classList.remove('escondido');
  document.body.classList.add('modal-aberto');
}

function fecharPopupAssinatura() {
  const popup = document.getElementById('assinatura-popup');
  if (!popup) return;
  popup.classList.add('escondido');
  document.body.classList.remove('modal-aberto');
}

function irParaAssinatura() {
  const url = window.NUTRISAUDE_ASSINATURA_URL || localStorage.getItem('nutrisaude_assinatura_url') || '#';
  if (url === '#') {
    alert('Link de assinatura ainda nÃ£o configurado.');
    return;
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ============================================================
   ALERTAS DE SAÚDE
============================================================ */
function exibirAlertaSaude(condicoes) {
  const alertaEl = document.getElementById('alerta-saude');
  const mensagens = {
    esteatose:   { titulo: '🫀 Esteatose Hepática', texto: 'Evite gorduras saturadas, frituras, embutidos, açúcares simples, refrigerantes e álcool.' },
    diabetes:    { titulo: '🩸 Diabetes', texto: 'Evite açúcares, mel, carboidratos refinados e bebidas açucaradas. Prefira alimentos de baixo índice glicêmico.' },
    hipertensao: { titulo: '💓 Hipertensão', texto: 'Reduza o sal e evite embutidos, enlatados e temperos industrializados.' },
    colesterol:  { titulo: '🫁 Colesterol Alto', texto: 'Evite gorduras trans, biscoitos industriais e carnes gordurosas.' },
    gastrite:    { titulo: '🫃 Gastrite / Refluxo', texto: 'Evite frituras, alimentos ácidos, café em excesso e refeições pesadas à noite.' },
    lactose:     { titulo: '🥛 Intolerância à Lactose', texto: 'Substitua derivados do leite por versões sem lactose ou bebidas vegetais.' },
    celiaca:     { titulo: '🌾 Doença Celíaca', texto: 'Elimine completamente trigo, cevada, centeio e aveia não certificada.' },
    anemia:      { titulo: '💊 Anemia', texto: 'Priorize carnes magras, feijão, lentilha e combine com vitamina C para absorção do ferro.' }
  };

  const ativas = condicoes.filter(c => c !== 'nenhum' && mensagens[c]);
  if (ativas.length === 0) { alertaEl.classList.add('escondido'); return; }

  alertaEl.classList.remove('escondido');
  document.getElementById('alerta-titulo').textContent =
    `Atenção: ${ativas.length} condição${ativas.length > 1 ? 'ões' : ''} detectada${ativas.length > 1 ? 's' : ''}`;
  document.getElementById('alerta-texto').innerHTML =
    ativas.map(c => `<strong>${mensagens[c].titulo}:</strong> ${mensagens[c].texto}`).join('<br><br>');
}

/* ============================================================
   ÁGUA — tracker de hidratação
============================================================ */
function calcularMetaAgua() {
  return Math.round(usuario.peso * 35); // 35ml por kg
}

function renderizarAgua() {
  const meta = calcularMetaAgua();
  const consumido = carregarAguaHoje();
  const perc = Math.min(100, Math.round((consumido / meta) * 100));

  document.getElementById('agua-meta-texto').textContent = `Meta: ${(meta / 1000).toFixed(1)}L`;
  document.getElementById('agua-consumido').textContent = consumido >= 1000
    ? `${(consumido / 1000).toFixed(2).replace('.', ',')}L`
    : `${consumido}ml`;
  document.getElementById('agua-total').textContent = `${(meta / 1000).toFixed(1)}L`;
  document.getElementById('agua-perc').textContent = `${perc}%`;
  document.getElementById('agua-fill').style.width = `${perc}%`;
  document.getElementById('agua-fill').style.background =
    perc >= 100 ? '#27ae60' : perc >= 60 ? '#2980b9' : '#5dade2';

  // Emoji de feedback
  const emoji = document.getElementById('agua-emoji');
  if (emoji) {
    emoji.textContent = perc >= 100 ? '🏆' : perc >= 60 ? '💧' : perc >= 30 ? '🌊' : '😅';
  }
}

function adicionarAgua(ml) {
  const atual = carregarAguaHoje();
  const meta  = calcularMetaAgua();
  const novo  = Math.min(atual + ml, meta * 2); // limite em 2x a meta
  salvarAgua(novo);
  renderizarAgua();

  // Animação de feedback
  const btn = event.currentTarget;
  btn.classList.add('agua-btn-ativo');
  setTimeout(() => btn.classList.remove('agua-btn-ativo'), 300);
}

function removerAgua(ml) {
  const atual = carregarAguaHoje();
  salvarAgua(Math.max(0, atual - ml));
  renderizarAgua();
}

function zerarAgua() {
  if (confirm('Zerar o registro de água do dia?')) {
    salvarAgua(0);
    renderizarAgua();
  }
}

/* ============================================================
   REFEIÇÕES COM CHECK-IN E SUBSTITUIÇÕES
============================================================ */
function renderizarRefeicoes(refeicoes) {
  const container = document.getElementById('lista-refeicoes');
  container.innerHTML = '';

  const checkins = carregarCheckins();

  refeicoes.forEach((refeicao, index) => {
    const feito = !!checkins[refeicao.chave];
    const horarioFeito = checkins[refeicao.chave] || '';

    const alertasNaRefeicao = refeicao.itens
      .map(item => verificarAlerta(item.nome, usuario.condicoes))
      .filter(Boolean);
    const temAlerta = alertasNaRefeicao.length > 0;

    const itensHTML = refeicao.itens.map((item, itemIdx) => {
      const alerta = verificarAlerta(item.nome, usuario.condicoes);
      const temGrupo = item.grupoId && GRUPOS_SUBSTITUICAO[item.grupoId];
      const substituicoes = temGrupo ? obterSubstituicoes(item.grupoId, item.indiceNoGrupo) : [];
      const temSub = substituicoes.length > 0;
      const idUnico = `sub-${refeicao.chave}-${itemIdx}`;
      const receita = (typeof obterReceita === 'function') ? obterReceita(item.nome) : null;
      const idReceita = `rec-${refeicao.chave}-${itemIdx}`;

      return `
        <li class="item-alimento ${temSub ? 'item-clicavel' : ''}"
            ${temSub ? `onclick="toggleSubstituicao('${idUnico}', event)"` : ''}>
          <div class="item-principal">
            <span class="item-nome">
              ${alerta ? '⚠️ ' : ''}${item.nome}
              ${temSub ? '<span class="item-trocar" title="Ver substituições">🔄</span>' : ''}
            </span>
            <span>
              <span class="item-quantidade">${item.quantidade}</span>
              ${alerta ? `<span class="item-alerta"> · ${alerta}</span>` : ''}
            </span>
          </div>
          ${temSub ? `
            <div id="${idUnico}" class="painel-substituicao escondido">
              <div class="sub-titulo">
                <span>🔄 Substituições para <strong>${item.nome}</strong></span>
                <span class="sub-grupo">${item.grupoNome}</span>
              </div>
              <ul class="sub-lista">
                ${substituicoes.map(sub => {
                  const alertaSub = verificarAlerta(sub.nome, usuario.condicoes);
                  return `
                    <li class="sub-item ${alertaSub ? 'sub-item-alerta' : ''}"
                        onclick="trocarAlimento('${refeicao.chave}', ${itemIdx}, '${item.grupoId}', ${sub.indice}, event)">
                      <span class="sub-nome">${alertaSub ? '⚠️ ' : ''}${sub.nome}</span>
                      <span class="sub-quantidade">${sub.quantidade}</span>
                      <span class="sub-macros">${sub.calorias}kcal · P:${sub.proteina}g · C:${sub.carbo}g · G:${sub.gordura}g</span>
                      ${alertaSub ? `<span class="sub-aviso">${alertaSub}</span>` : ''}
                    </li>`;
                }).join('')}
              </ul>
            </div>
          ` : ''}
          ${receita ? `
            <button class="btn-receita" onclick="toggleReceita('${idReceita}', event)">
              👨‍🍳 Como preparar
            </button>
            <div id="${idReceita}" class="painel-receita escondido">
              <div class="receita-header">
                <span class="receita-nome-titulo">👨‍🍳 ${item.nome}</span>
                <span class="receita-tempo">⏱ ${receita.tempo}</span>
              </div>
              <div class="receita-section">
                <strong>Ingredientes (${receita.porcao}):</strong>
                <ul class="receita-ingredientes-lista">
                  ${receita.ingredientes.map(i => `<li>${i}</li>`).join('')}
                </ul>
              </div>
              <div class="receita-section">
                <strong>Modo de preparo:</strong>
                <ol class="receita-preparo-lista">
                  ${receita.preparo.map(p => `<li>${p}</li>`).join('')}
                </ol>
              </div>
              ${receita.dica ? `<div class="receita-dica">💡 <strong>Dica:</strong> ${receita.dica}</div>` : ''}
            </div>
          ` : ''}
        </li>`;
    }).join('');

    const card = document.createElement('div');
    card.className = `refeicao-card ${feito ? 'refeicao-feita' : ''}`;
    const cor = COR_REFEICAO[refeicao.chave] || '#00c472';
    card.style.setProperty('--cor-refeicao', cor);
    card.innerHTML = `
      <button class="refeicao-header" onclick="toggleRefeicao(this.parentElement)" aria-expanded="false">
        <span class="refeicao-icone">${refeicao.icone}</span>
        <div class="refeicao-info">
          <div class="refeicao-nome">${refeicao.nome}${temAlerta ? ' ⚠️' : ''}</div>
          <div class="refeicao-horario">${refeicao.horario}</div>
        </div>
        <span class="refeicao-kcal">~${refeicao.calorias} kcal</span>
        ${feito
          ? `<span class="checkin-feito" onclick="desmarcarRefeicao('${refeicao.chave}', event)" title="Clique para desmarcar">✅ ${horarioFeito}</span>`
          : `<span class="checkin-btn" onclick="marcarRefeicaoFeita('${refeicao.chave}', event)">Marcar ✓</span>`
        }
        <span class="refeicao-seta">▼</span>
      </button>
      <div class="refeicao-conteudo">
        ${temAlerta ? `<div class="alerta-alimento">⚠️ Esta refeição contém alimentos que pedem atenção para sua condição de saúde.</div>` : ''}
        <ul class="lista-alimentos">${itensHTML}</ul>
        <div class="macros-refeicao">
          <span class="macro-badge proteina">🥩 ${refeicao.macros.proteina}g proteína</span>
          <span class="macro-badge carbo">🌾 ${refeicao.macros.carbo}g carb.</span>
          <span class="macro-badge gordura">🫒 ${refeicao.macros.gordura}g gordura</span>
        </div>
      </div>`;

    if (index === 0) {
      card.classList.add('aberto');
      card.querySelector('.refeicao-header').setAttribute('aria-expanded', 'true');
    }
    container.appendChild(card);
  });

  atualizarContadorCheckins();
}

function marcarRefeicaoFeita(chave, event) {
  event.stopPropagation();
  marcarRefeicao(chave, true);
  renderizarRefeicoes(cardapioAtual.refeicoes);
}

function desmarcarRefeicao(chave, event) {
  event.stopPropagation();
  if (confirm('Desmarcar esta refeição?')) {
    marcarRefeicao(chave, false);
    renderizarRefeicoes(cardapioAtual.refeicoes);
  }
}

function atualizarContadorCheckins() {
  const checkins = carregarCheckins();
  const refeicoes = cardapioAtual?.refeicoes || [];
  const total = refeicoes.length;
  const feitas = refeicoes.filter(r => checkins[r.chave]).length;

  const el = document.getElementById('contador-checkins');
  if (el) el.textContent = `${feitas}/${total}`;

  const fillEl = document.getElementById('dia-progresso-fill');
  if (fillEl) fillEl.style.width = total > 0 ? `${(feitas/total)*100}%` : '0%';

  const dotsEl = document.getElementById('dia-progresso-dots');
  if (dotsEl && refeicoes.length > 0) {
    dotsEl.innerHTML = refeicoes.map(r =>
      `<div class="prog-dot ${checkins[r.chave] ? 'feito' : 'pendente'}" title="${r.nome}"></div>`
    ).join('');
  }

  if (feitas === total && total > 0) dispararConfete();
}

/* ============================================================
   SUBSTITUIÇÕES
============================================================ */
function toggleSubstituicao(id, event) {
  event.stopPropagation();
  const painel = document.getElementById(id);
  if (!painel) return;
  document.querySelectorAll('.painel-substituicao:not(.escondido)').forEach(p => {
    if (p.id !== id) p.classList.add('escondido');
  });
  painel.classList.toggle('escondido');
}

function trocarAlimento(refeicaoChave, itemIdx, grupoId, novoIndice, event) {
  event.stopPropagation();
  const grupo = GRUPOS_SUBSTITUICAO[grupoId];
  if (!grupo) return;

  const novoItem = grupo.itens[novoIndice];
  const refeicao = cardapioAtual.refeicoes.find(r => r.chave === refeicaoChave);
  if (!refeicao) return;

  const caloriasBase = refeicao.itens.reduce((s, i) => s + i.calorias, 0);
  const fator = caloriasBase > 0 ? refeicao.calorias / caloriasBase : 1;

  refeicao.itens[itemIdx] = {
    ...novoItem,
    grupoId, grupoNome: grupo.nome, indiceNoGrupo: novoIndice,
    caloriasAjustadas:  Math.round(novoItem.calorias  * fator),
    proteinaAjustada:   Math.round(novoItem.proteina   * fator),
    carboAjustado:      Math.round(novoItem.carbo      * fator),
    gorduraAjustada:    Math.round(novoItem.gordura    * fator)
  };
  refeicao.macros = refeicao.itens.reduce(
    (acc, i) => ({ proteina: acc.proteina + (i.proteinaAjustada || 0), carbo: acc.carbo + (i.carboAjustado || 0), gordura: acc.gordura + (i.gorduraAjustada || 0) }),
    { proteina: 0, carbo: 0, gordura: 0 }
  );
  renderizarRefeicoes(cardapioAtual.refeicoes);
}

/* ============================================================
   TOGGLE REFEIÇÃO
============================================================ */
function toggleRefeicao(card) {
  const estaAberto = card.classList.contains('aberto');
  card.classList.toggle('aberto');
  card.querySelector('.refeicao-header').setAttribute('aria-expanded', String(!estaAberto));
}

/* ============================================================
   ABAS
============================================================ */
function mostrarAba(aba, botao) {
  document.querySelectorAll('.aba').forEach(b => b.classList.remove('ativa'));
  botao.classList.add('ativa');

  document.getElementById('conteudo-cardapio').classList.toggle('escondido',     aba !== 'cardapio');
  document.getElementById('conteudo-semana').classList.toggle('escondido',        aba !== 'semana');
  document.getElementById('conteudo-progresso').classList.toggle('escondido',     aba !== 'progresso');
  document.getElementById('conteudo-ingredientes').classList.toggle('escondido',  aba !== 'ingredientes');
  const saudeEl = document.getElementById('conteudo-saude');
  if (saudeEl) saudeEl.classList.toggle('escondido', aba !== 'saude');

  if (aba === 'semana')    renderizarPlanoSemanal(usuario);
  if (aba === 'progresso') renderizarProgresso(usuario);
}

function trocarAba(nomeAba, botao) {
  mostrarAba(nomeAba, botao);
  if (nomeAba === 'saude') iniciarSaude();
}

/* ============================================================
   INGREDIENTES
============================================================ */
let filtroRefeicaoIngredientes = 'todas';

function setFiltroRefeicao(valor, botao) {
  filtroRefeicaoIngredientes = valor;
  document.querySelectorAll('.filtro-refeicao-btn').forEach(b => b.classList.remove('ativo'));
  botao.classList.add('ativo');
  if (ingredientesEmCasa.length > 0) buscarReceitas();
}

function adicionarIngrediente() {
  const input = document.getElementById('input-ingrediente');
  const valor = input.value.trim();
  if (!valor) return;
  if (ingredientesEmCasa.some(i => i.toLowerCase() === valor.toLowerCase())) { input.value = ''; return; }
  ingredientesEmCasa.push(valor);
  input.value = '';
  renderizarIngredientes();
  document.getElementById('btn-buscar-receitas').style.display = 'block';
}

function removerIngrediente(nome) {
  const idx = ingredientesEmCasa.indexOf(nome);
  if (idx > -1) ingredientesEmCasa.splice(idx, 1);
  renderizarIngredientes();
  document.getElementById('btn-buscar-receitas').style.display = ingredientesEmCasa.length > 0 ? 'block' : 'none';
  if (ingredientesEmCasa.length === 0) document.getElementById('resultado-receitas').classList.add('escondido');
}

function renderizarIngredientes() {
  const container = document.getElementById('lista-ingredientes-adicionados');
  container.innerHTML = ingredientesEmCasa.map(nome => `
    <span class="tag-ingrediente">${nome}
      <button onclick="removerIngrediente('${nome.replace(/'/g, "\\'")}')" title="Remover">×</button>
    </span>`).join('');
}

const NOMES_REFEICAO = {
  cafe: 'Café da manhã', lanche: 'Lanche', almoco: 'Almoço', jantar: 'Jantar', ceia: 'Ceia'
};

function buscarReceitas() {
  if (ingredientesEmCasa.length === 0) return;
  const resultadoEl = document.getElementById('resultado-receitas');
  let receitas = buscarReceitasPorIngredientes(ingredientesEmCasa, usuario.condicoes);

  if (filtroRefeicaoIngredientes !== 'todas') {
    receitas = receitas.filter(r => r.refeicao === filtroRefeicaoIngredientes);
  }

  if (receitas.length === 0) {
    const filtroTexto = filtroRefeicaoIngredientes !== 'todas' ? ` para ${NOMES_REFEICAO[filtroRefeicaoIngredientes]}` : '';
    resultadoEl.innerHTML = `<div style="text-align:center;padding:2rem;color:#7f8c8d"><p style="font-size:2rem">🥺</p><p>Sem receitas${filtroTexto} com esses ingredientes.</p></div>`;
    resultadoEl.classList.remove('escondido');
    return;
  }

  resultadoEl.innerHTML = `
    <h3 style="margin-bottom:1rem;font-size:1rem;color:#27ae60">✅ ${receitas.length} receita${receitas.length > 1 ? 's' : ''} encontrada${receitas.length > 1 ? 's' : ''}</h3>
    ${receitas.map(r => {
      const alertaReceita = r.alertas ? usuario.condicoes.map(c => r.alertas[c]).filter(Boolean)[0] || null : null;
      return `<div class="receita-card">
        <div class="receita-titulo">${r.icone} ${r.nome}
          <span class="receita-correspondencia">${r.correspondencias.length}/${r.ingredientes.length} ingredientes</span>
          <span class="receita-refeicao-tag">${NOMES_REFEICAO[r.refeicao] || r.refeicao}</span>
        </div>
        <div class="receita-ingredientes"><strong>Ingredientes:</strong> ${r.ingredientes.join(', ')}</div>
        <div class="receita-modo">${r.modo}</div>
        ${alertaReceita ? `<div class="receita-alerta">⚠️ ${alertaReceita}</div>` : ''}
        <div class="macros-refeicao" style="margin-top:0.75rem">
          <span class="macro-badge proteina">🥩 ${r.proteina}g prot.</span>
          <span class="macro-badge carbo">🌾 ${r.carbo}g carb.</span>
          <span class="macro-badge gordura">🫒 ${r.gordura}g gord.</span>
          <span style="font-size:0.75rem;color:#7f8c8d;align-self:center">~${r.calorias} kcal</span>
        </div>
      </div>`;
    }).join('')}`;
  resultadoEl.classList.remove('escondido');
}

/* ============================================================
   TELA DE CARREGAMENTO ANIMADA
============================================================ */
function mostrarTelaCalculando(cardapio, modo = 'criacao') {
  irPara('tela-calculando');
  const fill = document.getElementById('calc-barra-fill');
  const passos = ['cp1','cp2','cp3','cp4','cp5'];
  const delays = [300, 650, 1050, 1450, 1850];
  const percents = ['20%','40%','60%','80%','100%'];
  const tituloEl = document.querySelector('.calc-titulo');
  const subEl = document.querySelector('.calc-sub');

  const textos = modo === 'acesso'
    ? {
        titulo: 'Acessando seu plano ideal...',
        sub: 'Carregando seu plano personalizado',
        passos: [
          'Validando seu perfil salvo',
          'Carregando calorias e macros',
          'Recuperando alimentos ideais',
          'Aplicando restrições de saúde',
          'Abrindo seu cardápio'
        ]
      }
    : {
        titulo: 'Calculando seu plano...',
        sub: 'Personalizando para o seu corpo',
        passos: [
          'Analisando seu perfil',
          'Calculando calorias e macros',
          'Selecionando alimentos ideais',
          'Verificando restrições de saúde',
          'Montando seu cardápio'
        ]
      };

  if (tituloEl) tituloEl.textContent = textos.titulo;
  if (subEl) subEl.textContent = textos.sub;

  passos.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('ativo', 'feito');
      const icone = el.querySelector('.calc-passo-icone');
      if (icone) icone.textContent = '⏳';
      const textoNode = el.childNodes[1];
      if (textoNode) textoNode.textContent = textos.passos[i];
    }
  });

  if (fill) fill.style.width = '0%';

  passos.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('ativo');
        if (fill) fill.style.width = percents[i];
      }
    }, delays[i]);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('ativo');
        el.classList.add('feito');
        const icone = el.querySelector('.calc-passo-icone');
        if (icone) icone.textContent = '✓';
      }
    }, delays[i] + 280);
  });

  setTimeout(() => {
    irPara('tela-cardapio');
    aplicarBloqueioAssinatura();
  }, 2500);
}

/* ============================================================
   CONFETE
============================================================ */
function dispararConfete() {
  const container = document.getElementById('confete-container');
  if (!container || container._disparado) return;
  container._disparado = true;
  container.innerHTML = '';
  container.classList.remove('escondido');

  const cores = ['#00c472','#3b82f6','#f97316','#8b5cf6','#fbbf24','#ef4444','#4ade80'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    p.className = 'confete-p';
    p.style.cssText = `
      left:${Math.random()*100}%;
      background:${cores[Math.floor(Math.random()*cores.length)]};
      width:${Math.random()*8+4}px;
      height:${Math.random()*10+5}px;
      animation-delay:${Math.random()*0.8}s;
      animation-duration:${Math.random()*1.5+1.5}s;
      border-radius:${Math.random()>0.5?'50%':'3px'};
      transform:rotate(${Math.random()*360}deg);
    `;
    container.appendChild(p);
  }
  setTimeout(() => {
    container.classList.add('escondido');
    container._disparado = false;
  }, 4000);
}

/* ============================================================
   TOGGLE RECEITA
============================================================ */
function toggleReceita(id, event) {
  event.stopPropagation();
  const painel = document.getElementById(id);
  if (!painel) return;
  document.querySelectorAll('.painel-receita:not(.escondido)').forEach(p => {
    if (p.id !== id) p.classList.add('escondido');
  });
  painel.classList.toggle('escondido');
}

/* ============================================================
   RECOMEÇAR
============================================================ */
function recomecar() {
  if (!confirm('Isso vai limpar seu perfil salvo. Deseja continuar?')) return;

  Object.keys(usuario).forEach(k => usuario[k] = '');
  usuario.condicoes = [];
  ingredientesEmCasa.length = 0;
  cardapioAtual = null;

  limparPerfil();

  document.getElementById('form-dados').reset();
  document.querySelectorAll('.card-objetivo, .card-saude').forEach(c => c.classList.remove('selecionado'));
  document.getElementById('btn-continuar-objetivo').disabled = true;
  document.getElementById('btn-continuar-saude').disabled    = true;
  document.getElementById('lista-ingredientes-adicionados').innerHTML = '';
  document.getElementById('resultado-receitas').classList.add('escondido');
  document.getElementById('btn-buscar-receitas').style.display = 'none';

  irPara('tela-boas-vindas');
}
