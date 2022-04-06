/***** SET UP */
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const fs = require("fs");
let reviews;

/*Use express middleware in request processing pipeline*/
app.use(cors());
readJSON();
app.use(bodyParser.text());
app.use(express.json());

//Default
app.get('/', (req, res) => res.send('Latte.io!'));

//Get all reviews
app.get('/reviews', (req, res) => {
    readJSON();
    res.send(reviews);
})

//Find single review by id
app.get("/reviews/:id", (req, res) => {
    try {
    const reviewID = req.params.id - 1;
    const singleReview = reviews[reviewID];
    res.send(singleReview)
    } catch(err) {
        console.error(err);
    }
  });

/******* Make new post ********/

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
            thumbs: 0,
            heart: 0,
            coffee: 0
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
});

//New comment endpoint
app.post("/reviews/newcomment", (req,res)=> {
    try {
    const newCommentBody = JSON.parse(req.body);
    const id = newCommentBody.id;
    const newComment = newCommentBody.comment;
    reviews[id].comments.push(newComment);
    writeJSON(reviews);
    } catch(error) {
        console.error(error)
    }
})

app.get("/reviews/findreview", (req,res)=>{
    let id = req.query.id;
    let emoji = req.query.emoji;
    reviews[id].reaction[emoji] += 1;
    writeJSON(reviews);
    console.log('emoji recieved')
})

// Helper functions: writeJSON writes to file reviews.json
function writeJSON(body) {
    const jsonString = JSON.stringify(body, null, 2)
    fs.writeFile("./reviews.json", jsonString, (err) => {
        try {console.log("successfully written to reviews.json");}
        catch (err){
            console.error(err);

        }
    })
}
//readJSON reads the reviews in reviews.json file and converts JSON string to JSON object
function readJSON() {
    fs.readFile("./reviews.json", "utf-8", (err, reviewsJson) => {
        try {
            reviews = JSON.parse(reviewsJson);
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

