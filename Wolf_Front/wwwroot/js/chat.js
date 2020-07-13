"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
document.getElementById("sendButton2").disabled = true;


connection.on("ReceiveMessage", function (user, message) {
    if (user == "人類") {
        document.getElementById("messagesList").hidden = false;
        document.getElementById("messagesList1").hidden = true;
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("messagesList").appendChild(li);
    }
    else if (user == "狼人") {
        document.getElementById("messagesList1").hidden = false;
        document.getElementById("messagesList").hidden = false;
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("messagesList1").appendChild(li);
    }


});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    document.getElementById("sendButton2").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("sendButton2").addEventListener("click", function (event) {
    var user = document.getElementById("userInput2").value;
    var message = document.getElementById("messageInput2").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});