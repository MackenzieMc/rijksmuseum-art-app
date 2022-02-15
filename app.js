//1. Create an app object
const artApp = {};

//Save info that can be reused within properties on the app object.
artApp.apiKey = 'z5MFG6NR';
artApp.apiUrl = 'https://www.rijksmuseum.nl/api/en/collection'


//2. Create a method which will make a call to the API that can get some data back
    //b. Then take data a put it on the page.

    artApp.getArt = () => {
        const url = new URL(artApp.apiUrl);
        console.log(url);

        //Format and add params to URL
        url.search = new URLSearchParams({
            key: artApp.apiKey,
            q: 'monkey',
            imgonly: true,
        });

        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            console.log(jsonResponse.artObjects);
        })
    }

//Create an initialization method which will kickstart our app.
artApp.init = () => {
    artApp.getArt();
}

artApp.init();