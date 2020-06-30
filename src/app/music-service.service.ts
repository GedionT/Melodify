import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
//   root = "http://localhost:8080";
    root = "https://melodi-fy.herokuapp.com";
  // root="";
  constructor(private http: HttpClient) { 
  }

  scrapeSite(url) {
    return this.http.post<any>(this.root + '/scrape', {url: url});
  }
}
