(function (library) {

  // Calls the second IIFE and locally passes in the global jQuery, window, and document objects
  library(window, document, window.jQuery);

}

// Locally scoped parameters
(function (window, document, $) {

  var card = $(".card");
  card.on("click", ".card--expander", function (e) {
    e.preventDefault();
    var details = $(this).closest(card).find(".card--details");
    var text = details.is(":visible") ? "Больше информации" : "Меньше информации";
    $(this).text(text);
    details.slideToggle();
  });

  $("a.open-modal").click(function(e) {
    $(this).modal({
      fadeDuration: 250
    });
    return false;
  });

}));