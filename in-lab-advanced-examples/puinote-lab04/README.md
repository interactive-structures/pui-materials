# Lab Exercise 04

Today, we are going to add the Edit functionality to our React notecard app.

## Introduction

In this lab, we'll practice:
- Using `state` for data handling
- Using `props` for data sharing between components
- Passing down a method between components
- Using `useState` of `Hooks` for non-class functions

## Install React-related packages

1. Run the following command to install React-related dependent packages defined in `package.json` in terminal.
```
npm install
```

2. Open the deployment server for live coding.
```
npm start
```

-----
## Designing States and Props

Note that in the current code, we have a hierarchical structure with the root `App` component which has a list of `Notecard` components and the editor portion. 

When we build a React application, it's important to consider how data flow between components within the application, and where the states should be saved.

In our application, when the Edit button in each `Notecard` component is pressed, the `noteTitle` and `noteBody` of the notecard should be loaded to the editor. After editing, the updated title and body should be updated back to the corresponding `Notecard` component.

Considering this data flow, it would be convenient if the root `App` component manages the *data* of each `Notecard` and pass down the data as `props`. 


## Adding States to App

3. In the App component (`App.js`), add a `constructor`.

```
constructor(props) {
  super(props);  
}
```

Instead of passing each notecard data as static strings, let's store the data in `state` so that any updates to the data can be reflected.

4. Add `notecardData` attribute to `this.state`.

```
constructor(props) {
    super(props);
    this.state = {
      notecardData: [
        {
          imageURL: "assets/warhol-frog.png",
          noteTitle: "This is the First Note",
          noteBody: "Here is some body text for the first note.",
          noteFooter: "Sep 1 2022, 10:25"
        },
        {
          imageURL: "assets/warhol-orangutan.png" ,
          noteTitle: "This is the Second Note" ,
          noteBody: "And here is some body text for the second note! What could be next?",
          noteFooter: "Sep 1 2022, 10:25"
        },
        {
          imageURL: "assets/warhol-eagle.png" ,
          noteTitle: "This is the Third Note" ,
          noteBody: "Yep, you guessed it, here is some body text for the third note." ,
          noteFooter: "Sep 1 2022, 10:25"
        }
      ],
    }
```

5. Change the `props` to each `Notecard`.

```
<div id="notecard-list">
  <Notecard 
    imageURL={this.state.notecardData[0].imageURL}
    noteTitle={this.state.notecardData[0].noteTitle}
    noteBody={this.state.notecardData[0].noteBody}
    noteFooter={this.state.notecardData[0].noteFooter} />
  <Notecard 
    imageURL={this.state.notecardData[1].imageURL}
    noteTitle={this.state.notecardData[1].noteTitle}
    noteBody={this.state.notecardData[1].noteBody}
    noteFooter={this.state.notecardData[1].noteFooter} />
  <Notecard 
    imageURL={this.state.notecardData[2].imageURL}
    noteTitle={this.state.notecardData[2].noteTitle}
    noteBody={this.state.notecardData[2].noteBody}
    noteFooter={this.state.notecardData[2].noteFooter} />
</div>
```

Now, check that if you make a change to the notecardData in `this.state`, the chagne will be automatically updated to the rendered `Notecard`. Note that this is different from vanilla JavaScript where we needed to explicitly call DOM update.

----

## Event Handlers

As we did in Lab 2, when users click the Edit button of each `Notecard`, we want to load this notecard's current title and body to the editor.

6. The editor's note title and body should change dynamically, so let's store them in state.

```
this.state = {
  ...,
  editorNoteTitle: "",
  editorNoteBody: "",
}
```

```
<form>
  <input id="note-editor-title" placeholder="Title of Your Note..."
    name="dummy" maxLength="50" value={this.state.editorNoteTitle}>
  </input>
  <textarea id="note-editor-body" placeholder="Body of Your Note..."
    rows="15" maxLength="1000" value={this.state.editorNoteBody}>
  </textarea>
</form>
```

If you check the Console in your browser, you can find that this throws error now because we didn't define the `onChange` function for `<input>` and `<textarea>`. Let's now define these onChange handlers.

7. Create new functions `handleTitleChange` and `handleBodyChange` in the `App` component. Note the use of `...prevState`. It copies all the rest properties of the state other than the one we're modifying.

