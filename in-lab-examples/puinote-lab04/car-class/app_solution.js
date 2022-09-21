/* A class representing a car that can start and stop moving. */
class Car {
  model;
  year;
  element;
  isMoving = false;

  constructor(model, year, element) {
    this.model = model;
    this.year = year;
    this.element = element;
  }

  updateElement() {
    this.element.innerText = this.model + ' ' + this.year;
    if (this.isMoving) {
      this.element.classList.add('moving-car');
      this.element.innerText += ' is driving.';
    } else {
      this.element.classList.remove('moving-car');
    }
  }

  drive() {
    this.isMoving = true;
    this.updateElement();
  }

  brake() {
    this.isMoving = false;
    this.updateElement();
  }
}

let carElement = document.querySelector('.car');
let theCar = new Car('Chevy Corvette', '2022', carElement);
theCar.updateElement();
