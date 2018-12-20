if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
const app = express();

// change to env 
const port = process.env.PORT || 3000;
// var ip = '127.0.0.1';

http.createServer(app).listen(port, function () {
  console.log('Listening on Port ' + port);
});

app.use(express.static('public'));
// create application/json parser
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.status(200).send('GET request from the homepage');
})