const puppeteer = require("puppeteer");
const path = require("path");
const logger = require("morgan");
const http = require("http");
const express = require("express");
const app = express();

app.set("x-powered-by", false);
app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/dist/Melodify"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST");
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.get("*", function (req, res, next) {
  res.sendFile(path.resolve(__dirname + "/dist/Melodify/index.html"));
});

app.post("/scrape", async function (req, res) {
  const url = req.body.url;

  async function scrape(url) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page
      .goto(url)
      .then(async () => {
        const pAll = await page.$$("p");

        var p;
        var arrOfWords = [];
        //going through all the p tags
        for (p of pAll) {
          //getting the content
          let txt = await p.getProperty("textContent");
          let rawTxt = await txt.jsonValue();
          //splitting the words from
          arrOfWordsNew = rawTxt.split(" ");
          //adding to the array of words
          arrOfWords = arrOfWords.concat(arrOfWordsNew);
        }

        // top 150 words
        arrOfWords = arrOfWords.slice(0, 150);

        // getting the first character of words
        var wordAndLength = arrOfWords.map((a) => [a, a.length]);
        var charAndLength = arrOfWords.map((a) => [a[0], a.length]);

        // console.log(charAndLength);
        console.log(wordAndLength);
        res.send(wordAndLength);
        browser.close();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  scrape(url);
});

var server = http.createServer(app);

server.listen(process.env.PORT || 8080);
server.on("error", (err) => console.log("Error Starting Server", error));
server.on("listening", () => console.log("Server Running on port 8080"));
