const puppeteer = require('puppeteer');



async function scrapeText(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const pAll = await page.$$('p');
    // const [p] = await page.$x('//p');
    // const [p] = await page.$x('//*[@id="mw-content-text"]/div/p[1]')

    // const txt = await p.getProperty('textContent');
    // const rawTxt = await txt.jsonValue();
    // console.log(rawTxt);

    var p ;
    var arrOfWords = [];
    //going through all the p tags 
    for ( p of pAll) {
        //getting the content 
        let txt = await p.getProperty('textContent');
        let rawTxt = await txt.jsonValue();
        //splitting the words from 
        arrOfWordsNew = rawTxt.split(' ');
        //adding to the array of words 
        arrOfWords = arrOfWords.concat(arrOfWordsNew);

        //getting the first character of words 

        // 

        // console.log(rawTxt);
        // console.log(arrOfWordsNew);

    }
    console.log(arrOfWords)

    browser.close();

}

scrapeText('https://en.wikipedia.org/wiki/Angular_(web_framework)');