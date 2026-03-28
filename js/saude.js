/* ============================================================
   saude.js — Diário de sintomas, exames, medicamentos e PDF
============================================================ */

/* ---------- ESTADO DO DIÁRIO ---------- */
const estadoDiario = { energia: 0, figado: 0, inchaco: 0, sono: 0 };

function iniciarSaude() {
  const hoje = new Date().toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });
  const el = document.getElementById('diario-data');
  if (el) el.textContent = hoje.charAt(0).toUpperCase() + hoje.slice(1);

  // Carrega diário de hoje se existir
  carregarDiarioHoje();
  renderizarExames();
  renderizarRemedios();
  iniciarVerificadorRemedios();
}

/* ---------- DIÁRIO DE SINTOMAS ---------- */
function setEscala(campo, valor, btn) {
  estadoDiario[campo] = valor;
  const container = document.getElementById(`scale-${campo}`);
  if (!container) return;
  container.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
}

function salvarDiarioHoje() {
  const hoje = new Date().toISOString().split('T')[0];
  const glicemia = document.getElementById('diario-glicemia')?.value;
  const notas = document.getElementById('diario-notas')?.value;

  const entrada = {
    data: hoje,
    energia: estadoDiario.energia,
    figado: estadoDiario.figado,
    inchaco: estadoDiario.inchaco,
    sono: estadoDiario.sono,
    glicemia: glicemia ? parseFloat(glicemia) : null,
    notas: notas || ''
  };

  const dados = carregarDados();
  if (!dados.diario) dados.diario = {};
  dados.diario[hoje] = entrada;
  salvarDados(dados);

  mostrarToast('✅ Registro salvo com sucesso!', 'verde');
  renderizarHistoricoDiario();
}

function carregarDiarioHoje() {
  const hoje = new Date().toISOString().split('T')[0];
  const dados = carregarDados();
  const entrada = dados.diario?.[hoje];
  if (!entrada) return;

  // Restaura valores
  ['energia','figado','inchaco','sono'].forEach(campo => {
    if (entrada[campo]) {
      const btn = document.querySelector(`#scale-${campo} [data-val="${entrada[campo]}"]`);
      if (btn) { estadoDiario[campo] = entrada[campo]; btn.classList.add('ativo'); }
    }
  });
  if (entrada.glicemia) document.getElementById('diario-glicemia').value = entrada.glicemia;
  if (entrada.notas)    document.getElementById('diario-notas').value = entrada.notas;

  renderizarHistoricoDiario();
}

function renderizarHistoricoDiario() {
  const dados = carregarDados();
  const diario = dados.diario || {};
  const wrapper = document.getElementById('historico-diario-wrapper');
  const lista = document.getElementById('historico-diario-lista');
  if (!wrapper || !lista) return;

  const entradas = Object.values(diario).sort((a,b) => b.data.localeCompare(a.data)).slice(0,7);
  if (entradas.length === 0) return;

  wrapper.classList.remove('escondido');

  const energiaEmoji = [,'😴','😔','😐','😊','🤩'];
  const figadoTexto = ['✅','😕','😣','😫'];
  const sonoEmoji  = [,'😫','😔','😐','😊','😍'];

  lista.innerHTML = entradas.map(e => {
    const data = new Date(e.data + 'T12:00:00').toLocaleDateString('pt-BR', { day:'2-digit', month:'short' });
    return `
      <div class="diario-historico-item">
        <span class="diario-hist-data">${data}</span>
        <span title="Energia">${energiaEmoji[e.energia] || '—'}</span>
        <span title="Fígado">${figadoTexto[e.figado] || '—'}</span>
        <span title="Sono">${sonoEmoji[e.sono] || '—'}</span>
        ${e.glicemia ? `<span class="diario-hist-glicemia">🩸${e.glicemia}</span>` : ''}
        ${e.notas ? `<span class="diario-hist-nota" title="${e.notas}">📝</span>` : ''}
      </div>`;
  }).join('');
}

