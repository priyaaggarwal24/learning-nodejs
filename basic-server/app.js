const http = require('http');
const route = require('./route.js');
const requestHandler = require('./route.js');

/*
Plain function
===============
function requestListener(request, response) {

}
*/

/*
Anonymous function
===============
function(request, response) {

}
*/

/*
Arrow function
===============
(request, response) => {

}
*/

const server = http.createServer(route);

server.listen(3000);