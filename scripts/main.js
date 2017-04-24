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

  $("#school-filter, #month-filter").selectize();

  $("#lecturer-filter").selectize({
    sortField: 'text'
  });

  $(".filter--buttons--apply").click(function(e) {
    e.preventDefault();
    var card = $(".card");
    var schoolFilter = $("#school-filter").val();
    var lecturerFilter = $("#lecturer-filter").val();

    if (schoolFilter !== "all") {
      card.removeClass('is-hidden');
      var schoolFiltered = card.not("[data-school='" + schoolFilter + "']").addClass('is-hidden');
      schoolFiltered.not(card.has("a:contains('" + lecturerFilter + "')")).addClass('is-hidden');
      card.filter("[data-school='all']").removeClass('is-hidden');
    }
  });

/*
  $("#filterIt").click(function(){
    var card = $(".card");
    var school = $("#school-filter").val();
    console.log(school);
    var lecturer = $("#lecturer-filter").val();
    var month = $("#month-filter").val();
    var conditions = {
      school: school,
      lecturer: lecturer,
      month: month
    };
    console.log(card.data("school") === school);
    card.removeClass("is-hidden");
    card.not("[data-school='" + school +"']").addClass("is-hidden");
  });*/

  $(function() {
    $('.card').matchHeight();
  });

  if($(window).width() <= 768) {
    $(".card").matchHeight({remove:true});
  }

  if($(window).width() < 768) {
    $(document).scroll(function(){
      var y = $(this).scrollTop();
      var headerHeight = $("#header").height() - 100;
      var filterToggler = $(".filter--toggler");
      if (y > headerHeight) {
        filterToggler.fadeIn();
      } else {
        filterToggler.fadeOut();
      }
    });
  }

  $("#main").on("click", ".filter--toggler", function(){
    $(this).closest("body").find(".filter").fadeIn();
    $(this).hide();
  });

  $(".filter--reset").click(function(){
    if($(window).width <= 768) {
      $(this).closest("body").find(".filter").fadeOut();
    }
  });

}));