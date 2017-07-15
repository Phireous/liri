var keys = require("./keys.js");

var fs = require("fs");

var twitter = require("twitter");

var request = require("request");

var command = process.argv[2];

var search = process.argv[3];

if (command == "my-tweets") {
	var client = new twitter(keys.twitterKeys);

	client.get("statuses/user_timeline", {screen_name: "Phireous", count: 20}, function(error, tweets, response) {
		if(error) console.log(error);
		for (i = 0; i < tweets.length; i++) {
			console.log(tweets[i].created_at + "\n" + tweets[i].text);
		}
	})
}
else if (command == "spotify-this-song") {

	var Spotify = require('node-spotify-api');
 
	var spotify = new Spotify(keys.spotifyKeys);

	if (typeof search == "undefined") {
		spotify.search({ type: 'track', query: "The Sign", limit: 1 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
		console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum: " + data.tracks.items[0].album.name);
		})
	}
	else {
		spotify.search({ type: 'track', query: search }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
		console.log(data.items.name); 
		})
	}
}
else if (command == "movie-this") {
	request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  		if (!error && response.statusCode === 200) {

    	console.log(
    		"Title: " + JSON.parse(body).Title +
    		"\nYear: " + JSON.parse(body).Year +
    		"\nIMDB's rating is: " + JSON.parse(body).imdbRating +
    		"\nRotten Tomatoes' rating is: " + JSON.parse(body).Ratings[1].value +
    		"\nCountry: " + JSON.parse(body).Country +
    		"\nLanguage: " + JSON.parse(body).Language +
    		"\nPlot: " + JSON.parse(body).Plot +
    		"\nActors: " + JSON.parse(body).Actors);
  		}
	})
}
else if (command == "do-what-it-says") {

}