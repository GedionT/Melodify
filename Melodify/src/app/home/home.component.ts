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
  stop = { value: false };
  text = [];
  notesArray = [];
  index = 0;
  elem: Element;
  renderFlag = false;

  playing = true;

  ngOnInit(): void {}

  play(url) {
    this.stop.value = false;
    console.log(this.stop);
    this.musicService.scrapeSite(url).subscribe((arrayTextLength) => {
      let i = 0;
      arrayTextLength = arrayTextLength.map((a) => [a[0], a[1], i++]);
      // console.log(arrayTextLength);
      this.text = arrayTextLength;
      this.notesArray = toKeyboardArray(arrayTextLength);
      // console.log('notes array: ' + this.notesArray);
      playKeyboard(this.notesArray, this.stop);
    });
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  stopButton() {
    this.stop.value = true;
    this.index = 0;
    this.renderFlag = false;
    //remove all the highlight here 
    this.text=[];
    this.notesArray=[];
  }

  async setRenderTrue() {
    this.renderFlag = true;

    for (let i of this.text) {
      if (this.index <= this.text.length) {
        document.getElementById('text' + this.index.toString()).classList.add('highlight');
        document.getElementById('note' + this.index.toString()).classList.add('highlight');
      
        await this.timeout(i[1] * 200);
        if (this.stop.value) break;
        this.index++;
      }
    }
    this.index = 0;
    return;
  }
}

