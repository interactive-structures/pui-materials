# Lab Exercise 3

## Introduction

In this lab exercise, we will:
- Create a JavaScript object to represent a "notecard" in our app
- Become familiar with the Developer Console
- Access HTML elements using `document.querySelector`
- Read and modify the properties of HTML elements
- Write a function that runs when a user clicks on an element (i.e. a "submit" button, in our notes app)

---

## Setup

You can download a zip file with all starter code and assets here: https://drive.google.com/file/d/1u2Rple9pzGwfws_3rsumQvmE0w-KomAy/view?usp=drive_link 

**Our task:** The user should be able to type a note title and note body in the text boxes onscreen. When they click the "check" button at the bottom of the page, the notecard element should update with the new title and body text.

**See it live:** https://interactive-structures.org/pui-materials/in-lab-examples/puinote-lab03/puinote-end/

---

## Basic Structure

1. Start by familiarizing yourself with the code. The body of `index.html` holds a div called `container`. This `container` has three direct children: a header elemennt, a list of notecards (which contains the notecard from exercise 2), and a div called `note-editor`. The `note-editor` element contains a form with some input text elements. In the browser, you will see this element on the bottom half of the screen.


2. There are three stylesheets in the `css` folder. The first, `base.css`, contains styles that are common to the entire application. The second, `editor.css`, contains styles for the "note editor" panel on the bottom of the page. The third, `notecard.css` contains styles for the notecard element (from the last two lab exercises). We will not modify any CSS in this exercise, but it's good to know the structure!

3. At the bottom of the `<head>` section in `index.html`, we link a javascript file by using the `<script>` tag. We have included the `defer` keyword, which means that our script won't run until the page has been parsed. (Otherwise, we may run into issues trying to access elements before they have been loaded.)

The JS file we have linked is `js/app.js`. Let's open that now and start writing JavaScript.

---

## Logging Messages to the JavaScript Console

A handy tool when writing and debugging JavaScript is the `console.log()` function. This allows you to print a message to the Developer Console in the browser.

4. In `app.js` write a message using `console.log()`.
```
console.log('Started Application.');
```

5. Go to your browser and open the Developer Console. (Mac: `CMD+OPTION+J`, Windows: `CTRL+SHIFT+J`). Your message from `app.js` should appear in the console.

6. Create a function called `updateElement`. Inside the function, output another message with `console.log()`. Be sure to save your file.
```
console.log('Started Application.');

function updateElement() {
  console.log('Running the updateElement function!')
}
```

7. Go back to the browser, refresh the page, and, look in the console. What do you see? Only the first message has appeared. This is because while we have defined the `updateElement` function, we haven't yet run it. In the console, run the function by typing:
```
updateElement();
```

We have now called the function. The function will run, and you should see the second message!

Try typing `updateElement` in the console without the parentheses. Notice how this returns a reference to the function itself, it does not run the run the function. (Keep this in mind for the future.)

To recap: if you want to *call* a function, you must include the parentheses.

---

## Grabbing HTML Elements with `querySelector`

In many cases, we will want to use JavaScript to modify HTML elements that exist on the page. To do this, we need some way of grabbing onto them. A good tool for this is the `document.querySelector()` function.

Let's practice by using JavaScript to change the zebra image to something else.

8. In Chrome, right-click the zebra image and click "Inspect". We can see that this image has the class `notecard-thumbnail`. This is a CSS class that we assigned to the image in `index.html`. We will use this a handle to grab onto our element.

9. In the `updateElement()` function, use `document.querySelector` to select an HTML element with the CSS class `.notecard-thumbnail`:

```
const noteImageElement = document.querySelector('.notecard-thumbnail');
console.log(noteImageElement);
```

Remember to include the period before `notecard-thumbnail`, since this is a CSS class!

10. Save your code. In the console, run the `updateElement()` function and observe the output. Notice that we have now obtained a reference to thumbnail image.

11. Now that we have a reference to element, we can update its attributes using JavaScript. Let's try changing the image by modifying the `src` attribute. In `updateElement()` add: 

```
noteImageElement.src = 'assets/warhol-frog.png';
```

Go back to the console, and run `updateElement()` again. You should se a new image! There are a few other images in the `assets` folder, try some different options and keep the one you like best.

---

## An Object to Store our Notecard Data

Let's add a bit more structure to this application. We are going to create an object to represent our notecard in code. (For the time being, you can think of this like a record in a database). 

12. Outside of the `updateElement()` function, create a new object with these properties:
```
const notecard =
{
  noteTitle: 'This is the Title of the Note!',
  noteBody: 'And here is the body of the note.',
  noteImageURL: 'assets/warhol-frog.png',
};
```

13. Save your file and go to the developer console. If you type `notecard`, you should see the notecard variable we just created – an object with three properties. Try accessing each of these properties in the console. Try *changing* them too! (e.g. `notecard.noteTitle = 'something else'`)

