// Document Ready
$( document ).ready(function() {

  open_popup();
  close_popup();

}); //END Document Ready

function open_popup() {
  var $btn = $('.js--popup-action');

  $btn.click(function(){
    var target = $(this).data( "popup" );

    $('#' + target).addClass('active');

    $('body').addClass('popup-opened');
  })
}

function close_popup() {
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('.js--popup').removeClass('active');
      $('body').removeClass('popup-opened');
    }
  });

  var $close_btn = $('.js--close-popup');
  $close_btn.click(function(){
    $('.js--popup').removeClass('active');
    $('body').removeClass('popup-opened');
  })
}
