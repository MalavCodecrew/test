// 1.scope exaple
const globalTitle = document.querySelector('.product__title h1'); 

function changeGlobalTitleColor() {
  globalTitle.style.color = 'blue';
}
changeGlobalTitleColor();


document.querySelector('.product__title h1').addEventListener('click', () => {
  const localTitle = document.querySelector('.product__title h1'); 
  localTitle.style.color = 'red'; 
});


if (true) { 
  let blockScopedTitle = document.querySelector('svg.icon.icon-share');
  blockScopedTitle.style.color = 'purple'; 
}

// 2.iife example
(function() {
  const greeting = 'Welcome to ';
  const name = 'CricStore';
  const message = greeting + ', ' + name + '!';
  
  alert(message);  // Output: "Hello, World!"
})();

//3. Hoisting example
showWelcomeMessage();

function showWelcomeMessage() {
  const welcomeMessage = document.querySelector('.welcome-message');
  
  let currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning!";
  } else if (currentHour < 18) {
    greeting = "Good afternoon!";
  } else {
    greeting = "Good evening!";
  }

  if (welcomeMessage) {
    welcomeMessage.textContent = greeting;
  }
}

// 7.  Async & Await
const showPosts = async () => {
    const response = await fetch('https://quickstart-06ab4342.myshopify.com/admin/api/2023-10/product');
    const posts = await response.json();
    console.log(posts) ;
  }
  showPosts();



// ===========================================================================================


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

$(document).ready(function () {
  // Initialize swatch values and toggle state when the page loads
  initializeSwatchValues();
  applyToggleStateFromCookie(); // Apply cookie state on page load

  // Listen for changes on the variant radio buttons
  $(document).on("change", 'input[name="Size"]', function () {
    console.log("Variant changed");

    // Get the new values for the selected variant (assuming value is numeric)
    originalValue = parseFloat($(this).val());
    originalValue1 = parseFloat($(this).val());

    console.log("Original value set to:", originalValue);
    console.log("Original value1 set to:", originalValue1);

    // Update the displayed values in Inches (initial state)
    if (!isNaN(originalValue)) {
      $("#value").text(originalValue.toFixed(2) + " Inches");
      console.log(
        "Displayed value updated to:",
        originalValue.toFixed(2) + " Inches"
      );
    } else {
      console.error("Original value is not a valid number:", originalValue);
    }

    if (!isNaN(originalValue1)) {
      $("#value1").text(originalValue1.toFixed(2) + " Inches");
      console.log(
        "Displayed value1 updated to:",
        originalValue1.toFixed(2) + " Inches"
      );
    } else {
      console.error("Original value1 is not a valid number:", originalValue1);
    }

    // Store and update swatches based on the toggle state
    storeSwatchValues();
    handleConversion();
  });

  // Toggle switch change event
  $("#toggleConvert").change(function () {
    console.log("Toggle switch changed");
    handleConversion();
    setToggleStateCookie($(this).is(":checked")); // Store toggle state in cookie
  });
});

// Initialize swatch values based on the current variant
function initializeSwatchValues() {
  $('input[name="Size"]').each(function () {
    var swatchValue = parseFloat($(this).val());
    originalSwatchValues[$(this).attr("id")] = swatchValue;

    console.log(
      "Initial swatch value for",
      $(this).attr("id"),
      ":",
      swatchValue
    );
  });

  // Set the initial value for #value and #value1 if needed
  var initialValue = parseFloat($('input[name="Size"]:checked').val());
  if (!isNaN(initialValue)) {
    originalValue = initialValue;
    originalValue1 = initialValue;

    $("#value").text(originalValue.toFixed(2) + " Inches");
    $("#value1").text(originalValue1.toFixed(2) + " Inches");
  }
}

