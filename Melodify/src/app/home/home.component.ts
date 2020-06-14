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
  index = 0;

  elem:Element;

  renderFlag = false;

  ngOnInit(): void {
  }

  play(url) {
    console.log(url);
    this.musicService.scrapeSite(url).subscribe((arrayTextLength) => {
      let i=0;
      arrayTextLength = arrayTextLength.map(a=>[a[0],a[1],i++])
      console.log(arrayTextLength);
      this.text = arrayTextLength;
      this.notesArray = toKeyboardArray(arrayTextLength);
      
      console.log("notes array: " + this.notesArray);
      
      playKeyboard(this.notesArray);

    });
  }

   timeout(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

  async setRenderTrue(){
    this.renderFlag = true;
    
    for (let i of this.text){
      if (this.index<=this.text.length){
     // if (document.getElementsByClassName('highlight')[0]!== undefined){
     // document.getElementsByClassName('highlight')[0].classList.remove('highlight')
      document.getElementById("text" + this.index.toString()).classList.add('highlight');
      document.getElementById("note" + this.index.toString()).classList.add('highlight');
      // if (this.index>0 ||this.index < this.text.length  || document.getElementsByClassName('highlight')===null)
      // document.getElementById((this.index - 1).toString()).classList.remove('highlight');

      // console.log("time "+ i[1])
      await this.timeout(i[1]*200);
      this.index++;
      }
    }
      this.index=0;

    //}
   // this.renderFlag=false;
    return;
  }
}

//add to the index depending on time?
//highlight using the index for both arrays
//select an element using the index