/* A class representing a car that can start and stop moving. */
class Car {
  /* Declare four properties:
   * model - the model name of the car
   * year - the year of the car
   * isMoving - boolean indicating whether the car is moving (default false)
   * element - the HTML element that this car will update
   */

  constructor(model, year, element) {
    /* Initialize the car's properties here */
  }

  /**
   * Update the contents of the car's element to show what its current state is.
   * When the car is stopped, its text should be the model and year of the car.
   * When it is moving, the text should add "is driving". Also, add the "moving-car"
   * class to the car element when it is moving.
   */
  updateElement() {
    // implement this
  }

  drive() {
    // implement this
  }

  brake() {
    // implement this
  }
}

/*
 Retrieve the car element from the page, and initialize a new Car object with the
 model "Chevy Corvette", the year "2022", and the car element. Then call
 updateElement().
*/
let carElement = null; // implement
let theCar = null; // implement
