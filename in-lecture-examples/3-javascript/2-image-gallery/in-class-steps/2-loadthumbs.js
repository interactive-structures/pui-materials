/* Declaring the array of image filenames and their alt text */
const galleryPath = "../../assets/gallery/";
const images = ["developableMM.png", "metamaterialMechanisms.jpg", "MMtextures.png", "skinDragDisplays.jpg", "wrappingDOGs.jpg"];


/* Looping through images & adding them as thumbnails to the DOM */
const thumbnailsContainer = document.querySelector('.thumbnails-container');

for (const image of images) {
    //create a new <img> element
    const thumbnailImage = document.createElement('img');

    //set the src and alt attributes of the <img> element
    thumbnailImage.setAttribute('src', galleryPath + image);

    //add a prepared CSS style class
    thumbnailImage.classList.add("thumbnail");

    //add the new element to the DOM such that it will be shown
    thumbnailsContainer.appendChild(thumbnailImage);
}
