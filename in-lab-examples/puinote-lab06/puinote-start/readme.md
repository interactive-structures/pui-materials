# Lab Exercise 6

## Introduction

In this lab exercise, we will:
- Allow users to create notes with the GUI
- Use `localStorage` to save notes across multiple browser sessions

---


## Setup and Recap

1. Start by reviewing the starter code, which we wrote in Exercise 5:
    - **Line 4:** We created a `Notecard` class, which we use to hold data for individual notecards (image, title, body).
    - **Line 22:** We hold all of our `Notecard` objects in a `Set`. A `Set` is similar to an `Array`, but it does not allow for duplicates, and the syntax makes it a bit easier to remove objects.
    - **Line 25:** When we call the `addNewNote` function, we create a new `Notecard` object and add it to the `notecardSet`.
    - **Line 37:** When we call the `createElement` function, we create a new notecard *element* and it to the browser window.
    - **Line 61:** When we call the `updateElement` function, we change the contents of the `.notecard` element to match the data stored in the `Notecard` object. 
    - **Line 73:** When we call the `deleteNote` function, we remove the `.notecard` element from the browser window, and remove the `Notecard` object from our `notecardSet`.

<br>

2. Click on the yellow "START A NEW NOTE" button, and notice that there's some extra functionality here! A "Note Editor" panel appears. A user can write a note in this space, and change the animal thumbnail (by clicking on it). They can close the panel by the "X" button at the bottom right, or submit the note by clicking the check-mark. This is implemented in `editor.js`, which you can examine if you are interested. (We will not need to modify this file for this exercise.)

3. Open the developer console, and click "START A NEW NOTE" to open the note editor. Then click the check-mark. You should see a message in the console that says "Submitted Note!". This is found in the `submitNote` function (line 84 of `app.js`). This function is empty now, but we will complete it in the next section!


---

## Adding Notes with the Note Editor

We want to grab the user input in the Note Editor and use that data to create a new note. To do this, we will modify the `submitNote` function at the bottom of `app.js`.

4. First, we need to get the IDs of the elements that we're interested in. In the browser, right-click on the title input and select "Inspect". Notice that the ID is `#note-editor-title`.

5. In `submitNote`, use `querySelector` to grab a reference to the title input element.
```
function submitNote() {
  const noteEditorTitle = document.querySelector('#note-editor-title');
}
```

6. Then, read the value (the user input) and store it in a variable.
```
function submitNote() {
  const noteEditorTitle = document.querySelector('#note-editor-title');
  const editorTitleText = noteEditorTitle.value;
}
```

7. Repeat steps 5-7 for the note body.
```
function submitNote() {
  const noteEditorTitle = document.querySelector('#note-editor-title');
  const editorTitleText = noteEditorTitle.value;

  const noteEditorBody = document.querySelector('#note-editor-body');
  const editorBodyText = noteEditorBody.value;
}
```

8. Repeat steps 5-7 for the note image. Remember that here, we want to store the `src` attriute.
```
function submitNote() {
  const noteEditorTitle = document.querySelector('#note-editor-title');
  const editorTitleText = noteEditorTitle.value;

  const noteEditorBody = document.querySelector('#note-editor-body');
  const editorBodyText = noteEditorBody.value;

  const noteEditorImage = document.querySelector('#note-editor-image');
  const editorImageURL = noteEditorImage.src;
}
```

9. We've gathered all the information that we need to make a new note! First, let's call our `addNewNote` function (see Exercise 5) to create a new `Notecard` object.
```
function submitNote() {
    ...
    const notecard = addNewNote(editorImageURL, editorTitleText, editorBodyText);
}
```

Remember that the `addNewNote` function creates a `Notecard` object and adds it to `notecardSet`. It *does not* create an HTML element, we'll do that next!

10. Create a `.notecard` element and add it to the browser window.
```
function submitNote() {
    ...
    const notecard = addNewNote(editorImageURL, editorTitleText, editorBodyText);
    createElement(notecard);
}
```

11. Open the browser and test out the new functionality. You should be able to create new notecards from the note editor!

12. In the developer console, examine `notecardSet` before and after adding notecards. Notice that new notecards are added to set.

