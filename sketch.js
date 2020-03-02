var bg;
var dish;
var sushi;
var comb;
var song;
var drop = false;
var comb_succ = false;
var xOffset = 0.0;


function preload() {
  // load sound file
  song = loadSound('assets/sound.mp3');
}

function setup() {
  // The background image must be the same size as the parameters
  // into the createCanvas() method. 
  bg = loadImage('assets/background.jpg');
  sushi = loadImage('assets/sushi.png')
  dish = loadImage('assets/dish.png')
  comb = loadImage('assets/combine.png')
  song.loop();

  // lower and upper bounds of coordinates
  min_x = -20;
  max_x = 880;
  min_y = -30;
  max_y = 500;
  
  // sushi and dish coordinates
  d_x = min_x;
  d_y = max_y;
  s_x = min_x;
  s_y = min_y;
  createCanvas(1024, 650);
}

function draw() {
  
  // background
  background(bg);
  rect(0, 0, 1030, 100);
  
  // move dish on conveyeror belt
  if (d_x < max_x) {
    d_x = d_x + 1;
  } else {
    comb_succ = false;
    d_x = min_x;
  }
  
  if (comb_succ) {
    image(comb, d_x, d_y, dish.width / 5, dish.height / 5);
  } else {
    image(dish, d_x, d_y, dish.width / 5, dish.height / 5);
  }

  // move sushi
  if (!drop) {
    if (mouseX > -min_x && mouseX < max_x) {
      s_x = min(max(mouseX, min_x), max_x);
    }
  } else {
    if (s_y < max_y) {
      s_y = s_y + 2;
    } else {
      drop = false
      if (s_x < d_x + 50 && s_x > d_x - 50) {
        comb_succ = true;
      }
      s_x = min_x;
      s_y = min_y;
    }
  }
  image(sushi, s_x, s_y, sushi.width / 5, sushi.height / 5)

}


function mouseReleased() {
  drop = true;
}
