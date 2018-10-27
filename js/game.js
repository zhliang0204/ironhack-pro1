// start game and refresh the page
function update(){
    ctx.clearRect(0, 0, width, height);
    //update
    // snake.update();
    
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
    } else {
        snake.update()
    }
    if(gameOver()){
        // console.log("snake head " + snake.sArr()[0].getPos())
        for(var i = 0; i < obstacles.length; i++){
            console.log("obstacle " + i + " " + obstacles[i].getPos())
        }
        for(var j =0; j < snake.sArr().length; j++){
            console.log("snakes " + j + " " + snake.sArr()[j].getPos())
        }
        
        collisionSound.play();
        scoreStore()
        clearGame();
        ctx.drawImage(gameOverImg, 0, 0, width, height)
    }

    if(winGame()){
        scoreStore()
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
    var minDist = width + height;
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

    console.log("1:oldsnakeDir: " + snake.getDirection());
   
    // set the direction of snake
    if (finalProPos.length > 0){
        var size = finalProPos.length;
        var nextId = Math.floor(Math.random()*size);
        snake.changeDirection(finalProPos[nextId])
    }

    console.log("2:proDire: " + proDirec);
    console.log("3:disToApple: " + disToApple);
    console.log("4:applePos: " + applePos);
    console.log("5:finalProPos: "+ finalProPos);
    console.log("6:newsnakeDir: " + snake.getDirection());
    console.log("7:snakeHead:" + curheadPos);
    // console.log("newsankeHead:" + curheadPos);

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
        tempObstacle = new Node("./images/obstacle.png", randomPos[0], randomPos[1]);
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
    // var curSnakeNodes = snake.sArr().concat(obstacles);
    var curSnakeNodes = obstacles.concat(snake.sArr());

    for(var i = 0; i < curSnakeNodes.length - 1; i++){
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
    apple = new Node("./images/apple.png", pos[0], pos[1]);
    score += 1;
    if(updateLevel(score)){
        clearInterval(gameInterval);

        gameInterval = setInterval(gameUpdate, 2000/timeSpan)

    };
}

// game update
function gameUpdate(){
    // update();
    if(gameState == 1){
        chooseDirection();
    }
    update();
}

// stop game
function gameOver(){
    // get the snake array
    var curSnake = snake.sArr();
    var curhead = curSnake[0];
    var headPos = curhead.getPos();
    var targetObs;
    
    // collide itself
    var flag = false;
    for(var i = 1; i < curSnake.length; i++){
        var bodyPos = curSnake[i].getPos();
        if(Math.abs(bodyPos[0] - headPos[0]) < gridSize && Math.abs(bodyPos[1] - headPos[1]) < gridSize){
            flag = true;
            targetObs = bodyPos;
        }
    }
    // collide with obstacles
    for(var i = 0 ; i < obstacles.length; i++){
        var curObstacle = obstacles[i].getPos();
        if(Math.abs(curObstacle[0] - headPos[0]) < gridSize && Math.abs(curObstacle[1] - headPos[1]) < gridSize){
            flag = true;
            targetObs = curObstacle;
        }
    }
    if (targetObs != undefined){
    console.log("targetObs" + targetObs);
    console.log("headPos" + headPos);}
    return flag;
}

// win game
function winGame(){
    if (score == 50){
        return true;
    } 
    return false;
}

function clearGame(){
    clearInterval(gameInterval);
    startBtn.innerText = "Start Game";
    pauseBtn.innerText = "Pause";
    ctx.clearRect(0, 0, width, height);
    // score = 0;
    scoreDraw();   
}

// score storage
function scoreStore(){
    if(storage.length < 10){
        var counter = storage.length + 1;
        storage.setItem("player" + counter , JSON.stringify(score))
    } 
}

// update level
function updateLevel(score){
    if(score > 5 && score < 16){
        level = 2;
        timeSpan = 10 * (1 + level);
        obstacleNum = 15;
        obstacleGen(obstacleNum, obstacles);
        return true;
    } 
    if(score > 15){
        level = 3;
        timeSpan = 10 * (1 + level);
        obstacleNum = 25;
        obstacleGen(obstacleNum, obstacles);
        return true;
    }
    return false;
}