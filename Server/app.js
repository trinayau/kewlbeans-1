const express = require('express')
const app = express()
const cors = require('cors')

const fs = require('fs')

try {
    const jsonString = fs.readFileSync('data.json');
    const entries = JSON.parse(jsonString);
} catch (err) {
    console.log(err);
}


app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));



module.exports = app;