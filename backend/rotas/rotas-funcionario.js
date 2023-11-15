import * as servicoFuncionario from "../servicos/servico-funcionario.js";

export function inicializaRotas(app) {
  app.get("/funcionarios", async (req, res) => {
    try
    {
      res.json(await servicoFuncionario.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.delete("/funcionarios/:id", async (req, res) => {
    try
    {
      await servicoFuncionario.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.put("/funcionarios/:id", async (req, res) => {
    try
    {
      await servicoFuncionario.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.post("/funcionarios", async (req, res) => {
    try
    {
      await servicoFuncionario.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({message: e.message });
    }
  });
}