'use client';

import { startTransition, useState } from 'react';
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  HeartPulseIcon,
  SaladIcon,
  SparklesIcon,
  TargetIcon,
} from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group';
import { gerarCardapioCompleto } from '@/lib/nutricao.js';

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

type RefeicaoGerada = {
  chave: string;
  nome: string;
  icone: string;
  horario: string;
  calorias: number;
  macros: {
    proteina: number;
    carbo: number;
    gordura: number;
  };
  itens: Array<{
    nome: string;
    quantidade: string;
  }>;
};

type CardapioGerado = {
  tdee: number;
  macros: {
    proteina: number;
    carbo: number;
    gordura: number;
  };
  refeicoes: RefeicaoGerada[];
};

const usuarioInicial: Usuario = {
  nome: '',
  peso: 0,
  altura: 0,
  idade: 0,
  sexo: '',
  objetivo: '',
  condicoes: [],
};

const objetivos: Array<{
  id: Exclude<Objetivo, ''>;
  titulo: string;
  descricao: string;
}> = [
  {
    id: 'emagrecer',
    titulo: 'Emagrecer',
    descricao: 'Deficit calorico controlado para reduzir gordura corporal.',
  },
  {
    id: 'massa',
    titulo: 'Ganhar massa muscular',
    descricao: 'Mais proteina e energia para apoiar construcao muscular.',
  },
  {
    id: 'manter',
    titulo: 'Manter o peso',
    descricao: 'Rotina equilibrada para sustentar o peso atual com qualidade.',
  },
];

const condicoesDisponiveis: Array<{
  id: Condicao;
  titulo: string;
  descricao: string;
}> = [
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
];

const nomesObjetivo: Record<Exclude<Objetivo, ''>, string> = {
  emagrecer: 'Emagrecimento',
  massa: 'Ganho de massa',
  manter: 'Manutencao',
};

const nomesCondicoes: Record<Exclude<Condicao, 'nenhum'>, string> = {
  esteatose: 'Esteatose Hepatica',
  diabetes: 'Diabetes',
  hipertensao: 'Hipertensao',
  colesterol: 'Colesterol Alto',
  gastrite: 'Gastrite / Refluxo',
  lactose: 'Intolerancia a Lactose',
  celiaca: 'Doenca Celiaca',
  anemia: 'Anemia',
};

const progressoTela: Record<Exclude<Tela, 'boas-vindas'>, number> = {
  dados: 34,
  objetivo: 67,
  saude: 100,
  cardapio: 100,
};

function formatarData() {
  const formatada = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  return formatada.charAt(0).toUpperCase() + formatada.slice(1);
}

function formatarNumero(valor: number) {
  return new Intl.NumberFormat('pt-BR').format(valor);
}

