$(document).on('pageload', function(){
	$('.parallax').parallax();
	$('.tabs').tabs();
	$('.dropdown-button').dropdown();
  $('.modal-trigger').leanModal({
    dismissible: true,
    opacity: .5,
    complete: function() { 
      $(document).trigger('modalclose');
    }
  });
});

void function(){
	$(document).trigger('pageload', this.href);

	if (!('pushState' in window.history)) return;

	var $body = $('body'),
		  $page = $('.current-page');

	function load(url) {
		console.log('Load', url);

    $('.unloading').remove();
		$page.addClass('unloading');

		$page = $('<div/>').appendTo($body);

		$page.load(url + ' main', function() {
			$(document).trigger('pageload', this.href);
			$body.scrollTop(0);
		});
	}

	$body.on('click', 'a', function(event){
		var href = this.getAttribute('href');
		if (href.indexOf('#') == 0 || href.indexOf(':') >= 0) return;
		
		href = this.href;

		console.log('pushState', href);
		window.history.pushState({push:true}, '', href);

		load(href);

		event.preventDefault();
	});

	window.onpopstate = function(event) {
		console.log('Popstate', location.href);
		if (event.state && event.state.push) {
			load(location.href);	
		}
	};

}();


$('body').on('submit', 'form', function(){
	alert('Sistema de testes, desabilitei o submit do cartão, claro');
	return false;
});

// new Notification('Pagamento confirmado', {icon: 'img/icon.png', body: 'Saída liberada até ' + (new Date().getHours()+1) + 'h'})



if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: './'
  }).then(function(registration) {
    // Check to see if there's an updated version of service-worker.js with new files to cache:
    // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-registration-update-method
    if (typeof registration.update == 'function') {
      registration.update();
    }

    // updatefound is fired if service-worker.js changes.
    registration.onupdatefound = function() {
      // The updatefound event implies that registration.installing is set; see
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
      var installingWorker = registration.installing;

      installingWorker.onstatechange = function() {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // It's the perfect time to display a "New content is available; please refresh."
              // message in the page's interface.
              console.log('New or updated content is available.');
            } else {
              // At this point, everything has been precached, but the service worker is not
              // controlling the page. The service worker will not take control until the next
              // reload or navigation to a page under the registered scope.
              // It's the perfect time to display a "Content is cached for offline use." message.
              console.log('Content is cached, and will be available for offline use the ' +
                          'next time the page is loaded.')
            }
          break;

          case 'redundant':
            console.error('The installing service worker became redundant.');
          break;
        }
      };
    };
  }).catch(function(e) {
    console.error('Error during service worker registration:', e);
  });
}


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