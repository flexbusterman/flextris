function Player() {
	this.x = 0
	this.y = 0
	this.update = (x,y) => {
		this.x += x
		this.y += y
	}
}