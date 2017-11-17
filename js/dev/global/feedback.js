// Document Ready
$( document ).ready(function() {

  if ( $('.js--feedback-action').length ) {
    close_feedback();
  }

}); //END Document Ready
function close_feedback() {
  $.each( $('.js--feedback-action'), function() {
    $('.js--feedback-modal__close-btn').click(function(){
      $(this).parent().parent().removeClass('enable');
    });
  });
}
