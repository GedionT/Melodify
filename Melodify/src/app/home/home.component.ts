import { Component, OnInit } from '@angular/core';
import { MusicServiceService } from '../music-service.service';
import playKeyboard from '../helpers/playKeyboard';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private musicService: MusicServiceService) {}

  ngOnInit(): void {}

  play(url) {
    console.log(url);
    this.musicService.scrapeSite(url).subscribe((data) => {
      console.log(data);
      playKeyboard(data);
    });
  }
}
