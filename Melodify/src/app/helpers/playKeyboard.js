var audioSynth = require('./audiosynth');
var AudioSynth = audioSynth.AudioSynth;

// Key bindings, notes to keyCodes.

var keyboard = {

	a: 'C,-1',
	y: 'C#,-1',
	x: 'D,-1',
	w: 'D#,-1',
	v: 'E,-1',
	u: 'F,-1',
	t: 'F#,-1',
	s: 'G,-1',
	r: 'G#,-1',
	q: 'A,-1',
	p: 'A#,-1',
	o: 'B,-1',
	n: 'C,0',
	m: 'C#,0',
	l: 'D,0',
	k: 'D#,0',
	j: 'E,0',
	i: 'F,0',
	h: 'F#,0',
	g: 'G,0',
	f: 'G#,0',
	e: 'A,0',
	d: 'A#,0',
	c: 'B,0',
	b: 'C,1',
	z: 'C#,1',
};


function toKeyboardArray(array) {
	let arrayLowerCase = array.map((a) => [a[0].toLowerCase(), a[1]]);
	let i = 0;
	let keyboardArray = arrayLowerCase.map(function (a) {
		if (keyboard[a[0][0]] !== undefined)
			return [keyboard[a[0][0]], a[1], i++]
		else return [keyboard['a'], a[1], i++]
	});
	return keyboardArray;
}


async function playKeyboard(keyboardArray, pause, index, selectSound) {

	var __audioSynth = new AudioSynth();
	__audioSynth.setVolume(0.01);
	var __octave = 4; //sets position of middle C, normally the 4th octave

	//to select the instrument to play
	// let selectSound = {
	// 	value: "1"
	// 	//"0" //piano
	// 	// "1" //organ
	// 	// "2" //acoustic
	// 	// "3" //edm
	// };
	


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
	let listContainers = []

	while (index <= keyboardArray.length) {
		let ka = keyboardArray[index];
		var arrPlayNote = ka[0].split(',');
		var note = arrPlayNote[0];
		var octaveModifier = arrPlayNote[1] | 0;
		var container = fnPlayNote(note, __octave + octaveModifier, ka[1] * 0.35);

		listContainers.push(container);

		if (pause.value) {
			listContainers.map((container) => {
				container.addEventListener('loadeddata', function (e) { e.target.pause(); })
			});
			break;
		}

		await timeout(ka[1] * 200);

		if (pause.value) {
			listContainers.map((container) => {
				container.addEventListener('loadeddata', function (e) { e.target.pause(); })
			});
			break;
		}
		index++;
	}
}

export { playKeyboard, toKeyboardArray };
