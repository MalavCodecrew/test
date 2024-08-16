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




// Listen for changes on the variant radio buttons
$(document).on('change', 'input[name="Size"]', function() {
    handleConversion();
});

// Existing toggle switch logic
$("#toggleConvert").change(function() {
    handleConversion();
});

// Function to handle conversion logic
function handleConversion() {
    var valueText = $('#value').text();
    
    // Extract numeric part from the text
    var numericValue = parseFloat(valueText);
    
    // Debugging: Check if numericValue is correct
    console.log('Extracted numeric value:', numericValue);

    // If numeric value is valid, perform conversion
    if (!isNaN(numericValue)) {
        if ($("#toggleConvert").is(":checked")) {
            $("#value").text((numericValue * 2.54).toFixed(2) + ' Centimeters');
        } else {
            $("#value").text((numericValue / 2.54).toFixed(2) + ' Inches');
        }
    } else {
        console.error('Could not extract a valid number from:', valueText);
    }
}

