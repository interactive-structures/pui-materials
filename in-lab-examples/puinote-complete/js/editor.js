class Editor {

  // When we create a new Editor object (see main.js), the "constructor"
  // function is run. In the constructor, "this" refers to the newly created
  // Editor object.
	constructor(notecardSet, editorPanelElement, addFn, saveFn) {
	
    // TODO: add commments
    this.notecardSet = notecardSet;
		this.editorPanelElement = editorPanelElement;
    
    // TODO: add commments
    this.addNoteFunction = addFn;
		this.saveFunction = saveFn;

    // TODO: add commments
		this.currentNote = null; 

    // TODO: add commments
		this.editorImageElement = document.querySelector('#note-editor-image');
		this.editorTitleElement = document.querySelector('#note-editor-title');
		this.editorBodyElement = document.querySelector('#note-editor-body');
    
    // TODO: add commments
		const btnNewNote = document.querySelector('#btn-new-note');
		const btnSubmit = document.querySelector('#note-editor .icon-done');
		const btnCancel = document.querySelector('#note-editor .icon-cancel');
    
    // TODO: add commments
    btnNewNote.onclick = this.startNewNote.bind(this);
		btnSubmit.onclick = this.submitNote.bind(this);
		btnCancel.onclick = this.cancelNote.bind(this);
		this.editorImageElement.onclick = this.updateEditorImage.bind(this);

    // TODO: add commments
    this.animalIndex = 0;
    this.animalNames = ['zebra', 'tiger', 'rhino', 'ram', 'orangutan',
      'frog', 'eagle', 'butterfly'];
		
	}
  

  // This function is called when the user clicks the yellow "START A NEW NOTE"
  // button. It sets currentNote to null and launches the Note Editor.
	startNewNote() {
		// We are starting a new note, so make sure that currentNote is set to null.
		this.currentNote = null;

    // Display the Note Editor panel, with empty input boxes.
    this.launchEditor();
	}


  // This function moves the "Note Editor" panel from the bottom of the screen
  // to the middle of the screen. If we are editing an existing note, then
  // the input text boxes are filled with the title and body of the existing
  // note. If we are creating a new note, then the input text boxes are empty.
  launchEditor() {

    // If "this.currentNote" is null, then we are creating a new note.
    if (this.currentNote == null) {

      // Choose a new animal image to be displayed in the note editor.
      this.updateEditorImage();

      // Since we are starting a new note, make sure that the input text boxes
      // (note title and note body) are empty.
      this.editorTitleElement.value = "";
      this.editorBodyElement.value = "";
    

    // If "this.currentNote" is NOT null, then we are editing an existing note.
    } else {

      // Change the content of the input text boxes (editorTitleElement and
      // editorBodyElement), so they match the the content of the note that
      // is being edited (this.currentNote). Update the image as well.
      this.editorImageElement.src = this.currentNote.noteImageURL;
      this.editorTitleElement.value = this.currentNote.noteTitle;
      this.editorBodyElement.value = this.currentNote.noteBody;
    }

    // To display the Note Editor, we grab the HTML element (editorPanelElement)
    // and add the 'edit-mode' class. The 'edit-mode' class changes the position
    // of the HTML element, moving it from the bottom of the screen to the
    // middle of the screen. (See editor.css).
		this.editorPanelElement.classList.add('edit-mode');
  }


	// This function is called when the user clicks the "done" button in the
  // Note Editor. Using the data that the user entered, we either create a new
  // note, or update an existing one.
	submitNote() {

		// If currentNote is null, then we are submitting a new note.
		if (this.currentNote == null) {

      // TODO: add commments
      const dateCreated = new Date();
      const timestampString = getTimestampString(dateCreated);

      // TODO: add commments
      this.addNoteFunction(this.editorImageElement.src,
        this.editorTitleElement.value, this.editorBodyElement.value,
        timestampString);

		// If currentNote is not null, then we are editing an existing note.
		} else {
			// Use values from the note editor to modify the properties of the
      // notecard object.
			this.currentNote.noteImageURL = this.editorImageElement.src;
			this.currentNote.noteTitle = this.editorTitleElement.value;
			this.currentNote.noteBody = this.editorBodyElement.value;

			// After the object properties have been modified, update the HTML element
      // so we can see the new changes on screen.
			this.currentNote.updateElement();
		}

		// After either adding or editing a notecard, close the Note Editor by
    // removing the 'edit-mode' class. The Note Editor element will return to
    // its initial position, at the bottom of the screen.
		this.editorPanelElement.classList.remove('edit-mode');

		// Since our note data has changed, save the data locally. When we refresh
    // the browser, the notes will still be available.
		this.saveFunction(this.notecardSet);
	}

  // TODO: add commments
	cancelNote() {
		this.editorPanelElement.classList.remove('edit-mode');
	}
	

	// TODO: add commments
  editNote(notecard) {
		this.currentNote = notecard;
		this.launchEditor();
	}

  // TODO: add commments
	updateEditorImage() {
		this.animalIndex = (this.animalIndex + 1) % this.animalNames.length;
    const animalName = this.animalNames[this.animalIndex];
		this.editorImageElement.src = '/assets/warhol-' + animalName + '.png';
	}

}


// TODO: add commments
function getTimestampString(date) {

  // TODO: add commments
  const rawDateString = date.toDateString()
  const trimmedDateString = rawDateString.slice(3);

  // TODO: add commments
  const rawTimeString = date.toTimeString()
  const trimmedTimeString = rawTimeString.slice(0,5);

  // TODO: add commments
  const timestampString = trimmedDateString + ', ' + trimmedTimeString

  // TODO: add commments
  return timestampString;
}

// TODO: add comments
export { Editor }