const readline = require("readline");
const fs = require("fs");
const http = require("http");
const url = require('url');
const event = require('events');

const { request } = require("http");

// user defined module
// const replaceHtml  = require('./Modules/replaceHtml.js')
// const user = require('./Modules/user.js')

// const html = fs.readFileSync("./Templates/index13.html", "utf-8");
// const products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
// const productListHtml =  fs.readFileSync('./Templates/productlist.html', 'utf8')
// const productDetailsHtml = fs.readFileSync('./Templates/productdetails.html', 'utf8')


 
// function replaceHtml(emplate, product){
//     let output = emplate.replace('{{%IMAGE%}}', product.productImage);// first we are replacing the name of property with the db name  
//     output = output.replace('{{%MODELNAME%}}', product.name);
//     output = output.replace('{{%MODELNO%}}', product.modeName);
//     output = output.replace('{{%NAME%}}', product.modelNumber);
//     output = output.replace('{{%SIZE%}}', product.size);
//     output = output.replace('{{%CAMERA%}}', product.camera);
//     output = output.replace('{{%PRICE%}}', product.price);
//     output = output.replace('{{%COLOR%}}', product.color);
//     output = output.replace('{{%ID%}}', product.id);
//     output = output.replace('{{%ROM%}}', product.ROM);
//     output = output.replace('{{%DESC%}}', product.Description);

//     return output
// }

// Create server

// const server = http.createServer((request, response) => {
  
// });

//server inherits from the event emitter class

const server = http.createServer();

// server.on('request', (request, response)=>{
//     let {query, pathname:path} =  url.parse(request.url, true) // if true it will parse the qurrry string otherwise not 
//     //   let path = request.url;
    
//       if (path === "/" || path.toLowerCase() === "/home") {
//         response.writeHead(200, {
//           "Content-type": "text/html",
//           "my-header": "Hello world",
//         });
//         response.end(html.replace("{{%CONTENT%}}", "you are in home page"));
//       } else if (path.toLowerCase() === "/about") {
//         response.writeHead(200, {
//           "Content-type": "text/html",
//           "my-header": "Hello world",
//         });
//         response.end(html.replace("{{%CONTENT%}}", "You are in about page"));
//       } else if (path.toLowerCase() === "/contact") {
//         response.writeHead(200, {
//           "Content-type": "text/html",
//           "my-header": "Hello world",
//         });
//         response.end(html.replace("{{%CONTENT%}}", "You are in contact page"));
//       } else if (path.toLowerCase() === "/products") {
//         if(!query.id){
//            let productHtmlArray =  products.map((prod)=>{
//               return replaceHtml(productListHtml, prod);
//             });
//             let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
//             response.writeHead(200, {"Content-type": "text/html" });
//             response.end(productResponseHtml);
//         }else{
//             let prod = products[query.id];
//             let productDetailsResponseHtml = replaceHtml(productDetailsHtml, prod);
//             response.end(html.replace('{{%CONTENT%}}', productDetailsResponseHtml));
//         }
//         //console.log(productHtmlArray.join(',')); returned data is array of html hence join
    
//       } else {
//         response.writeHead(404, {
//           "Content-type": "text/html",
//           "my-header": "Hello world",
//         });
//         response.end(html.replace("{{%CONTENT%}}", "error 404 : Page not found "));
//       }

// })

// listne to server

server.listen(8000, "127.0.0.1", () => {
  console.log("server has started");
});



//custome event

// let myEmitter =  new event.EventEmitter();

// let myEmitter =  new user();

// myEmitter.on('userCreate', ()=>{
//     console.log("a new user is created");
//     })
    
// myEmitter.on('userCreate', (id, name)=>{
//     console.log(`a new user with id ${id} and name ${name} is added to the database`);
//     })
    
    
// myEmitter.emit('userCreate', 101, 'Pratik');


// reading file normally  solution 1 rading all data at once 

// server.on('request',(req,res)=>{
//     fs.readFile('./Files/largFile.txt',(err, data)=>{
//         if(err){
//             res.end('Something went wrong');
//             return;
//         }
//         res.end(data);
//     } )
// })


// creating a stream 

server.on('request',(req,res)=>{
    let rs= fs.createReadStream("./Files/largFile.txt");

    rs.on('data', (chunk)=>{
        res.write(chunk);
        res.end();
    });

    rs.on('error',(error)=>{
        res.end(error.message);
    } )
})











