'use client';

import { startTransition, useState } from 'react';
import { gerarCardapioCompleto } from '../lib/nutricao.js';
import { ServiceWorkerRegister } from './service-worker-register';

type Sexo = 'masculino' | 'feminino' | '';
type Objetivo = 'emagrecer' | 'massa' | 'manter' | '';
type Condicao =
  | 'esteatose'
  | 'diabetes'
  | 'hipertensao'
  | 'colesterol'
  | 'gastrite'
  | 'lactose'
  | 'celiaca'
  | 'anemia'
  | 'nenhum';

type Usuario = {
  nome: string;
  peso: number;
  altura: number;
  idade: number;
  sexo: Sexo;
  objetivo: Objetivo;
  condicoes: Condicao[];
};

type Tela = 'boas-vindas' | 'dados' | 'objetivo' | 'saude' | 'cardapio';

const usuarioInicial: Usuario = {
  nome: '',
  peso: 0,
  altura: 0,
  idade: 0,
  sexo: '',
  objetivo: '',
  condicoes: [],
};

const objetivos = [
  {
    id: 'emagrecer',
    icone: 'Peso',
    titulo: 'Emagrecer',
    descricao: 'Deficit calorico controlado para reduzir gordura corporal.',
  },
  {
    id: 'massa',
    icone: 'Forca',
    titulo: 'Ganhar massa muscular',
    descricao: 'Mais proteina e energia para apoiar construcao muscular.',
  },
  {
    id: 'manter',
    icone: 'Equilibrio',
    titulo: 'Manter o peso',
    descricao: 'Rotina equilibrada para sustentar o peso atual com qualidade.',
  },
] as const;

const condicoesDisponiveis = [
  {
    id: 'esteatose',
    titulo: 'Esteatose Hepatica',
    descricao: 'Evitar excesso de gordura saturada, acucar e alcool.',
  },
  {
    id: 'diabetes',
    titulo: 'Diabetes',
    descricao: 'Priorizar alimentos com menor impacto glicemico.',
  },
  {
    id: 'hipertensao',
    titulo: 'Hipertensao',
    descricao: 'Reducao de sodio e ultraprocessados.',
  },
  {
    id: 'colesterol',
    titulo: 'Colesterol Alto',
    descricao: 'Mais fibras e menor carga de gorduras ruins.',
  },
  {
    id: 'gastrite',
    titulo: 'Gastrite / Refluxo',
    descricao: 'Evitar alimentos muito acidos, gordurosos ou irritantes.',
  },
  {
    id: 'lactose',
    titulo: 'Intolerancia a Lactose',
    descricao: 'Substituir leite e derivados por alternativas adequadas.',
  },
  {
    id: 'celiaca',
    titulo: 'Doenca Celiaca / Gluten',
    descricao: 'Excluir trigo, cevada e centeio da rotina alimentar.',
  },
  {
    id: 'anemia',
    titulo: 'Anemia',
    descricao: 'Dar foco a ferro, proteinas e combinacoes com vitamina C.',
  },
  {
    id: 'nenhum',
    titulo: 'Nenhuma das anteriores',
    descricao: 'Sem condicoes especificas no momento.',
  },
] as const;

const nomesObjetivo: Record<Exclude<Objetivo, ''>, string> = {
  emagrecer: 'Emagrecimento',
  massa: 'Ganho de massa',
  manter: 'Manutencao',
};

const nomesCondicoes: Record<Condicao, string> = {
  esteatose: 'Esteatose Hepatica',
  diabetes: 'Diabetes',
  hipertensao: 'Hipertensao',
  colesterol: 'Colesterol Alto',
  gastrite: 'Gastrite / Refluxo',
  lactose: 'Intolerancia a Lactose',
  celiaca: 'Doenca Celiaca',
  anemia: 'Anemia',
  nenhum: 'Nenhuma',
};

const corRefeicao: Record<string, string> = {
  cafe: '#f59e0b',
  lancheManha: '#f97316',
  almoco: '#10b981',
  lancheTarde: '#8b5cf6',
  jantar: '#3b82f6',
  ceia: '#6366f1',
};

