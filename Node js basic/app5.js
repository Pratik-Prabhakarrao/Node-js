const readline =  require("readline");
const fs = require("fs");


let textIn = fs.readFileSync("./Files/input.txt", 'utf-8')
console.log(textIn)

let content = `Data read from input.txt : ${textIn} \n Date created ${new Date()}`
fs.writeFileSync("./Files/output.txt", content);