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
  // Rota [GET] para listar todos os ingredientes

  // Comando SQL para listar todos os ingredientes
  const sql = "SELECT * FROM ingredientes;";

  // Realizando consulta para listar todos os dados dos ingredientes
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      res.json({message: "Erro ao buscar ingredientes!"});

      return;
    }

    if (results.length === 0) {
      res.json({message: "Nenhum ingrediente foi cadastrado!"});

      return;
    }

    else {
      res.json(results);
    }
  })
}

exports.inserir = (ingrediente, res) => {
  // Rota [POST] para criar um ingrediente

  // Obtendo os dados do ingrediente
  const nome = ingrediente.nome;
  const tipo = ingrediente.tipo;

  // Verificando se os dados estão incompletos
  if (!nome || !tipo) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se existe um ingrediente com o nome passado no body
  const select = "SELECT * FROM ingredientes where nome_ingredientes = ?";

  // Realizando consulta para verificar se existe um ingrediente com o nome passado no body
  connection.query(select, [nome], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length !== 0) {
      res.json({message: "Já existe um ingrediente com esse nome!"});
    }

    else {
      // Comando SQL para verificar se um tipo de ingrediente existe
      const selectTipoIngredientes = "SELECT * FROM tipo_ingredientes WHERE id_tipo = ?;";

      connection.query(selectTipoIngredientes, [tipo], (err, results) => {
        if (err) {
          console.error(err);
        }

        if (results.length === 0) {
          res.json({message: "Não existe um tipo de ingrediente com esse ID!"});
        }

        else {
          // Comando SQL para inserir dados
          const sql = "INSERT INTO ingredientes (nome_ingredientes, fk_tipo) VALUES (?, ?);";

          // Realizando consulta para inserir dados
          connection.query(sql, [nome, tipo], (err, results) => {
            if (err) {
              console.error(err);

              return;
            }

            else {
              console.log(results);
              res.json({message: "Ingrediente criado com sucesso!"});
            }
          })
        }
      })
    }
  })
}

exports.deletar = (id, res) => {
  // ROTA [DELETE] para deletar um ingrediente por ID

  // Comando SQL para verificar se um ingrediente existe
  const select = "SELECT * FROM ingredientes WHERE id_ingredientes = ?";

  // Realizando consulta para verificar se um ingrediente existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Ingrediente não encontrado!"});
    }

    else {
      // Comando SQL para deletar dados de um ingrediente por ID
      const sql = "DELETE FROM ingredientes WHERE id_ingredientes = ?";

      // Realizando consulta para deletar dados de um ingrediente por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar ingrediente!"});
        }

        else {
          console.log(results);
          res.json({message: "Ingrediente deletado com sucesso!"});
        
          // Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
              // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE ingredientes SET id_ingredientes = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  // Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE ingredientes AUTO_INCREMENT = 1;";

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

exports.atualizar = (ingrediente, id, res) => {
  // Rota [PUT] para atualizar um ingrediente

  // Obtendo os valores do body
  const nome = ingrediente.nome;
  const tipo = ingrediente.tipo;

  // Verificando se os dados estão incompletos
  if (!nome || !tipo) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se um ingrediente existe
  const select = "SELECT * FROM ingredientes WHERE id_ingredientes = ?";

  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Ingrediente não encontrado!"});
    }

    else {
      // Comando SQL para verificar se existe um ingrediente com o nome passado no body
      const selectIngredientes = "SELECT * FROM ingredientes WHERE nome_ingredientes = ? AND fk_tipo = ?;";

      connection.query(selectIngredientes, [nome, tipo], (err, results) => {
        if (err) {
          console.error(err);
        }

        if (results.length !== 0) {
          res.json({message: "Esse ingrediente já está sendo utilizado!"});
        }

        else {
          // Comando SQL para verificar se um tipo de ingrediente existe
          const selectTipoIngredientes = "SELECT * FROM tipo_ingredientes WHERE id_tipo = ?;";

          connection.query(selectTipoIngredientes, [tipo], (err, results) => {
            if (err) {
              console.error(err);
            }

            if (results.length === 0) {
              res.json({message: "Não existe um tipo de ingrediente com esse ID!"});
            }

            else {
              const sql = "UPDATE ingredientes SET nome_ingredientes = ?, fk_tipo = ? WHERE id_ingredientes = ?";

              connection.query(sql, [nome, tipo, id], (err, results) => {
                if (err) {
                  res.json({message: "Erro ao atualizar ingrediente!"})
                  console.error(err);
                }

                else {
                  console.log(results);
                  res.json({message: "Ingrediente atualizado com sucesso!"});
                }
              })
            }
          })
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