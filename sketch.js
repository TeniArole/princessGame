var bgImage, bg
var score = 0;
var PLAY = 1
var END = 0;
var timer = 60;
var gameState;
var pinkPrincessImage, pinkPrincess
var purplePrincessImage, purplePrincess
var pinkCandyImage, pinkCandy
var purpleCandyImage, purpleCandy
var mixedCandyImage, mixedCandy
var lemonImage, lemon
var pinkGroup, purpleGroup, mixedGroup, lemonGroup


function preload(){
    bgImage=loadImage("images/flower background.jpg")
    pinkCandyImage=loadImage("images/candy1.png")
    purpleCandyImage=loadImage("images/candy2.png")
    mixedCandyImage=loadImage("images/candy3.png")
    pinkPrincessImage=loadImage("images/princess pink copy.png")
    purplePrincessImage=loadImage("images/princess purple copy.png")
    lemonImage=loadImage("images/lemon cartoon.png")


}

function setup(){
    createCanvas(600, 900)
	bg=createSprite(200, 500, 1200, 900)
    bg.addImage(bgImage)
    bg.scale = 3
    bg.velocityY = 2;
    
    

    //pink princess
    pinkPrincess=createSprite(200, 800, 30, 30)
    pinkPrincess.addImage(pinkPrincessImage)
    pinkPrincess.scale= 1.2
    
    //purple princess
    purplePrincess=createSprite(400, 800, 30, 30)
    purplePrincess.addImage(purplePrincessImage)
    purplePrincess.scale= 1.2
    
    //groups
    pinkGroup = new Group()
    purpleGroup = new Group()
    mixedGroup = new Group()
    lemonGroup = new Group()

}

function draw(){
    background(0)
    textSize(30);
	fill("black")
	text("Pink Score: " + score,  600, 700)
   
    //to make background move
    if(bg.y>900){
        bg.y=700
    }
  
if(gameState === PLAY){
    //to make restart image invisible --> create sprite and add images
    restart.visible = false;
    gameOver.visible = false;

    //timer
    text("Time Left: " + timer, 500, 40)
    fill("black")
    timer=timer-1;

    pinkPrincess.x=mouseX
    pinkPrincess.y=mouseY


    /*if(keyDown(UP_ARROW)){
		pinkPrincess.velocityY = -3
	}

    if(keyDown(DOWN_ARROW)){
		pinkPrincess.velocityY = 3
	}

	if(keyDown(LEFT_ARROW)){
		pinkPrincess.velocityX = -3
	}
	
	if(keyDown(RIGHT_ARROW)){
		pinkPrincess.velocityX = 3
    }
    */	
    

	if(pinkGroup.isTouching(pinkPrincess)){
		pinkGroup.destroyEach();
		score = score + 1;
	}
   
    if(lemonGroup.isTouching(pinkPrincess)){
		lemonGroup.destroyEach();
		score = score - 1;
	}
    
    // 2 points
    if(mixedGroup.isTouching(pinkPrincess)){
		mixedGroup.destroyEach();
		score = score + 2;
	}

    

    pinkCandies();
	purpleCandies();
	mixedCandies();
	lemons();
}
	if(timer===0){
        //do this for each group
        pinkGroup.destroyEach();
       
        //stop background from moving
        bg.velocityY = 0;
        
        //stop princesses from moving
        pinkPrincess.velocityX = 0;
        pinkPrincess.velocityY = 0;
       
        //end images visible
        gameOver.visible = true;
        restart.visible=true;

        gameState = END


    }

    else{
        if(gameState === END){
            gameOver.visible = true;
            restart.visible=true;
            score = 0;

            if(mousePressedOver(restart)){
                reset();
            }

        }
    }
	
	

	drawSprites();

}
console.log(frameCount)

//to restart the game
function reset(){
    gameState = PLAY;
    score = 0;
}


function pinkCandies(){
    if(World.frameCount%120===0){
    pinkCandy=createSprite(Math.round(random(20, 1180)), 
	Math.round(random(20, 780)), 20, 20)
    pinkCandy.addImage(pinkCandyImage)
    pinkCandy.scale = 0.1
    pinkGroup.add(pinkCandy)

    }
}

function purpleCandies(){
    if(World.frameCount%120===0){
    purpleCandy=createSprite(Math.round(random(20, 1180)), (
    Math.round(random(20, 780))), 20, 20)
    purpleCandy.addImage(purpleCandyImage)
    purpleCandy.scale = 0.1
   // purpleCandy.velocityY = -3;
    purpleGroup.add(purpleCandy)
    }
}

function mixedCandies (){
    if(World.frameCount%200===0){
    mixedCandy=createSprite((Math.round(random(20, 1180))), 
    (Math.round(random(20, 780))), 20, 20)
    mixedCandy.addImage(mixedCandyImage)
    mixedCandy.scale = 0.1
   // mixedCandy.velocityY = -3;
    mixedGroup.add(mixedCandy)

    }
}

function lemons(){
    if(World.frameCount%120===0){
    lemon=createSprite(Math.round(random(20, 1180)),
     (Math.round(random(20, 780))), 20, 20)
    lemon.addImage(lemonImage)
    lemon.scale = 0.015
   // lemon.velocityY = -3;
    lemonGroup.add(lemon)
    }
}