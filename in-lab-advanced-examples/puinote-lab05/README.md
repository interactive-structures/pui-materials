# Lab Exercise 05


## Introduction

In this lab, we'll practice:
- Making dynamic style changes in React
- Using conditional rendering
- Using lists and keys


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
## Toggling Expand/Collapse Buttons

For toggling between expand and collapse, we already have `css` styling based on the class tag `.expanded`. Let's make use of what we already have for this example.

3. In `Notecard.js`, create a new state value `isExpanded` initialized to `false`.

```
    this.state = {
      isExpanded: false
    };   
```


4. The expanded/collapsed state changes when a user clicks the Expand or Collapse button. Create a function `toggleNote` that switches the `isExpanded` state value to the opposite one.

```
  toggleNote() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
```

Make sure to bind `this` to the function for this Component.

```
this.toggleNote = this.toggleNote.bind(this);
```


5. Register the newly created `toggleNote` method as an `onClick` listener to both buttons. 

```
<div className="icon icon-expand material-symbols-outlined" onClick={this.toggleNote}>
  expand_more
</div> 
<div className="icon icon-collapse material-symbols-outlined" onClick={this.toggleNote}>
  expand_less
</div>
```

Now let's apply the style differently based on this `isExpanded` state.

6. Create a new variable for the `className` of the notecard element.

```
render() {
    let notecardClass = 'notecard';

    return (...);
}
```

7. Apply this variable as the `className` instead of the plain text `"notecard"`.

```
<div className={notecardClass}>         
...
</div>
```


8. If the notecard is expanded, add the class name `expanded`.

```
render() {
    let notecardClass = 'notecard';

    if (this.state.isExpanded) {
      notecardClass += ' expanded';
    }

    return (...);
}
```

Note that React re-renders the element when its state value is updated. Therefore, we do not need to add the action of removing the `expanded` tag as we did in Lab 2.




-----
## Showing the Editor only in Edit Mode

Let's practice conditional rendering. Currently, the note editor is shown at the bottom all the time, even when we're not editing anything. Let's change the code to show the note editor only when the user clicks the edit button.

9. In `App.js`, create a new state variable `isEditing`.

```
  this.state = {
    ...
    isEditing: false,
  }
```

10. Add conditional rendering using the `&&` operator.

```
  {this.state.isEditing &&
    <div id="note-editor" className="edit-mode">
    ...
    </div>
  }
```

11. Set `isEditing` to `true` when the edit button is clicked and `false` when the note is submitted.

```

  editButtonHandler = (noteIndex) => {
    this.setState(prevState => ({
      ...
      isEditing: true
    }))
  };

  submitNote = () => {
  if (this.state.selectedNoteIndex != null) {
    ...
    this.setState(prevState => ({
      ...
      isEditing: false
    }))
  }
}

```


-----
## Lists and Keys


12. In `App.js`, instead of repeating the same element markup in `render`, use `map` to populate the list.
```
<div id="notecard-list">
  {this.state.notecardData.map((notecard, idx) => {
    return <Notecard 
      key={idx}
      noteIndex={idx}
      imageURL={notecard.imageURL}
      noteTitle={notecard.noteTitle}
      noteBody={notecard.noteBody}
      noteFooter={notecard.noteFooter}
      onEdit={this.editButtonHandler}
      onRemove={this.removeButtonHandler} />;
  })}
</div>
```


Now let's add add/delete functionalities on top of the note editing.

13. First, let's implement the delete function. Similar to the edit button, we create a click handler in `App.js` and pass it as a `prop` to each `Notecard` component.

```
removeButtonHandler = (noteIndex) => {
  const newNotecardData = this.state.notecardData;
  newNotecardData.splice(noteIndex, 1);
  this.setState(prevState => ({
    ...prevState,
    notecardData: newNotecardData
  }))
}
```


```
{this.state.notecardData.map((notecard, idx) => {
  return <Notecard 
    ...
    onRemove={this.removeButtonHandler} />;
})}
```

14. Apply this change to `Notecard.js` as well.

```
<div className="material-symbols-outlined icon icon-delete" 
onClick={() => this.props.onRemove(this.props.noteIndex)}>
```


------
## Styling in React

Defining a JavaScript object describing the styles and assigning the style object as an inline style is more common in React. 

Let's practice this inline styling in React by adding a new `noteCategory` element in `Notecard.js`.

15. First, let's add the markup for the note category above the note title.

```
  ...
  <div className="notecategory">{this.props.noteCategory}</div>
  <div className="note-title-container">
  ...
```

Like other note attributes, the App passes down the note category from `notecardData`. Let's modify `App.js` to support this.

16. Add `noteCategory` attribute in `notecardData`.

```
this.state = {
  notecardData: [
    {
      ...
      noteCategory: "Work",
      ...
    },
    {
      ...
      noteCategory: "Leisure",
      ...
    },
    {
      ...
      noteCategory: "Work",
      ...
    }
```

17. Pass it down as a prop.

```
<div id="notecard-list">
  {this.state.notecardData.map((notecard, idx) => {
    return <Notecard 
      ...
      noteCategory={notecard.noteCategory}
      ...
      />;
  })}
```


18. Back to `Notecard.js`. Let's define `this.categoryStyle` inside `render()` and add the style to note category element

``` 
  const categoryStyle = {
    width: "fit-content",
    backgroundColor: "blue",
    border: "1px solid",
    borderColor: "blue",
    borderRadius: "18px",
    marginTop: "15px",
    padding: "5px 10px"
  }
```

```
<div className="notecategory" style={categoryStyle}>{this.props.noteCategory}</div>
```

19. Assigning different colors to different category values would be more intuitive. Change the color of the badge based on the note category.

```
backgroundColor: this.props.noteCategory == "Work" ? "blue" : "green",
border: "1px solid",
borderColor: this.props.noteCategory == "Work" ? "blue" : "green",
```


-----
## Using `styled-components`

20. First install `styled-components` to your project by running the following command in terminal:

```
npm install --save styled-components
```

21. Import styled-components and create a styled div.

```
import styled from 'styled-components';


```


- Add note
- styled-components, inline styles
- router?
