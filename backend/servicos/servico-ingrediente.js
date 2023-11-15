import * as connManager from "../conn-manager.js";

export async function buscar() {
  const sql = "SELECT * FROM ingredientes;";
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

export async function inserir(ingrediente) {
  const nome = ingrediente.nome;
  const idTipo = ingrediente.tipo;

  if (!nome || !idTipo)
    throw new Error("Dados incompletos!");

  const sql = "INSERT INTO ingredientes (nome, id_tipo) VALUES (?, ?);";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, idTipo]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function deletar(id) {
  const sql = "DELETE FROM ingredientes WHERE id = ?";
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

export async function atualizar(ingrediente) {
  const id = ingrediente.id;
  const nome = ingrediente.nome;
  const idTipo = ingrediente.tipo;

  if (!nome || !idTipo)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE ingredientes SET nome = ?, id_tipo = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, idTipo, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}