const http = require('http');
const fs = require('fs')

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

const server = http.createServer((request, response)=> {
    if(request.url === '/' && request.method === 'GET') {
        response.write('<html>');
        response.write('<head><title>A form</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"/> <button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end();
    } else if (request.url === '/message' && request.method === 'POST') {
        fs.writeFileSync('./basic-server/message.txt', 'DUMMY')
        response.statusCode = 302
        response.setHeader('Location', '/')
        return response.end();
    } else {
        response.write('<html>');
        response.write('<head><title>Unhandled route</title></head>');
        response.write('<body><h1>Unhandled route</h1></body>');
        response.write('</html>');
        return response.end();
    }
});

server.listen(3000);