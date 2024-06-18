// import package 
const fs = require('fs');

const express = require('express');
const { count, log } = require('console');
let app = express();

let movies = JSON.parse(fs.readFileSync('./data/movies.json'));

//logger method for middleware 

const logger = function(req, res, next){
    console.log("custom middleware called");
    next();
}

app.use(express.json());


app.use(logger);
app.use((req, res, next)=>{   //defining the middleware 
    req.requestedAt = new Date().toISOString();
    next();
})

//we use the middleware for manupulating the req and res object before sending the response




//Route handler function
const getAllMovies = (req, res)=>{
    res.status(200).json({
        status:"Success",
        requestedAt:req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    });
}

const getMovieWithId = (req, res)=>{
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
}


const createMovie = (req, res)=>{
    // console.log(req.body);
    const newId = movies[movies.length-1].id + 1;

    const newMovie = Object.assign({id: newId},req.body)
    movies.push(newMovie);
    fs.writeFile("./data/movies.json", JSON.stringify(movies), (err)=>{
        res.status(201).json({
            status:"success",
            data:{
                movie: newMovie
            }

        })
    });
    // res.send('Created')
}

const modifyMovie = (req, res)=>{
    let id = req.params.id*1;
    let movieToUpdate = movies.find(el=>el.id===id);
    if(!movieToUpdate){
       return res.status(404).json({
            status:"fail",
            message: `no movie to update with ID `+id+ ` is found`
        })
    }
 

    let index = movies.indexOf(movieToUpdate);
    
    Object.assign(movieToUpdate, req.body)
    movies[index]= movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=>{
        res.status(200).json({
            status:"success",
            data:{
                movie: movieToUpdate
            }
        })
    })

}


const deleteMovie = (req, res)=>{
    const id = req.params.id * 1;
    const movieToDelete = movies.find(el =>el.id ===id);

    if(!movieToDelete){
        return res.status(404).json({
            status:'fail',
            message:"no movie with id" +id+ "is found"
        })
    }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);


    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=>{
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })


}

// //get api/movies

// app.get('/api/v1/movies', getAllMovies);

// //post

// app.post('/api/v1/movies', createMovie)

// //post with route parameter  '/api/v1/movies/:id'

// app.get('/api/v1/movies/:id', getMovieWithId)

// // api for modifying the movie api

// app.patch("/api/v1/movies/:id", modifyMovie)

// // delete a resource 
// app.delete("/api/v1/movies/:id", deleteMovie)



app.route('/api/v1/movies').get(getAllMovies).post(createMovie);

app.route('/api/v1/movies/:id').get(getMovieWithId).patch(modifyMovie).delete(deleteMovie)

//create a server
const port = 3000;
app.listen(port, ()=>{
    console.log("Server has started");
});



