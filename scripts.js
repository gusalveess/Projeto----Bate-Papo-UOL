//---------------------------------------------------------------------PRIMEIRO
// variáveis globais
let nick = document.querySelector(".nickname")
let chat = document.querySelector(".batepapo")
let nickname
let msgs;

//--------------------------------------------------------------------- SEGUNDO
//função buscando mensagem execuntando
buscarmensagens();
//---------------------------------------------------------------------


//---------------------------------------------------------------------TERCEIRO
// Função pra mostrar a sidebar
function mostrarbarra() {
  const mostrar = document.querySelector(".sidebar").parentNode
  mostrar.classList.remove("hidden")
  searchpeop()
}
//---------------------------------------------------------------------


//---------------------------------------------------------------------QUARTO
// Função pra esconder a sidebar
function esconderbarra() {
  const esconder = document.querySelector(".sidebar").parentNode
  esconder.classList.add("hidden")
}
//---------------------------------------------------------------------


//---------------------------------------------------------------------QUINTO
// Etapa pra buscar nome no servidor!!
function buscarnome(busca) {

  const PromessaUm = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")

  PromessaUm.then();

  if (busca.status === 200) {
    nick.classList.toggle("hidden")
    chat.classList.remove("hidden")
    time();
  }
  online();
}
//---------------------------------------------------------------------


//---------------------------------------------------------------------SEXTO
// Etapa que Manda o nome pro servidor!!
function nome() {

  nickname = document.querySelector(".nome").value;


  const novonick =
  {
    name: nickname
  }

  const PromessaDois = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", novonick);

  PromessaDois.then(buscarnome);
  PromessaDois.catch(erros);
}
//---------------------------------------------------------------------


//---------------------------------------------------------------------SÉTIMO
// função que manda pro servidor que está on

function online() {
  const nomedado = document.querySelector(".nome").value;

  const nickon = {
    name: nomedado
  }

  const PromessaTres = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nickon);

}
//---------------------------------------------------------------------



//---------------------------------------------------------------------OITAVO
// função que busca as mensagens na API
function buscarmensagens() {

  const promessaquatro = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")

  promessaquatro.then(pegarmsg)
}
//---------------------------------------------------------------------



//---------------------------------------------------------------------NONO
// função que pega a resposta e joga na váriavel
function pegarmsg(resposta) {

  msgs = resposta.data
  renderizarmsgs();
  scroll()
}

//---------------------------------------------------------------------DÉCIMO
function tipomsg(TypeMessage) {
  if (TypeMessage == 'message') {
    return 'publica'
  }

  if (TypeMessage == 'status') {
    return 'status'
  }

  if (TypeMessage == 'private-message') {
    return 'privado'
  }
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO PRIMEIRO (11)

function time() {
  setInterval(buscarmensagens, 2000)
  setInterval(online, 5000)
  setInterval(searchpeop, 1000)
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO SEGUNDO (12)
// Função que joga as mensagens na tela
function renderizarmsgs() {

  const dialogo = document.querySelector(".mensagens")
  dialogo.innerHTML = '';


  for (let i = 0; i < msgs.length; i++) {
    let TypeMessage = msgs[i].type
    if (TypeMessage === 'private_message' && (msgs[i].to === nickname || msgs[i].from === nickname)) {

      dialogo.innerHTML += `
  <div class="texto ${tipomsg(TypeMessage)}">
  <p> <span>(${msgs[i].time})</span> <strong> ${msgs[i].from} </strong> (Reservadamente) para <strong> ${msgs[i].to}</strong> : ${msgs[i].text} </p>
  </div>   
`;
    }

    if (TypeMessage === 'message' || TypeMessage === 'status') {
      dialogo.innerHTML += `
          <div class="texto ${tipomsg(TypeMessage)}">
          <p> <span>(${msgs[i].time})</span> <strong> ${msgs[i].from} </strong> para <strong> ${msgs[i].to}</strong> : ${msgs[i].text} </p>
          </div>   
      `;
    }
  }
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO TERCEIRO (13)
//Função que dá Scroll automático
function scroll() {
  const chat = document.querySelector(".mensagens")
  const ultimamsg = chat.lastElementChild
  ultimamsg.scrollIntoView()
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO QUARTO (14)
//Função pra logar com enter
function enternome(event) {
  const key = event.which;
  if (key == '13') {
    document.querySelector(".login").click();
  }
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO QUINTO (15)
//Função pra mandar msg com enter
function entermsg(event) {
  const key = event.which;
  if (key == '13') {
    document.querySelector(".botao").click();
  }
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO SEXTO (16)
//Função pra mandar mensagens
function sendmessage() {

  nickname = document.querySelector(".nome").value;
  const send = document.querySelector(".mensagem").value

  const mensagemenviada = {
    from: nickname,
    to: "Todos",
    text: send,
    type: "message"
  }

  const promessacinco = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagemenviada)
  document.querySelector(".mensagem").value = "";
  promessacinco.catch(erromsg);

}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO SÉTIMO (17)
// Função pra dar reload em caso de erro
function erromsg() {
  alert('Usuário desconectado!')
  window.location.reload()
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO OITAVO (18)
// Função pra pesquisar lista de pessoas na API
function searchpeop() {
  let pessoas = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants"); 
  pessoas.then(function (response) {
    let online = response.data;
    pessoason(online);
  })
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- DÉCIMO NONO (19)
// Função que renderiza pessoas que estão online
function pessoason(online) {
  let onlinepeop = document.querySelector(".online-people");
  onlinepeop.innerHTML = ''
  for (let i = 0; i < online.length; i++) {
    onlinepeop.innerHTML += `<div class="destino">
    <ion-icon name="person-circle"></ion-icon>
    <h3> ${online[i].name} </h3>
</div>`
  }
}
//---------------------------------------------------------------------


//--------------------------------------------------------------------- VIGÉSIMO (20)
// função pra descobrir erros
function erros(error) {

  console.log(error.response.status);

  if (error.response.status === 404) {
    alert("Não foi encontrado!");
  }

  //Quando o título já existe
  if (error.response.status === 400) {
    alert("Insira um novo nome!");
  }
}