// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friendsData = require("./../app/data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        var friend = {
            scores: req.body.scores,
            name: req.body.name,
            photo: req.body.photo
        };
        // index of highest value in compare array and get the index of the friend in the friend array
        var compare = [];
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        for (var i = 0; i < friendsData.length; i++) {
            // resets the totalDifference to 0 everytime the loop runs and then pushes the number into the array
            var totalDifference = 0;
            for (var j = 0; j < friend.scores.length; j++) {
                var userInputDifference = friendsData[i].scores[j] - friend.scores[j];
                totalDifference += Math.abs(userInputDifference);
                // index of surveryResult j is the index and surveryResult[j] is the value at that index
                if (j === friend.scores.length - 1) {
                    compare.push(totalDifference);
                }
            }
        }
        console.log(compare);
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