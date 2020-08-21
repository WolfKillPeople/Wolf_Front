var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").withAutomaticReconnect([0, 0, 10000]).build();
var no = 1;
var door_page = 1;
var people;
var close_img = 'https://i.imgur.com/TGuCa7L.png';
var open_img = 'https://i.imgur.com/582RIlF.png';
var doorImg;
var altImg;
var clicks = 0;
var nextRoom;
var data;
var arry;
var GEmail;
var GetPic;
var GSocre;
var G_ID;
//page
$(document).ready(function () {
    var getOriPic = $('#avatat').attr('src');
    console.log(getOriPic);

    // picData 需先Get兩個圖片資料
    let picData =
    {
        email: localStorage.getItem('myName')
    }

    //從註冊抓
    $.ajax({
        type: 'Post',
        url: 'https://wolfpeoplekill.azurewebsites.net/api/UserRegister/LoingPostpic',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(picData),
        success: function (gpic) {
            arry = gpic;
            GEmail = arry[0].email;
            GetPic = arry[0].pic;
            GSocre = arry[0].win;
            G_ID = arry[0].id;
            document.cookie = `GUID =${G_ID}`;
            $('.avatat').attr('src', `${GetPic}`);
            $('.Account_email').text(`${GEmail}`);
            $('.Account_Score').text(`${GSocre}`);
        }
    });


    connection.start().then(function () {
        connection.invoke("GetAllRoom");
    }).catch(function (err) {
        return console.error(err.toString());
    });
    var scrolling = false,
        curPage = 1;
    function pagination(page, movingUp) {
        scrolling = true;
        var diff = curPage - page,
            oldPage = curPage;
        curPage = page;
        $(".page").removeClass("active small previous");
        $(".page-" + page).addClass("active");
        $(".nav-btn").removeClass("active");
        $(".nav-page" + page).addClass("active");
        if (page > 1) {
            $(".page-" + (page - 1)).addClass("previous");
            if (movingUp) {
                $(".page-" + (page - 1)).hide();
                var hackPage = page;
                setTimeout(function () {
                    $(".page-" + (hackPage - 1)).show();
                }, 600);
            }
            while (--page) {
                $(".page-" + page).addClass("small");
            }
        }
        console.log(diff)
        if (diff > 1) {
            for (var j = page + 1; j < oldPage; j++) {
                $(".page-" + j + " .half").css("transition", "transform .7s ease-out");
            }
        }
        setTimeout(function () {
            scrolling = false;
            $(".page .half").attr("style", "");
            $(".page")
        }, 700);
    }
    function navigateUp() {
        if (curPage > 1) {
            curPage--;
            pagination(curPage, true);
        }
    }
    function navigateDown() {
        if (curPage < $(".page").length) {
            curPage++;
            pagination(curPage);
        }
    }
    $(document).on("mousewheel DOMMouseScroll", function (e) {
        if (!scrolling) {
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                navigateUp();
            } else {
                navigateDown();
            }
        }
    });
    $(document).on("click", ".scroll-btn", function () {
        if (scrolling) return;
        if ($(this).hasClass("up")) {
            navigateUp();
        } else {
            navigateDown();
        }
    });
    $(document).on("keydown", function (e) {
        if (scrolling) return;
        if (e.which === 38) {
            navigateUp();
        } else if (e.which === 40) {
            navigateDown();
        }
    });
    $(document).on("click", ".nav-btn:not(.active)", function () {
        if (scrolling) return;
        pagination(+$(this).attr("data-target"));
    });
});
connection.on("JoinRoom", function (message) {
    prepare();
});
connection.on("GetAllRoomInfo", function (data, temp) {
    $('.page').remove();
    $('.nav-btn').remove();
    clicks = 0;
    door_page = 1;
    nextRoom = temp;
    for (var i = 0; i < data.length; i++) {
        clicks++;
        if (data[i].count == 10) {
            doorImg = close_img;
            altImg = 'close';
        }
        else {
            doorImg = open_img;
            altImg = 'open';
        }
        displayDoor(data, i);
        if (data[i].count == 10) {
            document.querySelectorAll('.perspective')[i].removeAttribute("onclick");
        }
    }
});
function displayDoor(data, i) {
    if (clicks == 1) {
        $(`.door_all`).append(`<div class="page page-${door_page} active">
                                            <div class="half left">
                                            <div class="perspective" onclick="openDoor(this)">
                                            <div class="thumb">
                                            <img src=${doorImg} alt=${altImg} class="door_card" />
                                            </div>
                                           <div class="number">
                                           <p class="door_number">${data[i].roomId.toString().padStart(3, '0')}</p>
                                          <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${data[i].roomId}" onclick="addPeople(this)"/>
                                           <p class="people">人數: ${data[i].count}/10</p>
                                          </div>          
                                              </div>
                                                </div><div class="half right withText">
                                                </div>
                                                </div>`);
        $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page} active"></li>`)
    }
    else if ((clicks <= 4 && clicks > 1) || (clicks > 8 && clicks <= 12)) {
        $(`.page-${door_page}>.left`).append(`<div class="perspective" onclick="openDoor(this)">
                                    <div class="thumb">
                                        <img src=${doorImg} alt=${altImg} class="door_card" />
                                    </div>
                                    <div class="number">
                                        <p class="door_number">${data[i].roomId.toString().padStart(3, '0')}</p>
                                        <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${data[i].roomId}" onclick="addPeople(this)"/>
                                        <p class="people">人數: ${data[i].count}/10</p>
                                    </div>          
                                </div>`);
    }
    else if ((clicks > 4 && clicks <= 8) || (clicks > 12 & clicks <= 16)) {
        $(`.page-${door_page}>.right`).append(`<div class="perspective" onclick="openDoor(this)">
                                <div class="thumb">
                                    <img src=${doorImg} alt=${altImg} class="door_card" />
                                </div>
                                <div class="number">
                                    <p class="door_number">${data[i].roomId.toString().padStart(3, '0')}</p>
                                    <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${data[i].roomId}" onclick="addPeople(this)"/>
                                    <p class="people">人數: ${data[i].count}/10</p>
                                </div>          
                            </div>`);
    }
    else if (clicks == 17) {
        door_page++;
        clicks = 1;
        $('.door_all').append(`<div class="page page-${door_page}">
                                    <div class="half left">
                                    <div class="perspective" onclick="openDoor(this)">
                                            <div class="thumb">
                                                <img src=${doorImg} alt=${altImg} class="door_card" />
                                            </div>
                                            <div class="number">
                                                <p class="door_number">${data[i].roomId.toString().padStart(3, '0')}</p>
                                                <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${data[i].roomId}" onclick="addPeople(this)"/>
                                                <p class="people">人數: ${data[i].count}/10</p>
                                            </div>          
                                        </div>
                                    </div><div class="half right withText">
                                    </div>
                                    </div>`);
        $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page}"></li>`)
    }
}
connection.on("NewRoom", function (model, temp) {
    clicks++;
    AddOneDoor();
    nextRoom = temp;
});
$(".add_room_btn").on("click", addDoor);
var myaccount = localStorage.getItem('myName');
function addDoor() {
    connection.invoke("CreateRoom", nextRoom, myaccount);
    prepare();
}
function AddOneDoor() {
    if (clicks == 1) {
        $(`.door_all`).append(`<div class="page page-${door_page} active">
            <div class="half left">
            <div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${open_img} alt="open" class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${nextRoom.toString().padStart(3, '0')}</p>
                        <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)" />
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>
            </div><div class="half right withText">
            </div>
            </div>`);
        $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page} active"></li>`)
    }
    else if ((clicks <= 4 && clicks > 1) || (clicks > 8 && clicks <= 12)) {
        $(`.page-${door_page}>.left`).append(`<div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${open_img} alt="open" class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${nextRoom.toString().padStart(3, '0')}</p>
                        <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)"/>
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>`);
    }
    else if ((clicks > 4 && clicks <= 8) || (clicks > 12 & clicks <= 16)) {
        $(`.page-${door_page}>.right`).append(`<div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${open_img} alt="open" class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${nextRoom.toString().padStart(3, '0')}</p>
                        <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)" />
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>`);
    }
    else if (clicks == 17) {
        door_page++;
        clicks = 1;
        $('.door_all').append(`<div class="page page-${door_page}">
            <div class="half left">
            <div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${open_img} alt="open" class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${nextRoom.toString().padStart(3, '0')}</p>
                        <img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)" />
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>
            </div><div class="half right withText">
            </div>
            </div>`);
        $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page}"></li>`)
    }
}
connection.on("GetAll", function (data, i) {
    data.forEach(element => {
        element.account.forEach(acc => {
            if (acc == myaccount) {
                waitPeople = element.count;
                document.querySelector('#app').innerHTML = `${waitPeople}/10`
                if (waitPeople == 10) {
                    $('#waitappendId').remove();
                    $('.image').show();

                    connection.invoke("GetRole", myroomid).then((res) => {
                        players = res;
                        console.log(players);
                        players.forEach(element => {
                            if (element.account == myaccount) {
                                myAlive = element.isAlive;
                                myJob = element.name;
                                myJobInfo = element;
                            }
                        });
                        Binding();
                        BindingPlayers();
                        BindingThings();
                        closeMessage();
                    })
                    game();
                }
            }
        })
    });

    $('.page').remove();
    $('.nav-btn').remove();
    clicks = 0;
    door_page = 1;
    i = 0;
    for (i = 0; i < data.length; i++) {
        clicks++;
        if (data[i].count == 10) {
            doorImg = close_img;
            altImg = 'close';
        }
        else {
            doorImg = open_img;
            altImg = 'open';
        }
        displayDoor(data, i);
        if (data[i].count == 10) {
            document.querySelectorAll('.perspective')[i].removeAttribute("onclick");
        }
    }
});
//People
function addPeople(member) {
    var strRoomId = $(member).attr('class').substring(9);
    var roomId = parseInt(strRoomId);
    connection.invoke("JoinRoom", roomId, myaccount);
}
//var delroom = 1;
//function deleteRoom() {
//    delroom++;
//    connection.invoke("RemoveRoom", delroom).then(function (response) {
//        if (response.success) {
//            alert('刪除成功');
//            $('.page').remove();
//            $('.nav-btn').remove();
//            clicks = 0;
//            door_page = 1;
//            nextRoom = response.tempNextRoom;
//            displayDoor();
//        }
//    });
//}

