"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

var no = 1;
var door_page = 1;
var people;
// var countper = $(".perspective").length;
var close_img = 'https://i.imgur.com/TGuCa7L.png';
var open_img = 'https://i.imgur.com/582RIlF.png';
var doorImg;
var altImg;
var clicks = 0;
var nextRoom;
//var roomId;
//page
$(document).ready(function () {    
    connection.start().then(function () {
        displayDoor();
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

function displayDoor() {
    connection.invoke("GetAllRoom").then(function (response) {
        if (response.success) {
            nextRoom = response.tempNextRoom;
            //response.data.forEach(item => {
            //alert(item.count);
            for (var i = 0; i < response.data.length; i++) {
                clicks++;
                if (response.data[i].count == 10) {
                    doorImg = close_img;
                    altImg = 'close';
                }
                else {
                    doorImg = open_img;
                    altImg = 'open';
                }
                displayDoor();
                if (response.data[i].count == 10) {
                    document.querySelectorAll('.perspective')[i].removeAttribute("onclick");
                }
            }
            function displayDoor() {
                if (clicks == 1) {
                    $(`.door_all`).append(`<div class="page page-${door_page} active">
                                            <div class="half left">
                                            <div class="perspective" onclick="openDoor(this)">
                                            <div class="thumb">
                                            <img src=${doorImg} alt=${altImg} class="door_card" />
                                            </div>
                                            <div class="number">
                                            <p class="door_number">${response.data[i].roomId.toString().padStart(3, '0')}</p>
                                            <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${response.data[i].roomId}" onclick="addPeople(this)"/></a>
                                             <p class="people">人數: ${response.data[i].count}/10</p>
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
                                        <p class="door_number">${response.data[i].roomId.toString().padStart(3, '0')}</p>
                                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${response.data[i].roomId}" onclick="addPeople(this)"/></a>
                                        <p class="people">人數: ${response.data[i].count}/10</p>
                                    </div>          
                                </div>`);
                }
                else if ((clicks > 4 && clicks <= 8) || (clicks > 12 & clicks <= 16)) {
                    $(`.page-${door_page}>.right`).append(`<div class="perspective" onclick="openDoor(this)">
                                <div class="thumb">
                                    <img src=${doorImg} alt=${altImg} class="door_card" />
                                </div>
                                <div class="number">
                                    <p class="door_number">${response.data[i].roomId.toString().padStart(3, '0')}</p>
                                    <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${response.data[i].roomId}" onclick="addPeople(this)"/></a>
                                    <p class="people">人數: ${response.data[i].count}/10</p>
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
                                                <p class="door_number">${response.data[i].roomId.toString().padStart(3, '0')}</p>
                                                <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${response.data[i].roomId}" onclick="addPeople(this)"/></a>
                                                <p class="people">人數: ${response.data[i].count}/10</p>
                                            </div>          
                                        </div>
                                    </div><div class="half right withText">
                                    </div>
                                    </div>`);
                    $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page}"></li>`)
                }

            }
            //});
        }
    })
}

$(".add_room_btn").on("click", addDoor);
var account = "登凱";
function addDoor() {
    connection.on("NewRoom", function (xid) {
        //alert(xid);        
    });

    connection.invoke("CreateRoom", nextRoom, account).then(function (response) {
        if (response.success) {
            //alert(response.data);
            //alert(response.message);
            //nextRoom = response.tempNextRoom;
            alert(nextRoom);
            clicks++;
            AddOneDoor();
            nextRoom = response.tempNextRoom;
            function AddOneDoor() {
                //play1 = localStorage.getItem('myName');
                if (clicks == 1) {
                    $(`.door_all`).append(`<div class="page page-${door_page} active">
            <div class="half left">
            <div class="perspective" onclick="openDoor(this)">
                    <div class="thumb">
                        <img src=${open_img} alt="open" class="door_card" />
                    </div>
                    <div class="number">
                        <p class="door_number">${nextRoom.toString().padStart(3, '0')}</p>
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)" /></a>
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
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)"/></a>
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
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)" /></a>
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
                        <a href="#"><img src="https://i.imgur.com/V5A0Z92.gif" alt="wolf" class="wolf wolf${nextRoom}" onclick="addPeople(this)" /></a>
                        <p class="people">人數: 1/10</p>
                    </div>          
                </div>
            </div><div class="half right withText">
            </div>
            </div>`);

                    $('.scroll_ul').append(`<li data-target="${door_page}" class="nav-btn nav-page${door_page}"></li>`)
                }

            }
        }
    });
}

//People
function addPeople(member) {
    connection.on("GetAll", function (people) {
        //alert(people);
    });
    var strRoomId = $(member).attr('class').substring(9);
    var roomId = parseInt(strRoomId);
    connection.invoke("JoinRoom", roomId, account).then(function (response) {
        if (response.success) {
            alert('加人成功~~');
            $('.page').remove();
            $('.nav-btn').remove();
            clicks = 0;
            door_page = 1;
            displayDoor();
        }
    });
}

function deleteRoom() {
    //alert('delete');
    connection.on("GetAll", function (room) {
        //alert(people);
    });
    //var strRoomId = $(del).attr('class').substring(9);
    //var roomId = parseInt(strRoomId);
    var delroom = 2;
    connection.invoke("RemoveRoom", delroom).then(function (response) {
        if (response.success) {
            alert('刪除成功');
            $('.page').remove();
            $('.nav-btn').remove();
            clicks = 0;
            door_page = 1;
            displayDoor();
        }
    });
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