console.log("start application");

function updateElement() {
    console.log("running the updateElement function");
    const noteImageElement = document.querySelector('.notecard-thumbnail');
    noteImageElement.src = notecard.noteImageURL;
    const noteTitleElement = document.querySelector('.note-title');
    noteTitleElement.innerText = notecard.noteTitle;
    const noteBodyElement = document.querySelector('.note-body');
    noteBodyElement.innerText = notecard.noteBody;
}

const notecard = {
    noteTitle:'This is the title of the note',
    noteBody: 'Here is the body of the note',
    noteImageURL: 'assets/warhol-eagle.png'

}

function submitNote() {
    const editorTitleElement = document.querySelector('#note-editor-title');
    const editorBodyElement = document.querySelector('#note-editor-body');
    notecard.noteTitle = editorTitleElement.value;
    notecard.noteBody = editorBodyElement.value;
    updateElement();
}

const btnSubmit = document.querySelector('#btn-submit');
//register onclick event: submitNote will get called on click
btnSubmit.onclick  = submitNote;

// call submitNote right when the page loads
// assign its return value back to onclick
// btnSubmit onclick = submitNote();
