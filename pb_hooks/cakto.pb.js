routerAdd("POST", "/api/cakto-webhook", (c) => {
  const SECRET = "COLOQUE_SEU_SECRET_AQUI";

  let body = {};
  try { body = $app.requestInfo(c).body; } catch(e) {
    return c.json(400, {error: "invalid body"});
  }

  if (body.secret !== SECRET) return c.json(401, {error: "unauthorized"});

  const email = body && body.data && body.data.customer ? body.data.customer.email : null;
  const nome  = body && body.data && body.data.customer ? (body.data.customer.name || "") : "";
  const event = body.event || "";

  if (!email) return c.json(400, {error: "no email"});

  const statusAtivo     = ["purchase_approved", "subscription_created", "subscription_renewed"];
  const statusCancelado = ["subscription_canceled", "subscription_renewal_refused", "refund", "chargeback"];

  let novoStatus = "";
  if (statusAtivo.indexOf(event) !== -1)     novoStatus = "ativo";
  if (statusCancelado.indexOf(event) !== -1) novoStatus = "cancelado";
  if (!novoStatus) return c.json(200, {ok: true, ignored: true});

  try {
    const record = $app.findFirstRecordByFilter("clientes", "email = '" + email + "'");
    record.set("status", novoStatus);
    $app.save(record);
    return c.json(200, {ok: true, status: novoStatus, email: email, action: "updated"});
  } catch(e) {
    const collection = $app.findCollectionByNameOrId("clientes");
    const record = new Record(collection);
    record.set("email", email);
    record.set("nome", nome);
    record.set("status", novoStatus);
    $app.save(record);
    return c.json(200, {ok: true, status: novoStatus, email: email, action: "created"});
  }
});
