function GameOver(){

	this.logo = {}
	this.logo.fontSize = 0.7 * gridSize
	this.logo.x = (fieldLeftMargin*1.2 + fieldWidth/2) * gridSize
	this.logo.y = (fieldTopMargin + 3.5) * gridSize

	this.text = {}
	this.text.fontSize = 0.5 * gridSize
	this.text.x = this.logo.x
	this.text.y = (fieldTopMargin + 5) * gridSize
	this.text.master =`YOU ARE A
FLEXTRIS MASTER!`
	this.text.score =`SCORE `
	this.text.space =`PRESS SPACE`

	this.text.plug = `
Submit your score on
social media by taking
a picture of the screen
and post using the
#flextris hashtag :D
	`
	this.update = () => {
	}

	this.draw = () => {

		textAlign(CENTER)
		textFont(myFont,this.logo.fontSize)
		fill(Math.random()*255,Math.random()*255,Math.random()*255)
		text("CONGRATULATIONS", this.logo.x,this.logo.y)

		fill(255)
		textFont(myFont,this.text.fontSize)
		text(this.text.master, this.text.x,this.text.y)

		text(this.text.score + score.total, this.text.x,this.text.y+5*gridSize)

		text(this.text.space, this.text.x,this.text.y+9*gridSize)

		fill(100)
		textFont(myFont,this.text.fontSize)
		text(this.text.plug, this.text.x,this.text.y+13*gridSize)
	}
}