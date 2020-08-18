//signalr監聽
var deadLis = '';
var deadNum = [];
var players;
//玩家資料
var myName = 'wdqdw@gmail.com';
var myAlive;
var myJob;
var myroomid = 1;
var myJobInfo;
var PersonInroom;
var gameResult;
function signalrListener() {
    //玩家死亡
    connection.on("PeopleDie", function (message) {
        let allHead = document.querySelectorAll('.deadimg');
        for (let i = 0; i < players.length; i++) {
            if (myName == message) {
                myAlive = false;}
            if (players[i].account == message) {
                allHead[i].setAttribute('style', 'display:flex');
                deadLis = deadLis + `${i + 1}號`;
                deadNum.push(i);
                players[i].isAlive = false;
                //死掉特效
                $('.image').hide();
                bloodAppend(deadLis);
                //血的特效
                gsap.to("#dietransition", 1, { opacity: 1, y: 200, ease: Elastic.easeOut });
                gsap.to("#dietransition", 1, { delay: 2, y: 1500, ease: Power3.easeInOut });
            }
        }
    });

    connection.on("NewRoom", function (message, temp) {
    });

    connection.on("VoteResult", function (message) {
        prepareDead = message[0].vote;
    });

    connection.on("GetRole",
        function (response) {
            players = response;
            console.log(players);
            //myName = localStorage.getItem("myName");
            players.forEach(element => {
                if (element.account == myName) {
                    myAlive = element.isAlive;
                    myJob = element.name;
                    myJobInfo = element;
                }
            });
            Binding();
            BindingPlayers();
            BindingThings();
            closeMessage();
        });
}

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
    document.querySelector('#leftgamerecordli li').innerHTML = txtInput;
    $('#leftgamerecordli li').animate({ "opacity": 1 }, 2000).siblings().animate({ opacity: 0 }, 2000);
    $('#leftgamerecordli li').animate({ "opacity": 0 }, 2000).siblings().animate({ opacity: 1 }, 2000);
    //保持滾動條一直在最底部
    var leftgamerecordli = document.getElementById("leftgamerecordli").parentNode;
    leftgamerecordli.scrollTop = leftgamerecordli.scrollHeight;
}

//時間倒數
function timeOn(time) {
    return new Promise((resolve, reject) => {
        var count = time;
        var totaltime = time;
        let myCounter = setInterval(function () {
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

//音效
var Morning = document.getElementById("MorningAudio");
var Night = document.getElementById("NightAudio");
function morningAudio() {
    Morning.play();
    Morning.volume = 0.2;
    Night.pause();
}
function nightAudio() {
    Night.play();
    Night.volume = 0.2;
    Morning.pause();
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
        $("figure").removeClass("absolute-bg");
        $("div").removeClass("fog__img fog__img--first");
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

        let figure = document.createElement('figure');
        let clouddiv = document.createElement('div');
        figure.setAttribute('class', 'absolute-bg');
        clouddiv.setAttribute('class', 'fog__img fog__img--first')
        figure.appendChild(clouddiv);
        document.querySelector('body').appendChild(figure);
    }
    image.classList.toggle('image-dark')
    image.classList.toggle('image-light')
}

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
        playerImg.setAttribute('src', players[i].userPic);
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
        playerImg.setAttribute('src', players[i].userPic);
        playerImg.setAttribute('class', 'playerphoto')
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
        document.querySelector('.footer-playerimg').appendChild(aplayer);
        array = [];
    }
}

//雜物生成
var eleBack = null, eleFront = null;
var eleList = null;
var funBackOrFront = function () {
    eleList.each(function () {
        if ($(this).hasClass("out")) {
            eleFront = $(this);
        } else {
            eleBack = $(this);
        }
    });
};
function BindingThings() {
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
    ////滾輪
    //$(".leftgamerecord").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
    //    if (event.type == "mouseenter") {
    //        $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
    //    } else {
    //        $(this).css({ "overflow-y": "hidden" }); //滑鼠離開
    //    }
    //});
    //滾輪
    $(".rightgamerecord").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
        if (event.type == "mouseenter") {
            $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
        } else {
            $(this).css({ "overflow-y": "hidden" }); //滑鼠離開
        }
    });
    // 在前面显示的元素，隐藏在后面的元素
    //eleBack = null;
    //eleFront = null;
    //eleList = null; //$(".list");// 纸牌元素们 


    // 确定前面与后面元素


    //< !--當我按下x時要去加入css動畫 -->
    $('#close').click(function () {
        funBackOrFront();

        var tt = document.styleSheets[0];
        tt.insertRule("@keyframes spin { 0% { transform: rotateY(0deg); } 25% { transform: rotateY(360deg); } 50% { transform: rotateY(0deg); } 75% { transform: rotateY(360deg); }}", 9);//寫入樣式      

        $('.box').css("animation-name", " spin");
        $('.box').css("animation-timing-function", " linear")
        $('.box').css("animation-duration", " 1s")
        $('.box').css("animation-fill-mode", "forwards")
        //切换的顺序如下
        // 1. 当前在前显示的元素翻转90度隐藏, 动画时间225毫秒
        // 2. 结束后，之前显示在后面的元素逆向90度翻转显示在前 
        // 3. 完成翻面效果

        //eleFront.removeClass("out").addClass("in");
        //eleBack.removeClass("in").addClass("out");
        eleFront.removeClass("out").addClass("in");

        setTimeout(function () {

            eleBack.removeClass("in").addClass("out");

            // 重新确定正反元素
            //funBackOrFront();
        }, 100);
    });
    $('#closebtn').click(function () {
        $('.img-spin').css("animation-name", " spin")
        $('.img-spin').css("animation-timing-function", " linear")
        $('.img-spin').css("animation-duration", " 1s")
        var tt = document.styleSheets[0];
        tt.insertRule("@keyframes spin {0 % { transform: rotateY(0deg); } 25% {transform: rotateY(360deg); } 50% {transform: rotateY(0deg); } 75% {transform: rotateY(360deg); }}", 9);//寫入樣式      

    });

}


