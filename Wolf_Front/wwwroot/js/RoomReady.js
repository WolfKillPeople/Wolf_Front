$('body').append(`<div class="sky_all">
<div class="sky">
    <canvas id="sky"></canvas>
</div>
<div style="position: relative;">
    <div class="add_room_container">
        <div class="add_room_href">
            <div class="add_room_btn">
                <span id="add_btn">+創建房間</span>
                <div class="dot"></div>
            </div>
        </div>

        <form id="search_content">
            <input v-for="item in " type="text" name="input" class="input" id="search-input" placeholder="ID">
            <button type="reset" class="search" id="search-btn"></button>
        </form>
    </div>
    <button id="trigger" class="trigger-button" type="button">遊戲規則</button>

    <div id="content">
        <h1 class="how_to_play_title">簡易規則</h1>
        <p>
            1. 被票出去有遺言
            <br />
            2.夜晚被殺沒有遺言
            <br />
            3.屠邊局(民死或神死)
            <br />
            <img src="//i.imgur.com/8tiIFAB.png" alt="預言家" class="role" />預言家
            <br />
            功能是每晚可以驗證一名玩家身分，只能得知其身分為好人或狼人，無法確切得知其身分。
            <br />
            <img src="//i.imgur.com/i9eRyug.png" alt="女巫" class="role" />女巫
            <br />
            有一瓶解藥與一瓶毒藥，一晚只能使用一瓶藥，可以自救。
            <br />
            <img src="//i.imgur.com/TIvcUG5.png" alt="獵人" class="role" />獵人
            <br />
            在死亡時可以帶走一名玩家，在被毒死時不可以開槍。(也可以壓槍不帶人走)
            <br />
            <img src="//i.imgur.com/D2o6MV6.png" alt="村民(女)" class="role" />
            <img src="//i.imgur.com/4eJqZgk.png" alt="村民(男)" class="role" />村民
            <br />
            沒有任何技能，僅白天可以公投出心中的狼人。
            <br />
            <img src="//i.imgur.com/n7knadr.png" alt="狼人" class="role" />狼人
            <br />
            夜間可以溝通，共同決定將殺害哪名玩家並商討戰術。
            <br />
            <img src="//i.imgur.com/fVQQgnM.png" alt="狼王" class="role" />狼王
            <br />
            死亡後可以開槍殺死一名玩家，被毒則不可以開槍。(可以自爆帶人)
        </p>
    </div>

    <div class="door_all">
    </div>
    <div class="nav-panel">
        <div class="scroll-btn up"></div>
        <div class="scroll-btn down"></div>
        <nav>
            <ul class="scroll_ul">
            </ul>
        </nav>
    </div>
</div>
</div>`)