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




var originalValue; // Variable to store the original value

// Listen for changes on the variant radio buttons
$(document).on('change', 'input[name="Size"]', function() {
    console.log('Variant changed');
    
    // Get the new value for the selected variant (you may need to adjust how you get this value)
    originalValue = parseFloat($(this).val()); // Assuming the value of the radio button is the original number (e.g., 8, 10, or 12)
    
    // Update the displayed value without any conversion initially
    $("#value").text(originalValue.toFixed(2) + ' Inches');
    
    // Apply conversion based on the current toggle state
    handleConversion();
});

// Toggle switch change event
$("#toggleConvert").change(function() {
    console.log('Toggle switch changed');
    handleConversion();
});

// Function to handle conversion logic
function handleConversion() {
    if (typeof originalValue === 'undefined') {
        console.error('Original value is not set');
        return;
    }

    // Check if toggle is checked
    var isToggleChecked = $("#toggleConvert").is(":checked");
    console.log('Toggle state:', isToggleChecked);

    // Perform conversion based on the original value
    if (isToggleChecked) {
        console.log('Converting to Centimeters');
        $("#value").text((originalValue * 2.54).toFixed(2) + ' Centimeters');
    } else {
        console.log('Converting to Inches');
        $("#value").text(originalValue.toFixed(2) + ' Inches');
    }
}

