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




// var originalValue; // Variable to store the original value

// // Listen for changes on the variant radio buttons
// $(document).on('change', 'input[name="Size"]', function() {
//     console.log('Variant changed');

//     // Get the new value for the selected variant (assuming value is numeric)
//     originalValue = parseFloat($(this).val());
//     console.log('Original value set to:', originalValue);

//     // Update the displayed value in Inches (initial state)
//     if (!isNaN(originalValue)) {
//         $("#value").text(originalValue.toFixed(2) + ' Inches');
//         console.log('Displayed value updated to:', originalValue.toFixed(2) + ' Inches');
//     } else {
//         console.error('Original value is not a valid number:', originalValue);
//     }

//     // Apply conversion based on the current toggle state
//     handleConversion();
// });

// // Toggle switch change event
// $("#toggleConvert").change(function() {
//     console.log('Toggle switch changed');
//     handleConversion();
// });

// // Function to handle conversion logic
// function handleConversion() {
//     if (typeof originalValue === 'undefined' || isNaN(originalValue)) {
//         console.error('Original value is not set or invalid');
//         return;
//     }

//     // Check if toggle is checked
//     var isToggleChecked = $("#toggleConvert").is(":checked");
//     console.log('Toggle state:', isToggleChecked);

//     // Perform conversion based on the original value
//     if (isToggleChecked) {
//         var convertedValue = (originalValue * 2.54).toFixed(2);
//         console.log('Converting to Centimeters:', convertedValue);
//         $("#value").text(convertedValue + ' Centimeters');
//     } else {
//         console.log('Converting to Inches:', originalValue.toFixed(2));
//         $("#value").text(originalValue.toFixed(2) + ' Inches');
//     }
// }




var originalValue; // Variable to store the original value for #value
var originalVal1;  // Variable to store the original value for #val1

// Listen for changes on the variant radio buttons
$(document).on('change', 'input[name="Size"]', function() {
    console.log('Variant changed');

    // Get the new values for the selected variant (assuming value is numeric)
    originalValue = parseFloat($(this).val()); // For #value
    originalVal1 = parseFloat($(this).val());  // For #val1 (same logic, adjust if different)

    console.log('Original value set to:', originalValue);
    console.log('Original val1 set to:', originalVal1);

    // Update the displayed values in Inches (initial state)
    if (!isNaN(originalValue)) {
        $("#value").text(originalValue.toFixed(2) + ' Inches');
        console.log('Displayed value updated to:', originalValue.toFixed(2) + ' Inches');
    } else {
        console.error('Original value is not a valid number:', originalValue);
    }

    if (!isNaN(originalVal1)) {
        $("#val1").text(originalVal1.toFixed(2) + ' Inches');
        console.log('Displayed val1 updated to:', originalVal1.toFixed(2) + ' Inches');
    } else {
        console.error('Original val1 is not a valid number:', originalVal1);
    }

    // Apply conversion based on the current toggle state
    handleConversion();
});

// Toggle switch change event
$("#toggleConvert").change(function() {
    console.log('Toggle switch changed');
    handleConversion();
});

// Function to handle conversion logic for both #value and #val1
function handleConversion() {
    if ((typeof originalValue === 'undefined' || isNaN(originalValue)) ||
        (typeof originalVal1 === 'undefined' || isNaN(originalVal1))) {
        console.error('Original value or val1 is not set or invalid');
        return;
    }

    // Check if toggle is checked
    var isToggleChecked = $("#toggleConvert").is(":checked");
    console.log('Toggle state:', isToggleChecked);

    // Perform conversion based on the original values
    if (isToggleChecked) {
        var convertedValue = (originalValue * 2.54).toFixed(2);
        var convertedVal1 = (originalVal1 * 2.54).toFixed(2);
        console.log('Converting to Centimeters:', convertedValue, convertedVal1);

        $("#value").text(convertedValue + ' Centimeters');
        $("#val1").text(convertedVal1 + ' Centimeters');
    } else {
        console.log('Converting to Inches:', originalValue.toFixed(2), originalVal1.toFixed(2));

        $("#value").text(originalValue.toFixed(2) + ' Inches');
        $("#val1").text(originalVal1.toFixed(2) + ' Inches');
    }
}

