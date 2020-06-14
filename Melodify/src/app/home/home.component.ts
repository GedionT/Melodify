import { Component, OnInit } from '@angular/core';
import { MusicServiceService } from '../music-service.service';
import { playKeyboard, toKeyboardArray } from '../helpers/playKeyboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private musicService: MusicServiceService) {}
  pause = { value: false };
  text = [];
  notesArray = [];
  index = 0;
  elem: Element;
  renderFlag = false;

  ngOnInit(): void {}

  play(url) {
    this.pause.value = false;
    this.musicService.scrapeSite(url).subscribe((arrayTextLength) => {
      let i = 0;
      arrayTextLength = arrayTextLength.map((a) => [a[0], a[1], i++]);
      // console.log(arrayTextLength);
      this.text = arrayTextLength;
      this.notesArray = toKeyboardArray(arrayTextLength);
      // console.log('notes array: ' + this.notesArray);
      playKeyboard(this.notesArray, this.pause, this.index);
    });
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  stopButton() {
    this.pause.value = true;
    this.index = 0;
    this.renderFlag = false;
    //remove all the highlight here
    this.text = [];
    this.notesArray = [];
  }

  playPauseButton() {
    //playing
    if (!this.pause.value) this.pause.value = true;
    else {
      //paused
      this.pause.value = false;
      playKeyboard(this.notesArray, this.pause, this.index);
      this.setRenderTrue();
    }
  }

  async setRenderTrue() {
    this.renderFlag = true;
    let word;
    while (this.index <= this.text.length) {
      word = this.text[this.index];
      document
        .getElementById('text' + this.index.toString())
        .classList.add('highlight');
      document
        .getElementById('note' + this.index.toString())
        .classList.add('highlight');

      await this.timeout(word[1] * 200);
      if (this.pause.value) break;
      this.index++;
    }
    return;
  }
}
