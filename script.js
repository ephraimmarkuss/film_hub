// TMDB API key
const API_KEY = "0955e088e70d925014441bcd9b9e4e21";

// TMDB API URL
const API_URL =
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`;

// Get the movie container from HTML
const moviesContainer = document.getElementById("movies-container");


// Get movies from TMDB
async function getMovies() {

    try {

        // Send request to the API
        const response = await fetch(API_URL);

        // Convert the response into JavaScript data
        const data = await response.json();

        // Get the first 15 movies/shows
        const movies = data.results.slice(0, 15);

        // Display the movies
        displayMovies(movies);

    } catch (error) {

        console.log("Error:", error);

        moviesContainer.innerHTML =
            "<p class='loading'>Unable to load movies.</p>";
    }
}


// Display movies on the website
function displayMovies(movies) {

    // Clear the loading message
    moviesContainer.innerHTML = "";


    // Go through every movie
    movies.forEach(function(movie) {

        // Get the title
        // Movies use "title"
        // TV shows use "name"
        let title = movie.title || movie.name;


        // Get the release date
        let releaseDate =
            movie.release_date || movie.first_air_date || "Unknown";


        // Get the poster
        let poster;

        if (movie.poster_path) {

            poster =
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        } else {

            poster =
                "https://via.placeholder.com/500x750?text=No+Poster";
        }


        // Get the genre
        let genre = getGenre(movie.genre_ids);


        // Get the overview
        let overview =
            movie.overview || "No overview available.";


        // Create a short version of the overview
        let shortOverview;

        if (overview.length > 120) {

            shortOverview =
                overview.substring(0, 120) + "...";

        } else {

            shortOverview = overview;
        }


        // Create the movie card
        let movieCard = document.createElement("div");

        movieCard.classList.add("movie-card");


        // Add movie information to the card
        movieCard.innerHTML = `

            <img
                src="${poster}"
                alt="${title} poster"
            >

            <div class="movie-info">

                <h2 class="movie-title">
                    ${title}
                </h2>


                <p>
                    <strong>Popularity:</strong>
                    ${movie.popularity.toFixed(1)}
                </p>


                <p class="rating">
                    ⭐ Rating:
                    ${movie.vote_average.toFixed(1)} / 10
                </p>


                <p>
                    <strong>Release Date:</strong>
                    ${releaseDate}
                </p>


                <p class="genre">
                    <strong>Genre:</strong>
                    ${genre}
                </p>


                <p class="overview-container">

                    <strong>Overview:</strong><br>

                    <span class="short-text">
                        ${shortOverview}
                    </span>

                    <span class="full-text">
                        ${overview}
                    </span>

                    ${
                        overview.length > 120
                        ? '<button class="read-more">Read More</button>'
                        : ''
                    }

                </p>

            </div>
        `;


        // Add the movie card to the webpage
        moviesContainer.appendChild(movieCard);


        // Get the Read More button
        let readMoreButton =
            movieCard.querySelector(".read-more");


        // Get the short overview
        let shortText =
            movieCard.querySelector(".short-text");


        // Get the full overview
        let fullText =
            movieCard.querySelector(".full-text");


        // Check if the movie has a Read More button
        if (readMoreButton) {

            // Hide the full overview at first
            fullText.style.display = "none";


            // When Read More is clicked
            readMoreButton.addEventListener("click", function() {


                // If the full text is hidden
                if (fullText.style.display === "none") {

                    // Hide the short text
                    shortText.style.display = "none";


                    // Show the full text
                    fullText.style.display = "inline";


                    // Change button text
                    readMoreButton.textContent = "Show Less";


                } else {

                    // Show the short text
                    shortText.style.display = "inline";


                    // Hide the full text
                    fullText.style.display = "none";


                    // Change button text
                    readMoreButton.textContent = "Read More";
                }

            });

        }

    });
}


// Get the genre name
function getGenre(genreIds) {

    if (genreIds.includes(28)) {

        return "Action";

    } else if (genreIds.includes(12)) {

        return "Adventure";

    } else if (genreIds.includes(16)) {

        return "Animation";

    } else if (genreIds.includes(35)) {

        return "Comedy";

    } else if (genreIds.includes(80)) {

        return "Crime";

    } else if (genreIds.includes(99)) {

        return "Documentary";

    } else if (genreIds.includes(18)) {

        return "Drama";

    } else if (genreIds.includes(10751)) {

        return "Family";

    } else if (genreIds.includes(14)) {

        return "Fantasy";

    } else if (genreIds.includes(27)) {

        return "Horror";

    } else if (genreIds.includes(9648)) {

        return "Mystery";

    } else if (genreIds.includes(10749)) {

        return "Romance";

    } else if (genreIds.includes(878)) {

        return "Science Fiction";

    } else if (genreIds.includes(53)) {

        return "Thriller";

    } else if (genreIds.includes(10752)) {

        return "War";

    } else if (genreIds.includes(37)) {

        return "Western";

    } else {

        return "Other";
    }
}


// Start the application
getMovies();
