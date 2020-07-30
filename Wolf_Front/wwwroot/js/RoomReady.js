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
        <h1 class="how_to_play_title">會員資訊</h1>        
        <div class="imgcontainer mx-auto d-flex justify-content-center user_img">title
            <div class="btn user_img_btn" data-toggle="tooltip" data-placement="right" id="user_img" title="選擇更換頭像">
                <img id="avatat" class="avatat" src="https://i.imgur.com/9Pbvhnk.png" alt="user" v-model="item.PicUrl">
            </div>
        </div>
        <ul class="member_info justify-content-start my-5">
            <li>
                <p>會員帳號:</p>
            </li>
        </ul>
        
    </div>

 <!-- userImg Modal -->
    <div class="modal fade " id="user_pic" tabindex="-1" role="dialog" aria-labelledby="userImgModal"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content user_Choiceimg">
                <div class="modal-header border-bottom-0 user_btn">
                    <h5 class="modal-title" id="userImgModalLabel">頭像選擇</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="d-flex row">
                    <!-- onclick="changePICS(this)" -->
                    <img aria-label="Close" data-dismiss="modal" class="btn users_pic" src="./image/girl1.png"
                        alt="girl1" onclick="changePICS(this)">
                    <img aria-label="Close" data-dismiss="modal" class="btn users_pic" src="./image/girl2.png"
                        alt="girl2" onclick="changePICS(this)">
                    <img aria-label="Close" data-dismiss="modal" class="btn users_pic" src="./image/girl3.png"
                        alt="girl3" onclick="changePICS(this)">
                </div>
                <div class="d-flex row">
                    <img aria-label="Close" data-dismiss="modal" class="btn users_pic" src="https://i.imgur.com/9Pbvhnk.png" alt="boy2"
                        onclick="changePICS(this)">
                    <img aria-label="Close" data-dismiss="modal" class="btn users_pic" src="./image/boy3.png" alt="boy3"
                        onclick="changePICS(this)">
                    <div class="upLoadImg btn" id="upLoadImg">
                        <span class="upload_icon" id="upload_icon">+</span>
                        <input type="file" id="update" class="btn users_pic plus" v-on:change="load">
                    </div>
                </div>
            </div>
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
</div>`)