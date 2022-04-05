const request = require('supertest');
const app = require('./app');

describe('API Server', () => {
    let api; 

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
});