//door
function openDoor(field) {
    var y = $(field).find(".thumb");
    var x = y.attr("class");
    if (y.hasClass("thumbOpened")) {
        y.removeClass("thumbOpened");
    }
    else {
        $(".thumb").removeClass("thumbOpened");
        y.addClass("thumbOpened");
    }
}


//sky
function drawing() {
    var c = document.getElementById('sky');
    var ctx = c.getContext('2d');
    var xMax = c.width = window.screen.availWidth;
    var yMax = c.height = window.screen.availHeight;
    var hmTimes = Math.round(xMax + yMax);
    for (var i = 0; i <= hmTimes; i++) {
        var randomX = Math.floor((Math.random() * xMax) + 1);
        var randomY = Math.floor((Math.random() * yMax) + 1);
        var randomSize = Math.floor((Math.random() * 2) + 1);
        var randomOpacityOne = Math.floor((Math.random() * 9) + 1);
        var randomOpacityTwo = Math.floor((Math.random() * 9) + 1);
        var randomHue = Math.floor((Math.random() * 360) + 1);
        if (randomSize > 1) {
            ctx.shadowBlur = Math.floor((Math.random() * 15) + 5);
            ctx.shadowColor = "white";
        }
        ctx.fillStyle = "hsla(" + randomHue + ", 30%, 80%, ." + randomOpacityOne + randomOpacityTwo + ")";
        ctx.fillRect(randomX, randomY, randomSize, randomSize);
    }
}
drawing();

