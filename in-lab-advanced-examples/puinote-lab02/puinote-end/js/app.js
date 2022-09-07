class Notecard {
  constructor(imageURL, title, body, footer, elementID) {
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;
		this.noteFooter = footer;

    this.element = document.querySelector(elementID);

    const btnExpand = this.element.querySelector('.icon-expand');
    const btnCollapse = this.element.querySelector('.icon-collapse');

    btnExpand.onclick = this.expandNote.bind(this);
    btnCollapse.onclick = this.collapseNote.bind(this);

    const btnEdit = this.element.querySelector('.icon-edit');
    btnEdit.onclick = this.editNote.bind(this);

    const btnDelete = this.element.querySelector('.icon-delete');
        btnDelete.onclick = this.deleteNote.bind(this);

    this.updateElement();
  }

  updateElement() {    
	  const noteImageElement = this.element.querySelector('.notecard-thumbnail');
	  const noteTitleElement = this.element.querySelector('.note-title');
	  const noteBodyElement = this.element.querySelector('.note-body');
	  const noteFooterElement = this.element.querySelector('.notecard-footer');

	  noteImageElement.src = this.noteImageURL;
	  noteTitleElement.innerText = this.noteTitle;
	  noteBodyElement.innerText = this.noteBody;
    noteFooterElement.innerText = this.noteFooter;
	}

  expandNote() {
    this.element.classList.add('expanded');
  }

  collapseNote() {
    this.element.classList.remove('expanded');
  }

  editNote() {
    selectedNote = this;
    updateEditor();
  }

  deleteNote() {
    this.element.remove();
  }
}

let selectedNote = null;

function updateEditor() {
  const editorElement = document.querySelector('#note-editor');
  editorElement.classList.add('edit-mode');

  const editorTitleElement = document.querySelector('#note-editor-title');
	const editorBodyElement = document.querySelector('#note-editor-body');

  editorTitleElement.value = selectedNote.noteTitle;
  editorBodyElement.value = selectedNote.noteBody;
}

function submitNote() {
  const editorTitleElement = document.querySelector('#note-editor-title');
	const editorBodyElement = document.querySelector('#note-editor-body');

  selectedNote.noteTitle = editorTitleElement.value;
  selectedNote.noteBody = editorBodyElement.value;
  selectedNote.updateElement();
  

  const editorElement = document.querySelector('#note-editor');
  editorElement.classList.remove('edit-mode');
}


const notecardOne = new Notecard(
  'assets/warhol-frog.png',
  'This is the First Note',
  'Here is some body text for the first note.',
  'Sep 1 2022, 10:25',
  '#notecard-one'
)

const notecardTwo = new Notecard(
  'assets/warhol-orangutan.png',
  'This is the Second Note',
  'And here is some body text for the second note! What could be next?',
  'Sep 1 2022, 10:25',
  '#notecard-two'
)

const notecardThree = new Notecard(
  'assets/warhol-eagle.png',
  'This is the Third Note',
  'Yep, you guessed it, here is some body text for the third note.',
  'Sep 1 2022, 10:25',
  '#notecard-three'
)


const btnSubmit = document.querySelector('#note-editor .icon-done');
btnSubmit.onclick = submitNote
