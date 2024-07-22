$(document).ready(function() {
    $('.quick-view-btn').on('click', function() {
        $('body').addClass('noscroll');
    });

    $('.close').on('click', function() {
        $('body').removeClass('noscroll');
    });

    $('body').dblclick(function() {
            $('body').removeClass('noscroll');
    });
   $(".custom-popup .form .product-form__buttons").click(function() {
    setTimeout(function(){
    $('body').removeClass('noscroll');
    },1000)
});
});
