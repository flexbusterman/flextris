function GameOver(){

	this.logo = {}
	this.logo.fontSize = 0.7 * gridSize
	this.logo.x = (fieldLeftMargin*1.2 + fieldWidth/2) * gridSize
	this.logo.y = (fieldTopMargin + 3.5) * gridSize

	this.text = {}
	this.text.fontSize = 0.4 * gridSize
	this.text.x = this.logo.x
	this.text.y = (fieldTopMargin + 5) * gridSize
	this.text.string =
`YOU ARE A FLEXTRIS MASTER!





Final Score

`

	this.text.string2 = `
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

		textAlign(CENTER)
		fill(255)
		textFont(myFont,this.text.fontSize)
		text(this.text.string + score.total, this.text.x,this.text.y)

		fill(100)
		textFont(myFont,this.text.fontSize)
		text(this.text.string2, this.text.x,this.text.y*2+5)
	}
}