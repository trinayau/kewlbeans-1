const express = require('express')
const app = express()
const cors = require('cors')
const fs = require("fs"); //importing file-system package
const bodyParser = require("body-parser");
const data = fs.readFileSync('./reviews.json');
const reviews = JSON.parse(data);
/*Use express middleware in request processing pipeline*/
readJSON();
app.use(bodyParser.text());
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));



module.exports = app;