//search
//const input = document.getElementById("search-input");
//const searchBtn = document.getElementById("search-btn");
//const expand = () => {
//    searchBtn.classList.toggle("close");
//    input.classList.toggle("square");
//};
//searchBtn.addEventListener("click", expand);

//modal
// Create an immediately invoked functional expression to wrap our code
(function () {
    // Define our constructor 
    window.Modal = function () {
        // Create global element references
        this.closeButton = null;
        this.modal = null;
        this.overlay = null;
        // Determine proper prefix
        this.transitionEnd = transitionSelect();
        // Define option defaults 
        var defaults = {
            autoOpen: false,
            className: 'fade-and-drop',
            closeButton: true,
            content: "",
            maxWidth: 600,
            minWidth: 280,
            overlay: true
        }
        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }
        if (this.options.autoOpen === true) this.open();
    }
    // Public Methods
    Modal.prototype.close = function () {
        var _ = this;
        this.modal.className = this.modal.className.replace(" scotch-open", "");
        this.overlay.className = this.overlay.className.replace(" scotch-open",
            "");
        this.modal.addEventListener(this.transitionEnd, function () {
            _.modal.parentNode.removeChild(_.modal);
        });
        this.overlay.addEventListener(this.transitionEnd, function () {
            if (_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
        });
    }
    Modal.prototype.open = function () {
        buildOut.call(this);
        initializeEvents.call(this);
        window.getComputedStyle(this.modal).height;
        this.modal.className = this.modal.className +
            (this.modal.offsetHeight > window.innerHeight ?
                " scotch-open scotch-anchored" : " scotch-open");
        this.overlay.className = this.overlay.className + " scotch-open";
    }
    // Private Methods
    function buildOut() {
        var content, contentHolder, docFrag;
        /*
         * If content is an HTML string, append the HTML string.
         * If content is a domNode, append its content.
         */
        if (typeof this.options.content === "string") {
            content = this.options.content;
        } else {
            content = this.options.content.innerHTML;
        }
        // Create a DocumentFragment to build with
        docFrag = document.createDocumentFragment();
        // Create modal element
        this.modal = document.createElement("div");
        this.modal.className = "scotch-modal " + this.options.className;
        this.modal.style.minWidth = this.options.minWidth + "px";
        this.modal.style.maxWidth = this.options.maxWidth + "px";
        // If closeButton option is true, add a close button
        if (this.options.closeButton === true) {
            this.closeButton = document.createElement("button");
            this.closeButton.className = "scotch-close close-button";
            this.closeButton.innerHTML = "&times;";
            this.modal.appendChild(this.closeButton);
        }
        // If overlay is true, add one
        if (this.options.overlay === true) {
            this.overlay = document.createElement("div");
            this.overlay.className = "scotch-overlay " + this.options.className;
            docFrag.appendChild(this.overlay);
        }
        // Create content area and append to modal
        contentHolder = document.createElement("div");
        contentHolder.className = "scotch-content";
        contentHolder.innerHTML = content;
        this.modal.appendChild(contentHolder);
        // Append modal to DocumentFragment
        docFrag.appendChild(this.modal);
        // Append DocumentFragment to body
        document.body.appendChild(docFrag);
    }
    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }
    function initializeEvents() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this));
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this));
        }
    }
    function transitionSelect() {
        var el = document.createElement("div");
        if (el.style.WebkitTransition) return "webkitTransitionEnd";
        if (el.style.OTransition) return "oTransitionEnd";
        return 'transitionend';
    }
}());
var myContent = document.getElementById('content');
var myModal = new Modal({
    content: myContent
});
//var triggerButton = document.getElementById('trigger');
$("#trigger").click(function () {
    myModal.open();
});

