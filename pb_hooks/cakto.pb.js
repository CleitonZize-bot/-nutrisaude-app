routerAdd("POST", "/api/cakto-webhook", (e) => {
  const SECRET = $os.getenv("CAKTO_WEBHOOK_SECRET");

  let body = {};
  try {
    body = e.requestInfo().body || {};
  } catch(err) {
    return e.json(400, {error: "invalid body"});
  }

  if (!SECRET) return e.json(500, {error: "missing webhook secret"});
  if (body.secret !== SECRET) return e.json(401, {error: "unauthorized"});

  const customer = body.data && body.data.customer ? body.data.customer : {};
  const email    = String(customer.email || "").trim().toLowerCase();
  const nome     = customer.name  || "";
  const event    = body.event     || "";

  if (!email) return e.json(400, {error: "no email"});

  const statusAtivo     = ["purchase_approved", "subscription_created", "subscription_renewed"];
  const statusCancelado = ["subscription_canceled", "subscription_renewal_refused", "refund", "chargeback"];

  let novoStatus = "";
  if (statusAtivo.indexOf(event) !== -1)     novoStatus = "ativo";
  if (statusCancelado.indexOf(event) !== -1) novoStatus = "cancelado";
  if (!novoStatus) return e.json(200, {ok: true, ignored: true});

  try {
    const record = $app.findFirstRecordByFilter("clientes", "email = '" + email + "'");
    record.set("status", novoStatus);
    $app.save(record);
    return e.json(200, {ok: true, status: novoStatus, email: email, action: "updated"});
  } catch(err) {
    const collection = $app.findCollectionByNameOrId("clientes");
    const record = new Record(collection);
    record.set("email", email);
    record.set("nome", nome);
    record.set("status", novoStatus);
    $app.save(record);
    return e.json(200, {ok: true, status: novoStatus, email: email, action: "created"});
  }
});
