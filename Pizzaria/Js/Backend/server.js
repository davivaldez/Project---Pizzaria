const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();

const port = 3000;

app.use(express.json());

app.use(cors());

const adminConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
});

//Criando o banco de dados
const createDataBase = `CREATE DATABASE IF NOT EXISTS pizzaria;`;

//Executando uma query para criar o banco de dados
adminConnection.query(createDataBase, (err, results) => {
  if(err) {
    console.error("Erro ao criar o banco de dados: ", err);
  }

  else {
    console.log("Banco de dados 'pizzaria' criado com sucesso.");
  }
})

adminConnection.end((err) => {
  if (err) {
    console.error(err);
  }

  else {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "pizzaria",
    });
    
    //Realizando a conexão com MySQL
    connection.connect((err) => {
      if(err) {
        console.error("Erro na conexão com MySQL: ", err);
        return;
      }
    
      console.log("Conexão ao MySQL feita com sucesso.");
    
      //Criando tabelas do banco de dados
      const createTableUsuario =
      `CREATE TABLE IF NOT EXISTS usuario (
        id_usuario INTEGER NOT NULL AUTO_INCREMENT,
        email_usuario VARCHAR(100) NOT NULL,
        login_usuario VARCHAR(30) NOT NULL,
        senha_usuario VARCHAR(60) NOT NULL,
        CONSTRAINT pk_usuario PRIMARY KEY(id_usuario),
        CONSTRAINT uk_login UNIQUE(login_usuario)
        );`;
    
      const createTableFornecedor = 
      `CREATE TABLE IF NOT EXISTS fornecedor (
        id_fornecedor INTEGER NOT NULL AUTO_INCREMENT,
        nome_fornecedor VARCHAR(100) NOT NULL,
        cnpj_fornecedor VARCHAR(18) NOT NULL,
        telefone_fornecedor VARCHAR(20) NOT NULL,
        email_fornecedor VARCHAR(200) NOT NULL,
        CONSTRAINT pk_fornecedor PRIMARY KEY(id_fornecedor),
        CONSTRAINT uk_fornecedor UNIQUE(cnpj_fornecedor)
        );`;
    
      const createTableFranquia = 
      `CREATE TABLE IF NOT EXISTS franquia (
        id_franquia INTEGER NOT NULL AUTO_INCREMENT,
        nome_franquia VARCHAR(30) NOT NULL,
        endereco_franquia VARCHAR(200) NOT NULL,
        fk_fornecedor INTEGER NOT NULL,
        CONSTRAINT pk_franquia PRIMARY KEY(id_franquia),
        CONSTRAINT uk_franquia UNIQUE(nome_franquia),
        CONSTRAINT fk_franquia_fornecedor FOREIGN KEY(fk_fornecedor)
          REFERENCES fornecedor(id_fornecedor)
        );`;
    
      const createTableFuncionario = 
      `CREATE TABLE IF NOT EXISTS funcionario (
        id_funcionario INTEGER NOT NULL AUTO_INCREMENT,
        nome_funcionario VARCHAR(100) NOT NULL,
        dt_nascimento_funcionario DATE NOT NULL,
        endereco_funcionario VARCHAR(100) NOT NULL,
        cpf_funcionario CHARACTER (14) NOT NULL,
        email_funcionario VARCHAR(100) NOT NULL,
        telefone_funcionario VARCHAR(20) NOT NULL,
        fk_usuario INTEGER NOT NULL,
        fk_franquia INTEGER NOT NULL,
        CONSTRAINT pk_funcionario PRIMARY KEY(id_funcionario),
        CONSTRAINT uk_cpf_funcionario UNIQUE(cpf_funcionario),
        CONSTRAINT fk_funcionario_usuario FOREIGN KEY (fk_usuario) 
          REFERENCES usuario(id_usuario),
        CONSTRAINT fk_funcionario_franquia FOREIGN KEY (fk_franquia)
          REFERENCES franquia(id_franquia)
        );`;
    
      const createTableTipoIngredientes = 
      `CREATE TABLE IF NOT EXISTS tipo_ingredientes (
        id_tipo INTEGER NOT NULL AUTO_INCREMENT,
        nome_tipo VARCHAR(30) NOT NULL,
        CONSTRAINT pk_tipo PRIMARY KEY(id_tipo)
        );`;
    
      const createTableIngredientes = 
      `CREATE TABLE IF NOT EXISTS ingredientes (
        id_ingredientes INTEGER NOT NULL AUTO_INCREMENT,
        nome_ingredientes VARCHAR(30) NOT NULL,
        fk_tipo INTEGER NOT NULL,
        CONSTRAINT pk_ingredientes PRIMARY KEY(id_ingredientes),
        CONSTRAINT fk_ingredientes_tipo FOREIGN KEY(fk_tipo)
          REFERENCES tipo_ingredientes(id_tipo)
        );`;
    
      const createTableLote = 
      `CREATE TABLE IF NOT EXISTS lote (
        id_lote INTEGER NOT NULL AUTO_INCREMENT,
        dt_compra_lote DATE NOT NULL,
        dt_validade_lote DATE NOT NULL,
        qtd_lote INTEGER NOT NULL,
        preco NUMERIC(11,2) NOT NULL,
        fk_ingredientes INTEGER NOT NULL,
        CONSTRAINT pk_lote PRIMARY KEY(id_lote),
        CONSTRAINT fk_lote_ingredientes FOREIGN KEY(fk_ingredientes)
          REFERENCES ingredientes(id_ingredientes)
        );`;
    
      const createTablePizza = 
      `CREATE TABLE IF NOT EXISTS pizza (
        id_pizza INTEGER NOT NULL AUTO_INCREMENT,
        nome_pizza VARCHAR(30) NOT NULL,
        preco_pizza NUMERIC(11,2) NOT NULL,
        tamanho CHARACTER(1) NOT NULL,
        CONSTRAINT pk_pizza PRIMARY KEY(id_pizza)
        );`;
    
      //Executando a query para criar a tabela
      connection.query(createTableUsuario, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'usuario' criada com sucesso.");
        }
      })
    
      //Executando a query para criar a tabela
      connection.query(createTableFornecedor, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'fornecedor' criada com sucesso.");
        }
      })
    
      //Executando a query para criar a tabela
      connection.query(createTableFranquia, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'franquia' criada com sucesso.");
        }
      })
    
      //Executando a query para criar a tabela
      connection.query(createTableFuncionario, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'funcionario' criada com sucesso.");
        }
      })
    
      //Executando a query para criar a tabela
      connection.query(createTableTipoIngredientes, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'tipo_ingredientes' criada com sucesso.");
        }
      })
    
      //Executando a query para criar a tabela
      connection.query(createTableIngredientes, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'ingredientes' criada com sucesso.");
        }
      })
    
      //Executando a query para criar a tabela
      connection.query(createTableLote, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'lote' criada com sucesso.");
        }
      })
    
      //Executando a query para criar a tabela
      connection.query(createTablePizza, (err, results) => {
        if (err) {
          console.error(err);
        }
    
        else {
          console.log("Tabela 'pizza' criada com sucesso.");
        }
      })
    })

    //TABELA USUARIO
    
    //Rota [GET] para listar todos os usuários
    app.get("/usuarios", (req, res) => {
      console.log("get");

      //Comando SQL para listar todos os usuários
      const sql = "SELECT * FROM usuario;";

      //Realizando consulta para listar todos os dados dos usuários
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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar um usuário por ID
    app.get("/usuarios/:id", (req, res) => {
      console.log("get");

      //Obtendo ID do usuário
      const id = req.params.id;

      //Comando SQL para listar os dados do usuário por ID
      const sql = "SELECT * FROM usuario WHERE id_usuario = ?;";

      //Realizando consulta para listar todos os dados do usuário por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar usuário!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Usuário não encontrado!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar um usuário
    app.post("/usuarios", (req, res) => {
      console.log("post");

      //Obtendo os dados do usuário
      const email = req.body.email;
      const login = req.body.login;
      const senha = req.body.senha;

      //Verificando se os dados estão incompletos
      if (!email || !login || !senha) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Número de salts: 10
      const saltRounds = 10;

      //Gerando o salt
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.error("Erro ao gerar salt: ", err);

          return;
        }

        //Hash da senha com salt
        bcrypt.hash(senha, salt, (err, hash) => {
          if (err) {
            console.error("Erro ao criar o hash da senha: ", err);

            return;
          }

        //Comando SQL para verificar se existe um usuário com o login passado no body
        const select = "SELECT * FROM usuario where login_usuario = ?";

        //Realizando consulta para verificar se existe um usuário com o login passado no body
        connection.query(select, [login], (err, results) => {
          if (err) {
            console.error(err);

            return;
          }

          if (results.length !== 0) {
            res.json({message: "Já existe um usuário com esse login!"});
          }

          else {
            //Comando SQL para inserir dados
            const sql = "INSERT INTO usuario (email_usuario, login_usuario, senha_usuario) VALUES (?, ?, ?);";

            //Realizando consulta para inserir dados
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
  })

    //Rota [PUT] para atualizar um usuário
    app.put("/usuarios/:id", (req, res) => {
      const id = req.params.id;

      //Obtendo os valores do body
      const email = req.body.email;
      const login = req.body.login;
      const senha = req.body.senha;

      if (!email || !login || !senha) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Número de salts: 10
      const saltRounds = 10;

      //Gerando o salt
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.error("Erro ao gerar salt: ", err);

          return;
        }

        //Hash da senha com salt
        bcrypt.hash(senha, salt, (err, hash) => {

          if (err) {
            console.error("Erro ao criar o hash da senha: ", err);

            return;
          }
          
          //Comando SQL para verificar se um usuário existe
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
    })

    //ROTA [DELETE] para deletar um usuário por ID
    app.delete("/usuarios/:id", (req, res) => {
      const id = req.params.id;

      //Comando SQL para verificar se um usuário existe
      const select = "SELECT * FROM usuario WHERE id_usuario = ?";

      //Realizando consulta para verificar se um usuário existe
      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Usuário não encontrado!"});
        }

        else {
          //Comando SQL para deletar dados de um usuário por ID
          const sql = "DELETE FROM usuario WHERE id_usuario = ?";

          //Realizando consulta para deletar dados de um usuário por ID
          connection.query(sql, [id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao deletar usuário!"});
            }

            else {
              console.log(results);
              res.json({message: "Usuário deletado com sucesso!"});
              
              //Criando uma variável
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
                      //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
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
    })

    //TABELA FORNECEDOR
    
    //Rota [GET] para listar todos os fornecedores
    app.get("/fornecedores", (req, res) => {
      console.log("get");

      //Comando SQL para listar todos os fornecedores
      const sql = "SELECT * FROM fornecedor;";

      //Realizando consulta para listar todos os dados dos fornecedores
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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar um fornecedor por ID
    app.get("/fornecedores/:id", (req, res) => {
      console.log("get");

      //Obtendo ID do fornecedor
      const id = req.params.id;

      //Comando SQL para listar os dados do fornecedor por ID
      const sql = "SELECT * FROM fornecedor WHERE id_fornecedor = ?;";

      //Realizando consulta para listar todos os dados do fornecedor por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar fornecedor!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Fornecedor não encontrado!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar um fornecedor
    app.post("/fornecedores", (req, res) => {
      console.log("post");

      //Obtendo os dados do fornecedor
      const nome = req.body.nome;
      const cnpj = req.body.cnpj;
      const telefone = req.body.telefone;
      const email = req.body.email;

      //Verificando se os dados estão incompletos
      if (!nome || !cnpj || !telefone || !email) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se existe um fornecedor com o cnpj passado no body
      const select = "SELECT * FROM fornecedor where cnpj_fornecedor = ?";

      //Realizando consulta para verificar se existe um fornecedor com o cnpj passado no body
      connection.query(select, [cnpj], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length !== 0) {
          res.json({message: "Já existe um fornecedor com essa CNPJ!"});
        }

        else {
          //Comando SQL para inserir dados
          const sql = "INSERT INTO fornecedor (nome_fornecedor, cnpj_fornecedor, telefone_fornecedor, email_fornecedor) VALUES (?, ?, ?, ?);";

          //Realizando consulta para inserir dados
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
    })

    //Rota [PUT] para atualizar um fornecedor
    app.put("/fornecedores/:id", (req, res) => {
      const id = req.params.id;

      //Obtendo os valores do body
      const nome = req.body.nome;
      const cnpj = req.body.cnpj;
      const telefone = req.body.telefone;
      const email = req.body.email;

      if (!nome || !cnpj || !telefone || !email) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se um fornecedor existe
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
    })

    //ROTA [DELETE] para deletar um fornecedor por ID
    app.delete("/fornecedores/:id", (req, res) => {
      const id = req.params.id;

      //Comando SQL para verificar se um fornecedor existe
      const select = "SELECT * FROM fornecedor WHERE id_fornecedor = ?";

      //Realizando consulta para verificar se um fornecedor existe
      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Fornecedor não encontrado!"});
        }

        else {
          //Comando SQL para deletar dados de um fornecedor por ID
          const sql = "DELETE FROM fornecedor WHERE id_fornecedor = ?";

          //Realizando consulta para deletar dados de um fornecedor por ID
          connection.query(sql, [id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao deletar fornecedor!"});
            }

            else {
              console.log(results);
              res.json({message: "Fornecedor deletado com sucesso!"})

              //Criando uma variável
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
                      //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
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
    })

    // TABELA FRANQUIA

    //Rota [GET] para listar todas as franquias
    app.get("/franquias", (req, res) => {
      console.log("get");

      //Comando SQL para listar todas as franquias
      const sql = "SELECT * FROM franquia;";

      //Realizando consulta para listar todos os dados das franquias
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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar uma franquia por ID
    app.get("/franquias/:id", (req, res) => {
      console.log("get");

      //Obtendo ID da franquia
      const id = req.params.id;

      //Comando SQL para listar os dados da franquia por ID
      const sql = "SELECT * FROM franquia WHERE id_franquia = ?;";

      //Realizando consulta para listar todos os dados da franquia por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar franquia!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Franquia não encontrada!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar uma franquia
    app.post("/franquias", (req, res) => {
      console.log("post");

      //Obtendo os dados da franquia
      const nome = req.body.nome;
      const endereco = req.body.endereco;
      const fornecedor = req.body.fornecedor;

      //Verificando se os dados estão incompletos
      if (!nome || !endereco || !fornecedor) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se existe uma franquia com o nome passado no body
      const select = "SELECT * FROM franquia where nome_franquia = ?";

      //Realizando consulta para verificar se existe uma franquia com o nome passado no body
      connection.query(select, [nome], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length !== 0) {
          res.json({message: "Já existe uma franquia com esse nome!"});
        }

        else {
          //Comando SQL para verificar se uma franquia existe
          const selectFornecedorFranquia = "SELECT * FROM fornecedor WHERE id_fornecedor = ?;";

          connection.query(selectFornecedorFranquia, [fornecedor], (err, results) => {
            if (err) {
              console.error(err);
            }

            if (results.length === 0) {
              res.json({message: "Não existe um fornecedor com esse ID!"});
            }

            else {
              //Comando SQL para inserir dados
              const sql = "INSERT INTO franquia (nome_franquia, endereco_franquia, fk_fornecedor) VALUES (?, ?, ?);";

              //Realizando consulta para inserir dados
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
    })

    //Rota [PUT] para atualizar uma franquia
    app.put("/franquias/:id", (req, res) => {
      const id = req.params.id;

      //Obtendo os valores do body
      const nome = req.body.nome;
      const endereco = req.body.endereco;
      const fornecedor = req.body.fornecedor;

      if (!nome || !endereco || !fornecedor) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se uma franquia existe
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
    })

    //ROTA [DELETE] para deletar uma franquia por ID
    app.delete("/franquias/:id", (req, res) => {
      const id = req.params.id;

      //Comando SQL para verificar se uma franquia existe
      const select = "SELECT * FROM franquia WHERE id_franquia = ?";

      //Realizando consulta para verificar se uma franquia existe
      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Franquia não encontrada!"});
        }

        else {
          //Comando SQL para deletar dados de uma franquia por ID
          const sql = "DELETE FROM franquia WHERE id_franquia = ?";

          //Realizando consulta para deletar dados de uma franquia por ID
          connection.query(sql, [id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao deletar franquia!"});
            }

            else {
              console.log(results);
              res.json({message: "Franquia deletada com sucesso!"});
              
              //Criando uma variável
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
                      //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
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
    })

    // TABELA FUNCIONARIO

    //Rota [GET] para listar todos os funcionários
    app.get("/funcionarios", (req, res) => {
      console.log("get");

      //Comando SQL para listar todos os funcionários
      const sql = "SELECT * FROM funcionario;";

      //Realizando consulta para listar todos os dados dos funcionários
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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar um funcionário por ID
    app.get("/funcionarios/:id", (req, res) => {
      console.log("get");

      //Obtendo ID do funcionário
      const id = req.params.id;

      //Comando SQL para listar os dados do funcionário por ID
      const sql = "SELECT * FROM funcionario WHERE id_funcionario = ?;";

      //Realizando consulta para listar todos os dados da funcionário por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar funcionário!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Funcionário não encontrado!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar um funcionário
    app.post("/funcionarios", (req, res) => {
      console.log("post");

      //Obtendo os dados do funcionário
      const nome = req.body.nome;
      const nascimento = req.body.nascimento;
      const endereco = req.body.endereco;
      const cpf = req.body.cpf;
      const email = req.body.email;
      const telefone = req.body.telefone;
      const usuario = req.body.usuario;
      const franquia = req.body.franquia;

      //Verificando se os dados estão incompletos
      if (!nome || !nascimento || !endereco || !cpf || !email || !telefone || !usuario || !franquia) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se existe um funcionário com o CPF passado no body
      const select = "SELECT * FROM funcionario where cpf_funcionario = ?";

      //Realizando consulta para verificar se existe um funcionário com o CPF passado no body
      connection.query(select, [cpf], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length !== 0) {
          res.json({message: "Já existe um funcionário com esse CPF!"});
        }

        else {
          //Comando SQL para verificar se um usuário existe
          const selectUsuarioFuncionario = "SELECT * FROM usuario WHERE id_usuario = ?;";

          connection.query(selectUsuarioFuncionario, [usuario], (err, results) => {
            if (err) {
              console.error(err);
            }

            if (results.length === 0) {
              res.json({message: "Não existe um usuário com esse ID!"});
            }

            else {
              //Comando SQL para verificar se o ID do usuário está em uso
              const selectUsuarioId = "SELECT F.fk_usuario FROM funcionario as F INNER JOIN usuario as U ON F.fk_usuario = U.id_usuario WHERE id_usuario = ?;"

              connection.query(selectUsuarioId, [usuario], (err, results) => {
                if (err) {
                  console.error(err);
                }

                if (results.length !== 0) {
                  res.json({message: "Esse usuário já está sendo utilizado!"});
                }

                else {
                //Comando SQL para verificar se uma franquia existe
                const selectFranquiaFuncionario = "SELECT * FROM franquia WHERE id_franquia = ?;";

                connection.query(selectFranquiaFuncionario, [franquia], (err, results) => {
                  if (err) {
                    console.error(err);
                  }

                  if (results.length === 0) {
                    res.json({message: "Não existe uma franquia com esse ID!"});
                  }

                  else {
                      //Comando SQL para inserir dados
                      const sql = "INSERT INTO funcionario (nome_funcionario, dt_nascimento_funcionario, endereco_funcionario, cpf_funcionario, email_funcionario, telefone_funcionario, fk_usuario, fk_franquia) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

                      //Realizando consulta para inserir dados
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
    })

    //Rota [PUT] para atualizar um funcionario
    app.put("/funcionarios/:id", (req, res) => {
      const id = req.params.id;

      //Obtendo os dados do funcionário
      const nome = req.body.nome;
      const nascimento = req.body.nascimento;
      const endereco = req.body.endereco;
      const cpf = req.body.cpf;
      const email = req.body.email;
      const telefone = req.body.telefone;
      const usuario = req.body.usuario;
      const franquia = req.body.franquia;

      //Verificando se os dados estão incompletos
      if (!nome || !nascimento || !endereco || !cpf || !email || !telefone || !usuario || !franquia) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se uma funcionario existe
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
          //Comando SQL para verificar se o ID do usuário está em uso
          const selectUsuarioId = "SELECT F.fk_usuario FROM funcionario as F INNER JOIN usuario as U ON F.fk_usuario = U.id_usuario WHERE id_usuario = ? AND id_funcionario = ?;"

          connection.query(selectUsuarioId, [usuario, id], (err, results) => {
            if (err) {
              console.error(err);
            }

            //Verificando se o ID do usuário e o ID do funcionário tem alguma relação, se tiver é porque existe e vai permitir alterar
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
    })

    //ROTA [DELETE] para deletar um funcionário por ID
    app.delete("/funcionarios/:id", (req, res) => {
      const id = req.params.id;

      //Comando SQL para verificar se um funcionário existe
      const select = "SELECT * FROM funcionario WHERE id_funcionario = ?";

      //Realizando consulta para verificar se um funcionário existe
      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Funcionário não encontrado!"});
        }

        else {
          //Comando SQL para deletar dados de um funcionário por ID
          const sql = "DELETE FROM funcionario WHERE id_funcionario = ?";

          //Realizando consulta para deletar dados de um funcionário por ID
          connection.query(sql, [id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao deletar funcionário!"});
            }

            else {
              console.log(results);
              res.json({message: "Funcionário deletado com sucesso!"});
              
              //Criando uma variável
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
                      //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
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
    })

    //TABELA TIPO INGREDIENTES
    
    //Rota [GET] para listar todos os tipos de ingredientes
    app.get("/tipos", (req, res) => {
      console.log("get");

      //Comando SQL para listar todos os tipos de ingredientes
      const sql = "SELECT * FROM tipo_ingredientes;";

      //Realizando consulta para listar todos os dados dos tipos de ingredientes
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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar um tipo de ingrediente por ID
    app.get("/tipos/:id", (req, res) => {
      console.log("get");

      //Obtendo ID do tipo de ingrediente
      const id = req.params.id;

      //Comando SQL para listar os dados do tipo de ingrediente por ID
      const sql = "SELECT * FROM tipo_ingredientes WHERE id_tipo = ?;";

      //Realizando consulta para listar todos os dados do tipo de ingrediente por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar tipo de ingrediente!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Tipo de ingrediente não encontrado!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar um tipo de ingrediente
    app.post("/tipos", (req, res) => {
      console.log("post");

      //Obtendo os dados do tipo de ingrediente
      const nome = req.body.nome;

      //Verificando se os dados estão incompletos
      if (!nome) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se existe um tipo de ingrediente com o nome passado no body
      const select = "SELECT * FROM tipo_ingredientes where nome_tipo = ?";

      //Realizando consulta para verificar se existe um tipo de ingrediente com o nome passado no body
      connection.query(select, [nome], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length !== 0) {
          res.json({message: "Já existe um tipo de ingrediente com esse nome!"});
        }

        else {
          //Comando SQL para inserir dados
          const sql = "INSERT INTO tipo_ingredientes (nome_tipo) VALUES (?);";

          //Realizando consulta para inserir dados
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
    })

    //Rota [PUT] para atualizar um tipo de ingrediente
    app.put("/tipos/:id", (req, res) => {
      const id = req.params.id;

      //Obtendo os valores do body
      const nome = req.body.nome;

      if (!nome) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se um tipo de ingrediente existe
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
          //Comando SQL para verificar se existe um tipo de ingrediente com o nome passado no body
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
    })

    //ROTA [DELETE] para deletar um tipo de ingrediente por ID
    app.delete("/tipos/:id", (req, res) => {
      const id = req.params.id;

      //Comando SQL para verificar se um tipo de ingrediente existe
      const select = "SELECT * FROM tipo_ingredientes WHERE id_tipo = ?";

      //Realizando consulta para verificar se um tipo de ingrediente existe
      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Tipo de ingrediente não encontrado!"});
        }

        else {
          //Comando SQL para deletar dados de um tipo de ingrediente por ID
          const sql = "DELETE FROM tipo_ingredientes WHERE id_tipo = ?";

          //Realizando consulta para deletar dados de um tipo de ingrediente por ID
          connection.query(sql, [id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao deletar tipo de ingrediente!"});
            }

            else {
              console.log(results);
              res.json({message: "Tipo de ingrediente deletado com sucesso!"});
              
              //Criando uma variável
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
                      //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
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
    })

    // TABELA INGREDIENTES

    //Rota [GET] para listar todos os ingredientes
    app.get("/ingredientes", (req, res) => {
      console.log("get");

      //Comando SQL para listar todos os ingredientes
      const sql = "SELECT * FROM ingredientes;";

      //Realizando consulta para listar todos os dados dos ingredientes
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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar um ingrediente por ID
    app.get("/ingredientes/:id", (req, res) => {
      console.log("get");

      //Obtendo ID do ingrediente
      const id = req.params.id;

      //Comando SQL para listar os dados do ingrediente por ID
      const sql = "SELECT * FROM ingredientes WHERE id_ingredientes = ?;";

      //Realizando consulta para listar todos os dados do ingrediente por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar ingrediente!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Ingrediente não encontrado!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar um ingrediente
    app.post("/ingredientes", (req, res) => {
      console.log("post");

      //Obtendo os dados do ingrediente
      const nome = req.body.nome;
      const tipo = req.body.tipo;

      //Verificando se os dados estão incompletos
      if (!nome || !tipo) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se existe um ingrediente com o nome passado no body
      const select = "SELECT * FROM ingredientes where nome_ingredientes = ?";

      //Realizando consulta para verificar se existe um ingrediente com o nome passado no body
      connection.query(select, [nome], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length !== 0) {
          res.json({message: "Já existe um ingrediente com esse nome!"});
        }

        else {
          //Comando SQL para verificar se um tipo de ingrediente existe
          const selectTipoIngredientes = "SELECT * FROM tipo_ingredientes WHERE id_tipo = ?;";

          connection.query(selectTipoIngredientes, [tipo], (err, results) => {
            if (err) {
              console.error(err);
            }

            if (results.length === 0) {
              res.json({message: "Não existe um tipo de ingrediente com esse ID!"});
            }

            else {
              //Comando SQL para inserir dados
              const sql = "INSERT INTO ingredientes (nome_ingredientes, fk_tipo) VALUES (?, ?);";

              //Realizando consulta para inserir dados
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
    })

    //Rota [PUT] para atualizar um ingrediente
    app.put("/ingredientes/:id", (req, res) => {
      const id = req.params.id;

      //Obtendo os valores do body
      const nome = req.body.nome;
      const tipo = req.body.tipo;

      //Verificando se os dados estão incompletos
      if (!nome || !tipo) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se um ingrediente existe
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
          //Comando SQL para verificar se existe um ingrediente com o nome passado no body
          const selectIngredientes = "SELECT * FROM ingredientes WHERE nome_ingredientes = ?;";

          connection.query(selectIngredientes, [nome], (err, results) => {
            if (err) {
              console.error(err);
            }

            if (results.length !== 0) {
              res.json({message: "Esse ingrediente já está sendo utilizado!"});
            }

            else {
              //Comando SQL para verificar se um tipo de ingrediente existe
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
    })

    //ROTA [DELETE] para deletar um ingrediente por ID
    app.delete("/ingredientes/:id", (req, res) => {
      const id = req.params.id;

      //Comando SQL para verificar se um ingrediente existe
      const select = "SELECT * FROM ingredientes WHERE id_ingredientes = ?";

      //Realizando consulta para verificar se um ingrediente existe
      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Ingrediente não encontrado!"});
        }

        else {
          //Comando SQL para deletar dados de um ingrediente por ID
          const sql = "DELETE FROM ingredientes WHERE id_ingredientes = ?";

          //Realizando consulta para deletar dados de um ingrediente por ID
          connection.query(sql, [id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao deletar ingrediente!"});
            }

            else {
              console.log(results);
              res.json({message: "Ingrediente deletado com sucesso!"});
              
              //Criando uma variável
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
                      //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
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
    })

    // TABELA LOTE

    //Rota [GET] para listar todos os lotes
    app.get("/lotes", (req, res) => {
      console.log("get");

      //Comando SQL para listar todos os lotes
      const sql = "SELECT * FROM lote;";

      //Realizando consulta para listar todos os dados dos lotes
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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar um lote por ID
    app.get("/lotes/:id", (req, res) => {
      console.log("get");

      //Obtendo ID do lote
      const id = req.params.id;

      //Comando SQL para listar os dados do lote por ID
      const sql = "SELECT * FROM lote WHERE id_lote = ?;";

      //Realizando consulta para listar todos os dados do lote por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar lote!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Lote não encontrado!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar um lote
    app.post("/lotes", (req, res) => {
      console.log("post");

      //Obtendo os dados do lote
      const compra = req.body.compra;
      const validade = req.body.validade;
      const quantidade = req.body.quantidade;
      const preco = req.body.preco;
      const ingredientes = req.body.ingredientes;

      //Verificando se os dados estão incompletos
      if (!compra || !validade || !quantidade || !preco || !ingredientes) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se um ingrediente existe
      const selectTipoIngredientes = "SELECT * FROM ingredientes WHERE id_ingredientes = ?;";

      connection.query(selectTipoIngredientes, [ingredientes], (err, results) => {
        if (err) {
          console.error(err);
        }

        if (results.length === 0) {
          res.json({message: "Não existe um ingrediente com esse ID!"});
        }

        else {
          //Comando SQL para inserir dados
          const sql = "INSERT INTO lote (dt_compra_lote, dt_validade_lote, qtd_lote, preco, fk_ingredientes) VALUES (?, ?, ?, ?, ?);";

          //Realizando consulta para inserir dados
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
    })

    //Rota [PUT] para atualizar um lote
    app.put("/lotes/:id", (req, res) => {
      const id = req.params.id;

      //Obtendo os dados do lote
      const compra = req.body.compra;
      const validade = req.body.validade;
      const quantidade = req.body.quantidade;
      const preco = req.body.preco;
      const ingredientes = req.body.ingredientes;

      //Verificando se os dados estão incompletos
      if (!compra || !validade || !quantidade || !preco || !ingredientes) {
        res.json({message: "Dados incompletos!"});

        return;
      }

      //Comando SQL para verificar se um lote existe
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
          //Comando SQL para verificar se um ingrediente existe
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
    })

    //ROTA [DELETE] para deletar um lote por ID
    app.delete("/lotes/:id", (req, res) => {
      const id = req.params.id;

      //Comando SQL para verificar se um lote existe
      const select = "SELECT * FROM lote WHERE id_lote = ?";

      //Realizando consulta para verificar se um lote existe
      connection.query(select, [id], (err, results) => {
        if (err) {
          console.error(err);

          return;
        }

        if (results.length === 0) {
          res.json({message: "Lote não encontrado!"});
        }

        else {
          //Comando SQL para deletar dados de um lote por ID
          const sql = "DELETE FROM lote WHERE id_lote = ?";

          //Realizando consulta para deletar dados de um lote por ID
          connection.query(sql, [id], (err, results) => {
            if (err) {
              res.json({message: "Erro ao deletar lote!"});
            }

            else {
              console.log(results);
              res.json({message: "Lote deletado com sucesso!"});
              
              //Criando uma variável
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
                      //Comando SQL para garantir que o próximo ID gerado siga a sequência dos IDs
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
    })

    //TABELA PIZZA
    
    //Rota [GET] para listar todas as pizzas
    app.get("/pizzas", (req, res) => {
      console.log("get");

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
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [GET] para listar uma pizza por ID
    app.get("/pizzas/:id", (req, res) => {
      console.log("get");

      //Obtendo ID da pizza
      const id = req.params.id;

      //Comando SQL para listar os dados da pizza por ID
      const sql = "SELECT * FROM pizza WHERE id_pizza = ?;";

      //Realizando consulta para listar todos os dados da pizza por ID
      connection.query(sql, [id], (err, results) => {
        if (err) {
          console.error(err);
  
          res.json({message: "Erro ao buscar pizza!"})

          return;
        }
  
        if (results.length === 0) {
          res.json({message: "Pizza não encontrada!"})

          return;
        }
  
        else {
          console.log(results);
          res.json(results);
        }
      })
    })

    //Rota [POST] para criar uma pizza
    app.post("/pizzas", (req, res) => {
      console.log("post");

      //Obtendo os dados da pizza
      const nome = req.body.nome;
      const preco = req.body.preco;
      const tamanho = req.body.tamanho;

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
    })

    //Rota [PUT] para atualizar uma pizza
    app.put("/pizzas/:id", (req, res) => {
      const id = req.params.id;

       //Obtendo os dados da pizza
       const nome = req.body.nome;
       const preco = req.body.preco;
       const tamanho = req.body.tamanho;
 
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
    })

    //ROTA [DELETE] para deletar uma pizza por ID
    app.delete("/pizzas/:id", (req, res) => {
      const id = req.params.id;

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
    })

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
  }
});

// solicitação POST para validação simples do login e senha
app.post("/login", (req, res) => {
  const login = req.body.login;
  const senha = req.body.senha;

  if (login === "admin" && senha === "admin") {
    res.json({redirect: "saudacoes.html"});
  }

  else {
    res.json({redirect: "Não possível redirecionar para a página!"});
  }
})

//Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
})
