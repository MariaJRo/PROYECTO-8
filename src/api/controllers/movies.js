const Movie = require('../models/movies')
const Director = require('../models/directors')

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
  } catch (error) {
    return res.status(400).json('Error getting movies')
  }
}
const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)
    return res.status(200).json(movie)
  } catch (error) {
    return res.status(400).json('Error getting movie')
  }
}
const getMovieByCategory = async (req, res, next) => {
  try {
    const { category } = req.params
    const movies = await Movie.find({ category: category })
    return res.status(200).json(movies)
  } catch (error) {
    return res.status(400).json('Error getting movies by category')
  }
}
const postMovie = async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body)
    const movieSaved = await newMovie.save()
    return res.status(201).json(movieSaved)
  } catch (error) {
    return res.status(400).json('Error creating movie')
  }
}
const putMovie = async (req, res, next) => {
  try {
    const { id } = req.params
    const newMovie = new Movie(req.body)
    newMovie._id = id
    const movieUpdated = await Movie.findByIdAndUpdate(id, newMovie, {
      new: true
    })
    return res.status(200).json(movieUpdated)
  } catch (error) {
    return res.status(400).json('Error updating movie')
  }
}

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params

    const movieDeleted = await Movie.findByIdAndDelete(id)

    await Director.updateMany({ movies: id }, { $pull: { movies: id } })

    return res.status(200).json(movieDeleted)
  } catch (error) {
    return res.status(400).json('Error deleting movie')
  }
}

module.exports = {
  getMovies,
  getMovieById,
  getMovieByCategory,
  postMovie,
  putMovie,
  deleteMovie
}
