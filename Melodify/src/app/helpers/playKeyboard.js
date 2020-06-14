var audioSynth = require('./audiosynth');
var AudioSynth = audioSynth.AudioSynth;

// Key bindings, notes to keyCodes.

var keyboard = {

	z: 'C,-1',
	y: 'C#,-1',
	v: 'D,-1',
	l: 'D#,-1',
	q: 'E,-1',
	i: 'F,-1',
	j: 'F#,-1',
	k: 'G,-1',
	a: 'G#,-1',
	b: 'A,-1',
	c: 'A#,-1',
	d: 'B,-1',
	f: 'C,0',
	t: 'C#,0',
	g: 'D,0',
	h: 'D#,0',
	m: 'E,0',
	n: 'F,0',
	o: 'F#,0',
	p: 'G,0',
	r: 'G#,0',
	s: 'A,0',
	e: 'A#,0',
	u: 'B,0',
	w: 'C,1',
	x: 'C#,1',
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
