<<<<<<< HEAD
# Melodify

- www.melodify.tech

Ever wondered what a website content might sound like?
Melodify was a weekend project built to do just that. Enter a URL of your
choosing and Melodify will scrape the website and play you the sound along
with a music sheet.

# Design Concept

The UI is a simplistic design with a minimal interface. It is designed on
figma and can be found on this link [https://www.figma.com/file/K1mzN5JjbL7pdGzwYnuzIh/Melodify?node-id=6%3A6]

# Inspiration

Audio logic inspiration [https://www.freecodecamp.org/news/javascript-piano-keyboard/].
Since the logic used by the website above uses ke-press to make sounds,we customized
the logic on the playKeyboard.js file to fit our needs.

# Frontend

Frontend is made using HTML, CSS, Angular, and Bootstrap.
The sound is generated mathematically on the client machine by using math functions
after a scraped content is received from the backend

# Backend

Backend runs on Node.js deployed on Heroku.
To run this project on your local machine

open terminal:

    git clone https://www.github.com/GedionT/Melodify.git

    cd Melodify

    npm install

    npm start
