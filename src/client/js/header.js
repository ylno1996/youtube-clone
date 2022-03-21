

$('.header__apps').on("click", function (event) {
    const own = $(this)
    
    event.preventDefault();
    outlinedClicked(own);
    if(own.hasClass('selected')) {
        $('.apps-pop').slideFadeToggle();
        own.removeClass('selected');
    }   else {
        own.addClass('selected');
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
    const own = $(this);
    event.preventDefault();
    outlinedClicked(own);
})

$('#search__form').on("submit", function (event) {
    event.preventDefault();
    window.location.replace("http://localhost:4000/search?keyword=" + event.currentTarget[0].value)
})

$.fn.slideFadeToggle = function(easing, callback) {
    return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
  };

  function outlinedClicked (el) {
    if (el.hasClass('outlined__clicked')) {
        el.removeClass('outlined__clicked');
        el.css("color", "#323232");
        el.css("text-shadow", "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white")
    } else {
        el.addClass('outlined__clicked');
        el.css("color", "#FFFFFF");
        el.css("text-shadow", "none");
    };
  };