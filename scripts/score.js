function Score(){
	this.highScore = 1000000
	this.fontSize = gridSize / 1.7

	this.create = () => {
		this.total = 0
		this.tetrises = 0
		this.tetrisCombo = 0
		this.maxTetrisCombo = 0
		this.lines = 0
		this.colorShift = [0,0,0,0,0,0,0]
		this.maxDrought = 0
		this.drought = 0

		this.x = (fieldWidth + fieldLeftMargin + 1) * gridSize
		this.y = (8 + fieldTopMargin) * gridSize
	}

	this.update = () => {
		// time to lvl up?
		if (this.lines >= (level+1) * 10) {
			level ++
			this.colorShift[2] = 100
		}

		if (this.drought >= this.maxDrought) {
			this.maxDrought++
		}
	}

	this.draw = () => {

		textAlign(LEFT)
		textFont(myFont,this.fontSize)
		fill(255,255,255)
				
		// TODO: this is bad programming

		text("NEXT PIECE", this.x, (fieldTopMargin+1)*gridSize-1.5)

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

		text("SCORE\n"+this.total,this.x,this.y+3*this.fontSize)

		if (this.colorShift[2] > 0) {
			this.colorShift[2]--

			fill(255-Math.random()*(2.5 * this.colorShift[2]),255-Math.random()*(2.5 * this.colorShift[2]),255-Math.random()*(2.5 * this.colorShift[2]))
		} else {
			fill(255,255,255)
		}

		text("LEVEL\n"+level,this.x,this.y+6*this.fontSize)

		if (this.colorShift[3] > 0) {
			this.colorShift[3]--

			fill(255-Math.random()*(2.5 * this.colorShift[3]),255-Math.random()*(2.5 * this.colorShift[3]),255-Math.random()*(2.5 * this.colorShift[3]))
		} else {
			fill(255,255,255)
		}

		text("LINES\n"+this.lines,this.x,this.y+9*this.fontSize)

		if (this.colorShift[4] > 0) {
			this.colorShift[4]--

			fill(255-Math.random()*(2.5 * this.colorShift[4]),255-Math.random()*(2.5 * this.colorShift[4]),255-Math.random()*(2.5 * this.colorShift[4]))
		} else {
			fill(255,255,255)
		}

		text("TETRISES\n"+this.tetrises,this.x,this.y+12*this.fontSize)

		if (this.colorShift[5] > 0) {
			this.colorShift[5]--

			fill(255-Math.random()*(2.5 * this.colorShift[5]),255-Math.random()*(2.5 * this.colorShift[5]),255-Math.random()*(2.5 * this.colorShift[5]))
		} else {
			fill(255,255,255)
		}

		text("TETRIS COMBO\n"+this.tetrisCombo,this.x,this.y+15*this.fontSize)

		if (this.colorShift[6] > 0) {
			this.colorShift[6]--

			fill(255-Math.random()*(2.5 * this.colorShift[6]),255-Math.random()*(2.5 * this.colorShift[6]),255-Math.random()*(2.5 * this.colorShift[6]))
		} else {
			fill(255,255,255)
		}

		text("MAX TETRIS \nCOMBO\n"+this.maxTetrisCombo,this.x,this.y+18*this.fontSize)

		if (this.colorShift[7] > 0) {
			this.colorShift[7]--

			fill(255-Math.random()*(2.5 * this.colorShift[7]),255-Math.random()*(2.5 * this.colorShift[7]),255-Math.random()*(2.5 * this.colorShift[7]))
		} else {
			fill(255,255,255)
		}

		text("MAX DROUGHT\n"+this.maxDrought,this.x,this.y+22*this.fontSize)
	}

}