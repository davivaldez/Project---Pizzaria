import express from "express";
import cors from "cors";

import * as rotasFornecedor from "./rotas/rotas-fornecedor.js";
import * as rotasFranquia from "./rotas/rotas-franquia.js";
import * as rotasFuncionario from "./rotas/rotas-funcionario.js";
import * as rotasIngrediente from "./rotas/rotas-ingrediente.js";
import * as rotasLote from "./rotas/rotas-lote.js";
import * as rotasPizza from "./rotas/rotas-pizza.js";
import * as rotastipoIngrediente from "./rotas/rotas-tipo-ingrediente.js";
import * as rotasUsuario from "./rotas/rotas-usuario.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

rotasFornecedor.inicializaRotas(app);
rotasFranquia.inicializaRotas(app);
rotasFuncionario.inicializaRotas(app);
rotasIngrediente.inicializaRotas(app);
rotasLote.inicializaRotas(app);
rotasPizza.inicializaRotas(app);
rotastipoIngrediente.inicializaRotas(app);
rotasUsuario.inicializaRotas(app);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});