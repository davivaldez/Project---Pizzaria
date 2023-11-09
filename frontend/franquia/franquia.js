document.addEventListener("DOMContentLoaded", carregaFranquias);

/////////////////////////////////////////////////////////////////////////////

const urlFornecedor = "http://localhost:3000/fornecedores";

const selectFranquiaFornecedor = document.getElementById("select-franquia-fornecedor");

let fornecedorIdNome = [];

//FOREIGN KEY FORNECEDOR
function carregaFranquiaFornecedor() {
  fornecedorIdNome = [];

  fetch(urlFornecedor, { method: "GET"})
  .then((response) => response.json())
  .then((data) => {
      data.forEach((fornecedor) => {
        fornecedorIdNome.push({
          id: fornecedor.id_fornecedor,
          nome: fornecedor.nome_fornecedor
        })
      })

      carregaFornecedor();
  })
  .catch((err) => {
    alert("Ocorreu um erro ao buscar os fornecedores no arquivo franquia. Veja o console para mais informações.");
    console.error(err.message);
  })
}

function carregaFornecedor() {
  fornecedorIdNome.forEach((f) => {
    let option = document.createElement("option");

    option.value = f.id;
    option.textContent = f.nome;

    if (selectFranquiaFornecedor !== null) {
      selectFranquiaFornecedor.appendChild(option);
      }
  })
}

/////////////////////////////////////////////////////////////////////////////

function carregaFranquias() {
  carregaFranquiaFornecedor();
}

























/////////////////////////////////////////////////////////////////////////////
// FOREIGN KEY FORNECEDOR
// let fornecedoresFranquias = [];
// let fornecedorIdNome = [];

// //Função para adicionar o nome do fornecedor como uma opção para selecionar
// function displayProvider() {
//   const provider = document.getElementById("name-franchise-provider");
//   fornecedorIdNome.forEach((f) => {
//     const option = document.createElement("option");
//     option.textContent = f.nome;
//     option.value = f.id;
//     provider.appendChild(option);
//   })
// }

// //Função para realizar uma solicitação GET conseguir pegar o ID e nome de cada fornecedor
// function displayProvidersFranchises() {

//   //Carregando fornecedores do servidor ao carregar a página (solicitação GET)
//   fetch("http://localhost:3000/fornecedores")
//     //Obtendo a promise da solicitação HTTP e convertendo ela em um objeto JavaScript facilitando a manipulação dos dados
//     .then((response) => response.json())
//     //Manipulando os dados obtidos atribuindo a eles à variável 'fornecedoresFranquias' e adicionando eles na tabela
//     .then((data) => {
//       fornecedoresFranquias = data;

//       //Iterando pelos fornecedores para adicionar cada um na tabela com seus dados
//       fornecedoresFranquias.forEach((fornecedor) => {
//         fornecedorIdNome.push({id: fornecedor.id_fornecedor, nome: fornecedor.nome_fornecedor});        
//       })
//       displayProvider();
//     })
//   }

// //Realizando solicitação GET para obter os dados dos fornecedores
//   fetch("http://localhost:3000/fornecedores")
//   //Convertendo a 'response' para json
//   .then((response) => response.json())
//   //Manipulando os dados convertidos
//   .then((data) => {
//     fornecedoresFranquias = data;
//     displayProvidersFranchises();
//   })
//   .catch((err) => console.error("Erro: ", err));
// //////////////////////////////////////////////////////////////////////////////////////////////////////////

//  //Array para armazenar franquias do servidor
//  let franquias = [];

//  //Franquia em edição (após o botão alterar ser acionado, o valor dentro dessa variável irá receber o ID para chamar o PUT)
//  let franquiaEdicao = null;

//  //Função para exibir os franquias na tabela
//  function displayFranchises() {
//    const tbody = document.getElementById("tbody-franquia");

//    //Deixando o tdbody vazio para carregar os franquias que estão salvos em 'let franquias = []'
//    tbody.innerHTML = "";

//    //Carregando franquias do servidor ao carregar a página (solicitação GET)
//    fetch("http://localhost:3000/franquias")
//      //Obtendo a promise da solicitação HTTP e convertendo ela em um objeto JavaScript facilitando a manipulação dos dados
//      .then((response) => response.json())
//      //Manipulando os dados obtidos atribuindo a eles à variável 'franquias' e adicionando eles na tabela
//      .then((data) => {
//        franquias = data;

