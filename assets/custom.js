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
  var giftVariantId = 49055053381910; // Ensure this is correct for your store
  var giftTitle = "Default Title"; // Ensure this matches your gift product title exactly
  var checkInterval = 1000; // Check every second
  var maxChecks = 5; // Maximum number of checks before giving up

  function checkCartAndAddGift(checksRemaining) {
    if (isUpdating) return;
    isUpdating = true;
    console.log("Checking cart...");

    $.getJSON('/cart.js', function(cart) {
      console.log('Cart contents:', cart);
      var cartTotal = cart.total_price;
      var giftInCart = cart.items.find(item => item.variant_id === giftVariantId);

      if (cartTotal >= 8000 && !giftInCart) {
        addGiftToCart(checksRemaining);
      } else if (cartTotal >= 8000 && giftInCart && giftInCart.quantity !== 1) {
        updateGiftQuantity(giftVariantId, 1, checksRemaining);
      } else if (cartTotal < 8000 && giftInCart) {
        removeGiftFromCart(checksRemaining);
      } else {
        console.log("Cart is in correct state.");
        updateCartUI();
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
        retryCheck(checksRemaining);
      },
      error: function(xhr, status, error) {
        console.error('Error adding gift:', xhr.responseText);
        retryCheck(checksRemaining);
      }
    });
  }

  function updateGiftQuantity(giftVariantId, quantity, checksRemaining) {
    $.ajax({
      url: '/cart/change.js',
      type: 'POST',
      dataType: 'json',
      data: {
        id: giftVariantId,
        quantity: quantity
      },
      success: function(data) {
        console.log('Gift quantity adjusted:', data);
        retryCheck(checksRemaining);
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
        retryCheck(checksRemaining);
      },
      error: function(xhr, status, error) {
        console.error('Error removing gift:', xhr.responseText);
        retryCheck(checksRemaining);
      }
    });
  }

  function updateCartUI() {
    console.log('Updating cart UI...');
    var cartContainer = $('#cart');
    if (cartContainer.length) {
      $.getJSON('/cart.js', function(cart) {
        cartContainer.empty();
        cart.items.forEach(function(item) {
          cartContainer.append('<cart-items class="gradient color-{{ section.settings.color_scheme }} isolate{% if cart == empty %} is-empty{% else %} section-{{ section.id }}-padding{% endif %}">
  <div class="page-width">
    <div class="title-wrapper-with-link">
      <h1 class="title title--primary">{{ 'sections.cart.title' | t }}</h1>
      <a href="{{ routes.all_products_collection_url }}" class="underlined-link">
        {{- 'general.continue_shopping' | t -}}
      </a>
    </div>

    <div class="cart__warnings">
      <h1 class="cart__empty-text">{{ 'sections.cart.empty' | t }}</h1>
      <a href="{{ routes.all_products_collection_url }}" class="button">
        {{ 'general.continue_shopping' | t }}
      </a>

      {%- if shop.customer_accounts_enabled and customer == null -%}
        <h2 class="cart__login-title">{{ 'sections.cart.login.title' | t }}</h2>
        <p class="cart__login-paragraph">
          {{ 'sections.cart.login.paragraph_html' | t: link: routes.account_login_url }}
        </p>
      {%- endif -%}
    </div>

    <form action="{{ routes.cart_url }}" class="cart__contents critical-hidden" method="post" id="cart">
      <div class="cart__items" id="main-cart-items" data-id="{{ section.id }}">
        <div class="js-contents">
          {%- if cart != empty -%}
            <table class="cart-items">
              <caption class="visually-hidden">
                {{ 'sections.cart.title' | t }}
              </caption>
              <thead>
                <tr>
                  <th class="caption-with-letter-spacing" colspan="2" scope="col">
                    {{ 'sections.cart.headings.product' | t }}
                  </th>
                  <th class="medium-hide large-up-hide right caption-with-letter-spacing" colspan="1" scope="col">
                    {{ 'sections.cart.headings.total' | t }}
                  </th>
                  <th
                    class="cart-items__heading--wide cart-items__heading--quantity small-hide caption-with-letter-spacing"
                    colspan="1"
                    scope="col"
                  >
                    {{ 'sections.cart.headings.quantity' | t }}
                  </th>
                  <th class="small-hide right caption-with-letter-spacing" colspan="1" scope="col">
                    {{ 'sections.cart.headings.total' | t }}
                  </th>
                </tr>
              </thead>

              <tbody>
                {%- for item in cart.items -%}
                  <tr class="cart-item" id="CartItem-{{ item.index | plus: 1 }}">
                    <td class="cart-item__media">
                      {% if item.image %}
                        {% comment %} Leave empty space due to a:empty CSS display: none rule {% endcomment %}
                        <a href="{{ item.url }}" class="cart-item__link" aria-hidden="true" tabindex="-1"> </a>
                        <div class="cart-item__image-container gradient global-media-settings">
                          <img
                            src="{{ item.image | image_url: width: 300 }}"
                            class="cart-item__image"
                            alt="{{ item.image.alt | escape }}"
                            loading="lazy"
                            width="150"
                            height="{{ 150 | divided_by: item.image.aspect_ratio | ceil }}"
                          >
                        </div>
                      {% endif %}
                    </td>

                    <td class="cart-item__details">
                      {%- if settings.show_vendor -%}
                        <p class="caption-with-letter-spacing">{{ item.product.vendor }}</p>
                      {%- endif -%}

                      <a href="{{ item.url }}" class="cart-item__name h4 break">{{ item.product.title | escape }}</a>

                      {%- if item.original_price != item.final_price -%}
                        <div class="cart-item__discounted-prices">
                          <span class="visually-hidden">
                            {{ 'products.product.price.regular_price' | t }}
                          </span>
                          <s class="cart-item__old-price product-option">
                            {{- item.original_price | money -}}
                          </s>
                          <span class="visually-hidden">
                            {{ 'products.product.price.sale_price' | t }}
                          </span>
                          <strong class="cart-item__final-price product-option">
                            {{ item.final_price | money }}
                          </strong>
                        </div>
                      {%- else -%}
                        <div class="product-option">
                          {{ item.original_price | money }}
                        </div>
                      {%- endif -%}

                      {%- if item.product.has_only_default_variant == false
                        or item.properties.size != 0
                        or item.selling_plan_allocation != null
                      -%}
                        <dl>
                          {%- if item.product.has_only_default_variant == false -%}
                            {%- for option in item.options_with_values -%}
                              <div class="product-option">
                                <dt>{{ option.name }}:</dt>
                                <dd>{{ option.value }}</dd>
                              </div>
                            {%- endfor -%}
                          {%- endif -%}

                          {%- for property in item.properties -%}
                            {%- assign property_first_char = property.first | slice: 0 -%}
                            {%- if property.last != blank and property_first_char != '_' -%}
                              <div class="product-option">
                                <dt>{{ property.first }}:</dt>
                                <dd>
                                  {%- if property.last contains '/uploads/' -%}
                                    <a href="{{ property.last }}" class="link" target="_blank">
                                      {{ property.last | split: '/' | last }}
                                    </a>
                                  {%- else -%}
                                    {{ property.last }}
                                  {%- endif -%}
                                </dd>
                              </div>
                            {%- endif -%}
                          {%- endfor -%}
                        </dl>

                        <p class="product-option">{{ item.selling_plan_allocation.selling_plan.name }}</p>
                      {%- endif -%}

                      {% include 'test-snippet' %}

                      <ul class="discounts list-unstyled" role="list" aria-label="{{ 'customer.order.discount' | t }}">
                        {%- for discount in item.line_level_discount_allocations -%}
                          <li class="discounts__discount">
                            {%- render 'icon-discount' -%}
                            {{ discount.discount_application.title }}
                          </li>
                        {%- endfor -%}
                      </ul>
                    </td>

                    <td class="cart-item__totals right medium-hide large-up-hide">
                      {%- render 'loading-spinner' -%}
                      <div class="cart-item__price-wrapper">
                        {%- if item.original_line_price != item.final_line_price -%}
                          <dl class="cart-item__discounted-prices">
                            <dt class="visually-hidden">
                              {{ 'products.product.price.regular_price' | t }}
                            </dt>
                            <dd>
                              <s class="cart-item__old-price price price--end">
                                {{ item.original_line_price | money }}
                              </s>
                            </dd>
                            <dt class="visually-hidden">
                              {{ 'products.product.price.sale_price' | t }}
                            </dt>
                            <dd class="price price--end">
                              {{ item.final_line_price | money }}
                            </dd>
                          </dl>
                        {%- else -%}
                          <span class="price price--end">
                            {{ item.original_line_price | money }}
                          </span>
                        {%- endif -%}

                        {%- if item.variant.available and item.unit_price_measurement -%}
                          <div class="unit-price caption">
                            <span class="visually-hidden">{{ 'products.product.price.unit_price' | t }}</span>
                            {{ item.unit_price | money }}
                            <span aria-hidden="true">/</span>
                            <span class="visually-hidden"
                              >&nbsp;{{ 'accessibility.unit_price_separator' | t }}&nbsp;</span
                            >
                            {%- if item.unit_price_measurement.reference_value != 1 -%}
                              {{- item.unit_price_measurement.reference_value -}}
                            {%- endif -%}
                            {{ item.unit_price_measurement.reference_unit }}
                          </div>
                        {%- endif -%}
                      </div>
                    </td>
                    {%- liquid
                      assign has_qty_rules = false
                      if item.variant.quantity_rule.increment > 1 or item.variant.quantity_rule.min > 1 or item.variant.quantity_rule.max != null
                        assign has_qty_rules = true
                      endif

                      assign has_vol_pricing = false
                      if item.variant.quantity_price_breaks.size > 0
                        assign has_vol_pricing = true
                      endif
                    -%}
                    <td class="cart-item__quantity{% if has_qty_rules or has_vol_pricing %} cart-item__quantity--info{% endif %}">
                      <quantity-popover>
                        <div class="cart-item__quantity-wrapper quantity-popover-wrapper">
                          <label class="visually-hidden" for="Quantity-{{ item.index | plus: 1 }}">
                            {{ 'products.product.quantity.label' | t }}
                          </label>
                          <div class="quantity-popover-container{% if has_qty_rules or has_vol_pricing %} quantity-popover-container--hover{% endif %}">
                            {%- if has_qty_rules or has_vol_pricing -%}
                              <button
                                type="button"
                                aria-expanded="false"
                                class="quantity-popover__info-button quantity-popover__info-button--icon-only button button--tertiary small-hide medium-hide"
                              >
                                {% render 'icon-info' %}
                              </button>
                            {%- endif -%}
                            <quantity-input class="quantity cart-quantity">
                              <button class="quantity__button" name="minus" type="button">
                                <span class="visually-hidden">
                                  {{- 'products.product.quantity.decrease' | t: product: item.product.title | escape -}}
                                </span>
                                {% render 'icon-minus' %}
                              </button>
                              <input
                                class="quantity__input"
                                data-quantity-variant-id="{{ item.variant.id }}"
                                type="number"
                                name="updates[]"
                                value="{{ item.quantity }}"
                                {% # theme-check-disable %}
                                data-cart-quantity="{{ cart | item_count_for_variant: item.variant.id }}"
                                min="0"
                                data-min="{{ item.variant.quantity_rule.min }}"
                                {% if item.variant.quantity_rule.max != null %}
                                  max="{{ item.variant.quantity_rule.max }}"
                                {% endif %}
                                step="{{ item.variant.quantity_rule.increment }}"
                                {% # theme-check-enable %}
                                aria-label="{{ 'products.product.quantity.input_label' | t: product: item.product.title | escape }}"
                                id="Quantity-{{ item.index | plus: 1 }}"
                                data-index="{{ item.index | plus: 1 }}"
                              >
                              <button class="quantity__button" name="plus" type="button">
                                <span class="visually-hidden">
                                  {{- 'products.product.quantity.increase' | t: product: item.product.title | escape -}}
                                </span>
                                {% render 'icon-plus' %}
                              </button>
                            </quantity-input>
                          </div>
                          <cart-remove-button
                            id="Remove-{{ item.index | plus: 1 }}"
                            data-index="{{ item.index | plus: 1 }}"
                          >
                            <a
                              href="{{ item.url_to_remove }}"
                              class="button button--tertiary"
                              aria-label="{{ 'sections.cart.remove_title' | t: title: item.title }}"
                            >
                              {% render 'icon-remove' %}
                            </a>
                          </cart-remove-button>
                        </div>
                        {%- if has_qty_rules or has_vol_pricing -%}
                          <button
                            type="button"
                            class="quantity-popover__info-button quantity-popover__info-button--icon-with-label button button--tertiary large-up-hide"
                            aria-expanded="false"
                          >
                            {% render 'icon-info' %}
                            <span>
                              {%- if has_vol_pricing -%}
                                {{ 'products.product.volume_pricing.note' | t }}
                              {%- elsif has_qty_rules -%}
                                {{ 'products.product.quantity.note' | t }}
                              {%- endif -%}
                            </span>
                          </button>
                        {%- endif -%}
                        {%- if has_vol_pricing or has_qty_rules -%}
                          <div
                            class="cart-items__info global-settings-popup quantity-popover__info"
                            tabindex="-1"
                            hidden
                          >
                            {%- if has_qty_rules == false -%}
                              <span class="volume-pricing-label caption">
                                {{- 'products.product.volume_pricing.title' | t -}}
                              </span>
                            {%- endif -%}
                            <div class="quantity__rules caption">
                              {%- if item.variant.quantity_rule.increment > 1 -%}
                                <span class="divider">
                                  {{-
                                    'products.product.quantity.multiples_of'
                                    | t: quantity: item.variant.quantity_rule.increment
                                  -}}
                                </span>
                              {%- endif -%}
                              {%- if item.variant.quantity_rule.min > 1 -%}
                                <span class="divider">
                                  {{-
                                    'products.product.quantity.min_of'
                                    | t: quantity: item.variant.quantity_rule.min
                                  -}}
                                </span>
                              {%- endif -%}
                              {%- if item.variant.quantity_rule.max != null -%}
                                <span class="divider">
                                  {{-
                                    'products.product.quantity.max_of'
                                    | t: quantity: item.variant.quantity_rule.max
                                  -}}
                                </span>
                              {%- endif -%}
                            </div>
                            <button
                              class="button-close button button--tertiary large-up-hide"
                              type="button"
                              aria-label="{{ 'accessibility.close' | t }}"
                            >
                              {%- render 'icon-close' -%}
                            </button>
                            {%- if item.variant.quantity_price_breaks.size > 0 -%}
                              <volume-pricing class="parent-display">
                                <ul class="list-unstyled">
                                  <li>
                                    <span>{{ item.variant.quantity_rule.min }}+</span>
                                    {%- assign price = item.variant.price | money_with_currency -%}
                                    <span> {{ 'sections.quick_order_list.each' | t: money: price }}</span>
                                  </li>
                                  {%- for price_break in item.variant.quantity_price_breaks -%}
                                    <li>
                                      <span>
                                        {{- price_break.minimum_quantity -}}
                                        <span aria-hidden="true">+</span></span
                                      >
                                      {%- assign price = price_break.price | money_with_currency -%}
                                      <span> {{ 'sections.quick_order_list.each' | t: money: price }}</span>
                                    </li>
                                  {%- endfor -%}
                                </ul>
                              </volume-pricing>
                            {%- endif -%}
                          </div>
                        {%- endif -%}
                        <div class="cart-item__error" id="Line-item-error-{{ item.index | plus: 1 }}" role="alert">
                          <small class="cart-item__error-text"></small>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            class="icon icon-error"
                            viewBox="0 0 13 13"
                          >
                            <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"/>
                            <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"/>
                            <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"/>
                            <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
                          </svg>
                        </div>
                      </quantity-popover>
                    </td>

                    <td class="cart-item__totals right small-hide">
                      {%- render 'loading-spinner' -%}
                      <div class="cart-item__price-wrapper">
                        {%- if item.original_line_price != item.final_line_price -%}
                          <dl class="cart-item__discounted-prices">
                            <dt class="visually-hidden">
                              {{ 'products.product.price.regular_price' | t }}
                            </dt>
                            <dd>
                              <s class="cart-item__old-price price price--end">
                                {{ item.original_line_price | money }}
                              </s>
                            </dd>
                            <dt class="visually-hidden">
                              {{ 'products.product.price.sale_price' | t }}
                            </dt>
                            <dd class="price price--end">
                              {{ item.final_line_price | money }}
                            </dd>
                          </dl>
                        {%- else -%}
                          <span class="price price--end">
                            {{ item.original_line_price | money }}
                          </span>
                        {%- endif -%}

                        {%- if item.variant.available and item.unit_price_measurement -%}
                          <div class="unit-price caption">
                            <span class="visually-hidden">{{ 'products.product.price.unit_price' | t }}</span>
                            {{ item.unit_price | money }}
                            <span aria-hidden="true">/</span>
                            <span class="visually-hidden"
                              >&nbsp;{{ 'accessibility.unit_price_separator' | t }}&nbsp;</span
                            >
                            {%- if item.unit_price_measurement.reference_value != 1 -%}
                              {{- item.unit_price_measurement.reference_value -}}
                            {%- endif -%}
                            {{ item.unit_price_measurement.reference_unit }}
                          </div>
                        {%- endif -%}
                      </div>
                    </td>
                  </tr>
                {%- endfor -%}
              </tbody>
            </table>
          {%- endif -%}
        </div>
      </div>

      <p class="visually-hidden" id="cart-live-region-text" aria-live="polite" role="status"></p>
      <p
        class="visually-hidden"
        id="shopping-cart-line-item-status"
        aria-live="polite"
        aria-hidden="true"
        role="status"
      >
        {{ 'accessibility.loading' | t }}
      </p>
    </form>
  </div>
</cart-items>
');
        });
        console.log('Cart UI updated');
      }).fail(function(xhr, status, error) {
        console.error('Error fetching cart data for UI update:', xhr.responseText);
      });
    } else {
      console.error('Cart container not found.');
    }
  }

  function retryCheck(checksRemaining) {
    if (checksRemaining > 0) {
      setTimeout(function() {
        checkCartAndAddGift(checksRemaining - 1);
      }, checkInterval);
    } else {
      console.log("Max checks reached. Refreshing page.");
      location.reload();
    }
    isUpdating = false;
  }

  function initializeCartCheck() {
    checkCartAndAddGift(maxChecks);
  }

  // Run the function on page load
  initializeCartCheck();

  // Listen for quantity changes
  $(document).on('change', 'input[name="updates[]"]', initializeCartCheck);

  // Listen for remove item clicks
  $(document).on('click', '.remove-item', initializeCartCheck);

  // Listen for cart form submissions
  $('form[action="/cart"]').on('submit', function(e) {
    e.preventDefault();
    $.post('/cart/update.js', $(this).serialize(), function(data) {
      initializeCartCheck();
    });
  });

  // Additional listener for AJAX cart updates
  $(document).on('cart:updated', initializeCartCheck);
});


