class Node{
    constructor(url, x, y){
        this.posX = x;
        this.posY = y;
        this.img = new Image();
        this.img.src = url;
    }

    getPos(){
        return [this.posX, this.posY]
    }

    draw(){
        // this.img.onload = function(){
        //     ctx.drawImage(this.img, this.posX, this.posY, gridSize, gridSize)
        // }
        ctx.drawImage(this.img, this.posX, this.posY, gridSize, gridSize)
    }
}
