window.onload = function () { $('#music_btn').click(play()); }

function play() {
    var Bgm_music = document.getElementById("Bgm_music");
    Bgm_music.play();
};
$("body").addClass("bgm-pic");
var btn = document.querySelector('.btnClass');

function saveName(e) {
    //宣告一個變數，綁定輸入欄，讀取&紀錄使用者輸入的文字
    var str = $('#Email_ID').val();
    localStorage.setItem('myName', str); //把輸入的內容存在瀏覽器
}
btn.addEventListener('click', saveName)