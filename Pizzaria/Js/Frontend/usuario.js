//Array para armazenar usuários do servidor
let usuarios = [];

//Usuário em edição (após o botão alterar ser acionado, o valor dentro dessa variável irá receber o ID para chamar o PUT)
let usuarioEdicao = null;

//Função para exibir os usuários na tabela
function displayUsers() {
  const tbody = document.getElementById("tbody");

  //Deixando o tdbody vazio para carregar os usuários que estão salvos em 'let usuarios = []'
  tbody.innerHTML = "";

  //Carregando usuários do servidor ao carregar a página (solicitação GET)
  fetch("http://localhost:3000/usuarios")
    //Obtendo a promise da solicitação HTTP e convertendo ela em um objeto JavaScript facilitando a manipulação dos dados
    .then((response) => response.json())
    //Manipulando os dados obtidos atribuindo a eles à variável 'usuarios' e adicionando eles na tabela
    .then((data) => {
      usuarios = data;

      //Iterando pelos usuários para adicionar cada um na tabela com seus dados
      usuarios.forEach((usuario) => {
        const tr = document.createElement("tr");
        tr.innerHTML =
        `<td>${usuario.id_usuario}</td>
        <td>${usuario.email_usuario}</td>
        <td>${usuario.login_usuario}</td>
        <td>${usuario.senha_usuario}</td>
        <td class="td-buttons">
          <button class="btn btn-outline-success" id="btn-update" onclick="editUser(${usuario.id_usuario})">Alterar</button>
          <button class="btn btn-outline-danger" id="btn-delete" onclick="deleteUser(${usuario.id_usuario})">Remover</button>
        </td>`

        //Adicionando o elemento tr no tbody
        tbody.appendChild(tr);
      })
    })
  }

//Função para editar usuários
function editUser(id) {
  usuarioEdicao = id;

  //Obtendo todos os dados do usuário pelo ID verificando se cada usuário tem o ID igual ao que foi passado no parâmetro
  const usuario = usuarios.find((u) => u.id_usuario === id);

  document.getElementById("email-user").value = usuario.email_usuario;
  document.getElementById("login-user").value = usuario.login_usuario;
  document.getElementById("password-user").value = usuario.senha_usuario;

  //Exibindo o botão 'Cancelar'
  document.getElementById("btn-cancel").style.display = "inline-block";

}


//Função para deletar usuários
function deleteUser(id) {
  //Solicitação HTTP para deletar usuários
  fetch("http://localhost:3000/usuarios/" + id, {method: "DELETE"})
    //Após a solicitação ser executada, a lista de usuários é atualizada com todos os usuários que possuem IDs diferentes do que foi passado no parâmetro
    .then(() => {
      usuarios = usuarios.filter((u) => u.id_usuario !== id);

      //Executando a função 'displayUsers()' para a tabela ser carregada novamente com os dados atualizados
      displayUsers();
    })
    .catch((err) => console.error("Erro: ", err));
}

//CADASTRAR OU ALTERAR USUÁRIOS
const forms = document.getElementById("forms");

forms.addEventListener('submit', (event) => {
  const email = document.getElementById("email-user").value;
  const login = document.getElementById("login-user").value;
  const senha = document.getElementById("password-user").value;

  if (!email || !login || !senha) {
    event.preventDefault();
  }

  else {
    //Coletando os valores do formulário
    const usuario = {
      email: email,
      login: login,
      senha: senha
    }

    if (usuarioEdicao) {
      //Se estiver editando o usuário
      fetch("http://localhost:3000/usuarios/" + usuarioEdicao, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(usuario)})
        //Convertendo a 'response' para json
        .then((response) => response.json())
        //Manipulando os dados convertidos
        .then((data) => {
          //Procurando o index onde o ID do usuário for igual ao ID do 'usuarioEdicao' para atualizar todos os dados do usuário 
          const index = usuarios.findIndex((u) => u.id_usuario === usuarioEdicao);
          usuarios[index] = data;

          //Resetando o formulário
          document.getElementById("forms").reset();
          usuarioEdicao = null;
          document.getElementById("btn-cancel").style.display = "none";

          displayUsers();
        })
        .catch((err) => console.error("Erro: ", err));
    }
    else {
      //Se for um novo usuário
      fetch("http://localhost:3000/usuarios", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(usuario)})
        //Convertendo a 'response' para json
        .then((response) => response.json())
        //Manipulando os dados convertidos
        .then((data) => {
            //Adicionando os dados em 'usuarios'
            usuarios.push(data);

            //Resetando o formulário
            document.getElementById("forms").reset();

            //Chamando a função 'displayUsers' para atualizar a tabela
            displayUsers();
        })
        .catch((err) => console.error("Erro: ", err));
    }
  }
})

//CANCELAR
const cancelBtn = document.getElementById("btn-cancel");
//Se o usuário apertar o botão 'Cancelar':
cancelBtn.addEventListener('click', () => {
  //A variável 'usuarioEdicao' volta a ser nula
  usuarioEdicao = null;
  //Os campos do formulário vão ser resetados
  document.getElementById("forms").reset();
  //Alterando a exibição do botão 'Cancelar' para 'none'
  cancelBtn.style.display = "none";
})

//Carregando usuários do servidor ao carregar a página com uma solicitação HTTP (solicitação GET)
fetch("http://localhost:3000/usuarios")
  //Convertendo a 'response' para json
  .then((response) => response.json())
  //Manipulando os dados convertidos
  .then((data) => {
    usuarios = data;
    displayUsers();
  })
  .catch((err) => console.error("Erro: ", err));