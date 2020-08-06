var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

var roomId = 1;
var id;
var account = "oo";
var PersonInroom;

$('#addd').click(function () {
    connection.invoke("CreateRoom", roomId, account).then(function (response) {
        if (response.success) {
            id = response.data;
            console.log(`roomID=${myroomid}`);
        }
    });
});

var data = [{
    "RoomId": 1,
    "Account": "oo",
    "isAlive": true
}]

$('#People_Die').click(function () {
    connection.invoke("PeopleResurrection", data).then(function (res) {
        debugger;
        alert(res)
    })
})
$('#JoinRoom').click(function () {
    debugger;
    connection.invoke("JoinRoom",1,"AAA").then(function (response) {
        if (response.success) {
            response.data.forEach(item => {
                console.log(item);
            });
        }
    })
})
$('#OutToRoom').click(function () {
    debugger;
    connection.invoke("OutToRoom", 1, "AAA").then(function (response) {
        if (response.success) {
            response.data.forEach(item => {
                console.log(item);
            });
        }
    })
})

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


//AJAX玩家職業資料
var players = [
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/4eJqZgk.png",
        "occupationId": 8,
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/D2o6MV6.png",
        "occupationId": 9,
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "預言家",
        "imgUrl": "https://i.imgur.com/8tiIFAB.png",
        "occupationId": 4,
        "description": "神職。每夜可以查驗一位存活玩家的所屬陣營，並在白天透過發言向好人報出資訊。",
        "isGood": true,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "女巫",
        "imgUrl": "https://i.imgur.com/i9eRyug.png",
        "occupationId": 5,
        "description": "神職。擁有一瓶解藥和一瓶毒藥。解藥未使用時可以得知狼人的殺害對象，並決定是否救這一位玩家。然而，解藥全程不能用於解救自己。女巫也可以利用白天所得資訊，將懷疑的對象毒殺，該對象死後不能發動技能。解藥和毒藥不可以在同一夜使用。",
        "isGood": true,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "狼王",
        "imgUrl": "https://i.imgur.com/fVQQgnM.png",
        "occupationId": 1,
        "description": "又稱「狼槍」、「毒狼」。除殉情或被毒殺外，以任何其他方式被淘汰時可以發動技能帶走任何一位玩家。狼王在場時，獵人和黑狼王淘汰啟動技能均不公布角色牌。部分局式中，黑狼王自爆不能發動技能。",
        "isGood": false,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "狼人",
        "imgUrl": "https://i.imgur.com/n7knadr.png",
        "occupationId": 2,
        "description": "黑夜可以睜眼與隊友見面並討論戰術與選擇殺害對象。狼人可以選擇當夜不殺害任何玩家（空刀）或自殺（自刀）。白天混入村落中混淆好人。狼人可以在白天任何時候選擇公布角色牌自我淘汰（自爆）強制進入黑夜階段，並在黑夜階段結束時離場。",
        "isGood": false,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "獵人",
        "imgUrl": "https://i.imgur.com/TIvcUG5.png",
        "occupationId": 6,
        "description": "神職。除殉情或被毒殺外，以任何其他方式被淘汰時可以公布角色牌發動技能開槍帶走一位玩家，亦可以選擇壓槍不發動技能。",
        "isGood": true,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/D2o6MV6.png",
        "occupationId": 10,
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "村民",
        "imgUrl": "https://i.imgur.com/4eJqZgk.png",
        "occupationId": 7,
        "description": "沒有特殊技能，黑夜階段全程閉眼，透過白天階段所得資訊投票放逐疑似狼人的玩家。",
        "isGood": true,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
    },
    {
        "name": "狼人",
        "imgUrl": "https://i.imgur.com/n7knadr.png",
        "occupationId": 3,
        "description": "黑夜可以睜眼與隊友見面並討論戰術與選擇殺害對象。狼人可以選擇當夜不殺害任何玩家（空刀）或自殺（自刀）。白天混入村落中混淆好人。狼人可以在白天任何時候選擇公布角色牌自我淘汰（自爆）強制進入黑夜階段，並在黑夜階段結束時離場。",
        "isGood": false,
        "roomId": 0,
        "player": "",
        "isAlive": true,
        "playerPic": null
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
    playerImg.setAttribute('class', 'playerphoto');
    dead.setAttribute('src', 'https://i.imgur.com/OapUq4K.png');
    dead.setAttribute('class', 'deadimg');
    Circle.setAttribute('class', 'circleImg off');
    playerImg.setAttribute('onclick', `vote(${array})`);
    Circle.appendChild(dead);
    //死掉顯示下面的
    dead.setAttribute('style', 'display:none');
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
    playerImg.setAttribute('onclick', `vote(${array})`);
    Circle.appendChild(dead);
    //死掉顯示下面的
    dead.setAttribute('style', 'display:none');
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
            $(this).css({ "overflow-y": "hidden" }); //滑鼠離開
        }
    });
    //滾輪
    $(".leftgamerecord").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
        if (event.type == "mouseenter") {
            $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
        } else {
            $(this).css({ "overflow-y": "hidden" }); //滑鼠離開
        }
    });
    //滾輪
    $(".rightgamerecord").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
        if (event.type == "mouseenter") {
            $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
        } else {
            $(this).css({ "overflow-y": "hidden" }); //滑鼠離開
        }
    });
    //< !--當我按下x時要去加入css動畫 -->
    $('#close').click(function () {
        $('.img-spin').css("animation-name", " spin")
        $('.img-spin').css("animation-timing-function", " linear")
        $('.img-spin').css("animation-duration", " 1s")
        var tt = document.styleSheets[0];
        tt.insertRule("@keyframes spin {0 % { transform: rotateY(0deg); } 25% {transform: rotateY(360deg); } 50% {transform: rotateY(0deg); } 75% {transform: rotateY(360deg); }}", 9);//寫入樣式      

    });
    $('#closebtn').click(function () {
        $('.img-spin').css("animation-name", " spin")
        $('.img-spin').css("animation-timing-function", " linear")
        $('.img-spin').css("animation-duration", " 1s")
        var tt = document.styleSheets[0];
        tt.insertRule("@keyframes spin {0 % { transform: rotateY(0deg); } 25% {transform: rotateY(360deg); } 50% {transform: rotateY(0deg); } 75% {transform: rotateY(360deg); }}", 9);//寫入樣式      

    });

}

