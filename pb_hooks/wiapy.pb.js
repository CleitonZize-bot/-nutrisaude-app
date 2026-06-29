/**
 * wiapy.pb.js — Webhook da Wiapy (compra VITALÍCIA) com LOG completo
 *
 * Versão 2.0 — toda chamada (sucesso ou erro) é registrada nos logs do
 * PocketBase ($app.logger().info / .warn / .error). Aparece na janela
 * "Logs" do EasyPanel em tempo real.
 *
 * Endpoint: POST /api/wiapy-webhook
 *
 * Variável de ambiente obrigatória:
 *   WIAPY_WEBHOOK_SECRET — o mesmo token configurado no painel da Wiapy
 */
routerAdd("POST", "/api/wiapy-webhook", (e) => {
  const log = $app.logger();
  const tStart = new Date().toISOString();

  log.info("=== WIAPY WEBHOOK RECEBIDO ===", "timestamp", tStart);

  const SECRET = $os.getenv("WIAPY_WEBHOOK_SECRET");
  if (!SECRET) {
    log.error("WIAPY: missing WIAPY_WEBHOOK_SECRET env var");
    return e.json(500, { error: "missing webhook secret on server" });
  }

  // 1) Logar TODOS os headers que chegaram
  const allHeaders = {};
  try {
    const headerNames = [
      "authorization", "x-wiapy-secret", "x-wiapy-signature",
      "x-webhook-token", "x-webhook-secret", "user-agent",
      "content-type", "x-forwarded-for",
    ];
    for (let i = 0; i < headerNames.length; i++) {
      const v = e.request.header.get(headerNames[i]);
      if (v) allHeaders[headerNames[i]] = v;
    }
  } catch (err) { /**/ }

  log.info("WIAPY: headers", "data", JSON.stringify(allHeaders));

  // 2) Logar o body bruto recebido
  let body = {};
  try {
    body = e.requestInfo().body || {};
  } catch (err) {
    log.error("WIAPY: invalid body", "error", String(err));
    return e.json(400, { error: "invalid body" });
  }

  log.info("WIAPY: body recebido", "data", JSON.stringify(body));

  // 3) Validação do token
  const headerSecret =
    e.request.header.get("authorization") ||
    e.request.header.get("x-wiapy-secret") ||
    e.request.header.get("x-wiapy-signature") ||
    e.request.header.get("x-webhook-token") ||
    e.request.header.get("x-webhook-secret") ||
    "";

  const sentSecret =
    headerSecret ||
    body.secret ||
    body.token ||
    body.authentication_token ||
    body.auth_token ||
    "";

  const cleanSecret = String(sentSecret).replace(/^Bearer\s+/i, "").trim();

  if (cleanSecret !== String(SECRET).trim()) {
    log.warn("WIAPY: token invalido",
      "received_token_prefix", cleanSecret.substring(0, 6),
      "expected_prefix", String(SECRET).substring(0, 6));
    return e.json(401, {
      error: "unauthorized",
      hint: "token does not match WIAPY_WEBHOOK_SECRET",
      received_token_starts_with: cleanSecret.substring(0, 6),
    });
  }

  log.info("WIAPY: token OK");

  // 4) Pesca o e-mail e nome em vários formatos
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
      obj?.payer_email,
      obj?.customer_email,
      obj?.buyer_email,
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
      obj?.customer_name,
      obj?.buyer_name,
      obj?.name,
    ];
    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i]) return String(candidates[i]).trim();
    }
    return "";
  }

  const email = pickEmail(body);
  const nome = pickName(body);

  log.info("WIAPY: dados extraidos",
    "email", email || "(NAO ENCONTRADO)",
    "nome", nome || "(NAO ENCONTRADO)");

  if (!email) {
    log.error("WIAPY: payload sem email reconhecivel",
      "body", JSON.stringify(body));
    return e.json(400, {
      error: "no email found in payload",
      hint: "received payload did not contain a customer email in any known field",
      body_keys: Object.keys(body || {}),
    });
  }

  // 5) Identifica o evento
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

  log.info("WIAPY: evento detectado", "event", rawEvent || "(VAZIO)");

  let novoStatus = "";
  if (rawEvent.indexOf("estorn") !== -1 ||
      rawEvent.indexOf("refund") !== -1 ||
      rawEvent.indexOf("chargeback") !== -1) {
    novoStatus = "cancelado";
  } else if (rawEvent.indexOf("aprov") !== -1 ||
             rawEvent.indexOf("approv") !== -1 ||
             rawEvent.indexOf("paid") !== -1 ||
             rawEvent === "completed" ||
             rawEvent === "success" ||
             rawEvent === "ok") {
    novoStatus = "ativo";
  }

  if (!novoStatus) {
    log.warn("WIAPY: evento nao reconhecido", "event", rawEvent);
    return e.json(200, {
      ok: true,
      ignored: true,
      event: rawEvent || "(unknown)",
      hint: "event not in approve/cancel lists — webhook acknowledged but no action taken",
    });
  }

  log.info("WIAPY: vai atualizar status",
    "email", email, "status", novoStatus);

  // 6) Atualiza ou cria registro em "clientes"
  try {
    const escapedEmail = email.replace(/'/g, "");
    const record = $app.findFirstRecordByFilter(
      "clientes",
      "email = '" + escapedEmail + "'"
    );
    record.set("status", novoStatus);
    if (nome && !record.get("nome")) record.set("nome", nome);
    $app.save(record);
    log.info("WIAPY: registro ATUALIZADO",
      "email", email, "status", novoStatus, "event", rawEvent);
    return e.json(200, {
      ok: true,
      action: "updated",
      email: email,
      status: novoStatus,
      event: rawEvent,
    });
  } catch (err) {
    log.info("WIAPY: registro nao existe, criando novo",
      "email", email);
    try {
      const collection = $app.findCollectionByNameOrId("clientes");
      const record = new Record(collection);
      record.set("email", email);
      record.set("nome", nome);
      record.set("status", novoStatus);
      $app.save(record);
      log.info("WIAPY: registro CRIADO",
        "email", email, "status", novoStatus, "event", rawEvent);
      return e.json(200, {
        ok: true,
        action: "created",
        email: email,
        status: novoStatus,
        event: rawEvent,
      });
    } catch (err2) {
      log.error("WIAPY: ERRO ao criar registro",
        "email", email, "error", String(err2));
      return e.json(500, {
        error: "failed to create record",
        details: String(err2),
      });
    }
  }
});
