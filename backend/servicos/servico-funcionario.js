import * as connManager from "../conn-manager.js";

export async function buscar() {
  const sql = "SELECT * FROM funcionario;";
  let conn = await connManager.createConnection();

  try 
  {
    let [rows] = await conn.query(sql)
    return rows;
  }
  finally
  {
    connManager.closeConn(conn);
  }
}


export async function inserir(funcionario) {
  const nome = funcionario.nome;
  const dtNascimento = funcionario.nascimento;
  const endereco = funcionario.endereco;
  const cpf = funcionario.cpf;
  const email = funcionario.email;
  const telefone = funcionario.telefone;
  const idUsuario = funcionario.usuario;
  const idFranquia = funcionario.franquia;

  if (!nome || !dtNascimento || !endereco || !cpf || !email || !telefone || !idUsuario || !idFranquia)
    throw new Error("Dados incompletos!");

  const sql = "INSERT INTO funcionario (nome, dt_nascimento, endereco, cpf, email, telefone, id_usuario, id_franquia) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, dtNascimento, endereco, cpf, email, telefone, idUsuario, idFranquia]);
  }
  finally
  {
    connManager.closeConn(conn);
  }   
}

export async function deletar(id) {
  const sql = "DELETE FROM funcionario WHERE id = ?";
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

export async function atualizar(funcionario) {
  const id = funcionario.id
  const nome = funcionario.nome;
  const dtNascimento = funcionario.nascimento;
  const endereco = funcionario.endereco;
  const cpf = funcionario.cpf;
  const email = funcionario.email;
  const telefone = funcionario.telefone;
  const idUsuario = funcionario.usuario;
  const idFranquia = funcionario.franquia;

  if (!nome || !dtNascimento || !endereco || !cpf || !email || !telefone || !idUsuario || !idFranquia)
    throw new Error("Dados incompletos!");

  const sql = "UPDATE funcionario SET nome = ?, dt_nascimento = ?, endereco = ?, cpf = ?, email = ?, telefone = ?, id_usuario = ?, id_franquia = ? WHERE id = ?";
  let conn = await connManager.createConnection();

  try
  {
    await conn.query(sql, [nome, dtNascimento, endereco, cpf, email, telefone, idUsuario, idFranquia, id]);
  }
  finally
  {
    connManager.closeConn(conn);
  } 
}