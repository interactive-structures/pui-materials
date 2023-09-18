let guessCount = 1;

function checkGuess() {  
    const userGuess = Number(guessField.value); 
    
    /* after 1st submit click: guessCount = 1 */
    /* after 2nd submit click: guessCount = 2 */
    /* after 3rd submit click: guessCount = 3 */
    /* etc */
    /*
         ... so after the 10th click, which is the 10th time the user guessed a number, this guess is still evaluated if it is correct in [if (userGuess === randomNumber)]. 
         But if it is wrong, the next conditional [if (guessCount >= 10)] is true, because 10 is larger OR EQUAL to 10, and the game is set to end here.
    */
   
    if (userGuess === randomNumber) {
        // correct guess - exit game
    } else if (guessCount >= 10) {
        // out of guesses - exit game
    } else {
        // show too low/high message
    }

    guessCount++;
}
