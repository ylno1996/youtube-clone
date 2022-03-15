

$('.header__video').on("click", function (event) {
    event.preventDefault();

})

$('.header__apps').on("click", function (event) {
    event.preventDefault();
    if($(this).hasClass('selected')) {
        deselect($(this));
    }   else {
        $(this).addClass('selected');
        $('.pop').slideFadeToggle();

    }
    return false
})

$('.header__more').on("click", function (event) {
    event.preventDefault();
    $(".header__right").append('<li>"안녕"</li>')
})

function deselect(event) {
    $('.pop').slideFadeToggle(function() {
    event.removeClass('selected');
})
};

$.fn.slideFadeToggle = function(easing, callback) {
    return this.animate({ opacity: 'toggle', height: 'toggle' }, 'fast', easing, callback);
  };