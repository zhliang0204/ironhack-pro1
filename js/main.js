


window.onload = function() {
    drawBg();
   
    startBtn.onclick = function(){
        if(startBtn.innerText == "Start Game"){
            startBtn.innerText = "Stop Game" 
            drawingFirstElements();
            gameInterval = setInterval(function(){
                update();
            }, 2000/timeSpan)

            if (pauseBtn.innerText == "Pause"){
                document.onkeydown = function(e) {
                    var keycode = e.keyCode;
                    snake.dirChage(keycode);
                }
            }  
        } else {
            startBtn.innerText = "Start Game";
            pauseBtn.innerText = "Pause";
            clearInterval(gameInterval);
            ctx.clearRect(0, 0, width, height);
            drawBg();
            console.log("but")
        }
    }

    pauseBtn.onclick = function(){
        if(startBtn.innerText == "Stop Game"){
            console.log("btnText");
            if(pauseBtn.innerText == "Pause"){
                pauseBtn.innerText = "Continue";
                clearInterval(gameInterval);
            } else {
                clearInterval(gameInterval);
                pauseBtn.innerText = "Pause";
                gameInterval = setInterval(function(){
                    update();
                    console.log(timeSpan);
                }, 2000/timeSpan)                   
            }
        }
    }

    autoBtn.onclick = function(){
        drawingFirstElements();
        gameInterval = setInterval(function(){
            update();
            chooseDirection();
        }, 2000/timeSpan)
    }
}

// draw the background, snake and apple in the canvas
function drawBg(){
        ctx.drawImage(bg, -80, -10, bg.width, bg.height);
        drawGrids()
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
    drawObstacles( obstacles);
    

    if(snake.eatApp(apple)){
        snake.addBody();
        eatApple();
    }
    if(gameOver()){
        clearInterval(gameInterval);
        ctx.clearRect(0, 0, width, height);
        
        ctx.drawImage(gameOverImg, 0, 0, width, height)
        if(storage.length < 10){
            var counter = storage.length + 1;
            storage.setItem("player" + counter , JSON.stringify(score))

        }
    }

    if(winGame()){
        clearInterval(gameInterval);
        ctx.clearRect(0, 0, width, height);
        
        ctx.drawImage(gameWinImg, 0, 0, width, height)
        if(storage.length < 10){
            var counter = storage.length + 1;
            storage.setItem("player" + counter , JSON.stringify(score))
        }        
    }
}


// draw score
function scoreDraw(){
    var orgScore = document.getElementById("score");
    orgScore.innerText = score;
}

// auto choose direction
function chooseDirection(){
    var dirList = [[1,0],[-1,0],[0,1],[0,-1]];
    var curSnake = snake.sArr();
    var curhead = curSnake[0];
    var curheadPos = curhead.getPos();
    var nextPX;
    var nextPY;

    // avoid obstacles
    var proDirec = [];
    for(var i = 0; i <dirList.length; i++){
        nextPX = dirList[i][0] * gridSize + curheadPos[0];
        nextPY = dirList[i][1] * gridSize + curheadPos[1];  
        if(isTaken(nextPX, nextPY)) {
            proDirec.push(dirList[i])
        }    
    }
 
    // caculate distance
    var disToApple = [];
    var applePos = apple.getPos();
    var curDist
    for(var i = 0; i < proDirec.length; i++){
        nextPX = proDirec[i][0] * gridSize + curheadPos[0];
        nextPY = proDirec[i][1] * gridSize + curheadPos[1];
        curDist = Math.abs(nextPX - applePos[0]) + Math.abs(nextPY - applePos[1])
        
        disToApple.push(curDist);          
    }
    
    // choose shortest distance
    var minDist = width;
    for(var i =0; i < disToApple.length; i++){
        if (minDist > disToApple[i]){
            minDist = disToApple[i]
        }
    }
    
    var finalProPos = [];
    for(var i = 0; i < proDirec.length; i++){
        if(disToApple[i] == minDist){
            finalProPos.push(proDirec[i])
        }
    }
   
    // // set the direction of snake
    if (finalProPos.length > 0){
        snake.changeDirection(finalProPos[0])
    }
}

// initial game, when click start button, the snake and apple appears
function drawingFirstElements(){
    clearInterval(gameInterval);
    score = 0;
    level = 1;
    timeSpan = 10 *(1 + level);
    obstacleNum = 3;
    obstacles = [];
    snake = new Snake();
    obstacleGen(obstacleNum, obstacles);
    var pos = randomGenPos(rowSize, colSize, gridSize);
    while(!isTaken(pos[0], pos[1])){
        pos = randomGenPos(rowSize, colSize, gridSize);
    }
    apple = new Node("/images/apple.png", pos[0], pos[1], gridSize, gridSize);
    apple.draw();
    snake.draw();
    drawObstacles( obstacles);
}

// generate obstacles
function obstacleGen(obstacleNum, obstacles){
    var genNum = obstacleNum - obstacles.length;
    var tempObstacle;
    for(var i = 0; i < genNum; i++){
        var randomPos = randomGenPos(rowSize, colSize, gridSize)
        while(!isTaken(randomPos[0], randomPos[1])){
            randomPos =  randomGenPos(rowSize, colSize, gridSize);
        }
        tempObstacle = new Node("/images/obstacle.png", randomPos[0], randomPos[1], gridSize, gridSize);
        obstacles.push(tempObstacle);
    }
}

// draw obstacles
function drawObstacles( obstacles){
    for(var i =0 ; i < obstacles.length; i++){
        obstacles[i].draw();
    }
}

// eat apple
function eatApple() {
    var pos = randomGenPos(rowSize, colSize, gridSize);
    while(!isTaken(pos[0], pos[1])){
        pos = randomGenPos(rowSize, colSize, gridSize);
    }
    apple = new Node("/images/apple.png", pos[0], pos[1], gridSize, gridSize);
    score += 1;
    updateGrade(score);
}

// update grade
function updateGrade(score){
    if(score > 10 && score < 21){
        level = 2;
        timeSpan = 15 * (1 + level);
        obstacleNum = 6;
        obstacleGen(obstacleNum, obstacles);
    } 
    if(score > 20){
        level = 3;
        timeSpan = 20 * (1 + level);
        obstacleNum = 10;
        obstacleGen(obstacleNum, obstacles);
    }
}

// generate node position
function randomGenPos(rowSize, colSize, gridSize){
    var posX = Math.floor(Math.random()*colSize) * gridSize;
    var posY = Math.floor(Math.random()*rowSize) * gridSize;
    return [posX, posY];
}

// return true if not taken
function isTaken(x, y){
    var flag = true;
    var curSnakeNodes = snake.sArr().concat(obstacles);
    for(var i = 0; i < curSnakeNodes.length; i++){
        var curP = curSnakeNodes[i].getPos();
        if(curP[0] == x && curP[1] == y){
            flag = false
        }
    }
    return flag;
}



// stop game
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
    for(var i = 0 ; i < obstacles.length; i++){
        var curObstacle = obstacles[i].getPos();
        if(Math.abs(curObstacle[0] - headPos[0]) < gridSize && Math.abs(curObstacle[1] - headPos[1]) < gridSize){
            flag = true;
        }
    }
    return flag;
}

// win game
function winGame(){
    if (score == 41){
        return true;
    } 
    return false;
}