/* ---------- EXAMES ---------- */
const EXAMES_CONFIG = {
  ast:             { nome:'AST (TGO)', unidade:'U/L', refMin:0, refMax:40, dica:'Enzima hepática. Normal: até 40 U/L' },
  alt:             { nome:'ALT (TGP)', unidade:'U/L', refMin:0, refMax:56, dica:'Enzima hepática. Normal: até 56 U/L' },
  glicemia:        { nome:'Glicemia jejum', unidade:'mg/dL', refMin:70, refMax:99, dica:'Normal: 70-99 mg/dL. Pré-diabetes: 100-125' },
  hba1c:           { nome:'HbA1c', unidade:'%', refMin:0, refMax:5.7, dica:'Normal: abaixo de 5.7%. Pré-diabetes: 5.7-6.4%' },
  colesterol_total:{ nome:'Colesterol Total', unidade:'mg/dL', refMin:0, refMax:200, dica:'Desejável: abaixo de 200 mg/dL' },
  ldl:             { nome:'LDL', unidade:'mg/dL', refMin:0, refMax:130, dica:'Ótimo: abaixo de 100. Normal: até 130 mg/dL' },
  hdl:             { nome:'HDL', unidade:'mg/dL', refMin:40, refMax:9999, dica:'Protetor. Homens: acima de 40. Mulheres: acima de 50' },
  triglicerideos:  { nome:'Triglicerídeos', unidade:'mg/dL', refMin:0, refMax:150, dica:'Normal: abaixo de 150 mg/dL' }
};

function preencherUnidade() {
  const tipo = document.getElementById('exame-tipo').value;
  const unidadeEl = document.getElementById('exame-unidade');
  const customCampo = document.getElementById('exame-nome-custom-campo');
  if (tipo === 'outro') {
    unidadeEl.removeAttribute('readonly');
    unidadeEl.value = '';
    customCampo.style.display = 'block';
  } else {
    unidadeEl.setAttribute('readonly','');
    unidadeEl.value = EXAMES_CONFIG[tipo]?.unidade || '';
    customCampo.style.display = 'none';
  }
}

function abrirModalExame() {
  document.getElementById('modal-exame').classList.remove('escondido');
  document.getElementById('exame-data').value = new Date().toISOString().split('T')[0];
}
function fecharModalExame() {
  document.getElementById('modal-exame').classList.add('escondido');
}

function salvarExame() {
  const tipo = document.getElementById('exame-tipo').value;
  const valor = parseFloat(document.getElementById('exame-valor').value);
  const data  = document.getElementById('exame-data').value;
  if (!tipo || isNaN(valor) || !data) { mostrarToast('Preencha todos os campos!','vermelho'); return; }

  const nomeCustom = document.getElementById('exame-nome-custom')?.value;
  const unidade    = document.getElementById('exame-unidade').value;

  const dados = carregarDados();
  if (!dados.exames) dados.exames = [];
  dados.exames.push({ tipo, nome: tipo === 'outro' ? nomeCustom : EXAMES_CONFIG[tipo]?.nome, valor, unidade, data, id: Date.now() });
  dados.exames.sort((a,b) => b.data.localeCompare(a.data));
  salvarDados(dados);

  fecharModalExame();
  renderizarExames();
  mostrarToast('✅ Exame salvo!','verde');
}

function deletarExame(id) {
  if (!confirm('Remover este exame?')) return;
  const dados = carregarDados();
  dados.exames = (dados.exames || []).filter(e => e.id !== id);
  salvarDados(dados);
  renderizarExames();
}

function renderizarExames() {
  const dados = carregarDados();
  const exames = dados.exames || [];
  const container = document.getElementById('exames-lista');
  if (!container) return;

  if (exames.length === 0) {
    container.innerHTML = '<p class="saude-vazio">Nenhum exame registrado ainda.</p>';
    return;
  }

  // Agrupa por tipo para mostrar o mais recente + tendência
  const porTipo = {};
  exames.forEach(e => {
    if (!porTipo[e.tipo]) porTipo[e.tipo] = [];
    porTipo[e.tipo].push(e);
  });

  container.innerHTML = Object.entries(porTipo).map(([tipo, lista]) => {
    const ultimo = lista[0];
    const anterior = lista[1];
    const config = EXAMES_CONFIG[tipo];
    let status = 'normal', statusTxt = 'Normal';
    if (config) {
      if (tipo === 'hdl') {
        status = ultimo.valor < config.refMin ? 'alto' : 'normal';
        statusTxt = ultimo.valor < config.refMin ? 'Abaixo do ideal' : 'Normal';
      } else {
        if (ultimo.valor > config.refMax * 1.3) { status='alto'; statusTxt='Alto'; }
        else if (ultimo.valor > config.refMax) { status='atencao'; statusTxt='Atenção'; }
      }
    }
    const tendencia = anterior ? (ultimo.valor < anterior.valor ? '↓' : ultimo.valor > anterior.valor ? '↑' : '→') : '';
    const dataFmt = new Date(ultimo.data+'T12:00:00').toLocaleDateString('pt-BR');
    return `
      <div class="exame-card exame-${status}">
        <div class="exame-info">
          <span class="exame-nome">${ultimo.nome}</span>
          <span class="exame-valor-badge exame-badge-${status}">${ultimo.valor} ${ultimo.unidade} ${tendencia}</span>
        </div>
        <div class="exame-rodape">
          <span class="exame-data">${dataFmt}</span>
          <span class="exame-status-txt">${statusTxt}</span>
          ${config ? `<span class="exame-ref">Ref: ${tipo==='hdl'?'>'+config.refMin:'<'+config.refMax} ${ultimo.unidade}</span>` : ''}
          <button class="btn-exame-del" onclick="deletarExame(${ultimo.id})">🗑</button>
        </div>
        ${config ? `<p class="exame-dica">${config.dica}</p>` : ''}
      </div>`;
  }).join('');
}

