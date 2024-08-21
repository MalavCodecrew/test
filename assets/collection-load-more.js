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

// Trigger loadMoreProducts on scroll
window.onscroll = function() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) { 
        // Adjust the offset as needed to trigger before reaching the absolute bottom
        loadMoreProducts();
    }
};
