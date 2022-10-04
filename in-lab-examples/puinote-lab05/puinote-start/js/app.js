class Notecard {
    constructor (imageURL, title, body) {
        this.noteImageURL = imageURL;
        this.noteTitle = title;
        this.noteBody = body;
        this.element = null;
    }
}

const notecardSet = new Set();

function addNewNote(imageURL, title, body) {
    const notecard = new Notecard(imageURL, title, body);
    notecardSet.add(notecard);
    return notecard;
}
function createElement(notecard) {
    let template = document.querySelector("#note-template")
    const clone = template.content.cloneNode(true);
    notecard.element = clone.querySelector(".notecard");
    console.log(notecard.element);

    let notecardListElement = document.querySelector("#notecard-list");
    notecardListElement.append(notecard.element);

    //grab the html elements that need updating
    let noteTitleElement = notecard.element.querySelector(".note-title");
    let noteBodyElement = notecard.element.querySelector(".note-body");
    let imageElement = notecard.element.querySelector(".notecard-thumbnail");
    //copy the notecard contents over to these HTML elements
    noteTitleElement.innerHTML = notecard.noteTitle;
    noteBodyElement.innerHTML = notecard.noteBody;
    imageElement.src = notecard.noteImageURL;
}

const notecardOne = addNewNote(
    "assets/warhol-rhino.png",
    "first note title",
    "first note body"
);
const notecardTwo = addNewNote(
    "assets/warhol-frog.png",
    "second note title",
    "second note body"
);

for (const notecard of notecardSet) {
    console.log (notecard);
    createElement(notecard);
    let deleteBtn = notecard.element.querySelector(".icon-delete");
    deleteBtn.onclick = function() {
        deleteNote(notecard);
    }
}
function deleteNote(notecard) {
    notecard.element.remove();
    notecardSet.delete(notecard);
}
