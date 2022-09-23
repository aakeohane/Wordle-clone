# Wordle

Wordle has cemented itself into my morning routine and as I slowly became obsessed with solving this unassuming word puzzle, I thought how much fun it would be to code. I did use a [tutorial](https://www.freecodecamp.org/news/build-a-wordle-clone-in-javascript/) to help me with some of the more complicated bits of UI such as the keyboard and the initial implementation of the boxes along with the keyboard code. I found some errors in the tutorial code and this is where I had to digress by modifying it to solve for the errors.

Project: [Wordle](https://aakeohane.github.io/Wordle-clone/)

## Features ✅

- User can either use their own keyboard or the keyboard provided to solve the five letter word
- Users can click enter after each guess to check to see how close they got to the word in order to solve the Wordle
- The UI was made to resemble that of the New York Times Wordle as closely as possible
- The word is randomly chosen from an imported JS file (words.js), it also uses this list to tell user whether the word is a legit word or not.
- A pop-up temporarily informs the user if the guessed word is not among the list of words

## Technologies / Dependencies

- Vanilla JS
- HTML
- CSS

## Final Reflections

I built this project as a fun way to refresh my understanding of DOM manipulation using vanilla JavaScript.

This project really helped me think through the correct use of loops especially when dealing with complicated cases such as words with duplicate letters (one of the issues in the tutorial code did not address this). I also took a deep dive into how to correctly use pseudoclasses and "content" correctly in CSS which I've never truly understood until this project.

I think going forward, I could add more features such as restarting the game to play again or creating your own word for your friends to solve.

### Author

[Aaron Keohane](https://aakeohane.github.io/Portfolio-Website/index.html)

### Version

1.0.0.0
