function Piece() {
	this.counterDown = 0
	this.counterLeft = 0
	this.counterRight = 0
	this.moveDelayDown = 0
	this.moveDelayLeft = 0
	this.moveDelayRight = 0

	this.x = fieldWidth / 2
	this.y = fieldTopMargin - 1
	this.letter = currentPiece
	this.color = colors[currentPiece]
	this.shape = shapes[currentPiece]

	this.rotation = Math.floor(Math.random() * this.shape.length)

	this.create = (pieceLetter) => {
		this.x = fieldWidth / 2
		this.y = fieldTopMargin - 1
		this.letter = nextPiece.letter
		this.color = colors[nextPiece.letter]
		this.shape = shapes[nextPiece.letter]
		this.rotation = nextPiece.rotation
	}

	this.canMove = (x,y) => {
		let currentShape = this.shape[this.rotation]
		let canMove = true
		let obstacleType = null
		for (var i = 0; i < currentShape.length; i++) {
			for (var j = 0; j < currentShape[i].length; j++) {

				// currentShape Y

				if (currentShape[j][i] == 1 && field.columns[this.x+x+i][this.y+y+j].obstacle) {
					canMove = false
					obstacleType = field.columns[this.x+x+i][this.y+y+j].type
				}
			}
		}

		return [canMove, obstacleType]
	}

	this.canRotate = (rotate) => {

		let rotatedShape
		let canRotate = true
		let obstacleType = null
		let futureRotation

		futureRotation = this.rotation + rotate


		// cap futureRotation
		if (futureRotation < 0) {
			futureRotation = this.shape.length-1
		}

		if (futureRotation > this.shape.length-1) {
			futureRotation = 0
		}

		rotatedShape = this.shape[futureRotation]

		for (var i = 0; i < rotatedShape.length; i++) {
			for (var j = 0; j < rotatedShape[i].length; j++) {

				// rotatedShape Y

				if (rotatedShape[j][i] == 1 && field.columns[this.x+i][this.y+j].obstacle) {
					canRotate = false
					obstacleType = field.columns[this.x+i][this.y+j].type
				}
			}
		}

		return [canRotate, obstacleType]
	}

	this.update = () => {
		this.counterDown += level * 1.5 + 1

		// delay of continuous movement
		if (keyIsDown(DOWN_ARROW) && canDownTurbo == true) {
			this.moveDelayDown ++
			if (this.moveDelayDown > 10) {
    			this.counterDown += 50
    			score.total += level + 1
    			if (score.total > score.highScore) {
    				score.highScore = score.total
    			} 
			}
  		} else if (keyIsDown(LEFT_ARROW)) {
			this.moveDelayLeft ++
			if (this.moveDelayLeft > 10) {
    			this.counterLeft += 33
			}
  		} else if (keyIsDown(RIGHT_ARROW)) {
			this.moveDelayRight ++
			if (this.moveDelayRight > 10) {
    			this.counterRight += 33
			}
  		}

  		// time to move!
		if (this.counterDown >= 100) {
			if (this.canMove(0,1)[0] == true) {
				this.move(0,1)			
			} else {
				this.collide()
				this.moveDelayDown = 0
				// this.counterDown = 0
			}
			this.counterDown = 0
		}
		if (this.counterLeft >= 100) {
			if (this.canMove(-1,0)[0] == true){
				this.move(-1,0)
			}
			this.counterLeft = 0
		}
		if (this.counterRight >= 100) {
			this.move(1,0)
			this.counterRight = 0
		}

	}

	this.move = (x,y) => {
		if (this.canMove(x,y)[0] == true) {
			this.x += x
			this.y += y			
		}
	}

	this.collide = () => {
		// update piece and add old to field
		field.addPiece(this)
		field.update()
		// currentPiece = randPiece()

		if(this.y <= 1) {
			this.death()
		}

		this.create(currentPiece)
		nextPiece.create()
		canDownTurbo = false
	}

	this.death = () => {
		field.create()
		nextPiece.create()
		this.create()
		score.create()
		level = 0
		flashText.create("FLEXTRIS", 5.0)
		textToShow = true
	}

	this.rotateLeft = () => {
		if (this.canRotate(-1)[0] == true) {
			this.rotation--
			if (this.rotation < 0) {
				this.rotation = this.shape.length-1
			}			
		}
	}

	this.rotateRight = () => {
		if (this.canRotate(1)[0] == true) {
			this.rotation++
			if (this.rotation > this.shape.length-1) {
				this.rotation = 0
			}			
		}
	}

	this.drop = () => {
		for (var i = 0; i < fieldHeight; i++) {
			if (this.canMove(0,1)[0]) {
				this.move(0,1)
			} else {
				score.total += i * (level + 1) * 2
    			if (score.total > score.highScore) {
    				score.highScore = score.total
    			} 
			}
			
		}
		this.collide()
		canDownTurbo = true
	}

	this.draw = () => {
		for (var i = 0; i < this.shape[this.rotation][0].length; i++) {
			for (var j = 0; j < this.shape[this.rotation][0].length; j++) {
				if (this.shape[this.rotation][i][j] == 1) {

					strokeWeight(0.0001)
					fill(this.color)
					rect((this.x+j)*gridSize,(this.y+i)*gridSize,gridSize,gridSize)

				}
			}
		}
	}

	// TODO: Add the collision into this function
	// this.collide = () => {
	// 	field.addPiece(this)
	// }

}