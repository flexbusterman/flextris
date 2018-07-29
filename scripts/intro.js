function Intro(){

	this.logo = {}
	this.logo.fontSize = 1.3 * gridSize
	this.logo.x = (fieldLeftMargin*1.2 + fieldWidth/2) * gridSize
	this.logo.y = (fieldTopMargin + 3.2) * gridSize

	this.beta = {}
	this.beta.fontSize = 0.6 * gridSize
	this.beta.x = (fieldLeftMargin*5.3 + fieldWidth/2) * gridSize
	this.beta.y = (fieldTopMargin + 4.2) * gridSize

	this.instructions = {}
	this.instructions.fontSize = 0.4 * gridSize
	this.instructions.x = (fieldLeftMargin+1) * gridSize
	this.instructions.y = (fieldTopMargin + 5.5) * gridSize
	this.instructions.string =
`INSTRUCTIONS:

Arrow keys moves piece in
two dimensions, except for
up arrow that transports
piece to the future where
it has already landed.

Z rotates piece left.
X rotates piece right.

While below level 10 you
can choose level at any
time by typing 0-9 on
the keyboard.

Press SPACE to begin.
`

	this.instructions.string2 = `

--------------------------

Original concept by
Alexey Pajitnov.

This is a work in progress
and more features will be
added in the future.

Remember that the FLEXTRIS
master remains calm, even
in the face of death.

/ Christian Augustin 2018

`
	this.update = () => {
	}

	this.draw = () => {

		textAlign(CENTER)
		textFont(myFont,this.logo.fontSize)
		fill(Math.random()*255,Math.random()*255,Math.random()*255)
		text("FLEXTRIS", this.logo.x,this.logo.y)

		textAlign(RIGHT)
		textFont(myFont,this.beta.fontSize)
		fill(Math.random()*100)
		text("BETA", this.beta.x,this.beta.y)

		textAlign(LEFT)
		fill(255)
		textFont(myFont,this.instructions.fontSize)
		text(this.instructions.string, this.instructions.x,this.instructions.y)

		fill(100)
		textFont(myFont,this.instructions.fontSize)
		text(this.instructions.string2, this.instructions.x,this.instructions.y*2+8)

	}
}