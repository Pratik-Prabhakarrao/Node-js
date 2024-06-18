// import package 
const express = require('express');

const morgan = require('morgan');

const moviesRouter = require('./Routes/moviesRoutes')

const { count, log } = require('console');
let app = express();



//logger method for middleware 

const logger = function(req, res, next){
    console.log("custom middleware called");
    next();
}

app.use(express.json());
app.use(morgan('tiny'));

app.use(logger);
app.use((req, res, next)=>{   //defining the middleware 
    req.requestedAt = new Date().toISOString();
    next();
})



//using the routes
app.use('/api/v1/movies', moviesRouter);


module.exports = app;


