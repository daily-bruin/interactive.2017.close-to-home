import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
}

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);

$(window).waypoint(() => {
  $('.title-header').fadeIn();
  $('.db-logo').fadeIn();
});

$(window).waypoint(
  () => {
    $('.title-header').fadeOut();
    $('.db-logo').fadeOut();
  },
  { offset: -1 }
);
