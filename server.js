'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public/images'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	response.type('text/html');
	response.sendFile(path.join(__dirname+'/public/home.html'));
});

// custom 404 page
app.use(function(request, response) {
	response.type('text/html');
	response.status(404);
	response.sendFile(path.join(__dirname+'/public/404.html'));
});

// custom 500 page
app.use(function(error, request, response, next) {
	console.error(error.stack);
	response.type('text/plain');
	response.status(500);
	response.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl + c to terminate.');

});
