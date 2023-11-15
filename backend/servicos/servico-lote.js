import * as connManager from "../conn-manager.js";

export async function buscar() {
  const sql = "SELECT * FROM lote;";
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

export async function inserir(lote) {
  const dtCompra = lote.compra;
  const dtValidade = lote.validade;
  const qtd = lote.quantidade;
  const preco = lote.preco;
  const idIngredientes = lote.ingredientes;

  if (!dtCompra || !dtValidade || !qtd || !preco || !idIngredientes)
    return { message: "Dados incompletos!" };

  const sql = "INSERT INTO lote (dt_compra, dt_validade, qtd, preco, id_ingredientes) VALUES (?, ?, ?, ?, ?);";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [dtCompra, dtValidade, qtd, preco, idIngredientes]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}


export async function deletar(id) {
  const sql = "DELETE FROM lote WHERE id = ?";
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

export async function atualizar(lote) {
  const id = lote.id;
  const dtCompra = lote.compra;
  const dtValidade = lote.validade;
  const qtd = lote.quantidade;
  const preco = lote.preco;
  const idIngredientes = lote.ingredientes;

  if (!dtCompra || !dtValidade || !qtd || !preco || !idIngredientes)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE lote SET dt_compra = ?, dt_validade = ?, qtd = ?, preco = ?, id_ingredientes = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [dtCompra, dtValidade, qtd, preco, idIngredientes, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}