// VERSION 1: working input validation
// using the HTML <form> tag and using the onSubmit event triggers the validation specified in our <input> element
function testFormSubmit() {
    const guessInputForm = document.querySelector('.guessInputForm');
    guessInputForm.addEventListener('submit', onSubmitGuess);
}

function onSubmitGuess(event){
    const guessField = document.querySelector('.guessField');
    const userGuess = Number(guessField.value);
    console.log(userGuess);
    
    // prevent the automatic reloaded of the page after form submission
    event.preventDefault();
}


// VERSION 2: input validation NOT working
// using the click event handler doesn't trigger the form validation since it is a rather 'generic' event
function testButtonClick() {
    const guessSubmit = document.querySelector('.guessSubmit');
    guessSubmit.addEventListener('click', onClickGuess);
}

function onClickGuess() {
    const guessField = document.querySelector('.guessField');
    const userGuess = Number(guessField.value);
    console.log(userGuess);
}


// choose which version to execute here:

testFormSubmit();
// testButtonClick();