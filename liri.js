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
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode.body); // Print the response status code if a response was received
        console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
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
        })

    .then(function(response) {
        console.log(JSON.stringify(response));
        // let singer = JSON.parse(body);
        let spotifyArr = tracks.items.album;
        if (spotifyArr.length > 0) {
            for (let i = 0; i < singer.length; i++) {
                console.log(`\nSinger:  ${tracks.items.album.artists[0].name}`);

            }
        }

    })

    .catch(function(err) {
        console.error('Error occurred: ' + err);
    });
}


// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from




function movieThis(movieName) {

    // Grab the movieName which will always be the third node argument.
    // Grab the movieName which will always be the third node argument.
    var movieName = process.argv[2];

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
            function(response) {
                console.log("Release Year: " + response.data.Year);
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

//    * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.

function pickCom(comData, funcData) {
    switch (comData) {
        case "concert-this":
            // code block
            console.log(funcData);
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
            // whatItSays(funcData);
            break;
        default:
            // code block
            console.log("Liri doesn't understand this command.  Try again.");
    }

}

// function whatItSays() {
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         if (error) {
//             return console.log(error)
//         }
//         let dataArr = data.split(",");

//         comData = dataArr[0];
//         funcData = dataArr[1];

//         pickCom(comData, funcData);

//     })
// }


function runThis(argOne, argTwo) {

    // console.log(argOne);
    // console.log(argTwo);
    pickCom(argOne, argTwo);
}

runThis(process.argv[2], process.argv.slice(3).join(" "));