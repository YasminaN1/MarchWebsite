const wordlist = [ 
    'gold',
    'luck',
'clover',
'rain',
'charm',
'parade',
'leprechaun',
'treasure',
'celebration',
'greenery',
'shenanigans',
'tradition',
]


let selectedWord = ''
let displayWord= ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

function startGame(level){
    selectedWord = getRandomWord(level) 

// update difficulty display
updateDifficultyDisplay(level)

// create the placeholder for the selected word
displayWord = '_'.repeat(selectedWord.length)
// display the updated word
document.getElementById('wordDisplay').textContent - displayWord.split(''). join(' ')

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

function getRandomWord(level){
 let filteredWords = wordlist.filter(word => {
      if(level === 'easy') return word.length <= 4 
     if(level === 'medium') return word.length >=5 && word.length <=7
      if(level === 'hard') return word.length >= 8
   })

   return filteredWords[Math.floor(Math.random() * filteredWords.length)]
} 

function updateDifficultyDisplay(level){
    let difficultyBox = document.getElementById('difficultyBox')

    // remove any pevious difficulty classes 
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    // set text & apply class dynamically using template literals
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`

    // only the appropriate CSS style for chosen difficulty
    difficultyBox.classList.add(level)
}