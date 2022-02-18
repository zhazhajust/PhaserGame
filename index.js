var chess =  document.getElementsByClassName("chess")[0];
var context =  chess.getContext("2d");
context.strokeStyle = "black";
context.lineWidth = 1.5;
window.onload=function(){
    drawChessBoard();
}

function drawChessBoard(){
    for(var i = 0; i < 15; i++){
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();

        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
    }
}

//init wins[]
var wins = [];
for(var i = 0; i < 15; i++){
    wins[i] = [];
    for(var j = 0; j < 15; j++){
        wins[i][j] = [];
    }
}

var count = 0;
for(var i = 0; i < 15; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){   
            wins[j + k][i][count] = true;
        }
        count++;
    }
}

for(var i = 0; i < 15; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){ 
            wins[i][j + k][count] = true;
        }
        count++;
    }
}

for(var i = 0; i < 11; i++){
    for(var j = 0; j < 11; j++){
        for(var k = 0; k < 5; k++){ 
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}

for(var i = 0; i < 11; i++){
    for(var j = 14; j > 3; j--){
        for(var k = 0; k < 5; k++){ 
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}

//init chessBoard
var chessBoard = [];
for(var i = 0; i < 15; i++){
    chessBoard[i] = [];
    for(var j = 0; j < 15; j++){
        chessBoard[i][j] = 0;
    }
}
var me = true;
var over = false;

//init Me/AI Win []
var myWin = [];
var computerWin = [];
for(var i = 0; i < count; i++){
    myWin[i] = 0;
    computerWin[i] = 0;
}

//
chess.onclick = (e) => {
    if(over){

    }
    if(!me){
        return
    }

    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x/30);
    var j = Math.floor(y/30);

    if(chessBoard[i][j] == 0){

        oneStep(i, j, me);
        chessBoard[i][j] = 1;

        for(var k = 0; k < count; k++){
            if(wins[i][j][k]){
                myWin[k]++;
                if(myWin[k] == 5){
                    alert("你赢了: " + k);
                    over = true;   
                    title.innerHTML = "你赢了";
                }
            }   
        }
    }else{
        alert("不能下这里！！！");
        return;
    }

    if(!over){
        me = !me;
        //
        computerAI();
    }

}

function oneStep(i, j, me){
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();

    var color;
    if(me){
        color = "black";
    }
    else{
        color = "red";
    }
    context.fillStyle = color;
    context.fill();
}

function computerAI(){
    var myScore = [];
    var computerScore = [];

    for(var i = 0; i < 15; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0; j < 15; j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }
    var max = 0;
    var x = 0, y = 0;
    for(var i = 0; i < 15; i++){
        for(var j = 0; j < 15; j++){
            if(chessBoard[i][j] == 0){

                for(var k = 0; k < count; k++){
                    if(wins[i][j][k]){

                        if(myWin[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 400;
                        }else if(myWin[k] == 3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k] == 4){
                            myScore[i][j] += 10000;
                        }

                        if(computerWin[k] == 1){
                            computerScore[i][j] += 220;
                        }else if(computerWin[k] == 2){
                            computerScore[i][j] += 420;
                        }else if(computerWin[k] == 3){
                            computerScore[i][j] += 2200;
                        }else if(computerWin[k] == 4){
                            computerScore[i][j] += 12000;
                        }
                    }                               
                } 

                var maxScore = Math.max(myScore[i][j], computerScore[i][j]);
                if(maxScore >= max){
                    max = maxScore;
                    x = i;
                    y = j;
                }
            }
        }
    }
    
    oneStep(x, y, me);

    chessBoard[x][y] = 1;

    //check if wins
    for(var k = 0; k < count; k++){
        if(wins[x][y][k]){
            computerWin[k]++;
            if(computerWin[k] == 5){
                alert("计算机赢了");
                title.innerHTML = "计算机赢了";
                over = true;
            }
        }   
    }

    if(!over){
        me = !me;
    }
}

function rst(){
    window.location.reload();
}
