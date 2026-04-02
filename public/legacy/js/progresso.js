/* ============================================================
   progresso.js — Gráfico de peso e plano semanal
============================================================ */

/* ============================================================
   GRÁFICO DE PESO — Canvas simples sem dependências externas
============================================================ */
function desenharGraficoPeso(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const historico = carregarHistoricoPeso();
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;
  canvas.width  = W;
  canvas.height = H;

  ctx.clearRect(0, 0, W, H);

  if (historico.length === 0) {
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '14px Segoe UI, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Nenhum registro ainda.', W / 2, H / 2 - 10);
    ctx.fillText('Registre seu peso abaixo!', W / 2, H / 2 + 15);
    return;
  }

  // Últimos 30 registros
  const dados = historico.slice(-30);
  const pesos  = dados.map(d => d.peso);
  const minP   = Math.floor(Math.min(...pesos)) - 1;
  const maxP   = Math.ceil(Math.max(...pesos))  + 1;

  const pad = { top: 20, right: 16, bottom: 40, left: 44 };
  const W2 = W - pad.left - pad.right;
  const H2 = H - pad.top  - pad.bottom;

  // Grade horizontal
  const passos = 5;
  ctx.strokeStyle = '#e8e8e8';
  ctx.lineWidth = 1;
  for (let i = 0; i <= passos; i++) {
    const y = pad.top + (H2 / passos) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + W2, y);
    ctx.stroke();

    // Label eixo Y
    const val = (maxP - ((maxP - minP) / passos) * i).toFixed(1);
    ctx.fillStyle = '#7f8c8d';
    ctx.font = '10px Segoe UI, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(val + 'kg', pad.left - 4, y + 4);
  }

  // Converte ponto de dado para coordenada
  function toX(i) { return pad.left + (i / (dados.length - 1 || 1)) * W2; }
  function toY(p) { return pad.top + H2 - ((p - minP) / (maxP - minP)) * H2; }

  // Área preenchida (gradiente)
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + H2);
  grad.addColorStop(0, 'rgba(46, 204, 113, 0.3)');
  grad.addColorStop(1, 'rgba(46, 204, 113, 0.0)');

  ctx.beginPath();
  ctx.moveTo(toX(0), toY(dados[0].peso));
  for (let i = 1; i < dados.length; i++) {
    ctx.lineTo(toX(i), toY(dados[i].peso));
  }
  ctx.lineTo(toX(dados.length - 1), pad.top + H2);
  ctx.lineTo(toX(0), pad.top + H2);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Linha
  ctx.beginPath();
  ctx.strokeStyle = '#27ae60';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.moveTo(toX(0), toY(dados[0].peso));
  for (let i = 1; i < dados.length; i++) {
    ctx.lineTo(toX(i), toY(dados[i].peso));
  }
  ctx.stroke();

  // Pontos e labels de data
  dados.forEach((d, i) => {
    const x = toX(i);
    const y = toY(d.peso);

    // Ponto
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#27ae60';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Data no eixo X — mostra só algumas para não sobrecarregar
    const totalMostrar = Math.min(5, dados.length);
    const intervalo = Math.floor(dados.length / totalMostrar);
    if (i % intervalo === 0 || i === dados.length - 1) {
      const partes = d.data.split('-');
      const label = `${partes[2]}/${partes[1]}`;
      ctx.fillStyle = '#7f8c8d';
      ctx.font = '10px Segoe UI, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, pad.top + H2 + 18);
    }
  });

  // Valor do último ponto destacado
  const ultimo = dados[dados.length - 1];
  ctx.fillStyle = '#27ae60';
  ctx.font = 'bold 12px Segoe UI, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(ultimo.peso + 'kg', toX(dados.length - 1), toY(ultimo.peso) - 10);
}

