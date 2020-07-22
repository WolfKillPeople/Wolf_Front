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
        document.getElementById("Day").value = "黑夜";
        document.getElementById("userInput").hidden = true;
        document.getElementById("messageInput").hidden = true;
        document.getElementById("userInput2").hidden = false;
        document.getElementById("messageInput2").hidden = false;
        document.getElementById("sendButton1").hidden = false;
        document.getElementById("sendButton").hidden = true;

    } else {
        toggle.setAttribute("aria-checked", "true");
        document.getElementById("Day").value = "白天";
        document.getElementById("messagesList1").hidden = true;
        document.getElementById("userInput").hidden = false;
        document.getElementById("messageInput").hidden = false;
        document.getElementById("userInput2").hidden = true;
        document.getElementById("messageInput2").hidden = true;
        document.getElementById("sendButton").hidden = false;
        document.getElementById("sendButton1").hidden = true;
    }
    image.classList.toggle('image-dark')
    image.classList.toggle('image-light')
}
//滑鼠移到職業圖片顯示該職業描述
$('#depict').hover(tool);
function tool() {
    $('#depict').tooltip('show')
}
//  對話框滾輪
$("#div1").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
    if (event.type == "mouseenter") {
        $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
    } else {
        $(this).scrollTop(0).css({ "overflow-y": "hidden" }); //滑鼠離開
    }
});


//職業
let ary;
function Binding() {
    console.log('Binding');
    console.log(ary);
    var profession = new Vue({
        el: "#describe",
        data: { items: ary[0] },
    });
}

$(document).ready(function () {
    let obj = [{
        "roomId": 3,
    }]
    $.ajax({
        type: "post",
        url: "https://wolfpeoplekill.azurewebsites.net/api/Game/GetRole",
        data: JSON.stringify(obj),
        dataType: 'JSON',
        headers: {
            'Content-type': 'application/json'
        },
        success: function (response) {
            // console.log('ok')
            //alert('ok')
            ary = response;
            // alert(ary[0].player)
            // alert(ary[0].name)
            // alert(ary[0].imgUrl)
            // alert(ary[0].description)
            Binding();
        }
    });
}
)