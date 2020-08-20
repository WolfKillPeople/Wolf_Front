$('body').append(`
 <div class="ScoreTop mx-auto">
        <p class="ScoreTotal"></p>
    </div>
        <div class="back_room sticky-top mx-auto">
        <a href="https://werewolfkill.azurewebsites.net/Html/Room.html">回到房間頁</a>
    </div>
     
    <div class="accordion" id="accordionExample">
<div class="card">
            <div class="card-header" id="AvatarBtn">
                <h2 class="mb-0 text-center">
                    <button class="btn collapsed" type="button" data-toggle="collapse" data-target="#avatarChange"
                        aria-expanded="false" aria-controls="avatarChange">
                        頭像更換
                    </button>
                </h2>
            </div>
            <div id="avatarChange" class="collapse" aria-labelledby="AvatarBtn" data-parent="#accordionExample">
                 <!-- bg -->   
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                   
                <!-- bg -->

                <div class="card-body CardmainPart" id="mainPart">
                   
                     <p class="header-score">積分:5</p>
                    <div class="imgcontainer mx-auto d-flex justify-content-center">
                        <div class="btn user_img_btn" id="user_img" title="選擇更換頭像">
                            <img id="avatat" class="avatat" src="" alt="user">
                        </div>                     
                    </div>                   
                </div>
                 <div class="mr-2 mb-3 confirm_div">
                     <p class="confirm">確認兌換</p>
                </div>  
            </div>
        </div>
        <div class="card"> 
            <div class="card-header" id="roleCard">
                <h2 class="mb-0 text-center">
                    <button class="btn" type="button" data-toggle="collapse" data-target="#roleBtn" aria-expanded="true"
                        aria-controls="roleBtn">
                       兌換商品
                    </button>
                </h2>
            </div>

            <div id="roleBtn" class="collapse" aria-labelledby="roleCard" data-parent="#accordionExample">
                <div class="card-body CardmainPart">
                    <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 ">
                                            <img src="https://i.imgur.com/gC3x8Wf.png" class="card-img-top"
                                                alt="civilian">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:超級xx歐</h5>
                                                <p class="card-text">簡介:玩家可以操作的角色除了原本的瑪利歐、路易吉和奇諾比奧外，還新增以朋友身份加入的「偷天兔」和「奇諾比珂」兩名各具特色的新角色。</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;3000</small></p>
                                                <div class="cartBtn">
                                                   <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="card mb-3" style="max-width:540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="https://i.imgur.com/Bmh3iY8.png" class="card-img-top "
                                                alt="hunter">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:swxxxh健身環</h5>
                                                <p class="card-text">簡介:在死亡時可帶走一名玩家，在被毒死時不可以開槍。(也可以壓槍不帶人走)</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;5000</small></p>
                                                <div class="cartBtn">
                                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="https://i.imgur.com/XP8TMDH.png" class="card-img-top "
                                                alt="prophet">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:swxxxh主機</h5>
                                                <p class="card-text">簡介:每晚可以驗證一名玩家身分，只能得知其身分為好人或狼人，無法確切得知其身分。</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;10000</small></p>
                                                <div class="cartBtn">
                                                   <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="https://i.imgur.com/6cv5qtu.png" class="card-img-top " alt="wolf">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:動物xx會</h5>
                                                <p class="card-text">簡介:夜間可以溝通，共同決定將殺害哪名玩家並商討戰術。</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;8000</small></p>
                                                <div class="cartBtn">
                                                   <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="https://i.imgur.com/rg0TOUj.gif" class="card-img-top"
                                                alt="wolf_king"
                                                style="width:134px;height:134px; margin-left:15px;margin-top:20px;">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:BS禮卷</h5>
                                                <p class="card-text">簡介:死亡後可以開槍殺死一名玩家，被毒則不可以開槍。</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;500</small></p>
                                                <div class="cartBtn">
                                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4">
                                            <img src="https://i.imgur.com/T9Mc7Rd.png" class="card-img-top "
                                                alt="witch">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:麥x勞禮卷</h5>
                                                <p class="card-text">簡介:有一瓶解藥與一瓶毒藥，一晚只能使用一瓶藥，可以自救。</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;390</small></p>
                                                <div class="cartBtn">
                                                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    <div class="d-flex row" style="height: 600px;">
                        <div class="upLoadImg btn" id="upLoadImg">
                            <span class="upload_icon" id="upload_icon">+</span>
                            <input type="file" id="update" class="btn users_pic plus" v-on:change="load">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


`)