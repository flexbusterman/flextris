function Score(){
	this.highScore = 1000000

	this.create = () => {
		this.total = 0
		this.tetrises = 0
		this.tetrisCombo = 0
		this.maxTetrisCombo = 0
		this.lines = 0
		this.colorShift = [0,0,0,0,0,0]

		this.x = (fieldWidth + fieldLeftMargin + 1) * gridSize
		this.y = (8 + fieldTopMargin) * gridSize
	}

	this.update = () => {
		// time to lvl up?
		
		if (this.lines >= (level+1) * 10) {
			level ++
			this.colorShift[2] = 100
		}
	}

	this.draw = () => {

		textAlign(LEFT)
		textFont(myFont,gridSize/1.5)
		fill(255,255,255)
				
		// TODO: this is bad programming

		text("NEXT PIECE", this.x, (fieldTopMargin+1)*gridSize)

		if (this.colorShift[0] > 0) {
			this.colorShift[0]--

			fill(255-Math.random()*(2.5 * this.colorShift[0]),255-Math.random()*(2.5 * this.colorShift[0]),255-Math.random()*(2.5 * this.colorShift[0]))
		} else {
			fill(255,255,255)
		}

		text("HIGHSCORE\n"+this.highScore,this.x,this.y)

		if (this.colorShift[1] > 0) {
			this.colorShift[1]--

			fill(255-Math.random()*(2.5 * this.colorShift[1]),255-Math.random()*(2.5 * this.colorShift[1]),255-Math.random()*(2.5 * this.colorShift[1]))
		} else {
			fill(255,255,255)
		}

		text("SCORE\n"+this.total,this.x,this.y+3*gridSize/1.5)

		if (this.colorShift[2] > 0) {
			this.colorShift[2]--

			fill(255-Math.random()*(2.5 * this.colorShift[2]),255-Math.random()*(2.5 * this.colorShift[2]),255-Math.random()*(2.5 * this.colorShift[2]))
		} else {
			fill(255,255,255)
		}

		text("LEVEL\n"+level,this.x,this.y+6*gridSize/1.5)

		if (this.colorShift[3] > 0) {
			this.colorShift[3]--

			fill(255-Math.random()*(2.5 * this.colorShift[3]),255-Math.random()*(2.5 * this.colorShift[3]),255-Math.random()*(2.5 * this.colorShift[3]))
		} else {
			fill(255,255,255)
		}

		text("LINES\n"+this.lines,this.x,this.y+9*gridSize/1.5)

		if (this.colorShift[4] > 0) {
			this.colorShift[4]--

			fill(255-Math.random()*(2.5 * this.colorShift[4]),255-Math.random()*(2.5 * this.colorShift[4]),255-Math.random()*(2.5 * this.colorShift[4]))
		} else {
			fill(255,255,255)
		}

		text("TETRISES\n"+this.tetrises,this.x,this.y+12*gridSize/1.5)

		if (this.colorShift[5] > 0) {
			this.colorShift[5]--

			fill(255-Math.random()*(2.5 * this.colorShift[5]),255-Math.random()*(2.5 * this.colorShift[5]),255-Math.random()*(2.5 * this.colorShift[5]))
		} else {
			fill(255,255,255)
		}

		text("TETRIS COMBO\n"+this.tetrisCombo,this.x,this.y+15*gridSize/1.5)

		if (this.colorShift[6] > 0) {
			this.colorShift[6]--

			fill(255-Math.random()*(2.5 * this.colorShift[6]),255-Math.random()*(2.5 * this.colorShift[6]),255-Math.random()*(2.5 * this.colorShift[6]))
		} else {
			fill(255,255,255)
		}

		text("MAX TETRIS \nCOMBO\n"+this.maxTetrisCombo,this.x,this.y+18*gridSize/1.5)
	}

}