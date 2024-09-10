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



// blocks-pagination--------------------------------------------------------------->
document.addEventListener("DOMContentLoaded", function() {
  const blocksPerPage = 2;
  const blocks = document.querySelectorAll('.block-main');
  const totalPages = Math.ceil(blocks.length / blocksPerPage);
  const paginationContainer = document.querySelector('.pagination');

  let currentPage = 1;

  function showPage(page) {
  
    blocks.forEach(block => block.style.display = 'none');

   
    const startIndex = (page - 1) * blocksPerPage;
    const endIndex = startIndex + blocksPerPage;

  
    for (let i = startIndex; i < endIndex && i < blocks.length; i++) {
      blocks[i].style.display = 'block';
    }
    updatePaginationLinks(page);
  }

  function updatePaginationLinks(page) {
    paginationContainer.innerHTML = '';
    if (page > 1) {
      const prevLink = document.createElement('a');
      prevLink.href = "#";
      prevLink.textContent = "Previous";
      prevLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPage(page - 1);
      });
      paginationContainer.appendChild(prevLink);
    }  
  for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = "#";
      pageLink.textContent = i;
      if (i === page) {
        pageLink.classList.add('active');
      }
      pageLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPage(i);
      });
      paginationContainer.appendChild(pageLink);
    }
    if (page < totalPages) {
      const nextLink = document.createElement('a');
      nextLink.href = "#";
      nextLink.textContent = "Next";
      nextLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPage(page + 1);
      });
      paginationContainer.appendChild(nextLink);
    }
  }
  showPage(currentPage);
});

