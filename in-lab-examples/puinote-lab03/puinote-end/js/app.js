function updateElement() {
  const noteImageElement = notecard.element.querySelector('.notecard-thumbnail');
  const noteTitleElement = notecard.element.querySelector('.note-title');
  const noteBodyElement = notecard.element.querySelector('.note-body');

  noteImageElement.src = notecard.noteImageURL;
  noteTitleElement.innerText = notecard.noteTitle;
  noteBodyElement.innerText = notecard.noteBody;
}


function submitNote() {
  // const editorImageElement = document.querySelector('#note-editor-image');
	const editorTitleElement = document.querySelector('#note-editor-title');
	const editorBodyElement = document.querySelector('#note-editor-body');

  // notecard.noteImageURL = editorImageElement.src;
  notecard.noteTitle = editorTitleElement.value;
  notecard.noteBody = editorBodyElement.value;

  // After the object properties have been modified, update the HTML element
  // so we can see the new changes on screen.
  updateElement();
}


const notecard =
{
  noteTitle: 'This is the Title of the Note!',
  noteBody: 'And here is the body of the note.',
  noteImageURL: 'assets/warhol-frog.png',
  element: null
};

notecard.element = document.querySelector('#notecard-one');

const btnSubmit = document.querySelector('#note-editor .icon-done');

btnSubmit.onclick = submitNote