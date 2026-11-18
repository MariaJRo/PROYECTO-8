const Director = require('../models/directors')
const Movie = require('../models/movies')

const getDirectors = async (req, res, next) => {
  try {
    const directors = await Director.find().populate('movies')
    return res.status(200).json(directors)
  } catch (error) {
    return res.status(400).json('Error getting directors')
  }
}
const getDirectorById = async (req, res, next) => {
  try {
    const { id } = req.params
    const director = await Director.findById(id).populate('movies')
    return res.status(200).json(director)
  } catch (error) {
    return res.status(400).json('Error getting director')
  }
}

const postDirector = async (req, res, next) => {
  try {
    if (req.body.movies) {
      for (const movieId of req.body.movies) {
        const movie = await Movie.findById(movieId)

        if (!movie) {
          return res.status(404).json('Movie not found')
        }
      }
    }

    const newDirector = new Director(req.body)
    const directorSaved = await newDirector.save()

    return res.status(201).json(directorSaved)
  } catch (error) {
    return res.status(400).json('Error creating director')
  }
}

const putDirector = async (req, res, next) => {
  try {
    const { id } = req.params

    const oldDirector = await Director.findById(id)

    if (!oldDirector) {
      return res.status(404).json('Director not found')
    }

    const newData = {
      name: oldDirector.name,
      img: oldDirector.img
    }

    if (req.body.name) {
      newData.name = req.body.name
    }

    if (req.body.img) {
      newData.img = req.body.img
    }

    if (req.body.movies) {
      for (const movieId of req.body.movies) {
        const movie = await Movie.findById(movieId)

        if (!movie) {
          return res.status(404).json('Movie not found')
        }
      }
    }

    const directorUpdated = await Director.findByIdAndUpdate(
      id,
      {
        $set: newData,
        ...(req.body.movies && {
          $addToSet: {
            movies: { $each: req.body.movies }
          }
        })
      },
      {
        new: true,
        runValidators: true
      }
    )

    return res.status(200).json(directorUpdated)
  } catch (error) {
    console.error(error)
    return res.status(400).json('Error updating director')
  }
}

const deleteDirector = async (req, res, next) => {
  try {
    const { id } = req.params
    const directorDeleted = await Director.findByIdAndDelete(id)
    return res.status(200).json(directorDeleted)
  } catch (error) {
    return res.status(400).json('Error deleting director')
  }
}

module.exports = {
  getDirectors,
  getDirectorById,
  postDirector,
  putDirector,
  deleteDirector
}
