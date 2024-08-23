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

        var originalValue; // Variable to store the original value for #value
        var originalValue1; // Variable to store the original value for #value1
        var originalSwatchValues = {}; // Object to store the original values for the swatches

        $(document).ready(function() {
            // Initialize swatch values and toggle state when the page loads
            initializeSwatchValues();
            applyToggleStateFromCookie(); // Apply cookie state on page load

            // Listen for changes on the variant radio buttons
            $(document).on('change', 'input[name="Size"]', function() {
                console.log('Variant changed');

                // Get the new values for the selected variant (assuming value is numeric)
                originalValue = parseFloat($(this).val());
                originalValue1 = parseFloat($(this).val());

                console.log('Original value set to:', originalValue);
                console.log('Original value1 set to:', originalValue1);

                // Update the displayed values in Inches (initial state)
                if (!isNaN(originalValue)) {
                    $("#value").text(originalValue.toFixed(2) + ' Inches');
                    console.log('Displayed value updated to:', originalValue.toFixed(2) + ' Inches');
                } else {
                    console.error('Original value is not a valid number:', originalValue);
                }

                if (!isNaN(originalValue1)) {
                    $("#value1").text(originalValue1.toFixed(2) + ' Inches');
                    console.log('Displayed value1 updated to:', originalValue1.toFixed(2) + ' Inches');
                } else {
                    console.error('Original value1 is not a valid number:', originalValue1);
                }

                // Store and update swatches based on the toggle state
                storeSwatchValues();
                handleConversion();
            });

            // Toggle switch change event
            $("#toggleConvert").change(function() {
                console.log('Toggle switch changed');
                handleConversion();
                setToggleStateCookie($(this).is(":checked")); // Store toggle state in cookie
            });
        });

        // Initialize swatch values based on the current variant
        function initializeSwatchValues() {
            $('input[name="Size"]').each(function() {
                var swatchValue = parseFloat($(this).val());
                originalSwatchValues[$(this).attr('id')] = swatchValue;
                
                console.log('Initial swatch value for', $(this).attr('id'), ':', swatchValue);
            });

            // Set the initial value for #value and #value1 if needed
            var initialValue = parseFloat($('input[name="Size"]:checked').val());
            if (!isNaN(initialValue)) {
                originalValue = initialValue;
                originalValue1 = initialValue;

                $("#value").text(originalValue.toFixed(2) + ' Inches');
                $("#value1").text(originalValue1.toFixed(2) + ' Inches');
            }
        }

        // Function to handle conversion logic for #value, #value1, and swatches
        function handleConversion() {
            if ((typeof originalValue === 'undefined' || isNaN(originalValue)) ||
                (typeof originalValue1 === 'undefined' || isNaN(originalValue1))) {
                console.error('Original value or value1 is not set or invalid');
                return;
            }

            // Check if toggle is checked
            var isToggleChecked = $("#toggleConvert").is(":checked");
            console.log('Toggle state:', isToggleChecked);

            // Perform conversion for #value and #value1
            if (isToggleChecked) {
                var convertedValue = (originalValue * 2.54).toFixed(2);
                var convertedValue1 = (originalValue1 * 2.54).toFixed(2);
                console.log('Converting to Centimeters:', convertedValue, convertedValue1);

                $("#value").text(convertedValue + ' Centimeters');
                $("#value1").text(convertedValue1 + ' Centimeters');
            } else {
                console.log('Converting to Inches:', originalValue.toFixed(2), originalValue1.toFixed(2));

                $("#value").text(originalValue.toFixed(2) + ' Inches');
                $("#value1").text(originalValue1.toFixed(2) + ' Inches');
            }

            // Update swatches based on the toggle state
            updateSwatchLabels(isToggleChecked);
        }

        // Store original swatch values
        function storeSwatchValues() {
            $('input[name="Size"]').each(function() {
                var swatchValue = parseFloat($(this).val());
                originalSwatchValues[$(this).attr('id')] = swatchValue;
                
                console.log('Stored swatch value for', $(this).attr('id'), ':', swatchValue);
            });
        }

        // Update swatch labels based on toggle state
        function updateSwatchLabels(isToggleChecked) {
            for (var id in originalSwatchValues) {
                var originalSwatchValue = originalSwatchValues[id];
                var convertedSwatchValue;
                
                if (isToggleChecked) {
                    convertedSwatchValue = (originalSwatchValue * 2.54).toFixed(2) + ' cm';
                } else {
                    convertedSwatchValue = originalSwatchValue.toFixed(2) + ' in';
                }

                // Update the swatch label
                $('label[for="' + id + '"]').text(convertedSwatchValue);
                console.log('Updated swatch', id, 'to:', convertedSwatchValue);
            }
        }

        // Set a cookie for the toggle state
        function setToggleStateCookie(isChecked) {
            var expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year expiry
            document.cookie = "toggleState=" + (isChecked ? "checked" : "unchecked") + "; expires=" + expiryDate.toUTCString() + "; path=/";
            console.log('Cookie set: ' + document.cookie); // Check cookie in console
        }

        // Apply the toggle state from the cookie
        function applyToggleStateFromCookie() {
            var name = "toggleState=";
            var decodedCookie = decodeURIComponent(document.cookie);
            console.log('Decoded cookie: ' + decodedCookie); // Check cookie in console
            var cookieArray = decodedCookie.split(';');
            for (var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i].trim();
                if (cookie.indexOf(name) === 0) {
                    var cookieValue = cookie.substring(name.length, cookie.length);
                    console.log('Cookie value: ' + cookieValue); // Check cookie value in console
                    if (cookieValue === "checked") {
                        $("#toggleConvert").prop("checked", true);
                    } else {
                        $("#toggleConvert").prop("checked", false);
                    }
                    handleConversion(); // Apply conversion based on the cookie state
                    return;
                }
            }
            // Default to unchecked if cookie is not set
            $("#toggleConvert").prop("checked", false);
            handleConversion(); // Apply conversion based on default state
        }


// collapsiblecontentjss----------------------------------->

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}





// /loadmorejssss/ 



var products_on_page = $('.products-onpage');
var next_url = products_on_page.data('next-url');

var load_more_btn = $('.load-more_btn');
var load_more_spinner = $('.load-more_spinner');
var isLoading = false; // Flag to prevent multiple triggers

function loadMoreProducts() {
    if (isLoading || !next_url) return; // Prevents triggering if already loading or no more pages

    isLoading = true; // Set the flag to true to prevent further triggers
    
    $.ajax({
        url: next_url,
        type: 'GET',
        dataType: 'html',
        beforeSend: function () {
            load_more_btn.hide();
            load_more_spinner.show();
        }
    }).done(function(next_page){
        load_more_spinner.hide();
        var new_products = $(next_page).find('.products-onpage');
        var new_url = new_products.data('next-url');

        if (new_url) {
            load_more_btn.show();
        } else {
            load_more_btn.hide(); // Hide the button if there are no more pages
        }

        next_url = new_url;
        products_on_page.append(new_products.html());
        
        isLoading = false; // Reset the flag after loading is complete
    }).fail(function() {
        // If there's an error, reset the flag
        isLoading = false;
    });
}

// Trigger loadMoreProducts when half of the page is scrolled
window.onscroll = function() {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight / 2) { 
        loadMoreProducts();
    }
};
