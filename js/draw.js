// draw background image and grids
function drawBg(){
    ctx.drawImage(bg, -80, -10, bg.width, bg.height);
    drawGrids()
}

// draw grids
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

// initial game, when click start button, the snake and apple appears
function drawingFirstElements(){
    clearInterval(gameInterval);
    score = 0;
    level = 1;
    timeSpan = 10 *(1 + level);
    obstacleNum = 6;
    obstacles = [];
    snake = new Snake();
    obstacleGen(obstacleNum, obstacles);
    var pos = randomGenPos(rowSize, colSize, gridSize);
    while(!isTaken(pos[0], pos[1])){
        pos = randomGenPos(rowSize, colSize, gridSize);
    }
    apple = new Node("./images/apple.png", 200,200);
    apple.draw();
    snake.draw();
    drawObstacles( obstacles);
}

// draw obstacles
function drawObstacles( obstacles){
    for(var i =0 ; i < obstacles.length; i++){
        obstacles[i].draw();
    }
}

// draw score
function scoreDraw(){
    var orgScore = document.getElementById("score");
    orgScore.innerText = score;
}

