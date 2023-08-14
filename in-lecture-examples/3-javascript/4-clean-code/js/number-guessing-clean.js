/*
This example is from MDN:
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash
 */

let randomNumber;
let guessCount;

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;

    document.querySelector('.guessSubmit').addEventListener('click', checkGuess);
}

function endGame() {
    // disabling game interaction
    const guessSubmit = document.querySelector('.guessSubmit');
    if(!guessSubmit){
        console.error("Something is wrong, guess submit button should exist but is not found.");
        return;
    }

    guessSubmit.removeEventListener('click', checkGuess);
    guessSubmit.disabled = true;

    const guessField = document.querySelector('.guessField');
    if(!guessField){
        console.error("Something is wrong, guess submit button should exist but is not found.");
        return;
    }

    guessField.disabled = true;
    
    // adding a reset button to allow users to restart the game
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    resetButton.addEventListener('click', restartGame);

    document.body.appendChild(resetButton);
}

function restartGame() {
    const resultContainers = document.querySelectorAll('.resultParas p');
    for (const element of resultContainers) {
        element.textContent = '';
    }

    const resetButton = document.querySelector('button');
    resetButton.parentNode.removeChild(resetButton);

    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');

    guessSubmit.disabled = false;
    guessField.disabled = false;
    guessField.value = '';
    guessField.focus();

    const lastResult = document.querySelector('.lastResult');
    lastResult.style.backgroundColor = 'white';

    initializeGame();
}

function checkGuess() {
    guessCount++;

    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');

    const userGuess = Number(guessField.value);
    if (guessCount <= 0) {
        guesses.textContent = 'Previous guesses: ';
    }

    guesses.textContent += userGuess + ' ';
    lowOrHi.textContent = '';

    if (guessCount >= 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        endGame();
    } else if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        endGame();
    } else {
        lastResult.textContent = 'Wrong!';

        if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!' ;
            lastResult.style.backgroundColor = 'salmon';
        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
            lastResult.style.backgroundColor = 'darkred';
        }
    }

    guessField.value = '';
    guessField.focus();
}


initializeGame();