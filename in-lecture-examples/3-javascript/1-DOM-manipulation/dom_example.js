/**
 * SELECTORS demo
 */

// h1, .container, #special-heading, p, body > p  

let element1 = document.querySelector("h1");
console.log("1: " + element1.textContent);

let element2 = document.querySelector(".container");
console.log("2: " + element2.textContent);

let element3 = document.querySelector("#special-heading");
console.log("3: " + element3.textContent);

let element4 = document.querySelector("p");
console.log("4: " + element4.textContent);

let element5 = document.querySelector("body > p");
console.log("5: " + element5.textContent);



/**
 * UPDATE existing element
 */

function onUpdateClick() {
    //get the element to change and store reference as variable
    let element = document.querySelector(".container p");

    //change background color to yellow
    element.style.backgroundColor = "yellow";
    //change the text (text only!)
    element.textContent = "I don't like blind text. "
    //change the HTML inside the element, here we used the strong tag
    element.innerHTML = "I don't like <strong>blind</strong> text. "
    
    // let elementList = document.querySelectorAll(".container p");
    // for(let element of elementList) {
    //     element.style.backgroundColor = "cyan";
    //     element.textContent = "I don't like blind text. "
    //     element.innerHTML = "I don't like <strong>blind</strong> text. "
    // }
}

function onStyleClick() {
    //add prepared CSS class to an element dynamically
    let element = document.querySelector("body > p");
    element.classList.add("closing");
}

function onAddClick() {
    //get the container where we will add new elements to store reference as variable
    let firstContainer = document.querySelector(".container");
    
    //create a new HTML element <h2> and add to the container
    let subheading = document.createElement("h2");
    subheading.textContent = "Hello!";
    firstContainer.appendChild(subheading);

    //create a new HTML element <img> and add to the container
    let portrait = document.createElement("img");
    portrait.setAttribute("src", "../../assets/portrait.jpg");
    portrait.setAttribute("width", "200px");
    firstContainer.appendChild(portrait);
}

function onRemoveClick() {
    let hello = document.querySelector("h2");
    hello.remove();
}

document.querySelector("#update-text").addEventListener('click', onUpdateClick);
document.querySelector("#style-element").addEventListener('click', onStyleClick);
document.querySelector("#add-element").addEventListener('click', onAddClick);
document.querySelector("#remove-element").addEventListener('click', onRemoveClick);