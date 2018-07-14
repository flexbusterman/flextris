function FlashText(){

	this.create = (string,size) => {
		this.string = string
		this.brightness = 255
		this.size = size
	}

	this.update = () => {
		this.size -= 0.02
		this.brightness = this.size * 75
	}

	this.draw = () => {

		if (this.size >= 0) {
			textAlign(CENTER)
			textFont(myFont,this.size)
			fill(Math.random()*this.brightness,Math.random()*this.brightness,Math.random()*this.brightness,this.brightness/6)
			text(this.string,(fieldLeftMargin+fieldWidth/2)*gridSize,(fieldTopMargin+fieldHeight/2)*gridSize)
		} else {
			textToShow = false
		}

	}
}