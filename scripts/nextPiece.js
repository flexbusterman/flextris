function NextPiece() {

	this.create = (pieceLetter) => {
		let pieceLetters = ["I","O","J","L","S","T","Z"]
		let randPiece = pieceLetters[Math.floor(Math.random() * 7)]
		this.letter = randPiece
		this.color = colors[randPiece]
		this.shape = shapes[randPiece]
		this.rotation = Math.floor(Math.random() * this.shape.length)
	}

	this.draw = (x,y) => {

		for (var i = 0; i < this.shape[this.rotation][0].length; i++) {
			for (var j = 0; j < this.shape[this.rotation][0].length; j++) {
				if (this.shape[this.rotation][i][j] == 1) {

					strokeWeight(0.0001)
					fill(this.color)
					rect((x+j)*gridSize,(y+i)*gridSize,gridSize,gridSize)

				}
			}
		}


	}

}