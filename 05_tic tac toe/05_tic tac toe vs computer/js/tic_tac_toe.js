"use strict";
let flag="naruto-flag";
let counter=9;
const squares = document.getElementsByClassName("square");
const squaresArray = Array.from(squares);
const a_1=document.getElementById("a_1");
const a_2=document.getElementById("a_2");
const a_3=document.getElementById("a_3");
const b_1=document.getElementById("b_1");
const b_2=document.getElementById("b_2");
const b_3=document.getElementById("b_3");
const c_1=document.getElementById("c_1");
const c_2=document.getElementById("c_2");
const c_3=document.getElementById("c_3");
//new game button
const newgamebtn_display=document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");
// win or lose
const line1 = JudgLine(squaresArray,["a_1","a_2","a_3"]);
const line2 = JudgLine(squaresArray,["b_1","b_2","b_3"]);
const line3 = JudgLine(squaresArray,["c_1","c_2","c_3"]);
const line4 = JudgLine(squaresArray,["a_1","b_1","c_1"]);
const line5 = JudgLine(squaresArray,["a_2","b_2","c_2"]);
const line6 = JudgLine(squaresArray,["a_3","b_3","c_3"]);
const line7 = JudgLine(squaresArray,["a_1","b_2","c_3"]);
const line8 = JudgLine(squaresArray,["a_3","b_2","c_1"]);
const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winnigLine=null;

const msgtxt1='<p class="image"><img src="img/naruto.jpg" width=61px height=61px></p><p class="text">(Your turn)</p>';
const msgtxt2='<p class="image"><img src="img/sasuke.png" width=61px height=61px></p><p class="text">(computer turn)</p>';
const msgtxt3='<p class="image"><img src="img/naruto.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Naruto Win!!</p>';
const msgtxt4='<p class="image"><img src="img/sasuke.png" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">Sasuke Win!!</p>';
const msgtxt5='<p class="image"><img src="img/naruto.jpg" width=61px height=61px><img src="img/sasuke.png" width=61px height=61px></p><p class="text animate__bounceIn">Draw!!</p>';
// sound
let gameSound = ["sound/naruto_click.mp3","sound/sasuke_click.mp3","sound/naruto_win.mp3","sound/sasuke_win.mp3","sound/draw_sound.mp3"];
function JudgLine(targetArray, idArray){
    return targetArray.filter(function(e){
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
});
}
window.addEventListener("DOMContentLoaded",
function(){
    setMessage("naruto-turn");
    squaresArray.forEach(function(square){
    square.classList.add("js-clickable");
},false
);
squaresArray.forEach(function(square){
    square.addEventListener('click', () =>{
    let gameOverFlg = isSelect(square);
            if (gameOverFlg === "0") {
            const squaresBox = document.getElementById("squaresBox");
            squaresBox.classList.add("js-unclickable");
            setTimeout(
                function(){
                    sasukeTurn();
                },
                "2000"
            );
        }
        });
    });
});
function isSelect(selectSquare){
    let gameOverFlg = "0";
   if(flag==="naruto-flag") {
    let music = new Audio(gameSound[0]);
    music.currentTime= 0;
    music.play();
    selectSquare.classList.add("js-naruto-checked");
    selectSquare.classList.add("js-unclickable");
    selectSquare.classList.remove("js-clickable");
    if(isWinner("naruto")){
        setMessage("naruto-win");
        gameOver("naruto");
        return gameOverFlg = "1";
    }
    setMessage("sasuke-turn");
    flag="sasuke-flag"
}else{
    let music = new Audio(gameSound[1]);
    music.currentTime=0;
    music.play();
    selectSquare.classList.add("js-sasuke-checked");
    selectSquare.classList.add("js-unclickable");
    selectSquare.classList.remove("js-clickable");
    if(isWinner("sasuke")){
        setMessage("sasuke-win");
        gameOver("sasuke");
        return gameOverFlg = "1";
    }
    setMessage("naruto-turn")
    flag="naruto-flag"
       }
counter--;
    if (counter ===0){
    setMessage("draw");
    gameOver("draw");
    return gameOverFlg = "1";
    }
    return gameOverFlg = "0"
}
function isWinner(symbol){
    const result = lineArray.some(function(line){
        const subResult = line.every(function(square){
            if (symbol === "naruto"){
                return square.classList.contains("js-naruto-checked");
            }
            if(symbol === "sasuke"){
                return square.classList.contains("js-sasuke-checked");
            }
        });
        if (subResult){winnigLine = line}
        return subResult;
    });
    return result;
}
function setMessage(id){
    switch(id){
        case"naruto-turn":
        document.getElementById("msgtext").innerHTML=msgtxt1;
        break;
        case"sasuke-turn":
        document.getElementById("msgtext").innerHTML=msgtxt2;
        break;
        case "naruto-win":
        document.getElementById("msgtext").innerHTML=msgtxt3;
        break;
        case "sasuke-win":
        document.getElementById("msgtext").innerHTML=msgtxt4;
        break;
        case "draw":
        document.getElementById("msgtext").innerHTML=msgtxt5;
        break;
        default:
            document.getElementById("msgtext").innerHTML=msgtxt1;
    }
}
function gameOver(status){
    let w_sound
    switch(status){
        case "naruto":
            w_sound = gameSound[2];
            break;
        case "sasuke":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break;
    }
    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
    squaresBox.classList.add("js-unclickable");
newgamebtn_display.classList.remove("js-hidden");
if(status==="naruto"){
    if(winnigLine){
        winnigLine.forEach(function(square){
            square.classList.add("js-naruto_highLight");
        });
    }
    $(document).snowfall({
        flakeColor  : "rgb(255,240,245)",
        maxSpeed : 3,
        minSpeed : 1,
        maxSize : 20,
        minSize : 10,
        round : true
    });
}else if(status==="sasuke"){
    if(winnigLine){
        winnigLine.forEach(function(square){
            square.classList.add("js-sasuke_highLight");
        });
    }
    $(document).snowfall({
        flakeColor:"rgb(175,238,238)",
        maxSpeed : 3,
        minSpeed : 1,
        maxSize : 20,
        minSize : 10,
        round : true
    });
    }
}
newgamebtn.addEventListener("click",function(){
    flag="naruto-flag";
    counter= 9;
    winnigLine = null;
    squaresArray.forEach(function(square){
        square.classList.remove("js-naruto-checked");
        square.classList.remove("js-sasuke-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-naruto_highLight");
        square.classList.remove("js-sasuke_highLight");
        square.classList.add("js-clickable");
    });
    squaresBox.classList.remove("js-unclickable");
    setMessage("naruto-turn");
    newgamebtn_display.classList.add("js-hidden");
    $(document).snowfall("clear");
});
function sasukeTurn(){
    let gameOverFlg = "0";
    const sasukeSquare=squaresArray.filter(function(square){
        return square.classList.contains("js-clickable");
    });
    let n = Math.floor(Math.random()*sasukeSquare.length);
    gameOverFlg = isSelect(sasukeSquare[n]);
    if(gameOverFlg==="0"){
        squaresBox.classList.remove("js-unclickable");
    }
}