14. In our `updateElement()` function, we hard-coded the image URL. Let's modify this function to use the `noteImageURL` value from our `notecard` object.
```
function updateElement() {
  const noteImageElement = document.querySelector('.notecard-thumbnail');
  noteImageElement.src = notecard.noteImageURL;
}
```

15. In the console, change `notecard.noteImageURL` to one of the other images in the assets folder. Notice that nothing happens until you run the `updateElement()` function. (You have changed the object data, but not the HTML). After you run `updateElement()` in the console, you should see the new image.


16. In addition to changing attributes, you can change the text *inside* an HTML element using the `innerText` property. Try this in the console:
```
const noteTitleElement = document.querySelector('.note-title');
```
```
noteTitleElement.innerText = 'Write whatever you want here!';
```

17. In `updateElement()`, grab references to the notecard title and body elements. Then, use `innerText` to make the text reflect the `notecard` object.
```
function updateElement() {
  const noteImageElement = document.querySelector('.notecard-thumbnail');
  const noteTitleElement = document.querySelector('.note-title');
  const noteBodyElement = document.querySelector('.note-body');

  noteImageElement.src = notecard.noteImageURL;
  noteTitleElement.innerText = notecard.noteTitle;
  noteBodyElement.innerText = notecard.noteBody;
}
```

One note... we are grabbing onto these elements by selecting elements that match a certain CSS class. This could be a problem if we have more than one elemennt with the same class. One way to address this is to use `querySelector` to *only look within a single element* instead of searching the entire HTML document. See below:

18. First, in `app.js`, grab a reference to this specific notecard element. This notecard element has an ID of `#notecard-one`, so we will use that. (Remember to include the `#` character!)
```
notecard.element = document.querySelector('#notecard-one');
```

19. Then, modify `updateElement()` so that when we run the `querySelector` function, we only look within a specific notecard.
```
const noteImageElement = notecard.element.querySelector('.notecard-thumbnail');
const noteTitleElement = notecard.element.querySelector('.note-title');
const noteBodyElement = notecard.element.querySelector('.note-body');
```

---

## Getting User Input

In our application, the user is able to type a title and body in the editor panel. We want to use that input to update the notecard at the top of the screen.

20. Create a `submitNote()` function that will grab the user input, and update the notecard accordingly. For now, write a message with `console.log` and call `updateElement()`.
```
function submitNote() {
  console.log("This is where we will grab input and then update the notecard.");

  updateElement();
}
```

Try running this in the console!

In previous steps, we were modifying the attributes and inner text of HTML elements. But we can simply read these as well. We'd like to read data from the two input elements, so first we'll need to grab references to them.

21. Find the id of the two form elememnts. Youmcan look in `index.html` OR just right-click them and select "Inspect". (The second one is probably easier!)

22. Now that we know the names of the elements, let's grab them with `querySelector`.
```
function submitNote() {
  console.log("This is where we will grab input and then update the notecard.");

  const editorTitleElement = document.querySelector('#note-editor-title');
  const editorBodyElement = document.querySelector('#note-editor-body');

  updateElement();
}
```

23. The text of an input element can be read with the `value` property. Try adding this to the `submitNote` function, and viewing the output in the console:
```
console.log(editorTitleElement.value)
console.log(editorBodyElement.value)
```

24. Now, let's use those values to modify our `notecard` record. We'll then call the `updateElement()` function, which modifies the HTML using the `notecard` record.
```
function submitNote() {
	const editorTitleElement = document.querySelector('#note-editor-title');
	const editorBodyElement = document.querySelector('#note-editor-body');

  notecard.noteTitle = editorTitleElement.value;
  notecard.noteBody = editorBodyElement.value;

  updateElement();
}
```

25. Try this out in the console! Write something in the input fields, and then in the console, type `submitNote()`. Notice that both the `notecard` object and the HTML elements are updated.

---

## Adding a Click Event

We're almost there, but this is not very user friendly! We need to trigger `submitNote` when the user clicks the "check" button at the bottom of the screen.

26. As before, we have to start by grabbing a reference to the button. Let's right-click and select "Inspect" again to get the ID of the submit button. (Or you can look in `index.html`).

27. In `app.js`, use `document.querySelector()` to grab onto that element, and store it as a variable named `btnSubmit`.
```
const btnSubmit = document.querySelector('#btn-submit');
```

28. HTML elements have a property called `onclick`. Set the `onclick` property of `btnSubmit` to the `submitNote` function.
```
btnSubmit.onclick = submitNote
```

Notice that we did *not* include any parentheses! We are *not* calling the function here. Instead we are giving `btnSubmit` a reference to the `submitNote` function, so it can be run later (i.e. when the user clicks the submit button).

That's all for this exercise! You should be able to type input into both text fields, click the "check" button, and see that input rendered onscreen.
