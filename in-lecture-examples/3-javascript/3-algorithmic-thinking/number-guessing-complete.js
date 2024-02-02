// references to HTML elements
const guessSubmit = document.querySelector('.guessSubmit');
guessSubmit.addEventListener('click', checkGuess);

const guesses = document.querySelector('.guesses');
const guessField = document.querySelector('.guessField');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

// variables for the game
let randomNumber;
let guessCount;
let resetButton;

//initialize the game
resetGame();

function checkGuess() {
    const userGuess = Number(guessField.value);
    guesses.textContent += userGuess + ' ';

    lowOrHi.classList.remove("guessHigh");
    lowOrHi.classList.remove("guessLow");
    lowOrHi.textContent = "";

    if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.classList.add("guessCorrect");
        setGameOver();
    } else if (guessCount >= 10) {
        lastResult.textContent = "!!!GAME OVER!!!";
        lastResult.classList.add("gameOver");
        setGameOver();
    } else {
        lastResult.textContent = "Wrong!";

        if(userGuess < randomNumber) {
            lowOrHi.textContent = "Last guess was too low!" ;
            lowOrHi.classList.add("guessLow");
        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = "Last guess was too high!";
            lowOrHi.classList.add("guessHigh");
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    //remove reset button
    if(resetButton)
        resetButton.parentNode.removeChild(resetButton);
    
    //enable the submission fields
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    //reset all styles
    const resetParas = document.querySelectorAll(".resultParas p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }
    guesses.textContent = "Previous guesses: "; 

    lastResult.removeAttribute("class");
    lastResult.setAttribute("class", ".lastResult");

    //reset counters and random number
    guessCount = 1;
    randomNumber = Math.floor(Math.random() * 100) + 1;
}


// If you reviewed this code to study, send Prof. Das an email with the subject "GUESS GUESS GUESS... GUESS YOUR NUMBER!" and you will get a bonus point
// Don't share this with other students
