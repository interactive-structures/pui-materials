import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Notecard from './Notecard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notecardData: [
        {
          imageURL: "assets/warhol-frog.png",
          noteTitle: "This is the First Note",
          noteBody: "Here is some body text for the first note.",
          noteCategory: "Work",
          noteFooter: "Sep 1 2022, 10:25"
        },
        {
          imageURL: "assets/warhol-orangutan.png" ,
          noteTitle: "This is the Second Note" ,
          noteBody: "And here is some body text for the second note! What could be next?",
          noteCategory: "Leisure",
          noteFooter: "Sep 1 2022, 10:25"
        },
        {
          imageURL: "assets/warhol-eagle.png" ,
          noteTitle: "This is the Third Note" ,
          noteBody: "Yep, you guessed it, here is some body text for the third note." ,
          noteCategory: "Work",
          noteFooter: "Sep 1 2022, 10:25"
        }
      ],
      
      selectedNoteIndex: null,
      editorNoteTitle: "",
      editorNoteBody: "",
      isEditing: false,
    }
  }

  editButtonHandler = (noteIndex) => {
    this.setState(prevState => ({
      ...prevState,
      selectedNoteIndex: noteIndex,
      editorNoteTitle: this.state.notecardData[noteIndex].noteTitle,
      editorNoteBody: this.state.notecardData[noteIndex].noteBody,
      isEditing: true
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
        selectedNoteIndex: null,
        isEditing: false
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

  handleBodyChange = (event) => {
    const newBody = event.target.value;
    this.setState(prevState => ({
      ...prevState,
      editorNoteBody: newBody
    }))
  }

  render() {
    return (
      <div className="App">
        <div id="container">
          <header>
            <img id="logo-img" src="assets/pen-to-square-solid.svg" />
            <h1> PUI-NOTE </h1>
          </header>
          <div>
          <div id="notecard-list">
            {this.state.notecardData.map((notecard, idx) => {
              return <Notecard 
                key={idx}
                noteIndex={idx}
                imageURL={notecard.imageURL}
                noteTitle={notecard.noteTitle}
                noteBody={notecard.noteBody}
                noteCategory={notecard.noteCategory}
                noteFooter={notecard.noteFooter}
                onEdit={this.editButtonHandler}
                onRemove={this.removeButtonHandler} />;
            })}
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
