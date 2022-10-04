
let savedMovies = JSON.parse(localStorage.getItem("WatchlistMovies"));
if (savedMovies == false) {
    savedMovies = [];
}

const containerHtml =  document.getElementById("container");
window.addEventListener("load", renderMovies);


function renderMovies() {
    let contentHtml = "";
    if (savedMovies === false) {
        return;
    } else {
        for (let movie of savedMovies) {
        contentHtml += `
            <div class="movie-container">
                    <img src="${movie.Poster}">
                    <div class="movie-description">
                        <h4>${movie.Title} 
                            <span class="movie-rating">
                                ⭐ ${movie.imdbRating}
                            </span>
                        </h4> 
                        <div class="sub-description">
                            <span>${movie.Runtime}</span>
                            <span>${movie.Genre}</span>
                            <button id="btn-${movie.imdbID}" onclick='clickHandler("${movie.imdbID}")'><i class="bi bi-dash-circle"></i> Watchlist</button>
                        </div>            
                        <p>${movie.Plot}</p>              
                    </div>   
                </div>
        `   
        }
        if (contentHtml) {
            containerHtml.innerHTML = contentHtml;
            containerHtml.style.paddingTop = "1.5em"; 
        } else {
            containerHtml.style.paddingTop = "7em";
            containerHtml.innerHTML = `
                <p>Your watchlist is looking a little empty...</p>  
                <a href="index.html"><i class="bi bi-plus-circle"></i>Let’s add some movies!</a>
            `
        }
            
    }  
};

function clickHandler(id) {
    if (savedMovies.find(el => el.imdbID == id)) {
        const index = savedMovies.findIndex(el => el.imdbID == id);
        savedMovies.splice(index, 1);
        document.getElementById(`btn-${id}`).innerHTML = '<i class="bi bi-plus-circle"></i> Watchlist';
        renderMovies()
        localStorage.setItem("WatchlistMovies", JSON.stringify(savedMovies));
    } 
}