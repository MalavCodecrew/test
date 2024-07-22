$(document).ready(function () {
$(".quick-view-btn .button").click(function() {
  const Getid = $(this).attr('id')
  console.log("Getid",`popup-${Getid}`)
  $(`#popup-${Getid}`).fadeIn(500);  
})
$(".close").click(function() {
  $(".custom-popup").fadeOut(500);
});
  $("body").dblclick(function() {
  $(".custom-popup").fadeOut();
});
   $(".custom-popup .form .product-form__buttons").click(function() {
     setTimeout(function(){
  $(".custom-popup ").fadeOut(300);
     }, 1000)
});
});




