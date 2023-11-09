exports.inserir = (loginBody, res) => {
  const login = loginBody.login;
  const senha = loginBody.senha;

  if (login === "admin" && senha === "admin") {
      res.json({redirect: "saudacao.html"});
  }

  else {
    res.json({redirect: "Login inválido!"});
  }
}