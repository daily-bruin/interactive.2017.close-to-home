import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
}

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
