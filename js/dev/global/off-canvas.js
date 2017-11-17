// Document Ready
$( document ).ready(function() {

  open_off_canvas();
  close_off_canvas();

}); //END Document Ready

function open_off_canvas() {
  var $btn = $('.js--off-canvas-action');

  $btn.click(function(){
    var target = $(this).data( "off-canvas" );

    $('#' + target).addClass('opened');

    $('body').addClass('off-canvas-opened');
  })
}

function close_off_canvas() {

  function remove_off_canvas() {
    $('.js--off-canvas').removeClass('opened');
    $('body').removeClass('off-canvas-opened');
  }

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      remove_off_canvas();
    }
  });

  $('.js--close-off-canvas').click(function(){
    remove_off_canvas();
  })
}
