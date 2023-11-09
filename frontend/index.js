// URL da solicitação
const urlBase = "http://localhost:3000/login";

// Obtendo id do botão 'Entrar'
const btnEntrar = document.getElementById("btn-index-login");

// Função irá ser chamada após ocorrer um evento de clique
btnEntrar.addEventListener('click', clickBtnEntrar);

// Obtendo id do login e senha
const inputLogin = document.getElementById("input-index-login");
const inputSenha = document.getElementById("input-index-senha");

function clickBtnEntrar() {
  // Obtendo os valores dos inputs do login e senha
  let login = inputLogin.value;
  let senha = inputSenha.value;

  // Colocando os valores em uma variável no formato 'chave-valor' para realizar a solicitação POST
  let loginAdmin = {
    login: login,
    senha: senha
  }

  // Se os valores estiverem vazios, será enviado uma mensagem de alerta
  if (!inputLogin.value || !inputSenha.value) {
    alert("Preencha todos os campos!");
  }

  // Caso não os campos não estejam vazios, a função 'validarLogin' será chamada
  else {
    validarLogin(loginAdmin);
  }
}

function validarLogin(loginAdmin) {
  //Solicitação POST
  fetch(urlBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginAdmin)
  })
  // Convertendo a 'response' para json
  .then(response => response.json())
  //Manipulando os dados convertidos
  .then(data => {
    //Redirecionando a página caso essa condição for verdadeira
    if (data.redirect === "saudacao.html") {
      window.location.href = "saudacao.html";

      alert("Login realizado com sucesso!");
    }

    else {
      alert("Login inválido!");
    }
  })
}
