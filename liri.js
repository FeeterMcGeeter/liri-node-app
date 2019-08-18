require('dotenv').config();

var colors = require('colors');

// ===== GLOBAL VARIABLES =====
var fs = require('fs');
var axios = require('axios');
var keys = require('./keys.js');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var parameter = process.argv.slice(3).join(' ');

// ===== FUNCTION FOR THE SPOTIFY API =====
function spotifySearch(parameter) {
    var song = '';

    if (!parameter) {
        song = 'The Sign by Ace of Base';
    } else {
        song = parameter;
    }
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log('==========SONG INFO=========='.bgWhite.black);
        console.log('Artist:'.bgGreen + ' ' + data.tracks.items[0].artists[0].name);
        console.log('Song:'.bgGreen + ' ' + data.tracks.items[0].name);
        console.log('Preview:'.bgGreen + ' ' + data.tracks.items[0].preview_url);
        console.log('Album:'.bgGreen + ' ' + data.tracks.items[0].album.name);
        console.log('============================='.bgWhite.black);
    })

    appendTheThing(command, parameter);
}

// ===== FUNCTION FOR THE BANDS IN TOWN API =====
function concertSearch() {
    axios.get(`https://rest.bandsintown.com/artists/${parameter}/events?app_id=codingbootcamp`).then(
        function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                console.log('==========CONCERT INFO=========='.bgWhite.black);
                console.log('Venue:'.bgBlue + ' ' + results[i].venue.name);
                console.log('City:'.bgBlue + ' ' + results[i].venue.city);
                console.log('Date:'.bgBlue + ' ' + moment(results[i].datetime).format('L'));
                console.log('================================'.bgWhite.underline.black);
            }
        }
    )

    appendTheThing(command, parameter);
}

// ===== FUNCTION FOR THE OMDB API =====
function movieSearch(parameter) {
    var movie = '';

    if (!parameter) {
        movie = 'Mr. Nobody';
        console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
    } else {
        movie = parameter;
    }
    axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`).then(
        function (response) {
            console.log('==========MOVIE INFO=========='.bgWhite.black);
            console.log('Title:'.bgMagenta + ' ' + response.data.Title);
            console.log('Year Released:'.bgMagenta + ' ' + response.data.Year);
            console.log('IMDB Rating:'.bgMagenta + ' ' + response.data.imdbRating);
            console.log('Rotten Tomatoes:'.bgMagenta + ' ' + response.data.Ratings[1].Value);
            console.log('Country Produced:'.bgMagenta + ' ' + response.data.Country);
            console.log('Language:'.bgMagenta + ' ' + response.data.Language);
            console.log('Plot:'.bgMagenta + ' ' + response.data.Plot);
            console.log('Actors:'.bgMagenta + ' ' + response.data.Actors);
            console.log('=============================='.bgWhite.black);
        }
    )
    appendTheThing(command, parameter);
}

// ===== THIS FUNCTION DISPLAYS THE DEFAULT INFORMATION THAT IS IN THE RANDOM.TXT FILE =====
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var dataArray = data.split(',');
        command = dataArray[0];
        parameter = dataArray[1];

        console.log('================================'.bgWhite.black);
        console.log(`${command}', ${parameter}`.cyan);
        console.log('================================'.bgWhite.black);
    })
}

// ===== THIS FUNCTION APPENDS THE COMMAND AND THE PARAMETER ENTERED BY THE USER INSIDE OF LOG.TXT =====
function appendTheThing(command, parameter) {
    fs.appendFile('log.txt', command + ' ' + parameter + '\n', function (err) {

        if (err) {
            console.log(err);
        } else {
            console.log('added command to log.txt');
        }
    })
}

// ===== THIS FUNCTION TELLS THE APP WHAT FUNCTION TO RUN DEPENDING ON THE COMMAND ENTERED BY THE USER =====
function runApp() {
    switch (command) {
        case 'spotify-this-song':
            spotifySearch(parameter);
            break;

        case 'concert-this':
            concertSearch(parameter);
            break;

        case 'movie-this':
            movieSearch(parameter);
            break;

        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

runApp();