// Function to handle conversion logic for #value, #value1, and swatches
function handleConversion() {
  if (
    typeof originalValue === "undefined" ||
    isNaN(originalValue) ||
    typeof originalValue1 === "undefined" ||
    isNaN(originalValue1)
  ) {
    console.error("Original value or value1 is not set or invalid");
    return;
  }

  // Check if toggle is checked
  var isToggleChecked = $("#toggleConvert").is(":checked");
  console.log("Toggle state:", isToggleChecked);

  // Perform conversion for #value and #value1
  if (isToggleChecked) {
    var convertedValue = (originalValue * 2.54).toFixed(2);
    var convertedValue1 = (originalValue1 * 2.54).toFixed(2);
    console.log("Converting to Centimeters:", convertedValue, convertedValue1);

    $("#value").text(convertedValue + " Centimeters");
    $("#value1").text(convertedValue1 + " Centimeters");
  } else {
    console.log(
      "Converting to Inches:",
      originalValue.toFixed(2),
      originalValue1.toFixed(2)
    );

    $("#value").text(originalValue.toFixed(2) + " Inches");
    $("#value1").text(originalValue1.toFixed(2) + " Inches");
  }

  // Update swatches based on the toggle state
  updateSwatchLabels(isToggleChecked);
}

// Store original swatch values
function storeSwatchValues() {
  $('input[name="Size"]').each(function () {
    var swatchValue = parseFloat($(this).val());
    originalSwatchValues[$(this).attr("id")] = swatchValue;

    console.log(
      "Stored swatch value for",
      $(this).attr("id"),
      ":",
      swatchValue
    );
  });
}

// Update swatch labels based on toggle state
function updateSwatchLabels(isToggleChecked) {
  for (var id in originalSwatchValues) {
    var originalSwatchValue = originalSwatchValues[id];
    var convertedSwatchValue;

    if (isToggleChecked) {
      convertedSwatchValue = (originalSwatchValue * 2.54).toFixed(2) + " cm";
    } else {
      convertedSwatchValue = originalSwatchValue.toFixed(2) + " in";
    }

    // Update the swatch label
    $('label[for="' + id + '"]').text(convertedSwatchValue);
    console.log("Updated swatch", id, "to:", convertedSwatchValue);
  }
}

// Set a cookie for the toggle state
function setToggleStateCookie(isChecked) {
  var expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year expiry
  document.cookie =
    "toggleState=" +
    (isChecked ? "checked" : "unchecked") +
    "; expires=" +
    expiryDate.toUTCString() +
    "; path=/";
  console.log("Cookie set: " + document.cookie); // Check cookie in console
}

