const readline = require("readline");
const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./Templates/index13.html", "utf-8");

// Create server

const server = http.createServer((request, response) => {
  let path = request.url;
  if(path === '/' || path.toLowerCase() === "/home") {
    response.end(html.replace('{{%CONTENT%}}', "You are in home page"));
  } else if(path.toLowerCase() === "/about") {
    response.end(html.replace('{{%CONTENT%}}', "You are in about page"));
  } else if(path.toLowerCase() === "/contact") {
    response.end(html.replace('{{%CONTENT%}}', "You are in contact page"));
  }else{
    response.end(html.replace('{{%CONTENT%}}' , "error 404 : Page not found "))
  }
});

// listne to server

server.listen(8000, "127.0.0.1", () => {
  console.log("server has started");
});
