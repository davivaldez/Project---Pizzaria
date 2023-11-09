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
  //Rota [GET] para listar todas as pizzas

  //Comando SQL para listar todas as pizzas
  const sql = "SELECT * FROM pizza;";

  //Realizando consulta para listar todos os dados das pizzas
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      res.json({message: "Erro ao buscar pizzas!"});

      return;
    }

    if (results.length === 0) {
      res.json({message: "Nenhuma pizza foi cadastrada!"});

      return;
    }

    else {
      res.json(results);
    }
  })
}

exports.inserir = (pizza, res) => {
  //Rota [POST] para criar uma pizza

  //Obtendo os dados da pizza
  const nome = pizza.nome;
  const preco = pizza.preco;
  const tamanho = pizza.tamanho;

  //Verificando se os dados estão incompletos
  if (!nome || !preco || !tamanho) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  //Comando SQL para verificar se existe uma pizza com os mesmos valores passados no body
  const select = "SELECT * FROM pizza where nome_pizza = ? AND tamanho = ?";

  //Realizando consulta para verificar se existe uma pizza com os valores passados no body
  connection.query(select, [nome, tamanho], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length !== 0) {
      res.json({message: "Já existe uma pizza com esses valores!"});
    }

    else {
      //Comando SQL para inserir dados
      const sql = "INSERT INTO pizza (nome_pizza, preco_pizza, tamanho) VALUES (?, ?, ?);";

      //Realizando consulta para inserir dados
      connection.query(sql, [nome, preco, tamanho], (err, results) => {
        if (err) {
          console.error(err);

          res.json({message: "Erro ao criar pizza!"});

          return;
        }

        else {
          console.log(results);
          res.json({message: "Pizza criada com sucesso!"});
        }
      })
    }
  })
}

exports.deletar = (id, res) => {
  //ROTA [DELETE] para deletar uma pizza por ID

  //Comando SQL para verificar se uma pizza existe
  const select = "SELECT * FROM pizza WHERE id_pizza = ?";

  //Realizando consulta para verificar se uma pizza existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Pizza não encontrada!"});
    }

    else {
      //Comando SQL para deletar dados de uma pizza por ID
      const sql = "DELETE FROM pizza WHERE id_pizza = ?";

      //Realizando consulta para deletar dados de uma pizza por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar pizza!"});
        }

        else {
          console.log(results);
          res.json({message: "Pizza deletada com sucesso!"});
          
          //Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
              // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE pizza SET id_pizza = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE pizza AUTO_INCREMENT = 1;";

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

exports.atualizar = (pizza, id, res) => {
  //Rota [PUT] para atualizar uma pizza

    //Obtendo os dados da pizza
    const nome = pizza.nome;
    const preco = pizza.preco;
    const tamanho = pizza.tamanho;

    //Verificando se os dados estão incompletos
    if (!nome || !preco || !tamanho) {
      res.json({message: "Dados incompletos!"});

      return;
    }

  //Comando SQL para verificar se uma pizza existe
  const select = "SELECT * FROM pizza WHERE id_pizza = ?";

  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Pizza não encontrada!"});
    }

    else {
      //Comando SQL para verificar se existe uma pizza com os mesmos valores passados no body
      const select = "SELECT * FROM pizza where nome_pizza = ? AND preco_pizza = ? AND tamanho = ?";

      //Realizando consulta para verificar se existe uma pizza com os valores passados no body
      connection.query(select, [nome, preco, tamanho], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length !== 0) {
          res.json({message: "Já existe uma pizza com esses valores!"});
        }
        
        else {
          const sql = "UPDATE pizza SET nome_pizza = ?, preco_pizza = ?, tamanho = ? WHERE id_pizza = ?";

          connection.query(sql, [nome, preco, tamanho, id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao atualizar pizza!"})
            }

            else {
              console.log(results);
              res.json({message: "Pizza atualizada com sucesso!"});
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