function Binding() {
    var profession = new Vue({
        el: "#describe",
        data: { items: myJobInfo },
        mounted: function () {
            $("#close").attr("disabled", false);
            eleList = $(".list");// 纸牌元素们 
        },
        updated: function () {
            eleList = $(".list");// 纸牌元素们 
        }
    });
}

//投票
var voteResult;
function vote(a, b, c, d, e, f, g, h, i, j) {
    document.getElementById("touxiang").getElementsByClassName('circleImg')[a - 1].className = "circleImg on";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[a - 1].setAttribute('style', 'margin: 5px;box - shadow: 0px 0px 25px red;filter: alpha(Opacity = 100);');
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

//投票回傳
function voteBack() {
    var backVoteResult = [{
        "RoomID": myroomid,
        "User": myName,
        "Vote": `${voteResult}`,
        "voteResult": null
    }];
    connection.invoke("Vote", backVoteResult);
}

//取投票結果
var prepareDead;
function getVoteResult() {
    return connection.invoke("VoteResult", myroomid);
}

//確認死亡
function deadConfirm(die) {
    let deadMan = players[die - 1];
    var backDeadResult = [{
        "RoomId": deadMan.roomId,
        "isAlive": false,
        "Account": deadMan.account
    }];
    connection.invoke("PeopleDie", backDeadResult)

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
    $('.circleImg').attr('className', 'circleImg off');
}

//抓房間人數
var PersonInroom;
function GetPersonInroom() {
    connection.invoke("GetAllRoom").then(function (response) {
        if (response.success) {
            response.data.forEach(item => {
                if (item.roomId == myroomid) { PersonInroom = item.count; }
                else { alert('no') }
            });
        }
    })
}

//離開房間
function LeaveRoom() {
    PersonInroom = 0;
    GetPersonInroom();
    if (PersonInroom < 2) {
        DeleteRoom();
    }
    //自己從房間移除
    //連到房間畫面
}

//刪除房間
function DeleteRoom() {
    connection.invoke("RemoveRoom", myroomid).then(function (response) {
        if (response.success) {
        }
    });
}

//各職業
function wolf() {
    //if (myJob == "狼人" || myJob == "狼王" && myAlive == true) { }
    $("body").css("cursor", "url('/Images/paw.jpg') 45 45, auto");
    $('.circleImg').css("pointer-events", "auto");
}
function prophet() {
    //if (myJob == "預言家" && myAlive == true) { }
    $("body").css("cursor", "url('/Images/search.jpg') 45 45, auto");
    $('.circleImg').css("pointer-events", "auto");
    $('.circleImg').append(` <div class="findperson" onclick="PlayerIsGood(this)" ></div>`);
    document.querySelectorAll('.findperson').forEach(function (element, index) {
        element.setAttribute('value', index + 1);
    });
}
var witchSave = true;
var witchKill = true;
function witch() {
    let saveOrDead = prepareDead;
    //if (myJob == "女巫" && myAlive == true) { }
    $("body").css("cursor", "url('/Images/poison.jpg') 45 45, auto");
    $('.circleImg').css("pointer-events", "auto");
    if (witchSave != true) { $('#rightgamerecordli').append(`<li>特殊能力已使用</li>`); }
    else if (prepareDead == null || prepareDead == 'null') { $('#rightgamerecordli').append(`<li>無人死亡</li>`); }
    else {
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
    }
    $('#saveDead').click(function () { prepareDead = null; witchSave = false; });
    $('#noSaveDead').click(function () { prepareDead = saveOrDead; witchSave = true; });
}
function hunter() {
    if (myJob == "獵人") {
        $("body").css("cursor", "url('/Images/gun.jpg') 45 45, auto");
        $('.circleImg').css("pointer-events", "auto");
        $('#rightgamerecordli').append(`<li>請選擇帶走玩家</li>`);
    }
}
function wolfKing() {
    if (myJob == "狼王") {
        $("body").css("cursor", "url('/Images/paw.jpg') 45 45, auto");
        $('.circleImg').css("pointer-events", "auto");
        $('#rightgamerecordli').append(`<li>請選擇帶走玩家</li>`);
    }
}
 $('.circleImg').attr('className', 'circleImg off');



//以下遊戲主體
async function game() {
    //----------顯示規則---------
    $('#staticBackdrop').modal('show');

    $('.circleImg').css("pointer-events", "none");
    $('.circleImg').attr('className', 'circleImg off');
    $('.on').css('box-shadow', 'none');
    await timeOn(1);

    //----------準備時間---------
    Speak('請確認你的身分，遊戲將於倒數完後開始');
    await timeOn(5);

    for (let round = 0; round < 100; round++) {
        //----------狼人---------
        deadLis = ''
        deadNum = [];
        voteResult = null;
        prepareDead = null;
        $('#toggleDark').click();
        Speak('天黑請閉眼，狼人請殺人');
        wolf();
        await timeOn(10);
        $('.circleImg').css("pointer-events", "none");
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');
        voteBack();
        await getVoteResult();

        //----------預言家---------
        Speak('預言家請選擇玩家查身分');
        prophet();
        await timeOn(5);
        $('.findperson').remove();
        $('.circleImg').css("pointer-events", "none");
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');
        $('#rightgamerecordli li').remove();

        //----------女巫---------
        voteResult = null;
        Speak('此玩家死亡，女巫是否救人');
        witch();
        await timeOn(3);
        $('#rightgamerecordli li').remove();
        Speak('女巫是否殺人');
        await timeOn(5);
        $('.circleImg').css("pointer-events", "none");
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');

        //----------天亮遺言---------
        $("body").css("cursor", "default");
        $('#toggleDark').click();
        document.getElementById("PeoplesendButton").hidden = true;
        if (prepareDead != null && prepareDead != 'null') { await deadConfirm(prepareDead); }
        if (voteResult != null && witchKill == true && myJob == '女巫') { await deadConfirm(voteResult); witchKill = false; }

        await timeOn(3);
        $('.diepage').remove();
        $('.image').show();


        Speak('天亮請睜眼');
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');

        //判斷輸贏
        await winOrLose();
        if (gameResult == '好人獲勝') {
            /*這裡加好人獲勝MODEL;*/


            Speak('遊戲結束，好人獲勝');
            break;
        }
        else if (gameResult == '狼人獲勝') {
            /*這裡加狼人獲勝MODEL;*/


            Speak('遊戲結束，好人獲勝');
            break;
        }

        if (deadNum.length > 0) {
            Speak(`昨晚${deadLis}玩家死了`);
            await timeOn(1);
            for (let i = 0; i < deadNum.length; i++) {
                if (players[deadNum[i]].name == '獵人') {
                    Speak('發動角色技能');
                    voteResult = null;
                    prepareDead = null;
                    await timeOn(1);
                    hunter();
                    await timeOn(15);
                    $('#rightgamerecordli li').remove();
                    $('.circleImg').css("pointer-events", "none");
                    $('.circleImg').attr('className', 'circleImg off');
                    if (voteResult != null) { await deadConfirm(voteResult); }
                    if (voteResult != null) { Speak(`${voteResult}號玩家死亡`); }
                    await timeOn(3);
                    $('.diepage').remove();
                    $('.image').show();
                }
                if (players[deadNum[i]].name == '狼王') {
                    Speak('發動角色技能');
                    voteResult = null;
                    prepareDead = null;
                    await timeOn(1);
                    wolfKing();
                    await timeOn(15);
                    $('#rightgamerecordli li').remove();
                    $('.circleImg').css("pointer-events", "none");
                    $('.circleImg').attr('className', 'circleImg off');
                    if (voteResult != null) { await deadConfirm(voteResult); }
                    if (voteResult != null) { Speak(`${voteResult}號玩家死亡`); }
                    await timeOn(3);
                    $('.diepage').remove();
                    $('.image').show();
                }
            }
        } else { Speak('昨晚是平安夜'); await timeOn(1); }
        await timeOn(1);

        //判斷輸贏
        await winOrLose();
        if (gameResult == '好人獲勝') {
            /*這裡加好人獲勝MODEL;*/


            Speak('遊戲結束，好人獲勝');
            break;
        }
        else if (gameResult == '狼人獲勝') {
            /*這裡加狼人獲勝MODEL;*/


            Speak('遊戲結束，好人獲勝');
            break;
        }

        await timeOn(1);
        await timeOn(1);
        //----------討論---------
        Speak('輪流發言時間');
        for (let i = 0; i < players.length; i++) {
            document.getElementById("PeoplesendButton").hidden = true;
            if (players[i].isAlive) {
                if (players[i].account == myName) {
                    document.getElementById("PeoplesendButton").hidden = false;
                }
                Speak(`${i + 1}號玩家發言`);
                await timeOn(3);
                document.getElementById("PeoplesendButton").hidden = true;
            }
        }

        //----------投票---------
        voteResult = null;
        prepareDead = null;
        deadLis = ''
        deadNum = [];
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');
        await timeOn(1);
        Speak('所有玩家投票，得票最高者將出局');
        $('.circleImg').css("pointer-events", "auto");
        await timeOn(10);
        $('.circleImg').css("pointer-events", "none");
        $('.circleImg').attr('className', 'circleImg off');
        voteBack();
        await getVoteResult();
        await deadConfirm(prepareDead);
        await timeOn(1);
        Speak(`${prepareDead}號玩家最高票`);
        await timeOn(3);
        $('.diepage').remove();
        $('.image').show();

        //判斷輸贏
        await winOrLose();
        if (gameResult == '好人獲勝') {
            /*這裡加好人獲勝MODEL;*/


            Speak('遊戲結束，好人獲勝');
            break;
        }
        else if (gameResult == '狼人獲勝') {
            /*這裡加狼人獲勝MODEL;*/


            Speak('遊戲結束，好人獲勝');
            break;
        }

        //----------遺言---------
        for (let i = 0; i < deadNum.length; i++) {
            Speak(`${deadNum[i] + 1}號玩家請發表遺言`);
            await timeOn(1);
            if (players[deadNum[i]].account == myName) {
                document.getElementById("PeoplesendButton").hidden = false;
            }
            await timeOn(5);
            document.getElementById("PeoplesendButton").hidden = true;
        }
    }
}

signalrListener();
wait();
document.querySelector('#again').addEventListener('click', function () {
    waitPeople = waitPeople + 1;
    document.querySelector('#app').innerHTML = `${waitPeople}/10`
    if (waitPeople > 9) {
        $('#waitappendId').hide();
        $('.image').show();
        connection.invoke("GetRole", myroomid);
        game();
    }
})


function winOrLose() {
    let isWin = [];
    for (let i = 0; i < players.length; i++) {
        if (players[i].isAlive) {
            let list = {
                "name": players[i].name,
                "isGood": players[i].isGood
            }
            isWin.push(list)
        }
    }
    $.ajax({
        type: "post",
        url: "https://wolfpeoplekill.azurewebsites.net/api/Game/WinOrLose",
        data: JSON.stringify(isWin),
        dataType: 'JSON',
        headers: {
            'Content-type': 'application/json'
        },
        success: function (response) {
            gameResult = response[0].gameResult;
            console.log(gameResult);
        }
    });
}