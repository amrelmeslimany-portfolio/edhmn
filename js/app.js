$(function () {
  const bootstrapFileLink = $("#bootstrapLink");
  const stylesheetFileLink = $("#stylefileLink");
  const languageToggler = $(".language-toggler .dropdown-menu button");
  const itemWillTranslate = $(`[data-lang]`);
  const discountsSliderWrap = $(".owl-carousel.discountslider");
  const mainHeader = $("#main-header");
  const mainNavbar = mainHeader.find(".navbar");

  /* Company Data Form page */
  const fileUploadsInputOne = $("#companydata-section #file1");
  const fileUploadsInputTwo = $("#companydata-section #file2");
  const fileUploadsInputThree = $("#companydata-section #file3");

  const SITE_DIRECTION = $("body").css("direction");

  // Plugins
  AOS.init({ once: true });
  // Dropzone at Company data form page
  // Handle File Uploads
  if (
    fileUploadsInputOne.length ||
    fileUploadsInputTwo.length ||
    fileUploadsInputThree.length
  ) {
    const fileuploadOptions = (url = "papers", paramName) => {
      return {
        url: url,
        uploadMultiple: false,
        maxFiles: 1,
        addRemoveLinks: true,
        paramName: paramName,
        parallelUploads: 1,
        autoProcessQueue: false,
        previewTemplate: $(".dropzone-preview").html(),
        sending: (file) => {
          console.log(file);
        },
      };
    };
    const serverFilesUploadedURL = "papers";

    const papersDropzone1 = new Dropzone(
      fileUploadsInputOne.get(0),
      fileuploadOptions(serverFilesUploadedURL, "paper1")
    );
    const papersDropzone2 = new Dropzone(
      fileUploadsInputTwo.get(0),
      fileuploadOptions(serverFilesUploadedURL, "paper2")
    );
    const papersDropzone3 = new Dropzone(
      fileUploadsInputThree.get(0),
      fileuploadOptions(serverFilesUploadedURL, "paper3")
    );

    $("#papers__form").on("submit", (event) => {
      event.preventDefault();
      papersDropzone1.processQueue();
      papersDropzone2.processQueue();
      papersDropzone3.processQueue();
    });
  }

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

              if ($(this).is("input") || $(this).is("textarea")) {
                $(this).attr("placeholder", langData[itemName]);
              } else {
                $(this).html(langData[itemName]);
              }
            });
          }
        }
      }

      $(this).parent().siblings().find(".dropdown-item").removeClass("active");
      $(this).addClass("active");

      if (langType == "ar") {
        document.body.lang = "ar";
        bootstrapFileLink.attr("href", "../css/bootstrap.rtl.css");
        stylesheetFileLink.attr("href", "../css/style.rtl.css");
        dropdownToggler.html("عربي");
      } else {
        document.body.lang = "en";
        bootstrapFileLink.attr("href", "../css/bootstrap.css");
        stylesheetFileLink.attr("href", "../css/style.css");
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

  // - navbar , Add blur when scrolling
  mainHeader.css("padding-top", mainNavbar.innerHeight() + "px");
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
