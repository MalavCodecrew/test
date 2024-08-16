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

// -------------------toggle button from cm to inch--------------------------------------------
// $("#toggleConvert").change(function() {
//       var val = parseFloat($('#value').text());
//       if($(this).is(":checked")) {
//           $("#value").text((val * 2.54).toFixed(2) + ' Centimeters');
//       } else {
//           $("#value").text((val / 2.54).toFixed(2) + ' Inches');
//       }
//   });


// $("#toggleConvert").change(function() {
//       var val = parseFloat($('#value1').text());
//       if($(this).is(":checked")) {
//           $("#value1").text((val * 2.54).toFixed(2) + ' Centimeters');
//       } else {
//           $("#value1").text((val / 2.54).toFixed(2) + ' Inches');
//       }
//   });




// Listen for variant change
$(document).on('change', 'variant-selects', function() {
    var val = parseFloat($('#value').text()); // Fetch the value from the element
    if ($("#toggleConvert").is(":checked")) {
        $("#value").text((val * 2.54).toFixed(2) + ' Centimeters');
    } else {
        $("#value").text((val / 2.54).toFixed(2) + ' Inches');
    }
});

// Existing toggle switch logic
$("#toggleConvert").change(function() {
    var val = parseFloat($('#value').text());
    if($(this).is(":checked")) {
        $("#value").text((val * 2.54).toFixed(2) + ' Centimeters');
    } else {
        $("#value").text((val / 2.54).toFixed(2) + ' Inches');
    }
});
