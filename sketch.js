var gameState = "play";
var tower, towerimg;
var door, doorimg, doorgroup;
var climber, climberimg, climbergroup;
var invisible, invisiblegroup;
var ghost, ghostimg;
var spookysound;

function preload() {
  towerimg = loadImage("tower.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png");
  ghostimg = loadImage("ghost-standing.png");
  spookysound = loadSound("spooky.wav");
}
function setup() {
  createCanvas(600, 600);
  spookysound.loop();
  tower = createSprite(300, 300);
  tower.addImage("tower", towerimg);
  tower.velocityY = 1;

  //groups
  doorgroup = new Group();
  climbergroup = createGroup();
  invisiblegroup = createGroup();

  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostimg);
  ghost.scale = 0.3;
}
function draw() {
  background(0);
  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300;
    }
    spawndoors();

    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 3;
    }
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x + 3;
    }
    if (keyDown("space")) {
      ghost.velocityY = -10;
    }
    ghost.velocityY += 0.8;
    if (climbergroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisiblegroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();
  }
  if (gameState === "end") {
    stroke("red");
    fill("blue");
    textSize(30);
    text("Game Over",230,300);
  }
}

function spawndoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.velocityY = 1;
    door.x = Math.round(random(120, 400));
    door.addImage("door", doorimg);

    //climber
    climber = createSprite(200, 10);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.addImage("climber", climberimg);

    //invisible
    invisible = createSprite(200, 15);
    invisible.width = climber.width;
    invisible.height = 2;
    invisible.velocityY = 1;

    ghost.depth = door.depth;
    ghost.depth += 1;

    doorgroup.add(door);
    climbergroup.add(climber);
    invisiblegroup.add(invisible);

    door.lifetime = 800;
    climber.lifetime = 800;
    invisible.lifetime = 800;
  }
}