Feel free to revisit [Exercise 5](https://github.com/interactive-structures/teach-pui/tree/main/in-lab-examples/puinote-lab05/puinote-start) for more details about the `addNewNote` and `createElement` functions.

---


## Saving Notes with Local Storage

Refresh the browser page, and you'll notice that all the notes disappear. That's not ideal, we'd like to save these notes. A user should be able to return to the page and still see the notes that they've added.

Luckily, we have a data structure (`notecardSet`) that has all the information we need. We just need to store this information in the browser.

13. With `localStorage`, we can not save JavaScript objects directly. But we *can* save text, which can represent JavaScript objects. Our first task is to turn `notecardSet` into a string of text that we can save. We will do this with the `JSON.stringify()` function.

14. Create a new function called `saveToLocalStorage()`. Start by converting our `notecardSet` into an `Array` of objects. This will be easier to turn into text.
```
function saveToLocalStorage() {
  const notecardArray = Array.from(notecardSet);
  console.log(notecardArray);
}
```

15. Use `JSON.stringify()` to convert the JavaScript array into a string of text. Log the results (both the Array and the string).
```
function saveToLocalStorage() {
  const notecardArray = Array.from(notecardSet);
  console.log(notecardArray);

  const notecardArrayString = JSON.stringify(notecardArray);
  console.log(notecardArrayString);
}
```

16. In the developer console, add a couple notes. Then call the `saveToLocalStorage` function and examine the results. Note the difference in representation between the JavaScript array and the string of text generated by `JSON.stringify`. The string of text something that we can save.

17. Use `localStorage.setItem` to save this text. We will use the key `storedNotes` to save this string.
```
function saveToLocalStorage() {
  ...
  localStorage.setItem('storedNotes', notecardArrayString);
}
```

18. Now, we need to call this function whenever note is created. At the bottom of `submitNote`, add a call to `saveToLocalStorage`.
```
function submitNote() {
    ...
    saveToLocalStorage();
}
```

19. Head to the browser and add a few notes. Refresh the page. The notes are gone...or are they? In the console, type `localStorage.getItem('storedNotes')`. You should see the note data!

---

**NOTE:** If you want to reset your `localStorage`, type `localStorage.clear()` in the developer console.

---

## Retrieving Notes from Local Storage

We've saved our note data as a string, and now we need to repopulate the page.

20. Create a new function called `retrieveFromLocalStorage()`. Start by grabbing the note data string and storing it as a variable.
```
function retrieveFromLocalStorage() {
  const notecardArrayString = localStorage.getItem('storedNotes');
}
```

21. This `notecardArrayString` is still a string of text. We need to turn it back into a JavaScript array. To do this, we will use `JSON.parse`. Log the result.
```
function retrieveFromLocalStorage() {
    const notecardArrayString = localStorage.getItem('storedNotes');
    const notecardArray = JSON.parse(notecardArrayString);
    console.log(notecardArray);
}
```

22. In the developer console, call the `retrieveFromLocalStorage` function and examine the result. We now have an array with our saved notecard data. For each object in this array, we will create a new `Notecard` object, and add a `.notecard` element to the window.

23. Use a `for...of` loop to iterate through `notecardArray`. Use the `addNewNote` and `createElement` functions to repopulate the page.
```
function retrieveFromLocalStorage() {
  const notecardArrayString = localStorage.getItem('storedNotes');
  const notecardArray = JSON.parse(notecardArrayString);
  for (const noteData of notecardArray) {
    const notecard = addNewNote(noteData.noteImageURL, noteData.noteTitle,
      noteData.noteBody);
    createElement(notecard);
  }
}
```

24. Go to the developer console and call the `retrieveFromLocalStorage` function. The notecards should appear!

25. We would like to call this function automatically, as soon as the page loads. Add the following code to `app.js`:
```
if (localStorage.getItem('storedNotes') != null) {
  retrieveFromLocalStorage();
}
```

Try refreshing the page, and the new notes should persist!

26. One final touch – notice that when we delete a note and refresh the page, the note reappears. We need to make sure to update `localStorage` after a note has been removed! Let's make an addition to the `deleteNote` function that we wrote last week:
```
function deleteNote(notecard) {
    ...
    saveToLocalStorage();
}
```

27. Now when a user deletes a note, this action is saved as well!
