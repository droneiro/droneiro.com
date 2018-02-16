$(document).ready(function(){
  function readURL(input) {
    var attr = $(input).attr('data-file');
    $('.js-document-preview[data-file='+attr+']').attr('src', $(input).val());
  }
  $(".js-document-upload").change(function(){
    readURL(this);
  });
  $(".js-serial").draggable();
  $(".js-serial").resizable({
    minHeight: 150,
    minWidth: 150,
    aspectRatio: 1
  });
  $(".js-save").click(function() {
    html2canvas($(".js-playground"), {
      logging: true,
      useCORS: true,
      onrendered: function(canvas) {
        var a = document.createElement('a');
        // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
        a.href = canvas.toDataURL("image/jpeg");
        var cliente = prompt("Qual é o nome desse cliente?", "Harry Potter");
        a.download = parameterize(cliente)+'.jpg';
        a.click();
      }
    });
  });
  updatePreviews();
})

function installWidgetPreviewSingle(widget, img) {
  widget.onChange(function(file) {
    img.css('display', 'none');
    img.attr('src', '');
    if (file) {
      file.done(function(fileInfo) {
        var previewUrl = fileInfo.cdnUrl;
        if (img.attr('data-file') == 'serial') {
          img.attr('style', 'background-image: url('+previewUrl+')');
        } else {
          img.attr('src', previewUrl);
        }
        img.css('display', 'block');
      });
    }
  });
}

function updatePreviews() {
  $('.js-document-upload').each(function() {
    var attr = $(this).attr('data-file');
    installWidgetPreviewSingle(
      uploadcare.SingleWidget($(this)),
      $('.js-document-preview[data-file='+attr+']')
    );
  });
}

function parameterize(str) {
    return str.trim().toLowerCase().replace(/[^a-zA-Z0-9 -]/, "").replace(/\s/g, "-");
};
