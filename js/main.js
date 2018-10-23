var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var height = ctx.canvas.height;
var width = ctx.canvas.width;
var startBtn = document.getElementById("startBtn");
var gridSize = 20;
var colSize = width / gridSize - 1;
var rowSize = height / gridSize - 1;
var apple;
var snake;
var gameInterval;
var score = 0;
var level = 1;
var timeSpan = 10 *(1 + level);
var obstacles = [];
var obstacleNum = 3;

var autoBtn = document.getElementById("autoBtn");
// var bg;
var bg = new Image();
bg.src = "/images/bg.jpg";

var newhead1 = new Image();
newhead1.src = "/images/head-bottom.png"
var newhead2 = new Image();
newhead2.src = "/images/head-left.png"
var newhead3 = new Image();
newhead3.src = "/images/head-right.png"
var newhead4 = new Image();
newhead4.src = "/images/head-up.png"


window.onload = function() {
    drawBg();
    startBtn.onclick = function(){
        drawingFirstElements();
        gameInterval = setInterval(function(){
            update();
            console.log(timeSpan);
        }, 2000/timeSpan)
    }

    document.onkeydown = function(e) {
        var keycode = e.keyCode;
        // console.log(keycode)
        snake.dirChage(keycode);
    }

    autoBtn.onclick = function(){
        drawingFirstElements();

    }

}


// draw the background, snake and apple in the canvas
function drawBg(){
    // draw background
 
        ctx.drawImage(bg, -340, -10, bg.width, bg.height);
        drawGrids()

    // draw snake

    // draw apple
}

// draw grids of backgrounds
function drawGrids(){
    ctx.strokeStyle = "darkGreen";
    for(var col = gridSize; col < width; col = col + gridSize){
        ctx.beginPath();
        ctx.moveTo(col, 0);
        ctx.lineTo(col, height);
        ctx.stroke();
    }
    for(var row = gridSize; row < height; row = row + gridSize){
        ctx.beginPath();
        ctx.moveTo(0, row);
        ctx.lineTo(width,row);
        ctx.stroke();
    }
}


// start game and refresh the page
function update(){
    ctx.clearRect(0, 0, width, height);
    //update
    snake.update();
    
    //draw
    drawBg();
    apple.draw();
    snake.draw();
    scoreDraw();
    

    if(snake.eatApp(apple)){
        snake.addBody();
        eatApple();
    }
    if(gameOver()){
        clearInterval(gameInterval);
        ctx.clearRect(0, 0, width, height);
        ctx.strokeText("Game Over", width/3, height/2)
    }
}


// draw score
function scoreDraw(){
    var orgScore = document.getElementById("score");
    orgScore.innerText = score;
}

// auto choose direction
// function chooseDirection(){
//     var dirList = [[1,0],[-1,0],[0,1],[0.-1]];
//     var appPos = apple.getPos();
//     var headPos = snake.sArr()[0].getPos();
//     var curDir = snake.getDirection();
//     if(headPos[0] == appPos[0]){
//         if(headPos[1] < appPos[1]){
//             snake.changeDirection([0,1])
//         } else {
//             snake.changeDirection([0,-1])

//         }
//     } else if(headPos[1] == appPos[1]){
//         if(headPos[0] < appPos[1]){
//             snake.changeDirection()
//         }
//     }
// }

// initial game, when click start button, the snake and apple appears
function drawingFirstElements(){
    clearInterval(gameInterval);
    score = 0;
    level = 1;
    timeSpan = 10 *(1 + level)
    snake = new Snake();
    var pos = randomGenPos(rowSize, colSize, gridSize);
    while(!isTaken(pos[0], pos[1])){
        pos = randomGenPos(rowSize, colSize, gridSize);
    }
    apple = new Node("/images/apple.png", pos[0], pos[1], gridSize, gridSize);
    apple.draw();
    snake.draw();
}

function eatApple() {
    var pos = randomGenPos(rowSize, colSize, gridSize);
    while(!isTaken(pos[0], pos[1])){
        pos = randomGenPos(rowSize, colSize, gridSize);
    }
    apple = new Node("/images/apple.png", pos[0], pos[1], gridSize, gridSize);
    score += 1;
    if(score > 10 && score <= 20 ){
        level += 1;
        timeSpan = 10 *(1 + level);
    }
    if(score > 20){
        level += 1;
        timeSpan = 10 *(1 + level);
    }
}

// generate node position
function randomGenPos(rowSize, colSize, gridSize){
    var posX = Math.floor(Math.random()*colSize) * gridSize;
    var posY = Math.floor(Math.random()*rowSize) * gridSize;
    console.log([posX, posY])
    return [posX, posY];
}

function isTaken(x, y){
    var flag = true;
    var curSnakeNodes = snake.sArr();
    for(var i = 0; i < curSnakeNodes.length; i++){
        var curP = curSnakeNodes[i].getPos();
        if(curP[0] == x && curP[1] == y){
            flag = false
        }
    }
    return flag;
}

// stop the game
function gameOver(){
    // get the snake array
    var curSnake = snake.sArr();
    var curhead = curSnake[0];
    var headPos = curhead.getPos();
    
    // collide itself
    var flag = false;
    for(var i = 1; i < curSnake.length; i++){
        var bodyPos = curSnake[i].getPos();
        if(Math.abs(bodyPos[0] - headPos[0]) < gridSize && Math.abs(bodyPos[1] - headPos[1]) < gridSize){
            flag = true;
        }
    }
    return flag;
}