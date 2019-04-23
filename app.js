const express = require('express');
const app = express();
const request = require('request');
app.set("view engine", "ejs");

app.get('/', function (req, res) {
    res.render('search');
});

app.use(express.static(__dirname + '/public'));

app.get('/results', function (req, res) {
    let query = req.query.search;
    const url = "http://www.omdbapi.com/?s=" + query + "&apikey=afdd6178";
    request(url, function (error, response, body) {
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
        const data = JSON.parse(body);
        res.render('results', {data: data});
    });
});


//Tell Express to listen for requests
app.listen(3000, function () {
    console.log('Ready!');
});