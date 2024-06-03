const readline = require("readline");
const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./Templates/index13.html", "utf-8");
const products = JSON.parse(fs.readFileSync("./Data/products.json", "utf-8"));
const productListHtml =  fs.readFileSync('./Templates/productlist.html', 'utf8')

let productHtmlArray = products.map((prod)=>{
    let output = productListHtml.replace('{{%IMAGE%}}', prod.productImage);// first we are replacing the name of property with the db name  
    output = output.replace('{{%MODELNAME%}}', prod.name);
    output = output.replace('{{%MODELNO%}}', prod.modeName);
    output = output.replace('{{%NAME%}}', prod.modelNumber);
    output = output.replace('{{%SIZE%}}', prod.size);
    output = output.replace('{{%CAMERA%}}', prod.camera);
    output = output.replace('{{%PRICE%}}', prod.price);
    output = output.replace('{{%COLOR%}}', prod.color);

return output;

})

// Create server

const server = http.createServer((request, response) => {
  let path = request.url;
  if (path === "/" || path.toLowerCase() === "/home") {
    response.writeHead(200, {
      "Content-type": "text/html",
      "my-header": "Hello world",
    });
    response.end(html.replace("{{%CONTENT%}}", "you are in home page"));
  } else if (path.toLowerCase() === "/about") {
    response.writeHead(200, {
      "Content-type": "text/html",
      "my-header": "Hello world",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in about page"));
  } else if (path.toLowerCase() === "/contact") {
    response.writeHead(200, {
      "Content-type": "text/html",
      "my-header": "Hello world",
    });
    response.end(html.replace("{{%CONTENT%}}", "You are in contact page"));
  } else if (path.toLowerCase() === "/products") {
    let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));
    response.writeHead(200, {"Content-type": "text/html" });
    response.end(productResponseHtml);
    //console.log(productHtmlArray.join(',')); returned data is array of html hence join

  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-header": "Hello world",
    });
    response.end(html.replace("{{%CONTENT%}}", "error 404 : Page not found "));
  }
});

// listne to server

server.listen(8000, "127.0.0.1", () => {
  console.log("server has started");
});
