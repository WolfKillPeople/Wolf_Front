var synth = window.speechSynthesis;
var voices = [];
//旁白說話
function Speak(txtInput) {
    var toSpeak = new SpeechSynthesisUtterance(txtInput);
    var selectedVoiceName = 'Google 國語（臺灣）';
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
};

//時間倒數
function timeOn(time, mission) {
    return new Promise((resolve, reject) => {
        var count = time;
        var totaltime = time;
        myCounter = setInterval(function () {
            count--;
            $('#time').html(padLeft(count.toString(), 2));
            update(count, totaltime);

            if (count > 0) {
                mission();
            }
            else {
                clearInterval(myCounter);
                var disableAll = document.querySelectorAll('button');
                disableAll.forEach(element => {
                    element.disabled = true;
                });
                resolve();
            }
        }, 1000);
    });
}
function padLeft(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return padLeft("0" + str, lenght);
}
function update(percent, totaltime) {
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

//AJAX玩家資料
var players = [
    {
        "name": "狼人",
        "imgUrl": "https://i.imgur.com/n7knadr.png",
        "description": "黑夜可以睜眼與隊友見面並討論戰術與選擇殺害對象。狼人可以選擇當夜不殺害任何玩家（空刀）或自殺（自刀）。白天混入村落中混淆好人。狼人可以在白天任何時候選擇公布角色牌自我淘汰（自爆）強制進入黑夜階段，並在黑夜階段結束時離場。",
        "isGood": false,
        "roomId": 1,
        "player": "string",
        "alive": false
    },
    {
        "name": "獵人",
        "imgUrl": "https://i.imgur.com/TIvcUG5.png",
        "description": "神職。除殉情或被毒殺外，以任何其他方式被淘汰時可以公布角色牌發動技能開槍帶走一位玩家，亦可以選擇壓槍不發動技能。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "alive": true
    },
    {
        "name": "女巫",
        "imgUrl": "https://i.imgur.com/i9eRyug.png",
        "description": "神職。擁有一瓶解藥和一瓶毒藥。解藥未使用時可以得知狼人的殺害對象，並決定是否救這一位玩家。然而，解藥全程不能用於解救自己。女巫也可以利用白天所得資訊，將懷疑的對象毒殺，該對象死後不能發動技能。解藥和毒藥不可以在同一夜使用。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "alive": false
    },
    {
        "name": "預言家",
        "imgUrl": "https://i.imgur.com/8tiIFAB.png",
        "description": "神職。每夜可以查驗一位存活玩家的所屬陣營，並在白天透過發言向好人報出資訊。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "alive": true
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/D2o6MV6.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "alive": false
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/4eJqZgk.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "alive": true
    },
    {
        "name": "狼王",
        "imgUrl": "https://i.imgur.com/fVQQgnM.png",
        "description": "又稱「狼槍」、「毒狼」。除殉情或被毒殺外，以任何其他方式被淘汰時可以發動技能帶走任何一位玩家。狼王在場時，獵人和黑狼王淘汰啟動技能均不公布角色牌。部分局式中，黑狼王自爆不能發動技能。",
        "isGood": false,
        "roomId": 1,
        "player": "",
        "alive": true
    },
    {
        "name": "狼人",
        "imgUrl": "https://i.imgur.com/n7knadr.png",
        "description": "黑夜可以睜眼與隊友見面並討論戰術與選擇殺害對象。狼人可以選擇當夜不殺害任何玩家（空刀）或自殺（自刀）。白天混入村落中混淆好人。狼人可以在白天任何時候選擇公布角色牌自我淘汰（自爆）強制進入黑夜階段，並在黑夜階段結束時離場。",
        "isGood": false,
        "roomId": 1,
        "player": "string",
        "alive": true
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/D2o6MV6.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "alive": true
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/4eJqZgk.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "alive": true
    }
];

//玩家頭像生成
async function BindingPlayers() {
var array = [];
for (let i = 0; i < players.length / 2; i++) {
    array.push(i + 1);
    for (let j = 1; j <= players.length; j++) {
        if (j != i + 1) { array.push(j); }
    }
    let aplayer = document.createElement('a');
    let playerImg = document.createElement('img');
    let dead = document.createElement('img');
    let num = document.createElement('span');
    let Circle = document.createElement('div');
    num.innerHTML = i + 1;
    num.setAttribute('class', 'number');
    aplayer.setAttribute('class', 'playerimg')
    aplayer.setAttribute('href', '#');
    playerImg.setAttribute('src', players[i].imgUrl);
    playerImg.setAttribute('class', 'playerphoto')
    dead.setAttribute('src', 'https://i.imgur.com/OapUq4K.png');
    dead.setAttribute('class', 'deadimg')
    Circle.setAttribute('class', 'circleImg off');
    Circle.appendChild(playerImg);
    aplayer.appendChild(Circle);
    aplayer.appendChild(num);
    document.querySelector('.top-playerimg').appendChild(aplayer);
    array = [];
}
var array = [];
for (let i = players.length / 2; i <= players.length; i++) {
    array.push(i + 1);
    for (let j = 1; j <= players.length; j++) {
        if (j != i + 1) { array.push(j); }
    }
    let aplayer = document.createElement('a');
    let playerImg = document.createElement('img');
    let dead = document.createElement('img');
    let num = document.createElement('span');
    let Circle = document.createElement('div');
    num.innerHTML = i + 1;
    num.setAttribute('class', 'number');
    aplayer.setAttribute('class', 'playerimg')
    aplayer.setAttribute('href', '#');
    playerImg.setAttribute('src', players[i].imgUrl);
    playerImg.setAttribute('class', 'playerphoto')
    dead.setAttribute('src', 'https://i.imgur.com/OapUq4K.png');
    dead.setAttribute('class', 'deadimg')
    Circle.setAttribute('class', 'circleImg off');
    Circle.appendChild(playerImg);
    aplayer.appendChild(Circle);
    aplayer.appendChild(num);
    document.querySelector('.footer-playerimg').appendChild(aplayer);
    array = [];
    }
}

//雜物生成
async function BindingThings() {
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
}
//玩家職業
let ary;
async function playerHead() {
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
            ary = response;
            Binding();
            console.log(ary);
        }
    });
}
function Binding() {
    console.log('Binding');
    console.log(ary);
    var profession = new Vue({
        el: "#describe",
        data: { items: ary[0] },
    });
}




















var wolf = function wolf() {

}
var witch = function witch() {

}
var prophet = function prophet() {

}
var hunter = function hunter() {

}
let c = [wolf, witch, prophet, hunter];
let whos = ['天黑請閉眼，狼人請殺人', '此玩家死亡，女巫是否救人', '預言家請選人查身分', '11651'];
async function asyncArray() {
    $('#staticBackdrop').modal('show');
    await timeOn(3);
    Speak('講話');
    for (var i = 0; i <= c.length; i++) {
        Speak(whos[i])
        await timeOn(10, c[i]);
    }
}
window.onload = function () {
    //AJAX玩家資料
    BindingPlayers();
    playerHead();
    BindingThings;
    asyncArray();
}
