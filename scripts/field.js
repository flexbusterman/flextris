function Field(width,height){
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

	this.update = () => {
		if (this.checkLines() != []) {
			this.removeLines(this.checkLines())
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
			for (var j = 0; j < this.columns[i].length; j++) {
				
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