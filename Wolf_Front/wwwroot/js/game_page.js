// 倒數
var totaltime = 60;
function update(percent) {
    var deg;
    if (percent < (totaltime / 2)) {
        deg = 90 + (360 * percent / totaltime);
        $('.pie').css('background-image',
            'linear-gradient(' + deg + 'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)'
        );
    } else if (percent >= (totaltime / 2)) {
        deg = -90 + (360 * percent / totaltime);
        $('.pie').css('background-image',
            'linear-gradient(' + deg + 'deg, transparent 50%, #1fbba6 50%),linear-gradient(90deg, white 50%, transparent 50%)'
        );
    }
}
var count = parseInt($('#time').text());
myCounter = setInterval(function () {
    count--;
    $('#time').html(count);
    update(count);

    if (count ===0) clearInterval(myCounter);
}, 1000);

//背景夜晚白天轉換
let toggle = document.getElementById('toggleDark')
let image = document.querySelector('.image')

toggle.addEventListener('click', toggleScheme, true)

function toggleScheme() {
    if (toggle.getAttribute("aria-checked") == "true") {
        toggle.setAttribute("aria-checked", "false");
    } else {
        toggle.setAttribute("aria-checked", "true");
    }
    image.classList.toggle('image-dark')
    image.classList.toggle('image-light')
}

$('#describe').tooltip('show')
//  對話框滾輪
$("#div1").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
    if (event.type == "mouseenter") {
        $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
    } else {
        $(this).scrollTop(0).css({ "overflow-y": "hidden" }); //滑鼠離開
    }
});
