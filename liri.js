require('dotenv').config();

var fs = require('fs');
var axios = require('axios');
var keys = require('./keys.js');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var parameter = process.argv.slice(3).join(' ');

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
        console.log('================================');
        console.log('Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('Song: ' + data.tracks.items[0].name);
        console.log('Preview: ' + data.tracks.items[0].preview_url);
        console.log('Album: ' + data.tracks.items[0].album.name);
        console.log('================================');
    })

    appendTheThing(command, parameter);
}

function concertSearch() {
    axios.get(`https://rest.bandsintown.com/artists/${parameter}/events?app_id=codingbootcamp`).then(
        function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                console.log('================================');
                console.log('Venue: ' + results[i].venue.name);
                console.log('City: ' + results[i].venue.city);
                console.log('Date: ' + moment(results[i].datetime).format('L'));
                console.log('================================');
            }
        }
    )

    appendTheThing(command, parameter);
}

function movieSearch(parameter) {
    var movie = '';

    if (!parameter) {
        movie = 'Mr. Nobody';
    } else {
        movie = parameter;
    }
    axios.get(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`).then(
        function (response) {
            console.log('================================');
            console.log('Title: ' + response.data.Title);
            console.log('Year Released: ' + response.data.Year);
            console.log('IMDB Rating: ' + response.data.imdbRating);
            console.log('Rotten Tomatoes: ' + response.data.Ratings[1].Value);
            console.log('Country Produced: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);
            console.log('================================');
        }
    )
    appendTheThing(command, parameter);
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var dataArray = data.split(',');
        command = dataArray[0];
        parameter = dataArray[1];

        console.log('================================');
        console.log(command + ', ' + parameter);
        console.log('================================');

        spotifySearch(parameter);
    })
}

function appendTheThing(command, parameter) {
    fs.appendFile('log.txt', command + ' ' + parameter + ', ', function (err) {

        if (err) {
            console.log(err);
        } else {
            console.log('added command to log.txt');
        }
    })
}

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