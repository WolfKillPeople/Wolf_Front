function wolfwin() {
    $('body').append(`
  <div class="modal fade bd-example-modal-xl show" id="wolfmodal" tabindex="-1" role="dialog"aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="modal-content" style="width: 1138px; height: 565px; background-color:#002142; ">

                <div class="all_wolf">
                   
                    <div class="frame">
                        <div class="titlecontainer">
                            <div class="boys">
                                <span> 狼 </span>
                                <span>人</span>
                                <span>獲</span>
                                <span>勝</span>
                            </div>
                        </div>
                        <div class="constellation stars-a">
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
                        </div>
                        <div class="constellation stars-b">
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
                        </div>
                        <div class="moon"></div>
                        <div class="wolf"></div>
                    </div>
                     <!-- //返回遊戲大廳 -->
                      <!-- //返回遊戲大廳 -->
                      <div class="backgame">
                        <a class="btn-reveal-wolfwin again btn" href="#" id="again">
                            <div class="border-left-wolfwin">
                                <span class="arrow-top-wolfwin"></span>
                                <span class="arrow-bottom-wolfwin"></span>
                            </div>
                            <div class="border-top-wolfwin"></div>
                            <div class="border-right-wolfwin"></div>
                            <div class="border-bottom-wolfwin"></div>
                            <div class="border-bottom-left-wolfwin"></div>
                            <div class="border-top-left-wolfwin"></div>
                          來去抽獎囉!
                        </a>
                </div>


            </div>
        </div>
    </div>

`)
    $('#"wolfmodal').modal('show');
}