/* ============================================================
   TENDÊNCIA DE PESO
   Retorna { texto, cor, icone } com a análise da tendência.
============================================================ */
function calcularTendencia() {
  const historico = carregarHistoricoPeso();
  if (historico.length < 2) return null;

  const recentes = historico.slice(-7); // última semana
  if (recentes.length < 2) return null;

  const primeiro = recentes[0].peso;
  const ultimo   = recentes[recentes.length - 1].peso;
  const diff     = ultimo - primeiro;

  if (Math.abs(diff) < 0.2) {
    return { texto: 'Peso estável na última semana', cor: '#f39c12', icone: '→' };
  } else if (diff < 0) {
    return { texto: `Perdeu ${Math.abs(diff).toFixed(1)}kg na última semana`, cor: '#27ae60', icone: '↓' };
  } else {
    return { texto: `Ganhou ${diff.toFixed(1)}kg na última semana`, cor: '#e74c3c', icone: '↑' };
  }
}

/* ============================================================
   PLANO SEMANAL
   Gera o resumo dos 7 próximos dias de cardápio.
============================================================ */
function gerarPlanoSemanal(usuario) {
  const plano = [];
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const meses = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];

  for (let offset = 0; offset < 7; offset++) {
    const data = new Date();
    data.setDate(data.getDate() + offset);
    const nomeDia = offset === 0 ? 'Hoje' : offset === 1 ? 'Amanhã' : diasSemana[data.getDay()];
    const dataLabel = `${data.getDate()} ${meses[data.getMonth()]}`;

    const refeicoes = [];
    for (const [chave, modelo] of Object.entries(REFEICOES_MODELO)) {
      const itens = montarRefeicaoDoDia(chave, offset);
      refeicoes.push({
        chave,
        nome: modelo.nome,
        icone: modelo.icone,
        itens
      });
    }

    plano.push({ offset, nomeDia, dataLabel, refeicoes });
  }

  return plano;
}

/* ============================================================
   LISTA DE COMPRAS SEMANAL
   Agrega todos os ingredientes dos 7 dias e agrupa por categoria.
============================================================ */
const CATEGORIAS_COMPRAS = {
  proteinas:    { nome: '🥩 Proteínas',              grupos: ['proteina_principal', 'proteina_leve', 'proteina_manha', 'ovo'] },
  graos:        { nome: '🌾 Grãos e carboidratos',   grupos: ['pao_manha', 'arroz'] },
  leguminosas:  { nome: '🫘 Leguminosas',            grupos: ['feijao'] },
  hortalicas:   { nome: '🥦 Legumes e verduras',     grupos: ['legumes', 'salada'] },
  frutas:       { nome: '🍎 Frutas',                 grupos: ['fruta'] },
  laticinios:   { nome: '🥛 Laticínios',             grupos: ['iogurte', 'ceia_proteina'] },
  oleaginosas:  { nome: '🥜 Oleaginosas e gorduras', grupos: ['castanha', 'gordura_boa'] },
  bebidas:      { nome: '☕ Bebidas',                grupos: ['bebida_cafe', 'bebida_lanche'] },
  sopas:        { nome: '🍲 Sopas e caldos',         grupos: ['sopa'] },
  complementos: { nome: '✨ Complementos',           grupos: ['ceia_complemento', 'ceia_sementes'] }
};

function gerarListaCompras(usuario) {
  // Coleta todos os itens dos 7 dias
  const todosItens = [];

  for (let offset = 0; offset < 7; offset++) {
    for (const chave of Object.keys(REFEICOES_MODELO)) {
      const itens = montarRefeicaoDoDia(chave, offset);
      todosItens.push(...itens);
    }
  }

  // Agrupa por categoria usando grupoId
  const lista = {};

  for (const [catKey, cat] of Object.entries(CATEGORIAS_COMPRAS)) {
    const itensCategoria = todosItens.filter(i => cat.grupos.includes(i.grupoId));

    // Conta frequência de cada nome de alimento
    const freq = {};
    itensCategoria.forEach(i => {
      // Pega o nome base sem a forma de preparo (ex: "Peito de frango grelhado" → "Peito de frango")
      const nome = i.nome;
      freq[nome] = (freq[nome] || 0) + 1;
    });

    // Ordena por frequência e pega os únicos
    const unicos = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .map(([nome, vezes]) => ({ nome, vezes }));

    if (unicos.length > 0) {
      lista[catKey] = { ...cat, itens: unicos };
    }
  }

  return lista;
}

