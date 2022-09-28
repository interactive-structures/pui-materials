const notecard = {
    noteTitle: 'title',
    noteBody: 'body',
    noteImageURL: 'assets/warhol-frog.png'
}

class Notecard {
    noteTitle;
    noteBody;
    noteImageURL;

    constructor(title, body, imageURL, elementID) {
        this.noteTitle = title;
        this.noteBody = body;
        this.noteBody = imageURL;
        this.element = document.querySelector(elementID);
        this.UpdateElement();

        const deleteButton = this.element.querySelector('.icon-delete');
        let myElement = this.element;
        deleteButton.onclick = function() {
            myElement.remove();
        }
    }

    UpdateElement() {
        const noteTitleElement = this.element.querySelector('.note-title');
        const noteBodyElement = this.element.querySelector('.note-body');
        const noteImageElement = this.element.querySelector('.notecard-thumbnail')

        noteTitleElement.innerText =this.noteTitle;
        noteBodyElement.innerText = this.noteBody;
        noteImageElement.src = this.noteImageURL;
    }

    deleteNote() {
        console.log("Deleting note");

        let parent = this.closest('.notecard-one');
        parent.remove();
    }

}
const notecardOne = new Notecard(
    'this is the first note',
    'first note body',
    'assets/warhol-frog.png',
    '#notecard-one'


)

const notecardTwo = new Notecard(
    'this is the second note',
    'second note body',
    'assets/warhol-zebra.png',
    '#notecard-two'

)
const notecardThree = new Notecard(
    'this is the third note',
    'third note body',
    'assets/warhol-zebra.png',
    '#notecard-three'
)
    
    
