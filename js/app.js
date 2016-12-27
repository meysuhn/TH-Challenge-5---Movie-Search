$(document).ready(function () {
    $('#submit').click(function () {

        var ombdAPI = "http://www.omdbapi.com";

        var searchData = document.getElementById("search").value;

        var dataToGet = {
          s: searchData,
          type: "Movie",
          r: "json",
          callback: ""
        };


        function displayMovies(movie) {
            
        console.log("Callback has fired");
            var movieHTML;
            $.each(data.search, function (i, movie) {
                movieHTML += '<li><div class="poster-wrap">';
                movieHTML += '<img class="movie-poster" src="' + movie.poster + '"></div>';
                movieHTML += '<span class="movie-title">"' + movie.title + '"</span>';
                movieHTML += '<span class="movie-year">"' + movie.year + '"</span></li>';
            });
            $('#movies').html(movieHTML);
            console.log(movieHTML);
        }
        $.getJSON(ombdAPI, dataToGet, displayMovies);

    }); // end submit click

}); //end ready
