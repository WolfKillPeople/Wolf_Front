var json = {
    Name: "",
    PicUrl: "",
    Account: "",
    Password: ""
};

function AddNewAccount() {
    var AddAccount = {
        Name: $('#Name_ID'),
        PicUrl: $('#avatat'),
        Account: $('#Email_ID'),
        Password: $('#USer_password')
    };
}

document.getElementById("user_img").addEventListener('click', change_Userimg);
function change_Userimg() {
    // $("#user_pic").modal('toggle')
}

$('#user_img').click(changePICS(this));
var img;
function changePICS(e) {
    var getChoiceUrl = $(e).attr('src');
    // $('#avatat').attr('src','none');
    $('#avatat').attr('src', getChoiceUrl);
}
const id = '4cff1caaf837963';
const token = '400e8f22a1c97f65cf0e988b0940b5ab556680b7';
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
                img = JSON.parse(res).data.link;
                document.querySelector('#avatat').setAttribute('src', img);
                alert(img);
                $('.confirm').on('click', confirmClick);
                $('.confirm').css({ "background": "#cd5c5c" });
                $('.confirm').css({ "color": "#fff" });
                $('.confirm').css({ "cursor": "pointer" });
                // $('#user_pic').modal('hide')
            });
        }
    }
});

var email = "a1256963@gmail.com";
var getwin;
var pic;
$(document).ready(function () {
    // $('#upload_icon').click(function () {
    //     $('#update').click();
    // });
    $('#user_img').click(function () {
        $('#update').click();
    });

    

    //Score
    let emailData =
    {
        email: email
    }
    $.ajax({
        type: 'POST',
        url: 'https://wolfpeoplekill.azurewebsites.net/api/UserRegister/LoingPostpic',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(emailData),
        success: function (msg) {
            arry = msg;
            //alert(arry[0].win);
            getwin = arry[0].win;
            pic = arry[0].pic;
            $('.ScoreTotal').append(`目前總積分:${getwin}`);
            $('.avatat').attr('src', `${pic}`);
        }
    });
    $('.confirm').css({ "background": "#CCCC99" });
    $('.confirm').css({ "color": "#000" });
    $('.confirm').css({ "cursor": "not-allowed" });
});

//Confirm
function confirmClick() {
    getwin = getwin - 5;
    $('.ScoreTotal').empty();
    $('.ScoreTotal').append(`目前總積分:${getwin}`);
    let ScoreData =
    {
        "email": email,
        "win": getwin,
        "pic": img
    }
    $.ajax({
        type: 'POST',
        url: 'https://wolfpeoplekill.azurewebsites.net/api/Store',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(ScoreData),
        success: function (msg) {
            alert('兌換成功!!');
            $('.confirm').off('click');
            $('.confirm').css({ "background": "#CCCC99" });
            $('.confirm').css({ "color": "#000000" });
            $('.confirm').css({ "cursor": "not-allowed" });
        }
    });
    
}






