const prizes = {
    0: "30 積分👛",
    1: "100 積分💰",
    2: "1 積分💲",
    3: "50 積分🤑",
    4: "1 積分💲",
    5: "30 積分👛",
    6: "1 積分💲",
    7: "下次再來💸",

};
const total_items = 8;
const minimum_jumps = 30; // 超過這數字開始進入抽獎
let current_index = -1;
let jumps = 0;
let speed = 30;
let timer = 0;
let prize = -1;

function runCircle() {
    $(`[data-order="${current_index}"]`).removeClass('is-active');

    current_index += 1;

    if (current_index > total_items - 1) {
        current_index = 0;
    }

    $(`[data-order="${current_index}"]`).addClass('is-active');
}

function generatePrizeNumber() {
    return Math.floor(Math.random() * total_items);
}



function controllSpeed() {
    jumps += 1;
    runCircle();
    // 1. 抽到獎品停止遊戲
    if (jumps > minimum_jumps + 10 && prize === current_index) {
        clearTimeout(timer);
        if (current_index == 7) {
            swal({
                title: '真可惜QQ',
                text: `${prizes[current_index]}`,
                icon: 'error',
                button: "返回房間列表",
            }).then(function () {
                window.location.href = "http://werewolfkill.azurewebsites.net/Html/Room.html"
            });;
        }
        else {
            swal({
                title: '恭喜你!!',
                text: `得到 ${prizes[current_index]}`,
                icon: 'success',
                button: "返回房間列表",
            }).then(function () {
                window.location.href = "http://werewolfkill.azurewebsites.net/Html/Room.html"
            });
        }
        
        
        prize = -1;
        jumps = 0;
        // 2. 還沒抽繼續跑
    }
    else {
        // 還沒進入關鍵抽獎階段前的速度 (前菜轉特效)
        if (jumps < minimum_jumps) {
            speed -= 5; // 加快
            // 決定獎品的位置
        } else if (jumps === minimum_jumps) {
            const random_number = generatePrizeNumber();
            prize = random_number;
        } else {
            // 下一個就是獎品時放慢鈍一下
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
    $('#js-start').off('click');
    $('#js-start').css({ "background": "#CCCC99" });
    $('#js-start').css({ "color": "#000" });
}

$(document).ready(() => {
    $('#js-start').on('click', init);
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
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
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

    // $('#gradient').css({
    //     background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
    // }).css({
    //     background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
    // });

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