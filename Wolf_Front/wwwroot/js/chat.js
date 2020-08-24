"use strict";

//Disable send button until connection is established
document.getElementById("PeoplesendButton").disabled = false;
document.getElementById("WolfsendButton").disabled = false;



function ChangeDay() {
    var Day = document.getElementById("Day").value;
    if (Day == "白天") {
        document.getElementById('background').style.backgroundColor = "white";

    }
    else if (Day == "黑夜") {
        document.getElementById('background').style.backgroundColor = "gray";
    }
}

connection.on("ReceiveMessage", function (Profrssion, message, roomId) {
    var Day = document.getElementById("Day").value;
    if (Day == "白天") {
        document.getElementById("PeoplemessagesList").hidden = false;
        document.getElementById("WolfmessagesList").hidden = true;


        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("PeoplemessagesList").appendChild(li);
    }
    else if ((Profrssion == myJob || Profrssion == myJob) && Day == "黑夜") {
        document.getElementById("WolfmessagesList").hidden = false;
        document.getElementById("PeoplemessagesList").hidden = true;
        //var UserName = document.getElementById("Name").textContent;
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("WolfmessagesList").appendChild(li);
    }
    else if (Day == "黑夜" && (Profrssion != myJob || Profrssion != myJob)) {
        document.getElementById("PeoplemessagesList").hidden = true;
        document.getElementById("WolfmessagesList").hidden = true;


        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = msg;
        var li = document.createElement("li");
        //li.textContent = encodedMsg;
        //document.getElementById("WolfmessagesList").appendChild(li);
    }


});



document.getElementById("PeoplesendButton").addEventListener("click", function (event) {
    //var user = document.getElementById('userInput').value;
    var message = document.getElementById('PeoplemessageInput').value;
    if (message != "") {
        var Profrssion = myJob;
        connection.invoke("SendMessage", Profrssion, message, myroomid).catch(function (err) {
            return console.error(err.toString());
        });
        document.getElementById('PeoplemessageInput').value = "";
    }
});

document.getElementById("WolfsendButton").addEventListener("click", function (event) {
    var message2 = document.getElementById("WolfmessageInput").value;
    if (message2 != "") {
        var Profrssion = myJob;
        connection.invoke("SendMessage", Profrssion, message2, myroomid).catch(function (err) {
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

//connection.on("VoteResult",
//    function(data) {
//        console.log(data);
//    });

$('#Test').click(function () {

    connection.invoke("Vote", backVoteResult);
});