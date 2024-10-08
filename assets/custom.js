// 4th level megamenu dropdown js-------------------------------------------------
$(document).ready(function () {
  $(".icon-caret").click(function (event) {
    event.stopPropagation();

    var submenu = $(this).next(".sub-menu");

    $(".sub-menu").not(submenu).hide();
    $(".icon-caret").not(this).removeClass("down");

    $(this).toggleClass("down");
    submenu.toggle();
  });

  $(document).click(function () {
    $(".sub-menu").hide();
    $(".icon-caret").removeClass("down");
  });

  $(".sub-menu").click(function (event) {
    event.stopPropagation();
  });
});

// -------------------toggle button from cm to inch--------------------------------------------

        var originalValue; 
        var originalValue1; 
        var originalSwatchValues = {}; /

        $(document).ready(function() {
            initializeSwatchValues();
            applyToggleStateFromCookie(); 

            $(document).on('change', 'input[name="Size"]', function() {
             
                originalValue = parseFloat($(this).val());
                originalValue1 = parseFloat($(this).val());

                if (!isNaN(originalValue)) {
                    $("#value").text(originalValue.toFixed(2) + ' Inches');
                } else {  
                }

                if (!isNaN(originalValue1)) {
                    $("#value1").text(originalValue1.toFixed(2) + ' Inches');
                } else {
                }
                storeSwatchValues();
                handleConversion();
            });

            $("#toggleConvert").change(function() {
                handleConversion();
                setToggleStateCookie($(this).is(":checked")); 
            });
        });

        function initializeSwatchValues() {
            $('input[name="Size"]').each(function() {
                var swatchValue = parseFloat($(this).val());
                originalSwatchValues[$(this).attr('id')] = swatchValue;
            });

            var initialValue = parseFloat($('input[name="Size"]:checked').val());
            if (!isNaN(initialValue)) {
                originalValue = initialValue;
                originalValue1 = initialValue;

                $("#value").text(originalValue.toFixed(2) + ' Inches');
                $("#value1").text(originalValue1.toFixed(2) + ' Inches');
            }
        }

        function handleConversion() {
            if ((typeof originalValue === 'undefined' || isNaN(originalValue)) ||
                (typeof originalValue1 === 'undefined' || isNaN(originalValue1))) {
                return;
            }

            var isToggleChecked = $("#toggleConvert").is(":checked");
            if (isToggleChecked) {
                var convertedValue = (originalValue * 2.54).toFixed(2);
                var convertedValue1 = (originalValue1 * 2.54).toFixed(2);

                $("#value").text(convertedValue + ' Centimeters');
                $("#value1").text(convertedValue1 + ' Centimeters');
            } else {
                $("#value").text(originalValue.toFixed(2) + ' Inches');
                $("#value1").text(originalValue1.toFixed(2) + ' Inches');
            }    
           updateSwatchLabels(isToggleChecked);
        }

        function storeSwatchValues() {
            $('input[name="Size"]').each(function() {
                var swatchValue = parseFloat($(this).val());
                originalSwatchValues[$(this).attr('id')] = swatchValue;
            });
        }
        function updateSwatchLabels(isToggleChecked) {
            for (var id in originalSwatchValues) {
                var originalSwatchValue = originalSwatchValues[id];
                var convertedSwatchValue;
                
                if (isToggleChecked) {
                    convertedSwatchValue = (originalSwatchValue * 2.54).toFixed(2) + ' cm';
                } else {
                    convertedSwatchValue = originalSwatchValue.toFixed(2) + ' in';
                }
                $('label[for="' + id + '"]').text(convertedSwatchValue);
            }
        }
        function setToggleStateCookie(isChecked) {
            var expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (365 * 24 * 60 * 60 * 1000)); 
            document.cookie = "toggleState=" + (isChecked ? "checked" : "unchecked") + "; expires=" + expiryDate.toUTCString() + "; path=/";
        }

        function applyToggleStateFromCookie() {
            var name = "toggleState=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var cookieArray = decodedCookie.split(';');
            for (var i = 0; i < cookieArray.length; i++) {
                var cookie = cookieArray[i].trim();
                if (cookie.indexOf(name) === 0) {
                    var cookieValue = cookie.substring(name.length, cookie.length);
                    if (cookieValue === "checked") {
                        $("#toggleConvert").prop("checked", true);
                    } else {
                        $("#toggleConvert").prop("checked", false);
                    }
                    handleConversion();
                    return;
                }
            }
            $("#toggleConvert").prop("checked", false);
            handleConversion(); 
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

    $.getJSON('/cart.js', function(cart) {
      var cartTotal = cart.total_price;
      var giftInCart = cart.items.find(item => item.variant_id === giftVariantId);
      var otherItemsInCart = cart.items.filter(item => item.variant_id !== giftVariantId);

      if (otherItemsInCart.length === 0) {
        removeGiftFromCart(checksRemaining);
      } else if (cartTotal >= 8000 && !giftInCart) {
        addGiftToCart(checksRemaining);
      } else if (cartTotal >= 8000 && giftInCart && giftInCart.quantity !== 1) {
        updateGiftQuantity(giftVariantId, 1, checksRemaining);
      } else if (cartTotal < 8000 && giftInCart) {
        removeGiftFromCart(checksRemaining);
      } else {
        updateCartUI(cart);
        isUpdating = false;
      }
    }).fail(function(xhr, status, error) {
      retryCheck(checksRemaining);
    });
  }

  function addGiftToCart(checksRemaining) {
    $.ajax({
      url: '/cart/add.js',
      type: 'POST',
      dataType: 'json',
      data: {
        id: giftVariantId,
        quantity: 1
      },
      success: function(data) {
        updateCartUI();
      },
      error: function(xhr, status, error) {
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
        updateCartUI(data);
      },
      error: function(xhr, status, error) {
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
        updateCartUI(data);
      },
      error: function(xhr, status, error) {
        retryCheck(checksRemaining);
      }
    });
  }

  function updateCartUI() {
    var cartContainer = $('#main-cart-items');
    if (cartContainer.length) {
      $.getJSON('/cart.js', function(cart) {
        if (cart.item_count === 0 || (cart.item_count === 1 && cart.items[0].variant_id === giftVariantId)) {
          if (cart.item_count === 1) {
            removeGiftFromCart(maxChecks);
          }
          cartContainer.html('<p>Your cart is empty</p>');
        } else {
          $.ajax({
            url: '/?section_id=main-cart-items',
            type: 'GET',
            success: function(data) {
              cartContainer.empty();
              var tempDiv = $('<div>').html(data);
              tempDiv.find('.title-wrapper-with-link', "discount-banner").remove();
              cartContainer.append(tempDiv.html());
            },
            error: function(xhr, status, error) {
            }
          });
        }
      }).fail(function(xhr, status, error) {
      });
    } else {
    }
    isUpdating = false;
  }

  function retryCheck(checksRemaining) {
    if (checksRemaining > 0) {
      setTimeout(function() {
        checkCartAndAddGift(checksRemaining - 1);
      }, checkInterval);
    } else {
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
    e.preventDefault(); 
    var removeButton = $(this);
    var removeUrl = removeButton.attr('href'); 

    $.ajax({
      url: removeUrl,
      type: 'POST',
      success: function() {
        updateCartUI(); 
      },
      error: function(xhr, status, error) {
      }
    });checkCartAndAddGift();
  });  
  

  $(document).on('cart:updated', initializeCartCheck);
});



