// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var fs = require("fs");
var path = require("path");
// ===============================================================================
// ROUTING
// ===============================================================================
var fname = path.join(__dirname, "../data/friends.js");

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    // "/Users/sahana/Desktop/BootCamp/HomeWork/week7/FriendFinder/app/data/friends.js"

    app.get("/api/friends", function (request, response) {
        var rawdata = fs.readFileSync(fname);
        var friendsData = JSON.parse(rawdata);
        response.json(friendsData);
    });
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survey ...
    // Once saved, the server should acknowledge the client with a response
    // The response can be as simple as "I have received your data, thank you"
    // In this specific case, we need to save the data and then return the
    // compatible friend  with a friendData with the  that has been received
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        var friend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: req.body.scores
        };
        // data is received in a raw format and then in the next line the raw data is converted into an  JSON object
        friend.scores = friend.scores.map(Number);
        var rawdata = fs.readFileSync(fname);
        var friendsData = JSON.parse(rawdata);
        // index of highest value in compare array and get the index of the friend in the friend array
        var compare = [];
        // Note the code here. Our "server" will respond to requests and let users know if they have a friend compatible
        // It will do this by sending out the value "true" have a friend
        for (var i = 0; i < friendsData.length; i++) {
            // resets the totalDifference to 0 everytime the loop runs and then pushes the number into the array
            var totalDifference = 0;
            for (var j = 0; j < friend.scores.length; j++) {
                var userInputDifference = parseInt(friendsData[i].scores[j]) - friend.scores[j];
                totalDifference += Math.abs(userInputDifference);
                // index of surveryResult j is the index and surveryResult[j] is the value at that index
                if (j === friend.scores.length - 1) {

                }
            }
            compare.push(totalDifference);
        }
        var minimum = compare[0];
        // Trying to find the index of the least difference between the userInput and the existing data. 
        // The loop is used to find the minimun value in a array
        for (var k = 0; k < compare.length; k++) {
            if (compare[k] < minimum) {
                minimum = compare[k];
            }
        }
        friendsData.push(friend);
        fs.writeFileSync(fname, JSON.stringify(friendsData));
        res.json(friendsData[compare.indexOf(minimum)]);
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    /* app.post("/api/clear", function () {
        // Empty out the arrays of data
        friendsData = [];
        console.log(friendsData);
    }); */
};