document.getElementById("user_img").addEventListener('click', change_Userimg);
function change_Userimg() {
    $("#user_pic").modal('toggle')
}
$('.users_pic').click(changePICS(this));
$(document).ready(function () {
    $('#avatat').attr('src', "https://i.imgur.com/9Pbvhnk.png");
});
function changePICS(e) {
    var getChoiceUrl = $(e).attr('src');
    // $('#avatat').attr('src','none');
    $('#avatat').attr('src', getChoiceUrl);
}
const id = '796f96ba6f57a84';
const token = '7fad7c5f2e1fe7bf50fc28274bd1583c336b0926';

const upload = new Vue({
    el: '#upLoadImg',
    data: {
        album: 'WolfKill',
        file: null,
    },
    methods: {
        load(e) {
            this.file = e.target.files[0];
            let settings = {
                async: false,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: 'https://api.imgur.com/3/image',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                mimeType: 'multipart/form-data'
            };
            let form = new FormData();
            form.append('image', this.file);
            form.append('title', this.title);
            form.append('description', this.des);
            settings.data = form;
            $.ajax(settings).done(function (res) {
                var img = JSON.parse(res).data.link;
                document.querySelector('#avatat').setAttribute('src', img);
                $('#user_pic').modal('hide')
            });
        }
    }
});
$(document).ready(function () {
    $('#upload_icon').click(function () {
        $('#update').click();
    });
});
$('.confirmBtn').click(function () {
    var a = $('#avatat').attr('src');

    let picData =
    {
        email: localStorage.getItem('myName'),
        pic: `${a}`
    }


    //post回資料庫
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
})

//-----------------------------------------------

