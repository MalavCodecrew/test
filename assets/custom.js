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

// -------------------practice api--------------------------------------------

fetch(window.Shopify.routes.root + "recommendations/products.json?product_id=1234567890123&limit=4&intent=related")
  .then(response => response.json())
  .then(({ products }) => {
    if (products.length > 0) {
      const firstRecommendedProduct = products[0];

      alert(
        `The title of the first recommended product is: ${firstRecommendedProduct.title}`
      );
    }
  }
);