//----------------------------------- GWP-JS-------------------------------------------->
$(document).ready(function() {
  var isUpdating = false;
  var giftVariantId = 49055053381910;
  var giftTitle = "Default title";
  var checkInterval = 500;
  var maxChecks = 5; 

  function checkCartAndAddGift(checksRemaining) {
    if (isUpdating) return;
    isUpdating = true;
    console.log("Checking cart...");

    $.getJSON('/cart.js', function(cart) {
      console.log('Cart contents:', cart);
      var cartTotal = cart.total_price;
      var giftInCart = cart.items.find(item => item.variant_id === giftVariantId);
      var otherItemsInCart = cart.items.filter(item => item.variant_id !== giftVariantId);

      if (otherItemsInCart.length === 0) {
        // If there are no other items in the cart, remove the gift
        removeGiftFromCart(checksRemaining);
      } else if (cartTotal >= 8000 && !giftInCart) {
        addGiftToCart(checksRemaining);
      } else if (cartTotal >= 8000 && giftInCart && giftInCart.quantity !== 1) {
        updateGiftQuantity(giftVariantId, 1, checksRemaining);
      } else if (cartTotal < 8000 && giftInCart) {
        removeGiftFromCart(checksRemaining);
      } else {
        console.log("Cart is in correct state.");
        updateCartUI(cart);
        isUpdating = false;
      }
    }).fail(function(xhr, status, error) {
      console.error('Error fetching cart:', xhr.responseText);
      retryCheck(checksRemaining);
    });
  }

  function addGiftToCart(checksRemaining) {
    console.log("Adding gift product...");
    $.ajax({
      url: '/cart/add.js',
      type: 'POST',
      dataType: 'json',
      data: {
        id: giftVariantId,
        quantity: 1
      },
      success: function(data) {
        console.log('Gift added:', data);
        updateCartUI();
      },
      error: function(xhr, status, error) {
        console.error('Error adding gift:', xhr.responseText);
        retryCheck(checksRemaining);
      }
    });
  }

  function updateGiftQuantity(variantId, quantity, checksRemaining) {
    $.ajax({
      url: '/cart/change.js',
      type: 'POST',
      dataType: 'json',
      data: {
        id: variantId,
        quantity: quantity
      },
      success: function(data) {
        console.log('Gift quantity adjusted:', data);
        updateCartUI(data);
      },
      error: function(xhr, status, error) {
        console.error('Error adjusting gift quantity:', xhr.responseText);
        retryCheck(checksRemaining);
      }
    });
  }

  function removeGiftFromCart(checksRemaining) {
    $.ajax({
      url: '/cart/change.js',
      type: 'POST',
      dataType: 'json',
      data: {
        id: giftVariantId,
        quantity: 0
      },
      success: function(data) {
        console.log('Gift removed:', data);
        updateCartUI(data);
      },
      error: function(xhr, status, error) {
        console.error('Error removing gift:', xhr.responseText);
        retryCheck(checksRemaining);
      }
    });
  }

  function updateCartUI() {
    console.log('Updating cart UI...');
    var cartContainer = $('#main-cart-items');
    if (cartContainer.length) {
      $.getJSON('/cart.js', function(cart) {
        // Check if the cart is empty or contains only the gift product
        if (cart.item_count === 0 || (cart.item_count === 1 && cart.items[0].variant_id === giftVariantId)) {
          // Remove the gift product if it's the only item
          if (cart.item_count === 1) {
            removeGiftFromCart(maxChecks);
          }
          // Update UI to show empty cart
          cartContainer.html('<p>Your cart is empty</p>');
        } else {
          // Proceed with normal cart update
          $.ajax({
            url: '/?section_id=main-cart-items',
            type: 'GET',
            success: function(data) {
              cartContainer.empty();
              var tempDiv = $('<div>').html(data);
              tempDiv.find('.title-wrapper-with-link', "discount-banner").remove();
              cartContainer.append(tempDiv.html());
              console.log('Cart UI updated, div and quantity selectors removed');
            },
            error: function(xhr, status, error) {
              console.error('Error fetching cart section:', xhr.responseText);
            }
          });
        }
      }).fail(function(xhr, status, error) {
        console.error('Error fetching cart data for UI update:', xhr.responseText);
      });
    } else {
      console.error('Cart container not found.');
    }
    isUpdating = false;
  }

  function retryCheck(checksRemaining) {
    if (checksRemaining > 0) {
      setTimeout(function() {
        checkCartAndAddGift(checksRemaining - 1);
      }, checkInterval);
    } else {
      console.log("Max checks reached. Please refresh the page if issues persist.");
      isUpdating = false;
    }
  }

  function initializeCartCheck() {
    checkCartAndAddGift(maxChecks);
  }
  
  initializeCartCheck();

  $(document).on('change', 'input[name="updates[]"]', function() {
    var form = $(this).closest('form');
    $.post('/cart/update.js', form.serialize(), function(data) {
      initializeCartCheck();
    });
  });

 $(document).on('click', 'cart-remove-button', function(e) {
    e.preventDefault(); // Prevent default behavior (like navigation)
    console.log('Cart remove button clicked');
    
    // Simulate the click action or perform removal via AJAX, if needed
    var removeButton = $(this);
    var removeUrl = removeButton.attr('href'); // Get the URL to remove the item

    // Use AJAX to remove the item
    $.ajax({
      url: removeUrl,
      type: 'POST',
      success: function() {
        console.log('Item removed, updating cart UI...');
        updateCartUI(); // Call your function to update the cart UI
      },
      error: function(xhr, status, error) {
        console.error('Error removing item from cart:', xhr.responseText);
      }
    });checkCartAndAddGift();
  });  
  

  $(document).on('cart:updated', initializeCartCheck);
});

