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

  text = [];
  notesArray = [];
  ngOnInit(): void {}

  play(url) {
    console.log(url);
    this.musicService.scrapeSite(url).subscribe((arrayTextLength) => {
      let i=0;
      arrayTextLength = arrayTextLength.map(a=>[a[0],a[1],i++])
      // console.log(arrayTextLength);
      this.text = arrayTextLength;
      this.notesArray = toKeyboardArray(arrayTextLength);
      // console.log(this.notesArray);
      playKeyboard(this.notesArray);
    });
  }
}
