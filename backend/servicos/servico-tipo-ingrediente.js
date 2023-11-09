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
  // Rota [GET] para listar todos os tipos de ingredientes

  // Comando SQL para listar todos os tipos de ingredientes
  const sql = "SELECT * FROM tipo_ingredientes;";

  // Realizando consulta para listar todos os dados dos tipos de ingredientes
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      res.json({message: "Erro ao buscar tipo de ingrediente!"});

      return;
    }

    if (results.length === 0) {
      res.json({message: "Nenhum tipo de ingrediente foi cadastrado!"});

      return;
    }

    else {
      res.json(results);
    }
  })
}

exports.inserir = (tipoIngrediente, res) => {
  // Rota [POST] para criar um tipo de ingrediente

  // Obtendo os dados do tipo de ingrediente
  const nome = tipoIngrediente.nome;

  // Verificando se os dados estão incompletos
  if (!nome) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se existe um tipo de ingrediente com o nome passado no body
  const select = "SELECT * FROM tipo_ingredientes where nome_tipo = ?";

  // Realizando consulta para verificar se existe um tipo de ingrediente com o nome passado no body
  connection.query(select, [nome], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length !== 0) {
      res.json({message: "Já existe um tipo de ingrediente com esse nome!"});
    }

    else {
      // Comando SQL para inserir dados
      const sql = "INSERT INTO tipo_ingredientes (nome_tipo) VALUES (?);";

      // Realizando consulta para inserir dados
      connection.query(sql, [nome], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        else {
          console.log(results);
          res.json({message: "Tipo de ingrediente criado com sucesso!"});
        }
      })
    }
  })
}

exports.deletar = (id, res) => {
  // ROTA [DELETE] para deletar um tipo de ingrediente por ID

  // Comando SQL para verificar se um tipo de ingrediente existe
  const select = "SELECT * FROM tipo_ingredientes WHERE id_tipo = ?";

  // Realizando consulta para verificar se um tipo de ingrediente existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Tipo de ingrediente não encontrado!"});
    }

    else {
      // Comando SQL para deletar dados de um tipo de ingrediente por ID
      const sql = "DELETE FROM tipo_ingredientes WHERE id_tipo = ?";

      // Realizando consulta para deletar dados de um tipo de ingrediente por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar tipo de ingrediente!"});
        }

        else {
          console.log(results);
          res.json({message: "Tipo de ingrediente deletado com sucesso!"});
        
          // Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
              // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE tipo_ingredientes SET id_tipo = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  // Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE tipo_ingredientes AUTO_INCREMENT = 1;";

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

exports.atualizar = (tipoIngrediente, id, res) => {
  // Rota [PUT] para atualizar um tipo de ingrediente

  // Obtendo os valores do body
  const nome = tipoIngrediente.nome;

  if (!nome) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se um tipo de ingrediente existe
  const select = "SELECT * FROM tipo_ingredientes WHERE id_tipo = ?";

  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Tipo de ingrediente não encontrado!"});
    }

    else {
      // Comando SQL para verificar se existe um tipo de ingrediente com o nome passado no body
      const selectTipo = "SELECT * FROM tipo_ingredientes WHERE nome_tipo = ?";

      connection.query(selectTipo, [nome], (err, results) => {
        if (err) {
          console.error(err);
          return;
        }

        if (results.length !== 0) {
          res.json({message: "Esse tipo de ingrediente já existe!"});
        }

        else {
          const sql = "UPDATE tipo_ingredientes SET nome_tipo = ? WHERE id_tipo = ?";

          connection.query(sql, [nome, id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao atualizar tipo de ingrediente!"})
            }

            else {
              console.log(results);
              res.json({message: "Tipo de ingrediente atualizado com sucesso!"});
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