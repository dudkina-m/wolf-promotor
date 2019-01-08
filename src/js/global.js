$(function () {
  modalDisplay();
  mainSliderInit();
  villasTabsLogic();
  investorsTabsLogic();
  thumbnailsInit();
  scrollHeader();
  partnersSliderInit();
  changePhoto();
  toogleContacts();
  toggleMenu();
  scrollToTag();

  if (window.innerWidth < 768) {
    $('.lang-dropdown').click(function () {
      $(this).children('.submenu').toggle();
    });

    $('.header__link_hasSubmenu').click(function () {
      $(this).siblings('.submenu').toggle();
    });

    $('.header__link').click(function () {
      if (!$(this).hasClass('header__link_hasSubmenu')) {
        $('.header__nav > ul').removeClass('open');
      }
    });

    $('.submenu__item').click(function () {
      $('.header__nav > ul').removeClass('open');
    });
  }

  $('[data-fancybox="gallery"]').fancybox({
    zoom: false
  });
});

function scrollToTag() {
  $('.header__link, .submenu__item').each(function () {
    $(this).click(function () {
      const id = $(this).attr('href');
      $('html,body').animate({scrollTop: $(id).offset().top}, 'slow');
    });
  });
}

function toggleMenu() {
  $('.mobile-menu').click(function () {
    $('.header__nav > ul').toggleClass('open');
  });
  $(document).mouseup(function (e) {
    var $target = $(e.target);
    if ($target.closest('.header__nav').length == 0 && $target.closest('.mobile-menu').length == 0) {
      e.stopPropagation();
      $('.header__nav > ul').removeClass('open');
    }
  });
}

function changePhoto() {
  $('.card__small').each(function () {
    $(this).click(function (e) {
      e.preventDefault();
      const src = $(this).attr('data-src');
      const photo = $(this).parent().parent().parent('.card__thumbnails').siblings('.card__photo').children('a');
      if ($(this).hasClass('card__video')) {
        $(photo).attr('href', $(this).attr('data-video'));
      } else {
        $(photo).attr('href', src);
      }
      $(photo.children('img')).attr('src', src);
    });
  });
}

function toogleContacts() {
  $('.header__contacts').click(function () {
    $(this).children('ul').toggle();
  });

  $(document).mouseup(function (e) {
    var $target = $(e.target);
    if ($target.closest('.header__contacts').length == 0 && $target.closest('.header__contacts > ul').length == 0) {
      e.stopPropagation();
      $('.header__contacts > ul').hide();
    }
  });
}

function scrollHeader() {
  var header = $('.header');
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      header.addClass('dark');
    } else {
      header.removeClass('dark');
    }
  });
}

function partnersSliderInit() {
  $('.partners__slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
}

function mainSliderInit() {
  $('.main-slider').slick({
    dots: true
  });
}

function thumbnailsInit() {

  $('.card__thumbnails').each(function () {
    $(this).slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      vertical: true,
      verticalSwiping: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });
  });
}

function villasTabsLogic() {
  $('#villas .tab').eq(0).addClass('active');
  $('#villas .tab__content').addClass('hidden');
  $('#villas .tab__content').eq(0).removeClass('hidden');

  $('#villas .tab__wrapper').each(function () {

    $(this).find('.tab').click(function () {

      var index = $(this).index();

      $('#villas .tab').removeClass('active');
      $(this).addClass('active');

      $('#villas .tab__content').addClass('hidden');
      $('#villas .tab__content').eq(index).removeClass('hidden');
    });
  });
}

function investorsTabsLogic() {
  $('#investors .tab').eq(0).addClass('active');
  $('#investors .tab__content').addClass('hidden');
  $('#investors .tab__content').eq(0).removeClass('hidden');

  $('#investors .tab__wrapper').each(function () {

    $(this).find('.tab').click(function () {

      var index = $(this).index();

      $('#investors .tab').removeClass('active');
      $(this).addClass('active');

      $('#investors .tab__content').addClass('hidden');
      $('#investors .tab__content').eq(index).removeClass('hidden');
    });
  });
}

function modalDisplay() {

  $('[data-modal]').each(function () {

    $(this).click(function (e) {
      e.preventDefault();
      var id = $(this).attr('data-modal');
      $('.modal').hide();
      $('#' + id).show();
      $('.modal__container').fadeIn(300);
    });
  });

  $('.modal__close').click(function () {
    $('.modal__container').fadeOut(300);
  });

  $('.modal__container').click(function (e) {
    if (!$(e.target).closest('.modal').length) {
      $('.modal__container').fadeOut();
    }
  });
}
