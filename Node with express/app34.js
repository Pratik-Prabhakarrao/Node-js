// import package 
const fs = require('fs');

const express = require('express');
const { count } = require('console');
let app = express();

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));


//get api/movies

app.get('/api/v1/movies', (req, res)=>{
    res.status(200).json({
        status:200,
        count: movies.length,
        data: {
            movies: movies
        }
    })
})


//create a server
const port = 3000;
app.listen(port, ()=>{
    console.log("Server has started");
});



