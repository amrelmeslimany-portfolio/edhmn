$(function () {
  const languageToggler = $(".language-toggler .dropdown-menu button");
  const itemWillTranslate = $(`[data-lang]`);
  const discountsSliderWrap = $(".owl-carousel.discountslider");

  const SITE_DIRECTION = $("body").css("direction");

  // Global settings

  /* 
    (1)- Language settings
    (2)- Init plugins
  */

  // - Language settings
  languageToggler.each(function () {
    $(this).click(function () {
      let langType = $(this).data("lang-type");
      let dropdownToggler = $(".language-toggler .dropdown-toggle");

      if (!$(this).hasClass("active")) {
        if (Boolean(LANGUAGES[langType])) {
          let langData = LANGUAGES[langType];

          if (itemWillTranslate.length) {
            itemWillTranslate.each(function () {
              let itemName = $(this).data("lang").trim();

              $(this).html(langData[itemName]);
            });
          }
        }
      }

      $(this).parent().siblings().find(".dropdown-item").removeClass("active");
      $(this).addClass("active");

      if (langType == "ar") {
        dropdownToggler.html("عربي");
      } else {
        dropdownToggler.html("English");
      }
    });
  });

  // - Init Carousel
  if (discountsSliderWrap.length) {
    discountsSliderWrap.owlCarousel({
      animateOut: "animate__animated animate__fadeOut",
      animateIn: "animate__animated animate__fadeIn",
      dotsSpeed: 10000,
      items: 1,
      margin: 0,
      dots: true,
      rtl: SITE_DIRECTION === "rtl" ? true : false,
      pullDrag: false,
      freeDrag: false,
      mouseDrag: false,
    });
  }
});
