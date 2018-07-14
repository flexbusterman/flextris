function Piece() {
	this.x = 0
	this.y = 0
	this.rotation = 0
	this.counterDown = 0
	this.counterLeft = 0
	this.counterRight = 0
	this.moveDelayDown = 0
	this.moveDelayLeft = 0
	this.moveDelayRight = 0


	this.create = (pieceLetter) => {
		this.x = fieldWidth / 2
		this.y = fieldTopMargin - 1
		this.letter = pieceLetter
		this.color = colors[pieceLetter]
		this.shape = shapes[pieceLetter]
		this.rotation = Math.floor(Math.random() * this.shape.length)
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
		// cap number here

		futureRotation = this.rotation + rotate

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
		this.counterDown += level + 1


		// delay of continuous movement
		if (keyIsDown(DOWN_ARROW) && canDownTurbo == true) {
			this.moveDelayDown ++
			if (this.moveDelayDown > 10) {
    			this.counterDown += 50;
			}
  		} else if (keyIsDown(LEFT_ARROW)) {
			this.moveDelayLeft ++
			if (this.moveDelayLeft > 10) {
    			this.counterLeft += 33;
			}
  		} else if (keyIsDown(RIGHT_ARROW)) {
			this.moveDelayRight ++
			if (this.moveDelayRight > 10) {
    			this.counterRight += 33;
			}
  		}

  		// time to move!
		if (this.counterDown >= 100) {
			if (this.canMove(0,1)[0] == true) {
				this.move(0,1)			
			} else {
				this.collide()
				this.moveDelayDown = 0
				this.counterDown = 0
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
		currentPiece = randPiece()
		this.create(currentPiece)
		canDownTurbo = false

		// check for lines and update field



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