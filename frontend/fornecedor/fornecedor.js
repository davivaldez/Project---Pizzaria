document.addEventListener("DOMContentLoaded", carregaFornecedores);

const btnCadastro = document.getElementById("btn-fornecedor-cadastro");
btnCadastro.addEventListener("click", clickBtnCadastro);

const btnCancel = document.getElementById("btn-cancel");
btnCancel.addEventListener("click", cancelarEdicao);

const urlBase = "http://localhost:3000/fornecedores";
const tbody = document.getElementById("tbody-fornecedor");

const inputNome = document.getElementById("input-fornecedor-nome");
const inputCnpj = document.getElementById("input-fornecedor-cnpj");
const inputTelefone = document.getElementById("input-fornecedor-telefone");
const inputEmail = document.getElementById("input-fornecedor-email");

let fornecedores = [];

let editandoFornecedor = false;
let idFornecedorAtualizar;

// Função para buscar fornecedores
function carregaFornecedores() {
  fornecedores = [];

  fetch(urlBase, { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    tbody.innerHTML = "";

    data.forEach(fornecedor => {
      fornecedores.push(fornecedor);
      criarLinha(fornecedor);
    });
  })
  .catch((err) => {
    alert("Ocorreu um erro ao buscar os fornecedores. Veja o console para mais informações.");
    console.error(err.message);
  });
}

// Criar linha 
function criarLinha(fornecedor) {
  let tr = document.createElement("tr");

  tr.innerHTML =
    `
    <td>${fornecedor.id_fornecedor}</td>
    <td>${fornecedor.nome_fornecedor}</td>
    <td>${fornecedor.cnpj_fornecedor}</td>
    <td>${fornecedor.telefone_fornecedor}</td>
    <td>${fornecedor.email_fornecedor}</td>
    <td class="td-buttons">
      <button class="btn btn-outline-success" id="btn-update" onclick="editarFornecedor(${fornecedor.id_fornecedor})">Alterar</button>
      <button class="btn btn-outline-danger" id="btn-delete" onclick="deletarFornecedor(${fornecedor.id_fornecedor})">Remover</button>
    </td>
    `;

  //Adicionando o elemento tr no tbody
  tbody.appendChild(tr);
}

function editarFornecedor(id) {
  editandoFornecedor = true;
  idFornecedorAtualizar = id;

  let fornecedor = fornecedores.find(f => f.id_fornecedor === id);

  inputNome.value = fornecedor.nome_fornecedor;
  inputCnpj.value = fornecedor.cnpj_fornecedor;
  inputTelefone.value = fornecedor.telefone_fornecedor;
  inputEmail.value = fornecedor.email_fornecedor;

  btnCancel.style.display = "inline-block";
  btnCadastro.innerText = "Atualizar";
}

//Função para deletar fornecedores
function deletarFornecedor(id) {
  fetch(`${urlBase}/${id}`, { method: "DELETE" })
  .then(() => removerFornecedorDaTela(id))
  .catch((err) => {
    alert("Ocorreu um erro ao deletar o fornecedor. Veja o console para mais informações.");
    console.error(err.message);
  });
}

function removerFornecedorDaTela(id) {
  fornecedores = fornecedores.filter(fornecedor => fornecedor.id_fornecedor !== id);

  carregaFornecedores();
}

function clickBtnCadastro() {
  let nome = inputNome.value;
  let cnpj = inputCnpj.value;
  let telefone = inputTelefone.value;
  let email = inputEmail.value;

  if (!nome || !cnpj || !telefone || !email) {
    alert("Preencha todos os campos!");

    return;
  }

  let fornecedor = {
    nome: nome,
    cnpj: cnpj,
    telefone: telefone,
    email: email
  }

  if (verificarCnpj(fornecedor)) {
    return;
  }

  if (editandoFornecedor)
    atualizarFornecedor(fornecedor);
  else
    inserirFornecedor(fornecedor);
}

function verificarCnpj(fornecedor) {
  fornecedores.forEach((f) => {
    if (f.cnpj_fornecedor === fornecedor.cnpj) {
      alert("Já existe um fornecedor com esse CNPJ!");
    }
  });
}

function atualizarFornecedor(fornecedor) {
  fetch(`${urlBase}/${idFornecedorAtualizar}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(fornecedor)
  })
  .then((response) => response.json())
  .then((data) => {
    editandoFornecedor = false;

    let i = fornecedores.findIndex(f => f.id === idFornecedorAtualizar);
    fornecedores[i] = data;

    limparInputs();

    btnCancel.style.display = "none";
    btnCadastro.innerText = "Cadastrar";

    carregaFornecedores();
  })
  .catch((err) => {
    alert("Ocorreu um erro ao atualizar o fornecedor. Veja o console para mais informações.");
    console.error(err.message);
  });
}

function inserirFornecedor(fornecedor) {
  fetch(urlBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(fornecedor)
  })
  .then((response) => response.json())
  .then((data) => {
    fornecedores.push(data);

    limparInputs();

    carregaFornecedores();
  })
  .catch((err) => {
    alert("Ocorreu um erro ao inserir o fornecedor. Veja o console para mais informações.");
    console.error(err.message);
  });
}

function cancelarEdicao() {
  editandoFornecedor = false;

  limparInputs();
  
  btnCadastro.innerText = "Cadastrar";
  btnCancel.style.display = "none";
}

function limparInputs() {
  inputNome.value = "";
  inputCnpj.value = "";
  inputTelefone.value = "";
  inputEmail.value = "";
}