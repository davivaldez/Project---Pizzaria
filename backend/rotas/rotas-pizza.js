import * as servicoPizza from "../servicos/servico-pizza.js";

export function inicializaRotas(app) {
  app.get("/pizzas", async (req, res) => {
    try
    {
      res.json(await servicoPizza.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.delete("/pizzas/:id", async (req, res) => {
    try
    {
      await servicoPizza.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.put("/pizzas/:id", async (req, res) => {
    try
    {
      await servicoPizza.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.post("/pizzas", async (req, res) => {
    try
    {
      await servicoPizza.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
}