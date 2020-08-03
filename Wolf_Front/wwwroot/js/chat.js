"use strict";

debugger
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
document.getElementById("sendButton2").disabled = true;

function ChangeDay() {
    var Day = document.getElementById("Day").value;
    if (Day == "白天") {
        document.getElementById('background').style.backgroundColor = "white";

    }
    else if (Day == "黑夜") {
        document.getElementById('background').style.backgroundColor = "gray";
    }
}

connection.on("ReceiveMessage", function (user, message) {
    var Day = document.getElementById("Day").value;
    if (user == "人類" && Day == "白天") {
        document.getElementById("PeoplemessagesList").hidden = false;
        document.getElementById("WolfmessagesList").hidden = true;


        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("PeoplemessagesList").appendChild(li);
    }
    else if (user == "狼人" && Day == "黑夜") {
        document.getElementById("WolfmessagesList").hidden = false;
        document.getElementById("PeoplemessagesList").hidden = false;
        //var UserName = document.getElementById("Name").textContent;
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("WolfmessagesList").appendChild(li);
    }


});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    document.getElementById("sendButton2").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});



document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById('userInput').value;
    var message = document.getElementById('messageInput').value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
});
document.getElementById("sendButton2").addEventListener("click", function (event) {
    //var user = document.getElementById("userInput2").value;
    var user = $('#userInput2').val();

    var message = document.getElementById("messageInput2").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
});

//-----------------SAMPLE----------------------
var roomId = 1;
var id;
var account = "oo";

$('#Create').click(function () {
    debugger
    connection.invoke("CreateRoom", roomId, account).then(function (response) {
        if (response.success) {
            id = response.data;
            alert(response.data);
        }
    });
});

$('#Delete').click(function () {
    connection.invoke("RemoveRoom", roomId).then(function (response) {
        if (response.success) {
            alert(response.success);
        }
    });
});

$('#GetAll').click(function () {
    connection.invoke("GetAllRoom").then(function (response) {
        if (response.success) {
            response.data.forEach(item => {
                console.log(item);
            });
        }
    })
})
