$(".js-register-form").submit(function(e){
  e.preventDefault();
  submitForm(e);
});

function submitForm(e){
  $.ajax({
    url: 'https://hooks.zapier.com/hooks/catch/602113/siw2ip/',
    type: 'get',
    dataType: 'json',
    data: $(e.currentTarget).serialize(),
    success: function(data) {
      document.body.classList.add('form-sent');
      console.log("Success!");
    },
    error: function(data) {
      alert("Está tudo bem com a sua internet? Não estou conseguindo mandar os dados do seu formulário.");
      submitForm(e);
    }
  });
}

var dispatcher = new cf.EventDispatcher();
dispatcher.addEventListener(cf.FlowEvents.USER_INPUT_UPDATE, function(event){
  var serialized = $('.js-register-form').serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});
  console.log(serialized);
}, false);

$(".js-register-form").conversationalForm({
  dictionaryData: {
    "group-placeholder": "Digite para filtrar a lista...",
    "input-no-filter": "Sem resultados para <strong>{input-value}</strong>"
  },
  userInterfaceOptions:{
    controlElementsInAnimationDelay: 500,
    robot: {
      robotResponseTime: 0,
      chainedResponseTime: 600
    }
  },
  hideUserInputOnNoneTextInput: true,
  eventDispatcher: dispatcher
});

function set_username(username){
  username.replace(/\ /g, '+');
  $('head').append('<style type="text/css">body .conversational-form cf-chat-response.user thumb{background-image: url(https://ui-avatars.com/api/?background=5B5AEC&color=ffffff&size=128&font-size=0.3&length=1&name='+username+') !important}</style>');
}

// set_username('kande');