// wishlist js--------------------------------------------------------->
    function toggleWishlist() {
        const pdpData = {
            productTitle: "{{ product.title }}",
            productImg: "{{ product.featured_image | img_url: '' }}",
            productPrice: "{{ product.price | money | remove_first: '' }}",
            productUrl: "{{ product.url }}"
        };

        let wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
        const isAlreadyInWishlist = wishlistData.some(item => item.productTitle === pdpData.productTitle);
        const wishlistButton = document.getElementsByClassName('wishlist_button')[0];

        if (!isAlreadyInWishlist) {
            wishlistData.push(pdpData);
            localStorage.setItem('wishlist', JSON.stringify(wishlistData));
            wishlistButton.innerHTML = `<svg class="heart-filled" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z" fill="#000000"/>
</svg>
<p class="wishlist_text">In Your Wishlist</p>
`;
        } else {
            wishlistData = wishlistData.filter(item => item.productTitle !== pdpData.productTitle);
            localStorage.setItem('wishlist', JSON.stringify(wishlistData));
            wishlistButton.innerHTML = `<svg class="heart-outline" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

<rect x="0" fill="none" width="24" height="24"/>

<g>

<path d="M16.5 4.5c2.206 0 4 1.794 4 4 0 4.67-5.543 8.94-8.5 11.023C9.043 17.44 3.5 13.17 3.5 8.5c0-2.206 1.794-4 4-4 1.298 0 2.522.638 3.273 1.706L12 7.953l1.227-1.746c.75-1.07 1.975-1.707 3.273-1.707m0-1.5c-1.862 0-3.505.928-4.5 2.344C11.005 3.928 9.362 3 7.5 3 4.462 3 2 5.462 2 8.5c0 5.72 6.5 10.438 10 12.85 3.5-2.412 10-7.13 10-12.85C22 5.462 19.538 3 16.5 3z"/>

</g>

</svg>
<p class="wishlist_text">Not In Wishlist</p>
`;
        }
        displayWishlist();
    }

    function removeFromWishlist(productTitle) {
        let wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistData = wishlistData.filter(item => item.productTitle !== productTitle);
        localStorage.setItem('wishlist', JSON.stringify(wishlistData));
        displayWishlist(pdpData);
    }
    function displayWishlist(pdpData) {
        const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
        
        if (wishlistData.length === 0) {
            console.log('Wishlist is empty');
            return;
        }

        const wishlistHtml = wishlistData.map(item => `
            <div class="wishlist-product__list">
                <div class="c-product">
                <a href="${item.productUrl}">
                    <img src="${item.productImg}" alt="${item.productTitle}">
                    </a>
                    <h3 class="c-product__title card__heading h5">
                        <a class="full-unstyled-link" href="${item.productUrl}">${item.productTitle}</a>
                    </h3>
                    <p>${item.productPrice}</p>
    <button onclick="removeFromWishlist('${item.productTitle}')">Remove</button> 
                </div>
            </div>
        `).join('');

        const wishlistBlock = document.querySelector('.js-wishlistBlock');
        if (wishlistBlock) {
            wishlistBlock.innerHTML = wishlistHtml;
        } else {
            console.error('Element with class "js-wishlistBlock" not found');
        }
    }
document.addEventListener('DOMContentLoaded', function () {
    const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];

    const wishlistButton = document.querySelector('.wishlist_button'); 
    const productTitle = "{{ product.title }}";
    
    if (wishlistButton) {
        const isAlreadyInWishlist = wishlistData.some(item => item.productTitle === productTitle);
        wishlistButton.innerHTML = isAlreadyInWishlist ? `<svg class="heart-filled" width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z" fill="#000000"/>
</svg> <p class="wishlist_text">In Your Wishlist</p>` : `<svg width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="heart-outline">

<rect x="0" fill="none" width="24" height="24"/>

<g>

<path d="M16.5 4.5c2.206 0 4 1.794 4 4 0 4.67-5.543 8.94-8.5 11.023C9.043 17.44 3.5 13.17 3.5 8.5c0-2.206 1.794-4 4-4 1.298 0 2.522.638 3.273 1.706L12 7.953l1.227-1.746c.75-1.07 1.975-1.707 3.273-1.707m0-1.5c-1.862 0-3.505.928-4.5 2.344C11.005 3.928 9.362 3 7.5 3 4.462 3 2 5.462 2 8.5c0 5.72 6.5 10.438 10 12.85 3.5-2.412 10-7.13 10-12.85C22 5.462 19.538 3 16.5 3z"/>

</g>

</svg>
<p class="wishlist_text">Not In Wishlist</p>
`;
    } else {
        console.error('Element with class "wishlist_button" not found');
    }
    displayWishlist();
});
