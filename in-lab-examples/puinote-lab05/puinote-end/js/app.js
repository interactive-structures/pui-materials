// We use this class to represent our notecards. Each notecard object contains
// data for a single note, and a reference to a DOM element corresponding to
// that notecard.
class Notecard {

  // When we create a new Notecard object, the "constructor"
  // function is run. In the constructor, "this" refers to the
  // newly created Notecard object.
  constructor(imageURL, title, body) {
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;

    this.element = null;
  }
}

// Create an empty Set, which will hold all of our notecard objects. A Set is
// similar to an Array, but in a Set, an item can only be added once (there
// are no duplicates). Sets also allow for easy removal of items, using the
// Set.delete(item) function.
const notecardSet = new Set();

// This function creates a new Notecard object, and adds it to notecardSet.
function addNewNote(imageURL, title, body) {
  // Create a new notecard object. The Notecard constructor takes three
  // arguments: the image URL, title text,  and body text.
  const notecard = new Notecard(imageURL, title, body);

  // Add the notecard object to our notecard Set, which keeps track of all
  // the notecards in our application.
  notecardSet.add(notecard);

  return notecard;
}

function createElement(notecard) {
  const template = document.querySelector('#notecard-template');
  const clone = template.content.cloneNode(true);
  notecard.element = clone.querySelector('.notecard');

  const btnDelete = notecard.element.querySelector('.icon-delete');
  console.log(btnDelete);
  btnDelete.addEventListener('click', () => {
    deleteNote(notecard);
  });

  const notecardListElement = document.querySelector('#notecard-list');
  notecardListElement.prepend(notecard.element);

  updateElement(notecard);
}

function updateElement(notecard) {
  const noteImageElement = notecard.element.querySelector('.notecard-thumbnail');
  const noteTitleElement = notecard.element.querySelector('.note-title');
  const noteBodyElement = notecard.element.querySelector('.note-body');

  noteImageElement.src = notecard.noteImageURL;
  noteTitleElement.innerText = notecard.noteTitle;
  noteBodyElement.innerText = notecard.noteBody;
}

function deleteNote(notecard) {
  notecard.element.remove();
  notecardSet.delete(notecard);
}

const notecardOne = addNewNote(
  "./assets/warhol-rhino.png",
  "The first note title",
  "The first note body"
);
const notecardTwo = addNewNote(
  "./assets/warhol-frog.png",
  "The second note title",
  "The second note body"
);

for (const notecard of notecardSet) {
  console.log(notecard);
  createElement(notecard);
}