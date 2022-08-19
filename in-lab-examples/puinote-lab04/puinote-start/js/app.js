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


// ------ BONUS ----------------------------------------------------------------

const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const notecards = [notecardOne, notecardTwo, notecardThree]
for (let i=1; i<4; i++) {
  const animal = params.get('animal' + i);
  if (animal != null) {
    notecards[i-1].noteImageURL = 'assets/warhol-' + animal + '.png';
    notecards[i-1].updateElement();
  }
}