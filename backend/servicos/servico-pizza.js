import * as connManager from "../conn-manager.js";

export async function buscar() {
  const sql = "SELECT * FROM pizza;"
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

export async function inserir(pizza) {
  const nome = pizza.nome;
  const preco = pizza.preco;
  const tamanho = pizza.tamanho;

  if (!nome || !preco || !tamanho)
    throw new Error("Dados incompletos!");

  const sql = "INSERT INTO pizza (nome, preco, tamanho) VALUES (?, ?, ?);";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, preco, tamanho]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function deletar(id) {
  const sql = "DELETE FROM pizza WHERE id = ?";
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

export async function atualizar(pizza) {
  const id = pizza.id;
  const nome = pizza.nome;
  const preco = pizza.preco;
  const tamanho = pizza.tamanho;

  if (!nome || !preco || !tamanho)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE pizza SET nome = ?, preco = ?, tamanho = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, preco, tamanho, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}