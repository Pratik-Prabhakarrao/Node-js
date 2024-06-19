const express = require('express');
const moviesController = require('./../Controllers/moviesController')

const router = express.Router();

router.param("id", moviesController.checkId);

router.route('/').get(moviesController.getAllMovies).post(moviesController.createMovie);

router.route('/:id').get(moviesController.getMovieWithId).patch(moviesController.modifyMovie).delete(moviesController.deleteMovie)

module.exports= router;