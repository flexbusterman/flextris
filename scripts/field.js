function Field(width,height){
	this.columns = new Array(width)
	for (var i = 0; i < this.columns.length; i++) {
		this.columns[i] = new Array(height)
	}

	for (var i = 0; i < this.columns.length; i++) {
		for (var j = 0; j < this.columns[0].length; j++){
			this.columns[i][j] = {
				color: [0,0,0],
				value: 0
			}
		}
	}

	this.addPiece = (item) => {
		console.log(item)
	}
}