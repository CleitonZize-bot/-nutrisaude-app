/**
 * wiapy.pb.js — Webhook da Wiapy (compra VITALÍCIA)
 *
 * Diferente do cakto.pb.js, aqui não existe "renovação". A compra é
 * one-shot: pagou → fica ativo pra sempre. Só estorno/chargeback cancela.
 *
 * Endpoint: POST /api/wiapy-webhook
 *
 * Variável de ambiente obrigatória:
 *   WIAPY_WEBHOOK_SECRET — o mesmo token configurado no painel da Wiapy
 *
 * Suporta vários formatos de payload (Wiapy pode evoluir o formato — esse
 * código pesca o e-mail/nome em qualquer um dos locais comuns).
 */
routerAdd("POST", "/api/wiapy-webhook", (e) => {
  const SECRET = $os.getenv("WIAPY_WEBHOOK_SECRET");
  if (!SECRET) {
    return e.json(500, { error: "missing webhook secret on server" });
  }

  // 1) Validação do token (Wiapy manda no header OU no body)
  const headerSecret =
    e.request.header.get("authorization") ||
    e.request.header.get("x-wiapy-secret") ||
    e.request.header.get("x-wiapy-signature") ||
    e.request.header.get("x-webhook-token") ||
    "";

  let body = {};
  try {
    body = e.requestInfo().body || {};
  } catch (err) {
    return e.json(400, { error: "invalid body" });
  }

  const sentSecret =
    headerSecret ||
    body.secret ||
    body.token ||
    body.authentication_token ||
    "";

  const cleanSecret = String(sentSecret).replace(/^Bearer\s+/i, "").trim();

  if (cleanSecret !== String(SECRET).trim()) {
    return e.json(401, {
      error: "unauthorized",
      hint: "token does not match WIAPY_WEBHOOK_SECRET",
    });
  }

  // 2) Pesca o e-mail e nome em vários formatos possíveis
  // Tenta nessa ordem (do mais específico pro mais genérico)
  function pickEmail(obj) {
    if (!obj) return "";
    const candidates = [
      obj?.data?.customer?.email,
      obj?.data?.buyer?.email,
      obj?.data?.client?.email,
      obj?.data?.user?.email,
      obj?.data?.payer?.email,
      obj?.data?.email,
      obj?.customer?.email,
      obj?.buyer?.email,
      obj?.client?.email,
      obj?.user?.email,
      obj?.payer?.email,
      obj?.transaction?.customer?.email,
      obj?.order?.customer?.email,
      obj?.sale?.customer?.email,
      obj?.email,
    ];
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i]) return String(candidates[i]).trim().toLowerCase();
    }
    return "";
  }

  function pickName(obj) {
    if (!obj) return "";
    const candidates = [
      obj?.data?.customer?.name,
      obj?.data?.buyer?.name,
      obj?.data?.client?.name,
      obj?.data?.customer?.full_name,
      obj?.customer?.name,
      obj?.buyer?.name,
      obj?.client?.name,
      obj?.customer?.full_name,
      obj?.transaction?.customer?.name,
      obj?.order?.customer?.name,
      obj?.name,
    ];
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i]) return String(candidates[i]).trim();
    }
    return "";
  }

  const email = pickEmail(body);
  const nome = pickName(body);

  if (!email) {
    return e.json(400, {
      error: "no email found in payload",
      hint: "received payload did not contain a customer email in any known field",
    });
  }

  // 3) Identifica o evento (Wiapy usa nomes em português)
  const rawEvent = String(
    body.event ||
      body.event_type ||
      body.type ||
      body.status ||
      body?.data?.event ||
      body?.data?.status ||
      ""
  )
    .toLowerCase()
    .trim();

  // Eventos que ATIVAM acesso vitalício
  const eventosAprovam = [
    "pagamento_aprovado",
    "pagamento aprovado",
    "payment_approved",
    "payment.approved",
    "purchase_approved",
    "purchase.approved",
    "sale_approved",
    "sale.approved",
    "approved",
    "paid",
    "completed",
    "success",
  ];

  // Eventos que CANCELAM (só estorno e chargeback — não cancelamento de assinatura, pois é vitalício)
  const eventosCancelam = [
    "pagamento_estornado",
    "pagamento estornado",
    "estornado",
    "refund",
    "refunded",
    "chargeback",
    "charge_back",
    "chargedback",
  ];

  let novoStatus = "";
  if (eventosAprovam.indexOf(rawEvent) !== -1) novoStatus = "ativo";
  if (eventosCancelam.indexOf(rawEvent) !== -1) novoStatus = "cancelado";

  // Match parcial — caso o evento tenha um nome um pouco diferente
  if (!novoStatus) {
    if (rawEvent.indexOf("aprov") !== -1 || rawEvent.indexOf("approv") !== -1 || rawEvent.indexOf("paid") !== -1) {
      novoStatus = "ativo";
    } else if (
      rawEvent.indexOf("estorn") !== -1 ||
      rawEvent.indexOf("refund") !== -1 ||
      rawEvent.indexOf("chargeback") !== -1
    ) {
      novoStatus = "cancelado";
    }
  }

  if (!novoStatus) {
    return e.json(200, {
      ok: true,
      ignored: true,
      event: rawEvent || "(unknown)",
      hint: "event not in approve/cancel lists — webhook acknowledged but no action taken",
    });
  }

  // 4) Atualiza ou cria registro em "clientes"
  try {
    const escapedEmail = email.replace(/'/g, "");
    const record = $app.findFirstRecordByFilter(
      "clientes",
      "email = '" + escapedEmail + "'"
    );
    record.set("status", novoStatus);
    if (nome && !record.get("nome")) record.set("nome", nome);
    $app.save(record);
    return e.json(200, {
      ok: true,
      action: "updated",
      email: email,
      status: novoStatus,
      event: rawEvent,
    });
  } catch (err) {
    const collection = $app.findCollectionByNameOrId("clientes");
    const record = new Record(collection);
    record.set("email", email);
    record.set("nome", nome);
    record.set("status", novoStatus);
    $app.save(record);
    return e.json(200, {
      ok: true,
      action: "created",
      email: email,
      status: novoStatus,
      event: rawEvent,
    });
  }
});
