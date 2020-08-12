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
    localStorage.setItem('myName', str);
    addpic();//把輸入的內容存在瀏覽器
}
function addpic() {
    let picData =
    {
        email: $('#Email_ID').val(),
        pic: localStorage.getItem('Register_pic')
    }

    
    $.ajax({
        type: 'POST',
        url: 'https://wolfpeoplekill.azurewebsites.net/api/UserRegister/postpic',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(picData),
        success: function (msg) {
            //alert('Data Saved: ' + msg);
        }
    });
}
btn.addEventListener('click', saveName)