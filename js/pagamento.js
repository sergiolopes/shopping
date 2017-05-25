if(window.PaymentRequest) {
  console.log('Tentando pagar pelo browser!');
  try {
    var payreq = new PaymentRequest(
      [{ supportedMethods: ['basic-card'] }],
      {  
        total: {
          label: 'Estacionamento diário',  
          amount:{  
            currency: 'BRL',  
            value: 10
          }  
        }
      },
      {}
    );
    document.body.classList.add('payment-api-available');
    $('body').on('submit', 'form', function() {
      payreq.show()
        .then(finalizaCompra)
        .catch(function(){
          Materialize.toast('Problemas com a Payment Request API', 4000);
        });

      return false;
    });
  } catch(e) {
    console.error(e);
    $('body').on('submit', 'form', finalizaCompra);
  }

} else {  
  $('body').on('submit', 'form', finalizaCompra);
}


function finalizaCompra(){
  Materialize.toast('Só testes, não enviei o cartão, claro', 4000);
  $('form')[0].reset();

  var now = new Date();
  var saida = new Date(now.getTime() + 1000 * 60 * 15);

  var title = 'Pagamento confirmado';
  var options = {
    icon: 'img/icon.png', 
    body: 'Saída liberada até ' + saida.getHours() + 'h' + ("0" + (saida.getMinutes() + 1)).slice(-2)
  };

  if ('Notification' in window) {
    Notification.requestPermission();

    if ('showNotification' in ServiceWorkerRegistration.prototype) {
      console.log('Notification SW');
      navigator.serviceWorker.ready.then(function(registration){
        registration.showNotification(title, options);
      });
    } else {
      console.log('Notification classic');
      new Notification(title, options);
    }
  }

	return false;
}