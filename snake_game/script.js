var snakeboard,snakeboard_ctx;
var keyPressed,goingUp,goingDown,goingRight,goingLeft;
var LEFT_KEY,RIGHT_KEY,UP_KEY,DOWN_KEY;
var background='#D9FBFF';
var board_border='#120084';
var snake_color
var snake_border='darkblue';
let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200},
    {x: 150, y: 200},
    {x: 140, y: 200},
    {x: 130, y: 200},
    {x: 120, y: 200},
    {x: 110, y: 200},
    {x: 100, y: 200}
  ]
  let score = 0;
    // True if changing direction
    let changing_direction=false;
    // Horizontal velocity
    let food_x;
    let food_y;
    let dx = 10;
    // Vertical velocity
    let dy = 0;
    
function init(){
    snakeboard=document.querySelector('#snakeboard');
    snakeboard_ctx=snakeboard.getContext('2d');
    //start game
    gen_food();
    clear_board();
    document.addEventListener("keydown",change_direction);
    //start button
    var startButton=document.querySelector('#start');
    startButton.addEventListener('click',start);
}   
//main function called repeatedly to keep the game running
function start(){
    if(has_game_ended())return;
    changing_direction = false;
    setTimeout(function onTick(){
        clear_board();
        drawFood();
        move_snake();
        drawSnake();
        //repeat
        start();
    },100)
    
}
//draw a border around the canvas
function clear_board(){
    snakeboard_ctx.save();
    //select the colour to fill the drawing
    // background = new Image();
    // background.src = "images/snake.png"; 
    // // Make sure the image is loaded first otherwise nothing will draw. 
    // background.onload = function(){
    //    snakeboard_ctx.drawImage(background,0,0,snakeboard.width,snakeboard.height);    
    // };
    snakeboard_ctx.fillStyle=background;
    //select the colour for the border of the canvas
    snakeboard_ctx.strokeStyle=board_border;
    //draw a filled rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0,0,snakeboard.width,snakeboard.height);
    //draw  a border around the entire canvas
    snakeboard_ctx.strokeRect(0,0,snakeboard.width,snakeboard.height);
    snakeboard_ctx.restore();
}
//draw the snake on the canvas
function drawSnake(){
    //draw each part
    snake.forEach(drawSankePart)
}
function drawFood(){
    snakeboard_ctx.fillStyle='darkblue';
    snakeboard_ctx.strokeStyle='darkblue';
    snakeboard_ctx.fillRect(food_x,food_y,10,10);
    snakeboard_ctx.strokeRect(food_x,food_y,10,10);
}

function getColor(){
    var colors=["rgba(0, 0, 0, 255)","rgba(255, 255, 0, 255)","rgba(255, 0, 0, 255)"];

    var clorIndex=Math.round((colors.length-1)*Math.random());
    var c=colors[clorIndex];
    return c;
}
//draw one snake part
function drawSankePart(snakePart){
  snakeboard_ctx.save();
    snake_color=getColor();
    //set the colour of the snake part
    snakeboard_ctx.fillStyle=snake_color;
    //set the border colour of the snake part
    snakeboard_ctx.strokeStyle=snake_border;
    //draw a filled rectangle to represent the snake part at the coordinates
    //the part is located
    snakeboard_ctx.fillRect(snakePart.x,snakePart.y,10,10);
    //draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x,snakePart.y,10,10);
    snakeboard_ctx.restore();
}
function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
    // Generate a random number the food x-coordinate
    food_x = random_food(0, snakeboard.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, snakeboard.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function has_snake_eaten_food(part) {
      const has_eaten = part.x == food_x && part.y == food_y;
      if (has_eaten) gen_food();
    });
  }
  function change_direction(event) {
    LEFT_KEY = 37;
    RIGHT_KEY = 39;
    UP_KEY = 38;
    DOWN_KEY = 40;
    
  // Prevent the snake from reversing
  
    if (changing_direction) return;
    changing_direction = true;
    keyPressed = event.keyCode;
    goingUp = dy === -10;
    goingDown = dy === 10;
    goingRight = dx === 10;
    goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
  }

  function move_snake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
      // Increase score
      score += 10;
      // Display score on screen
      document.getElementById('score').innerHTML = score;
      // Generate new food location
      gen_food();
    } else {
      // Remove the last part of snake body
      snake.pop();
    }
  }