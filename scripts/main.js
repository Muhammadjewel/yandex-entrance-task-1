(function (library) {

  // Calls the second IIFE and locally passes in the global jQuery, window, and document objects
  library(window, document, window.jQuery);
}

// Locally scoped parameters
(function (window, document, $) {

  // В мобильных устройствах показать/скрыть детальную информацию
  // сохраняем .card в переменную для лучшей производительности
  var card = $(".card");
  // При нажатии на .card--expander внутри .card показать/скрыть инфо
  card.on("click", ".card--expander", function (e) {
    // отменяем переход вверх при нажатии на линк
    e.preventDefault();
    // находим детали .card, у которого был нажат кнопка
    var details = $(this).closest(card).find(".card--details");
    // если детали скрыты, изменить текст линка на "Больше информации" и на "Меньше информации" если детали видны
    var text = details.is(":visible") ? "Больше информации" : "Меньше информации";
    $(this).text(text);
    // показываем детали
    details.slideToggle();
  });

  // Открытие всплывающего окна
  $("a.open-modal").click(function(e) {
    $(this).modal({
      fadeDuration: 250
    });
    return false;
  });

  // ПРИМЕНЕНИЕ СТИЛЕЙ НА SELECT ФОРМЫ
  // данный плагин добавляет функцию поиска по тексту в select формах
  // в фильтрах школы и даты (месяца) не сортируем варианты по алфавиту
  $("#school-filter, #month-filter").selectize();

  // сортируем имена лекторов в вариантах для более быстрого поиска имени
  $("#lecturer-filter").selectize({
    sortField: 'text'
  });

  // ФИЛЬТРЫ
  // при нажатии кнопки открытия фильтра показать фильтры и скрыть кнопку
  $("#main").on("click", ".filter--toggler", function(e){
    $(this).closest("body").find(".filter").fadeIn();
    $(this).hide();
  });

  // сброс фильтров
  $(".filter--buttons--reset").click(function(e){
    e.preventDefault();
    card.removeClass('is-hidden');
  });

  // закрытие окна фильтра
  $(".filter--buttons--close").click(function(e){
    e.preventDefault();
    $(".filter").fadeOut();
  });

  // логика фильтров
  $(".filter--buttons--apply").click(function(e) {
    e.preventDefault();
    var schoolFilter = $("#school-filter").val();
    var lecturerFilter = $("#lecturer-filter").val();

    if (schoolFilter !== "all") {
      card.removeClass('is-hidden');
      var schoolFiltered = card.not("[data-school='" + schoolFilter + "']").addClass('is-hidden');
      card.filter("[data-school='all']").removeClass('is-hidden');
    } else {
      card.removeClass('is-hidden');
    }
  });

  // к сожалению не удалось применить неснолько фильтров одновременно
  // отдельное фильтрование лекций по именам лектором было сделано с помощью следующего кода
  // card.not(card.has("a:contains('имя лектора')")).addClass("is-hidden");
  // кроме этого, можно было бы отдельно фильтровать по месяцам с помощью
  // card.not(card.has("span:contains('месяц, н-р Окт')")).addClass("is-hidden");


  // УРОВНЕНИЕ DIV ЛЕКЦИЙ ПО ВЫСОТЕ
  // на больших устройствах применяем уровнение высоты
  $(function() {
    $('.card').matchHeight();
  });

  var window = $(window);
  var filterToggler = $(".filter--toggler");

  if(window.width() < 768) {
    // в мобильных устройствах убираем уровнение высоты так, как при открытии и закрытии детальной информации эта функция вызывает ошибки (заданная высота не дает контенту открытся правильно)
    $(".card").matchHeight({remove:true});

    // При прокрутке ниже header показать кнопку открытия фильтров в мобильных устройствах
    $(document).scroll(function(){
      var y = $(this).scrollTop();
      var headerHeight = $("#header").height() - 100;
      if (y > headerHeight) {
        filterToggler.fadeIn();
      } else {
        filterToggler.fadeOut();
      }
    });
  }

}));