function openWindow(url) {
    newpage = window.open(url, 'newpage', 'toolbar=no');
    newpage.focus();
    self.close();
}
const prizes = {
    0: "30",
    1: "100",
    2: "1",
    3: "50",
    4: "1",
    5: "30",
    6: "1",
    7: "下次再來💸",
    8: "👛",
    9: "💰",
    10: "💲",
    11: "🤑",
    12: "💲",
    13: "👛",
    14: "💲",
};
const total_items = 8;
const minimum_jumps = 30; // 超過這數字開始進入抽獎
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer = 0;
let prize = -1;
//var email = "a1256963@gmail.com";
var email = localStorage.getItem('myName');
function runCircle() {
    $(`[data-order="${current_index}"]`).removeClass('is-active');
   
    current_index += 1;

    if (current_index > total_items - 1) {
        current_index = 0;
    }

    $(`[data-order="${current_index}"]`).addClass('is-active');
    //增加抽獎音效
    $("#lottery_music").append(`    
        <audio autoplay>
            <source src="../music/lottery.mp3" type="audio/ogg">
        </audio>`
    );
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items);
}


var postwin;
var getwin;
var obj;
function controllSpeed() {
    jumps += 1;
    runCircle();
    
    // 1.抽到獎品停止遊戲
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);
        var postemail;
        if (current_index == 7) {
            postwin = getwin;
            swal({
                title: '真可惜QQ',
                text: `0 積分💸`,
                icon: 'error',
                button: "前往房間列表",
            }).then(function () {
                window.location.href = "javascript:location.replace('http://werewolfkill.azurewebsites.net/Html/Room.html')"
            });
        }
        else {
            postwin = parseInt(prizes[current_index]) + getwin;
            swal({
                title: '恭喜你!!',
                text: `得到 ${prizes[current_index]} 積分${prizes[current_index + 8]}`,
                icon: 'success',
                button: "前往房間列表",
            }).then(function () {
                window.location.href = "javascript:location.replace('http://werewolfkill.azurewebsites.net/Html/Room.html')"
            });
        }
        postemail =
        {
            email: email,
            win: postwin
        }
        $.ajax({
            type: 'POST',
            url: 'https://wolfpeoplekill.azurewebsites.net/api/UserRegister/postwin',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(postemail),
            success: function (msg) {
                obj = msg;
                //alert(postwin);           
            }
        });
        $('.title').empty();
        $('.title').append(`目前總積分: ${postwin}`)
        
        
        prize = -1;
        jumps = 0;
    }
    else {
        // 還沒進入關鍵抽獎階段前的速度 (前菜轉特效)
        if (jumps < minimum_jumps) {
            speed -= 5; // 加快
            //決定獎品的位置
        } else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
            //下一個就是獎品時放慢鈍一下
            if ((jumps > minimum_jumps + 10) && prize === (current_index + 1)) {
                speed += 600;
            } else {
                speed += 20; // 減速
            }
        }
        if (speed < 40) {
            speed = 40;
        }

        timer = setTimeout(controllSpeed, speed);
    }
}

function init() {
    jumps = 0;
    speed = 100;
    prize = -1;
    controllSpeed();
    $('#js-start').off('click');//第二次不能在按抽獎
    $('#js-start').css({ "background": "#CCCC99" });
    $('#js-start').css({ "color": "#000000" });
    $('.wolf').addClass('blackwolf');
}

var arry;
$(document).ready(() => {
    $('#js-start').on('click', init);
    let emailData =
    {
        email: email
    }
    $.ajax({
        type: 'POST',
        url: 'https://wolfpeoplekill.azurewebsites.net/api/UserRegister/GetWin',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(emailData),
        success: function (msg) {
            arry = msg;
            //alert(arry[0].win);
            getwin = arry[0].win;
            $('.title').append(`目前總積分: ${getwin}`);
        }
    });
});

// background
var colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

var step = 0;
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {

    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";


    $('body').css({
        background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    }).css({
        background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

    }
}

setInterval(updateGradient, 10);

