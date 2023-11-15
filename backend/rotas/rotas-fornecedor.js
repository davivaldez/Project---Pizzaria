import * as servicoFornecedor from "../servicos/servico-fornecedor.js";

export function inicializaRotas(app) {
  app.get("/fornecedores", async (req, res) => {
    try
    {
      res.json(await servicoFornecedor.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });

  app.delete("/fornecedores/:id", async (req, res) => {
    try
    {
      await servicoFornecedor.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
    
  });
  
  app.put("/fornecedores/:id", async (req, res) => {
    try
    {
      await servicoFornecedor.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.post("/fornecedores", async (req, res) => {
    try
    {
      await servicoFornecedor.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
}