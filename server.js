var express = require('express');
var app = express();
app.get('/', function(httpRequest, httpResponse) {
    httpResponse.send('Hello, World!');
});
app.get('/hello-frank', function(httpRequest, httpResponse) {
    httpResponse.send('Hello, Frank.');
});
app.post('/hello-frank', function(httpRequest, httpResponse) {
    httpResponse.send("No, Frank. You're not allowed to post.");
});
app.get('/hello/:name', function(httpRequest, httpResponse) {
    var name = httpRequest.params.name;
    httpResponse.send('Hello, ' + name + '!');
});
var request = require('request');
var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
    'v2/?key=6B328D41EE66949204BBCEBA81C3852A&appid=8930';
request.get(url, function(error, steamHttpResponse, steamHttpBody) {
    // Print to console to prove we downloaded the achievements.
    console.log(steamHttpBody);
});
app.get('/steam/civ5achievements', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
        'v2/?key=6B328D41EE66949204BBCEBA81C3852A&appid=8930';
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        // Once we get the body of the steamHttpResponse, send it to our client
        // as our own httpResponse
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});
app.get('/steam/game/:appid/achievements', function(httpRequest, httpResponse) {
    // Calculate the Steam API URL we want to use
    var url = 'http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/' +
        'v2/?key=6B328D41EE66949204BBCEBA81C3852A&appid=' +
        httpRequest.params.appid;
    request.get(url, function(error, steamHttpResponse, steamHttpBody) {
        httpResponse.setHeader('Content-Type', 'application/json');
        httpResponse.send(steamHttpBody);
    });
});
app.use('/', express.static('public'));
var bodyParser = require('body-parser');

app.use(bodyParser.text());
app.post('/frank-blog', function(httpRequest, httpResponse) {
    console.log(httpRequest.body);
    // We need to respond to the request so the web browser knows
    // something happened.
    // If you've got nothing better to say, it's considered good practice to
    // return the original POST body.
    httpResponse.status(200).send('Posted today:\n\n' + httpRequest.body);
});
var port = 4000;
var server = app.listen(port);
console.log('Listening on port ' + port);
