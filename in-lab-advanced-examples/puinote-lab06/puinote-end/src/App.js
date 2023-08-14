import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Notecard from './Notecard';
import HookExample from './HookExample';
import Cat from './Cat';
import CatHook from './CatHook';
import CategoryList from './CategoryList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: JSON.parse(localStorage.getItem("categoryList")) || [
        {name: "All", color: "black"}
      ],
      notecardData: JSON.parse(localStorage.getItem("notecardData")) || [],
      selectedNoteIndex: null,
      editorNoteTitle: "",
      editorNoteCategory: "",
      editorNoteBody: "",
      isEditing: false,
      filterCategory: "All", 
    }
  }

  componentDidMount() {
    // called when the component is first mounted
    localStorage.setItem("notecardData", JSON.stringify(this.state.notecardData));
  }

  componentDidUpdate() {
    // called when there are updates in the component e.g., state changes
    localStorage.setItem("notecardData", JSON.stringify(this.state.notecardData));
  }

  filterButtonHandler = (category) => {
    this.setState(prevState => ({
      ...prevState,
      filterCategory: category
    }))
  }

  editButtonHandler = (noteIndex) => {
    this.setState(prevState => ({
      ...prevState,
      selectedNoteIndex: noteIndex,
      editorNoteTitle: this.state.notecardData[noteIndex].noteTitle,
      editorNoteCategory: this.state.notecardData[noteIndex].noteCategory.name,
      editorNoteBody: this.state.notecardData[noteIndex].noteBody,
      isEditing: true,
    }))
  };

  removeButtonHandler = (noteIndex) => {
    const newNotecardData = this.state.notecardData;
    newNotecardData.splice(noteIndex, 1);
    this.setState(prevState => ({
      ...prevState,
      notecardData: newNotecardData
    }))
  }

  addNote = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
    .then(res => res.json())
    .then(
      (result) => {
        let newNotecardItem = {
          imageURL: result[0]["url"],
          noteTitle: "This is a brand new Note",
          noteBody: "Here is some body text for the new note.",
          noteCategory: this.state.categories[0] || "",
          noteFooter: "Sep 1 2022, 10:25"
        }

        let newNotecardData = this.state.notecardData
        newNotecardData.push(newNotecardItem)
        this.setState(prevState => ({
          ...prevState,
          notecardData: newNotecardData
        }))
      }
    )
  }

  submitNote = () => {
    if (this.state.selectedNoteIndex != null) {
      let newNotecardData = this.state.notecardData
      newNotecardData[this.state.selectedNoteIndex].noteTitle = this.state.editorNoteTitle;
      const categoryObj = this.state.categories.find((category) => category.name == this.state.editorNoteCategory);
      newNotecardData[this.state.selectedNoteIndex].noteCategory = categoryObj
      newNotecardData[this.state.selectedNoteIndex].noteBody = this.state.editorNoteBody;
      this.setState(prevState => ({
        ...prevState,
        notecardData: newNotecardData,
        editorNoteTitle: "",
        editorNoteCategory: "",
        editorNoteBody: "",
        selectedNoteIndex: null,
        isEditing: false,
      }))
    }
  }

  handleTitleChange = (event) => {
    const newTitle = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      editorNoteTitle: newTitle
    }))
  };

  handleCategoryChange = (event) => {
    const newCategory= event.target.value;
    this.setState(prevState => ({
      ...prevState,
      editorNoteCategory: newCategory
    }))
  };

  handleBodyChange = (event) => {
    const newBody = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      editorNoteBody: newBody
    }))
  }

  render() {
    const buttonStyle = {
      width: "100px",
      height: "40px",
      borderRadius: "18px",
      backgroundColor: "white",
      fontColor: "black"
    }
    return (
      <div className="App">
        <div id="container">
          <header>
            <img id="logo-img" src="assets/pen-to-square-solid.svg" />
            <h1> PUI-NOTE </h1>
          </header>
          <div id="notecard-list">
            {this.state.notecardData.map(
              (notecard, idx) => {
                if ((this.state.filterCategory == "All") || 
                (notecard.noteCategory.name.includes(this.state.filterCategory))) {
                  return <Notecard 
                  key={idx}
                  noteIndex={idx}
                  imageURL={notecard.imageURL}
                  noteTitle={notecard.noteTitle}
                  noteBody={notecard.noteBody}
                  noteCategory={notecard.noteCategory}
                  noteFooter={notecard.noteFooter}
                  onEdit={this.editButtonHandler}
                  onRemove={this.removeButtonHandler} />
                } else {
                  return <div />
                }
              }
            )}
          </div>

          {this.state.isEditing &&
            <div id="note-editor" className="edit-mode">
              <div id="btn-new-note">
                EDIT NOTE
              </div>
              <div className="note-editor-contents">
                <div className="note-editor-left">
                  <form>
                    <input id="note-editor-title" placeholder="Title of Your Note..."
                      name="dummy" maxLength="50" onChange={this.handleTitleChange} value={this.state.editorNoteTitle}>
                    </input>
                    <input placeholder="Category of Your Note..."
                      name="dummy" maxLength="50" onChange={this.handleCategoryChange} value={this.state.editorNoteCategory}>
                    </input>
                    <textarea id="note-editor-body" placeholder="Body of Your Note..."
                      rows="15" maxLength="1000" onChange={this.handleBodyChange} value={this.state.editorNoteBody}>
                    </textarea>
                  </form>
                </div>
                <div className="note-editor-right">
                  <div className="material-symbols-outlined icon icon-done" onClick={this.submitNote}>
                    done
                  </div>
                </div>
              </div>
            </div>
          }
          
          {/* Extra examples for filtering and adding a new note */}
          <CategoryList filterButtonHandler={this.filterButtonHandler}/>
          <p>Add a New Note</p>
          <button style={buttonStyle} onClick={() => {this.addNote()}}>New</button>

          {/* <Cat />
          <CatHook /> */}
        </div>
      </div>
    );
  }
}

export default App;
