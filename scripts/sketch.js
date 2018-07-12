let canvas
let gridSize = 5
let zoom = 8
let canvasWidth
let canvasHeight
let player = new Player()

function setup() {
	canvasWidth = 9*gridSize*zoom
	canvasHeight = 13*gridSize*zoom
	canvas = createCanvas(canvasWidth, canvasHeight)
	canvas.style('display', 'block')
	select('body').attribute('bgColor', 'black')
}

function draw() {
	scale(zoom)
	background(51);
	fill(255);
	rect(0,canvasHeight/zoom/2,gridSize,gridSize);
}

function windowResized() {
	resizeCanvas(canvasWidth, canvasHeight);
}

function keyTyped() {
	if (key === 'w') {
		value = 255;
	} else if (key === 'b') {
		value = 0;
  }
  return false;
}