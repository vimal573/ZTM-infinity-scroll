const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash Api
const count = 30;
const apiKey = 'zqaZmCNyu3HijvJ6rVsVZi6r0DlTJ2Sfj9Uq5lVfGtU';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to Set attribute on dom elements
function setAttributes(element, attribute) {
  for (const key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

// Create elements for links and photos,add to dom
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    // Create link to full pohoto
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> element for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // To check if each image is loaded
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both in imagecontainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos fropm Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) &
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
