const {
  getDirectors,
  getDirectorById,
  postDirector,
  putDirector,
  deleteDirector
} = require('../controllers/directors')

const directorsRouter = require('express').Router()

directorsRouter.get('/:id', getDirectorById)
directorsRouter.get('/', getDirectors)
directorsRouter.post('/', postDirector)
directorsRouter.put('/:id', putDirector)
directorsRouter.delete('/:id', deleteDirector)

module.exports = directorsRouter
