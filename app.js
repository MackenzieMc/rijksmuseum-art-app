//1. Create an app object
const artApp = {};

//Save info that can be reused within properties on the app object.
artApp.apiKey = 'z5MFG6NR';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection'


//2. Create a method which will make a call to the API that can get some data back
//b. Then take data a put it on the page.

artApp.getArt = (usersChoice) => {
    const url = new URL(artApp.apiUrl);
    console.log(url);
    
    //Format and add params to URL
    url.search = new URLSearchParams({
        key: artApp.apiKey,
        q: usersChoice,
        imgonly: true,
        // ps: 25,
    });
    
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonResponse) => {
        artApp.displayArt(jsonResponse.artObjects);
    });
    
};

//Create a method which takes API data and displays it on our page

artApp.displayArt = (artArray) => {

    artArray.forEach( function(individualArtObject) {
        //Extract data from API and save it within variables
        const artworkTitle = individualArtObject.title;
        const artworkImage = individualArtObject.webImage.url;
        const artist = individualArtObject.principalOrFirstMaker;
        const altText = individualArtObject.longTitle;

        //create an li element in which this info will be added/
        const listElement = document.createElement('li');
        listElement.classList.add('piece');

        //create an h2 to hold the art title
        const heading = document.createElement('h2');
        heading.textContent = artworkTitle;

        //create an img to hold the artwork picture
        const image = document.createElement('img');
        image.src = artworkImage;
        image.alt = altText;

        //create a p with a class of artist to hold the artist name

        const paragraphElement = document.createElement('p');
        paragraphElement.classList.add('artist');
        paragraphElement.textContent = artist;

        listElement.append(heading, image, paragraphElement)

        const ulElement = document.querySelector('#artwork');
        ulElement.appendChild(listElement);
    });
};

//Create an initialization method which will kickstart our app.
artApp.init = () => {
    artApp.getArt('whales');
}


artApp.init();