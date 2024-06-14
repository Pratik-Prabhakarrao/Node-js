const readline = require("readline");
const fs = require("fs");
const http = require("http");
const url = require('url');
const event = require('events');

const { request } = require("http");

const server = http.createServer();


// listne to server

server.listen(8000, "127.0.0.1", () => {
    console.log("server has started");
  });

  // creating a stream 

// server.on('request',(req,res)=>{
//     let rs= fs.createReadStream("./Files/largFile.txt");

//     rs.on('data', (chunk)=>{
//         res.write(chunk);
//     });

//     res.on('end', ()=>{
//         res.end();
//     });

//     rs.on('error',(error)=>{
//         res.end(error.message);
//     } )
// })


// Third solutiom

server.on('request', (req, res)=>{
    let rs = fs.createReadStream("./Files/largFile.txt");
    rs.pipe(res);  // pipe method can be used on read stram
    //pipe is used tp match the reading and writing speed   
})