//玩家資料
var myName='ma@gmail.com';
var myAlive;
var myJob;
var myroomid = 1;
let ary;
async function playerHead() {
    roomid = localStorage.getItem("roomid");
    let obj = [{
        //"roomId": roomid,
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

//投票
var voteResult;
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
    voteResult = a;
}

var prepareDead;
//投票回傳
function voteBack() {
    var backVoteResult = [{
        "RoomID": myroomid,
        "User": myName,
        "Vote": `${voteResult}`,
        "voteResult": null
    }];
    connection.invoke("Vote", backVoteResult).then(function (response) { });
}

//取投票結果
function getVoteResult() {
    connection.invoke("VoteResult", myroomid).then(function (res) {
        prepareDead = res.data[0].vote;
        console.log(`${res.data[0].vote}號死`);
    });
}

//確認死亡
function deadConfirm() {
    var backDeadResult = [{
        "RoomID": myroomid,
        "User": prepareDead
    }]

}

//查詢是哪個玩家及好或壞人
function PlayerIsGood(e) {
    let Player = e.getAttribute('value');
    let IsGood = players[Player - 1].isGood;
    if (IsGood) { IsGood = "好人" }
    else { IsGood = "壞人" }
    $('#rightgamerecordli').append(`<li>${Player}號是${IsGood}</li>`);
    $('.findperson').css("display", "none")
    $('.circleImg').css("pointer-events", "none");
    $('.on').css("box-shadow", "none")
}


var PersonInroom;
//抓房間人數
function GetPersonInroom() {
    connection.invoke("GetAllRoom").then(function (response) {
        if (response.success) {
            response.data.forEach(item => {
                if (item.roomId == myroomid) { PersonInroom = item.count; }
                else { alert('no')}
            });
        }
     })
}

//離開房間
function LeaveRoom() {
    PersonInroom = 0;
    GetPersonInroom();
    if (PersonInroom <2 ) {
        DeleteRoom();
    }
    //自己從房間移除
    //連到房間畫面
};

//刪除房間
function DeleteRoom() {
    connection.invoke("RemoveRoom", myroomid).then(function (response) {
        if (response.success) {
        }
    });
}




//以下開始遊戲






function wolf() {
    //if (myJob == "狼人" || myJob == "狼王" && myAlive == true) { }
    $('.circleImg').css("pointer-events", "auto");
    $("body").css("cursor", "url('/Images/paw.jpg') 45 45, auto");
}
function prophet() {
    //if (myJob == "預言家" && myAlive == true) { }
    $('.circleImg').css("pointer-events", "auto");
    $("body").css("cursor", "url('/Images/search.jpg') 45 45, auto")
    $('.circleImg').append(` <div class="findperson" onclick="PlayerIsGood(this)" ></div>`);
    document.querySelectorAll('.findperson').forEach(function (element, index) {
        element.setAttribute('value', index+1);
    });
}
function witch() {
    let saveOrDead = prepareDead;
    //if (myJob == "女巫" && myAlive == true) { }
    $("body").css("cursor", "url('/Images/poison.jpg') 45 45, auto");
    $('.circleImg').css("pointer-events", "auto");
    $('#rightgamerecordli').append(`
     <li>${prepareDead}號被殺死了你要救他們嗎?
     <div class="btn-group btn-group-toggle" data-toggle="buttons"> 
    <label class="btn btn-secondary">
      <input type="radio" name="options" id="saveDead" autocomplete="off"> 是
    </label>
    <label class="btn btn-secondary">
      <input type="radio" name="options" id="noSaveDead" autocomplete="off"> 否
    </label>
  </div>
  </li>`);
    $('#saveDead').click(function () { prepareDead = null; console.log(prepareDead); });
    $('#noSaveDead').click(function () { prepareDead = saveOrDead; console.log(prepareDead); });
}
function hunter() {
    //if (myJob == "獵人" && myAlive == true) { }
    $("body").css("cursor", "url('/Images/gun.jpg') 45 45, auto");
}


async function game() {

    $('#staticBackdrop').modal('show');
    $('.circleImg').css("pointer-events", "none");
    $('.on').css("box-shadow","none")
    await timeOn(5);


    Speak('請確認你的身分，遊戲將於倒數完後開始');
    await timeOn(10);

    voteResult = null;
    $('#toggleDark').click();
    Speak('天黑請閉眼，狼人請殺人');
    wolf();
    await timeOn(10);
    $('.circleImg').css("pointer-events", "none");
    $('.on').css("box-shadow", "none")
    voteBack();
    getVoteResult();

    voteResult = null;
    Speak('預言家請選擇玩家查身分');
    prophet();
    await timeOn(10);
    $('.findperson').css("display", "none")
    $('.circleImg').css("pointer-events", "none");
    $('.on').css("box-shadow", "none")
    $('#rightgamerecordli li').remove();


    voteResult = null;
    Speak('此玩家死亡，女巫是否救人');
    witch();
    await timeOn(10);
    Speak('女巫是否殺人');
    await timeOn(10);
    $('#rightgamerecordli li').remove();
    $('.circleImg').css("pointer-events", "none");
    $('.on').css("box-shadow", "none")
    //deadConfirm();
    console.log(voteResult);


    //確認死亡
    $("body").css("cursor", "default");
    $('#toggleDark').click();
    //判斷輸贏
    Speak('天亮請睜眼 昨晚某某某死了 幫哭哭');
    await timeOn(5);

    //if(某某某是 獵人){ if(自己是獵人) {獵人請選擇要帶走幾號玩家} }
    //if(某某某是 狼王){ if(自己是狼王) {狼王請選擇要帶走幾號玩家} }
    //await timeOn(10);
    //voteBack();
    //getVoteResult();


    Speak('輪流發言時間');
    for (let i = 0; i < players.length; i++) {
        document.getElementById("PeoplesendButton").hidden = true;
        if (players[i].player == myName) {
            document.getElementById("PeoplesendButton").hidden = false;
        }
        Speak(`${i + 1}號玩家發言`);
        await timeOn(5);
    }



    Speak('所有玩家投票，得票最高者將出局');
    $('.circleImg').css("pointer-events", "auto");
    await timeOn(10);
    voteBack();
    getVoteResult();
    $('.circleImg').css("pointer-events", "none");
    $('.on').css("box-shadow", "none")
    //判斷輸贏

}


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