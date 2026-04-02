migrate((app) => {
  let collection;

  try {
    collection = app.findCollectionByNameOrId("clientes");
  } catch (_) {
    collection = new Collection({
      type: "base",
      name: "clientes",
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [],
    });
  }

  collection.name = "clientes";

  let emailField = collection.fields.getByName?.("email");
  if (!emailField) {
    collection.fields.add(
      new EmailField({
        name: "email",
        required: true,
        presentable: true,
      }),
    );
  } else {
    emailField.required = true;
    emailField.presentable = true;
  }

  let nomeField = collection.fields.getByName?.("nome");
  if (!nomeField) {
    collection.fields.add(
      new TextField({
        name: "nome",
        required: false,
        max: 120,
      }),
    );
  } else {
    nomeField.max = 120;
  }

  let statusField = collection.fields.getByName?.("status");
  if (!statusField) {
    collection.fields.add(
      new TextField({
        name: "status",
        required: false,
        max: 30,
      }),
    );
  } else {
    statusField.max = 30;
  }

  collection.indexes = [
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_clientes_email ON clientes (email)",
  ];

  app.save(collection);
}, (app) => {
  try {
    let collection = app.findCollectionByNameOrId("clientes");
    app.delete(collection);
  } catch (_) {
    // ignore if already removed
  }
});
