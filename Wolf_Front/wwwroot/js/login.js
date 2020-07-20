
document.getElementById("Start_Game_Btn").addEventListener('click', sign_in);
function sign_in() {
    $(".BG_img").css('background-image', 'none');
    $(".BG_img").css('background-image', 'url(https://i.imgur.com/ju4D4eS.png)');
    $("#login").modal('toggle')
}

document.getElementById("registered").addEventListener('click', registered_block);
function registered_block() {
    $("#registered_modal").modal('toggle')
}

document.getElementById("user_img").addEventListener('click', change_Userimg);
function change_Userimg() {
    $("#user_pic").modal('toggle')
}

$('.users_pic').click(changePICS(this));
$(document).ready(function () {
    $('#avatat').attr('src', "https://i.imgur.com/FMfI2fM.png");

});
function changePICS(e) {
    var getChoiceUrl = $(e).attr('src');
    // $('#avatat').attr('src','none');
    $('#avatat').attr('src', getChoiceUrl);
}
//imgur
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