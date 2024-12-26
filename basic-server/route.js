const fs = require('fs')

function requestHandler(request, response) {
    if(request.url === '/' && request.method === 'GET') {
        response.write('<html>');
        response.write('<head><title>A form</title></head>');
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"/> <button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end();
    } else if (request.url === '/message' && request.method === 'POST') {
        const body = []
        request.on('data', (chunk) => {
            body.push(chunk);
        })
        return request.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('./basic-server/message.txt', message)
            response.statusCode = 302
            response.setHeader('Location', '/')
            response.end();
        })
    } else {
        response.write('<html>');
        response.write('<head><title>Unhandled route</title></head>');
        response.write('<body><h1>Unhandled route</h1></body>');
        response.write('</html>');
        return response.end();
    }
}

// method 1 
// module.exports = requestHandler

// method 2
// module.exports = {
//     handler: requestHandler
// }

// method 3
// module.exports.handler = requestHandler;

// method 4
exports.handler = requestHandler;