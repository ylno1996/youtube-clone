const video = document.querySelector('video');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const muteBtn = document.getElementById('mute');
const currentVideoTime = document.getElementById('currentTime');
const totalVideoTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('volume');

const videoJQ = $('video');
const pBJQ = $('#play');

let volumeValue = 1
video.volume = volumeValue;

// 플레이 포즈 버튼 (동작버튼) 클릭 시 발생하는 이벤트
const handlePlayClick = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    console.log(video);
    console.log(videoJQ);
    console.log(playBtn)
    console.log(pBJQ);
};


// 비디오가 실행될때 동작버튼 변화
const handlePlayVideo =(e) => {
    playBtn.innerText = 'pause'
};


// 비디오가 멈출때 동작버튼 변화
const handlePauseVideo = (e) => {
    playBtn.innerText = 'play_arrow'
};


// 뮤트 버튼 누를 때 각종 변화
const handleMuteBtn = (e) => {
    if (video.muted) {
        video.muted = false;
        muteBtn.innerText ='volume_off'
        volumeRange.value = volumeValue *100;
    } else {
        video.muted = true;
        muteBtn.innerText = 'volume_up'
        volumeRange.value = 0
    }
};



// 뮤트 상태가 변화할 때 뮤트 버튼의 변화
const handleMuteBtnText = (e) => {
    if (video.volume*100 === 0 || video.muted) {
        muteBtn.innerText = 'volume_up'
    } else {
        muteBtn.innerText = 'volume_off'
    }
};

const handleVolume = (e) => {
    if (video.muted) {
        video.muted = false;
    }
    volumeValue = volumeRange.value/100;
    video.volume = volumeValue;
};


playBtn.addEventListener('click', handlePlayClick);
muteBtn.addEventListener('click', handleMuteBtn);
video.addEventListener('play', handlePlayVideo);
video.addEventListener('pause', handlePauseVideo);
video.addEventListener('volumechange',handleMuteBtnText);
volumeRange.addEventListener('input', handleVolume);