export function NutriApp() {
  const [tela, setTela] = useState<Tela>('boas-vindas');
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);
  const [cardapio, setCardapio] = useState<CardapioGerado | null>(null);
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
    const proximosErros: string[] = [];

    if (!usuario.objetivo) proximosErros.push('Selecione um objetivo.');
    if (usuario.condicoes.length === 0) proximosErros.push('Selecione pelo menos uma opcao de saude.');

    setErros(proximosErros);

    if (proximosErros.length > 0) return;

    startTransition(() => {
      const proximoCardapio = gerarCardapioCompleto(usuario) as CardapioGerado;
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

  const condicoesAtivas = usuario.condicoes.filter(
    (item): item is Exclude<Condicao, 'nenhum'> => item !== 'nenhum'
  );

  return (
    <>
      <ServiceWorkerRegister />

      <main className="min-h-screen bg-background text-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          {tela === 'boas-vindas' ? (
            <>
              <Card className="border-border/60 bg-card/80">
                <CardHeader className="gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge>shadcn/ui</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="outline">React + TypeScript</Badge>
                  </div>
                  <div className="flex flex-col gap-3">
                    <CardTitle className="text-3xl sm:text-5xl">
                      NutriSaude em uma base pronta para componentes reais
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-base">
                      O fluxo inicial do app foi migrado para Next e agora a interface passa a ser
                      composta com componentes oficiais do ui.shadcn.com, em vez de cards e botoes
                      montados manualmente.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card size="sm">
                      <CardHeader>
                        <CardTitle>Onboarding</CardTitle>
                        <CardDescription>Cadastro, objetivo e condicoes de saude.</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card size="sm">
                      <CardHeader>
                        <CardTitle>Cardapio</CardTitle>
                        <CardDescription>Motor nutricional reaproveitado do app atual.</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card size="sm">
                      <CardHeader>
                        <CardTitle>Padrao visual</CardTitle>
                        <CardDescription>Button, Card, Field, ToggleGroup, Alert e Accordion.</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>

                  <Separator />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button size="lg" onClick={() => setTela('dados')}>
                      <SparklesIcon data-icon="inline-start" />
                      Comecar a migracao da interface
                      <ArrowRightIcon data-icon="inline-end" />
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Vamos manter a logica do seu app e trocar a camada visual por componentes do
                      shadcn.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : null}

          {tela !== 'boas-vindas' ? (
            <Card className="border-border/60 bg-card/90">
              <CardHeader className="gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <CardTitle>
                      {tela === 'dados' ? 'Seus dados' : null}
                      {tela === 'objetivo' ? 'Seu objetivo' : null}
                      {tela === 'saude' ? 'Condicoes de saude' : null}
                      {tela === 'cardapio' ? 'Cardapio gerado' : null}
                    </CardTitle>
                    <CardDescription>
                      {tela === 'dados' ? 'Etapa inicial do onboarding migrada para Field e Input.' : null}
                      {tela === 'objetivo' ? 'Escolha com ToggleGroup em vez de botoes personalizados.' : null}
                      {tela === 'saude' ? 'Selecao multipla com Checkbox e composicao de Field.' : null}
                      {tela === 'cardapio'
                        ? 'Resumo nutricional e refeicoes usando Card, Badge e Accordion.'
                        : null}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">
                    {tela === 'dados' ? 'Passo 1 de 3' : null}
                    {tela === 'objetivo' ? 'Passo 2 de 3' : null}
                    {tela === 'saude' ? 'Passo 3 de 3' : null}
                    {tela === 'cardapio' ? 'Plano pronto' : null}
                  </Badge>
                </div>
                <Progress value={progressoTela[tela]}>
                  <ProgressLabel>Progresso</ProgressLabel>
                  <ProgressValue>
                    {(formattedValue) => `${formattedValue}%`}
                  </ProgressValue>
                </Progress>
              </CardHeader>
            </Card>
          ) : null}

          {erros.length > 0 && tela !== 'boas-vindas' ? (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Ajustes necessarios</AlertTitle>
              <AlertDescription>{erros.join(' ')}</AlertDescription>
            </Alert>
          ) : null}

          {tela === 'dados' ? (
            <Card>
              <CardContent className="flex flex-col gap-6 pt-4">
                <FieldSet>
                  <FieldLegend>Perfil</FieldLegend>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="nome">Como voce se chama?</FieldLabel>
                      <Input
                        id="nome"
                        value={usuario.nome}
                        onChange={(event) => atualizarCampo('nome', event.target.value)}
                        placeholder="Seu nome"
                      />
                      <FieldDescription>Esse nome aparece no resumo do seu cardapio.</FieldDescription>
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <Separator />

                <FieldSet>
                  <FieldLegend>Medidas</FieldLegend>
                  <FieldGroup className="grid gap-5 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="peso">Peso (kg)</FieldLabel>
                      <Input
                        id="peso"
                        type="number"
                        min="30"
                        max="300"
                        step="0.1"
                        value={usuario.peso || ''}
                        onChange={(event) => atualizarCampo('peso', Number(event.target.value))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="altura">Altura (cm)</FieldLabel>
                      <Input
                        id="altura"
                        type="number"
                        min="100"
                        max="250"
                        value={usuario.altura || ''}
                        onChange={(event) => atualizarCampo('altura', Number(event.target.value))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="idade">Idade</FieldLabel>
                      <Input
                        id="idade"
                        type="number"
                        min="10"
                        max="100"
                        value={usuario.idade || ''}
                        onChange={(event) => atualizarCampo('idade', Number(event.target.value))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Sexo</FieldLabel>
                      <ToggleGroup
                        variant="outline"
                        value={usuario.sexo ? [usuario.sexo] : []}
                        onValueChange={(value) => atualizarCampo('sexo', ((value[0] as Sexo) || ''))}
                        className="w-full"
                      >
                        <ToggleGroupItem value="masculino" className="flex-1">
                          Masculino
                        </ToggleGroupItem>
                        <ToggleGroupItem value="feminino" className="flex-1">
                          Feminino
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setTela('boas-vindas')}>
                  <ArrowLeftIcon data-icon="inline-start" />
                  Voltar
                </Button>
                <Button onClick={validarDados}>
                  Continuar
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          ) : null}

          {tela === 'objetivo' ? (
            <Card>
              <CardContent className="flex flex-col gap-6 pt-4">
                <ToggleGroup
                  orientation="vertical"
                  spacing={2}
                  variant="outline"
                  value={usuario.objetivo ? [usuario.objetivo] : []}
                  onValueChange={(value) =>
                    atualizarCampo('objetivo', ((value[0] as Objetivo) || ''))
                  }
                  className="w-full"
                >
                  {objetivos.map((objetivo) => (
                    <ToggleGroupItem
                      key={objetivo.id}
                      value={objetivo.id}
                      className="h-auto w-full justify-start px-4 py-4 text-left"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{objetivo.titulo}</span>
                        <span className="text-sm text-muted-foreground">{objetivo.descricao}</span>
                      </div>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setTela('dados')}>
                  <ArrowLeftIcon data-icon="inline-start" />
                  Voltar
                </Button>
                <Button onClick={() => setTela('saude')} disabled={!usuario.objetivo}>
                  Continuar
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          ) : null}

          {tela === 'saude' ? (
            <Card>
              <CardContent className="flex flex-col gap-6 pt-4">
                <FieldSet>
                  <FieldLegend>Selecione as opcoes aplicaveis</FieldLegend>
                  <FieldDescription>
                    Selecione quantas forem necessarias. Se nenhuma se aplicar, marque a ultima
                    opcao.
                  </FieldDescription>
                  <FieldGroup className="grid gap-4 md:grid-cols-2">
                    {condicoesDisponiveis.map((condicao) => {
                      const id = `condicao-${condicao.id}`;
                      const selecionada = usuario.condicoes.includes(condicao.id);

                      return (
                        <Card key={condicao.id} size="sm">
                          <CardContent className="pt-3">
                            <Field orientation="horizontal">
                              <Checkbox
                                id={id}
                                checked={selecionada}
                                onCheckedChange={() => toggleCondicao(condicao.id)}
                              />
                              <FieldContent>
                                <FieldLabel htmlFor={id}>{condicao.titulo}</FieldLabel>
                                <FieldDescription>{condicao.descricao}</FieldDescription>
                              </FieldContent>
                            </Field>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </FieldGroup>
                </FieldSet>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline" onClick={() => setTela('objetivo')}>
                  <ArrowLeftIcon data-icon="inline-start" />
                  Voltar
                </Button>
                <Button onClick={gerarPlano}>
                  Gerar cardapio
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </CardFooter>
            </Card>
          ) : null}

          {tela === 'cardapio' && cardapio ? (
            <>
              <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                <Card>
                  <CardHeader className="gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>
                        <SparklesIcon data-icon="inline-start" />
                        Plano do dia
                      </Badge>
                      <Badge variant="outline">{formatarData()}</Badge>
                    </div>
                    <CardTitle>Ola, {usuario.nome}</CardTitle>
                    <CardDescription>
                      {usuario.peso}kg · {usuario.altura}cm · {usuario.idade} anos ·{' '}
                      {usuario.objetivo ? nomesObjetivo[usuario.objetivo] : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Badge variant="secondary">
                        <TargetIcon data-icon="inline-start" />
                        {formatarNumero(cardapio.tdee)} kcal/dia
                      </Badge>
                      <Badge variant="secondary">{cardapio.macros.proteina}g proteina</Badge>
                      <Badge variant="secondary">{cardapio.macros.carbo}g carboidrato</Badge>
                    </div>
                    <Badge variant="secondary">{cardapio.macros.gordura}g gordura</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contexto de saude</CardTitle>
                    <CardDescription>Restricoes consideradas no cardapio.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {condicoesAtivas.length > 0 ? (
                      condicoesAtivas.map((condicao) => (
                        <Badge key={condicao} variant="outline">
                          <HeartPulseIcon data-icon="inline-start" />
                          {nomesCondicoes[condicao]}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline">Sem restricoes especificas</Badge>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Refeicoes do dia</CardTitle>
                  <CardDescription>
                    Cada bloco abaixo usa Accordion do shadcn para abrir os detalhes da refeicao.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion
                    className="w-full"
                    defaultValue={cardapio.refeicoes[0] ? [cardapio.refeicoes[0].chave] : []}
                  >
                    {cardapio.refeicoes.map((refeicao) => (
                      <AccordionItem key={refeicao.chave} value={refeicao.chave}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex min-w-0 flex-1 flex-col gap-2 pr-4 text-left sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex min-w-0 flex-col gap-1">
                              <span className="font-medium">
                                {refeicao.icone} {refeicao.nome}
                              </span>
                              <span className="text-sm text-muted-foreground">{refeicao.horario}</span>
                            </div>
                            <Badge variant="secondary">~{refeicao.calorias} kcal</Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-4">
                            <div className="grid gap-2">
                              {refeicao.itens.map((item) => (
                                <div
                                  key={`${refeicao.chave}-${item.nome}`}
                                  className="flex flex-col gap-1 rounded-lg border px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                                >
                                  <span className="font-medium">{item.nome}</span>
                                  <span className="text-sm text-muted-foreground">{item.quantidade}</span>
                                </div>
                              ))}
                            </div>

                            <Separator />

                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">
                                <SaladIcon data-icon="inline-start" />
                                {refeicao.macros.proteina}g proteina
                              </Badge>
                              <Badge variant="outline">{refeicao.macros.carbo}g carbo</Badge>
                              <Badge variant="outline">{refeicao.macros.gordura}g gordura</Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" onClick={() => setTela('saude')}>
                    <ArrowLeftIcon data-icon="inline-start" />
                    Voltar
                  </Button>
                  <Button onClick={recomecar}>
                    Reiniciar fluxo
                    <SparklesIcon data-icon="inline-end" />
                  </Button>
                </CardFooter>
              </Card>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
