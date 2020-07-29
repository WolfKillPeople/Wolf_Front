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
    //將陣列的最後一個打到li裡
    var li = document.createElement('li');
    li.innerText = txtInput;
    document.querySelector('#leftgamerecordli').appendChild(li);
};
//滾輪
$(".leftgamerecord").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
    if (event.type == "mouseenter") {
        $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
    } else {
        $(this).scrollTop(0).css({ "overflow-y": "hidden" }); //滑鼠離開
    }
});
//時間倒數
function timeOn(time) {
    return new Promise((resolve, reject) => {
        var count = time;
        var totaltime = time;
        myCounter = setInterval(function () {
            count--;
            $('#time').html(padLeft(count.toString(), 2));
            update(count, totaltime);
            if (count > 0) {
            }
            else {
                clearInterval(myCounter);
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

var x = document.getElementById("MorningAudio");
var y = document.getElementById("NightAudio");
//音效
function morningAudio() {
    x.play();
    x.volume = 0.2;
    y.pause();
}
function nightAudio() {
    y.play();
    y.volume = 0.2;
    x.pause();
} 

//背景夜晚白天轉換
let toggle = document.getElementById('toggleDark');
toggle.addEventListener('click', toggleScheme, true);
let image = document.querySelector('.image'); 
function closeMessage() {
    document.getElementById("PeopleuserInput").hidden = true;
    document.getElementById("PeoplemessageInput").hidden = true;
    document.getElementById("WolfuserInput").hidden = true;
    document.getElementById("WolfmessageInput").hidden = true;
    document.getElementById("PeoplesendButton").hidden = true;
    document.getElementById("WolfsendButton").hidden = true;
}

function toggleScheme() {
    if (toggle.getAttribute("aria-checked") == "true") {
        toggle.setAttribute("aria-checked", "false");
        document.getElementById("PeoplemessagesList").hidden = false;
        document.getElementById("Day").value = "白天";
        morningAudio();
        document.getElementById("WolfmessagesList").innerHTML = "";
        document.getElementById("WolfmessagesList").hidden = true;
        document.getElementById("PeopleuserInput").hidden = false;
        document.getElementById("PeoplemessageInput").hidden = false;
        document.getElementById("WolfuserInput").hidden = true;
        document.getElementById("WolfmessageInput").hidden = true;
        document.getElementById("PeoplesendButton").hidden = false;
        document.getElementById("WolfsendButton").hidden = true;
    } else if (toggle.getAttribute("aria-checked") == "false") {
        toggle.setAttribute("aria-checked", "true");
        document.getElementById("PeoplemessagesList").hidden = false;
        document.getElementById("Day").value = "黑夜";
        nightAudio();
        document.getElementById("WolfuserInput").hidden = false;
        document.getElementById("WolfmessageInput").hidden = false;
        document.getElementById("PeopleuserInput").hidden = true;
        document.getElementById("PeoplemessageInput").hidden = true;
        document.getElementById("WolfsendButton").hidden = false;
        document.getElementById("PeoplesendButton").hidden = true;
    }
    image.classList.toggle('image-dark')
    image.classList.toggle('image-light')
}

//投票
function vote(a, b, c, d, e, f, g, h, i, j) {
    document.getElementById("touxiang").getElementsByClassName('circleImg')[a - 1].className = "circleImg on";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[b - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[c - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[d - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[e - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[f - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[g - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[h - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[i - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[j - 1].className = "circleImg off";
    console.log(a);
    //let backChoose = [false, false, false, false, false, false, false, false, false, false];
    //backChoose[a - 1] = true;
    //voteBack(backChoose);
}
//投票回傳
//function voteBack(backChoose) {
//    $.ajax({
//        type: "post",
//        url: "",
//        data: JSON.stringify(backChoose),
//        dataType: 'JSON',
//        headers: {
//            'Content-type': 'application/json'
//        },
//        success: function (response) {
//            console.log('OK');
//        }
//    });
//}

//AJAX玩家資料
var players = [
    {
        "name": "狼人",
        "imgUrl": "https://i.imgur.com/n7knadr.png",
        "description": "黑夜可以睜眼與隊友見面並討論戰術與選擇殺害對象。狼人可以選擇當夜不殺害任何玩家（空刀）或自殺（自刀）。白天混入村落中混淆好人。狼人可以在白天任何時候選擇公布角色牌自我淘汰（自爆）強制進入黑夜階段，並在黑夜階段結束時離場。",
        "isGood": false,
        "roomId": 1,
        "player": "string",
        "isAlive": false
    },
    {
        "name": "獵人",
        "imgUrl": "https://i.imgur.com/TIvcUG5.png",
        "description": "神職。除殉情或被毒殺外，以任何其他方式被淘汰時可以公布角色牌發動技能開槍帶走一位玩家，亦可以選擇壓槍不發動技能。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "isAlive": true
    },
    {
        "name": "女巫",
        "imgUrl": "https://i.imgur.com/i9eRyug.png",
        "description": "神職。擁有一瓶解藥和一瓶毒藥。解藥未使用時可以得知狼人的殺害對象，並決定是否救這一位玩家。然而，解藥全程不能用於解救自己。女巫也可以利用白天所得資訊，將懷疑的對象毒殺，該對象死後不能發動技能。解藥和毒藥不可以在同一夜使用。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "isAlive": false
    },
    {
        "name": "預言家",
        "imgUrl": "https://i.imgur.com/8tiIFAB.png",
        "description": "神職。每夜可以查驗一位存活玩家的所屬陣營，並在白天透過發言向好人報出資訊。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "isAlive": true
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/D2o6MV6.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "isAlive": false
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/4eJqZgk.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "isAlive": true
    },
    {
        "name": "狼王",
        "imgUrl": "https://i.imgur.com/fVQQgnM.png",
        "description": "又稱「狼槍」、「毒狼」。除殉情或被毒殺外，以任何其他方式被淘汰時可以發動技能帶走任何一位玩家。狼王在場時，獵人和黑狼王淘汰啟動技能均不公布角色牌。部分局式中，黑狼王自爆不能發動技能。",
        "isGood": false,
        "roomId": 1,
        "player": "",
        "isAlive": true
    },
    {
        "name": "狼人",
        "imgUrl": "https://i.imgur.com/n7knadr.png",
        "description": "黑夜可以睜眼與隊友見面並討論戰術與選擇殺害對象。狼人可以選擇當夜不殺害任何玩家（空刀）或自殺（自刀）。白天混入村落中混淆好人。狼人可以在白天任何時候選擇公布角色牌自我淘汰（自爆）強制進入黑夜階段，並在黑夜階段結束時離場。",
        "isGood": false,
        "roomId": 1,
        "player": "string",
        "isAlive": true
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/D2o6MV6.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "isAlive": true
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/4eJqZgk.png",
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 1,
        "player": "string",
        "isAlive": true
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
    if (players[i].isAlive) { playerImg.setAttribute('onclick', `vote(${array})`); }
    else { Circle.appendChild(dead); }
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
    if (players[i].isAlive) { playerImg.setAttribute('onclick', `vote(${array})`); }
    else { Circle.appendChild(dead); }
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
        }
    });
}
var myName;
var myAlive;
var myJob;
function Binding() {
    myName = localStorage.getItem("myName");
    players.forEach(element => {
        if (element.player == myName) {
            myAlive=this.isAlive;
            myJob = this.name;
            let jobPhoto = this.imgUrl;
        }
    });
    var profession = new Vue({
        el: "#describe",
        data: { items: ary[0] },
    });
}






//以下開始遊戲






function wolf() {
    //if (myJob == "狼人" || myJob == "狼王") { }
    $('.circleImg').css("pointer-events", "auto")
    $("body").css("cursor", "url('/Images/paw.jpg') 45 45, auto")
}
function prophet() {
    //if (myJob == "預言家") { }
    $("body").css("cursor", "url('/Images/search.jpg') 45 45, auto")

    var li = document.createElement('li');
    li.innerHTML = "4號是好人";
    document.querySelector('#rightgamerecordli').appendChild(li);
    $('.circleImg').append(` <div class="findperson" ></div>`);
}
function witch() {
    //if (myJob == "女巫") { }
    $('#rightgamerecordli').append(`
<li>4號被殺死了你要救他們嗎?
  <div class="btn-group btn-group-toggle" data-toggle="buttons"> 
    <label class="btn btn-secondary">
      <input type="radio" name="options" id="option2" autocomplete="off"> 是
    </label>
    <label class="btn btn-secondary">
      <input type="radio" name="options" id="option3" autocomplete="off"> 否
    </label>
  </div>
  </li>`)
    //var li = document.createElement('li');
    //li.innerHTML = "4號被殺死了你要救他們嗎?";
    ////外面的div
    //var yesnodiv = document.createElement('div')
    //yesnodiv.setAttribute('class', 'btn-group btn-group-toggle')
    //yesnodiv.setAttribute('data-toggle', 'buttons')
    //li.appendChild(yesnodiv)
    ////是的按鈕
    //var yeslabel = document.createElement('label')
    //var yesinput = document.createElement('input')
    //yeslabel.setAttribute('class','btn btn-secondary')
    //yesinput.setAttribute('type', 'radio')
    //yesinput.setAttribute('name', 'options')
    //yesinput.setAttribute('id', 'option2')
    //var yes = document.createTextNode("是");
    //yeslabel.appendChild(yes)
    //yeslabel.appendChild(yesinput)
    //yesnodiv.appendChild(yeslabel)
    ////否的按鈕
    //var nolabel = document.createElement('label')
    //var noinput = document.createElement('input')
    //nolabel.setAttribute('class', 'btn btn-secondary')
    //noinput.setAttribute('type', 'radio')
    //noinput.setAttribute('name', 'options')
    //noinput.setAttribute('id', 'option2')
    //var no = document.createTextNode("否");
    //nolabel.appendChild(no)
    //nolabel.appendChild(noinput)
    //yesnodiv.appendChild(nolabel)
    //var yesbtn = document.createElement("BUTTON");
    //var nobtn = document.createElement("BUTTON");
 
    //yesbtn.appendChild(yes);
    //nobtn.appendChild(no);
    //li.appendChild(yesbtn)
    //li.appendChild(nobtn)
    //yesbtn.setAttribute('class', 'yesbtn');
    //nobtn.setAttribute('class', 'nobtn');
    //document.querySelector('#rightgamerecordli').appendChild(li);

    $("body").css("cursor", "url('/Images/poison.jpg') 45 45, auto")
}
function hunter() {
    //if (myJob == "獵人") { }
    $("body").css("cursor", "url('/Images/gun.jpg') 45 45, auto")
}
//滾輪
$(".rightgamerecord").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
    if (event.type == "mouseenter") {
        $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
    } else {
        $(this).scrollTop(0).css({ "overflow-y": "hidden" }); //滑鼠離開
    }
});

let roundSound = ['天黑請閉眼，狼人請殺人', '預言家請選人查身分', '此玩家死亡，女巫是否救人', '天亮請睜眼'];

async function game() {

    $('#staticBackdrop').modal('show');
    $('.circleImg').css("pointer-events", "none")
    await timeOn(10);


    Speak('我是測試版，請確認你的身分，遊戲將於倒數完後開始');
    await timeOn(10);


    $('#toggleDark').click();
    Speak('天黑請閉眼，狼人請殺人');
    wolf();
    await timeOn(10);
    //回傳投票結果

    Speak('預言家請選擇玩家查身分');
    prophet();
    await timeOn(10);

    Speak('此玩家死亡，女巫是否救人，是否殺人');
    witch();
    await timeOn(10);
    //回傳投票結果

    //抓誰死了
    $("body").css("cursor", "default")
    $('#toggleDark').click();
    //判斷輸贏
    Speak('天亮請睜眼 昨晚某某某死了 幫哭哭');
    await timeOn(5);

    //if(某某某是 獵人){ if(自己是獵人) {獵人請選擇要帶走幾號玩家} }
    //if(某某某是 狼王){ if(自己是狼王) {狼王請選擇要帶走幾號玩家} }
    await timeOn(10);
    //回傳投票結果
    Speak('玩家發言時間');

    Speak('1到10號玩家發言');

    Speak('所有玩家投票，得票最高者將出局');
    //判斷輸贏

    $('#toggleDark').click();
    Speak('天黑請閉眼，狼人請殺人');
    wolf();
    await timeOn(10);
    //回傳投票結果

    Speak('預言家請選擇玩家查身分');
    prophet();
    await timeOn(10);
}

  //< !--當我按下x時要去加入css動畫 -->
$('#close').click(function () {
        $('.img-spin').css("animation-name", " spin")
   $('.img-spin').css("animation-timing-function"," linear")
   $('.img-spin').css("animation-duration"," 1s")
   var tt=document.styleSheets[0];
                tt.insertRule("@keyframes spin {0 % { transform: rotateY(0deg); } 25% {transform: rotateY(360deg); } 50% {transform: rotateY(0deg); } 75% {transform: rotateY(360deg); }}",9);//寫入樣式      

   });
$('#closebtn').click(function () {
    $('.img-spin').css("animation-name", " spin")
    $('.img-spin').css("animation-timing-function", " linear")
    $('.img-spin').css("animation-duration", " 1s")
    var tt = document.styleSheets[0];
    tt.insertRule("@keyframes spin {0 % { transform: rotateY(0deg); } 25% {transform: rotateY(360deg); } 50% {transform: rotateY(0deg); } 75% {transform: rotateY(360deg); }}", 9);//寫入樣式      

});
    //AJAX玩家資料
    BindingPlayers();
    playerHead();
    BindingThings();
    closeMessage()
    game();

//let _array;
//async function DeadUpdate() {
//    let _obj = [
//        {
//            "roomId": 10,
//            "player": "AQ1234@gmail.com",
//            "isAlive": true,
//        },
//        {
//            "roomId": 10,
//            "player": "Text002@gmail.com",
//            "isAlive": true,
//        },
//        {
//            "roomId": 10,
//            "player": "ttt@gmail.com",
//            "isAlive": true,
//        },
//        {
//            "roomId": 10,
//            "player": "test001@gmail.com",
//            "isAlive": true,
//        },
//        {
//            "roomId": 10,
//            "player": "Text001@gmail.com",
//            "isAlive": true,
//        },
//        {
//            "roomId": 10,
//            "player": "AQ123@gmail.com",
//            "isAlive": true,
//        }, {
//            "roomId": 10,
//            "player": "Aaaaassss@gmail.com",
//            "isAlive": true,
//        },
//        {
//            "roomId": 10,
//            "player": "wolf@gmail.com",
//            "isAlive": true,
//        }, {
//            "roomId": 10,
//            "player": "jou@gmail.com",
//            "isAlive": true,
//        },
//        {
//            "roomId": 10,
//            "player": "Aaaaassss2@gmail.com",
//            "isAlive": true,
//        },
//    ]
//    $.ajax({
//        type: "patch",
//        url: "https://wolfpeoplekill.azurewebsites.net/api/Game/PatchCurrentPlayer",
//        data: JSON.stringify(_obj),
//        dataType: 'JSON',
//        headers: {
//            'Content-type': 'application/json'
//        },
//        success: function (response) {

//            _array = response;
//            console.log(_array);

//            Binding();
//        }
//    });
//}