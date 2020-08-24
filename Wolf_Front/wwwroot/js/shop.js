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
                //alert(img);
                swal({
                    title: '更圖成功',
                    text: '點選確定兌換',
                    icon: 'success',
                    button: "確認",
                });
                if (getwin >= 5) {
                    $('.confirm').on('click', confirmClick);
                    $('.confirm').css({ "background": "#cd5c5c" });
                    $('.confirm').css({ "color": "#fff" });
                    $('.confirm').css({ "cursor": "pointer" });
                }
                
                // $('#user_pic').modal('hide')
            });
        }
    }
});

//var email = "a1256963@gmail.com";
var email = localStorage.getItem('myName');
var getwin;
var pic;
$(document).ready(function () {

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
            $('#image-buffer').attr('src', `${pic}`);
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
            swal({
                title: '兌換成功!!',
                text: `目前總積分:${getwin}`,
                icon: 'success',
                button: "確認",
            });
            //alert('兌換成功!!');
            $('.confirm').off('click');
            $('.confirm').css({ "background": "#CCCC99" });
            $('.confirm').css({ "color": "#000" });
            $('.confirm').css({ "cursor": "not-allowed" });
            $('#image-buffer').attr('src', `${pic}`);
        }
    });
    
}
const prizes = {
    0: "390",
    1: "8811",
    2: "1",
    3: "1110",
    4: "3000",
    5: "390",
    6: "10000",
    7: "99999999"
};
function lottery(e) {
    let i = $(e).attr('data-order');
    if (getwin >= prizes[i]) {
        getwin = getwin - prizes[i];
    }
    $('.ScoreTotal').empty();
    $('.ScoreTotal').append(`目前總積分:${getwin}`);
    let ScoreData =
    {
        "email": email,
        "win": getwin,
        "pic": pic
    }

    $.ajax({
        type: 'POST',
        url: 'https://wolfpeoplekill.azurewebsites.net/api/Store',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(ScoreData),
        success: function (msg) {
            if (i == 2) {
                swal({
                    title: '兌換成功',
                    text: `請至下方兌換券掃描QRcode找Dann哥兌換\n目前總積分:${getwin}`,
                    icon: 'success',
                    button: "確認",
                });
                $('.voucher-part').append('<a href = "https://werewolfkill.azurewebsites.net/html/voucher.html"> 跳至網頁</a>');
                $('#qrcode').empty().qrcode({
                    render: 'canvas',
                    ecLevel: 'H',
                    minVersion: 6,
                    mode: 4,
                    fill: '#000',
                    background: '#fff',
                    text: 'https://werewolfkill.azurewebsites.net/html/voucher.html',
                    quiet: 1,
                    radius: 0.2,
                    mPosX: 0.5,
                    mPosY: 0.5,
                    mSize: 0.20,
                    size: 250,
                    image: $('#image-buffer')[0]
                });

                //color.addEventListener('change', function () {
                //    $('#qrcode').empty().qrcode({
                //        render: 'canvas',
                //        ecLevel: 'H',
                //        minVersion: 6,
                //        mode: 4,
                //        fill: `${color.value}`,
                //        background: '#fff',
                //        text: 'https://werewolfkill.azurewebsites.net/html/voucher.html',
                //        quiet: 1,
                //        radius: 0.2,
                //        mPosX: 0.5,
                //        mPosY: 0.5,
                //        mSize: 0.20,
                //        size: 250,
                //        image: $('#image-buffer')[0]
                //    });
                //});
            }
            else if (getwin < prizes[i]) {
                swal({
                    title: '不夠積分喔!',
                    text: `目前總積分:${getwin}`,
                    icon: 'error',
                    button: "好的",
                });
            }
            else {
                swal({
                    title: '沒中😭',
                    text: `目前總積分:${getwin}`,
                    icon: 'error',
                    button: "確認",
                });
            } 
        }
    });  
}


//Choose color
var color = document.querySelector('.color-picker');

//Qrcode
$('#image-buffer').on('load', function () {
    $('#qrcode').append('暫無兌換券');
});






