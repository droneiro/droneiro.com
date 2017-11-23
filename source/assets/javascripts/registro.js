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

$(".js-register-form").conversationalForm({
  dictionaryData: {
    "group-placeholder": "Digite para filtrar a lista...",
    "input-no-filter": "Sem resultados para <strong>{input-value}</strong>"
  }
});

