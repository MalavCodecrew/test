// 4th level megamenu dropdown js-------------------------------------------------

   $(document).ready(function () {
    $(".icon-caret").click(function () {
      $(".sub-menu").hide()
      $(".icon-caret").removeClass("down");
      $(this).toggleClass("down");
      if ($(this).hasClass("down")) {
        $(this).next(".sub-menu").show();
      } else {
        $(this).next(".sub-menu").hide();
      }
    });
  });