// size-chart-table-js---------------------------------------->
let isCm = true; 

const countryData = {
  "Russia": {
    "cm": ["40", "42", "44", "46", "48", "50"],
    "in": [convertToInches("40"), convertToInches("42"), convertToInches("44"), convertToInches("46"), convertToInches("48"), convertToInches("50")]
  },
  "India": {
    "cm": ["36", "38", "40", "42", "44", "46"],
    "in": [convertToInches("36"), convertToInches("38"), convertToInches("40"), convertToInches("42"), convertToInches("44"), convertToInches("46")]
  },
  "US": {
    "cm": ["2", "4", "6", "8", "10", "12"],
    "in": [convertToInches("2"), convertToInches("4"), convertToInches("6"), convertToInches("8"), convertToInches("10"), convertToInches("12")]
  }
};

function updateCountryRow() {
  const countrySelect = document.getElementById("country-select");
  const selectedCountry = countrySelect.value;
  const countryRow = document.getElementById("country-row");

  let unit = isCm ? "cm" : "in";
  let sizes = countryData[selectedCountry][unit];

  countryRow.cells[0].innerText = selectedCountry.toUpperCase();
  for (let i = 1; i < countryRow.cells.length; i++) {
    countryRow.cells[i].innerText = sizes[i - 1];
  }
}

