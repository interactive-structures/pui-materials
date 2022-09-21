// First, we get the query string from the URL. This is the list of parameters
// that begins with a question mark. (These are known as "search parameters")
const queryString = window.location.search;

console.log(queryString);

// Then, we use the query string to create a URLSearchParams object:
const params = new URLSearchParams(queryString);

console.log(params);

// Finally, we can access the parameter we want using the "get" method:
const chosenAnimal = params.get('animal')

console.log(chosenAnimal);

/* ------------------------------------------------------------------------- */

// Now, we will use the URL parameter to update our page.

// Update the header text
const headerElement = document.querySelector('#animal-header-text');
headerElement.innerText = 'Here is the ' + chosenAnimal + '!'

// Update the image
const animalImage = document.querySelector('#animal-img');
animalImage.src = './assets/warhol-' + chosenAnimal + '.png';