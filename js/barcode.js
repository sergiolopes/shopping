$('body').on('click', '.code-scan', function() {
  Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream"
    },
    decoder : {
      readers : ["code_128_reader"]
    },
    tracking: true,
    controls: true,
    locate: true
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });

  Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    $(document).trigger('codefound', code);
  });

});

$(document).on('modalclose', function() {
  Quagga.stop();
});

$(document).on('codefound', function(event, code) {
  console.log('Achei código de barras', code);
  try {
    $('#scan').closeModal();
    Quagga.stop();    
  } finally {
    $('#codigo').val(code).focus();  
  }
});

$('body').on('click', '.codetest', function(event) {
  $(document).trigger('codefound', '8745642');
});