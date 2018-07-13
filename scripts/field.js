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
					type: "bottom"
				}							
			} else if (i == width+1) {
				this.columns[i][j] = {
					color: [255,0,0,100],
					obstacle: true,
					type: "border"
				}				
			} else {
				this.columns[i][j] = {
					color: [0,0,0,0],
					obstacle: false,
					type: "field"
				}								
			}
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
						type: "field"
					}	
				}
			}
		}
	}

	this.draw = () => {
		for (var i = 0; i < this.columns.length; i++) {
			for (var j = 0; j < this.columns[i].length; j++) {
				if (this.columns[i][j].obstacle == true){

					strokeWeight(0.0001)
					fill(this.columns[i][j].color)
					rect(i*gridSize,j*gridSize,gridSize,gridSize)
				}
			}
		}
	}
}