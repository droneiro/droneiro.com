$(".js-register-form").submit(function(e){
  e.preventDefault();
  submitForm(e);
});

function submitForm(e){
  document.body.classList.add('is-loading');
  $.ajax({
    url: 'https://hooks.zapier.com/hooks/catch/602113/siw2ip/',
    type: 'get',
    dataType: 'json',
    data: $(e.currentTarget).serialize(),
    success: function(data) {
      document.body.classList.remove('is-loading');
      document.body.classList.add('form-sent');
      console.log("Success!");
      fbq('track', 'CompleteRegistration');
      ga('send', 'event', 'conversion', 'CompleteRegistration', 'CompleteRegistration');
      goog_report_conversion();
    },
    error: function(data) {
      alert("Está tudo bem com a sua internet? Não estou conseguindo mandar os dados do seu formulário.");
      submitForm(e);
    }
  });
}

var dispatcher = new cf.EventDispatcher();
dispatcher.addEventListener(cf.FlowEvents.USER_INPUT_UPDATE, function(event){
  var data = $('.js-register-form').serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});

  $('.js-diagnostico').attr('cf-questions', getDiagnostic(data));
}, false);

function getDiagnostic(data) {
  var message = "",
      anatelMessage = "",
      userRegistros = [],
      valorTotal = 29;

  var registros = {
    anatel: {
      title: 'Anatel',
      description: "A Anatel regula as radiofrequências no Brasil. Como os Drones e rádios possuem transmissores, precisamos homologar esses aparelhos com o órgão.",
      instrucoes: "<a href='https://www.multidrones.com.br/2017/03/14/homologao-de-drones-pela-anatel-tudo-o-que-voc-precisa-saber/' target='_blank'>● Multidrones - Tudo o que você precisa saber sobre a homologação da Anatel</a><a href='http://www.anatel.gov.br/Portal/verificaDocumentos/documento.asp?numeroPublicacao=346061&pub=original&filtro=1&documentoPath=346061.pdf' target='_blank'>● Manual do Usuário Solicitante - Declaração de Conformidade para quadricóptero (DRONE)</a><br>",
      sigla: "Agência Nacional de Telecomunicações",
      valorOrgao: 200,
      valor: 70
    },
    anac: {
      title: 'Anac - SISANT',
      description: "A ANAC é o orgão que criou as regras para operações com drones. Precisamos cadastrar você e seu drone no sistema SISANT.",
      instrucoes: "<a href='https://sistemas.anac.gov.br/SISANT/Operador/Cadastrar' target='_blank'>● Cadastro de Operador no SISANT</a><a href='http://www.anac.gov.br/assuntos/paginas-tematicas/drones/cadastro-de-drones' target='_blank'>● Cadastro de Drones - Informativo da Anac</a><a href='https://www.youtube.com/watch?v=SiP-BADS4qc' target='_blank'>● Como cadastrar drone na ANAC - SISANT 2017 — Video do canal Águias Drones</a><br>",
      sigla: "Agência Nacional de Aviação Civil",
      valorOrgao: 0,
      valor: 25
    },
    decea: {
      title: 'Decea - SARPAS',
      description: "O DECEA disponibiliza um sistema para a solicitação de acesso ao espaço aéreo para o uso de drones. Precisamos cadastrar você e sua aeronave no SARPAS.",
      instrucoes: "<a href='https://www.youtube.com/watch?v=AykL8kfcE4c' target='_blank'>● Como fazer o cadastro de usuário - Vídeo do canal do DECEA</a><a href='http://www.decea.gov.br/drone/' target='_blank'>● Portal Drone/RPAS - Decea</a><a href='http://servicos.decea.gov.br/sarpas/?i=cadastro' target='_blank'>● Novo cadastro no SARPAS</a><br>",
      sigla: "Departamento de Controle do Espaço Aéreo",
      valorOrgao: 0,
      valor: 25
    }
  }

  // Nome
  if (data.nome){
    message += "Beleza, "+data.nome+"! Com essas respostas eu já consigo te dizer o que você precisa!";
  } else {
    message += "Beleza! Com essas respostas eu já consigo te dizer quais registros estão faltando pra você voar tranquilo!";
  }

  // Anatel
  if (data['selo-anatel'] == "não") {
    userRegistros.push(registros.anatel);
    anatelMessage = " (já com os R$ "+registros.anatel.valorOrgao+" destinados à Anatel incluídos)";
  }

  // Anac
  if (data.peso == "sim" && data.anac == "não") {
    userRegistros.push(registros.anac);
  }

  // Decea
  if (data.decea == "não") {
    userRegistros.push(registros.decea);
  }

  if (userRegistros.length > 1) {
    message += "&&São "+userRegistros.length+" registros ao todo:";
  } else if (userRegistros.length == 1){
    message += "&&Na verdade, só falta um registro!";
  } else {
    message += "&&<b>Parabéns!</b> Você não tem nenhum registro pendente!<br><br><b>Voe tranquilo!</b>";
    if(data['selo-anatel'] && data.peso && data.anac && data.decea){
      $('cf-input-control-elements').css("display","none");
    }
  }

  userRegistros.forEach(function(el){
    message += "<span><br><b>"+el.title+"</b> - "+el.description+"</span>";
    valorTotal += el.valor;
    valorTotal += el.valorOrgao;
  });

  if (userRegistros.length > 0) {
    message += "&&<span>Você tem duas opções: <br><br><b>● Deixar todo esse trabalho na nossa mão</b> por <b>R$ "+valorTotal+"</b>"+anatelMessage+". Sem esquentar a cabeça com a burocracia do processo, você ainda vai receber na sua casa todos os documentos plastificados, adesivo do fabricante e de identificação da aeronave em caso de perda. O pagamento é feito pelo PagSeguro e ainda pode ser parcelado! <br><br><b>● Fazer você mesmo</b> e arcar com os possíveis custos diretamente com os orgãos responsáveis.</span>";
  }

  $('.js-price').val(valorTotal);

  if (data.ajuda == "sim") {
    $('.js-form-success').text('Você vai receber um email em algumas horas com o link para pagamento via PagSeguro e mais algumas informações importantes.');
  } else {
    $('.js-form-success').text('Ficamos felizes em ter te ajudado!');
  }

  setInstrucoes(data, userRegistros);

  return message;
}

