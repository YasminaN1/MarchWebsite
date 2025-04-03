const wordlist = [
    'Moana', 'Maui', 'ocean', 'island', 'tefiti', 'heart', 'voyage', 'navigator', 'voyaging', 'tahiti',
    'motunui', 'demigod', 'lava', 'reef', 'pua', 'heihei',
];

// Setting game variables
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;
// localStorage allows you to save things directly in the browser, so when you refresh or reopen the page, the data is still there.
let winCount = localStorage.getItem('winCount') || 0;  // Use 0 if not found
let lossCount = localStorage.getItem('lossCount') || 0; 

// Display initial win/loss count
document.getElementById('winCount').textContent = winCount;
document.getElementById('lossCount').textContent = lossCount;

function startGame(level) {
    selectedWord = getRandomWord(level);
    updateDifficultyDisplay(level);
    displayedWord = '_'.repeat(selectedWord.length);
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('gameArea').classList.remove('d-none');
}

function getRandomWord(level) {
    let filteredWords = wordlist.filter(word => {
        if (level === 'easy') return word.length <= 4;
        if (level === 'medium') return word.length >= 5 && word.length <= 7;
        if (level === 'hard') return word.length >= 8;
    });
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox');
    difficultyBox.textContent = `Difficulty: ${level.charAt(0).toUpperCase() + level.slice(1)}`;
}

function guessLetter() {
    let inputField = document.getElementById('letterInput');
    let guessedLetter = inputField.value.toLowerCase();
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert("Please Enter A valid Letter!");
        inputField.value = '';
        return;
    }

    if (guessedLetters.includes(guessedLetter)) {
        alert(`You already picked '${guessedLetter}'. Try a different letter!`);
        inputField.value = '';
        return;
    } else {
        guessedLetters.push(guessedLetter);
    }

    if (selectedWord.includes(guessedLetter)) {
        correctGuess(guessedLetter);
    } else {
        wrongGuess(guessedLetter);
    }

    inputField.value = '';
    inputField.focus();
}

function wrongGuess(guessedLetter) {
    wrongGuesses++;
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`;
    document.getElementById('shamrock').src = `imgs/moana${wrongGuesses + 1}.png`;
    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
}

function correctGuess(guessedLetter) {
    let newDisplayedWord = '';
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter;
        } else {
            newDisplayedWord += displayedWord[i];
        }
    }
    displayedWord = newDisplayedWord;
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join('');
    if (!displayedWord.includes("_")) {
        endGame(true);
    }
}

function endGame(won) {
    if (won) {
        winCount++;
        localStorage.setItem('winCount', winCount);
        document.getElementById('winCount').textContent = winCount;
        showGameResult('You won!', 'success');
    } else {
        lossCount++;
        localStorage.setItem('lossCount', lossCount);
        document.getElementById('lossCount').textContent = lossCount;
        showGameResult('You lost!', 'danger');
    }
}
// A modal is a pop-up window that appears on top of your current page, often used to display information, ask for user input, or show alerts.
function showGameResult(message, resultType) {
    document.getElementById('gameResultMessage').textContent = message;
    let modal = new bootstrap.Modal(document.getElementById('gameResultModal'));
    modal.show();
}

function restartGame() {
    location.reload();
}

window.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});
