class Editor {

  // When we create a new Editor object (see main.js), the "constructor"
  // function is run. In the constructor, "this" refers to the newly created
  // Editor object.
	constructor(notecardSet, editorPanelElement, addFn) {
	
    // TODO: add commments
    this.notecardSet = notecardSet;
		this.editorPanelElement = editorPanelElement;
    
    // TODO: add commments
    this.addNoteFunction = addFn;

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

    // TODO: add commments
    this.defaultImageURL = 'assets/warhol-zebra.png'
		
	}
  

  // This function is called when the user clicks the yellow "START A NEW NOTE"
  // button. Right now, it just launches the Note Editor.
	startNewNote() {

    // Display the Note Editor panel, with empty input boxes.
    this.launchEditor();
	}


  // This function moves the "Note Editor" panel from the bottom of the screen
  // to the middle of the screen. If we are editing an existing note, then
  // the input text boxes are filled with the title and body of the existing
  // note. If we are creating a new note, then the input text boxes are empty.
  launchEditor() {

    // Choose an animal image to be displayed in the note editor.
    this.editorImageElement.src = this.defaultImageURL;

    // Since we are starting a new note, make sure that the input text boxes
    // (note title and note body) are empty.
    this.editorTitleElement.value = "";
    this.editorBodyElement.value = "";
    

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

    // For now, we'll use a dummy timestamp string for the note footer.
    const timestampString = 'Jan 1 2022 00:00';

    // TODO: add commments
    this.addNoteFunction(this.editorImageElement.src,
      this.editorTitleElement.value, this.editorBodyElement.value,
      timestampString);


		// After either adding or editing a notecard, close the Note Editor by
    // removing the 'edit-mode' class. The Note Editor element will return to
    // its initial position, at the bottom of the screen.
		this.editorPanelElement.classList.remove('edit-mode');
	}

  // TODO: add commments
	cancelNote() {
		this.editorPanelElement.classList.remove('edit-mode');
	}


}


// TODO: add comments
export { Editor }