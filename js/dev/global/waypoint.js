// Document Ready
$( document ).ready(function() {

  rad_waypoint();

}); //END Document Ready


function rad_waypoint() {
  if ( $('.js--rad-waypoint').length ) {

    var window_h = $(window).height();

    $( window ).scroll(function() {

      var scroll_top = $(window).scrollTop();

      $('.js--rad-waypoint').each(function() {

        var that = $(this);
        var offset = that.offset();
        var offset_delay = that.data('offset_delay');

        if ( offset_delay ) {
          var offset_wh = offset.top - window_h + offset_delay;
        } else {
          var offset_wh = offset.top - window_h;
        }

        if ( scroll_top > offset_wh ) {
          that.addClass('on-screen');
        } else {
          that.removeClass('on-screen');
        }

      });
    });
  };

};
