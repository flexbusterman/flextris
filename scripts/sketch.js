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
let flashText

// Tetris & Dr Mario colors
let colors = {
	I: [150,100,150],
	O: [200,200,100],
	J: [100,100,200],
	L: [100,200,200],
	S: [100,100,200],
	T: [200,200,100],
	Z: [100,200,200]
}


// NES-like colors
// let colors = {
// 	I: [255,0,0],
// 	O: [0,0,255],
// 	J: [255,150,0],
// 	L: [255,0,255],
// 	S: [0,255,0],
// 	T: [150],
// 	Z: [0,255,255]
// }

let currentPiece
let level = 0
let canTurbo = false
let nextPiece
let score = new Score()

let randPiece = () => {
	let pieceLetters = ["I","O","J","L","S","T","Z"]
	let randPiece = Math.floor(Math.random() * 7)
	return pieceLetters[randPiece]
}
let intro = new Intro()
let gameOver = new GameOver()
let myFont

let state
let textToShow

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function preload() {
	myFont = loadFont('assets/ponderosa.ttf');
}

function setup() {

	console.log("Arrow keys moves, 'z' rotates left, 'x' rotates right. When below lvl 10 you can switch lvl by pressing a number on keyboard. Work in progress by Christian Augustin.")

	canvasWidth = (fieldWidth+9)*gridSize*zoom
	canvasHeight = 25*gridSize*zoom
	canvas = createCanvas(canvasWidth, canvasHeight)
	canvas.style('display', 'block')
	centerCanvas()
	select('body').attribute('bgColor', 'black')

	score.create()
	currentPiece = randPiece()
	field = new Field(fieldWidth,fieldHeight)
	field.create()
	nextPiece = new NextPiece()
	nextPiece.create()
	piece = new Piece()
	// piece.create(currentPiece)
	flashText = new FlashText()
	flashText.create("FLEXTRIS", 5.0)
	state = "intro"
	textToShow = true
}

function draw() {

	scale(zoom)
	background(51)

	if (state == "intro") {

		// draw field
		fill(22)
		stroke(0,0,0,0)
		rect(fieldLeftMargin*gridSize,fieldTopMargin*gridSize,fieldWidth*gridSize,fieldHeight*gridSize)

		// // text to show 
		// if (textToShow == true) {
		// 	flashText.update()
		// 	flashText.draw()
		// }

		// draw next piece background
		fill(22)
		stroke(0,0,0,0)
		rect((fieldWidth+fieldLeftMargin + 1)*gridSize,(fieldTopMargin+1)*gridSize,5*gridSize,5*gridSize)

		// nextPiece.draw(fieldWidth+fieldLeftMargin+2,fieldTopMargin+2)

		score.update()
		score.draw()

		// field.update()
		field.draw()

		intro.update()
		intro.draw()

		// piece.update()
		// piece.draw()
	}

	if (state == "game over") {

		// draw field
		fill(22)
		stroke(0,0,0,0)
		rect(fieldLeftMargin*gridSize,fieldTopMargin*gridSize,fieldWidth*gridSize,fieldHeight*gridSize)

		// draw next piece background
		fill(22)
		stroke(0,0,0,0)
		rect((fieldWidth+fieldLeftMargin + 1)*gridSize,(fieldTopMargin+1)*gridSize,5*gridSize,5*gridSize)

		score.update()
		score.draw()

		// field.update()
		field.draw()

		// draw overlay
		fill(22,22,22,220)
		stroke(0,0,0,0)
		rect(fieldLeftMargin*gridSize,fieldTopMargin*gridSize,fieldWidth*gridSize,fieldHeight*gridSize)


		gameOver.update()
		gameOver.draw()

		// piece.update()
		// piece.draw()
	}

	if (state == "game") {

		// draw field
		fill(22)
		stroke(0,0,0,0)
		rect(fieldLeftMargin*gridSize,fieldTopMargin*gridSize,fieldWidth*gridSize,fieldHeight*gridSize)

		// text to show 
		if (textToShow == true) {
			flashText.update()
			flashText.draw()
		}

		// draw next piece background
		fill(22)
		stroke(0,0,0,0)
		rect((fieldWidth+fieldLeftMargin + 1)*gridSize,(fieldTopMargin+1)*gridSize,5*gridSize,5*gridSize)

		nextPiece.draw(fieldWidth+fieldLeftMargin+2,fieldTopMargin+2)

		score.update()
		score.draw()

		// field.update()
		field.draw()

		piece.update()
		piece.draw()
	}


	if (state == "flashLines") {
		// draw field
		fill(22)
		stroke(0,0,0,0)
		rect(fieldLeftMargin*gridSize,fieldTopMargin*gridSize,fieldWidth*gridSize,fieldHeight*gridSize)

		// text to show 
		if (textToShow == true) {
			flashText.draw()
		}

		// // draw next piece background
		fill(22)
		stroke(0,0,0,0)
		rect((fieldWidth+fieldLeftMargin + 1)*gridSize,(fieldTopMargin+1)*gridSize,5*gridSize,5*gridSize)

		nextPiece.draw(fieldWidth+fieldLeftMargin+2,fieldTopMargin+2)

		score.update()
		score.draw()

		// field.update()
		field.draw()

		piece.draw()

		field.flashLines.update()
		field.flashLines.draw()

	}

}

function windowResized() {
	resizeCanvas(canvasWidth, canvasHeight);
	centerCanvas()
}

function keyTyped() {
	if (key === 'z' || key === 'Z' ) {
		piece.rotateLeft()
	} else if (key === 'x' || key === 'X') {
		piece.rotateRight()
	} else if (key === "0" && level < 10){
		level = 0
	} else if (key === "1" && level < 10){
		level = 1
	} else if (key === "2" && level < 10){
		level = 2
	} else if (key === "3" && level < 10){
		level = 3
	} else if (key === "4" && level < 10){
		level = 4
	} else if (key === "5" && level < 10){
		level = 5
	} else if (key === "6" && level < 10){
		level = 6
	} else if (key === "7" && level < 10){
		level = 7
	} else if (key === "8" && level < 10){
		level = 8
	} else if (key === "9" && level < 10){
		level = 9
	}

	return false;
}

function keyPressed(asdf) {
	if (state == "game") {
		if (keyCode === LEFT_ARROW) {
			piece.counterLeft = 0
			piece.move(-1,0);
		} else if (keyCode === RIGHT_ARROW) {
			piece.counterRight = 0
			piece.move(1,0);
		} else if (keyCode === DOWN_ARROW) {
			piece.counterDown = 0
			piece.move(0,1);
		} else if (keyCode === UP_ARROW) {
			piece.drop();
		}	
	}

	if (state == "intro") {
		state = "game"
	}

	if (state == "game over") {
		newGame()
	}
}

function keyReleased(){
	if (keyCode === LEFT_ARROW) {
		canTurbo = true
		piece.moveDelayLeft = 0
		piece.counterLeft = 0
	} else if (keyCode === RIGHT_ARROW) {
		canTurbo = true
		piece.moveDelayRight = 0
		piece.counterRight = 0
	} else if (keyCode === DOWN_ARROW) {
		canTurbo = true
		piece.moveDelayDown = 0
		piece.counterDown = 0
	} else if (keyCode === UP_ARROW) {
		canTurbo = true
	}
}

function newGame(){
	state = "game"
	field.create()
	nextPiece.create()
	piece.create()
	score.create()
	level = 0
	flashText.create("FLEXTRIS", 5.0)
	textToShow = true
	canTurbo = false
}
