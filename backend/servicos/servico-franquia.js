import * as connManager from "../conn-manager.js";

export async function buscar() {
  const sql = "SELECT * FROM franquia;";
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

export async function inserir(franquia) {
  const nome = franquia.nome;
  const endereco = franquia.endereco;
  const id_fornecedor = franquia.fornecedor;

  if (!nome || !endereco || !id_fornecedor)
    throw new Error("Dados incompletos!");

  const sql = "INSERT INTO franquia (nome, endereco, id_fornecedor) VALUES (?, ?, ?);";
  let conn = await connManager.createConnection();

  try 
  {
    await conn.query(sql, [nome, endereco, id_fornecedor]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function deletar(id) {
  const sql = "DELETE FROM franquia WHERE id = ?";
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

export async function atualizar(franquia) {
  const id = franquia.id;
  const nome = franquia.nome;
  const endereco = franquia.endereco;
  const id_fornecedor = franquia.fornecedor;

  if (!nome || !endereco || !id_fornecedor)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE franquia SET nome = ?, endereco = ?, id_fornecedor = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try 
  {
    await conn.query(sql, [nome, endereco, id_fornecedor, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}