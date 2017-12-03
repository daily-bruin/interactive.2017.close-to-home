import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.cover-photo').height($(window).height());
}

(function fadeBar() {
  $(document).ready(() => {
    $(window).scroll(function scrollEffects() {
      if ($(this).scrollTop() >= $(window).height()) {
        $('.top-bar').addClass('fix-bar');
      } else {
        $('.top-bar').removeClass('fix-bar');
      }
    });
  });
})(jQuery);
// function hid

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);

$(window).waypoint(() => {
  $('.cover-photo__header').fadeIn();
  $('.db-logo').fadeIn();
});

$(window).waypoint(
  () => {
    $('.cover-photo__header').fadeOut();
    $('.db-logo').fadeOut();
  },
  { offset: -1 }
);
