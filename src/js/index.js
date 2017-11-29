import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
}

$(window).resize(setTitlePhotoHeight);

setTitlePhotoHeight();
