

$(document).ready(function () {
    $('#submit').click(function (evt) {// why evt and what does that mean? What is the significance of those particular three letters?
        evt.preventDefault();

        var ombdAPI = "http://www.omdbapi.com";

        var searchData = document.getElementById("search").value;

        var dataToGet = {
          s: searchData,
          y: "year",
          type: "Movie",
          r: "json",
          callback: ""
        };


        function displayMovies(movie) { //the information received back from omdb is passed to this callback function, as we've named that parameter 'movie' that's what I'm telling the programme to store the received infromation in, i.e the info received is being stored in a variable called 'movie'. That information is an object.

        console.log("Callback has fired");
        console.log(movie);
        console.log(typeof movie);
        //$('#movies').html("is this working?");
        var movieHTML = "";
        console.log("Total Results: " + movie.totalResults); //total results is a key on the returned JSON object which I've named 'movie'

        // the individual search results are objects stored in an array on the 'search' key, all stored inside the movie variable.
        console.log(movie.search);
        var storageArray = movie.search;
        console.log(storageArray);

        

        }
        $.getJSON(ombdAPI, dataToGet, displayMovies);

    }); // end submit click

}); //end ready
