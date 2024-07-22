$(document).ready(function() {
    $('.quick-view-btn').on('click', function() {
        $('.popup-overlay').css("display", "block","!important");
    }); 

    $('.close').on('click', function() {
         $('.popup-overlay').css("display", "none");
    });

    $('body').dblclick(function() {
             $('.popup-overlay').css("display", "none");
    });
  $(".custom-popup .form .product-form__buttons").click(function() {
    setTimeout(function(){
    $('.popup-overlay').css("display", "none");
    },1000)
});
});
