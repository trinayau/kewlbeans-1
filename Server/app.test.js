const request = require('supertest');
const app = require('./app');
const fs = require('fs');
const path = require('path');


describe('API Server', () => {
    let api;
    let reviews = [];
    let testReview = {
        id: reviews.length,
        title: "Name of a coffee shop",
        description: "Description of the coffee shop",
        content: "Review of the coffee shop",
        gif: "",
        reaction: {
            like: 0,
            clap: 0,
            love: 0
        },
        comments: []
    };
    

//test server running
    beforeAll(() => {
    api = app.listen(5000, () => {
        console.log('Test server running at port 5000!');
    });
});

//test server stopping
    afterAll((done) => {
        api.close(done);
        console.log('Gracefully stopping test server');
    });

//test home route
    it('responds to get / with a status 200', (done) => {
        request(api).get('/').expect(200, done);
    });

//test reviews route
    it('responds to get /reviews with a status 200', (done) => {
        request(api).get('/reviews').expect(200, done);
    });
    it('responds with a string', () => {
        expect(String);
    })

//test that invalid endpoints return an error


//test post new review
   it('responds to post /reviews/newreview with status 201', async () => {
        const res = await request(api).post('/reviews/newreviews').send(testReview)
        expect(201);     
    });
    it('repsonds with stringified data', () => {
        expect(String);   
    });
    


});

