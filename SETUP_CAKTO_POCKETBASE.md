# Integracao Cakto + PocketBase

Estado atual:
- o app consulta a colecao `clientes` no PocketBase
- acesso liberado quando `status = "ativo"`
- o webhook do Cakto atualiza essa colecao pelo email do cliente

## Variavel obrigatoria no PocketBase

Defina no ambiente do servidor PocketBase:

```env
CAKTO_WEBHOOK_SECRET=coloque-um-segredo-forte-aqui
```

## Endpoint do webhook

Use este endpoint no Cakto:

```text
https://pb.nutrisaudeapp.online/api/cakto-webhook
```

## Corpo esperado

O hook espera:

- `secret`
- `event`
- `data.customer.email`
- `data.customer.name`

## Eventos tratados

Ativam assinatura:
- `purchase_approved`
- `subscription_created`
- `subscription_renewed`

Cancelam assinatura:
- `subscription_canceled`
- `subscription_renewal_refused`
- `refund`
- `chargeback`

## Colecao usada

Colecao: `clientes`

Campos minimos:
- `email`
- `nome`
- `status`

## Regra de funcionamento

1. Cakto envia webhook para PocketBase
2. PocketBase cria ou atualiza o registro em `clientes`
3. o app consulta `clientes` por email
4. se `status = "ativo"`, a assinatura fica liberada
