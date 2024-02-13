# Lab Exercise 4

## Introduction

This week, we will give users the ability to *delete* notes from our note-taking application (by clicking on the trash can icon). See an example here: https://interactive-structures.org/pui-materials/in-lab-examples/puinote-lab04/puinote-end/

In this lab exercise, we will:
- Create a JavaScript `class` that represents a generic notecard, and allows us to make multiple notecards
- Understand the JavaScript `this` keyword
- Write a function that removes HTML elements (i.e. notecards)
- (Bonus) Extract key/value pairs from a URL, and use them to modify a page

---

## Setup and Recap (Accessing DOM Elements)

1. Let's familiarize ourselves with some relevant elements and classes that are used in this application. (It's a good idea to view each of these elements in the developer console by right-clicking and selecting "Inspect").

    - The `.notecard` class refers to our notecard element. Currently, there are three of them on the page. Each notecard has a unique ID (`#notecard-one`, `#notecard-two`, `#notecard-three`). Inside each notecard, we have:

        - `.notecard-thumbnail`, referring to the thumbnail image.
        - `.note-title`, referring to the title of the note.
        - `.note-body`, referring to the body text of the note.
        - `.notecard-footer`, referring to the timestamp at the bottom of the notecard.

    - There are also three icons in the sidebar of each notecard. For now, we are only concerned with the trash can, which has the class `.icon-delete`.

2. Recap: How do we access these elements using JavaScript? In the console, use `querySelector` find the second notecard.

```
document.querySelector('#notecard-two');
```

3. Recap: How would we access the title text of the second note card?

```
// Method One:
notecardTwo.querySelector('#notecard-two .note-title')

// Method Two:
const notecardTwo = document.querySelector('#notecard-two');
notecardTwo.querySelector('.note-title')
```

4. Recap: How would we access the trash can icon of the third note card?

```
// Method One:
notecardTwo.querySelector('#notecard-three .icon-delete')

// Method Two:
const notecardThree = document.querySelector('#notecard-three');
notecardThree.querySelector('.icon-delete')
```

---

## Creating A Notecard Class

In Lab 3, we created an object to hold information for a specific notecard. It looked like this:

```
const notecard =
{
  noteTitle: 'This is the Title of the Note!',
  noteBody: 'And here is the body of the note.',
  noteImageURL: 'assets/warhol-frog.png',
};
```

This was useful, but what if we have many notecards? In this lab, we will create a `Notecard` class that will allow us to create multiple notecard objects.

6. In `app.js`, create a new `Notecard` class. In the constructor, add `imageURL`, `title`, and `body` as arguments.
```
class Notecard {

  constructor(imageURL, title, body) {
    console.log('Create a new notecard!');
  }
}
```

7. Save your file. In the developer console, test out this new class by trying to create a new notecard.
```
const notecardOne = new Notecard('test-image', 'test-title', 'test-body');
```

A new notecard object has been created!

8. In the console, try to access some properties of the notecard. (`notecardOne.title`, `notecardOne.body`). You should notice that they are undefined – we passed some arguments to the constructor function, but we still haven't assigned any properties to this object.

9. Update the constructor function:
```
constructor(imageURL, title, body) {
    console.log('Create a new notecard!');
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;
}
```
The `this` keyword refers to the notecard object that the constructor function creates.

10. In the developer console, try creating a notecard again. You should now be able to acess the properties of the notecard.

```
const notecardOne = new Notecard('test-image', 'test-title', 'test-body');
notecardOne.noteImageURL;
notecardOne.noteTitle;
notecardOne.noteBody;
```

11. In `app.js` create three notecard objects (which will eventually correspond to our three notecards onscreen):
```
const notecardOne = new Notecard(
  'assets/warhol-frog.png',
  'This is the First Note',
  'Here is some body text for the first note.'
)

const notecardTwo = new Notecard(
  'assets/warhol-orangutan.png',
  'This is the Second Note',
  'And here is some body text for the second note! What could be next?'
)

const notecardThree = new Notecard(
  'assets/warhol-eagle.png',
  'This is the Third Note',
  'Yep, you guessed it, here is some body text for the third note.'
)
```

12. In the developer console, notice that you can now access the properties of each notecard object.

---


## Updating the DOM Elements

Right now, the information in our `Notecard` objects does not match what we're seeing onscreen in the browser. Recall that in Lab 3, we fixed this by creating a function called `updateElement`, which updated the HTML appropriately.

13. Add a method to the `Notecard` class called `updateElement`.

```
class Notecard {

    constructor(imageURL, title, body) {
        this.noteImageURL = imageURL;
        this.noteTitle = title;
        this.noteBody = body;
    }

    updateElement() {    
        console.log('Updating HTML!')
    }
}
```

14. For now, we will only worry about updating `#notecard-one`. (We will fix this in a moment.) How do we update the title text of `#notecard-one`?
```
updateElement() {
    console.log('Updating HTML!')
    
    // first, find the notecard that we want to update
    const element = document.querySelector('#notecard-one');
    
    // then, search within the notecard to find the title element
    const noteTitleElement = element.querySelector('.note-title');

    // then, update the title HTML
    noteTitleElement.innerText = this.noteTitle;
}
```