//signalr監聽
var deadLis = '';
var deadNum = [];
var players;
//玩家資料
var myAlive;
var myJob;
var myroomid = 1;
var myJobInfo;
var gameResult;
function signalrListener() {
    //玩家死亡
    connection.on("PeopleDie", function (message) {
        let allHead = document.querySelectorAll('.deadimg');
        for (let i = 0; i < players.length; i++) {
            if (myaccount == message) {
                myAlive = false;
            }
            if (players[i].account == message) {
                allHead[i].setAttribute('style', 'display:flex');
                deadLis = /*deadLis + */`${i + 1}號`;
                deadNum.push(i);
                deadNum = deadNum.filter(function (element, index, arr) {
                    return arr.indexOf(element) === index;
                });
                players[i].isAlive = false;
                ////死掉特效
                //$('.image').hide();
                //bloodAppend(deadLis);
                ////血的特效
                //gsap.to("#dietransition", 1, { opacity: 1, y: 200, ease: Elastic.easeOut });
                //gsap.to("#dietransition", 1, { delay: 2, y: 1500, ease: Power3.easeInOut });
            }
        }
    });


    connection.on("NewRoom", function (message, temp) {
    });

    connection.on("VoteResult", function (message) {
        console.log('in VoteResult');
        prepareDead = message[0].vote;
    });

    //connection.on("GetRole",
    //    function (response) {
    //        console.log('fuck')
    //        debugger
    //        players = response;
    //        console.log(players);
    //        players.forEach(element => {
    //            if (element.account == myaccount) {
    //                myAlive = element.isAlive;
    //                myJob = element.name;
    //                myJobInfo = element;
    //            }
    //        });
    //        Binding();
    //        BindingPlayers();
    //        BindingThings();
    //        closeMessage();
    //        //game();
    //    });
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
        num.setAttribute('class', 'gamenumber');
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
        num.setAttribute('class', 'gamenumber');
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
    $(".rightgamerecord").on("mouseenter mouseleave", function (event) { //挷定滑鼠進入及離開事件
        if (event.type == "mouseenter") {
            $(this).css({ "overflow-y": "scroll" }); //滑鼠進入
        } else {
            $(this).css({ "overflow-y": "hidden" }); //滑鼠離開
        }
    });


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
    var backVoteResult = {
        "RoomID": myroomid,
        "Account": myaccount,
        "Vote": `${voteResult}`,
        "voteResult": null
    };
    connection.invoke("Vote", backVoteResult);
    console.log(`i vote ${voteResult}`);
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
    if (myJob == "狼人" || myJob == "狼王" && myAlive == true) {
    $("body").css("cursor", "url('/Images/paw.jpg') 45 45, auto");
    $('.circleImg').css("pointer-events", "auto");
} }
function prophet() {
    if (myJob == "預言家" && myAlive == true) { 
    $("body").css("cursor", "url('/Images/search.jpg') 45 45, auto");
    $('.circleImg').css("pointer-events", "auto");
    $('.circleImg').append(` <div class="findperson" onclick="PlayerIsGood(this)" ></div>`);
    document.querySelectorAll('.findperson').forEach(function (element, index) {
        element.setAttribute('value', index + 1);
    });
}}
var witchSave = true;
var witchKill = true;
function witch() {
    let saveOrDead = prepareDead;
    if (myJob == "女巫" && myAlive == true) { 
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
}}
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



