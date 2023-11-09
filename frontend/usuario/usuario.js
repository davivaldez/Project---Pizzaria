document.addEventListener("DOMContentLoaded", carregaUsuarios);

const btnCadastro = document.getElementById("btn-usuario-cadastro");
btnCadastro.addEventListener("click", clickBtnCadastro);

const btnCancelar = document.getElementById("btn-cancel");
btnCancelar.addEventListener("click", cancelarEdicao);

const urlBase = "http://localhost:3000/usuarios";
const tbody = document.getElementById("tbody-usuario");

const inputEmail = document.getElementById("input-usuario-email");
const inputLogin = document.getElementById("input-usuario-login");
const inputSenha = document.getElementById("input-usuario-senha");

let usuarios = [];

let editandoUsuario = false;
let idUsuarioAtualizar;

function carregaUsuarios() {
  usuarios = [];

  fetch(urlBase, { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    tbody.innerHTML = "";
    
    data.forEach(usuario => {
      usuarios.push(usuario);
      criarLinha(usuario);
    });
  })
  .catch((err) => {
    alert("Ocorreu um erro ao buscar os usuários. Veja o console para mais informações.");
    console.error(err.message);
  })
}

function criarLinha(usuario) {
  let tr = document.createElement("tr");

  tr.innerHTML = 
 `<td>${usuario.id_usuario}</td>
  <td>${usuario.email_usuario}</td>
  <td>${usuario.login_usuario}</td>
  <td>${usuario.senha_usuario}</td>
  <td class="td-buttons">
    <button class="btn btn-outline-success" id="btn-update" onclick="editarUsuario(${usuario.id_usuario})">Alterar</button>
    <button class="btn btn-outline-danger" id="btn-delete" onclick="deletarUsuario(${usuario.id_usuario})">Remover</button>
  </td>`;

  tbody.appendChild(tr);
}

function editarUsuario(id) {
  editandoUsuario = true;
  idUsuarioAtualizar = id;

  let usuario = usuarios.find((u) => u.id_usuario === id);

  inputEmail.value = usuario.email_usuario;
  inputLogin.value = usuario.login_usuario;
  inputSenha.value = usuario.senha_usuario;

  btnCadastro.innerText = "Atualizar";
  btnCancelar.style.display = "inline-block";
}

function deletarUsuario(id) {
  fetch(`${urlBase}/${id}`, { method: "DELETE"})
  .then(() => removerUsuarioDaTela(id))
  .catch((err) => {
    alert("Ocorreu um erro ao deletar o usuário. Veja o console para mais informações.");
    console.error(err.message);
  })
}

function removerUsuarioDaTela(id) {
  usuarios = usuarios.filter((usuario) => usuario.id_usuario !== id);

  carregaUsuarios();
}

function clickBtnCadastro() {
  let email = inputEmail.value;
  let login = inputLogin.value;
  let senha = inputSenha.value;

  if (!email || !login || !senha) {
    alert("Preencha todos os campos!");

    return;
  }

  let usuario = {
    email: email,
    login: login,
    senha: senha
  }

  if (verificarLogin(usuario)) {
    return;
  }

  if (editandoUsuario) {
    atualizarUsuario(usuario);
  }

  else {
    inserirUsuario(usuario);
  }
}

function verificarLogin(usuario) {
  usuarios.forEach((u) => {
    if (u.login_usuario === usuario.login) {
      alert("Já existe um usuário com esse login!");
    }
  });
}

function atualizarUsuario(usuario) {
  fetch(`${urlBase}/${idUsuarioAtualizar}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
  .then((response) => response.json())
  .then((data) => {
    editandoUsuario = false;

    let i = usuarios.findIndex((u) => u.id_usuario === idUsuarioAtualizar);
    usuarios[i] = data;

    limparInputs();

    btnCadastro.innerText = "Cadastrar";
    btnCancelar.style.display = "none";

    carregaUsuarios();

  })
  .catch((err) => {
    alert("Ocorreu um erro ao atualizar o usuário. Veja o console para mais informações.");
    console.error(err.message);
  })
}

function inserirUsuario(usuario) {
  fetch(urlBase, {
     method: "POST",
     headers: {
      "Content-Type": "application/json"
     },
     body: JSON.stringify(usuario)
    })
    .then((response) => response.json())
    .then((data) => {
      usuarios.push(data);

      limparInputs();

      carregaUsuarios();
    })
    .catch((err) => {
      alert("Ocorreu um erro ao inserir o usuário. Veja o console para mais informações.");
      console.error(err.message);
    })
}

function cancelarEdicao() {
  editandoUsuario = false;

  limparInputs();

  btnCadastro.innerText = "Cadastrar";
  btnCancelar.style.display = "none";
}

function limparInputs() {
  inputEmail.value = "";
  inputLogin.value = "";
  inputSenha.value = "";
}