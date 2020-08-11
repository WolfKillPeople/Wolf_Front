$("body").addClass("bgm-pic");
window.onload = function () { $('#music_btn').click(play()); }

function play() {
    var Bgm_music = document.getElementById("Bgm_music");
    Bgm_music.play();
};