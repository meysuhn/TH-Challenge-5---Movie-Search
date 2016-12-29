

$(document).ready(function () {
    $('#submit').click(function (evt) {// why evt and what does that mean? What is the significance of those particular three letters?
        evt.preventDefault();

        var ombdAPI = "http://www.omdbapi.com";

        var searchData = document.getElementById("search").value;
        var yearData = document.getElementById("year").value;

        var dataToGet = {
          s: searchData, //switching code to take a t query may provide the more details response.
          y: yearData,
          plot: "full",
          type: "Movie",
          r: "json",
          page: "1",
          callback: ""
        };


        function displayMovies(movie) { //the information received back from omdb is passed to this callback function, as we've named that parameter 'movie' that's what I'm telling the programme to store the received infromation in, i.e the info received is being stored in a variable called 'movie'. That information is an object.

        if (movie.Response === "True") {
            var movieHTML = "";
            console.log("Total Results: " + movie.totalResults); //total results is a key on the returned JSON object which I've named 'movie'

            // the individual search results are objects stored in an array on the 'Search' key, all stored inside the movie variable.
            console.log(movie.Search);


                $.each(movie.Search, function (i, item) { //the array received from omdb is called 'search'. I access this by accessing the information inside the movie object.
                //movieHTML += '<a href=http://www.imdb.com/title/' + item.imdbID +'>';
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
            $('#movies').html(movieHTML);

        }

        if (movie.Response === "False") {
            var noMovies = "<li class='no-movies'><i class='material-icons icon-help'>help_outline</i>";
            noMovies += "No movies found that match: " + searchData + "</li>";

            $('#movies').html(noMovies);

        }

        }
        $.getJSON(ombdAPI, dataToGet, displayMovies);

    });  // end submit click

}); //end ready

$("#movies").click(function(event) {
    var text = $(event.target).closest('li');
    console.log(text);

    var step1 = text[0];
    var step2 = step1.children[1].innerText;
    console.log(step2);

    var ombdAPI = "http://www.omdbapi.com"; //this could be moved to global later.

    // These later will need to be something like 'this' to catch the object clicked on. But for time being using dummy values
    var searchData = step2;
    //var yearData = document.getElementById("year").value;

    var dataToGet = {
      t: searchData, //switching code to take a t query may provide the more details response.
      //y: yearData,
      plot: "full",
      type: "Movie",
      r: "json",
      callback: ""
    };
    function movieDescription(description) {
        console.log(description);
        var descriptionHTML = "";

        descriptionHTML += '<h3>' + description.Title + '</h3>';
        descriptionHTML += '<h4>' + description.Year + '</h4>';
        descriptionHTML += '<h4>IMDb Rating: ' + description.imdbRating + '</h4>';


        //if poster image not present, display placehlder image, else  display poster image.
        if (description.Poster === "N/A") {
            descriptionHTML += '<i class="material-icons poster-placeholder">crop_original</i></div>';
        } else {
            descriptionHTML += '<img class="movie-poster" src="' + description.Poster + '">';
        }
        descriptionHTML += '<p>' + description.Plot + '</p>';

        descriptionHTML += '<span><a href=http://www.imdb.com/title/' + description.imdbID +'>See this movie on IMDb</a></span>';

        $('#movies').html(descriptionHTML);



    }
    $.getJSON(ombdAPI, dataToGet, movieDescription);


});
