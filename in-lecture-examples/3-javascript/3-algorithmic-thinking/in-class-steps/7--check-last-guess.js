// references to HTML elements
const guessSubmit = document.querySelector('.guessSubmit');
guessSubmit.addEventListener('click', checkGuess);

const guesses = document.querySelector('.guesses');
guesses.textContent = "Previous guesses: "; 

const guessField = document.querySelector('.guessField');
const lastResult = document.querySelector('.lastResult');


// variables for the game
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessCount = 1;


function checkGuess() {
    const userGuess = Number(guessField.value);
    console.log("TODO: check user guess! " + userGuess);
    console.log(`     (random number: ${randomNumber})`);

    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.classList.add("guessCorrect");
        setGameOver();
    } else if (guessCount >= 10) {
        // <--
        lastResult.textContent = "!!!GAME OVER!!!";
        lastResult.classList.add("gameOver");
        setGameOver();
        // -->
    } else {
        console.log("TODO: handle guesses, display message if too low or too high.")
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

function setGameOver() {
    // -->
    guessField.disabled = true;
    guessSubmit.disabled = true;

    let resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
    // <--
}

// -->
function resetGame() {
    console.log("TODO: handle reset game");
}
// <--