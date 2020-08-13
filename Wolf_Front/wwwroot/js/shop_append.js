$('body').append(`
        <div class="back_room sticky-top mx-auto">
            <a href="https://werewolfkill.azurewebsites.net/Html/Room.html">回到房間頁</a>
        </div>
        
        <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="roleCard">
                <h2 class="mb-0 text-center">
                    <button class="btn" type="button" data-toggle="collapse" data-target="#roleBtn"
                        aria-expanded="true" aria-controls="roleBtn">
                        角色卡
                    </button>
                </h2>
            </div>

            <div id="roleBtn" class="collapse show" aria-labelledby="roleCard" data-parent="#accordionExample">
                <div class="card-body CardmainPart">
                    <div class="container">
                        <div class="row">
                            <div class="col-6">
                                <div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                        <div class="col-md-4 ">
                                            <img src="https://i.imgur.com/knEt3u8.png" class="card-img-top" alt="civilian">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">角色:平民</h5>
                                                <p class="card-text">描述:沒有任何技能，僅白天可以公投出心中的狼人。</p>
                                                <p class="card-text price"><small class="text-muted">價錢:&emsp;$250</small></p>
                                                <div class="cartBtn" >
                                                    <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span></a>
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
                                            <img src="https://i.imgur.com/xeKFrDb.png" class="card-img-top " alt="hunter">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">角色:獵人</h5>
                                                <p class="card-text">描述:在死亡時可帶走一名玩家，在被毒死時不可以開槍。(也可以壓槍不帶人走)</p>
                                                <p class="card-text price"><small class="text-muted">價錢:&emsp;$290</small></p>
                                                <div class="cartBtn" >
                                                    <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span></a>
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
                                            <img src="https://i.imgur.com/Q1yWIiU.png" class="card-img-top " alt="prophet">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">角色:預言家</h5>
                                                <p class="card-text">描述:每晚可以驗證一名玩家身分，只能得知其身分為好人或狼人，無法確切得知其身分。</p>
                                                <p class="card-text price"><small class="text-muted">價錢:&emsp;$340</small></p>
                                                <div class="cartBtn" >
                                                    <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span></a>
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
                                            <img src="https://i.imgur.com/x6SQfU4.png" class="card-img-top " alt="wolf">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">角色:狼人</h5>
                                                <p class="card-text">描述:夜間可以溝通，共同決定將殺害哪名玩家並商討戰術。</p>
                                                <p class="card-text price"><small class="text-muted">價錢:&emsp;$490</small></p>
                                                <div class="cartBtn" >
                                                    <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span></a>
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
                                            <img src="https://i.imgur.com/W0DoEeE.png" class="card-img-top" alt="wolf_king" style="width:134px;height:134px; margin-left:15px;margin-top:20px;">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">角色:狼王</h5>
                                                <p class="card-text">描述:死亡後可以開槍殺死一名玩家，被毒則不可以開槍。</p>
                                                <p class="card-text price"><small class="text-muted">價錢:&emsp;$500</small></p>
                                                <div class="cartBtn">
                                                    <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span></a>
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
                                            <img src="https://i.imgur.com/Qc2tpsC.png" class="card-img-top " alt="witch">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title">角色:女巫</h5>
                                                <p class="card-text">描述:有一瓶解藥與一瓶毒藥，一晚只能使用一瓶藥，可以自救。</p>
                                                <p class="card-text price"><small class="text-muted">價錢:&emsp;$390</small></p>
                                                <div class="cartBtn">
                                                    <a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                        <span class="cartText">直接購買</span></a>
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
        <div class="card">
            <div class="card-header" id="AvatarBtn">
                <h2 class="mb-0 text-center">
                    <button class="btn collapsed" type="button" data-toggle="collapse"
                        data-target="#avatarChange" aria-expanded="false" aria-controls="avatarChange">
                        頭像更換
                    </button>
                </h2>
            </div>
            <div id="avatarChange" class="collapse" aria-labelledby="AvatarBtn" data-parent="#accordionExample">
                <div class="card-body CardmainPart">
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
                    wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                    eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                    assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt
                    sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
                    farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
                    labore sustainable VHS.
                </div>
            </div>
        </div>
        
    </div>
    

`)