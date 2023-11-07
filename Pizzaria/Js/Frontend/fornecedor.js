//Array para armazenar fornecedores do servidor
let fornecedores = [];

//Fornecedor em edição (após o botão alterar ser acionado, o valor dentro dessa variável irá receber o ID para chamar o PUT)
let fornecedorEdicao = null;

//Função para exibir os fornecedores na tabela
function displayProviders() {
  const tbody = document.getElementById("tbody-fornecedor");

  //Deixando o tdbody vazio para carregar os fornecedores que estão salvos em 'let fornecedores = []'
  tbody.innerHTML = "";

  //Carregando fornecedores do servidor ao carregar a página (solicitação GET)
  fetch("http://localhost:3000/fornecedores")
    //Obtendo a promise da solicitação HTTP e convertendo ela em um objeto JavaScript facilitando a manipulação dos dados
    .then((response) => response.json())
    //Manipulando os dados obtidos atribuindo a eles à variável 'fornecedores' e adicionando eles na tabela
    .then((data) => {
      fornecedores = data;

      //Iterando pelos fornecedores para adicionar cada um na tabela com seus dados
      fornecedores.forEach((fornecedor) => {

        const tr = document.createElement("tr");
        tr.innerHTML =
        `<td>${fornecedor.id_fornecedor}</td>
        <td>${fornecedor.nome_fornecedor}</td>
        <td>${fornecedor.cnpj_fornecedor}</td>
        <td>${fornecedor.telefone_fornecedor}</td>
        <td>${fornecedor.email_fornecedor}</td>
        <td class="td-buttons">
          <button class="btn btn-outline-success" id="btn-update" onclick="editProvider(${fornecedor.id_fornecedor})">Alterar</button>
          <button class="btn btn-outline-danger" id="btn-delete" onclick="deleteProvider(${fornecedor.id_fornecedor})">Remover</button>
        </td>`

        //Adicionando o elemento tr no tbody
        tbody.appendChild(tr);
      })
    })
  }

//Função para editar fornecedores
function editProvider(id) {
  fornecedorEdicao = id;

  //Obtendo todos os dados do fornecedor pelo ID verificando se cada fornecedor tem o ID igual ao que foi passado no parâmetro
  const fornecedor = fornecedores.find((f) => f.id_fornecedor === id);

  document.getElementById("name-provider").value = fornecedor.nome_fornecedor;
  document.getElementById("cnpj-provider").value = fornecedor.cnpj_fornecedor;
  document.getElementById("phone-provider").value = fornecedor.telefone_fornecedor;
  document.getElementById("email-provider").value = fornecedor.email_fornecedor;

  //Exibindo o botão 'Cancelar'
  document.getElementById("btn-cancel").style.display = "inline-block";

}


//Função para deletar fornecedores
function deleteProvider(id) {
  //Solicitação HTTP para deletar fornecedores
  fetch("http://localhost:3000/fornecedores/" + id, {method: "DELETE"})
    //Após a solicitação ser executada, a lista de fornecedores é atualizada com todos os fornecedores que possuem IDs diferentes do que foi passado no parâmetro
    .then(() => {
      fornecedores = fornecedores.filter((f) => f.id_fornecedor !== id);

      //Executando a função 'displayProviders()' para a tabela ser carregada novamente com os dados atualizados
      displayProviders();
    })
    .catch((err) => console.error("Erro: ", err));
}

//CADASTRAR OU ALTERAR FORNECEDORES
const forms = document.getElementById("forms");

forms.addEventListener('submit', (event) => {
  const nome = document.getElementById("name-provider").value;
  const cnpj = document.getElementById("cnpj-provider").value;
  const telefone = document.getElementById("phone-provider").value;
  const email = document.getElementById("email-provider").value;

  if (!nome || !cnpj || !telefone || !email) {
    event.preventDefault();
  }

  else {
    //Coletando os valores do formulário
    const fornecedor = {
      nome: nome,
      cnpj: cnpj,
      telefone: telefone,
      email: email
    }

    if (fornecedorEdicao) {
      //Se estiver editando o fornecedor
      fetch("http://localhost:3000/fornecedores/" + fornecedorEdicao, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(fornecedor)})
        //Convertendo a 'response' para json
        .then((response) => response.json())
        //Manipulando os dados convertidos
        .then((data) => {
          //Procurando o index onde o ID do fornecedor for igual ao ID do 'fornecedorEdicao' para atualizar todos os dados do fornecedor 
          const index = fornecedores.findIndex((f) => f.id_fornecedor === fornecedorEdicao);
          fornecedores[index] = data;

          //Resetando o formulário
          document.getElementById("forms").reset();
          fornecedorEdicao = null;
          document.getElementById("btn-cancel").style.display = "none";

          displayProviders();
        })
        .catch((err) => console.error("Erro: ", err));
    }
    else {
      //Se for um novo fornecedor
      fetch("http://localhost:3000/fornecedores", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(fornecedor)})
        //Convertendo a 'response' para json
        .then((response) => response.json())
        //Manipulando os dados convertidos
        .then((data) => {
            //Adicionando os dados em 'fornecedores'
            fornecedores.push(data);

            //Resetando o formulário
            document.getElementById("forms").reset();

            //Chamando a função 'displayProviders' para atualizar a tabela
            displayProviders();
        })
        .catch((err) => console.error("Erro: ", err));
    }
  }
})

//CANCELAR
const cancelBtn = document.getElementById("btn-cancel");
//Se o usuário apertar o botão 'Cancelar':
cancelBtn.addEventListener('click', () => {
  //A variável 'fornecedorEdicao' volta a ser nula
  fornecedorEdicao = null;
  //Os campos do formulário vão ser resetados
  document.getElementById("forms").reset();
  //Alterando a exibição do botão 'Cancelar' para 'none'
  cancelBtn.style.display = "none";
})

//Carregando fornecedores do servidor ao carregar a página com uma solicitação HTTP (solicitação GET)
fetch("http://localhost:3000/fornecedores")
  //Convertendo a 'response' para json
  .then((response) => response.json())
  //Manipulando os dados convertidos
  .then((data) => {
    fornecedores = data;
    displayProviders();
  })
  .catch((err) => console.error("Erro: ", err));