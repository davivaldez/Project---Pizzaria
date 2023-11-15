import * as connManager from "../conn-manager.js";

export async function buscar() {
  const sql = "SELECT * FROM tipo_ingredientes;";
  let conn = await connManager.createConnection();

  try
  {
    let [rows] = await conn.query(sql);
    return rows;
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function inserir(tipoIngrediente) {
  const nome = tipoIngrediente.nome;

  if (!nome)
    throw new Error("Dados incompletos!");

  const sql = "INSERT INTO tipo_ingredientes (nome) VALUES (?);";
  let conn = await connManager.createConnection();

  try 
  {
    await conn.query(sql, [nome]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function deletar(id) {
  const sql = "DELETE FROM tipo_ingredientes WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function atualizar(tipoIngrediente) {
  const id = tipoIngrediente.id;
  const nome = tipoIngrediente.nome;

  if (!nome)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE tipo_ingredientes SET nome = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}