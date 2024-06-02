const readline  = require('readline');
const fs =  require('fs')
const http  = require('http');

// Create server

const server = http.createServer((request,response)=>{
    response.end('Hello from server') // for sending the response from the serevr to client 
    console.log(request);
    console.log(response);
    console.log("a new request received");
})

// listne to server

server.listen(8000, '127.0.0.1', ()=>{
    console.log("server has started");
})


