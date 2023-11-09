const express = require("express")
const cors = require("cors");

const servicoFornecedor = require("./servicos/servico-fornecedor");
const servicoFranquia = require("./servicos/servico-franquia");
const servicoFuncionario = require("./servicos/servico-funcionario");
const servicoIngrediente = require("./servicos/servico-ingrediente");
const servicoLote = require("./servicos/servico-lote");
const servicoPizza = require("./servicos/servico-pizza");
const servicoTipoIngrediente = require("./servicos/servico-tipo-ingrediente");
const servicoUsuario = require("./servicos/servico-usuario");
const servicoLogin = require("./servicos/servico-login");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Fornecedores
app.get("/fornecedores", (req, res) => {
  servicoFornecedor.buscar(res);
});

app.delete("/fornecedores/:id", (req, res) => {
  servicoFornecedor.deletar(req.params.id, res);
});

app.put("/fornecedores/:id", (req, res) => {
  servicoFornecedor.atualizar(req.body, req.params.id, res);
});

app.post("/fornecedores", (req, res) => {
  servicoFornecedor.inserir(req.body, res);
});


// // Franquias
app.get("/franquias", (req, res) => {
  servicoFranquia.buscar(res);
});

app.delete("/franquias/:id", (req, res) => {
  servicoFranquia.deletar(req.params.id, res);
});

app.put("/franquias/:id", (req, res) => {
  servicoFranquia.atualizar(req.body, req.params.id, res);
});

app.post("/franquias", (req, res) => {
  servicoFranquia.inserir(req.body, res);
});


// Funcionários
app.get("/funcionarios", (req, res) => {
  servicoFuncionario.buscar(res);
});

app.delete("/funcionarios/:id", (req, res) => {
  servicoFuncionario.deletar(req.params.id, res);
});

app.put("/funcionarios/:id", (req, res) => {
  servicoFuncionario.atualizar(req.body, req.params.id, res);
});

app.post("/funcionarios", (req, res) => {
  servicoFuncionario.inserir(req.body, res);
});


// Ingredientes
app.get("/ingredientes", (req, res) => {
  servicoIngrediente.buscar(res);
});

app.delete("/ingredientes/:id", (req, res) => {
  servicoIngrediente.deletar(req.params.id, res);
});

app.put("/ingredientes/:id", (req, res) => {
  servicoIngrediente.atualizar(req.body, req.params.id, res);
});

app.post("/ingredientes", (req, res) => {
  servicoIngrediente.inserir(req.body, res);
});

// Lotes
app.get("/lotes", (req, res) => {
  servicoLote.buscar(res);
});

app.delete("/lotes/:id", (req, res) => {
  servicoLote.deletar(req.params.id, res);
});

app.put("/lotes/:id", (req, res) => {
  servicoLote.atualizar(req.body, req.params.id, res);
});

app.post("/lotes", (req, res) => {
  servicoLote.inserir(req.body, res);
});


// Pizzas
app.get("/pizzas", (req, res) => {
  servicoPizza.buscar(res);
});

app.delete("/pizzas/:id", (req, res) => {
  servicoPizza.deletar(req.params.id, res);
});

app.put("/pizzas/:id", (req, res) => {
  servicoPizza.atualizar(req.body, req.params.id, res);
});

app.post("/pizzas", (req, res) => {
  servicoPizza.inserir(req.body, res);
});


// Tipos de Ingrediente
app.get("/tipos", (req, res) => {
  servicoTipoIngrediente.buscar(res);
});

app.delete("/tipos/:id", (req, res) => {
  servicoTipoIngrediente.deletar(req.params.id, res);
});

app.put("/tipos/:id", (req, res) => {
  servicoTipoIngrediente.atualizar(req.body, req.params.id, res);
});

app.post("/tipos", (req, res) => {
  servicoTipoIngrediente.inserir(req.body, res);
});


// Usuários
app.get("/usuarios", (req, res) => {
  servicoUsuario.buscar(res);
});

app.delete("/usuarios/:id", (req, res) => {
  servicoUsuario.deletar(req.params.id, res);
});

app.put("/usuarios/:id", (req, res) => {
 servicoUsuario.atualizar(req.body, req.params.id, res);
});

app.post("/usuarios", (req, res) => {
  servicoUsuario.inserir(req.body, res);
});

// Login
app.post("/login", (req, res) => {
  servicoLogin.inserir(req.body, res);
})

//Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});