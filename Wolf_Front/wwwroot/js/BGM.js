window.onload = function () { $('#music_btn').click(play()); }

function play() {
    var Bgm_music = document.getElementById("Bgm_music");
    Bgm_music.play();
};
$("body").addClass("bgm-pic");
var btn = document.querySelector('.btnClass');

function saveName(e) {
    //�ŧi�@���ܼơA�j�w��J��AŪ��&�����ϥΪ̿�J����r
    var str = $('#Email_ID').val();
    localStorage.setItem('myName', str); //���J�����e�s�b�s����
}
btn.addEventListener('click', saveName)