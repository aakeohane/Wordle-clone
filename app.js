import { WORDS } from './words.js'

const guessesAllowed = 6
const numOfLettersPerWord = 5
let guessesRemaining = guessesAllowed
let currentGuess = ''
const correctWord = WORDS[Math.floor(Math.random()*WORDS.length)]
console.log(correctWord)

let nextLetter = 0
const board = document.getElementById('board')

for(let i=0; i<guessesAllowed; i++) {
  const row = document.createElement('div')
  row.className = 'letter-row'
  board.appendChild(row)

  for(let j=0; j<numOfLettersPerWord; j++) {
    const box = document.createElement("div")
    box.className = 'letter-box'
    row.appendChild(box)
  }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target
  
  if (!target.classList.contains("keyboard-button")) {
      return
  }
  let key = target.textContent

  if (key === "Del") {
      key = "Backspace"
  } 

  document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

document.addEventListener("keyup", keyboardListener)  

function keyboardListener(e) {

  if (guessesRemaining === 0) {
    return
  }

  let pressedKey = e.key
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    deleteLetter()
    return
  }

  if (pressedKey === "Enter") {
    checkGuess()
    return
  }

  let found = pressedKey.match(/[a-z]/gi)
  if (!found || found.length > 1) {
    return
  } else {
    insertLetter(pressedKey)
  }
}

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return
  }
  pressedKey = pressedKey.toLowerCase()

  let row = document.getElementsByClassName("letter-row")[guessesAllowed - guessesRemaining]
  let box = row.children[nextLetter]
  box.textContent = pressedKey
  animateCSS(box, "pulse")
  currentGuess += pressedKey
  box.classList.add('chosen-letter')
  nextLetter += 1
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[guessesAllowed - guessesRemaining]
  let box = row.children[nextLetter - 1]
  box.textContent = ""
  box.classList.remove('chosen-letter')
  currentGuess = currentGuess.slice(0, currentGuess.length - 1)
  nextLetter -= 1
}

function checkGuess() {
  let guessWord = currentGuess
  let remainingLettersInWord = correctWord
  let row = document.getElementsByClassName("letter-row")[guessesAllowed - guessesRemaining]

  const notification = document.getElementById("notification")

  // not enough letters, show notification that fades out after 2 seconds
  // logic for all notifications is similar, I didnt want to use Toastr, i could keep this code or perhaps
  // appendChild and removeChild from a div that is centered and on top similar to toastr notifications
  if (nextLetter != 5) {
    notification.classList.add("temp-notification")
    notification.classList.add("not-enough")
    animateCSS(row, 'shakeY')
    setTimeout(function(){
      notification.classList.remove("temp-notification")
      notification.classList.remove("not-enough")
    },1800);
    return
  }

  // guess word is not a word in the list, show notification for 2 seconds
  if (WORDS.indexOf(currentGuess) === -1) {
    notification.classList.add("temp-notification")
    notification.classList.add("not-word")
    animateCSS(row, 'shakeX')
    setTimeout(function(){
      notification.classList.remove("temp-notification")
      notification.classList.remove("not-word")
    },1800);
    return
  }

  // I had a lot of difficulty trying to solve edge cases with mutiple lettered guesses, but this seems
  // to be the best way, running two seperate loops, first checks for green and removes the letter, then the second
  // checks for any yellow based on the remaining letters, if there are more than one than it will remove them as you go.

    for(let i=0; i<numOfLettersPerWord; i++) {
      let row = document.getElementsByClassName("letter-row")[guessesAllowed - guessesRemaining]
      let boxes = row.children[i]
      let letterColor = ''
      let letter = guessWord[i]

      if (guessWord[i] === correctWord[i]) {
        // not regular expression, so replace only removes the FIRST instance of guessWord[i]
        remainingLettersInWord = remainingLettersInWord.replace(guessWord[i], '');
        letterColor = 'green'
      } else {
        letterColor = 'grey'
      }
      let delay = 350 * i
        setTimeout(()=> {
            if (letterColor) {
              animateCSS(boxes, 'flipInX')
              boxes.classList.add(letterColor)
              shadeKeyBoard(letter, letterColor)
            }
        }, delay)
    }

    for(let i=0; i<numOfLettersPerWord; i++) {
      let row = document.getElementsByClassName("letter-row")[guessesAllowed - guessesRemaining]
      let boxes = row.children[i]
      let letterColor  = ''
      let letter = guessWord[i]

      if (remainingLettersInWord.includes(guessWord[i]) && guessWord[i] !== correctWord[i]) {
        remainingLettersInWord = remainingLettersInWord.replace(guessWord[i], '');
        letterColor = 'yellow'
      }
      let delay = 350 * i
        setTimeout(()=> {
            if (letterColor) {
              animateCSS(boxes, 'flipInX')
              boxes.classList.add(letterColor)
              shadeKeyBoard(letter, letterColor)
            }
        }, delay)
    }

    // the word has been guessed correctly and user has won
    if (correctWord === currentGuess) {
      document.removeEventListener("keyup", keyboardListener)
      notification.addEventListener("click", removeNotification)
      setTimeout(function() {
        notification.classList.add("win-lose-notification")
        notification.classList.add("correct-guess")
      }, 1600)
      function removeNotification() {
        notification.classList.remove("win-lose-notification")
        notification.classList.remove("correct-guess")
      }
    } else {
        guessesRemaining -= 1;
        currentGuess = '';
        nextLetter = 0;
        // if the user has used up all guesses
        if (guessesRemaining === 0) {
          setTimeout(function() {
            // attr(notification) in CSS to change content of pseudoelement
            notification.setAttribute('notification', `Rusty! The word was ${correctWord}!`)
            notification.classList.add('incorrect-guess')
            notification.classList.add('win-lose-notification')
          }, 1700)
        }
    } 
}

// if the class green is part of the element, then do nothing. if the class yellow is found, then add green class, 
// otherwise change it to whatever color it corresponds to. I had to use css classes for this and changed order with green being 
// priority color class to overwrite the yellow
function shadeKeyBoard(letter, letterColor) {
  for (const key of document.getElementsByClassName("keyboard-button")) {
      if (key.textContent === letter) {
          if (key.classList.contains('green')) {
            return
          }
          if (key.classList.contains('yellow')) {
            key.classList.add(letterColor)
          }
          key.classList.add(letterColor)
      }
  }
}

// this is the necesary code for AnimateCSS library which helps with some animations
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);
    const node = element
    node.style.setProperty('--animate-duration', '0.5s');
    
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
});