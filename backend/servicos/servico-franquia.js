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
  // Rota [GET] para listar todas as franquias

  // Comando SQL para listar todas as franquias
  const sql = "SELECT * FROM franquia;";

  // Realizando consulta para listar todos os dados das franquias
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      res.json({message: "Erro ao buscar franquias!"});

      return;
    }

    if (results.length === 0) {
      res.json({message: "Nenhuma franquia foi cadastrada!"});

      return;
    }

    else {
      res.json(results);
    }
  })
}

exports.inserir = (franquia, res) => {
  // Rota [POST] para criar uma franquia

  // Obtendo os dados da franquia
  const nome = franquia.nome;
  const endereco = franquia.endereco;
  const fornecedor = franquia.fornecedor;

  // Verificando se os dados estão incompletos
  if (!nome || !endereco || !fornecedor) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se existe uma franquia com o nome passado no body
  const select = "SELECT * FROM franquia where nome_franquia = ?";

  // Realizando consulta para verificar se existe uma franquia com o nome passado no body
  connection.query(select, [nome], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length !== 0) {
      res.json({message: "Já existe uma franquia com esse nome!"});
    }

    else {
      // Comando SQL para verificar se uma franquia existe
      const selectFornecedorFranquia = "SELECT * FROM fornecedor WHERE id_fornecedor = ?;";

      connection.query(selectFornecedorFranquia, [fornecedor], (err, results) => {
        if (err) {
          console.error(err);
        }

        if (results.length === 0) {
          res.json({message: "Não existe um fornecedor com esse ID!"});
        }

        else {
          // Comando SQL para inserir dados
          const sql = "INSERT INTO franquia (nome_franquia, endereco_franquia, fk_fornecedor) VALUES (?, ?, ?);";

          // Realizando consulta para inserir dados
          connection.query(sql, [nome, endereco, fornecedor], (err, results) => {
            if (err) {
              console.error(err);

              return;
            }

            else {
              console.log(results);
              res.json({message: "Franquia criada com sucesso!"});
            }
          })
        }
      })
    }
  })
}

exports.deletar = (id, res) => {
  // ROTA [DELETE] para deletar uma franquia por ID

  // Comando SQL para verificar se uma franquia existe
  const select = "SELECT * FROM franquia WHERE id_franquia = ?";

  // Realizando consulta para verificar se uma franquia existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Franquia não encontrada!"});
    }

    else {
      // Comando SQL para deletar dados de uma franquia por ID
      const sql = "DELETE FROM franquia WHERE id_franquia = ?";

      // Realizando consulta para deletar dados de uma franquia por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar franquia!"});
        }

        else {
          console.log(results);
          res.json({message: "Franquia deletada com sucesso!"});
        
          // Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
              // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE franquia SET id_franquia = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  // Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE franquia AUTO_INCREMENT = 1;";

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

exports.atualizar = (franquia, id, res) => {
  // Rota [PUT] para atualizar uma franquia

  // Obtendo os valores do body
  const nome = franquia.nome;
  const endereco = franquia.endereco;
  const fornecedor = franquia.fornecedor;

  if (!nome || !endereco || !fornecedor) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se uma franquia existe
  const select = "SELECT * FROM franquia WHERE id_franquia = ?";

  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Franquia não encontrada!"});
    }

    else {
      const sql = "UPDATE franquia SET nome_franquia = ?, endereco_franquia = ?, fk_fornecedor = ? WHERE id_franquia = ?";

      connection.query(sql, [nome, endereco, fornecedor, id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao atualizar franquia!"})
          console.error(err);
        }

        else {
          console.log(results);
          res.json({message: "Franquia atualizada com sucesso!"});
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