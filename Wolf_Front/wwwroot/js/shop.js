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
                var img = JSON.parse(res).data.link;
                document.querySelector('#avatat').setAttribute('src', img);
                alert(res.data.link)
                // $('#user_pic').modal('hide')
            });
        }
    }
});

$(document).ready(function () {
    // $('#upload_icon').click(function () {
    //     $('#update').click();
    // });
    $('#user_img').click(function () {
        $('#update').click();
    });

});
