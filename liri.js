require("dotenv").config();

var fs = require('fs');
var request = require('request');
var keys = require("./keys.js");
var axios = require("axios");
var spotifyNode = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var command = process.argv[2];
var parameter = process.argv.splice[3];
var searchParameter = parameter.join('+');

function concertSearch(search) {

    var queryURL = "https://rest.bandsintown.com/artists/" + "/event?app_id=codingbootcamp";

    request(queryURL, function(err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log('Top 5 Venues Available:');

            var concertData = JSON.parse(body);
            for (i = 0; i < 5; i++) {
                console.log("Event Location: " + concertData[i].venue.name);
                console.log("Country: " + concertData[i].venue.country);
                console.log("City: " + concertData[i].venue.city + ", " + concertData[i].venue.region);

                var date = new Date(concertData[i].datetime);
                console.log("Time: " + date);
                
            }
        }
    })
}

function spotifySearch(search) {
    spotify.search(
        {
            type: "track", 
            query: search,
            limit: 1
        }) .then(function(response) {
                var spotifyData = response.tracks.items[0];
                
                console.log("Song: " + spotifyData.name);
                console.log("Artist: " + spotifyData.artists[0].name);
                console.log("Album: " + spotifyData.album.name);
                console.log("Preview Link: " + spotifyData.preview_url);
        }) .catch(function(error) {
            console.log(error);
        })
}

function movieSearch(search) {
    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + search;

    if (search === undefined) {
        var search = "Mr.Nobody";
        var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + search;
        console.log("You should watch Mr. Nobody!  It's on Netflix!");

        request(queryURL, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                var movieData = JSON.parse(body);

                console.log("Title: " + movieData.Title);
                console.log("Release Year: " + movieData.Year);
                console.log("IMDB Rating: " + movieData.imdbRating);
                console.log("Rotten Tomatoes: " + movieData.Ratings[1].Value);
                console.log("Countrys: " + movieData.country);
                console.log("Language: " + movieData.Language);
                console.log("Plot: " + movieData.Plot);
                console.log("Actors: " + movieData.Actors);
            }
        })
    }
}