function setInstrucoes(data, userRegistros){
  message = "Tranquilo, "+data.nome+"! Aqui vão as instruções pra sua aventura!&&<span>"
  userRegistros.forEach( function(element, index) {
    message += "<b>"+element.title+"</b>"+element.instrucoes;
  });
  message += "</span>"
  message += "&&<span>Se você mudar de ideia e quiser deixar o serviço com a gente, é só clicar na sua resposta anterior.</span>"
  $('.js-instrucoes').attr('cf-questions', message);
}

$(".js-register-form").conversationalForm({
  dictionaryData: {
    "group-placeholder": "Digite para filtrar a lista...",
    "input-no-filter": "Sem resultados para <strong>{input-value}</strong>"
  },
  userInterfaceOptions:{
    controlElementsInAnimationDelay: 500,
    robot: {
      robotResponseTime: 0,
      chainedResponseTime: 400
    }
  },
  hideUserInputOnNoneTextInput: true,
  eventDispatcher: dispatcher
});

function set_username(username){
  username.replace(/\ /g, '+');
  $('head').append('<style type="text/css">body .conversational-form cf-chat-response.user thumb{background-image: url(https://ui-avatars.com/api/?background=5B5AEC&color=ffffff&size=128&font-size=0.3&length=1&name='+username+') !important}</style>');
}

fbq('track', 'Lead');
ga('send', 'event', 'conversion', 'registrationForm', 'registrationForm');
