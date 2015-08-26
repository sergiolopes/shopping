$('body').on('submit', 'form', function(){
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
});