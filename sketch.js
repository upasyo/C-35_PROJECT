var bg;
var balloon,balloonImage1,balloonImage2;
var block,block1,block2,block3;
// create database and position variable here
var database,position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
 createCanvas(windowWidth,windowHeight);
  console.log(database);
  balloon=createSprite(width/2,height/2,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.3;

  textSize(20); 

  block=createSprite(width/2,0,2000,20);
  block.visible=false;
  block1=createSprite(width/1,0,20,9000);
  block1.visible=false;
  block2=createSprite(width/90.9,0,20,9000);
  block2.visible=false;
  block3=createSprite(width/2,height/1,2000,20);
  block3.visible=false;
  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
  balloonPosition.onDisconnect("Please Try this game later or refresh your page");
}

// function to display UI
function draw() {
  background(bg);
 


  if(keyDown(LEFT_ARROW)){
    updatePosition(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  
  }
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(+10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
   
  }
  else if(keyDown(UP_ARROW)){
    updatePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    balloon.scale=0.25;
  }
  else if(keyDown(DOWN_ARROW)){
    updatePosition(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    balloon.scale=0.3;
   
  }

  balloon.collide(block);
  balloon.collide(block1);
  balloon.collide(block2);
  balloon.collide(block3);

  if(balloon.collide(block)){
    balloon.y=block.x/2;
  }
  drawSprites();
  fill(0);
  stroke("white");
  textSize(13);
  text("**Use arrow keys or tilt your device to move Air Balloon!",width/9,40);
  text("Make sure to rotate your device to potrait mode",width/8,52);
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x':position.x+x,
    'y':position.y+y
  
  })
}

function readPosition(data){
  position= data.val();
  balloon.x = position.x;
  balloon.y = position.y;

}

function showError(){
  console.log("Error Writing in the Databasae");
}
function upbtn(){
    updatePosition(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=0.25;
}

function downbtn(){
  updatePosition(0,+10);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
  balloon.scale=0.3;
}

function leftbtn(){
  updatePosition(-10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
}

function rightbtn(){
  updatePosition(+10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage2);
}
