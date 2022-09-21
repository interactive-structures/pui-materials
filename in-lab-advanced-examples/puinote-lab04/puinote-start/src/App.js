import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Notecard from './Notecard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="container">
          <header>
            <img id="logo-img" src="assets/pen-to-square-solid.svg" />
            <h1> PUI-NOTE </h1>
          </header>
          <div id="notecard-list">
            <Notecard 
              imageURL="assets/warhol-frog.png" 
              noteTitle="This is the First Note" 
              noteBody="Here is some body text for the first note." 
              noteFooter="Sep 1 2022, 10:25" />
            <Notecard 
              imageURL="assets/warhol-orangutan.png" 
              noteTitle="This is the Second Note" 
              noteBody="And here is some body text for the second note! What could be next?"
              noteFooter="Sep 1 2022, 10:25" />
            <Notecard 
              imageURL="assets/warhol-eagle.png" 
              noteTitle="This is the Third Note" 
              noteBody="Yep, you guessed it, here is some body text for the third note." 
              noteFooter="Sep 1 2022, 10:25" />
          </div>

          <div id="note-editor" className="edit-mode">
            <div id="btn-new-note">
              EDIT NOTE
            </div>
            <div className="note-editor-contents">
              <div className="note-editor-left">
                <form>
                  <input id="note-editor-title" placeholder="Title of Your Note..."
                    name="dummy" maxLength="50"></input>
                  <textarea id="note-editor-body" placeholder="Body of Your Note..."
                    rows="15" maxLength="1000"></textarea>
                </form>
              </div>
              <div className="note-editor-right">
                <div className="material-symbols-outlined icon icon-done">
                  done
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
