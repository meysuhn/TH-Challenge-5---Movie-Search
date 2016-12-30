
// TechDegree Challenge 5
// Chris Mason 30/12/16
// Checked on Chrome, Firefox, Safari, Opera

(function () {

var allMovies = document.getElementById("movies"); //movies screen
var movieDescriptionScreen = document.getElementById("descriptionPage"); //description screen
var ombdAPI = "http://www.omdbapi.com";
var movieHTML = "";

allMovies.style.display = "block"; // show main screen on load.
movieDescriptionScreen.style.display = "none"; // hide description screen on load.


// function to take search and year data, send to OMDb api and display results on main page
$('#submit').click(function (evt) {
    evt.preventDefault();

    if (allMovies.style.display === "none") { //show main page if new search is initiated from description page.
        allMovies.style.display = "block";
        movieDescriptionScreen.style.display = "none";
    }

    var searchData = document.getElementById("search").value; //get search input
    var yearData = document.getElementById("year").value; //get year input

    var dataToGet = { //data to send to api
      s: searchData,
      y: yearData,
      plot: "full",
      type: "Movie",
      r: "json",
      page: "1",
      callback: ""
    };


    function displayMovies(movie) { //the information received back from omdb is passed to this callback function. As the parameter I've named 'movie' then that's what I'm telling the programme to store the received information in, i.e the info received is being stored in a variable called 'movie'. That information is an object.
    movieHTML = ""; //reset search results html
    if (movie.Response === "True") {
        //console.log("Total Results: " + movie.totalResults); //total results is a key on the returned JSON object which I've named 'movie'

        // the individual search results are objects stored in an array on the 'Search' key, all stored inside the movie variable.
        //console.log(movie.Search);


            $.each(movie.Search, function (i, item) { //the array received from omdb is called 'search'. I access this by accessing the information inside the movie object.

            // build up html with results
            movieHTML += '<li><div class="poster-wrap">';

            // if poster image not present, display placehlder image, else  display poster image.
            if (item.Poster === "N/A") {
                movieHTML += '<i class="material-icons poster-placeholder">crop_original</i></div>';

            } else {
                movieHTML += '<img class="movie-poster" src="' + item.Poster + '"></div>';
            }

            movieHTML += '<span class="movie-title">"' + item.Title + '"</span>';
            movieHTML += '<span class="movie-year">"' + item.Year + '"</span></li>';

        });
        $('#movies').html(movieHTML); // replace previous content and insert new search results

    }

    // display error is no matches found
    if (movie.Response === "False") {
        var noMovies = "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>";
        noMovies += "No movies found that match: " + searchData + "</li>";

        $('#movies').html(noMovies);

    }

    }
    $.getJSON(ombdAPI, dataToGet, displayMovies);

});  // end submit click


//function to get and display extra movie information on a new screen if user clicks on a movie result.
$("#movies").click(function(event) {
    var movieLi = $(event.target).closest('li');
    var step1 = movieLi[0];
    var step2 = step1.children[1].innerText;
    var searchData = step2; // get the title of the movie

    var dataToGet = {
      t: searchData, //access more descriptive info on requested movie using t
      plot: "full",
      type: "Movie",
      r: "json",
      callback: ""
    };
    function movieDescription(description) { //callback function
        var descriptionHTML = "";
        descriptionHTML += '<div><h2><a href=http://www.imdb.com/title/' + description.imdbID +'>' + description.Title + " (" + description.Year + ")" + '</a></h2>';
        descriptionHTML += '<h4>IMDb Rating: ' + description.imdbRating + '</h4></div>';


        //if poster image not present, display placehlder image, else  display poster image.
        if (description.Poster === "N/A") {
            descriptionHTML += '<i class="material-icons poster-placeholder">crop_original</i>';
        } else {
            descriptionHTML += '<img class="movie-poster" src="' + description.Poster + '">';
        }
        descriptionHTML += '<h3>Plot Synopsis: </h3><p>' + description.Plot + '</p>';

        descriptionHTML += '<span><a href=http://www.imdb.com/title/' + description.imdbID +'>See this movie on IMDb</a></span>';

        allMovies.style.display = "none"; // show all movies screen on load.
        movieDescriptionScreen.style.display = "block"; // hide description screen on load.
        $('#descriptionSection').html(descriptionHTML);

    }

    $.getJSON(ombdAPI, dataToGet, movieDescription);


});

// When user is on description page, allow them to click back to search results
$("#backToResults").click(function(event) {
    allMovies.style.display = "block"; // show all movies screen on load.
    movieDescriptionScreen.style.display = "none"; // hide description screen on load.
});

}()); // end self executing function
