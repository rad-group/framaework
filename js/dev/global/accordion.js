;(function ($) {

  // Document Ready
  $( document ).ready(function() {
    if ( $('.js--accordion').length ) {
      accordion();
    }
  }); //END Document Ready

  function accordion() {

    var $single_accordion_header = $('.js--accordion__single-header');
    var $single_accordion = $single_accordion_header.parent();
    var $single_accordion_content = $('.js--accordion__single-content');


    $single_accordion_header.click(function() {

      var $this_single_accordion_content = $(this).parent().find('.js--accordion__single-content');
      var $this_single_accordion = $(this).parent();

      if ( $this_single_accordion.hasClass('opened') ) {
        $this_single_accordion.removeClass('opened');
        $this_single_accordion_content.slideUp();
      } else {
        $single_accordion.removeClass('opened');
        $single_accordion_content.slideUp();

        $this_single_accordion.addClass('opened');
        $this_single_accordion_content.slideDown();
      }

    });

  }

}(jQuery));
