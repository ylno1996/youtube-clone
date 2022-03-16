


$('.header__apps').on("click", function (event) {
    event.preventDefault();
    if($(this).hasClass('selected')) {
        $('.apps-pop').slideFadeToggle();
        $(this).removeClass('selected');
    }   else {
        $(this).addClass('selected');
        $('.apps-pop').slideFadeToggle();

    }
    return false
})

$('.header__avatar').on("click", function (event) {
    event.preventDefault();
    if($(this).hasClass('selected')) {
       $('.profile-pop').slideFadeToggle();
       $(this).removeClass('selected');
    }   else {
        $(this).addClass('selected');
        $('.profile-pop').slideFadeToggle();

    }
    return false
})

$('.header__video').on("click", function (event) {
    event.preventDefault();
    if($(this).hasClass('selected')) {
       $('.video-pop').slideFadeToggle();
       $(this).removeClass('selected');
    }   else {
        $(this).addClass('selected');
        $('.video-pop').slideFadeToggle();

    }
    return false
})

$('.header__notifications').on("click", function (event) {
    event.preventDefault();
    if($(this).hasClass('selected')) {
       $('.notify-pop').slideFadeToggle();
       $(this).removeClass('selected');
    }   else {
        $(this).addClass('selected');
        $('.notify-pop').slideFadeToggle();

    }
    return false
})


$('.header__more').on("click", function (event) {
    event.preventDefault();
    $(".header__right").append('<li>"안녕"</li>')
})

$.fn.slideFadeToggle = function(easing, callback) {
    return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
  };