/* ============================================================
   renderizarPlanoSemanal(usuario)
   Cria o HTML do plano semanal com lista de compras.
============================================================ */
function renderizarPlanoSemanal(usuario) {
  const plano = gerarPlanoSemanal(usuario);
  const container = document.getElementById('conteudo-semana');
  if (!container) return;

  container.innerHTML = `
    <div class="semana-wrapper">
      ${plano.map((dia, i) => `
        <div class="dia-card ${i === 0 ? 'dia-hoje' : ''}">
          <button class="dia-header" onclick="toggleDia(this.parentElement)">
            <div class="dia-info">
              <span class="dia-nome">${dia.nomeDia}</span>
              <span class="dia-data">${dia.dataLabel}</span>
            </div>
            <div class="dia-resumo">
              ${dia.refeicoes.map(r => `<span title="${r.nome}">${r.icone}</span>`).join('')}
            </div>
            <span class="refeicao-seta">▼</span>
          </button>
          <div class="dia-conteudo ${i === 0 ? '' : 'escondido'}">
            ${dia.refeicoes.map(r => `
              <div class="dia-refeicao">
                <span class="dia-refeicao-nome">${r.icone} ${r.nome}</span>
                <ul class="dia-refeicao-itens">
                  ${r.itens.map(it => `<li>${it.nome} <small>${it.quantidade}</small></li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <button class="btn-primario btn-lista-compras" onclick="mostrarListaCompras()">
        🛒 Gerar lista de compras da semana
      </button>

      <div id="lista-compras-container" class="escondido">
        <div class="lista-compras-header">
          <h3>🛒 Lista de compras — 7 dias</h3>
          <button onclick="imprimirListaCompras()" class="btn-imprimir">🖨️ Imprimir</button>
        </div>
        <div id="lista-compras-conteudo"></div>
      </div>
    </div>
  `;
}

function toggleDia(card) {
  const conteudo = card.querySelector('.dia-conteudo');
  const seta = card.querySelector('.refeicao-seta');
  conteudo.classList.toggle('escondido');
  seta.style.transform = conteudo.classList.contains('escondido') ? '' : 'rotate(180deg)';
}

function mostrarListaCompras() {
  const container = document.getElementById('lista-compras-container');
  const conteudo  = document.getElementById('lista-compras-conteudo');
  if (!container || !conteudo) return;

  // Já está aberto? Fecha.
  if (!container.classList.contains('escondido')) {
    container.classList.add('escondido');
    return;
  }

  const lista = gerarListaCompras();

  conteudo.innerHTML = Object.values(lista).map(cat => `
    <div class="compra-categoria">
      <h4>${cat.nome}</h4>
      <ul class="compra-lista">
        ${cat.itens.map((item, idx) => `
          <li class="compra-item">
            <label>
              <input type="checkbox" id="compra-${cat.nome}-${idx}" />
              <span>${item.nome}</span>
              <small>${item.vezes}x na semana</small>
            </label>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  container.classList.remove('escondido');
  container.scrollIntoView({ behavior: 'smooth' });
}

function imprimirListaCompras() {
  const conteudo = document.getElementById('lista-compras-conteudo');
  if (!conteudo) return;
  const win = window.open('', '_blank');
  win.document.write(`
    <html><head><title>Lista de Compras — NutriSaúde</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; }
      h1 { color: #27ae60; } h4 { color: #2c3e50; margin: 16px 0 6px; }
      ul { list-style: none; padding: 0; }
      li { padding: 4px 0; border-bottom: 1px solid #eee; }
      input[type=checkbox] { margin-right: 8px; }
      small { color: #7f8c8d; font-size: 0.8em; margin-left: 8px; }
    </style></head>
    <body>
      <h1>🛒 Lista de Compras — NutriSaúde</h1>
      <p>Plano de 7 dias</p>
      ${conteudo.innerHTML}
    </body></html>
  `);
  win.print();
}

/* ============================================================
   renderizarProgresso()
   Cria o HTML da aba de progresso com gráfico e histórico.
============================================================ */
function renderizarProgresso(usuario) {
  const container = document.getElementById('conteudo-progresso');
  if (!container) return;

  const historico = carregarHistoricoPeso();
  const tendencia = calcularTendencia();
  const pesoAtual = historico.length > 0 ? historico[historico.length - 1].peso : usuario.peso;
  const pesoInicial = historico.length > 0 ? historico[0].peso : usuario.peso;
  const diffTotal = (pesoAtual - pesoInicial).toFixed(1);

  container.innerHTML = `
    <div class="progresso-wrapper">

      <!-- Resumo numérico -->
      <div class="progresso-cards">
        <div class="prog-card">
          <span class="prog-numero">${pesoAtual}kg</span>
          <span class="prog-label">Peso atual</span>
        </div>
        <div class="prog-card">
          <span class="prog-numero ${diffTotal < 0 ? 'verde' : diffTotal > 0 ? 'vermelho' : ''}">
            ${diffTotal > 0 ? '+' : ''}${diffTotal}kg
          </span>
          <span class="prog-label">Desde o início</span>
        </div>
        <div class="prog-card">
          <span class="prog-numero">${historico.length}</span>
          <span class="prog-label">Registros</span>
        </div>
      </div>

      ${tendencia ? `
        <div class="tendencia-box" style="border-color: ${tendencia.cor}">
          <span class="tendencia-icone" style="color: ${tendencia.cor}">${tendencia.icone}</span>
          <span>${tendencia.texto}</span>
        </div>
      ` : ''}

      <!-- Gráfico -->
      <div class="grafico-wrapper">
        <canvas id="grafico-peso" class="grafico-canvas"></canvas>
      </div>

      <!-- Registrar peso -->
      <div class="registrar-peso">
        <h4>📝 Registrar peso de hoje</h4>
        <div class="registrar-peso-form">
          <input type="number" id="input-novo-peso" placeholder="${pesoAtual}" step="0.1" min="30" max="300" />
          <span>kg</span>
          <button onclick="registrarPeso()">Salvar</button>
        </div>
      </div>

      <!-- Histórico tabela -->
      ${historico.length > 0 ? `
        <div class="historico-tabela">
          <h4>Histórico de peso</h4>
          <div class="historico-scroll">
            <table>
              <thead><tr><th>Data</th><th>Peso</th><th>Variação</th></tr></thead>
              <tbody>
                ${historico.slice().reverse().slice(0, 20).map((reg, i, arr) => {
                  const ant = arr[i + 1];
                  const var_ = ant ? (reg.peso - ant.peso).toFixed(1) : '—';
                  const corVar = var_ === '—' ? '' : var_ < 0 ? 'verde' : var_ > 0 ? 'vermelho' : '';
                  const partes = reg.data.split('-');
                  return `<tr>
                    <td>${partes[2]}/${partes[1]}/${partes[0]}</td>
                    <td><strong>${reg.peso}kg</strong></td>
                    <td class="${corVar}">${var_ !== '—' && var_ > 0 ? '+' : ''}${var_}</td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // Desenha o gráfico depois de renderizar
  setTimeout(() => desenharGraficoPeso('grafico-peso'), 50);
}

function registrarPeso() {
  const input = document.getElementById('input-novo-peso');
  const val = parseFloat(input.value);
  if (!val || val < 30 || val > 300) {
    alert('Digite um peso válido (entre 30 e 300kg).');
    return;
  }
  salvarPeso(val);
  input.value = '';

  // Feedback visual
  const btn = input.nextElementSibling.nextElementSibling;
  btn.textContent = '✅ Salvo!';
  btn.style.background = '#27ae60';
  setTimeout(() => {
    btn.textContent = 'Salvar';
    btn.style.background = '';
    renderizarProgresso(window._usuarioAtual || {});
  }, 1500);
}
