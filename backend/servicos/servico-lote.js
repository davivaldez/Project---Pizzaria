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
  // Rota [GET] para listar todos os lotes

  // Comando SQL para listar todos os lotes
  const sql = "SELECT * FROM lote;";

  // Realizando consulta para listar todos os dados dos lotes
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      res.json({message: "Erro ao buscar lotes!"});

      return;
    }

    if (results.length === 0) {
      res.json({message: "Nenhum lote foi cadastrado!"});

      return;
    }

    else {
      res.json(results);
    }
  })
}

exports.inserir = (lote, res) => {
  // Rota [POST] para criar um lote

  // Obtendo os dados do lote
  const compra = lote.compra;
  const validade = lote.validade;
  const quantidade = lote.quantidade;
  const preco = lote.preco;
  const ingredientes = lote.ingredientes;

  // Verificando se os dados estão incompletos
  if (!compra || !validade || !quantidade || !preco || !ingredientes) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se um ingrediente existe
  const selectTipoIngredientes = "SELECT * FROM ingredientes WHERE id_ingredientes = ?;";

  connection.query(selectTipoIngredientes, [ingredientes], (err, results) => {
    if (err) {
      console.error(err);
    }

    if (results.length === 0) {
      res.json({message: "Não existe um ingrediente com esse ID!"});
    }

    else {
      // Comando SQL para inserir dados
      const sql = "INSERT INTO lote (dt_compra_lote, dt_validade_lote, qtd_lote, preco, fk_ingredientes) VALUES (?, ?, ?, ?, ?);";

      // Realizando consulta para inserir dados
      connection.query(sql, [compra, validade, quantidade, preco, ingredientes], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        else {
          console.log(results);
          res.json({message: "Lote criado com sucesso!"});
        }
      })
    }
  })
}

exports.deletar = (id, res) => {
  //  ROTA [DELETE] para deletar um lote por ID

  //  Comando SQL para verificar se um lote existe
  const select = "SELECT * FROM lote WHERE id_lote = ?";

  //  Realizando consulta para verificar se um lote existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Lote não encontrado!"});
    }

    else {
      //  Comando SQL para deletar dados de um lote por ID
      const sql = "DELETE FROM lote WHERE id_lote = ?";

      //  Realizando consulta para deletar dados de um lote por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar lote!"});
        }

        else {
          console.log(results);
          res.json({message: "Lote deletado com sucesso!"});
          
          //  Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
                // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE lote SET id_lote = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  //  Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE lote AUTO_INCREMENT = 1;";

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

exports.atualizar = (lote, id, res) => {
  // Rota [PUT] para atualizar um lote

  // Obtendo os dados do lote
  const compra = lote.compra;
  const validade = lote.validade;
  const quantidade = lote.quantidade;
  const preco = lote.preco;
  const ingredientes = lote.ingredientes;

  // Verificando se os dados estão incompletos
  if (!compra || !validade || !quantidade || !preco || !ingredientes) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se um lote existe
  const select = "SELECT * FROM lote WHERE id_lote = ?";

  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Lote não encontrado!"});
    }

    else {
      // Comando SQL para verificar se um ingrediente existe
      const selectIngredientes = "SELECT * FROM ingredientes WHERE id_ingredientes = ?;";

      connection.query(selectIngredientes, [ingredientes], (err, results) => {
        if (err) {
          console.error(err);
        }

        if (results.length === 0) {
          res.json({message: "Não existe um ingrediente com esse ID!"});
        }

        else {
          const sql = "UPDATE lote SET dt_compra_lote = ?, dt_validade_lote = ?, qtd_lote = ?, preco = ?, fk_ingredientes = ? WHERE id_lote = ?";

          connection.query(sql, [compra, validade, quantidade, preco, ingredientes, id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao atualizar lote!"})
              console.error(err);
            }

            else {
              console.log(results);
              res.json({message: "Lote atualizado com sucesso!"});
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