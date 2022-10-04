const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const movieHeader = document.getElementById("movie-header");
const containerHtml = document.getElementById("container");
let savedMovies = JSON.parse(localStorage.getItem("WatchlistMovies"));
if (savedMovies == false) {
    savedMovies = [];
}



searchBtn.addEventListener("click", function(event) {
    event.preventDefault(); 
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=ff7ef8c4&`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "False") {
                errorRender(data); 
            } else {
                containerHtml.innerHTML = "";
                containerHtml.style.paddingTop = "1.5em";
                for (let movie of data.Search) {
                    if (movie.Type === "movie") {
                        addMovieById(movie.imdbID);
                    }
                }
            }      
        }
        )

});

function addMovieById(id) {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=ff7ef8c4&`)
    .then(res => res.json())
    .then(data => {
        containerHtml.innerHTML += `
            <div class="movie-container">
                <img src="${data.Poster}">
                <div class="movie-description">
                    <h4>${data.Title} 
                        <span class="movie-rating">
                            ⭐ ${data.imdbRating}
                        </span>
                    </h4> 
                    <div class="sub-description">
                        <span>${data.Runtime}</span>
                        <span>${data.Genre}</span>
                        <button id="btn-${data.imdbID}" onclick='clickHandler("${data.imdbID}")'><i class="bi bi-plus-circle"></i> Watchlist</button>
                    </div>            
                    <p>${data.Plot}</p>              
                </div>   
            </div>
            `
    })  
}

function clickHandler(id) {
    if (savedMovies.find(el => el.imdbID == id)) {
                const index = savedMovies.findIndex(el => el.imdbID == id);
                savedMovies.splice(index, 1);
                document.getElementById(`btn-${id}`).innerHTML = '<i class="bi bi-plus-circle"></i> Watchlist';
    } else {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=ff7ef8c4&`)
        .then(res => res.json())
        .then(data => {
                savedMovies.push(data);
                document.getElementById(`btn-${id}`).innerHTML = '<i class="bi bi-dash-circle"></i> Watchlist';
                localStorage.setItem("WatchlistMovies", JSON.stringify(savedMovies))
        })
    }
}

function errorRender(data) {
    movieHeader.textContent = data.Error; 
    movieHeader.style.color = "#787878"
    document.querySelector("main > i").style.display = "none";
}


