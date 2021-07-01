const http = require("http");

const port = 3000;

// The callback runs every time a request comes in to the server.
const server = http.createServer((req, res) => {
    console.log("Request made.")
});

server.listen(port, "localhost", () => {
    console.log(`Listening for requests on port ${port}.`)
});