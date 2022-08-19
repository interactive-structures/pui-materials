// Below is the final code from last week's exercise:

class Notecard {

  constructor(imageURL, title, body, footer, elementID) {
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;
		this.noteFooter = footer;

    this.element = document.querySelector(elementID);
  
    const btnExpand = this.element.querySelector('.icon-expand');
    const btnCollapse = this.element.querySelector('.icon-collapse');
    const btnDelete = this.element.querySelector('.icon-delete');

	  btnExpand.onclick = this.expandNote.bind(this);
	  btnCollapse.onclick = this.collapseNote.bind(this);
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

  deleteNote() {
    this.element.remove();
  }

}