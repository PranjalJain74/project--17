var towerImg, tower;
var doorImg,door,doorsGroup
var climberImg,climber,climbersGroup
var ghost,ghostImg, ghostImg2
var invisibleBlockGroup, invisibleBlock;
var gameState="play"


function preload(){
  towerImg= loadImage("tower.png")
  doorImg=loadImage("door.png")
  climberImg=loadImage("climber.png")
  ghostImg=loadImage("ghost-standing.png")
  spookySound=loadSound("spooky.wav")
  ghostImg2=loadImage("ghost-jumping.png")
}

function setup(){
 createCanvas(600,600)
 spookySound.loop() 
 tower=createSprite(300,300,600,600) 
  tower.addImage("tower",towerImg)
  tower.velocityY=1
  
  ghost=createSprite(300,300,50,50)
  ghost.addImage("ghost",ghostImg)
  ghost.scale=0.4
  
  doorsGroup=new Group();
  climbersGroup= new Group();
  invisibleBlockGroup = new Group();
  
  
  
}

function draw(){
//console.log(tower.y)
  if (gameState==="play"){
  if(tower.y>500){
    tower.y=300
  }
  
  if (keyDown("space")){
    ghost.velocityY=-5
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3
    }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  
  if(ghost.isTouching(climbersGroup)){
    ghost.velocityY=0
  }
    

  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
  gameState="end"  
  }

  
  
  spawnDoors();
  drawSprites();
    
  } 
  
  if (gameState === "end"){
    background("black")
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
}
  
  
}

function spawnDoors(){
  if(frameCount%240===0){
    var door=createSprite(200,50)
    var climber=createSprite(200,110)
    
    var invisibleBlock = createSprite(200,115);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    
    
    door.x=Math.round(random(120,400))
    climber.x=door.x

    
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
        
    
    door.velocityY=1
    climber.velocityY=1
    
    
    door.addImage("door",doorImg)
    climber.addImage("climber",climberImg)
    
    
    invisibleBlock.debug = false;
    invisibleBlockGroup.add(invisibleBlock);
    
    
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1
    
    door.lifetime=650
    climber.lifetime=650
    
    doorsGroup.add(door)
    climbersGroup.add(climber)
  }
}
  
