class Snake{
    constructor(){
        this.snakeArr = [];
        this.direction = [1, 0];
        var snakeHead = new Node("/images/head-right.png", 9*20, 13*20, gridSize, gridSize);
        var snakeBody1 = new Node("/images/body.png", 8*20, 13*20, gridSize, gridSize);
        var snakeBody2 = new Node("/images/body.png", 7*20, 13*20, gridSize, gridSize);
        this.snakeArr.push(snakeHead);
        this.snakeArr.push(snakeBody1);
        this.snakeArr.push(snakeBody2);
    }

    sArr(){
        return this.snakeArr;
    }

    draw(){
        for(var i = 0; i < this.snakeArr.length; i++){
            this.snakeArr[i].draw()
        }
    }

    dirChage(keycode){
        var curDir = this.direction;
        if(curDir[0] == 0){
            if(keycode == 37){
                this.direction = [-1,0];
            } else if(keycode == 39){
                this.direction = [1, 0];
            }
        } else {
            if(keycode == 38){
                this.direction=[0, -1];
            } else if(keycode == 40){
                this.direction = [0, 1];
            }
        }
        
    }

    update(){

        this.addBody();
        // remove the last body node
        this.snakeArr.splice(-1, 1);
    }

    addBody(){
        // generate a new head
        // get the position of current head
        // get the direction of the snake;
        var oldhead = this.snakeArr[0]
        var oldheadPos = oldhead.getPos();
        var newheadx = oldheadPos[0] + this.direction[0] * 20;
        var newheady = oldheadPos[1] + this.direction[1] * 20;
        if(newheadx < 0){newheadx = gridSize * colSize;}
        if(newheadx > gridSize * colSize) {newheadx = 0;}
        if(newheady < 0){newheady = gridSize * rowSize;}
        if(newheady > gridSize * rowSize) {newheady = 0;}
        var newheadurl;
        if(this.direction[0] == 0){
            if(this.direction[1] == 1){
                newheadurl = "/images/head-bottom.png";
            } else {
                newheadurl = "/images/head-up.png";
            }
        } else {
            if(this.direction[0] == 1){
                newheadurl = "/images/head-right.png";
            } else{
                newheadurl = "/images/head-left.png";
            }
        }

        var newhead = new Node( newheadurl, newheadx, newheady, gridSize, gridSize)

        // add new add to the first element of the snakeArr
        this.snakeArr.unshift(newhead);
        // change the old head to body
        var newbody = new Node("/images/body.png", oldheadPos[0], oldheadPos[1], gridSize, gridSize)
        this.snakeArr.splice(1,1,newbody)      
    }

    eatApp(apple){
        var curhead = this.snakeArr[0];
        if((Math.abs(curhead.getPos()[0] - apple.getPos()[0]) < gridSize) && (Math.abs(curhead.getPos()[1] - apple.getPos()[1]) < gridSize) ){
            return true;
        } 
        return false
    }

    getDirection(){
        return this.direction;
    }

    changeDirection(newDirection){
        this.direction = newDirection;
    }

}