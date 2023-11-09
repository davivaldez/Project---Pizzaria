const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "pizzaria"
})

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com MySQL: ", err);

    return;
  }

  console.log("Conexão com MySQL feita com sucesso!");
})

exports.buscar = (res) => {
  // Rota [GET] para listar todos os fornecedores

  // Comando SQL para listar todos os fornecedores
  const sql = "SELECT * FROM fornecedor;";

  // Realizando consulta para listar todos os dados dos fornecedores
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      res.json({message: "Erro ao buscar fornecedores!"});

      return;
    }

    if (results.length === 0) {
      res.json({message: "Nenhum fornecedor foi cadastrado!"});

      return;
    }

    else {
      res.json(results);
    }
  })
}

exports.inserir = (fornecedor, res) => {
  // Rota [POST] para criar um fornecedor

  // Obtendo os dados do fornecedor
  const nome = fornecedor.nome;
  const cnpj = fornecedor.cnpj;
  const telefone = fornecedor.telefone;
  const email = fornecedor.email;

  // Verificando se os dados estão incompletos
  if (!nome || !cnpj || !telefone || !email) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se existe um fornecedor com o cnpj passado no body
  const select = "SELECT * FROM fornecedor where cnpj_fornecedor = ?";

  // Realizando consulta para verificar se existe um fornecedor com o cnpj passado no body
  connection.query(select, [cnpj], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length !== 0) {
      res.json({message: "Já existe um fornecedor com essa CNPJ!"});
    }

    else {
      // Comando SQL para inserir dados
      const sql = "INSERT INTO fornecedor (nome_fornecedor, cnpj_fornecedor, telefone_fornecedor, email_fornecedor) VALUES (?, ?, ?, ?);";

      // Realizando consulta para inserir dados
      connection.query(sql, [nome, cnpj, telefone, email], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        else {
          console.log(results);
          res.json({message: "Fornecedor criado com sucesso!"});
        }
      })
    }
  })
}

exports.deletar = (id, res) => {
  // ROTA [DELETE] para deletar um fornecedor por ID

  // Comando SQL para verificar se um fornecedor existe
  const select = "SELECT * FROM fornecedor WHERE id_fornecedor = ?";

  // Realizando consulta para verificar se um fornecedor existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Fornecedor não encontrado!"});
    }

    else {
      // Comando SQL para deletar dados de um fornecedor por ID
      const sql = "DELETE FROM fornecedor WHERE id_fornecedor = ?";

      // Realizando consulta para deletar dados de um fornecedor por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar fornecedor!"});
        }

        else {
          console.log(results);
          res.json({message: "Fornecedor deletado com sucesso!"})

          // Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
              // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE fornecedor SET id_fornecedor = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  // Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE fornecedor AUTO_INCREMENT = 1;";

                  connection.query(autoIncrement, (err, results) => {
                    if (err) {
                      console.error(err);
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
}

exports.atualizar = (fornecedor, id, res) => {
  // Rota [PUT] para atualizar um fornecedor

  // Obtendo os valores do body
  const nome = fornecedor.nome;
  const cnpj = fornecedor.cnpj;
  const telefone = fornecedor.telefone;
  const email = fornecedor.email;

  if (!nome || !cnpj || !telefone || !email) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se um fornecedor existe
  const select = "SELECT * FROM fornecedor WHERE id_fornecedor = ?";

  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Fornecedor não encontrado!"});
    }

    else {
      const sql = "UPDATE fornecedor SET nome_fornecedor = ?, cnpj_fornecedor = ?, telefone_fornecedor = ?, email_fornecedor = ? WHERE id_fornecedor = ?";

      connection.query(sql, [nome, cnpj, telefone, email, id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao atualizar fornecedor!"})
        }

        else {
          console.log(results);
          res.json({message: "Fornecedor atualizado com sucesso!"});
        }
      })
    }
  })
}

// Encerrando a conexão com o MySQL quando o servidor é encerrado
process.on('SIGINT', () => {

  console.log("Encerrando o servidor...");
      
  //Fechando a conexão com o MySQL
  connection.end((err) => {
    if (err) {
      console.error("Erro ao fechar a conexão com o MySQL: ", err);
    }

    else {
      console.log("Conexão com o MySQL fechada com sucesso.");
    }

    process.exit();
  })
})