```
handleTitleChange = (event) => {
  const newTitle = event.target.value;
  this.setState(prevState => ({
    ...prevState,
    editorNoteTitle: newTitle
  }))
};

handleBodyChange = (event) => {
  const newBody = event.target.value;
  this.setState(prevState => ({
    ...prevState,
    editorNoteBody: newBody
  }))
}
```

8. Add these functions (`this.handleTitleChange` and `this.handleBodyChange`) as `onChange` handler for `<input>` and `<textarea>`.

```
<input id="note-editor-title" placeholder="Title of Your Note..."
  name="dummy" maxLength="50" onChange={this.handleTitleChange} value={this.state.editorNoteTitle}>
</input>
<textarea id="note-editor-body" placeholder="Body of Your Note..."
  rows="15" maxLength="1000" onChange={this.handleBodyChange} value={this.state.editorNoteBody}>
```


Again, when users click the Edit button of each `Notecard`, we want to load this notecard's current title and body to the editor. 

Let's create another handler for the edit button. There are two possible places to define this handler, either in the `App` component or the `Notecard` component. 

If we define it in the `App` component, it's easier to access the editor's note title and body, and the notecard data. However, it needs a way to know which notecard this button belongs to. Thus, when we create the handler here, we need to take in the `noteIndex` somehow, maybe as the function parameter. 


9. Add a new function `editButtonHandler` in the `App` component.

```
 editButtonHandler = (noteIndex) => {
   
  };
```

Now, think about what this function needs to achieve. It needs to take in the selected note's title and body and update the editor's note title and body. We already have the editor's note title and body: `this.state.editorNoteTitle` and `this.state.editorNoteBody`. Also, all the notecard data are managed in the state now. Knowing the `noteIndex`, we can also access the notecard's data. Let's assume we know the `noteIndex` somehow as the function parameter for now.

10. Update the editor note title and body with the selected note's data.

```
editButtonHandler = (noteIndex) => {
    this.setState(prevState => ({
      ...prevState,
      editorNoteTitle: this.state.notecardData[noteIndex].noteTitle,
      editorNoteBody: this.state.notecardData[noteIndex].noteBody
    }))
  };
```

This handler should be triggered when the edit button of each notecard is clicked. Remember that we can pass a method reference between components in React.

11. Pass the `this.editButtonHandler` to the `Notecard` component as a `prop`.

```
<Notecard 
  imageURL={this.state.notecardData[0].imageURL}
  noteTitle={this.state.notecardData[0].noteTitle}
  noteBody={this.state.notecardData[0].noteBody}
  noteFooter={this.state.notecardData[0].noteFooter}
  onEdit={this.editButtonHandler} />
<Notecard 
  imageURL={this.state.notecardData[1].imageURL}
  noteTitle={this.state.notecardData[1].noteTitle}
  noteBody={this.state.notecardData[1].noteBody}
  noteFooter={this.state.notecardData[1].noteFooter}
  onEdit={this.editButtonHandler} />
<Notecard 
  imageURL={this.state.notecardData[2].imageURL}
  noteTitle={this.state.notecardData[2].noteTitle}
  noteBody={this.state.notecardData[2].noteBody}
  noteFooter={this.state.notecardData[2].noteFooter}
  onEdit={this.editButtonHandler} />
```

12. Inside `Notecard.js`, add this passed method as an `onClick` handler to the edit button.

```
<div className="material-symbols-outlined icon icon-edit" onClick={() => this.props.onEdit(...)}>
  edit
</div>
```

But we need to pass in `noteIndex` as the parameter. But how do we know which index each note has inside `Notecard` component? Let's pass in the note index as a `prop` too. 

13. In `App.js`, add `noteIndex` to each `Notecard` as a `prop`.

```
<Notecard 
  noteIndex={0}
  imageURL={this.state.notecardData[0].imageURL}
  noteTitle={this.state.notecardData[0].noteTitle}
  noteBody={this.state.notecardData[0].noteBody}
  noteFooter={this.state.notecardData[0].noteFooter}
  onEdit={this.editButtonHandler} />
<Notecard 
  noteIndex={1}
  imageURL={this.state.notecardData[1].imageURL}
  noteTitle={this.state.notecardData[1].noteTitle}
  noteBody={this.state.notecardData[1].noteBody}
  noteFooter={this.state.notecardData[1].noteFooter}
  onEdit={this.editButtonHandler} />
<Notecard 
  noteIndex={2}
  imageURL={this.state.notecardData[2].imageURL}
  noteTitle={this.state.notecardData[2].noteTitle}
  noteBody={this.state.notecardData[2].noteBody}
  noteFooter={this.state.notecardData[2].noteFooter}
  onEdit={this.editButtonHandler} />
```

