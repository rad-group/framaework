;(function ($) {

  // Document Ready
  $( document ).ready(function() {
    if ( $('.js--accordion').length ) {
      accordion();
    }
  }); //END Document Ready

  function accordion() {

    var $single_accordion = $('.js--accordion__single');
    var $single_accordion_content = $('.js--accordion__single-content');


    $single_accordion.click(function() {

      var $this_single_accordion_content = $(this).find('.js--accordion__single-content');

      if ( $(this).hasClass('opened') ) {
        $(this).removeClass('opened');
        $this_single_accordion_content.slideUp();
      } else {
        $single_accordion.removeClass('opened');
        $single_accordion_content.slideUp();

        $(this).addClass('opened');
        $this_single_accordion_content.slideDown();
      }

    });

  }

}(jQuery));
