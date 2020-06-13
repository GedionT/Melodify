async function playKeyboard() {

	let pressColor = '#1BC0EA'; //color when key is pressed


	var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
	if (isMobile) { var evtListener = ['touchstart', 'touchend']; } else { var evtListener = ['mousedown', 'mouseup']; }

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	var __octave = 4; //sets position of middle C, normally the 4th octave


	// Key bindings, notes to keyCodes.

	var arrayNormal = [
		[ 'A', 7 ],        [ '(', 9 ],        [ 'r', 8 ],        [ 't', 2 ],
         [ 'a', 2 ],        [ '"', 8 ],        [ '2', 3 ],        [ 'o', 2 ],
         [ '"', 8 ],        [ 'v', 2 ],        [ 'a', 3 ],       [ 'a', 13 ],
         [ 'i', 2 ],        [ 'a', 1 ],       [ 'T', 16 ],       [ 'o', 11 ],
         [ 'w', 3 ],       [ 'a', 11 ],        [ 'f', 9 ],        [ 'l', 3 ],
         [ 'b', 2 ],        [ 't', 3 ],        [ 'A', 7 ],        [ 'T', 4 ],
         [ 'a', 2 ],        [ 'G', 6 ],        [ 'a', 3 ],        [ 'b', 2 ],
         [ 'a', 1 ],        [ 'c', 9 ],        [ 'o', 2 ],       [ 'i', 11 ],
         [ 'a', 3 ],       [ 'c', 13 ],        [ 'A', 7 ],        [ 'i', 2 ],
         [ 'a', 1 ],        [ 'c', 8 ],        [ 'r', 7 ],        [ 'f', 4 ],
         [ 't', 3 ],        [ 's', 4 ],        [ 't', 4 ],        [ 't', 4 ],
         [ 'b', 5 ],       [ 'A', 11 ],        [ 'A', 7 ],        [ 'w', 3 ],
         [ 'd', 8 ],        [ 'a', 2 ],        [ 'a', 1 ],        [ 'g', 9 ],
         [ 'r', 7 ],        [ 'o', 2 ],       [ 'A', 11 ],       [ 'O', 11 ],
         [ 't', 3 ],        [ 'r', 7 ],        [ 'o', 2 ],        [ 'A', 9 ],
         [ 'w', 3 ],        [ 'c', 6 ],        [ '"', 8 ],        [ '2', 3 ],
         [ 'b', 3 ],        [ 't', 4 ],        [ 'l', 3 ],        [ 't', 2 ],
         [ 'c', 9 ],        [ 'a', 5 ],       [ 'd', 11 ],        [ 'T', 2 ],
         [ 'c', 8 ],        [ 't', 3 ],        [ 'T', 4 ],        [ 'a', 9 ],
         [ 't', 4 ],        [ 's', 8 ],        [ 't', 5 ],        [ 's', 6 ],
         [ 'b', 2 ],        [ 'u', 4 ],        [ 'f', 3 ],        [ 'e', 4 ],
         [ 'f', 9 ],        [ 'w', 4 ],       [ '"', 11 ],        [ 'r', 9 ],
         [ 't', 2 ],        [ 't', 3 ],        [ '1', 3 ],        [ 'v', 8 ],
         [ 'a', 3 ],        [ '"', 9 ],        [ 'w', 7 ],        [ 't', 3 ],
         [ '"', 4 ],        [ 'r', 9 ],        [ 't', 2 ],        [ 'v', 8 ],

	]

	//convert all characters to lower case 
	var arrayLowerCase = []
	var len = []
	for (let a of arrayNormal) {
		arrayLowerCase = arrayLowerCase.concat(a[0].toLowerCase())
		len = len.concat(a[1])
	}
	console.log(arrayLowerCase);
	console.log(len);

	var keyboard = {

		a: 'D#,-1',

		b: 'C#,-1',

		c: 'D,-1',

		d: 'E,-1',

		e: 'F,-1',

		f: 'F#,-1',

		g: 'G,-1',

		h: 'G#,-1',

		i: 'A,-1',

		j: 'A#,-1',

		k: 'B,-1',

		l: 'C,0',

		m: 'C#,0',

		n: 'D,0',

		o: 'D#,0',

		p: 'E,0',

		q: 'F,0',

		r: 'F#,0',

		s: 'G,0',

		t: 'G#,0',

		u: 'A,0',

		v: 'A#,0',

		w: 'B,0',

		x: 'C,1',

		y: 'C#,1',

		z: 'D,1'

	};

	//to select the instrument to play
	let selectSound = {
		value: "0" //piano
	};

	// Generates audio for pressed note and returns that to be played
	var fnPlayNote = function (note, octave, duration) {
		src = __audioSynth.generate(selectSound.value, note, octave, duration);
		container = new Audio(src);
		container.addEventListener('ended', function () { container = null; });
		container.addEventListener('loadeddata', function (e) { e.target.play(); });
		container.autoplay = false;
		container.setAttribute('type', 'audio/wav');
		container.load();
		return container;

	};

	function timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	for (let i = 0; i<=arrayLowerCase.length; i++) {
		a=arrayLowerCase[i]
		if (keyboard[a[0]] !== undefined) {
			console.log(keyboard[a[0]])

			var arrPlayNote = keyboard[a[0]].split(',');

			var note = arrPlayNote[0];
			var octaveModifier = arrPlayNote[1] | 0;
			fnPlayNote(note, __octave + octaveModifier, len[i]);
			await timeout( len[i] * 200);
			console.log(len[i])
		}
	}
}