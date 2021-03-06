﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").withAutomaticReconnect([0, 0, 10000]).build();


//Disable send button until connection is established
document.getElementById("PeoplesendButton").disabled = true;
document.getElementById("WolfsendButton").disabled = true;



function ChangeDay() {
    var Day = document.getElementById("Day").value;
    if (Day == "白天") {
        document.getElementById('background').style.backgroundColor = "white";

    }
    else if (Day == "黑夜") {
        document.getElementById('background').style.backgroundColor = "gray";
    }
}

connection.on("ReceiveMessage", function (user, message, roomId) {
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
    document.getElementById("PeoplesendButton").disabled = false;
    document.getElementById("WolfsendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});



document.getElementById("PeoplesendButton").addEventListener("click", function (event) {
    //var user = document.getElementById('userInput').value;
    var message = document.getElementById('PeoplemessageInput').value;
    var user;
    if (message != "") {
        user = "人類";
        connection.invoke("SendMessage", user, message, roomId).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById('PeoplemessageInput').value = "";
    }
});

document.getElementById("WolfsendButton").addEventListener("click", function (event) {
    var user;
    var message2 = document.getElementById("WolfmessageInput").value;
    if (message2 != "") {
        user = "狼人";
        connection.invoke("SendMessage", user, message2, roomId).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById('WolfmessageInput').value = "";
    }
});

//-----------------SAMPLE----------------------
var backVoteResult = [{
    "RoomID": 1,
    "Account": "oo",
    "Vote": "2",
    "voteResult": null
}];

connection.on("VoteResult",
    function(data) {
        console.log(data);
    });

$('#Test').click(function () {

    connection.invoke("Vote", backVoteResult);
});