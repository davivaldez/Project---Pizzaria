import * as servicoIngrediente from "../servicos/servico-ingrediente.js";

export function inicializaRotas(app) {
  app.get("/ingredientes", async (req, res) => {
    try
    {
      res.json(await servicoIngrediente.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.delete("/ingredientes/:id", async (req, res) => {
    try
    {
      await servicoIngrediente.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.put("/ingredientes/:id", async (req, res) => {
    try
    {
      await servicoIngrediente.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.post("/ingredientes", async (req, res) => {
    try
    {
      await servicoIngrediente.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
}