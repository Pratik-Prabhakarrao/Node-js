// import package 
const fs = require('fs');

const express = require('express');
const { count, log } = require('console');
let app = express();

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

app.use(express.json());
//get api/movies

app.get('/api/v1/movies', (req, res)=>{
    res.status(200).json({
        status:200,
        count: movies.length,
        data: {
            movies: movies
        }
    });
});


//post

app.post('/api/v1/movies', (req, res)=>{
    // console.log(req.body);
    const newId = movies[movies.length-1].id + 1;

    const newMovie = Object.assign({id: newId},req.body)
    movies.push(newMovie);
    fs.writeFile("./data/movies.json", JSON.stringify(movies), (err)=>{
        res.status*(201).json({
            status:"success",
            data:{
                movie: newMovie
            }

        })
    });
    // res.send('Created')
})

//post with route parameter  '/api/v1/movies/:id'

app.get('/api/v1/movies/:id/:name?', (req, res)=>{
    // console.log(req.params);
    const id = +req.params.id // convert the id into number as it is logged as string 

    //finding a movie based on the id parameter
    movie = movies.find((el)=>{
        return el.id === id; 
    }) 

    if(!movie){
       return res.status(404).json({
            status:"fail",
            message:`Movie with ID` +id+ `is not found`
        })
    }

    res.status(200).json({
        status: "success",
        data:{
            movie: movie
        }
    });
})



//create a server
const port = 3000;
app.listen(port, ()=>{
    console.log("Server has started");
});



