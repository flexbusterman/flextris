function Sounds(){

	this.create = () => {
		Gibber.scale.root.seq( ['c4'].random(), 4 )
		Gibber.scale.mode.seq( ["Ionian",'Dorian'].random(), 16 )		
	    Clock.bpm = 50;
	}

	this.newMode = () => {
		Gibber.scale.root.seq( ['c4'].random(), 4 )
		Gibber.scale.mode.seq( ["Ionian",'Dorian'].random(), 16 )
	}


    this.delay1 = Delay()
    this.delay2 = Delay()

    this.reverb = Reverb({ roomSize: Add( 0.7, Sine( .05, 0.25 )._ ) })


    this.vibrato = Vibrato({
        amount : 0.1,
        rate : 3
    })

    this.sequence1 = Seq({
        time: Rndi( ms(500), ms(1000) ),
        durations:1/2,
        target: this.delay1
    })

    this.sequence2 = Seq({
        time: ms(Sine(4,2000)._),
        durations:1/2,
        target: this.delay2
    })

    this.chord = FM({
            // frequency : // Hz. default range { 50, 3200 }. default value 440. For synths this is usually only accessed to modulate frequency; pitch of notes is generally set using the note() method, which also triggers the AD envelope.
            amp : .1, // Float. default range { 0, 1 }. default value: .25.
            index : 5, // Float. Default range {.1, 50}. Default value: 5. The amplitude of the modulator.
            cmRatio : 2, // Float. Default range {.1, 50}. Default value: The ratio between the carrier and modulator frequencies. This ratio is maintained as different frequency values are passed to the note() method.
            attack : 160000, // Int. Default range { 23, 44100 }. default value: 22050
            decay : 160000, // Int. Default range { 23, 44100 }. default value: 22050
            maxVoices: 12, // Int. Default value: 1. The maximum number of frequencies the synthesizer can play simultaneously. This value can only be set during initialization.
            glide: 0, // Float. Default range { 0, 1 }. Default value: .15. This property creates glissandi as the synthesizer moves from one note to the next. The closer the value is to one the longer the glissandi will be.
            pan: 0// Float. Default range { -1, 1 }. Default value: 0. The position in the stereo spectrum of the Synth output.
            // waveform :// String. The name of an oscillator for the synth to use.

			/*
            Methods
			chord( Array:frequencies, Float:amp(optional) ) : Playback multiple notes at a provided amplitude. The maxVoices property have been set to a value higher than 1 during intialization for this function to work.
			note( Float:frequency, Float:amp(optional) ) : This method tells the synthesizer to play a single note at a particular volume.
			play( Array:frequencies, Array:durations ) : This method accepts arrays of frequencies and durations as arguments to create and start a sequencer targeting the oscillator. The generated sequencer is subsequently held in the .seq property of the synth.
			stop() : This method stops the sequencer that is built into the oscillator if it has been started.
			kill() : Disconnect the oscillator from whatever bus it is connected to.
			*/
        }
    )
    .chord.seq( Rndi(0,1,2), 2 )
    .fx.add(this.delay2)

    this.synth = Synth({
        amp:.15,
        attack:.0001,
        decay:62000,
    })
    .fx.add(this.delay1)
    .fx.add(this.reverb)
    .fx.add(this.vibrato)

    // synthen.note("F4",1/4)

    // a = Synth2({, decay:500,amp:10,maxVoices:16, waveform:'PWM', filterMult:0, resonance:4 })
    // a.cutoff = Add( .2, Sine(.1, .15)._ )


    //
    // bass = FM('bass')
    //     .note.seq( [0,0,0,7,14,13].rnd(), [1/8,1/16].rnd(1/16,2) )
    //
    // rhodes = Synth( 'rhodes', {amp:.35} )
    //     .chord.seq( Rndi(0,6,3), 1 )
    //     .fx.add( Delay() )

    // rhodes = Synth( 'rhodes', {amp:.35} )

    // follow1 = Follow(chord)
    // follow2 = Follow(synthen)


}