//以下遊戲主體
async function game() {
    //----------顯示規則---------
    $('#staticBackdrop').modal('show');
    $('.circleImg').attr('className', 'circleImg off');
    $('.on').css('box-shadow', 'none');
    await timeOn(15);

    //----------準備時間---------
    Speak('請確認你的身分，遊戲將於倒數完後開始');
    await timeOn(15);
    $('.circleImg').css("pointer-events", "none");

    for (let round = 0; round < 100; round++) {
        //----------狼人---------
        deadLis = ''
        deadNum = [];
        voteResult = null;
        prepareDead = null;
        $('#toggleDark').click();
        Speak('天黑請閉眼，狼人請殺人');
        wolf();
        await timeOn(30);
        $('.circleImg').css("pointer-events", "none");
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');
        await voteBack();
        await timeOn(1);
        await getVoteResult();

        //----------預言家---------
        Speak('預言家請選擇玩家查身分');
        prophet();
        await timeOn(10);
        $('.findperson').remove();
        $('.circleImg').css("pointer-events", "none");
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');
        $('#rightgamerecordli li').remove();

        //----------女巫---------
        console.log(voteResult);
        console.log(prepareDead);
        voteResult = null;
        Speak('此玩家死亡，女巫是否救人');
        witch();
        await timeOn(10);
        $('#rightgamerecordli li').remove();
        Speak('女巫是否殺人');
        await timeOn(20);
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
            $('.image').remove();
            goodwin();
            Speak('遊戲結束，好人獲勝');
            return;
        }
        else if (gameResult == '狼人獲勝') {
            /*這裡加狼人獲勝MODEL;*/
            $('.image').remove();
            wolfwin();
            Speak('遊戲結束，好人獲勝');
            return;
        }

        if (deadNum.length > 0) {
            Speak(`昨晚${deadLis}玩家死了`);
            await timeOn(1);
            for (let i = 0; i < deadNum.length; i++) {
                if (players[deadNum[i]].name == '獵人') {
                    deadLis = '';
                    deadNum = [];
                    Speak('發動角色技能');
                    voteResult = null;
                    prepareDead = null;
                    await timeOn(1);
                    hunter();
                    await timeOn(20);
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
                    deadLis = ''
                    deadNum = [];
                    Speak('發動角色技能');
                    voteResult = null;
                    prepareDead = null;
                    await timeOn(1);
                    wolfKing();
                    await timeOn(20);
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
            $('.image').remove();
            goodwin();

            Speak('遊戲結束，好人獲勝');
            return;
        }
        else if (gameResult == '狼人獲勝') {
        /*這裡加狼人獲勝MODEL;*/
            $('.image').remove();
            wolfwin();

            Speak('遊戲結束，好人獲勝');
            return;
        }

        await timeOn(1);
        await timeOn(1);
        //----------討論---------
        Speak('輪流發言時間');
        for (let i = 0; i < players.length; i++) {
            document.getElementById("PeoplesendButton").hidden = true;
            if (players[i].isAlive) {
                if (players[i].account == myaccount) {
                    document.getElementById("PeoplesendButton").hidden = false;
                }
                Speak(`${i + 1}號玩家發言`);
                await timeOn(5);
                document.getElementById("PeoplesendButton").hidden = true;
            }
        }

        //----------投票---------
        voteResult = null;
        prepareDead = null;
        deadLis = '';
        deadNum = [];
        $('.circleImg').attr('className', 'circleImg off');
        $('.on').css('box-shadow', 'none');
        await timeOn(1);
        Speak('所有玩家投票，得票最高者將出局');
        $('.circleImg').css("pointer-events", "auto");
        await timeOn(60);
        $('.circleImg').css("pointer-events", "none");
        $('.circleImg').attr('className', 'circleImg off');
        await voteBack();
        await timeOn(1);
        await getVoteResult();
        await timeOn(1);
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
            $('.image').remove();
            goodwin();

            Speak('遊戲結束，好人獲勝');
            return;
        }
        else if (gameResult == '狼人獲勝') {
            /*這裡加狼人獲勝MODEL;*/
            $('.image').remove();
            wolfwin();
            Speak('遊戲結束，好人獲勝');
            return;
        }

        await timeOn(1);
        for (let i = 0; i < deadNum.length; i++) {
            if (players[deadNum[i]].name == '獵人') {
                deadLis = '';
                deadNum = [];
                Speak('發動角色技能');
                voteResult = null;
                prepareDead = null;
                await timeOn(1);
                hunter();
                await timeOn(20);
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
                deadLis = '';
                deadNum = [];
                Speak('發動角色技能');
                voteResult = null;
                prepareDead = null;
                await timeOn(1);
                wolfKing();
                await timeOn(20);
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

        //判斷輸贏
        await winOrLose();
        if (gameResult == '好人獲勝') {
            /*這裡加好人獲勝MODEL;*/
            $('.image').remove();
            goodwin();
            Speak('遊戲結束，好人獲勝');
            return;
        }
        else if (gameResult == '狼人獲勝') {
            /*這裡加狼人獲勝MODEL;*/
            $('.image').remove();
            wolfwin();
            Speak('遊戲結束，好人獲勝');
            return;
        }

        //----------遺言---------
        console.log(deadNum);
        for (let i = 0; i < deadNum.length; i++) {
            Speak(`${deadNum[i] + 1}號玩家請發表遺言`);
            await timeOn(1);
            if (players[deadNum[i]].account == myaccount) {
                document.getElementById("PeoplesendButton").hidden = false;
            }
            await timeOn(20);
            document.getElementById("PeoplesendButton").hidden = true;
        }
    }
}

function prepare() {
    $('.all').remove();
    signalrListener();
    wait();
    //document.querySelector('#again').addEventListener('click', function () {
    //    waitPeople = waitPeople + 1;
    //    document.querySelector('#app').innerHTML = `${waitPeople}/10`
    //    if (waitPeople > 9) {
    //        $('#waitappendId').hide();
    //        $('.image').show();
    //        connection.invoke("GetRole", myroomid);
    //        game();
    //    }
    //})
}

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