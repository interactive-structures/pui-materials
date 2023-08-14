# Example of using `select` elements

In this example code, you will learn:

- How to use a `select` element with `option`s containing text and values
- How to add a new `option` to a `select` element
- How to retrieve selected options from an array

## How does it work?

This demo website shows you a dropdown menu containing various car models. When you select a car model, it shows you information about that car. Here's how we implemented it:

1. **Create the dropdown menu in HTML.** In `index.html`, you should see a `select` element with a few options. In your homework, you will start with an empty select and add all the options through JavaScript - here we're just showing what it would look like if you hardcoded some of them. Each option has text (the value between the `<option>` and `</option>` tags) and a _value_, which is a string that identifies to your code which option was selected. Here we are using the index of the option, e.g. 0, 1, 2, etc. You could use a different string identifier, but indexes will come in handy later.
2. **Define the objects representing each option.** In `app.js`, we create an array called `allCars` that contains all the possible options for our dropdown.
3. **Retrieve the `select` element from the page and configure it.** In `app.js` line 48, we use `querySelector` to retrieve the dropdown menu. We then add a single element to both the `allCars` array and to the `select` element, to illustrate how you can add options to the dropdown menu.
4. **Add an event listener to the `select` to respond when its value changes.** We use the `addEventListener` method of `selectElement` to assign the `onSelectValueChange` function to run whenever the dropdown's value changes.
5. **In the event listener, retrieve the object corresponding to the selected option.** Since we set the `value` attribute of each option to its index in the `allCars` array, we can access the selected option's object by getting the `select` element's value and finding that index in `allCars` (lines 38-41).
6. **Update the UI according to the change.** The `displayCar` function is called to update the HTML based on the car we've selected.
