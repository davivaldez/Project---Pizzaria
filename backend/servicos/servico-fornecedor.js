import * as connManager from "../conn-manager.js";

export async function buscar() {
  let sql = "SELECT * FROM fornecedor;";
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

export async function inserir(fornecedor) {
  const nome = fornecedor.nome;
  const cnpj = fornecedor.cnpj;
  const telefone = fornecedor.telefone;
  const email = fornecedor.email;

  if (!nome || !cnpj || !telefone || !email)
    throw new Error("Dados incompletos!");

  const sql = "INSERT INTO fornecedor (nome, cnpj, telefone, email) VALUES (?, ?, ?, ?);";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, cnpj, telefone, email]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function deletar(id) {
  const sql = "DELETE FROM fornecedor WHERE id = ?";
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

export async function atualizar(fornecedor) {
  const id = fornecedor.id;
  const nome = fornecedor.nome;
  const cnpj = fornecedor.cnpj;
  const telefone = fornecedor.telefone;
  const email = fornecedor.email;

  if (!nome || !cnpj || !telefone || !email)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE fornecedor SET nome = ?, cnpj = ?, telefone = ?, email = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, cnpj, telefone, email, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}