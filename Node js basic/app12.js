const readline = require("readline");
const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./Templates/index.html", "utf-8");

// Create server

const server = http.createServer((request, response) => {
  let path = request.url;
  if(path === '/' || path.toLowerCase() === "/home") {
    response.end("you are in home page");
  } else if(path.toLowerCase() === "/about") {
    response.end("you are in about page");
  } else if(path.toLowerCase() === "/contact") {
    response.end("you are in contact page");
  }else{
    response.end("error 404 : Page not found ")
  }
});

// listne to server

server.listen(8000, "127.0.0.1", () => {
  console.log("server has started");
});
