
(function () {

    // getting all DOM elements

    // footer
    var footer = document.getElementById("message");
    // search input
    var search = document.getElementById("search-input");
    // display container
    var screenDisplay = document.getElementById("list-container");
    // toast
    const toastLive = document.getElementById('liveToast')

    // url to fetch characters using api
    var url = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=ac22e097c81610130481c2c4ad7279ae&hash=f30734b11737324896e2d9907489787e";


    // function to display footer
    async function showFooter() {

        const response = await fetch(url);
        const data = await response.json();
        footer.innerHTML = data.attributionHTML;
    }

    // to implement search results based on user input in search bar
    search.onkeyup = async function displayList() {
        let input = search.value;
        if (input.length == 0) {
            screenDisplay.innerHTML = "";
            return;
        }
        await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&ts=1&apikey=ac22e097c81610130481c2c4ad7279ae&hash=f30734b11737324896e2d9907489787e`)
            .then(response => response.json())
            .then(data => showHeroes(data.data.results))

    }

    // function to render superheroes 
    function showHeroes(heroes) {

        screenDisplay.innerHTML = ``;
        if (heroes.length == 0) {
            screenDisplay.innerHTML += `<div class="text-light fw-bold">Oops! No SuperHeroes found, try another term. </div>`
            console.log("sorry");
        }

        // appending card for each search result
        for (const key in heroes) {
            let hero = heroes[key];
            screenDisplay.innerHTML +=
                `
                <div class="card" style="width: 300px;">
                <img src="${hero.thumbnail.path + '/standard_large.' + hero.thumbnail.extension}" alt="">
                <div class="card-body">
                <a class="text-decoration-none text-white" href = ${"./character.html?character=" + hero.id}> <h5 class="card-title">${hero.name}</h5></a>
                <button class="btn add-to-fav-btn" name="${hero.name}" id="${hero.id}"><i class="fa-solid fa-heart-circle-plus text-danger"></i></button>
                </div >
                </div>
                `
        }

        events();
    }

    // function to add functionality to favourite button
    function events() {
        let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
        const toast = bootstrap.Toast.getOrCreateInstance(toastLive)
        favouriteButton.forEach((data) => {
            data.addEventListener('click', function () {

                // adding fav hero to local storage
                localStorage.setItem(data.name, data.id)

                // displaying toast
                toast.show()

            })
        })


    }


    function initializeApp() {
        showFooter();
    }

    initializeApp();

})()





