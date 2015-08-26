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

  if (!navigator.getUserMedia) {
    $('.code-scan').hide();
  }
});
