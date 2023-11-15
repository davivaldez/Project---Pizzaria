import * as servicoLote from "../servicos/servico-lote.js";

export function inicializaRotas(app) {
  app.get("/lotes", async (req, res) => {
    try
    {
      res.json(await servicoLote.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.delete("/lotes/:id", async (req, res) => {
    try
    {
      await servicoLote.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.put("/lotes/:id", async (req, res) => {
    try
    {
      await servicoLote.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.post("/lotes", async (req, res) => {
    try
    {
      await servicoLote.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
}