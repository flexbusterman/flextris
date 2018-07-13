let canvas
let gridSize = 4
let zoom = 7
let canvasWidth
let canvasHeight
let piece
let fieldTopMargin = 1
let fieldLeftMargin = 1
let fieldWidth = 10 // NES Tetris
let fieldHeight = 22 // NES Tetris has top 2 hidden
let colors = {
	I: [255,0,0],
	O: [0,0,255],
	J: [255,150,0],
	L: [255,0,255],
	S: [0,255,0],
	T: [204,153,0],
	Z: [0,255,255]
}
let currentPiece
let level = 2
let score = 0

let randPiece = () => {
	let pieceLetters = ["I","O","J","L","S","T","Z"]
	let randPiece = Math.floor(Math.random() * 7)
	return pieceLetters[randPiece]
}

function setup() {

	console.log("Arrow keys moves, 'z' rotates left, 'x' rotates right, 'c' adds piece to board.")

	canvasWidth = (fieldWidth+7)*gridSize*zoom
	canvasHeight = 25*gridSize*zoom
	canvas = createCanvas(canvasWidth, canvasHeight)
	canvas.style('display', 'block')
	select('body').attribute('bgColor', 'black')
	currentPiece = randPiece()
	field = new Field(fieldWidth,fieldHeight)
	piece = new Piece()
	piece.create(currentPiece)
}

function draw() {
	scale(zoom)
	background(51)
	fill(22)
	stroke(0,0,0,0)
	rect(fieldLeftMargin*gridSize,fieldTopMargin*gridSize,fieldWidth*gridSize,fieldHeight*gridSize)

	field.draw()

	piece.update()
	piece.draw()

}

function windowResized() {
	resizeCanvas(canvasWidth, canvasHeight);
}

function keyTyped() {
	if (key === 'z') {
		piece.rotateLeft()
	} else if (key === 'x') {
		piece.rotateRight()
	} else if (key === 'c') {
		console.log(piece.canMove(-1,0))
	}
	return false;
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		piece.counterLeft = 0
		piece.move(-1,0);
	} else if (keyCode === RIGHT_ARROW) {
		piece.counterRight = 0
		piece.move(1,0);
	} else if (keyCode === DOWN_ARROW) {
		piece.counterDown = 0
		piece.move(0,1);
	}
}

function keyReleased(){
	if (keyCode === LEFT_ARROW) {
		piece.moveDelayLeft = 0
		piece.counterLeft = 0
	} else if (keyCode === RIGHT_ARROW) {
		piece.moveDelayRight = 0
		piece.counterRight = 0
	} else if (keyCode === DOWN_ARROW) {
		piece.moveDelayDown = 0
		piece.counterDown = 0
	}
}