/**
 * wiapy.pb.js v3 — Webhook da Wiapy (compra VITALÍCIA) + LOG completo
 *
 * Corrige o bug onde Wiapy envia o status em `data.payment.status` (não em `event`).
 */
routerAdd("POST", "/api/wiapy-webhook", (e) => {
  const log = $app.logger();
  log.info("=== WIAPY WEBHOOK RECEBIDO ===", "ts", new Date().toISOString());

  const SECRET = $os.getenv("WIAPY_WEBHOOK_SECRET");
  if (!SECRET) {
    log.error("WIAPY: missing WIAPY_WEBHOOK_SECRET env var");
    return e.json(500, { error: "missing webhook secret on server" });
  }

  const allHeaders = {};
  try {
    const names = ["authorization","x-wiapy-secret","x-wiapy-signature","x-webhook-token","x-webhook-secret","user-agent","content-type","x-forwarded-for"];
    for (let i = 0; i < names.length; i++) {
      const v = e.request.header.get(names[i]);
      if (v) allHeaders[names[i]] = v;
    }
  } catch (err) {}
  log.info("WIAPY: headers", "data", JSON.stringify(allHeaders));

  let body = {};
  try { body = e.requestInfo().body || {}; }
  catch (err) {
    log.error("WIAPY: invalid body", "error", String(err));
    return e.json(400, { error: "invalid body" });
  }
  log.info("WIAPY: body", "data", JSON.stringify(body));

  const headerSecret =
    e.request.header.get("authorization") ||
    e.request.header.get("x-wiapy-secret") ||
    e.request.header.get("x-wiapy-signature") ||
    e.request.header.get("x-webhook-token") ||
    e.request.header.get("x-webhook-secret") || "";

  const sentSecret = headerSecret || body.secret || body.token || body.authentication_token || body.auth_token || "";
  const cleanSecret = String(sentSecret).replace(/^Bearer\s+/i, "").trim();

  if (cleanSecret !== String(SECRET).trim()) {
    log.warn("WIAPY: token invalido", "received_prefix", cleanSecret.substring(0, 6));
    return e.json(401, { error: "unauthorized" });
  }
  log.info("WIAPY: token OK");

  function pick(obj, paths) {
    for (let i = 0; i < paths.length; i++) {
      const parts = paths[i].split(".");
      let cur = obj;
      for (let j = 0; j < parts.length; j++) {
        if (!cur) break;
        cur = cur[parts[j]];
      }
      if (cur) return String(cur).trim();
    }
    return "";
  }

  const email = pick(body, [
    "data.customer.email","data.buyer.email","data.client.email","data.user.email","data.payer.email","data.email",
    "customer.email","buyer.email","client.email","user.email","payer.email",
    "transaction.customer.email","order.customer.email","sale.customer.email",
    "payer_email","customer_email","buyer_email","email"
  ]).toLowerCase();

  const nome = pick(body, [
    "data.customer.name","data.buyer.name","data.client.name","data.customer.full_name",
    "customer.name","buyer.name","client.name","customer.full_name",
    "transaction.customer.name","order.customer.name","customer_name","buyer_name","name"
  ]);

  log.info("WIAPY: dados", "email", email || "(VAZIO)", "nome", nome || "(VAZIO)");

  if (!email) {
    log.error("WIAPY: payload sem email", "body", JSON.stringify(body));
    return e.json(400, { error: "no email found in payload" });
  }

  // BUG FIX v3: a Wiapy envia status em `data.payment.status` ("paid", "refunded", etc)
  // Pescamos em multiplos lugares
  const rawEvent = pick(body, [
    "event","event_type","type","status",
    "data.event","data.status","data.type",
    "data.payment.status","data.payment.type",
    "data.transaction.status","data.transaction.type",
    "data.order.status","data.order.type",
    "data.sale.status","data.sale.type",
    "payment.status","transaction.status","order.status","sale.status"
  ]).toLowerCase();

  log.info("WIAPY: evento", "event", rawEvent || "(VAZIO)");

  let novoStatus = "";
  if (rawEvent.indexOf("estorn") !== -1 ||
      rawEvent.indexOf("refund") !== -1 ||
      rawEvent.indexOf("chargeback") !== -1 ||
      rawEvent.indexOf("cancel") !== -1) {
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
    return e.json(200, { ok: true, ignored: true, event: rawEvent || "(unknown)" });
  }

  log.info("WIAPY: atualizando", "email", email, "status", novoStatus);

  try {
    const escapedEmail = email.replace(/'/g, "");
    const record = $app.findFirstRecordByFilter("clientes", "email = '" + escapedEmail + "'");
    record.set("status", novoStatus);
    if (nome && !record.get("nome")) record.set("nome", nome);
    $app.save(record);
    log.info("WIAPY: ATUALIZADO", "email", email, "status", novoStatus);
    return e.json(200, { ok: true, action: "updated", email: email, status: novoStatus, event: rawEvent });
  } catch (err) {
    try {
      const collection = $app.findCollectionByNameOrId("clientes");
      const record = new Record(collection);
      record.set("email", email);
      record.set("nome", nome);
      record.set("status", novoStatus);
      $app.save(record);
      log.info("WIAPY: CRIADO", "email", email, "status", novoStatus);
      return e.json(200, { ok: true, action: "created", email: email, status: novoStatus, event: rawEvent });
    } catch (err2) {
      log.error("WIAPY: ERRO ao criar", "email", email, "error", String(err2));
      return e.json(500, { error: "failed to create record", details: String(err2) });
    }
  }
});
