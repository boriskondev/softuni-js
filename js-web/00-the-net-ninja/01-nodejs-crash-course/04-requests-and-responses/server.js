// npm install - to install all dependencies listed in package.json

const http = require("http");
const fs = require("fs");

const port = 3000;

// The callback runs every time a request comes in to the server
const server = http.createServer((req, res) => {
    // Receiving request
    // console.log("Request made.");
    // console.log(req.url);
    // console.log(req.method);

    // Sending response (html file):
    // Set header content type
    res.setHeader("Content-Type", "text/html");

    let path = "./views/"

    switch (req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;
        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;
        case "/about-me":
            res.statusCode = 301;
            res.setHeader("Location", "/about");
            res.end();
        default:
            path += "404.html";
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    })

});

server.listen(port, "localhost", () => {
    console.log(`Listening for requests on port ${port}.`);
});

// // Sending response (plain text):
// // Step 1 - set header content type
// res.setHeader("Content-Type", "text/plain");
//
// // Step 2 - write the content we want to send
// res.write("Hello, ninjas!");
//
// // Step 3 - end the response
// res.end();

// // Sending response (inline html):
// // Step 1 - set header content type
// res.setHeader("Content-Type", "text/html");
//
// // Step 2 - write the content we want to send
// res.write("<h1>Hello, ninjas!</h1>");
// res.write("<p>Hello again, ninjas!</p>");
//
// // Step 3 - end the response
// res.end();