const puppeteer = require('puppeteer');
const express   = require('express');
const logger    = require('morgan');
const path      = require('path');
const http      = require('http');

const app = express();

app.set('x-powered-by', false);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/scrape', function(req, res, next) {

// the wikipedia page is to be removed
const url = req.body.url || 'https://en.wikipedia.org/wiki/Angular_(web_framework)';

async function scrapeText(url) {
  const browser = await puppeteer.launch();
  const page    = await browser.newPage();
  await page.goto(url);

  const pAll = await page.$$('p');
 
  var p;
  var arrOfWords = [];

  for( p of pAll){
    let txt = await p.getProperty('textContent');
    let rawTxt = await txt.jsonValue();
    arrOfWordsNew = rawTxt.split(' ');
    arrOfWords = arrOfWords.concat(arrOfWordsNew);
  }
  
  arrOfWords = arrOfWords.slice(0, 150);
 
  // getting the first character of words
  var wordAndLength = arrOfWords.map((a) => [a, a.length]);
  var charAndLength = arrOfWords.map((a) => [a[0], a.length]);

  console.log(charAndLength);
  console.log(wordAndLength);
  browser.close();
  
  res.json(...wordAndLength);

  browser.close();
}

scrapeText(url);
});


var server = http.createServer(app);

server.listen(3000);
server.on('error', (err) => console.log('Error Starting Server', error));
server.on('listening', () => console.log('Server Running on port 3000'));

