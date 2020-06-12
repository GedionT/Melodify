const rp      = require('request-promise');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

app.set('x-powered-by', false);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/scrape', function(req, res, next) {
	const uri = req.body.url;

const options = {
  uri: `${uri}`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    console.log($);
  })
  .catch((err) => {
    console.log(err);
  });

  
});


app.use(errorHandler);

module.exports = app;


