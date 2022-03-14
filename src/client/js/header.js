const headerVideo = document.querySelector('.header__video');

const headerVideoOpen = (event) => {
    event.preventDefault();
    $.ajax({
        url: "/ajax/lol.json",
        type: "GET",
        dataType: "json",
        success: function(data) {
            $("table").html(`<a href="/videos/upload> 영상 업로드 </a>"`)
        }
    })

}


headerVideo.addEventListener("click", headerVideoOpen);