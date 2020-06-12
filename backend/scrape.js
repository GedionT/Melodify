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

    var p;
    var arrOfWords = [];
    //going through all the p tags 
    for (p of pAll) {
        //getting the content 
        let txt = await p.getProperty('textContent');
        let rawTxt = await txt.jsonValue();
        // console.log(rawTxt);
        // console.log(arrOfWordsNew);

        //splitting the words from 
        arrOfWordsNew = rawTxt.split(' ');
        //adding to the array of words 
        arrOfWords = arrOfWords.concat(arrOfWordsNew);

    }

    //top 150 
    arrOfWords = arrOfWords.slice(0, 150)
    // console.log(arrOfWords)

    //getting the first character of words 
    var wordAndLength = arrOfWords.map((a) => [a, a.length])
    var charAndLength = arrOfWords.map((a) => [a[0], a.length])

    console.log(charAndLength);
    console.log(wordAndLength);
    browser.close();
    return wordAndLength;

}

scrapeText('https://en.wikipedia.org/wiki/Angular_(web_framework)');