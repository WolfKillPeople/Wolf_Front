$('body').append(`    <div class="all">
        <div class="sky_all">
            <div class="sky">
                <canvas id="sky"></canvas>
            </div>
            <div style="position: relative;">
                <div class="add_room_container">
                    <a href="#" class="add_room_href">
                        <div class="add_room_btn">
                            <span id="add_btn">+創建房間</span>
                            <div class="dot"></div>
                        </div>
                    </a>
                    <form id="search_content">
                        <input v-for="item in " type="text" name="room" class="input" id="search-input"
                            placeholder="ID">
                        <button type="reset" class="search" id="search-btn"></button>
                    </form>
                    <button id="trigger" class="trigger-button" type="button"> 遊戲規則</button>

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
        </div>

        <input type="checkbox" id="toggle"></input>

        <!-- Menu -->
        <aside class="leftbar">
            <label for="toggle" class="exit">&times;</label>
            <div class="imgcontainer mx-auto d-flex justify-content-center user_img">
                <div class="btn user_img_btn" data-toggle="tooltip" data-placement="right" id="user_img" title="選擇更換頭像">
                    <img id="avatat" class="avatat" src="" alt="user" v-model="item.PicUrl"
                        onclick="change_Userimg(this)">
                </div>
            </div>
            <ul class="member_info justify-content-start my-5">
                <li>
                    <span class=ml-1>會員帳號 :</span> <span class="Account_email ml-2"> </span>
                </li>
                <li class="mt-3">
                    <span class=ml-1>目前積分 :</span> <span class="Account_Score ml-2"> </span>
                </li>
                <li class="mt-3 text-left">
                    <a class="btn Shopping_btn" style="color:#000;" href="#">前往商城</a>
                </li>

            </ul>
        </aside>

        <!-- Content -->
        <div class="content left_part">
            <label for="toggle" class="button menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>


        <!-- userImg Modal -->
        <div class="modal fade " id="user_pic" tabindex="-1" role="dialog" aria-labelledby="userImgModal"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content user_Choiceimg">
                    <div class="modal-header border-bottom-0 user_btn">
                        <h5 class="modal-title" id="userImgModalLabel">頭像選擇</h5>
                        <button type="button" class="btn close_btn pt-0" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" style="font-size:25px">&times;</span>
                        </button>
                    </div>
                    <div class="d-flex row">
                        <!-- onclick="changePICS(this)" -->
                        <img aria-label="Close" class="btn users_pic" src="https://i.imgur.com/9Pbvhnk.png" alt="girl1"
                            onclick="changePICS(this)">
                        <img aria-label="Close" class="btn users_pic" src="https://i.imgur.com/ayhI3DJ.png" alt="girl2"
                            onclick="changePICS(this)">
                        <img aria-label="Close" class="btn users_pic" src="https://i.imgur.com/XFglbZc.png" alt="girl3"
                            onclick="changePICS(this)">
                    </div>
                    <div class="d-flex row">
                        <img aria-label="Close" class="btn users_pic" src="https://i.imgur.com/HBcZ8nk.png" alt="boy2"
                            onclick="changePICS(this)">
                        <img aria-label="Close" class="btn users_pic" src="https://i.imgur.com/FMfI2fM.png" alt="boy1"
                            onclick="changePICS(this)">
                        <img aria-label="Close" class="btn users_pic" src="https://i.imgur.com/vRjQfJc.png" alt="boy3"
                            onclick="changePICS(this)">
                        <!--<div class="upLoadImg btn" id="upLoadImg">
                                <span class="upload_icon" id="upload_icon">+</span>
                                <input type="file" id="update" class="btn users_pic plus" v-on:change="load">
                            </div>-->
                    </div>
                    <div class="mr-2 mb-3 confirm_div">
                        <button class="btn btn-primary confirmBtn d-flex pl-3 pr-3" data-dismiss="modal">確認</button>
                    </div>
                </div>
            </div>
        </div>

        <audio autoplay="autoplay" loop="loop" id="RoomAudio">
            <source src="../music/room.mp3" type="audio/mpeg">
        </audio>

        <button id="RoomMusic" type="button">🎵</button>
    </div>

`)
