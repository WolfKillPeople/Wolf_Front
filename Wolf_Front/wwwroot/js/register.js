window.onload = function () { $('#music_btn').click(play()); }

function play() {
    var Bgm_music = document.getElementById("Bgm_music");
    Bgm_music.play();
};
$("body").addClass("bgm-pic");
var json = {
    Name: "",
    PicUrl: "",
    Account: "",
    Password: ""
};

function AddNewAccount() {
    var AddAccount = {
        Name:$('#Name_ID'),
        PicUrl:$('#avatat'),
        Account:$('#Email_ID'),
        Password:$('#USer_password')                
    };            
}      

document.getElementById("user_img").addEventListener('click', change_Userimg);
function change_Userimg() {
    $("#user_pic").modal('toggle')
}

$('.users_pic').click(changePICS(this));

//預設一張圖
$(document).ready(function () {
    $('#avatat').attr('src', "https://i.imgur.com/FMfI2fM.png");

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

$('.registered_Account').click(function () {
    var getOriPic = $('#avatat').attr('src');
    console.log(getOriPic);
    localStorage.setItem('Register_pic', `${getOriPic}`);
    //petch??

    //$.ajax({
    //    type: 'POST',
    //    url: 'https://wolfpeoplekill.azurewebsites.net/api/Room/AddRoom',
    //    dataType: 'json',
    //    contentType: 'application/json;charset=UTF-8',
    //    data: JSON.stringify(jsonData),
    //    success: function (msg) {
    //        //alert('Data Saved: ' + msg);
    //    }
    //});
})
