import hello from './module';

hello();

function setTitlePhotoHeight() {
  $('.title-photo').height($(window).height());
}

var topofDiv = $(".title-photo").offset().top;
var height = $(".title-photo").outerHeight();

(function($) {
    $(document).ready(function(){
        $(window).scroll(function(){
            if ($(this).scrollTop() > (topofDiv + height)) {
                $('.top-bar').fadeIn(500);
                $('.initial-top-bar').fadeOut(500);
            } else {
                $('.top-bar').fadeOut(500);
                $('.initial-top-bar').fadeIn(500);
            }
        });
    });
})(jQuery);
// function hid

setTitlePhotoHeight();

$(window).resize(setTitlePhotoHeight);
$(window).scroll();
