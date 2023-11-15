import * as servicoTipoIngrediente from "../servicos/servico-tipo-ingrediente.js";

export function inicializaRotas(app) {
  app.get("/tipos", async (req, res) => {
    try
    {
      res.json(await servicoTipoIngrediente.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.delete("/tipos/:id", async (req, res) => {
    try
    {
      await servicoTipoIngrediente.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.put("/tipos/:id", async (req, res) => {
    try
    {
      await servicoTipoIngrediente.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.post("/tipos", async (req, res) => {
    try
    {
      await servicoTipoIngrediente.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });  
}