function formatarData() {
  const formatada = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return formatada.charAt(0).toUpperCase() + formatada.slice(1);
}

export function NutriApp() {
  const [tela, setTela] = useState<Tela>('boas-vindas');
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);
  const [cardapio, setCardapio] = useState<any>(null);
  const [erros, setErros] = useState<string[]>([]);

  function atualizarCampo<K extends keyof Usuario>(campo: K, valor: Usuario[K]) {
    setUsuario((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  }

  function validarDados() {
    const proximosErros: string[] = [];

    if (!usuario.nome.trim()) proximosErros.push('Informe seu nome.');
    if (!usuario.peso || usuario.peso < 30 || usuario.peso > 300) proximosErros.push('Peso invalido.');
    if (!usuario.altura || usuario.altura < 100 || usuario.altura > 250) proximosErros.push('Altura invalida.');
    if (!usuario.idade || usuario.idade < 10 || usuario.idade > 100) proximosErros.push('Idade invalida.');
    if (!usuario.sexo) proximosErros.push('Selecione seu sexo.');

    setErros(proximosErros);

    if (proximosErros.length === 0) {
      setTela('objetivo');
    }
  }

  function toggleCondicao(condicao: Condicao) {
    setUsuario((atual) => {
      if (condicao === 'nenhum') {
        return { ...atual, condicoes: ['nenhum'] };
      }

      const semNenhum = atual.condicoes.filter((item) => item !== 'nenhum');
      const jaExiste = semNenhum.includes(condicao);

      return {
        ...atual,
        condicoes: jaExiste
          ? semNenhum.filter((item) => item !== condicao)
          : [...semNenhum, condicao],
      };
    });
  }

  function gerarPlano() {
    if (!usuario.objetivo) {
      setErros(['Selecione um objetivo antes de continuar.']);
      return;
    }

    if (usuario.condicoes.length === 0) {
      setErros(['Selecione pelo menos uma opcao de saude.']);
      return;
    }

    setErros([]);

    startTransition(() => {
      const proximoCardapio = gerarCardapioCompleto(usuario);
      setCardapio(proximoCardapio);
      setTela('cardapio');
    });
  }

  function recomecar() {
    setUsuario(usuarioInicial);
    setCardapio(null);
    setErros([]);
    setTela('boas-vindas');
  }

  return (
    <>
      <ServiceWorkerRegister />

      {tela === 'boas-vindas' ? (
        <div className="tela ativa">
          <div className="bv-bg-circle bv-circle1" />
          <div className="bv-bg-circle bv-circle2" />
          <div className="bv-bg-circle bv-circle3" />

          <div className="bv-hero">
            <div className="bv-topo">
              <div className="bv-logo">
                <span className="bv-logo-icone">NS</span>
                <span className="bv-logo-nome">NutriSaude</span>
              </div>
              <span className="bv-badge">React + Next</span>
            </div>

            <div className="bv-centro">
              <h1 className="bv-titulo">
                Seu cardapio
                <br />
                <span className="bv-titulo-destaque">personalizado</span>
                <br />
                agora em React
              </h1>
              <p className="bv-subtitulo">
                Mantivemos o conceito do app original e iniciamos a migracao para uma base mais escalavel.
              </p>
            </div>

            <button className="btn-comecar" onClick={() => setTela('dados')}>
              Criar meu plano
              <span className="btn-comecar-seta">→</span>
            </button>

            <div className="bv-stats">
              <div className="bv-stat">
                <span className="bv-stat-num">Next</span>
                <span className="bv-stat-txt">App Router</span>
              </div>
              <div className="bv-stat-div" />
              <div className="bv-stat">
                <span className="bv-stat-num">React</span>
                <span className="bv-stat-txt">componentes</span>
              </div>
              <div className="bv-stat-div" />
              <div className="bv-stat">
                <span className="bv-stat-num">TS</span>
                <span className="bv-stat-txt">base tipada</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {tela === 'dados' ? (
        <div className="tela ativa">
          <div className="container">
            <div className="progresso">
              <div className="progresso-barra" style={{ width: '25%' }} />
            </div>
            <p className="passo-label">Passo 1 de 3</p>
            <h2 className="tela-titulo">Seus dados</h2>
            <p className="tela-subtitulo">Esta e a primeira tela portada para React com estado local tipado.</p>

            {erros.length > 0 ? (
              <div className="auth-erro" style={{ display: 'block', marginBottom: '1rem' }}>
                {erros.join(' ')}
              </div>
            ) : null}

            <div className="formulario">
              <div className="campo">
                <label htmlFor="nome">Como voce se chama?</label>
                <input
                  id="nome"
                  type="text"
                  value={usuario.nome}
                  onChange={(event) => atualizarCampo('nome', event.target.value)}
                  placeholder="Seu nome"
                />
              </div>

              <div className="campos-lado-a-lado">
                <div className="campo">
                  <label htmlFor="peso">Peso (kg)</label>
                  <input
                    id="peso"
                    type="number"
                    min="30"
                    max="300"
                    step="0.1"
                    value={usuario.peso || ''}
                    onChange={(event) => atualizarCampo('peso', Number(event.target.value))}
                  />
                </div>
                <div className="campo">
                  <label htmlFor="altura">Altura (cm)</label>
                  <input
                    id="altura"
                    type="number"
                    min="100"
                    max="250"
                    value={usuario.altura || ''}
                    onChange={(event) => atualizarCampo('altura', Number(event.target.value))}
                  />
                </div>
              </div>

              <div className="campos-lado-a-lado">
                <div className="campo">
                  <label htmlFor="idade">Idade</label>
                  <input
                    id="idade"
                    type="number"
                    min="10"
                    max="100"
                    value={usuario.idade || ''}
                    onChange={(event) => atualizarCampo('idade', Number(event.target.value))}
                  />
                </div>
                <div className="campo">
                  <label>Sexo</label>
                  <div className="opcoes-sexo">
                    <label className="opcao-radio">
                      <input
                        type="radio"
                        checked={usuario.sexo === 'masculino'}
                        onChange={() => atualizarCampo('sexo', 'masculino')}
                      />
                      <span>Masculino</span>
                    </label>
                    <label className="opcao-radio">
                      <input
                        type="radio"
                        checked={usuario.sexo === 'feminino'}
                        onChange={() => atualizarCampo('sexo', 'feminino')}
                      />
                      <span>Feminino</span>
                    </label>
                  </div>
                </div>
              </div>

              <button className="btn-primario" onClick={validarDados}>
                Continuar →
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {tela === 'objetivo' ? (
        <div className="tela ativa">
          <div className="container">
            <div className="progresso">
              <div className="progresso-barra" style={{ width: '65%' }} />
            </div>
            <p className="passo-label">Passo 2 de 3</p>
            <h2 className="tela-titulo">Qual e o seu objetivo?</h2>
            <p className="tela-subtitulo">A logica de calculo do app original foi reaproveitada no novo fluxo React.</p>

            <div className="cards-objetivo">
              {objetivos.map((objetivo) => (
                <button
                  key={objetivo.id}
                  type="button"
                  className={`card-objetivo ${usuario.objetivo === objetivo.id ? 'selecionado' : ''}`}
                  onClick={() => atualizarCampo('objetivo', objetivo.id)}
                >
                  <div className="card-icone">{objetivo.icone}</div>
                  <h3>{objetivo.titulo}</h3>
                  <p>{objetivo.descricao}</p>
                </button>
              ))}
            </div>

            <button
              className="btn-primario"
              disabled={!usuario.objetivo}
              onClick={() => setTela('saude')}
            >
              Continuar →
            </button>
          </div>
        </div>
      ) : null}

      {tela === 'saude' ? (
        <div className="tela ativa">
          <div className="container">
            <div className="progresso">
              <div className="progresso-barra" style={{ width: '100%' }} />
            </div>
            <p className="passo-label">Passo 3 de 3</p>
            <h2 className="tela-titulo">Voce tem alguma condicao de saude?</h2>
            <p className="tela-subtitulo">Pode selecionar mais de uma. Esta etapa ja esta controlada por estado React.</p>

            {erros.length > 0 ? (
              <div className="auth-erro" style={{ display: 'block', marginBottom: '1rem' }}>
                {erros.join(' ')}
              </div>
            ) : null}

            <div className="cards-saude">
              {condicoesDisponiveis.map((condicao) => {
                const selecionada = usuario.condicoes.includes(condicao.id);

                return (
                  <button
                    key={condicao.id}
                    type="button"
                    className={`card-saude ${selecionada ? 'selecionado' : ''}`}
                    onClick={() => toggleCondicao(condicao.id)}
                  >
                    <div className="card-saude-texto">
                      <h3>{condicao.titulo}</h3>
                      <p>{condicao.descricao}</p>
                    </div>
                    <span className="card-check">✓</span>
                  </button>
                );
              })}
            </div>

            <button className="btn-primario" onClick={gerarPlano}>
              Gerar meu cardapio →
            </button>
          </div>
        </div>
      ) : null}

      {tela === 'cardapio' && cardapio ? (
        <div className="tela ativa">
          <div className="container container-largo">
            <div className="cardapio-header">
              <div className="cardapio-saudacao">
                <span>
                  Ola, <strong>{usuario.nome}</strong>
                </span>
                <p className="cardapio-data">{formatarData()}</p>
                <p>
                  {usuario.peso}kg · {usuario.altura}cm · {usuario.idade} anos ·{' '}
                  {usuario.objetivo ? nomesObjetivo[usuario.objetivo] : ''}
                </p>
                <p>
                  {usuario.condicoes.filter((item) => item !== 'nenhum').map((item) => nomesCondicoes[item]).join(', ') ||
                    'Sem restricoes especificas'}
                </p>
              </div>

              <div className="cardapio-meta">
                <div className="meta-item">
                  <span className="meta-numero">{cardapio.tdee}</span>
                  <span className="meta-label">kcal/dia</span>
                </div>
                <div className="meta-item">
                  <span className="meta-numero">{cardapio.macros.proteina}</span>
                  <span className="meta-label">g proteina</span>
                </div>
                <div className="meta-item">
                  <span className="meta-numero">{cardapio.macros.carbo}</span>
                  <span className="meta-label">g carboidrato</span>
                </div>
                <div className="meta-item">
                  <span className="meta-numero">{cardapio.macros.gordura}</span>
                  <span className="meta-label">g gordura</span>
                </div>
              </div>
            </div>

            <div className="lista-refeicoes">
              {cardapio.refeicoes.map((refeicao: any, index: number) => (
                <div
                  key={refeicao.chave}
                  className={`refeicao-card ${index === 0 ? 'aberto' : ''}`}
                  style={{ ['--cor-refeicao' as string]: corRefeicao[refeicao.chave] || '#00c472' }}
                >
                  <div className="refeicao-header" aria-expanded={index === 0}>
                    <span className="refeicao-icone">{refeicao.icone}</span>
                    <div className="refeicao-info">
                      <div className="refeicao-nome">{refeicao.nome}</div>
                      <div className="refeicao-horario">{refeicao.horario}</div>
                    </div>
                    <span className="refeicao-kcal">~{refeicao.calorias} kcal</span>
                  </div>

                  <div className="refeicao-conteudo">
                    <ul className="lista-alimentos">
                      {refeicao.itens.map((item: any) => (
                        <li key={`${refeicao.chave}-${item.nome}`} className="item-alimento">
                          <div className="item-principal">
                            <span className="item-nome">{item.nome}</span>
                            <span className="item-quantidade">{item.quantidade}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="macros-refeicao">
                      <span className="macro-badge proteina">{refeicao.macros.proteina}g proteina</span>
                      <span className="macro-badge carbo">{refeicao.macros.carbo}g carbo</span>
                      <span className="macro-badge gordura">{refeicao.macros.gordura}g gordura</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rodape-cardapio">
              <button className="btn-secundario" onClick={recomecar}>
                Refazer perfil
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
