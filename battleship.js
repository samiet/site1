window.onload = init;

var numberOfShips = 0;
var endOfGame = false;
var yourKills = 0;
var enemyKills = 0;
var enemyArray = [];
var dialog = document.getElementById("gameDialog");
var dialogText = "";

function init() {
    var yourCells = document.querySelectorAll('#firstTable  td');
    enemyShipsLocation();
    for(var i=0;i<yourCells.length;i++) {
        yourCells[i].addEventListener("click", addShip, false);
    }
    var button = document.getElementById("start");
    button.onclick = startGame;
}

function addShip() {
    if(numberOfShips<7){
        this.setAttribute("background","ships.jpg");
    }
    numberOfShips++;
    this.setAttribute("class","selected");
}

function enemyShipsLocation() {
    var td = document.querySelectorAll('#secondTable td');
    var numberOfEnemies = 0;
    while(numberOfEnemies<7){
        var i = Math.floor(Math.random()*49);
        td[i].setAttribute("class","selected");
        numberOfEnemies++;
    }
}

function yourHit() {
    if(endOfGame == false){
        var selected = this.getAttribute("class");
        var shipImage = document.createElement("img");
        shipImage.setAttribute("src","redcross.png");
        shipImage.setAttribute("width","100%");
        /*shipImage.setAttribute("margin","0px");*/
        if(selected == "selected"){
            this.setAttribute("background","ships.jpg");
            this.appendChild(shipImage);
            yourKills++;
            if(yourKills == 7){
                endOfGame =true;
                alert("You won!");
            }
        }
        else {
            this.appendChild(shipImage);
            enemyHit();
        }

    }

}

function enemyHit() {
    if(!endOfGame){
        var yourCells = document.querySelectorAll('#firstTable  td');
        var i = ifWas();
        var shipImage = document.createElement("img");
        shipImage.setAttribute("src","redcross.png");
        shipImage.setAttribute("width","100%");
        yourCells[i].appendChild(shipImage);
        if(yourCells[i].getAttribute("class") == "selected"){
            enemyKills++;
            if(enemyKills == 7){
                endOfGame = true;
                alert("Enemy won!");
            }
            enemyHit();
        }
    }

    /*else {
        yourHit();
    }*/
}

/*function yourHit() {
    var enemyCells = document.querySelectorAll('#secondTable  td');
    var i = Math.floor(Math.random()*enemyCells.length);
    if(enemyCells[i].getAttribute("class") == "selected"){
        var shipImage = document.createElement("img");
        enemyCells[i].setAttribute("background")
        shipImage.setAttribute("src","redcross.png");
        shipImage.setAttribute("width","100%");
        enemyKills++;
        if(yourKills == 7){
            endOfGame = true;
            alert("Enemy won!");
        }
    }
}*/

function startGame() {
    if(numberOfShips<7){
        alert(7-numberOfShips + " ships are not located.");
        /*dialogText = dialogText + "Нужно расставить еще " + (7-numberOfShips) + " кораблей." + "<br>";
        dialog.innerHTML = dialogText;*/
    }
    else {
        var enemyCells = document.querySelectorAll('#secondTable td');
        for(var i=0;i<enemyCells.length;i++) {
            enemyCells[i].addEventListener("click", yourHit, false);
        }
        alert("Game started");
        /*while(!endOfGame){
            enemyShipsLocation();

        }*/
    }
}

function ifWas() {
    if(enemyArray.length == 0){
        enemyArray[0] = Math.floor(Math.random()*49);
        return enemyArray[0];
        /*alert(enemyArray[0]);*/
    }
    else {
        var j = 0;
        var index = Math.floor(Math.random()*49);
        while(j<enemyArray.length){
            if(index == enemyArray[j]){
                index = Math.floor(Math.random()*49);
                j=0;
            }
            else j++;
        }
        enemyArray.push(index);
        return index;
       /* alert(index);*/
    }

}