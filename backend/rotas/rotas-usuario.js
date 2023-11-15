import * as servicoUsuario from "../servicos/servico-usuario.js";

export function inicializaRotas(app) {
  app.get("/usuarios", async (req, res) => {
    try
    {
      res.json(await servicoUsuario.buscar());
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.delete("/usuarios/:id", async (req, res) => {
    try
    {
      await servicoUsuario.deletar(req.params.id);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.put("/usuarios/:id", async (req, res) => {
    try
    {
      await servicoUsuario.atualizar(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  app.post("/usuarios", async (req, res) => {
    try
    {
      await servicoUsuario.inserir(req.body);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
  
  // Login
  app.post("/login", async (req, res) => {
    try
    {
      await servicoUsuario.validarLogin(req.body.login, req.body.senha);
      res.json("OK");
    }
    catch(e)
    {
      res.statusCode = 400;
      res.json({ error: e.message });
    }
  });
}