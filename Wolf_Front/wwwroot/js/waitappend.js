var waitPeople = 1;
function wait() {
    $('body').append(`
<div class="waitcontainer" id="waitappendId">

   <h1 class="ml3">等待玩家中......</h1>
<div class="Numberpeopleddiv" >

    <h1  class="Numberpeople" id="app">1/10</h1></div>
    <div class="moon">
        <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="mountain"><span></span><span></span><span></span>
    </div>
    <div class="mountain-right">
        <div class="mountain"><span></span><span></span><span></span>
        </div>
    </div>
    <div class="mountain-small">
        <div class="mountain"><span> </span><span> </span><span> </span>
        </div>
    </div>
    <div class="rock"><span></span><span></span><span></span><span></span>
    </div>
    <div class="rock rock-right"><span> </span><span> </span><span> </span><span> </span>
    </div>
    <div class="rock-shadow"></div>
    <div class="rock-shadow isright"></div>
    <div class="left">
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
    </div>
    <div class="path"></div>
    <div class="weak-light"></div>
    <div class="weak"></div>
    <div class="bottom">
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
    </div>
    <div class="path-detail-left"></div>
    <div class="home">
        <div class="roof"></div>
        <div class="left-wall"></div>
        <div class="wall"></div>
        <div class="window"></div>
    </div>
    <div class="right">
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
        <div class="tree">
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="bough"></div>
            <div class="body"></div>
        </div>
    </div>
    <div class="stars">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
    </div><span class="falling-star"></span><span class="falling-star"></span><span class="falling-star"></span>
    <a class="btn-reveal again btn" href="#" id="again">
        <div class="border-left">
            <span class="arrow-top"></span>
            <span class="arrow-bottom"></span>
        </div>
        <div class="border-top"></div>
        <div class="border-right"></div>
        <div class="border-bottom"></div>
        <div class="border-bottom-left"></div>
        <div class="border-top-left"></div>
      離開遊戲
     
    </a>
    </div>
`)



//字動畫
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({ loop: true })
    .add({
        targets: '.ml3 .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i + 1)
    }).add({
        targets: '.ml3',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 500
    });
}