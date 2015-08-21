$(document).on('pageload', function(){
	$('.parallax').parallax();
	$('.tabs').tabs();
	$('.dropdown-button').dropdown();
});

void function(){
	$(document).trigger('pageload', this.href);

	if (!('pushState' in window.history)) return;

	var $body = $('body'),
		$page = $('.current-page');

	function load(url) {
		$page.addClass('unloading');
		(function(el) { setTimeout(function(){
			el.remove();
		}, 1200) }($page));

		$page = $('<div/>').appendTo($body);

		window.history.pushState({}, '', url);

		$page.load(url + ' main', function() {
			$(document).trigger('pageload', this.href);
			$body.scrollTop(0);
		});

		event.preventDefault();
	}

	$body.on('click', 'a', function(event){
		var href = this.getAttribute('href');
		if (href.indexOf('#') == 0 || href.indexOf(':') >= 0) return;
		
		load(this.href);
	});

	window.onpopstate = function(event) {
		load(location.href);
	};

}();

