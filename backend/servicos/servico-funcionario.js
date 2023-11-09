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
  // Rota [GET] para listar todos os funcionários

  // Comando SQL para listar todos os funcionários
  const sql = "SELECT * FROM funcionario;";

  // Realizando consulta para listar todos os dados dos funcionários
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      res.json({message: "Erro ao buscar funcionários!"});

      return;
    }

    if (results.length === 0) {
      res.json({message: "Nenhum funcionário foi cadastrado!"});

      return;
    }

    else {
      res.json(results);
    }
  })
}

exports.inserir = (funcionario, res) => {
  // Rota [POST] para criar um funcionário

  // Obtendo os dados do funcionário
  const nome = funcionario.nome;
  const nascimento = funcionario.nascimento;
  const endereco = funcionario.endereco;
  const cpf = funcionario.cpf;
  const email = funcionario.email;
  const telefone = funcionario.telefone;
  const usuario = funcionario.usuario;
  const franquia = funcionario.franquia;

  // Verificando se os dados estão incompletos
  if (!nome || !nascimento || !endereco || !cpf || !email || !telefone || !usuario || !franquia) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se existe um funcionário com o CPF passado no body
  const select = "SELECT * FROM funcionario where cpf_funcionario = ?";

  // Realizando consulta para verificar se existe um funcionário com o CPF passado no body
  connection.query(select, [cpf], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length !== 0) {
      res.json({message: "Já existe um funcionário com esse CPF!"});
    }

    else {
      // Comando SQL para verificar se um usuário existe
      const selectUsuarioFuncionario = "SELECT * FROM usuario WHERE id_usuario = ?;";

      connection.query(selectUsuarioFuncionario, [usuario], (err, results) => {
        if (err) {
          console.error(err);
        }

        if (results.length === 0) {
          res.json({message: "Não existe um usuário com esse ID!"});
        }

        else {
          // Comando SQL para verificar se o ID do usuário está em uso
          const selectUsuarioId = "SELECT F.fk_usuario FROM funcionario as F INNER JOIN usuario as U ON F.fk_usuario = U.id_usuario WHERE id_usuario = ?;"

          connection.query(selectUsuarioId, [usuario], (err, results) => {
            if (err) {
              console.error(err);
            }

            if (results.length !== 0) {
              res.json({message: "Esse usuário já está sendo utilizado!"});
            }

            else {
            // Comando SQL para verificar se uma franquia existe
            const selectFranquiaFuncionario = "SELECT * FROM franquia WHERE id_franquia = ?;";

            connection.query(selectFranquiaFuncionario, [franquia], (err, results) => {
              if (err) {
                console.error(err);
              }

              if (results.length === 0) {
                res.json({message: "Não existe uma franquia com esse ID!"});
              }

              else {
                  // Comando SQL para inserir dados
                  const sql = "INSERT INTO funcionario (nome_funcionario, dt_nascimento_funcionario, endereco_funcionario, cpf_funcionario, email_funcionario, telefone_funcionario, fk_usuario, fk_franquia) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

                  // Realizando consulta para inserir dados
                  connection.query(sql, [nome, nascimento, endereco, cpf, email, telefone, usuario, franquia], (err, results) => {
                    if (err) {
                      console.error(err);

                      return;
                    }

                    else {
                      console.log(results);
                      res.json({message: "Funcionário criado com sucesso!"});
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

exports.deletar = (id, res) => {
  // ROTA [DELETE] para deletar um funcionário por ID

  // Comando SQL para verificar se um funcionário existe
  const select = "SELECT * FROM funcionario WHERE id_funcionario = ?";

  // Realizando consulta para verificar se um funcionário existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Funcionário não encontrado!"});
    }

    else {
      // Comando SQL para deletar dados de um funcionário por ID
      const sql = "DELETE FROM funcionario WHERE id_funcionario = ?";

      // Realizando consulta para deletar dados de um funcionário por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar funcionário!"});
        }

        else {
          console.log(results);
          res.json({message: "Funcionário deletado com sucesso!"});
        
          // Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
              // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE funcionario SET id_funcionario = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  // Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE funcionario AUTO_INCREMENT = 1;";

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

exports.atualizar = (funcionario, id, res) => {
  // Rota [PUT] para atualizar um funcionario

  // Obtendo os dados do funcionário
  const nome = funcionario.nome;
  const nascimento = funcionario.nascimento;
  const endereco = funcionario.endereco;
  const cpf = funcionario.cpf;
  const email = funcionario.email;
  const telefone = funcionario.telefone;
  const usuario = funcionario.usuario;
  const franquia = funcionario.franquia;

  // Verificando se os dados estão incompletos
  if (!nome || !nascimento || !endereco || !cpf || !email || !telefone || !usuario || !franquia) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Comando SQL para verificar se uma funcionario existe
  const select = "SELECT * FROM funcionario WHERE id_funcionario = ?";

  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Funcionário não encontrado!"});
    }

    else {
      // Comando SQL para verificar se o ID do usuário está em uso
      const selectUsuarioId = "SELECT F.fk_usuario FROM funcionario as F INNER JOIN usuario as U ON F.fk_usuario = U.id_usuario WHERE id_usuario = ? AND id_funcionario = ?;"

      connection.query(selectUsuarioId, [usuario, id], (err, results) => {
        if (err) {
          console.error(err);
        }

        // Verificando se o ID do usuário e o ID do funcionário tem alguma relação, se tiver é porque existe e vai permitir alterar
        if (results.length === 0) {
          res.json({message: "Usuário não está disponível!"});
        }

        else {
          const sql = "UPDATE funcionario SET nome_funcionario = ?, dt_nascimento_funcionario = ?, endereco_funcionario = ?, cpf_funcionario = ?, email_funcionario = ?, telefone_funcionario = ?, fk_usuario = ?, fk_franquia = ? WHERE id_funcionario = ?";

          connection.query(sql, [nome, nascimento, endereco, cpf, email, telefone, usuario, franquia, id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao atualizar funcionário!"})
              console.error(err);
            }

            else {
              console.log(results);
              res.json({message: "Funcionário atualizado com sucesso!"});
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