function convertSizes(unit) {
  isCm = (unit === "cm");
  
  const sizeRows = document.querySelectorAll(".size-row");
  sizeRows.forEach(row => {
    for (let i = 1; i < row.cells.length; i++) {
      let sizeValue = row.cells[i].innerText;

      if (unit === "in") {
        row.cells[i].innerText = convertToInches(sizeValue);
      } else if (unit === "cm") {
        row.cells[i].innerText = convertToCm(sizeValue);
      }
    }
  });

  updateCountryRow();
}

function convertToInches(sizeValue) {
  if (sizeValue.includes("-")) {
    let sizes = sizeValue.split("-");
    return sizes.map(cm => (cm / 2.54).toFixed(1)).join("-");
  } else {
    return (sizeValue / 2.54).toFixed(1);
  }
}

function convertToCm(sizeValue) {
  if (sizeValue.includes("-")) {
    let sizes = sizeValue.split("-");
    return sizes.map(inch => (inch * 2.54).toFixed(0)).join("-");
  } else {
    return (sizeValue * 2.54).toFixed(0);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  updateCountryRow();
});






// adding collection as promo between products in collection page-------------------------------------->
$(document).ready(function() {
  if (window.location.pathname.includes('/collections/best-selling-collection')) {
    setTimeout(function() {
      var productContainer = $('#product-grid');
      var productItems = productContainer.children('li'); 
      var randomIndex1 = 3; 
      var randomIndex2 = 8; 

      var bgElement1 = $('<div>').css({
        'background-image': 'url("https://cdn.shopify.com/s/files/1/0881/8694/5814/files/watch3_df44ac95-7862-4b3d-b0a4-39deb9085787.jpg?v=1721305196")',
        'background-size': 'cover',
        'background-position': 'center',
        'height': '270px',
        'width': '100%',
        'display': 'flex',
        'cursor': 'pointer',
      }).click(function() {
        window.location.href = '/collections/premium-watches'; 
      });

      var bgElement2 = $('<div>').css({
        'background-image': 'url("https://cdn.shopify.com/s/files/1/0881/8694/5814/files/shoes11_b843e0ed-b0fd-41ce-9d82-fc433a041ce3.jpg?v=1721305184")',
        'background-size': 'cover',
        'background-position': 'center',
        'height': '270px',
        'width': '100%',
        'display': 'flex',
        'cursor': 'pointer',
      }).click(function() {
        window.location.href = '/collections/shoes'; 
      });

      var listItem1 = $('<li>')
        .addClass('grid__item scroll-trigger animate--slide-in')
        .append(bgElement1);

      var listItem2 = $('<li>')
        .addClass('grid__item scroll-trigger animate--slide-in')
        .append(bgElement2);

      if (randomIndex1 < productItems.length) {
        productItems.eq(randomIndex1).before(listItem1); 
      } else {
        productContainer.append(listItem1); 
      }

      if (randomIndex2 < productItems.length) {
        productItems.eq(randomIndex2).before(listItem2); 
      } else {
        productContainer.append(listItem2); 
      }
    }, 250);
  }
});

// custom filters----------------------------------->
$(document).ready(function() {
  $('.filter-checkbox').on('change', function() {
    var checkedValues = [];
    $('.filter-checkbox:checked').each(function() {
      checkedValues.push($(this).val());
    });
    if (checkedValues.length === 0) {
      $('.grid__item').show();
      return;
    }

    $('.grid__item').each(function() {
      var $item = $(this);
      var option1 = $item.attr('data-size') || '';
      var option2 = $item.attr('data-material') || '';
      var option3 = $item.attr('data-color') || '';
      var allItemOptions = [
        ...option1.split(','),
        ...option2.split(','),
        ...option3.split(',')
      ].map(opt => opt.trim());

      var shouldShow = checkedValues.some(value => 
        allItemOptions.includes(value)
      );

      if (shouldShow) {
        $item.show();
      } else {
        $item.hide();
      }
    });
  });
});

//notify me button
$(document).ready(function() {
    console.log('jQuery is ready!');
    var notifyButton = $('a.klaviyo-bis-trigger');
    var soldOutButton = $('button.product-form__submit');

    if (notifyButton.length && soldOutButton.length) {
        notifyButton.insertAfter(soldOutButton);
    }
});


