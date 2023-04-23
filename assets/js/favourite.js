// getting all DOM elements
var favDisplay = document.getElementById("favScreen");
var empty = document.getElementById("empty");
var heading = document.getElementById("heading");

// hiding empty message initially
empty.style.display = "none";
heading.style.display = "block";

//  checking local storage and making url
if (localStorage.length != 0) {
    for (let i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        var character = `https://gateway.marvel.com:443/v1/public/characters/${value}?ts=1&apikey=ac22e097c81610130481c2c4ad7279ae&hash=f30734b11737324896e2d9907489787e`
        displayImg(character);
    }
}

// if fav list is empty - display message
else {
    heading.style.display = "none";
    empty.style.display = "block";
}

// retreiving hero from api
async function displayImg(character) {
    const result = await fetch(character)
        .then(response => response.json())
        .then(data => showHeroes(data.data.results))
}

// rendering hero to display screen
function showHeroes(heroes) {
    if (heroes.length == 0) {
        favDisplay.innerHTML += `<div class="text-light">Oops! No SuperHeroes added to Favourites yet. </div>`
    }
    for (const key in heroes) {
        let hero = heroes[key];

        // appending hero card to display
        favDisplay.innerHTML +=
            `
                <div class="card" style="width: 300px;">
                <img src="${hero.thumbnail.path + '/standard_large.' + hero.thumbnail.extension}" alt="">
                <div class="card-body">
                <a class="text-decoration-none text-white" href = ${"./character.html?character=" + hero.id}><h5 class="card-title">${hero.name}</h5></a>
                <button class="btn rem-fav-btn" name="${hero.name}" id="${hero.id}"><i class="fa-solid fa-heart-circle-minus"></i></button>
                </div >
                </div>
                `
    }

    events();
}

// adding functionality to Remove from Favourites button
function events() {
    let favouriteButton = document.querySelectorAll(".rem-fav-btn");
    favouriteButton.forEach((data) => {
        data.addEventListener('click', function () {
            localStorage.removeItem(data.name)
            location.reload()
        })
    })


}