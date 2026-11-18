const {
  getMovies,
  getMovieById,
  getMovieByCategory,
  postMovie,
  putMovie,
  deleteMovie
} = require('../controllers/movies')

const moviesRouter = require('express').Router()

moviesRouter.get('/category/:category', getMovieByCategory)
moviesRouter.get('/:id', getMovieById)
moviesRouter.get('/', getMovies)
moviesRouter.post('/', postMovie)
moviesRouter.put('/:id', putMovie)
moviesRouter.delete('/:id', deleteMovie)

module.exports = moviesRouter
