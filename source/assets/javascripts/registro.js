$(".js-register-form").submit(function(e){
  e.preventDefault();
  $.ajax({
    url: 'https://hooks.zapier.com/hooks/catch/602113/siw2ip/',
    type: 'get',
    dataType: 'json',
    data: $(e.currentTarget).serialize(),
    success: function(data) {
      document.body.classList.add('form-sent');
      console.log("Success!");
    }
  });
});

$(".js-register-form").conversationalForm({
  dictionaryData: {
    "group-placeholder": "Digite para filtrar a lista...",
    "input-no-filter": "Sem resultados para <strong>{input-value}</strong>"
  }
});


$('input[name="nome"]').on('change', function() {
  console.log($( this ).val());
  console.log('changed');
  // $('input[name="primeiro-nome"]')
})
