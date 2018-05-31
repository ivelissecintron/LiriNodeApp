//read and set any environment variables with the dotenv package
require("dotenv").config();

var keys = require("./keys.js")
var fs = require('fs');
var request = require("request");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var info = process.argv[3];

//------commands---------

doSomething();

function doSomething(){
switch(action) {
  case "my-tweets":
  myTweets();
  break;

  case "spotify-this-song":
  spotifyThisSong();
  break;

  case "movie-this":
  movieThis();
  break;

  case "do-what-it-says":
  doWhatItSays();
  break;
}}

//-----twitter function------

function myTweets() {

var params = {screen_name: 'nucodergirl'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 for(var i = 0; i < tweets.length; i++){
 console.log("@NUCODERGIRL Tweeted: " + tweets[i].text);

 }
});
}

//----------movies function------------

function movieThis(){
  if(!info){
    info = "mr nobody";
  }
// runs a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + info + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      // parsing the body for requested data
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Release Year: " + JSON.parse(body).Plot);
    }
  });
  }

//-----spotify function-------

function spotifyThisSong() {
  if(!info){
    info = "The Sign";
  }
  spotify.search({ type: 'track', query: info }, function(err, data) {
      if (err) {
          return console.log('Error occurred: ' + err);
      }
  
// stores the song data in a variable named "songData"
      var songData = data.tracks.items;

// loops through the songs and logs the requested data
      for (var i = 0; i < songData.length; i++) { 
          console.log("Artist(s): " + songData[i].artists[0].name); 
          console.log("Song Name: " + songData[i].name);  
          console.log("Preview Link: " + songData[i].preview_url);  
          console.log("Album: " +  songData[i].album.name);
        }; 
      }); 
  }; 

//-----do what it says function-----

//stores the read information into the variable "data"
function doWhatItSays(){
fs.readFile("random.txt", "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  //break the string down by comma separation and store the contents into the output array.
  var output = data.split(",");

  //loop Through the newly created output array
  for (var i = 0; i < output.length; i++) {

    //print each element (item) of the array/
    console.log(output[i]);
  }
});
}
