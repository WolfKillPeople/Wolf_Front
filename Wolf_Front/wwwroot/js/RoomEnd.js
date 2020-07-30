let no = 1;
let door_page = 1;
let people;
// var countper = $(".perspective").length;
let close_img = 'https://i.imgur.com/TGuCa7L.png';
let open_img = '//i.imgur.com/582RIlF.png';
let alt_close = 'close';
let alt_open = 'open';
let clicks = 0;
//page
$(document).ready(function () {

    let ary;
    $.ajax({
        type: 'GET',
        url: 'https://localhost:5001/api/Room/CurrentRoom',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        async:false,
        success: function (msg) {
            ary = msg;
            var doorlength = ary.length;
            alert(ary.length);
            
            for (var i = 0; i < ary.length; i++) {
                displayDoor();
                no++;
                for (var j = 0; j <= msg.length - 1; j++) {
                    console.log(msg[j].roomId);
                }
            }
        }
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

    function displayDoor() {
        play1 = localStorage.getItem('myName');
        let id = no.toString().padStart(3, '0');

        clicks += 1;
        $.ajax({
            type: 'GET',
            url: 'https://wolfpeoplekill.azurewebsites.net/api/Room/CurrentRoom',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            async: false,
            success: function (msg) {
                people = msg;
                var doorlength = people.length;
                console.log(msg[0].totalPlayers);
                let doorId = (people[no - 1].roomId).toString().padStart(3, '0');
            }
        });
        if (clicks == 1) {
            $(`.door_all`).append(`<div class="page page-${door_page} active">
            <div class="half left">
            <div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${(people[no - 1].roomId).toString().padStart(3, '0')}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${people[no - 1].roomId}" onclick="addPeople(this)"/></a>
                        <p class="people">人數: ${people[no - 1].totalPlayers}/10</p>
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
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${(people[no - 1].roomId).toString().padStart(3, '0')}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${people[no - 1].roomId}" onclick="addPeople(this)"/></a>
                        <p class="people">人數: ${people[no - 1].totalPlayers}/10</p>
                    </div>          
                </div>`);
        }
        else if ((clicks > 4 && clicks <= 8) || (clicks > 12 & clicks <= 16)) {
            $(`.page-${door_page}>.right`).append(`<div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${(people[no - 1].roomId).toString().padStart(3, '0')}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${people[no - 1].roomId}" onclick="addPeople(this)"/></a>
                        <p class="people">人數: ${people[no - 1].totalPlayers}/10</p>
                    </div>          
                </div>`);
        }
        else if (clicks == 17) {
            door_page += 1;
            clicks = 1;
            $('.door_all').append(`<div class="page page-${door_page}">
            <div class="half left">
            <div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${(people[no - 1].roomId).toString().padStart(3, '0')}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${people[no - 1].roomId}" onclick="addPeople(this)"/></a>
                        <p class="people">人數: ${people[no - 1].totalPlayers}/10</p>
                    </div>          
                </div>
            </div><div class="half right withText">
            </div>
            </div>`);
            $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page}"></li>`)
        }

    }

});
//People
function addPeople(member) {
    $.ajax({
        type: 'GET',
        url: 'https://wolfpeoplekill.azurewebsites.net/api/Room/CurrentRoom',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        async: false,
        success: function (msg) {
            people = msg;
        }
    });

    play1 = localStorage.getItem('myName');
    var RoomId = $(member).attr('class').substring(9);
    for (let j = 0; j < people.length; j++) {
        if (people[j].roomId == RoomId) {
            var Player1 = people[j].player1;
            var Player2 = people[j].player2;
            var Player3 = people[j].player3;
            var Player4 = people[j].player4;
            var Player5 = people[j].player5;
            var Player6 = people[j].player6;
            var Player7 = people[j].player7;
            var Player8 = people[j].player8;
            var Player9 = people[j].player9;
            var Player10 = people[j].player10;
        }
    }
    
    var array = [Player1, Player2, Player3, Player4, Player5, Player6, Player7, Player8, Player9, Player10];

    for (var i = 0; i < 10; i++) {
        if (array[i] == null) {
            array[i] = play1;
            console.log(array[i]);
            i = 11;
        }
    }
   

    var PatchData = [
        {
            "roomId": parseInt(RoomId),
            "player1": array[0],
            "player2": array[1],
            "player3": array[2],
            "player4": array[3],
            "player5": array[4],
            "player6": array[5],
            "player7": array[6],
            "player8": array[7],
            "player9": array[8],
            "player10": array[9],
        }
    ]
    $.ajax({
        url: 'https://wolfpeoplekill.azurewebsites.net/api/Room/UpdatePlayer',
        data: JSON.stringify(PatchData),
        type: 'PATCH',
        contentType: 'application/json;charset=UTF-8',
        processData: false,
        dataType: 'json',
        success: function (response) {
            console.log(response);
        }
    });
    localStorage.setItem('roomid', RoomId);
}
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

$(".add_room_btn").on("click", addDoor);
function addDoor() {
    AddOneDoor();
    $(function()
    {

        let jsonData = [
            {
                roomId: no,
                player1: `${play1}`,
            }
        ];

        $.ajax({
            type: 'POST',
            url: 'https://wolfpeoplekill.azurewebsites.net/api/Room/AddRoom',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(jsonData),
            success: function (msg) {
                alert('Data Saved: ' + msg);
                no++;
            }
        });

    });
}


function AddOneDoor() {
    play1 = localStorage.getItem('myName');
    let id = no.toString().padStart(3, '0');
    //var session = '<%Session(TempTestRoomID)%>;
    //alert(session); 
    clicks += 1;
    if (clicks == 1) {
        $(`.door_all`).append(`<div class="page page-${door_page} active">
            <div class="half left">
            <div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${id}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${no}" onclick="addPeople(this)" /></a>
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
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${id}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${no}" onclick="addPeople(this)"/></a>
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>`);
    }
    else if ((clicks > 4 && clicks <= 8) || (clicks > 12 & clicks <= 16)) {
        $(`.page-${door_page}>.right`).append(`<div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${id}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${no}" onclick="addPeople(this)" /></a>
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>`);
    }
    else if (clicks == 17) {
        door_page += 1;
        clicks = 1;
        $('.door_all').append(`<div class="page page-${door_page}">
            <div class="half left">
            <div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${close_img} alt=${alt_close} class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${id}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${people[no - 1].roomId}" onclick="addPeople(this)" /></a>
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>
            </div><div class="half right withText">
            </div>
            </div>`);

        $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page}"></li>`)
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
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const expand = () => {
    searchBtn.classList.toggle("close");
    input.classList.toggle("square");
};

searchBtn.addEventListener("click", expand);



//modal
// Create an immediately invoked functional expression to wrap our code
(function () {

    // Define our constructor 
    this.Modal = function () {

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