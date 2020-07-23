var synth = window.speechSynthesis;
var voices = [];
function Speak(txtInput) {
    var toSpeak = new SpeechSynthesisUtterance(txtInput);
    var selectedVoiceName = 'Google 國語（臺灣）';
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
};
var wolf = function wolf() {

}
var witch = function witch() {

}
var prophet = function prophet() {

}
var hunter = function hunter() {

}
function timeOn(time, fun) {
    return new Promise((resolve, reject) => {
        var count = time;
        var totaltime = time;
        myCounter = setInterval(function () {
            count--;
            $('#time').html(padLeft(count.toString(), 2));
            update(count, totaltime);

            if (count > 0) {
                fun();
            }
            else {
                clearInterval(myCounter);
                var disableAll = document.querySelectorAll('button');
                disableAll.forEach(element => {
                    element.disabled = true;
                });
                resolve();
            }
        }, 1000);
    });
}
function padLeft(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return padLeft("0" + str, lenght);
}
function update(percent, totaltime) {
    var deg;
    if (percent < (totaltime / 2)) {
        deg = 90 + (360 * percent / totaltime);
        $('.pie').css('background-image',
            'linear-gradient(' + deg + 'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)'
        );
    } else if (percent >= (totaltime / 2)) {
        deg = -90 + (360 * percent / totaltime);
        $('.pie').css('background-image',
            'linear-gradient(' + deg + 'deg, transparent 50%, #1fbba6 50%),linear-gradient(90deg, white 50%, transparent 50%)'
        );
    }
}
let c = [wolf, witch, prophet, hunter];
let whos = ['天黑請閉眼，狼人請殺人', '此玩家死亡，女巫是否救人', '預言家請選人查身分', '11651'];
async function asyncArray() {
    $('#staticBackdrop').modal('show');
    await timeOn(5);
    Speak('講話');
    for (var i = 0; i <= c.length; i++) {
        Speak(whos[i])
        await timeOn(10, c[i]);
    }
}
window.onload = function () {

    asyncArray();
}