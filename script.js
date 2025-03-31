const wordlist = [
    'beach',
    'sunshine',
    'vacation',
    'swimming',
    'sand',
    'icecream',
    'pool',
    'surfing',
    'picnic',
    'seashell',
    'watermelon',
    'flipflops',
    'hotdog',
    'paradise',
    'surfboard',
    'tropical',
    'sunburn',
    'barbecue',
    'bikini',
    'popsicle',
]

//setting game variables

let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6
function startGame(level) {
    selectedWord = getRandomWord(level)
    // update difficulty display
    updateDifficultyDisplay(level)

    // create the placeholder for the selected word
    displayedWord = '_'.repeat(selectedWord.length)
    // display the updated word
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')

    // Hide difficulty selection and show game area & Difficulty box

    // Add d-none to the #difficultySelection div
    document.getElementById('difficultySelection').classList.add('d-none')

    //  remove d-none from #difficultyBox & #gameArea
    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.remove('d-none')

    // add d-block to #difficultyBox & #gameArea
    document.getElementById('gameArea').classList.add('d-block')
    document.getElementById('difficultyBox').classList.add('d-block')
}
function getRandomWord(level) {
    let filteredWords = wordlist.filter(word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8
    })

    return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox')

    // remove any pevious difficulty classes 
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    // set text & apply class dynamically using template literals
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`

    // only the appropriate CSS style for chosen difficulty
    difficultyBox.classList.add(level)
}
function guessLetter() {
    let inputField = document.getElementById('letterInput') //get input field
    let guessedLetter = inputField.value.toLowerCase() //convert input to lowercase
    //check if input is a valid letter (a-z)
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert("Please Enter A valid Letter!")
        inputField.value = '' //clear input function
        return //Exit function
    }

    //check if letter was already guessed
    if (guessedLetters.includes(guessedLetter)) {
        alert(`You already picked '${guessedLetter}'. Try a different letter!`)
        inputField.value = '' // clear input field
        return //exit function
    } else {
        //store guessed letter in guessedLetters Array
        guessedLetters.push(guessedLetter)
    }

    if (selectedWord.includes(guessedLetter)) {
        console.log(guessedLetter);
        correctGuess(guessedLetter)
    } else {
        wrongGuess(guessedLetter)
    }

    inputField.value = ''
    inputField.focus()
}
function wrongGuess(guessedLetter) {
    //increment the number of wrong guesses
    wrongGuesses++;
    //add the guessed letter to the HTML div
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`

    document.getElementById('shamrock').src = `imgs/shamrocks${6 - wrongGuess}.jpg`
    //check to see if the number of wrongGuesses === the null/mistakes if iy is, call endGame(false)
    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
}
function correctGuess(guessedLetter) {
    let newDisplayedWord = ''

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter
        } else {
            newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    document.getElementById('wordDisplay').textContent = displayedWord
        .split("")
        .join("")

    if (!displayedWord.includes("_")) {
        endGame(true);
    }
}
function endGame(won) {
    if (won === true) {
        setTimeout(() => alert('Yay you won!'), 100)
    } else if (won === false) {
        setTimeout(() => alert('Aww you lost'), 100)
    }

}
function restartGame() {
    location.reload()
}
window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        guessLetter(); // Calls the guessLetter function when Enter is pressed
    }
})