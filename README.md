# Melodify-MLH-MusicHack

This is a starter file for everyone on the team to pick up and continue.

# Frontend 
Simplistic interface with minimal design
Audio logic inspiration https://www.freecodecamp.org/news/javascript-piano-keyboard/
Since the logic used by the website above uses keypress to make the sounds,
we need custom logic on the playKeyboard.js file

# Backend
First takes url from the user via a post request to server,
backend server makes a get request to the desired website, filter and scrape using cheerio 
and request-promise libraries, chop up the words and puts them in an array to be sent
to the frontend libs for audio production and delivery. 
