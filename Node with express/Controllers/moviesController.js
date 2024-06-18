const fs = require('fs');
let movies = JSON.parse(fs.readFileSync('./data/movies.json'));


//Route handler function
exports.getAllMovies = (req, res)=>{
    res.status(200).json({
        status:"Success",
        requestedAt:req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    });
}

exports.getMovieWithId = (req, res)=>{
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


exports.createMovie = (req, res)=>{
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

exports.modifyMovie = (req, res)=>{
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


exports.deleteMovie = (req, res)=>{
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

