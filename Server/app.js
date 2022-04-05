const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const fs = require("fs");

let reviews;

app.use(cors());
/*Use express middleware in request processing pipeline*/

app.use(bodyParser.text());
app.use(express.json());

app.get('/', (req, res) => res.send('Latte.io!'));

app.get('/reviews', (req, res) => {
    readJSON();
    res.send(reviews);
    res.statusCode(200);
})

app.post("/reviews/newreview", (req, res) => {
    const newReviewData = JSON.parse(req.body);
    console.log(newReviewData);
    //new object
    const newReview = {
        id: reviews.length,
        title: "",
        description: "",
        content: "",
        gif: "",
        reaction: {
            like: 0,
            clap: 0,
            love: 0
        },
        comments: []
    };
    res.statusCode(201)
    res.send(newReview);
    newReview.title += newReviewData.title;
    newReview.description += newReviewData.description;
    newReview.content += newReviewData.content;
    newReview.gif += newReviewData.gif;
    reviews.push(newReview);
    writeJSON(reviews);
    readJSON();
})

function writeJSON(body) {
    const jsonString = JSON.stringify(body, null, 2)
    fs.writeFile("./reviews.json", jsonString, (err) => {
        try {console.log("successfully written to reviews.json");}
        catch (err){
            console.error(err);

        }
    })
}

function readJSON() {
    fs.readFile("./reviews.json", "utf-8", (err, jsonString) => {
        if(err) {
            console.error(err)
            return;
        }
        try {
            reviews = JSON.parse(jsonString);
        } catch (err) {
console.error(err)
        }
    })
}
//Pseudocode for reaction bar
// When I click the emoji on the front page
// I want the number next to it to update to + 1
// if I unclick it, then I want it to -1 (optional)
// i want to update this review's reaction in reviews.json (put)
//event listener that listens for click
//put request on post with :id to update review.reaction.[specificReaction] ++;


//firstly, write endpoint to fetch all posts in reviews.json
// display this in web page
// add comment section
// add js functionality to update posts.comments

module.exports = app;

