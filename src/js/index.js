import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.cover-photo').height($(window).height());
}

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