// Apply the toggle state from the cookie
function applyToggleStateFromCookie() {
  var name = "toggleState=";
  var decodedCookie = decodeURIComponent(document.cookie);
  console.log("Decoded cookie: " + decodedCookie); // Check cookie in console
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      var cookieValue = cookie.substring(name.length, cookie.length);
      console.log("Cookie value: " + cookieValue); // Check cookie value in console
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
  coll[i].addEventListener("click", function () {
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
document.addEventListener("DOMContentLoaded", function () {
  const blocksPerPage = 2;
  const blocks = document.querySelectorAll(".block-main");
  const totalPages = Math.ceil(blocks.length / blocksPerPage);
  const paginationContainer = document.querySelector(".pagination");

  let currentPage = 1;

  function showPage(page) {
    blocks.forEach((block) => (block.style.display = "none"));

    const startIndex = (page - 1) * blocksPerPage;
    const endIndex = startIndex + blocksPerPage;

    for (let i = startIndex; i < endIndex && i < blocks.length; i++) {
      blocks[i].style.display = "block";
    }
    updatePaginationLinks(page);
  }

  function updatePaginationLinks(page) {
    paginationContainer.innerHTML = "";
    if (page > 1) {
      const prevLink = document.createElement("a");
      prevLink.href = "#";
      prevLink.textContent = "Previous";
      prevLink.addEventListener("click", function (e) {
        e.preventDefault();
        showPage(page - 1);
      });
      paginationContainer.appendChild(prevLink);
    }
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "#";
      pageLink.textContent = i;
      if (i === page) {
        pageLink.classList.add("active");
      }
      pageLink.addEventListener("click", function (e) {
        e.preventDefault();
        showPage(i);
      });
      paginationContainer.appendChild(pageLink);
    }
    if (page < totalPages) {
      const nextLink = document.createElement("a");
      nextLink.href = "#";
      nextLink.textContent = "Next";
      nextLink.addEventListener("click", function (e) {
        e.preventDefault();
        showPage(page + 1);
      });
      paginationContainer.appendChild(nextLink);
    }
  }
  showPage(currentPage);
});

//----------------------------------- GWP-JS-------------------------------------------->
$(document).ready(function () {
  var isUpdating = false;
  var giftVariantId = 49055053381910;
  var giftTitle = "Default title";
  var checkInterval = 500;
  var maxChecks = 5;

  function checkCartAndAddGift(checksRemaining) {
    if (isUpdating) return;
    isUpdating = true;
    console.log("Checking cart...");

    $.getJSON("/cart.js", function (cart) {
      console.log("Cart contents:", cart);
      var cartTotal = cart.total_price;
      var giftInCart = cart.items.find(
        (item) => item.variant_id === giftVariantId
      );
      var otherItemsInCart = cart.items.filter(
        (item) => item.variant_id !== giftVariantId
      );

      if (otherItemsInCart.length === 0) {
        // If there are no other items in the cart, remove the gift
        removeGiftFromCart(checksRemaining);
      } else if (cartTotal >= 800000 && !giftInCart) {
        addGiftToCart(checksRemaining);
      } else if (
        cartTotal >= 800000 &&
        giftInCart &&
        giftInCart.quantity !== 1
      ) {
        updateGiftQuantity(giftVariantId, 1, checksRemaining);
      } else if (cartTotal < 800000 && giftInCart) {
        removeGiftFromCart(checksRemaining);
      } else {
        console.log("Cart is in correct state.");
        updateCartUI(cart);
        isUpdating = false;
      }
    }).fail(function (xhr, status, error) {
      console.error("Error fetching cart:", xhr.responseText);
      retryCheck(checksRemaining);
    });
  }

  function addGiftToCart(checksRemaining) {
    console.log("Adding gift product...");
    $.ajax({
      url: "/cart/add.js",
      type: "POST",
      dataType: "json",
      data: {
        id: giftVariantId,
        quantity: 1,
      },
      success: function (data) {
        console.log("Gift added:", data);
        updateCartUI();
      },
      error: function (xhr, status, error) {
        console.error("Error adding gift:", xhr.responseText);
        retryCheck(checksRemaining);
      },
    });
  }
  function updateGiftQuantity(variantId, quantity, checksRemaining) {
    $.ajax({
      url: "/cart/change.js",
      type: "POST",
      dataType: "json",
      data: {
        id: giftVariantId,
        quantity: quantity,
      },
      success: function (data) {
        console.log("Gift quantity adjusted:", data);
        updateCartUI(data);
      },
      error: function (xhr, status, error) {
        console.error("Error adjusting gift quantity:", xhr.responseText);
        retryCheck(checksRemaining);
      },
    });
  }

  function removeGiftFromCart(checksRemaining) {
    $.ajax({
      url: "/cart/change.js",
      type: "POST",
      dataType: "json",
      data: {
        id: giftVariantId,
        quantity: 0,
      },
      success: function (data) {
        console.log("Gift removed:", data);
        updateCartUI(data);
      },
      error: function (xhr, status, error) {
        console.error("Error removing gift:", xhr.responseText);
        retryCheck(checksRemaining);
      },
    });
  }

  function updateCartUI() {
    console.log("Updating cart UI...");
    var cartContainer = $("#main-cart-items");
    if (cartContainer.length) {
      $.getJSON("/cart.js", function (cart) {
        // Check if the cart is empty or contains only the gift product
        if (
          cart.item_count === 0 ||
          (cart.item_count === 1 && cart.items[0].variant_id === giftVariantId)
        ) {
          // Remove the gift product if it's the only item
          if (cart.item_count === 1) {
            removeGiftFromCart(maxChecks);
          }
          // Update UI to show empty cart
          cartContainer.html("<p>Your cart is empty</p>");
        } else {
          // Proceed with normal cart update
          $.ajax({
            url: "/?section_id=main-cart-items",
            type: "GET",
            success: function (data) {
              cartContainer.empty();
              var tempDiv = $("<div>").html(data);
              tempDiv
                .find(".title-wrapper-with-link", "discount-banner")
                .remove();
              cartContainer.append(tempDiv.html());
              console.log(
                "Cart UI updated, div and quantity selectors removed"
              );
            },
            error: function (xhr, status, error) {
              console.error("Error fetching cart section:", xhr.responseText);
            },
          });
        }
      }).fail(function (xhr, status, error) {
        console.error(
          "Error fetching cart data for UI update:",
          xhr.responseText
        );
      });
    } else {
      console.error("Cart container not found.");
    }
    isUpdating = false;
  }

  function retryCheck(checksRemaining) {
    if (checksRemaining > 0) {
      setTimeout(function () {
        checkCartAndAddGift(checksRemaining - 1);
      }, checkInterval);
    } else {
      console.log(
        "Max checks reached. Please refresh the page if issues persist."
      );
      isUpdating = false;
    }
  }

  function initializeCartCheck() {
    checkCartAndAddGift(maxChecks);
  }

  initializeCartCheck();

  $(document).on("change", 'input[name="updates[]"]', function () {
    var form = $(this).closest("form");
    $.post("/cart/update.js", form.serialize(), function (data) {
      initializeCartCheck();
    });
  });

  $(document).on("click", "cart-remove-button", function (e) {
    e.preventDefault(); // Prevent default behavior (like navigation)
    console.log("Cart remove button clicked");

    // Simulate the click action or perform removal via AJAX, if needed
    var removeButton = $(this);
    var removeUrl = removeButton.attr("href"); // Get the URL to remove the item

    // Use AJAX to remove the item
    $.ajax({
      url: removeUrl,
      type: "POST",
      success: function () {
        console.log("Item removed, updating cart UI...");
        updateCartUI(); // Call your function to update the cart UI
      },
      error: function (xhr, status, error) {
        console.error("Error removing item from cart:", xhr.responseText);
      },
    });
    checkCartAndAddGift();
  });

  $(document).on("cart:updated", initializeCartCheck);
});

// size-chart-table-js---------------------------------------->
let isCm = true;

const countryData = {
  Russia: {
    cm: ["40", "42", "44", "46", "48", "50"],
    in: [
      convertToInches("40"),
      convertToInches("42"),
      convertToInches("44"),
      convertToInches("46"),
      convertToInches("48"),
      convertToInches("50"),
    ],
  },
  India: {
    cm: ["36", "38", "40", "42", "44", "46"],
    in: [
      convertToInches("36"),
      convertToInches("38"),
      convertToInches("40"),
      convertToInches("42"),
      convertToInches("44"),
      convertToInches("46"),
    ],
  },
  US: {
    cm: ["2", "4", "6", "8", "10", "12"],
    in: [
      convertToInches("2"),
      convertToInches("4"),
      convertToInches("6"),
      convertToInches("8"),
      convertToInches("10"),
      convertToInches("12"),
    ],
  },
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
  isCm = unit === "cm";

  const sizeRows = document.querySelectorAll(".size-row");
  sizeRows.forEach((row) => {
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
    return sizes.map((cm) => (cm / 2.54).toFixed(1)).join("-");
  } else {
    return (sizeValue / 2.54).toFixed(1);
  }
}

function convertToCm(sizeValue) {
  if (sizeValue.includes("-")) {
    let sizes = sizeValue.split("-");
    return sizes.map((inch) => (inch * 2.54).toFixed(0)).join("-");
  } else {
    return (sizeValue * 2.54).toFixed(0);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateCountryRow();
});

// adding collection as promo between products in collection page-------------------------------------->
$(document).ready(function () {
  if (
    window.location.pathname.includes("/collections/best-selling-collection")
  ) {
    setTimeout(function () {
      var productContainer = $("#product-grid");
      var productItems = productContainer.children("li");
      var randomIndex1 = 3;
      var randomIndex2 = 8;

      var bgElement1 = $("<div>")
        .css({
          "background-image":
            'url("https://cdn.shopify.com/s/files/1/0881/8694/5814/files/watch3_df44ac95-7862-4b3d-b0a4-39deb9085787.jpg?v=1721305196")',
          "background-size": "cover",
          "background-position": "center",
          height: "270px",
          width: "100%",
          display: "flex",
          cursor: "pointer",
        })
        .click(function () {
          window.location.href = "/collections/premium-watches";
        });

      var bgElement2 = $("<div>")
        .css({
          "background-image":
            'url("https://cdn.shopify.com/s/files/1/0881/8694/5814/files/shoes11_b843e0ed-b0fd-41ce-9d82-fc433a041ce3.jpg?v=1721305184")',
          "background-size": "cover",
          "background-position": "center",
          height: "270px",
          width: "100%",
          display: "flex",
          cursor: "pointer",
        })
        .click(function () {
          window.location.href = "/collections/shoes";
        });

      var listItem1 = $("<li>")
        .addClass("grid__item scroll-trigger animate--slide-in")
        .append(bgElement1);

      var listItem2 = $("<li>")
        .addClass("grid__item scroll-trigger animate--slide-in")
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

// adding custom filter on collection page

$(document).ready(function () {
  $(".filter-checkbox").on("change", function () {
    var checkedValues = [];
    $(".filter-checkbox:checked").each(function () {
      checkedValues.push($(this).val());
    });
    if (checkedValues.length === 0) {
      $(".grid__item").show();
      return;
    }

    $(".grid__item").each(function () {
      var $item = $(this);
      var option1 = $item.attr("data-size") || "";
      var option2 = $item.attr("data-material") || "";
      var option3 = $item.attr("data-color") || "";
      var allItemOptions = [
        ...option1.split(","),
        ...option2.split(","),
        ...option3.split(","),
      ].map((opt) => opt.trim());

      var shouldShow = checkedValues.some((value) =>
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

// klaviyo button placing below soldout button---------------->
function moveNotifyMeButton() {
  var notifyButton = $("a.klaviyo-bis-trigger");
  var soldOutButton = $("button.product-form__submit");

  if (notifyButton.length && soldOutButton.length) {
    notifyButton.insertAfter(soldOutButton);
    console.log("Notify Me button moved after Sold Out button!");
  } else {
    setTimeout(moveNotifyMeButton, 100); // Retry after 500ms
  }
}

$(document).ready(function () {
  moveNotifyMeButton(); // Call the function when the DOM is ready
});

// quick-shop--------------------------------------------------------------->
$(document).ready(function () {
  setTimeout(function () {
    $(".quick-block").each(function () {
      const $quickBlock = $(this);

      // Find the variant-selects within this quick-block's context
      const $variantSelects = $quickBlock.find(
        'variant-selects, [id^="variant-selects-"]'
      );

      if ($variantSelects.length > 0) {
        // Apply 'with-variant-selects' if variant-selects are found
        $quickBlock
          .addClass("with-variant-selects")
          .removeClass("without-variant-selects");
      } else {
        // Apply 'without-variant-selects' if no variant-selects are found
        $quickBlock
          .addClass("without-variant-selects")
          .removeClass("with-variant-selects");
      }
    });
  }, 1000); // 1 second delay
});

// count-down-timer--------------------------------------------------->
class CountdownTimer extends HTMLElement {
  constructor() {
    super();
  }

  init() {
    this.schemaTime = this.getAttribute("schema-time");
    this.timer = this.querySelector(".timer");
    this.countdown = new Date(this.schemaTime).getTime();
    this.second = 1000;
    this.minute = this.second * 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;

    this.timerInterval = null;
    this.startTimer();

    setTimeout(() => (this.timer.style.visibility = "visible"), 1000);
  }

  padWithLeadingZero = (number) => {
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };

  isDateInPast(date) {
    const now = new Date();
    return date < now;
  }

  startTimer() {
    //Have quick check to see if Date input in the countdown class variable is in the past
    //Helper function

    const timerElem = this.timer;

    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.countdown - now;

      const dayCalc = Math.floor(distance / this.day);
      const hourCalc = Math.floor((distance % this.day) / this.hour);
      const minuteCalc = Math.floor((distance % this.hour) / this.minute);
      const secondCalc = Math.floor((distance % this.minute) / this.second);

      timerElem.querySelector(".js-timer-days").textContent =
        this.padWithLeadingZero(dayCalc);
      timerElem.querySelector(".js-timer-hours").textContent =
        this.padWithLeadingZero(hourCalc);
      timerElem.querySelector(".js-timer-minutes").textContent =
        this.padWithLeadingZero(minuteCalc);
      timerElem.querySelector(".js-timer-seconds").textContent =
        this.padWithLeadingZero(secondCalc);
    }, this.second);
  }

  disconnectedCallback() {
    clearInterval(this.timerInterval);
  }

  connectedCallback() {
    this.init();
    console.log("countdown timer was added to the page");

    const timerFlexContainer = window.document.querySelector(
      ".timer-flex-container"
    );
    const timerElem = this.timer;

    const pastDate = this.isDateInPast(this.countdown);
    if (pastDate) {
      timerFlexContainer.remove();
      this.remove();
    }
    window.setTimeout(() => {
      timerFlexContainer.classList.remove("hide-element");
    }, 2000);
  }
}

customElements.define("countdown-timer", CountdownTimer);
