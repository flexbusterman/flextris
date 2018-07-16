function Field(width,height){
	this.currentLines = []

	this.flashLines = {}
	this.flashLines.time = 10

	this.create = () => {

		this.columns = new Array(width + 2)

		for (var i = 0; i < this.columns.length; i++) {
			this.columns[i] = new Array(height + 2)
		}

		for (var i = 0; i < this.columns.length; i++) {
			for (var j = 0; j < this.columns[0].length; j++){

				if (i == 0) {
					this.columns[i][j] = {
						color: [255,0,0,100],
						obstacle: true,
						type: "border"
					}
				} else if (j == height+1) {
					this.columns[i][j] = {
						color: [255,0,0,100],
						obstacle: true,
						type: "floor"
					}							
				} else if (i == width+1) {
					this.columns[i][j] = {
						color: [255,0,0,100],
						obstacle: true,
						type: "border"
					}				
				} else {
					this.columns[i][j] = {
						color: [255,255,0,100],
						obstacle: false,
						type: "field"
					}								
				}
			}
		}
	}

	this.update = () => {


		let amountLines = this.checkLines().length
		// check for lines
		this.fieldLines = this.checkLines()


		if (amountLines > 0) {

			// add score and stats

			score.lines += amountLines
			let scoreToAdd

			if (amountLines == 4) {
				score.tetrises ++
				score.colorShift[3] = 75
				score.colorShift[4] = 75
				score.tetrisCombo++
				if (score.tetrisCombo>1) {
					score.colorShift[5] = 75
				}
				if (score.tetrisCombo > score.maxTetrisCombo) {
					score.maxTetrisCombo = score.tetrisCombo
					score.colorShift[6] = 100
				}
				scoreToAdd = amountLines * 1000 * level * level * score.tetrisCombo
				score.total += scoreToAdd
				score.colorShift[1] = 100
			} else {
				scoreToAdd = amountLines * 100 * level * level
				score.total += scoreToAdd
				score.colorShift[1] = 30 + (15 * amountLines)
				score.colorShift[3] = 30 + (15 * amountLines)
				score.tetrisCombo = 0
			}

			if (score.total > score.highScore) {
				score.highScore = score.total
				score.colorShift[0] = score.colorShift[1]
			}

			// remove lines
			if (state == "game") {
				this.removeLines(this.checkLines())
			}

			score.update()

			state = "flashLines"
			field.flashLines.time = 1

		}

	}

	this.addPiece = (item) => {
		var addShape = item.shape[item.rotation]
		for (var i = 0; i < addShape.length; i++) {
			for (var j = 0; j < addShape[i].length; j++) {
				if (addShape[j][i] == 1) {
					this.columns[item.x+i][item.y+j] = {
						color: item.color,
						obstacle: true,
						type: "piece"
					}	
				}
			}
		}

		this.draw()
	}


	this.addEmptyLinesTop = (val) => {

		// move everything down val steps
		for (var i = 0; i < val; i++) {
			for (var j = 0; j <= fieldWidth; j++) {
				this.columns[j].unshift(0)
			}
		}

		// fill top with new rows

		for (var i = 0; i <= fieldWidth+1; i++) {
			for (var j = 0; j < val; j++) {


				if (i == 0) {
					this.columns[i][j] = {
						color: [255,0,0,100],
						obstacle: true,
						type: "border"
					}
				} else if (j == height+1) {
					this.columns[i][j] = {
						color: [255,0,0,100],
						obstacle: true,
						type: "floor"
					}							
				} else if (i == width+1) {
					this.columns[i][j] = {
						color: [255,0,0,100],
						obstacle: true,
						type: "border"
					}				
				} else {
					this.columns[i][j] = {
						color: [255,255,0,100],
						obstacle: false,
						type: "field"
					}								
				}


			}
		}





	}



	this.draw = () => {
		for (var i = 0; i < this.columns.length; i++) {
			for (var j = 1; j < this.columns[i].length; j++) {
				
				// draw field obstacles
				if (this.columns[i][j].obstacle == true && this.columns[i][j].type == "piece"){

					strokeWeight(0.0001)
					fill(this.columns[i][j].color)
					rect(i*gridSize,j*gridSize,gridSize,gridSize)
				}

				// // draw non-obstacles for testing
				// if (this.columns[i][j].obstacle == false){

				// 	strokeWeight(0.0001)
				// 	fill(this.columns[i][j].color)
				// 	rect(i*gridSize,j*gridSize,gridSize,gridSize)
				// }


			}
		}
	}

	this.checkLines = () => {
		this.lines = []
		this.linesFull = []

		// fill array with zeros
		for (var i = 0; i < this.columns[0].length; i++) {
			this.lines.push(0)
		}

		// count pieces in line
		for (var i = 1; i < this.columns.length-1; i++) {
			for (var j = 0; j < this.columns[i].length-1; j++) {

				if (this.columns[i][j].obstacle == true) {
					this.lines[j]++
				}

				if (this.lines[j] == this.columns.length-2) {
					this.linesFull.push(j)
				}
			}
		}

		return this.linesFull


	}


	this.flashLines.update = () => {
		if (this.flashLines.time > 0) {
			this.flashLines.time--
		} else {
			state = "game"
		}
	}

	this.flashLines.draw = () => {
		fill(255,255,255,0.5)
		
		this.fieldLines.forEach(function(element){
			// console.log(element)
			rect(fieldLeftMargin*gridSize,(fieldTopMargin+element-1)*gridSize,fieldWidth*gridSize,gridSize)
		})
	}

	this.removeLines = (toRemove) => {

		let that = this
		let linesRemoved = 0

		toRemove.forEach(function(index){
			for (var i = 0; i < fieldWidth+1; i++) {

				for (var j = 0; j < that.columns[i].length; j++) {

					if (j == index) {
						that.columns[i].splice(j,1)
						// console.log("boooom " + index + " removed " + j)
					}
				}
			}
			// fieldAfter.splice(index,1)
			linesRemoved++
			// console.log("lines removed " + linesRemoved)

			that.addEmptyLinesTop(1)
		})

		// console.log(fieldAfter)

	}
}