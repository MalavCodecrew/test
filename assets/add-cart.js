document.addEventListener('DOMContentLoaded', function() {
 
  document.querySelectorAll('.quantity__button').forEach(function(button) {
    button.addEventListener('click', function() {
      var input = this.closest('.quantity').querySelector('.quantity__input');
      var value = parseInt(input.value);
      if (this.classList.contains('minus')) {
        value = Math.max(1, value - 1);
      } else {
        value += 1; 
      }
      input.value = value;
    });
  });
});