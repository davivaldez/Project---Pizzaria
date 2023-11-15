import * as servicoFranquia from "../servicos/servico-franquia.js";

export function inicializaRotas(app) {
  app.get("/franquias", async (req, res) => {
    try
    {
      res.json(await servicoFranquia.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });

  app.delete("/franquias/:id", async (req, res) => {
    try
    {
      await servicoFranquia.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });

  app.put("/franquias/:id", async (req, res) => {
    try
    {
      await servicoFranquia.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });

  app.post("/franquias", async (req, res) => {
    try
    {
      await servicoFranquia.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
}