// getting DOM elements
var character = document.getElementById("characterDetails");

// retreiving character id from url
const Id = new URLSearchParams(window.location.search).get('character');

// Creating Url
const url = `http://gateway.marvel.com/v1/public/characters/${Id}?&ts=1&apikey=ac22e097c81610130481c2c4ad7279ae&hash=f30734b11737324896e2d9907489787e`
showdescription(url);

// fetching character data from api
async function showdescription(url) {
    const result = await fetch(url)
        .then(response => response.json())
        .then(data => displayHero(data.data.results))
}

// rendering character information 
function displayHero(heroes) {
    for (const key in heroes) {
        let hero = heroes[key];

        // checking value of description
        // if null, setting it to 'Not available'
        var desc = hero.description;
        if (desc == "") {
            desc = "Not available";
        }

        // appending character info card to display
        character.innerHTML +=
            `   

                <div class="card">
                <div class="row g-0">
                <div class="col-md-4">
                <img src="${hero.thumbnail.path + '/portrait_xlarge.' + hero.thumbnail.extension}" alt="">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title text-white bg-dark">${hero.name}</h5>
                <div class="card-b"><span class="fw-bolder">ID:</span> ${hero.id}</div>
                <div class="card-b"><span class="fw-bolder">Comics:</span> ${hero.comics.available}</div>
                <div class="card-b"><span class="fw-bolder">Series:</span> ${hero.series.available}</div>
                <div class="card-b"><span class="fw-bolder">Stories:</span> ${hero.stories.available}</div>
                <div class="card-b"><span class="fw-bolder">Events:</span> ${hero.events.available}</div>
                <div class="card-b"><span class="fw-bolder">Description:</span> ${desc}</div>
                <button type="button" class="btn btn-danger" name="${hero.name}" id="${hero.id}">Add to Favourites&nbsp;<i class="fa-solid fa-heart"></i></button>
                
                </div>
                </div>
                </div>
                </div>
                `
    }

    events();

}

// adding functionality to Favourite button
function events() {
    let favouriteButton = document.querySelectorAll(".btn");
    favouriteButton.forEach((data) => {
        data.addEventListener('click', function () {
            localStorage.setItem(data.name, data.id)
        })
    })


}