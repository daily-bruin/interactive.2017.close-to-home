import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
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

$(window).waypoint(function(direction) {
  $('.title-header').show();
});

$(window).waypoint(
  function(direction) {
    $('.title-header').hide();
  },
  { offset: -1 }
);
