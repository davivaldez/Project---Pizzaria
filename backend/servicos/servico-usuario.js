const bcrypt = require("bcrypt");
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
  // Rota [GET] para listar todos os usuários

  // Comando SQL para listar todos os usuários
  const sql = "SELECT * FROM usuario;";

  // Realizando consulta para listar todos os dados dos usuários
  connection.query(sql, (err, results) => {
      if (err) {
        console.error(err);

        res.json({message: "Erro ao buscar usuários!"});

        return;
      }

      if (results.length === 0) {
        res.json({message: "Nenhum usuário foi cadastrado!"});

        return;
      }

      else {
        res.json(results);  
      }
    })
  }

exports.inserir = (usuario, res) => {
  // Rota [POST] para criar um usuário

  //  Obtendo os dados do usuário
  const email = usuario.email;
  const login = usuario.login;
  const senha = usuario.senha;

  //  Verificando se os dados estão incompletos
  if (!email || !login || !senha) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  //  Número de salts: 10
  const saltRounds = 10;

  //  Gerando o salt
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.error("Erro ao gerar salt: ", err);

      return;
    }

    //  Hash da senha com salt
    bcrypt.hash(senha, salt, (err, hash) => {
      if (err) {
        console.error("Erro ao criar o hash da senha: ", err);

        return;
      }

    //  Comando SQL para verificar se existe um usuário com o login passado no body
    const select = "SELECT * FROM usuario where login_usuario = ?";

    //  Realizando consulta para verificar se existe um usuário com o login passado no body
    connection.query(select, [login], (err, results) => {
      if (err) {
        console.error(err);

        return;
      }

      if (results.length !== 0) {
        res.json({message: "Já existe um usuário com esse login!"});
      }

      else {
        //  Comando SQL para inserir dados
        const sql = "INSERT INTO usuario (email_usuario, login_usuario, senha_usuario) VALUES (?, ?, ?);";

        //  Realizando consulta para inserir dados
        connection.query(sql, [email, login, hash], (err, results) => {
            if (err) {
              console.error(err);

              return;
            }

            else {
              console.log(results);
              res.json({message: "Usuário criado com sucesso!"});
            }
          })
        }
      })
    })
  })
}

exports.deletar = (id, res) => {
  // ROTA [DELETE] para deletar um usuário por ID

  // Comando SQL para verificar se um usuário existe
  const select = "SELECT * FROM usuario WHERE id_usuario = ?";

  // Realizando consulta para verificar se um usuário existe
  connection.query(select, [id], (err, results) => {
    if (err) {
      console.error(err);

      return;
    }

    if (results.length === 0) {
      res.json({message: "Usuário não encontrado!"});
    }

    else {
      // Comando SQL para deletar dados de um usuário por ID
      const sql = "DELETE FROM usuario WHERE id_usuario = ?";

      // Realizando consulta para deletar dados de um usuário por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          res.json({message: "Erro ao deletar usuário!"});
        }

        else {
          console.log(results);
          res.json({message: "Usuário deletado com sucesso!"});
        
          // Criando uma variável
          const setSql = "SET @id = 0;";

          connection.query(setSql, (err, results) => {
            if (err) {
              console.error(err);
            }

            else {
              // Comando SQL para redefinir os valores dos IDs para que começem a partir de 1 e seja somado + 1
              const updateSql = "UPDATE usuario SET id_usuario = (@id := @id + 1);";

              connection.query(updateSql, (err, results) => {
                if (err) {
                  console.error(err);
                }

                else {
                  // Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
                  const autoIncrement = "ALTER TABLE usuario AUTO_INCREMENT = 1;";

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

exports.atualizar = (usuario, id, res) => {
  // Rota [PUT] para atualizar um usuário

  // Obtendo os valores do body
  const email = usuario.email;
  const login = usuario.login;
  const senha = usuario.senha;

  if (!email || !login || !senha) {
    res.json({message: "Dados incompletos!"});

    return;
  }

  // Número de salts: 10
  const saltRounds = 10;

  // Gerando o salt
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.error("Erro ao gerar salt: ", err);

      return;
    }

    // Hash da senha com salt
    bcrypt.hash(senha, salt, (err, hash) => {

      if (err) {
        console.error("Erro ao criar o hash da senha: ", err);

        return;
      }
    
      // Comando SQL para verificar se um usuário existe
      const select = "SELECT * FROM usuario WHERE id_usuario = ?";

      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Usuário não encontrado!"});
        }

        else {
          const sql = "UPDATE usuario SET email_usuario = ?, login_usuario = ?, senha_usuario = ? WHERE id_usuario = ?";

          connection.query(sql, [email, login, hash, id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao atualizar usuário!"})
            }

            else {
              console.log(results);
              res.json({message: "Usuário atualizado com sucesso!"});
            }
          })
        }
      })
    })
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