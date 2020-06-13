var audioSynth = require('./audiosynth');
var AudioSynth = audioSynth.AudioSynth;

// Key bindings, notes to keyCodes.

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


function toKeyboardArray(array) {
	let arrayLowerCase = array.map((a) => [a[0].toLowerCase(), a[1]]);
	let i = 0;
	let keyboardArray = arrayLowerCase.map(function (a) {
		if (keyboard[a[0][0]] !== undefined)
			return [keyboard[a[0][0]], a[1], i++]
		else return [keyboard['a'], 1, i++]
	});
	return keyboardArray;
}


async function playKeyboard(keyboardArray) {

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.5);
	var __octave = 4; //sets position of middle C, normally the 4th octave


	//to select the instrument to play
	let selectSound = {
		value: "0" //piano
		// "1" //organ
		// "2" //acoustic
		// "3" //edm
	};

	// Generates audio for pressed note and returns that to be played
	var fnPlayNote = function (note, octave, duration) {
		var src = __audioSynth.generate(selectSound.value, note, octave, duration);
		var container = new Audio(src);

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

	for (var ka of keyboardArray) {

		var arrPlayNote = ka[0].split(',');
		var note = arrPlayNote[0];
		var octaveModifier = arrPlayNote[1] | 0;
		fnPlayNote(note, __octave + octaveModifier, ka[1]);
		await timeout(ka[1] * 200);

	}
}

export { playKeyboard, toKeyboardArray };
