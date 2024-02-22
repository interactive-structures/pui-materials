document.querySelector(".full-image-container").addEventListener('mousemove', onMouseMove);

function onMouseMove(event) {
    console.log(event);
}



/* Declaring the array of image filenames and their alt text */
const galleryPath = "../../assets/gallery/";
const images = ["developableMM.png", "metamaterialMechanisms.jpg", "MMtextures.png", "skinDragDisplays.jpg", "wrappingDOGs.jpg"];
const alts = {
    'developableMM.png' : 'A lamp folded from paper ruffles.',
    'metamaterialMechanisms.jpg' : 'A door latch mechanism 3D printed from microstructures.',
    'MMtextures.png' : 'A 3D printed door handle, that is spiky, communicating not to be used.',
    'skinDragDisplays.jpg' : 'A forearm worn device that communicates to the ones sense of touch.',
    'wrappingDOGs.jpg' : 'A 3D bunny model wrapped with pieces of simulated paper.'
}

/* Looping through images & adding them as thumbnails to the DOM */
const thumbnailsContainer = document.querySelector('.thumbnails-container');

for (const image of images) {
    //create a new <img> element
    const thumbnailImage = document.createElement('img');

    //set the src and alt attributes of the <img> element
    thumbnailImage.setAttribute('src', galleryPath + image);
    thumbnailImage.setAttribute('alt', alts[image]);

    //add a prepared CSS style class
    thumbnailImage.classList.add("thumbnail");

    //add the new element to the DOM such that it will be shown
    thumbnailsContainer.appendChild(thumbnailImage);

    //listen to when the thumbnail is clicked, then excecute the function "onThumbnailClick()"
    thumbnailImage.addEventListener('click', onThumbnailClick);

    // If you reviewed this code, send Prof. Das an email with the subject "IMAGE GALLERY FTW!" and you will get a bonus point
    // Don't share this with other students
}

function setFullImage(src, alt) {
    const fullImage = document.querySelector("#full-image");
    fullImage.src = src;
    fullImage.alt = alt;
}

function onThumbnailClick(event) {
    console.log(event.target);
    setFullImage(event.target.src, event.target.alt);
}
