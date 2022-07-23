$(function () {
  const languageToggler = $(".language-toggler .dropdown-menu button");
  const itemWillTranslate = $(`[data-lang]`);
  const discountsSliderWrap = $(".owl-carousel.discountslider");
  const mainHeader = $("#main-header");
  const mainNavbar = mainHeader.find(".navbar");
  const offcanvas = $(".offcanvas ");

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
      items: 1,
      margin: 0,
      dots: true,
      rtl: SITE_DIRECTION === "rtl" ? true : false,
      pullDrag: false,
      mouseDrag: false,
      touchDrag: false,
      loop: false,
      rewind: false,
      autoHeight: true,
    });
  }

  // - navbar
  mainNavbar.find(".navbar-toggler").click(function () {
    if (offcanvas.hasClass("show")) {
      mainNavbar.removeClass("blur");
    }
  });

  offcanvas.find(".offcanvas-header .btn-close").click(function () {
    setTimeout(() => {
      mainNavbar.addClass("blur");
    }, 200);
  });

  $(document).on("scroll", function () {
    let winScroll = window.scrollY;
    let mainHeaderHeight = mainHeader.height() - 200;

    if (winScroll >= mainHeaderHeight) {
      mainNavbar.addClass("blur");
    } else {
      mainNavbar.removeClass("blur");
    }
  });
});
