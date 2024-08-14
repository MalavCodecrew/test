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
 // Conversion function
function convertValue(val) {
    if ($("#toggleConvert").is(":checked")) {
        return (val * 2.54).toFixed(2) + ' Centimeters';
    } else {
        return (val / 2.54).toFixed(2) + ' Inches';
    }
}

// Event listener for the toggle switch
$("#toggleConvert").change(function() {
    var val = parseFloat($('#value').text());
    $("#value").text(convertValue(val));
});

// Event listener for variant change
$(document).on('change', '[name="id"]', function() {
    var selectedVariant = $(this).val(); // This assumes you're using a dropdown or similar for variant selection

    // Update the value element with the new variant value
    var variantSize = parseFloat(selectedVariant); // Adjust this to extract the correct size value for your use case

    $('#value').text(variantSize); // Set the new value
    $("#value").text(convertValue(variantSize)); // Perform conversion
});


// $("#toggleConvert").change(function() {
//       var val = parseFloat($('#value1').text());
//       if($(this).is(":checked")) {
//           $("#value1").text((val * 2.54).toFixed(2) + ' Centimeters');
//       } else {
//           $("#value1").text((val / 2.54).toFixed(2) + ' Inches');
//       }
//   });