14. In `Notecard.js`, fill in the argument for the `onEdit`.

```
<div className="material-symbols-outlined icon icon-edit" onClick={() => this.props.onEdit(this.props.noteIndex)}>
  edit
</div>
```

The `noteIndex` assignment looks very manual now. Next week, we'll learn more efficient ways of rendering repeated items, assigning unique key values to each, and also adding conditions on rendering without these manual repetitions. 


We're done with adding interactivity to the Edit button and updating the value in the editor now. The changes in the editor, however, are not reflected to the note yet. Let's add functionality to the Done button.

----
## Submit the Edit Changes

15. In `App.js`, create a new function `submitNote`.

```
submitNote = () => {

}
```

Now, think about what data should be updated upon the submit/done button. Where is the source of the notecard data? Yes, it's the `notecardData` in the `state`! This `submitNote` function should then update the `notecardData` with the updated `editorNoteTitle` and `editorNoteBody`.

The `notecardData`, however, is a list of different notecard data objects. How do we know which object we need to modify? 
Recall that we received the `noteIndex` as an argument from the `Notecard` object when the edit button is pressed. 
Let's store this as a state variable inside `editButtonHandler` first and then use it in `submitNote` later to refer to the correct notecard.

16. Create a new state variable `selectedNoteIndex`.

```
this.state = {
  ...,
  selectedNoteIndex: null
}
```

17. Update `selectedNoteIndex` with `noteIndex` in `editButtonHandler`.
```
editButtonHandler = (noteIndex) => {
  this.setState(prevState => ({
    ...prevState,
    selectedNoteIndex: noteIndex
  }))
};
```

18. In `submiteNote`, make changes to `notecardData`. When making changes to some item(s) in list/array `state` properties, make a copy of the original property first; modify the target item; and update the state with the newly updated list/array.

```
  submitNote = () => {
    let newNotecardData = this.state.notecardData
    newNotecardData[this.state.selectedNoteIndex].noteTitle = this.state.editorNoteTitle;
    newNotecardData[this.state.selectedNoteIndex].noteBody = this.state.editorNoteBody;
    this.setState(prevState => ({
      ...prevState,
      notecardData: newNotecardData
    }))
  }
```


19. When we submit a note, we want to clear up the editor and `selectedNoteIndex`.

```
 submitNote = () => {
    if (this.state.selectedNoteIndex != null) {
      let newNotecardData = this.state.notecardData
      newNotecardData[this.state.selectedNoteIndex].noteTitle = this.state.editorNoteTitle;
      newNotecardData[this.state.selectedNoteIndex].noteBody = this.state.editorNoteBody;
      this.setState(prevState => ({
        ...prevState,
        notecardData: newNotecardData,
        editorNoteTitle: "",
        editorNoteBody: "",
        selectedNoteIndex: null
      }))
    }
  }
```



-------
## Bonus: Using Hooks for Note Editor

React's recent feature `Hook` provides state and other functionalities without writing a class.

20. Let's try out `useState` for the note editor as an example. Since our `App` is already a class, we'll create a new `HokExample.js` file.

```
import React, { useState } from 'react';
import './App.css';

function HookExample() {
  return (
    <div></div>
  )
}

export default HookExample;
```

21. In `App.js`, import `HookExample` and add to the bottom of the container. 
```
...
import HookExample from './HookExample';

...

    <div id="container>
      ...
      <HookExample />
    </div>
...

```


22. Configure `useState` for the title and body. 
```
function HookExample() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="note-editor-contents">
      <div className="note-editor-left">
        <form>
          <input id="note-editor-title" placeholder="Title of Your Note..."
            name="dummy" maxLength="50" onChange={(event) => setTitle(event.target.value)} value={title}>
          </input>
          <textarea id="note-editor-body" placeholder="Body of Your Note..."
            rows="15" maxLength="1000" onChange={(event) => setBody(event.target.value)} value={body}>
          </textarea>
        </form>
      </div>
      <div className="note-editor-right">
        <p>{title}</p>
        <p>{body}</p>
      </div>
    </div>
  )
}
```

