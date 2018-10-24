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
    drawObstacles(obstacles);
    
    if(snake.eatApp(apple)){
        snake.addBody();
        eatApple();
        eatSound.play();
    }
    if(gameOver()){
        collisionSound.play();
        clearGame();
        ctx.drawImage(gameOverImg, 0, 0, width, height)
    }

    if(winGame()){
        clearGame();
        ctx.drawImage(gameWinImg, 0, 0, width, height)       
    }
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
    var curDist;
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
   
    // set the direction of snake
    if (finalProPos.length > 0){
        snake.changeDirection(finalProPos[0])
    }
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
            flag = false;
        }
    }
    return flag;
}

// eat apple
function eatApple() {
    var pos = randomGenPos(rowSize, colSize, gridSize);
    while(!isTaken(pos[0], pos[1])){
        pos = randomGenPos(rowSize, colSize, gridSize);
    }
    apple = new Node("/images/apple.png", pos[0], pos[1], gridSize, gridSize);
    score += 1;
    updateLevel(score);
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
    // collide with obstacles
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

function clearGame(){
    clearInterval(gameInterval);
    startBtn.innerText = "Start Game";
    pauseBtn.innerText = "Pause";
    ctx.clearRect(0, 0, width, height);

    if(storage.length < 10){
        var counter = storage.length + 1;
        storage.setItem("player" + counter , JSON.stringify(score))
    } 
    score = 0;
    scoreDraw();   
}

// update level
function updateLevel(score){
    if(score > 10 && score < 21){
        level = 2;
        timeSpan = 15 * (1 + level);
        obstacleNum = 12;
        obstacleGen(obstacleNum, obstacles);
    } 
    if(score > 20){
        level = 3;
        timeSpan = 20 * (1 + level);
        obstacleNum = 20;
        obstacleGen(obstacleNum, obstacles);
    }
}