/* ---------- MEDICAMENTOS ---------- */
function abrirModalRemedio() {
  document.getElementById('modal-remedio').classList.remove('escondido');
  solicitarPermissaoNotificacao();
}
function fecharModalRemedio() {
  document.getElementById('modal-remedio').classList.add('escondido');
}

function solicitarPermissaoNotificacao() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function salvarRemedio() {
  const nome = document.getElementById('remedio-nome').value.trim();
  const dose = document.getElementById('remedio-dose').value.trim();
  const obs  = document.getElementById('remedio-obs').value.trim();
  if (!nome) { mostrarToast('Informe o nome do medicamento','vermelho'); return; }

  const horarios = ['h1','h2','h3','h4']
    .map(id => document.getElementById(id)?.value)
    .filter(h => h && h.trim() !== '');

  if (horarios.length === 0) { mostrarToast('Adicione pelo menos um horário','vermelho'); return; }

  const dados = carregarDados();
  if (!dados.remedios) dados.remedios = [];
  dados.remedios.push({ id: Date.now(), nome, dose, horarios, obs, ativo: true });
  salvarDados(dados);

  fecharModalRemedio();
  // Limpa campos
  ['remedio-nome','remedio-dose','remedio-obs','h1','h2','h3','h4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  renderizarRemedios();
  mostrarToast('💊 Medicamento salvo! Você será notificado no horário.','verde');
}

function deletarRemedio(id) {
  if (!confirm('Remover este medicamento?')) return;
  const dados = carregarDados();
  dados.remedios = (dados.remedios || []).filter(r => r.id !== id);
  salvarDados(dados);
  renderizarRemedios();
}

function renderizarRemedios() {
  const dados = carregarDados();
  const remedios = dados.remedios || [];
  const container = document.getElementById('remedios-lista');
  if (!container) return;

  if (remedios.length === 0) {
    container.innerHTML = '<p class="saude-vazio">Nenhum medicamento cadastrado ainda.</p>';
    return;
  }

  const agora = new Date();
  const hhmm = `${String(agora.getHours()).padStart(2,'0')}:${String(agora.getMinutes()).padStart(2,'0')}`;

  container.innerHTML = remedios.map(r => {
    const proximoHorario = r.horarios
      .map(h => ({ h, diff: h >= hhmm ? h : '99:99' }))
      .sort((a,b) => a.h.localeCompare(b.h))[0]?.h;
    const isProximo = proximoHorario && proximoHorario !== '99:99';
    return `
      <div class="remedio-card ${isProximo?'remedio-proximo':''}">
        <div class="remedio-info">
          <div class="remedio-icone">💊</div>
          <div class="remedio-detalhe">
            <span class="remedio-nome">${r.nome}</span>
            ${r.dose ? `<span class="remedio-dose">${r.dose}</span>` : ''}
            ${r.obs ? `<span class="remedio-obs-txt">${r.obs}</span>` : ''}
          </div>
        </div>
        <div class="remedio-horarios">
          ${r.horarios.map(h => `
            <span class="remedio-horario-badge ${h === hhmm?'badge-agora':''}">${h}</span>
          `).join('')}
          <button class="btn-exame-del" onclick="deletarRemedio(${r.id})">🗑</button>
        </div>
      </div>`;
  }).join('');
}

/* ---------- VERIFICADOR DE REMÉDIOS (roda a cada minuto) ---------- */
let _remediosJaNotificados = {};

function iniciarVerificadorRemedios() {
  verificarRemedios();
  setInterval(verificarRemedios, 60000); // verifica a cada minuto
}

function verificarRemedios() {
  const dados = carregarDados();
  const remedios = dados.remedios || [];
  if (remedios.length === 0) return;

  const agora = new Date();
  const hhmm = `${String(agora.getHours()).padStart(2,'0')}:${String(agora.getMinutes()).padStart(2,'0')}`;
  const hoje  = agora.toISOString().split('T')[0];
  const chaveBase = `${hoje}_${hhmm}`;

  remedios.forEach(r => {
    if (!r.ativo) return;
    r.horarios.forEach(horario => {
      const chave = `${chaveBase}_${r.id}_${horario}`;
      if (horario === hhmm && !_remediosJaNotificados[chave]) {
        _remediosJaNotificados[chave] = true;
        dispararNotificacaoRemedio(r, horario);
      }
    });
  });
}

function dispararNotificacaoRemedio(remedio, horario) {
  // Notificação do browser
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('💊 Hora do remédio!', {
      body: `${remedio.nome}${remedio.dose ? ' — ' + remedio.dose : ''}\n${remedio.obs || ''}`,
      tag: `remedio_${remedio.id}_${horario}`,
      requireInteraction: true
    });
  }

  // Alerta visual dentro do app (funciona mesmo sem permissão de notificação)
  mostrarAlertaRemedio(remedio, horario);
}

