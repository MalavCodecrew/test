// 4th level megamenu dropdown js-------------------------------------------------


$(document).ready(function () {
  $(".icon-caret").click(function (event) {
    // Prevent the document click event from firing
    event.stopPropagation();

    // Get the submenu associated with the clicked caret
    var submenu = $(this).next(".sub-menu");

    // Hide all submenus and remove the 'down' class from all carets
    $(".sub-menu").not(submenu).hide();
    $(".icon-caret").not(this).removeClass("down");

    // Toggle the submenu and caret class
    $(this).toggleClass("down");
    submenu.toggle();
  });

  // Hide the submenu when clicking outside
  $(document).click(function () {
    $(".sub-menu").hide();
    $(".icon-caret").removeClass("down");
  });

  // Prevent the submenu click from hiding the submenu
  $(".sub-menu").click(function (event) {
    event.stopPropagation();
  });
});





// $(document).ready(function () {
//   $(".icon-caret").click(function (event) {
//     // Prevent the document click event from firing
//     event.stopPropagation();

//     $(".sub-menu").hide();
//     $(".icon-caret").removeClass("down");

//     $(this).toggleClass("down");
//     if ($(this).hasClass("down")) {
//       $(this).next(".sub-menu").show();
//     } else {
//       $(this).next(".sub-menu").hide();
//     }
//   });

//   // Hide the submenu when clicking outside
//   $(document).click(function () {
//     $(".sub-menu").hide();
//     $(".icon-caret").removeClass("down");
//   });

//   // Prevent the submenu click from hiding the submenu
//   $(".sub-menu").click(function (event) {
//     event.stopPropagation();
//   });
// });
