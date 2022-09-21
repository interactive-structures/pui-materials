// A list of cars with models and descriptions. We will create these
// using a class in later assignments, but it's not necessary for
// this simple example.
const allCars = [
  {
    model: 'Toyota Corolla',
    description: 'A solid, reliable car.',
  },
  {
    model: 'VW Beetle',
    description: 'A compact, cute car.',
  },
  {
    model: 'Chevy Corvette',
    description: 'A cool car for cool people.',
  },
];

/**
 * Updates the UI to display a particular car's info.
 * @param car A car object containing a model and a description.
 */
function displayCar(car) {
  let carTitleElement = document.querySelector('#car-title');
  let carInfoElement = document.querySelector('#car-info');

  carTitleElement.innerText = car.model;
  carInfoElement.innerText = car.description;
}

function onSelectValueChange() {
  // In this function, `this` corresponds to the select
  // element. So `this.value` will contain the value of the
  // selected option as a string.
  console.log('You selected ' + this.value);

  // We need to convert the string value to an integer
  let carIndex = parseInt(this.value);

  // Now retrieve the object at the index specified by the select's value
  let carToDisplay = allCars[carIndex];

  // Update the UI
  displayCar(carToDisplay);
}

// When the page loads, find the select element.
let selectElement = document.querySelector('#car-select');

// Give it a listener for the 'change' event, which is a function that will run
// when the selected option changes. You could also do this by setting the
// onchange property of selectElement, e.g. selectElement.onchange = ...
selectElement.addEventListener('change', onSelectValueChange);

// Initially, display the first car
displayCar(allCars[0]);