function mostrarAlertaRemedio(remedio, horario) {
  const container = document.getElementById('alerta-remedio-container');
  if (!container) return;

  const alerta = document.createElement('div');
  alerta.className = 'alerta-remedio-popup';
  alerta.innerHTML = `
    <div class="alerta-remedio-icone">💊</div>
    <div class="alerta-remedio-texto">
      <strong>${remedio.nome}</strong>
      <span>${remedio.dose || ''} — ${horario}</span>
      ${remedio.obs ? `<small>${remedio.obs}</small>` : ''}
    </div>
    <button onclick="this.parentElement.remove()">✕</button>
  `;
  container.appendChild(alerta);
  setTimeout(() => alerta.remove(), 30000);
}

/* ---------- RELATÓRIO PDF ---------- */
function gerarRelatorio() {
  const dados = carregarDados();
  const perfil = dados.perfil || {};
  const peso = dados.historicoPeso || [];
  const exames = dados.exames || [];
  const remedios = dados.remedios || [];
  const diario = dados.diario || {};

  const hoje = new Date().toLocaleDateString('pt-BR');
  const pesoAtual = peso.length > 0 ? peso[peso.length-1].peso : perfil.peso || '—';
  const pesoInicial = peso.length > 0 ? peso[0].peso : perfil.peso || '—';
  const variacao = (peso.length > 1) ? (peso[peso.length-1].peso - peso[0].peso).toFixed(1) : '—';

  // Adesão ao plano (últimos 7 dias)
  const checkins = dados.checkins || {};
  const ultimos7 = Object.keys(checkins).slice(-7);
  const totalCheckins = ultimos7.reduce((s, d) => s + Object.keys(checkins[d]||{}).length, 0);
  const adesao = ultimos7.length > 0 ? Math.round((totalCheckins / (ultimos7.length * 6)) * 100) : 0;

  // Diário resumo (últimos 7 dias)
  const ultDiario = Object.values(diario).sort((a,b)=>b.data.localeCompare(a.data)).slice(0,7);
  const energiaMedia = ultDiario.length > 0
    ? (ultDiario.reduce((s,d)=>s+(d.energia||0),0)/ultDiario.filter(d=>d.energia).length).toFixed(1)
    : '—';

  const html = `
    <!DOCTYPE html><html lang="pt-BR"><head>
    <meta charset="UTF-8">
    <title>Relatório NutriSaúde — ${perfil.nome || 'Paciente'}</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box; }
      body { font-family: 'Segoe UI', sans-serif; color: #1e293b; background: #fff; padding: 2rem; }
      .cabecalho { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #00c472; padding-bottom: 1rem; margin-bottom: 1.5rem; }
      .logo { font-size: 1.5rem; font-weight: 900; color: #00c472; }
      .data-rel { font-size: 0.85rem; color: #64748b; }
      h2 { font-size: 1.1rem; font-weight: 800; margin: 1.5rem 0 0.75rem; color: #0f172a; border-left: 4px solid #00c472; padding-left: 0.75rem; }
      .grid-info { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-bottom: 1rem; }
      .info-card { background: #f8fafc; border-radius: 10px; padding: 0.75rem; text-align: center; border: 1px solid #e2e8f0; }
      .info-num { font-size: 1.5rem; font-weight: 900; color: #00c472; }
      .info-label { font-size: 0.72rem; color: #64748b; margin-top: 0.2rem; }
      table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
      th { background: #f1f5f9; padding: 0.5rem; text-align: left; font-weight: 700; }
      td { padding: 0.5rem; border-bottom: 1px solid #f1f5f9; }
      .status-normal { color: #16a34a; font-weight: 700; }
      .status-atencao { color: #d97706; font-weight: 700; }
      .status-alto { color: #dc2626; font-weight: 700; }
      .remedio-item { background: #f8fafc; border-radius: 8px; padding: 0.5rem 0.75rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; }
      .rodape { margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #94a3b8; text-align: center; }
    </style>
    </head><body>
    <div class="cabecalho">
      <div>
        <div class="logo">🥗 NutriSaúde</div>
        <p style="font-size:0.85rem;color:#64748b;margin-top:0.3rem">Relatório de Acompanhamento Nutricional</p>
      </div>
      <div style="text-align:right">
        <strong style="font-size:1rem">${perfil.nome || 'Paciente'}</strong>
        <div class="data-rel">${hoje}</div>
        <div class="data-rel">${perfil.idade||'?'} anos · ${perfil.peso||'?'}kg · ${perfil.altura||'?'}cm</div>
      </div>
    </div>

    <h2>📊 Resumo do Progresso</h2>
    <div class="grid-info">
      <div class="info-card"><div class="info-num">${pesoAtual}kg</div><div class="info-label">Peso atual</div></div>
      <div class="info-card"><div class="info-num" style="color:${parseFloat(variacao)<0?'#16a34a':'#dc2626'}">${variacao !== '—' ? (variacao > 0 ? '+' : '') + variacao + 'kg' : '—'}</div><div class="info-label">Variação total</div></div>
      <div class="info-card"><div class="info-num">${adesao}%</div><div class="info-label">Adesão ao plano (7 dias)</div></div>
    </div>
    ${energiaMedia !== '—' ? `
    <div class="grid-info" style="grid-template-columns:1fr 1fr">
      <div class="info-card"><div class="info-num">${energiaMedia}/5</div><div class="info-label">Energia média (7 dias)</div></div>
      <div class="info-card"><div class="info-num">${ultDiario.length}</div><div class="info-label">Registros no diário</div></div>
    </div>` : ''}

    ${exames.length > 0 ? `
    <h2>🔬 Últimos Exames</h2>
    <table>
      <tr><th>Exame</th><th>Resultado</th><th>Referência</th><th>Status</th><th>Data</th></tr>
      ${exames.slice(0,10).map(e => {
        const cfg = EXAMES_CONFIG[e.tipo];
        let status='—', cls='';
        if (cfg) {
          if (e.tipo==='hdl') { status = e.valor >= cfg.refMin ? 'Normal' : 'Abaixo'; cls = e.valor >= cfg.refMin ? 'status-normal' : 'status-alto'; }
          else { status = e.valor > cfg.refMax*1.3 ? 'Alto' : e.valor > cfg.refMax ? 'Atenção' : 'Normal'; cls = e.valor > cfg.refMax*1.3 ? 'status-alto' : e.valor > cfg.refMax ? 'status-atencao' : 'status-normal'; }
        }
        const dataFmt = new Date(e.data+'T12:00:00').toLocaleDateString('pt-BR');
        const refTxt = cfg ? (e.tipo==='hdl' ? `>  ${cfg.refMin}` : `< ${cfg.refMax}`) + ' ' + e.unidade : '—';
        return `<tr><td>${e.nome}</td><td><strong>${e.valor} ${e.unidade}</strong></td><td>${refTxt}</td><td class="${cls}">${status}</td><td>${dataFmt}</td></tr>`;
      }).join('')}
    </table>` : ''}

    ${remedios.length > 0 ? `
    <h2>💊 Medicamentos em Uso</h2>
    ${remedios.map(r => `
      <div class="remedio-item">
        <div><strong>${r.nome}</strong> ${r.dose ? '— '+r.dose : ''} ${r.obs ? '<small style="color:#64748b"> ('+r.obs+')</small>' : ''}</div>
        <div style="color:#64748b;font-size:0.82rem">${r.horarios.join(' | ')}</div>
      </div>`).join('')}` : ''}

    <div class="rodape">
      Relatório gerado pelo app NutriSaúde em ${hoje} · Apresente este documento ao seu médico ou nutricionista
    </div>
    </body></html>
  `;

  const janela = window.open('', '_blank');
  janela.document.write(html);
  janela.document.close();
  setTimeout(() => janela.print(), 500);
}

/* ---------- TOAST ---------- */
function mostrarToast(msg, tipo) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:0.5rem;align-items:center;';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.style.cssText = `background:${tipo==='verde'?'#00c472':'#ef4444'};color:#fff;padding:0.7rem 1.2rem;border-radius:99px;font-size:0.88rem;font-weight:700;box-shadow:0 4px 16px rgba(0,0,0,0.2);animation:fadeIn 0.3s ease`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
