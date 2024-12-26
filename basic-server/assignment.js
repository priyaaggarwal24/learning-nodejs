const http = require('http')

const users = [];

const requestHandler = (request, response) => {
    let url = request.url;
    let method = request.method;
    if (url === '/' && method === 'GET') {
        response.write('<html>');
        response.write('<head><title>Add users form</title></head>');
        response.write('<body>');
        response.write('<h1>Add a new user here:</h1>');
        response.write('<form action="/create-user" method="POST"><input type="text" name="userName"/><button type="submit">Submit</button></form>');
        response.write('</body>');
        response.write('</html>');
        return response.end();
    } else if (url === '/users' && method === 'GET') {
        response.write('<html>');
        response.write('<head><title>All users</title></head>');
        response.write('<body>');
        response.write('<h1>Here is the list of users:</h1>');
        response.write('<ul>');
        console.log(users);
        for(const user of users) {
            response.write(`<li>${user}</li>`);
        }
        response.write('</ul>');
        response.write('<a href="/">Add a new user</a>');
        response.write('</body>');
        response.write('</html>');
        return response.end();
    } else if (url === '/create-user' && method === 'POST') {
        const userNameInput = [];
        request.on('data', (chunk) => {
            userNameInput.push(chunk);
        })
        return request.on('end',() => {
            let userName = Buffer.concat(userNameInput).toString().split('=')[1];
            console.log(`New user entered in the system is ${userName}`);
            if(users.find((user) => user === userName) === undefined) {
                users.push(userName)
            }
            response.statusCode = 302;
            response.setHeader('Location', '/users');
            response.end()
        })    
    }
}

const server = http.createServer(requestHandler);
server.listen(3000);

