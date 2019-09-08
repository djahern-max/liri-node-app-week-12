//Require npm to link to keys
require("dotenv").config();

//Include the file system module
var fs = require("fs");

//Require the node package manager for axios, request and moment
var axios = require("axios");
var request = require('request');
var moment = require('moment');


function concertThis(artists) {
    console.log("\n-------\n\nSEARCHING FOR...." + artists + "'s next show");
    var url = "https://rest.bandsintown.com/artists/" + artists + "/events?app_id=codingbootcamp"
    request(url, function(error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode.body); // Print the response status code if a response was received
        // console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
        let userBand = JSON.parse(body);
        if (userBand.length > 0) {
            for (let i = 0; i < userBand.length; i++) {
                console.log(`\nVenue:  ${userBand[i].venue.name}`);
                console.log(`\nCountry:  ${userBand[i].venue.country}`);
                console.log(`\nCity:  ${userBand[i].venue.city}`);

                let concertDate = moment(userBand[i].datetime).format("MM/DD/YYY hh:00 A");
                console.log(`\nDate and Time:  ${concertDate}\n\n-------`);
            }
        }
    })
}

function spotifyThisSong(song) {

    console.log(`\n-------\n\nSEARCHING FOR...."${song}"`);

    if (!song) {
        song = "the sign ace of base"
    };

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "e5ad1430cf4545f5a8c826074f587bc3",
        secret: "35728764b8a4429ab99aa2dab5f9d627"
    });

    spotify
        .search({
            type: 'track',
            query: song,
            limit: 1
        })

    .then(function(response) {

        console.log("Artist:   " + response.tracks.items[0].artists[0].name);
        console.log("Song:   " + response.tracks.items[0].name);
        console.log("Preview link of the song from Spotify:   " + response.tracks.items[0].preview_url);
        console.log("Album:   " + response.tracks.items[0].album.name);

    })

    .catch(function(err) {
        console.error('Error occurred: ' + err);
    });
}

function movieThis(movieName) {

    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
            function(response) {
                console.log("The movie's title is: " + response.data.Title);
                console.log("Year the movie came out: " + response.data.Year);
                console.log("IMDB rating: " + response.data.imdbRating);
                console.log("Rotten tomatoes rating: " + response.data.Ratings[1].Value);
                console.log("Country where produced: " + response.data.Country);
                console.log("Language of the movie: " + response.data.Language);
                console.log("Language of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
            })
        .catch(function(error) {
            if (error.response) {} else {
                // Something happened in setting up the request that triggered an Error
                console.log("We could not find this movie.  Please check your spelling and try again.");
            }
        });
}

function whatItSays() {

    fs.readFile('random.txt', "utf8", function(error, data) {
        var txt = data.split(',');

        spotifyThisSong(txt[1]);

    })
}

//App Logic
function pickCom(comData, funcData) {
    switch (comData) {
        case "concert-this":
            concertThis(funcData);
            break;
        case "spotify-this-song":
            // code block
            console.log(funcData);
            spotifyThisSong(funcData);
            break;
        case "movie-this":
            // code block
            console.log(funcData);
            movieThis(funcData);
            break;
        case "do-what-it-says":
            // code block
            console.log(funcData);
            whatItSays(funcData);
            break;
        default:
            // code block
            console.log("Liri doesn't understand this command.  Try again.");
    }

}


function runThis(argOne, argTwo) {

    // console.log(argOne);
    // console.log(argTwo);
    pickCom(argOne, argTwo);
}

runThis(process.argv[2], process.argv.slice(3).join(" "));