// Unsplash Api
const count = 30;
const apiKey = 'zqaZmCNyu3HijvJ6rVsVZi6r0DlTJ2Sfj9Uq5lVfGtU';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data);
  } catch (error) {
    // Catch error here
  }
}

// On load
getPhotos();
