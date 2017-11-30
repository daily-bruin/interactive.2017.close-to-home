import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
}

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);
