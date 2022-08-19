class Notecard {

  // When we create a new Notecard object (see main.js), the "constructor"
  // function is run. In the constructor, "this" refers to the newly created
  // Notecard object.
	constructor(imageURL, title, body, footer, deleteFn) {

    // TODO: add comments
		this.noteImageURL = imageURL;
		this.noteTitle = title;
		this.noteBody = body;
		this.noteFooter = footer;

    // TODO: add comments
		this.deleteFunction = deleteFn;

    // TODO: add comments
    this.createElement()
    this.updateElement();
	}

  
  // TODO: add comments
  createElement() {
    const template = document.querySelector('#notecard-template');
	  const clone = template.content.cloneNode(true);
	  this.element = clone.querySelector('.notecard');
    
    const btnExpand = this.element.querySelector('.icon-expand');
    const btnCollapse = this.element.querySelector('.icon-collapse');
    const btnDelete = this.element.querySelector('.icon-delete');

	  btnExpand.onclick = this.expandNote.bind(this);
	  btnCollapse.onclick = this.collapseNote.bind(this);
	  btnDelete.onclick = this.deleteNote.bind(this);
  }


  // TODO: add comments
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


  // TODO: add comments
  expandNote() {
    this.element.classList.add('expanded');
  }


  // TODO: add comments
  collapseNote() {
    this.element.classList.remove('expanded');
  }


  // TODO: add comments
  deleteNote() {
    this.element.remove();
    this.deleteFunction(this);
  }

}

// TODO: add comments
export { Notecard }