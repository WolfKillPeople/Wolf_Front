$('body').append(`
 <div class="ScoreTop mx-auto">
        <p class="ScoreTotal"></p>
 </div>



        <div class="back_room sticky-top mx-auto">
        <a class="back_room sticky-top mx-auto" href="https://werewolfkill.azurewebsites.net/Html/Room.html"><img class="home_btn" src="https://i.imgur.com/PbATsJo.png"></img></a>
    </div>
    
 
     
    <div class="accordion" id="accordionExample">
    
     <div class="card">
            <div class="card-header" id="AvatarBtn">
                <h2 class="mb-0 text-center">
                    <button class="btn collapsed " type="button" data-toggle="collapse" data-target="#avatarChange"
                        aria-expanded="false" aria-controls="avatarChange">
                        頭像更換
                    </button>
                </h2>
            </div>
            <div id="avatarChange" class="collapse show" aria-labelledby="AvatarBtn" data-parent="#accordionExample">
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
                       商品抽獎
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
                                        <div class="col-md-4">
                                            <img src="https://i.imgur.com/us10lLd.png" class="card-img-top "
                                                alt="witch">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:麥x勞禮卷</h5>
                                                <p class="card-text">簡介:買份薯條邊玩狼人殺吧~!!</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;390</small></p>
                                                <div class="cartBtn" onclick="lottery(this)" data-order="0">
                                                  <i class="fas fa-dice" aria-hidden="true"></i>
                                                        <span class="cartText">點選直接抽獎</span>
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
                                            <img src="https://i.imgur.com/8ibaOrW.png" class="card-img-top "
                                                alt="witch">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:麥基肯禮卷</h5>
                                                <p class="card-text">簡介:享受不同搭配的激情...我是指肯x基的炸雞加麥x勞的薯條啦~🤪</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;8811</small></p>
                                                <div class="cartBtn" onclick="lottery(this)" data-order="1">
                                                  <i class="fas fa-dice" aria-hidden="true"></i>
                                                        <span class="cartText">點選直接抽獎</span>
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
                                            <img src="https://i.imgur.com/GklqdMB.png" class="card-img-top"
                                                alt="wolf_king"
                                                style="width:134px;height:134px; margin-left:15px;margin-top:20px;">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:BS貼紙</h5>
                                                <p class="card-text">簡介:Dann哥直接送啦~!</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;1</small></p>
                                                <div class="cartBtn" onclick="lottery(this)" data-order="2">
                                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接兌換</span>
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
                                            <img src="https://i.imgur.com/C4e9OFP.png" class="card-img-top "
                                                alt="witch">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:肯x基禮卷</h5>
                                                <p class="card-text">簡介:看大肌肌，買炸ㄐㄧㄐㄧ</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;1110</small></p>
                                                <div class="cartBtn" onclick="lottery(this)" data-order="3">
                                                  <i class="fas fa-dice" aria-hidden="true"></i>
                                                        <span class="cartText">點選直接抽獎</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6">
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 ">
                                            <img src="https://i.imgur.com/03Nt7Ru.png" class="card-img-top"
                                                alt="civilian">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:乂怒氣星x克乂</h5>
                                                <p class="card-text">簡介:去星x克玩狼人殺啦!!</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;3000</small></p>
                                                <div class="cartBtn" onclick="lottery(this)" data-order="4">
                                                   <i class="fas fa-dice" aria-hidden="true"></i>
                                                        <span class="cartText">點選直接抽獎</span>
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
                                            <img src="https://i.imgur.com/HNx1m3Q.png" class="card-img-top "
                                                alt="hunter">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:SeaOtterFood</h5>
                                                <p class="card-text">簡介:今晚你想來點...Dann哥買單</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;390</small></p>
                                                <div class="cartBtn" onclick="lottery(this)" data-order="5">
                                                    <i class="fas fa-dice" aria-hidden="true"></i>
                                                        <span class="cartText">點選直接抽獎</span>
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
                                            <img src="https://i.imgur.com/vS2gsjI.png" class="card-img-top "
                                                alt="prophet">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:女友</h5>
                                                <p class="card-text">簡介:忙著打程式沒時間交女朋友嗎~?抽到就送你啦!!</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;10000</small></p>
                                                <div class="cartBtn"onclick="lottery(this)" data-order="6">
                                                   <i class="fas fa-dice" aria-hidden="true"></i>
                                                        <span class="cartText">點選直接抽獎</span>
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
                                            <img src="https://i.imgur.com/gBmvwZj.png" class="card-img-top " alt="wolf">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">名稱:信義區精華地段房子一間</h5>
                                                <p class="card-text">簡介:位於臺北市信義區西村里8鄰信義路五段7號，共有101層</p>
                                                <p class="card-text price"><small
                                                        class="text-muted">積分:&emsp;99999999</small></p>
                                                <div class="cartBtn" onclick="lottery(this)" data-order="7">
                                                   <i class="fas fa-dice" aria-hidden="true"></i>
                                                        <span class="cartText">點選直接抽獎</span>
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

            <div class="card">
            <div class="card-header" id="ScoresBtn">
                <h2 class="mb-0 text-center">
                    <button class="btn collapsed show" type="button" data-toggle="collapse" data-target="#ScoresChange"
                        aria-expanded="false" aria-controls="ScoresChange">
                        兌換券
                    </button>
                </h2>
            </div>
            <div id="ScoresChange" class="collapse " aria-labelledby="ScoresBtn" data-parent="#accordionExample">
                 <!-- bg -->   
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                    <div class="balloon"></div>
                   
                <!-- bg -->

                <div class="card-body CardmainPart voucher-part" id="mainPart">
                     <div id="qrcode"></div>
                    <img id="image-buffer" src="" width=200 height=200 style="display: none;">
                    
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