15. In the developer console, try calling this function. What do you expect to happen? What happens?
```
notecardOne.updateElement();
notecardTwo.updateElement();
notecardThree.updateElement();
```

16. To solve this, we need to link the HTML `.notecard` elements to their corresponding `Notecard` objects in JavaScript. One way to do this is by adding a parameter to the `Notecard` constructor function:

```
constructor(imageURL, title, body, elementID) {
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;

    this.element = document.querySelector(elementID);
}
```

17. Let's update our notecard creation code to include this new parameter:

```
const notecardOne = new Notecard(
  'assets/warhol-frog.png',
  'This is the First Note',
  'Here is some body text for the first note.',
  '#notecard-one'
)

const notecardTwo = new Notecard(
  'assets/warhol-orangutan.png',
  'This is the Second Note',
  'And here is some body text for the second note! What could be next?',
  '#notecard-two'
)

const notecardThree = new Notecard(
  'assets/warhol-eagle.png',
  'This is the Third Note',
  'Yep, you guessed it, here is some body text for the third note.',
  '#notecard-three'
)
```

18. Go to the developer console. You should see that by typing `notecardTwo.element` (or similar) the appropriate notecard is now selected.

19. Modify the `updateElement` function to use this new property. Note that we access the "element" property using the `this` keyword (i.e. `this.element`):
```
updateElement() {    
    const noteTitleElement = this.element.querySelector('.note-title');

	noteTitleElement.innerText = this.noteTitle;
}
```

20. Add a call to `updateElement` at the end of the constructor function, so we don't have to call the function manually in the console. Notice that again, we use the `this` keyword:

```
constructor(imageURL, title, body, elementID) {
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;

    this.element = document.querySelector(elementID);

    this.updateElement();
}
```

21. Save your file and view the application in the browser. All three note titles should be updated.

22. How do we update the image and body text? Modify the `updateElement` function to include these as well:
```
updateElement() {    
    const noteImageElement = this.element.querySelector('.notecard-thumbnail');
    const noteTitleElement = this.element.querySelector('.note-title');
    const noteBodyElement = this.element.querySelector('.note-body');

    noteImageElement.src = this.noteImageURL;
    noteTitleElement.innerText = this.noteTitle;
    noteBodyElement.innerText = this.noteBody;
}
```

The notecards onscreen should now match the notecard in your code!


---

## Deleting Notecards

23. Add a `deleteNote` method to the `Notecard` class. Include a message with `console.log()`. To remove the HTML element, we will use the `remove()` function.
```
class Notecard {
  ...
  deleteNote() {
    console.log('Deleting Note!');
    this.element.remove();
  }
}
```

24. Go into the developer console and try calling this method for each notecard. The elements should disappear one by one.
```
notecardOne.deleteNote();
notecardTwo.deleteNote();
notecardThree.deleteNote();
```

25. We would like to trigger this function when the trash can icon is clicked. How do we do this? First, in the constructor function, we grab a reference to the icon:
```
constructor(imageURL, title, body, footer, elementID) {
    ...
    const btnDelete = this.element.querySelector('.icon-delete');
  }
```

26. Then, we'll tie the function to the `onclick` property:
```
constructor(imageURL, title, body, footer, elementID) {
    ...
  const btnDelete = this.element.querySelector('.icon-delete');
  btnDelete.onclick = this.deleteNote;
}
```

27. Go to the browser and try clicking the trash can icons. What happens? Open the console, and notice that we're getting an error! The function is being called (we see the message from `console.log()`) but the element is not being removed.

28. To debug, take a look at the `deleteNote` function and add `console.log(this)`:
```
class Notecard {
  ...
  deleteNote() {
    console.log('Deleting Note!');
    console.log(this);
    this.element.remove();
  }
}
```

Go back to the browser and observe the output. Notice that `this` is referring to the *specific element that was clicked*, not the notecard as a whole. (So here, `this` is referring to the trash can icon.) How do we resolve this?

29. One option is to retrieve the `.notecard` element that the icon resides in. To do this, we can use the `closest()` function:
```
class Notecard {
  ...
  deleteNote() {
    console.log('Deleting Note!');
    console.log(this);

    // Comment this out for now:
    // this.element.remove();

    const notecardElement = this.closest('.notecard');
    notecardElement.remove();
  }
}
```

This is valid, although it assumes that we will always call this function by clicking the trash can icon. (That could be okay, it depends on the application!)

30. Another option is to make sure that `this` always refers to the `Notecard` object. First, let's undo the changes we made to the `deleteNote` function: 
```
deleteNote() {
    console.log('Deleting Note!');
    console.log(this);

    this.element.remove();

    // Comment these lines out for now:
    // const notecardElement = this.closest('.notecard');
    // notecardElement.remove();
  }
```

31. And now, in the constructor, we'll use `bind` to make sure that `this` refers to the `Notecard` object:
```
constructor(imageURL, title, body, footer, elementID) {
    ...
  const btnDelete = this.element.querySelector('.icon-delete');
  btnDelete.onclick = this.deleteNote.bind(this);
}
```

Choose the method makes the most sense for you!
