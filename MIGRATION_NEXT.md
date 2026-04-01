# Migracao para Next.js

## O que ja foi migrado

- Base do projeto em `Next.js` com `App Router`
- `TypeScript` configurado
- `Dockerfile` ajustado para `standalone output`
- Assets estaticos movidos para `public/`
- Reaproveitamento da logica de cardapio em `lib/alimentos.js` e `lib/nutricao.js`
- Primeira versao do fluxo principal em React:
  - boas-vindas
  - coleta de dados
  - objetivo
  - condicoes de saude
  - geracao do cardapio

## Estrutura nova

- `app/`
  - `layout.tsx`
  - `page.tsx`
- `components/`
  - `nutri-app.tsx`
  - `service-worker-register.tsx`
- `lib/`
  - `alimentos.js`
  - `nutricao.js`
- `public/`
  - `icons/`
  - `manifest.json`
  - `sw.js`

## Estrutura legada preservada

Os arquivos abaixo continuam no projeto como referencia para migrar o restante do produto:

- `index.html`
- `css/style.css`
- `js/app.js`
- `js/pb.js`
- `js/storage.js`
- `js/progresso.js`
- `js/saude.js`
- `js/receitas.js`
- `js/receitas_db.js`

## Proximas etapas recomendadas

1. Criar um `AuthProvider` para substituir o fluxo global de login do `PocketBase`.
2. Migrar persistencia local para hooks e utilitarios tipados.
3. Separar o cardapio em componentes menores:
   - onboarding
   - resumo nutricional
   - lista de refeicoes
   - progresso
   - saude
4. Corrigir durante a migracao os problemas do app legado:
   - datas usando UTC em vez de data local
   - `setInterval` duplicado na area de saude
   - uso excessivo de `innerHTML`
   - sincronizacao local/servidor sobrescrevendo dados
5. Migrar a area de saude para componentes controlados e sem manipulacao direta de DOM.

## Comandos

```bash
npm run dev
npm run build
npm run start
```