//        //Iterando pelos franquias para adicionar cada um na tabela com seus dados
//        franquias.forEach((franquia) => {
//          const tr = document.createElement("tr");
//          tr.innerHTML =
//          `<td>${franquia.id_franquia}</td>
//          <td>${franquia.nome_franquia}</td>
//          <td>${franquia.endereco_franquia}</td>
//          <td>${franquia.fk_fornecedor}</td>
//          <td class="td-buttons">
//            <button class="btn btn-outline-success" id="btn-update" onclick="editFranchise(${franquia.id_franquia})">Alterar</button>
//            <button class="btn btn-outline-danger" id="btn-delete" onclick="deleteFranchise(${franquia.id_franquia})">Remover</button>
//          </td>`

//          //Adicionando o elemento tr no tbody
//          tbody.appendChild(tr);
//        })
//      })
//    }

//  //Função para editar franquias
//  function editFranchise(id) {
//    franquiaEdicao = id;

//    //Obtendo todos os dados do franquia pelo ID verificando se cada franquia tem o ID igual ao que foi passado no parâmetro
//    const franquia = franquias.find((f) => f.id_franquia === id);

//    document.getElementById("name-franchise").value = franquia.nome_franquia;
//    document.getElementById("address-franchise").value = franquia.endereco_franquia
//    document.getElementById("name-franchise-provider").value = franquia.fk_fornecedor;

//    //Exibindo o botão 'Cancelar'
//    document.getElementById("btn-cancel").style.display = "inline-block";

//  }


//  //Função para deletar franquias
//  function deleteFranchise(id) {
//    //Solicitação HTTP para deletar franquias
//    fetch("http://localhost:3000/franquias/" + id, {method: "DELETE"})
//      //Após a solicitação ser executada, a lista de franquias é atualizada com todos os franquias que possuem IDs diferentes do que foi passado no parâmetro
//      .then(() => {
//        franquias = franquias.filter((f) => f.id_franquia !== id);

//        //Executando a função 'displayFranchises()' para a tabela ser carregada novamente com os dados atualizados
//        displayFranchises();
//      })
//      .catch((err) => console.error("Erro: ", err));
//  }

//  //CADASTRAR OU ALTERAR franquias
//  const forms = document.getElementById("forms");

//  forms.addEventListener('submit', (event) => {
//    const nome = document.getElementById("name-franchise").value;
//    const endereco = document.getElementById("address-franchise").value;
//    const fornecedor = document.getElementById("name-franchise-provider").value;

//    if (!nome || !endereco || !fornecedor) {
//      event.preventDefault();
//    }

//    else {
//      //Coletando os valores do formulário
//      const franquia = {
//        nome: nome,
//        endereco: endereco,
//        fornecedor: fornecedor
//      }

//      if (franquiaEdicao) {
//        //Se estiver editando a franquia
//        fetch("http://localhost:3000/franquias/" + franquiaEdicao, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(franquia)})
//          //Convertendo a 'response' para json
//          .then((response) => response.json())
//          //Manipulando os dados convertidos
//          .then((data) => {
//            //Procurando o index onde o ID do franquia for igual ao ID do 'franquiaEdicao' para atualizar todos os dados do franquia 
//            const index = franquias.findIndex((f) => f.id_franquia === franquiaEdicao);
//            franquias[index] = data;

//            //Resetando o formulário
//            document.getElementById("forms").reset();
//            franquiaEdicao = null;
//            document.getElementById("btn-cancel").style.display = "none";

//            displayFranchises();
//          })
//          .catch((err) => console.error("Erro: ", err));
//      }
//      else {
//        //Se for um novo franquia
//        fetch("http://localhost:3000/franquias", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(franquia)})
//          //Convertendo a 'response' para json
//          .then((response) => response.json())
//          //Manipulando os dados convertidos
//          .then((data) => {
//              //Adicionando os dados em 'franquias'
//              franquias.push(data);

//              //Resetando o formulário
//              document.getElementById("forms").reset();

//              //Chamando a função 'displayFranchises' para atualizar a tabela
//              displayFranchises();
//          })
//          .catch((err) => console.error("Erro: ", err));
//      }
//    }
//  })

//  //CANCELAR
//  const cancelBtn = document.getElementById("btn-cancel");
//  //Se o usuário apertar o botão 'Cancelar':
//  cancelBtn.addEventListener('click', () => {
//    //A variável 'franquiaEdicao' volta a ser nula
//    franquiaEdicao = null;
//    //Os campos do formulário vão ser resetados
//    document.getElementById("forms").reset();
//    //Alterando a exibição do botão 'Cancelar' para 'none'
//    cancelBtn.style.display = "none";
//  })

//  //Carregando franquias do servidor ao carregar a página com uma solicitação HTTP (solicitação GET)
//  fetch("http://localhost:3000/franquias")
//    //Convertendo a 'response' para json
//    .then((response) => response.json())
//    //Manipulando os dados convertidos
//    .then((data) => {
//      franquias = data;
//      displayFranchises();
//    })
//    .catch((err) => console.error("Erro: ", err));
