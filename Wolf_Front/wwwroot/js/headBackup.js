var array = [];
function aa(a, b, c, d, e, f, g, h, i, j) {
    document.getElementById("touxiang").getElementsByClassName('circleImg')[a - 1].className = "circleImg on";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[b - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[c - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[d - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[e - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[f - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[g - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[h - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[i - 1].className = "circleImg off";
    document.getElementById("touxiang").getElementsByClassName('circleImg')[j - 1].className = "circleImg off";
}

for (let i = 0; i < players.length / 2; i++) {
    array.push(i + 1);
    for (let j = 1; j <= players.length; j++) {
        if (j != i + 1) { array.push(j); }
    }
    let aplayer = document.createElement('a');
    let playerImg = document.createElement('img');
    let dead = document.createElement('img');
    let num = document.createElement('span');
    let Circle = document.createElement('div');
    num.innerHTML = i + 1;
    num.setAttribute('class', 'number');
    aplayer.setAttribute('class', 'playerimg')
    aplayer.setAttribute('href', '#');
    playerImg.setAttribute('src', players[i].imgUrl);
    playerImg.setAttribute('class', 'playerphoto')
    dead.setAttribute('src', 'https://i.imgur.com/OapUq4K.png');
    dead.setAttribute('class', 'deadimg')
    Circle.setAttribute('class', 'circleImg off');  
    if (players[i].alive) { Circle.setAttribute('onclick', `aa(${array})`); }
    else { Circle.appendChild(dead); }
    Circle.appendChild(playerImg);
    aplayer.appendChild(Circle);
    aplayer.appendChild(num);
    document.querySelector('.top-playerimg').appendChild(aplayer);
    array = [];
}
var array = [];
for (let i = players.length / 2; i <= players.length; i++) {
    array.push(i + 1);
    for (let j = 1; j <= players.length; j++) {
        if (j != i + 1) { array.push(j); }
    }
    let aplayer = document.createElement('a');
    let playerImg = document.createElement('img');
    let dead = document.createElement('img');
    let num = document.createElement('span');
    let Circle = document.createElement('div');
    num.innerHTML = i + 1;
    num.setAttribute('class', 'number');
    aplayer.setAttribute('class', 'playerimg')
    aplayer.setAttribute('href', '#');
    playerImg.setAttribute('src', players[i].imgUrl);
    playerImg.setAttribute('class', 'playerphoto')
    dead.setAttribute('src', 'https://i.imgur.com/OapUq4K.png');
    dead.setAttribute('class', 'deadimg')
    Circle.setAttribute('class', 'circleImg off');
    if (players[i].alive) { Circle.setAttribute('onclick', `aa(${array})`); }
    else { Circle.appendChild(dead); }
    Circle.appendChild(playerImg);
    aplayer.appendChild(Circle);
    aplayer.appendChild(num);
    document.querySelector('.footer-playerimg').appendChild(aplayer);
    array = [];
}