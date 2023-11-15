import * as connManager from "../conn-manager.js";

export async function validarLogin(login, senha) {
  const sql = "SELECT id FROM usuario WHERE login = ? AND senha = ?;";
  let conn = await connManager.createConnection();

  try
  {
    let [rows] = await conn.query(sql, [ login, senha ]);

    if (rows.length === 0)
      throw new Error("Login inválido!");
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function buscar() {
  const sql = "SELECT * FROM usuario;";
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

export async function inserir(usuario) {
  const email = usuario.email;
  const login = usuario.login;
  const senha = usuario.senha;

  if (!email || !login || !senha)
    throw new Error("Dados incompletos!");

  const sql = "INSERT INTO usuario (email, login, senha) VALUES (?, ?, ?);";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [email, login, senha]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}

export async function deletar(id) {
  const sql = "DELETE FROM usuario WHERE id = ?";
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

export async function atualizar(usuario) {
  const id = usuario.id;
  const email = usuario.email;
  const login = usuario.login;
  const senha = usuario.senha;

  if (!email || !login || !senha)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE usuario SET email = ?, login = ?, senha = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [email, login, senha, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  }
}