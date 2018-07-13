
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
		this.canMoveLeft = true
		this.canMoveRight = true
		this.canMoveDown = true
		this.x = fieldWidth / 2
		this.y = fieldTopMargin - 1
		this.letter = pieceLetter
		this.color = colors[pieceLetter]
		this.shape = shapes[pieceLetter]
		this.rotation = Math.floor(Math.random() * this.shape.length)
	}

	this.update = () => {
		this.counterDown += level + 1


		// delay of continuous movement
		if (keyIsDown(DOWN_ARROW)) {
			this.moveDelayDown ++
			if (this.moveDelayDown > 10) {
    			this.counterDown += 33;
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
			this.move(0,1)
			this.counterDown = 0
		}
		if (this.counterLeft >= 100) {
			this.move(-1,0)
			this.counterLeft = 0
		}
		if (this.counterRight >= 100) {
			this.move(1,0)
			this.counterRight = 0
		}


		// Can move left?

		for (var i = 0; i < this.shape[this.rotation].length; i++) {
			if (this.shape[this.rotation][i][0] && this.x == fieldLeftMargin) {
				this.canMoveLeft = false
			}
		}

		// console.log(this.canMoveLeft)




	}

	this.move = (x,y) => {

		// check if move is possible

		this.x += x
		this.y += y
	}

	this.rotateLeft = () => {
		this.rotation--
		if (this.rotation < 0) {
			this.rotation = this.shape.length-1
		}
	}

	this.rotateRight = () => {
		this.rotation++
		if (this.rotation > this.shape.length-1) {
			this.rotation = 0
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