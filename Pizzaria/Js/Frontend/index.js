function loginUsuario() {
  const loginUsuario = {
    login: document.getElementById("login-user").value,
    senha: document.getElementById("password-user").value
  }
  
  //Solicitação POST
  fetch("http://localhost:3000/login", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(loginUsuario)})
    //Convertendo a 'response' para json
    .then((response) => response.json())
    //Manipulando os dados convertidos
    .then((data) => {
      if (data.redirect === "saudacoes.html") {
        alert("Login realizado com sucesso!");
        window.location.href = "saudacoes.html";
      }

      else {
        alert("Login inválido!");
      }
    })
    .catch((err) => console.error("Erro: ", err));
}

const forms = document.getElementById("forms");

//Após o formulário ser enviado, vai acontecer um evento
forms.addEventListener('submit', (event) => {
  //Obtendo os valores dos input login e senha
  const login = document.getElementById("login-user").value;
  const senha = document.getElementById("password-user").value;

  //Se o login ou a senha estiverem vazios, o formulário não será enviado
  if (!login || !senha) {
    event.preventDefault();
    alert("Preencha todos os campos!");
  }

  else {
      loginUsuario();
    }
})
