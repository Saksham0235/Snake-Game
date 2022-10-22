//  we use blocksize  for sizing the single box
 var blocksize = 25;
 var rows =20;
 var col = 20;
 var board;
 var context;

//  snake head
var snakeX=blocksize *5;
var snakeY=blocksize *5;

var velocityX=0;
var velocityY=0;

// var food
var foodX ;
var foodY ;

var gameover = false;

 var snakeBody=[];


 window.onload=()=>{
    board=document.getElementById("board");
    board.height= rows * blocksize;
    board.width = col * blocksize;
    // used for drawing on the board
    context = board.getContext('2d');

    placefood(); /* for placing food at random places */
    document.addEventListener('keyup',changeDirection);
    // update(); /* for updating the board */
     
    // 100 ms
    setInterval(update,1000/10);
 }

 update=()=>{
    if(gameover){
        return;
    }
    context.fillStyle='red';
    context.fillRect(0,0, board.width,board.height);

    // Maded a food   
    context.fillStyle="black";
    context.fillRect(foodX,foodY,blocksize,blocksize);
  
    // setting up the game now
    if(snakeX==foodX && foodY == snakeY){
        snakeBody.push([foodX,foodY]);
        placefood();
    }
 
    // updating the length/tail of snake after eating food
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i]=snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY];
    }

    // Maded a Snake-head
    context.fillStyle="white";
    snakeX+=velocityX * blocksize;
    snakeY+=velocityY * blocksize;
    context.fillRect(snakeX,snakeY,blocksize,blocksize);
 
    // adding food to the snakehead after they both collid
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize,blocksize);
    }

    // making gameover condition  when it touches the wall of board
    if(snakeX<0 || snakeX>col*blocksize || snakeY<0 || snakeY>rows*blocksize){
        gameover=true;
        alert("Game Over");
    }

    // when snakebody touches itself
    for(let i=0;i<snakeBody.length;i++){
        if(snakeX==snakeBody[i][0]&& snakeY==snakeBody[i][1]){
            gameover=true;
            alert("Game Over");
        }
    }

 }
changeDirection=(e)=>{
if(e.code=='ArrowUp' && velocityY != 1){
    velocityX=0;
    velocityY=-1;
}
else if(e.code=='ArrowDown' && velocityY != 1){
    velocityX=0;
    velocityY=+1;
}
else if(e.code=='ArrowRight' && velocityX != 1){
    velocityX=+1;
    velocityY=0;
}
 else if(e.code=='ArrowLeft' && velocityX != 1){ 
    velocityX=-1;
    velocityY=0;
}
}
//  function for random place for food
placefood=()=>{
    // Math.random()  - returns vslue between 0-1 *col = 0-19.999 but floor makes it 
    // 0-19 * blocksize 
    foodX=Math.floor(Math.random()*col) * blocksize;
    foodY=Math.floor(Math.random()*rows) * blocksize;
}