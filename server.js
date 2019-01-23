if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express');
const http = require('http');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');

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

app.use(proxy("/songs", {target: 'http://ec2-3-87-34-19.compute-1.amazonaws.com/'}));
app.use(proxy("/filterSongsRock", {target: 'http://ec2-3-87-34-19.compute-1.amazonaws.com:5000/'}));
app.use(proxy("/filterSongsJazz", {target: 'http://ec2-3-87-34-19.compute-1.amazonaws.com:5000/'}));
app.use(proxy("/filterSongsPop", {target: 'http://ec2-3-87-34-19.compute-1.amazonaws.com:5000/'}));
app.use(proxy("/data", {target: 'http://friends-component-fec.us-west-1.elasticbeanstalk.com/'}));
app.use(proxy("/song", {target: 'http://friends-component-fec.us-west-1.elasticbeanstalk.com/:3000'}));

app.get('/', function (req, res) {
  res.status(200).send('GET request from the homepage');
})