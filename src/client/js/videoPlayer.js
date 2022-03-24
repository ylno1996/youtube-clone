const container = document.querySelector(".videoContainer");
const video = document.querySelector("video");
const controls = document.getElementById("videoControls");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentVideoTime = document.getElementById("currentTime");
const totalVideoTime = document.getElementById("totalTime");
const timeBar = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");

let volumeValue = 1;
video.volume = volumeValue;

//비디오 메타데이터 불러올 때 발생하는 이벤트로 비디오 총 영상시간 보여줌
const handleMetadata = (e) => {
  const sec = Math.floor(video.duration);
  console.log(new Date(sec * 1000).toISOString());
  if (sec > 3600) {
    totalVideoTime.innerText = new Date(sec * 1000)
      .toISOString()
      .substrring(12, 19);
  } else {
    totalVideoTime.innerText = new Date(sec * 1000)
      .toISOString()
      .substring(14, 19);
  }
  timeBar.max = video.duration;
};

//비디오 시간이 경과할 때 발생하는 이벤트로 현재의 영상시간을 보여줌
const handleTimeUpdate = (e) => {
  const sec = Math.floor(video.duration);
  timeBar.value = video.currentTime;
  console.log(timeBar.value);
  console.log(video.currentTime);
  if (sec > 3600) {
    currentVideoTime.innerText = new Date(video.currentTime * 1000)
      .toISOString()
      .substring(12, 19);
  } else {
    currentVideoTime.innerText = new Date(video.currentTime * 1000)
      .toISOString()
      .substring(14, 19);
  }
};

//영상에 마우스 움직임이 감지될때 작동하는 함수로 컨트롤을 소환시킴
const handleMouseMove = (e) => {
  controls.classList.add("showing");
};

const handleMouseLeave = (e) => {
  if (!video.paused) {
    controls.classList.remove("showing");
  }
};

// 플레이 포즈 버튼 (동작버튼) 클릭 시 발생하는 이벤트
const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

// 비디오가 실행될때 동작버튼 변화
const handlePlayVideo = (e) => {
  playBtn.innerText = "pause";
};

// 비디오가 멈출때 동작버튼 변화
const handlePauseVideo = (e) => {
  playBtn.innerText = "play_arrow";
};

// 뮤트 버튼 누를 때 각종 변화
const handleMuteBtn = (e) => {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "volume_off";
    volumeRange.value = volumeValue * 100;
  } else {
    video.muted = true;
    muteBtn.innerText = "volume_up";
    volumeRange.value = 0;
  }
};

// 뮤트 상태가 변화할 때 뮤트 버튼의 변화
const handleMuteBtnText = (e) => {
  if (video.volume * 100 === 0 || video.muted) {
    muteBtn.innerText = "volume_up";
  } else {
    muteBtn.innerText = "volume_off";
  }
};

const handleVolume = (e) => {
  if (video.muted) {
    video.muted = false;
  }
  volumeValue = volumeRange.value / 100;
  video.volume = volumeValue;
};

const handleTimeBarChange = (e) => {
  video.currentTime = timeBar.value;
};

const handleFullScreen = (e) => {
  if (!document.fullscreenElement) {
    fullScreenBtn.innerText = "fullscreen_exit";
    container.requestFullscreen();
  } else {
    fullScreenBtn.innerText = "fullscreen";
    document.exitFullscreen();
  }
};

video.addEventListener("click", handlePlayClick);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMuteBtn);
video.addEventListener("loadedmetadata", handleMetadata);
container.addEventListener("mousemove", handleMouseMove);
container.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("play", handlePlayVideo);
video.addEventListener("pause", handlePauseVideo);
video.addEventListener("volumechange", handleMuteBtnText);
video.addEventListener("timeupdate", handleTimeUpdate);
volumeRange.addEventListener("input", handleVolume);
timeBar.addEventListener("input", handleTimeBarChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
