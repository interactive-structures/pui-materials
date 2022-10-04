/***** Note Editor Panel ******************************************************/

// Reference to "Note Editor" element that slides up from bottom of screen
const noteEditorPanel = document.querySelector('#note-editor');

// Yellow "START A NEW NOTE" button
const btnStartNewNote = document.querySelector('#btn-new-note');

// When "START A NEW NOTE" is clicked, we add the 'edit-mode' class to the
// note editor, which changes the position of the element (it slides up from
// the bottom of the screen). We also change the animal image in the editor.
btnStartNewNote.addEventListener('click', () => {
  noteEditorPanel.classList.add('edit-mode');
  updateEditorImage();
});

// When the "X" is clicked in the note editor, we remove the 'edit-mode' class
// from the note editor panel. The panel will then return to its default
// position, off-screen.
const btnCancelNote = document.querySelector('#note-editor .icon-cancel');
btnCancelNote.addEventListener('click', () => {
  noteEditorPanel.classList.remove('edit-mode');
});

// When the check-mark is clicked in the note editor, we close the editor panel
// and call the submitNote() function, which will add a new note.
const btnSubmitNote = document.querySelector('#note-editor .icon-done');
btnSubmitNote.addEventListener('click', () => {
  noteEditorPanel.classList.remove('edit-mode');
  submitNote();
});

// When the animal image in the note editor is clicked, we change the animal
// to the next animal in a predefined sequence (see below).
const editorImageElement = document.querySelector('#note-editor-image');
editorImageElement.addEventListener('click', () => {
  updateEditorImage();
});

// Create a pre-defined sequence of animal images to iterate through. These
// animals serve as thumbnail images for the notecards.
let animalIndex = 0;
const animalNames = ['zebra', 'tiger', 'rhino', 'ram', 'orangutan',
  'frog', 'eagle', 'butterfly'];

// In the note editor, change the animal image to the next animal in the
// sequence above.
function updateEditorImage() {
  animalIndex = (animalIndex + 1) % animalNames.length;
  const animalName = animalNames[animalIndex];
  editorImageElement.src = 'assets/warhol-' + animalName + '.png';
}