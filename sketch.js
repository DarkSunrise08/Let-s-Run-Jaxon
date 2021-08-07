var score;

var runner, running;

var track, trackImage, trackBoundary1, trackBoundary2;

var bomb1, bomb2, bombImage;

var highScore;

function preload(){
  //pre-load images
  running = loadAnimation("Runner-1.png","Runner-2.png");

  trackImage = loadImage("path.png");

  bombImage = loadImage("bomb.png");

  score = 0;

}

function setup(){
  createCanvas(400,400);

  //create sprites here

  track = createSprite(200,20,20,20);
  track.addImage("track",trackImage);
  track.velocityY = 4;

  trackBoundary1 = createSprite(25,200,100,400);
  trackBoundary1.visible = false;

  trackBoundary2 = createSprite(382.5,200,100,400);
  trackBoundary2.visible = false;

  highScore = 0;

  //110
  //210
  //300


  bomb1 = createSprite(210,200);
  bomb1.addImage("Bomb",bombImage);
  bomb1.scale = 0.05;

  bomb1.velocityY = 5;

  bomb2 = createSprite(110,200);
  bomb2.addImage("Bomb",bombImage);
  bomb2.scale = 0.05;

  bomb2.velocityY = 5;

  runner = createSprite(200,350,20,20);
  runner.addAnimation("running",running);
  runner.scale = 0.05;
}

function draw() {

  score++;

  if(score>highScore){
    highScore = score;
  }

  background(0);
  
  bomb1.velocityY+=0.01;
  bomb2.velocityY+=0.01;

  bomb1.collide(bomb2);

  bomb2.collide(bomb1);

  bomb1.collide(trackBoundary1);
  bomb1.collide(trackBoundary2);

  bomb2.collide(trackBoundary1);
  bomb2.collide(trackBoundary2);

  if(bomb1.isTouching(runner)||bomb2.isTouching(runner)){
    bomb2.velocityY = 5;
    bomb1.velocityY = 5;
    score = 0;
  }

  if(bomb1.y>450){
    bomb1.y = -50;
    bomb1.x = random(100,300);
  }

  if(bomb2.y>450){
    bomb2.y = -50;
    bomb2.x = random(100,300);
  }

  if(mouseX>25 && mouseX<375){
    runner.x = mouseX;
  }

  if(track.y>=400){
    track.y = 20;
  }

  runner.collide(trackBoundary1);
  runner.collide(trackBoundary2);

  drawSprites();

  fill("white");
  text(score,10,20);
  text("High",10,50);
  text(highScore,10,70);

}